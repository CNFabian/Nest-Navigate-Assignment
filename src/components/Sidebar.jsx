import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Target, TrendingUp, Menu, X } from 'lucide-react';
import LogoTitle from '../assets/Logo&Title.png';
import RankingSection from './RankingSection';

const Sidebar = ({ activeTab, setActiveTab, onLogoClick, coins = 0, completedLessons = [], correctAnswers = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'assessments', label: 'Assessments', icon: Target },
    { id: 'skill-graph', label: 'My Skill Graph', icon: TrendingUp }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogoClick = () => {
    onLogoClick();
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-risd_blue text-white p-2 rounded-lg shadow-lg hover:bg-risd_blue-700 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        ${isMobile ? 'fixed' : 'relative'} 
        ${isMobile ? 'top-0 left-0 h-full' : 'h-full'} 
        ${isMobile ? 'z-40' : 'z-auto'}
        w-52 bg-risd_blue-800 shadow-lg flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        ${!isMobile ? 'lg:translate-x-0' : ''}
      `}>
        <div className="p-4 mt-12 lg:mt-0">
          <div 
            className="cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={handleLogoClick}
          >
            <img 
              src={LogoTitle} 
              alt="Nest Navigate Learning Platform" 
              className="w-full h-auto max-w-[160px] mx-auto filter brightness-0 invert"
            />
          </div>
        </div>
        
        <div className="px-6 mb-3">
          <div className="h-px bg-white opacity-30"></div>
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white bg-opacity-20 border-r-2 border-selective_yellow shadow-md'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <IconComponent 
                  size={16} 
                  style={{ 
                    color: '#FFFFFF',
                    opacity: activeTab === item.id ? 1 : 0.6
                  }}
                />
                <span 
                  className="font-medium text-sm" 
                  style={{ color: activeTab === item.id ? '#FFFFFF' : '#B8C5E8' }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
        
        <div>
          <RankingSection 
            coins={coins}
            completedLessons={completedLessons}
            correctAnswers={correctAnswers}
          />
        </div>
      </div>

      <div className={`
        lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white shadow-lg
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-y-full' : 'translate-y-0'}
      `}>
        <div className="p-2">
          <div className="bg-risd_blue-800 rounded-lg">
            <RankingSection 
              coins={coins}
              completedLessons={completedLessons}
              correctAnswers={correctAnswers}
              isMobile={true}
              isBottomWidget={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;