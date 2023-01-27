## Raddit

* Jeffery Hebert
* Mack Hill
* Randy Angel
* Stephanie Loh
* Yuki (Minyue) Lu

Raddit - a social news website.

Raddit - vote for your favorite contents.

## Design

* [API design](https://gitlab.com/group-03-raddit-reactors/raddit-new/-/blob/main/docs/API-Design.md)
* [Wireframe](https://gitlab.com/group-03-raddit-reactors/raddit-new/-/blob/main/docs/wireframe.md)

## Intended Market

Raddit is a social news website and forum where content is promoted by its site members through voting. Members of Raddit can post new contents in the subraddits(sports, music, movies, technology and miscellaneous). Posts can then be liked (upvoted) or disliked (downvoted) to allow more popular content to gain more visibility.

## Functionality

* As a user I can sign up or log in and log out.
    - to sign up a new user must click on signup in the navbar
        - the sign up form requires a new user to enter in a username, password and email
    - to login a user must click on login in the navbar
        - the login form require a user to enter in their username and password
    - to log out a user clicks the logout button on the navbar

* As a viewer I will not need to be logged to view a posts.
    - All users can see all posts on the main page

* As a logged in user I will be able to create new posts.
    - to create a new post, a logged in user must click on create a post and fill out the form
    - the create a post form includes a title, description, and subraddit dropdown menu

* As a logged in user I will be able to edit existing posts that I have written.
    - to edit a signed in user's post, on the post the user wants to edit, a user clicks the edit button below the post description

* As a logged in user I will be able to delete posts that I have written using the front-end single page application.
    - to delete a signed in user's post, on the post the user wants to delete, a user clicks the delete button below the post description

* As a logged in user I can vote on whether or not I like (upvote) or dislike (downvote) a post.
    - to up or down vote on a post, a logged in user can click the up or down arrows next to the post they want to vote on
    - a signed in user can vote on the main page or the post detail page by clicking on the post title

* As a viewer I will be able to filter posts by selecting a topic(subraddit) in the front-end even if I am logged out.
    - to view posts filtered by subraddits any user can click the subraddit tab and choose the filter they would like to see posts

* As a logged in user I will be able to respond(comment) on existing posts made by myself or by other users.
    - to comment on posts, a signed in user must click on the title of the post which takes them to the post detail of that post
    - once on the post detail of a post, a signed in user can type in their comment(s) and then click add a comment button
    - the comment will show up underneath the post and be visible by all users

* As a viewer I will be able to see a post detail and comments associated with that post.
    - to view post detail and comments of a post, all users are able to click on the title of the post in the main page
    - when a user clicks on the title of the post it takes them to the post detail page where the comments and score are displayed



## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create mongo-data`,`docker volume create mongo2-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Go to `http://localhost:3000/raddit-new/` to explore this application~
