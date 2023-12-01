from typing import Optional, Generic, TypeVar
from pydantic import BaseModel, Field


T = TypeVar("T")


class UserSchema(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None

    class Config:
        from_attributes = True


class RegisterUserSchema(UserSchema):
    confirm_password: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class RecipeSchema(BaseModel):
    id: int
    user_id: Optional[str] = None
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
