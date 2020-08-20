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

/**
 * クエリパラメータをメンバ変数とするオブジェクトの生成
 */
interface queryParamsInterface {
    [key: string]: string;
}

$(document).ready(function () {

    console.log(location.href)

    // const left = location.href.split(`${encodeURI("<left>")}`)[1].split(`${encodeURI("</left>")}`)[0]
    // const right = location.href.split(`${encodeURI("<right>")}`)[1].split(`${encodeURI("</right>")}`)[0]
    // let query = location.href.split(`${encodeURI("<query>")}`)[1].split(`${encodeURI("</query>")}`)[0]

    const queryParams = {} as queryParamsInterface
    const pairs = location.search.substring(1).split('&&');
    for(let i=0; pairs[i]; i++) {
        var keyValues = pairs[i].split('==');
        queryParams[keyValues[0]] = keyValues[1];
    }
    console.log(queryParams)
    const head_title = document.getElementById("head-title");
    if (head_title) {
        head_title.innerHTML = `yg - ${decodeURIComponent(queryParams.query)}`
    }

    $("#left").attr("src", queryParams.left + queryParams.query);
    $("#right").attr("src", queryParams.right + queryParams.query);

});