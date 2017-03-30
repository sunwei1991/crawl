/**
 * @author sunwei,2017/3/30.
 */
"use strict";
const urlModel = require("url");

module.exports = {
    getRandomAgent: getRandomAgent,
    getResponseCookies: getResponseCookies,
    getHostFormUrl: getHostFormUrl,
    formatParams: formatParams,
    setHeaders: setHeaders,
    refreshHeader: refreshHeader
};

/**
 * @description 获取一个user-agent
 * @returns {string} 返回user-agent
 */
function getRandomAgent() {
    const ua = [
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
        "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
        "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
        "Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
        "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11",
        "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; TencentTraveler 4.0)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; The World)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
        "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
        "Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
        "Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
        "Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
        "MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
        "Opera/9.80 (Android 2.3.4; Linux; Opera Mobi/build-1107180945; U; en-GB) Presto/2.8.149 Version/11.10",
        "Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13",
        "Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en) AppleWebKit/534.1+ (KHTML, like Gecko) Version/6.0.0.337 Mobile Safari/534.1+",
        "Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.70 Safari/534.6 TouchPad/1.0",
        "Mozilla/5.0 (SymbianOS/9.4; Series60/5.0 NokiaN97-1/20.0.019; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebKit/525 (KHTML, like Gecko) BrowserNG/7.1.18124",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; HTC; Titan)",
        "UCWEB7.0.2.37/28/999",
        "NOKIA5700/ UCWEB7.0.2.37/28/999",
        "Openwave/ UCWEB7.0.2.37/28/999",
        "Mozilla/4.0 (compatible; MSIE 6.0; ) Opera/UCWEB7.0.2.37/28/999"
    ];
    return ua[Math.floor(Math.random() * (ua.length))];
}

/**
 * @description 获取response中的cookie(set-cookie)
 * @param {Object} response
 * @returns {string}
 */
function getResponseCookies(response) {
    let set_cookie = response ? response['headers']['set-cookie'] : '';
    let temp = {};
    if (set_cookie.length > 0) {
        set_cookie.forEach(function (cookie) {
            let cookie_name = cookie.split(';')[0].split('=')[0];
            let cookie_value = cookie.split(';')[0];
            temp[cookie_name] = cookie_value;
        });
        let temp_cookie = [];
        for (let cookie in temp) {
            temp_cookie.push(temp[cookie]);
        }
        return temp_cookie.join(';');
    }
}

/**
 * @description 从url字符串中获取host
 * @param {String} url
 * @returns {String}
 */
function getHostFormUrl(url) {
    if (!url) {
        return url;
    }
    return urlModel.parse(url).host;
}

/**
 * @description 整理请求中的参数
 * @param {String} url 请求的url
 * @param {String} params post请求的参数，如name=john&pwd=123456&userType=1
 * @returns {String} 返回按序排好的数据，如：form=pc&ol=1&ol=2&name=john&pwd=123456&userType=1
 */
function formatParams(url, params) {
    if (!url) {
        return url;
    }
    params = params || '';
    let Url = urlModel.parse(url);
    let urlParams = Url.query || '';
    let temp = {};
    let paramArr = [];
    urlParams && urlParams.split('&').forEach(function (p) {
        let n = p.split('=')[0];
        let v = p.split('=')[1];
        temp[n] = temp[n] || [];
        temp[n].push(v);
    });
    params && params.split('&').forEach(function (p) {
        let n = p.split('=')[0];
        let v = p.split('=')[1];
        temp[n] = temp[n] || [];
        temp[n].push(v);
    });
    for (let k in temp) {
        temp[k].sort(function (a, b) {
            return a - b;
        });
        paramArr.push({name: k, value: temp[k]});
    }
    paramArr.sort(function (a, b) {
        return a.name - b.name;
    });
    let tempArr = [];
    paramArr.forEach(function (p) {
        p.value.forEach(function (v) {
            tempArr.push(p.name + '=' + v);
        });
    });
    return tempArr.join('&');
}

/**
 * @description 获取一个request的headers头
 * @param {String} [host=''] 设置host
 * @param {String} [cookies=''] 设置cookie
 * @returns {{User-Agent: string, Accept: string, Accept-Language: string, Connection: string, Cache-Control: string}}
 */
function setHeaders(host, cookies) {
    let headers = {
        'User-Agent': getRandomAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    if (host) {
        headers['Host'] = host;
    }
    if (cookies) {
        headers['Cookie'] = cookies;
    }
    return headers;
}

/**
 * @description 刷新header
 * @param response
 * @param headers
 * @returns {{headers: *, cookies: string}}
 */
function refreshHeader(response, headers) {
    let newCookies = getResponseCookies(response);
    let oldCookies = headers['Cookie'] || '';
    let temp = {}, arr = [];
    newCookies.split(';').forEach(function (cookieStr) {
        temp[cookieStr.split('=')[0]] = cookieStr;
    });
    oldCookies.split(';').forEach(function (cookieStr) {
        temp[cookieStr.split('=')[0]] = cookieStr;
    });
    for (let c in temp) {
        arr.push(temp[c]);
    }
    headers['Cookie'] = arr.join(';');
    return {headers: headers, cookies: arr.join(';')};
}