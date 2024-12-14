import { Symptom, ProblemFood, SafeFood, Insights } from '../types';

export const mockSymptoms: Symptom[] = [
  { date: new Date(), painLevel: 3, symptoms: ['Gas', 'Bloating'], bowelMovements: 2 },
  { date: new Date(Date.now() - 86400000), painLevel: 4, symptoms: ['Urgency', 'Pain'], bowelMovements: 3 },
  { date: new Date(Date.now() - 86400000 * 2), painLevel: 2, symptoms: ['Gas'], bowelMovements: 1 },
  { date: new Date(Date.now() - 86400000 * 3), painLevel: 5, symptoms: ['Pain', 'Bloating', 'Urgency'], bowelMovements: 4 }
];

export const mockProblemFoods: ProblemFood[] = [
  { name: 'Dairy', riskScore: 85, totalConsumptions: 8, flareIncidents: 6 },
  { name: 'Spicy Foods', riskScore: 75, totalConsumptions: 5, flareIncidents: 4 },
  { name: 'Coffee', riskScore: 60, totalConsumptions: 10, flareIncidents: 5 }
];

export const mockSafeFoods: SafeFood[] = [
  { name: 'Bananas', safetyScore: 95, totalConsumptions: 12, flareIncidents: 0 },
  { name: 'Rice', safetyScore: 90, totalConsumptions: 15, flareIncidents: 1 },
  { name: 'Chicken', safetyScore: 85, totalConsumptions: 10, flareIncidents: 1 }
];

export const mockInsights: Insights = {
  patterns: [
    "Higher symptom activity in the mornings",
    "Stress appears to correlate with flare-ups",
    "Better tolerance for small, frequent meals"
  ],
  recommendations: [
    "Consider keeping a stress diary",
    "Try eating smaller portions more frequently",
    "Stay well hydrated throughout the day"
  ]
};

export const stoolTypes = [1,2,3,4,5,6,7].map(type => ({
  type,
  description: [
    "Separate hard lumps",
    "Lumpy and sausage-like", 
    "Sausage with cracks",
    "Smooth, soft sausage",
    "Soft blobs with clear edges",
    "Mushy with ragged edges",
    "Entirely liquid"
  ][type-1],
  symptoms: [
    ["Hard to pass", "Painful", "Constipation"],
    ["Slightly hard", "Constipated"],
    ["Normal", "Healthy"],
    ["Perfect", "Ideal"],
    ["Lacking fiber", "Soft"],
    ["Inflammation", "Diarrhea"],
    ["Severe diarrhea", "Dehydration risk"]
  ][type-1]
})); 