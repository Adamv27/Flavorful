from fastapi import FastAPI
from app.routers import recipes

app = FastAPI()

app.include_router(recipes.router)


@app.get("/")
def home():
    return "HOME PAGE"
