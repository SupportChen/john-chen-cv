export const project = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lgflefat',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-28',
  useCdn: false,
};
