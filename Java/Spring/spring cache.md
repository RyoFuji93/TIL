# Springでcacheを利用する
Spring cache abstractionを依存関係に追加し利用する。

## キャッシュを有効にする
* @EnableCachingを@SpringBootApplicationのクラスに指定する。
~~~ java
@SpringBootApplication
@EnableCaching
public class SpringitemApplication
~~~

* ＠Cacheable
