# vi
vi ファイル名でファイルを編集する。

実行直後はコマンドモード。

iで入力モードに移動。（Escでコマンドモードへ）

## 保存関連
### :wq
保存して終了
### :q!
保存せず終了
### :w
保存のみ

## 主要コマンド
### dd
1行丸ごと削除
### d10d
10行削除
### x
1文字削除
### u
undo 変更を戻す
### ctrl+r
redo 変更を進める
### yy
1行コピー
### y10y
10行コピー
### p
ペースト
### G
一番下の行に移動
### /
下に検索
### ?
上に検索

## 入力系
### i
カーソル位置から入力
### a
右側に入力
### O
１つ上の行に入力
### o
１つ下の行に入力
### A
行末から入力
### I
行頭から入力

## shellscript作成しながら実行
:wで保存後に以下コマンドで編集中のファイルを実行

:!%:p