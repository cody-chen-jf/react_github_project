export default class ArrayUtils {
  static updateArray(array, item) {
    for (let i = 0, len = array.length; i < len; i++) {
      let temp = array[i]
      if (temp === item) {
        array.splice(i, 1)
        return
      }
    }
    array.push(item)
  }

  /***
   * 克隆一个数组
   * @param from
   * @returns {Array}
   */
  static clone(from) {
    if (!from) {
      return []
    }
    let newArray = []
    for (let i = 0; i < from.length; i++) {
      newArray[i] = from[i]
    }
    return newArray
  }

  /***
   * 判断两个数组的元素是否一致
   * @param arr1
   * @param arr2
   * @returns {boolean} true 数组长度相等且元素对应相等
   */
  static isEqual(arr1, arr2) {
    if (!arr1 && !arr2) {
      return false
    }
    if (arr1.length !== arr2.length) {
      return false
    }
    for (let i = 0; i < arr2.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }

    return true

  }
}