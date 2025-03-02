import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";
import { update } from "./update";
import { getAll } from "./get-all";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/authenticate', authenticate)

    app.get('/users/:userId', get)
    app.get('/users', getAll)

    app.delete('/users/:userId', deleteUser)

    app.patch('/users/:userId', update)
}