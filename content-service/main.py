from fastapi import FastAPI, Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from content_queries import ContentQueries
from auth import authenticator
from routers import posts, comments, score



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(score.router)
