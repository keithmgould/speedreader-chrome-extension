// Loaded when the Chrome app loads the extension
// for the first time.  Not loaded on each page.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
  });
});
