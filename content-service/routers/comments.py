from fastapi import APIRouter, Depends
from content_queries import ContentQueries
from auth import authenticator
from model import CommentIn, commentList

router = APIRouter()


@router.post("/api/comments", response_model=CommentIn)
def create_comment(
    new_comment: CommentIn,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if account["id"] is not None:
        return content_queries.create_comment(new_comment)


@router.get("/api/comments/{post_id}", response_model=commentList)
def get_comments_by_post_id(
    post_id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_comments_by_post_id(post_id)
