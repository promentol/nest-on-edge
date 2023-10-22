class NestOnEdgeApp {

    _app: Promise<any>;
    promise: Promise<any>;

    // bootsrap: any;
    AppModule: any;

    constructor(AppModule) {
        this.AppModule = AppModule
    }
    async fetch(req) {
        if(!this._app) {
            this._app = await this.bootsrap(this.AppModule)
        }
    }

    async bootsrap() {

    }
}