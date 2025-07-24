import React, { useEffect, useRef } from 'react'
import { CheckCircle, X, HelpCircle, AlertTriangle } from 'lucide-react'
import Header from '../Header'
import { lessonData } from '../../data/lessonData.js'

const LessonView = ({ 
  coins, 
  currentLesson, 
  goToOverview,
  goToDashboard,
  goBackToCourse,
  quizAnswered, 
  selectedAnswer, 
  showFeedback, 
  handleQuizAnswer, 
  completeLesson, 
  setCurrentLesson,
  completedLessons,
  correctAnswers,
  isStandalone = false
}) => {
  const prevLessonRef = useRef(currentLesson)
  
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    const scrollContainer = document.querySelector('.overflow-auto')
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
  }, [])
  
  useEffect(() => {
    if (prevLessonRef.current !== currentLesson) {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      const scrollContainer = document.querySelector('.overflow-auto')
      if (scrollContainer) {
        scrollContainer.scrollTop = 0
      }
      
      prevLessonRef.current = currentLesson
    }
  }, [currentLesson])
  
  const lesson = lessonData[currentLesson]
  const isLessonAlreadyCompleted = completedLessons.includes(currentLesson)
  const hasCorrectAnswer = correctAnswers.includes(currentLesson)
  const isCurrentAnswerCorrect = selectedAnswer === lesson.quiz.correct
  
  const handleBackClick = () => {
    if (isStandalone) {
      goToOverview()
    } else {
      goBackToCourse()
    }
  }

  const getBackButtonText = () => {
    return isStandalone ? 'Back to Overview' : 'Back to Course'
  }

  const handlePreviousLesson = () => {
    if (currentLesson > 1) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  const handleQuizAnswerWithScroll = (answerIndex) => {
    handleQuizAnswer(answerIndex)
    
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      
      const scrollContainer = document.querySelector('.overflow-auto')
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' })
      }
    }, 100)
  }

  if (isStandalone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-risd_blue-50 to-mindaro-50 page-transition">
        <Header coins={coins} goToDashboard={goToDashboard} />
        <main className="container mx-auto px-4 py-4 sm:py-8 max-w-2xl">
          <LessonContent 
            lesson={lesson}
            currentLesson={currentLesson}
            handleBackClick={handleBackClick}
            getBackButtonText={getBackButtonText}
            hasCorrectAnswer={hasCorrectAnswer}
            isLessonAlreadyCompleted={isLessonAlreadyCompleted}
            quizAnswered={quizAnswered}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            handleQuizAnswer={handleQuizAnswerWithScroll}
            isCurrentAnswerCorrect={isCurrentAnswerCorrect}
            completeLesson={completeLesson}
            handlePreviousLesson={handlePreviousLesson}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <LessonContent 
        lesson={lesson}
        currentLesson={currentLesson}
        handleBackClick={handleBackClick}
        getBackButtonText={getBackButtonText}
        hasCorrectAnswer={hasCorrectAnswer}
        isLessonAlreadyCompleted={isLessonAlreadyCompleted}
        quizAnswered={quizAnswered}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        handleQuizAnswer={handleQuizAnswerWithScroll}
        isCurrentAnswerCorrect={isCurrentAnswerCorrect}
        completeLesson={completeLesson}
        handlePreviousLesson={handlePreviousLesson}
        isSidebar={true}
      />
    </div>
  )
}

const LessonContent = ({
  lesson,
  currentLesson,
  handleBackClick,
  getBackButtonText,
  hasCorrectAnswer,
  isLessonAlreadyCompleted,
  quizAnswered,
  selectedAnswer,
  showFeedback,
  handleQuizAnswer,
  isCurrentAnswerCorrect,
  completeLesson,
  handlePreviousLesson,
  isSidebar = false
}) => {
  const containerClass = isSidebar 
    ? "bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm"
    : "card border-2 border-risd_blue-100"

  const animationClass = isSidebar ? "" : "animate-slideInDown"

  return (
    <>
      <div className={containerClass}>
        <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0 ${animationClass}`}>
          <button onClick={handleBackClick} className="nav-button flex items-center group self-start">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="ml-1 text-sm sm:text-base">{getBackButtonText()}</span>
          </button>
          <div className="text-left sm:text-right">
            <span className="text-xs sm:text-sm text-gray-500">Lesson {currentLesson} of 3</span>
            {hasCorrectAnswer && (
              <div className="text-xs text-mindaro-700 mt-1 animate-slideInRight flex items-center">
                <CheckCircle size={10} className="sm:w-3 sm:h-3 mr-1" />
                Answered Correctly
              </div>
            )}
            {isLessonAlreadyCompleted && !hasCorrectAnswer && (
              <div className="text-xs text-selective_yellow-700 mt-1 animate-slideInRight flex items-center">
                <AlertTriangle size={10} className="sm:w-3 sm:h-3 mr-1" />
                Completed but incorrect
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className={`text-xl sm:text-2xl font-bold text-neutral_dark ${!isSidebar ? 'animate-slideInLeft' : ''}`}>
            {lesson.title}
          </h2>
          
          <div className="flex items-center justify-center sm:justify-end">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 transform -rotate-90">
                <circle
                  cx={isSidebar ? "20" : "24"}
                  cy={isSidebar ? "20" : "24"}
                  r={isSidebar ? "16" : "20"}
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx={isSidebar ? "20" : "24"}
                  cy={isSidebar ? "20" : "24"}
                  r={isSidebar ? "16" : "20"}
                  stroke="#3758ED"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * (isSidebar ? 16 : 20)}`}
                  strokeDashoffset={`${2 * Math.PI * (isSidebar ? 16 : 20) * (1 - currentLesson / 3)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">{currentLesson}/3</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col lg:flex-row lg:space-x-6 mb-6 sm:mb-8 space-y-4 lg:space-y-0 ${!isSidebar ? 'animate-fadeIn' : ''}`} style={!isSidebar ? {animationDelay: '0.1s'} : {}}>
          <div className="w-full lg:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
            <img 
              src={`/src/assets/lesson-images/lesson-0${currentLesson}.jpg`}
              alt={`${lesson.title} illustration`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 items-center justify-center text-center text-gray-500 hidden">
              <div>
                <div className="text-2xl mb-2">🏠</div>
                <div className="text-xs">Image not found</div>
              </div>
            </div>
          </div>
          
          <div className="prose prose-sm sm:prose-lg flex-1">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {lesson.content}
            </p>
          </div>
        </div>
      </div>

      <div className={containerClass}>
        <div className={`${isSidebar ? 'bg-blue-50' : 'faded-primary-section'} p-4 sm:p-6 rounded-lg ${!isSidebar ? 'mb-6 animate-slideInUp' : ''} border-l-4 border-risd_blue`} style={!isSidebar ? {animationDelay: '0.2s'} : {}}>
          <h3 className="text-base sm:text-lg font-semibold text-neutral_dark mb-3 sm:mb-4 flex items-center">
            <span className={`w-5 h-5 sm:w-6 sm:h-6 ${isSidebar ? 'bg-blue-500' : 'bg-risd_blue'} rounded-full flex items-center justify-center text-white text-xs sm:text-sm mr-2 sm:mr-3`}>
              <HelpCircle size={12} className="sm:w-3.5 sm:h-3.5" />
            </span>
            Knowledge Check
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{lesson.quiz.question}</p>
          
          <div className={`space-y-2 sm:space-y-3 ${!isSidebar ? 'stagger-animation' : ''}`}>
            {lesson.quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleQuizAnswer(index)}
                disabled={quizAnswered}
                className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 transform text-sm sm:text-base min-h-[50px] sm:min-h-[60px] ${
                  quizAnswered
                    ? index === lesson.quiz.correct
                      ? isSidebar 
                        ? 'bg-green-100 border-green-300 text-green-800 shadow-green-200'
                        : 'bg-mindaro-100 border-mindaro-300 text-mindaro-900 shadow-mindaro-200'
                      : selectedAnswer === index
                      ? isSidebar
                        ? 'bg-red-100 border-red-300 text-red-800 shadow-red-200'
                        : 'bg-persian_red-100 border-persian_red-300 text-persian_red-900 shadow-persian_red-200'
                      : 'bg-gray-100 border-gray-200 text-gray-600'
                    : isSidebar
                    ? 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transform hover:scale-[1.01] hover:shadow-md'
                    : 'bg-white border-gray-200 hover:border-risd_faded hover:bg-risd_blue-50 cursor-pointer hover:scale-[1.01] hover:shadow-md'
                }`}
              >
                <span className="flex items-center">
                  <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-2 sm:mr-3 flex items-center justify-center text-xs sm:text-sm transition-all flex-shrink-0 ${
                    quizAnswered && index === lesson.quiz.correct 
                      ? isSidebar
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-mindaro border-mindaro text-neutral_dark'
                      : quizAnswered && selectedAnswer === index && index !== lesson.quiz.correct
                      ? isSidebar
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-persian_red border-persian_red text-white'
                      : 'border-gray-300'
                  }`}>
                    {quizAnswered && index === lesson.quiz.correct && <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5" />}
                    {quizAnswered && selectedAnswer === index && index !== lesson.quiz.correct && <X size={12} className="sm:w-3.5 sm:h-3.5" />}
                  </span>
                  <span className="flex-1">{option}</span>
                </span>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`${isSidebar ? 'mt-4' : 'feedback-box'} p-3 sm:p-4 rounded-lg transition-all duration-500 ease-out ${
              isCurrentAnswerCorrect ? 
                isSidebar ? 'bg-green-100 border-2 border-green-300' : 'correct'
                : isSidebar ? 'bg-red-100 border-2 border-red-300' : 'incorrect'
            }`}>
              <p className={`font-bold mb-2 flex items-center text-sm sm:text-base ${
                isCurrentAnswerCorrect ? 
                  isSidebar ? 'text-green-800' : 'text-mindaro-800'
                  : isSidebar ? 'text-red-800' : 'text-persian_red-800'
              }`}>
                <span className="mr-2">
                  {isCurrentAnswerCorrect ? <CheckCircle size={14} className="sm:w-4 sm:h-4" /> : <AlertTriangle size={14} className="sm:w-4 sm:h-4" />}
                </span>
                {isCurrentAnswerCorrect ? 'Correct!' : 'Incorrect.'}
              </p>
              <p className={`text-sm sm:text-base ${isCurrentAnswerCorrect ? 
                isSidebar ? 'text-green-700' : 'text-mindaro-700'
                : isSidebar ? 'text-red-700' : 'text-persian_red-700'
              }`}>
                {lesson.quiz.explanation}
              </p>
              
              {isCurrentAnswerCorrect && !hasCorrectAnswer && (
                <div className={`mt-3 p-2 sm:p-3 ${isSidebar ? 'bg-yellow-100 border border-yellow-300' : 'faded-yellow-section'} rounded-lg ${!isSidebar ? 'animate-scaleIn' : ''}`}>
                  <p className={`text-xs sm:text-sm font-medium flex items-center ${isSidebar ? 'text-yellow-800' : 'text-selective_yellow-800'}`}>
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-selective_yellow rounded-full flex items-center justify-center text-neutral_dark text-xs font-bold mr-2 border border-selective_yellow-400 flex-shrink-0">
                      ¢
                    </span>
                    +15 coins earned for correct answer!
                  </p>
                </div>
              )}
              
              {!isCurrentAnswerCorrect && (
                <p className={`text-xs sm:text-sm mt-2 opacity-75 ${isSidebar ? 'text-red-600' : 'text-persian_red-600'}`}>
                  No coins earned for incorrect answer
                </p>
              )}
              
              {hasCorrectAnswer && (
                <p className="text-xs text-gray-600 mt-2 italic opacity-75">
                  You've already earned coins for this question
                </p>
              )}
            </div>
          )}
        </div>

        <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 ${!isSidebar ? 'animate-slideInUp' : 'mt-4 sm:mt-6'}`} style={!isSidebar ? {animationDelay: '0.3s'} : {}}>
          <button 
            onClick={handlePreviousLesson}
            disabled={currentLesson === 1}
            className="text-sm sm:text-base text-gray-600 hover:text-neutral_dark disabled:opacity-50 transition-all flex items-center group disabled:cursor-not-allowed order-2 sm:order-1"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="ml-1">Previous</span>
          </button>
          
          {quizAnswered && showFeedback && (
            <button 
              onClick={completeLesson} 
              className={`order-1 sm:order-2 w-full sm:w-auto ${isSidebar ? 'bg-gradient-to-r from-risd_blue to-risd_blue-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:from-risd_blue-700 hover:to-risd_blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-sm sm:text-base' : 'btn-primary group animate-scaleIn'}`}
            >
              <span className="flex items-center justify-center">
                {currentLesson === 3 ? 'Complete Module' : 'Next Lesson'} 
                <span className={`ml-2 ${!isSidebar ? 'group-hover:translate-x-1' : ''} transition-transform`}>→</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default LessonView