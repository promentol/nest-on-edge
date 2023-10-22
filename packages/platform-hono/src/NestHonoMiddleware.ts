import * as Koa from 'koa';
import { NestMiddleware } from '@nestjs/common';
import { Hono, MiddlewareHandler, Context, Next, HonoRequest } from 'hono'


export type HonoResponse = Context;

export type NestKoaFunctionalMiddleware = (
  req: HonoRequest,
  res: HonoResponse,
  next: Next,
) => Promise<any> | any;

export interface NestKoaMiddleware {
  use(req: HonoRequest, res: HonoResponse, next: Next): Promise<any> | any;
}

// export const honoToNestMiddleware =
//   (middleware: MiddlewareHandler<any, any>): NestKoaFunctionalMiddleware =>
//   (req: Context, res: Koa.Response, next: Koa.Next) =>
//     middleware(req.ctx, next);

export const nestToHonoMiddleware =
  (middleware: NestMiddleware['use']): MiddlewareHandler<any, any> =>
  (ctx: Context, next: Next) =>
    middleware(ctx.req, ctx, next);
