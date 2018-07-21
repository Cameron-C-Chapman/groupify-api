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
/user/:spotify-user-id
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
