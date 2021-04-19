package com.sharefridge.config;

import com.sharefridge.security.CustomAuthenticationFailureHandler;
import com.sharefridge.security.CustomAuthenticationSuccessHandler;
import com.sharefridge.security.HttpCookieOAuth2AuthorizationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.session.ChangeSessionIdAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    private final CustomAuthenticationFailureHandler customAuthenticationFailureHandler;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/app/**").permitAll()
            .antMatchers("/").permitAll()
            .anyRequest().authenticated()
        .and()
        .oauth2Login()
            .failureHandler(customAuthenticationFailureHandler)
            .successHandler(customAuthenticationSuccessHandler)
            .loginPage("/app")
                    .authorizationEndpoint()
                    .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository)
        .and().and()
        .logout().deleteCookies("SESSION");

        http.csrf().disable();

        http.sessionManagement().sessionAuthenticationStrategy(session());
    }

    @Bean
    public DefaultCookieSerializer customCookieSerializer(){
        DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
        cookieSerializer.setSameSite("Strict");
        return cookieSerializer;
    }

    @Bean
    public SessionAuthenticationStrategy session(){
        return new ChangeSessionIdAuthenticationStrategy();
    }

}
