chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        for (let i = 0; i < details.responseHeaders!.length; ++i) {
            if (details.responseHeaders![i].name.toLowerCase() == 'x-frame-options') {
                details.responseHeaders!.splice(i, 1);
                return {
                    responseHeaders: details.responseHeaders
                };
            }
        }
    }, {
        urls: ["<all_urls>"]
    }, ["blocking", "responseHeaders"]
);

// エンターが押された時
chrome.omnibox.onInputEntered.addListener(
    function(query) {
        let search_url = chrome.runtime.getURL("index.html");
        search_url += "?q=" + query;
        navigate(search_url);
    }
);

function navigate(url: string) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const id = tabs[0].id!
        chrome.tabs.update(id, {url: url});
    });
}

// ペインに検索クエリが入力され，エンターが押された前
chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    { 
        // 適切なパラメータかチェック
        if (details.url.indexOf("https://example.com?q=") != -1
            || details.url.indexOf("chrome-extension://" + chrome.runtime.id + "/?q=") != -1) {

            const query = details.url.split("/?q=")[1]
            let search_url = chrome.runtime.getURL("index.html");
            search_url += "?q=" + query;
            
            return {redirectUrl: search_url};
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
      let headers = details.requestHeaders;
    //   headers!.forEach(header => {
    //     if (header.name.toLowerCase() === 'user-agent') {
    //       header.value = 'my device';
    //     }
    //   });
      headers!.push({ name: 'Set-Cookie', value: 'HttpOnly;Secure;SameSite=Strict' });
      return { requestHeaders: headers };
    }, {
      urls: [
        "*"
      ],
      types: [
        "xmlhttprequest"
      ]
    }, [
      "blocking",
      "requestHeaders"
    ]
  );