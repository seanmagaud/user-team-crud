import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
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

  async findById(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne(userId);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({ relations: ['teams'] });
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async promoteUser(userId: number): Promise<UserEntity> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    user.role = user.role + 1;

    Object.assign(user);

    return await this.userRepository.save(user);
  }

  async demoteUser(userId: number): Promise<UserEntity> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    user.role = user.role - 1;

    Object.assign(user);

    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<HttpStatus> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    await this.userRepository.remove(user);

    return HttpStatus.OK;
  }

  buildUserResponse(user: UserEntity): UserEntity {
    return user;
  }
}
