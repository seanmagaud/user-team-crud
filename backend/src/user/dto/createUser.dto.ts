import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // data transfer object : used to define body requests (schema payload)
  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
