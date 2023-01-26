# from fastapi.testclient import TestClient
# from unittest import TestCase
# from routers.posts import get_post_detail_by_id
# from model import PostOutDetail
# from main import app
# from auth import authenticator
# from content_queries import ContentQueries

# def test_delete_build():
# // the same with randy's
#     response = client.delete("/api/post/1")

#     assert response.status_code == 200
#     assert response.json() == {"result": False}

# # app = FastAPI()
# # client = TestClient(app)
# # class TestContentQueries:
# #     def get_all(self):
# #         return PostList(

# #         )

# # def test_get_all_posts():
# #     app.dependency_overrides[ContentQueries]=TestContentQueries
# #     response = client.get("/api/posts")


# # post_detail_out = PostOutDetail(
# #     id="63c9b4a3011d0138870969ca",
# #     title="testing create post",
# #     description="we are testing",
# #     subraddit="Tech",
# #     user_id="63c730233d31b1c1c0a41cf5",
# # )

# # client = TestClient(app)


# # class FakePostDetailRepository:
# #     def get_post_by_id(self, id):
# #         return post_detail_out


# # def fake_authenticator():
# #     pass


# # def test_get_post_detail():
# #     app.dependency_overrides[
# #         authenticator.get_current_account_data
# #     ] = fake_authenticator
# #     app.dependency_overrides[ContentQueries] = FakePostDetailRepository
# #     response = client.get("/api/post/{id}")
# #     # assert response["id"] == "63c9b4a3011d0138870969ca"
# #     assert response.json() == post_detail_out
# #     assert response.status_code == 200

# # assert response.json() == post_detail_out


# # def test_get_token_returns_token_for_user_logged_in():
# #     user = {
# #         "id": 1,
# #         "email": "yuki@gmail.com",
# #         "username": "yuki520",
# #     }
# #     app.dependency_overrides[
# #         authenticator.try_get_current_account_data
# #     ] = lambda: user
# #     response = client.get(
# #         "/token", cookies={authenticator.cookie_name: "HELLO!"}
# #     )
# #     app.dependency_overrides = {}
# #     assert response.status_code == 200
# #     data = response.json()
# #     assert data["access_token"] == "HELLO!"
# #     assert data["token_type"] == "Bearer"

# # def test_get_post_by_id():
# #     app.dependency_overrides[
# #         get_post_detail_by_id.try_get_current_post_data
# #     ] = lambda: None
# #     response = client.get("/api/post/{id}")
# #     app.dependency_overrides = {}
# #     assert response.status_code == 200
# #     assert response.json() == None


# # def test_get_token_returns_none_for_user_not_logged_in():
# #     app.dependency_overrides[
# #         authenticator.try_get_current_account_data
# #     ] = lambda: None
# #     response = client.get("/token")
# #     app.dependency_overrides = {}
# #     assert response.status_code == 200
# #     assert response.json() == None

# from fastapi.testclient import TestClient
# from main import app
# from content_queries import ContentQueries

# # from unittest import TestCase
# # from routers.posts import get_post_detail_by_id
# from model import PostOutDetail
# from auth import authenticator

# client = TestClient(app)

# expected = {
#     "id": str,
#     "title": "Unit Test",
#     "description": "We are testing",
#     "subraddit": "Tech",
#     "user_id": str,
# }

# post_detail_out = PostOutDetail(
#     id="63c9b4a3011d0138870969ca",
#     title="testing create post",
#     description="we are testing",
#     subraddit="Tech",
#     user_id="63c730233d31b1c1c0a41cf5",
# )


# class MockPostQueries:
#     def create_post(self, new_post):
#         return expected

#     def get_post_by_id(self, id):
#         return post_detail_out


# def fake_authenticator():
#     pass


# # def test_create_post():
# #     app.dependency_overrides[
# #         authenticator.get_current_account_data
# #     ] = fake_authenticator
# #     # Arrange
# #     req = {
# #         "account": str,
# #         "title": "Unit Test",
# #         "description": "We are testing",
# #         "subraddit": "Tech",
# #     }
# #     app.dependency_overrides[ContentQueries] = MockPostQueries

# #     # Act
# #     resp = client.post("/api/posts", json=req)
# #     actual = resp.json()

# #     # Assert
# #     assert resp.status_code == 200
# #     assert actual == expected

# #     # Clean up
# #     app.dependency_overrides = {}


# def test_get_post_detail():
#     app.dependency_overrides[
#         authenticator.get_current_account_data
#     ] = fake_authenticator
#     request = {
#         "id": "63c9b4a3011d0138870969ca",
#         "title": "testing create post",
#         "description": "we are testing",
#         "subraddit": "Tech",
#         "user_id": "63c730233d31b1c1c0a41cf5",
#     }
#     app.dependency_overrides[ContentQueries] = MockPostQueries
#     response = client.get("/api/post/{id}", json=request)
#     actual = response.json()
#     # assert response["id"] == "63c9b4a3011d0138870969ca"
#     # assert response.json() == post_detail_out
#     assert actual == post_detail_out
#     assert response.status_code == 200

#     app.dependency_overrides = {}
