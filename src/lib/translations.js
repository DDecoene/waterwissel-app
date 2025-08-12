// src/lib/translations.js
export const translations = {
    en: {
        // Basic mode
        title: "Aquarium Water Change Calculator", 
        header: "Aquarium Water Change Calculator", 
        linkExpert: "Switch to Expert Mode →",
        
        // Expert mode
        titleExpert: "Expert Water Change Calculator",
        headerExpert: "Expert Water Change Calculator",
        linkSimple: "← Back to Simple Mode",
        
        // Form labels
        labelVolume: "Aquarium Volume (liters):", 
        placeholderVolume: "e.g. 200", 
        labelParameter: "Parameter:",
        labelStart: "Current Value",
        labelTarget: "Target Value", 
        labelReplacement: "Replacement Water Value",
        // NIEUWE, KORTERE LABELS VOOR EXPERT MODE
        labelCurrentExpert: "Current Value",
        labelReplacementExpert: "Replacement",
        labelTargetExpert: "Target",
        
        // Parameters
        paramNitrate: "Nitrate (NO₃)", 
        paramNitrite: "Nitrite (NO₂)", 
        paramPhosphate: "Phosphate (PO₄)",
        paramGH: "General Hardness (GH)", 
        paramKH: "Carbonate Hardness (KH)", 
        
        // Buttons and actions
        calculateButton: "Calculate",
        aboutButton: "About this Calculator", 
        
        // Results and messages
        errorMsgGeneric: "❌ Please check all inputs.",
        errorMsgImpossible: "❌ Target is unachievable. Target value must be higher than replacement water value.",
        errorMsgIneffective: "❌ Water change is ineffective. Replacement water value is higher than or equal to current value.",
        resultMsg: (liters, percentage) => `💧 You need to change <strong>${liters} liters</strong> of water (${percentage}%).`,
        
        // Expert mode specific
        recommendationText: (liters, percentage) => `💧 Recommended: <strong>${liters} liters</strong> (${percentage}%)`,
        driverText: (paramName) => `<em>Driving parameter: ${paramName}</em>`,
        projectedHeader: "Projected Values After Water Change",
        colParam: "Parameter",
        colCurrent: "Current",
        colProjected: "After Change"
    },
    nl: {
        // Basic mode
        title: "Aquarium Waterwissel Calculator", 
        header: "Aquarium Waterwissel Calculator", 
        linkExpert: "Wissel naar Expert Modus →",
        
        // Expert mode
        titleExpert: "Expert Waterwissel Calculator",
        headerExpert: "Expert Waterwissel Calculator",
        linkSimple: "← Terug naar Eenvoudige Modus",
        
        // Form labels
        labelVolume: "Aquariuminhoud (liter):", 
        placeholderVolume: "bijv. 200", 
        labelParameter: "Parameter:",
        labelStart: "Startwaarde",
        labelTarget: "Doelwaarde", 
        labelReplacement: "Waarde in verversingswater",
        // NIEUWE, KORTERE LABELS VOOR EXPERT MODE
        labelCurrentExpert: "Huidige Waarde",
        labelReplacementExpert: "Verversing",
        labelTargetExpert: "Doel",

        // Parameters
        paramNitrate: "Nitraat (NO₃)", 
        paramNitrite: "Nitriet (NO₂)", 
        paramPhosphate: "Fosfaat (PO₄)",
        paramGH: "Algemene Hardheid (GH)", 
        paramKH: "Carbonaathardheid (KH)", 
        
        // Buttons and actions
        calculateButton: "Bereken",
        aboutButton: "Over deze Calculator", 
        
        // Results and messages
        errorMsgGeneric: "❌ Controleer alle invoer.",
        errorMsgImpossible: "❌ Doel is onbereikbaar. Doelwaarde moet hoger zijn dan de waarde van het verversingswater.",
        errorMsgIneffective: "❌ Waterwissel is niet effectief. Waarde van verversingswater is hoger dan of gelijk aan de startwaarde.",
        resultMsg: (liters, percentage) => `💧 Je moet <strong>${liters} liter</strong> vervangen (${percentage}%).`,
        
        // Expert mode specific
        recommendationText: (liters, percentage) => `💧 Aanbevolen: <strong>${liters} liter</strong> (${percentage}%)`,
        driverText: (paramName) => `<em>Bepalende parameter: ${paramName}</em>`,
        projectedHeader: "Verwachte Waarden Na Waterwissel",
        colParam: "Parameter",
        colCurrent: "Huidig",
        colProjected: "Na Wissel"
    }
};