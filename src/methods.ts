import * as querystring from 'querystring'
import { appid, token } from './private'
import * as https from 'https'

import md5 = require('md5')
type BaiduResult = {
    error_code?: 52001 | 52002 | 52003 | 54000 | 54001 | 58001;
    error_msg?: string;
    from: string;
    to: string;
    trans_result: { src: string; dst: string; }[]
}
const requestBaidu = (params: string) => {
    const options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + params,
        method: 'GET'
    };

    return new Promise<BaiduResult>((resolve) => {
        const req = https.request(options, (res: any) => {
            let chunks: Buffer[] = []
            res.on('data', (chunk: Buffer) => {
                chunks.push(chunk)
            });
            res.on('end', () => {
                const result: BaiduResult = JSON.parse(Buffer.concat(chunks).toString())
                resolve(result)
            })
        });
        req.end();
    })
}

const getParams = (word: string) => {
    let [from, to] = ['zh', 'en']
    if (/[a-zA-z]/.test(word[0])) {
        [from, to] = ['en', 'zh']
    }
    const random = Math.random() * 10
    const sign = md5(appid + word + random + token)
    const params = querystring.stringify({ q: word, from, to, appid, salt: random, sign })
    return params
}
export {
    getParams,
    requestBaidu
}