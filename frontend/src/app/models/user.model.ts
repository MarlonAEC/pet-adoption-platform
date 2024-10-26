export interface AuthResponse {
    jwtToken: string;
    username: string;
    roles: string[];
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface User {
    username: string;
    email: string;
    address: string;
    name: string;
    password: string;
}