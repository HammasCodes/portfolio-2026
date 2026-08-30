/*
  Live figures for the proof-of-work section.

  Both endpoints are public and unauthenticated. Every fetch is wrapped so a
  slow or dead upstream degrades to the last known-good numbers rather than
  failing the build. In Next 16 fetch is uncached by default, so the revalidate
  window is set explicitly.
*/

const REVALIDATE = 21600 // 6 hours

const LEETCODE_USER = 'Mc2hgrslzO'
const GITHUB_USER = 'HammasCodes'

/* Last verified 2026-08-30. Used only when an upstream call fails. */
const FALLBACK = {
  leetcode: {
    solved: 339,
    total: 4037,
    acceptance: 87.8,
    accepted: 460,
    submissions: 524,
    byDifficulty: [
      { label: 'Easy', solved: 125, total: 961 },
      { label: 'Medium', solved: 198, total: 2107 },
      { label: 'Hard', solved: 16, total: 969 },
    ],
    live: false,
  },
  github: {
    repos: 35,
    contributions: 130,
    activeDays: 36,
    languages: [
      ['TypeScript', 14], ['JavaScript', 8], ['HTML', 4],
      ['Astro', 2], ['Python', 2],
    ],
    weeks: [],
    live: false,
  },
}

async function getJSON(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { 'User-Agent': 'hx-codes-portfolio', ...(options.headers || {}) },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: REVALIDATE },
  })
  if (!res.ok) throw new Error(`${url} responded ${res.status}`)
  return res.json()
}

async function fetchLeetCode() {
  const query = `query u($u:String!){
    matchedUser(username:$u){
      submitStatsGlobal{ acSubmissionNum{ difficulty count submissions } }
      submitStats{ totalSubmissionNum{ difficulty count submissions } }
    }
    allQuestionsCount{ difficulty count }
  }`

  const json = await getJSON('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query, variables: { u: LEETCODE_USER } }),
  })

  const user = json?.data?.matchedUser
  if (!user) throw new Error('LeetCode returned no user')

  const ac = user.submitStatsGlobal.acSubmissionNum
  const all = user.submitStats.totalSubmissionNum
  const totals = json.data.allQuestionsCount

  const pick = (arr, d) => arr.find((x) => x.difficulty === d)
  const totalFor = (d) => pick(totals, d)?.count ?? 0

  const accepted = pick(ac, 'All').submissions
  const submissions = pick(all, 'All').submissions

  return {
    solved: pick(ac, 'All').count,
    total: totalFor('All'),
    // LeetCode's headline acceptance figure is accepted submissions over all
    // submissions, not solved problems over attempts. Kept at two decimals so
    // the site agrees with the number shown on the profile.
    acceptance: Math.round((accepted / submissions) * 10000) / 100,
    accepted,
    submissions,
    byDifficulty: ['Easy', 'Medium', 'Hard'].map((d) => ({
      label: d,
      solved: pick(ac, d).count,
      total: totalFor(d),
    })),
    live: true,
  }
}

async function fetchGitHub() {
  const [user, repos, contrib] = await Promise.all([
    getJSON(`https://api.github.com/users/${GITHUB_USER}`),
    getJSON(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`),
    getJSON(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`),
  ])

  const counts = {}
  for (const r of repos) {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1
  }
  const languages = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const days = contrib.contributions || []
  // Chunk into calendar weeks starting Sunday, the shape GitHub renders.
  const weeks = []
  let week = []
  for (const d of days) {
    if (new Date(`${d.date}T00:00:00Z`).getUTCDay() === 0 && week.length) {
      weeks.push(week)
      week = []
    }
    week.push(d.level)
  }
  if (week.length) weeks.push(week)

  return {
    repos: user.public_repos,
    contributions: contrib.total?.lastYear ?? 0,
    activeDays: days.filter((d) => d.count > 0).length,
    languages,
    weeks: weeks.slice(-53),
    live: true,
  }
}

export async function getStats() {
  const [leetcode, github] = await Promise.all([
    fetchLeetCode().catch((e) => {
      console.warn('LeetCode stats unavailable, using fallback:', e.message)
      return FALLBACK.leetcode
    }),
    fetchGitHub().catch((e) => {
      console.warn('GitHub stats unavailable, using fallback:', e.message)
      return FALLBACK.github
    }),
  ])
  return { leetcode, github }
}
