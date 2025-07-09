function Hero({ onExploreClick, onInvestClick }) {
  try {
    return (
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20" data-name="hero" data-file="components/Hero.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect Student 
              <span className="text-blue-600"> Innovators</span>
              <br />
              with Smart Investors
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A digital platform where talented student developers showcase their projects 
              and connect with investors seeking the next breakthrough innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={onExploreClick}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Projects
              </button>
              <button 
                onClick={onInvestClick}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:border-gray-400 transition-colors"
              >
                Start Investing
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="icon-users text-xl text-blue-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">For Students</h3>
                <p className="text-gray-600">Showcase your projects with video pitches and get funding from investors</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="icon-trending-up text-xl text-green-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">For Investors</h3>
                <p className="text-gray-600">Discover promising student projects and invest in future innovations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="icon-zap text-xl text-purple-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple Process</h3>
                <p className="text-gray-600">Easy posting with IDR 5,000 fee and premium boost options</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}