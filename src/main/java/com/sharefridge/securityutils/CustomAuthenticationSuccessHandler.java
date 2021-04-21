package com.sharefridge.securityutils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        Optional<Cookie> redirect = Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals("redirect")).findAny();
        if(redirect.isPresent() && redirect.get().getValue() != null && !redirect.get().getValue().isEmpty()){
                try {
                    Cookie redirectCookie = new Cookie("redirect", null);
                    redirectCookie.setMaxAge(0);
                    redirectCookie.setPath("/");
                    response.addCookie(redirectCookie);
                    response.sendRedirect(redirect.get().getValue());
                    return;
                } catch (IOException e) {
                    log.warn("Redirect failed ", e);
                }
        }
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
        response.sendRedirect("/app");
    }

}
