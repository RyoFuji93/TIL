# git configコマンド
* ユーザ設定  
git config --global user.name "[ユーザネーム]"
* メールアドレス設定  
git config --global user.email "[メールアドレス]"
* editor設定  
git config --global core.editor vim
* 設定確認  
git config user.name(設定確認したい値)
* まとめて設定確認  
git config --list
* configファイル  
ホームディレクトリ配下の.gitconnfigファイルに記載されている。
cat ~/.gitconfig
