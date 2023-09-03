export type Position = {
    id: number;
    name: string;
};

export type PositionsResponse = {
    success: boolean;
    positions: Position[];
};

export type PositionsErrorResponse = {
    success: boolean;
    message: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    position_id: number;
    registration_timestamp: Date;
    photo: string;
};

export type UserResponse = {
    success: boolean;
    user_id: number;
    message: string;
};

export type UserErrorResponse = {
    status: number;
    data: {
        success: boolean;
        message: string;
        fails?: {
            name?: string;
            email?: string;
            phone?: string;
            position_id?: string;
            photo?: string;
        };
    };
};

export type UsersResponse = {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: {
        next_url: string;
        prev_url: string;
    };
    users: User[];
};
