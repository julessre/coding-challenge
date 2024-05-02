# bitperfect - Bewerbungs Projekt

[API Documentation](https://bewerber-test.bitperfect-software.com/docs)

This project uses

-   [Vite](https://vitejs.dev/) as Build Tool
-   [React](https://reactjs.org/) as Frontend Framework
-   [Typescript](https://www.typescriptlang.org/) as Programming Language
-   [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) as Request Framework

## Setup

```bash
make
```

The `make` command runs the yarn commands `install run`. Which should run a clean dev server with vite.
## Run

```bash
make run
```

This starts the vite dev server, alternatively it can be started by calling `yarn run dev` / `yarn start`or
running `vite` directly.

## Build

`make build`

Creates a production build in the [dist/](dist/) folder

## Environment

Copy `.env.example` to `.env` and set values according to your environment.

# Coding Challenge

[Swagger Documentation](https://bewerber-test.bitperfect-software.com/docs)

Build a small Task Board. The following features must be included:

+ Show loading state while queries are running
+ Add tasks to boards
+ Remove tasks from boards
+ Change task status
+ Basic styling

Use react-query to implement this behavior, example queries (get boards and create task) are provided in [src/api/useApi.ts](src/api/useApi.ts)
