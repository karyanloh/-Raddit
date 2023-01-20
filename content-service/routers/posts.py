from fastapi import APIRouter, Depends, HTTPException
from content_queries import ContentQueries
from auth import authenticator
from model import PostIn, PostOutShort, PostOutDetail, EditPost, PostsList, PostList
router = APIRouter()


@router.post("/api/posts", response_model=PostIn)
def create_post(
    new_post: PostIn,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if account["id"] is not None:
        result = content_queries.create_post(new_post)
        post_id = result["id"]
        submit = {
            "post_id": post_id,
            "score": 0,
            "upvoted_users": [],
            "downvoted_users": [],
        }
        newer_score = content_queries.create_post_score(submit)
        return result
    else:
        raise HTTPException(status_code=401, detail="not working")


@router.get("/api/main/{id}", response_model=PostOutShort)
def get_post_short_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_by_id(id)

@router.get("/api/posts", response_model=PostList)
def get_all_posts(
    content_queries: ContentQueries = Depends()
):
    return content_queries.get_all_posts()


@router.get("/api/post/{id}", response_model=PostOutDetail)
def get_post_detail_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
):
    return content_queries.get_post_by_id(id)


@router.delete("/api/delete/{id}")
def delete_post_by_id(
    id: str,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    get = content_queries.get_post_by_id(id)
    creator = get["user_id"]
    if account["id"] == creator:
        return content_queries.delete_post(id)
    else:
        raise HTTPException(status_code=401, detail="not working")


@router.put("/api/post/{id}", response_model=PostOutDetail)
def update_post_by_id(
    id: str,
    description: EditPost,
    content_queries: ContentQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    get = content_queries.get_post_by_id(id)
    creator = get["user_id"]
    if account["id"] == creator:
        return content_queries.edit_post(id, description)
    else:
        raise HTTPException(status_code=401, detail="not working")


@router.get("/api/subraddit/{subraddit}", response_model=PostsList)
def get_post_detail_by_subraddit(
    subraddit: str,
    content_queries: ContentQueries = Depends(),

):
    return content_queries.get_posts_by_subraddit(subraddit)
