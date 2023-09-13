import {Schema, model} from  "mongoose";

interface IUser {
  username: string
}


const userSchema = new Schema<IUser>({
  username:{type: String, requiered: true}
});


export const User = model<IUser>("User", userSchema);
