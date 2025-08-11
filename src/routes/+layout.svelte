<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { translations } from '$lib/translations.js';

	let currentLang = 'en';
	let modalVisible = false;
	let readmeContent = 'Loading...';

	$: t = translations[currentLang] || translations.en;
	$: isExpertMode = $page.route.id === '/expert';

	function setLanguage(lang) {
		currentLang = lang;
		localStorage.setItem('userLanguage', lang);
	}

	function showAboutModal() {
		modalVisible = true;
		fetch('/README.md')
			.then((response) => (response.ok ? response.text() : 'Error: README.md not found.'))
			.then((text) => {
				readmeContent = marked.parse(text);
			});
	}

	onMount(() => {
		if (browser && 'serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/service-worker.js')
				.then(() => console.log('Service Worker Geregistreerd'))
				.catch((err) => console.error('Service Worker Registratie Mislukt:', err));
		}

		const savedLang = localStorage.getItem('userLanguage');
		const browserLang = navigator.language.split('-')[0];
		setLanguage(translations[savedLang] ? savedLang : translations[browserLang] ? browserLang : 'en');
	});
</script>

<div class="page-wrapper" class:expert-mode={isExpertMode}>
	<slot />

	<div class="footer-controls">
		<button id="about-btn" on:click={showAboutModal}>{t.aboutButton}</button>
		<div class="lang-switcher">
			<button class:active={currentLang === 'nl'} on:click={() => setLanguage('nl')}>NL</button>
			<button class:active={currentLang === 'en'} on:click={() => setLanguage('en')}>EN</button>
		</div>
	</div>
</div>

<!-- About Modal -->
{#if modalVisible}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
	<div class="modal" on:click={() => (modalVisible = false)}>
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
		<div class="modal-content" on:click|stopPropagation>
			<button class="close-btn" on:click={() => (modalVisible = false)}>&times;</button>
			<div id="readme-content">{@html readmeContent}</div>
		</div>
	</div>
{/if}

<style>
	/* --- GLOBALE STIJLEN --- */
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
		color: #f0f0f0;
		text-align: center;
		padding: 20px;
		margin: 0;
		-webkit-font-smoothing: antialiased;
		transition: background 0.3s ease;
	}
	:global(body) { background: linear-gradient(135deg, #74ebd5, #9face6); }
	.expert-mode :global(body) { background: linear-gradient(135deg, #2c3e50, #4ca1af); }

	.page-wrapper { max-width: 420px; margin: 0 auto; }

	/* --- TYPOGRAFIE --- */
	:global(h1) { font-weight: 600; color: #f0f0f0; margin-bottom: 15px; font-size: 1.8rem; }
	:global(h2) { font-weight: 600; color: #f0f0f0; margin-top: 30px; margin-bottom: 15px; }
	:global(h3) { margin: 0 0 5px 0; color: #74ebd5; font-weight: 600; }
	:global(a) { color: #74ebd5; text-decoration: none; }
	:global(a:hover) { text-decoration: underline; }

	/* --- NAVIGATIE --- */
	:global(.nav-link) { margin-bottom: 20px; }

	/* --- CONTAINERS --- */
	:global(.content-box) { background: rgba(0, 0, 0, 0.15); padding: 25px; border-radius: 15px; margin-top: 20px; text-align: left; }
	:global(.parameter-card) { background: rgba(0, 0, 0, 0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px; display: flex; flex-direction: column; gap: 15px; }
	:global(.global-input) { margin-bottom: 25px; }
	:global(.input-group) { display: flex; flex-direction: column; }
	:global(.input-grid-half) { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

	/* --- FORMULIER ELEMENTEN --- */
	:global(label) { display: block; font-weight: bold; margin-bottom: 5px; color: #f0f0f0; font-size: 0.9rem; }
	:global(input[type='number']), :global(select) { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #555; font-size: 16px; background-color: #333; color: #fff; box-sizing: border-box; }
	:global(input[type='number']) { text-align: right; }
	:global(input:focus), :global(select:focus) { outline: none; border-color: #74ebd5; box-shadow: 0 0 0 2px rgba(116, 235, 213, 0.2); }

	/* --- KNOPPEN --- */
	:global(button.action-button) { width: 100%; margin-top: 20px; padding: 15px; background: #4facfe; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; color: white; cursor: pointer; transition: background 0.3s ease; }
	:global(button.action-button:hover) { background: #00c6ff; }
	:global(button.action-button:active) { transform: translateY(1px); }

	/* --- RESULTATEN --- */
	:global(.result-box) { font-size: 1.2em; font-weight: bold; text-align: center; background: #4facfe; color: white; padding: 15px; border-radius: 10px; margin-top: 20px; line-height: 1.5; }
	:global(#summary-driver) { text-align: center; margin-top: 10px; font-style: italic; color: #f0f0f0; }

	/* --- TABELLEN --- */
	:global(.results-table) { margin-top: 20px; width: 100%; border-collapse: collapse; }
	:global(.results-table th), :global(.results-table td) { padding: 10px; text-align: right; border-bottom: 1px solid #555; }
	:global(.results-table th:first-child), :global(.results-table td:first-child) { text-align: left; }
	:global(.results-table th) { background: rgba(0, 0, 0, 0.2); font-weight: bold; color: #74ebd5; }
	:global(.driver-row) { background: rgba(79, 172, 254, 0.2); }

	/* --- FOOTER & MODAL --- */
	.footer-controls { display: flex; justify-content: space-between; align-items: center; max-width: 400px; margin: 25px auto 0 auto; }
	.lang-switcher button { background: none; border: 1px solid rgba(255, 255, 255, 0.6); padding: 5px 10px; margin: 0 0 0 5px; font-size: 14px; cursor: pointer; border-radius: 5px; color: white; transition: all 0.2s ease; }
	.lang-switcher button:hover { border-color: rgba(255, 255, 255, 0.8); }
	.lang-switcher button.active { background: #fff; color: #4facfe; font-weight: bold; border-color: #fff; }
	#about-btn { background: none; border: none; color: white; text-decoration: underline; cursor: pointer; font-size: 14px; padding: 5px; opacity: 0.8; transition: opacity 0.2s ease; }
	#about-btn:hover { opacity: 1; }
	.modal { display: flex; justify-content: center; align-items: center; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); }
	.modal-content { color: #333; background-color: #fefefe; padding: 20px 30px; border: 1px solid #888; width: 90%; max-width: 600px; max-height: 80vh; overflow-y: auto; border-radius: 15px; position: relative; text-align: left; line-height: 1.6; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
	.close-btn { background: none; border: none; padding: 0; font: inherit; cursor: pointer; outline: inherit; color: #aaa; position: absolute; top: 10px; right: 20px; font-size: 28px; font-weight: bold; transition: color 0.2s ease; }
	.close-btn:hover { color: #000; }
	.modal-content :global(h1), .modal-content :global(h2), .modal-content :global(h3) { margin-top: 20px; color: #4facfe; } .modal-content :global(h1:first-child), .modal-content :global(h2:first-child) { margin-top: 0; } .modal-content :global(code) { background: #eee; padding: 2px 5px; border-radius: 4px; font-family: 'Courier New', monospace; } .modal-content :global(ul), .modal-content :global(ol) { padding-left: 20px; } .modal-content :global(li) { margin-bottom: 8px; } .modal-content :global(hr) { border: 0; border-top: 1px solid #ddd; margin: 20px 0; }

	/* --- RESPONSIVE --- */
	@media (max-width: 480px) {
		.page-wrapper { max-width: 100%; padding: 0 10px; }
		:global(.content-box) { padding: 20px; }
		:global(.parameter-card) { padding: 12px; }
		:global(.input-grid-half) { grid-template-columns: 1fr; gap: 10px; }
		.modal-content { width: 95%; padding: 15px 20px; }
	}
</style>