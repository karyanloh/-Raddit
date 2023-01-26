from fastapi.testclient import TestClient
from main import app
from content_queries import ContentQueries
from model import PostOutDetail, PostList


client = TestClient(app)

post_list = PostList(
    posts=[
        {
            "id": "63c9b4a3011d0138870969ca",
            "title": "Great title",
            "description": "Testing",
            "subraddit": "Tech",
            "user_id": "63c730233d31b1c1c0a41cf5",
        }
    ]
)


class FakeContentQueries:
    def get_all_posts(self):
        return post_list


def test_get_all_posts():
    app.dependency_overrides[ContentQueries] = FakeContentQueries
    response = client.get("/api/posts")

    assert response.status_code == 200
    assert response.json() == post_list
