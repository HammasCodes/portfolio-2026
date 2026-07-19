export const PROJECTS = [
  {
    slug: 'ibda-voice',
    num: '01',
    title: 'Ibda Voice',
    desc: 'An AI-powered audio engine for generating hyper-realistic voices and custom sound effects with studio-grade precision.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'GenAI', 'Stripe'],
    link: 'https://www.ibdavoice.com/',
    video: '/Ibdavoice.mp4',
    caseStudy: {
      tagline: 'Where words get their glow-up',
      summary:
        'An AI voice synthesis and sound design platform, built as a companion product to Ibda Films within the IbdaVerse ecosystem.',
      sections: [
        {
          heading: 'Mission',
          body: 'Democratizing high-fidelity audio, video, and image creation — giving independent creators access to Hollywood-grade voice synthesis and sound design without expensive studios or voice talent for every script change.',
        },
        {
          heading: 'Value Props',
          items: [
            'Studio-grade audio synthesis for cinematic delivery and consistency',
            'Built for fast iteration — prototype dialogue, ship polished performances without production bottlenecks',
            'Designed to integrate into a full creative pipeline (film + voice + sound)',
          ],
        },
      ],
      meta: 'Part of the IbdaVerse ecosystem',
    },
  },
  {
    slug: 'ibda-films',
    num: '02',
    title: 'Ibda Films',
    desc: 'A cinematic AI generation platform that transforms text-based prompts into high-fidelity, production-ready film sequences.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'GenAI', 'Stripe'],
    link: 'https://ibdafilms.com/',
    video: '/MISSION.mp4',
    caseStudy: {
      tagline: 'AI Film Studio — Script to Screen in Minutes',
      summary:
        'An AI-powered film studio platform that lets creators generate cinematic movies directly from a script, with character consistency and 4K output.',
      sections: [
        {
          heading: 'Key Features',
          items: [
            'Auto Generation — AI-powered scene creation from script input',
            'Reference Images — maintains character consistency across scenes',
            'Smart Editor — built-in professional editing tools',
            'Character Generate — create unique AI characters',
            'Retake & Seed Lock — iterate on shots with precision, lock a seed for consistency',
            'Language & Duration controls — customizable output settings',
            'Multiple AI model access for generation',
          ],
        },
        {
          heading: 'Business Model',
          body: 'Subscription tiers — Starter ($19/mo, 900 credits, ~3 min video), Creator ($45/mo, 2,130 credits, ~7 min video, most popular), Studio ($99/mo, 4,690 credits, ~15 min video). All tiers include 4K image generation, fast generations, and commercial licensing.',
        },
        {
          heading: 'Showcase',
          body: 'Demo films include "The Golden Strike," "Respect," "Future Idol," and "Mythological Future War."',
        },
      ],
      meta: 'Part of the IbdaVerse ecosystem — IbdaVerse Pvt Ltd, launched 2026',
    },
  },
  {
    slug: 'whyismybody',
    num: '03',
    title: 'WhyIsMyBody',
    desc: 'A free symptom-explainer that answers "why is my ___" health questions in plain English — no anxiety-inducing wall of diagnoses.',
    tags: ['Astro', 'Supabase', 'Gemini API'],
    link: 'https://whyismybody.com',
    image: '/whyismybody.png',
    caseStudy: {
      tagline: 'Why is my body doing that? Calm, simple answers, no panic, no jargon.',
      summary:
        'A free symptom-explainer tool that answers "why is my ___" health questions in plain English, without the anxiety-inducing wall of possible diagnoses most health sites produce.',
      sections: [
        {
          heading: 'How It Works',
          items: [
            "Every answer follows a fixed 3-part structure: what's probably happening (2-3 plain sentences), what you can do about it right now, and the specific red flags that mean you should see a doctor",
            '"Calm-o-meter" gives an at-a-glance severity read: green (Probably Fine), amber (Keep an Eye On It), red (See a Doctor)',
            'Common symptoms are pre-written and reviewed for accuracy; anything not yet covered is generated live by AI in the same format, then cached for future visitors',
            'Covers human symptoms across adult/child/pregnant contexts, plus common pet symptoms',
          ],
        },
      ],
      techStack: ['Astro', 'Supabase', 'Gemini API'],
      meta: 'No login, no ads between the question and the answer, free to use.',
    },
  },
  {
    slug: 'instaytdownload',
    num: '04',
    title: 'InstaytDownload',
    desc: 'A dual-platform downloader for Instagram and YouTube in a single tool — no watermarks, no login, no registration.',
    tags: ['Astro'],
    link: 'https://instaytdownload.com',
    video: '/Intaytdonwload.mp4',
    caseStudy: {
      tagline: 'Free Instagram Reels & YouTube Video Downloader — No Registration',
      summary:
        'A dual-platform video downloader supporting both Instagram and YouTube in a single tool, differentiating from most downloaders that only handle one platform.',
      sections: [
        {
          heading: 'Key Features',
          items: [
            'Instagram: Reels, Stories, Posts, IGTV, Carousels, Highlights',
            'YouTube: Regular videos, Shorts, Live Replays, Playlists, up to 4K, MP3 audio extraction (128/192/320kbps)',
            'Built-in clip trimmer — drag handles to select a start/end range before downloading',
            'Quality selector shows exact file size before download',
            'No watermarks, no login required, no credential risk (only public content accessed)',
            'Privacy-first: URLs and downloads are never logged or stored',
          ],
        },
        {
          heading: 'Business Model',
          body: 'Completely free, no premium tier, no daily limits.',
        },
      ],
      techStack: ['Astro v7'],
    },
  },
  {
    slug: null,
    num: '05',
    title: 'Chillpal',
    desc: 'An empathetic AI companion designed for real-time mental health support, providing emotional guidance through deep learning.',
    tags: ['Python', 'OpenAI', 'Tkinter', 'FastAPI'],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7325567739824156672/',
    video: '/Chillpal.mp4',
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getCaseStudyProjects() {
  return PROJECTS.filter((p) => p.caseStudy)
}
