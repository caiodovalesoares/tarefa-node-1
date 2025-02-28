import { create } from "./create";
import { FastifyInstance } from "fastify";

export function postRoutes(app: FastifyInstance) {
    app.post('/posts', create)
}