"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestBaidu = exports.getParams = void 0;
var querystring = __importStar(require("querystring"));
var private_1 = require("./private");
var https = __importStar(require("https"));
var md5 = require("md5");
var requestBaidu = function (params) {
    var options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + params,
        method: 'GET'
    };
    return new Promise(function (resolve) {
        var req = https.request(options, function (res) {
            var chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                var result = JSON.parse(Buffer.concat(chunks).toString());
                resolve(result);
            });
        });
        req.end();
    });
};
exports.requestBaidu = requestBaidu;
var getParams = function (word) {
    var _a;
    var _b = ['zh', 'en'], from = _b[0], to = _b[1];
    if (/[a-zA-z]/.test(word[0])) {
        _a = ['en', 'zh'], from = _a[0], to = _a[1];
    }
    var random = Math.random() * 10;
    var sign = md5(private_1.appid + word + random + private_1.token);
    var params = querystring.stringify({ q: word, from: from, to: to, appid: private_1.appid, salt: random, sign: sign });
    return params;
};
exports.getParams = getParams;
