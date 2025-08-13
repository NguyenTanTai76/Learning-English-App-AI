import { useSelector, useDispatch } from "react-redux";
import {
  setText,
  setSelectedSentence,
  setRephrasedSentences,
  addCorrectedSentence,
  setSpellCheckedText,
  setGrammarCheckedText,
  clearRephrasedSentences,
} from "../redux/slices/editorSlice";
import type { RootState } from "../redux/store";
import type { AppDispatch } from "../redux/store";
import { rephraseSentence, checkSpelling, checkGrammar } from "../api/textApi";

import { FaSpellCheck, FaSyncAlt, FaCheck, FaPencilAlt } from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";
import Button from "../components/Editor/Button";
import ResultSection from "../components/Editor/ResultSection";

const EditorPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    text,
    selectedSentence,
    rephrasedSentences,
    correctedSentences,
    spellCheckedText,
    grammarCheckedText,
  } = useSelector((state: RootState) => state.editor);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setText(e.target.value));
  };

  const handleSentenceSelection = () => {
    const selection = window.getSelection()?.toString() || "";
    if (selection.trim()) {
      dispatch(setSelectedSentence(selection.trim()));
      dispatch(clearRephrasedSentences()); // reset khi chọn câu mới
    }
  };

  const handleRephrase = async () => {
    if (!selectedSentence) return;
    try {
      const sentences = await rephraseSentence(selectedSentence);
      dispatch(setRephrasedSentences(sentences));
    } catch (err) {
      console.error("Error rephrasing sentence:", err);
    }
  };

  const handleAddCorrectedSentence = (sentence: string) => {
    dispatch(addCorrectedSentence(sentence));
  };

  const handleCheckSpelling = async () => {
    try {
      const corrected = await checkSpelling(text);
      dispatch(setSpellCheckedText(corrected));
    } catch (err) {
      console.error("Error checking spelling:", err);
    }
  };

  const handleCheckGrammar = async () => {
    try {
      const corrected = await checkGrammar(text);
      dispatch(setGrammarCheckedText(corrected));
    } catch (err) {
      console.error("Error checking grammar:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              AI Writing Assistant
            </h2>
            <p className="mb-4 text-gray-600">
              Enhance your writing with our advanced AI tools.
            </p>
            <textarea
              value={text}
              onChange={handleTextChange}
              onMouseUp={handleSentenceSelection}
              placeholder="Type your text here..."
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-end mt-4 space-x-4">
              <Button onClick={handleCheckSpelling} icon={<FaSpellCheck />}>
                Check Spelling
              </Button>
              <Button onClick={handleCheckGrammar} icon={<SiGrammarly />}>
                Check Grammar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResultSection
              title="Spell Checked Text"
              text={spellCheckedText}
              onAccept={() => handleAddCorrectedSentence(spellCheckedText)}
              icon={<FaSpellCheck className="text-green-500" />}
            />
            <ResultSection
              title="Grammar Checked Text"
              text={grammarCheckedText}
              onAccept={() => handleAddCorrectedSentence(grammarCheckedText)}
              icon={<SiGrammarly className="text-blue-500" />}
            />
          </div>

          {selectedSentence && (
            <div className="bg-white shadow-lg rounded-lg p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaPencilAlt className="mr-2 text-purple-500" />
                Selected Sentence:
              </h3>
              <p className="mb-4">{selectedSentence}</p>
              <Button onClick={handleRephrase} icon={<FaSyncAlt />}>
                Rephrase
              </Button>
            </div>
          )}

          {rephrasedSentences.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaSyncAlt className="mr-2 text-indigo-500" />
                Rephrased Sentences:
              </h3>
              {rephrasedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  <p className="mb-2">{sentence}</p>
                  <Button
                    onClick={() => handleAddCorrectedSentence(sentence)}
                    icon={<FaCheck />}
                  >
                    Accept
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaCheck className="mr-2 text-green-500" />
              Corrected Sentences
            </h3>
            <p className="mb-4 text-gray-600">
              Your approved corrections will appear here.
            </p>
            {correctedSentences.length > 0 ? (
              correctedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="mb-2 pb-2 border-b border-gray-200 last:border-b-0"
                >
                  <p>{sentence}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No corrected sentences yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
