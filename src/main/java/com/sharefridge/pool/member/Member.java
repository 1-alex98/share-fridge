package com.sharefridge.pool.member;

import com.sharefridge.frame.Utils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Member {
    private String id;
    private String displayName;

    public Member(Authentication authentication){
        id = Utils.getUserIdFromAuthentication(authentication);
        displayName = Utils.getUserNameFromAuthentication(authentication);
    }
}
