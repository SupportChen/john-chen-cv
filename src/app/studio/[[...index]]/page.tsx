'use client'

/**
 * This route is responsible for the Sanity Studio configuration.
 * All interactions with the studio are handled by the next-sanity package.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
