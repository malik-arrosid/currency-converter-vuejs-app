<template>
    <div class="converter">
        <div class="input-group">
            <input :value="formattedAmount" @input="updateAmount($event.target.value)" type="text"
                placeholder="Enter amount" />
            <select v-model="fromCurrency">
                <option v-for="currency in currencies" :key="currency" :value="currency">
                    {{ currency }}
                </option>
            </select>
            <select v-model="toCurrency">
                <option v-for="currency in currencies" :key="currency" :value="currency">
                    {{ currency }}
                </option>
            </select>
            <button @click="convert">Convert</button>
        </div>
        <p v-if="hasConverted">{{ formattedAmount }} {{ fromCurrency }} = {{ formattedResult }} {{ toCurrency }}</p>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { fetchExchangeRate } from '../services/api';

const rawAmount = ref(''); // No default amount
const amount = ref(''); // Numeric value for calculations
const fromCurrency = ref('USD');
const toCurrency = ref('IDR'); // Default to IDR for the example
const conversionResult = ref(null);
const hasConverted = ref(false); // Track if conversion has been made
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'IDR', 'AUD'];

// Function to format numbers with thousand separators
const formatCurrency = (number) => {
    return number.toLocaleString('de-DE');
};

// Watcher to update amount when rawAmount changes
watch(rawAmount, (newValue) => {
    const numericValue = parseFloat(newValue.replace(/\./g, '').replace(',', '.'));
    amount.value = isNaN(numericValue) ? 0 : numericValue;
});

const convert = async () => {
    try {
        const rate = await fetchExchangeRate(fromCurrency.value, toCurrency.value);
        conversionResult.value = (amount.value * rate).toFixed(2);
        hasConverted.value = true; // Set to true when conversion is made
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
    }
};

// Computed property to get the formatted conversion result
const formattedResult = computed(() => {
    return conversionResult.value ? formatCurrency(parseFloat(conversionResult.value)) : null;
});

// Computed property to format the amount for display
const formattedAmount = computed(() => {
    return formatCurrency(amount.value);
});

// Method to update rawAmount based on user input
const updateAmount = (input) => {
    const cleanInput = input.replace(/[^\d.,]/g, ''); // Remove non-numeric characters except comma and period
    rawAmount.value = cleanInput;
};
</script>


<style scoped>
.converter {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input,
select,
button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

input:focus,
select:focus,
button:focus {
    outline: none;
    border-color: #4a90e2;
}

button {
    background-color: #4a90e2;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #357ab8;
}

p {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #333;
    text-align: center;
}

@media (max-width: 600px) {
    .input-group {
        flex-direction: column;
    }

    select,
    button {
        width: 100%;
    }
}
</style>
