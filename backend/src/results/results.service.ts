import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateResultDto } from "./dto/create-result.dto";

@Injectable()
export class ResultsService {
    constructor(private readonly prisma: PrismaService) {}

    create(userId: string, dto: CreateResultDto) {
        return this.prisma.result.create({
            data: {
                userId,
                wpm: dto.wpm,
                accuracy: dto.accuracy,
                correctCount: dto.correctCount,
                totalCount: dto.totalCount,
                durationSec: dto.durationSec,
                mode: dto.mode,
            },
        });
    }

    async findByUser(userId: string, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;

        const [items, total] = await this.prisma.$transaction([
            this.prisma.result.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: pageSize,
            }),
            this.prisma.result.count({ where: { userId } }),
        ]);
        return { items, page, pageSize, total };
    }

    async getUserStats(userId: string) {
        const stats = await this.prisma.result.aggregate({
            where: { userId },
            _max: { wpm: true, accuracy: true },
            _avg: { wpm: true, accuracy: true },
            _count: { id: true },
        });

        return {
            bestWpm: stats._max.wpm,
            bestAccuracy: stats._max.accuracy,
            avgWpm: stats._avg.wpm ? Math.round(stats._avg.wpm) : null,
            avgAccuracy: stats._avg.accuracy
                ? Math.round(stats._avg.accuracy * 10000) / 10000
                : null,
            totalGames: stats._count.id,
        };
    }

    async getUserRecentResults(userId: string, take = 10) {
        return this.prisma.result.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take,
            select: {
                wpm: true,
                accuracy: true,
                mode: true,
                durationSec: true,
                createdAt: true,
            },
        });
    }
}