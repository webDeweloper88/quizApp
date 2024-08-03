// src/option/option.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Option } from './option.model';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';

@Module({
  imports: [SequelizeModule.forFeature([Option])],
  providers: [OptionService],
  controllers: [OptionController],
  exports: [SequelizeModule],
})
export class OptionModule {}
