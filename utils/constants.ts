import { Chatword } from "@/types/ModelTypes";

export const ItemTypes = {
    TAB: 'tab',
};


export const chatData: Chatword = {
  Chat: [
    { Message: "Hello! How can I assist you today?", role: "bot" },
    { Message: "I'm having trouble logging in.", role: "user" },
    { Message: "Did you forget your password?", role: "bot" },
    { Message: "No, I'm sure I'm using the right password.", role: "user" },
    { Message: "Can you try resetting your password just in case?", role: "bot" },
    { Message: "Okay, I've reset my password and I can log in now. Thanks!", role: "user" },
    { Message: "You're welcome! Is there anything else I can help with?", role: "bot" },
    { Message: "Yes, how do I update my profile picture?", role: "user" },
    { Message: "You can update your profile picture in the account settings.", role: "bot" },
    { Message: "Found it, thanks!", role: "user" },
    { Message: "Is there anything else I can assist you with?", role: "bot" },
    { Message: "No, that's all for now.", role: "user" },
    { Message: "If you have any more questions, feel free to ask. Have a great day!", role: "bot" },
    { Message: "Will do. Thanks for the help!", role: "user" },
    { Message: "You're welcome! Goodbye!", role: "bot" }
  ]
};
