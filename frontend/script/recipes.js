import { user } from "./user.js"
import { BASE_URL } from "./settings.js"

const resultsContainer = document.getElementById("results-container");

const URL = BASE_URL + "/recipes";


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
    
    user.cache_recipe_details(recipe.id, recipe)

    const saved_recipe = {
        id: recipe.id,
        user_id: null,
        title: recipe.title,
        image_url: recipe.image,
    }
    let response = await fetch(URL + "/add", {
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
       
    const url = URL + "/remove/" + recipeID
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


const buildModal = (recipe) => {
    const modal = document.getElementById("exampleModal").cloneNode(true);
    modal.id = "modal" + recipe.id;

    modal.querySelector('.btn.visit').href = recipe.sourceUrl
    modal.querySelector('.modal-body').innerHTML = recipe.summary;
    modal.querySelector('.modal-title').textContent = recipe.title;

    return modal;
}


export const displayRecipes = (recipes) => {
    let card; 
    let modal;
    for (let recipe of recipes) {
        // Clone base recipe card tempalte
        card = document.getElementById("card-template").cloneNode(true);
        modal = buildModal(recipe);
        resultsContainer.appendChild(modal);

        card.dataset.bsTarget = "#" + modal.id 

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

        card.addEventListener("click", async e => {
            if (e.target.classList.contains("save-button") || e.target.classList.contains("bookmark-image"))
                $('#modal' + recipe.id).modal('hide')
        })

        resultsContainer.appendChild(card);
    }
}

