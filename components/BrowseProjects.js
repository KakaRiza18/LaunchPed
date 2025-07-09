function BrowseProjects({ projects, loading, onViewProject }) {
  try {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [sortBy, setSortBy] = React.useState('newest');

    const categories = ['All', 'Technology', 'Healthcare', 'Education', 'Finance', 'Environment', 'Social Impact', 'E-commerce', 'Gaming'];

    const filteredProjects = React.useMemo(() => {
      let filtered = projects || [];
      
      if (searchTerm) {
        filtered = filtered.filter(project => 
          project.objectData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.objectData.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(project => project.objectData.category === selectedCategory);
      }
      
      return filtered.sort((a, b) => {
        switch (sortBy) {
          case 'funding':
            return b.objectData.current_funding - a.objectData.current_funding;
          case 'goal':
            return b.objectData.funding_goal - a.objectData.funding_goal;
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
    }, [projects, searchTerm, selectedCategory, sortBy]);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-name="browse-projects" data-file="components/BrowseProjects.js">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Student Projects</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover innovative projects from talented student developers seeking funding
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="funding">Most Funded</option>
              <option value="goal">Highest Goal</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ProjectGrid projects={filteredProjects} onViewProject={onViewProject} />
        )}
      </div>
    );
  } catch (error) {
    console.error('BrowseProjects component error:', error);
    return null;
  }
}