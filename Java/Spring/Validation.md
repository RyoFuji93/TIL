# Validation機能
WEBアプリケーションにおいて、POSTするリクエスト内のカラムのチェックを行いたい場合、使用する。

## 実装手順
1, プロジェクト管理ツール（Maven、Gradle）のdependencesにvalidationの依存関係を追加する。
2, 相関チェックしたいFormの項目に、アノテーションを付与し実装する。
~~~ java
@Data
public class IssueForm {

    @NotBlank
    @Size(max=256)
    private String summary;

    @NotBlank
    @Size(max=256)
    private String description;

}
~~~

3,Controller側のフォーム内容を受け取るメソッドにて、バリデーション処理を実装する。

* @Validated
Formクラスに付与している相関チェック内容を受け取り時に適用する。
* BindingResult
相関チェック結果を格納する。
下記例では、エラー時に入力画面に遷移するように処理を実装。

~~~ java
    @PostMapping
    public String create(@Validated IssueForm form, BindingResult bindingResult, Model model){
        if(bindingResult.hasErrors()){
            return showCreationForm(form);
        }
        issueService.create(form.getSummary(),form.getDescription());
        return "redirect:/issues";
    }
~~~
