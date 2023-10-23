const resultsContainer = document.getElementById('results-container')


const toggleSaveRecipe = (recipeID) => {
    let recipeCard = document.getElementById(recipeID);
    let saveButton = recipeCard.querySelector(".save-button"); 
    saveButton.classList.toggle("saved");
    console.log(saveButton);
}


const displayRecipes = (recipes) => {
    let card; 
    for (let recipe of recipes) {
        // Clone base recipe card tempalte
        card = document.querySelector("div[data-type='template']").cloneNode(true);
        card.id = recipe.id;
        card.querySelector("img").src = recipe.image;
        card.querySelector(".card-title").textContent = recipe.title;
        card.style.display = "flex";
        card.querySelector(".save-button").addEventListener('click', () => {
            toggleSaveRecipe(recipe.id);
        });

        resultsContainer.appendChild(card);
    }
}


const searchForRecipes = async () => {
    const response = await fetch('../script/recipe_request.json')
    return response.json()
}


searchForRecipes().then((data) => displayRecipes(data.results))
