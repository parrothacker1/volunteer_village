from fastapi import FastAPI,Response,status,Request 
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from volunteer_village.config import config
from volunteer_village import db

import jwt as JWT
import datetime

app=FastAPI(docs_url=False,redoc_url=False)
BASE_DIR=Path(__file__).resolve().parent
app.mount("/static",StaticFiles(directory=str(Path(BASE_DIR,'static'))),name='static')
templates=Jinja2Templates(directory=str(Path(BASE_DIR,'templates')))

class Login(BaseModel):
    email:str
    password:str

# API Endpoints
@app.post("/api/{user}/login")
async def api_volunteer_login(login:Login,user:str):
    user_exists=db.verify_user(login.email,login.password,user)
    response={"content":"incorrect_username_or_password","status_code":status.HTTP_401_UNAUTHORIZED}
    if (user_exists):
        payload={"email":login.email,"user":user}
        payload["exp"]=datetime.datetime.now()+datetime.timedelta(days=120)
        access_jwt=JWT.encode(payload,config['access_token'],algorithm="HS512")
        payload["exp"]=datetime.datetime.now()+datetime.timedelta(minutes=15)
        refresh_jwt=JWT.encode(payload,config['refresh_token'],algorithm="HS512")
        response['content']=str({"access_token":access_jwt,"refresh_token":refresh_jwt})
        response['status_code']=status.HTTP_200_OK
    return JSONResponse(**response)

@app.post("/api/{user}/signup")
async def api_signup(signup:db.Signup,user:str):
    if (user=="volunteer" && state && city) or (user=="organiser"): 
        user_exists=db.create_user(signup,user)
    else:
        return JSONResponse(content="wrong_format",status_code=status.HTTP_400_BAD_REQUEST)
    response={"content":"already_exists","status_code":HTTP_409_CONFLICT}
    if(user_exists):
        payload={"content":signup.email,"user":user}
        payload["exp"]=datetime.datetime.now()+datetime.timedelta(days=120)
        access_jwt=JWT.encode(payload,config['access_token'],algorithm="HS512")
        payload["exp"]=datetime.datetime.now()+datetime.timedelta(minutes=15)
        refresh_jwt=JWT.encode(payload,config['refresh_token'],algorithm="HS512")
        response["content"]=str({"access_token":access_jwt,"refresh_token":refresh_jwt})
        response["status_code"]=status.HTTP_200_OK
    return JSONResponse(**response)

@app.get("/api/user")
async def api_getinfo(request:Request):
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"wrong_jwt","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        try:
            if(db.user_exists(jwt_decoded["email"],jwt_decoded["user"])): 
                response["content"]=str(db.get_user(jwt_decoded['email'],jwt_decoded['email']))
                response["status_code"]=status.HTTP_200_OK
            else:
                response["content"]="user_not_exists"
                response["status_code"]=status.HTTP_404_NOT_FOUND
        except:
            response["content"]="sql_error"
            response["status_code"]=status.HTTP_500_INTERNAL_SERVER_ERROR
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="jwt_expired"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

@app.put("/api/user")
async def api_putinfo(user_update:db.ProfileUpdate):
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"wrong_jwt","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        try:
            if (db.user_exists(jwt_decoded["email"],jwt_decoded["user"])):
                response["content"]="success" if db.update_user(user_update,jwt_decoded["user"]) else "failed"
                response["status_code"]=status.HTTP_200_OK
            else:
                response["content"]="user_not_exists"
                response["status_code"]=status.HTTP_404_NOT_FOUND
        except:
            response["content"]="sql_error"
            response["status_code"]=status.HTTP_500_INTERNAL_SERVER_ERROR
        else:
            response["content"]="user_not_found"
            response["status_code"]=status.HTTP_404_NOT_FOUND
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="jwt_expired"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

@app.delete("/api/user")
async def api_deleteinfo():
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"wrong_jwt","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        try:
            if (db.user_exists(jwt_decoded["email"],jwt_decoded["user"])):
                response["content"]="success" if db.delete_user(jwt_decoded['email'],jwt_decoded['user']) else "failed"
                response["status_code"]=status.HTTP_200_OK
            else:
                response["content"]="user_not_exists"
                response["status_code"]=status.HTTP_404_NOT_FOUND
        except:
            response["content"]="sql_error"
            response["status_code"]=status.HTTP_500_INTERNAL_SERVER_ERROR
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="jwt_expired"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

@app.post("/api/token/refresh_token")
async def api_refresh_token(request:Request):
    access_token=request.headers["Authorization"].split(" ")[1]
    response={"content":"invalid_access_token","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(access_token,config['access_token'],algorithms=["HS512"])
        payload=jwt_decoded
        if (db.user_exists(payload['email'],payload['user'])):
            payload["exp"]=datetime.datetime.now()+datetime.timedelta(minutes=15)
            refresh_jwt=JWT.encode(payload,config['refresh_token'],algorithm="HS512")
            response["content"]=str({"refresh_token":refresh_jwt})
            response["status_code"]=status.HTTP_200_OK
        else:
            response["content"]="user_not_found"
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="expired_access_token"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

@app.get("/api/tasks")
async def api_tasks_get(request:Request):
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"not_authorized","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        try:
            tasks_list=db.tasks_list(jwt_decoded['email'],jwt_decoded['user'])
            response["content"]=str(tasks_list)
            response["status_code"]=status.HTTP_200_OK
        except:
            response["content"]="sql_error"
            response["status_code"]=status.HTTP_500_INTERNAL_SERVER_ERROR
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="expired_refresh_token"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

@app.get("/api/tasks/list")
async def api_tasks_get_list():
    response={'content':'sql_error',"status_code":status.HTTP_500_INTERNAL_SERVER_ERROR}
    try:
        response["content"]=str(db.full_tasks_list())
        response["status_code"]=status.HTTP_200_OK
    except:
        pass
    return JSONResponse(**response)

@app.post("/api/tasks")
async def api_tasks_post(task_input:db.TaskInput):
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"not_authorized","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        try:
            tasks_list=db.tasks_add(jwt_decoded['email'],task_input,jwt_decoded['user'])
            response["content"]=str(tasks_list)
            response["status_code"]=status.HTTP_200_OK
        except:
            response["content"]="sql_error"
            response["status_code"]=status.HTTP_500_INTERNAL_SERVER_ERROR
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="expired_refresh_token"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

@app.put("/api/tasks/{id}")
async def api_tasks_put(id:int,update:db.TaskInput):
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"not_authorized","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        try:
            response["content"]="success" if db.task_edit(id,update) else "failed"
            response["status_code"]=status.HTTP_200_OK
        except:
            response["content"]="sql_error"
            response["status_code"]=status.HTTP_500_INTERNAL_SERVER_ERROR
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="expired_refresh_token"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

@app.delete("/api/tasks/{id}")
async def api_tasks_del(id:int):
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"not_authorized","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        try:
            response["content"]="success" if db.tasks_del(id) else "failed"
            response["status_code"]=status.HTTP_200_OK
        except:
            response["content"]="sql_error"
            response["status_code"]=status.HTTP_500_INTERNAL_SERVER_ERROR
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="expired_refresh_token"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

# Webpage Endpoints

@app.get("/")
async def home():
    response=templates.TemplateResponse('index.html',{'request':request})
    return response

@app.get("/access-account/login")
async def access_account_login():
    response=templates.TemplateResponse('login.html',{'request':request})
    return response

@app.get("/access-account/signup")
async def access_account_signup():
    response=templates.TemplateResponse('signup2.html',{'request':request})
    return response

@app.get("/tasks")
async def tasks():
    response=templates.TemplateResponse('login.html',{'request':request})
    return response

@app.get("/about")
async def about():
    response=templates.TemplateResponse('About.html',{'request':request})
    return response
