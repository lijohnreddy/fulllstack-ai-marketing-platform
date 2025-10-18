import React from "react";

export default async function TemplatesPage() {
  const Templates = [
    { name: "template 1", description: "template 1 description" },
    { name: "template 2", description: "template 2 description" },
    { name: "template 3", description: "template 3 description" },
  ];

  return (
    <div>
      <h1>Templates</h1>
      {Templates.map((Template, idx) => (
        <div key={idx}>{Template.name}</div>
      ))}
    </div>
  );
}
