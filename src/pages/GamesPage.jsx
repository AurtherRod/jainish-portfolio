import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const games = [
  {
    id: 1,
    title: 'Car Race',
    description: 'An exciting racing game where you compete against time and obstacles.',
    slug: 'car-race',
    path: '/Games/CarRace/CarRace/index.html',
    thumbnail: '/Images/GameImages/CarRace_Game.png',
    color: 'from-red-600 to-orange-600'
  },
  {
    id: 2,
    title: 'Memory Game',
    description: 'Test your memory skills by matching pairs of cards in this classic game.',
    slug: 'memory-game',
    path: '/Games/MemoryGame/MemoryGame/index.html',
    thumbnail: '/Images/GameImages/MemoryGame_Game.png',
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 3,
    title: 'Space Shooter',
    description: 'Defend the galaxy by shooting down enemy spaceships in this action-packed shooter.',
    slug: 'space-shooter',
    path: '/Games/SpaceShooter/SpaceShooter/index.html',
    thumbnail: '/Images/GameImages/SpaceShooter.png',
    color: 'from-blue-600 to-purple-600'
  }
];

const GamesPage = () => {
  return (
    <>
      <SEO 
        title="Games - Unity WebGL Games Showcase"
        description="Play my collection of Unity WebGL games including Car Race, Memory Game, and Space Shooter."
        keywords={['Unity games', 'WebGL games', 'browser games', 'game development']}
      />
      
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-6 py-20">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors">
            ← Back to Portfolio
          </Link>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              My <span className="neon-accent">Games</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Play my Unity WebGL games directly in your browser
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {games.map((game, index) => (
              <div
                key={game.id}
                className="card-hover rounded-2xl overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-56 bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}>
                  <img 
                    src={game.thumbnail} 
                    alt={game.title}
                    className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {game.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {game.description}
                  </p>
                  <Link
                    to={`/games/${game.slug}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 neon-shadow"
                  >
                    Play Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamesPage;
