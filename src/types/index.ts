export interface Symptom {
  date: Date;
  painLevel: number;
  symptoms: string[];
  bowelMovements: number;
}

export interface FoodLog {
  id: number;
  timestamp: string;
  date: string;
  foods: string[];
  productName: string;
  brandName: string;
  nutrition: string;
  ibdConsiderations: string;
}

export interface ProblemFood {
  name: string;
  riskScore: number;
  totalConsumptions: number;
  flareIncidents: number;
}

export interface SafeFood {
  name: string;
  safetyScore: number;
  totalConsumptions: number;
  flareIncidents: number;
}

export interface WeeklyStats {
  avgPain: string;
  avgBM: string;
  totalEntries: string;
}

export interface Insights {
  patterns: string[];
  recommendations: string[];
}

export interface PageProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
} 