import React, { useState } from "react";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import FileUploadBubble from "./file-upload-bubble";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

import { cn } from "@/src/lib/utils";
import { Brain, BookOpen, HelpCircle, Lightbulb, MessageSquare, Zap } from "lucide-react";

interface MentorQuickActionsProps {
  onQuickAction: (actionType: string) => void;
  isPending: boolean;
}

const quickActions = [
  {
    key: "create-note",
    icon: (
      <MessageSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" />
    ),
    label: "Create Note",
    description: "Add a new note",
    testId: "button-create-note",
  },
  {
    key: "solve-problem",
    icon: <HelpCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
    label: "Solve Problem",
    description: "Step-by-step help",
    testId: "button-solve-problem",
  },
  {
    key: "explain-concept",
    icon: <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    label: "Explain Concept",
    description: "Make it clear",
    testId: "button-explain-concept",
  },
  // {
  //   key: "help-confused",
  //   icon: <Brain className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  //   label: "I'm Stuck",
  //   description: "Break it down",
  //   testId: "button-help-confused",
  // },
  {
    key: "study-tips",
    icon: <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />,
    label: "Study Tips",
    description: "Learn smarter",
    testId: "button-study-tips",
  },
  {
    key: "quiz-practice",
    icon: <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    label: "Quiz Me",
    description: "Test yourself",
    testId: "button-quiz-practice",
  },
  // {
  //   key: "organize-notes",
  //   icon: (
  //     <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
  //   ),
  //   label: "Organize Notes",
  //   description: "Stay organized",
  //   testId: "button-organize-notes",
  //   className: "flex items-center gap-2 h-auto p-3 rounded-full border-2",
  // },
  {
    key: "solve-image",
    icon: <Brain className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
    label: "Solve Image",
    description: "Solve from image",
    testId: "button-solve-image",
  },
];

export const MentorQuickActions: React.FC<MentorQuickActionsProps> = ({
  onQuickAction,
  isPending,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
    {quickActions.map((action) => (
      <Button
        key={action.key}
        type="button"
        variant="outline"
        onClick={() => onQuickAction(action.key)}
        disabled={isPending}
        data-testid={action.testId}
        className="flex items-center gap-1 h-8 px-2 py-1 rounded-full border-2 border-gray-400 dark:border-gray-600 text-sm"
      >
        <span className="font-medium ml-1">{action.label}</span>
      </Button>
    ))}
  </div>
);
