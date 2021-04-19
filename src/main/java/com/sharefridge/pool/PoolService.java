package com.sharefridge.pool;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import com.nimbusds.jwt.SignedJWT;
import com.sharefridge.frame.JwtService;
import com.sharefridge.frame.Utils;
import com.sharefridge.pool.expense.Expense;
import com.sharefridge.pool.member.Member;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.security.SecureRandom;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PoolService {

    private final PoolRepository poolRepository;
    private final JwtService jwtService;

    public List<Pool> getAllPools(String id){
        if(id == null || id.isEmpty()){
            return poolRepository.findAll();
        }
        return List.of(poolRepository.findById(id).orElseThrow());
    }

    public Pool createPool(Pool pool) {
        SecurityContext context = SecurityContextHolder.getContext();
        String googleUserId = Utils.getUserIdFromAuthentication(context.getAuthentication());
        String googleUserName = Utils.getUserNameFromAuthentication(context.getAuthentication());
        Member owner = new Member(googleUserId, googleUserName);
        pool.setId(null);
        pool.setCreator(owner);
        pool.setMembers(new ArrayList<>());
        pool.getMembers().add(owner);
        pool.setExpenses(List.of());

        return poolRepository.save(pool);
    }

    public Pool addExpense(String id, Expense expense) {
        Pool pool = getPoolOfAccessOk(id);
        expense.setCreator(new Member(SecurityContextHolder.getContext().getAuthentication()));
        pool.getExpenses().add(expense);
        return poolRepository.save(pool);
    }

    public Pool patchPool(Pool poolUser) {
        Pool pool = getPoolOfAccessOk(poolUser.getId());
        pool.setName(poolUser.getName());
        pool.setDescription(poolUser.getDescription());
        pool.setCurrency(poolUser.getCurrency());
        pool.setCommaPosition(poolUser.getCommaPosition());
        return poolRepository.save(pool);
    }

    public String generateInviteToken(String poolId) {
        getPoolOfAccessOk(poolId);
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder.issuer("PoolService");
        builder.expirationTime(Date.from(Instant.now().plus(10, ChronoUnit.DAYS)));
        builder.claim("poolId", poolId);
        return jwtService.sign(builder.build());
    }

    private Pool getPoolOfAccessOk(String poolId) {
        Optional<Pool> poolOptional = poolRepository.findById(poolId);
        Pool pool = poolOptional.orElseThrow(() -> new NoSuchElementException("No Poll with such id"));
        boolean isMember = pool.isMember(SecurityContextHolder.getContext().getAuthentication());
        if(!isMember){
            throw new AccessDeniedException("You are no member of that pool");
        }
        return pool;
    }

    @SneakyThrows
    public String joinPool(String token) {
        JWTClaimsSet claims = jwtService.decode(token);
        Assert.isTrue(claims.getIssuer().equals("PoolService"), "Issuer needs to be PoolService");
        Assert.isTrue(claims.getExpirationTime().after(Date.from(Instant.now())), "Token is expired");
        String poolId = (String) claims.getClaim("poolId");
        Optional<Pool> optionalPool = poolRepository.findById(poolId);
        Pool pool = optionalPool.orElseThrow(() -> new NoSuchElementException("No Pool with that id"));
        Member member = new Member(SecurityContextHolder.getContext().getAuthentication());
        pool.getMembers().add(member);
        return poolRepository.save(pool).getId();
    }
}
