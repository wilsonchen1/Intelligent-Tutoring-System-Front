export interface Chapter {
    chapterId: number;
    chapterName: string;
    knowledgePoints: KnowledgePoint[];
}

export interface KnowledgePoint {
    id: string;
    name: string;
}

export type Chapters = Chapter[];