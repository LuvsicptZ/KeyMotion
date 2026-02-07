import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { ResultMode } from '@prisma/client';
import { LeaderboardService } from './leaderboard.service';
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { LeaderboardQueryDto } from './dto/leaderboard-query.dto';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboard: LeaderboardService) {}

    @Get()
    getRankings(@Query() query: LeaderboardQueryDto) {
        return this.leaderboard.getRankings(
            query.mode,
            query.page,
            query.pageSize,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMyRank(
        @Req() req: any,
        @Query('mode') mode: ResultMode = ResultMode.time,
    ) {
        return this.leaderboard.getMyRank(req.user.userId, mode);
    }
}

