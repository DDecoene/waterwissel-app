<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { translations } from '$lib/utils';
	import { currentLang, logbook } from '$lib/stores';

	$: t = translations[$currentLang] || translations.en;

	// Deze functie wordt aangeroepen wanneer de pagina voor het eerst laadt.
	onMount(() => {
		logbook.load(); // Laad de opgeslagen logs uit localStorage in de store
	});

	function deleteEntry(timestamp) {
		// Vraag om bevestiging voordat er iets verwijderd wordt
		if (confirm(t.deleteButton + '?')) { // Gebruik vertaling voor bevestiging
			logbook.remove(timestamp);
		}
	}

	function formatDate(timestamp) {
		// Formatteer de timestamp naar een leesbaar formaat
		return new Date(timestamp).toLocaleString($currentLang, {
			year: 'numeric', month: 'long', day: 'numeric',
			hour: '2-digit', minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>{t.logbookTitle}</title>
</svelte:head>

<h1>{t.logbookTitle}</h1>

<div class="nav-link-group">
    <a href="{base}/">{t.linkSimple}</a>
    <span>&bull;</span>
	<a href="{base}/expert">{t.linkExpert}</a>
</div>


{#if $logbook.length > 0}
	<div class="logbook-list">
		<!-- Sorteer de entries, nieuwste eerst -->
		{#each $logbook.sort((a, b) => b.timestamp - a.timestamp) as entry (entry.timestamp)}
			<div class="expert-content-box log-entry">
				<div class="log-header">
					<strong>{formatDate(entry.timestamp)}</strong>
					<button class="delete-btn" on:click={() => deleteEntry(entry.timestamp)}>{t.deleteButton}</button>
				</div>
				<div class="result-box">
					{@html t.recommendationText(entry.results.liters, entry.results.percent)}
				</div>
				{#if entry.results.driver}
				<p id="summary-driver">
					<!-- BUGFIX: Gebruik t[entry.results.driver.translationKey] in plaats van .name -->
					{@html t.driverText(t[entry.results.driver.translationKey])}
				</p>
				{/if}
				<table class="results-table">
					<thead>
						<tr>
							<th>{t.colParam}</th>
							<th>{t.colCurrent}</th>
							<th>{t.colProjected}</th>
						</tr>
					</thead>
					<tbody>
						{#each entry.results.projections as p}
							<tr class:driver-row={entry.results.driver && p.id === entry.results.driver.id}>
								<!-- BUGFIX: Gebruik t[p.translationKey] in plaats van p.name -->
								<td>{t[p.translationKey]}</td>
								<td>{p.current || 'N/A'}</td>
								<td><strong>{isNaN(p.projectedValue) ? 'N/A' : p.projectedValue.toFixed(2)}</strong></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}
	</div>
{:else}
	<div class="simple-container">
		<p>{t.emptyLog}</p>
	</div>
{/if}

<style>
	.logbook-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
    .log-entry {
        margin-top: 0; /* Override de margin van expert-content-box */
    }
	.log-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
	}
	.delete-btn {
        margin-top: 0; /* Override de margin van de algemene button stijl */
		background: #e74c3c;
		color: white;
		border: none;
		padding: 5px 10px;
		border-radius: 5px;
		font-size: 0.8rem;
		font-weight: bold;
		cursor: pointer;
		transition: background 0.2s;
	}
	.delete-btn:hover {
		background: #c0392b;
	}
	p {
		text-align: center;
	}
</style>