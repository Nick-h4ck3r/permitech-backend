import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  body: string;
  tags: string[];
  published: boolean;
  user: mongoose.Types.ObjectId;
}

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<INote>("Note", noteSchema);
