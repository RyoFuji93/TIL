# ファイルを環境変数(FILE_NAME)+_+現在日付(yyyymmdd).txtの名前の空ファイルを作成するシェル
* コマンドの実行結果を変数に格納するには、変数名=`ls`などとしてコマンドをバックオートで囲えばよい
* 変数をつなげる場合には、${FILE_NAME}_${day}.txtなどとして、${変数名}のように変数名を囲って記述する

~~~ bash
#!/bin/bash

current_date=`date '+%Y%m%d'`

# $FILE_NAME + $current_date.txt
# $FILEは環境変数で定義
touch ${FILE_NAME}_${current_date}.txt
~~~

#  rootユーザーで、ユーザー名を環境変数として設定して、ユーザーを追加するシェル
~~~ bash
#!/bin/bash

# $USER_NAME: 環境変数

# $USER_NAMEの無い場合
if [ -z $USER_NAME ];
then
        echo "ユーザー名を設定してください"
        exit 1
fi

# ユーザーを追加
useradd $USER_NAME
~~~

# ユーザー名とコメントを変数として渡して、指定したユーザーのコメントを変更するシェル
~~~ bash
#!/bin/bash

# $COMMENTがない場合
if [ -z "$COMMENT" ];
then
        COMMENT="No Comment"
fi

# $USER_NAMEがない場合
# idコマンドでユーザーが存在するか確認
id "$USER_NAME" &> /dev/null
# 実行結果が0の場合の処理
if [ $? -ne 0 ];
then
        echo "ユーザーが存在しません"
        exit 1
fi

# ユーザー情報（コメント）の更新
usermod -c "$COMMENT" $USER_NAME
~~~~

# ファイル名と更新日時を何日前か何日後にするのかを環境変数として設定して、実行するとその更新日時でファイルを作成するシェル
ただし、ファイル名と更新日時を指定する変数が存在する場合は処理をせず終了する
~~~ bash
#!/bin/bash

# 変数の存在チェック
if [ -z "$SETTING_DATE" ];
then
        echo "sdなし"
        exit 1
fi

if [ -z "$FILE_NAME" ]
then
        echo "fnなし"
        exit 1
fi

# 日付を何日前、何日後かで設定
FILE_DATE=`date -d "$SETTING_DATE" "+%Y/%m/%d %H:%M:%S"`

# ファイルを作成
touch -d "$FILE_DATE" $FILE_NAME
if [ $? -eq 0 ];
then
        echo "作成完了しました"
fi
~~~
