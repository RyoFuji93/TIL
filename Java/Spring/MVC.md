# Controllerクラス
リクエストの入口で、必要な業務処理を呼び出す。

複雑な処理は基本的には書かない。

@Controllerや@RestControllerアノテーションを付与。

# Serviceクラス
業務処理の元となる箇所。

ビジネスロジックはサービスクラスに実装する。

@Serviceアノテーションを付与。

# @Autowired
Controllerクラスから、Serviceクラスを呼び時は、@Autowiredアノテーションを使用する。

Spring　Bootがサービスクラスのインスタンスを自動で注入してくれる。

⇒@Serviceや@Controllerや@Componentなど、Bean登録したクラスはDI管理対象となるため、@Autowiredでクラスを呼び出すことができる。
