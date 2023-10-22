import { HonoAdapter, NestHonoApplication } from "@noe/platform-hono";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create<NestHonoApplication>(AppModule, new HonoAdapter());
  // await app.listen(3000, '0.0.0.0');
  await app.init()
}


bootstrap();