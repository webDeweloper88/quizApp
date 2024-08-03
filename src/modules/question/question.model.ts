import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Quiz } from './../quizzes/quiz.model';
import { Option } from './../option/option.model';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Question extends Model<Question> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty()
  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quizId: number;

  @BelongsTo(() => Quiz)
  quiz: Quiz;

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  questionText: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @HasMany(() => Option)
  options: Option[];

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
