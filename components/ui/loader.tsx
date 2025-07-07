import { Loader as Loader2 } from "lucide-react";

interface LoaderProps {
  size?: number
}

export function Loader({ size }: LoaderProps ) {
  return <Loader2 className="animate-spin" size={ size ?? 18 } />
}