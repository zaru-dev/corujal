import { ReactNode } from "react";

interface FeedbackProps {
  icon: ReactNode;
  text: string;
}

export function Feedback({ icon, text }: FeedbackProps) {
  return (
    <div className="flex gap-2 items-center p-2 border rounded-md mt-4 text-sm">
      {icon} <p>{text}</p>
    </div>
  );
};