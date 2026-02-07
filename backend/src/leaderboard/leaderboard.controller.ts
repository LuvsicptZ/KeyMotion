import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { ResultMode } from '@prisma/client';
import { LeaderboardService } from './leaderboard.service';
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboard: LeaderboardService) {}

    @Get()
    getRankings(
        @Query('mode') mode: ResultMode = ResultMode.time,
        @Query('page') page = '1',
        @Query('pageSize') pageSize = '20',
    ) {
        return this.leaderboard.getRankings(
            mode,
            parseInt(page, 10),
            parseInt(pageSize, 10),
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMyRank(
        @Req() req:any,
        @Query('mode') mode: ResultMode = ResultMode.time,
    ) {
        return this.leaderboard.getMyRank(req.user.userId, mode)
    }

}

