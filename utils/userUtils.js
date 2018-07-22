module.exports = {
    
    mergeUserTypes: (spotifyUser, groupifyUser) => {
        spotifyUser.user_id = groupifyUser.id,
        spotifyUser.first_name = groupifyUser.first_name,
        spotifyUser.last_name = groupifyUser.last_name,
        spotifyUser.phone_number = groupifyUser.phone_number
        return spotifyUser;
    }
    
}