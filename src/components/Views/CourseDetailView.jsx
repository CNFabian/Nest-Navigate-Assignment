import React from 'react';
import { Book, Clock, BarChart3, Tag, CheckCircle, AlertTriangle, Trophy, Target } from 'lucide-react';
import { lessonData } from '../../data/lessonData';

const CourseDetailView = ({ courseId, coins, completedLessons, correctAnswers, startModule, resetProgress, goBackToCourses }) => {
  const courseDetails = {
    'home-inspections': {
      title: 'Understanding Home Inspections',
      description: 'Learn the essentials of home inspections to make informed decisions when buying your first home.',
      totalLessons: 3,
      estimatedTime: '15 minutes',
      difficulty: 'Beginner',
      category: 'Property Assessment',
      maxCoins: 45,
      icon: 'home'
    }
  };

  const course = courseDetails[courseId];
  const progressPercentage = (completedLessons.length / course.totalLessons) * 100;
  const coinsEarned = correctAnswers.length * 15;
  const remainingCoins = course.maxCoins - coinsEarned;

  if (!course) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Course Not Found</h3>
          <p className="text-gray-600 mb-4">The requested course could not be found.</p>
          <button 
            onClick={goBackToCourses}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm flex-1 min-h-0">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={goBackToCourses}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="flex items-center">
              <span className="mr-1">←</span>
              Back to Courses
            </span>
          </button>
          
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">
              {completedLessons.length}/{course.totalLessons} lessons completed
            </div>
            {completedLessons.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{Math.round(progressPercentage)}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Book size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>
        </div>

      <div className="flex justify-center mb-6">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Book size={14} />
              <span>{course.totalLessons} lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{course.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 size={14} />
              <span>{course.difficulty}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag size={14} />
              <span>{course.category}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="bg-blue-50 px-3 py-2 rounded text-center flex-1">
              <div className="text-lg font-bold text-blue-600">{completedLessons.length}</div>
              <div className="text-xs text-blue-800">Lessons</div>
            </div>
            <div className="bg-green-50 px-3 py-2 rounded text-center flex-1">
              <div className="text-lg font-bold text-green-600">{correctAnswers.length}</div>
              <div className="text-xs text-green-800">Correct</div>
            </div>
            <div className="bg-yellow-50 px-3 py-2 rounded text-center flex-1">
              <div className="text-lg font-bold text-yellow-600">{remainingCoins}</div>
              <div className="text-xs text-yellow-800">Coins Left</div>
            </div>
          </div>
        </div>
      </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Course Content</h3>
          <div className="space-y-2">
            {Object.entries(lessonData).map(([key, lesson]) => {
              const lessonNum = parseInt(key);
              const isCompleted = completedLessons.includes(lessonNum);
              const isCorrect = correctAnswers.includes(lessonNum);
              
              return (
                <div 
                  key={key} 
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => startModule(lessonNum)}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                    isCorrect ? 'bg-green-500 text-white' :
                    isCompleted ? 'bg-yellow-500 text-white' : 'bg-gray-300'
                  }`}>
                    {isCorrect ? <CheckCircle size={14} /> : isCompleted ? <AlertTriangle size={14} /> : lessonNum}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm">Lesson {lessonNum}: {lesson.title}</h4>
                    {isCorrect && (
                      <p className="text-xs text-green-600 flex items-center">
                        <CheckCircle size={10} className="mr-1" />
                        Completed Correctly (+15 coins)
                      </p>
                    )}
                    {isCompleted && !isCorrect && (
                      <p className="text-xs text-yellow-600 flex items-center">
                        <AlertTriangle size={10} className="mr-1" />
                        Completed but incorrect (0 coins)
                      </p>
                    )}
                    {!isCompleted && (
                      <p className="text-xs text-gray-500">Not started yet</p>
                    )}
                  </div>
                  <div>
                    {isCorrect ? <Trophy size={18} className="text-yellow-500" /> : 
                     isCompleted ? <Book size={18} className="text-blue-500" /> : 
                     <Book size={18} className="text-gray-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    {remainingCoins > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border-2 border-yellow-200">
          <div className="flex items-center space-x-3 mb-3">
            <Target size={24} className="text-orange-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Course Reward</h3>
              <p className="text-sm text-gray-600">You still have {remainingCoins} coins to collect!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-selective_yellow rounded-full flex items-center justify-center text-neutral_dark text-sm font-bold border border-selective_yellow-400">
              ¢
            </div>
            <span className="font-bold text-gray-800">{remainingCoins} coins remaining</span>
          </div>
        </div>
      )}
      <div className="space-y-3 flex-shrink-0">
       <button 
          onClick={startModule} 
          className="btn-primary w-full group hover:scale-102"
        >
          <span className="flex items-center justify-center">
            {completedLessons.length === 0 ? 'Start Learning' : 'Continue Learning'}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </button>
        
        {completedLessons.length > 0 && (
          <button 
            onClick={resetProgress} 
            className="w-full px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Reset Progress
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetailView;