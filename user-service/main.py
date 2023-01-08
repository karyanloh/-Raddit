from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
from user_queries import UserQueries
from models import UserIn, UserOut
from auth import authenticator


app = FastAPI()
app.include_router(authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/api/users', response_model=UserOut)
def create_user(
    new_user: UserIn,
    user_queries: UserQueries = Depends(),
):
    new_user.password = authenticator.hash_password(new_user.password)
    return user_queries.create_user(new_user)

@app.get('/api/users/{id}', response_model=UserOut)
def get_user_by_id(
    id: str,
    user_queries: UserQueries = Depends(),
):
    return user_queries.get_user_by_id(id)
