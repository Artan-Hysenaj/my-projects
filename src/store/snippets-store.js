import { initStore } from "./store";

export const SET = "SETSNIPPETS";
export const ADD = "ADDSNIPPET";

const configureStore = () => {
  const actions = {
    SETSNIPPETS: (state, payload) => ({
      snippets: [...payload.snippets],
    }),
   
  };

  initStore(actions, {
    snippets: [],
  });
};
export default configureStore;
