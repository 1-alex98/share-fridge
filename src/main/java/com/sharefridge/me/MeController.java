package com.sharefridge.me;

import com.sharefridge.frame.Utils;
import com.sharefridge.pool.member.Member;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeController {
    @GetMapping("/api/me")
    public Member getMyId(){
        return new Member(SecurityContextHolder.getContext().getAuthentication());
    }
}
