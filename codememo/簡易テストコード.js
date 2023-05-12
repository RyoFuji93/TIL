/**
 * 与えられた点 A（x,y）において、原点から点 A までの距離を返す関数。
 * @param {integer} x,y - 座標（整数）
 * @returns {double-float} - 原点から点Aまでの距離
 */
function distanceToOrigin(x,y){
    return Math.sqrt(x ** 2 + y ** 2);
}

function testDistanceToOrigin() {
  const testCases = [
    { x: 0, y: 0, expected: 0 },
    { x: 3, y: 4, expected: 5 },
    { x: -3, y: -4, expected: 5 },
    { x: 5, y: 12, expected: 13 },
    { x: -5, y: -12, expected: 13 },
  ];

  testCases.forEach(({ x, y, expected }) => {
    const result = distanceToOrigin(x, y);
    console.assert(
      result === expected,
      `Failed for x=${x}, y=${y}. Expected ${expected}, but got ${result}`
    );
  });
}

testDistanceToOrigin();
