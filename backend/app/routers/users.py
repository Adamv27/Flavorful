from typing import Annotated
from datetime import timedelta
from app.database import get_db
from sqlalchemy.orm import Session
from app.exceptions import InvalidLoginException
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from app.schemas import Token, UserSchema, RegisterUserSchema
from app.login import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise InvalidLoginException

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me")
async def read_users_me(current_user: Annotated[UserSchema, Depends(get_current_user)]):
    return current_user


@router.post("/register")
async def register_new_user(
    new_user: Annotated[RegisterUserSchema, Depends()],
    db: Annotated[Session, Depends(get_db)]
):
    return JSONResponse(content=f"Registered: {new_user.username} {new_user.password}",
                        headers={"Access-Control-Allow-Origin": "http://127.0.0.1:8080"})
