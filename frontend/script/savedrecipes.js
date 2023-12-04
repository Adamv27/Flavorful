import { user } from "./user.js"
import { displayRecipes, toggleSaveRecipeIcon } from "./recipes.js"
import { BASE_URL } from "./settings.js"

const URL = BASE_URL + "/recipes" 


const load_recipes = async () => {
    const token = user.get_token()
    if (token)
        await get_user_recipes(token)
}


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
        displayRecipes(data.recipes)
        for (let recipe of data.recipes) {
            toggleSaveRecipeIcon(recipe.id);
        }
    });
}

document.addEventListener("DOMContentLoaded", load_recipes, false);
