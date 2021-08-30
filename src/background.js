const DefaultColor = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: DefaultColor });
  console.log('Default background color set to %cgreen', `color: ${DefaultColor}`);
});


// chrome.action.onClicked.addListener((tab) => {
//   // Send a message to the active tab
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     var activeTab = tabs[0];
//     console.log({ "message": "clicked_browser_action" })
//     chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
//   });
// });


// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     if (request.message === "open_new_tab") {
//       console.log({ "url": request.url })
//       chrome.tabs.create({ "url": request.url });
//     }
//   }
// );
