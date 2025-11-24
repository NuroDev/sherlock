<div align='center'>
    <br/>
    <br/>
    <h3>🕵️‍♂️ Sherlock</h3>
    <p>Check social media accounts usernames</p>
    <br/>
    <br/>
</div>

A serverless username search tool powered by Cloudflare Workers and Containers. Search for a username across hundreds of social media platforms instantly.

## Tech Stack

- **Frontend**: [Hono](https://hono.dev) with JSX
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Backend**: Python Flask in [Cloudflare Containers](https://developers.cloudflare.com/containers/)
- **Validation**: [Zod](https://zod.dev/) schemas
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Code Quality**: [Biome](https://biomejs.dev/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Cloudflare account with Workers and Container access

### Installation

```bash
# Install dependencies
bun install

# Generate TypeScript types
bun run cf-typegen
```

### Development

```bash
# Start local development server
bun run dev
```

Visit `http://localhost:8787` to access the application.

### Deployment

```bash
# Deploy to Cloudflare Workers
bun run deploy
```

## Usage

### Web Interface

Navigate to the deployed URL and enter a username to search.

### API

Search for a username programmatically:

```bash
curl https://sherlock.nuro.dev/your_username_here \
  -H "Accept: application/json"
```

Response format:
```json
{
  "data": {
    "GitHub": {
      "status": "found",
      "url": "https://github.com/username"
    },
    "Twitter": {
      "status": "found",
      "url": "https://twitter.com/username"
    }
  },
  "error": null
}
```

## Code Quality

```bash
# Format code
bun run format

# Lint and auto-fix
bun run lint

# Check without fixing
bun run check
```

## License

See [LICENSE](LICENSE) file for details.

## Acknowledgments

💙 Powered by [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock)
