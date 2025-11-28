import type { FC, PropsWithChildren } from 'hono/jsx';

import { STYLES, SUBMIT_SCRIPT } from '~/constants';
import type { Result } from '~/schemas';

const Footer: FC<PropsWithChildren> = ({ children }) => (
	<footer class='mt-8 text-center text-sm text-zinc-500'>
		{children}
		<div class='mx-auto my-4 max-w-md'>
			<p class='mb-3 text-xs text-zinc-600 dark:text-zinc-500'>
				Built with the{' '}
				<a
					class='font-medium text-zinc-700 underline decoration-zinc-400 underline-offset-2 transition transition duration-300 ease-in-out hover:text-blue-600 hover:decoration-blue-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-400 dark:text-zinc-400 dark:hover:text-blue-400 dark:hover:text-blue-400'
					href='https://github.com/sherlock-project/sherlock'
					rel='noopener noreferrer'
					target='_blank'>
					Sherlock
				</a>{' '}
				& powered by{' '}
				<a
					class='font-medium text-zinc-700 underline decoration-zinc-400 underline-offset-2 transition transition duration-300 ease-in-out hover:text-blue-600 hover:decoration-blue-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-400 dark:text-zinc-400 dark:hover:text-blue-400 dark:hover:text-blue-400'
					href='https://developers.cloudflare.com/containers/'
					rel='noopener noreferrer'
					target='_blank'>
					Cloudflare Containers
				</a>
			</p>
			<div class='flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x-2 sm:divide-zinc-200 sm:dark:divide-zinc-800'>
				<a
					class='inline-flex items-center justify-center gap-2 px-2 py-1 font-medium text-sm text-zinc-600 transition duration-300 ease-in-out hover:text-blue-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-400 dark:text-zinc-400 dark:hover:text-blue-400 dark:hover:text-blue-400'
					href='https://github.com/nurodev/sherlock'
					rel='noopener noreferrer'
					target='_blank'>
					<svg
						class='h-4 w-4'
						fill='none'
						height='24'
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						stroke='currentColor'
						viewBox='0 0 24 24'
						width='24'
						xmlns='http://www.w3.org/2000/svg'>
						<title>GitHub</title>
						<path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
						<path d='M9 18c-4.51 2-5-2-7-2' />
					</svg>
					<span>GitHub</span>
				</a>
			</div>
		</div>
	</footer>
);

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang='en'>
			<head>
				<meta charset='UTF-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<title>Sherlock Username Search</title>
				<script src='https://cdn.tailwindcss.com'></script>
				{/* @ts-expect-error TailwindCSS has a custom style `type` attribute */}
				<style type='text/tailwindcss'>{STYLES}</style>
			</head>
			<body class='flex min-h-screen items-center justify-center bg-white p-4 dark:bg-zinc-950'>
				{children}
				<script dangerouslySetInnerHTML={{ __html: SUBMIT_SCRIPT }} />
			</body>
		</html>
	);
};

export const FormPage: FC = () => (
	<div class='w-full max-w-xl'>
		<div class='p-8'>
			<div class='mb-8 text-center'>
				<h1 class='mb-2 font-bold text-4xl text-zinc-900 dark:text-white'>
					🕵️‍♂️ Sherlock
				</h1>
				<p class='text-lg text-zinc-600 dark:text-zinc-400'>
					Check social media accounts usernames
				</p>
			</div>

			<form
				class='w-full'
				id='searchForm'>
				<div class='flex w-full flex-col gap-4 sm:flex-row sm:gap-0'>
					<input
						autocomplete='off'
						class='block w-full grow border-zinc-300 border-y border-l bg-zinc-50 px-4 py-1.5 text-zinc-900 placeholder-zinc-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100'
						id='username'
						name='username'
						pattern='[a-zA-Z0-9_.-]+'
						placeholder='Username'
						required={true}
						type='search'
					/>
					<button
						class='inline-flex w-full items-center justify-center gap-2 border-blue-700 border-y border-r bg-blue-600 px-4 py-1.5 font-semibold text-white transition duration-300 ease-in-out hover:border-blue-800 hover:bg-blue-700 hover:shadow-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-wait disabled:opacity-50 sm:w-28 sm:text-sm/6'
						id='submitButton'
						type='submit'>
						<svg
							class='h-4 w-4'
							fill='none'
							height='24'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							stroke='currentColor'
							viewBox='0 0 24 24'
							width='24'
							xmlns='http://www.w3.org/2000/svg'>
							<title>Search</title>
							<path d='m21 21-4.34-4.34' />
							<circle
								cx='11'
								cy='11'
								r='8'
							/>
						</svg>
						<span>Search</span>
					</button>
				</div>
			</form>

			<div
				class='flex hidden cursor-wait items-center justify-center border-zinc-200 border-x border-b bg-white text-center text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400'
				id='loadingFooter'>
				<svg
					class='h-5 w-5 animate-spin'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'>
					<title>Loading spinner</title>
					<circle
						class='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						stroke-width='4'></circle>
					<path
						class='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
				</svg>
				<h2 class='px-3 py-3 text-md'>This might take a minute...</h2>
			</div>

			<Footer>
				<p>Hunt down social media accounts by username across social networks</p>
			</Footer>
		</div>
	</div>
);

export const ResultPage: FC<{ result: Result; username: string }> = ({
	result,
	username,
}) => {
	const foundSites = Object.entries(result.data).filter(
		([_, site]) => site.status === 'found',
	);

	return (
		<div class='w-full max-w-xl'>
			<div class='p-2 sm:p-8'>
				<div class='mb-8 text-center'>
					<h1 class='mb-2 font-bold text-4xl text-zinc-900 dark:text-white'>
						🕵️‍♂️ Sherlock
					</h1>
					<p class='text-lg text-zinc-600 dark:text-zinc-400'>
						Results for{' '}
						<span class='font-semibold text-blue-600 dark:text-blue-400'>
							{username}
						</span>
					</p>
				</div>

				<div class='space-y-6'>
					{foundSites.length === 0 ? (
						<div class='border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900'>
							<p class='text-zinc-600 dark:text-zinc-400'>
								No profiles found for this username
							</p>
						</div>
					) : (
						<div class='border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
							<div class='flex items-center justify-between border-zinc-200 border-b bg-white dark:border-zinc-800 dark:bg-zinc-950/50'>
								<a
									class='inline-flex items-center border border-transparent px-3 py-1.5 font-medium text-sm text-zinc-700 transition duration-300 ease-in-out hover:bg-zinc-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-transparent dark:text-zinc-300 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
									href='/'>
									<svg
										class='h-5 w-5'
										fill='none'
										height='24'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										stroke='currentColor'
										viewBox='0 0 24 24'
										width='24'
										xmlns='http://www.w3.org/2000/svg'>
										<title>Go back</title>
										<path d='m12 19-7-7 7-7' />
										<path d='M19 12H5' />
									</svg>
									<span class='sr-only'> Go back</span>
								</a>
								<h2 class='pr-4 font-semibold text-sm text-zinc-900 dark:text-white'>
									{foundSites.length}{' '}
									{foundSites.length === 1 ? 'Result' : 'Results'}
								</h2>
							</div>

							<div class='divide-y divide-zinc-200 dark:divide-zinc-800'>
								{foundSites.map(([siteName, site]) => (
									<a
										class='flex items-center justify-between px-6 py-3 transition transition duration-300 ease-in-out hover:bg-blue-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-950/50 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white'
										href={site.url}
										key={siteName}
										rel='noopener noreferrer'
										target='_blank'>
										<span class='font-medium text-zinc-900 dark:text-white'>
											{siteName}
										</span>
										<span class='text-blue-600 text-sm'>Visit →</span>
									</a>
								))}
							</div>
						</div>
					)}
				</div>

				<Footer />
			</div>
		</div>
	);
};

export const ErrorPage: FC<{ message: string }> = ({ message }) => (
	<div class='w-full max-w-xl'>
		<div class='p-8'>
			<div class='mb-8 text-center'>
				<h1 class='mb-2 font-bold text-4xl text-zinc-900 dark:text-white'>
					⚠️ Error
				</h1>
				<p class='text-lg text-zinc-600 dark:text-zinc-400'>
					Something went wrong
				</p>
			</div>

			<div class='mx-auto max-w-sm'>
				<div class='bg-white shadow-sm dark:bg-zinc-900'>
					<div class='flex items-center justify-between border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/50'>
						<a
							class='inline-flex items-center border border-transparent px-3 py-1.5 font-medium text-red-700 text-sm transition duration-300 ease-in-out hover:bg-red-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-transparent dark:text-zinc-300 dark:text-zinc-400 dark:hover:bg-red-900/75 dark:hover:text-white'
							href='/'>
							<svg
								class='h-5 w-5'
								fill='none'
								height='24'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								stroke='currentColor'
								viewBox='0 0 24 24'
								width='24'
								xmlns='http://www.w3.org/2000/svg'>
								<title>Go back</title>
								<path d='m12 19-7-7 7-7' />
								<path d='M19 12H5' />
							</svg>
							<span class='sr-only'> Go back</span>
						</a>
					</div>

					<div class='border-zinc-200 border-x border-b bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950/50'>
						<p class='text-center text-zinc-800 dark:text-zinc-200'>
							{message}
						</p>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	</div>
);
