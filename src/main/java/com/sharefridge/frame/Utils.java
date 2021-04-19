package com.sharefridge.frame;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;

public class Utils {
    public static String getUserIdFromAuthentication(Authentication authentication){
        return ((OAuth2AuthenticatedPrincipal) authentication.getPrincipal()).getName();
    }
    public static String getUserNameFromAuthentication(Authentication authentication){
        String familyName = ((OAuth2AuthenticatedPrincipal) authentication.getPrincipal()).getAttribute("family_name");
        String givenName = ((OAuth2AuthenticatedPrincipal) authentication.getPrincipal()).getAttribute("given_name");
        return givenName + (familyName== null? "": " "+familyName);
    }
}
