import pymongo
import os
from bson import ObjectId

mongodb = os.environ["DATABASE_NAME"]


mongo_str = os.environ["DATABASE_URL"]

client = pymongo.MongoClient(mongo_str)


class UserQueries:
    def create_user(self, new_user):
        db = client[mongodb]
        if db.users.find_one({"username": new_user.username}) is None:
            result = db.users.insert_one(new_user.dict())
            user = self.get_user_by_id(result.inserted_id)
            return user
        else:
            return None

    def get_user_by_id(self, id):
        db = client[mongodb]
        result = db.users.find_one({"_id": ObjectId(id)})
        result["id"] = str(result["_id"])
        return result

    def get_by_username(self, username):
        db = client[mongodb]
        result = db.users.find_one({"username": username})
        try:
            result["id"] = str(result["_id"])
            return result
        except Exception as e:
            print(e)
