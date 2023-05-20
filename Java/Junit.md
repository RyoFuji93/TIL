# JUnitとは  
Javaの単体テスト用フレームワーク。単体テストを効率よく実施するためのもの。

## メリット  
* テスト実行を自動化できる
* テストコードを仕様・ソースの理解に利用できる
* 問題を早期発見できる。  
etc..

## デメリット
* 関連ツールやライブラリの知識が必要
* テストコードの実装に時間がかかる
* Junitの仕組みでは、向いていないテストがある  
etc..

# springでのtest
src/test/java～に作成したテストクラスを格納する。
* テスト対象クラスの同一パッケージ配下にテストクラスを作成
* デフォルトではSpringBootApplicationクラスに対応するテストクラスが
* テストクラスの命名は、「テスト対象クラス名 + Test」となる。

## spring-boot-starter-test
spring-boot-starter-testを追加する事で使用できるライブラリ（代表的なもの）
* JUnit5

以下モジュールで構成される単体テストフレームワーク。

Junit Platform:テストフレームワークを起動するための基盤

Junit Jupiter:Junit5のことを指し、TestEngineを提供

* Spring Test & Spring Boot Test

Spring Bootベースアプリケーションのテストを実行するために必要なライブラリ群

MockMVCという、Tomcatを起動させない状態でも、Springの動作を再現することができるフレームワークを持つ

* AssertJ

Junitで値を検証するときに使用するライブラリ。

## 書き方
@SpringBootTestを利用することで、SpringBootアプリケーションの検証を行うことができる。

JUnit5の書き方に従い、AssertJを利用した値の検証を記述することができる。
