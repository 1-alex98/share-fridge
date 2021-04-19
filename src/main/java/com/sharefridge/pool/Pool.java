package com.sharefridge.pool;

import com.sharefridge.frame.MemberEntity;
import com.sharefridge.frame.Utils;
import com.sharefridge.pool.expense.Expense;
import com.sharefridge.pool.member.Member;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.Authentication;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Document
public class Pool implements MemberEntity {
    @Id
    private String id;
    @NotNull
    private String name;
    @NotNull
    private Member creator;
    @NotNull
    private String description;
    @Field
    /**
     * ISO 4217
     */
    private String currency = "EUR";

    private int commaPosition = 2;

    private List<Expense> expenses;

    @NotNull
    private List<Member> members;

    @Override
    public boolean isMember(Authentication authentication) {
        String userIdFromAuthentication = Utils.getUserIdFromAuthentication(authentication);
        if(members == null) return false;
        return members.stream().anyMatch(s -> s.getId().equals(userIdFromAuthentication));
    }
}
