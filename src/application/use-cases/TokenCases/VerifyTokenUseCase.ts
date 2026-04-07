import { ITokenRepository } from "@/domain/repositories/ITokenRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { User, ValidationStatus } from "@/domain/entities/User";

export type VerifyTokenDTO = {
    email: string;
    informedCode: string;
};

export class VerifyTokenUseCase {
    constructor(
        private tokenRepository: ITokenRepository,
        private userRepository: IUserRepository,
    ){}

    async execute(data: VerifyTokenDTO): Promise<User> {
        
        const user = await this.userRepository.findByEmail(data.email);
        if(!user) {
            throw new Error("User does not exist with this e-mail.");
        }

        const token = await this.tokenRepository.findUserLastToken(user.id);

        if(!token) {
            throw new Error("No token was found for this user.");
        }

        const isCodeCorrect = token.code === data.informedCode;
        const isNotExpired = new Date(token.expiresIn).getTime() > new Date().getTime();

        if(!isCodeCorrect) {
            throw new Error("The code provided is incorrect.");
        }

        if(!isNotExpired) {
            throw new Error("The code has expired.");
        }

        user.valid = ValidationStatus.VALID;

        const updatedUser = await this.userRepository.save(user);

        return updatedUser;
  }
}