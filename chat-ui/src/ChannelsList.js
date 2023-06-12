import React, { useState, useEffect } from 'react';

const ChannelsList = ({ selectedChannel, setSelectedChannel }) => {
    const [channels, setChannels] = useState([]);
    const [newChannelName, setNewChannelName] = useState('');

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await fetch('/channels');
            const data = await response.json();
            setChannels(data);
        };
        fetchChannels();
    }, []);

    const handleAddChannel = async () => {
        const response = await fetch('/channels', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newChannelName }),
        });

        if (response.ok) {
            const newChannel = await response.json();
            setChannels([...channels, newChannel]);
            setNewChannelName('');
        }
    };

    return (
        <div className="flex flex-col w-1/4 p-4 bg-gray-100 border-r">
            <input
                type="text"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                placeholder="New channel..."
                className="mb-4 p-2 border rounded-md"
            />
            <button onClick={handleAddChannel} className="mb-4 p-2 bg-blue-500 text-white rounded-md">Add Channel</button>
            <ul>
                {channels.map((channel) => (
                    <li
                        key={channel.id}
                        className={`p-2 rounded-md ${selectedChannel === channel.id ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setSelectedChannel(channel.id)}
                    >
                        {channel.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelsList;