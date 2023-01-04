## API Design

### Get a list of Posts
* Endpoint path: /Raddit
* Endpoint method: GET
* Response: A list of user posts
* Response shape:
    ```json
    {
      "posts": [
        {
          "title": string,
          "upvote_count": number,
          "number_of_comments": number
        }
      ]
    }
    ```

### Get detail of a Post
* Endpoint path: /Raddit/id
* Endpoint method: GET
* Response: A detailed view of a single post
* Response shape:
    ```json
    {
      "post": [
        {
          "title": string,
          "content" : string,
          "upvote_count": number,
        }
      ]
    }
    ```
### Get comments
* Endpoint path: /Raddit/id/comments
* Endpoint method: GET
* Response: A list of comments for a post
* Response shape:
    ```json
    {
      "post": [
        {
          "body" : string,
          "upvote_count": number,
        }
      ]
    }
    ``` 

### Create a new post

* Endpoint path: /Raddit
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "title": string,
      "text": string,
      "my_profile":boolean,
      "subraddit_choice":string
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```
    
### Post comments 
* Endpoint path: /Raddit/id/comments/id
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token
  
* Response: A list of comments for a post
* Response shape:
    ```json
    {
      "post": [
        {
          "title": string,
          "comments" : {<<key>>: type>>} 
        }
      ]
    }
    ```    

### Delete comments 
* Endpoint path: /Raddit/id/comments/id
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Delete a comment
* Response shape (JSON):
    ```json
    true
    ``` 

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
      "account": {
        «key»: type»,
      },
      "token": string
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

### Update

* Endpoint path: /Raddit
* Endpoint path: /Raddit/<int:pk>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token


* Response: Update a post
* Response shape:
    ```json

* Endpoint path: Raddit/comments/<int:pk>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

  
* Response: Update a Comment
* Response shape:
    ```json

### Delete a raddit post

* Endpoint path: /raddit
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
        {
            "id": integer
        }
    ```

* Response: Return message for successful deletion of post
* Response shape (JSON):
    ```json
        {
            'message': 'Deleted post'
        }
    ```
