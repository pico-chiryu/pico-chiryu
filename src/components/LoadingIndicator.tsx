import React from 'react';
interface LoadingIndicatorProps {
isLoading: boolean;
}
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
if (!isLoading) return null;
return (
<div className="flex justify-center items-center">
<img
     src="images/favicon.png"
     alt="Loading"
     className="animate-spin-slow h-8 w-8"
   />
</div>
);
};
export default LoadingIndicator;
