import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChannelsList from './ChannelsList';
import MessagesPanel from './MessagesPanel';

const MainChat = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [selectedChannel, setSelectedChannel] = useState(parseInt(channelId) || null);

    // If the component loads with a channel ID in the URL, set it as the selected channel.
    useEffect(() => {
        if (selectedChannel) {
            navigate(`/chat/${selectedChannel.id}`);
        }
    }, [selectedChannel, navigate]);

    const handleChannelSelect = (channelId) => {
        setSelectedChannel(channelId);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r">
                <ChannelsList selectedChannel={selectedChannel} setSelectedChannel={handleChannelSelect} />
            </div>
            <div className="w-3/4">
                <MessagesPanel selectedChannel={selectedChannel} />
            </div>
        </div>
    );
};

export default MainChat;