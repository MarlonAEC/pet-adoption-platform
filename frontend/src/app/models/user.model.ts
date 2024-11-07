export interface AuthResponse {
    jwtToken: string;
    username: string;
    roles: string[];
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface Authority {
    id: {
        username: string;
        authority: string;
    };
}

export interface UserInput {
    username: string;
    name: string;
    email: string;
    address: string;
    password: string;
}
export interface UserResponse {
    username: string;
    name: string;
    email: string;
    enabled: boolean;
    authorities: Authority[];
    address: string;
    createdAt: string;
    updatedAt: string;
    password: string;
}

export interface UserMetrics {
    totalRegularUsers: number;
    totalUsers: number;
    totalAdminUsers: number;}