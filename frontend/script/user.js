
export const user = {
    set_token(new_token) {
        console.log("setting token to: " + new_token)
        sessionStorage.setItem('access_token', new_token)
    },

    get_token() {
        return sessionStorage.getItem("access_token") || null;
    },

    cache_recipe_details(recipe_id, details) {
        const recipe = localStorage.getItem(recipe_id)
        if (recipe == null)
            localStorage.setItem(recipe_id, JSON.stringify(details))
    },

    get_recipe_from_cache(recipe_id) {
        return JSON.parse(localStorage.getItem(recipe_id))
    }
}

