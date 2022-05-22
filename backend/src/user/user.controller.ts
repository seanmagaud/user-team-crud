import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async createUser(
    @Body('user')
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.createUser(createUserDto);

    return this.userService.buildUserResponse(user);
  }

  @Get('user/:id')
  async currentUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserEntity> {
    return this.userService.findById(userId);
  }

  @Get('users')
  async users(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Put('user/promote/:id')
  async promoteUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserEntity> {
    return this.userService.promoteUser(userId);
  }

  @Put('user/demote/:id')
  async demoteUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserEntity> {
    return this.userService.demoteUser(userId);
  }

  @Put('user/:id')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body('user')
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete('user/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<HttpStatus> {
    return this.userService.deleteUser(userId);
  }
}
