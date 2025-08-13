<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { translations, parameterDefaults } from '$lib/utils';
	import { currentLang, logbook } from '$lib/stores';

	let volume = '', results = null;

	// --- DIT IS DE CORRECTE AANPAK ---
	// We importeren de 'parameterDefaults' en bouwen onze lokale 'parameters' array dynamisch op.
	// Nu is er maar één bron van waarheid voor alle parameter-data.
	let parameters = Object.entries(parameterDefaults).map(([id, defaults]) => ({
		id: id,
		...defaults,
		current: '' // Voeg de 'current' eigenschap toe voor de input binding
	}));

	$: t = translations[$currentLang] || translations.en;

	onMount(() => {
		const savedVolume = localStorage.getItem('aquariumVolume');
		if (savedVolume) volume = savedVolume;
	});

	function calculate() {
		const vol = parseFloat(volume);
		if (isNaN(vol) || vol <= 0) {
			alert('Please enter a valid aquarium volume.');
			return;
		}
		localStorage.setItem('aquariumVolume', vol);
		let masterPercent = 0, driverParam = null;
		parameters.forEach(p => {
			const current = parseFloat(p.current), target = parseFloat(p.target), replacement = parseFloat(p.replacement);
			if (isNaN(current) || current <= target || current <= replacement) return;
			const changeRatio = (current - target) / (current - replacement);
			if (changeRatio > masterPercent) {
				masterPercent = changeRatio;
				driverParam = p;
			}
		});
		const projectedResults = parameters.map(p => {
			const current = parseFloat(p.current);
			let projectedValue = current;
			if (!isNaN(current)) {
				const replacement = parseFloat(p.replacement);
				projectedValue = current - (masterPercent * (current - replacement));
			}
			return { ...p, projectedValue };
		});
		results = { liters: (vol * masterPercent).toFixed(1), percent: (masterPercent * 100).toFixed(1), driver: driverParam, projections: projectedResults };
	}

    function saveToLogbook() {
        if (!results) return;
        const logEntry = { timestamp: Date.now(), volume: parseFloat(volume), results: results };
        logbook.add(logEntry);
        alert('Entry saved to logbook!');
    }
</script>

<svelte:head> <title>{t.titleExpert}</title> </svelte:head>

<h1>{t.headerExpert}</h1>
<div class="nav-link-group">
	<a href="{base}/">{t.linkSimple}</a>
    <span>&bull;</span>
	<a href="{base}/logboek">{t.linkLogbook}</a>
</div>

<div class="expert-content-box">
	<div class="global-input">
		<label for="volume">{t.labelVolume}</label>
		<input type="number" id="volume" placeholder={t.placeholderVolume} bind:value={volume}>
	</div>

	{#each parameters as param (param.id)}
		<div class="parameter-card">
			<h3>{t[param.translationKey]} ({param.unit})</h3>
			<div class="input-group">
				<label for="current-{param.id}">{t.labelCurrentExpert}</label>
				<input type="number" id="current-{param.id}" inputmode="decimal" bind:value={param.current}>
			</div>
			<div class="input-grid-half">
				<div class="input-group">
					<label for="replacement-{param.id}">{t.labelReplacementExpert}</label>
					<input type="number" id="replacement-{param.id}" inputmode="decimal" bind:value={param.replacement}>
				</div>
				<div class="input-group">
					<label for="target-{param.id}">{t.labelTargetExpert}</label>
					<input type="number" id="target-{param.id}" inputmode="decimal" bind:value={param.target}>
				</div>
			</div>
		</div>
	{/each}
	<button on:click={calculate}>{t.calculateButton}</button>
</div>

{#if results}
	<div class="expert-content-box">
		{#if results.percent > 0 && results.driver}
			<div class="result-box">{@html t.recommendationText(results.liters, results.percent)}</div>
			<p id="summary-driver">{@html t.driverText(t[results.driver.translationKey])}</p>
		{:else}
			<div class="result-box">No water change needed.</div>
		{/if}
        <button class="save-button" on:click={saveToLogbook}>{t.saveLogButton}</button>
		<h2>{t.projectedHeader}</h2>
		<table class="results-table">
			<thead><tr><th>{t.colParam}</th><th>{t.colCurrent}</th><th>{t.colProjected}</th></tr></thead>
			<tbody>
				{#each results.projections as p (p.id)}
					<tr class:driver-row={results.driver && p.id === results.driver.id}>
						<td>{t[p.translationKey]}</td>
						<td>{p.current || 'N/A'}</td>
						<td><strong>{isNaN(p.projectedValue) ? 'N/A' : p.projectedValue.toFixed(2)}</strong></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}