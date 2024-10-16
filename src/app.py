from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=True,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/mta-nn")
async def get_naughty_nice_line(year: str, month: str):



@app.get("/")
async def root():
    return {"message": "Hello World"}
