import { UserData, NutritionResults, MealPlan, MealSuggestion } from '../types';

export function calculateNutrition(userData: UserData): NutritionResults {
  let bmr: number;
  if (userData.gender === 'male') {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
  } else {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
  }

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  };

  const tdee = bmr * activityFactors[userData.activityLevel];

  let targetCalories: number;
  switch (userData.goal) {
    case 'lose':
      targetCalories = tdee - 500;
      break;
    case 'gain':
      targetCalories = tdee + 300;
      break;
    default:
      targetCalories = tdee;
  }

  const proteinGrams = userData.weight * 2.2;
  const proteinCalories = proteinGrams * 4;

  const fatPercentage = 0.27;
  const fatCalories = targetCalories * fatPercentage;
  const fatGrams = fatCalories / 9;

  const carbsCalories = targetCalories - proteinCalories - fatCalories;
  const carbsGrams = carbsCalories / 4;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    protein: Math.round(proteinGrams),
    carbs: Math.round(carbsGrams),
    fat: Math.round(fatGrams),
    proteinCalories: Math.round(proteinCalories),
    carbsCalories: Math.round(carbsCalories),
    fatCalories: Math.round(fatCalories)
  };
}

export function generateMealPlan(nutrition: NutritionResults): MealPlan {
  const breakfastMeals: MealSuggestion[] = [
    {
      name: 'Aveia com Frutas e Whey',
      calories: Math.round(nutrition.targetCalories * 0.25),
      protein: Math.round(nutrition.protein * 0.3),
      carbs: Math.round(nutrition.carbs * 0.3),
      fat: Math.round(nutrition.fat * 0.2),
      description: '50g de aveia, 1 banana, 30g whey protein, 10g mel'
    },
    {
      name: 'Ovos Mexidos com Torrada',
      calories: Math.round(nutrition.targetCalories * 0.25),
      protein: Math.round(nutrition.protein * 0.25),
      carbs: Math.round(nutrition.carbs * 0.25),
      fat: Math.round(nutrition.fat * 0.25),
      description: '3 ovos, 2 fatias de pão integral, 1 col. sopa azeite'
    }
  ];

  const lunchMeals: MealSuggestion[] = [
    {
      name: 'Frango Grelhado com Arroz e Legumes',
      calories: Math.round(nutrition.targetCalories * 0.35),
      protein: Math.round(nutrition.protein * 0.4),
      carbs: Math.round(nutrition.carbs * 0.4),
      fat: Math.round(nutrition.fat * 0.3),
      description: '150g peito de frango, 80g arroz integral, salada mista'
    },
    {
      name: 'Salmão com Batata Doce',
      calories: Math.round(nutrition.targetCalories * 0.35),
      protein: Math.round(nutrition.protein * 0.35),
      carbs: Math.round(nutrition.carbs * 0.35),
      fat: Math.round(nutrition.fat * 0.4),
      description: '120g salmão grelhado, 150g batata doce, brócolis'
    }
  ];

  const dinnerMeals: MealSuggestion[] = [
    {
      name: 'Carne Magra com Quinoa',
      calories: Math.round(nutrition.targetCalories * 0.3),
      protein: Math.round(nutrition.protein * 0.25),
      carbs: Math.round(nutrition.carbs * 0.25),
      fat: Math.round(nutrition.fat * 0.25),
      description: '120g carne magra, 60g quinoa, vegetais refogados'
    },
    {
      name: 'Peixe com Legumes Assados',
      calories: Math.round(nutrition.targetCalories * 0.3),
      protein: Math.round(nutrition.protein * 0.3),
      carbs: Math.round(nutrition.carbs * 0.2),
      fat: Math.round(nutrition.fat * 0.3),
      description: '150g peixe branco, abobrinha, berinjela, pimentão'
    }
  ];

  const snackMeals: MealSuggestion[] = [
    {
      name: 'Iogurte com Oleaginosas',
      calories: Math.round(nutrition.targetCalories * 0.1),
      protein: Math.round(nutrition.protein * 0.15),
      carbs: Math.round(nutrition.carbs * 0.15),
      fat: Math.round(nutrition.fat * 0.25),
      description: '150g iogurte grego, 20g mix de castanhas'
    },
    {
      name: 'Shake Proteico',
      calories: Math.round(nutrition.targetCalories * 0.1),
      protein: Math.round(nutrition.protein * 0.2),
      carbs: Math.round(nutrition.carbs * 0.1),
      fat: Math.round(nutrition.fat * 0.1),
      description: '30g whey protein, 200ml leite desnatado, 1 fruta'
    }
  ];

  return {
    breakfast: breakfastMeals,
    lunch: lunchMeals,
    dinner: dinnerMeals,
    snacks: snackMeals
  };
}