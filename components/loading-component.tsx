import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface IProps {
  className?: string;
}
const LoadingComponent = ({ className }: IProps) => {
  return (
    <div className={cn("min-h-[75vh] grid place-items-center", className)}>
      <Loader className="size-7 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingComponent;
