from fastapi.testclient import TestClient
from main import app
from routers.score import PostScoreOut
import content_queries


post_score_out = PostScoreOut(post_id="63d18fffd31d0fa9b1cd7dd9", score=0)
client = TestClient(app)


class FakePostRepository:
    def get_score(self, post_id):
        return post_score_out


def test_get_post_score_by_post_id():

    app.dependency_overrides[content_queries] = FakePostRepository

    response = client.get("/api/post/postScore/63d18fffd31d0fa9b1cd7dd9")
    assert response.status_code == 200
    assert response.json() == post_score_out


# client = TestClient(app)


# def test_get_post_scores_by__post_id():
#     score = {
#         "post_id": "123456789012",
#         "score": 11,
#     }
#     response = client.get("api/post/postScore/123456789012")
#     assert response.status_code == 200
#     assert response.json() == score


# def test_get_post_scores_by_id():
#     score = {
#         "post_id": "1",
#         "score": 11,
#     }
#     response = client.get("api/postScore/123456789012")
#     assert response.status_code == 200
#     assert response.json() == score
