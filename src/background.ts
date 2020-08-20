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

// ペインに検索クエリが入力され，エンターが押された前
chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    { 
        // 適切なパラメータかチェック
        if (details.url.indexOf("https://example.com?q=") != -1
            || details.url.indexOf("chrome-extension://" + chrome.runtime.id + "/?q=") != -1) {

            let query = details.url.split("/?q=")[1]

            // 隠しコマンド
            const decode_query = decodeURI(query);
            if (decode_query[0] == "g" && decode_query[1] == "l") {
                return {redirectUrl: `https://www.google.com/search?q=${encodeURI(decode_query.slice(2))}`};
            }
            if (decode_query[0] == "y" && decode_query[1] == "j") {
                return {redirectUrl: `https://search.yahoo.co.jp/search?ei=UTF-8&p=${encodeURI(decode_query.slice(2))}`};
            }
            // デフォルト
            const left = "left==https://search.yahoo.co.jp/search?ei=UTF-8&p="
            const right = "right==https://www.google.com/search?q="
            query = `query==${query}`

            let search_url = chrome.runtime.getURL("index.html");
            search_url += "?" + query + "&&" + left + "&&" + right
            return {redirectUrl: search_url}
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);