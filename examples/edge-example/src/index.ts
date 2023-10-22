import { NestFactory } from "@nestjs/core";
import { HonoAdapter, NestHonoApplication } from "@noe/platform-hono";
import { AppModule } from "./app.module";
import { NestModule } from "@nestjs/common";


// process.stderr = {
//     //@ts-ignore-next-line
//     write(...args) {
//         console.log(...args)
//     }
// }

// Object.defineProperty(process, "stderr", {
//     get() {
//       return {
//             write(...args) {
//                 console.log(...args)
//             }
//       };
//     },
//   });


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


export default {
    fetch(...args) {
        console.log(app.fetch, "app")

        return app.fetch(...args)
    }
}

const app = new NestOnEdgeApp(AppModule)


// export default new NestOnEdgeApp(AppModule)