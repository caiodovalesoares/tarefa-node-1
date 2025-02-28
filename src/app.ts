import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";

//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7UMyFqvtetc9gRS_yKxWXjN61X_4wq6F3Dg&s

export const app = fastify()

app.get("/", (request, reply) => {
    return { message: "Hello, World!"}
})

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Erro de validação', issues: error.format()})
    }
    return reply.status(500).send({ message: 'Erro interno no servidor'})
})