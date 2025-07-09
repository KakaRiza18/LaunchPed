function AuthModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    user_type: "student",
    university: "",
    bio: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async () => {
    if (isLogin) {
      const { data: user, error } = await supabase.from("users").select("*").eq("email", formData.email).single();

      if (error || !user) {
        alert("User not found. Please sign up first.");
        return null;
      }

      return user;
    } else {
      const { data, error } = await supabase.from("users").insert([formData]).select().single();

      if (error) throw error;
      return data;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || (!isLogin && !formData.name)) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const user = await handleAuth();
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
      }
    } catch (error) {
      alert(isLogin ? "Login failed. Please try again." : "Sign up failed. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{isLogin ? "Sign In" : "Sign Up"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <div className="icon-x text-xl"></div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && <InputField label="Full Name *" name="name" value={formData.name} onChange={handleChange} required />}

          <InputField label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} required />

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
                <select name="user_type" value={formData.user_type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="student">Student Developer</option>
                  <option value="investor">Investor</option>
                </select>
              </div>

              {formData.user_type === "student" && <InputField label="University" name="university" value={formData.university} onChange={handleChange} placeholder="Your university name" />}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Tell us about yourself..." />
              </div>
            </>
          )}

          <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            {submitting ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:text-blue-700 text-sm">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable InputField component (opsional)
function InputField({ label, name, type = "text", value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
    </div>
  );
}
