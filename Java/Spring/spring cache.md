# Springでcacheを利用する
Spring cache abstractionを依存関係に追加し利用する。

## キャッシュを有効にする
* @EnableCachingを@SpringBootApplicationのクラスに指定する。
~~~ java
@SpringBootApplication
@EnableCaching
public class SpringitemApplication
~~~

* データ取得のメソッドに＠Cacheableを付与し、取得結果をキャッシュするようにする。
~~~ java
@Cacheable(value = "getItems")
	public List<Item> getAllItems(){
~~~
valueにてキャッシュ管理名称を指定する。

* キー値別にキャッシュ管理する場合には、key属性も指定する。
~~~ java
	@Cacheable(value = "getItem", key="#p0")
	public Optional<Item> getItem(Long itemId) {
~~~
一般的には#p0がよく使用される。検索のキー値ごとに管理されるようになる。

## キャッシュを削除する
* CasheEvictでキャッシュの値を削除する。

⇒データ新規登録時に、既に登録されている全件検索時のキャッシュを削除する場合などに使用する。
~~~ java
	@CacheEvict(value = "getItems", allEntries=true)
	public void addItem(Item item) {
~~~
allEntries=true

指定した文字列で管理されているキャッシュ全体を削除したい場合に指定

* 複数のキャッシュ削除を指定したい場合

⇒@Cacheingアノテーションにevict属性を用いて@CacheEvictを複数指定することができる。

指定データ更新・削除時に、対象のキー値で管理されているキャッシュ　および　全件検索取得のキャッシュをそれぞれ削除したい場合などに使用する。
~~~ java
	@Caching(evict = {
			@CacheEvict(value="getItem", key="#p0"),
			@CacheEvict(value="getItems", allEntries=true)
	})
	public void updateItem(Long itemId,Item item) {
~~~


