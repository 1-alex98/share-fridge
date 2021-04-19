package com.sharefridge.frame;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.*;
import lombok.SneakyThrows;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {

    private static final byte[] secrete = new byte[256];
    private static final MACSigner signer;
    private static final MACVerifier verifier;

    static {
        try {
            SecureRandom nativePRNG;
            nativePRNG = SecureRandom.getInstance("NativePRNG");
            nativePRNG.nextBytes(secrete);
            signer = new MACSigner(secrete);
            verifier = new MACVerifier(secrete);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @SneakyThrows
    public String sign(JWTClaimsSet jwtClaimsSet){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        SignedJWT signedJWT = new SignedJWT(header, jwtClaimsSet);
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }

    public JWTClaimsSet decode(String token) throws ParseException, JOSEException {
        JWT parse = JWTParser.parse(token);
        ((SignedJWT) parse).verify(verifier);
        return parse.getJWTClaimsSet();
    }
}
