# TODO: CRUD user data 
# TODO: Login(Done) and signup(done)
# TODO: Tasks (Add delete edit)

from fastapi import FastAPI,Response,status,Request 
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from volunteer_village.config import config
from volunteer_village import db

import jwt as JWT
import datetime

app=FastAPI(redoc_url=False)

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
    user_exists=db.create_user(signup,user)
    response={"content":"already_exists","status_code":HTTP_409_CONFLICT}
    if(not user_exists):
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
        if(db.user_exists(jwt_decoded["email"],jwt_decoded["user"])):
            # get info of the user
            response["content"]="give user info"
            response["status_code"]=status.HTTP_200_OK
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="jwt_expired"
    return JSONResponse(**response)

@app.put("/api/user")
async def api_putinfo():
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"wrong_jwt","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        if (db.user_exists(jwt_decoded["email"],jwt_decoded["user"])):
            response["content"]="update"
            response["status_code"]=status.HTTP_200_OK
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="jwt_expired"
    return JSONResponse(**response)

@app.delete("/api/user")
async def api_deleteinfo():
    token=request.headers["Authorization"].split(" ")[1]
    response={"content":"wrong_jwt","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(token,config['refresh_token'],algorithms=["HS512"])
        if (db.user_exists(jwt_decoded["email"],jwt_decoded["user"])):
            response["content"]="delete the user"
            response["status_code"]=status.HTTP_200_OK
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="jwt_expired"
    return JSONResponse(**response)

@app.post("/api/token/refresh_token")
async def api_refresh_token(request:Request):
    access_token=request.headers["Authorization"].split(" ")[1]
    response={"content":"invalid_access_token","status_code":status.HTTP_401_UNAUTHORIZED}
    try:
        jwt_decoded=JWT.decode(access_token,config['access_token'],algorithms=["HS512"])
        payload=jwt_decoded
        payload["exp"]=datetime.datetime.now()+datetime.timedelta(minutes=15)
        refresh_jwt=JWT.encode(payload,cconfig['refresh_token'],algorithm="HS512")
        response["content"]=str({"refresh_token":refresh_jwt})
        response["status_code"]=status.HTTP_200_OK
    except JWT.exceptions.ExpiredSignatureError():
        response["content"]="expired_access_token"
        response["status_code"]=status.HTTP_426_UPGRADE_REQUIRED
    return JSONResponse(**response)

@app.get("/api/tasks")
async def api_tasks_get():
    #TODO: Organisation name
    #TODO: Task name
    #TODO: Address
    #TODO: City and state 
    #TODO: Skills requirements
    return Response("get tasks list")


@app.post("/api/tasks")
async def api_tasks_post():
    return Response("post tasks lists")

@app.put("/api/tasks")
async def api_tasks_put():
    return Response("put tasks list")

@app.delete("/api/tasks")
async def api_tasks_del():
    return Response("delete tasks list")

# Webpage Endpoints
@app.get("/")
async def home():
    return Response("home")

@app.get("/access-account")
async def access_account():
    return Response("login or signup")

@app.get("/tasks")
async def tasks():
    return Response("tasks")

