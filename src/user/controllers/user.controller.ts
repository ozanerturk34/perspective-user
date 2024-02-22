import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/dtos/create-user.dto';
import { UserDto } from '../models/dtos/user.dto';
import { GetUsersQuery } from '../models/types/get-users-query.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers(@Query() getUsersQuery: GetUsersQuery): Promise<UserDto[]> {
    return this.userService.getUsers(getUsersQuery);
  }
}
