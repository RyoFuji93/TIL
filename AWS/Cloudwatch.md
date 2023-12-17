# 基本操作
## EC2インスタンスのメトリクスをCloudWatchに送信
EC2とIAMの設定
1. IAMロールを作成（CloudWatchAgentでロール検索）
2. EC2インスタンスへアタッチする。（アクション→セキュリティ→IAMロールの変更）

## アラームの生成
1. アラームの作成よりメトリクス等の敷居値等を入力し作成
2. アクションを設定（EC2の場合はEC2アクション、インスタンス停止などを実施可能）

## ログのインサイト
ログをクエリで指定し検索することができる