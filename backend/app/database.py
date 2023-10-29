from sqlalchemy.orm import Session
from app.model import Recipe
from app.schemas import RecipeSchema


def get_recipe(db:Session, skip:int=0, limit:int=100):
    return db.query(Recipe).offset(skip).limit(limit).all()


def get_recipe_by_id(db:Session, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()


def create_recipe(db:Session, recipe: RecipeSchema):
    _recipe = Recipe(title=recipe.title, image=recipe.title)
    db.add(_recipe)
    db.commit()
    db.refresh(_recipe)
    return _recipe


def remove_recipe(db:Session, recipe_id:int):
    _recipe = get_recipe_by_id(db=db, recipe_id=recipe_id)
    db.delete(_recipe)
    db.commit()


def update_recipe(db:Session, recipe_id:int, title:str, image:str):
    _recipe = get_recipe_by_id(db=db, recipe_id=recipe_id)
    _recipe.title = title
    _recipe.image = image
    db.commit()
    db.refresh(_recipe)
    return _recipe


