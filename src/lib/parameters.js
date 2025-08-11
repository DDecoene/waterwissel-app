// src/lib/parameters.js
export const parameterDefaults = { 
    nitrate: { target: 10,  replacement: 5,   unit: "mg/L", placeholderStart: "e.g. 40" }, 
    nitrite:   { target: 0,   replacement: 0,   unit: "mg/L", placeholderStart: "e.g. 1" }, 
    phosphate: { target: 0.5, replacement: 0.1, unit: "mg/L", placeholderStart: "e.g. 2" }, 
    gh: { target: 6,   replacement: 8,   unit: "°dH",  placeholderStart: "e.g. 12" }, 
    kh: { target: 4,   replacement: 5,   unit: "°dH",  placeholderStart: "e.g. 8" } 
};