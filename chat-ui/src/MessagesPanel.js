import React, { useState, useEffect } from 'react';
import MessageEntry from './MessageEntry';

const MessagesPanel = ({ selectedChannel }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (selectedChannel) {
            fetch(`/messages?channelID=${selectedChannel}`)
                .then(response => response.json())
                .then(data => setMessages(data));
        }
    }, [selectedChannel]);

    const handleNewMessage = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="overflow-auto">
                {selectedChannel ? (
                    messages.map((message) => (
                        <div key={message.id} className="p-2 border-b">
                            <strong>{message.userID}</strong>: {message.text}
                        </div>
                    ))
                ) : (
                    <div className="p-2">Please select a channel</div>
                )}
            </div>
            {selectedChannel && (
                <MessageEntry
                    selectedChannel={selectedChannel}
                    onNewMessage={handleNewMessage}
                />
            )}
        </div>
    );
};

export default MessagesPanel;