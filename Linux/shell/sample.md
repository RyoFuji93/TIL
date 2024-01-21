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

# ファイルを読み込んで値を集計する
日付、売上　or 費用、商品名、数量、売上 or 費用(数値)のようなファイルを読むこむ場合
~~~ bash
#!/bin/bash

# 実行ファイルのパス
file_path="$(realpath ${0})"
base_dir="$(dirname ${file_path})"

input_dir="${base_dir}/input"
output_dir="${base_dir}/output"

input_file="${input_dir}/input.csv"

# 合計の売上、費用
total_cost=0
total_earning=0

# 日付ごとの売上、費用
declare -A daily_costs
declare -A daily_earnings

# 品目ごとの売上、費用
declare -A product_costs
declare -A product_earnings

# 売上、費用の合計を計算
while read p
do
        day=$(echo "${p}" | cut -d "," -f 1)
        cost_or_earning=$(echo "${p}" | cut -d "," -f 2)
        product_name="$(echo "${p}" | cut -d "," -f 3)"
        price=$(echo "${p}" | cut -d "," -f 5)
        
        if [[ "${cost_or_earning}" == "費用"]]; then
                (( daily_costs["${day}"]+="${price}" ))
                (( product_costs["${product_name}"]+="${price}" ))
                (( total_cost+="${price}" ))
        elif [[ "${cost_or_earning}" == "売上" ]];then
                (( daily_earnings["${day}"]+="${price}" ))
                (( product_earnings["${product_name}"]+="${price}" ))
                (( total_earning+="${price}" ))
        fi
done < "${input_file}"

day=$(date '+%Y%m%d')
output_file="${output_dir}/output_${day}.csv"

echo "合計" > "${output_file}"

echo "売上:" > "${total_earning}" >> "${output_file}"
echo "費用:" > "${total_cost}" >> "${output_file}"

echo -e "\n日付ごとの合計" >> "${output_file}"
echo "日付,合計,費用" >> "${output_file}"

echo "${!daily_costs[@]}" | sed 's/ /\n/g' | sort -n | while read key
do
        echo "${key}",${daily_earnings[${key}]},${daily_costs[${key}]}" >> "${output_file}"
done

echo -e "\n品目ごとの合計" >> "${output_file}"
echo "品目,売上,費用" >> "${output_file}"

# sed 's/ /\n/g'空白をスペースに、スペースを改行に
echo "${!product_costs[@]} ${!product_earnings[@]}" | sed 's/ /\n/g' | sort | uniq | while read key
do
        echo "${key}",${product_earnings[${key}]},${product_costs[${key}]}" >> "${output_file}"
done
~~~

