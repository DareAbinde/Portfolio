import { motion } from "motion/react";
import type { ReactNode } from "react";
import { CaseHeader, CaseMobileHeader } from "./CaseStudyCalmotion";
import heroHandPhone from "../assets/case-stories/safemap/hero-hand-phone.png";
import impactMapLaptop from "../assets/case-stories/safemap/impact-map-laptop.png";
import screenHome from "../assets/case-stories/safemap/screen-01-home.png";
import screenCategory from "../assets/case-stories/safemap/screen-02-category.png";
import screenLocation from "../assets/case-stories/safemap/screen-03-location.png";
import screenSubmitted from "../assets/case-stories/safemap/screen-04-submitted.png";
import screenImpactMap from "../assets/case-stories/safemap/screen-05-impact-map.png";
import climatePreview from "../imports/image.png";

const metaItems = [
  ["Type", "Design Activism &\nUX Research Project"],
  ["Role", "Project Manager &\nLead Designer"],
  ["Team", "4 Designers &\nResearchers"],
  ["Tools", "Figma, FigJam,\nClickUp"],
  ["Context", "Ethics in Design,\nUppsala University"],
  ["Client", "Uppsala\nKvinnojour"],
];

const framework = [
  { number: "01", title: "Experience", body: "Collected through anonymous, low-friction reporting." },
  { number: "02", title: "Evidence", body: "Generated through aggregated spatial pattern mapping." },
  { number: "03", title: "Activism", body: "Enabled by giving the shelter concrete data for advocacy." },
];

const ethicalQuestions = [
  "How do we invite participation without amplifying fear?",
  "How do we collect data without burdening or exposing contributors?",
  "Who might misuse this data, and how do we design against that?",
];

const designPrinciples = [
  {
    title: "Anonymous reporting",
    body: "No personal data stored. Locations are aggregated into zones and timestamps generalised. Privacy was a prerequisite for participation.",
  },
  {
    title: "Incident categorisation",
    body: "Verbal, sexual, physical, online harassment, and more can be reported through a minimal flow designed for moments of stress or urgency.",
  },
  {
    title: "Impact map",
    body: "Aggregated reports become a heat map across Uppsala, making patterns visible to the public, the shelter, and institutional stakeholders.",
  },
  {
    title: "Clear purpose framing",
    body: "Every screen reinforces that SafeMap is a structural visualisation tool, not a personal safety guide, because framing shapes how data gets used.",
  },
];

const screens = [screenHome, screenCategory, screenLocation, screenSubmitted, screenImpactMap];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.58, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ label, children, tone = "dark" }: { label: string; children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <div className={`safemap-heading safemap-heading--${tone}`}>
      <p>{label}</p>
      <h2>{children}</h2>
    </div>
  );
}

export default function CaseStudySafeMap() {
  return (
    <main className="safemap-case-page">
      <CaseHeader />
      <CaseMobileHeader />

      <section className="safemap-hero">
        <div className="safemap-container safemap-hero__inner">
          <div className="safemap-hero__copy">
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>SafeMap</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, ease: "easeOut", delay: 0.08 }}>
              Making Invisible<br />Violence Visible.
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, ease: "easeOut", delay: 0.18 }}>
              <p className="safemap-hero__kicker">Designing collective evidence for public advocacy.</p>
              <span>SafeMap transforms anonymous lived experience into spatial knowledge without exposing the people who contribute it.</span>
            </motion.div>
          </div>
          <motion.img
            className="safemap-hero__device"
            src={heroHandPhone}
            alt="Hand holding the SafeMap reporting app"
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      </section>

      <section className="safemap-meta" aria-label="Project details">
        <div className="safemap-container safemap-meta__grid">
          {metaItems.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="safemap-section safemap-brief">
        <div className="safemap-container safemap-two-column">
          <Reveal><SectionHeading label="The Brief" tone="light">An open brief demanded a more fundamental question.</SectionHeading></Reveal>
          <Reveal className="safemap-body-copy" delay={0.08}>
            <p>Uppsala Kvinnojour came to us with an open brief: help us advance our mission. They shared what they do, who they serve, and the values that drive their work. The rest was ours to define. That openness required us to ask a more fundamental question before designing anything: what does this organisation actually need that design can provide?</p>
          </Reveal>
        </div>
      </section>

      <section className="safemap-section safemap-problem">
        <div className="safemap-container safemap-two-column">
          <Reveal><SectionHeading label="The Problem">The problem was not visibility. It was evidence.</SectionHeading></Reveal>
          <Reveal className="safemap-body-copy" delay={0.08}>
            <p>Public harassment against women is consistently framed as a series of isolated incidents, unfortunate, but individual. This framing is not accidental. It is a structural feature of how gendered violence is politically managed. When experiences remain anecdotal, they are easy to dismiss. When they become patterned, spatial data, they become much harder to ignore.</p>
          </Reveal>
        </div>
      </section>

      <section className="safemap-section safemap-insight">
        <div className="safemap-container">
          <Reveal><SectionHeading label="The Insight" tone="light">Individual stories become politically powerful when they reveal a pattern.</SectionHeading></Reveal>
          <Reveal className="safemap-insight__intro" delay={0.08}>
            <p>Individual experiences of harassment are politically weak. Collective, mapped evidence is not. SafeMap was designed around a single idea: transform lived experience into public knowledge. Not by telling a better story, but by turning stories into data, and data into a tool for advocacy.</p>
          </Reveal>
          <img className="safemap-insight__laptop" src={impactMapLaptop} alt="SafeMap impact map displayed on a laptop" />
          <div className="safemap-framework">
            {framework.map((item, index) => (
              <Reveal delay={index * 0.08} key={item.number}>
                <article>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="safemap-section safemap-research">
        <div className="safemap-container safemap-two-column">
          <Reveal><SectionHeading label="Research">Research established the ethical boundaries before it shaped the interface.</SectionHeading></Reveal>
          <Reveal className="safemap-body-copy" delay={0.08}>
            <p>The research foundation was built on desk research and secondary sources. This informed both the problem framing and, critically, the ethical parameters of the design. The counter-mapping approach emerged from this research.</p>
          </Reveal>
          <img className="safemap-research__phone" src={screenCategory} alt="SafeMap incident category screen" />
        </div>
      </section>

      <section className="safemap-section safemap-ethics">
        <div className="safemap-container">
          <Reveal><SectionHeading label="Ethical Framing" tone="light">The challenge was not the interface. It was the ethics.</SectionHeading></Reveal>
          <Reveal className="safemap-ethics__intro" delay={0.08}>
            <p>Most iteration happened at the level of language and ethics before it happened at the level of screens. The central questions were not about layout or interaction patterns.</p>
          </Reveal>
          <div className="safemap-question-grid">
            {ethicalQuestions.map((question, index) => (
              <Reveal delay={index * 0.08} key={question}><article><span>0{index + 1}</span><p>{question}</p></article></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="safemap-section safemap-design">
        <div className="safemap-container">
          <Reveal><SectionHeading label="The Design">A structural visualisation tool, not a personal safety guide.</SectionHeading></Reveal>
          <Reveal className="safemap-design__intro" delay={0.08}>
            <p>SafeMap does not tell women where to go. It tells the city where the problem is. That distinction is stated clearly in the onboarding because framing shapes how the data gets used.</p>
          </Reveal>
          <img className="safemap-design__laptop" src={impactMapLaptop} alt="SafeMap impact map displayed on a laptop" />
          <div className="safemap-design__screens" aria-label="SafeMap mobile screens">
            {screens.map((screen, index) => <img src={screen} alt={`SafeMap mobile screen ${index + 1}`} key={`design-${screen}`} />)}
          </div>
        </div>
      </section>

      <section className="safemap-section safemap-principles">
        <div className="safemap-container">
          <Reveal><SectionHeading label="Design System" tone="light">Privacy was not a feature added at the end. It was a condition for participation.</SectionHeading></Reveal>
          <div className="safemap-principles__grid">
            {designPrinciples.map((principle, index) => (
              <Reveal delay={(index % 2) * 0.08} key={principle.title}>
                <article><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.body}</p></article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="safemap-screens" aria-label="SafeMap mobile screens">
        <div className="safemap-screens__track">
          {screens.map((screen, index) => <img src={screen} alt={`SafeMap mobile screen ${index + 1}`} key={screen} />)}
        </div>
      </section>

      <section className="safemap-section safemap-impact">
        <div className="safemap-container safemap-two-column">
          <Reveal><SectionHeading label="Impact" tone="light">From reactive care to proactive advocacy.</SectionHeading></Reveal>
          <Reveal className="safemap-body-copy" delay={0.08}>
            <p>SafeMap was designed to shift the shelter's position in public discourse. Rather than responding to incidents after the fact, the tool gives Uppsala Kvinnojour concrete, community-generated evidence. That evidence can enter conversations with city planners, funding bodies, and policy stakeholders on terms that institutions are much harder pressed to dismiss.</p>
          </Reveal>
        </div>
      </section>

      <section className="safemap-quote">
        <div className="safemap-container">
          <Reveal>
            <blockquote>
              <span aria-hidden="true">Insight</span>
              <p>“When harassment remains anecdotal, it is politically weak. When it becomes patterned data, it becomes harder to ignore.”</p>
              <footer>— Dare, <em>on design as evidence</em></footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="safemap-next">
        <div className="safemap-container safemap-next__inner">
          <Reveal className="safemap-next__copy">
            <span>Next case</span>
            <h2>Klimathubb</h2>
            <a href="/#work">Back to projects</a>
          </Reveal>
          <Reveal className="safemap-next__preview" delay={0.1}><img src={climatePreview} alt="Klimathubb project preview" /></Reveal>
        </div>
      </section>
    </main>
  );
}
