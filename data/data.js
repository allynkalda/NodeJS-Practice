exports.getToken = () => (req, res, next) => {
    let newToken;
    if (token) {
        newToken = token;
        console.log('token', newToken)
    } else {
        if (newToken) return newToken
        console.log('token1', newToken)
    }
  };