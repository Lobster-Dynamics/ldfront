import { useEffect, useRef } from 'react';
import { Send } from "lucide-react";
import { Chatword } from '@/types/ModelTypes';


interface ChatProps {
    Chat: Chatword;
}

export default function Chat({ Chat }: ChatProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [Chat.Chat]);

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col overflow-y-auto">
                {Chat.Chat.map((message, index) => (
                    message.role === "bot" ? (
                        <div className="flex flex-row w-full justify-start mt-2" key={index}>
                            <div className="bg-[#dbdeff] text-lg font-mono rounded-lg mx-4 p-3">
                                {message.Message}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row w-full justify-end mt-2" key={index}>
                            <div className="bg-purple-700 text-lg font-mono text-white p-3 rounded-lg mx-4">
                                {message.Message}
                            </div>
                        </div>
                    )
                ))}
                <div ref={bottomRef} />
            </div>
            <div className="bg-[#dadbdd] p-1 h-10 w-full mt-4 flex flex-row justify-between">
                <input
                    type="text"
                    className="w-10/12 p-2 bg-[#dadbdd]"
                />
                <Send className="mr-2 mt-1 text-2xl" />
            </div>
        </div>
    );
}

