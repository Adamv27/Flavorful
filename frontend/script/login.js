const form = document.getElementById("login-form")


const login = async (formData) => {
    let response = await fetch("http://127.0.0.1:8000/auth/test", {
        method: "POST",
        body: formData,
    })
    return response.json()
}


window.addEventListener("load", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(); 
        const username = document.getElementById("username-input").value;
        const password = document.getElementById("password-input").value;
        formData.append("username", username)
        formData.append("password", password)
        formData.append("grant_type", "password")
        console.log(formData)

        login(formData)
    });
});
