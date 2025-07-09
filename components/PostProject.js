function PostProject({ user, onBack, onProjectPosted }) {
  try {
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      category: 'Technology',
      funding_goal: '',
      video_pitch_url: '',
      is_premium: false
    });
    const [submitting, setSubmitting] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!formData.title || !formData.description || !formData.funding_goal) {
        alert('Please fill in all required fields');
        return;
      }

      try {
        setSubmitting(true);
        
        await trickleCreateObject('project', {
          ...formData,
          funding_goal: parseInt(formData.funding_goal),
          current_funding: 0,
          student_name: user.name,
          university: user.university || 'Not specified',
          status: 'Active'
        });

        alert('Project posted successfully!');
        onProjectPosted();
        onBack();
      } catch (error) {
        alert('Failed to post project. Please try again.');
      } finally {
        setSubmitting(false);
      }
    };

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-name="post-project" data-file="components/PostProject.js">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <div className="icon-arrow-left mr-2"></div>
          Back to Projects
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Post Your Project</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your project and its impact"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Finance">Finance</option>
                  <option value="Environment">Environment</option>
                  <option value="Social Impact">Social Impact</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funding Goal (IDR) *</label>
                <input
                  type="number"
                  name="funding_goal"
                  value={formData.funding_goal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 50000000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Pitch URL</label>
              <input
                type="url"
                name="video_pitch_url"
                value={formData.video_pitch_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_premium"
                checked={formData.is_premium}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Premium Boost (+IDR 15,000 for featured placement)
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Pricing</h3>
              <p className="text-sm text-blue-700">
                Basic posting fee: IDR 5,000
                {formData.is_premium && <span className="block">Premium boost: +IDR 15,000</span>}
              </p>
              <p className="text-sm font-medium text-blue-900 mt-2">
                Total: IDR {formData.is_premium ? '20,000' : '5,000'}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Posting Project...' : 'Post Project'}
            </button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PostProject component error:', error);
    return null;
  }
}