export const persistState = (storageKey: string, state: any) => {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
};

export const getPersistedState: any = (storageKey: string) => {
  const savedState = window.localStorage.getItem(storageKey);
  try {
    if (!savedState) {
      return undefined;
    }
    const json = JSON.parse(savedState);
    return json;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const removePersistedState = (storageKey: string) => {
  window.localStorage.removeItem(storageKey);
};
