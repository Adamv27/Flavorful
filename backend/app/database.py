from sqlalchemy.orm import Session
from app.models import Recipe, User
from app.schemas import RecipeSchema, UserSchema, RegisterUserSchema
from app.exceptions import RecipeDoesNotExistError
from app.config import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def add_user(db: Session, user: RegisterUserSchema):
    _user = User(username=user.username, hashed_password=user.password)
    db.add(_user)
    db.commit()
    db.refresh(_user)
    return _user


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def get_recipe(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Recipe).offset(skip).limit(limit).all()


def get_recipes_by_user_id(db: Session, user_id: str):
    return db.query(Recipe).filter(Recipe.user_id == user_id)


def get_recipe_by_id(db: Session, user_id: str, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id,
                                   Recipe.user_id == user_id).first()


def create_recipe(db: Session, recipe: RecipeSchema, user_id: str):
    _recipe = Recipe(id=recipe.id,
                     user_id=user_id,
                     title=recipe.title,
                     image_url=recipe.image_url)
    db.add(_recipe)
    db.commit()
    db.refresh(_recipe)
    return _recipe


def remove_recipe(db: Session, user_id: str, recipe_id: int):
    _recipe = get_recipe_by_id(db=db, user_id=user_id, recipe_id=recipe_id)
    if _recipe is None:
        return False
    db.delete(_recipe)
    db.commit()
    return True


def update_recipe(db: Session, user_id: str, recipe_id: int, title: str, image_url: str):
    _recipe = get_recipe_by_id(db=db, user_id=user_id, recipe_id=recipe_id)
    if _recipe is None:
        raise RecipeDoesNotExistError
    _recipe.title = title
    _recipe.image_url = image_url
    db.commit()
    db.refresh(_recipe)
    return _recipe
