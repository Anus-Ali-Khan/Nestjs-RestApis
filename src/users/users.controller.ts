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

@Controller('users')
export class UsersController {
  @Get() //GET /users or /users?role=value (query params)
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return [];
  }

  //Since this is a dynamic route so this will be placed at the end of all the static routes otherwise nest will read all the static routes a s dynamic
  @Get(':id') //GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }
  @Post() //POST /users
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id') //PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }
  @Delete(':id') //DELTE /users/:id
  delete(@Param('id') id: string) {
    return { id };
  }
}
