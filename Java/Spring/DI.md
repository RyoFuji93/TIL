# DI(Dependency Injection):依存性の注入
* コンポーネントを構成するインスタンスの生成と依存関係の解決をソースコードから分離することができる。（DIコンテナが提供）

* 複数のモジュールを組み合わせて１つの処理を実装する際に、力を発揮する。

⇒蜜結合から疎結合にし、変更コストを抑えることができる。

## DIコンテナ
あるクラスに必要となるコンポーネントを設定する。
⇒「依存性を注入（DI）する」「インジェクションする」という。
DIを自動で行い、インスタンスを組み替えてくれる基盤を「DIコンテナ」と呼ぶ。

DIコンテナにより、それまで直接インスタンスを生成（new）していたアプリケーションをDIコンテナを経由してインスタンスを取得することができる。

DIコンテナを経由してインスタンスを管理することにより、以下のようなメリットを享受できる。

* インスタンスのスコープ制御
* インスタンスのライフサイクルを制御できる
* 共通機能を組み込める
* コンポーネント間が疎結合になるため、単体テストがしやすくなる。

## ApplicationContextとBean
Spring FrameworkではApplicationContextがDIコンテナの役割を担う。
DIコンテナにConfigrationを使用してコンポーネントを登録し、アプリケーションはApplication Contextインターフェースを通じてDIコンテナからBeanを取得する。
* Bean  
DIコンテナに登録するコンポーネント。
* Configration  
Bean定義（クラス）。
* ルックアップ  
DIコンテナからBean取得すること。

## 使用法
SpringでDIを使用するには、Beanの登録とインジェクションを実施する必要がある。
* Bean登録
Bean＝DI管理対象のクラスのこと。
@Component-付与したクラスがBeanであることを示す。
代わりにユースケースを現すアノテーションを使える。（@Controller、@Service、@Repositoryなど）
@Beanというものもある。
* インジェクション
引数ありのコンストラクタを用意する。（@Autowiredは省略可能）など。
~~~ java
@Controller
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;
~~~
lombokの@RequiredArgsConstructorにてインジェクションを自動化できる。
→finalがついているフィールド　かつ　初期化されていないフィールドを初期化するコンストラクタを自動生成。





