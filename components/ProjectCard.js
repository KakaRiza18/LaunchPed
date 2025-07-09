function ProjectCard({ project, onViewProject }) {
  try {
    const fundingPercentage = (project.objectData.current_funding / project.objectData.funding_goal) * 100;
    
    const getCategoryColor = (category) => {
      const colors = {
        'Technology': 'bg-blue-100 text-blue-800',
        'Healthcare': 'bg-red-100 text-red-800',
        'Education': 'bg-green-100 text-green-800',
        'Finance': 'bg-yellow-100 text-yellow-800',
        'Environment': 'bg-emerald-100 text-emerald-800',
        'Social Impact': 'bg-purple-100 text-purple-800',
        'E-commerce': 'bg-orange-100 text-orange-800',
        'Gaming': 'bg-pink-100 text-pink-800'
      };
      return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow" data-name="project-card" data-file="components/ProjectCard.js">
        {project.objectData.is_premium && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium px-3 py-1 text-center">
            ⭐ Premium Project
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {project.objectData.title}
              </h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.objectData.category)}`}>
                {project.objectData.category}
              </span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.objectData.status === 'Active' ? 'bg-green-100 text-green-800' :
              project.objectData.status === 'Funded' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {project.objectData.status}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {project.objectData.description}
          </p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">
                {Math.round(fundingPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-600">Raised</span>
              <p className="font-medium text-gray-900">
                {formatCurrency(project.objectData.current_funding)}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Goal</span>
              <p className="font-medium text-gray-900">
                {formatCurrency(project.objectData.funding_goal)}
              </p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <div className="icon-user text-sm text-gray-600"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{project.objectData.student_name}</p>
                  <p className="text-xs text-gray-600">{project.objectData.university}</p>
                </div>
              </div>
              <button 
                onClick={() => onViewProject(project)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProjectCard component error:', error);
    return null;
  }
}