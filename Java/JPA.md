# JPA(Java Persistence API)
JAVA標準のORM（Object-Relational Mapping）。

ORMは、Javaで言うオブジェクトとデータベースのマッピングを行う役割を持つ。

JPAがどのようにしてデータベースへのアクセスを可能にしているかと言うと、EntityとEntityManagerを使用することで実現している。

## Entity
データベース上のデータをマッピングするJavaのオブジェクトをEntityと呼ぶ。

Entityはメモリ上のJavaオブジェクトであり、EntityManagerを通してデータベースと同期される。

JPAではEntityクラスかどうか（@Entity）や、マッピングに必要な情報(@idや@Columnなど)を付加するための様々なアノテーションが提供されている。

## Entity Manager
Entityとデータベースの同期を取る役割を持つ。

EntityManagerにはPersistence Contextと呼ばれる、Entityを管理するための領域があり、データベースアクセスをする場合はPersistence Context内のEntityを取得したり、新規でEntityを登録する必要がある。

上記によって、EntityManagerがEntityの状態を追うことができ、適切なタイミングでデータベースと同期を取ることができる。

EntityManagerにはEntityの状態を変更したり、データベースと同期をとるAPIが用意されている。

> EntityManagerに対する操作をしたタイミングでデータベースには反映されず、トランザクションがコミットもしくは強制的に同期(flush)されたタイミングでPersistence Contextに蓄積したEntityへの変更がデータベースへ反映される。
>
> Persistence Contextはトランザクション単位

# メリット
1. Entityには４つの状態が存在する。

・new状態：新規に作成したインスタンスがPersistence Contextに未登録の状態

・管理状態：Persitence Contextに登録された状態、同期有効

・分離状態：Persistence Contextから切り離された状態、戻すことが可能

・削除済み状態：データベースから削除される予定の状態、データベースが削除されるまで続く

★EntityManagerのAPIを使用することで上記の状態を変更することができる。

2.  テーブル間の関連をEntity同士の参照関係としてマッピングできる。

データベースではテーブル間の関連を外部キーを用いる。

そのため、データベースと同様にJPAではEntity間の関連をアノテーションを使用してマッピングすることができる。（@OneToOne、@OneToMany、@ManyToOneなど）

関連元のプロパティにアクセスするだけで、関連しているEntityデータを取得できるのがJPAの大きなメリットとなる。

3. 排他制御を行う機能がある。

JPAでは楽観ロックと悲観ロックを両方サポートしている。

# まとめ
以下の点で開発工数を大幅に削減でき、ソースコードの読みやすさも向上するので、非常に便利。

* SQLを記載しないで、DBとオブジェクトを連携できる。

* DBを扱う上で重要となる排他制御についてサポートされている

