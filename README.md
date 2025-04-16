# Expression

A Next.js Chat UI Template with comprehensive Markdown and Tool Calling support

See the full write up on both aesthetic and code design decisions on [pangolier.com/expression](https://pangolier.com/expression)

## Running Locally

I recommend using `bun` but you can run the same commands in `npm` or your package manager of choice:

```bash
bun install
bun run dev
```

## Development

* **`dev`**: Starts the Next.js development server with Turbopack enabled for faster development builds and hot reloading.

    ```bash
    bun run dev
    ```

* **`build`**: Compiles the Next.js application for production deployment. This includes optimizing code, assets, and generating static files where applicable.

    ```bash
    bun run build
    ```

* **`start`**: Starts the Next.js production server after a build has been completed using `bun run build`.

    ```bash
    bun run start
    ```

* **`lint`**: Runs both ESLint and Stylelint to check the codebase for TypeScript and SCSS style errors, respectively. It automatically attempts to fix any fixable issues found.

    ```bash
    bun run lint
    ```

* **`lint:node`**: Runs ESLint specifically to check only TypeScript files for code quality and potential errors, without attempting to fix them automatically.

    ```bash
    bun run lint:node
    ```

* **`lint:style`**: Runs Stylelint specifically to check SCSS files (`scss/**/*.scss`) for style consistency and potential errors, without attempting to fix them automatically.

    ```bash
    bun run lint:style
    ```

## Custom Providers

The template utilizes Vercel's `ai` package. This means easy support for various providers. If you want to use a different provider, you can swap in a different provider by updating `ai/provider.ts`.

## Adding and editing tool calls

The default tool calls pull and render a carousel of images and code snippets. Review the `ai/tool` folder for implementation, and, `scss/app/chat/tool` for how it was styled.

## Data Persistence

For demonstration purposes, data is locally saved in `.next/history` and `.next/profile.json`. Review `ai/action/{thread|profile}.ts` on how to update server actions to persist to the database of your choice.

## Final Notes

If you found this template useful, tip me on Solana:

```crypto
G8rJdb6kg5hNuQFD8Dmwfh1Zb4X8TGBk8F1PCVQ219AT
```

If you want to work with me, please email me at <hello@pangolier.com>
