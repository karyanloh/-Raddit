# authenticator.py
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
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get_by_username(username)

    def get_account_getter(
        self,
        accounts: UserQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: User):
        # Return the encrypted password value from your
        # account object
        return account["password"]

    def get_account_data_for_cookie(self, account: User):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        del account["password"]
        return account["username"], UserOut(**account)


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
