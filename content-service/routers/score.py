from fastapi import APIRouter, Depends, HTTPException
from content_queries import ContentQueries
from auth import authenticator
from model import PostScoreIn, PostScoreOut, EditPostScore

router = APIRouter()


@router.get("/api/postScore/{id}", response_model=PostScoreOut)
def get_post_score_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_score_by_id(id)


@router.get("/api/post/postScore/{post_id}", response_model=PostScoreOut)
def get_post_score_by_post_id(
    post_id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_score_by_post_id(post_id)


@router.delete("/api/postScore/{id}")
def delete_post_score_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    get = content_queries.get_post_score_by_post_id(id)
    upvoted_users = get["upvoted_users"]
    downvoted_users = get["downvoted_users"]
    if account["id"] == upvoted_users or account["id"] == downvoted_users:
        return content_queries.delete_post_score(id)
    else:
        raise HTTPException(status_code=401, detail="not working")


@router.put("/api/postScore/{id}", response_model=PostScoreOut)
def update_post_score_by_id(
    post_id: str,
    content_queries: ContentQueries = Depends(),
):
    result = content_queries.edit_post_score(post_id)
    return result


# @router.put("/api/postScore/{id}", response_model=PostScoreOut)
# def update_post_score_by_id(
#     post_id: str,
#     # score: EditPostScore,
#     # score = upvoted_users-downvoted_users
#     upvote: bool,
#     content_queries: ContentQueries = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
# ):
#     get = content_queries.get_post_score_by_post_id(post_id)
#     upvoted_users = get["upvoted_users"]
#     downvoted_users = get["downvoted_users"]
#     if upvote:
#         # increase the post score by one on front end
#         # add current user to upvoted users list
#         upvoted_users.concat(current_user)
#         # upvoted_users.concat()
#     else:
#         # decrease post score by one
#         # add current user to downvoted users list
#         downvoted_users.concat(current_user)
#     # # if account["id"] == upvoted_users or account["id"] == downvoted_users:
#     if True:
#         return content_queries.edit_post_score(id, get)
#     else:
#         raise HTTPException(status_code=401, detail="not working")
