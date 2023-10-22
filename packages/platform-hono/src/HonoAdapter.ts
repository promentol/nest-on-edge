import { AbstractHttpAdapter } from '@nestjs/core';
import {
  NestApplicationOptions,
  NestMiddleware,
  RequestMethod,
  VersioningOptions,
} from '@nestjs/common';
import {Hono, HonoRequest, Context, Handler} from "hono"

import type { Server } from 'node:http';
// import type { createServer as createHttpsServer, ServerOptions as HttpsServerOptions } from 'node:https';
import type { Http2Server, Http2SecureServer } from 'node:http2';

// import KoaRouter from 'koa-router';
import * as http from 'http';
import * as https from 'https';
import { RequestHandler, VersionValue } from '@nestjs/common/interfaces';
import {
  NestKoaFunctionalMiddleware,
  nestToHonoMiddleware,
  HonoResponse
} from './NestHonoMiddleware';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { KoaCorsOptions } from './KoaCorsOptions';
import { Options as ServeStaticOptions } from 'koa-static';
import { KoaViewsOptions } from './KoaViews';
import { koaReply } from './KoaReply';
import { Func } from 'mocha';

type HttpMethods =
  | 'all'
  | 'delete'
  | 'get'
  | 'head'
  | 'options'
  | 'patch'
  | 'post'
  | 'put';

// type KoaRouteMethods = KoaRouter[HttpMethods];
type HonoHandler = RequestHandler<HonoRequest, HonoResponse>;

export class HonoAdapter extends AbstractHttpAdapter<
  Server | Http2Server | Http2SecureServer,
  HonoRequest,
  HonoResponse
> {
  constructor() {

    const instance = new Hono()
    instance.get("/some", (c) => c.text('some'))
    super(instance);
  }

  public delete(pathOrHandler: string | HonoHandler, handler?: HonoHandler): any {
    throw new Error("DELETE NOT IMPLEMENTED")
    // const [routePath, routeHandler] = this.getRouteAndHandler(
    //   pathOrHandler,
    //   handler,
    // );

    // return this.getRouter().delete(
    //   routePath,
    //   this.createRouteHandler(routeHandler),
    // );
  }

  public get(...args: any[]) {
    return this.injectRouteOptions('get', ...args);
  }

  // public get(pathOrHandler: string | HonoHandler, handler?: HonoHandler): any {
  //   throw new Error("GET NOT IMPLEMENTED")

    // const [routePath, routeHandler] = this.getRouteAndHandler(
    //   pathOrHandler,
    //   handler,
    // );

    // return this.getRouter().get(
    //   routePath,
    //   this.createRouteHandler(routeHandler),
    // );
  // }

  public head(pathOrHandler: string | HonoHandler, handler?: HonoHandler): any {

    throw new Error("HEAD NOT IMPLEMENTED")

    // const [routePath, routeHandler] = this.getRouteAndHandler(
    //   pathOrHandler,
    //   handler,
    // );

    // return this.getRouter().head(
    //   routePath,
    //   this.createRouteHandler(routeHandler),
    // );
  }

  public options(
    pathOrHandler: string | HonoHandler,
    handler?: HonoHandler,
  ): any {
    throw new Error("OPTIONS NOT IMPLEMENTED")

    // const [routePath, routeHandler] = this.getRouteAndHandler(
    //   pathOrHandler,
    //   handler,
    // );

    // return this.getRouter().options(
    //   routePath,
    //   this.createRouteHandler(routeHandler),
    // );
  }

  public patch(pathOrHandler: string | HonoHandler, handler?: HonoHandler): any {
    throw new Error("PATCH NOT IMPLEMENTED")

    // const [routePath, routeHandler] = this.getRouteAndHandler(
    //   pathOrHandler,
    //   handler,
    // );

    // return this.getRouter().patch(
    //   routePath,
    //   this.createRouteHandler(routeHandler),
    // );
  }

  public post(...args: any[]) {
    
    console.log("POST COMES")
    return this.injectRouteOptions('post', ...args);

    // const [routePath, routeHandler] = this.getRouteAndHandler(
    //   pathOrHandler,
    //   handler,
    // );

    // return this.getRouter().post(
    //   routePath,
    //   this.createRouteHandler(routeHandler),
    // );
  }

  public put(pathOrHandler: string | HonoHandler, handler?: HonoHandler): any {

    throw new Error("PUT NOT IMPLEMENTED")


    // const [routePath, routeHandler] = this.getRouteAndHandler(
    //   pathOrHandler,
    //   handler,
    // );

    // return this.getRouter().put(
    //   routePath,
    //   this.createRouteHandler(routeHandler),
    // );
  }

  // private createRouteHandler(routeHandler: KoaHandler) {
  //   return (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  //     ctx.respond = false;
  //     routeHandler(ctx.request, ctx.response, next);
  //   };
  // }

  // private getRouteAndHandler(
  //   pathOrHandler: string | KoaHandler,
  //   handler?: KoaHandler,
  // ): [string, KoaHandler] {
  //   let path = pathOrHandler;

  //   if (typeof pathOrHandler === 'function') {
  //     handler = pathOrHandler;
  //     path = '';
  //   }

  //   return [path as string, handler as KoaHandler];
  // }

  public close(): Promise<void> {
    return new Promise((resolve) => {
      // this.httpServer.close();
      resolve()
    });
  }

  public getType(): string {
    return 'hono';
  }

  public initHttpServer(options: NestApplicationOptions): void {
    // console.log("INIT HTTP SERVER")
  }

  public useStaticAssets(path: string, options?: ServeStaticOptions): any {
    throw new Error("ASSETS NOT IMPLEMENTED")

    // const serveStaticMiddleware = loadPackage(
    //   'koa-static',
    //   'KoaAdapter.useStaticAssets()',
    // );

    // this.getInstance<Koa>().use(serveStaticMiddleware(path, options));
  }

  public setViewEngine(options: KoaViewsOptions | any): any {
    throw new Error("VIEW ENGINE NOT IMPLEMENTED")

    // const viewsMiddleware = loadPackage(
    //   'koa-views',
    //   'KoaAdapter.setViewEngine()',
    // );

    // const { viewsDir, ...viewsOptions } = options as KoaViewsOptions;

    // this.getInstance<Koa>().use(
    //   viewsMiddleware(viewsDir, { autoRender: false, ...viewsOptions }),
    // );
  }

  public getRequestHostname(request: HonoRequest): string {
    return request.url
  }

  public getRequestMethod(request: HonoRequest): string {
    return request.method;
  }

  public getRequestUrl(request: HonoRequest): string {
    return request.url;
  }

  public status(response: () => Promise<any>, statusCode: number): any {
    // response().then((x) =>{
    //   console.log(x, 'some')
    // })
    // console.log(await , 'response')
    // response.status(statusCode)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public reply(response: HonoResponse, body: any, statusCode?: number) {
    // return koaReply(response, body, statusCode);
    response.get("replier")(body)
    // return response.text(body)
  }

  public async render(
    response: HonoResponse,
    view: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    options: any,
  ): Promise<void> {
    throw new Error("render not implemented")
    // const body = await response.ctx.render(view, options);

    // this.reply(response, body);
  }

  public redirect(
    response: HonoResponse,
    statusCode: number,
    url: string,
  ): any {
    throw new Error("redirect not implemented")

    // response.set('Location', url);

    // return koaReply(response, null, statusCode);
  }

  public setErrorHandler(
    handler: (err: Error, ctx: any) => void,
    prefix?: string,
  ): any {
    // throw new Error("not implemented")

    this.getInstance<Hono>().onError((err, c) => {
      console.log(err)
      return c.text('Custom error Message', 500)
    })
  }

  public setNotFoundHandler(
    handler: NestMiddleware['use'],
    prefix?: string,
  ): any {
    // throw new Error("not implemented")

    // this.getInstance<Hono>().notFound((c) => {
    //   return c.text('Custom 404 Message', 404)
    // })
    
    // this.getInstance<Koa>().use(nestToHonoMiddleware(handler));
  }

  public setHeader(response: HonoResponse, name: string, value: string): any {
    response.header(name, value);
  }

  public registerParserMiddleware(prefix?: string): any {

    console.log("registerParserMiddleware", this.getInstance())

    this.getInstance<Hono>().use('*', async (ctx, next) => {
      // This is because nest expects params in request object so we need to extend it
      // Object.assign(ctx.req, {
      //   params: ctx.req.param()
      // });


      console.log('running middleware')


      try {


        Object.assign(ctx.req, {
          params: ctx.req.param(),
          query: ctx.req.queries()
        });
        

        // const body = await ctx.req.bo

        // console.log(ctx.req.body)
        
        // Object.assign(ctx.req, {
        //   body: body,
        // });

        // console.log("RAW DATA", body)

        // const json = await ctx.req.json()

        // console.log("RAW JSON", json)

        
        // Object.assign(ctx.req, {
        //   body: {...json, ...body},
        // });


      } catch(e) {
        console.log(e)
      }


      await next();
    });
  }

  public enableCors(options: CorsOptions): void {
    throw new Error("not implemented")
    // const corsMiddleware = loadPackage('@koa/cors', 'KoaAdapter.enableCors()');

    // KoaCorsOptions.validateNestOptions(options);

    // const koaCorsOptions = new KoaCorsOptions(options);

    // if (koaCorsOptions) {
    //   koaCorsOptions.handleOptionsSuccessStatus(
    //     this.getInstance<Koa>(),
    //     options,
    //   );
    // }
    // this.getInstance<Koa>().use(corsMiddleware(koaCorsOptions));
  }

  private isMiddieRegistered: boolean;

  public createMiddlewareFactory(
    requestMethod: RequestMethod,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): (path: string, middleware: Function) => any {
    throw new Error("not implemented")
    // eslint-disable-next-line @typescript-eslint/ban-types
    // return (path: string, callback: Function) => {
    //   let normalizedPath = path.endsWith('/*')
    //     ? `${path.slice(0, -1)}(.*)`
    //     : path;

    //   // Fallback to "(.*)" to support plugins like GraphQL
    //   normalizedPath = normalizedPath === '/(.*)' ? '(.*)' : normalizedPath;

    //   const re = pathToRegexp(normalizedPath);

    //   // The following type assertion is valid as we use import('@fastify/middie') rather than require('@fastify/middie')
    //   // ref https://github.com/fastify/middie/pull/55
    //   this.instance.use(
    //     normalizedPath,
    //     (req: any, res: any, next: Function) => {
    //       const queryParamsIndex = req.originalUrl.indexOf('?');
    //       const pathname =
    //         queryParamsIndex >= 0
    //           ? req.originalUrl.slice(0, queryParamsIndex)
    //           : req.originalUrl;

    //       if (!re.exec(pathname + '/') && normalizedPath) {
    //         return next();
    //       }
    //       return callback(req, res, next);
    //     },
    //   );
    // };

  }

  public applyVersionFilter(handler: Function, version: VersionValue, versioningOptions: VersioningOptions): (req: HonoRequest, res: HonoResponse, next: () => void) => Function {
    throw new Error('Versioning not yet supported in Koa');
  }

  public end(response: HonoResponse, message: string | undefined): any {
    console.log(message, 'message')
    // throw new Error("not implemented end")
    // .end(message);
  }

  public isHeadersSent(response: HonoResponse): any {
    return true
  }

  private injectRouteOptions(
    routerMethodKey:
      | 'get'
      | 'post'
      | 'put'
      | 'delete'
      | 'options'
      | 'patch'
      | 'head',
    ...args: any[]
  ) {
    const handlerRef = args[args.length - 1];
    // const isVersioned =
    //   !isUndefined(handlerRef.version) &&
    //   handlerRef.version !== VERSION_NEUTRAL;
    // const routeConfig = Reflect.getMetadata(
    //   FASTIFY_ROUTE_CONFIG_METADATA,
    //   handlerRef,
    // );
    // const hasConfig = !isUndefined(routeConfig);

    // if (isVersioned || hasConfig) {
    //   const isPathAndRouteTuple = args.length === 2;
    //   if (isPathAndRouteTuple) {
    //     const options = {
    //       ...(isVersioned && {
    //         constraints: {
    //           version: handlerRef.version,
    //         },
    //       }),
    //       ...(hasConfig && {
    //         config: {
    //           ...routeConfig,
    //         },
    //       }),
    //     };
    //     const path = args[0];
    //     return this.instance[routerMethodKey](path, options, handlerRef);
    //   }
    // }
    const path = args[0];
    console.log(routerMethodKey, path, handlerRef)
    return this.getInstance()[routerMethodKey](path, this.createRouteHandler(handlerRef));
  }

  private createRouteHandler(routeHandler: HonoHandler) {
    return async (ctx: Context, next) => {

      var promiseResolve, promiseReject;

      var promise = new Promise(function(resolve, reject){
        promiseResolve = resolve;
        promiseReject = reject;
      });

      ctx.set("replier", promiseResolve)

      const a = await routeHandler(ctx.req, ctx, next);

      const data = await promise


      return ctx.text(data as string)
    };
  }

}
