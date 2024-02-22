import { IsEnum, IsOptional } from 'class-validator';
import { SortBy } from './sort-by.enum';

export class GetUsersQuery {
  @IsOptional()
  @IsEnum(SortBy)
  created: SortBy;
}
