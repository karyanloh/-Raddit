from fastapi import FastAPI, Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from content_queries import ContentQueries
from auth import authenticator


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2023,
            "month": 1,
            "day": "27",
            "hour": 19,
            "min": 0,
            "tz:": "PST"
        }
    }


class PostIn(BaseModel):
    title: str
    description: str
    subraddit: str
    user_id: str

class PostOutShort(BaseModel):
    id: str
    title: str
    subraddit: str


class PostOutDetail(BaseModel):
    id: str
    title: str
    description: str
    subraddit: str

class EditPost(BaseModel):
    description: str


@app.post('/api/posts', response_model=PostIn)
def create_post(
    new_post: PostIn,
    content_queries: ContentQueries = Depends(),
    # Authentication - are you signed in
    account: dict = Depends(authenticator.get_current_account_data)
):
    if account['id'] is not None:
        return content_queries.create_post(new_post)


@app.get('/api/main/{id}', response_model=PostOutShort)
def get_post_short_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_by_id(id)

@app.get('/api/post/{id}', response_model=PostOutDetail)
def get_post_detail_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_by_id(id)

@app.delete('/api/delete/{id}')
def delete_post_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data)
):
    get = content_queries.get_post_by_id(id)
    creator = get['user_id']
    if account['id'] == creator:
        return content_queries.delete_post(id)
    else:
        raise HTTPException(status_code=401, detail="not working")

@app.put('/api/post/{id}')
def update_post_by_id(
    id: str,
    description: EditPost,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data)
):
    get = content_queries.get_post_by_id(id)
    creator = get['user_id']
    if account['id'] == creator:
        return content_queries.edit_post(id, description)
    else:
        raise HTTPException(status_code=401, detail="not working")
