import { messageModel } from "../db/models/message-schema.js";

export const messageController = {
    async addMessage(request, response) {
        try {
            const messageInfo = request.body;
            const doc = await messageModel.create({
                message: { text: messageInfo.message },
                receiver: [messageInfo.from, messageInfo.to],
                sender: messageInfo.from
            });
            if (doc && doc._id) {
                response.json({ msg: "Message added successfully" });
            }
            else {
                response.json({ msg: "failed to add message to database" });
            }
        }
        catch (err) {
            console.log(err);
            response.json({ msg: "failed to add message to database" });
        }
    },
    async getAllMessage(request, response) {
        try {
            const messageInfo = request.body;
            const messages = await messageModel.find({
                receiver: {
                    $in: messageInfo.to
                }
            });
            const ProjectMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === messageInfo.from,
                    message: msg.message.text
                };
            });
            response.json(ProjectMessages);
        }
        catch (err) {
            console.log(err);
        }
    }
}