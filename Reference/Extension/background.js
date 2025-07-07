chrome.commands.onCommand.addListener((command) => {
  if (command === "open-tracker") {
    chrome.windows.create({
      url: "CollectionsTracker/index.html",
      type: "popup",
      width: 420,
      height: 420
    });
  } else if (command === "open-notes") {
    chrome.windows.create({
      url: "Notes/collections/collections.html",
      type: "popup",
      width: 520,
      height: 720
    });
  }
});