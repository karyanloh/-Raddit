from fastapi import APIRouter, Depends, HTTPException
from content_queries import ContentQueries
from auth import authenticator
from model import PostScoreIn, PostScoreOut, EditPostScore

router = APIRouter()




@router.post('/api/postScore', response_model=PostScoreIn)
def create_post_score(
    new_post_score: PostScoreIn,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.create_post_score(new_post_score)

@router.get('/api/postScore/{id}', response_model=PostScoreOut)
def get_post_score_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_score_by_id(id)

@router.delete('/api/postScore/{id}')
def delete_post_score_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.delete_post_score(id)

@router.put('/api/postScore/{id}', response_model=PostScoreOut)
def update_post_score_by_id(
    id: str,
    score: EditPostScore,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.edit_post_score(id, score)
