import { user } from "../script/user.js";

const resultsContainer = document.getElementById('results-container')


export const toggleSaveRecipe = (recipeID) => {
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


export const saveRecipe = async (recipe) => {
    const token = user.get_token()
    if (token == null) return
    
    const saved_recipe = {
        id: recipe.id,
        user_id: null,
        title: recipe.title,
        image_url: recipe.image,
    }

    fetch("http://127.0.0.1:8000/recipes/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({"recipe": saved_recipe})
    })
    .then(response => response.json())
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
            await saveRecipe(recipe)
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
const optionsContainer = document.getElementById("option-container")?.children;

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


document.getElementById("next-option")?.addEventListener("click", () => nextOption())
document.getElementById("prev-option")?.addEventListener("click", prevOption)
document.getElementById("search-button")?.addEventListener("click", searchForRecipes)

document.getElementById("time-15")?.addEventListener("click", () => nextOption(setTimeToCook, 15))
document.getElementById("time-30")?.addEventListener("click", () => nextOption(setTimeToCook, 30))
document.getElementById("time-60")?.addEventListener("click", () => nextOption(setTimeToCook, 60))
document.getElementById("time-120")?.addEventListener("click", () => nextOption(setTimeToCook, 120))

document.getElementById("max-calories-range")?.addEventListener("input", (e) => setMaxCalories(e.target.value))