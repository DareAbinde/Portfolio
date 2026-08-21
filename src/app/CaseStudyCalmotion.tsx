import { type CSSProperties, type MouseEvent, type PointerEvent as ReactPointerEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import heroPhone from "../assets/case-stories/calmotion-exact/Hero Hand Holding Phone Mockup - CM.png";
import hudScreens from "../assets/case-stories/calmotion-exact/HUD Screens.png";
import frame21 from "../assets/case-stories/calmotion-exact/Frame 21.png";
import intro from "../assets/case-stories/calmotion-exact/Intro.png";
import registration from "../assets/case-stories/calmotion-exact/Regisration.png";
import verification from "../assets/case-stories/calmotion-exact/Verification page.png";
import verifyId from "../assets/case-stories/calmotion-exact/Let's verify your ID-1.png";
import car from "../assets/case-stories/calmotion-exact/Car.png";
import processArtifacts from "../assets/case-stories/calmotion-exact/Persona, Journey Map, User Flow.png";
import nextPreview from "../assets/case-stories/calmotion-exact/Next Case Preview.png";
import nextScreen01 from "../assets/case-stories/calmotion-exact/next-slides/screen-01-camera.png";
import nextScreen02 from "../assets/case-stories/calmotion-exact/next-slides/screen-02-bluetooth.png";
import nextScreen03 from "../assets/case-stories/calmotion-exact/next-slides/screen-03-bluetooth.png";
import nextScreen04 from "../assets/case-stories/calmotion-exact/next-slides/screen-04-home.png";
import nextScreen05 from "../assets/case-stories/calmotion-exact/next-slides/screen-05-schedule.png";
import nextScreen06 from "../assets/case-stories/calmotion-exact/next-slides/screen-06-menu.png";
import nextScreen07 from "../assets/case-stories/calmotion-exact/next-slides/screen-07-settings.png";
import nextScreen08 from "../assets/case-stories/calmotion-exact/next-slides/screen-08-moods.png";
import nextScreen09 from "../assets/case-stories/calmotion-exact/next-slides/screen-09-statistics.png";

const detailItems = [
  ["Type", "Research &\nDesign Project"],
  ["Role", "Product Designer & UX\nResearcher"],
  ["Team", "6 Designers &\nResearchers"],
  ["Tools", "Figma, FigJam,\nTrello, Zoom"],
  ["Context", "HCI, Uppsala\nUniversity"],
];

const researchCards = [
  {
    title: "6 Driver Interviews",
    body: "The team spoke with drivers across Sweden, China, the US, and Nigeria to understand emotional states, coping habits, and AI boundaries.",
  },
  {
    title: "Safety, Trust, Control",
    body: "Drivers were open to support, but only if the system never felt like it was taking decisions away from them.",
  },
  {
    title: "A Human Constraint",
    body: "The core question became how to respond to emotion without presuming to manage it.",
  },
];

const processItems = [
  "Brainstormed intervention types across ambient lighting, haptics, dashboard indicators, voice guidance, and HUD.",
  "Clustered concepts by distraction risk, usefulness, emotional fit, and user control.",
  "Narrowed toward a minimal HUD paired with an adaptive voice companion.",
];

const appScreens = [intro, registration, verification, verifyId];
const nextScreens = [nextScreen01, nextScreen02, nextScreen03, nextScreen04, nextScreen05, nextScreen06, nextScreen07, nextScreen08, nextScreen09];
const desktopScreenSlides = [appScreens, nextScreens.slice(0, 4), nextScreens.slice(4, 8)];
const compactScreenSlides = [
  [intro, registration, verifyId],
  nextScreens.slice(0, 3),
  nextScreens.slice(3, 6),
  nextScreens.slice(6, 9),
];
const caseNavItems = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Thoughts", href: "/#thoughts" },
];

type ScreensCarouselVariant = "desktop" | "tablet" | "mobile";

function ScreensCarousel({ variant }: { variant: ScreensCarouselVariant }) {
  const slides = variant === "desktop" ? desktopScreenSlides : compactScreenSlides;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const showPrevious = () => setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % slides.length);

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const interval = window.setInterval(showNext, 4200);
    return () => window.clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const finishSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const startX = pointerStartX.current;
    pointerStartX.current = null;
    setIsPaused(false);

    if (startX === null) {
      return;
    }

    const distance = event.clientX - startX;
    if (Math.abs(distance) >= 42) {
      if (distance < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }
  };

  return (
    <div
      className={`calmotion-screens-carousel calmotion-screens-carousel--${variant}`}
      role="region"
      aria-label="Calmotion app screens"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="calmotion-screens-carousel__viewport"
        onPointerDown={handlePointerDown}
        onPointerUp={finishSwipe}
        onPointerCancel={() => {
          pointerStartX.current = null;
          setIsPaused(false);
        }}
      >
        <div className="calmotion-screens-carousel__track" style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}>
          {slides.map((slide, slideIndex) => (
            <div className="calmotion-screens-carousel__slide" aria-hidden={slideIndex !== activeSlide} key={`${variant}-slide-${slideIndex}`}>
              {slide.map((screen, screenIndex) => (
                <img src={screen} alt="" draggable={false} key={`${variant}-${slideIndex}-${screenIndex}`} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <button className="calmotion-screens-carousel__control calmotion-screens-carousel__control--previous" type="button" aria-label="Previous screens" onClick={showPrevious}>
        <span aria-hidden="true">&#8592;</span>
      </button>
      <button className="calmotion-screens-carousel__control calmotion-screens-carousel__control--next" type="button" aria-label="Next screens" onClick={showNext}>
        <span aria-hidden="true">&#8594;</span>
      </button>

      <div className="calmotion-screens-carousel__dots" aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}>
        {slides.map((_, index) => (
          <button
            className={index === activeSlide ? "is-active" : ""}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
            onClick={() => setActiveSlide(index)}
            key={`${variant}-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

function useCaseRevealRhythm() {
  useLayoutEffect(() => {
    const page = document.querySelector(".calmotion-exact-page");
    if (!page) {
      return undefined;
    }

    page.querySelectorAll<HTMLElement>(".calmotion-case-reveal,.calmotion-case-reveal--left").forEach((target) => {
      target.classList.remove("calmotion-case-reveal", "calmotion-case-reveal--left", "is-revealed");
      target.style.removeProperty("--calmotion-reveal-delay");
    });

    const excludedParents = [
      ".calmotion-exact-details",
      ".calmotion-tablet-meta",
      ".calmotion-mobile-meta",
      ".calmotion-exact-hud",
      ".calmotion-tablet-hud",
      ".calmotion-mobile-hud",
    ].join(",");
    const artifactImages = [
      ".calmotion-exact-artifacts > img",
      ".calmotion-tablet-artifacts > img",
      ".calmotion-mobile-artifacts > img",
    ].join(",");
    const designMockups = [
      ".calmotion-exact-design > img",
      ".calmotion-exact-design__mobile-phones",
      ".calmotion-tablet-design > img",
      ".calmotion-mobile-design > img",
    ].join(",");
    const heroCopyContainers = ".calmotion-exact-hero__copy,.calmotion-tablet-hero__copy";
    const directTargets = Array.from(
      page.querySelectorAll<HTMLElement>(
        "section:not(.calmotion-exact-more-screens):not(.calmotion-tablet-screens):not(.calmotion-mobile-screens) > *",
      ),
    ).filter(
      (target) =>
        !target.parentElement?.matches(excludedParents) &&
        !target.matches(artifactImages) &&
        !target.matches(designMockups) &&
        !target.matches(heroCopyContainers),
    );
    const heroCopyTargets = Array.from(
      page.querySelectorAll<HTMLElement>(".calmotion-exact-hero__copy > *,.calmotion-tablet-hero__copy > *"),
    );
    const targets = Array.from(new Set([...directTargets, ...heroCopyTargets]));
    const nextSectionSelector = ".calmotion-exact-next,.calmotion-tablet-next,.calmotion-mobile-next";
    const nextSections = Array.from(page.querySelectorAll<HTMLElement>(nextSectionSelector));
    const nextSectionTargets = new Map(
      nextSections.map((section) => [section, targets.filter((target) => target.parentElement === section)]),
    );

    targets.forEach((target) => {
      const siblingIndex = target.parentElement ? Array.from(target.parentElement.children).indexOf(target) : 0;
      const entersFromLeft = target.matches(
        ".calmotion-exact-next > *,.calmotion-tablet-next > *:not(a),.calmotion-mobile-next > *:not(a)",
      );
      target.classList.add(entersFromLeft ? "calmotion-case-reveal--left" : "calmotion-case-reveal");
      target.style.setProperty("--calmotion-reveal-delay", `${Math.min(siblingIndex * 70, 210)}ms`);
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const groupedTargets = nextSectionTargets.get(entry.target as HTMLElement);
            if (groupedTargets) {
              groupedTargets.forEach((target) => target.classList.add("is-revealed"));
            } else {
              entry.target.classList.add("is-revealed");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.08 },
    );

    targets.filter((target) => !target.parentElement?.matches(nextSectionSelector)).forEach((target) => observer.observe(target));
    nextSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}

function getCasePageScrollElement() {
  const documentScroller = (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
  if (documentScroller.scrollHeight > documentScroller.clientHeight + 1) {
    return documentScroller;
  }

  const root = document.getElementById("root");
  if (root && root.scrollHeight > root.clientHeight + 1) {
    return root;
  }

  return documentScroller;
}

function getCasePageScrollTop() {
  return getCasePageScrollElement()?.scrollTop ?? window.scrollY;
}

export function CaseHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    const getScrollY = () => getCasePageScrollTop();
    previousScrollY.current = getScrollY();

    const handleScroll = () => {
      const currentScrollY = getScrollY();
      const scrollDelta = currentScrollY - previousScrollY.current;

      if (Math.abs(scrollDelta) >= 6) {
        setHasScrolled(currentScrollY > 24);
        setIsVisible(currentScrollY < 24 || scrollDelta < 0);
        previousScrollY.current = Math.max(currentScrollY, 0);
      }
    };

    const scrollRoot = getCasePageScrollElement();
    const scrollTargets = Array.from(new Set([window, document, scrollRoot, document.getElementById("root")].filter(Boolean))) as EventTarget[];
    scrollTargets.forEach((target) => target.addEventListener("scroll", handleScroll, { passive: true }));
    const scrollWatcher = window.setInterval(handleScroll, 80);
    return () => {
      window.clearInterval(scrollWatcher);
      scrollTargets.forEach((target) => target.removeEventListener("scroll", handleScroll));
    };
  }, []);

  const navigateHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = event.currentTarget.href;
  };

  return (
    <header
      className={`responsive-desktop-nav calmotion-case-nav${isVisible ? " is-visible" : " is-hidden"}${hasScrolled ? " has-scrolled" : ""}`}
      aria-label="Primary navigation"
    >
      <div className="responsive-desktop-nav__inner">
        <a className="responsive-desktop-nav__brand" href="/#home" onClick={navigateHome}>
          DARExABINDE
        </a>
        <nav className="responsive-desktop-nav__links" aria-label="Desktop navigation">
          {caseNavItems.map((item) => (
            <a className={item.label === "Work" ? "is-active" : ""} href={item.href} key={item.label} onClick={navigateHome}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="responsive-desktop-nav__cta" href="/#contact" onClick={navigateHome}>
          Contact Me
        </a>
      </div>
    </header>
  );
}

export function CaseMobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    const getScrollY = () => getCasePageScrollTop();
    previousScrollY.current = getScrollY();

    const handleScroll = () => {
      const currentScrollY = getScrollY();
      const scrollDelta = currentScrollY - previousScrollY.current;

      if (Math.abs(scrollDelta) >= 6) {
        setHasScrolled(currentScrollY > 24);
        setIsVisible(currentScrollY < 24 || scrollDelta < 0);
        if (scrollDelta > 0) {
          setIsOpen(false);
        }
        previousScrollY.current = Math.max(currentScrollY, 0);
      }
    };

    const scrollRoot = getCasePageScrollElement();
    const scrollTargets = Array.from(new Set([window, document, scrollRoot, document.getElementById("root")].filter(Boolean))) as EventTarget[];
    scrollTargets.forEach((target) => target.addEventListener("scroll", handleScroll, { passive: true }));
    const scrollWatcher = window.setInterval(handleScroll, 80);
    return () => {
      window.clearInterval(scrollWatcher);
      scrollTargets.forEach((target) => target.removeEventListener("scroll", handleScroll));
    };
  }, []);

  const navigateHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpen(false);
    window.location.href = event.currentTarget.href;
  };

  return (
    <header
      className={`responsive-mobile-nav calmotion-case-mobile-nav${isVisible ? " is-visible" : " is-hidden"}${hasScrolled ? " has-scrolled" : ""}${isOpen ? " is-open" : ""}`}
      aria-label="Mobile navigation"
      onClick={() => setIsOpen((value) => !value)}
    >
      <button className="responsive-mobile-nav__button" type="button" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen}>
        <span />
        <span />
        <span />
      </button>
      <nav className={`responsive-mobile-nav__menu${isOpen ? " is-open" : ""}`} aria-label="Mobile menu" onClick={(event) => event.stopPropagation()}>
        {caseNavItems.map((item) => (
          <a href={item.href} key={item.label} onClick={navigateHome}>
            {item.label}
          </a>
        ))}
        <a href="/#contact" onClick={navigateHome}>Contact</a>
      </nav>
    </header>
  );
}

function MobileMetaCard({ label, value }: { label: string; value: string }) {
  return (
    <article>
      <span>{label}</span>
      <p className={label === "Team" ? "calmotion-meta-team" : undefined}>{value}</p>
    </article>
  );
}

function CalmotionMobileCase() {
  return (
    <div className="calmotion-mobile-case">
      <section className="calmotion-mobile-hero">
        <p className="calmotion-mobile-kicker">Calmotion</p>
        <h1>Designing<br />Emotionally<br />Aware<br />AI for Drivers.</h1>
        <p>
          An adaptive AI driver assistant combining a head-up display with an
          emotionally aware voice companion, designed to support drivers
          without taking control away from them.
        </p>
        <img src={heroPhone} alt="Hand holding the Calmotion mobile app" />
      </section>

      <section className="calmotion-mobile-meta" aria-label="Project details">
        <MobileMetaCard label="Type" value={"Research &\nDesign Project"} />
        <MobileMetaCard label="Role" value={"Product\nDesigner & UX\nResearcher"} />
        <MobileMetaCard label="Team" value={"6 Designers\n& Researchers"} />
        <MobileMetaCard label="Tools" value={"Figma, FigJam,\nTrello, Zoom"} />
        <MobileMetaCard label="Context" value={"HCI, Uppsala\nUniversity"} />
      </section>

      <section className="calmotion-mobile-section calmotion-mobile-section--dark">
        <p className="calmotion-mobile-eyebrow">The Brief</p>
        <h2>Modern vehicles are<br />getting smarter, but<br />they still know very<br />little about the driver.</h2>
        <p>
          They track speed, predict hazards, and monitor the road. But when
          a driver is stressed, fatigued, or distracted, no system truly
          responds to that. Calmotion explores how an emotionally aware assistant can respond to the person behind the wheel while keeping control with the driver.
        </p>
      </section>

      <section className="calmotion-mobile-section calmotion-mobile-section--light">
        <p className="calmotion-mobile-eyebrow calmotion-mobile-eyebrow--dark">The Problem</p>
        <h2>The challenge was not technical, it was human.</h2>
        <p>
          How do we build a system that responds to emotion without presuming
          to manage it? An AI that misreads a driver's state, offering calm
          reassurance when sharp focus is needed, is not just unhelpful. In a safety-critical context, it is dangerous. This tension between support and autonomy shaped every decision in the project.
        </p>
      </section>

      <section className="calmotion-mobile-hud">
        <img src={hudScreens} alt="Two Calmotion HUD screens in a driving context" />
      </section>

      <section className="calmotion-mobile-section calmotion-mobile-section--research">
        <p className="calmotion-mobile-eyebrow">Research</p>
        <h2>Drivers wanted support, but not surrender.</h2>
        <div className="calmotion-mobile-card-stack">
          {researchCards.map((card) => (
            <article key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="calmotion-mobile-section calmotion-mobile-section--process">
        <p className="calmotion-mobile-eyebrow">Design Process</p>
        <h2>From broad interventions to a calmer interaction model.</h2>
        <div className="calmotion-mobile-process-list">
          {processItems.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="calmotion-mobile-design">
        <p className="calmotion-mobile-kicker">The Design</p>
        <h2><span>Two surfaces.</span><span>One shared</span><span>responsibility:</span><span>support without</span><span>taking over.</span></h2>
        <img src={frame21} alt="Four Calmotion mobile app screens on a pale blue card" />
      </section>

      <section className="calmotion-mobile-section calmotion-mobile-section--hud-app">
        <p className="calmotion-mobile-eyebrow">HUD and Mobile App</p>
        <h2>
          <span>The HUD keeps</span>
          <span>attention on</span>
          <span>the road. The app</span>
          <span>gives ownership</span>
          <span>to the driver.</span>
        </h2>
        <div className="calmotion-mobile-hud-cards">
          <article>
            <p>The HUD overlays minimal information on the windshield: speed, navigation, and contextual prompts. When the system detects emotional signals, it responds through voice rather than visual interruption.</p>
          </article>
          <article>
            <p>The mobile app gives drivers visibility into emotional patterns across trips, control over what the system can access, and route integration. The app exists to give users ownership over the experience, not just data back.</p>
          </article>
        </div>
      </section>

      <section className="calmotion-mobile-screens">
        <ScreensCarousel variant="mobile" />
      </section>

      <section className="calmotion-mobile-section calmotion-mobile-section--voice">
        <p className="calmotion-mobile-eyebrow">AI Voice Companion</p>
        <h2>Emotionally aware does not mean emotionally controlling.</h2>
        <article>
          <p>The AI voice companion adapts its tone to the driver's state: empathetic when tired, task-focused when distracted, quiet when things are going well.</p>
          <p>Calmotion is ultimately less about interfaces and more about the relationship between people and intelligent systems.</p>
        </article>
      </section>

      <section className="calmotion-mobile-artifacts">
        <img src={processArtifacts} alt="Calmotion persona, journey map, and user flow artifacts" />
        <blockquote>
          <p>
            "The value of AI is not simply in<br />
            making systems smarter. It is in<br />
            helping people make better<br />
            decisions without taking those<br />
            decisions away from them."
          </p>
          <footer>- Dare, <span>on AI-Human Collaboration</span></footer>
        </blockquote>
      </section>

      <section className="calmotion-mobile-next">
        <p>Next case</p>
        <h2>SafeMap</h2>
        <img src={nextPreview} alt="" aria-hidden="true" />
        <a href="/#work">Back to projects</a>
      </section>
    </div>
  );
}

function CalmotionTabletCase() {
  return (
    <div className="calmotion-tablet-case">
      <section className="calmotion-tablet-hero">
        <div className="calmotion-tablet-hero__copy">
          <p className="calmotion-tablet-kicker">Calmotion</p>
          <h1>Designing<br />Emotionally Aware<br />AI for Drivers.</h1>
          <p className="calmotion-tablet-hero__intro">
            An adaptive AI driver assistant combining a head-up<br />{" "}
            display with an emotionally aware voice companion,<br />{" "}
            designed to support drivers without taking control<br />{" "}
            away from them.
          </p>
        </div>
        <img src={heroPhone} alt="Hand holding the Calmotion mobile app" />
      </section>

      <section className="calmotion-tablet-meta" aria-label="Project details">
        {detailItems.map(([label, value]) => (
          <MobileMetaCard key={label} label={label} value={value} />
        ))}
      </section>

      <section className="calmotion-tablet-section calmotion-tablet-brief">
        <p className="calmotion-tablet-eyebrow">The Brief</p>
        <h2>Modern vehicles are getting<br />smarter, but they still know very little about the driver.</h2>
        <p>They track speed, predict hazards, and monitor the road. But when a<br />driver is stressed, fatigued, or distracted, no system truly responds to<br />that. Calmotion explores how an emotionally aware assistant can<br />respond to the person behind the wheel while keeping control with<br />the driver.</p>
      </section>

      <section className="calmotion-tablet-section calmotion-tablet-problem">
        <p className="calmotion-tablet-eyebrow">The Problem</p>
        <h2><span>The challenge was not</span><span>technical, it was human.</span></h2>
        <p>How do we build a system that responds to emotion without<br />presuming to manage it? An AI that misreads a driver's state, offering<br />calm reassurance when sharp focus is needed, is not just unhelpful.<br />In a safety-critical context, it is dangerous. This tension between<br />support and autonomy shaped every decision in the project.</p>
      </section>

      <section className="calmotion-tablet-hud">
        <img src={hudScreens} alt="Two Calmotion HUD screens on a road view" />
      </section>

      <section className="calmotion-tablet-section calmotion-tablet-research">
        <p className="calmotion-tablet-eyebrow">Research</p>
        <h2>Drivers wanted support,<br />but not surrender.</h2>
        <div className="calmotion-tablet-research__cards">
          {researchCards.map((card) => (
            <article key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="calmotion-tablet-section calmotion-tablet-process">
        <p className="calmotion-tablet-eyebrow">Design Process</p>
        <h2>From broad interventions<br />to a calmer interaction model.</h2>
        <div className="calmotion-tablet-process__cards">
          {processItems.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="calmotion-tablet-section calmotion-tablet-design">
        <p className="calmotion-tablet-kicker">The Design</p>
        <h2>Two surfaces.<br />One shared responsibility:<br />support without taking over.</h2>
        <img src={frame21} alt="Four Calmotion mobile app screens on a pale blue card" />
      </section>

      <section className="calmotion-tablet-section calmotion-tablet-hud-app">
        <p className="calmotion-tablet-eyebrow">HUD and Mobile App</p>
        <h2><span>The HUD keeps attention</span><span>on the road. The app gives</span><span>ownership to the driver.</span></h2>
        <div className="calmotion-tablet-hud-app__cards">
          <article><p>The HUD overlays minimal information on the windshield:<br />speed, navigation, and contextual prompts. When the system detects emotional signals, it responds through voice rather than visual interruption.</p></article>
          <article><p>The mobile app gives drivers visibility into emotional patterns<br />across trips, control over what the system can access, and route integration. The app exists to give users ownership over the experience, not just data back.</p></article>
        </div>
      </section>

      <section className="calmotion-tablet-screens">
        <ScreensCarousel variant="tablet" />
      </section>

      <section className="calmotion-tablet-section calmotion-tablet-voice">
        <p className="calmotion-tablet-eyebrow">AI Voice Companion</p>
        <h2>Emotionally aware does<br />not mean emotionally controlling.</h2>
        <article>
          <p>The AI voice companion adapts its tone to the driver's state:<br />empathetic when tired, task-focused when distracted, quiet<br />when things are going well.</p>
          <p>Calmotion is ultimately less about interfaces and more about<br />the relationship between people and intelligent systems.</p>
        </article>
      </section>

      <section className="calmotion-tablet-artifacts">
        <img src={processArtifacts} alt="Calmotion persona, journey map, and user flow artifacts" />
        <blockquote>
          <p>"The value of AI is not simply in making systems<br />smarter. It is in helping people make better decisions<br />without taking those decisions away from them."</p>
          <footer>- Dare, <span>on AI-Human Collaboration</span></footer>
        </blockquote>
      </section>

      <section className="calmotion-tablet-next">
        <p>Next case</p>
        <h2>SafeMap</h2>
        <img src={nextPreview} alt="" aria-hidden="true" />
        <a href="/#work">Back to projects</a>
      </section>
    </div>
  );
}

export default function CaseStudyCalmotion() {
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  useCaseRevealRhythm();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="calmotion-exact-page"
      style={{
        "--calmotion-mobile-scale": Math.min(viewportWidth, 539) / 390,
        "--calmotion-tablet-scale": Math.min(viewportWidth, 1023) / 768,
      } as CSSProperties}
    >
      <CaseHeader />
      <CaseMobileHeader />
      <CalmotionMobileCase />
      <CalmotionTabletCase />
      <div className="calmotion-exact-shell">
        <div className="calmotion-exact-stage">
          <section className="calmotion-exact-hero">
            <div className="calmotion-exact-hero__copy">
              <p className="calmotion-exact-kicker">Calmotion</p>
              <h1>Designing<br />Emotionally Aware <br />AI for Drivers.</h1>
              <p>
                An adaptive AI driver assistant combining a head-up display with an emotionally aware voice companion, designed to support drivers without taking control away from them.
              </p>
            </div>
            <img className="calmotion-exact-hero__phone" src={heroPhone} alt="Hand holding the Calmotion mobile app" />
          </section>

          <section className="calmotion-exact-details" aria-label="Project details">
            {detailItems.map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <p className={label === "Team" ? "calmotion-meta-team" : undefined}>{value}</p>
              </article>
            ))}
          </section>

          <section className="calmotion-exact-brief">
            <p className="calmotion-exact-eyebrow">The Brief</p>
            <h2>Modern vehicles are getting smarter, <br />but they still know very little about the driver.</h2>
            <p>
              They track speed, predict hazards, and monitor the road. But when a driver is stressed, fatigued, or distracted, no system truly responds to that. Calmotion explores how an emotionally aware assistant can respond to the person behind the wheel while keeping control with the driver.
            </p>
          </section>

          <section className="calmotion-exact-problem">
            <p className="calmotion-exact-eyebrow calmotion-exact-eyebrow--dark">The Problem</p>
            <h2>The challenge<br />was not technical, it was human.</h2>
            <p>
              How do we build a system that responds to emotion without presuming to manage it? An AI that misreads a driver's state, offering calm reassurance when sharp focus is needed, is not just unhelpful. In a safety-critical context, it is dangerous. This tension between support and autonomy shaped every decision in the project.
            </p>
          </section>

          <section className="calmotion-exact-hud" aria-label="HUD screens">
            <img src={hudScreens} alt="Two Calmotion HUD screens on a road view" />
          </section>

          <section className="calmotion-exact-research">
            <div>
              <p className="calmotion-exact-eyebrow">Research</p>
              <h2>Drivers wanted support, but not surrender.</h2>
            </div>
            <div className="calmotion-exact-research__cards">
              {researchCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="calmotion-exact-process">
            <div>
              <p className="calmotion-exact-eyebrow">Design Process</p>
              <h2>From broad<br />interventions to<br />a calmer<br />interaction model.</h2>
            </div>
            <div className="calmotion-exact-process__cards">
              {processItems.map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="calmotion-exact-design">
            <div>
              <p className="calmotion-exact-kicker">The Design</p>
              <h2>Two surfaces.<br />One shared<br />responsibility:<br />support without<br />taking over.</h2>
            </div>
            <img src={frame21} alt="Four Calmotion mobile app screens on a pale blue card" />
            <div className="calmotion-exact-design__mobile-phones" aria-hidden="true">
              {appScreens.slice(0, 3).map((screen) => (
                <img src={screen} alt="" key={`design-mobile-${screen}`} />
              ))}
            </div>
          </section>

          <section className="calmotion-exact-hud-app">
            <div>
              <p className="calmotion-exact-eyebrow calmotion-exact-eyebrow--muted">HUD and Mobile App</p>
              <h2>The HUD keeps<br />attention on the<br />road. The app<br />gives ownership <br />to the driver.</h2>
            </div>
            <div className="calmotion-exact-hud-app__cards">
              <article>
                <p>
                  The HUD overlays minimal information on the windshield: speed, navigation, and contextual prompts. When the system detects emotional signals, it responds through voice rather than visual interruption.
                </p>
              </article>
              <article>
                <p>
                  The mobile app gives drivers visibility into emotional patterns across trips, control over what the system can access, and route integration. The app exists to give users ownership over the experience, not just data back.
                </p>
              </article>
            </div>
          </section>

          <section className="calmotion-exact-more-screens">
            <ScreensCarousel variant="desktop" />
          </section>

          <section className="calmotion-exact-voice">
            <img src={car} alt="" aria-hidden="true" />
            <div>
              <p className="calmotion-exact-eyebrow calmotion-exact-eyebrow--muted">AI Voice Companion</p>
              <h2>Emotionally<br />aware does not<br />mean emotionally<br />controlling.</h2>
            </div>
            <article>
              <p>
                The AI voice companion adapts its tone to the driver's state: empathetic when tired, task-focused when distracted, quiet when things are going well. Calmotion is ultimately less about interfaces and more about the relationship between people and intelligent systems.
              </p>
            </article>
          </section>

          <section className="calmotion-exact-artifacts">
            <img src={processArtifacts} alt="Calmotion persona, journey map, and user flow artifacts" />
          </section>

          <section className="calmotion-exact-quote">
            <p>
              <em>"The value of AI is not simply in making systems smarter. It is in helping people make better<br />
              decisions without taking those decisions away from them."</em> - Dare, <span>on AI-Human Collaboration</span>
            </p>
          </section>

          <section className="calmotion-exact-next">
            <div className="calmotion-exact-next__copy">
              <span>Next case</span>
              <h2>SafeMap</h2>
            </div>
            <img src={nextPreview} alt="" aria-hidden="true" />
            <a href="/#work">Back to projects</a>
          </section>
        </div>
      </div>
    </main>
  );
}
