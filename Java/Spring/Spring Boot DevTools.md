# Spring Boot DevTools
Spring　Bootの開発効率化のために使用。

利用するとソースコードがビルドされれば、再起動を行わずにサーバは起動のままで修正内容を反映することができる。
## dependenciesの追加
developmentOnly 'org.springframework.boot:spring-boot-devtools'

# 利用した機能
## Automatic Restart
* Javaのソースコードが変更された際に、自動でSpringが再起動される。
* 必要な設定
設定→ビルド・実行・デプロイメニュー→コンパイラ
１，「自動的にプロジェクトをビルドする」にチェックが入れる
２，詳細設定のコンパイラ→「開発対象のアプリケーションが実行中でも自動Makeの開始を可能とする」にチェックを入れる。

## Hot Swapping
* template変更の自動反映
application.propertiesにspring.thymeleaf.prefixを追加し、templateのパスを指定
