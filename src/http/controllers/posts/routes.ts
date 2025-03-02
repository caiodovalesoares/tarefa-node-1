import { create } from "./create";
import { FastifyInstance } from "fastify";
import { getAll } from "./get-all";

export function postRoutes(app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts', getAll)
}