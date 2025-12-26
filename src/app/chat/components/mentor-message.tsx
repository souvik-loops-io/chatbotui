import React from 'react';

type MentorMessageProps = {
    message: { text: string };
    isUser: boolean;
    getPersonaModeDisplay?: () => string;
    imageUrl?: string;
    fileName?: string;
};

const MentorMessage: React.FC<MentorMessageProps> = ({
    message,
    isUser,
    getPersonaModeDisplay,
    imageUrl,
    fileName,
}) => {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
            <div className={`rounded-lg px-4 py-2 ${isUser ? 'bg-purple-100 text-right' : 'bg-gray-100 text-left'}`}>
                <div>{message.text}</div>
                {fileName && <div className="text-xs text-gray-400">{fileName}</div>}
                {imageUrl && <img src={imageUrl} alt="uploaded" className="max-w-xs mt-2 rounded" />}
            </div>
        </div>
    );
};

export default MentorMessage;