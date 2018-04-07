function parseUrlData(domain, data) {
    let shortenedUrl = domain + data.shortenedUrl;
    let originalUrl = data.originalUrl;
    return {shortenedUrl: shortenedUrl, originalUrl: originalUrl};
}

module.exports = {
    parseUrlData,
};