import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  text: string;
  selectedSentence: string;
  rephrasedSentences: string[];
  correctedSentences: string[];
  spellCheckedText: string;
  grammarCheckedText: string;
}

const initialState: EditorState = {
  text: "",
  selectedSentence: "",
  rephrasedSentences: [],
  correctedSentences: [],
  spellCheckedText: "",
  grammarCheckedText: "",
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setSelectedSentence(state, action: PayloadAction<string>) {
      state.selectedSentence = action.payload;
    },
    setRephrasedSentences(state, action: PayloadAction<string[]>) {
      state.rephrasedSentences = action.payload;
    },
    addCorrectedSentence(state, action: PayloadAction<string>) {
      state.correctedSentences.push(action.payload);
    },
    setSpellCheckedText(state, action: PayloadAction<string>) {
      state.spellCheckedText = action.payload;
    },
    setGrammarCheckedText(state, action: PayloadAction<string>) {
      state.grammarCheckedText = action.payload;
    },
    clearRephrasedSentences(state) {
      state.rephrasedSentences = [];
    },
  },
});

export const {
  setText,
  setSelectedSentence,
  setRephrasedSentences,
  addCorrectedSentence,
  setSpellCheckedText,
  setGrammarCheckedText,
  clearRephrasedSentences,
} = editorSlice.actions;

export default editorSlice.reducer;
