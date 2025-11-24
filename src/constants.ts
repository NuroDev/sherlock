export const STYLES = `
@custom-variant dark (@media (prefers-color-scheme: dark));
@theme {}
`;

export const SUBMIT_SCRIPT = `
document.getElementById('searchForm')?.addEventListener('submit', function(e) {
	e.preventDefault();
	const username = document.getElementById('username');
	const submitButton = document.getElementById('submitButton');
	const loadingFooter = document.getElementById('loadingFooter');

	// Wait 50ms before showing loading state to prevent flickering on fast loads
	setTimeout(() => {
		if (username) username.disabled = true;
		if (submitButton) submitButton.disabled = true;

		if (loadingFooter) {
			loadingFooter.classList.remove('hidden');
			loadingFooter.classList.add('flex');
		}
	}, 50);

	window.location.href = '/' + encodeURIComponent(username.value);
});
`;
