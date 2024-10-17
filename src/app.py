from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from postgres_orm import session, User

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:*",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/nani-lines")
async def get_naughty_nice_line(year: str = None, month: str = None):
    return 200


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/users")
def add_user(user: dict):
    with session as s:
        new_user = User(
            name=user['name'],
            fullname=user['fullname']
        )
        s.add(new_user)
        s.commit()


@app.get("/")
async def root():
    return {"MTA Data Challenge": "MTA Naughty Line, Nice Line"}
