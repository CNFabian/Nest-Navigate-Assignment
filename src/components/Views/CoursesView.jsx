import React from 'react';
import { Book, Clock, Tag, CheckCircle, AlertTriangle, Lock, BookOpen, Trophy, Star } from 'lucide-react';

const CoursesView = ({ onCourseSelect, completedLessons, correctAnswers }) => {
  const courses = [
    {
      id: 'home-inspections',
      title: 'Understanding Home Inspections',
      description: 'Learn the essentials of home inspections to make informed decisions',
      lessons: 3,
      duration: '15 min',
      difficulty: 'Beginner',
      totalCoins: 45,
      category: 'Property Assessment',
      completedLessons: completedLessons.length,
      correctAnswers: correctAnswers.length,
      status: completedLessons.length === 3 ? 'completed' : completedLessons.length > 0 ? 'in-progress' : 'not-started'
    },
    {
      id: 'mortgage-basics',
      title: 'Mortgage Fundamentals',
      description: 'Understanding different types of mortgages and loan processes',
      lessons: 4,
      duration: '20 min',
      difficulty: 'Beginner',
      totalCoins: 60,
      category: 'Financing',
      completedLessons: 0,
      correctAnswers: 0,
      status: 'coming-soon'
    },
    {
      id: 'property-valuation',
      title: 'Property Valuation Methods',
      description: 'Learn how properties are valued and what affects pricing',
      lessons: 5,
      duration: '25 min',
      difficulty: 'Intermediate',
      totalCoins: 75,
      category: 'Market Analysis',
      completedLessons: 0,
      correctAnswers: 0,
      status: 'coming-soon'
    },
    {
      id: 'legal-considerations',
      title: 'Legal Considerations in Home Buying',
      description: 'Navigate contracts, disclosures, and legal requirements',
      lessons: 6,
      duration: '30 min',
      difficulty: 'Intermediate',
      totalCoins: 90,
      category: 'Legal',
      completedLessons: 0,
      correctAnswers: 0,
      status: 'coming-soon'
    }
  ];

  const getStatusBadge = (status, completedLessons, totalLessons, correctAnswers) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span className="px-2 sm:px-3 py-1 bg-mindaro-100 text-mindaro-800 rounded-full text-xs sm:text-sm font-medium border border-mindaro-300 flex items-center space-x-1">
              <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5" />
              <span>Completed</span>
            </span>
            {correctAnswers === totalLessons && (
              <span className="px-2 py-1 bg-selective_yellow-100 text-selective_yellow-800 rounded-full text-xs border border-selective_yellow-300 flex items-center space-x-1">
                <Trophy size={10} className="sm:w-3 sm:h-3" />
                <span>Perfect Score</span>
              </span>
            )}
          </div>
        );
      case 'in-progress':
        return (
          <span className="px-2 sm:px-3 py-1 bg-risd_blue-100 text-risd_blue-800 rounded-full text-xs sm:text-sm font-medium border border-risd_blue-300 flex items-center space-x-1">
            <BookOpen size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>In Progress ({completedLessons}/{totalLessons})</span>
          </span>
        );
      case 'coming-soon':
        return (
          <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium border border-gray-300 flex items-center space-x-1">
            <Lock size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>Coming Soon</span>
          </span>
        );
      default:
        return (
          <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium border border-gray-300 flex items-center space-x-1">
            <Book size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>Not Started</span>
          </span>
        );
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-mindaro-700 bg-mindaro-50 border border-mindaro-300';
      case 'Intermediate':
        return 'text-selective_yellow-700 bg-selective_yellow-50 border border-selective_yellow-300';
      case 'Advanced':
        return 'text-persian_red-700 bg-persian_red-50 border border-persian_red-300';
      default:
        return 'text-gray-600 bg-gray-50 border border-gray-300';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-mindaro to-green-400';
      case 'in-progress':
        return 'from-risd_blue to-risd_faded';
      default:
        return 'from-gray-300 to-gray-400';
    }
  };

  const getRemainingCoins = (course) => {
    if (course.id === 'home-inspections') {
      const coinsPerQuestion = 15;
      const totalPossibleCoins = course.lessons * coinsPerQuestion;
      const coinsEarned = course.correctAnswers * coinsPerQuestion;
      return totalPossibleCoins - coinsEarned;
    }
    return course.totalCoins;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-risd_blue-100">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-neutral_dark mb-2">Available Courses</h3>
          <p className="text-sm sm:text-base text-gray-600">Build your homebuying knowledge step by step</p>
        </div>

        <div className="grid gap-4 sm:gap-6">
          {courses.map((course) => {
            const progressPercentage = course.status !== 'coming-soon' ? (course.completedLessons / course.lessons) * 100 : 0;
            const remainingCoins = getRemainingCoins(course);
            
            return (
              <div 
                key={course.id}
                className={`border-2 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-200 ${
                  course.status === 'coming-soon' 
                    ? 'border-gray-200 bg-gray-50 opacity-75' 
                    : 'border-risd_blue-200 hover:border-risd_blue-400 hover:shadow-md cursor-pointer bg-white'
                }`}
                onClick={() => course.status !== 'coming-soon' && onCourseSelect(course.id)}
              >
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div className="flex-1">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 mb-2">
                      <h4 className="text-lg sm:text-xl font-bold text-neutral_dark">{course.title}</h4>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium self-start ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-3">{course.description}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center">
                        <Book className="mr-1" size={12} className="sm:w-3.5 sm:h-3.5" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1" size={12} className="sm:w-3.5 sm:h-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Tag className="mr-1" size={12} className="sm:w-3.5 sm:h-3.5" />
                        {course.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-end sm:items-end justify-between sm:justify-start space-x-2 sm:space-x-0 sm:space-y-2">
                    {getStatusBadge(course.status, course.completedLessons, course.lessons, course.correctAnswers)}
                    <div className="flex items-center space-x-1 text-selective_yellow-600">
                      <span className="w-4 h-4 sm:w-5 sm:h-5 bg-selective_yellow rounded-full flex items-center justify-center text-xs font-bold text-neutral_dark border border-selective_yellow-400">
                        ¢
                      </span>
                      <span className="font-semibold text-sm sm:text-base">{remainingCoins}</span>
                    </div>
                  </div>
                </div>

                {course.status !== 'coming-soon' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{course.completedLessons}/{course.lessons} lessons</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${getProgressColor(course.status)} h-2 sm:h-3 rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    {course.status === 'completed' && (
                      <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 mt-1 space-y-1 sm:space-y-0">
                        <span className="flex items-center space-x-1">
                          <Star size={10} className="sm:w-3 sm:h-3" />
                          <span>Course completed!</span>
                        </span>
                        <span>{course.correctAnswers}/{course.lessons} correct answers</span>
                      </div>
                    )}
                    {course.status === 'in-progress' && progressPercentage > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(progressPercentage)}% complete
                      </div>
                    )}
                  </div>
                )}

                {course.status !== 'coming-soon' && (
                  <div className="mt-4 pt-4 border-t border-risd_blue-100">
                    <button 
                      className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        course.status === 'completed'
                          ? 'bg-mindaro-50 text-mindaro-700 hover:bg-mindaro-100 border border-mindaro-300'
                          : course.status === 'in-progress'
                          ? 'bg-risd_blue-50 text-risd_blue-700 hover:bg-risd_blue-100 border border-risd_blue-300'
                          : 'bg-risd_blue text-white hover:bg-risd_blue-700'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCourseSelect(course.id);
                      }}
                    >
                      {course.status === 'completed' ? 'Review Course' : 
                       course.status === 'in-progress' ? 'Continue Learning' : 'Start Course'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursesView;