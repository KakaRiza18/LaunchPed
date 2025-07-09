function Header({ user, onLogin, onLogout, onPostProject, onHome, onBrowseProjects, onForStudents, onForInvestors }) {
  try {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={onHome}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="icon-graduation-cap text-white text-lg"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">StudentFund</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={onBrowseProjects} className="text-gray-600 hover:text-gray-900 transition-colors">Browse Projects</button>
              <button onClick={onForStudents} className="text-gray-600 hover:text-gray-900 transition-colors">For Students</button>
              <button onClick={onForInvestors} className="text-gray-600 hover:text-gray-900 transition-colors">For Investors</button>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <div className="icon-user text-sm text-gray-600"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  {user.user_type === 'student' && (
                    <button 
                      onClick={onPostProject}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Post Project
                    </button>
                  )}
                  <button 
                    onClick={onLogout}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={onLogin}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={onLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}
