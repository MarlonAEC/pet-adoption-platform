package com.example.pet_adoption_platform.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.security.Key;

import java.util.Date;
import java.util.logging.Logger;

@Component
public class JwtUtils {
    static Logger logger = Logger.getLogger(JwtUtils.class.getName());

    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.app.jwtRefreshSecret}")
    private String jwtRefreshSecret;

    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Value("${spring.app.jwtRefreshExpirationMs}")
    private int jwtRefreshExpirationMs;

    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken =  request.getHeader("Authorization");
        logger.info("Authorization Heaer: {} " + bearerToken);
        if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Remove Bearer prefix
        }
        return null;
    }

    public String generateTokenFromUsername(UserDetails userDetails) {
        String username = userDetails.getUsername();

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key())
                .compact();
    }

    public String generateRefreshTokenFromUsername(UserDetails userDetails) {
        String username = userDetails.getUsername();

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtRefreshExpirationMs))
                .signWith(refreshKey())
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String getUserNameFromRefreshToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) refreshKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    private Key refreshKey() {
        // Use a different secret or key for refresh tokens
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtRefreshSecret));
    }

    public boolean validateRefreshToken(String token) {
        try {
            Jwts.parser().verifyWith((SecretKey) refreshKey()).build().parseSignedClaims(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.severe("Invalid refresh token: {}" + e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.severe("Refresh token is expired: {}" + e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.severe("Refresh token is unsupported: {}" + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.severe("Refresh token claims string is empty: {}" + e.getMessage());
        }
        return false;
    }

    public boolean validateJwtToken(String authToken) {
        try {
            System.out.println("Validate");
            Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.severe("Invalid JWT token: {}" + e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.severe("JWT token is expired: {}" + e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.severe("JWT token is unsupported: {}" + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.severe("JWT claims string is empty: {}" + e.getMessage());
        }
        return false;
    }
}
