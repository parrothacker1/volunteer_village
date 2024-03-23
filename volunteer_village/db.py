from volunteer_village.config import config

from sqlalchemy import create_engine,Column,String,Integer,insert,select,text
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base,sessionmaker
from sqlalchemy.dialects.postgresql import ARRAY

from hashlib import sha256
from pydantic import BaseModel

Base=declarative_base()

engine=create_engine(config['postgres_url'])
connection=engine.connect()

Session=sessionmaker(bind=engine)
session=Session()

class TaskInput(BaseModel):
    task_name:str
    task_description:str
    city:str
    addess:str
    start_date:str
    end_date:str
    skills:list(str)
    volunteers:list(str)|None

class ProfileUpdate(BaseModel):
    email:str
    name:str
    state:str
    city:str
    phone_num:str

class Signup(BaseModel):
    name:str
    email:str
    phone_num:str
    state:str|None
    city:str|None
    password:str

class Volunteers(Base):
    __tablename__="volunteers"
    id=Column(Integer,primary_key=True)
    email=Column(String,nullable=False,unique=True)
    password_hash=Column(String(70),nullable=False,unique=True)
    name=Column(String)
    phone_num=Column(String)
    state=Column(String)
    city=Column(String)

class Organisers(Base):
    __tablename__="organisers"
    id=Column(Integer,primary_key=True)
    email=Column(String,nullable=False,unique=True)
    password_hash=Column(String(70),nullable=False,unique=True)
    name=Column(String)
    phone_num=Column(String)

class Tasks(Base):
    __tablename__="tasks"
    id=Column(Integer,primary_key=True)
    skills=Column(ARRAY(String))
    task_name=Column(String)
    organiser=Column(String)
    task_description=Column(String)
    address=Column(String)
    start_date=Column(String)
    end_date=Column(String)
    city=Column(String)
    volunteers=Column(ARRAY(String))

#class Feedback(Base):
#    __tablename__="feedbacks"

# Tasks
def full_tasks_list():
    result=select(Tasks)
    return result

def tasks_list(email:str,user:str):
    if (user=="volunteer"):
        user=select(Volunteers.name).where(Volunteers.email==email).first()
        tasks=select(Tasks).where(user[0] in Tasks.volunteers)
        result=tasks
    elif (user=="organiser"):
        user=select(Organisers.name).where(Organisers.email==email).first()
        tasks=select(Tasks).where(organiser==user[0])
        result=tasks
    else:
        return None
    return result

def task_add(email:str,tasks_input:TaskInput,user:str):
    user=select(Organisers.name).where(Organisers.email==email).first()
    if (tasks_list(email,user).count()>0 && user=="organiser"):
        content={"organiser":user[0],"skills":tasks_input.skills,"city":tasks_input.city,"start_date":tasks_input.start_date,"end_date":tasks_input.end_date,"task_name":tasks_input.task_name,"task_description":tasks_input.task_description,"address":tasks_input.address,"volunteers":[]}
        task_cr=Tasks(**content)
        session.add(task_cr)
        session.commit()
        return True
    else:
        return False

def task_edit(id:int,update:TasksInput):
    obj_to_update = session.query(Tasks).filter(Tasks.id == id).first()
    if obj_to_update:
        obj_to_update.task_name=update.task_name
        obj_to_update.city=update.city
        obj_to_update.address=update.address
        obj_to_update.task_description=update.task_description
        obj_to_update.start_date=update.start_date
        obj_to_update.end_date=update.end_date
        obj_to_update.skills=update.skills
        obj_to_update.volunteers=update.volunteers
        session.commit()
        return True
    else:
        return False


def task_delete(id:int):
    output=None
    delete_query=session.query(Tasks).filter(Tasks.id==id).first()
    if (delete_query):
        session.delete(delete_query)
        session.commit()
        return True
    else:
        return False

# Users

def update_user(update:ProfileUpdate,user:str)-> bool:
    if (user=="volunteer"):
        obj_to_update = session.query(Volunteers).filter(Volunteers.email == update.email).first()
    elif (user=="organiser"):
        obj_to_update = session.query(Organisers).filter(Organisers.email == update.email).first()
    else:
        return None
    if obj_to_update:
        obj_to_update.name=update.name
        obj_to_update.city=update.city
        obj_to_update.phone_num=update.phone_num
        obj_to_update.state=update.state
        session.commit()
        return True
    else:
        return False

def verify_user(email:str,password:str,user:str) -> bool:
    if (user=="volunteer"):
        output=session.execute(select(Volunteers.password_hash).where(Volunteers.email==email)).first()
    elif (user=="organiser"):
        output=session.execute(select(Organisers.password_hash).where(Organisers.email==email)).first()
    else:
        return False
    pass_hash=sha256(password.encode('utf-8')).hexdigest())
    return output[0]==pass_hash

def create_user(signup:Signup,user:str):
    if (user=="volunteer"):
        content={"email":signup.email,"password_hash":sha256(signup.password.encode('utf-8').hexdigest()),"name":signup.name,"phone_num":signup.phone_num,"state":signup.state,"city":signup.city}
        if (not user_exists(signup.email,user)):
            user_cr=Volunteers(**content)
        else:
            return False
    elif (user=="organiser"):
        content={"email":signup.email,"password_hash":sha256(signup.password.encode('utf-8').hexdigest()),"name":signup.name,"phone_num":signup.phone_num}
        if (not user_exisrs(signup.email,user)):
            user_cr=Organisers(**content)
        else:
            return False
    else:
        return None
    session.add(user_cr)
    session.commit()
    return True

def get_user(email:str,user:str):
    if (user=="volunteer"):
        columns_to_query = [getattr(Volunteers, column.name) for column in Volunteers.__table__.columns if column.name != 'password_hash']
        user_get=select(*columns_to_query).where(Volunteers.email==email)
    elif (user=="organiser"):
        columns_to_query = [getattr(Organisers, column.name) for column in Organisers.__table__.columns if column.name != 'password_hash']
        user_get=select(*columns_to_query).where(Organisers.email==email)
    else:
        return None
    return user_get

def user_exists(email:str,user:str) -> bool:
    if (user=="volunteer"):
        output=session.execute(select(Volunteers).where(Volunteers.email==email))
    elif (user=="organiser"):
        output=session.execute(select(Organisers).where(Organisers.email==email))
    else:
        return False
    return output.count()>0

def get_user_data(email:str,user:str):
    output=None
    if (user=="volunteer"):
        columns_to_query = [getattr(Volunteers, column.name) for column in Volunteers.__table__.columns if column.name != 'password_hash']
        output=session.execute(select(*columns_to_query).where(Volunteers.email==email))
    elif (user=="organiser"):
        columns_to_query = [getattr(Organisers, column.name) for column in Organisers.__table__.columns if column.name != 'password_hash']
        output=session.execute(select(*columns_to_query).where(Organisers.email==email))
    return output

def delete_user(email:str,user:str) -> bool:
    output=None
    if (user=="volunteer"):
        delete_query=session.query(Volunteers).filter(Volunteers.email==email).first()
    elif (user=="organiser"):
        delete_query=session.query(Organisers).filter(Organisers.email==email).first()
    else:
        return output
    if (delete_query):
        session.delete(delete_query)
        session.commit()
        return True
    else:
        return False
