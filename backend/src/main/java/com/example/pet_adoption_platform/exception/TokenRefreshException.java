package com.example.pet_adoption_platform.exception;

public class TokenRefreshException extends RuntimeException {
    public TokenRefreshException(String token, String message) {
        super("Failed for [" + token + "]: " + message);
    }
}
