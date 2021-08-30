
document.getElementById('healthCheck').addEventListener('click', function () {
  chrome.tabs.create({
    url: 'main.html'
  });
});

initColorPicker()

function initColorPicker() {  
  let changeColor = document.getElementById("changeColor");
  
  chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
  });
  
  // When the button is clicked, inject setPageBackgroundColor into current page
  changeColor.addEventListener("click", async () => {
    let [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: setPageBackgroundColor,
    });
  
  });
  
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }
}
