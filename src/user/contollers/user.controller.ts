import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';
import { GetUsersQuery } from '../models/get-users-query.model';

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
