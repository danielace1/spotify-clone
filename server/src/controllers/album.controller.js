import Album from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    console.log("Error in get all albums controller: ", error);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id).populate("songs");

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  } catch (error) {
    console.log("Error in get album by id controller: ", error);
    next(error);
  }
};
