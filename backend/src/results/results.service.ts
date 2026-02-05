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

    async findMine(userId: string, page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;

        const [items, total] = await this.prisma.$transaction([
            this.prisma.result.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc'},
                skip,
                take: pageSize,
            }),
            this.prisma.result.count({ where: { userId }}),
        ]);
        return { items, page, pageSize, total }
    }
}