package com.sharefridge.securityutils;

import com.nimbusds.jwt.JWTClaimsSet;
import com.sharefridge.frame.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.SerializationUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CookieService {

    private final JwtService jwtService;

    public Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return Optional.of(cookie);
                }
            }
        }

        return Optional.empty();
    }

    public void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    public void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals(name)) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }

    public String serialize(Object object) {
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder.issuer("CookieService");
        builder.claim("base64", Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(object)));
        return jwtService.sign(builder.build());
    }

    @SneakyThrows
    public <T> T deserialize(Cookie cookie, Class<T> cls){
        String value = cookie.getValue();
        JWTClaimsSet decode = jwtService.decode(value);
        Assert.isTrue(decode.getIssuer().equals("CookieService"), "Token needs to be issued by Cookie Service");
        return cls.cast(SerializationUtils.deserialize(
                        Base64.getUrlDecoder().decode((String) decode.getClaim("base64"))));
    }


}
