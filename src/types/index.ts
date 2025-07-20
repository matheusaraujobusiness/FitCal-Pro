export interface UserData {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

export interface NutritionResults {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
}

export interface MealSuggestion {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

export interface MealPlan {
  breakfast: MealSuggestion[];
  lunch: MealSuggestion[];
  dinner: MealSuggestion[];
  snacks: MealSuggestion[];
}