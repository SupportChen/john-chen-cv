import { createClient } from 'next-sanity'
import { project } from '../../sanity.config.base'

export const client = createClient({
  ...project,
  useCdn: false,
})
