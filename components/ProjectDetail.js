function ProjectDetail({ project, user, onBack }) {
  try {
    const [investmentAmount, setInvestmentAmount] = React.useState('');
    const [showInvestModal, setShowInvestModal] = React.useState(false);
    const [investing, setInvesting] = React.useState(false);

    const handleInvest = async () => {
      if (!user) {
        alert('Please sign in to invest');
        return;
      }

      const amount = parseInt(investmentAmount);
      if (!amount || amount <= 0) {
        alert('Please enter a valid investment amount');
        return;
      }

      try {
        setInvesting(true);
        const newFunding = project.current_funding + amount;

        // Gunakan Supabase langsung untuk update project
        const { error } = await supabase
          .from('projects')
          .update({ current_funding: newFunding })
          .eq('id', project.id);

        if (error) throw error;

        alert('Investment successful! Thank you for supporting this project.');
        setShowInvestModal(false);
        setInvestmentAmount('');
        window.location.reload(); // Atau kamu bisa pakai fetch ulang project data
      } catch (error) {
        console.error(error);
        alert('Investment failed. Please try again.');
      } finally {
        setInvesting(false);
      }
    };

    const fundingPercentage = (project.current_funding / project.funding_goal) * 100;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-name="project-detail" data-file="components/ProjectDetail.js">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <div className="icon-arrow-left mr-2"></div>
          Back to Projects
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {project.is_premium && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium px-4 py-2">
              ⭐ Premium Project
            </div>
          )}

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Description</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Student Developer</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <div className="icon-user text-lg text-gray-600"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{project.student_name}</p>
                      <p className="text-sm text-gray-600">{project.university}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Funding Progress</h3>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{Math.round(fundingPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-gray-600 text-sm">Raised</span>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(project.current_funding)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Goal</span>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(project.funding_goal)}
                      </p>
                    </div>
                  </div>

                  {user && user.user_type === 'investor' && project.status === 'Active' && (
                    <button 
                      onClick={() => setShowInvestModal(true)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Invest in this Project
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showInvestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Invest in {project.title}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (IDR)</label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowInvestModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvest}
                  disabled={investing}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {investing ? 'Processing...' : 'Invest'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('ProjectDetail component error:', error);
    return null;
  }
}
