<script>
	import '$lib/styles/global.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { translations } from '$lib/utils';
	import { currentLang } from '$lib/stores';
	import { base } from '$app/paths'; // <-- FIX: Import the base path

	let modalVisible = false;
	let readmeContent = 'Loading...';

	$: t = translations[$currentLang] || translations.en;

	function setLanguage(lang) {
		currentLang.set(lang);
		localStorage.setItem('userLanguage', lang);
	}

	function showAboutModal() {
		modalVisible = true;
		// FIX: Use the base path for the fetch URL
		fetch(`${base}/README.md`)
			.then((response) => (response.ok ? response.text() : 'Error: README.md not found.'))
			.then((text) => {
				readmeContent = marked.parse(text);
			});
	}

	onMount(() => {
		if (browser && 'serviceWorker' in navigator) {
			// FIX: Use the base path for the service worker registration
			navigator.serviceWorker
				.register(`${base}/service-worker.js`)
				.then(() => console.log('Service Worker Geregistreerd'))
				.catch((err) => console.error('Service Worker Registratie Mislukt:', err));
		}
		const savedLang = localStorage.getItem('userLanguage');
		const browserLang = navigator.language.split('-')[0];
		setLanguage(translations[savedLang] ? savedLang : translations[browserLang] ? browserLang : 'en');
	});
</script>

<div class="page-wrapper">
	<slot />

	<div class="footer-controls">
		<button id="about-btn" on:click={showAboutModal}>{t.aboutButton}</button>
		<div class="lang-switcher">
			<button class:active={$currentLang === 'nl'} on:click={() => setLanguage('nl')}>NL</button>
			<button class:active={$currentLang === 'en'} on:click={() => setLanguage('en')}>EN</button>
		</div>
	</div>
</div>

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