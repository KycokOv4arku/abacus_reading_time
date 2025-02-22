chrome.action.onClicked.addListener(async (tab) => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (activeTab.id) {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: ["content.js"]
    });
  }
});