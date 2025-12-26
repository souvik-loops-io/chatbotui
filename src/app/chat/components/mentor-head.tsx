import { Button } from "@/src/components/ui/button";
import React from "react";

interface MentorHeaderProps {
    onClearChat: () => void;
}

export function MentorHeader({ onClearChat }: MentorHeaderProps) {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="font-bold text-lg">Mentor Chat</span>
            <Button onClick={onClearChat} variant="outline" size="sm">
                Clear
            </Button>
        </div>
    );
}