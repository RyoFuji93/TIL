# <script>要素の配置箇所について
## \<body\>要素の配下(任意の位置)
ページの可読性/保守性の観点からも望ましくない。
## \<body\>要素の配下(\</body\>閉じタグの前)
ページ高速化の手法として、閉じタグの前に、配置することがよく行われる。（スクリプト読込後表示ではなく、ページ表示後、スクリプト読みこみとなるため※）

一般的にJSの処理はページがすべて準備できてから行うべきもののはずなので、弊害もほぼなし。
## \<head\>要素の配下
\<body\>要素配下で呼び出す必要がある関数の事前定義。

スクリプトからスタイルシートを出力する場合など。

\<body\>要素の配下(\</body\>閉じタグの前)を基本とし、必要に応じて\<head\>要素の配下に配置するべき。

※async属性により非同期ロードし、読み込み完了次第の実行を実現可能。ただし、こちらでは、JS間の実行順序が担保されない。この場合、依存関係のJSを１つにまとめるかdefer属性を使用すると良い。

defer属性は、スクリプトの実行を文書の解析終了まで遅延することを指示する。
