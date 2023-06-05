# Spring Boot
Spring Frameworkは、機能が豊富なことにより、各プロジェクトをどう組み合わせればいいかわからなかったり、

ちょっとしたWEBアプリケーション作成時にも数多くの設定が必要であったりした。

また、アプリケーションサーバーのセットアップやデプロイする作業についても、多くの開発者が煩わしい作業であると感じていた。

⇒Spring Bootを使用することでこれらの課題を解決する。

### デフォルトで何も設定しなくても様々な機能を利用できる。
* XML　または　Java　ConfigによるBean定義、ログの設定、Servletの設定などが不要になる。
* アプリケーションサーバーにデプロイする必要もなくなり、Javaのmainメソッドを実行すればアプリケーションを実行できる。

## Spring Boot Auto Configure
Spring Bootを使用すると多くの設定が自動で行われる。

Spring Bootが行う自動設定の仕組みのことを「Spring Boot Auto Configure」と呼び、Conditionを設定したアノテーションをキーに設定する。

例えば、デフォルトで使用されている@SpringBootApplicationは、@Configurationと@EnableAutoConfigurationと@ComponentScanを組み合わせたものとなっている。

⇒そのクラスがコンフィグレーションクラスとなり直接@BeanアノテーションでBean定義でき、そのクラス配下のパッケージがコンポーネントスキャンの対象となる。

## starter
機能を実現するために必要なライブラリの依存関係を集約したもの。

各機能に対してspring-boot-starter-〇〇という名前でStarterが提供される。

例：spring-boot-starter-web

WEBに関連する依存関係が集約されている。
* Spring Boot
* Spring MVC
* Tomcat
* Bean Validation(Hibernate Validator)
* Jackson
* SLF4J + Logback

各依存ライブラリのバージョンは親pomであるspring-boot-starter-parentに定義されている。

ここに指定されているバージョンがアプリケーションで使用するSpring Bootのバージョンとなる。

以上により、必要な機能に応じたStarterを追加することで、必要なライブラリが追加され、AutoConfigureの@ConditionalOnClassが次々と有効になってその機能が設定なしで利用できるようになる。

## 実行可能jarの作成
従来の開発のようにwarを作成してアプリケーションサーバーにデプロイするという手順は不要。（Spring Boot自体にアプリケーションサーバーが組み込まれているため）
パッケージングの方法もwarではなくjarを使用。jar単体でアプリケーションサーバーが実行すると起動。

* 実行可能jarを作成するためのMavenコマンド

./mvnw clean package

⇒targetフォルダに以下の２つのjarファイルが作成される。

アプリ名-0.0.1-SNAPSHOT.jar(アプリケーション単体のjar)

アプリ名-0.0.1-SNAPSHOT.jar.original(実行可能jar(実行に必要な依存ライブラリのjarもすべて含まれている))

* 実行可能jarはspring-boot-maven-pluginによって作成されるため、ビルド用プラグイン定義の中には以下の定義が必要となる。（Spring Initializr作成プロジェクトにはあらかじめ設定されている）
~~~ xml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
~~~

## Spring BootでSpring MVC
Spring Bootでは、AutoConfigureによって、Spring MVCの多くの設定が自動で行われるため基本的には設定が不要となる。


