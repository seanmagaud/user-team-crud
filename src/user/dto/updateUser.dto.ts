import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  // data transfer object : used to define body requests (schema payload)
  readonly firstname: string;

  readonly lastname: string;

  @IsEmail()
  readonly email: string;

  readonly role: string;
}
