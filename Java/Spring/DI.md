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

## Configration方法
* JavaベースConfigration
JavaベースConfigrationでBean登録定義を行う。（Java Config）
~~~ java
@Configration
public class AppConfig{
    @Bean
    UserRepository userRepository() {
        return new UserRepositoryImpl();
    }
~~~

1. クラスに@Configrationアノテーションを付与し、コンフィグレーションクラスであることを宣言する。

2. メソッドに@Beanアノテーションを付与し、Beanの定義を行う。メソッド名がBean名（@Bean(name="hoge")のように明示的に宣言することも可）、戻り値がそのBeanのインスタンスとして定義される。
3. メソッドを呼び出して他のコンポーネントを参照する。

Java Configの場合、メソッドの引数を追加することで他のコンポーネント（Bean）の参照ができる。ただし、引数のインスタンスは別途Bean定義されている必要あり。

Java ConfigのみでConfigrationを行うときは、アプリケーションで使用するすべてのコンポーネントをBean定義する必要があるが、後述のアノテーションベースConfigrationと組み合わせることで設定を大幅に省略することができる。

* XMLベースConfigration
XMLファイルを利用してBean定義を行う。

XMLの場合も、アプリケーションで使用するすべてのコンポーネントをBean定義する必要があるが、後述のアノテーションベースConfigrationと組み合わせることで設定を大幅に省略することができる。

* アノテーションベースConfigration

DIコンテナに管理させたいBeanをBean定義ファイルに登録するのではなく、Bean定義用のアノテーションが付与されたクラスをスキャンしてDIコンテナに登録する。

⇒コンポーネントスキャンと呼ぶ。

また、インジェクションもこれまでのように明示的に設定を行うのではなく、アノテーションを付与してDIコンテナに自動設定してもらう。

⇒オートワイアリングと呼ぶ。

~~~ java
@Component
public class UserRepositoryImpl implements UseRepository {
    @Autowired
    public UserRepositoryImpl(UserRepository userRepository, PasswordEncoder passwordEncoder){
    }
}
~~~
1. Beanクラスに@Componentアノテーションを付与して、コンポーネントスキャンの対象にする。
2. コンストラクタに@Autowiredアノテーションを付与して、オートワイアリングを行う。オートワイアリングはデフォルトで、対象の型が一致するBeanをDIコンテナから探し、見つかった場合にインジェクションする。

コンポーネントスキャンを有効にするには、Bean定義ファイル（Java Config or XML）に設定を記述する。
~~~ java
@Configration
@Conponent("com.example.demo")
public class AppConfig {
}
~~~

@Componentアノテーションにてスキャン対象とするパッケージを指定する。

## インジェクション方法
* セッターインジェクション

コンポーネントがセッターを持つ場合にそのセッターの引数に対して依存するコンポーネントを注入する方法。

アノテーションベースの例）

@Autowiredアノテーションをセッターメソッドに付与する。アノテーションベースの場合は、XMLやJavaConfigによる設定は不要。
~~~ java
@Component
public class UserServiceImpl implements UseService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoderl
    
    @Autowired
    public void setUserRepository(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }
}
~~~

* コンストラクタインジェクション
アノテーションベースの場合、コンストラクタに@Autowiredを付与する。

コンストラクタインジェクションのメリットとしては、フィールドにfinal修飾子をつけて、不変にできること。（他のインジェクション方法では実現できない）
~~~ java
@Component
public class UserServiceImpl implements UseService {
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder){
    }
}
~~~

* フィールドインジェクション

インジェクションしたいフィールドに@Autowiredを付与して使用。

その他のコンストラクタやセッター不要で、コード量が少なくできる。（コンストラクタやセッター省略の場合、SpringのDIコンテナ使用前提）

~~~ java 
@Component
public class UserServiceImpl implements UseService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;    
}
~~~

* 推奨のインジェクション方法
以下サイトより、コンストラクタインジェクションの方が推奨される模様。
https://pppurple.hatenablog.com/entry/2016/12/29/233141


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





