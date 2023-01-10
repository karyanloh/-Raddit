from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from content_queries import ContentQueries


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
    user: str

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
):
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
):
    return content_queries.delete_post(id)

@app.put('/api/post/{id}', response_model=PostOutDetail)
def update_post_by_id(
    id: str,
    description: EditPost,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.edit_post(id, description)


class CommentIn(BaseModel):
    post: str
    body: str
    user: str

class CommentOut(BaseModel):
    id: str
    post: str
    body: str

class EditComment(BaseModel):
    body: str

@app.post('/api/comments', response_model=CommentIn)
def create_comment(
    new_comment: CommentIn,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.create_comment(new_comment)

@app.get('/api/comment/{id}', response_model=CommentOut)
def get_comment_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_comment_by_id(id)

@app.delete('/api/comment/{id}')
def delete_comment_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.delete_comment(id)

@app.put('/api/comment/{id}', response_model=CommentOut)
def update_comment_by_id(
    id: str,
    body: EditComment,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.edit_comment(id, body)
