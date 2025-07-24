import React from 'react';

const SkillGraphView = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">My Learning Journey</h3>
        <p className="text-gray-600">Visualize your progress and track skill development</p>
      </div>
      
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">📈</span>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Coming Soon</h4>
        <p className="text-gray-600 mb-6">Your personalized skill graph and learning analytics are in development.</p>
        
        <div className="bg-green-50 rounded-lg p-6 max-w-md mx-auto">
          <h5 className="font-semibold text-green-800 mb-2">What to Expect:</h5>
          <ul className="text-left text-green-700 space-y-2">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Visual progress tracking</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Skill level progression</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Learning path recommendations</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Achievement badges and milestones</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillGraphView;