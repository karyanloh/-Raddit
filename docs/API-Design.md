## API Design

## POSTS

### Get a list of Posts
* Endpoint path: /api/posts
* Endpoint method: GET
* Response: A list of user posts
* Response shape:
    ```json
    {
      "posts": [
        {
          "id": string,
          "title": string,
          "description": string,
          "subraddit": string,
          "user_id": string
        }
      ]
    }
    ```

### Create a new post

* Endpoint path: /api/posts
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "title": string,
      "description": string,
      "subraddit": string,
      "user_id": string
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
      "id": string,
      "title": string,
      "subraddit": string
    }
    ```

### Get detail of a Post
* Endpoint path: /api/posts/{id}
* Endpoint method: GET
* Response: A detailed view of a single post
* Response shape:
    ```json
    {
      "id": string,
      "title": string,
      "description": string,
      "subraddit": string,
      "user_id": string
    }
    ```

### Update a raddit post

* Endpoint path: /api/posts/{id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request: Update a post
* Request body:
    ```json
    {
      "description": string
    }
    ```

* Response shape:
    ```json
    {
      "id": string,
      "title": string,
      "description": string,
      "subraddit": string,
      "user_id": string
    }
    ```

### Delete a raddit post

* Endpoint path: /api/delete/{id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Return message for successful deletion of post
* Response shape (JSON):
    ```json
        {
            'message': 'Deleted post'
        }
    ```

## Subraddit

### Get post detail by subraddit (filter)
* Endpoint path: /api/subraddit/{subraddit}
* Endpoint method: GET
* Response: Get post detail by subraddit
* Response shape:
    ```json
    {
      "posts": [
        {
          "id": string,
          "title": string,
          "subraddit": string
        }
      ]
    }
    ```

## Comments

### Post comments
* Endpoint path: /api/comments
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "post_id": string,
      "body": string,
      "user_id": string
    }
    ```

* Response: comment detail for a post
* Response shape:
    ```json
    {
      "post_id": string,
      "body": string,
      "user_id": string
    }
    ```

### Get comment detail by post_id
* Endpoint path: /api/comments/{post_id}
* Endpoint method: GET
* Response: A list of comments for a post
* Response shape:
    ```json
    {
      "comments": [
        {
          "id": string,
          "post_id": string,
          "body": string,
          "user_id": string
        }
      ]
    }
    ```

## PostScores

### Get all postscores
* Endpoint path: /api/postScore
* Endpoint method: GET
* Response: A list of postscores
* Response shape:
    ```json
    {
      "scores": [
        {
          "post_id": string,
          "score": int
        }
      ]
    }
    ```

### Get postscore for a specific post_id
* Endpoint path: /api/post/postScore/{post_id}
* Endpoint method: GET
* Response: postscore for a specific post_id
* Response shape:
    ```json
    {
      "post_id": string,
      "score": int
    }
    ```

### Increase post score by post id for a logged in user
* Endpoint path: /api/postScore/upvote/{post_id}/{user_id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Response:  postscore for a specific post_id
* Response shape:
    ```json
    {
      "post_id": string,
      "score": int
    }
    ```

### Decrease post score by post id for a logged in user
* Endpoint path: /api/postScore/downvote/{post_id}/{user_id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Response: postscore for a specific post_id
* Response shape:
    ```json
    {
      "post_id": string,
      "score": int
    }
    ```

## Log in & Sign up

### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "access_token": string,
      "token_type": Bearer
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

### Log in (Get token)

* Endpoint path: /token
* Endpoint method: GET

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "access_token": string,
      "token_type": Bearer,
      "account": {
        "email": string,
        "id": string,
        "username": string
      }
    }
    ```

### Sign up (create user)

* Endpoint path: /api/users
* Endpoint method: POST

* Response: Account information and a token
* Response shape (JSON):
    ```json
  {
    "email": string,
    "id": string,
    "username":string
  }
    ```

### Sign up (get user detail)

* Endpoint path: /api/users/{id}
* Endpoint method: GET

* Request shape (form):
  ```json
  {
    "email": string,
    "password": string,
    "username": string
  }
    ```

* Response: Account information and a token
* Response shape (JSON):
    ```json
  {
    "email":string,
    "id": string,
    "username": string
  }
    ```
