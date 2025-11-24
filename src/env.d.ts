import 'hono';

declare module 'hono' {
	interface Env {
		Bindings: Cloudflare.Env;
	}
}
