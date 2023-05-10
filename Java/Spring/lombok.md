# lombokとは
コンストラクタやGetter・setterを自動生成してくれるライブラリ。
### Gradleに以下を追加
~~~
configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

dependencies {
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
}
~~~

### コンストラクタの自動生成
@NoArgsConstructor, @RequiredArgsConstructor, @AllArgsConstructorがある。
https://projectlombok.org/features/constructor

* アノテーションをクラスに付与して使用する。
~~~ java
@AllArgsConstructor
public class IssueEntitiy {
    private long id;
    private String summary;
    private String description;
}
~~~
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/469740/8c9aef3d-5ece-8fbe-6774-c17b830b8b26.png)
構造を確認すると、コンストラクタが作成されていることがわかる。

### Getter・Setterの自動生成
@Getter・@Setterアノテーションが存在するが、
equalsやToStringなどの諸々のメソッドも自動生成してくれる@Dataを使用する。
~~~ java
@AllArgsConstructor
@Data
public class IssueEntitiy {
    private long id;
    private String summary;
    private String description;
}
~~~
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/469740/c6759ba3-570f-806b-b675-c220244ce7b5.png)
構造を確認すると、Getter・Setter、その他メソッドが自動生成されていることがわかる。

### 公式サイト
https://projectlombok.org/
featuresメニューより利用可能なアノテーション確認可能
