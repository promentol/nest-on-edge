import { NestOnEdgeApp } from "@noe/core"
import { AppModule } from "./app.module";

export default {
    fetch(...args) {
        return app.fetch(...args)
    }
}

const app = new NestOnEdgeApp(AppModule)