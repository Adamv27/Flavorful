from fastapi.responses import JSONResponse


async def integrity_error_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"message": "This recipe already exists in the database"}
    )

async def recipe_does_not_exist_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"message": "Can not update recipe. This recipe does not exist."}
    )
