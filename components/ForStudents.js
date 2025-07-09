function ForStudents({ user, onLogin, onPostProject }) {
  try {
    const features = [
      {
        icon: 'upload',
        title: 'Post Your Project',
        description: 'Share your innovative ideas with potential investors through detailed project descriptions and video pitches.'
      },
      {
        icon: 'video',
        title: 'Video Pitch',
        description: 'Create compelling video presentations to showcase your project and connect with investors personally.'
      },
      {
        icon: 'trending-up',
        title: 'Track Progress',
        description: 'Monitor your funding progress and engage with interested investors in real-time.'
      },
      {
        icon: 'star',
        title: 'Premium Boost',
        description: 'Get featured placement for your project to increase visibility and attract more investors.'
      }
    ];

    const steps = [
      { step: 1, title: 'Create Account', description: 'Sign up as a student developer' },
      { step: 2, title: 'Post Project', description: 'Add project details and video pitch' },
      { step: 3, title: 'Get Funded', description: 'Connect with investors and receive funding' }
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-name="for-students" data-file="components/ForStudents.js">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">For Student Developers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Turn your innovative ideas into reality with funding from investors who believe in student potential
          </p>
          {user && user.user_type === 'student' ? (
            <button onClick={onPostProject} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Post Your Project
            </button>
          ) : (
            <button onClick={onLogin} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Get Started as Student
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className={`icon-${feature.icon} text-2xl text-blue-600`}></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Posting</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">IDR 5,000</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Project listing for 30 days</li>
                <li>• Basic project description</li>
                <li>• Video pitch support</li>
                <li>• Investor messaging</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Boost</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">IDR 20,000</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Everything in Basic</li>
                <li>• Featured placement</li>
                <li>• Homepage visibility</li>
                <li>• Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ForStudents component error:', error);
    return null;
  }
}