# from fastapi import FastAPI
# from fastapi.testclient import TestClient
# from model import PostList
# from content_queries import ContentQueries

# app = FastAPI()
# client = TestClient(app)
# class TestContentQueries:
#     def get_all(self):
#         return PostList(

#         )

# def test_get_all_posts():
#     app.dependency_overrides[ContentQueries]=TestContentQueries
#     response = client.get("/api/posts")
