import { useEffect, useRef, useState } from 'react';
import { Send } from "lucide-react";
import { Chatword, ChatDetails } from '@/types/ModelTypes';
import axiosClient from '@/config/axiosClient';
import { axiosConfig } from '@/config/axiosConfig';
import { ScanSearch } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setHighlights } from '@/redux/slices/highlightSlice';

interface ChatProps {
    id: string;
}

export default function Chat({ id }: ChatProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [ newInputValue, setNewInputValue ] = useState('');
    const [ messages, setMessages] = useState<Chatword>({ Chat: [ {mes_id:"", message: "Hola, soy FRIDA Research Engine!", role: "chat" },
    { mes_id:"", message: "¿En qué te puedo ayudar?", role: "chat" }]})
    
    const dispatch = useDispatch();

    const fetchMessages = async () => {
        const config = axiosConfig();
        if (!config) return;

        try {
            const response = await axiosClient.post(`/document/get_all_messages`,{id: id}, config);
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
    }, [id]);

    
    const newMessage: React.FormEventHandler = async (e) => {
        e.preventDefault();
        const userMessage = newInputValue;
        if (!userMessage.trim()) return;
    
        setNewInputValue('');
    
        const newMessages: Chatword = { 
            Chat: [
                ...messages.Chat, 
                {
                    mes_id: "",   
                    message: userMessage,
                    role: 'user'
                }
            ]
        };
        setMessages(newMessages);
    
        const config = axiosConfig();
        if (!config) return;
    
        const data = { id: id, query: userMessage };
        console.log(data);
    
        try {
            const response = await axiosClient.post("/document/get_message", data, config);
            const botMessage = response.data;
    
            setMessages(prevMessages => ({
                Chat: [
                    ...prevMessages.Chat, 
                    {
                        mes_id: botMessage["mes_id"],
                        message: botMessage["message"],
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

    const handleReferenceButton = async (mes_id: string) => {
        const config = axiosConfig();
        if (!config) return;
    
        const data = { doc_id: id, id: mes_id };
        console.log(data);

        try {
            const response = await axiosClient.post("/document/get_highlights", data, config);
            const highlights = response.data;
            
            dispatch(setHighlights(highlights));
        } catch (error) {
            console.error("Error fetching chat response:", error);
        }
    }

    return (
        <div className="flex flex-col justify-between h-full" data-test-id="chatComponent">
            <div className="flex flex-col overflow-y-auto">
                {messages.Chat.map((message, index) => (
                    message.role === "chat" ? (
                        <div className="flex flex-row w-full justify-start mt-2" key={index} data-test-id="chatMessageItem" >
                            <div className="bg-blueFrida-300 text-lg font-mono rounded-lg mx-4 p-3">
                                {message.message}
                                {" "}
                                {message.mes_id != "" && (
                                <button className="hover:text-purple-500 flex items-center" onClick={() => handleReferenceButton(message.mes_id)}>
                                    <ScanSearch />
                                </button>
                                )}
                            </div>
                            
                            
                        </div>
                    ) : (
                        <div className="flex flex-row w-full justify-end mt-2" key={index} data-test-id="chatMessageItem" >
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
                        data-test-id="chatInput"
                    />
                    <button type="submit"><Send className="absolute bottom-0 right-3 top-0 m-auto h-8" /></button>
                </form>
                
		    </div>
        </div>
    );
}

