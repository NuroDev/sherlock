import { Container } from '@cloudflare/containers';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { z } from 'zod';

import { ErrorPage, FormPage, Layout, ResultPage } from '~/components';
import { getUser } from '~/utils';

export class Sherlock extends Container {
	defaultPort = 8080;
	enableInternet = true;
	sleepAfter = '30m';
}

const app = new Hono()
	.use(
		'*',
		jsxRenderer(({ children }) => <Layout>{children}</Layout>),
	)
	.get('/', (c) => c.render(<FormPage />))
	.get('/favicon.ico', (c) => c.notFound())
	.get(
		'/:username',
		zValidator(
			'param',
			z.object({
				username: z
					.string()
					.min(1)
					.regex(
						/^[a-zA-Z0-9_.-]+$/,
						'Username can only contain letters, numbers, hyphens, underscores, and periods',
					),
			}),
			(result, c) => {
				if (result.success) return;

				const acceptHeader = c.req.header('Accept') || null;
				const readableError = z.prettifyError(result.error);

				if (acceptHeader?.includes('text/html'))
					return c.render(<ErrorPage message={readableError} />);

				return c.json(
					{
						data: null,
						error: {
							message: readableError,
						},
					},
					400,
				);
			},
		),
		async (c) => {
			const { username } = c.req.valid('param');

			const acceptHeader = c.req.header('Accept') || null;

			try {
				const result = await getUser(c, username);
				if (!result) throw new Error('Failed to retrieve user data');

				if (acceptHeader?.includes('text/html'))
					return c.render(
						<ResultPage
							result={result}
							username={username}
						/>,
					);

				return c.json({
					data: result.data,
					error: null,
				});
			} catch (error) {
				console.error('Error checking username:', error);

				const errorMessage =
					error instanceof Error ? error.message : 'Unknown error occurred';

				if (acceptHeader?.includes('text/html'))
					return c.render(<ErrorPage message={errorMessage} />);

				return c.json(
					{
						data: null,
						error: errorMessage,
					},
					500,
				);
			}
		},
	);

export default {
	fetch: app.fetch,
} satisfies ExportedHandler<Env>;
