export default function Spinner({
  size = "xxl",
  color = "indigo",
  className = "",
}) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24", // Much bigger
    xxl: "w-32 h-32", // Even bigger if needed
  };

  const colorClasses = {
    indigo: "text-indigo-600",
    gray: "text-gray-600",
    white: "text-white",
    stone: "text-stone-600",
  };

  return (
    <div
      className={`inset-0 z-50 flex items-center justify-center ${className}`}
    >
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          animate-spin 
          rounded-full 
          border-8 
          border-solid 
          border-current 
          border-t-transparent
        `}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
