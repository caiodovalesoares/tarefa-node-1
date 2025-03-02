import fastify from "fastify";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { postRoutes } from "./http/controllers/posts/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(userRoutes)
app.register(postRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Erro de validação', issues: error.format()})
    }
    return reply.status(500).send({ message: 'Erro interno no servidor'})
})