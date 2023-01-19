import pymongo
import os
from bson import ObjectId

dbuser = os.environ["MONGO_USER"]
dbpass = os.environ["MONGO_PASSWORD"]
dbhost = os.environ["WAIT_HOSTS"]
mongodb = os.environ["DATABASE_NAME"]

mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"

client = pymongo.MongoClient(mongo_str)


class ContentQueries:

    # posts

    def create_post(self, new_post):
        db = client[mongodb]
        result = db.posts.insert_one(new_post.dict())
        post = self.get_post_by_id(result.inserted_id)
        return post

    def get_all_posts(self):
        db = client[mongodb]
        result = db.posts.find({})
        posts = list(result)
        for i in range(len(posts)):
            posts[i]['id'] = str(posts[i]['_id'])
        results = {"posts": posts}
        return results

    def get_post_by_id(self, id):
        db = client[mongodb]
        result = db.posts.find_one({"_id": ObjectId(id)})
        result["id"] = str(result["_id"])  # ObjectId
        return result

    def delete_post(self, id):
        db = client[mongodb]
        result = db.posts.delete_one({"_id": ObjectId(id)})
        return "Post Deleted"

    def edit_post(self, id, description):
        db = client[mongodb]
        a = description
        result = db.posts.update_one(
            {"_id": ObjectId(id)}, {"$set": {"description": a.description}}
        )
        post = self.get_post_by_id(id)
        return post

# subraddits
    def get_posts_by_subraddit(self, subraddit):
        db = client[mongodb]
        results = db.posts.find({"subraddit": subraddit})
        results = list(results)
        for i in range(len(results)):
            results[i]["id"] = str(results[i]["_id"])  # ObjectId
        real_results = {"posts": results}
        return real_results

# comments
    def create_comment(self, new_comment):
        db = client[mongodb]
        result = db.comments.insert_one(new_comment.dict())
        comment = self.get_comment_by_id(result.inserted_id)
        return comment

    def get_comment_by_id(self, id):
        db = client[mongodb]
        result = db.comments.find_one({"_id": ObjectId(id)})
        result["id"] = str(result["_id"])  # ObjectId
        return result

    def get_comments_by_post_id(self, post_id):
        db = client[mongodb]
        results = db.comments.find({"post_id": post_id})
        results = list(results)
        for i in range(len(results)):
            results[i]["id"] = str(results[i]["_id"])  # ObjectId
        real_results = {"comments": results}
        return real_results

    def delete_comment(self, id):
        db = client[mongodb]
        result = db.comments.delete_one({"_id": ObjectId(id)})
        return "Comment Deleted"

    def edit_comment(self, id, body):
        db = client[mongodb]
        result = db.comments.update_one(
            {"_id": ObjectId(id)}, {"$set": {"body": body.body}}
        )
        comment = self.get_comment_by_id(id)
        return comment

    def create_post_score(self, new_post_score):
        db = client[mongodb]
        result = db.postVotes.insert_one(new_post_score)
        post_score = self.get_post_score_by_id(result.inserted_id)
        return post_score

    # scores

    def get_post_score_by_id(self, id):
        db = client[mongodb]
        result = db.postVotes.find_one({"_id": ObjectId(id)})
        result["id"] = str(result["_id"])  # ObjectId
        return result

    def get_post_score_by_post_id(self, post_id):
        db = client[mongodb]
        result = db.postVotes.find_one({"post_id": post_id})
        result["id"] = str(result["_id"])  # ObjectId
        return result

    def edit_post_score(self, id, score):
        db = client[mongodb]
        result = db.postVotes.update_one(
            {"_id": ObjectId(id)},
            {
                "$set": {
                    "score": score.score,
                    "upvoted_users": score.upvoted_users,
                    "downvoted_users": score.downvoted_users,
                }
            },
        )
        post_score = self.get_post_score_by_id(id)
        return post_score

    def delete_post_score(self, id):
        db = client[mongodb]
        result = db.postVotes.delete_one({"_id": ObjectId(id)})
        return "Vote Deleted"
