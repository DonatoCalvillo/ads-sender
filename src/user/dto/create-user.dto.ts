import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'The fisrt name most be a string' })
  @MinLength(2)
  firstName: string;

  @IsString({ message: 'The last name most be a string' })
  @MinLength(2)
  lastName: string;

  @IsString({ message: 'The email most be a string' })
  @IsEmail()
  email: string;

  @IsString({ message: 'The password most be a string' })
  @MinLength(6)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password most have special characters, numbers and upper case',
  })
  password: string;
}
