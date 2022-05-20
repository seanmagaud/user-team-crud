import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Injectable() // DI nest system
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (
      await this.userRepository.findOne({
        firstname: createUserDto.firstname,
      })
    ) {
      throw new HttpException(
        'Username already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (
      await this.userRepository.findOne({
        email: createUserDto.email,
      })
    ) {
      throw new HttpException(
        'Email already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto); // https://docs.nestjs.com/techniques/serialization

    return await this.userRepository.save(newUser);
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  buildUserResponse(user: UserEntity): UserEntity {
    return user;
  }
}
