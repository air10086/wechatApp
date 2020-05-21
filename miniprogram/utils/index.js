/**
 * 防抖函数，升级版(但并非完美版)。
 * 如需深入理解，请看这里 https://github.com/mqyqingfeng/Blog/issues/22
 * @param {Function} func
 * @param {number} [delay=1000] 延迟时间或者间隔时间，默认为 1000
 * @param {boolean} [immediate=true] 是否需要立即触发，默认为 true
 */
export function debounce(func, wait = 1000, immediate = true) {
  let timer
  return function () {
    let context = this,
      args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply
      }, wait)
    }
  }
}