import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreateResultDto } from './dto/create-result.dto';
import { ResultsService } from './results.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@UseGuards(JwtAuthGuard)
@Controller('results')
export class ResultsController {
    constructor(private readonly results: ResultsService) {}

    @Post()
    create(@Req() req: any, @Body() dto: CreateResultDto) {
        return this.results.create(req.user.userId, dto);
    }

    @Get('me')
    findMine(@Req() req: any, @Query() query: PaginationDto) {
        return this.results.findByUser(
            req.user.userId,
            query.page,
            query.pageSize,
        );
    }
}