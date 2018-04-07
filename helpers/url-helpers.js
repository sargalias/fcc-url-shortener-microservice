function parseUrlData(domain, data, additional='') {
    let shortenedUrl = domain + additional + data.shortenedUrl;
    let originalUrl = data.originalUrl;
    return {shortenedUrl: shortenedUrl, originalUrl: originalUrl};
}

module.exports = {
    parseUrlData,
};