package com.sharefridge.securityutils;

import com.sharefridge.frame.MemberEntity;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;

import java.io.Serializable;

public class CustomPermissionEvaluator implements PermissionEvaluator {
    @Override
    public boolean hasPermission(
            Authentication auth, Object targetDomainObject, Object permission) {
        if ((auth == null) || (targetDomainObject == null) || !(permission instanceof String)){
            return false;
        }
        if(targetDomainObject instanceof MemberEntity){
            return ((MemberEntity) targetDomainObject).isMember(auth);
        }
        return false;
    }

    @Override
    public boolean hasPermission(
            Authentication auth, Serializable targetId, String targetType, Object permission) {
        if ((auth == null) || (targetType == null) || !(permission instanceof String)) {
            return false;
        }
        return hasPermission(auth, targetType.toUpperCase(),
          permission.toString().toUpperCase());
    }
}
