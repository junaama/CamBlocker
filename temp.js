// Background service worker

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });
});

// This should run when the webcam is on
// Or when the website is a known video conferencing site

// If page is not using webcam
// Remove listeners from page

