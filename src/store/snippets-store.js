import { initStore } from "./store";

export const SET = "SETSNIPPETS";
export const REMOVE = "REMOVESNIPPET";

const configureStore = () => {
  const actions = {
    SETSNIPPETS: (state, payload) => ({
      snippets: [...payload.snippets],
    }),
    REMOVESNIPPET: (state, payload) => {
      const updatedSnippets = state.snippets.filter(
        (snippet) => snippet.id !== payload.id
      );
      return {
        snippets: updatedSnippets,
      };
    },
  };

  initStore(actions, {
    snippets: [],
  });
};
export default configureStore;
