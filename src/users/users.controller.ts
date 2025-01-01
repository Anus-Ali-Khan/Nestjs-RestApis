import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  // const usersService = new UsersService() NestJs create instance directly we dont need to do it manually

  //We are doing this to inject the logic in userService to userController
  constructor(private readonly usersService: UsersService) {}

  @Get() //GET /users or /users?role=value (query params)
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  //Since this is a dynamic route so this will be placed at the end of all the static routes otherwise nest will read all the static routes a s dynamic
  @Get(':id') //GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    //params are always in string
    return this.usersService.findOne(id); // Unary plus(+) converts string into number
  }

  @Post() //POST /users
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') //PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  @Delete(':id') //DELTE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
