import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Custom store voor het logboek
function createLogbook() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        // Methode om de logs uit localStorage te laden
        load: () => {
            if (browser) {
                const storedLogs = localStorage.getItem('aquariumLogbook');
                if (storedLogs) {
                    set(JSON.parse(storedLogs));
                }
            }
        },
        // Methode om een nieuwe entry toe te voegen
        add: (entry) => {
            update(items => {
                const updatedItems = [entry, ...items];
                if (browser) {
                    localStorage.setItem('aquariumLogbook', JSON.stringify(updatedItems));
                }
                return updatedItems;
            });
        },
        // Methode om een entry te verwijderen op basis van timestamp
        remove: (timestamp) => {
            update(items => {
                const updatedItems = items.filter(item => item.timestamp !== timestamp);
                if (browser) {
                    localStorage.setItem('aquariumLogbook', JSON.stringify(updatedItems));
                }
                return updatedItems;
            });
        },
        // Reset methode (optioneel, maar handig)
        reset: () => {
            set([]);
            if (browser) {
                localStorage.removeItem('aquariumLogbook');
            }
        }
    };
}

export const logbook = createLogbook();