class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [currentView, setCurrentView] = React.useState('home');
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [showAuthModal, setShowAuthModal] = React.useState(false);

    React.useEffect(() => {
      loadProjects();
      checkAuth();
    }, []);

    const checkAuth = () => {
      const userData = getStoredUser();
      if (userData) {
        setUser(userData);
      }
    };

    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await trickleListObjects('project', 20, true);
        setProjects(response.items);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleViewProject = (project) => {
      setSelectedProject(project);
      setCurrentView('project-detail');
    };

    const handleLogin = (userData) => {
      setUser(userData);
      setShowAuthModal(false);
    };

    const handleLogout = () => {
      clearStoredUser();
      setUser(null);
      setCurrentView('home');
    };

    const renderView = () => {
      switch (currentView) {
        case 'browse-projects':
          return <BrowseProjects projects={projects} loading={loading} onViewProject={handleViewProject} />;
        case 'for-students':
          return <ForStudents user={user} onLogin={() => setShowAuthModal(true)} onPostProject={() => setCurrentView('post-project')} />;
        case 'for-investors':
          return <ForInvestors user={user} onLogin={() => setShowAuthModal(true)} onBrowse={() => setCurrentView('browse-projects')} />;
        case 'project-detail':
          return <ProjectDetail project={selectedProject} user={user} onBack={() => setCurrentView('browse-projects')} />;
        case 'post-project':
          return <PostProject user={user} onBack={() => setCurrentView('home')} onProjectPosted={loadProjects} />;
        default:
          return (
            <div>
              <Hero onExploreClick={() => setCurrentView('browse-projects')} onInvestClick={() => setCurrentView('for-investors')} />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Student Projects</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover innovative projects from talented student developers seeking funding
                  </p>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <ProjectGrid projects={projects} onViewProject={handleViewProject} />
                )}
              </main>
            </div>
          );
      }
    };

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        <Header 
          user={user} 
          onLogin={() => setShowAuthModal(true)} 
          onLogout={handleLogout}
          onPostProject={() => setCurrentView('post-project')}
          onHome={() => setCurrentView('home')}
          onBrowseProjects={() => setCurrentView('browse-projects')}
          onForStudents={() => setCurrentView('for-students')}
          onForInvestors={() => setCurrentView('for-investors')}
        />
        {renderView()}
        <Footer />
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />
        )}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);