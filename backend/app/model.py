from sqlalchemy import Column, Integer, String
from app.config import Base


class Recipe(Base):
    __tablename__ = "recipe"

    id = Colummn(Integer, primary_key=True)
    title=Column(String)
    image=Column(String)
