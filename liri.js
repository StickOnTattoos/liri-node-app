require("dotenv").config();

var keys = require("./key.js");
var fs = require("fs");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var defaultSong = "The Sign";
var defaultBand = "Ace of Base";
var input1 = process.argv[2];
var input2 = process.argv[3];

var searchSpotify = function (input1) {
    if (song === undefined) {
        song = defaultSong
    } else {

    

    spotify.search(
        {
            type: "track",
            query: song
        },
        function (err, data) {
            if (err) {
                console.log("Error: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
            }
        }
    );
}};

searchSpotify(input1)

