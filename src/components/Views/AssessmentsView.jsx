import React from 'react';

const AssessmentsView = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Knowledge Assessments</h3>
        <p className="text-gray-600">Test your understanding and validate your learning progress</p>
      </div>
      
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">🎯</span>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Coming Soon</h4>
        <p className="text-gray-600 mb-6">Comprehensive assessments are in development to help you validate your homebuying knowledge.</p>
        
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
          <h5 className="font-semibold text-blue-800 mb-2">What to Expect:</h5>
          <ul className="text-left text-blue-700 space-y-2">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Comprehensive knowledge tests</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Real-world scenario assessments</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Progress tracking and certificates</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Personalized learning recommendations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsView;