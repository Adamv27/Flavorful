const resultsContainer = document.getElementById('results-container')


const displayRecipes = (recipes) => {
    let card, cardBody, img, title, link;
    for (let recipe of recipes) {
        card = document.createElement('div');
        card.classList.add('card', 'recipe');

        img = document.createElement('img');
        img.src = recipe.image;
        img.alt = "";
        card.appendChild(img);
        
        cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        title = document.createElement('h4');
        title.classList.add('card-title');
        title.textContent = recipe.title;
        
        link = document.createElement('a');
        link.classList.add('btn', 'btn-primary');
        link.textContent = 'View Recipe';
        
        cardBody.appendChild(title);
        cardBody.appendChild(link);      
        card.appendChild(cardBody);
        resultsContainer.appendChild(card);
    }
}


const searchForRecipes = async () => {
    const response = await fetch('../script/recipe_request.json')
    return response.json()
}


searchForRecipes().then((data) => displayRecipes(data.results))
