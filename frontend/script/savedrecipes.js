import { user } from "./user.js"
import { displayRecipes, toggleSaveRecipeIcon } from "./recipes.js"
import { BASE_URL } from "./settings.js"

const URL = BASE_URL + "/recipes" 


const load_recipes = async () => {
    const token = user.get_token()
    if (token)
        await get_user_recipes(token)
}

// All recipes that are saved under the users account
let allRecipes;

const get_user_recipes = async (token) => {
    if (!token) return

    fetch(URL + "/saved", { 
        method: "GET",
        headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`},
    })
    .then(response => response.json())
    .then(data => {
        allRecipes = data.recipes

        const user_cached_recipes = []
        allRecipes.forEach(recipe => {
            let cached_recipe = user.get_recipe_from_cache(recipe.id)
            if (cached_recipe != null) {
                cached_recipe.image = recipe.image
                user_cached_recipes.push(cached_recipe) 
            }
        })

        displayRecipes(user_cached_recipes)
        data.recipes.forEach(recipe => {
            toggleSaveRecipeIcon(recipe.id);
        })
    });
}


const searchForRecipe = searchName => {
    const recipesToShow = allRecipes.filter((recipe) => recipe.title.includes(searchName));
    recipesToShow.forEach(recipe => document.getElementById(recipe.id).style.display = "Flex")

    const recipesToHide = allRecipes.filter(recipe => !recipesToShow.includes(recipe))
    recipesToHide.forEach(recipe => document.getElementById(recipe.id).style.display = "None") 
}


document.addEventListener("DOMContentLoaded", async () => {
    await load_recipes()
    document.getElementById("recipe-input").addEventListener("keyup", (e) => {searchForRecipe(e.target.value)})
}, false);
