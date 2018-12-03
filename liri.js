require('dotenv').config();

var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./key.js");
var omdb = require("omdb");

var defaultSong = "The Sign";
var defaultBand = "Ace of Base";
var defaultMovie = "Mr. Nobody";

var input1 = process.argv[2];
var input2 = process.argv[3];

var spotify = new Spotify(keys.spotify);

var x = "";
for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
        x = x + "+" + process.argv[i];
    } else {
        x = x + process.argv[i];
    }
};

function searchSpotify(song) {
    spotify.search({
        type: "track",
        query: song
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log("------------------------------");
                console.log("Artist: " + data.tracks.items[i].artists[0].name);
                console.log("Song name: " + data.tracks.items[i].name);
                console.log("Link: " + data.tracks.items[i].external_urls.spotify);
                console.log("Album: " + data.tracks.items[i].album.name);
                console.log("------------------------------");
            }
        }
    })
};

function searchConcert(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            var artistData = response.data;

            if (!artistData.length) {
                console.log("No results found for " + artist);
                return;
            };

            console.log("Upcoming concerts for " + artist + ":");

            for (var i = 0; i < artistData.length; i++) {
                var show = artistData[i];

                console.log(
                    show.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY")
                );
            }
        }
    );
};

var findMovie = function (movie) {
    if (movie === undefined) {
        movie = "Mr. Nobody";
    }

    var movieUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(movieUrl).then(
        function (response) {
            var movieData = response.data;
            console.log("Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("Rated: " + movieData.Rated);
            console.log("IMDB Rating: " + movieData.imdbRating);
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
        }
    )
};

switch (input1) {
    case "concert-this":
        if (input2 === undefined) {
            input2 = defaultBand;
        }
        searchConcert(input2); break;

    case "spotify-this-song":
        if (x === undefined) {
            x = defaultSong;
        }
        searchSpotify(x); break;
    case "movie-this":
        if (input2 === undefined) {
            input2 = defaultMovie;
        }
        findMovie(input1); break;
    case "do-what-it-says":
        doWhatItSays(); break;
    default:
        console.log("Error!  Use any these to continue concert-this, spotify-this-song, movie-this, do-what-it-says")

};


function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');

        searchSpotify(txt[1]);
    })
};