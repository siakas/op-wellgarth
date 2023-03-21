import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// DOMPurify(window) でエラーが出てしまうのを回避
// 参考：https://github.com/cure53/DOMPurify/issues/437
export const sanitizeHtml = (html: string) => DOMPurify(window).sanitize(html)
