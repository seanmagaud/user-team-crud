import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  readonly firstname: string;

  readonly lastname: string;

  @IsEmail()
  readonly email: string;

  readonly role: string;
}
