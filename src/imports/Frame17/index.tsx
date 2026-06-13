import svgPaths from "./svg-dhbnv2w72o";
import imgRectangle2 from "./c7324dfd37ead65928a6a747250621015d23f361.png";
import imgRectangle7 from "./ee99d739832dca05fc57a4bfd892df322174b781.png";
import imgRectangle12 from "./28b4c8099fe7d73ef947e540cdd6d169ab869133.png";
import imgRectangle17 from "./dd7a0db38fde09ee3fc7127790934632536411ab.png";
import imgRectangle21 from "./05e86349094a2c8434caa49c6a9d8af597b5fc59.png";
import imgRectangle29 from "./0587940069e13a9b620a6be0e25393e10048d6da.png";
import imgRectangle34 from "./5f1d05b156284874200bb1cb5e87b8997ca1bcea.png";
import imgPhoneLeft from "./6010f4b7e237125c8a853f2e7443f1f97be4d24d.png";
import imgPhoneFront from "./35b4b2d6142f1d8f5372274917f0ae9a72b856e5.png";
import imgPhoneFront1 from "./379e8f62f8555efe7dd44cce7c6978a7c12f628c.png";
import imgPhoneLeft1 from "./9711b85516e1b3458f0d54bcb9c7a1dccc5ec17c.png";
import imgPic31 from "./5b348dd888a8f8968f64f9e6e889eb840548d990.png";
import imgHeroPortraitCircle from "./hero-portrait-circle.png";
import imgClimateLaptop from "../image.png";
import imgClimatePhone from "../image-1.png";
import imgLandaLaptop from "../image-2.png";
import imgLandaPhone from "../image-3.png";
import { motion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
// Bio section with 2D animations
import BioSection from "../BioSection/index";
import { ThoughtsSection, ContactSection, FooterSection } from "../../app/components/ThoughtsContactFooter";
import { imgRectangle, imgRectangle1, imgRectangle3, imgRectangle4, imgRectangle5, imgRectangle6, imgRectangle8, imgRectangle9, imgRectangle10, imgRectangle11, imgRectangle13, imgRectangle14, imgRectangle15, imgRectangle16, imgRectangle18, imgRectangle19, imgRectangle20, imgRectangle22, imgRectangle23, imgRectangle24, imgRectangle25, imgRectangle26, imgRectangle27, imgRectangle28, imgRectangle30, imgRectangle31, imgRectangle32, imgRectangle33 } from "./svg-cqql9";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Thoughts", href: "#thoughts" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const disciplineFields = [
  "UX RESEARCH",
  "PRODUCT DESIGN",
  "STRATEGY",
  "SYSTEMS THINKING",
  "INTERACTION DESIGN",
  "DESIGN PSYCHOLOGY",
];

const articleArrowPath = "M10.1939 8.15531L13.2522 4.58736L10.1939 1.01942M13.2522 4.58736H1.01923";

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const resolveHref = (href: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const mobileHref = `${href}-mobile`;
      return mobileHref === "#home-mobile" ? "#home-mobile" : mobileHref;
    }
    return href;
  };

  useEffect(() => {
    const scrollRoot = document.getElementById("root");
    const scrollTarget = scrollRoot ?? window;
    const getScrollY = () => scrollRoot?.scrollTop ?? window.scrollY;
    let previousScrollY = getScrollY();

    const handleScroll = () => {
      const currentScrollY = getScrollY();
      const scrollDelta = currentScrollY - previousScrollY;

      if (Math.abs(scrollDelta) < 6) {
        return;
      }

      setHasScrolled(currentScrollY > 24);
      setIsVisible(currentScrollY < 24 || scrollDelta < 0);

      if (scrollDelta > 0 && currentScrollY > 24) {
        setIsOpen(false);
      }

      previousScrollY = Math.max(currentScrollY, 0);
    };

    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollTarget.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`responsive-mobile-nav${isVisible ? " is-visible" : " is-hidden"}${hasScrolled ? " has-scrolled" : ""}`}>
      <button
        aria-controls="responsive-mobile-menu"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        className="responsive-mobile-nav__button"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        aria-label="Mobile navigation"
        className={`responsive-mobile-nav__menu${isOpen ? " is-open" : ""}`}
        id="responsive-mobile-menu"
      >
        {navItems.map((item) => (
          <a href={resolveHref(item.href)} key={item.label} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function useAdaptiveShowcaseInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return undefined;
    }

    const scrollRoot = document.getElementById("root");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root: scrollRoot,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
}

const adaptivePrinciples = [
  {
    title: "Understand People",
    body: "Research reveals needs, behaviors, and context before any design decisions.",
  },
  {
    title: "Frame the Problem",
    body: "Most design failures begin with solving the wrong challenge.",
  },
  {
    title: "Design with Intention",
    body: "Every interaction should support both people and outcomes.",
  },
];

const adaptiveProjects = [
  {
    id: "calmotion",
    name: "Calmotion",
    description:
      "An AI driving companion designed to support drivers without taking control. Led research, problem framing, and interaction design.",
    tags: ["Affective Computing", "Heads-Up Display", "Design Strategy", "Mobility Tech", "Voice Assistant", "Research Led"],
    type: "calmotion",
  },
  {
    id: "safemap",
    name: "SafeMap",
    description:
      "Designed in collaboration with Uppsala Kvinnojour to map gendered public harassment as collective evidence. Led problem framing, concept, and design.",
    tags: ["Design Activism", "Civic Design", "Design Strategy", "Social Good", "Prototyping", "Research Led"],
    type: "safemap",
  },
  {
    id: "climate",
    name: "Klimathubb",
    description:
      "A sustainability engagement platform designed in collaboration with Biotopia Uppsala. Designed for immigrants navigating an unfamiliar environmental system.",
    tags: ["Sustainability", "Edtech", "Service Design", "AI Integration", "Research Led", "Full-Stack"],
    type: "climate",
  },
  {
    id: "landa",
    name: "Landa",
    description:
      "A minimal decision-support tool helping international students assess life in Sweden before committing. Self-initiated, built, in use.",
    tags: ["Tool", "Artificial Intelligence", "Product Design", "Systems Thinking", "Research Led", "Full-Stack"],
    type: "landa",
  },
];

const adaptiveArticles = [
  {
    tag: "Psychology",
    readTime: "5 min read",
    title: "What Psychology Taught Me About Product Design",
    body: "Behavioral science isn't just useful for conversions. It fundamentally changes how we define design problems and what we're actually designing for.",
  },
  {
    tag: "Product Thinking",
    readTime: "6 min read",
    title: "Why Design Problems Are Often Insight Problems",
    body: "Before we can solve anything well, we need to understand what we're actually solving for. Most design failures begin well before the first wireframe.",
  },
  {
    tag: "AI Design",
    readTime: "7 min read",
    title: "Designing for Human Autonomy in AI Systems",
    body: "When machines get smarter, the design question shifts from capability to control, and who holds it. My thoughts on what it means to keep humans in the loop.",
  },
];

function AdaptiveReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function AdaptiveWordmark() {
  return (
    <a className="adaptive-wordmark" href="#home" aria-label="DARExABINDE home">
      <span className="adaptive-wordmark__mark" aria-hidden="true" />
      <span>DARExABINDE</span>
    </a>
  );
}

function AdaptiveProjectShowcase({ type }: { type: string }) {
  const [showcaseRef, isShowcaseInView] = useAdaptiveShowcaseInView();

  if (type === "calmotion") {
    return (
      <div className="adaptive-showcase adaptive-showcase--phones" ref={showcaseRef}>
        <motion.img
          className="adaptive-phone adaptive-phone--rear"
          src={imgPhoneLeft1}
          alt=""
          initial={{ x: -90, opacity: 0 }}
          animate={isShowcaseInView ? { x: 0, opacity: 1 } : { x: -90, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.img
          className="adaptive-phone adaptive-phone--front"
          src={imgPhoneFront1}
          alt=""
          initial={{ x: 90, opacity: 0 }}
          animate={isShowcaseInView ? { x: 0, opacity: 1 } : { x: 90, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
        />
      </div>
    );
  }

  if (type === "safemap") {
    return (
      <div className="adaptive-showcase adaptive-showcase--phones" ref={showcaseRef}>
        <motion.img
          className="adaptive-phone adaptive-phone--rear"
          src={imgPhoneLeft}
          alt=""
          initial={{ x: -90, opacity: 0 }}
          animate={isShowcaseInView ? { x: 0, opacity: 1 } : { x: -90, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.img
          className="adaptive-phone adaptive-phone--front"
          src={imgPhoneFront}
          alt=""
          initial={{ x: 90, opacity: 0 }}
          animate={isShowcaseInView ? { x: 0, opacity: 1 } : { x: 90, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
        />
      </div>
    );
  }

  const laptop = type === "climate" ? imgClimateLaptop : imgLandaLaptop;
  const phone = type === "climate" ? imgClimatePhone : imgLandaPhone;

  return (
    <div className={`adaptive-showcase adaptive-showcase--devices adaptive-showcase--${type}`} ref={showcaseRef}>
      <motion.div
        className="adaptive-laptop"
        aria-hidden="true"
        initial={{ x: -140, opacity: 0 }}
        animate={isShowcaseInView ? { x: 0, opacity: 1 } : { x: -140, opacity: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        <img src={laptop} alt="" />
      </motion.div>
      <motion.div
        className="adaptive-device-phone"
        aria-hidden="true"
        initial={{ x: 140, opacity: 0 }}
        animate={isShowcaseInView ? { x: 0, opacity: 1 } : { x: 140, opacity: 0 }}
        transition={{ duration: 0.85, ease: "easeOut", delay: 0.08 }}
      >
        <img src={phone} alt="" />
      </motion.div>
    </div>
  );
}

function AdaptiveProject({
  project,
  nextProjectId,
}: {
  project: (typeof adaptiveProjects)[number];
  nextProjectId?: string;
}) {
  return (
    <article className="adaptive-project" id={project.id}>
      <AdaptiveProjectShowcase type={project.type} />
      <AdaptiveReveal className="adaptive-project-copy">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul className="adaptive-tags" aria-label={`${project.name} tags`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a className="adaptive-case-link" href={`#${project.id}`}>
          View Case Story
        </a>
        {nextProjectId ? (
          <a className="adaptive-project-arrow" href={`#${nextProjectId}`} aria-label={`Go to next project`}>
            <svg fill="none" preserveAspectRatio="none" viewBox="0 0 26 15" aria-hidden="true">
              <path d={svgPaths.pca30000} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
            </svg>
          </a>
        ) : null}
      </AdaptiveReveal>
    </article>
  );
}

function AdaptiveFooter() {
  return (
    <footer className="adaptive-footer">
      <AdaptiveReveal className="adaptive-footer__inner">
        <AdaptiveWordmark />
        <nav aria-label="Footer navigation">
          {navItems.slice(0, 4).map((item) => (
            <a href={item.href === "#home" ? "#home-mobile" : `${item.href}-mobile`} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <p>© 2026 Dare Abinde. All rights reserved.</p>
      </AdaptiveReveal>
    </footer>
  );
}

function AdaptivePage() {
  return (
    <div className="adaptive-page">
      <section className="adaptive-hero" id="home-mobile">
        <div className="adaptive-hero__top">
          <AdaptiveWordmark />
        </div>
        <p className="adaptive-hero__location">Uppsala, Sweden</p>
        <div className="adaptive-hero__content">
          <div>
            <h1>
              Designing
              <span>Insight Driven</span>
              <span>
                Experiences<span className="adaptive-dot">.</span>
              </span>
            </h1>
            <p>I’m Dare, a <em>Product Designer &amp; UX Researcher</em>.</p>
            <a className="adaptive-primary" href="#work-mobile">View Projects</a>
          </div>
          <aside>
            <img src={imgHeroPortraitCircle} alt="Dare portrait" />
          </aside>
        </div>
        <div className="adaptive-categories">
          <div className="adaptive-categories__track" aria-label="Design fields">
            {[0, 1].map((setIndex) => (
              <div className="adaptive-categories__set" key={setIndex}>
                {disciplineFields.map((field) => (
                  <span key={`${field}-${setIndex}`}>{field}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="adaptive-principles">
        <AdaptiveReveal>
          <h2>
            Design problems are rarely design.
            <span> It’s an insight problem.</span>
          </h2>
        </AdaptiveReveal>
        <div className="adaptive-principle-grid">
          {adaptivePrinciples.map((principle, index) => (
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              key={principle.title}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
              viewport={{ once: true, margin: "-70px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="adaptive-work" id="work-mobile">
        <AdaptiveReveal>
          <h2>
            Selected work <span>shaped</span>
            <br />
            by research, clarity,
            <br />
            <span>and</span> intention.
          </h2>
        </AdaptiveReveal>
        <div className="adaptive-projects">
          {adaptiveProjects.map((project, index) => (
            <AdaptiveProject key={project.id} project={project} nextProjectId={adaptiveProjects[index + 1]?.id} />
          ))}
        </div>
      </section>

      <section className="adaptive-bio" id="about-mobile">
        <AdaptiveReveal>
          <h2>
            My journey into design
            <span> began with studying people.</span>
          </h2>
          <p>
            With a background in Psychology and Human Computer Interaction, my work has centered on understanding how people <em>think</em>, <em>behave</em>, and <em>make decisions</em>, and how that understanding can inform the design of products, services, and systems.
          </p>
          <strong>I'm drawn to problems where understanding people changes the outcome, not just the interface.</strong>
        </AdaptiveReveal>
        <AdaptiveReveal delay={0.08}>
          <a href="#contact-mobile">About Me</a>
        </AdaptiveReveal>
      </section>

      <section className="adaptive-thoughts" id="thoughts-mobile">
        <AdaptiveReveal>
          <h2>
            Thoughts on design,
            <span> insight</span>, and human behaviour.
          </h2>
        </AdaptiveReveal>
        <div className="adaptive-article-grid">
          {adaptiveArticles.map((article, index) => (
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              key={article.title}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
              viewport={{ once: true, margin: "-70px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="adaptive-article-meta">
                <span>{article.tag}</span>
                <small>{article.readTime}</small>
              </div>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <a href="#contact-mobile">
                Read Article
                <svg fill="none" viewBox="0 0 15 10" aria-hidden="true">
                  <path d={articleArrowPath} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                </svg>
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="adaptive-contact" id="contact-mobile">
        <AdaptiveReveal className="adaptive-contact__copy">
          <h2>
            <span>Let’s turn insights into</span>
            better decisions.
          </h2>
          <a href="mailto:dareabinde04@gmail.com">Contact Me</a>
          <p>dareabinde04@gmail.com</p>
        </AdaptiveReveal>
        <AdaptiveReveal className="adaptive-contact__portrait" delay={0.12}>
          <img src={imgHeroPortraitCircle} alt="Dare Abinde" />
        </AdaptiveReveal>
      </section>
      <AdaptiveFooter />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-9px] right-[9px] top-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1f] text-[39px] tracking-[-1.8px] w-[567px] whitespace-pre-wrap">
        <p className="font-['Poppins:Medium',sans-serif] mb-0">
          <span className="leading-[46.8px]">Selected work</span>
          <span className="leading-[46.8px] text-[#6e6e73]">{` shaped `}</span>
        </p>
        <p className="font-['Poppins:Medium',sans-serif] leading-[46.8px] mb-0">{`by research, clarity, `}</p>
        <p className="font-['Poppins:Medium',sans-serif]">
          <span className="leading-[46.8px] text-[#6e6e73]">{`and `}</span>
          <span className="leading-[46.8px]">intention.</span>
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[141px] items-start left-[-87px] top-[-0.34px] w-[517px]" data-name="Container">
      <Heading2 />
    </div>
  );
}

function Header() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col h-[141px] items-start left-0 max-w-[1200px] top-[calc(50%-2580.16px)] w-[1200px]" data-name="HEADER">
      <Container />
    </div>
  );
}

function Container1() {
  return <div className="absolute h-[58px] left-[522px] top-[1242px] w-[178px]" data-name="Container" />;
}

function Container2() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 max-w-[1200px] size-[44px] top-[calc(50%-1255.8px)]" data-name="Container" />;
}

function Svg() {
  return (
    <div className="h-[44px] overflow-clip relative shrink-0 w-full" data-name="SVG">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6667 14.6667">
            <path d={svgPaths.pca30000} id="Vector" stroke="var(--stroke-0, #005FCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[44px] items-start min-w-px opacity-40 relative" data-name="Container">
      <Svg />
    </div>
  );
}

function NavGoToNextSection() {
  return (
    <div className="bg-[rgba(184,184,184,0.05)] content-stretch flex items-center justify-center pt-[4px] relative rounded-[100px] shrink-0 size-[44px]" data-name="Nav - Go to next section">
      <Container3 />
    </div>
  );
}

function LinkAutoscrollToNextSection() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-center left-[calc(50%+0.5px)] top-[984px]" data-name="Link - Autoscroll to next section">
      <NavGoToNextSection />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1f] text-[15.099px] text-center whitespace-nowrap">
        <p className="leading-[24.158px]">View Case Story</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[123px]" data-name="Container">
      <Container6 />
    </div>
  );
}

function LinkOutlined() {
  return (
    <div className="content-stretch flex items-center justify-center px-[22.649px] py-[15.099px] relative rounded-[45.297px] shrink-0" data-name="Link - Outlined">
      <Container5 />
      <div className="absolute inset-[0_0.4px_0.84px_0] rounded-[45.297px]" data-name="Border">
        <div aria-hidden className="absolute border-[#dbdbdb] border-[0.944px] border-solid inset-0 pointer-events-none rounded-[45.297px]" />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-0.35px)] top-[864px]" data-name="Container">
      <LinkOutlined />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">RESEARCH LED</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[84px]" data-name="Container">
      <Container10 />
    </div>
  );
}

function Variant() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container9 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[162.74px]" data-name="Container">
      <Variant />
    </div>
  );
}

function Container7() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-2.39px)] top-[calc(50%+13.31px)]" data-name="Container">
      <Container8 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">ARTIFICIAL INTELLIGENCE</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[145px]" data-name="Container">
      <Container13 />
    </div>
  );
}

function Variant1() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container12 />
    </div>
  );
}

function Container11() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-2.39px)] top-[calc(50%-35.56px)] w-[162.74px]" data-name="Container">
      <Variant1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">FULL-STACK</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[72px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function Variant2() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container15 />
    </div>
  );
}

function Container14() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-start left-[calc(50%+176.35px)] top-[calc(50%+12.31px)] w-[162.74px]" data-name="Container">
      <Variant2 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">SYSTEMS THINKING</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[112px]" data-name="Container">
      <Container19 />
    </div>
  );
}

function Variant3() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container18 />
    </div>
  );
}

function Container17() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-181.13px)] top-[calc(50%+12.44px)]" data-name="Container">
      <Variant3 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">PRODUCT DESIGN</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[103px]" data-name="Container">
      <Container21 />
    </div>
  );
}

function Variant4() {
  return (
    <div className="absolute bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center left-[357.48px] px-[13.87px] py-[6.935px] rounded-[15.604px] top-[14px] w-[162.74px]" data-name="Variant 1">
      <Container20 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">TOOL</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 w-[31px]" data-name="Container">
      <Container24 />
    </div>
  );
}

function Variant5() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] relative rounded-[15.604px] shrink-0 w-full" data-name="Variant 1">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative size-full">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[14px] w-[163px]" data-name="Container">
      <Variant5 />
    </div>
  );
}

function Tags() {
  return (
    <div className="-translate-x-1/2 absolute h-[127px] left-1/2 top-[701px] w-[525px]" data-name="Tags">
      <Container7 />
      <Container11 />
      <Container14 />
      <Container17 />
      <Variant4 />
      <Container22 />
    </div>
  );
}

function Container25() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.87px] left-[calc(50%+336.87px)] top-[calc(50%-24.06px)] w-[162.74px]" data-name="Container" />;
}

function Logo() {
  return (
    <div className="-translate-x-1/2 absolute h-[48px] left-1/2 overflow-clip top-[488px] w-[121px]" data-name="Logo">
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[48px] leading-[47.079px] left-[5px] not-italic text-[#24151d] text-[36.215px] top-0 w-[116px]">Landa</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[0.27%_12.4%_10.7%_13.13%]" data-name="Group">
      <div className="absolute inset-[0.27%_12.4%_10.7%_13.13%] mask-position-[0px_6.466px,_-0.305px_5.52px,_0px_6.466px]" style={{ maskImage: `url("${imgRectangle}"), url("${imgRectangle1}"), url("${imgRectangle}")` }} data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle2} />
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[0.27%_12.4%_10.7%_13.13%]" data-name="Group">
      <Group4 />
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-[2.1%_12.39%_12.51%_13.13%]" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[2.1%_12.39%_12.51%_13.13%]" data-name="Group">
      <ClipPathGroup2 />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[1.83%_12.33%_12.49%_13.09%]" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[1.83%_12.33%_12.49%_13.09%]" data-name="Group">
      <ClipPathGroup1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[1.83%_12.33%_12.49%_13.09%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[2.1%_12.39%_12.51%_13.13%]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Group">
      <div className="absolute inset-[0_0.02%_0_-0.02%] mask-position-[0.109px_0px,_-0.141px_-0.835px,_0.109px_0.209px,_0px_0px]" style={{ maskImage: `url("${imgRectangle3}"), url("${imgRectangle4}"), url("${imgRectangle5}"), url("${imgRectangle6}")` }} data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle7} />
        </div>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Group">
      <Group10 />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Mask group">
      <Group9 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Group">
      <MaskGroup />
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <div className="absolute contents inset-[0.06%_0_0.08%_0]" data-name="Clip path group">
      <Group8 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[0.06%_0_0.08%_0]" data-name="Group">
      <ClipPathGroup5 />
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-[-0.24%_-0.03%_-0.21%_-0.04%]" data-name="Clip path group">
      <Group7 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[-0.24%_-0.03%_-0.21%_-0.04%]" data-name="Group">
      <ClipPathGroup4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[-0.24%_-0.03%_-0.21%_-0.04%]" data-name="Group">
      <Group6 />
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function Laptop() {
  return (
    <motion.img
      alt="Landa on laptop"
      className="absolute left-0 top-[38.42px] h-auto w-[676.127px]"
      src={imgLandaLaptop}
      data-name="Laptop"
      initial={{ x: -200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[0.86%_4.36%_0.87%_4.23%]" data-name="Group">
      <div className="absolute inset-[0.86%_4.36%_0.87%_4.23%] mask-position-[-0.125px_2.718px,_0.004px_2.872px,_-0.496px_2.041px,_-0.125px_2.832px,_0px_2.873px]" style={{ maskImage: `url("${imgRectangle8}"), url("${imgRectangle9}"), url("${imgRectangle10}"), url("${imgRectangle11}"), url("${imgRectangle9}")` }} data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle12} />
        </div>
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[0.86%_4.36%_0.87%_4.23%]" data-name="Group">
      <Group17 />
    </div>
  );
}

function ClipPathGroup10() {
  return (
    <div className="absolute contents inset-[1.64%_4.34%_1.64%_4.23%]" data-name="Clip path group">
      <Group16 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[1.64%_4.34%_1.64%_4.23%]" data-name="Group">
      <ClipPathGroup10 />
    </div>
  );
}

function ClipPathGroup9() {
  return (
    <div className="absolute contents inset-[1.63%_4.3%_1.64%_4.16%]" data-name="Clip path group">
      <Group15 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[1.63%_4.3%_1.64%_4.16%]" data-name="Group">
      <ClipPathGroup9 />
    </div>
  );
}

function ClipPathGroup8() {
  return (
    <div className="absolute contents inset-[1.42%_4.23%_1.44%_3.96%]" data-name="Clip path group">
      <Group14 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[1.42%_4.23%_1.44%_3.96%]" data-name="Group">
      <ClipPathGroup8 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[1.42%_4.23%_1.44%_3.96%]" data-name="Group">
      <Group13 />
    </div>
  );
}

function ClipPathGroup7() {
  return (
    <div className="absolute contents inset-[1.64%_4.33%_1.64%_4.23%]" data-name="Clip path group">
      <Group12 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[1.64%_4.33%_1.64%_4.23%]" data-name="Group">
      <ClipPathGroup7 />
    </div>
  );
}

function ClipPathGroup6() {
  return (
    <div className="absolute contents inset-[1.6%_4.3%_1.6%_4.16%]" data-name="Clip path group">
      <Group11 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[0_-0.03%_0_-0.1%]" data-name="Group">
      <div className="absolute inset-[0_-0.03%_0_-0.1%] mask-position-[0.16px_0px,_0.094px_0px,_0.16px_0px,_0px_0px]" style={{ maskImage: `url("${imgRectangle13}"), url("${imgRectangle14}"), url("${imgRectangle15}"), url("${imgRectangle16}")` }} data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle17} />
        </div>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[0_-0.03%_0_-0.1%]" data-name="Group">
      <Group23 />
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents inset-[0_-0.03%_0_-0.1%]" data-name="Mask group">
      <Group22 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[0_-0.03%_0_-0.1%]" data-name="Group">
      <MaskGroup1 />
    </div>
  );
}

function ClipPathGroup13() {
  return (
    <div className="absolute contents inset-[0_0.02%_0.02%_-0.02%]" data-name="Clip path group">
      <Group21 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[0_0.02%_0.02%_-0.02%]" data-name="Group">
      <ClipPathGroup13 />
    </div>
  );
}

function ClipPathGroup12() {
  return (
    <div className="absolute contents inset-[0_-0.31%_-0.26%_-0.05%]" data-name="Clip path group">
      <Group20 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[0_-0.31%_-0.26%_-0.05%]" data-name="Group">
      <ClipPathGroup12 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[0_-0.31%_-0.26%_-0.05%]" data-name="Group">
      <Group19 />
    </div>
  );
}

function ClipPathGroup11() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Clip path group">
      <Group18 />
    </div>
  );
}

function Phone() {
  return (
    <motion.img
      alt="Landa on phone"
      className="absolute right-[-0.07px] top-0 h-auto w-[183.087px]"
      src={imgLandaPhone}
      data-name="Phone"
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    />
  );
}

function LandaShowcase() {
  return (
    <div className="-translate-x-1/2 absolute h-[391.809px] left-[calc(50%+0.5px)] top-[14px] w-[754px]" data-name="Landa Showcase">
      <Laptop />
      <Phone />
    </div>
  );
}

function Landa() {
  return (
    <div className="-translate-x-1/2 absolute h-[1062px] left-[calc(50%+0.5px)] top-[4088px] w-[1003px]" data-name="Landa">
      <LinkAutoscrollToNextSection />
      <Container4 />
      <Tags />
      <Container25 />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[98px] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#6e6e73] text-[22.123px] text-center top-[570px] w-[588px]">A minimal decision-support tool helping international students assess life in Sweden before committing. Self-initiated, built, in use.</p>
      <Logo />
      <LandaShowcase />
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[44px] overflow-clip relative shrink-0 w-full" data-name="SVG">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6667 14.6667">
            <path d={svgPaths.pca30000} id="Vector" stroke="var(--stroke-0, #005FCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[44px] items-start min-w-px opacity-40 relative" data-name="Container">
      <Svg1 />
    </div>
  );
}

function NavGoToNextSection1() {
  return (
    <div className="bg-[rgba(184,184,184,0.05)] content-stretch flex items-center justify-center pt-[4px] relative rounded-[100px] shrink-0 size-[44px]" data-name="Nav - Go to next section">
      <Container26 />
    </div>
  );
}

function LinkAutoscrollToNextSection1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-center left-[calc(50%+0.5px)] top-[1016px]" data-name="Link - Autoscroll to next section">
      <NavGoToNextSection1 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1f] text-[15.099px] text-center whitespace-nowrap">
        <p className="leading-[24.158px]">View Case Story</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[123px]" data-name="Container">
      <Container29 />
    </div>
  );
}

function LinkOutlined1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[22.649px] py-[15.099px] relative rounded-[45.297px] shrink-0" data-name="Link - Outlined">
      <Container28 />
      <div className="absolute inset-[0_0.4px_0.84px_0] rounded-[45.297px]" data-name="Border">
        <div aria-hidden className="absolute border-[#dbdbdb] border-[0.944px] border-solid inset-0 pointer-events-none rounded-[45.297px]" />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-0.35px)] top-[896px]" data-name="Container">
      <LinkOutlined1 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">RESEARCH LED</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[84px]" data-name="Container">
      <Container33 />
    </div>
  );
}

function Variant6() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container32 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[162.74px]" data-name="Container">
      <Variant6 />
    </div>
  );
}

function Container30() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-2.39px)] top-[calc(50%+13.31px)]" data-name="Container">
      <Container31 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">EDTECH</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[46px]" data-name="Container">
      <Container36 />
    </div>
  );
}

function Variant7() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container35 />
    </div>
  );
}

function Container34() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-2.39px)] top-[calc(50%-35.56px)] w-[162.74px]" data-name="Container">
      <Variant7 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">FULL-STACK</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[72px]" data-name="Container">
      <Container39 />
    </div>
  );
}

function Variant8() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container38 />
    </div>
  );
}

function Container37() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-start left-[calc(50%+176.35px)] top-[calc(50%+12.31px)] w-[162.74px]" data-name="Container">
      <Variant8 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">AI INTEGRATION</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[94px]" data-name="Container">
      <Container42 />
    </div>
  );
}

function Variant9() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container41 />
    </div>
  );
}

function Container40() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-181.13px)] top-[calc(50%+12.44px)]" data-name="Container">
      <Variant9 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">SERVICE DESIGN</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[95px]" data-name="Container">
      <Container44 />
    </div>
  );
}

function Variant10() {
  return (
    <div className="absolute bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center left-[357.48px] px-[13.87px] py-[6.935px] rounded-[15.604px] top-[14px] w-[162.74px]" data-name="Variant 1">
      <Container43 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">SUSTAINABILITY</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 w-[93px]" data-name="Container">
      <Container47 />
    </div>
  );
}

function Variant11() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] relative rounded-[15.604px] shrink-0 w-full" data-name="Variant 1">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative size-full">
          <Container46 />
        </div>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[14px] w-[163px]" data-name="Container">
      <Variant11 />
    </div>
  );
}

function Tags1() {
  return (
    <div className="-translate-x-1/2 absolute h-[127px] left-1/2 top-[734px] w-[525px]" data-name="Tags">
      <Container30 />
      <Container34 />
      <Container37 />
      <Container40 />
      <Variant10 />
      <Container45 />
    </div>
  );
}

function Container48() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.87px] left-[calc(50%+336.87px)] top-[calc(50%-24.06px)] w-[162.74px]" data-name="Container" />;
}

function Logo1() {
  return (
    <div className="-translate-x-1/2 absolute h-[48px] left-1/2 overflow-clip top-[488px] w-[227px]" data-name="Logo">
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[48px] leading-[47.079px] left-[5px] not-italic text-[#24151d] text-[36.215px] top-0 w-[275px]">Klimathubb</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[0.37%_12.4%_10.73%_13.13%]" data-name="Group">
      <div className="absolute inset-[0.37%_12.4%_10.73%_13.13%] mask-position-[-0.004px_6.036px,_-0.27px_5.783px,_-0.004px_6.036px]" style={{ maskImage: `url("${imgRectangle18}"), url("${imgRectangle19}"), url("${imgRectangle20}")` }} data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle21} />
        </div>
      </div>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[0.37%_12.4%_10.73%_13.13%]" data-name="Group">
      <Group28 />
    </div>
  );
}

function ClipPathGroup16() {
  return (
    <div className="absolute contents inset-[2.1%_12.47%_12.51%_13.13%]" data-name="Clip path group">
      <Group27 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[2.1%_12.47%_12.51%_13.13%]" data-name="Group">
      <ClipPathGroup16 />
    </div>
  );
}

function ClipPathGroup15() {
  return (
    <div className="absolute contents inset-[2.03%_12.23%_12.15%_13.09%]" data-name="Clip path group">
      <Group26 />
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[2.03%_12.23%_12.15%_13.09%]" data-name="Group">
      <ClipPathGroup15 />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[2.03%_12.23%_12.15%_13.09%]" data-name="Group">
      <Group25 />
    </div>
  );
}

function ClipPathGroup14() {
  return (
    <div className="absolute contents inset-[2.1%_12.4%_12.51%_13.13%]" data-name="Clip path group">
      <Group24 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Group">
      <div className="absolute inset-[0_0.02%_0_-0.02%] mask-position-[0.105px_0.003px,_0.105px_-1.022px,_0px_0px]" style={{ maskImage: `url("${imgRectangle22}"), url("${imgRectangle23}"), url("${imgRectangle24}")` }} data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle7} />
        </div>
      </div>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Group">
      <Group33 />
    </div>
  );
}

function MaskGroup2() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Mask group">
      <Group32 />
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[0_0.02%_0_-0.02%]" data-name="Group">
      <MaskGroup2 />
    </div>
  );
}

function ClipPathGroup18() {
  return (
    <div className="absolute contents inset-[-0.29%_-0.14%_-0.37%_0]" data-name="Clip path group">
      <Group31 />
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[-0.29%_-0.14%_-0.37%_0]" data-name="Group">
      <ClipPathGroup18 />
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[-0.29%_-0.14%_-0.37%_0]" data-name="Group">
      <Group30 />
    </div>
  );
}

function ClipPathGroup17() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group29 />
    </div>
  );
}

function Laptop1() {
  return (
    <motion.img
      alt="Climate Hub on laptop"
      className="absolute left-0 top-[38.2px] h-auto w-[666.708px]"
      src={imgClimateLaptop}
      data-name="Laptop"
      initial={{ x: -200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[0.86%_4.36%_0.87%_4.23%]" data-name="Group">
      <div className="absolute inset-[0.86%_4.36%_0.87%_4.23%] mask-position-[-0.129px_2.682px,_-0.004px_2.833px,_-1.574px_1.4px,_0.043px_2.681px,_-0.004px_2.832px]" style={{ maskImage: `url("${imgRectangle25}"), url("${imgRectangle26}"), url("${imgRectangle27}"), url("${imgRectangle28}"), url("${imgRectangle26}")` }} data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle29} />
        </div>
      </div>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[0.86%_4.36%_0.87%_4.23%]" data-name="Group">
      <Group40 />
    </div>
  );
}

function ClipPathGroup23() {
  return (
    <div className="absolute contents inset-[1.64%_4.34%_1.64%_4.23%]" data-name="Clip path group">
      <Group39 />
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[1.64%_4.34%_1.64%_4.23%]" data-name="Group">
      <ClipPathGroup23 />
    </div>
  );
}

function ClipPathGroup22() {
  return (
    <div className="absolute contents inset-[1.6%_4.42%_1.6%_4.25%]" data-name="Clip path group">
      <Group38 />
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[1.6%_4.42%_1.6%_4.25%]" data-name="Group">
      <ClipPathGroup22 />
    </div>
  );
}

function ClipPathGroup21() {
  return (
    <div className="absolute contents inset-[1.25%_3.52%_1.36%_3.36%]" data-name="Clip path group">
      <Group37 />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[1.25%_3.52%_1.36%_3.36%]" data-name="Group">
      <ClipPathGroup21 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[1.25%_3.52%_1.36%_3.36%]" data-name="Group">
      <Group36 />
    </div>
  );
}

function ClipPathGroup20() {
  return (
    <div className="absolute contents inset-[1.64%_4.34%_1.64%_4.23%]" data-name="Clip path group">
      <Group35 />
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[1.64%_4.34%_1.64%_4.23%]" data-name="Group">
      <ClipPathGroup20 />
    </div>
  );
}

function ClipPathGroup19() {
  return (
    <div className="absolute contents inset-[1.6%_4.3%_1.6%_4.16%]" data-name="Clip path group">
      <Group34 />
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute contents inset-[0_-0.05%_0_-0.09%]" data-name="Group">
      <div className="absolute inset-[0_-0.05%_0_-0.09%] mask-position-[0.156px_0px,_-0.25px_-0.315px,_0.156px_0px,_0px_0px]" style={{ maskImage: `url("${imgRectangle30}"), url("${imgRectangle31}"), url("${imgRectangle32}"), url("${imgRectangle33}")` }} data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle34} />
        </div>
      </div>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute contents inset-[0_-0.05%_0_-0.09%]" data-name="Group">
      <Group46 />
    </div>
  );
}

function MaskGroup3() {
  return (
    <div className="absolute contents inset-[0_-0.05%_0_-0.09%]" data-name="Mask group">
      <Group45 />
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute contents inset-[0_-0.05%_0_-0.09%]" data-name="Group">
      <MaskGroup3 />
    </div>
  );
}

function ClipPathGroup26() {
  return (
    <div className="absolute contents inset-[0_0_0.02%_0]" data-name="Clip path group">
      <Group44 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[0_0_0.02%_0]" data-name="Group">
      <ClipPathGroup26 />
    </div>
  );
}

function ClipPathGroup25() {
  return (
    <div className="absolute contents inset-[-0.09%_-0.06%_-0.42%_-0.23%]" data-name="Clip path group">
      <Group43 />
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[-0.09%_-0.06%_-0.42%_-0.23%]" data-name="Group">
      <ClipPathGroup25 />
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[-0.09%_-0.06%_-0.42%_-0.23%]" data-name="Group">
      <Group42 />
    </div>
  );
}

function ClipPathGroup24() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group41 />
    </div>
  );
}

function Phone1() {
  return (
    <motion.img
      alt="Climate Hub on phone"
      className="absolute left-[562.96px] top-[0.32px] h-auto w-[180.534px]"
      src={imgClimatePhone}
      data-name="Phone"
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    />
  );
}

function ClimateHubShowcase() {
  return (
    <div className="-translate-x-1/2 absolute h-[388px] left-[calc(50%+0.5px)] overflow-clip top-0 w-[782px]" data-name="Climate Hub Showcase">
      <Laptop1 />
      <Phone1 />
    </div>
  );
}

function ClimateHub() {
  return (
    <div className="-translate-x-1/2 absolute h-[1060px] left-[calc(50%+0.5px)] top-[2893px] w-[1003px]" data-name="Climate Hub">
      <LinkAutoscrollToNextSection1 />
      <Container27 />
      <Tags1 />
      <Container48 />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[131px] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#6e6e73] text-[22.123px] text-center top-[570px] w-[588px]">A sustainability engagement platform designed in collaboration with Biotopia Uppsala. Designed for immigrants navigating an unfamiliar environmental system.</p>
      <Logo1 />
      <ClimateHubShowcase />
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[44px] overflow-clip relative shrink-0 w-full" data-name="SVG">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6667 14.6667">
            <path d={svgPaths.pca30000} id="Vector" stroke="var(--stroke-0, #005FCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[44px] items-start min-w-px opacity-40 relative" data-name="Container">
      <Svg2 />
    </div>
  );
}

function NavGoToNextSection2() {
  return (
    <div className="bg-[rgba(184,184,184,0.05)] content-stretch flex items-center justify-center pt-[4px] relative rounded-[100px] shrink-0 size-[44px]" data-name="Nav - Go to next section">
      <Container49 />
    </div>
  );
}

function LinkAutoscrollToNextSection2() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-center left-[calc(50%+0.5px)] top-[1121px]" data-name="Link - Autoscroll to next section">
      <NavGoToNextSection2 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1f] text-[15.099px] text-center whitespace-nowrap">
        <p className="leading-[24.158px]">View Case Story</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[123px]" data-name="Container">
      <Container52 />
    </div>
  );
}

function LinkOutlined2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[22.649px] py-[15.099px] relative rounded-[45.297px] shrink-0" data-name="Link - Outlined">
      <Container51 />
      <div className="absolute inset-[0_0.4px_0.84px_0] rounded-[45.297px]" data-name="Border">
        <div aria-hidden className="absolute border-[#dbdbdb] border-[0.944px] border-solid inset-0 pointer-events-none rounded-[45.297px]" />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-0.35px)] top-[1001px]" data-name="Container">
      <LinkOutlined2 />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">PROTOTYPING</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[83px]" data-name="Container">
      <Container56 />
    </div>
  );
}

function Variant12() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container55 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[162.74px]" data-name="Container">
      <Variant12 />
    </div>
  );
}

function Container53() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-2.39px)] top-[calc(50%+13.31px)]" data-name="Container">
      <Container54 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">CIVIC DESIGN</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[80px]" data-name="Container">
      <Container59 />
    </div>
  );
}

function Variant13() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container58 />
    </div>
  );
}

function Container57() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-2.39px)] top-[calc(50%-35.56px)] w-[162.74px]" data-name="Container">
      <Variant13 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">RESEARCH LED</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[84px]" data-name="Container">
      <Container62 />
    </div>
  );
}

function Variant14() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container61 />
    </div>
  );
}

function Container60() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-start left-[calc(50%+176.35px)] top-[calc(50%+12.31px)] w-[162.74px]" data-name="Container">
      <Variant14 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">SOCIAL GOOD</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[82px]" data-name="Container">
      <Container65 />
    </div>
  );
}

function Variant15() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container64 />
    </div>
  );
}

function Container63() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-181.13px)] top-[calc(50%+12.44px)]" data-name="Container">
      <Variant15 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">DESIGN STRATEGY</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[106px]" data-name="Container">
      <Container67 />
    </div>
  );
}

function Variant16() {
  return (
    <div className="absolute bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center left-[357.48px] px-[13.87px] py-[6.935px] rounded-[15.604px] top-[14px] w-[162.74px]" data-name="Variant 1">
      <Container66 />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">DESIGN ACTIVISM</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 w-[104px]" data-name="Container">
      <Container70 />
    </div>
  );
}

function Variant17() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] relative rounded-[15.604px] shrink-0 w-full" data-name="Variant 1">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative size-full">
          <Container69 />
        </div>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[14px] w-[163px]" data-name="Container">
      <Variant17 />
    </div>
  );
}

function Tags2() {
  return (
    <div className="-translate-x-1/2 absolute h-[127px] left-1/2 top-[839px] w-[525px]" data-name="Tags">
      <Container53 />
      <Container57 />
      <Container60 />
      <Container63 />
      <Variant16 />
      <Container68 />
    </div>
  );
}

function Container71() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.87px] left-[calc(50%+336.87px)] top-[calc(50%+17.94px)] w-[162.74px]" data-name="Container" />;
}

function BlueWhiteIllustrativeCuteWereHiringGraphicIllustratorLinkedinPost() {
  return (
    <div className="absolute left-[-41.21px] size-[124.94px] top-[-27.05px]" data-name="Blue White Illustrative Cute We're Hiring Graphic Illustrator Linkedin Post 2">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124.94 124.94">
        <g id="Blue White Illustrative Cute We're Hiring Graphic Illustrator Linkedin Post 2">
          <path d={svgPaths.p30c63080} fill="var(--fill-0, #FBB03B)" id="Vector" />
          <path d={svgPaths.p1d8c3700} fill="var(--fill-0, #D4145A)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Logo2() {
  return (
    <div className="-translate-x-1/2 absolute h-[47.658px] left-1/2 overflow-clip top-[626px] w-[237px]" data-name="Logo">
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] leading-[47.079px] left-[66.98px] not-italic text-[#24151d] text-[36.215px] top-0 w-[170.022px]">SafeMap</p>
      <BlueWhiteIllustrativeCuteWereHiringGraphicIllustratorLinkedinPost />
    </div>
  );
}

function SafeMapShowcase() {
  return (
    <div className="-translate-x-1/2 absolute h-[524px] left-[calc(50%-0.42px)] top-[2px] w-[318.16px]" data-name="SafeMap Showcase">
      <motion.div
        className="absolute h-[456.894px] left-0 top-0 w-[221.903px]"
        data-name="Phone Left"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhoneLeft} />
      </motion.div>
      <motion.div
        className="absolute h-[429.409px] left-[110.89px] top-[94.59px] w-[207.268px]"
        data-name="Phone Front"
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhoneFront} />
      </motion.div>
    </div>
  );
}

function SafeMap() {
  return (
    <div className="-translate-x-1/2 absolute h-[1160px] left-[calc(50%+0.5px)] top-[1598px] w-[1003px]" data-name="SafeMap">
      <LinkAutoscrollToNextSection2 />
      <Container50 />
      <Tags2 />
      <Container71 />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[98px] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#6e6e73] text-[22.123px] text-center top-[708px] w-[588px]">Designed in collaboration with Uppsala Kvinnojour to map gendered public harassment as collective evidence. Led problem framing, concept, and design.</p>
      <Logo2 />
      <SafeMapShowcase />
    </div>
  );
}

function Svg3() {
  return (
    <div className="h-[44px] overflow-clip relative shrink-0 w-full" data-name="SVG">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6667 14.6667">
            <path d={svgPaths.pca30000} id="Vector" stroke="var(--stroke-0, #005FCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[44px] items-start min-w-px opacity-40 relative" data-name="Container">
      <Svg3 />
    </div>
  );
}

function NavGoToNextSection3() {
  return (
    <div className="bg-[rgba(184,184,184,0.05)] content-stretch flex items-center justify-center pt-[4px] relative rounded-[100px] shrink-0 size-[44px]" data-name="Nav - Go to next section">
      <Container72 />
    </div>
  );
}

function LinkAutoscrollToNextSection3() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-center left-[calc(50%+0.5px)] top-[1097px]" data-name="Link - Autoscroll to next section">
      <NavGoToNextSection3 />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1f] text-[15.099px] text-center whitespace-nowrap">
        <p className="leading-[24.158px]">View Case Story</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[123px]" data-name="Container">
      <Container75 />
    </div>
  );
}

function LinkOutlined3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[22.649px] py-[15.099px] relative rounded-[45.297px] shrink-0" data-name="Link - Outlined">
      <Container74 />
      <div className="absolute inset-[0_0.4px_0.84px_0] rounded-[45.297px]" data-name="Border">
        <div aria-hidden className="absolute border-[#dbdbdb] border-[0.944px] border-solid inset-0 pointer-events-none rounded-[45.297px]" />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-0.35px)] top-[977px]" data-name="Container">
      <LinkOutlined3 />
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">VOICE ASSISTANT</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[104px]" data-name="Container">
      <Container79 />
    </div>
  );
}

function Variant18() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container78 />
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[162.74px]" data-name="Container">
      <Variant18 />
    </div>
  );
}

function Container76() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-2.39px)] top-[calc(50%+13.31px)]" data-name="Container">
      <Container77 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">HEADS-UP DISPLAY</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[112px]" data-name="Container">
      <Container82 />
    </div>
  );
}

function Variant19() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container81 />
    </div>
  );
}

function Container80() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-2.39px)] top-[calc(50%-35.56px)] w-[162.74px]" data-name="Container">
      <Variant19 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">RESEARCH LED</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[84px]" data-name="Container">
      <Container85 />
    </div>
  );
}

function Variant20() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container84 />
    </div>
  );
}

function Container83() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-start left-[calc(50%+176.35px)] top-[calc(50%+12.31px)] w-[162.74px]" data-name="Container">
      <Variant20 />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">MOBILITY TECH</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[88px]" data-name="Container">
      <Container88 />
    </div>
  );
}

function Variant21() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0 w-[162.74px]" data-name="Variant 1">
      <Container87 />
    </div>
  );
}

function Container86() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-181.13px)] top-[calc(50%+12.44px)]" data-name="Container">
      <Variant21 />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">DESIGN STRATEGY</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[106px]" data-name="Container">
      <Container90 />
    </div>
  );
}

function Variant22() {
  return (
    <div className="absolute bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center left-[357.48px] px-[13.87px] py-[6.935px] rounded-[15.604px] top-[14px] w-[162.74px]" data-name="Variant 1">
      <Container89 />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[11.269px] tracking-[0.3468px] whitespace-nowrap">
        <p className="leading-[13.523px]">AFFECTIVE COMPUTING</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 w-[137px]" data-name="Container">
      <Container93 />
    </div>
  );
}

function Variant23() {
  return (
    <div className="bg-[rgba(48,47,51,0.1)] content-stretch flex flex-col items-center justify-center px-[13.87px] py-[6.935px] relative rounded-[15.604px] shrink-0" data-name="Variant 1">
      <Container92 />
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[14px]" data-name="Container">
      <Variant23 />
    </div>
  );
}

function Tags3() {
  return (
    <div className="-translate-x-1/2 absolute h-[127px] left-1/2 top-[815px] w-[525px]" data-name="Tags">
      <Container76 />
      <Container80 />
      <Container83 />
      <Container86 />
      <Variant22 />
      <Container91 />
    </div>
  );
}

function Container94() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.87px] left-[calc(50%+336.87px)] top-[calc(50%+18.44px)] w-[162.74px]" data-name="Container" />;
}

function Group47() {
  return (
    <div className="h-[45.945px] relative shrink-0 w-[68.383px]">
      <div className="absolute inset-[0_-13.05%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.304 45.9449">
          <g id="Group 23">
            <line id="Line 11" stroke="var(--stroke-0, #5D4DFD)" strokeLinecap="round" strokeWidth="8.92279" x1="21.5617" x2="21.5617" y1="4.4614" y2="41.4835" />
            <line id="Line 12" stroke="var(--stroke-0, #5D4DFD)" strokeLinecap="round" strokeWidth="8.92279" x1="55.7456" x2="55.7456" y1="4.4614" y2="41.4835" />
            <line id="Line 13" stroke="var(--stroke-0, #5D4DFD)" strokeLinecap="round" strokeWidth="8.92279" x1="38.652" x2="38.652" y1="14.6116" y2="31.3324" />
            <line id="Line 14" stroke="var(--stroke-0, #5D4DFD)" strokeLinecap="round" strokeWidth="8.92279" x1="4.4614" x2="4.4614" y1="14.6116" y2="31.3324" />
            <line id="Line 15" stroke="var(--stroke-0, #5D4DFD)" strokeLinecap="round" strokeWidth="8.92279" x1="72.8426" x2="72.8426" y1="14.6116" y2="31.3324" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Logo3() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex h-[45.945px] items-center justify-between left-[calc(50%+0.5px)] top-[604px] w-[240px]" data-name="Logo">
      <Group47 />
      <p className="[word-break:break-word] font-['Joan:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#749aff] text-[34.204px] whitespace-nowrap">Calmotion</p>
    </div>
  );
}

function CalmotionShowcase() {
  return (
    <div className="-translate-x-1/2 absolute h-[504px] left-1/2 top-0 w-[325px]" data-name="Calmotion Showcase">
      <motion.div
        className="absolute h-[423.765px] left-[120px] top-0 w-[204.544px]"
        data-name="Phone Front"
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhoneFront1} />
      </motion.div>
      <motion.div
        className="absolute h-[450.889px] left-0 top-[64.11px] w-[218.987px]"
        data-name="Phone Left"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhoneLeft1} />
      </motion.div>
    </div>
  );
}

function Calmotion() {
  return (
    <div className="-translate-x-1/2 absolute h-[1143px] left-[calc(50%+0.5px)] top-[320px] w-[1003px]" data-name="Calmotion">
      <LinkAutoscrollToNextSection3 />
      <Container73 />
      <Tags3 />
      <Container94 />
      <Logo3 />
      <CalmotionShowcase />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[98px] leading-[normal] left-1/2 not-italic text-[#6e6e73] text-[22.123px] text-center top-[684px] w-[599px]">An AI driving companion designed to support drivers without taking control. Led research, problem framing, and interaction design.</p>
    </div>
  );
}

function Projects() {
  return (
    <div className="absolute h-[5300px] left-[240px] top-[72px] w-[1200px]" data-name="Projects">
      <Header />
      <Container1 />
      <Container2 />
      <Landa />
      <ClimateHub />
      <SafeMap />
      <Calmotion />
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-[#f8f8f8] content-stretch flex flex-col h-[5372px] items-center left-px overflow-clip pt-[72px] px-[72px] right-0 top-[1442px]" data-name="Body">
      <Projects />
    </div>
  );
}

function Strong() {
  return (
    <div className="-translate-x-1/2 absolute h-[125.3px] left-[calc(50%+38.34px)] text-white top-[-4px] w-[562.38px]" data-name="Strong">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%+77.72px)] top-[33.25px]">
        <p className="leading-[58.8px]">{`aligning vision with `}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%-38.34px)] top-[92.05px]">
        <p className="leading-[58.8px]">measurable outcomes.</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="[word-break:break-word] font-['Manrope:Medium',sans-serif] font-medium h-[117.59px] leading-[0] relative shrink-0 text-[49px] text-center tracking-[-1.9px] w-full whitespace-nowrap" data-name="Heading 1">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%-199.52px)] text-[#b3b3b3] top-[29.25px]">
        <p className="leading-[58.8px]">{`I’m Mikael, `}</p>
      </div>
      <Strong />
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[792px]" data-name="Container">
      <Heading />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b3b3b3] text-[20px] text-center tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">{`I enable product leaders to make confident decisions and `}</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b3b3b3] text-[20px] text-center tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">deliver outcomes using design as a strategic lever.</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[571px]" data-name="Container">
      <Container101 />
      <Container102 />
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Nav">
      <Container100 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0" data-name="Container">
      <Container99 />
      <Nav />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <Container98 />
    </div>
  );
}

function Container103() {
  return <div className="h-[58px] relative shrink-0 w-[157px]" data-name="Container" />;
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container97 />
      <Container103 />
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[72px] max-w-[1200px] opacity-98 top-[6475.21px] w-[1056px]" data-name="Container">
      <Container96 />
    </div>
  );
}

function HeaderTop() {
  return (
    <div className="-translate-x-1/2 absolute h-[959px] left-1/2 top-0 w-[1200px]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1200 959' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(55.2 0 0 47.95 600 283.86)'><stop stop-color='rgba(15,29,38,1)' offset='0'/><stop stop-color='rgba(13,13,13,1)' offset='1'/></radialGradient></defs></svg>\")" }} data-name="Header - Top">
      <Container95 />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">01</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">UX RESEARCH</p>
      </div>
    </div>
  );
}

function Category() {
  return (
    <div className="col-1 content-stretch flex h-[20px] items-center relative row-1 shrink-0 w-[485.333px]" data-name="Category 01">
      <Container105 />
      <Margin />
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">02</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">PRODUCT DESIGN</p>
      </div>
    </div>
  );
}

function Category1() {
  return (
    <div className="col-2 content-stretch flex h-[20px] items-center relative row-1 shrink-0 w-[485.333px]" data-name="Category 02">
      <Container106 />
      <Margin1 />
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.01px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">03</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">STRATEGY</p>
      </div>
    </div>
  );
}

function Category2() {
  return (
    <div className="col-3 content-stretch flex h-[20px] items-center relative row-1 shrink-0 w-[485.333px]" data-name="Category 03">
      <Container107 />
      <Margin2 />
    </div>
  );
}

function Container104() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_20px] relative size-full">
        <Category />
        <Category1 />
        <Category2 />
      </div>
    </div>
  );
}

function FooterCategories() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pb-[48px] pt-[49px] px-[64px] top-[857px] w-[1680px] overflow-hidden" data-name="FooterCategories">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="relative w-full h-[20px]">
        <motion.div
          className="flex absolute"
          style={{ gap: "24px" }}
          animate={{
            x: [0, -3056]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear"
            }
          }}
        >
          {/* First set */}
          {disciplineFields.map((discipline, index) => (
            <div key={`first-${index}`} className="flex items-center shrink-0" style={{ width: "485.333px" }}>
              <span className="font-['Nimbus_Sans_L:Bold',sans-serif] text-white text-[14px] tracking-[1.4px] uppercase leading-[20px] whitespace-nowrap">
                {discipline}
              </span>
            </div>
          ))}
          {/* Second set for seamless loop */}
          {disciplineFields.map((discipline, index) => (
            <div key={`second-${index}`} className="flex items-center shrink-0" style={{ width: "485.333px" }}>
              <span className="font-['Nimbus_Sans_L:Bold',sans-serif] text-white text-[14px] tracking-[1.4px] uppercase leading-[20px] whitespace-nowrap">
                {discipline}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[2px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex items-center justify-center relative shrink-0 size-[22.627px]">
        <div className="flex-none rotate-45">
          <div className="bg-black relative size-[16px]" data-name="Background" />
        </div>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[12px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[28px]">DARExABINDE</p>
      </div>
    </div>
  );
}

function LogoSection() {
  return (
    <div className="absolute content-stretch flex items-center left-[64px] top-[24px]" data-name="Logo Section">
      <Background />
      <Margin3 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[21px]">HOME</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[21px]">WORK</p>
      </div>
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[48px] relative self-stretch shrink-0" data-name="Link:margin">
      <Link1 />
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[21px]">THOUGHTS</p>
      </div>
    </div>
  );
}

function LinkMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[48px] relative self-stretch shrink-0" data-name="Link:margin">
      <Link2 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[21px]">ABOUT</p>
      </div>
    </div>
  );
}

function LinkMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[48px] relative self-stretch shrink-0" data-name="Link:margin">
      <Link3 />
    </div>
  );
}

function CenterNavigation() {
  return (
    <div className="content-stretch flex h-[21px] items-start relative shrink-0" data-name="Center Navigation">
      <Link />
      <LinkMargin />
      <LinkMargin1 />
      <LinkMargin2 />
    </div>
  );
}

function CenterNavigationMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[616.5px] pl-[80px] top-[29.5px]" data-name="Center Navigation:margin">
      <CenterNavigation />
    </div>
  );
}

function LinkCtaButton() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[1446.99px] px-[32px] py-[12px] rounded-[9999px] top-[18px]" data-name="Link - CTA Button">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black tracking-[1.4px] whitespace-nowrap">
        <p className="leading-[20px]">CONTACT ME</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.685px] relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[128px] text-white tracking-[-5.12px] w-full">
        <p className="leading-[121.6px] mb-0">Designing</p>
        <p className="leading-[121.6px] mb-0">Insight Driven</p>
        <p>
          <span className="leading-[121.6px]">Experiences</span>
          <span className="[word-break:break-word] font-['Nimbus_Sans_L:Bold',sans-serif] leading-[121.6px] not-italic text-[#4b5563]">.</span>
        </p>
      </div>
    </div>
  );
}

function Heading3() {
  return <div className="absolute h-[32px] left-0 top-[492.78px] w-[1034.66px]" data-name="Heading 2" />;
}

function Button() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[40px] py-[16px] relative shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center tracking-[1.4px] whitespace-nowrap">
        <p className="leading-[20px]">VIEW PROJECTS</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[3px] max-w-[512px] top-[487.22px] w-[512px]" data-name="Container">
      <Container109 />
    </div>
  );
}

function LeftColumnCopy() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[64px] h-[705px] items-start left-0 pb-[7.22px] pt-[63.095px] top-0 w-[1034.66px]" data-name="Left Column: Copy">
      <Heading1 />
      <Heading3 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Nimbus_Sans_L:Bold',sans-serif] justify-center leading-[0] left-[6px] not-italic text-[24px] text-white top-[471px] w-[1034.66px]">
        <p>
          <span className="[word-break:break-word] font-['Nimbus_Sans_L:Regular',sans-serif] leading-[32px] not-italic">{`I’m Dare, a `}</span>
          <span className="[word-break:break-word] font-['Nimbus_Sans_L:Regular_Italic',sans-serif] italic leading-[32px]">{`Product Designer & UX Researcher`}</span>
          <span className="leading-[32px]">.</span>
        </p>
      </div>
      <Container108 />
    </div>
  );
}

function SecondaryTextMatchingImage1TopRightLayout() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-0 right-0 top-[19px]" data-name="Secondary text matching IMAGE_1 top right layout">
      <div className="[word-break:break-word] flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#888] text-[14px] text-right tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[22.75px]">UPPSALA, SWEDEN</p>
      </div>
    </div>
  );
}

function SecondaryTextMatchingImage1TopRightLayoutMargin() {
  return (
    <div className="absolute h-[85px] left-[1107px] top-[53px] w-[320px]" data-name="Secondary text matching IMAGE_1 top right layout:margin">
      <SecondaryTextMatchingImage1TopRightLayout />
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 absolute h-[705px] left-[calc(50%+0.5px)] top-[152px] w-[1427px]">
      <LeftColumnCopy />
      <div className="absolute h-[444px] left-[1131px] top-[112px] w-[296px]" data-name="Pic 3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPic31} />
      </div>
      <SecondaryTextMatchingImage1TopRightLayoutMargin />
    </div>
  );
}

function Dide() {
  return (
    <div className="absolute bg-[#0d0d0d] h-[962px] left-0 overflow-clip top-0 w-[1680px]" data-name="DIDE">
      <HeaderTop />
      <FooterCategories />
      <LogoSection />
      <CenterNavigationMargin />
      <LinkCtaButton />
      <Frame />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1f] text-[31px] tracking-[-0.93px] whitespace-nowrap">
        <p className="leading-[40.3px]">Understand People</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[280px]" data-name="Container">
      <Heading4 />
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[16px] tracking-[-0.1px] w-full">
        <p className="leading-[25.6px]">Research reveals needs, behaviors, and context before any design decisions.</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f5f5f7] content-stretch flex flex-col gap-[7.29px] items-start pb-[32.01px] pt-[31.25px] px-[32px] relative rounded-[18px] shrink-0 w-[384px]" data-name="Background">
      <Container110 />
      <Container111 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1f] text-[31px] tracking-[-0.93px] whitespace-nowrap">
        <p className="leading-[40.3px]">Frame the Problem</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[281px]" data-name="Container">
      <Heading5 />
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[16px] tracking-[-0.1px] w-full">
        <p className="leading-[25.6px]">Most design failures begin with solving the wrong challenge.</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f5f5f7] content-stretch flex flex-col gap-[7.29px] items-start pb-[32.01px] pt-[31.25px] px-[32px] relative rounded-[18px] shrink-0 w-[384px]" data-name="Background">
      <Container112 />
      <Container113 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d1d1f] text-[31px] tracking-[-0.93px] whitespace-nowrap">
        <p className="leading-[40.3px]">Design with Intention</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[305px]" data-name="Container">
      <Heading6 />
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6e6e73] text-[16px] tracking-[-0.1px] w-full">
        <p className="leading-[25.6px]">Every interaction should support both people and outcomes.</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f5f5f7] content-stretch flex flex-col gap-[7.29px] items-start pb-[32.01px] pt-[31.25px] px-[32px] relative rounded-[18px] shrink-0 w-[384px]" data-name="Background">
      <Container114 />
      <Container115 />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-start left-0 max-w-[1200px] top-[172px] w-[1200px]" data-name="Content">
      <Background1 />
      <Background2 />
      <Background3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[335.55px] left-[139px] top-[68px] w-[1200px]">
      <div className="-translate-y-1/2 [word-break:break-word] absolute capitalize flex flex-col font-['Nimbus_Sans_L:Regular',sans-serif] justify-center leading-[0] not-italic right-[1200px] text-[37.726px] text-black top-[61.5px] tracking-[-1px] translate-x-full whitespace-nowrap">
        <p className="font-['Poppins:Medium',sans-serif] mb-0">
          <span className="leading-[61.305px]">D</span>
          <span className="leading-[61.305px]">esign problems are rarely design.</span>
        </p>
        <p className="font-['Poppins:Medium',sans-serif]">
          <span className="leading-[61.305px]">{`It’s an `}</span>
          <span className="leading-[61.305px] text-[#6e6e73]">insight</span>
          <span className="leading-[61.305px]">{` problem.`}</span>
        </p>
      </div>
      <Content />
    </div>
  );
}

function HeaderTop1() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#eee] h-[480px] left-[calc(50%+0.5px)] top-[962px] w-[1680px]" data-name="Header - Top">
      <Frame2 />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="responsive-frame-shell">
      <MobileNavigation />
      <AdaptivePage />
      <div className="responsive-frame-canvas relative" id="home" style={{ height: "8338px", overflow: "hidden" }}>
        <Body />
        <div className="absolute left-px top-[6767px] w-[1680px] h-[480px]" id="about">
          <BioSection />
        </div>
        <div className="absolute left-px top-[7247px] w-[1680px]" id="thoughts">
          <ThoughtsSection />
          <ContactSection />
          <FooterSection />
        </div>
        <Dide />
        <HeaderTop1 />
        <div className="absolute left-0 top-[1442px]" id="work" />
        <div className="absolute left-0 top-[7600px]" id="contact" />
      </div>
    </div>
  );
}
