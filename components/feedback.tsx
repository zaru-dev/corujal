import { ReactNode } from "react";

interface FeedbackProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

export function Feedback({ icon, text, className }: FeedbackProps) {
  return (
    <div className={`flex gap-2 items-center p-2 border rounded-md text-sm ${className}`}>
      {icon} <p>{text}</p>
    </div>
  );
};