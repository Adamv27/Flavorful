import { user } from "../script/user.js"


const exportData = () => {
    if (!user.get_token()){
        alert("You must be signed in to export data") 
        return
    }

    const userData = { recipes: [] }
    for (let i = 0; i < localStorage.length; i++) {
        let recipe = user.get_recipe_from_cache(localStorage.key(i))
        userData.recipes.push(recipe)
    }

    const jsonString = JSON.stringify(userData)
    const blob = new Blob([jsonString], {type: "application/json"})
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "recipe_data" 

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

const clearData = () => {
    if (!user.get_token()) {
        alert("You must be signed in to clear data")
        return
    }
    localStorage.clear()
    alert("Your data has been cleared")
}



document.getElementById("clear").addEventListener("click", clearData)
document.getElementById("export").addEventListener("click", exportData); 
