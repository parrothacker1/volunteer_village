from volunteer_village.config import config

from sqlalchemy import create_engine,Column,String,Integer,insert,select,text
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base,sessionmaker

from hashlib import sha256
from pydantic import BaseModel

Base=declarative_base()

engine=create_engine(config['postgres_url'])
connection=engine.connect()

Session=sessionmaker(bind=engine)
session=Session()

class Signup(BaseModel):
    name:str|None
    first_name:str|None
    last_name:str|None
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
    first_name=Column(String)
    last_name=Column(String)
    phone_num=Column(String)
    state=Column(String)
    city=Column(String)
    skills=Column(Integer,nullable=False)

class Organisers(Base):
    __tablename__="organisers"
    id=Column(Integer,primary_key=True)
    email=Column(String,nullable=False,unique=True)
    password_hash=Column(String,nullable=False,unique=True)
    org_name=Column(String)
    phone_num=Column(String)
    state=Column(String)
    city=Column(String)

class Tasks(Base):
    __tablename__="tasks"
    id=Column(Integer,primary_key=True)
    required_skills=Column(Integer)
    task_name=Column(String)
    task_description=Column(String)
    address=Column(String)
    start_date=Column(String) #TODO: Here add start date
    end_date=Column(String) #TODO: Here add end date
    state=Column(String)
    city=Column(String)

#class Feedback(Base):
#    __tablename__="feedbacks"


# Users
def verify_user(email:str,password:str,user:str) -> bool:
    if (user=="volunteer"):
        output=session.execute(select(Volunteers.password_hash).where(Volunteers.email==email)).first()
    elif (user=="organiser"):
        output=session.execute(select(Organisers.password_hash).where(Organisers.email==email)).first()
    else:
        return False
    pass_hash=sha256(password.encode('utf-8')).hexdigest()
    return output[0]==pass_hash

def create_user(signup:Signup,user:str):
    if (user=="volunteer"):
        user_cr=insert()
    elif (user=="organiser"):

    else:
        return None


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
        output=session.execute(select(Volunteers).where(Volunteers.email==email))
    elif (user=="organiser"):
        output=session.execute(select(Organisers).where(Organisers.email==email))
    return output
