import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ChannelsList from './ChannelsList';
import MessagesPanel from './MessagesPanel';

const MainChat = () => {
    const { channelId } = useParams();
    const history = useHistory();
    const [selectedChannel, setSelectedChannel] = useState(channelId || null);

    useEffect(() => {
        if (channelId) {
            setSelectedChannel(channelId);
        }
    }, [channelId]);

    const handleChannelSelect = (channelId) => {
        setSelectedChannel(channelId);
        history.push(`/chat/${channelId}`);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r">
                <ChannelsList selectedChannel={selectedChannel} onChannelSelect={handleChannelSelect} />
            </div>
            <div className="w-3/4">
                <MessagesPanel selectedChannel={selectedChannel} />
            </div>
        </div>
    );
};

export default MainChat;