from fastapi import APIRouter, Depends, HTTPException
from content_queries import ContentQueries
from auth import authenticator
from model import CommentIn, CommentOut, EditComment

router = APIRouter()

@router.post('/api/comments', response_model=CommentIn)
def create_comment(
    new_comment: CommentIn,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.create_comment(new_comment)

@router.get('/api/comment/{id}', response_model=CommentOut)
def get_comment_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_comment_by_id(id)

@router.delete('/api/comment/{id}')
def delete_comment_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.delete_comment(id)

@router.put('/api/comment/{id}', response_model=CommentOut)
def update_comment_by_id(
    id: str,
    body: EditComment,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.edit_comment(id, body)
