import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'book_title_should_not_be_empty' })
  @IsString({ message: 'book_title_should_be_string' })
  @MinLength(2, { message: 'book_title_should_be_at_least_2_chars' })
  title: string;

  @IsNotEmpty({ message: 'author_should_not_be_empty' })
  @IsString({ message: 'author_should_be_string' })
  author: string;

  @IsInt({ message: 'year_should_be_int' })
  @Min(1000, { message: 'year_should_be_at_least_1000' })
  @Max(2026, { message: 'year_should_be_at_least_1000' })
  year: number;
}
