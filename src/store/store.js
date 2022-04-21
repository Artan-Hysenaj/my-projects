import { useEffect, useRef, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (options = { shouldListen: true }) => {
  const { shouldListen } = options;
  const [_, setState] = useState(globalState);

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (let listener of listeners) {
      listener(globalState);
    }
  };
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((listener) => listener !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
