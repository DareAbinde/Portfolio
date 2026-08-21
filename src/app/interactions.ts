import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type Navigate = (path: string) => void;

declare global {
  interface Window {
    __portfolioLenis?: Lenis;
    __portfolioScrollTo?: (target: number | HTMLElement, options?: { duration?: number; immediate?: boolean }) => void;
  }
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenisTicker: ((time: number) => void) | null = null;
let activeLenis: Lenis | null = null;

function setupLenis() {
  if (reducedMotion()) {
    window.__portfolioScrollTo = (target, options) => {
      const top = typeof target === "number" ? target : window.scrollY + target.getBoundingClientRect().top;
      window.scrollTo({ top, behavior: options?.immediate ? "auto" : "smooth" });
    };
    return () => {};
  }

  if (!activeLenis) {
    const lenis = new Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    activeLenis = lenis;
    window.__portfolioLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    lenisTicker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisTicker);
    gsap.ticker.lagSmoothing(0);
  }

  window.__portfolioLenis = activeLenis;
  window.__portfolioScrollTo = (target, options) => {
    activeLenis?.scrollTo(target, {
      duration: options?.duration === undefined ? 0.7 : options.duration / 1000,
      immediate: options?.immediate,
      force: true,
    });
  };

  return () => {};
}

function destroyLenis() {
  if (lenisTicker) {
    gsap.ticker.remove(lenisTicker);
    lenisTicker = null;
  }
  activeLenis?.destroy();
  activeLenis = null;
  window.__portfolioLenis = undefined;
  window.__portfolioScrollTo = undefined;
}

export function portfolioScrollTo(target: number | HTMLElement, options?: { duration?: number; immediate?: boolean }) {
  if (activeLenis && !reducedMotion()) {
    activeLenis.scrollTo(target, {
      duration: options?.duration === undefined ? 0.7 : options.duration / 1000,
      immediate: options?.immediate,
      force: true,
    });
    return;
  }

  const top = typeof target === "number" ? target : window.scrollY + target.getBoundingClientRect().top;
  window.scrollTo({ top, behavior: options?.immediate ? "auto" : "smooth" });
}

function isPlainInternalLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (["mailto:", "tel:"].includes(url.protocol)) return false;
  if (url.hash) return false;
  if (url.pathname === window.location.pathname && url.search === window.location.search) return false;

  return true;
}

function setupPageTransitions(navigate: Navigate) {
  function onClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = (event.target as Element | null)?.closest("a");
    if (!anchor || !isPlainInternalLink(anchor)) return;

    event.preventDefault();
    const url = new URL(anchor.href, window.location.href);
    navigate(`${url.pathname}${url.search}`);
  }

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

function setupMagneticTargets() {
  if (reducedMotion() || !window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches) return () => {};

  const targets = Array.from(document.querySelectorAll<HTMLElement>([
    ".fp-nav__brand",
    ".fp-nav__links a",
    ".fp-nav__links button",
    ".figma-ica-responsive-nav__brand",
    ".figma-ica-responsive-nav__links a",
    ".figma-ica-responsive-nav__llm",
    ".fp-nav__contact",
    ".fp-mobile-top-menu",
    ".fp-floating-menu",
    ".fp-side-nav__panel a",
    ".fp-side-nav__panel .fp-side-nav__llm",
    ".fp-home-about",
    ".fp-about-portrait",
    ".fp-expertise__row > button",
    ".fp-home-selected-list .fp-project-row",
    ".fp-filter button",
    ".fp-action-pill",
    ".fp-pill",
    ".fp-footer__button",
    ".fp-contact-submit",
    ".fp-footer__links a",
    ".figma-case-footer__links a",
    ".figma-case-round-button:not(:disabled)",
    ".figma-case-prototype-label",
  ].join(","))).filter((target) => (
    !target.matches(":disabled")
    && (!target.matches(".fp-home-selected-list .fp-project-row") || window.matchMedia("(max-width: 1024px)").matches)
  ));

  const cleanups = targets.map((target) => {
    const inner = target.classList.contains("fp-floating-menu") || target.classList.contains("fp-mobile-top-menu") ? null : target.querySelector<HTMLElement>("span, small, img");
    const strength = target.matches(".fp-expertise__row > button, .fp-home-selected-list .fp-project-row")
      ? 0.025
      : target.classList.contains("figma-case-round-button")
      ? 0.16
      : target.matches(".fp-side-nav__panel a, .fp-side-nav__panel .fp-side-nav__llm")
        ? 0.14
        : target.classList.contains("fp-mobile-top-menu")
          ? 0.1
          : 0.22;
    const needsOutsideGuard = target.classList.contains("fp-mobile-top-menu");
    let isMagneticActive = false;

    function onMove(event: MouseEvent) {
      isMagneticActive = true;
      const rect = target.getBoundingClientRect();
      const relX = event.clientX - rect.left - rect.width / 2;
      const relY = event.clientY - rect.top - rect.height / 2;
      gsap.to(target, { x: relX * strength, y: relY * strength, duration: 0.45, ease: "power3.out" });
      if (inner) gsap.to(inner, { x: relX * strength * 0.35, y: relY * strength * 0.35, duration: 0.45, ease: "power3.out" });
    }

    function onLeave() {
      isMagneticActive = false;
      gsap.to(target, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.42)" });
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.42)" });
    }

    function onDocumentMove(event: MouseEvent) {
      if (!needsOutsideGuard || !isMagneticActive) return;
      const rect = target.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) onLeave();
    }

    function onDown() {
      target.classList.add("is-pressed");
      gsap.to(target, { scale: 0.96, duration: 0.12, ease: "power2.out" });
    }

    function onUp() {
      target.classList.remove("is-pressed");
      gsap.to(target, { scale: 1, duration: 0.28, ease: "power3.out" });
    }

    target.classList.add("fp-magnetic");
    target.addEventListener("mousemove", onMove);
    target.addEventListener("mouseleave", onLeave);
    target.addEventListener("pointerleave", onLeave);
    target.addEventListener("pointerdown", onDown);
    target.addEventListener("pointerup", onUp);
    target.addEventListener("pointercancel", onUp);
    if (needsOutsideGuard) document.addEventListener("mousemove", onDocumentMove);

    return () => {
      target.classList.remove("fp-magnetic", "is-pressed");
      target.removeEventListener("mousemove", onMove);
      target.removeEventListener("mouseleave", onLeave);
      target.removeEventListener("pointerleave", onLeave);
      target.removeEventListener("pointerdown", onDown);
      target.removeEventListener("pointerup", onUp);
      target.removeEventListener("pointercancel", onUp);
      if (needsOutsideGuard) document.removeEventListener("mousemove", onDocumentMove);
      gsap.set(target, { clearProps: "transform" });
      if (inner) gsap.set(inner, { clearProps: "transform" });
    };
  });

  const nextCaseCleanups = window.matchMedia("(min-width: 1025px)").matches
    ? Array.from(document.querySelectorAll<HTMLElement>(".figma-case-footer__next-zone")).map((zone) => {
    const button = zone.querySelector<HTMLElement>(".figma-case-footer__button");
    if (!button) return () => {};
    let isOutsideTracking = false;
    let exitScale = 0;
    gsap.set(button, { opacity: 1, scale: 0, transformOrigin: "center center" });

    function getCursorTarget(event: MouseEvent) {
      const zoneRect = zone.getBoundingClientRect();
      const scaleX = zone.offsetWidth ? zoneRect.width / zone.offsetWidth : 1;
      const scaleY = zone.offsetHeight ? zoneRect.height / zone.offsetHeight : scaleX;
      const buttonCenterX = button.offsetLeft + button.offsetWidth / 2;
      const buttonCenterY = button.offsetTop + button.offsetHeight / 2;
      return {
        x: (event.clientX - zoneRect.left) / scaleX - buttonCenterX,
        y: (event.clientY - zoneRect.top) / scaleY - buttonCenterY,
        zoneRect,
      };
    }

    function isInsideZone(event: MouseEvent) {
      const rect = zone.getBoundingClientRect();
      return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    }

    function moveButtonToCursor(event: MouseEvent, duration = 0.5) {
      if (isOutsideTracking || !isInsideZone(event)) return;
      const target = getCursorTarget(event);
      gsap.to(button, { x: target.x, y: target.y, scale: 1, duration, ease: "power3.out" });
    }

    function onEnter(event: MouseEvent) {
      if (!isInsideZone(event)) return;
      isOutsideTracking = false;
      exitScale = 1;
      window.removeEventListener("mousemove", onOutsideMove);
      moveButtonToCursor(event, 0.18);
    }

    function onMove(event: MouseEvent) {
      if (!isInsideZone(event)) return;
      moveButtonToCursor(event);
    }

    function onOutsideMove(event: MouseEvent) {
      const target = getCursorTarget(event);
      const outsideX = Math.max(target.zoneRect.left - event.clientX, 0, event.clientX - target.zoneRect.right);
      const outsideY = Math.max(target.zoneRect.top - event.clientY, 0, event.clientY - target.zoneRect.bottom);
      const outsideDistance = Math.hypot(outsideX, outsideY);
      const progress = Math.min(outsideDistance / 95, 1);
      exitScale = Math.min(exitScale, 1 - progress);

      gsap.to(button, {
        x: target.x,
        y: target.y,
        scale: exitScale,
        duration: 0.16,
        ease: "power2.out",
      });

      if (progress >= 1 || exitScale <= 0.01) {
        isOutsideTracking = false;
        exitScale = 0;
        window.removeEventListener("mousemove", onOutsideMove);
        gsap.killTweensOf(button);
        gsap.set(button, { scale: 0 });
      }
    }

    function onLeave(event: MouseEvent) {
      isOutsideTracking = true;
      exitScale = Number(gsap.getProperty(button, "scale")) || 1;
      window.addEventListener("mousemove", onOutsideMove);
      onOutsideMove(event);
      window.setTimeout(() => {
        if (!isOutsideTracking) return;
        isOutsideTracking = false;
        exitScale = 0;
        window.removeEventListener("mousemove", onOutsideMove);
        gsap.to(button, { scale: 0, duration: 0.18, ease: "power3.in" });
      }, 260);
    }

    zone.addEventListener("mouseenter", onEnter);
    zone.addEventListener("mousemove", onMove);
    zone.addEventListener("mouseleave", onLeave);

    return () => {
      zone.removeEventListener("mouseenter", onEnter);
      zone.removeEventListener("mousemove", onMove);
      zone.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onOutsideMove);
      gsap.set(button, { clearProps: "x,y,scale,opacity,visibility,transformOrigin" });
    };
  })
    : [];

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    nextCaseCleanups.forEach((cleanup) => cleanup());
  };
}

function setupCalmotionSeeMoreEye() {
  if (reducedMotion() || !window.matchMedia("(min-width: 1025px)").matches) return () => {};

  const pill = document.querySelector<HTMLElement>(".figma-case-screen-pill--cal");
  const eye = pill?.querySelector<HTMLImageElement>("img");
  if (!pill || !eye) return () => {};

  function onClick() {
    gsap.killTweensOf(eye);
    gsap.timeline()
      .to(eye, {
        x: 4.8,
        y: -4.8,
        scale: 1.08,
        duration: 0.16,
        ease: "power3.out",
      })
      .to(eye, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "elastic.out(1, 0.42)",
      });
  }

  pill.addEventListener("click", onClick);

  return () => {
    pill.removeEventListener("click", onClick);
    gsap.killTweensOf(eye);
    gsap.set(eye, { clearProps: "transform" });
  };
}

function setupWorkCursorPreview() {
  if (reducedMotion() || !window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches) return () => {};

  const rows = Array.from(document.querySelectorAll<HTMLElement>(".fp-project-row[data-work-preview]"));
  if (!rows.length) return () => {};

  const cursor = document.createElement("div");
  cursor.className = "fp-project-cursor";
  const strip = document.createElement("div");
  strip.className = "fp-project-cursor__strip";
  rows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "fp-project-cursor__item";
    if (row.dataset.workPreviewSlug) item.dataset.previewSlug = row.dataset.workPreviewSlug;
    item.style.setProperty("--preview-frame-bg", row.dataset.workPreviewFrame || "#d6d4ce");

    const image = document.createElement("img");
    image.alt = "";
    image.src = row.dataset.workPreview || "";

    item.appendChild(image);
    strip.appendChild(item);
  });
  cursor.appendChild(strip);
  cursor.insertAdjacentHTML("beforeend", "<span>View</span>");
  document.body.appendChild(cursor);

  gsap.set(cursor, { xPercent: 0, yPercent: 0, x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const lists = Array.from(new Set(rows.map((row) => row.closest(".fp-work-list")).filter(Boolean)));
  let activeList: Element | null = null;
  let activeRow: HTMLElement | null = null;
  let pointerX = -1;
  let pointerY = -1;
  let trackingFrame = 0;

  function isDrawerOpen() {
    return Boolean(document.querySelector(".fp-side-nav.is-open, .dare-llm.is-open"));
  }

  function listRows(list: Element) {
    return rows.filter((row) => row.closest(".fp-work-list") === list);
  }

  function listBandRect(list: Element) {
    const scopedRows = listRows(list);
    const firstHit = scopedRows[0]?.querySelector<HTMLElement>(".fp-project-row__hit");
    const lastHit = scopedRows[scopedRows.length - 1]?.querySelector<HTMLElement>(".fp-project-row__hit");
    if (!firstHit || !lastHit) return null;
    const firstRect = firstHit.getBoundingClientRect();
    const lastRect = lastHit.getBoundingClientRect();
    return {
      top: firstRect.top,
      right: firstRect.right,
      bottom: lastRect.bottom,
      left: firstRect.left,
      height: lastRect.bottom - firstRect.top,
    };
  }

  function isInsideBand(event: MouseEvent | PointerEvent, list: Element) {
    const rect = listBandRect(list);
    if (!rect) return false;
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  }

  function activateRow(row: HTMLElement) {
    const list = row.closest(".fp-work-list");
    if (!list) return;
    const rowIndex = rows.indexOf(row);
    if (activeRow === row && activeList === list) return;
    list.querySelectorAll(".fp-project-row.is-preview-active").forEach((currentRow) => {
      if (currentRow !== row) currentRow.classList.remove("is-preview-active");
    });
    row.classList.add("is-preview-active");
    list.classList.add("is-previewing");
    cursor.classList.add("is-active");
    activeRow = row;
    gsap.to(strip, { y: `${rowIndex * -100}%`, duration: 0.62, ease: "power3.inOut", overwrite: "auto" });
  }

  function moveCursor(event: MouseEvent | PointerEvent) {
    const rect = cursor.getBoundingClientRect();
    gsap.to(cursor, { x: event.clientX - rect.width * 0.34, y: event.clientY - rect.height * 0.32, duration: 0.55, ease: "power3.out" });
  }

  function showCursor(event: MouseEvent | PointerEvent, list: Element) {
    if (activeList && activeList !== list) hideCursor(activeList);
    activeList = list;
    list.classList.add("is-previewing");
    cursor.classList.add("is-active");
    moveCursor(event);
    gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: 0.28, ease: "power3.out", overwrite: "auto" });
  }

  function hideCursor(list: Element) {
    list.classList.remove("is-previewing");
    listRows(list).forEach((row) => row.classList.remove("is-preview-active"));
    if (activeList === list) activeList = null;
    activeRow = null;
    cursor.classList.remove("is-active");
    gsap.to(cursor, { autoAlpha: 0, scale: 0.86, duration: 0.12, ease: "power2.out", overwrite: "auto" });
  }

  function handlePointer(event: MouseEvent | PointerEvent) {
    if (isDrawerOpen()) {
      if (activeList) hideCursor(activeList);
      return;
    }

    const list = lists.find((candidate) => isInsideBand(event, candidate));
    if (!list) {
      if (activeList) hideCursor(activeList);
      return;
    }

    if (activeList !== list) showCursor(event, list);
    const rect = listBandRect(list);
    const scopedRows = listRows(list);
    if (rect && scopedRows.length) {
      const rowHeight = rect.height / scopedRows.length;
      const activeIndex = Math.min(scopedRows.length - 1, Math.max(0, Math.floor((event.clientY - rect.top) / rowHeight)));
      activateRow(scopedRows[activeIndex]);
    }
    moveCursor(event);
  }

  function flushPointer() {
    trackingFrame = 0;
    if (pointerX < 0 || pointerY < 0) return;
    const event = { clientX: pointerX, clientY: pointerY } as MouseEvent;
    handlePointer(event);
  }

  function onDocumentMove(event: PointerEvent) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!trackingFrame) trackingFrame = window.requestAnimationFrame(flushPointer);
  }

  function onDocumentLeave() {
    if (activeList) hideCursor(activeList);
    pointerX = -1;
    pointerY = -1;
  }

  document.addEventListener("pointermove", onDocumentMove);
  document.addEventListener("pointerleave", onDocumentLeave);
  window.addEventListener("blur", onDocumentLeave);
  window.addEventListener("scroll", flushPointer, { passive: true });

  const listCleanups = lists.map((list) => {
    function onListMove(event: MouseEvent | PointerEvent) {
      handlePointer(event);
    }

    function onListLeave(event: MouseEvent | PointerEvent) {
      if (event.relatedTarget instanceof Node && list.contains(event.relatedTarget)) return;
      if (!isInsideBand(event, list) && activeList === list) hideCursor(list);
    }

    list.addEventListener("pointermove", onListMove);
    list.addEventListener("pointerleave", onListLeave);

    return () => {
      if (activeList === list) activeList = null;
      list.classList.remove("is-previewing");
      list.removeEventListener("pointermove", onListMove);
      list.removeEventListener("pointerleave", onListLeave);
    };
  });

  const cleanups = rows.map((row) => {
    return () => {
      row.classList.remove("is-preview-active");
    };
  });

  return () => {
    if (trackingFrame) window.cancelAnimationFrame(trackingFrame);
    document.removeEventListener("pointermove", onDocumentMove);
    document.removeEventListener("pointerleave", onDocumentLeave);
    window.removeEventListener("blur", onDocumentLeave);
    window.removeEventListener("scroll", flushPointer);
    listCleanups.forEach((cleanup) => cleanup());
    cleanups.forEach((cleanup) => cleanup());
    cursor.remove();
  };
}

function setupGridPreviewButtons() {
  if (reducedMotion() || !window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches) return () => {};

  const figures = Array.from(document.querySelectorAll<HTMLElement>(".fp-work-grid__card figure"));
  const cleanups = figures.map((figure) => {
    const button = figure.querySelector<HTMLElement>(".fp-work-grid__view");
    if (!button) return () => {};

    let isOutsideTracking = false;
    let exitScale = 0;
    gsap.set(button, { opacity: 1, scale: 0, x: 0, y: 0, transformOrigin: "center center" });

    function getCursorTarget(event: MouseEvent) {
      const rect = figure.getBoundingClientRect();
      const buttonCenterX = rect.width / 2;
      const buttonCenterY = rect.height / 2;
      return {
        x: event.clientX - rect.left - buttonCenterX,
        y: event.clientY - rect.top - buttonCenterY,
        rect,
      };
    }

    function isInsideFigure(event: MouseEvent) {
      const rect = figure.getBoundingClientRect();
      return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    }

    function moveButtonToCursor(event: MouseEvent, duration = 0.45) {
      if (isOutsideTracking || !isInsideFigure(event)) return;
      const target = getCursorTarget(event);
      gsap.to(button, { x: target.x, y: target.y, scale: 1, duration, ease: "power3.out" });
    }

    function onEnter(event: MouseEvent) {
      if (!isInsideFigure(event)) return;
      isOutsideTracking = false;
      exitScale = 1;
      window.removeEventListener("mousemove", onOutsideMove);
      moveButtonToCursor(event, 0.18);
    }

    function onMove(event: MouseEvent) {
      if (!isInsideFigure(event)) return;
      moveButtonToCursor(event);
    }

    function onOutsideMove(event: MouseEvent) {
      const target = getCursorTarget(event);
      const outsideX = Math.max(target.rect.left - event.clientX, 0, event.clientX - target.rect.right);
      const outsideY = Math.max(target.rect.top - event.clientY, 0, event.clientY - target.rect.bottom);
      const outsideDistance = Math.hypot(outsideX, outsideY);
      const progress = Math.min(outsideDistance / 80, 1);
      exitScale = Math.min(exitScale, 1 - progress);

      gsap.to(button, {
        x: target.x,
        y: target.y,
        scale: exitScale,
        duration: 0.14,
        ease: "power2.out",
      });

      if (progress >= 1 || exitScale <= 0.01) {
        isOutsideTracking = false;
        exitScale = 0;
        window.removeEventListener("mousemove", onOutsideMove);
        gsap.killTweensOf(button);
        gsap.set(button, { scale: 0 });
      }
    }

    function onLeave(event: MouseEvent) {
      isOutsideTracking = true;
      exitScale = Number(gsap.getProperty(button, "scale")) || 1;
      window.addEventListener("mousemove", onOutsideMove);
      onOutsideMove(event);
      window.setTimeout(() => {
        if (!isOutsideTracking) return;
        isOutsideTracking = false;
        exitScale = 0;
        window.removeEventListener("mousemove", onOutsideMove);
        gsap.to(button, { scale: 0, duration: 0.16, ease: "power3.in" });
      }, 240);
    }

    figure.addEventListener("mouseenter", onEnter);
    figure.addEventListener("mousemove", onMove);
    figure.addEventListener("mouseleave", onLeave);

    return () => {
      figure.removeEventListener("mouseenter", onEnter);
      figure.removeEventListener("mousemove", onMove);
      figure.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onOutsideMove);
      gsap.killTweensOf(button);
      gsap.set(button, { clearProps: "opacity,scale,x,y,transform" });
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function setupHomeGalleryParallax() {
  if (reducedMotion()) return () => {};

  const gallery = document.querySelector<HTMLElement>(".fp-gallery");
  const topRow = document.querySelector<HTMLElement>(".fp-gallery__row--top");
  const bottomRow = document.querySelector<HTMLElement>(".fp-gallery__row--bottom");
  if (!gallery || !topRow || !bottomRow) return () => {};

  gsap.set(topRow, { x: 0, willChange: "transform" });
  gsap.set(bottomRow, { x: 0, willChange: "transform" });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: gallery,
      start: "top 96%",
      end: "bottom 4%",
      scrub: 1.15,
      toggleActions: "play reverse play reverse",
    },
  });

  timeline
    .to(topRow, { x: -140, duration: 1, ease: "none" }, 0)
    .to(bottomRow, { x: 140, duration: 1, ease: "none" }, 0);

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    gsap.set([topRow, bottomRow], { clearProps: "transform,willChange" });
  };
}

function setupFloatingHamburger() {
  const button = document.querySelector<HTMLElement>(".fp-floating-menu");
  if (!button) return () => {};

  let lastY = window.scrollY;
  let isVisible = false;
  let raf = 0;
  let isPointerInside = false;

  function revealDistance() {
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    if (path === "/") return Math.max(window.innerHeight * 1.05, 980);
    return Math.max(window.innerHeight * 0.55, 520);
  }

  function setVisible(nextVisible: boolean, immediate = false) {
    if (nextVisible === isVisible && !immediate) return;
    isVisible = nextVisible;
    button.classList.toggle("is-visible", isVisible);
    button.toggleAttribute("data-floating-visible", isVisible);
    gsap.to(button, {
      autoAlpha: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0,
      pointerEvents: isVisible ? "auto" : "none",
      duration: immediate || reducedMotion() ? 0 : isVisible ? 0.34 : 0.24,
      ease: "power3.out",
      overwrite: "auto",
    });
  }

  function update() {
    raf = 0;
    const currentY = window.scrollY;
    const delta = currentY - lastY;
    const isMobile = window.innerWidth <= 575;
    const farEnough = currentY > revealDistance();
    const scrollingUp = delta < -2;
    const scrollingDown = delta > 2;

    button.toggleAttribute("data-mobile-top", isMobile && !farEnough && !button.classList.contains("is-open"));

    if (isPointerInside || button.classList.contains("is-open")) setVisible(true);
    else if (!farEnough || scrollingDown) setVisible(false);
    else if (scrollingUp) setVisible(true);

    lastY = currentY;
  }

  function scheduleUpdate() {
    if (!raf) raf = window.requestAnimationFrame(update);
  }

  function onPointerEnter() {
    isPointerInside = true;
    setVisible(true);
  }

  function onPointerLeave() {
    isPointerInside = false;
    scheduleUpdate();
  }

  gsap.set(button, { autoAlpha: 0, scale: 0, pointerEvents: "none", transformOrigin: "center center" });
  ScrollTrigger.addEventListener("refreshInit", scheduleUpdate);
  activeLenis?.on("scroll", scheduleUpdate);
  button.addEventListener("pointerenter", onPointerEnter);
  button.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  update();

  return () => {
    window.cancelAnimationFrame(raf);
    gsap.killTweensOf(button);
    ScrollTrigger.removeEventListener("refreshInit", scheduleUpdate);
    activeLenis?.off("scroll", scheduleUpdate);
    button.removeEventListener("pointerenter", onPointerEnter);
    button.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    button.classList.remove("is-visible");
    button.removeAttribute("data-floating-visible");
    button.removeAttribute("data-mobile-top");
    gsap.set(button, { clearProps: "opacity,visibility,transform,pointerEvents" });
  };
}

function setupScrollReveals() {
  if (reducedMotion()) return () => {};

  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/case/")) return () => {};

  const selectors = [
    ".fp-home-hello",
    ".fp-location",
    ".fp-home-role",
    ".fp-home-intro__lead",
    ".fp-home-intro__body",
    ".fp-home-about",
    ".fp-project-row__title",
    ".fp-project-row__category",
    ".fp-action-pill",
    ".fp-work-intro h1",
    ".fp-filter",
    ".fp-about-headline h1",
    ".fp-about-portrait",
    ".fp-about-copy > p",
    ".fp-about-location",
    ".fp-pillars article",
    ".fp-away",
    ".fp-footer__cta",
    ".fp-footer__arrow",
    ".fp-pill",
    ".fp-footer__button",
  ];
  const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(",")));
  const triggers: ScrollTrigger[] = [];

  elements.forEach((element, index) => {
    gsap.set(element, { autoAlpha: 0, y: 10, willChange: "transform, opacity" });
    const tween = gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.34,
      delay: index < 4 ? index * 0.015 : 0,
      ease: "power2.out",
      clearProps: "opacity,visibility,transform,willChange",
      scrollTrigger: {
        trigger: element,
        start: "top 94%",
        toggleActions: "play reverse play reverse",
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    elements.forEach((element) => gsap.set(element, { clearProps: "opacity,visibility,transform,willChange" }));
  };
}

function setupSectionUncovers() {
  if (reducedMotion()) return () => {};

  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const isCase = path.startsWith("/case/");
  const footer = findVisibleElement(isCase ? ".figma-case-footer, .figma-calmotion-mobile-layout > .figma-ica-responsive-footer" : ".fp-footer");
  const promoSections = Array.from(document.querySelectorAll<HTMLElement>([
    ".figma-calmotion-promo",
    ".figma-climate-promo",
  ].join(",")));
  const triggers: ScrollTrigger[] = [];
  const animated = new Set<HTMLElement>();

  promoSections.forEach((section) => {
    animated.add(section);
    gsap.set(section, {
      opacity: 0,
      y: 32,
      scale: 1.14,
      transformOrigin: "center center",
      willChange: "opacity, transform",
    });

    const tween = gsap.to(section, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 96%",
        toggleActions: "play reverse play reverse",
      },
    });

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  if (footer) {
    const footerTop = footer.offsetTop;
    const mobileHomeFooterSource = window.innerWidth <= 575 && path === "/"
      ? document.querySelector<HTMLElement>(".fp-home-mobile-work")
      : null;
    const tabletCaseFooterSource = window.innerWidth >= 576 && window.innerWidth <= 1024 && (
      path === "/case/climate-hub" || path === "/case/landa"
    )
      ? document.querySelector<HTMLElement>(".figma-case-mockups")
      : null;
    const fallbackFooterMockup = Array.from(document.querySelectorAll<HTMLElement>([
      ".figma-case-mockups",
      ".figma-case-screen-panel",
      ".figma-ica-mobile-screens--dark",
      ".figma-ica-mobile-screens--calmotion",
      ".figma-ica-mobile-screens--safemap",
      ".figma-calmotion-responsive-phase--deliver",
      ".figma-case-mobile-mockups",
      ".figma-climate-mobile-screens",
      ".figma-landa-mobile-screens",
      ".fp-home-mobile-work",
      ".fp-expertise",
      ".fp-gallery",
      ".fp-work-list",
      ".fp-work-grid-shell",
      ".fp-about-gallery",
    ].join(",")))
      .filter((section) => {
        const style = window.getComputedStyle(section);
        const rect = section.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.height > 1 && section.offsetHeight > 1 && section.offsetTop < footerTop;
      })
      .sort((a, b) => (b.offsetTop + b.offsetHeight) - (a.offsetTop + a.offsetHeight))[0];
    const disableResponsiveFooterReveal = window.innerWidth <= 1024;
    const footerMockup = disableResponsiveFooterReveal
      ? null
      : mobileHomeFooterSource && mobileHomeFooterSource.offsetHeight > 1
        ? mobileHomeFooterSource
        : tabletCaseFooterSource ?? fallbackFooterMockup;

    if (disableResponsiveFooterReveal) {
      gsap.set(footer, { clearProps: "transform,willChange" });
    } else {
      animated.add(footer);
      gsap.set(footer, {
        y: 170,
        willChange: "transform",
      });
      if (footerMockup) {
        animated.add(footerMockup);
        footerMockup.classList.add("fp-footer-mask-source");
        gsap.set(footerMockup, {
          "--fp-footer-extension-scale": 1,
          "--fp-footer-extension-offset": `${Math.max(0, footerTop - (footerMockup.offsetTop + footerMockup.offsetHeight))}px`,
          "--fp-footer-mask-bg": getFooterMaskBackground(footerMockup),
          willChange: "transform",
        });
      }

      const isCalmotionResponsiveFooter = footer.matches(".figma-calmotion-mobile-layout > .figma-ica-responsive-footer");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: isCalmotionResponsiveFooter ? "top 116%" : "top 108%",
          end: isCalmotionResponsiveFooter ? "top 72%" : "top 48%",
          scrub: isCalmotionResponsiveFooter ? 1 : 1.35,
          toggleActions: "play reverse play reverse",
        },
      });

      timeline.to(footer, { y: 0, duration: 1, ease: "none" }, 0);
      if (footerMockup) {
        timeline.to(footerMockup, { "--fp-footer-extension-scale": 0, duration: 1, ease: "none" }, 0);
      }

      if (timeline.scrollTrigger) triggers.push(timeline.scrollTrigger);
    }
  }

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    animated.forEach((section) => {
      section.classList.remove("fp-footer-mask-source");
      gsap.set(section, { clearProps: "opacity,transform,transformOrigin,clipPath,willChange,borderBottomLeftRadius,borderBottomRightRadius,--fp-footer-extension-scale,--fp-footer-extension-offset,--fp-footer-mask-bg" });
    });
  };
}

function findVisibleElement(selector: string) {
  return Array.from(document.querySelectorAll<HTMLElement>(selector)).find((element) => {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && rect.height > 1 && element.offsetHeight > 1;
  }) ?? null;
}

function setupContinuousPromoVideos() {
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>([
    ".figma-calmotion-promo video",
    ".figma-climate-promo video",
  ].join(",")));
  if (!videos.length) return () => {};

  const playVideo = (video: HTMLVideoElement) => {
    if (video.ended) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    if (video.paused) video.play().catch(() => {});
  };

  videos.forEach((video) => {
    video.preload = "auto";
    playVideo(video);
  });

  const onPause = (event: Event) => {
    const video = event.currentTarget as HTMLVideoElement;
    window.setTimeout(() => playVideo(video), 0);
  };
  const onVisibilityChange = () => videos.forEach(playVideo);
  const onScroll = () => videos.forEach(playVideo);
  const interval = window.setInterval(() => videos.forEach(playVideo), 1000);

  videos.forEach((video) => video.addEventListener("pause", onPause));
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("focus", onVisibilityChange);
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.clearInterval(interval);
    videos.forEach((video) => video.removeEventListener("pause", onPause));
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("focus", onVisibilityChange);
    window.removeEventListener("scroll", onScroll);
  };
}

function getFooterMaskBackground(source: HTMLElement) {
  if (source.matches(".figma-case-screen-panel")) {
    const mockupSection = source.parentElement?.querySelector<HTMLElement>(".figma-case-mockups");
    const mockupStyle = mockupSection ? window.getComputedStyle(mockupSection) : null;
    const mockupColor = mockupStyle && mockupStyle.display !== "none" ? mockupStyle.backgroundColor : "";
    if (mockupColor && mockupColor !== "rgba(0, 0, 0, 0)" && mockupColor !== "transparent") return mockupColor;
    const parentColor = source.parentElement ? window.getComputedStyle(source.parentElement).backgroundColor : "";
    if (parentColor && parentColor !== "rgba(0, 0, 0, 0)" && parentColor !== "transparent") return parentColor;
  }

  const color = window.getComputedStyle(source).backgroundColor;
  if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") return color;
  return "#fff";
}

function getOutgoingBackground(footer: HTMLElement) {
  const footerTop = footer.offsetTop;
  const candidates = Array.from(document.querySelectorAll<HTMLElement>([
    ".fp-home-mobile-work",
    ".fp-gallery",
    ".fp-work-list",
    ".fp-about-gallery",
    ".figma-case-mockups",
    ".figma-case-screen-panel",
    ".figma-case-prototype",
    ".figma-calmotion-hud",
    ".figma-case-export",
    ".figma-climate-prototype-two",
    ".figma-climate-mobile-screens",
    ".figma-landa-prototype-two",
    ".figma-landa-mobile-screens",
  ].join(",")))
    .filter((candidate) => {
      const style = window.getComputedStyle(candidate);
      const rect = candidate.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.height > 1 && candidate.offsetHeight > 1 && candidate.offsetTop < footerTop;
    })
    .sort((a, b) => (b.offsetTop + b.offsetHeight) - (a.offsetTop + a.offsetHeight));

  for (const candidate of candidates) {
    const color = window.getComputedStyle(candidate).backgroundColor;
    if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") return color;
  }

  return window.getComputedStyle(document.body).backgroundColor || "#fff";
}

function setupFooterCtaMotion() {
  if (reducedMotion()) return () => {};

  const footer = document.querySelector<HTMLElement>(".fp-footer");
  const button = footer?.querySelector<HTMLElement>(".fp-footer__button");
  const arrow = footer?.querySelector<HTMLElement>(".fp-footer__arrow");
  if (!footer || !button || !arrow) return () => {};

  const buttonLeft = Number.parseFloat(window.getComputedStyle(button).left);
  const buttonStartLeft = buttonLeft - 51;
  const buttonCenterY = button.offsetTop + button.offsetHeight / 2;
  const arrowCenterX = arrow.offsetLeft + arrow.offsetWidth / 2;
  const arrowCenterY = arrow.offsetTop + arrow.offsetHeight / 2;
  const finalButtonCenterX = buttonLeft + button.offsetWidth / 2;
  const startButtonCenterX = buttonStartLeft + button.offsetWidth / 2;
  const finalAim = Math.atan2(buttonCenterY - arrowCenterY, finalButtonCenterX - arrowCenterX);
  const startAim = Math.atan2(buttonCenterY - arrowCenterY, startButtonCenterX - arrowCenterX);
  const arrowStartRotation = 180 + ((startAim - finalAim) * 180) / Math.PI;
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: "top 88%",
      end: "max",
      scrub: 1.35,
      toggleActions: "play reverse play reverse",
    },
  });

  timeline
    .fromTo(button, { left: buttonStartLeft }, { left: buttonLeft, duration: 1, ease: "none" }, 0)
    .fromTo(arrow, { rotation: arrowStartRotation }, { rotation: 180, duration: 1, ease: "none" }, 0);

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    gsap.set(button, { clearProps: "left" });
    gsap.set(arrow, { clearProps: "rotate,rotation,transform" });
  };
}

export function usePortfolioInteractions(path: string, navigate: Navigate) {
  useEffect(() => setupPageTransitions(navigate), [navigate]);
  useEffect(() => {
    setupLenis();
    window.addEventListener("beforeunload", destroyLenis);
    return () => window.removeEventListener("beforeunload", destroyLenis);
  }, []);

  useEffect(() => {
    let cleanup = () => {};
    let raf = 0;
    const setupTimers: number[] = [];

    function setup() {
      cleanup();
      setupLenis();
      const cleanMagnetic = setupMagneticTargets();
      const cleanPreview = setupWorkCursorPreview();
      const cleanGridPreview = setupGridPreviewButtons();
      const cleanGalleryParallax = setupHomeGalleryParallax();
      const cleanFloatingHamburger = setupFloatingHamburger();
      const cleanUncovers = setupSectionUncovers();
      const cleanContinuousPromoVideos = setupContinuousPromoVideos();
      const cleanFooterCtaMotion = setupFooterCtaMotion();
      const cleanCalmotionSeeMoreEye = setupCalmotionSeeMoreEye();
      ScrollTrigger.refresh();
      cleanup = () => {
        cleanMagnetic();
        cleanPreview();
        cleanGridPreview();
        cleanGalleryParallax();
        cleanFloatingHamburger();
        cleanUncovers();
        cleanContinuousPromoVideos();
        cleanFooterCtaMotion();
        cleanCalmotionSeeMoreEye();
      };
    }

    function scheduleSetup() {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(setup);
      setupTimers.forEach((timer) => window.clearTimeout(timer));
      setupTimers.length = 0;
      setupTimers.push(window.setTimeout(setup, 250));
      setupTimers.push(window.setTimeout(setup, 900));
    }

    scheduleSetup();
    window.addEventListener("portfolio:refresh-interactions", scheduleSetup);

    return () => {
      window.cancelAnimationFrame(raf);
      setupTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("portfolio:refresh-interactions", scheduleSetup);
      cleanup();
    };
  }, [path]);
}
