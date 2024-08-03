# AskMe Search

The AskMe Search web site implemented as a Next.js site.

This version depends on version 0.3.X of the AskMe API in [https://github.com/lapps-askme/askme-light](https://github.com/lapps-askme/askme-light).


### Building and Running

This is known to work with NPM version 10.1.0 and Node.js version 20.8.1.

To create and start the site do the following:

1. Create `.env.local` file in the root directory and add a route to the API (see `.env.local.example` for an example environment variables file).
2. Run `$ npm install` to install packages.
3. Run `$ npm run build` to build.
4. Run `$ npm run start` to run (use `$npm run dev` for development mode).

See [docs/next-jetstream.md](docs/next-jetstream.md) for more information on installing requirements and running the site on Jetstream.
