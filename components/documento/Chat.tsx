import { Chatword } from "@/types/ModelTypes"
import { Send } from "lucide-react"

interface ChatProps {
    Chat: Chatword
}

export default function Chat({ Chat }: ChatProps) {

    return (

        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
                {Chat.Chat.map((message, index) => (
                    message.role === "bot" ? (
                        <div className="flex flex-row w-full justify-start mt-2" key={index}>
                            <div className="w-6/12 bg-[#dbdeff] rounded-lg mx-4 p-2">
                                {message.Message}
                            </div>
                        </div>
                    ) : (
                    
                        <div className="flex flex-row w-full justify-end mt-2" key={index}>
                            <div className="w-6/12 bg-purple-700  text-white p-2 rounded-lg mx-4">
                                {message.Message}
                            </div>
                        </div>

                    )
                ))}
            </div>
            <div className=" bg-[#dadbdd] p-1 h-10 w-full mt-4 flex flex-row justify-between ">
                <input
                    type="text"
                    className="w-10/12 p-2 bg-[#dadbdd]" 
                />
                <Send className="mr-2 mt-1 text-2xl" />
            </div>
        </div>



    )

}
