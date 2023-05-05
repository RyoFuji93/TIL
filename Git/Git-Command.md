# Git Command
* git init  
ローカルリポジトリの新規作成（.gitディレクトリが作成される）  
* git Clone  
既存のプロジェクトをローカルにコピーする。
* git add  
変更をステージに追加する。  
一部の変更を記録するためにステージに追加する。  
git add <ファイル名・ディレクトリ名>  
git add .
* git commit  
変更を記録する  
git commit  
git commit -m "<メッセージ>"  
git commit -v⇒コミットする前に変更内容を確認できる) 
* コミットメッセージについて  
変更内容の要点と理由を簡潔に書く  
おすすめフォーマット  
~~~
1行目：変更内容の要約
2行目：空行
3行目：変更した理由
~~~
* 現在の変更状況を確認する  
git status  
※ワークツリーとステージ間で変更されたファイル  
ステージとリポジトリ間で変更されたファイルを表示している  
* 変更差分を確認する  
・git addする前の変更分(ワークツリー⇔ステージ間差分)   
git diff  
git diff <ファイル名>  
・git addした後の変更分（ステージ⇔リポジトリ間差分）  
git diff --staged
* 変更履歴を確認する  
git log  
git log --oneline(1行で表示する)  
git log -p index.html(ファイルの変更差分を表示する)  
git log -n <コミット数>  
* ファイルの削除を記録する  
・ファイルごと削除    
git rm <ファイル名>  
git rm <ディレクトリ名>  
・ファイルを残したい場合（リポジトリのみ削除）  
git rm -cached <ファイル名>
* ファイルの移動(ファイル名の変更)を記録する  
git mv <旧ファイル> <新ファイル>
* リモートリポジトリ（GitHub）を新規追加する  
git remote add <リモート名> <リモートURL>
git remote add origin https://github.com/user/repo.git  
(originというショートカットでurlのリモートリポジトリを登録する)
* リモートリポジトリ（GitHub）へ送信する  
git push <リモート名> <ブランチ名>  
git push origin master
* コマンドにエイリアスを付与する  
git config --global alias.ci commit  
git config --global alias.st status  
git config --global alias.br branch  
git config --global alias.co checkout  
* バージョン管理したくないファイルを管理対象外とする  
.gitignoreファイルに指定する。  
#から始まる行はコメント  
#指定したファイルを除外  
index.html  
#ルートディレクトリを指定  
/root.html  
#ディレクトリ以下を除外  
dir/  
#/以外の文字列にマッチ「*」
/*/*.css
* ワークツリーのファイルを元の状態に戻す(ワークツリーの状態をステージの状態と同じにする)  
・ファイルの変更を取り消す  
git checkout -- <ファイル名>  
git checkout -- <ディレクトリ名>  
・全変更を取り消す  
git checkout -- . 
* ステージに追加した変更を取り消す(リポジトリの最新のコミット（HEAD）の状態と同じにする)  
git reset HEAD <ファイル名>  
git reset HEAD <ディレクトリ名>  
* 直前のコミットをやり直す(今のステージの状態でコミットを上書きする)  
git commit --amend  
※リモートリポジトリにpushしたコミットはやり直さない。
* リモートを表示する  
git remote  
git remote -v(対応するURLまで表示する)
* リモートから情報取得  
git fetch <リモート名>
git fetch origin  
→リモートからローカルリポジトリに情報取得するまでなので、ワークツリーまで反映させる場合はgit mergeを実施する必要がある。  
git merge origin/master
* リモートから情報取得してマージする  
git pull <リモート名> <ブランチ名>  
git pull origin master  
git pull(省略可能)  
→下記コマンドと実施していることは同じ  
git fetch origin master  
git merge origin/master

* フェッチとプルの使い分け  
基本的にはフェッチを推奨  
プルの注意点  
ワークツリーの現在いるブランチにマージされてしまう。  
例）origin/hogeブランチをmasterブランチにマージしてしまう。。

* リモートの詳細情報を表示する。
git remote show <リモート名>
* リモート名の変更  
git remote rename <旧リモート名> <新リモート名>
* リモートの削除  
git remote rm <リモート名>
* ブランチを新規追加する  
git branch <ブランチ名>  
* ブランチの一覧を表示する  
git branch  
git branch -a（リモートブランチ含めすべてのブランチを表示する）
* ブランチを切り替える  
git checkout <既存ブランチ名>  
git checkout -b <ブランチ名>(新規作成しつつ切り替える)
* マージ  
git merge <ブランチ名>  
git merge <リモート名/ブランチ名>
* 3種類のマージ  
Fast Forward：早送りになるマージ（ブランチが枝分かれしてなかったときはブランチのポインタを前に進めるだけ）  
Autoマージ：基本的なマージ（枝分かれして開発していた場合、マージコミットという新しいコミットを作る）  
コンフリクト：同じファイルに異なる編集を行ったとき、両ブランチの採用する方の記載に修正する必要がある。  
→どのファイルでコンフリクトが発生したかは、git statusで確認可能  
→そもそも複数人で同じファイルを変更しないことが重要  
→pullやmergeをする前に変更中のファイルをなくしておく（commitやstashをしておく）  
→pullするときに、pullするブランチに移動してからpullする
* ブランチ名を変更  
git branch -m <ブランチ名>
* ブランチの削除  
git branch -d <ブランチ名>(masterにマージされていない変更が残っている場合削除しない)  
git branch -D <ブランチ名>(強制削除)

* リベースで履歴を整えた形で変更を統合する
git rebase <ブランチ名>（ブランチの起点となるコミットを別のコミットに移動する）  
他のブランチの変更分を取り込むだけではなく、親コミットが変わるのでコミット履歴も枝分かれではなく一直線にできる。  
→リベース後、マージするとファストフォワードでマージされる。    
プッシュしたコミットをリベースするとpushできなくなるためNG  
git push -f（強制push）は絶対NG

* fast-forwardマージをOFFにする。  
git config --global merge.ff false  
→別のブランチで作業した場合の作業履歴を残しておきたいため。  
作業履歴を残したい場合リベースよりマージを推奨。

* プルの設定のマージ型・リベース型  
マージ型  git pull <リモート名> <ブランチ名>  
マージコミットが残る  
リベース型 git pull --rebase <リモート名> <ブランチ名>  
マージコミットが残らない（最新の内容を単純に取得したく、マージコミットを作成したくない場合、使用）  
設定方法：git config --global pull.rebase true  
git config branch.master.rebase true(masterブランチでpullする場合のみリベース)

* コミットをきれいに整えてからPushしたい（GitHubにPushしていないコミットに対して実施）  
1. 複数のコミットをやり直す git rebase -i <コミットID>  
2. やり直したいcommitをeditにする  
3. editの適用のところでコミットの適用がとまる。
4. コミットの修正 git commit --amend  
5. 次のコミットへ進む（リベース完了）  git rebase --continue  
6. pickだとそのままのコミット内容を適用して次へいく
