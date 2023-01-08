from pydantic import BaseModel

class UserIn(BaseModel):
    email: str
    password: str
    username: str

class UserOut(BaseModel):
    email: str
    id: str
    username: str

class User(BaseModel):
    email: str
    id: str
    password: str
    username: str
