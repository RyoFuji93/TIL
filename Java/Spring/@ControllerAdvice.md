@ControllerAdviceを利用して、全てのControllerにて共通に例外処理を行う。（HTTPレスポンスとして、クライアントに任意のステータスでエラー内容を返すなど）
# 実装例
* 独自例外クラス
~~~　java
public class ItemNotFoundException extends RuntimeException{
  private static final long serialVersionUID = 1L;
  
  public ItemNotFoundException(Long itemId){
    super("商品コード:" + itemId + "は見つかりません。");
  }
}
~~~

* エラー処理をコントローラの共通処理とする@ControllerAdvice実装クラス
~~~ java
@ControllerAdvice
public class　ItemNotFoundExceptionControllerAdvice {
  @ResponseBody
  @ExceptionHandler(ItemNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public String itemNotFoundHandler(ItemNotFoundException ex){
    return ex.getMessage();
  }
}
~~~

@ExceptionHandler : 指定した例外クラスがControllerで発生した場合に該当メソッドでハンドリングする。

@ResponseStatus : クライアントにレスポンスを返すステータスコードを指定する。NOT_FOUNDは404エラー。
