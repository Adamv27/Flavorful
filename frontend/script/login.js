const form = document.getElementById("login-form")


const login = async () => {
    let response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        body: new FormData(form),
        mode: 'no-cors'
    })
    return response.json()
}


window.addEventListener("load", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        login().then(data => console.log(data));
    });
});
