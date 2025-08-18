# Aquarium Water Change Calculator

A smart, progressive web app (PWA) to accurately calculate the amount of water to change in your aquarium to reach a specific parameter target.

This tool is designed for modern aquararists who want precision. It offers a simple mode for quick single-parameter calculations and an expert mode for balancing multiple parameters at once, complete with a persistent logbook.

## ✨ Features

*   **Two Calculation Modes**: Choose between a straightforward Simple Mode and a powerful Expert Mode.
*   **Expert Mode**: Calculate the required water change based on multiple parameters simultaneously. The app automatically determines which parameter is the "driver" for the change.
*   **Calculation Logbook**: Save your expert mode calculations—including all projected values—to a logbook in your browser to track your aquarium's history.
*   **Accurate Formula**: Goes beyond simple dilution by accounting for the parameter values already present in your replacement (tap) water.
*   **Multiple Parameters**: Supports common aquarium parameters like Nitrate (NO₃), Nitrite (NO₂), Phosphate (PO₄), GH, and KH.
*   **Smart Defaults**: Provides sensible target values for each parameter, which you can easily override.
*   **Multilingual**: Supports English and Dutch, automatically detecting your browser's language.
*   **Remembers Your Tank**: Saves your aquarium volume and language preference in your browser for convenience.
*   **Installable PWA**: Can be "installed" on your phone or desktop for offline access, just like a native app.
*   **Responsive Design**: Works beautifully on any device, from mobile phones to desktops.

## 🚀 How to Use

The app has three main sections: Simple Mode, Expert Mode, and the Logbook.

### Simple Mode (Quick Calculations)

This mode is perfect for when you want to adjust a single water parameter.

1.  **Aquarium Volume**: Enter the total volume of your aquarium in liters. This is saved for your next visit.
2.  **Parameter**: Select the single water parameter you want to adjust (e.g., Nitrate).
3.  **Current Value**: Measure and enter the current value of that parameter in your aquarium.
4.  **Target Value**: The calculator suggests an ideal target. You can change this to your preference.
5.  **Replacement Water Value**: **This is the important part!** Measure the parameter in your fresh replacement water (e.g., from your tap or RO unit) and enter it here.
6.  **Calculate**: Press the button to see exactly how many liters you need to change.

### Expert Mode (Multi-Parameter Balancing)

This mode calculates the single water change needed to manage multiple parameters at once. It identifies the parameter that requires the biggest change and bases the calculation on that.

1.  **Navigate**: Switch to Expert Mode from the link on the main page.
2.  **Enter Volume**: Set your aquarium volume at the top of the page.
3.  **Enter Current Values**: For every parameter you want to track, fill in its "Current Value". You can leave fields blank for parameters you aren't measuring.
4.  **Adjust Targets (Optional)**: You can adjust the default "Target" and "Replacement" water values for any parameter.
5.  **Calculate**: Press the button to get your results.
    *   **Recommendation**: The app shows the recommended amount of water to change in liters and as a percentage.
    *   **Driving Parameter**: It tells you which parameter was the "driver" (the one that required the largest water change).
    *   **Projected Values**: A table shows you what the new, projected values for *all* your measured parameters will be after you perform the recommended water change.

### Logbook (Tracking History)

The Logbook allows you to save and review your Expert Mode calculations over time.

1.  **Save a Calculation**: After running a calculation in Expert Mode, a **"Save to Logbook"** button will appear. Click it to save the complete result.
2.  **View the Logbook**: Navigate to the "Logbook" from the main menu.
3.  **Review History**: You will see a list of all your saved entries, sorted with the most recent first. Each entry shows the date, the recommended water change, the driving parameter, and the full table of projected values. This is perfect for tracking how your aquarium's chemistry changes over time.
4.  **Delete Entries**: You can remove old or unneeded entries with the delete button on each log.

## 🧮 The Formula

The calculation is based on the following formula, which accurately determines the required water change percentage for a single parameter:

`Change % = (CurrentValue - TargetValue) / (CurrentValue - ReplacementWaterValue)`

The amount of water to change in liters is then:

`LitersToChange = AquariumVolume * Change %`

In Expert Mode, this calculation is performed for all parameters, and the highest `Change %` is used for the final recommendation.

## 💡 Smart Defaults & The 'Why'

The calculator comes pre-filled with sensible default values. Here’s a brief explanation of why these targets were chosen, based on general best practices for a healthy freshwater planted aquarium.

*   **Nitrate (NO₃)**
    *   **Default Target: 10 mg/L**. Nitrate is a key nutrient for plant growth but can cause stress to fish at very high levels (above 40-50 mg/L). A target of 10 mg/L is a safe middle ground that nourishes plants without harming fish and helps keep algae in check. [1, 5]

*   **Nitrite (NO₂)**
    *   **Default Target: 0 mg/L**. Nitrite is highly toxic to fish as it interferes with their ability to breathe. The only safe level for nitrite is zero. A reading above zero indicates that the aquarium's nitrogen cycle is not fully established or has been disrupted. [1, 3]

*   **Phosphate (PO₄)**
    *   **Default Target: 0.5 mg/L**. Phosphate is another essential nutrient for plants, but it's also a primary driver of algae growth, especially "green spot" algae. The target of 0.5 mg/L provides sufficient phosphate for healthy plant growth while being low enough to discourage major algae blooms. [5]

*   **General Hardness (GH)**
    *   **Default Target: 6 °dH**. GH measures the amount of calcium and magnesium in the water, which are vital for the health of fish and plants. A level of 4-8 °dH is a versatile target suitable for a wide variety of common community fish and plant species. [4]

*   **Carbonate Hardness (KH)**
    *   **Default Target: 4 °dH**. KH, or alkalinity, is crucial for keeping the pH stable and preventing sudden, dangerous swings. A target of 4-8 °dKH provides a solid buffer against pH crashes, creating a stable environment for your aquarium's inhabitants. [1, 4]

---
*Developed with assistance from AI.*

## References
1. [Ideal Water Parameters - Tank Aquariums](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF8HbIdJaOpomfNQ1144gn7k0osf0HGOiGcPFfW-Kh-LCkh87xAykL2f0JOqOIygKOVuAgzmg2iWxkt1BDffnTg2i5q_tOLFDkG7Uy5-i2B6wXPSn5_V12JBDG0pxURhTOcu1bB-_FEni04-jh42eFKttpIJ49Cvwekdl_sHoHXezDJ4Q==)
2. [WATER PARAMETERS Masterclass 2024 - Green Aqua](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHGUHlLV7C9yHziUDaqFA7aPe_WD6Xa6VQgDK-r-lY2gJtb2wB5jhFYd24LVM3KOlggrRc0JAlB1SkuIJLPgd8UwJn5QqfG_MRcUxJqcAm8L6TthoO9Qn54D4CiekJ5PoN0fhJrNVc=)
3. [Proper Water Parameters for Home Aquariums - LiveAquaria](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdrjioxHglnLCgPIab8NRz1U4NpBxb7rQuK-Z00XpTtv1-kRwKBtc5ION5F0k31C-e82lLkc2_-XQPvnd9w_BdaPYgCj_534LeRVtzHweqIjGosisd9nX4Id-XshmL89xQDAE7lzstn2s=)
4. [The Fish Keeper's Guide to pH, GH, and KH - Aquarium Co-Op](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFCWAf_0wIOddfSm-NrsnfbTbu1B2OPXMvQQADx2gEf3gmPdlkZe73xL2ahiyk1FAzcxdqbCHtaazNbq0qEACqlhd7MavTUNjYoP6Rn4N8kifYejX8ihFQfx92INXyY5mQ3LQw8Y-DO0PyOUyZh7HU=)
5. [Controlling and measuring Macro nutrients in the planted aquarium. - Freshwater Aquarium Plants](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJ2AsAYOwp-_N71cUSEcQSTpyJQOXjWkPLvNI5i5llTKj9bXMD0iZZXqIz7rbEhEmRWcQ7EGbi9cgzbI8l6etvbKeWMJ9A0H5HaFOQK3x2p724Fu1Z7O1-YYzN-q9jRozP8oGwYSBQFjoSMhPmTO4ztQ==)