import React from "react";
import Button from "./Button";
import { FaPencilAlt, FaSyncAlt } from "react-icons/fa";

interface SelectedSentenceSectionProps {
  sentence: string;
  onRephrase: () => void;
}

const SelectedSentenceSection: React.FC<SelectedSentenceSectionProps> = ({
  sentence,
  onRephrase,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6 my-8">
    <h3 className="text-xl font-semibold mb-4 flex items-center">
      <FaPencilAlt className="mr-2 text-purple-500" />
      Selected Sentence:
    </h3>
    <p className="mb-4">{sentence}</p>
    <Button onClick={onRephrase} icon={<FaSyncAlt />}>
      Rephrase
    </Button>
  </div>
);

export default SelectedSentenceSection;
