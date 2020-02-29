function login(body){
    return async(dispatch) => {
        const response = await dispatch('/api/login', {
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const responseBody = await response.json();
    if (response.status === 401 || response.status === 400) {
    this.setState({
        message: responseBody.message
    });
    return;
    }
    localStorage.setItem('user-jwt', responseBody.token);
    this.setState({
        redirectToReferrer: true,
    });
}
}