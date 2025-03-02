import { Post, Prisma } from "@prisma/client";

export interface PostUpdateInput {
    titulo?: string
    conteudo?: string
    data?: Date
    userId?: string
}

export interface PostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findById(id: string): Promise<Post | null>
    getAll(): Promise<Post[]>
    delete(id: string): Promise<Post | null>
    update(id: string, data: PostUpdateInput): Promise<Post | null>
}