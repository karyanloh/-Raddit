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
    #posts
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
        result = db.posts.update_one({ "_id": ObjectId(id) }, {"$set": {"description": a.description}})
        post = self.get_post_by_id(id)
        return post

    # comments

    def create_comment(self, new_comment):
        db = client[mongodb]
        result = db.comments.insert_one(new_comment.dict())
        comment = self.get_comment_by_id(result.inserted_id)
        return comment

    def get_comment_by_id(self, id):
        db = client[mongodb]
        result = db.comments.find_one({ "_id": ObjectId(id) })
        result['id'] = str(result['_id']) # ObjectId
        return result

    def delete_comment(self, id):
        db = client[mongodb]
        result = db.comments.delete_one({ "_id": ObjectId(id) })
        return 'Comment Deleted'

    def edit_comment(self, id, body):
        db = client[mongodb]
        result = db.comments.update_one({ "_id": ObjectId(id) }, {"$set": {"body": body.body}})
        comment = self.get_comment_by_id(id)
        return comment
