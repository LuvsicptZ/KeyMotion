import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ResultMode } from "@prisma/client";

@Injectable()
export class LeaderboardService {
    constructor(private readonly prisma: PrismaService) {}

    async getRankings(mode: ResultMode, page = 1, pageSize = 20) {
        const skip = (page - 1) * pageSize;

        const groups = await this.prisma.result.groupBy({
            by: ['userId'],
            where: { mode },
            _max: { wpm: true, accuracy: true },
            _count: { id: true },
            orderBy: { _max: { wpm: 'desc' } },
            skip,
            take:pageSize,
        });

        const userIds = groups.map((g) => g.userId);
        const users = await this.prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, username: true },
        });

        const userMap = new Map(users.map((u) => [u.id, u.username]));

        const items = groups.map((g, i) => ({
            rank: skip + i + 1,
            userId: g.userId,
            username: userMap.get(g.userId) ?? 'Unknown',
            bestWpm: g._max.wpm,
            bestAccuracy: g._max.accuracy,
            totalGames: g._count.id,
        }));

        const distinct = await this.prisma.result.findMany({
            where: { mode },
            distinct: ['userId'],
            select: { userId: true },
        });
        const total = distinct.length;

        return { items, page, pageSize, total }
    }


    async getMyRank(userId: string, mode: ResultMode) {
        const myBest = await this.prisma.result.groupBy({
            by: ['userId'],
            where: {userId, mode },
            _max: { wpm: true },
        });

        if (myBest.length === 0) {
            return { rank: null, bestWpm: null };
        }

        const myBestWpm = myBest[0]._max.wpm!;

        const betterUsers = await this.prisma.result.groupBy({
            by: ['userId'],
            where: { mode },
            _max: { wpm: true },
            having: { wpm: {_max: { gt: myBestWpm } } },
        });
        
    const rank = betterUsers.length + 1;

    return { rank, bestWpm: myBestWpm };
    }
}