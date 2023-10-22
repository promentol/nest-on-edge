<p align="center">
  <a href="https://nest-on-edge.pages.dev/" target="blank"><img src="https://nest-on-edge.pages.dev/assets/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>



## Description

Nest-on-Edge is set of libraries to run the popular Nest.js framework for edge environments like Cloudflare Workers

<p>Under the hood, Nest on Edge makes use of <a href="https://hono.dev/" target="_blank">Hone</a>, allowing for easy use of the myriad third-party plugins which are available.</p>

## Philosophy

Nest on Edge is intended to bring Nest.js development to Cloudflare workers for new apps. Unfortunately, due limitations of Edge runtimes, it's not possible to build drop in replacement for all Nest.js packages like microservices, socket.io and etc. on Cloudflare workers. Instead we have ported `nest/common` and `nest/core` packages with node.js polyfills, created new `platform-hono` package, and planning to create additional modules, which will be very similiar to original nest.js packages. The main focus is Cloudflare workers, for other platforms Pull Requests are welcomed! 

## Getting started

- To check out the [guide](https://nest-on-edge.pages.dev), visit [nest-on-edge.pages.dev](https://nest-on-edge.pages.dev). :books:

## Questions

For questions and support please use the official [Discord channel](https://discord.gg/G7Qnnhy). The issue list of this repo is **exclusively** for bug reports and feature requests.

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/nestjs/nest/blob/master/CONTRIBUTING.md#-submitting-an-issue) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Support

Nest on Edge is an MIT-licensed open source project. It can grow thanks to the sponsors and support from the amazing backers. If you'd like to join them, please [read more here](https://nest-on-edge.pages.dev/support).

## Stay in touch

- Author - [Narek Hovsepyan](https://github.com/promentol)
- Website - [[https://nest.js](https://nestjs.com/)](https://nest-on-edge.pages.dev/)

## License

Nest on Edge is [MIT licensed](LICENSE).
