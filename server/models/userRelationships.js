import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userRelationshipSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    friend: { type: Schema.Types.ObjectId, ref: "user", required: true },
    relationship: { type: String, required: true}
  });

const relationshipModel = mongoose.model("user_relationship", userRelationshipSchema);

export default relationshipModel;