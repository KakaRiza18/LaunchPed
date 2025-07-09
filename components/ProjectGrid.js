<script src="supabase-init.js"></script>
function ProjectGrid({ projects, onViewProject }) {
  try {
    if (!projects || projects.length === 0) {
      return (
        <div className="text-center py-20" data-name="project-grid-empty" data-file="components/ProjectGrid.js">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="icon-folder text-2xl text-gray-400"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Be the first to post a project on our platform!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-name="project-grid" data-file="components/ProjectGrid.js">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewProject={onViewProject} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("ProjectGrid component error:", error);
    return null;
  }
}
