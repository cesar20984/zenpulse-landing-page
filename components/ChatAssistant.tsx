"use client";

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";

const ChatAssistant = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true)
    }));
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await res.json();
            if (data.message) {
                setMessages([...newMessages, { role: "assistant", content: data.message }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-[100px] right-6 z-[60] md:bottom-[90px]">
            {isOpen ? (
                <div className="bg-white rounded-[2rem] shadow-2xl w-[350px] max-h-[500px] flex flex-col overflow-hidden border border-primary/10 animate-in slide-in-from-bottom duration-300">
                    <div className="bg-primary p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✨</div>
                            <span className="font-bold">Asistente ZenPulse</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white text-xl">×</button>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
                        {messages.length === 0 && (
                            <div className="text-center text-text/50 mt-10">
                                <p className="text-sm">¡Hola! Soy tu asistente ZenAI. ¿Tienes alguna duda sobre ZenPulse?</p>
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user" ? "bg-primary text-white" : "bg-background text-text"
                                    }`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-background p-3 rounded-2xl text-xs text-text/40 animate-pulse">Pensando...</div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-primary/5 bg-background/50 flex gap-2">
                        <input
                            type="text"
                            className="flex-1 bg-white border border-primary/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Pregunta algo..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            →
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 bg-cta text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all animate-bounce-slow"
                >
                    <span className="text-xl">💬</span>
                    <span className="font-bold text-sm hidden group-hover:inline transition-all">Consultar</span>
                </button>
            )}
        </div>
    );
});

ChatAssistant.displayName = "ChatAssistant";
export default ChatAssistant;
