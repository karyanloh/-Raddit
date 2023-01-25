from fastapi.testclient import TestClient
from routers.auth import authenticator
from main import app

client = TestClient(app)


def test_get_token_returns_none_for_user_not_logged_in():
    overrides = authenticator.try_get_current_account_data
    app.dependency_overrides[overrides] = lambda: None
    response = client.get("/token")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() is None


def test_get_token_returns_token_for_user_logged_in():
    user = {
        "id": "1",
        "email": "yuki@gmail.com",
        "username": "yuki520",
    }
    overrides1 = authenticator.try_get_current_account_data

    app.dependency_overrides[overrides1] = lambda: user
    response = client.get(
        "/token", cookies={authenticator.cookie_name: "HELLO!"}
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    data = response.json()
    assert data["access_token"] == "HELLO!"
    assert data["token_type"] == "Bearer"
    assert data["account"] == user
