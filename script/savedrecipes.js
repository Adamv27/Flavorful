import { user } from "../script/user.js"
import { displayRecipes, toggleSaveRecipeIcon } from "./recipes.js"


const BASE_URL = "http://127.0.0.1:8000/recipes"

window.onload = () => {
    const token = user.get_token()
    if (token) {
        get_user_recipes(token)
    }
}


const get_user_recipes = async (token) => {
    if (!token) return

     fetch(BASE_URL + "/saved", { 
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
