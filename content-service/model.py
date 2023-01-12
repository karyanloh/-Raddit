from pydantic import BaseModel

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
