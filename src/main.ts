import { getParams, requestBaidu } from './methods'

const errorMap = {
    52001: '请求超时',
    52002: '系统错误',
    52003: '未授权用户',
    54000: '必填参数为空',
    54001: '签名错误',
    58001: '译文语言方向不支持'
}

export const translation = async (string: string) => {
    const params = getParams(string)
    const result = await requestBaidu(params)
    if (result.error_code) {
        console.log(errorMap[result.error_code])
        process.exit(2)
    } else {
        console.log(result?.trans_result[0]?.dst)
        process.exit(0)
    }
}
