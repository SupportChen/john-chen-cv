'use client'

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { portfolioSchema } from './sanity/schemas/portfolio'
import { project } from './sanity.config.base'

export default defineConfig({
  ...project,
  name: 'default',
  title: 'Portfolio Admin',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [portfolioSchema],
  },
})
