import React from 'react';
import { Search, Home, MapPin, BarChart3, Building2, DollarSign, Trophy, Crown, Castle } from 'lucide-react';

const RankingSection = ({ coins = 0, completedLessons = [], correctAnswers = [], isMobile = false, isBottomWidget = false }) => {
  const rankingSystem = [
    { 
      name: 'House Hunter',
      icon: Search,
      minCoins: 0,
      maxCoins: 29,
      description: 'Just getting started',
      color: 'bg-gray-100 text-gray-700'
    },
    { 
      name: 'First-Time Buyer',
      icon: Home,
      minCoins: 30,
      maxCoins: 74,
      description: 'Learning the basics',
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      name: 'Neighborhood Scout',
      icon: MapPin,
      minCoins: 75,
      maxCoins: 149,
      description: 'Exploring options',
      color: 'bg-green-100 text-green-700'
    },
    { 
      name: 'Market Analyst',
      icon: BarChart3,
      minCoins: 150,
      maxCoins: 299,
      description: 'Understanding markets',
      color: 'bg-purple-100 text-purple-700'
    },
    { 
      name: 'Property Expert',
      icon: Building2,
      minCoins: 300,
      maxCoins: 499,
      description: 'Skilled evaluator',
      color: 'bg-orange-100 text-orange-700'
    },
    { 
      name: 'Investment Savvy',
      icon: DollarSign,
      minCoins: 500,
      maxCoins: 999,
      description: 'Smart investor',
      color: 'bg-yellow-100 text-yellow-700'
    },
    { 
      name: 'Real Estate Pro',
      icon: Trophy,
      minCoins: 1000,
      maxCoins: 1999,
      description: 'Professional level',
      color: 'bg-red-100 text-red-700'
    },
    { 
      name: 'Market Master',
      icon: Crown,
      minCoins: 2000,
      maxCoins: 4999,
      description: 'Market mastery',
      color: 'bg-indigo-100 text-indigo-700'
    },
    { 
      name: 'Property Mogul',
      icon: Castle,
      minCoins: 5000,
      maxCoins: 9999,
      description: 'Elite status',
      color: 'bg-pink-100 text-pink-700'
    }
  ];

  const getCurrentRank = () => {
    return rankingSystem.find(rank => 
      coins >= rank.minCoins && coins <= rank.maxCoins
    ) || rankingSystem[0];
  };

  const getNextRank = () => {
    const currentRankIndex = rankingSystem.findIndex(rank => 
      coins >= rank.minCoins && coins <= rank.maxCoins
    );
    return currentRankIndex < rankingSystem.length - 1 
      ? rankingSystem[currentRankIndex + 1] 
      : null;
  };

  const getProgressToNextRank = () => {
    const currentRank = getCurrentRank();
    const nextRank = getNextRank();
    
    if (!nextRank) return 100;
    
    const coinsInCurrentRange = coins - currentRank.minCoins;
    const totalCoinsNeeded = nextRank.minCoins - currentRank.minCoins;
    
    return Math.min((coinsInCurrentRange / totalCoinsNeeded) * 100, 100);
  };

  const currentRank = getCurrentRank();
  const nextRank = getNextRank();
  const progressToNext = getProgressToNextRank();
  
  const CurrentRankIcon = currentRank.icon;

  const containerStyle = {
    backgroundColor: '#5E76D4',
    color: '#FFFFFF'
  };

  const textWhite = {
    color: '#FFFFFF'
  };

  const textOffWhite = {
    color: '#FAFAFA'
  };

  const textGhost = {
    color: '#F8F8FF'
  };

  if (isBottomWidget) {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg" style={containerStyle}>
        <div className="flex items-center space-x-3">
          <CurrentRankIcon size={20} style={{ color: '#FFFFFF' }} />
          <div>
            <p className="font-semibold text-sm" style={textOffWhite}>{currentRank.name}</p>
            <p className="text-xs" style={textGhost}>{coins} coins</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {nextRank && (
            <div className="text-right">
              <p className="text-xs font-medium" style={textWhite}>
                {nextRank.minCoins - coins} to next
              </p>
              <div className="w-16 bg-white bg-opacity-25 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
          )}
          {!nextRank && (
            <div className="text-right">
              <p className="text-xs font-bold" style={textWhite}>🎉 Max rank!</p>
            </div>
          )}
          
          <button 
            style={{
              ...textWhite,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            className="py-1.5 px-3 rounded-md text-xs font-medium transition-all duration-200 hover:bg-opacity-30"
          >
            View
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-3 ${isMobile ? 'p-2' : ''}`}>
      <div style={containerStyle} className={`${isMobile ? 'p-2 rounded-lg' : 'p-3 rounded-lg'}`}>
        <div className={`${isMobile ? 'mb-2' : 'mb-3'}`}>
          <div className={`flex items-center space-x-2 ${isMobile ? 'mb-1' : 'mb-2'}`}>
            <CurrentRankIcon size={isMobile ? 14 : 16} style={{ color: '#FFFFFF' }} />
            <div>
              <p className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs'}`} style={textOffWhite}>{currentRank.name}</p>
              <p className={`${isMobile ? 'text-xs' : 'text-xs'}`} style={textGhost}>{currentRank.description}</p>
            </div>
          </div>
          
          <div className={`${isMobile ? 'mb-1' : 'mb-2'}`}>
            <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-xs'} font-medium mb-1`} style={textWhite}>
              <span>{coins} coins</span>
              {nextRank && <span>Next: {nextRank.minCoins}</span>}
            </div>
            <div className="w-full bg-white bg-opacity-25 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            {nextRank && (
              <div className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium mt-1 text-center`} style={textWhite}>
                {nextRank.minCoins - coins} to {nextRank.name}
              </div>
            )}
            {!nextRank && (
              <div className={`${isMobile ? 'text-xs' : 'text-xs'} mt-1 text-center font-bold`} style={textWhite}>
                🎉 Max rank!
              </div>
            )}
          </div>
        </div>
        
        <button 
          style={{
            ...textWhite,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
          className={`w-full ${isMobile ? 'py-1 px-2' : 'py-2 px-3'} rounded-md ${isMobile ? 'text-xs' : 'text-xs'} font-medium transition-all duration-200 hover:bg-opacity-30`}
        >
          View All Ranks
        </button>
      </div>
    </div>
  );
};

export default RankingSection;