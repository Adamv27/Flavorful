from typing import Optional, Generic, TypeVar
from pydantic import BaseModel, Field


T = TypeVar("T")


class RecipeSchema(BaseModel):
    id: Optional[int] = None
    title: Optional[str] = None
    image_url: Optional[str] = None

    class Config:
        from_attributes = True


class RequestRecipe(BaseModel):
    recipe: RecipeSchema = Field(...)


class Response(BaseModel, Generic[T]):
    code: int
    status: str
    message: str
    result: Optional[T] = None
