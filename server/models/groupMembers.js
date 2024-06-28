import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupMemberSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    group: { type: Schema.Types.ObjectId, ref: "group", required: true },
    role: { type: String, required: true}
  });

const memberModel = mongoose.model("group_member", groupMemberSchema);

export default memberModel;