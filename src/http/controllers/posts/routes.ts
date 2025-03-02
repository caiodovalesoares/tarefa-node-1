import { create } from "./create";
import { FastifyInstance } from "fastify";
import { getAll } from "./get-all";
import { get } from "./get";
import { deletePost } from "./delete";
import { update } from "./update";

export function postRoutes(app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts/:postId', get)
    app.get('/posts', getAll)

    app.delete('/posts/:postId', deletePost)

    app.patch('/posts/:postId', update)
}