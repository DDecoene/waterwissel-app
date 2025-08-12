import { writable } from 'svelte/store';

// Dit is ons centrale "prikbord" voor de huidige taal.
// We exporteren het zodat andere componenten het kunnen importeren.
export const currentLang = writable('en'); // 'en' is de standaardwaarde