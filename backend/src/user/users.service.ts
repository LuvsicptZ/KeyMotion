import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ResultsService } from "../results/results.service";

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly results: ResultsService,
    ) {}

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: { id: true, username: true, email: true, createdAt: true },
        });
    }

    async getProfile(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true, username: true, createdAt: true },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const [stats, recentResults] = await Promise.all([
            this.results.getUserStats(id),
            this.results.getUserRecentResults(id),
        ]);

        return { ...user, stats, recentResults };
    }

    createUser(data: { username: string; email: string; passwordHash: string }) {
        return this.prisma.user.create({ data });
    }
}

