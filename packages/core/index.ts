import { NestFactory } from "@nestjs/core";
import { HonoAdapter, NestHonoApplication } from "@noe/platform-hono";
import { NestModule } from "@nestjs/common";


class NestOnEdgeApp {

    _app: any;
    promise: Promise<any>;

    // bootsrap: any;
    AppModule: any;

    constructor(AppModule: any) {
        this.AppModule = AppModule
    }
    async fetch(...args) {
        if(!this._app) {
            this._app = await this.bootsrap(this.AppModule)
            await this._app.init()
        }
        return this._app.getInstance().fetch(...args)
    }

    async bootsrap(AppModule: any) {
        const app = await NestFactory.create<NestHonoApplication>(this.AppModule, new HonoAdapter(), {
            abortOnError: false,
            logger: console
        });
        return app
    }
}

export {
    NestOnEdgeApp
}