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

・Junit Platform:テストフレームワークを起動するための基盤

・Junit Jupiter:Junit5のことを指し、TestEngineを提供

* Spring Test & Spring Boot Test

Spring Bootベースアプリケーションのテストを実行するために必要なライブラリ群

MockMVCという、Tomcatを起動させない状態でも、Springの動作を再現することができるフレームワークを持つ

* AssertJ

Junitで値を検証するときに使用するライブラリ。

## 書き方
@SpringBootTestを利用することで、SpringBootアプリケーションの検証を行うことができる。

JUnit5の書き方に従い、AssertJを利用した値の検証を記述することができる。
~~~ java
@SpringBootTest
class SpringitemApplicationTests {

	@Autowired
	private ItemController itemController;
	
	// アプリケーションがSpringコンテキストを正常にロードできたかどうかを検証する。
	@Test
	void contextLoads() {
		//AssrtJを利用した検証を実装する
		//assertThatの引数に検証の値を入れる
		//続けてメソッドにて期待値を指定。この場合はNullでないこと
		
		//itemControllerが@Autowiredによって、自動でインスタンス化されてNullでないことを確認する。
		assertThat(itemController).isNotNull();
	}
~~~
* @SpringBootTest

テストクラスにてSpring Bootの機能が利用できるようになる。

コンソール上、SpringBootが起動しているように見えるが、Tomcatサーバは起動していない。

* @Test

Junitがテストケース（テスト項目表の１テストケースに対応するイメージ）として管理する。

AssertJの機能を用いて値を検証する。asserThat(テスト項目).メソッド(期待値)という形式で、テスト項目がNULLでないことを確認する。

期待値と異なっていた場合は、単体テストNGとしてJunitが管理する。

### MockMVCを用いたテストケースの書き方
MockMVCを使用すると、アプリケーションサーバが起動していない状態においても、Springアプリケーションの動作を再現させることができる。

Controllerのテストを行う際に利用。

~~~ java
@SpringBootTest
@AutoConfigureMockMvc
class ItemControllerTest {
	
	@Autowired
	private MockMvc mvc;

	
	//検索結果が想定通りであるかを確認するテスト
	@Test
	void testGetItem() throws Exception{
		int itemId = 1;
		String responseJsonString =mvc.perform(get("/items/{itemId}",itemId)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON_UTF8_VALUE) //非推奨であるが現時点では入れる必要がある。
				.characterEncoding("UTF-8"))
				.andExpect(status().isOk()) //ステータスコードチェック
				.andReturn().getResponse().getContentAsString();
		// 取得したJsonオブジェクトをJavaオブジェクトにマッピング
		ObjectMapper objectMapper =  new ObjectMapper();
		Item responseItem = objectMapper.readValue(responseJsonString, Item.class);
		
		//各値を比較する
		assertThat(responseItem.getItemId()).isEqualTo(1L);
		assertThat(responseItem.getItemName()).isEqualTo("ネックレス");
		assertThat(responseItem.getItemCategory()).isEqualTo("ジュエリ");
	}

}
~~~

* @AutoConfigureMockMvc
@AutoConfigureMockMvcアノテーションを付加すると、MockMVCが自動構成され、@Autowiredアノテーションで利用することができるようになる。

* MockMvc.performメソッドを利用して、HTTP GET等のAPI呼び出しを再現し、動作を検証する事ができる。



