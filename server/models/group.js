import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, required: true},
    profile_picture: { type: String, required: false},
    private: { type: Boolean, required: true}
  });

const communityModel = mongoose.model("group", groupSchema);

export default communityModel;