# 基本的にはforループを優先的に使用する
ループの制御コードを一か所にまとめることができるため。

→while文は初期化式が別だしになるなど制約がある。

# ループを抜ける条件次第でwhile文を使用すべき
固定回数で抜ける→for文

固定回数ではなく、特定条件で抜ける場合→while文

(for文だと、初期化式、変化式を省略したものを記載しないといけないため、処理が冗長になってしまう。)

以下、while文使用ケース。
0~9までの整数のランダム生成して出力。
乱数が１になったら抜ける。
~~~ js 
let ramdomNum;

while(randomNum !== 1){
  randomNum = Math.floor(Math.random() * 10);
  console.log(randomNum);
}
~~~

