import { prisma } from "@/lib/prisma";
import { Prisma, Post } from "@prisma/client";
import { PostUpdateInput } from "../posts-repository";

export class PrismaPostsRepository {
    // async findByUser(userId: string): Promise<Post[] | null> {
    //     try {
    //         const posts = await prisma.post.findMany({
    //             where: {
    //                 userId
    //             }
    //         })
    //         return posts.length > 0 ? posts : null
    //     } catch (error) {
    //         console.error("Erro encontrando posts por usuário:", error)
    //         throw new Error("Erro ao encontrar posts por usuário")
    //     }
    // }

    async update(id: string, data: PostUpdateInput): Promise<Post | null> {
            const post = await prisma.post.update({
                where: { id }, 
                data: {
                    titulo: data.titulo,
                    conteudo: data.conteudo,
                    data: data.data,
                    userId: data.userId
            }
            })
            return post
        }

    async delete(id: string): Promise<Post | null> {
            const post = await prisma.post.delete({
                where: {
                    id
                }
            })
            return post
        }

    async findById(id: string): Promise<Post | null> {
        return await prisma.post.findUnique({
            where: {
                id
            }
        })
    }

    async getAll(): Promise<Post[]> {
            return await prisma.post.findMany() 
        }

    async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
        try {
            const post = await prisma.post.create({
                data
            })
            return post
        } catch (error) {
            console.error("Erro criando post:", error)
            throw new Error("Erro ao criar post")
        }
    }
}