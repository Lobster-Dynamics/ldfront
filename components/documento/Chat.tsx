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
                            <div className="bg-blueFrida-300 text-lg font-mono rounded-lg mx-4 p-3">
                                {message.Message}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row w-full justify-end mt-2" key={index}>
                            <div className="bg-purpleFrida-700 text-lg font-mono text-white p-3 rounded-lg mx-4">
                                {message.Message}
                            </div>
                        </div>
                    )
                ))}
                <div ref={bottomRef} />
            </div>
            <div className="relative mt-1">
                <Send className="absolute bottom-0 right-3 top-0 m-auto h-8" />
                <input
                    type="text"
                    placeholder="Preguntar a Frida..."
                    className="w-full rounded-lg border-2 border-gray-100 py-2 pl-5 pr-10 transition"
                />
		    </div>
        </div>
    );
}

