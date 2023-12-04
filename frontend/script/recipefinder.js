import { displayRecipes } from "./recipes.js"
import { BASE_URL } from "./settings.js";


let options = {
    maxCalories: 500,
    cuisineTypes: [],
    timeToCook: 120
}



const searchForRecipes = async () => {
    hideFinalView();

    const request = {
        "options": {
            "search": "pasta",
            "cuisine": null,
            "max_time": options.timeToCook,
            "max_calories": options.maxCalories 
        }
    }
    await fetch(BASE_URL + '/recipes/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayRecipes(JSON.parse(data.message).results)
    })
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
