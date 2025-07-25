import React from 'react'
import Logo from '../assets/Logo.png'
import LogoTitle from '../assets/Logo&Title.png'
import profilePhoto from '../assets/eric-profile.avif'

const Header = ({ coins, goToDashboard, title, subtitle }) => {
  return (
    <header className="px-3 sm:px-6 py-3 sm:py-4 pb-2 flex justify-between items-center animate-slideInDown">
      <div className="flex items-center space-x-2 sm:space-x-4 ml-12 lg:ml-0 flex-1 min-w-0">
        <img 
          src={profilePhoto} 
          alt="User Profile" 
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-risd_blue-200 hover:border-risd_blue transition-colors cursor-pointer shadow-sm flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral_dark truncate">
            {title}
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">
            {subtitle}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        <input
          type="text"
          placeholder="Search courses"
          className="px-3 py-2 border border-risd_blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-risd_blue focus:border-risd_blue w-32 sm:w-48 lg:w-64 hidden sm:block transition-all duration-200 text-sm"
        />
        <div className="coin-display group">
          <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-selective_yellow rounded-full flex items-center justify-center text-xs font-bold text-neutral_dark group-hover:animate-wiggle shadow-sm">
            ¢
          </div>
          <span className="font-semibold text-selective_yellow-700 tabular-nums text-xs sm:text-sm lg:text-base">
            {coins}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header