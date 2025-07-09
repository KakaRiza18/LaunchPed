function ForInvestors({ user, onLogin, onBrowse }) {
  try {
    const benefits = [
      {
        icon: 'search',
        title: 'Discover Talent',
        description: 'Find promising student developers with innovative ideas across various categories.'
      },
      {
        icon: 'shield-check',
        title: 'Verified Projects',
        description: 'All student projects are verified with university affiliations and detailed descriptions.'
      },
      {
        icon: 'chart-bar',
        title: 'Track Investments',
        description: 'Monitor your investment portfolio and project progress in real-time.'
      },
      {
        icon: 'users',
        title: 'Direct Communication',
        description: 'Connect directly with student developers to discuss projects and provide mentorship.'
      }
    ];

    const categories = [
      { name: 'Technology', count: '45+', color: 'blue' },
      { name: 'Healthcare', count: '23+', color: 'red' },
      { name: 'Education', count: '31+', color: 'green' },
      { name: 'Finance', count: '18+', color: 'yellow' },
      { name: 'Environment', count: '27+', color: 'emerald' },
      { name: 'Social Impact', count: '35+', color: 'purple' }
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-name="for-investors" data-file="components/ForInvestors.js">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">For Smart Investors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Invest in the next generation of innovators and be part of breakthrough technologies from talented student developers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onBrowse} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Browse Projects
            </button>
            {!user && (
              <button onClick={onLogin} className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:border-gray-400 transition-colors">
                Sign Up as Investor
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className={`icon-${benefit.icon} text-2xl text-green-600`}></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Investment Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className={`bg-${category.color}-50 border border-${category.color}-200 rounded-lg p-6 text-center`}>
                <h3 className={`text-lg font-semibold text-${category.color}-900 mb-2`}>{category.name}</h3>
                <p className={`text-2xl font-bold text-${category.color}-600 mb-1`}>{category.count}</p>
                <p className="text-sm text-gray-600">Active Projects</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Invest in Students?</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="icon-check-circle text-green-500 mr-3 mt-1"></div>
                Fresh perspectives and innovative solutions
              </li>
              <li className="flex items-start">
                <div className="icon-check-circle text-green-500 mr-3 mt-1"></div>
                Lower entry costs with high growth potential
              </li>
              <li className="flex items-start">
                <div className="icon-check-circle text-green-500 mr-3 mt-1"></div>
                Direct mentorship opportunities
              </li>
              <li className="flex items-start">
                <div className="icon-check-circle text-green-500 mr-3 mt-1"></div>
                Building future industry relationships
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Investment Process</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">1</div>
                <span className="text-blue-800">Browse and filter projects by category</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">2</div>
                <span className="text-blue-800">Review project details and video pitches</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">3</div>
                <span className="text-blue-800">Make investment and connect with students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ForInvestors component error:', error);
    return null;
  }
}