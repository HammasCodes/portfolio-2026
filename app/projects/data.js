export const PROJECTS = [
  {
    slug: 'ibda-voice',
    num: '01',
    title: 'Ibda Voice',
    desc: 'An AI audio engine that generates hyper realistic voices and custom sound effects at studio quality.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'GenAI', 'Stripe'],
    link: 'https://www.ibdavoice.com/',
    video: '/Ibdavoice.mp4',
    caseStudy: {
      tagline: 'Studio grade voice, without the studio.',
      summary:
        'An AI voice synthesis and sound design platform, built as the audio half of the IbdaVerse toolset and designed to sit directly alongside Ibda Films.',
      facts: [
        { k: 'Scope', v: 'Product design, frontend, billing' },
        { k: 'Type', v: 'Subscription SaaS' },
        { k: 'Stack', v: 'Next.js, PostgreSQL, Tailwind' },
        { k: 'Status', v: 'Live' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: 'Independent creators rewrite dialogue constantly, and every rewrite used to mean booking voice talent again. The cost of a single line change was high enough that most small teams stopped iterating once the audio was recorded.',
        },
        {
          heading: 'What it does',
          items: [
            'Synthesises spoken performances at a fidelity meant for cinematic delivery rather than robotic narration',
            'Generates custom sound effects alongside dialogue, so a scene can be built in one place',
            'Holds a voice consistent across a project instead of drifting between takes',
            'Feeds into the wider Ibda pipeline, keeping film, voice, and sound under one roof',
          ],
        },
        {
          heading: 'Why it matters',
          body: 'The goal was to make high fidelity audio, video, and image creation reachable for people without a production budget. A creator can prototype dialogue in the morning and ship a polished performance the same day.',
        },
      ],
      quote: {
        text: 'The fastest way to make a script better is to hear it out loud twenty times. That should cost nothing.',
      },
      meta: 'Part of the IbdaVerse product family.',
    },
  },
  {
    slug: 'ibda-films',
    num: '02',
    title: 'Ibda Films',
    desc: 'A cinematic AI platform that turns a written script into production ready film sequences.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'GenAI', 'Stripe'],
    link: 'https://ibdafilms.com/',
    video: '/MISSION.mp4',
    caseStudy: {
      tagline: 'Script to screen in minutes.',
      summary:
        'An AI film studio that generates cinematic sequences directly from a script, holds characters consistent between shots, and exports at 4K.',
      facts: [
        { k: 'Scope', v: 'Product design, frontend, billing' },
        { k: 'Type', v: 'Subscription SaaS' },
        { k: 'Stack', v: 'Next.js, PostgreSQL, Tailwind' },
        { k: 'Launched', v: '2026' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: 'Generative video is easy to demo and hard to direct. A model will happily produce a beautiful shot, then produce a completely different face in the next one, which makes it useless for anything longer than a clip.',
        },
        {
          heading: 'What it does',
          items: [
            'Auto generation builds scenes straight from script input',
            'Reference images keep a character recognisable across every shot',
            'Character generate creates new faces to cast from',
            'Retake and seed lock let a director iterate on one shot without losing the rest',
            'A built in editor handles assembly instead of pushing users into another tool',
            'Language and duration controls shape the output before a credit is spent',
            'Several AI models sit behind the same interface',
          ],
        },
        {
          heading: 'Business model',
          body: 'Three subscription tiers. Starter is $19 a month for 900 credits, roughly three minutes of video. Creator is $45 a month for 2,130 credits, roughly seven minutes, and it is the tier most people pick. Studio is $99 a month for 4,690 credits, roughly fifteen minutes. Every tier includes 4K image generation, fast generations, and a commercial licence.',
        },
        {
          heading: 'Showcase',
          body: 'Demo films on the site include The Golden Strike, Respect, Future Idol, and Mythological Future War.',
        },
      ],
      quote: {
        text: 'Consistency is the whole product. Anyone can generate one good shot.',
      },
      meta: 'Built for IbdaVerse Pvt Ltd. Launched 2026.',
    },
  },
  {
    slug: 'whyismybody',
    num: '03',
    title: 'WhyIsMyBody',
    desc: 'A free symptom explainer that answers "why is my ___" health questions in plain English, without the wall of frightening diagnoses.',
    tags: ['Astro', 'Supabase', 'Gemini API'],
    link: 'https://whyismybody.com',
    image: '/whyismybody.png',
    caseStudy: {
      tagline: 'Calm answers about your body. No jargon, no panic.',
      summary:
        'A free symptom explainer that answers "why is my ___" questions in plain English, without the anxiety inducing list of possible diagnoses most health sites open with.',
      facts: [
        { k: 'Scope', v: 'Concept, design, build' },
        { k: 'Type', v: 'Free consumer tool' },
        { k: 'Stack', v: 'Astro, Supabase, Gemini API' },
        { k: 'Access', v: 'No login, no ads' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: 'Search a symptom and the rarest, most frightening explanation usually ranks near the top. People leave more anxious than they arrived, and the one thing they actually needed, whether to see a doctor today, is buried somewhere below the fold.',
        },
        {
          heading: 'The answer format',
          body: 'Every answer follows the same three part shape, which is the part that took longest to get right. First, what is probably happening, in two or three plain sentences. Second, what you can do about it right now. Third, the specific red flags that mean you should see a doctor.',
        },
        {
          heading: 'The calm-o-meter',
          body: 'A single severity read sits at the top of every answer, so the page is useful before you have read a word of it. Green means probably fine, amber means keep an eye on it, red means see a doctor.',
        },
        {
          heading: 'Content pipeline',
          items: [
            'Common symptoms are pre written and reviewed for accuracy rather than generated on request',
            'Anything not yet covered is generated live in the same three part format, then cached so the next visitor gets it instantly',
            'Coverage spans adult, child, and pregnancy contexts',
            'Common pet symptoms are covered too, which turned out to be a large share of real traffic',
          ],
        },
      ],
      quote: {
        text: 'Most people are not looking for a diagnosis. They are looking for permission to stop worrying.',
      },
      meta: 'Free to use. No login, and no ads between the question and the answer.',
    },
  },
  {
    slug: 'instaytdownload',
    num: '04',
    title: 'InstaytDownload',
    desc: 'One downloader for both Instagram and YouTube. No watermarks, no login, no registration.',
    tags: ['Astro', 'Media Pipeline'],
    link: 'https://instaytdownload.com',
    video: '/Intaytdonwload.mp4',
    caseStudy: {
      tagline: 'Two platforms, one tool, zero registration.',
      summary:
        'A video downloader that handles Instagram and YouTube in a single interface, where almost every competitor covers only one of the two.',
      facts: [
        { k: 'Scope', v: 'Concept, design, build' },
        { k: 'Type', v: 'Free utility' },
        { k: 'Stack', v: 'Astro v7' },
        { k: 'Pricing', v: 'Free, no limits' },
      ],
      sections: [
        {
          heading: 'The gap',
          body: 'Downloaders are a crowded category and almost all of them pick one platform. Anyone working across both ends up bookmarking two sites, each with its own ad wall and its own quality quirks.',
        },
        {
          heading: 'What it handles',
          items: [
            'Instagram reels, stories, posts, IGTV, carousels, and highlights',
            'YouTube videos, shorts, live replays, and playlists up to 4K',
            'MP3 audio extraction at 128, 192, or 320 kbps',
            'A built in trimmer with drag handles, so a clip gets cut before it downloads instead of after',
            'A quality selector that shows the exact file size before the download starts',
          ],
        },
        {
          heading: 'Privacy stance',
          body: 'No login is ever requested, which means there are no credentials to leak, and only public content is reachable. URLs and downloads are never logged or stored.',
        },
        {
          heading: 'Business model',
          body: 'Completely free. There is no premium tier and no daily cap.',
        },
      ],
      quote: {
        text: 'The trimmer was the feature nobody asked for and everybody used.',
      },
    },
  },
  {
    slug: null,
    num: '05',
    title: 'Chillpal',
    desc: 'An empathetic AI companion for real time mental health support, built around conversation instead of questionnaires.',
    tags: ['Python', 'OpenAI', 'Tkinter', 'FastAPI'],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7325567739824156672/',
    video: '/Chillpal.mp4',
  },
]

/* Marketing sites, landing pages, and interface work. */
export const SHOWCASE = [
  {
    name: 'Fame Bros',
    kind: 'Social media studio',
    url: 'https://famebros.vercel.app/',
    domain: 'famebros.vercel.app',
    image: '/showcase/famebros.webp',
    blurb:
      'A Mumbai content studio that wanted to look loud without looking cheap. Cream paper ground, a black slab for the hero, and a gradient display face doing the shouting.',
    tags: ['Landing page', 'Brand', 'Motion'],
  },
  {
    name: 'Blulands',
    kind: 'Property portfolio dashboard',
    url: 'https://blulands-project-mb65rute3-hammascodes-projects.vercel.app/',
    domain: 'blulands.vercel.app',
    image: '/showcase/blulands.webp',
    blurb:
      'Nine developments on one screen. Capital, delivery, inventory, and sales roll up into a single overview, with a serif headline holding the numbers together.',
    tags: ['Dashboard', 'Data UI', 'Design system'],
  },
  {
    name: 'Lakeside Roofing Co.',
    kind: 'Contractor site',
    url: 'https://lakeside-roofing-aicggxduf-hammascodes-projects.vercel.app/',
    domain: 'lakeside-roofing.vercel.app',
    image: '/showcase/lakeside.webp',
    blurb:
      'Drone footage of a real job site runs full bleed behind the fold, because for a roofer the proof is the roof. Everything above it points at one button.',
    tags: ['Local business', 'Video hero', 'Conversion'],
  },
  {
    name: 'Lumina Dental',
    kind: 'Clinic template',
    url: 'https://dental-clinic-template-woad.vercel.app/',
    domain: 'dental-clinic-template.vercel.app',
    image: '/showcase/dental.webp',
    blurb:
      'Dental sites default to stock photos of strangers smiling. This one goes dark and quiet instead, with a single lit form floating in the hero and a vertical index running down the side.',
    tags: ['Healthcare', '3D', 'Template'],
  },
  {
    name: 'Atelier Nord',
    kind: 'Interior design template',
    url: 'https://interior-designer-template-tau.vercel.app/',
    domain: 'interior-designer-template.vercel.app',
    image: '/showcase/interior.webp',
    blurb:
      'A New York studio page where the photography carries the weight and the type gets out of the way. One italic serif word per headline is the only ornament.',
    tags: ['Studio', 'Editorial', 'Template'],
  },
  {
    name: 'Noketa',
    kind: 'Developer API landing',
    url: 'https://noketa-landing.vercel.app/',
    domain: 'noketa-landing.vercel.app',
    image: '/showcase/noketa.webp',
    blurb:
      'An email API pitched at engineers, so the hero is a real curl request and the response it returns. Uptime and latency sit where a marketing site would put testimonials.',
    tags: ['SaaS', 'Developer tool', 'Landing page'],
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getCaseStudyProjects() {
  return PROJECTS.filter((p) => p.caseStudy)
}
