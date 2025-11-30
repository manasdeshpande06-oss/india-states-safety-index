// This script adds all Indian states to the database
const states = [
  { code: 'AN', name: 'Andaman and Nicobar Islands', safety: 75 },
  { code: 'AP', name: 'Andhra Pradesh', safety: 65 },
  { code: 'AR', name: 'Arunachal Pradesh', safety: 70 },
  { code: 'AS', name: 'Assam', safety: 62 },
  { code: 'BR', name: 'Bihar', safety: 56 },
  { code: 'CG', name: 'Chhattisgarh', safety: 64 },
  { code: 'CH', name: 'Chandigarh', safety: 78 },
  { code: 'DD', name: 'Daman and Diu', safety: 72 },
  { code: 'DL', name: 'Delhi', safety: 54 },
  { code: 'GA', name: 'Goa', safety: 77 },
  { code: 'GJ', name: 'Gujarat', safety: 80 },
  { code: 'HR', name: 'Haryana', safety: 68 },
  { code: 'HP', name: 'Himachal Pradesh', safety: 74 },
  { code: 'JH', name: 'Jharkhand', safety: 60 },
  { code: 'JK', name: 'Jammu and Kashmir', safety: 58 },
  { code: 'KA', name: 'Karnataka', safety: 68 },
  { code: 'KL', name: 'Kerala', safety: 76 },
  { code: 'LA', name: 'Ladakh', safety: 55 },
  { code: 'LD', name: 'Lakshadweep', safety: 73 },
  { code: 'MH', name: 'Maharashtra', safety: 72 },
  { code: 'ML', name: 'Meghalaya', safety: 66 },
  { code: 'MN', name: 'Manipur', safety: 63 },
  { code: 'MP', name: 'Madhya Pradesh', safety: 63 },
  { code: 'MZ', name: 'Mizoram', safety: 69 },
  { code: 'NL', name: 'Nagaland', safety: 67 },
  { code: 'OD', name: 'Odisha', safety: 61 },
  { code: 'PB', name: 'Punjab', safety: 71 },
  { code: 'PY', name: 'Puducherry', safety: 70 },
  { code: 'RJ', name: 'Rajasthan', safety: 61 },
  { code: 'SK', name: 'Sikkim', safety: 74 },
  { code: 'TN', name: 'Tamil Nadu', safety: 75 },
  { code: 'TR', name: 'Tripura', safety: 65 },
  { code: 'TS', name: 'Telangana', safety: 66 },
  { code: 'UK', name: 'Uttarakhand', safety: 73 },
  { code: 'UP', name: 'Uttar Pradesh', safety: 58 },
  { code: 'WB', name: 'West Bengal', safety: 65 }
];

console.log('All Indian States and Union Territories:');
console.log('Total:', states.length);
console.log('');
states.forEach((state, index) => {
  console.log(`${index + 1}. ${state.name} (${state.code}) - Safety: ${state.safety}%`);
});
