import React, { useState } from 'react';

const MessageEntry = ({ selectedChannel, onNewMessage }) => {
    const [text, setText] = useState('');

    const handleSendMessage = async () => {
        const userID = localStorage.getItem('userId');

        const response = await fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channelID: selectedChannel, userID, text }),
        });

        if (response.ok) {
            const message = await response.json();
            onNewMessage(message);
            setText('');
        } else {
            alert('Failed to send message');
        }
    };

    return (
        <div className="p-4 border-t flex">
            <input
                type="text"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="p-2 flex-grow border rounded-md mr-2"
            />
            <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-md"
            >
                Send
            </button>
        </div>
    );
};

export default MessageEntry;