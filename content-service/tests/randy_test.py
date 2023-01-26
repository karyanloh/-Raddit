from fastapi.testclient import TestClient
from main import app
from content_queries import ContentQueries
from model import PostOutDetail

client = TestClient(app)

post_detail_out = PostOutDetail(
    id="63c9b4a3011d0138870969ca",
    title="testing create post",
    description="we are testing",
    subraddit="Tech",
    user_id="63c730233d31b1c1c0a41cf5",
)


class MockPostQueries:
    def get_post_by_id(self, id):
        return post_detail_out


def test_get_post_detail():
    request = {
        "id": "63c9b4a3011d0138870969ca",
        "title": "testing create post",
        "description": "we are testing",
        "subraddit": "Tech",
        "user_id": "63c730233d31b1c1c0a41cf5",
    }
    app.dependency_overrides[ContentQueries] = MockPostQueries
    response = client.get("/api/post/{id}", json=request)
    actual = response.json()
    assert actual == post_detail_out
    assert response.status_code == 200
