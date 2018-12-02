// require("dotenv").config();

var keys = require("./key.js");
var fs = require("fs");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moviekey = keys.imdbkey;
// var spotify = keys.spotify;
var defaultSong = "The Sign";
var defaultBand = "Ace of Base";
var defaultMovie = "Mr. Nobody";
var input1 = process.argv[2];
var input2 = process.argv[3];

searchSpotify = function () {
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
    }
};

function findMovie()

function begin(input1, input2) {
    switch (input1) {
        case "my-tweets":
            searchTweet(); break;

        case "spotify-this-song":
            if (input2 === undefined) {
                input2 = defaultSong;
            }
            searchSpotify(input2); break;
        case "movie-this":
            if (input2 === undefined) {
                input2 = defaultMovie;
            }
            searchMovie(input2); break;
        case "do-what-it-says":
            doWhatItSays(); break;
        default:
            console.log("Invalid Input.  Use any these to continue concert-this, spotify-this-song, movie-this, do-what-it-says")

    };
};

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');

        searchSong(txt[1]);
    })
}

begin(input1, input2);