// algorithm used for editing the DOM
export const applyTheme = (colors: string[]) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: "applyTheme", colors });
    });
  };
  