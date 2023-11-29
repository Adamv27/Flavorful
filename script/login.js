const login_form = document.getElementById("login-form")
const signup_form = document.getElementById("signup-form")

BASE_URL = "http://127.0.01:8000/auth/"


const signup = async () => {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const confirm_password = document.getElementById("confirm-password-input").value;
    const url = BASE_URL + `register?username=${username}&password=${password}&confirm_password=${confirm_password}`
    
    fetch(url, {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => console.log(data));
}



/*
* All actual input validation is done on the server side however empty
* inputs or inputs under 3 characters should not even attempt to login 
*/ 
const is_valid_input = word => {
    if (word === null || word.length < 3) {
        return false;
    }
    return true;
}


const login = async () => {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;

    if (!is_valid_input(username) || !is_valid_input(password)) {
        return;  
    }
    
    const url = BASE_URL + "token" 
    const data = `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=&`

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
    })
    .then(response => response.json())
    .then(data => me(data.access_token));
}

const me = async (token) => {
    if (token == null) return
    
    fetch(BASE_URL + "me", { 
        method: "GET",
        headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`},
    })
    .then(response => response.json())
    .then(data => console.log(data));
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
