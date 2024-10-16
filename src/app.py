from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/")
async def root():
    return {"MTA Data Challenge": "MTA Naughty Line, Nice Line"}
