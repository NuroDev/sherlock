import { z } from 'zod';

export const ResultSchema = z.object({
	data: z.record(
		z.string(),
		z.object({
			status: z.string(),
			url: z.url(),
		}),
	),
	error: z.string().optional(),
	success: z.boolean(),
});

export type Result = z.infer<typeof ResultSchema>;
