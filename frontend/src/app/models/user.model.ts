export interface AuthResponse {
    jwtToken: string;
    username: string;
    roles: string[];
}

export interface AuthRequest {
    username: string;
    password: string;
}