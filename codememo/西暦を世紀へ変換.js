/**
 * 与えられた西暦yearを世紀へと変更する関数
 * @param {integer} year - 西暦（整数）
 * @returns {string} - 世紀
 */
function getCentury(year) {
  let century = Math.ceil(year / 100);

  let tail;
  if (century % 100 >= 11 && century % 100 <= 13) {
    tail = "th";
  } else {
    switch (century % 10) {
      case 1:
        tail = "st";
        break;
      case 2:
        tail = "nd";
        break;
      case 3:
        tail = "rd";
        break;
      default:
        tail = "th";
        break;
    }
  }
  
  return century + tail + " century";
}
