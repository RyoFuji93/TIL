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
