# RestTemplate
Spring Bootアプリケーションから他のAPIを呼び出す場合、RestTemplateを使用し、簡単に実装することができる。

# 使用例
~~~ java 
@Service
public class ItemService{

  @Autowired
  private ItemRepositoty itemRepository;
  
  private RestTemplate restTemplate;
  
  public ItemService (RestTemplateBuilder restTemplateBuilder){
    this.restTemplate = restTemplateBuilder.build();
  }
}
~~~
* RestTemplateBuilderは、SpringBootが管理しており、コンストラクタでインジェクションされるため、そのまま利用する。
* RestTemplateのインスタンス生成は、RestTemplateBuilderのBuildメソッドを使用する。

~~~ java
public HelloMessage getHelloResponse() {
  String URL = "http://localhost:8081/hello";
  String hello = restTemplate.getForObject(URL, String.class);
  
  HelloMessage retHello = new HelloMessage(hello);
  
  return Hello;
}
~~~
* RestTemplateのgetForObjectメソッドを利用して、HTTP GETを指定したURLに対して実行できる。
