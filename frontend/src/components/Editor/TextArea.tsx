import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onMouseUp: () => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, onMouseUp }) => (
  <textarea
    value={value}
    onChange={onChange}
    onMouseUp={onMouseUp}
    placeholder="Type your text here..."
    rows={10}
    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  />
);

export default TextArea;
