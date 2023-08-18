import { Mongoose, SchemaTypes } from "mongoose";
import mongoose from "../connection.js";
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    message: {
        text: {
            type: SchemaTypes.String,
            required: true
        },
    },
    receiver:Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
    {
        timestamps: true
    }
);

export const messageModel = mongoose.model('message', messageSchema);

