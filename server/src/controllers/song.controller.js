import Song from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }); // new one comes first

    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in get all songs controller: ", error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in get featured songs controller: ", error);
    next(error);
  }
};

//TODO: need to use ML model to get made for you songs
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in get featured songs controller: ", error);
    next(error);
  }
};

// TODO: need to use ML model to get trending songs
export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in get featured songs controller: ", error);
    next(error);
  }
};
