import React, { useState, useEffect, useRef } from 'react';
import MessageEntry from './MessageEntry';

const MessagesPanel = ({ selectedChannel }) => {
    const [messages, setMessages] = useState([]);
    const lastMessageIdRef = useRef(null); // Keep track of the last message ID

    useEffect(() => {
        if (!selectedChannel) return;

        let isMounted = true; // flag to prevent state updates after unmount
        let intervalId = null;

        const fetchMessages = async () => {
            const response = await fetch(`/messages?channelID=${selectedChannel.id}`);
            const data = await response.json();
            if (isMounted) {
                let messageData = data || [];
                setMessages(messageData);
                lastMessageIdRef.current = messageData.length > 0 ? messageData[messageData.length - 1].id : null;
            }
        };

        fetchMessages();

        intervalId = setInterval(() => {
            if (lastMessageIdRef.current !== null) {
                fetch(`/messages?channelID=${selectedChannel.id}&lastMessageID=${lastMessageIdRef.current}`)
                    .then(response => response.json())
                    .then(newMessages => {
                        if (isMounted && Array.isArray(newMessages) && newMessages.length > 0) {
                            setMessages((messages) => {
                                const updatedMessages = [...messages, ...newMessages];
                                lastMessageIdRef.current = updatedMessages[updatedMessages.length - 1].id;
                                return updatedMessages;
                            });
                        }
                    });
            }
        }, 5000); // Poll every 5 seconds

        return () => {
            isMounted = false; // prevent further state updates
            clearInterval(intervalId); // clear interval on unmount
        };
    }, [selectedChannel]);

    return (
        <div className="flex flex-col h-full">
            {selectedChannel && (
                <div className="bg-gray-700 text-white p-2">
                    Messages for {selectedChannel.name}
                </div>
            )}
            <div className={`overflow-auto flex-grow ${selectedChannel && messages.length === 0 ? 'flex items-center justify-center' : ''}`}>
                {selectedChannel ? (
                    messages.length > 0 ? (
                        messages.map((message) => (
                            <div key={message.id} className="p-2 border-b">
                                <strong>{message.user_name}</strong>: {message.text}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">
                            No messages yet! Why not send one?
                        </div>
                    )
                ) : (
                    <div className="p-2">Please select a channel</div>
                )}
            </div>
            {selectedChannel && (
                <MessageEntry
                    selectedChannel={selectedChannel}
                    onNewMessage={(message) => {
                        lastMessageIdRef.current = message.id;
                        setMessages([...messages, message])
                    }
                    }
                />
            )}
        </div>
    );
};

export default MessagesPanel;