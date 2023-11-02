const resultsContainer = document.getElementById('results-container')


const toggleSaveRecipe = (recipeID) => {
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
const toggleOptionViews = (prevOption, newOption) => {
    prevOption.classList.remove('current');
    newOption.classList.add('current');
}



let currentOptionIndex = 0;
const optionsContainer = document.getElementById("option-container").children;

let options = {
    maxCalories: 1000,
    cuisineTypes: []
}


const setTimeToCook = time => {
    options.timeToCook = time;
}

const setMaxCalories = calories => {
    options.maxCalories = calories;
    document.getElementById("calorie-range-display").textContent = calories;
}

const removeCuisineType = cuisineType => {
    options.cuisineTypes = options.cuisineTypes.filter(value => value != cuisineType);
}

const addCuisinType = cuisineType => {
    options.cuisineTypes.push(cuisineType);
}


const nextOption = (setValue = null, value = null) => {
    setValue?.(value);
    
    const oldOption = optionsContainer.item(currentOptionIndex);
    const newOption = optionsContainer.item(currentOptionIndex + 1);
    if (newOption && newOption.id !== "options-nav") {
        currentOptionIndex++;
        toggleOptionViews(oldOption, newOption);
    }
}

const prevOption = () => {
    const oldOption = optionsContainer.item(currentOptionIndex);
    const newOption = optionsContainer.item(currentOptionIndex -1);
    if (newOption) {
        currentOptionIndex--;
        toggleOptionViews(oldOption, newOption);
    }
 }


const updateRangeDisplay = value => {
    document.getElementById("calorie-range-display").textContent = value;
}


