import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersController } from './users.controller';
import { ResultsModule } from '../results/results.module';

@Module({
  imports: [PrismaModule, ResultsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}