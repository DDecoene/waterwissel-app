<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { translations } from '$lib/translations.js';
	import { parameterDefaults } from '$lib/parameters.js';
	import { currentLang } from '$lib/store.js'; // <-- LEES UIT DE STORE

	let volume = '';
	let selectedParameter = 'nitrate';
	let start = '';
	let target = '';
	let replacement = '';
	let resultHTML = '';

	$: t = translations[$currentLang] || translations.en;
	$: paramUnit = parameterDefaults[selectedParameter]?.unit || 'mg/L';
	$: placeholderStart = parameterDefaults[selectedParameter]?.placeholderStart || '';

	function updateParameter() {
		const defaults = parameterDefaults[selectedParameter];
		if (defaults) {
			target = defaults.target;
			replacement = defaults.replacement;
			start = '';
			resultHTML = '';
		}
	}

	function calculate() {
		const vol = parseFloat(volume);
		const s = parseFloat(start);
		const ta = parseFloat(target);
		const rep = parseFloat(replacement);

		if (isNaN(vol) || isNaN(s) || isNaN(ta) || isNaN(rep)) {
			resultHTML = t.errorMsgGeneric; return;
		}
		if (ta < rep) {
			resultHTML = t.errorMsgImpossible; return;
		}
		if (rep >= s) {
			resultHTML = s === ta ? t.resultMsg('0.0', '0.0') : t.errorMsgIneffective; return;
		}

		localStorage.setItem('aquariumVolume', vol);
		const changeRatio = (s - ta) / (s - rep);
		const liters = vol * changeRatio;
		resultHTML = t.resultMsg(liters.toFixed(1), (changeRatio * 100).toFixed(1));
	}

	onMount(() => {
		const savedVolume = localStorage.getItem('aquariumVolume');
		if (savedVolume) volume = savedVolume;
		updateParameter();
	});
</script>

<svelte:head>
	<title>{t.title}</title>
</svelte:head>

<h1>{t.header}</h1>

<div class="nav-link">
	<a href="{base}/expert">{t.linkExpert}</a>
</div>

<div class="content-box">
	<label for="volume">{t.labelVolume}</label>
	<input type="number" id="volume" placeholder={t.placeholderVolume} bind:value={volume} />
	<label for="parameter">{t.labelParameter}</label>
	<select bind:value={selectedParameter} on:change={updateParameter}>
		<option value="nitrate">{t.paramNitrate}</option>
		<option value="nitrite">{t.paramNitrite}</option>
		<option value="phosphate">{t.paramPhosphate}</option>
		<option value="gh">{t.paramGH}</option>
		<option value="kh">{t.paramKH}</option>
	</select>
	<label for="start">{t.labelStart} ({paramUnit}):</label>
	<input type="number" id="start" placeholder={placeholderStart} bind:value={start} />
	<label for="target">{t.labelTarget} ({paramUnit}):</label>
	<input type="number" id="target" bind:value={target} />
	<label for="replacement">{t.labelReplacement} ({paramUnit}):</label>
	<input type="number" id="replacement" bind:value={replacement} />
	<button class="action-button" on:click={calculate}>{t.calculateButton}</button>
	{#if resultHTML}
		<div class="result-box">{@html resultHTML}</div>
	{/if}
</div>