// temp result from node server
model_result = false;

const allUrls = ["meet.google.com", "gather.town", "webex.com", "discord.com"];

// find list of all tabs
chrome.tabs.query({}, tabs => {

    tabs.forEach(function (tab) {
        if (model_result) {

            allUrls.forEach((item) => {
                if (tab.url.search(item) !== -1) {
                    idx = tabs.indexOf(tab)
                    chrome.tabs.remove(tabs[idx].id)
                }
            })

        }
    });
});