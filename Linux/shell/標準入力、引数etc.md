# 標準入力
~~~ bash
read -p "お名前を入力してください:" name
# 画面に入力内容を表示させない
read -sp "パスワードを入力してください:" password
~~~

# 引数
シェルスプリクト実行時引数
${1}...${N}..第N引数まで取得

${#}..引数の数

${@}..全引数

# if文
1. if test条件文で記述し、fiで閉じる。
2. if[ 条件文 ]で記述する。fiで閉じる。
3. if[[条件文]]できじゅるする。fiで閉じる。（推奨）
~~~ bash
if [["${age}" -ge 60]]; then
  echo "あなたは60以上ですね"
elif [["${age}" -gt 20]]; then
  echo "あなたは21~59ですね"
else
  echo "あなたは、20以下ですね"
fi
~~~

# 数価比較if文
(())で条件式を囲むと他のプログラミング言語同様に記述できる。
~~~ bash
if (("${age}" >= 60)); then
  echo "あなたは60以上ですね"
elif (("${age}" > 20)); then
  echo "あなたは21~59ですね"
else
  echo "あなたは、20以下ですね"
fi
~~~

# 変数の設定有無
~~~ bash
# 設定されていない場合
if [[-z "${my_var}"]]; then
# 設定されている場合
if [[-n "${my_var}"]]; then
~~~

# 正規表現
~~~ bash
if [["${my_var}" == ABC*]]; then
if [["${my_var}" == *ABC]]; then
if [["${my_var}" == *ABC*]]; then
~~~

# ファイルチェック
~~~ bash
FILE="test.txt"
 
if [ -e $FILE ]; then
  echo "File exists."
fi

# ディレクトリ存在チェック
DIR="test"
 
if [ -d $DIR ];then
  echo "Directory exists."
fi
~~~
