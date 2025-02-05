import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return <button ref={ref} className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${className}`} {...props} />;
});

Button.displayName = "Button";

export { Button };
