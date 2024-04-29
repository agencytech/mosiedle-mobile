export interface User {
    id: string;
    fullName: string;
    email: string;
    created_at: string;

    role_id: string;
    roles: Role[];

    communities: Community[];
    community_admins?: Community[];

    announcements: Announcement[];
}

export interface Role {
    id: string;
    name: string;
}

export interface Community {
    id: string;
    members: User[];
    admins: User[];
    code: string;
    name: string;
    street_name: string;
    contact_email: string;
    announcements: Announcement[];
}

export interface Announcement {
    id: string;
    communities: Community[];
    importance: number;
    icon: string;
    title: string;
    text: string;
    author_id: string;
    author: User;
    created_at: string;
    edited_at: string;
    expire_at: string;
}
