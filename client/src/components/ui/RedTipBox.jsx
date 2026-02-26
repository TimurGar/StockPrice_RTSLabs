import { cn } from "./utils/cn";

const RedTipBox = ({ children, className = "", icon = "" }) => {
  return (
    <div
      className={cn(
        "bg-red-100 border border-red-400 text-red-700 rounded-lg p-4",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0">{icon}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default RedTipBox;
