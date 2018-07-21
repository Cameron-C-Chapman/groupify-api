# groupify

### API

Return all saved albums for the given user.
* GET   /albums
```
/albums?limit=10&offset=0
```

Return an array of boolean values determining if each of the given album id(s) are saved into the given users library. 
* GET   /albums/contains
```
/albums/contains?ids=3TVXtAsR1Inumwj472S9r4,2o9McLtDM7mbODV7yZF2mc
```

Return all saved tracks for the given user.
* GET   /tracks
```
/tracks?limit=10&offset=0
```