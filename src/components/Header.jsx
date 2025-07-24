import React from 'react'
import Logo from '../assets/Logo.png'
import LogoTitle from '../assets/Logo&Title.png'
import profilePhoto from '../assets/eric-profile.avif'

const Header = ({ coins, goToDashboard, title, subtitle }) => {
  return (
    <header className="px-3 sm:px-6 py-4 pb-2 flex justify-between items-center animate-slideInDown">
      <div className="flex items-center space-x-4 ml-12 lg:ml-0">
        <img 
          src={profilePhoto} 
          alt="User Profile" 
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-risd_blue-200 hover:border-risd_blue transition-colors cursor-pointer shadow-sm"
        />
        <div>
          <h1 className="text-2xl font-bold text-neutral_dark">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search for courses"
          className="px-4 py-2 border border-risd_blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-risd_blue focus:border-risd_blue w-64 hidden sm:block transition-all duration-200"
        />
        <div className="coin-display group">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-selective_yellow rounded-full flex items-center justify-center text-xs font-bold text-neutral_dark group-hover:animate-wiggle shadow-sm">
            ¢
          </div>
          <span className="font-semibold text-selective_yellow-700 tabular-nums text-sm sm:text-base">
            {coins}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header