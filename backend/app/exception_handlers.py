from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.exceptions import InvalidLoginError, RecipeDoesNotExistError, UserRegistrationError
from sqlalchemy.exc import IntegrityError


def add_global_exception_handler(app: FastAPI):

    @app.exception_handler(IntegrityError)
    async def integrity_error_handler(request, exc):
        return JSONResponse(
            status_code=400,
            content={"message": "This recipe already exists in the database"}
        )


    @app.exception_handler(RecipeDoesNotExistError)
    async def recipe_does_not_exist_handler(request, exc):
        return JSONResponse(
            status_code=400,
            content={"message": "Can not update recipe. This recipe does not exist."}
        )


    @app.exception_handler(InvalidLoginError)
    async def invalid_login_handler(request, exc):
        return JSONResponse(
            status_code=401,
            content={"message": "Invalid login"}
        )

    @app.exception_handler(UserRegistrationError)
    async def invalid_registration_handler(request, exc):
        return JSONResponse(
            status_code=401,
            content={"message": exc.message},
            headers={"Access-Control-Allow-Origin": "http://127.0.0.1:8080"}
        )
