/**
 * Thanks
 * 基本的なアルゴリズムの参照（主な変更点は，1. Bing->Yahoo! 2. Purlの廃止 3. TypeScriptの導入）
 * https://github.com/zmarty/double-shot-search
 * TypeScriptでChrome拡張の開発環境の構築
 * https://qiita.com/markey/items/ea9ed18a1a243b39e06e?utm_campaign=popular_items&utm_medium=feed&utm_source=popular_items
 * ミニマムなChrome拡張の開発手法
 * https://qiita.com/Ancient_Scapes/items/822409167ae3a0b76dbe
 */
import $ from 'jquery';

$(document).ready(function () {
    const left = "https://search.yahoo.co.jp/search?ei=UTF-8&p=";
    const right = "https://www.google.com/search?q=";

    let query = location.href.split("index.html?")[1].split("q=")[1]

    if (query === undefined) {
        query = ""
    }

    $("#left").attr("src", left + query);
    console.log(left + query)
    $("#right").attr("src", right + query);

});