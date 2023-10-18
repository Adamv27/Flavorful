const resultsContainer = document.getElementById('results-container')


const display_recipes = (recipes) => {
    let div;
    let img; 
    let title;
    for (let recipe of recipes) {
        div = document.createElement('div');
        img = document.createElement('img');
        title = document.createElement('p');

        img.src = recipe.image;
        title.textContent = recipe.title;
        div.appendChild(img);
        div.appendChild(title);
        resultsContainer.appendChild(div)
        console.log(recipe)      
    }
}


const search_for_recipes = async () => {
    const response = await fetch('../script/recipe_request.json')
    return response.json()
}


search_for_recipes().then((data) => display_recipes(data.results))
