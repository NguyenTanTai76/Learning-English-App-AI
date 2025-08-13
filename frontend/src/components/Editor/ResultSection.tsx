import React from "react";
import Button from "./Button";
import { FaCheck } from "react-icons/fa";

interface ResultSectionProps {
  title: string;
  text: string;
  onAccept: () => void;
  icon: React.ReactNode;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  title,
  text,
  onAccept,
  icon,
}) => {
  if (!text) return null;
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <p className="mb-4">{text}</p>
      <Button onClick={onAccept} icon={<FaCheck />}>
        Accept
      </Button>
    </div>
  );
};

export default ResultSection;
