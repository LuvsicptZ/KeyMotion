import { IsEnum, IsOptional } from 'class-validator';
import { ResultMode } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class LeaderboardQueryDto extends PaginationDto {
    @IsOptional()
    @IsEnum(ResultMode)
    mode: ResultMode = ResultMode.time;
}
