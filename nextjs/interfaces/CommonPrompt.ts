export interface CommonPrompt {
  id: string;
  name: string;
  prompt: string | null;
  order: number;
  tokenCount: number;
  projectId: string; // Add this line
  createdAt: Date; // Add this line
  updatedAt: Date; // Add this line
}
