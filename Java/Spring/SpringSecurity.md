# SpringSecurity

Springでのセキュリティ機能の実装メモ

## ログインページ

@EnableWebSecurityを付与したconfigクラスを作成し、以下のようにログインページを指定する。

⇒Topページとして、login認証ページが表示されるようになる。
~~~　java
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/login/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login");
    }
}
~~~

ログインページ例

name=username,passwordはSpringWebSecurityのデフォルトのnameを使用。（変更したい場合Configを編集）

~~~ html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org"
      th:replace="~{fragments/layout :: layout(~{::title}, ~{::body})}">
<head>
    <title>ログインページ | 課題管理アプリケーション</title>
</head>
<body>
<h1 class="mt-3">課題管理アプリケーション</h1>
<div th:if="${param.error}">
    <p>ユーザ名もしくはパスワードが違います</p>
</div>
<form action="#" th:action="@{/login}" method="post">
    <div class="mt-3">
        <label for="usernameInput" class="form-label">ユーザ名</label>
        <input type="text" id="usernameInput" name="username" class="form-control">
    </div>
    <div class="mt-3">
        <label for="passwordInput" class="form-label">パスワード</label>
        <input type="password" id="passwordInput" name="password" class="form-control">
    </div>
    <div class="mt-3">
        <button type="submit" class="btn btn-primary">ログイン</button>
    </div>
</form>
</body>
</html>
~~~

## Cookie

Cookie機能も自動で実装される。

（レスポンスヘッダーにSetCookieあり）
