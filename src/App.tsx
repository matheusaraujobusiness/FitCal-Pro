import React, { useState } from 'react';
import Header from './components/Header';
import UserForm from './components/UserForm';
import Results from './components/Results';
import { UserData, NutritionResults, MealPlan } from './types';
import { calculateNutrition, generateMealPlan } from './utils/calculations';

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [nutrition, setNutrition] = useState<NutritionResults | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  const handleFormSubmit = (data: UserData) => {
    const nutritionResults = calculateNutrition(data);
    const mealPlanResults = generateMealPlan(nutritionResults);
    
    setUserData(data);
    setNutrition(nutritionResults);
    setMealPlan(mealPlanResults);
  };

  const handleReset = () => {
    setUserData(null);
    setNutrition(null);
    setMealPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!userData ? (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Descubra Sua <span className="text-purple-600">Dieta Ideal</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Método científico desenvolvido ao longo de anos de prática clínica que calcula suas 
                necessidades calóricas e de macronutrientes baseado em suas características pessoais.
              </p>
            </div>
            <UserForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <Results
            userData={userData}
            nutrition={nutrition!}
            mealPlan={mealPlan!}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 FitCal Pro. Desenvolvido por Matheus Ribeiro de Araújo.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ⚠️ Baseado em estudos científicos e experiência clínica. Para orientação personalizada, agende uma consulta.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;