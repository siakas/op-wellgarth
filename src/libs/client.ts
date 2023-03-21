import { createClient } from 'microcms-js-sdk'
import { siteConfig } from '@@/site.config'

export const client = createClient({
  serviceDomain: siteConfig.serviceId,
  apiKey: siteConfig.apiKey,
})
