package com.sharefridge.frame;

import org.springframework.security.core.Authentication;

public interface MemberEntity {
    boolean isMember(Authentication authentication);
}
