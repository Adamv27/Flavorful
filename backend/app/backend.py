from fastapi import FastAPI

from app import model
from app.config import engine
from app.routers import recipes
from app.routers import users


model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(recipes.router)
app.include_router(users.router)


@app.get("/")
def home():
    return "HOME PAGE"
