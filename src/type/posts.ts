export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    create_time: string;
    replies: Reply[];
}

export interface Reply {
    id: string;
    content: string;
    create_time: string;
    replier: string;
}