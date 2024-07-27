import mongoose from 'mongoose'

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birth: {
        type: Date,
        required: true,
    },
    death: {
        type: Date,
    }
});

// export default  mongoose.model('artists', ArtistSchema);

const artistsModel = mongoose.model("artists", ArtistSchema);

export default artistsModel;
