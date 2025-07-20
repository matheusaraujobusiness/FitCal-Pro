import React from 'react';
import { NutritionResults, MealPlan, UserData } from '../types';
import { Calculator, Target, Utensils, RotateCcw } from 'lucide-react';

interface ResultsProps {
  userData: UserData;
  nutrition: NutritionResults;
  mealPlan: MealPlan;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ userData, nutrition, mealPlan, onReset }) => {
  const MacroCard = ({ title, grams, calories, color, percentage }: {
    title: string;
    grams: number;
    calories: number;
    color: string;
    percentage: number;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <div className={`w-4 h-4 rounded-full ${color}`}></div>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">{grams}g</div>
        <div className="text-sm text-gray-600">{calories} kcal</div>
        <div className="text-sm text-gray-500">{percentage}% das calorias</div>
      </div>
    </div>
  );

  const MealSection = ({ title, meals, icon }: {
    title: string;
    meals: any[];
    icon: React.ReactNode;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-3">
        {meals.map((meal, index) => (
          <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
            <h4 className="font-medium text-gray-800">{meal.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                {meal.calories} kcal
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                P: {meal.protein}g
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                C: {meal.carbs}g
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                G: {meal.fat}g
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const proteinPercentage = Math.round((nutrition.proteinCalories / nutrition.targetCalories) * 100);
  const carbsPercentage = Math.round((nutrition.carbsCalories / nutrition.targetCalories) * 100);
  const fatPercentage = Math.round((nutrition.fatCalories / nutrition.targetCalories) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Seu Plano Nutricional</h2>
          <p className="text-gray-600 mt-2">Baseado em suas características pessoais</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Recalcular</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Calculator className="w-8 h-8 mx-auto mb-2 text-purple-200" />
            <div className="text-sm text-purple-200">Taxa Metabólica Basal</div>
            <div className="text-2xl font-bold">{nutrition.bmr} kcal</div>
          </div>
          <div>
            <Target className="w-8 h-8 mx-auto mb-2 text-purple-200" />
            <div className="text-sm text-purple-200">Gasto Calórico Diário</div>
            <div className="text-2xl font-bold">{nutrition.tdee} kcal</div>
          </div>
          <div>
            <Utensils className="w-8 h-8 mx-auto mb-2 text-purple-200" />
            <div className="text-sm text-purple-200">Meta Calórica Diária</div>
            <div className="text-3xl font-bold">{nutrition.targetCalories} kcal</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Distribuição de Macronutrientes</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <MacroCard
            title="Proteínas"
            grams={nutrition.protein}
            calories={nutrition.proteinCalories}
            color="bg-blue-500"
            percentage={proteinPercentage}
          />
          <MacroCard
            title="Carboidratos"
            grams={nutrition.carbs}
            calories={nutrition.carbsCalories}
            color="bg-green-500"
            percentage={carbsPercentage}
          />
          <MacroCard
            title="Gorduras"
            grams={nutrition.fat}
            calories={nutrition.fatCalories}
            color="bg-yellow-500"
            percentage={fatPercentage}
          />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Sugestões de Refeições</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          <MealSection
            title="Café da Manhã"
            meals={mealPlan.breakfast}
            icon={<div className="text-orange-500 text-xl">🌅</div>}
          />
          <MealSection
            title="Almoço"
            meals={mealPlan.lunch}
            icon={<div className="text-yellow-500 text-xl">☀️</div>}
          />
          <MealSection
            title="Jantar"
            meals={mealPlan.dinner}
            icon={<div className="text-purple-500 text-xl">🌙</div>}
          />
          <MealSection
            title="Lanches"
            meals={mealPlan.snacks}
            icon={<div className="text-green-500 text-xl">🥜</div>}
          />
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Recomendações Profissionais</h3>
        <ul className="space-y-2 text-blue-800">
          <li>• Beba pelo menos 2-3 litros de água por dia</li>
          <li>• Distribua as refeições ao longo do dia em intervalos de 3-4 horas</li>
          <li>• Ajuste as porções conforme sua fome e saciedade</li>
          <li>• Inclua vegetais e frutas em todas as refeições</li>
          <li>• Para planos mais específicos, agende uma consulta personalizada</li>
        </ul>
      </div>
    </div>
  );
};

export default Results;