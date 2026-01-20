const LoadingSpinner = ({ 
  message = "Loading...", 
  subMessage = "Please wait while we fetch the data.",
  fullScreen = true,
  size = "large" 
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12", 
    large: "w-16 h-16"
  };

  const containerClasses = fullScreen 
    ? "min-h-screen bg-section-alt flex items-center justify-center"
    : "flex items-center justify-center py-8";

  return (
    <div className={containerClasses}>
      <div className="text-center animate-pulse">
        <div className={`${sizeClasses[size]} bg-red-600 rounded-full mx-auto mb-4 animate-bounce`}></div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">{message}</h2>
        <p className="text-secondary">{subMessage}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;