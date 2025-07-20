import React, { useState } from 'react';
import { UserData } from '../types';
import { User, Target, Activity, Scale } from 'lucide-react';

interface UserFormProps {
  onSubmit: (data: UserData) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserData>({
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof UserData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center space-x-2">
          <User className="w-6 h-6" />
          <span>Suas Informações</span>
        </h2>
        <p className="text-purple-100 text-center mt-2">
          Método desenvolvido com base em 8 anos de experiência clínica
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Scale className="inline w-4 h-4 mr-1" />
              Peso (kg)
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              min="30"
              max="200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Altura (cm)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleChange('height', parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              min="120"
              max="220"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Idade (anos)
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              min="15"
              max="80"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sexo
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Activity className="inline w-4 h-4 mr-1" />
            Nível de Atividade Física
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { value: 'sedentary', label: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
              { value: 'light', label: 'Leve', desc: 'Exercício leve 1-3 dias/semana' },
              { value: 'moderate', label: 'Moderado', desc: 'Exercício moderado 3-5 dias/semana' },
              { value: 'active', label: 'Ativo', desc: 'Exercício intenso 6-7 dias/semana' },
              { value: 'very-active', label: 'Muito Ativo', desc: 'Exercício muito intenso diariamente' }
            ].map(activity => (
              <label key={activity.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="activityLevel"
                  value={activity.value}
                  checked={formData.activityLevel === activity.value}
                  onChange={(e) => handleChange('activityLevel', e.target.value)}
                  className="mt-1 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <span className="font-medium text-gray-800">{activity.label}</span>
                  <p className="text-sm text-gray-600">{activity.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Target className="inline w-4 h-4 mr-1" />
            Objetivo
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { value: 'lose', label: 'Perder Peso', icon: '🔥', desc: 'Déficit calórico' },
              { value: 'maintain', label: 'Manter Peso', icon: '⚖️', desc: 'Manutenção' },
              { value: 'gain', label: 'Ganhar Massa', icon: '💪', desc: 'Superávit calórico' }
            ].map(goal => (
              <label key={goal.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="goal"
                  value={goal.value}
                  checked={formData.goal === goal.value}
                  onChange={(e) => handleChange('goal', e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 transition-all text-center ${
                  formData.goal === goal.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}>
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <div className="font-semibold text-gray-800">{goal.label}</div>
                  <div className="text-sm text-gray-600">{goal.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
        >
          Calcular Minha Dieta Ideal
        </button>
      </form>
    </div>
  );
};

export default UserForm;