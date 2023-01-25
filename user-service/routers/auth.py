import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from user_queries import UserQueries
from models import UserOut, User


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: UserQueries,
    ):
        return accounts.get_by_username(username)

    def get_account_getter(
        self,
        accounts: UserQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: User):
        return account["password"]

    def get_account_data_for_cookie(self, account: User):
        del account["password"]
        return account["username"], UserOut(**account)


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
