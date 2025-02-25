import fastify from "fastify";
import { appRoutes } from "./http/routes";

//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7UMyFqvtetc9gRS_yKxWXjN61X_4wq6F3Dg&s

export const app = fastify()

app.get("/", (request, reply) => {
    return { message: "Hello, World!"}
})

app.register(appRoutes)