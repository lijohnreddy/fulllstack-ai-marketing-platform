import React from "react";
// Triggering Vercel deploy

export default async function ProjectsPage() {
  const projects = [
    { name: "project 1", description: "project 1 description" },
    { name: "project 2", description: "project 2 description" },
    { name: "project 3", description: "project 3 description" },
  ];

  return (
    <div>
      <h1>Projects</h1>
      {projects.map((project, idx) => (
        <div key={idx}>{project.name}</div>
      ))}
    </div>
  );
}
