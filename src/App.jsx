import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import HomeView from './components/Views/HomeView'
import CoursesView from './components/Views/CoursesView'
import CourseDetailView from './components/Views/CourseDetailView'
import AssessmentsView from './components/Views/AssessmentsView'
import SkillGraphView from './components/Views/SkillGraphView'
import LessonView from './components/Views/LessonView'
import CompletionView from './components/Views/CompletionView'
import { lessonData } from './data/lessonData.js'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentView, setCurrentView] = useState('main')
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(1)
  const [completedLessons, setCompletedLessons] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [currentAttemptCorrect, setCurrentAttemptCorrect] = useState([])
  const [currentAttemptCoins, setCurrentAttemptCoins] = useState(0)
  const [coins, setCoins] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  const loadFromStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
    return defaultValue
  }

  useEffect(() => {
    const savedProgress = loadFromStorage('nest-navigate-progress', [])
    const savedCorrectAnswers = loadFromStorage('nest-navigate-correct-answers', [])
    const savedCoins = loadFromStorage('nest-navigate-coins', 0)
    const savedCurrentLesson = loadFromStorage('nest-navigate-current-lesson', 1)
    
    setCompletedLessons(savedProgress)
    setCorrectAnswers(savedCorrectAnswers)
    setCoins(savedCoins)
    setCurrentLesson(savedCurrentLesson)
  }, [])

  useEffect(() => {
    if (completedLessons.length > 0) {
      saveToStorage('nest-navigate-progress', completedLessons)
    }
  }, [completedLessons])

  useEffect(() => {
    if (correctAnswers.length > 0) {
      saveToStorage('nest-navigate-correct-answers', correctAnswers)
    }
  }, [correctAnswers])

  useEffect(() => {
    saveToStorage('nest-navigate-coins', coins)
  }, [coins])

  useEffect(() => {
    saveToStorage('nest-navigate-current-lesson', currentLesson)
  }, [currentLesson])

  const getHeaderContent = () => {
    if (currentView === 'lesson') {
      return {
        title: `Lesson ${currentLesson}: Home Inspections`,
        subtitle: 'Learn the essentials of home inspections to make informed decisions'
      }
    }

    if (currentView === 'completion') {
      return {
        title: 'Course Complete! 🎉',
        subtitle: 'Great job completing the Home Inspections module'
      }
    }

    if (currentView === 'course-detail') {
      return {
        title: 'Understanding Home Inspections',
        subtitle: 'Master the fundamentals of property inspection'
      }
    }

    if (currentView === 'overview') {
      return {
        title: 'Understanding Home Inspections',
        subtitle: 'Learn the essentials of home inspections to make informed decisions'
      }
    }

    if (currentView === 'standalone-lesson') {
      return {
        title: `Lesson ${currentLesson}: Home Inspections`,
        subtitle: 'Learn the essentials of home inspections to make informed decisions'
      }
    }

    if (currentView === 'standalone-completion') {
      return {
        title: 'Module Complete! 🎉',
        subtitle: 'Great job completing the Home Inspections module'
      }
    }

    switch (activeTab) {
      case 'home':
        return {
          title: 'Hi, Eric!',
          subtitle: 'Take your steps to build successful homebuying knowledge'
        }
      case 'courses':
        return {
          title: 'My Courses',
          subtitle: 'Build your homebuying knowledge step by step'
        }
      case 'assessments':
        return {
          title: 'Knowledge Assessments',
          subtitle: 'Test your understanding and validate your learning progress'
        }
      case 'skill-graph':
        return {
          title: 'My Learning Journey',
          subtitle: 'Visualize your progress and track skill development'
        }
      default:
        return {
          title: 'Hi, Eric!',
          subtitle: 'Take your steps to build successful homebuying knowledge'
        }
    }
  }

  const goToHome = () => {
    setActiveTab('home')
    setCurrentView('main')
    resetQuiz()
    setTimeout(() => window.scrollTo(0, 0), 0)
  }

  const goToOverview = () => {
    setCurrentView('overview')
    resetQuiz()
    setTimeout(() => window.scrollTo(0, 0), 0)
  }

  const startModule = () => {
    setCurrentView('lesson')
    setCurrentLesson(1)
    setCurrentAttemptCorrect([])
    setCurrentAttemptCoins(0)
    resetQuiz()
    
    setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      const scrollContainer = document.querySelector('.overflow-auto')
      if (scrollContainer) {
        scrollContainer.scrollTop = 0
      }
    }, 100)
  }

  const startStandaloneModule = () => {
    setCurrentView('standalone-lesson')
    setCurrentLesson(1)
    setCurrentAttemptCorrect([])
    setCurrentAttemptCoins(0)
    resetQuiz()
    
    setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      const scrollContainer = document.querySelector('.overflow-auto')
      if (scrollContainer) {
        scrollContainer.scrollTop = 0
      }
    }, 100)
  }

  const resetQuiz = () => {
    setQuizAnswered(false)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  const navigateToLesson = (lessonNumber) => {
    setCurrentLesson(lessonNumber);
    resetQuiz();
    setTimeout(scrollToTop, 100);
  }

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)
    setQuizAnswered(true)
  }

  const completeLesson = () => {
    const isFirstTimeCompletion = !completedLessons.includes(currentLesson)
    const isAnswerCorrect = selectedAnswer === lessonData[currentLesson].quiz.correct
    const hasAlreadyGotThisQuestionRight = correctAnswers.includes(currentLesson)
    const hasGotThisRightInCurrentAttempt = currentAttemptCorrect.includes(currentLesson)
    
    if (isFirstTimeCompletion) {
      const newCompletedLessons = [...completedLessons, currentLesson]
      setCompletedLessons(newCompletedLessons)
    }
    
    if (isAnswerCorrect && !hasGotThisRightInCurrentAttempt) {
      const newCurrentAttemptCorrect = [...currentAttemptCorrect, currentLesson]
      setCurrentAttemptCorrect(newCurrentAttemptCorrect)
      
      const coinsEarned = 15
      setCurrentAttemptCoins(prevCoins => prevCoins + coinsEarned)
    }
    
    if (isAnswerCorrect && !hasAlreadyGotThisQuestionRight) {
      const newCorrectAnswers = [...correctAnswers, currentLesson]
      setCorrectAnswers(newCorrectAnswers)
      setCoins(prevCoins => prevCoins + 15)
    }
    
    if (currentLesson < 3) {
      setCurrentLesson(currentLesson + 1)
      resetQuiz()
    } else {
      if (currentView === 'lesson') {
        setCurrentView('completion')
      } else if (currentView === 'standalone-lesson') {
        setCurrentView('standalone-completion')
      }
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, 100)
    }
  }

  const resetProgress = () => {
    setCompletedLessons([])
    setCorrectAnswers([])
    setCurrentAttemptCorrect([])
    setCurrentAttemptCoins(0)
    setCoins(0)
    setCurrentLesson(1)
    setActiveTab('home')
    setCurrentView('main')
    resetQuiz()
    
    localStorage.removeItem('nest-navigate-progress')
    localStorage.removeItem('nest-navigate-correct-answers')
    localStorage.removeItem('nest-navigate-coins')
    localStorage.removeItem('nest-navigate-current-lesson')
  }

  const renderMainContent = () => {
    if (currentView === 'overview') {
      return (
        <CompletionView 
          coins={coins}
          completedLessons={completedLessons}
          correctAnswers={correctAnswers}
          startModule={startStandaloneModule}
          resetProgress={resetProgress}
          goToDashboard={goToHome}
          isOverview={true}
        />
      )
    }

    if (currentView === 'standalone-lesson') {
      return (
        <LessonView 
          coins={coins}
          currentLesson={currentLesson}
          goToOverview={goToOverview}
          goToDashboard={goToHome}
          quizAnswered={quizAnswered}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          handleQuizAnswer={handleQuizAnswer}
          completeLesson={completeLesson}
          setCurrentLesson={setCurrentLesson}
          completedLessons={completedLessons}
          correctAnswers={correctAnswers}
          isStandalone={true}
        />
      )
    }

    if (currentView === 'standalone-completion') {
      return (
        <CompletionView 
          goToOverview={goToOverview}
          resetProgress={resetProgress}
          currentAttemptCorrect={currentAttemptCorrect}
          currentAttemptCoins={currentAttemptCoins}
          startModule={startStandaloneModule}
          goToDashboard={goToHome}
          isStandalone={true}
        />
      )
    }

    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab)
            setCurrentView('main')
          }}
          onLogoClick={goToHome}
          coins={coins}
          completedLessons={completedLessons}
          correctAnswers={correctAnswers}
        />
        
        <div className="flex-1 overflow-auto">
          <Header 
            coins={coins} 
            goToDashboard={goToHome} 
            title={getHeaderContent().title}
            subtitle={getHeaderContent().subtitle}
          />
          <main className="p-4 lg:p-6 pb-20 lg:pb-6">
            <div className="max-w-7xl mx-auto">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    if (currentView === 'lesson') {
      return (
        <LessonView 
          currentLesson={currentLesson}
          goBackToCourse={() => {
            setCurrentView('course-detail')
            setSelectedCourseId('home-inspections')
          }}
          quizAnswered={quizAnswered}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          handleQuizAnswer={handleQuizAnswer}
          completeLesson={completeLesson}
          setCurrentLesson={setCurrentLesson}
          completedLessons={completedLessons}
          correctAnswers={correctAnswers}
          isStandalone={false}
        />
      )
    }

    if (currentView === 'completion') {
      return (
        <CompletionView 
          goBackToCourse={() => {
            setCurrentView('course-detail')
            setSelectedCourseId('home-inspections')
          }}
          resetProgress={resetProgress}
          currentAttemptCorrect={currentAttemptCorrect}
          currentAttemptCoins={currentAttemptCoins}
          startModule={startModule}
          goToDashboard={goToHome}
          isStandalone={false}
        />
      )
    }

    if (currentView === 'course-detail') {
      return (
        <CourseDetailView 
          courseId={selectedCourseId}
          coins={coins}
          completedLessons={completedLessons}
          correctAnswers={correctAnswers}
          startModule={startModule}
          resetProgress={resetProgress}
          goBackToCourses={() => {
            setActiveTab('courses')
            setCurrentView('main')
          }}
        />
      )
    }

    switch (activeTab) {
     case 'home':
        return (
          <HomeView 
            coins={coins}
            completedLessons={completedLessons}
            correctAnswers={correctAnswers}
            startModule={startModule}
            goToOverview={goToOverview}
            onNavigateToCourses={() => {
              setActiveTab('courses')
              setCurrentView('main')
            }}
          />
        )
      case 'courses':
        return (
          <CoursesView 
            onCourseSelect={(courseId) => {
              setSelectedCourseId(courseId)
              setCurrentView('course-detail')
            }}
            completedLessons={completedLessons}
            correctAnswers={correctAnswers}
          />
        )
      case 'assessments':
        return (
          <AssessmentsView />
        )
      case 'skill-graph':
        return (
          <SkillGraphView />
        )
      default:
        return null
    }
  }

  return renderMainContent()
}

export default App