# Thymeleaf
Javaのコード上にHTMLを直接記載できるが、表示ページの見た目を変更したい際に、Javaソースコードを編集する必要がある。（UIとロジックの境界があいまい）

↓

テンプレートエンジン（テンプレートとデータから動的に文字を生成するもの）を使用。

thymeleafはSpringと親和性が高いテンプレートエンジンである。(JSPではなくThymeleafが推奨されている)

## templateファイル
Javaと連携したい（動的に変更したい）ファイルは、classpath:/templates/に配置する。

Controllerメソッドにて、対応するファイルを指定し、Javaとファイルを連携する。（ファイルの拡張子は省略可（.htmlなど））

## 静的ファイル
JavascriptファイルやCSSファイル、あるいは動的に変更のないHTMLファイルは、src/main/resources/staticに配置。


