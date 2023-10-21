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

## UserDetailsService

以下は、UserDetailServiceクラスを利用して、DBでユーザ情報を管理した場合のクラス。

DBから、ユーザ情報を取得するクラスをConfigureで定義。（loadUserByUserNameを実装）

~~~ java
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private  final UserRepository userRepository;

 @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .map(
                        user -> new CustomerUserDetails(
                                user.getUsername(),
                                user.getPassword(),
                                toGrantedAuthorityList(user.getAuthority())
                        )
                )
                .orElseThrow(
                        () -> new UsernameNotFoundException(
                                "Given username is not found. (username = '" + username +"')"
                        )
                );
    }

    private List<GrantedAuthority> toGrantedAuthorityList(User.Authority authority) {
        return Collections.singletonList(new SimpleGrantedAuthority(authority.name()));
    }
}
~~~

## 権限によって表示内容を変える

thymeleaf上で、権限を確認し制御。

通常ユーザでは、「ユーザー一覧」を参照できないようにする例。

詳細はthymeleafの公式ブログを参照。

https://www.thymeleaf.org/doc/articles/springsecurity.html

~~~ html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5"
      th:replace="~{fragments/layout :: layout(~{::title}, ~{::body})}">
<head>
    <title>トップページ | 課題管理アプリケーション</title>
</head>
<body>
<h1 class="mt-3">課題管理アプリケーション</h1>
<ul>
    <li>
        <a href="./issues/list.html" th:href="@{/issues}">課題一覧</a>
    </li>
    <li sec:authorize="hasAuthority('ADMIN')">
        <a href="./users/list.html" th:href="@{/users}">ユーザー一覧</a>
    </li>
    <li>
        <a href="./logout.html" th:href="@{/logout}">ログアウト</a>
    </li>
</ul>
</body>
</html>
~~~

## 権限によってメソッド呼び出しを制御する

通常ユーザでは、ユーザ一覧ページに遷移できないようにする。（URL直アクセスでも不可にする。）

以下、例としてユーザ一覧ページで使用されるメソッドを管理者のみ実行できるようにする。

~~~ java
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PreAuthorize("hasAuthority('ADMIN')")
    public List<User> findAll(){
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public void create(String username, String password){
        String encodedPassword = passwordEncoder.encode(password);
        userRepository.insert(username,encodedPassword);
    };
}
~~~

以下、Configメソッドを定義し、＠PreAuthorizeを有効化する必要あり。

~~~ java
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MethodSecurityConfig
{
}
~~~

認可エラーが発生した場合は、403エラーとなるためエラー遷移ページを用意。

Springの機能でtemplates/error/403(エラーコード).htmlを作成により、遷移ページを作成することができる。

~~~ html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>403 Forbidden</title>
</head>
<body>
<h1>403 Forbidden</h1>

</body>
</html>
~~~

## 権限によってWebリソースの呼び出しを制限する

ログインページと同様@EnableWebSecurity付与のConfigクラスで設定する。

~~~ java
   http.authorizeRequests()
                .mvcMatchers("/users/**").hasAnyAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login").permitAll();
~~~
