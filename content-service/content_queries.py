import pymongo
import os
from bson import ObjectId

dbuser = os.environ['MONGO_USER']
dbpass = os.environ['MONGO_PASSWORD']
dbhost = os.environ['WAIT_HOSTS']
mongodb = os.environ['DATABASE_NAME']

mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"

client = pymongo.MongoClient(mongo_str)

class ContentQueries:
    def create_post(self, new_post):
        db = client[mongodb]
        result = db.posts.insert_one(new_post.dict())
        post = self.get_post_by_id(result.inserted_id)
        return post

    def get_post_by_id(self, id):
        db = client[mongodb]
        result = db.posts.find_one({ "_id": ObjectId(id) })
        result['id'] = str(result['_id']) # ObjectId
        return result

    def delete_post(self, id):
        db = client[mongodb]
        result = db.posts.delete_one({ "_id": ObjectId(id) })
        return 'Post Deleted'

    def edit_post(self, id, description):
        db = client[mongodb]
        a = description
        print(a)
        result = db.posts.update_one({ "_id": ObjectId(id) }, {"$set": {"description": a.description}})
        return 'Post Edited'
