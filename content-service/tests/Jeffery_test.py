from fastapi.testclient import TestClient
from main import app
from content_queries import ContentQueries
from model import commentList

client = TestClient(app)

comment_List = commentList(
    comments=[
        {
            "id": "53c9b4a3011d0138870969dz",
            "post_id": "63c9b4a3011d0138870969ca",
            "body": "we are testing",
            "user_id": "63c730233d31b1c1c0a41cf5",
        }
    ]
)


class MockCommentQueries:
    def get_comments_by_post_id(self, post_id):
        return comment_List


def test_get_comment():
    request = {
        "id": "53c9b4a3011d0138870969dz",
        "post_id": "63c9b4a3011d0138870969ca",
        "body": "we are testing",
        "user_id": "63c730233d31b1c1c0a41cf5",
    }
    app.dependency_overrides[ContentQueries] = MockCommentQueries
    response = client.get("/api/comments/{post_id}", json=request)
    actual = response.json()
    assert actual == comment_List
    assert response.status_code == 200
