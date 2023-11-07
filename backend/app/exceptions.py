from fastapi import status, HTTPException


class RecipeDoesNotExistError(Exception):
    pass


class InvalidLoginError(Exception):
    pass


class CredentialsException(HTTPException):
    def __init__(self):
        super(status_code=status.HTTP_401_UNAUTHORIZED,
              detail="Could not validate credentials",
              headers={"WWW-Authenticate": "Bearer"})


class UserRegistrationError(Exception):
    pass
