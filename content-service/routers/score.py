from fastapi import APIRouter, Depends
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
    # get = content_queries.get_post_score_by_id(id)
    # upvoted_user = get['upvoted_users_id']
    # downvoted_user = get['downvoted_user_id']
    # if account['id'] == upvoted_user or account['id'] == downvoted_user:
    return content_queries.delete_post_score(id)
    # else:
    #     raise HTTPException(status_code=401, detail="not working")


# @router.put("/api/postScore/{id}", response_model=PostScoreOut)
# def update_post_score_by_id(
#     id: str,
#     score: EditPostScore,
#     content_queries: ContentQueries = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
# ):
#     # get = content_queries.get_post_score_by_id(id)
#     # upvoted_user = get['upvoted_users_id']
#     # downvoted_user = get['downvoted_user_id']
#     # if account['id'] == upvoted_user or account['id'] == downvoted_user:
#     return content_queries.edit_post_score(id, score)
#     # else:
#     #     raise HTTPException(status_code=401, detail="not working")


@router.put("/api/postScore/upvote/{post_id}", response_model=PostScoreOut)
def increase_post_score_by_id(
    post_id: str,
    content_queries: ContentQueries = Depends(),
):
    result = content_queries.increase_post_score(post_id)
    return result


@router.put("/api/postScore/downvote/{post_id}", response_model=PostScoreOut)
def decrease_post_score_by_id(
    post_id: str,
    content_queries: ContentQueries = Depends(),
):
    result = content_queries.decrease_post_score(post_id)
    return result
