import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdDateByArtist: { type: Date, required: true },
    exhibition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exhibitions",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    artist: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    recordUrl: {
      type: String,
      required: false,
    },
    
  },
  {
    timestamps: true,
  }
);

const ArtworkModel = mongoose.model("artworks", artworkSchema);

export default ArtworkModel;
