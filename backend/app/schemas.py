from typing import List, Optional, Generic, TypeVar
from pydantic import BaseModel, Field
from pydantic.generics import GenericModel


T = TypeVar("T")


class RecipeSchema(BaseModel):
    id: Optional[int]=None
    title: Optional[str]=None
    image: Optional[str]=None

    class Config:
        orm_mode = True


class RequestRecipe(BaseModel):
    parameter: RecipeSchema = Field(...)


class Response (GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]
