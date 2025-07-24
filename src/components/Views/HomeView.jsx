import React, { useState } from 'react';
import { TrendingUp, Target, Calculator, BarChart3, CheckSquare, HelpCircle, Star, Lock, Lightbulb, Flame, Play, Eye, BookOpen, ChevronRight } from 'lucide-react';

const HomeView = ({ coins, completedLessons, correctAnswers, startModule, goToOverview, onNavigateToCourses }) => {
  const [activeModal, setActiveModal] = useState(null);

  const completionPercentage = Math.round((completedLessons.length / 3) * 100);
  const correctPercentage = Math.round((correctAnswers.length / 3) * 100);

  const weeklyTasks = [
    { 
      task: 'Start your first course', 
      progress: completedLessons.length > 0 ? 100 : 0, 
      completed: completedLessons.length > 0 
    },
    { 
      task: 'Finish home inspection module', 
      progress: completionPercentage, 
      completed: completedLessons.length === 3 
    },
    { 
      task: 'Get all questions correct', 
      progress: correctPercentage, 
      completed: correctAnswers.length === 3 
    },
    { 
      task: 'Earn 45 coins', 
      progress: Math.min((coins / 45) * 100, 100), 
      completed: coins >= 45 
    }
  ];

  const CircularProgress = ({ percentage, size = 160 }) => {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3758ED"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-neutral_dark">{percentage}%</div>
            <div className="text-xs sm:text-sm text-gray-500">Completed</div>
          </div>
        </div>
      </div>
    );
  };

  const ProgressBar = ({ progress, completed }) => (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div 
        className={`h-1.5 rounded-full transition-all duration-500 ${
          completed ? 'bg-mindaro' : 'bg-gradient-to-r from-risd_faded to-risd_blue'
        }`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-neutral_dark">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

 return (
  <>
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
       <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-risd_blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp size={20} className="text-risd_blue" />
            <h3 className="text-lg sm:text-xl font-bold text-neutral_dark">Learning Progress</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Flame size={18} className="text-orange-500" />
            <div className="text-right">
              <div className="text-lg sm:text-xl font-bold text-risd_blue">7</div>
              <div className="text-xs sm:text-sm text-gray-500">day streak</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="space-y-2 sm:space-y-3 w-full sm:w-auto">
            <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
              <span className="text-sm sm:text-base text-gray-600 w-16">Courses</span>
              <span className="text-lg font-bold text-neutral_dark">1</span>
            </div>
            <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
              <span className="text-sm sm:text-base text-gray-600 w-16">Lessons</span>
              <span className="text-lg font-bold text-neutral_dark">{completedLessons.length}</span>
            </div>
            <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
              <span className="text-sm sm:text-base text-gray-600 w-16">Correct</span>
              <span className="text-lg font-bold text-neutral_dark">{correctAnswers.length} / 3</span>
            </div>
            
            <div className="pt-2 sm:pt-3 border-t border-risd_blue-100">
              <p className="text-sm sm:text-base text-gray-600 mb-2">My Coins:</p>
              <div className="flex items-center justify-between sm:justify-start sm:space-x-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-selective_yellow rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-neutral_dark text-xs sm:text-sm font-bold">¢</span>
                </div>
                <span className="text-lg font-bold text-neutral_dark">{coins}</span>
                <span className="text-sm sm:text-base text-gray-500">/ 45</span>
              </div>
            </div>

            <div className="pt-2 sm:pt-3">
              <button 
                onClick={onNavigateToCourses}
                className="flex items-center justify-center sm:justify-start w-full sm:w-auto px-3 py-2 text-xs sm:text-sm text-risd_blue hover:text-risd_blue-700 bg-risd_blue-50 hover:bg-risd_blue-100 rounded-lg transition-all duration-200 group border border-risd_blue-200 hover:border-risd_blue-300"
              >
                <BookOpen size={14} className="mr-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">View All Courses</span>
                <ChevronRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <CircularProgress percentage={completionPercentage} size={160} />
          </div>
        </div>
      </div>
      
       <div className="bg-white rounded-xl p-4 shadow-sm border border-risd_blue-100">
        <div className="flex items-center space-x-2 mb-3">
          <CheckSquare size={18} className="text-risd_blue" />
          <h3 className="text-base sm:text-lg font-bold text-neutral_dark">Weekly Tasks</h3>
        </div>
        
        <div className="space-y-3">
          {weeklyTasks.map((task, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  task.completed ? 'bg-mindaro border-2 border-mindaro-400' : 'border-2 border-gray-300'
                }`}>
                  {task.completed && <span className="text-neutral_dark text-xs font-bold">✓</span>}
                </div>
                <span className="text-xs sm:text-sm font-medium text-neutral_dark leading-tight">{task.task}</span>
              </div>
              <div className="ml-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">
                    {task.completed ? 'Completed!' : `${Math.round(task.progress)}%`}
                  </span>
                </div>
                <ProgressBar progress={task.progress} completed={task.completed} />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      
      <div className="flex-1"></div>
      
     <div className="mt-6 pt-6">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Lightbulb size={16} className="text-selective_yellow" />
          <span className="text-xs sm:text-sm font-semibold text-gray-600">Daily Tip</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 mb-1 italic px-2">
          "Always get a home inspection, even if the house looks perfect. 75% of homes have at least one major issue discovered during inspection."
        </p>
        <div className="text-xs text-gray-500">Tip #47 • Home Inspections</div>
      </div>

      <div className="grid grid-cols-4 gap-2 border-t border-gray-200 pt-4">
        <button 
          onClick={() => setActiveModal('calculator')}
          className="flex flex-col items-center p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Calculator size={18} className="text-risd_blue mb-1" />
          <span className="text-xs font-medium text-gray-700">Calculator</span>
        </button>
        
        <button 
          onClick={() => setActiveModal('market')}
          className="flex flex-col items-center p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <BarChart3 size={18} className="text-risd_blue mb-1" />
          <span className="text-xs font-medium text-gray-700">Market Data</span>
        </button>
        
        <button 
          onClick={() => setActiveModal('checklist')}
          className="flex flex-col items-center p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <CheckSquare size={18} className="text-risd_blue mb-1" />
          <span className="text-xs font-medium text-gray-700">Checklist</span>
        </button>
        
        <button 
          onClick={() => setActiveModal('quiz')}
          className="flex flex-col items-center p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <HelpCircle size={18} className="text-risd_blue mb-1" />
          <span className="text-xs font-medium text-gray-700">Daily Quiz</span>
        </button>
      </div>
    </div>
    </div>

      <Modal 
        isOpen={activeModal === 'calculator'} 
        onClose={() => setActiveModal(null)}
        title="Mortgage Calculator"
      >
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Home Price" 
              className="flex-1 text-sm p-3 border border-gray-300 rounded focus:border-risd_blue focus:outline-none"
            />
            <input 
              type="text" 
              placeholder="Down Payment %" 
              className="w-24 text-sm p-3 border border-gray-300 rounded focus:border-risd_blue focus:outline-none"
            />
          </div>
          <input 
            type="text" 
            placeholder="Interest Rate %" 
            className="w-full text-sm p-3 border border-gray-300 rounded focus:border-risd_blue focus:outline-none"
          />
          <button className="w-full bg-risd_blue text-white py-3 rounded-lg hover:bg-risd_blue-700 transition-colors">
            Calculate Payment
          </button>
          <div className="text-center text-lg font-bold text-neutral_dark">Estimated: $0/month</div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'market'} 
        onClose={() => setActiveModal(null)}
        title="Market Snapshot"
      >
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">Data for Fresno, CA • Updated daily</div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Median Home Price:</span>
              <span className="font-semibold">$425,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Days on Market:</span>
              <span className="font-semibold">23 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price Change (YoY):</span>
              <span className="font-semibold text-green-600">+3.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Inventory Level:</span>
              <span className="font-semibold text-orange-600">Low</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Competition Index:</span>
              <span className="font-semibold text-red-600">High</span>
            </div>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'checklist'} 
        onClose={() => setActiveModal(null)}
        title="Ready to Buy Checklist"
      >
        <div className="space-y-4">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-semibold">3/8 Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-mindaro h-2 rounded-full" style={{ width: '37.5%' }}></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Check credit score</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Save for down payment</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700">Get pre-approved</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">○</span>
              <span className="text-gray-500">Find a realtor</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">○</span>
              <span className="text-gray-500">Start house hunting</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">○</span>
              <span className="text-gray-500">Make an offer</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">○</span>
              <span className="text-gray-500">Get home inspection</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400">○</span>
              <span className="text-gray-500">Close on your home</span>
            </div>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'quiz'} 
        onClose={() => setActiveModal(null)}
        title="Daily Quiz"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Question of the Day</span>
            <span className="text-sm bg-selective_yellow-100 text-selective_yellow-800 px-3 py-1 rounded-full">+5 coins</span>
          </div>
          <p className="text-gray-700 mb-4">
            What's the typical duration of a professional home inspection?
          </p>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-risd_blue-50 rounded-lg transition-colors">
              A) 1-2 hours
            </button>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-risd_blue-50 rounded-lg transition-colors">
              B) 2-4 hours
            </button>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-risd_blue-50 rounded-lg transition-colors">
              C) 4-6 hours
            </button>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-risd_blue-50 rounded-lg transition-colors">
              D) 6-8 hours
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HomeView;