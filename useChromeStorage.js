import { useState, useEffect } from 'react';

function useChromeStorage(key, initialValue) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setState(result[key]);
      }
    });

    const listener = (changes, namespace) => {
      if (namespace === 'local' && changes[key]) {
        setState(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, [key]);

  const setChromeStorage = (value) => {
    chrome.storage.local.set({ [key]: value });
  }

  return [state, setChromeStorage];
}

export {
  useChromeStorage
}
