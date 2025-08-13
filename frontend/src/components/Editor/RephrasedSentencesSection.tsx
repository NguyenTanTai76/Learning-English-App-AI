import React from "react";
import Button from "./Button";
import { FaSyncAlt, FaCheck } from "react-icons/fa";

interface RephrasedSentencesSectionProps {
  sentences: string[];
  onAccept: (sentence: string) => void;
}

const RephrasedSentencesSection: React.FC<RephrasedSentencesSectionProps> = ({
  sentences,
  onAccept,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6 my-8">
    <h3 className="text-xl font-semibold mb-4 flex items-center">
      <FaSyncAlt className="mr-2 text-indigo-500" />
      Rephrased Sentences:
    </h3>
    {sentences.map((sentence, idx) => (
      <div
        key={idx}
        className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
      >
        <p className="mb-2">{sentence}</p>
        <Button onClick={() => onAccept(sentence)} icon={<FaCheck />}>
          Accept
        </Button>
      </div>
    ))}
  </div>
);

export default RephrasedSentencesSection;
