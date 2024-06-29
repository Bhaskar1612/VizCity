from fastapi import FastAPI, Path , HTTPException, Depends,status
from typing import Optional
from pydantic import BaseModel 
import httpx
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import jwt,JWTError
from passlib.context import CryptContext
from translate import Translator
import requests
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles



SECRET_KEY ="bfc881917fb293f6406d0379f4810a573341dad45c908a32334ccd3826e42e4a"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

API_KEY1="412c1928de01fa497b60a5fc238866a9"
API_KEY2="c65e7f2c24804c6f832ac43c5a06a2eb"
API_KEY3="f22c0e6aa752499b99c9da5020c489b7"
API_KEY4="9cf32955beed4c4783a76282c8b05171"
API_KEY5="C7I3GAFDMZMT"

name_list = {}

class Token(BaseModel):
    access_token:str
    token_type:str

class TokenData(BaseModel):
    username: Optional[str] = None

class user(BaseModel):
    username:str
    Class:int or None=None
    RollNo:int or None=None
    hashed_password:str or None=""
    disabled:bool or None=None


pwd_context =  CryptContext(schemes=["bcrypt"],deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_pwd(plain_pwd,hashed_pwd):
    return pwd_context.verify(plain_pwd,hashed_pwd)

def get_pwd_hash(password):
    return pwd_context.hash(password)

def get_user(name_list,username:str):
    if username in name_list:
        user_data=name_list[username]
        return user_data
    else:
        print("error")
    
def authenticat_user(name_list,username:str,pwd:str):
    user=get_user(name_list,username)
    if not user:
        return False
    if not verify_pwd(pwd,user.hashed_password):
        return False
    print(user)
    return user

def create_access_token(data:dict,expires_delta:timedelta or None=None):
    to_encode = data.copy()
    if expires_delta:
        expire=datetime.utcnow() + expires_delta
    else:
        expire=datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp":expire})
    encode_jwt= jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encode_jwt

async def get_current_user(token : str = Depends(oauth_2_scheme)):
    print(token)
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate credentials",headers={"WW.AUTHENTICATE":"BEARER"})
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        username : str = payload.get("sub")
        if username is None:
            raise credential_exception
        
        token_data=TokenData(username=username)

    except JWTError:
        raise credential_exception
    
    user = get_user(name_list,username=token_data.username)
    if user is None:
        raise credential_exception
    return user


@app.post("/token",response_model=Token)
async def login_for_access_token(from_data : OAuth2PasswordRequestForm = Depends()):
    user =authenticat_user(name_list,from_data.username,from_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Incorrect username or password",headers={"WW.AUTHENTICATE":"BEARER"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub":user.username},expires_delta=access_token_expires)
    print(user)
    return  {"access_token":access_token,"token_type":"bearer"}


@app.post("/Member")
async def create_member(member:user):
    if member.username in name_list:
        return{"Error":"Already exists"}
    member.hashed_password=get_pwd_hash(member.hashed_password)
    name_list[member.username]=member
    return name_list[member.username]

@app.post("/Member_Password")
async def create_password(username:str, pwd:str):
    if username not in name_list:
        return{"Error":"Does not exists"}
    p=pwd_context.hash(pwd)
    name_list[username].hashed_password=p
    return p


@app.get("/users/me",response_model=user)
async def current_user(current_user:user=Depends(get_current_user)):
    return current_user

@app.get("/weather/{city_name}")
async def weather(city_name : str):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY1}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

        if response.status_code == 200:
            weather_data = response.json()
            return weather_data
        else:
            raise HTTPException(status_code=response.status_code, detail="Weather data not available")

@app.get("/navigation/{city_name}")
async def navigation(city_name : str):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={city_name}&key={API_KEY2}"

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(url)

        if response.status_code == 200:
            navigation_data = response.json()
            return navigation_data
        else:
            raise HTTPException(status_code=response.status_code, detail="navigation data not available")
        

@app.get("/news/{city_name}")
async def news(city_name : str):
    url = f"https://newsapi.org/v2/everything"
    params = {
        "q": city_name,
         "apiKey": API_KEY3,
    }
    async with httpx.AsyncClient() as client:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            news_data = response.json()
            return news_data
        else:
            raise HTTPException(status_code=response.status_code, detail="news data not available")

@app.get("/Translate/")
async def translate(language1 : str,language2 : str,Text : str):
    translator= Translator(to_lang=language2)
    translation = translator.translate(Text)
    return {"original language":language1, "original_text": Text, "translated_text": translation, "target_language": language2}
    
@app.get("/Global_Currency_Exchange/")
async def exchnage():
    url = f"https://openexchangerates.org/api/latest.json?app_id={API_KEY4}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(status_code=response.status_code, detail="exchange data not available")

@app.get("/Timezones")
async def time(country : str):
    url = f"http://api.timezonedb.com/v2.1/list-time-zone?key={API_KEY5}&format=json&country={country}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(status_code=response.status_code, detail="time data not available")

@app.get("/Covid_19/")
async def health(Country : str):
    url1 = f"https://disease.sh/v3/covid-19/countries/{Country}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url1)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(status_code=response.status_code, detail="health data not available")
    

