# Don't Repeat Yourself
同じコードを繰り返し書いてはいけないという原則。

* コードが冗長になるだけではなく、その分リーディングにも時間がかかるため。

* 修正が発生した際にも、同じ処理があちらこちらに散らかっていれば修正漏れの恐れがある。

処理が似てる場合や目的、意味が同じコードはまとめられないか考えることが重要である。

### BAD
```js
const lastName = "やまだ";
const firstName = "たろう";

// 苗字をカタカナに変換する関数
function convertLastNameToKana(lastName) {
  return lastName.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

// 名前をカタカナに変換する関数
function convertFirstNameToKana(firstName) {
  return firstName.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

console.log(convertLastNameToKana(lastName));
console.log(convertFirstNameToKana(firstName));
```

### GOOD
```js
const lastName = "やまだ";
const firstName = "たろう";

// カタカナに変換する関数
function convertToKana(text) {
  return text.replace(/[\u3041-\u3096]/g, function (match) {
    const chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

console.log(convertToKana(lastName));
console.log(convertToKana(firstName));
```
