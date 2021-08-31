const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mohitChannel')
  .then(() => { console.log('connection successful');

    const playListSchema = mongoose.Schema({
        name: {
        type: String,
        required: true,
      },
      videos: Number,
      active: Boolean,
      author: String,
      date: {
        type: Date,
        default: Date.now,
      },
    });

    const Playlist = mongoose.model('PlayList', playListSchema); // collection named playlists created.

    const getDocument = async () => {
      const result = await Playlist.find();
      console.log(result);
    };

    getDocument();
  })
  .catch((err) => console.log(err));