const login_form = document.getElementById("login-form")
const signup_form = document.getElementById("signup-form")

BASE_URL = "http://127.0.01:8000/auth/"


const signup = async () => {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const confirm_password = document.getElementById("confirm-password-input").value;
    const url = BASE_URL + `register?username=${username}&password=${password}&confirm_password=${confirm_password}`
    
    await fetch(url, {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

const login = async () => {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    
    const url = BASE_URL + `username=${username}&password=${password}` 
    await fetch(url, {
        method: "POST",
        mode: "no-cors",

    })
}


window.addEventListener("load", () => {
    login_form?.addEventListener("submit", (e) => {
        e.preventDefault();
        login()
    });

    signup_form?.addEventListener("submit", (e) => {
        e.preventDefault();
        signup()
    })
});
