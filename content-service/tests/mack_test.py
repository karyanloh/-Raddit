from fastapi.testclient import TestClient

from auth import authenticator
from main import app
from routers.score import PostScoreOut
from content_queries import ContentQueries


client = TestClient(app)

post_score_out = PostScoreOut(
    post_id="1",
    score=11,
)


class MockUser:
    user = {
        "user_id": "1a",
    }


class MockScore:
    def get_post_score_by_post_id(
        self,
        post_id,
    ):
        return post_score_out

    def increase_post_score_by_id(self, post_id, user_id):
        return post_score_out


def test_get_post_score_by_post_id():
    app.dependency_overrides[ContentQueries] = MockScore
    response = client.get("/api/post/postScore/1")
    assert response.status_code == 200
    assert response.json() == post_score_out


def test_increase_post_score_by_id():
    overrides = authenticator.try_get_current_account_data
    app.dependency_overrides[overrides] = lambda: None
    response = client.get(get)
    app.dependency_overrides[ContentQueries] = MockScore
    response = client.put("/api/postScore/upvote/1/1a")
    assert response.status_code == 200
    assert response.json() == post_score_out


app.dependency_overrides = {}
