import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/asd')
  getHello(@Query('bla') id: number): string {
    console.log('this is being called')
    return "some" + (id || 0) 
  }
}
