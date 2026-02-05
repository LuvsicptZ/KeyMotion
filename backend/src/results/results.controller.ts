import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreateResultDto } from './dto/create-result.dto';
import { ResultsService } from './results.service';

@UseGuards(JwtAuthGuard)
@Controller('results')
export class ResultsController {
    constructor(private readonly results: ResultsService) {}

    @Post()
    create(@Req() req: any, @Body() dto: CreateResultDto) {
        return this.results.create(req.user.userId, dto);
    }

    @Get('me')
    findMine(
        @Req() req: any,
        @Query('page') page = '1',
        @Query('pageSize') pageSize = '10',
    ) {
        return this.results.findMine(
            req.user.userId,
            parseInt(page, 10),
            parseInt(pageSize, 10),
        );
    }

}