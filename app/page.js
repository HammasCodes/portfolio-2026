import HomeClient from './HomeClient'
import { getStats } from './lib/stats'

/* Re-fetch the LeetCode and GitHub figures every six hours. */
export const revalidate = 21600

export default async function Page() {
  const stats = await getStats()
  return <HomeClient stats={stats} />
}
