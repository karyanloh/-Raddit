from fastapi import APIRouter, Depends, HTTPException
from content_queries import ContentQueries
from auth import authenticator
from model import PostScoreOut, PostScoreList

router = APIRouter()


@router.get("/api/postScore", response_model=PostScoreList)
def get_all_scores(
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_all_scores()


@router.get("/api/postScore/{id}", response_model=PostScoreOut)
def get_post_score_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_score_by_id(id)


@router.get("/api/post/postScore/{post_id}", response_model=PostScoreOut)
def get_post_score_by_post_id(
    post_id: str,
    # score: int,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_score_by_post_id(post_id)


@router.delete("/api/postScore/{id}")
def delete_post_score_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    return content_queries.delete_post_score(id)


@router.put("/api/postScore/upvote/{post_id}", response_model=PostScoreOut)
def increase_post_score_by_id(
    post_id: str,
    user_id: dict,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    user_id = user_id["account"]
    if account["id"] is not None:
        result = content_queries.increase_post_score(post_id, user_id)
        return result
    else:
        raise HTTPException(status_code=401, detail="not working")


@router.put("/api/postScore/downvote/{post_id}", response_model=PostScoreOut)
def decrease_post_score_by_id(
    post_id: str,
    user_id: dict,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    user_id = user_id["account"]
    if account["id"] is not None:
        result = content_queries.decrease_post_score(post_id, user_id)
        return result
    else:
        raise HTTPException(status_code=401, detail="not working")
