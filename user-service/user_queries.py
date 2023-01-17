import pymongo
import os
from bson import ObjectId

dbuser = os.environ["MONGO_USER"]
dbpass = os.environ["MONGO_PASSWORD"]
dbhost = os.environ["WAIT_HOSTS"]
mongodb = os.environ["DATABASE_NAME"]

mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"

client = pymongo.MongoClient(mongo_str)


class UserQueries:
    def create_user(self, new_user):
        db = client[mongodb]
        result = db.users.insert_one(new_user.dict())
        user = self.get_user_by_id(result.inserted_id)
        return user

    def get_user_by_id(self, id):
        db = client[mongodb]
        result = db.users.find_one({"_id": ObjectId(id)})
        result["id"] = str(result["_id"])  # ObjectId
        return result

    def get_by_username(self, username):
        db = client[mongodb]
        result = db.users.find_one({"username": username})
        try:
            result["id"] = str(result["_id"])  # ObjectId
            return result
        except Exception as e:
            print(e)
