module.exports = {
    
    getAccessTokenFromHeader: (authHeader) => {
        return authHeader.replace('Bearer ', '');
    }
    
}