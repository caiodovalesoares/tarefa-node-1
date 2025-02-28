import { UsersRepository } from "@/repositories/users-repository";
import bcrypt from 'bcryptjs';

interface RegisterUseCaseRequest {
    nome: string
    email: string
    senha: string
    foto: string
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({nome, email, senha, foto}: RegisterUseCaseRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error()
        }

        const password_hash = await bcrypt.hash(senha, 6)

        await this.usersRepository.create({
            nome,
            email,
            senha: password_hash,
            foto
        })
    }
}