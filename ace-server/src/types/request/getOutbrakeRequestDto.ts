import { IsOptional } from "class-validator";


export class GetOutbrakeRequestDto {
  @IsOptional()
  country: string;
  constructor(country: string) {
    this.country = country;
  }
}
