
export const user = {
    set_token(new_token) {
        console.log("setting token to: " + new_token)
        sessionStorage.setItem('access_token', new_token)
    },

    get_token() {
        return sessionStorage.getItem("access_token") || null;
    }
}

