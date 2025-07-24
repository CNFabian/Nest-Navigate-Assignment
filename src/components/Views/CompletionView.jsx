import React, { useEffect, useState } from 'react'
import { Trophy, Star, CheckCircle, BarChart3, RotateCcw, Trash2, Save, Home, BookOpen, AlertTriangle, ArrowLeft } from 'lucide-react'
import Header from '../Header'
import { lessonData } from '../../data/lessonData'

const CompletionView = ({ 
  goToOverview, 
  goBackToCourse,
  resetProgress, 
  currentAttemptCorrect, 
  currentAttemptCoins, 
  startModule, 
  goToDashboard,
  coins,
  completedLessons,
  correctAnswers,
  isStandalone = false,
  isOverview = false
}) => {
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (!isOverview) {
      setShowCelebration(true)
    }
  }, [isOverview])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    const scrollContainer = document.querySelector('.overflow-auto')
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
  }, [])

  const totalCorrectThisAttempt = currentAttemptCorrect?.length || 0
  const earnedCoinsThisAttempt = currentAttemptCoins || 0
  const isPerfectScore = totalCorrectThisAttempt === 3

  if (isOverview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 page-transition">
        <Header coins={coins} goToDashboard={goToDashboard} />
        <main className="container mx-auto px-4 py-4 sm:py-8 max-w-2xl">
          <OverviewContent 
            coins={coins}
            completedLessons={completedLessons}
            correctAnswers={correctAnswers}
            startModule={startModule}
            resetProgress={resetProgress}
            goToDashboard={goToDashboard}
          />
        </main>
      </div>
    )
  }

  if (isStandalone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mindaro-50 to-risd_blue-50 flex items-start sm:items-center justify-center page-transition p-2 sm:p-4">
        <CompletionContent 
          totalCorrectThisAttempt={totalCorrectThisAttempt}
          earnedCoinsThisAttempt={earnedCoinsThisAttempt}
          isPerfectScore={isPerfectScore}
          goToDashboard={goToDashboard}
          goToOverview={goToOverview}
          startModule={startModule}
          resetProgress={resetProgress}
          isStandalone={true}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <CompletionContent 
        totalCorrectThisAttempt={totalCorrectThisAttempt}
        earnedCoinsThisAttempt={earnedCoinsThisAttempt}
        isPerfectScore={isPerfectScore}
        goToDashboard={goToDashboard}
        goBackToCourse={goBackToCourse}
        startModule={startModule}
        resetProgress={resetProgress}
        isStandalone={false}
      />
    </div>
  )
}

const OverviewContent = ({ coins, completedLessons, correctAnswers, startModule, resetProgress, goToDashboard }) => {
  return (
    <div className="card animate-scaleIn">
      <div className="flex justify-between items-center mb-4 sm:mb-6 animate-slideInDown">
        <button onClick={goToDashboard} className="nav-button flex items-center group">
          <ArrowLeft size={14} className="sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform mr-1" />
          <span className="text-sm sm:text-base">Back to Dashboard</span>
        </button>
      </div>
      
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-float">
        <BookOpen size={24} className="sm:w-8 sm:h-8 text-blue-600" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 animate-slideInDown">
        Understanding Home Inspections
      </h2>
      <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6 animate-slideInDown" style={{animationDelay: '0.1s'}}>
        Learn the essentials of home inspections to make informed decisions
      </p>
      
      <div className="mb-4 sm:mb-6 animate-slideInUp" style={{animationDelay: '0.2s'}}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-700">Module Progress</span>
          <span className="text-xs sm:text-sm text-gray-500">{completedLessons.length}/3 lessons</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedLessons.length / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 stagger-animation">
        {Object.entries(lessonData).map(([key, lesson]) => {
          const lessonNum = parseInt(key)
          const isCompleted = completedLessons.includes(lessonNum)
          const isCorrect = correctAnswers.includes(lessonNum)
          
          return (
            <div key={key} className="lesson-item group">
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all ${
                isCorrect ? 'bg-mindaro text-neutral_dark animate-pulse' : 
                isCompleted ? 'bg-selective_yellow text-neutral_dark' : 'bg-gray-300'
              }`}>
                {isCorrect ? <CheckCircle size={12} className="sm:w-4 sm:h-4" /> : 
                 isCompleted ? <AlertTriangle size={12} className="sm:w-4 sm:h-4" /> : lessonNum}
              </div>
              <div className="flex-grow">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  Lesson {lessonNum}: {lesson.title}
                </h3>
                {isCorrect && (
                  <p className="text-xs sm:text-sm text-green-600 animate-slideInLeft flex items-center">
                    <CheckCircle size={10} className="sm:w-3 sm:h-3 mr-1" />
                    Completed Correctly (+15 coins)
                  </p>
                )}
                {isCompleted && !isCorrect && (
                  <p className="text-xs sm:text-sm text-yellow-600 animate-slideInLeft flex items-center">
                    <AlertTriangle size={10} className="sm:w-3 sm:h-3 mr-1" />
                    Completed but incorrect (0 coins)
                  </p>
                )}
              </div>
              <div className="text-lg sm:text-2xl group-hover:animate-wiggle">
                {isCorrect ? <Trophy size={20} className="sm:w-6 sm:h-6 text-yellow-500" /> : 
                 isCompleted ? <BookOpen size={20} className="sm:w-6 sm:h-6 text-blue-500" /> : 
                 <BookOpen size={20} className="sm:w-6 sm:h-6 text-gray-400" />}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 animate-glow border-2 border-yellow-200">
        <div className="flex items-center space-x-3">
          <Trophy size={20} className="sm:w-6 sm:h-6 text-orange-600 animate-float" />
          <div className="text-left">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800">Potential Reward</h3>
            <p className="text-xs sm:text-base text-gray-600">Get all questions correct to earn 45 coins!</p>
            <p className="text-xs text-gray-500">15 coins per correct answer</p>
          </div>
        </div>
      </div>

      <button 
        onClick={startModule} 
        className="btn-primary w-full mb-3 sm:mb-4 group"
      >
        <span className="flex items-center justify-center">
          {completedLessons.length === 0 ? 'Start Module' : 'Continue Learning'} 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </button>

      {completedLessons.length > 0 && (
        <button 
          onClick={resetProgress} 
          className="w-full px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:scale-102"
        >
          Reset Progress
        </button>
      )}
    </div>
  )
}

const CompletionContent = ({ 
  totalCorrectThisAttempt, 
  earnedCoinsThisAttempt, 
  isPerfectScore,
  goToDashboard,
  goToOverview,
  goBackToCourse,
  startModule,
  resetProgress,
  isStandalone
}) => {
  const containerClass = isStandalone 
    ? "card text-center max-w-sm mx-2 sm:mx-4 animate-scaleIn border-2 border-mindaro-200"
    : "bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm"

  const iconClass = isStandalone
    ? "w-12 h-12 sm:w-16 sm:h-16 bg-mindaro-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 animate-bounce"
    : "w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-bounce"

  const handleOverviewClick = () => {
    if (isStandalone) {
      goToOverview()
    } else {
      goBackToCourse()
    }
  }

  const getOverviewButtonText = () => {
    return isStandalone ? 'Module Overview' : 'Course Overview'
  }

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className={iconClass}>
          <Trophy size={isStandalone ? 20 : 24} className="sm:w-8 sm:h-8 text-yellow-600" />
        </div>
        <h2 className={`font-bold text-neutral_dark mb-2 ${isStandalone ? 'text-lg sm:text-2xl animate-slideInDown' : 'text-xl sm:text-2xl'}`}>
          {isStandalone ? 'Module Complete!' : 'Course Complete!'}
        </h2>
        <p className={`text-gray-600 mb-3 sm:mb-4 ${isStandalone ? 'animate-slideInDown text-xs sm:text-sm' : 'text-sm sm:text-base'}`} style={isStandalone ? {animationDelay: '0.1s'} : {}}>
          You answered {totalCorrectThisAttempt} out of 3 questions correctly this time
        </p>

        <div className={`${isStandalone ? 'faded-yellow-section p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 animate-glow animate-slideInUp' : 'bg-gradient-to-r from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 border-2 border-yellow-200'}`} style={isStandalone ? {animationDelay: '0.2s'} : {}}>
          <h3 className={`font-semibold text-neutral_dark mb-2 flex items-center justify-center ${isStandalone ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-selective_yellow rounded-full flex items-center justify-center text-neutral_dark text-xs font-bold mr-2 animate-float border border-selective_yellow-400">
              ¢
            </span>
            Coins Earned This Attempt
          </h3>
          <div className={`font-bold text-selective_yellow mb-1 sm:mb-2 ${isStandalone ? 'text-2xl sm:text-3xl animate-scaleIn' : 'text-3xl sm:text-4xl'}`} style={isStandalone ? {animationDelay: '0.3s'} : {}}>
            +{earnedCoinsThisAttempt} ¢
          </div>
          <div className={`text-gray-600 ${isStandalone ? 'text-xs animate-fadeIn' : 'text-xs sm:text-sm'}`} style={isStandalone ? {animationDelay: '0.4s'} : {}}>
            {totalCorrectThisAttempt} correct answers × 15 coins = {totalCorrectThisAttempt * 15} coins
          </div>
        </div>

        {isPerfectScore && (
          <div className={`p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 ${isStandalone ? 'success-section animate-slideInUp' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'}`} style={isStandalone ? {animationDelay: '0.3s'} : {}}>
            <div className={`flex items-center justify-center space-x-2 sm:space-x-3 ${isStandalone ? 'text-mindaro-800' : 'text-green-700'}`}>
              <Trophy size={16} className="sm:w-5 sm:h-5 text-yellow-600" />
              <div>
                <div className={`font-semibold ${isStandalone ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>Perfect Score!</div>
                <div className={`${isStandalone ? 'text-xs' : 'text-xs sm:text-sm'}`}>Outstanding work!</div>
              </div>
            </div>
          </div>
        )}

        {totalCorrectThisAttempt === 2 && (
          <div className={`p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 ${isStandalone ? 'faded-primary-section animate-slideInUp' : 'bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-200'}`} style={isStandalone ? {animationDelay: '0.3s'} : {}}>
            <div className={`flex items-center justify-center space-x-2 sm:space-x-3 ${isStandalone ? 'text-risd_blue' : 'text-blue-700'}`}>
              <Star size={16} className="sm:w-5 sm:h-5 text-blue-600" />
              <div>
                <div className={`font-semibold ${isStandalone ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>Great Job!</div>
                <div className={`${isStandalone ? 'text-xs' : 'text-xs sm:text-sm'}`}>Almost perfect!</div>
              </div>
            </div>
          </div>
        )}

        {totalCorrectThisAttempt === 1 && (
          <div className={`p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 ${isStandalone ? 'faded-yellow-section animate-slideInUp' : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200'}`} style={isStandalone ? {animationDelay: '0.3s'} : {}}>
            <div className={`flex items-center justify-center space-x-2 sm:space-x-3 ${isStandalone ? 'text-selective_yellow-700' : 'text-yellow-700'}`}>
              <CheckCircle size={16} className="sm:w-5 sm:h-5 text-green-600" />
              <div>
                <div className={`font-semibold ${isStandalone ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>Good Start!</div>
                <div className={`${isStandalone ? 'text-xs' : 'text-xs sm:text-sm'}`}>Keep learning!</div>
              </div>
            </div>
          </div>
        )}

        <div className={`space-y-2 sm:space-y-3 ${isStandalone ? 'stagger-animation' : ''}`}>
          <button 
            onClick={goToDashboard} 
            className={isStandalone ? "btn-primary w-full group" : "w-full bg-gradient-to-r from-risd_blue to-risd_blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-risd_blue-700 hover:to-risd_blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-sm sm:text-base"}
          >
            <span className="flex items-center justify-center">
              Back to Dashboard
              <Home size={14} className={`sm:w-4 sm:h-4 ml-2 ${isStandalone ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
            </span>
          </button>
          
          <button 
            onClick={handleOverviewClick} 
            className={`w-full px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-200 hover:shadow-md transform hover:scale-105 group ${
              isStandalone 
                ? 'text-risd_blue hover:text-risd_blue-700 border border-risd_blue-300 rounded-lg hover:bg-risd_blue-50' 
                : 'text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50'
            }`}
          >
            <span className="flex items-center justify-center">
              <BarChart3 size={14} className={`sm:w-4 sm:h-4 mr-2 ${isStandalone ? '' : 'group-hover:animate-wiggle'}`} />
              {getOverviewButtonText()}
            </span>
          </button>
          
          <button 
            onClick={startModule}
            className={`w-full px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-200 hover:shadow-md transform hover:scale-105 group ${
              isStandalone 
                ? 'text-risd_blue hover:text-risd_blue-700 border border-risd_blue-300 rounded-lg hover:bg-risd_blue-50' 
                : 'text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50'
            }`}
          >
            <span className="flex items-center justify-center">
              <RotateCcw size={14} className={`sm:w-4 sm:h-4 mr-2 ${isStandalone ? '' : 'group-hover:animate-wiggle'}`} />
              Try Again
            </span>
          </button>
          
          <button 
            onClick={resetProgress}
            className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:scale-105 group"
          >
            <span className="flex items-center justify-center">
              <Trash2 size={14} className={`sm:w-4 sm:h-4 mr-2 ${isStandalone ? '' : 'group-hover:animate-wiggle'}`} />
              {isStandalone ? 'Reset All Progress' : 'Reset All Progress'}
            </span>
          </button>
        </div>

        <div className={`mt-3 sm:mt-6 text-xs text-gray-500 ${isStandalone ? 'animate-fadeIn' : ''}`} style={isStandalone ? {animationDelay: '0.5s'} : {}}>
          <div className="flex items-center justify-center">
            <Save size={10} className="sm:w-3 sm:h-3 mr-1" />
            Progress automatically saved
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletionView