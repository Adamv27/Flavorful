const resultsContainer = document.getElementById('results-container')


const toggleSaveRecipe = (recipeID) => {
    let recipeCard = document.getElementById(recipeID);
    let saveButton = recipeCard.querySelector(".save-button"); 
    saveButton.classList.toggle("saved");
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


//searchForRecipes().then((data) => displayRecipes(data.results))

const toggleOptionViews = (prevID, newID) => {
    let prevOptionView = document.getElementById(prevID);
    prevOptionView.classList.remove('current');
    let newOptionView = document.getElementById(newID);
    newOptionView.classList.add('current');
}


let currentOptionIndex = 0;
let optionIDs = ["time-option", "calories-option", "cuisine-option"];

const nextOption = () => {
    if (currentOptionIndex + 1 < optionIDs.length) {
        let prevID = optionIDs[currentOptionIndex];
        currentOptionIndex += 1;
        let newID = optionIDs[currentOptionIndex];
        toggleOptionViews(prevID, newID)
    }
}

const prevOption = () => {
    if (currentOptionIndex - 1 >= 0) {
        let prevID = optionIDs[currentOptionIndex];
        currentOptionIndex -= 1;
        let newID = optionIDs[currentOptionIndex];
        toggleOptionViews(prevID, newID);
    }
}



