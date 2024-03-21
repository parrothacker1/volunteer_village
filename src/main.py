from fastapi import FatsAPI,Response,status 
from fastapi.responses import JSONResponse

from volunteer_village.config import config

import jwt as JWT

app=FastAPI()

# API Endpoints
@app.post("/api/login")
async def api_login():
    user_exists=True
    response={"content":"incorrect_username_or_password","status_code":status.HTTP_401_UNAUTHORIZED}
    payload={'d':'da'}
    if (user_exists):
        access_jwt=JWT.encode(payload,config['access_token'],algorithm="HS512")
        refresh_jwt=JWT.encode(payload,config['refresh_token'],algorithm="HS512")
        response['content']=str({"access_token":access_jwt,"refresh_token":refresh_jwt})
        response['status_code']=status.HTTP_200_OK
    return JSONResponse(**response)

@app.post("/api/signup")
async def api_signup():
    response={"content":"","status_code":HTTP_200_OK}
    return JSONResponse(**response)

@app.post("/api/tokens/refresh_token")
async def api_refresh_token(access_toke:str):
    jwt_decoded=JWT.decode(access_token)
    return Response("return a refresh token valid for 15/20 mins")

# Webpage Endpoints
@app.get("/")
async def home():
    return Response("home")

@app.get("/access-account")
async def access_account():
    return Response("login or signup")

@app.get("/")
