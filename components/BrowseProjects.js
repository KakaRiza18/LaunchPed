<script src="supabase-init.js"></script>
function BrowseProjects({ projects, loading, onViewProject }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("newest");

  const categories = ["All", "Technology", "Healthcare", "Education", "Finance", "Environment", "Social Impact", "E-commerce", "Gaming"];

  const handleSearchChange = React.useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = React.useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSortChange = React.useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];

    return projects
      .filter(({ objectData }) => {
        const matchesSearch = objectData.title.toLowerCase().includes(searchTerm.toLowerCase()) || objectData.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === "All" || objectData.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const dataA = a.objectData;
        const dataB = b.objectData;

        switch (sortBy) {
          case "funding":
            return dataB.current_funding - dataA.current_funding;
          case "goal":
            return dataB.funding_goal - dataA.funding_goal;
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
  }, [projects, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-name="browse-projects" data-file="components/BrowseProjects.js">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Student Projects</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover innovative projects from talented student developers seeking funding</p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Search projects..." value={searchTerm} onChange={handleSearchChange} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <select value={selectedCategory} onChange={handleCategoryChange} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={handleSortChange} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
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
}
