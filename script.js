const EMISSION_FACTORS = {
    "India": {
        "Transportation": 0.14,  // kgCO2/km
        "Electricity": 0.82,  // kgCO2/kWh
        "Diet": 1.25,  // kgCO2/meal
        "Waste": 0.1  // kgCO2/kg
    }
};

function updateDistanceValue(value) {
    document.getElementById('distanceValue').innerText = value;
}

function updateElectricityValue(value) {
    document.getElementById('electricityValue').innerText = value;
}

function updateWasteValue(value) {
    document.getElementById('wasteValue').innerText = value;
}

function calculateEmissions() {
    const country = document.getElementById('country').value;
    let distance = parseFloat(document.getElementById('distance').value);
    let electricity = parseFloat(document.getElementById('electricity').value);
    let waste = parseFloat(document.getElementById('waste').value);
    let meals = parseInt(document.getElementById('meals').value);

    // Normalize inputs
    distance = distance * 365;  // Convert daily distance to yearly
    electricity = electricity * 12;  // Convert monthly electricity to yearly
    waste = waste * 52;  // Convert weekly waste to yearly
    meals = meals * 365;  // Convert daily meals to yearly

    // Calculate carbon emissions
    const transportation_emissions = (EMISSION_FACTORS[country]["Transportation"] * distance / 1000).toFixed(2);
    const electricity_emissions = (EMISSION_FACTORS[country]["Electricity"] * electricity / 1000).toFixed(2);
    const diet_emissions = (EMISSION_FACTORS[country]["Diet"] * meals / 1000).toFixed(2);
    const waste_emissions = (EMISSION_FACTORS[country]["Waste"] * waste / 1000).toFixed(2);

    const total_emissions = (parseFloat(transportation_emissions) + parseFloat(electricity_emissions) + parseFloat(diet_emissions) + parseFloat(waste_emissions)).toFixed(2);

    // Display results
    document.getElementById('transportationResult').innerText = `🚗 Transportation: ${transportation_emissions} tonnes CO2 per year`;
    document.getElementById('electricityResult').innerText = `💡 Electricity: ${electricity_emissions} tonnes CO2 per year`;
    document.getElementById('dietResult').innerText = `🍽 Diet: ${diet_emissions} tonnes CO2 per year`;
    document.getElementById('wasteResult').innerText = `🗑 Waste: ${waste_emissions} tonnes CO2 per year`;
    document.getElementById('totalResult').innerText = `🌍 Your total carbon footprint is: ${total_emissions} tonnes CO2 per year`;

    document.getElementById('results').style.display = 'block';
}
