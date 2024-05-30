import { useEffect, useRef, useState } from 'react';
import { Send } from "lucide-react";
import { Chatword, ChatDetails } from '@/types/ModelTypes';
import axiosClient from '@/config/axiosClient';
import { UUID } from 'crypto';
import { axiosConfig } from '@/config/axiosConfig';
import { patchFetch } from 'next/dist/server/app-render/entry-base';

interface ChatProps {
    Chat: Chatword;
    id: string;
    userid: string | undefined;
}

export default function Chat({ Chat, id, userid}: ChatProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [ newInputValue, setNewInputValue ] = useState('');
    const [ messages, setMessages] = useState<Chatword>({ Chat: [ { message: "Hola, soy FRIDA Research Engine!", role: "chat" },
    { message: "¿En qué te puedo ayudar?", role: "chat" }]})

    const fetchMessages = async () => {
        const config = axiosConfig();
        if (!config) return;

        try {
            const response = await axiosClient.post(`/document/get_all_messages`,{id: id, userid : userid}, config);
            const pastMessages = response.data; 

            const historicMessages: Chatword = { 
                Chat: [
                    ...messages.Chat, 
                    ...pastMessages
                ]
            };

            setMessages(historicMessages);
        } catch (error) {
            console.error("Error fetching past messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [id, userid]);

    


    const newMessage: React.FormEventHandler = async (e) => {
        e.preventDefault();
        const userMessage = newInputValue;
        if (!userMessage.trim()) return;
    
        setNewInputValue('');
    
        const newMessages: Chatword = { 
            Chat: [
                ...messages.Chat, 
                {
                    message: userMessage,
                    role: 'user'
                }
            ]
        };
        setMessages(newMessages);
    
        const config = axiosConfig();
        if (!config) return;
    
        const data = { id: id, userid: userid,query: userMessage };
        console.log(data);
    
        try {
            const response = await axiosClient.post("/document/get_message", data, config);
            console.log(response.data["msg"]);
            const botMessage = response.data["msg"];
    
            setMessages(prevMessages => ({
                Chat: [
                    ...prevMessages.Chat, 
                    {
                        message: botMessage,
                        role: 'chat'
                    }
                ]
            }));
        } catch (error) {
            console.error("Error fetching chat response:", error);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col overflow-y-auto">
                {messages.Chat.map((message, index) => (
                    message.role === "chat" ? (
                        <div className="flex flex-row w-full justify-start mt-2" key={index}>
                            <div className="bg-blueFrida-300 text-lg font-mono rounded-lg mx-4 p-3">
                                {message.message}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row w-full justify-end mt-2" key={index}>
                            <div className="bg-purpleFrida-700 text-lg font-mono text-white p-3 rounded-lg mx-4">
                                {message.message}
                            </div>
                        </div>
                    )
                ))}
                <div ref={bottomRef} />
            </div>
            <div className="relative mt-1">
                <form className="input-form" onSubmit={newMessage}>
                    
                    <input
                        type="text"
                        placeholder="Preguntar a Frida..."
                        className="w-full rounded-lg border-2 border-gray-100 py-2 pl-5 pr-10 transition"
                        value={newInputValue}
                        onChange={e => setNewInputValue(e.currentTarget.value)}
                    />
                    <button type="submit"><Send className="absolute bottom-0 right-3 top-0 m-auto h-8" /></button>
                </form>
                
		    </div>
        </div>
    );
}

