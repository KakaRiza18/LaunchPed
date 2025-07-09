const handleSubmit = async (e) => {
  e.preventDefault();

  const { title, description, funding_goal } = formData;

  if (!title || !description || !funding_goal) {
    alert('Please fill in all required fields');
    return;
  }

  setSubmitting(true);

  try {
    const newProject = {
      title: title.trim(),
      description: description.trim(),
      funding_goal: Number(funding_goal),
      current_funding: 0,
      student_name: user?.name || 'Anonymous',
      university: user?.university || 'Not specified',
      status: 'Active',
      user_id: user?.id || null,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('projects').insert([newProject]);

    if (error) throw error;

    alert('Project posted successfully!');
    onProjectPosted();
    onBack();

  } catch (error) {
    console.error('Error posting project:', error.message);
    alert('Failed to post project. Please try again.');
  } finally {
    setSubmitting(false);
  }
};
