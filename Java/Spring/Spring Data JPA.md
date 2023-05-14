# JPA
Java標準のORM（Object-Relational Mapping）。
# Spring Data JPA
データストアに対するアクセスを抽象化したライブラリであるSpring Dataのサブプロジェクトであり、JPAを更に便利にした機能をもち、コードの書きやすさ、管理がしやすくなる。

# メリット
* SQLを記載しないで、DBとオブジェクトを連携できる。【JPA】
* DBを扱う上で重要となる排他制御についてサポートされている【JPA】
* JPAの機能を使用したデータベースアクセスのソースコードの書きやすさや管理のしやすさを実現【Spring Data JPA】

# 使用してみた
Hibernate（JPAの実装の１つ、SpringでJPAを利用する場合、HibernateがJPAのデフォルト実装として選択される。）を活用し、データアクセスを実装する。

* java Object
~~~ java
@Entity(name="m_item")
public class Item{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long ItemId;
  private String itemName;
  private String itemCategory;
}
~~~
@Entity :Entityクラスを示し、name属性に実際に対応するテーブル名を指定する。

@Id:キー値(ID)となる項目に指定する。

@GeneratedValue:ID生成方針を定義する。GeneratedType.IDENTITYは、キー値生成をDBの機能で行う。(MYSQLではauto_incrementに対応する)

* インターフェース

インターフェースを定義するだけで、あらかじめ用意されたデータ操作を行うことができる。

~~~ java
@Respsitory
public interface ItemRepository extends CrudRepository<Item, Long>{

}
~~~

@Repository:DBアクセスを行うことを示す。

@CrudRepository:エンティティクラスと、IDを指定することで、CRUD機能を実装する。

Interfaceクラスだけを定義。実装クラスは不要。

* Serviceクラス

~~~ java
@Service
public class ItemService{
  @Autowired
  private ItemRepository itemRepositoty;
  
  public list<Item> getAllItems(){
    List<item> allItems = new ArrayList<>();
    itemRepository.findAll().forEach(allItems::add);
    
    return allItems;
  }
}
~~~

@Serviceクラスで@Repository付与のインターフェースクラスを@Autowiredをつけてそのまま利用する。

CrudRepositotyで使用できるメソッドを利用。

> * save : 指定したエンティティを登録する。
> * findById(id) :　キー値を指定すると、指定されたエンティティを検索する。
> * findAll : 対応するテーブルの全件を検索する。
> * deleteById(id) : 指定されたキー値のデータを削除する。
