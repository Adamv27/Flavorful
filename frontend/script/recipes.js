import { user } from "../script/user.js"

const resultsContainer = document.getElementById("results-container");

const BASE_URL = "http://127.0.0.1:8000/recipes"


export const toggleSaveRecipeIcon = (recipeID) => {
    let recipeCard = document.getElementById(recipeID);
    let bookmarkIcon = recipeCard.querySelector(".bookmark-image"); 
    if (bookmarkIcon.classList.contains("saved")) {
        bookmarkIcon.classList.remove("saved");
        bookmarkIcon.src = "../images/bookmark-off.svg";
    } else {
        bookmarkIcon.classList.add("saved");
        bookmarkIcon.src ="../images/bookmark-on.svg";
    }
}


const saveRecipe = async (recipe) => {
    const token = user.get_token()
    if (token == null) return false
    
    const saved_recipe = {
        id: recipe.id,
        user_id: null,
        title: recipe.title,
        image_url: recipe.image,
    }

    let response = await fetch("http://127.0.0.1:8000/recipes/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({"recipe": saved_recipe})
    })

    response = await response.json()
    // Recipe was already in the database for user
    if (response.code == 409 && response.status == "Conflict")
        return false 
    return true 
}

const removeRecipe = async recipeID => {
    const token = user.get_token()
    if (token == null) return
        
    const url = BASE_URL + "/remove/" + recipeID
    let response = await fetch(url, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    response = await response.json()
    if (response.code == 200 && location.href.endsWith("recipes.html"))
        document.getElementById(recipeID).remove()
}


export const displayRecipes = (recipes) => {
    let card; 
    for (let recipe of recipes) {
        // Clone base recipe card tempalte
        card = document.querySelector("div[data-type='template']").cloneNode(true);
        card.id = recipe.id;
        card.querySelector("img").src = recipe.image;
        card.querySelector(".card-title").textContent = recipe.title;
        card.style.display = "flex";
        card.querySelector(".save-button").addEventListener('click', async () => {
            toggleSaveRecipeIcon(recipe.id);
            if(!await saveRecipe(recipe)) {
                await removeRecipe(recipe.id)
            }
        });

        resultsContainer.appendChild(card);
    }
}

