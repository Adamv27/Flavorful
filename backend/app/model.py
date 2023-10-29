from sqlalchemy import Column, Integer, String
from app.config import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    image_url = Column(String)
