const fs = require("fs");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
	path: 'artist_song.csv',
	header: [
	  {id: 'artist', title: 'artist'},
	  {id: 'song', title: 'song'},
	]
  });
var data = [];
var songs;

fs.readFile("./songs.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error", err);
    return;
  }
  try {
    songs = JSON.parse(jsonString);
    var len = songs.playlists.length;
    var i, j, tracksLength, artist_name, track_name;
    for(i = 0; i < len; i++){
        tracksLength = songs.playlists[i].tracks.length;
        if(tracksLength != 0){
            for(j = 0; j < tracksLength; j++){
				artist_name = songs.playlists[i].tracks[j].artist_name;
				track_name = songs.playlists[i].tracks[j].track_name;
				if(artist_name.match("^[a-zA-Z0-9 ]+$") && track_name.match("^[a-zA-Z0-9 ]+$")){
					var x = `{ "artist" : "${artist_name}" , "song" : "${track_name}" }`;
					var obj = JSON.parse(x);
					data.push(obj);
				}
            }
        }
    }
	  csvWriter.writeRecords(data).then(()=> console.log('Complete'));
    
  } catch (err) {
    console.log("Error", err);
  }
});
