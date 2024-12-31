import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

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
  findOne(@Param('id') id: string) {
    //params are always in string
    return this.usersService.findOne(+id); // Unary plus(+) converts string into number
  }

  @Post() //POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') //PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.update(+id, userUpdate);
  }
  @Delete(':id') //DELTE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
