const handleLogin = (e) => {
    e.preventDefault();

    authenticateUser(username, password)
        .then((response) => {
            const accessToken = response.data.accessToken;
            localStorage.setItem("authToken", accessToken);
            setSessionToken(accessToken);

            const params = new URLSearchParams(window.location.search);
            const next = params.get('next');

            if (next) {
                window.location.href = next;
            } else {
                window.location.href = "/home";
            }
        })
        .catch(() => {
            setLoginError("Login failed");
        });
};
