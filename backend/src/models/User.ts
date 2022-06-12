import { model, Schema } from "mongoose";

const schema = new Schema({
  username: String,
  id: String,
  password: String,
});
export default model("User", schema);
