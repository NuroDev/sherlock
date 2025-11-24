import { getContainer } from '@cloudflare/containers';
import type { Context } from 'hono';
import { z } from 'zod';

import { type Result, ResultSchema } from '~/schemas';

/**
 * Fetch user data by username using a Sherlock container.
 *
 * @param c - Hono context with bindings
 * @param options - Options containing the username
 *
 * @returns A Promise that resolves to the Result or null if validation fails
 */
export async function getUser(
	c: Context<{ Bindings: Env }>,
	username: string,
): Promise<Result | null> {
	const requestUrl = new URL(c.req.url);

	const cacheKey = requestUrl.href.replaceAll(requestUrl.origin, '');
	const cachedResult = await c.env.USERNAME_CACHE.get<Result | null>(cacheKey, 'json');
	if (cachedResult) {
		const parsedCacheResult = ResultSchema.safeParse(cachedResult);
		if (parsedCacheResult.success) return parsedCacheResult.data;

		console.warn(
			`Cached result failed validation for ${username}, fetching new data...`,
		);
	}

	const container = getContainer(c.env.SHERLOCK);

	// Wait for container to be healthy
	await container.startAndWaitForPorts();

	const containerUrl = new URL('/check', 'http://container');
	const containerResponse = await container.fetch(containerUrl.href, {
		body: JSON.stringify({ username }),
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
	});
	const containerResult = await containerResponse.json();
	const parsedContainerResult = ResultSchema.safeParse(containerResult);
	if (!parsedContainerResult.success) {
		console.error(
			`Container result failed validation for ${username}, returning invalid result.`,
			z.prettifyError(parsedContainerResult.error),
		);
		return null;
	}
	if (parsedContainerResult.data.error) {
		console.error(
			`Error fetching data for ${username}: ${parsedContainerResult.data.error}`,
		);
		return null;
	}

	c.executionCtx.waitUntil(
		c.env.USERNAME_CACHE.put(cacheKey, JSON.stringify(parsedContainerResult.data), {
			expirationTtl: 3_600 * 6, // 6 hours
		}),
	);

	return parsedContainerResult.data;
}
