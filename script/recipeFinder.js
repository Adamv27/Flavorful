const resultsContainer = document.getElementById('results-container')


const toggleSaveRecipe = (recipeID) => {
    let recipeCard = document.getElementById(recipeID);
    let saveButton = recipeCard.querySelector(".save-button"); 
    saveButton.classList.toggle("saved");
}


const displayRecipes = (recipes) => {
    let resultsTitle = document.createElement("h2");
    resultsTitle.textContent = "Results";
    resultsContainer.appendChild(resultsTitle);

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
    hideFinalView();

    await fetch('../script/recipe_request.json')
        .then(response => response.json())
        .then(data => displayRecipes(data.results));
}


const hideFinalView = () => {
    document.getElementById("advanced-options").classList.remove("current");
    document.getElementById("options-nav").style.display = "none";
}


/*   
* Given two element IDs, hide one and display the other.
*/
const toggleOptionViews = (prevID, newID) => {
    let prevOptionView = document.getElementById(prevID);
    prevOptionView.classList.remove('current');
    let newOptionView = document.getElementById(newID);
    newOptionView.classList.add('current');
}



// IDs of the option view containers in the order they are displayed
let optionIDs = ["time-option", "calories-option", "cuisine-option", "advanced-options"];
let currentOptionIndex = 0;

let options = {
    maxCalories: 1000,
    cuisineTypes: []
}


const setTimeToCook = time => {
    options.timeToCook = time;
}

const setMaxCalories = calories => {
    options.maxCalories = calories;
    document.getElementById("maxCaloriesButton").textContent = calories;
}

const removeCuisineType = cuisineType => {
    options.cuisineTypes = options.cuisineTypes.filter(value => value != cuisineType);
}

const addCuisinType = cuisineType => {
    options.cuisineTypes.push(cuisineType);
}


const nextOption = (setValue = null, value = null) => {
    setValue?.(value);

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



