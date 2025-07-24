# Nest Navigate - Learning Module

A gamified learning platform for first-time homebuyers built with React and Tailwind CSS. This interactive educational application teaches essential homebuying concepts through engaging lessons, quizzes, and progress tracking.

## 🚀 Live Demo

**[View Live Application](https://nest-navigate-learning.vercel.app/)**

## 📋 Project Overview

Nest Navigate is an interactive learning module focused on "Understanding Home Inspections" - a critical topic for first-time homebuyers. The application features a comprehensive learning experience with gamification elements to enhance user engagement and knowledge retention.

### Key Features

- **Interactive Learning Experience**: 3 comprehensive lessons about home inspections
- **Gamification Elements**: Coin rewards, progress tracking, and achievement system
- **Responsive Design**: Mobile-first approach with seamless tablet and desktop experiences
- **Progress Persistence**: Local storage saves user progress across sessions
- **Modern UI/UX**: Clean, accessible design with smooth animations and transitions

## 🛠 Technology Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.525.0
- **State Management**: React Hooks (useState, useEffect)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nest-navigate-learning-module.git
   cd nest-navigate-learning-module
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 Features

### Core Learning Modules
- **Lesson 1**: What is a Home Inspection?
- **Lesson 2**: Types of Inspections  
- **Lesson 3**: Red Flags to Watch For

### Interactive Elements
- Multiple choice quizzes with instant feedback
- Progress tracking and completion percentages
- Coin reward system (15 coins per correct answer)
- Achievement badges and ranking system

### User Experience
- Smooth page transitions and animations
- Mobile-responsive design
- Accessibility features with proper ARIA labels
- SEO-optimized with structured data

### Gamification
- Real-time coin counter
- Progress visualization
- Achievement ranking system (House Hunter → Property Mogul)
- Celebration animations for course completion

## 🏗 Project Structure

```
src/
├── components/
│   ├── Views/
│   │   ├── HomeView.jsx
│   │   ├── CoursesView.jsx
│   │   ├── LessonView.jsx
│   │   ├── CompletionView.jsx
│   │   ├── AssessmentsView.jsx
│   │   └── SkillGraphView.jsx
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   └── RankingSection.jsx
├── data/
│   └── lessonData.js
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

## 🎯 Design Decisions & Assumptions

### User Experience Decisions
- **Progressive Disclosure**: Information is revealed step-by-step to avoid overwhelming users, especially first-time homebuyers who may feel intimidated by real estate concepts
- **Immediate Feedback**: Quiz answers provide instant feedback with explanations to reinforce learning and build confidence
- **Progress Visualization**: Multiple progress indicators help users understand their journey and maintain motivation
- **Mobile-First Design**: Assumed most users would access the platform on mobile devices, so prioritized mobile experience

### Technical Architecture Decisions
- **Component-Based Design**: Modular React components for maintainability and reusability across the larger Nest Navigate platform
- **State Management**: Chose React hooks over external libraries like Redux for simplicity, assuming the application scope would remain focused
- **Local Storage**: Implemented progress persistence assuming users might not have accounts initially but still want their progress saved
- **Tailwind CSS**: Selected for rapid development and consistent design system that could scale across multiple learning modules

### Gamification Strategy
- **Coin System**: 15 coins per correct answer to provide tangible rewards without being overly generous
- **Ranking System**: Designed 9 progressive ranks to give long-term goals beyond the initial 3-lesson module
- **Achievement Focus**: Emphasized completion and accuracy over speed to encourage thoughtful learning

### Content Assumptions
- **Lesson Length**: Kept lessons concise (estimated 5 minutes each) assuming busy homebuyers have limited attention spans
- **Difficulty Level**: Designed for complete beginners with no prior real estate knowledge
- **Question Format**: Used multiple choice exclusively for simplicity and clear right/wrong feedback



**Time Spent**: Approximately 6-8 hours  
**Focus Areas**: Clean code architecture, responsive design, user experience, and gamification elements