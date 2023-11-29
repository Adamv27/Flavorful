from fastapi import status, HTTPException


class RecipeDoesNotExistError(Exception):
    pass


class InvalidLoginError(Exception):
    pass


class CredentialsException(Exception):
    def __init__(self, **kwargs):
        self.message = "Could not validate credentials"
        if "message" in kwargs.keys():
            self.message = kwargs["message"]


class UserRegistrationError(Exception):
    def __init__(self, **kwargs):
        self.message = "Unable to register. Invalid username or password"

        if "message" in kwargs.keys():
            self.message = kwargs["message"]
