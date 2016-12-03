import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Pokemon = new Schema({
    name: {type: String, index: true},
    url: {type: String, index: true}
});

export default mongoose.model("Pokemon", Pokemon);