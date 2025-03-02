import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        senha: z.string().min(6)
    })

    const { email, senha } = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

        const { user } = await authenticateUseCase.execute({
            email,
            senha
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        return reply.status(200).send({ token })
    } catch (err) {
        return reply.status(401).send()
    }
}