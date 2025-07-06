import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, Smile, X } from "lucide-react";

interface FeedbackProps {
  text: string;
  className?: string;
}

const feedbackVariants = cva(
  "flex gap-2 items-center p-2 border rounded-md text-sm",
  {
    variants: {
      variant: {
        default: "bg-input/30 border",
        success:
          "bg-blue-highlight/10 text-blue-highlight border-blue-highlight/30",
        error:
          "bg-orange-highlight/8 text-orange-highlight border-orange-highlight/30",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

export function Feedback({
  className,
  variant,
  text,
}: React.ComponentProps<"div"> &
  VariantProps<typeof feedbackVariants> &
  FeedbackProps) {
  return (
    <div className={cn(feedbackVariants({ variant, className }))}>
      {variant === "success" ? (
        <Smile size={18} />
      ) : variant === "error" ? (
        <X size={18} />
      ) : (
        <AlertCircleIcon size={18} />
      )}

      <p>{text}</p>
    </div>
  );
};