import { cn } from "./utils/cn";

const BlueTipBox = ({
  children,
  className = "",
  icon = "",
}) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg bg-blue-50 text-blue-700 border border-blue-200",
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

export default BlueTipBox;
