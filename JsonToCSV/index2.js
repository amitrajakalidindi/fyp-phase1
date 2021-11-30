const fs = require("fs");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
	path: 'userPlaylist.csv',
	header: [
	  {id: 'userId', title: 'userId'},
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
    var userId = 1;
    for(i = 0; i < len; i++){
        tracksLength = songs.playlists[i].tracks.length;
        if(tracksLength != 0){
            for(j = 0; j < tracksLength; j++){
				artist_name = songs.playlists[i].tracks[j].artist_name;
				track_name = songs.playlists[i].tracks[j].track_name;
				if(artist_name.match("^[a-zA-Z0-9 ]+$") && track_name.match("^[a-zA-Z0-9 ]+$")){
					var x = `{ "userId" : "${userId}" , "song" : "${track_name}" }`;
					var obj = JSON.parse(x);
					data.push(obj);
				}
            }
            userId += 1;
        }
    }
	  csvWriter.writeRecords(data).then(()=> console.log('Complete'));
    
  } catch (err) {
    console.log("Error", err);
  }
});
