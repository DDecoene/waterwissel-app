# Aquarium Water Change Calculator

A smart, progressive web app (PWA) to accurately calculate the amount of water to change in your aquarium to reach a specific parameter target.

This tool is designed for modern aquarists who want precision. It goes beyond simple dilution by accounting for the parameter values already present in your replacement (tap) water.

## ✨ Features

*   **Accurate Calculation**: Uses a formula that includes the parameter value of your replacement water for precise results.
*   **Multiple Parameters**: Supports common aquarium parameters like Nitrate (NO₃), Nitrite (NO₂), Phosphate (PO₄), GH, and KH.
*   **Smart Defaults**: Provides sensible target values for each parameter, which you can easily override.
*   **Multilingual**: Supports English and Dutch, automatically detecting your browser's language.
*   **Remembers Your Tank**: Saves your aquarium volume and language preference in your browser for convenience.
*   **Installable PWA**: Can be "installed" on your phone or desktop for offline access, just like a native app.
*   **Responsive Design**: Works beautifully on any device, from mobile phones to desktops.

## 🧮 How it Works: The Formula

The calculation is based on the following formula, which accurately determines the required water change percentage:

`Change % = (CurrentValue - TargetValue) / (CurrentValue - ReplacementWaterValue)`

The amount of water to change in liters is then:

`LitersToChange = AquariumVolume * Change %`

This ensures that you don't over- or underestimate your water change, which is common with simpler calculators.

## 🚀 How to Use

1.  **Aquarium Volume**: Enter the total volume of your aquarium in liters. This value is saved automatically for your next visit.
2.  **Parameter**: Select the water parameter you want to adjust (e.g., Nitrate).
3.  **Current Value**: Measure and enter the current value of that parameter in your aquarium.
4.  **Target Value**: The calculator will suggest an ideal target value. You can change this to whatever you prefer.
5.  **Replacement Water Value**: **This is the important part!** Measure the parameter in your fresh replacement water (e.g., from your tap or RO unit) and enter it here. For things like Nitrite, this is usually 0. For Nitrates or minerals, it can be higher.
6.  **Calculate**: Press the button to see exactly how many liters you need to change.

---
*Developed with assistance from AI.*