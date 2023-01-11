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
        result = content_queries.create_post(new_post)
        post_id = result['id']
        # submit = {'post_id': post_id, 'score': 0, 'upvoted_users':[], 'downvoted_users':[]}
        # newer_score = content_queries.create_post_score(submit)
        return result


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

@app.put('/api/post/{id}', response_model=PostOutDetail)
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


class PostScoreIn(BaseModel):
    post_id: str
    score: int
    upvote_users: list[str]
    downvote_users: list[str]

class PostScoreOut(BaseModel):
    post_id: str
    score: int

class EditPostScore(BaseModel):
    score: int
    upvoted_users: list[str]
    downvoted_users: list[str]

@app.post('/api/postScore', response_model=PostScoreIn)
def create_post_score(
    new_post_score: PostScoreIn,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.create_post_score(new_post_score)

@app.get('/api/postScore/{id}', response_model=PostScoreOut)
def get_post_score_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_score_by_id(id)

@app.delete('/api/postScore/{id}')
def delete_post_score_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.delete_post_score(id)

@app.put('/api/postScore/{id}', response_model=PostScoreOut)
def update_post_score_by_id(
    id: str,
    score: EditPostScore,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.edit_post_score(id, score)
