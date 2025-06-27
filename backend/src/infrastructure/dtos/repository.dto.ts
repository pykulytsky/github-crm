import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';

export class AddRepositoryDto {
  @IsString()
  owner: string;

  @IsString()
  name: string;
}

export class RepositoryDto extends AddRepositoryDto {
  @IsNumber()
  id: number;

  @IsUrl()
  url: string;

  @IsNumber()
  stars: number;

  @IsNumber()
  forks: number;

  @IsNumber()
  issues: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  addedAt: Date;
}
