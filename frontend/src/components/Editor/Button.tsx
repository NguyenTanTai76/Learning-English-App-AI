import React from "react";

import type { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, icon }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
);

export default Button;
