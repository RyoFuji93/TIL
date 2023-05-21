# Spring Boot Actuator
アプリケーションの監視および管理を行う目的で、動作しているアプリケーションの各種情報を取得することができる機能。

Actuatorを使用可能な状態にすると、各種情報にアクセスするためのエンドポイントが公開される。

## エンドポイント
* actuator  
Spring Boot Actuatorによって公開されているすべてのエンドポイントを確認する。
* actuator/health  
正常に起動しているかを確認する。
* actuator/env  
アプリケーションによって使用されているプロファイル　および　環境変数を確認することができる。
* actuator/beans  
アプリケーション内で管理されているBeanの一覧を確認する。
* actuator/mappings  
RequestMappingで指定したパスのリストを確認できる。
* その他エンドポイント  
https://spring.pleiades.io/spring-boot/docs/current/reference/html/actuator.html

### 使用法
spring-boot-starter-actuatorを依存関係を使用すれば基本的に利用可能。

ただし、デフォルトでは/actuator/healthのみしか公開されていないため、application.propertiesにて確認したいエンドポイントを指定する。
~~~ application.properties 
management.endpoints.web.exposure.include=*
~~~

Spring Boot Actuatorでは利用するユーザを制限するために、しばしばSpring Securityも同様に使用する。

Actuatorを参照できるユーザを管理者のみに設定するなど、設定できる。
* @Configrationをクラスに付与すると、@Beanで指定したメソッドのBeanの戻り値が、Springコンテナ上で登録・管理される。  
※Springコンテナで管理されるBeanとして、@Beanメソッドを宣言する場合は、@Configrationをクラスに付与する。
* @EnableWebSecurityをクラスに指定することで、SpringSecurityを使えるようにする。
* SecurityFilterChainを戻り値とするメソッドに@Beanを付与し、Springコンテナに登録する。  
HttpSecurityによって、認証画面　および　許可の条件を指定することができる。
* WebSecurityCustomizerを戻り値とするメソッドに@Beanを付与する。認証を不要とする例外のパスを定義したりすることができる。
* InMemoryUserDetailsManagerを戻り値とするメソッドに@Beanを付与する。Spring Boot Actuatorを使用できるユーザを定義。
~~~ java
@Configuration
@EnableWebSecurity
public class ActuatorSecurity {
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.authorizeHttpRequests(authorize -> authorize
				.requestMatchers("/","/items","/items/**").permitAll() //APIは認証不要
				.requestMatchers("/actuator/**").hasRole("ADMIN") //ActuatorはADMINロールユーザのみ
				.anyRequest().denyAll()
				)
		.formLogin();
		
		return http.build();
	}
	
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers("/actuator/health");
	}
	
	//actuatorの認証ユーザ
	@Bean
	public InMemoryUserDetailsManager userDetailsService() {
		UserDetails user = User.withUsername("admin")
				.password("{noop}admin")
				.roles("ADMIN")
				.build();
		return new InMemoryUserDetailsManager(user);
	}
}
~~~
