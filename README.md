# groupify

## API

#### Health

Make sure this bad boy is even running.
* GET   /health/ping
```
/health/ping
```

#### User

Get the user profile for the given user.
* GET   /user/me
```
/user/me
```

Get a specific user profile by id.
* GET   /user/:id
```
/user/:spotifyUserId
```

Create a user.
* POST  /user
```
/user
```
Example post body:
```
{
    "username": "Johnny",
    "displayName": "Johnny",
    "email": "johnny@jam.com",
    "spotifyUrl": "https://open.spotify.com/user/9999999999999",
    "spotifyUri": "spotify:user:9999999999999",
    "spotifyId": "9999999999999"
}
```

#### Group

Return all groups.
* GET   /group
```
/group
```

Return group by id.
* GET   /group/:groupId
```
/group/:groupId
```

Return all groups for the given user id.
* GET   /group/user/:userId
```
/group/user/:userId
```

Create a group.
* POST  /group
```
/group
```
Example post body:
```
{
    "name": "User's First Epic Playlist",
    "user_id": 99
}
```

#### Library

Return all saved albums for the given user.
* GET   /library/albums
```
/library/albums?limit=10&offset=0
```

Return an array of boolean values determining if each of the given album id(s) are saved into the given users library. 
* GET   /library/albums/contains
```
/library/albums/contains?ids=3TVXtAsR1Inumwj472S9r4,2o9McLtDM7mbODV7yZF2mc
```

Return all saved tracks for the given user.
* GET   /library/tracks
```
/library/tracks?limit=10&offset=0
```

#### Playlists

Get the playlists for the given user.
* GET   /playlist/me
```
/playlist/me
```

Get the playlist by playlist id and user id.
* GET   /playlist/:playlistId/user/:userId
```
/playlist/:playlistId/user/:spotifyUserId
```

Get the playlists for a specific spotify user id.
* GET   /playlist/user/:spotifyUserId
```
/playlist/user/:spotifyUserId
```
