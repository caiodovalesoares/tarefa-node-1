import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
        foto: z.string().url()
    })

    const { nome, email, senha, foto } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({
            nome,
            email,
            senha,
            foto
        })
    } catch (err) {
        return reply.status(409).send('Email já cadastrado!')
    }

    return reply.status(201).send('Usuário criado com sucesso!')
}