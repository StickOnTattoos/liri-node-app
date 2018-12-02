console.log("this is loaded");

exports.spotify = {
    id: ProcessingInstruction.env.SPOTIFY_ID,
    secret: ProcessingInstruction.env.SPOTIFY_SECRET
};

exports.imdbkey = "b9ea9ebe"