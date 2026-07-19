import { notFound } from 'next/navigation'
import { PROJECTS, getCaseStudyProjects } from '../data'
import ProjectDetail from './ProjectDetail'

export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project || !project.caseStudy) return {}
  return {
    title: `${project.title} — Case Study | HX Codes`,
    description: project.caseStudy.tagline,
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project || !project.caseStudy) notFound()

  const caseStudyProjects = getCaseStudyProjects()
  const index = caseStudyProjects.findIndex((p) => p.slug === slug)
  const prev = caseStudyProjects[(index - 1 + caseStudyProjects.length) % caseStudyProjects.length]
  const next = caseStudyProjects[(index + 1) % caseStudyProjects.length]

  return <ProjectDetail project={project} prev={prev} next={next} />
}
