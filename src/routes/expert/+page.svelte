<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths'; // <-- VOEG DEZE IMPORT TOE
	import { translations } from '$lib/translations.js';

	// ... de rest van je script-sectie blijft precies hetzelfde ...
	let volume = '', currentLang = 'en', results = null;
	let parameters = [ { id: 'nitrate', name: 'Nitrate (NO₃)', unit: 'mg/L', replacement: 5, target: 10, current: '' }, { id: 'nitrite', name: 'Nitrite (NO₂)', unit: 'mg/L', replacement: 0, target: 0, current: '' }, { id: 'phosphate', name: 'Phosphate (PO₄)', unit: 'mg/L', replacement: 0.1, target: 0.5, current: '' }, { id: 'gh', name: 'General Hardness (GH)', unit: '°dH', replacement: 8, target: 6, current: '' }, { id: 'kh', name: 'Carbonate Hardness (KH)', unit: '°dH', replacement: 5, target: 4, current: '' } ];
	$: t = translations[currentLang] || translations.en;
	onMount(() => { currentLang = localStorage.getItem('userLanguage') || 'en'; const savedVolume = localStorage.getItem('aquariumVolume'); if (savedVolume) volume = savedVolume; });
	function calculate() { const vol = parseFloat(volume); if (isNaN(vol) || vol <= 0) { alert('Please enter a valid aquarium volume.'); return; } localStorage.setItem('aquariumVolume', vol); let masterPercent = 0, driverParam = null; parameters.forEach(p => { const current = parseFloat(p.current), target = parseFloat(p.target), replacement = parseFloat(p.replacement); if (isNaN(current) || current <= target || current <= replacement) return; const changeRatio = (current - target) / (current - replacement); if (changeRatio > masterPercent) { masterPercent = changeRatio; driverParam = p; } }); const projectedResults = parameters.map(p => { const current = parseFloat(p.current); let projectedValue = current; if (!isNaN(current)) { const replacement = parseFloat(p.replacement); projectedValue = current - (masterPercent * (current - replacement)); } return { ...p, projectedValue }; }); results = { liters: (vol * masterPercent).toFixed(1), percent: (masterPercent * 100).toFixed(1), driver: driverParam, projections: projectedResults }; }
</script>

<svelte:head>
	<title>{t.titleExpert || 'Expert Water Change Calculator'}</title>
</svelte:head>

<h1>{t.headerExpert}</h1>
<div class="nav-link">
    <!-- HIER IS DE FIX -->
	<a href="{base}/">{t.linkSimple}</a>
</div>

<div class="content-box">
	<div class="global-input">
		<label for="volume">{t.labelVolume}</label>
		<input type="number" id="volume" placeholder={t.placeholderVolume} bind:value={volume}>
	</div>

	{#each parameters as param (param.id)}
		<div class="parameter-card">
			<h3>{param.name}</h3>
			<div class="input-group">
				<label for="current-{param.id}">{t.labelCurrent} ({param.unit})</label>
				<input type="number" id="current-{param.id}" inputmode="decimal" bind:value={param.current}>
			</div>
			<div class="input-grid-half">
				<div class="input-group">
					<label for="replacement-{param.id}">{t.labelReplacement} ({param.unit})</label>
					<input type="number" id="replacement-{param.id}" inputmode="decimal" bind:value={param.replacement}>
				</div>
				<div class="input-group">
					<label for="target-{param.id}">{t.labelTarget} ({param.unit})</label>
					<input type="number" id="target-{param.id}" inputmode="decimal" bind:value={param.target}>
				</div>
			</div>
		</div>
	{/each}

	<button class="action-button" on:click={calculate}>{t.calculateButton}</button>
</div>

{#if results}
	<div class="content-box">
		{#if results.percent > 0 && results.driver}
			<div class="result-box">{@html t.recommendationText(results.liters, results.percent)}</div>
			<p id="summary-driver">{@html t.driverText(results.driver.name)}</p>
		{:else}
			<div class="result-box">No water change needed.</div>
		{/if}
		<h2 style="text-align: center; margin-top: 30px;">{t.projectedHeader}</h2>
		<table class="results-table">
			<thead>
				<tr>
					<th>{t.colParam}</th>
					<th>{t.colCurrent}</th>
					<th>{t.colProjected}</th>
				</tr>
			</thead>
			<tbody>
				{#each results.projections as p (p.id)}
					<tr class:driver-row={results.driver && p.id === results.driver.id}>
						<td>{p.name}</td>
						<td>{p.current || 'N/A'} {p.unit}</td>
						<td><strong>{isNaN(p.projectedValue) ? 'N/A' : p.projectedValue.toFixed(2)} {p.unit}</strong></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}