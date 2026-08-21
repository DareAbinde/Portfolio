import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ChangeEvent, type FormEvent, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import Hls from "hls.js";
import { DareLlm } from "./components/DareLlm";
import homePortrait from "../assets/final-portfolio/home/portrait.png";
import galleryIcaTop from "../assets/final-portfolio/home/gallery-ica-top.png";
import gallerySafemapTop from "../assets/final-portfolio/home/gallery-safemap-top.png";
import cmThumbnail from "../assets/final-portfolio/home/cm-thumbnail.png";
import chThumbnail from "../assets/final-portfolio/home/ch-thumbnail.png";
import chMacFigmaSource from "../assets/final-portfolio/home/ch-mac-figma-source.png";
import galleryIcaBottomLeft from "../assets/final-portfolio/home/gallery-ica-bottom-left.png";
import galleryIcaBottomRight from "../assets/final-portfolio/home/gallery-ica-bottom-right.png";
import gallerySafemapBottom from "../assets/final-portfolio/home/gallery-safemap-bottom.png";
import europe from "../assets/final-portfolio/ui/europe.png";
import arrowUpRight from "../assets/final-portfolio/ui/arrow-up-right.svg";
import arrowUpRightWhite from "../assets/final-portfolio/ui/arrow-up-right-white.svg";
import cameraIcon from "../assets/final-portfolio/ui/camera-icon.svg";
import contactPortrait from "../assets/final-portfolio/ui/contact-portrait.png";
import globe from "../assets/final-portfolio/ui/globe.svg";
import locationPinWhite from "../assets/final-portfolio/ui/location-pin-white.svg";
import aboutPiano from "../assets/final-portfolio/about/piano.png";
import aboutWife from "../assets/final-portfolio/about/wife.png";
import aboutDesignProject from "../assets/final-portfolio/about/design-project.png";
import aboutWorkshop from "../assets/final-portfolio/about/workshop.png";
import icaHeroBg from "../assets/final-portfolio/cases/ica-hero-bg.png";
import icaHeroScreen from "../assets/final-portfolio/cases/ica-hero-screen.png";
import icaMockupBg from "../assets/final-portfolio/cases/ica-mockup-bg.png";
import icaMockupScreen1 from "../assets/final-portfolio/cases/ica-mockup-screen-1.png";
import icaMockupScreen2 from "../assets/final-portfolio/cases/ica-mockup-screen-2.png";
import icaApp1 from "../assets/final-portfolio/cases/ica-app-1.png";
import icaApp2 from "../assets/final-portfolio/cases/ica-app-2.png";
import calmotionHero from "../assets/final-portfolio/cases/calmotion-hero.png";
import calmotionCarBg from "../assets/final-portfolio/cases/calmotion-car-bg.png";
import calmotionPhone1 from "../assets/final-portfolio/cases/calmotion-phone-1.png";
import calmotionPhone2 from "../assets/final-portfolio/cases/calmotion-phone-2.png";
import calmotionPhone3 from "../assets/final-portfolio/cases/calmotion-phone-3.png";
import calmotionPhone4 from "../assets/final-portfolio/cases/calmotion-phone-4.png";
import calmotionPhone5 from "../assets/final-portfolio/cases/calmotion-phone-5.png";
import safemapHeroBg from "../assets/final-portfolio/cases/safemap-hero-bg.png";
import safemapHeroScreen from "../assets/final-portfolio/cases/safemap-hero-screen.png";
import safemapLaptop from "../assets/final-portfolio/cases/safemap-laptop.png";
import safemapPhone from "../assets/final-portfolio/cases/safemap-phone.png";
import safemapMap from "../assets/final-portfolio/cases/safemap-map.png";
import climateHeroBg from "../assets/final-portfolio/cases/climate-hero-bg.png";
import climateHeroScreen from "../assets/final-portfolio/cases/climate-hero-screen.png";
import climateMacBg from "../assets/final-portfolio/cases/climate-mac-bg.png";
import climateGuide from "../assets/final-portfolio/cases/climate-guide.png";
import climateEducation from "../assets/final-portfolio/cases/climate-education.png";
import climateMobileHero from "../assets/final-portfolio/cases/climate-mobile-hero.png";
import landaHeroBg from "../assets/final-portfolio/cases/landa-hero-bg.png";
import landaHeroScreen from "../assets/final-portfolio/cases/landa-hero-screen.png";
import landaMacBg from "../assets/final-portfolio/cases/landa-mac-bg.png";
import landaMobile1 from "../assets/final-portfolio/cases/landa-mobile-1.png";
import landaMobile2 from "../assets/final-portfolio/cases/landa-mobile-2.png";
import landaMobile3 from "../assets/final-portfolio/cases/landa-mobile-3.png";

declare global {
  interface Window {
    __portfolioMenuScroll?: number;
  }
}
import calArrowLeft4x from "../assets/final-portfolio/case-pages/cal-arrow-left-4x.png";
import calArrowRight4x from "../assets/final-portfolio/case-pages/cal-arrow-right-4x.png";
import calHeroFigma4x from "../assets/final-portfolio/case-pages/cal-hero-figma-4x.png";
import calHudFigma4x from "../assets/final-portfolio/case-pages/cal-hud-figma-4x.png";
import calHudFocusedFigma4x from "../assets/final-portfolio/case-pages/cal-hud-focused-figma-4x.png";
import calHudDistractedFigma4x from "../assets/final-portfolio/case-pages/cal-hud-distracted-figma-4x.png";
import calHudBg from "../assets/final-portfolio/case-pages/cal-hud-bg.png";
import calHudNext4x from "../assets/final-portfolio/case-pages/cal-hud-next-4x.png";
import calPrototypeFigma4x from "../assets/final-portfolio/case-pages/cal-prototype-figma-4x.png";
import calPrototypeVideo from "../assets/final-portfolio/case-pages/cm-prototype-video.mp4";
import calScreensStrip4x from "../assets/final-portfolio/case-pages/cal-screens-strip-4x.png";
import calSeeMoreIcon4x from "../assets/final-portfolio/case-pages/cal-see-more-icon-4x.png";
import calNextBluetooth4x from "../assets/final-portfolio/case-pages/cal-next-01-bluetooth-4x.png";
import calNextSettings4x from "../assets/final-portfolio/case-pages/cal-next-02-settings-4x.png";
import calNextSideMenu4x from "../assets/final-portfolio/case-pages/cal-next-03-side-menu-4x.png";
import calNextCalendar4x from "../assets/final-portfolio/case-pages/cal-next-04-calendar-4x.png";
import calNextSchedule4x from "../assets/final-portfolio/case-pages/cal-next-05-schedule-4x.png";
import calMobileScreen01Figma4x from "../assets/final-portfolio/case-pages/calmotion-mobile-screens/cm-01-4x.png";
import calMobileScreen02Figma4x from "../assets/final-portfolio/case-pages/calmotion-mobile-screens/cm-02-4x.png";
import calMobileScreen03Figma4x from "../assets/final-portfolio/case-pages/calmotion-mobile-screens/cm-03-4x.png";
import calTabletScreen01Figma4x from "../assets/final-portfolio/case-pages/calmotion-tablet-screens/01-4x.png";
import calTabletScreen02Figma4x from "../assets/final-portfolio/case-pages/calmotion-tablet-screens/02-4x.png";
import calTabletScreen03Figma4x from "../assets/final-portfolio/case-pages/calmotion-tablet-screens/03-4x.png";
import calTabletScreen04Figma4x from "../assets/final-portfolio/case-pages/calmotion-tablet-screens/04-4x.png";
import calTabletScreen05Figma4x from "../assets/final-portfolio/case-pages/calmotion-tablet-screens/05-4x.png";
import calTabletScreen06Figma4x from "../assets/final-portfolio/case-pages/calmotion-tablet-screens/06-4x.png";
import calmotionProcessPersona4x from "../assets/final-portfolio/case-pages/calmotion-process-persona-4x.png";
import calmotionProcessJourney4x from "../assets/final-portfolio/case-pages/calmotion-process-journey-4x.png";
import calmotionProcessFlow4x from "../assets/final-portfolio/case-pages/calmotion-process-flow-4x.png";
import calmotionProcessSketches4x from "../assets/final-portfolio/case-pages/calmotion-process-sketches-4x.png";
import calmotionProcessHudIa from "../assets/final-portfolio/case-pages/calmotion-process-hud-ia.png";
import calmotionProcessWoz from "../assets/final-portfolio/case-pages/calmotion-process-woz.png";
import calmotionResponsiveScreen01 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/01-get-started.png";
import calmotionResponsiveScreen02 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/02-verification.png";
import calmotionResponsiveScreen03 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/03-scan-id.png";
import calmotionResponsiveScreen04 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/04-home-page.png";
import calmotionResponsiveScreen05 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/05-moods-over-time.png";
import calmotionResponsiveScreen06 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/06-bluetooth.png";
import calmotionResponsiveScreen07 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/07-settings-page.png";
import calmotionResponsiveScreen08 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/08-side-menu.png";
import calmotionResponsiveScreen09 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/09-scheduling.png";
import calmotionResponsiveScreen10 from "../assets/final-portfolio/case-pages/calmotion-responsive/screens/10-my-schedule.png";
import icaDarkArrowLeft4x from "../assets/final-portfolio/case-pages/ica-dark-arrow-left-4x.png";
import icaDarkArrowRight4x from "../assets/final-portfolio/case-pages/ica-dark-arrow-right-4x.png";
import icaDarkModeIcon4x from "../assets/final-portfolio/case-pages/ica-dark-mode-icon-4x.png";
import icaHeroFigma4x from "../assets/final-portfolio/case-pages/ica-hero-figma-4x.png";
import icaLightArrowLeft4x from "../assets/final-portfolio/case-pages/ica-light-arrow-left-4x.png";
import icaLightArrowRight4x from "../assets/final-portfolio/case-pages/ica-light-arrow-right-4x.png";
import icaLightModeIcon4x from "../assets/final-portfolio/case-pages/ica-light-mode-icon-4x.png";
import icaLmPrototypeVideo from "../assets/final-portfolio/case-pages/ica-lm-prototype.mp4";
import icaMockup1Figma4x from "../assets/final-portfolio/case-pages/ica-mockup-1-figma-4x.png";
import icaNextDmLanguage4x from "../assets/final-portfolio/case-pages/ica-next-dm-01-language-4x.png";
import icaNextDmTransferOwn4x from "../assets/final-portfolio/case-pages/ica-next-dm-02-transfer-own-4x.png";
import icaNextDmTransferSomeone4x from "../assets/final-portfolio/case-pages/ica-next-dm-03-transfer-someone-4x.png";
import icaNextDmPaymentConfirmation4x from "../assets/final-portfolio/case-pages/ica-next-dm-04-payment-confirmation-4x.png";
import icaNextDmProfile4x from "../assets/final-portfolio/case-pages/ica-next-dm-05-profile-4x.png";
import icaNextLmLanguage4x from "../assets/final-portfolio/case-pages/ica-next-lm-01-language-4x.png";
import icaNextLmTransferOwn4x from "../assets/final-portfolio/case-pages/ica-next-lm-02-transfer-own-4x.png";
import icaNextLmTransferSomeone4x from "../assets/final-portfolio/case-pages/ica-next-lm-03-transfer-someone-4x.png";
import icaNextLmPaymentReview4x from "../assets/final-portfolio/case-pages/ica-next-lm-04-payment-review-4x.png";
import icaNextLmProfile4x from "../assets/final-portfolio/case-pages/ica-next-lm-05-profile-4x.png";
import icaPrototypeBg4x from "../assets/final-portfolio/case-pages/ica-prototype-bg-4x.png";
import icaPrototypePlayIcon4x from "../assets/final-portfolio/case-pages/ica-prototype-play-icon-4x.png";
import icaDmPrototypeVideo from "../assets/final-portfolio/case-pages/ica-dm-prototype.mp4";
import icaScreensDarkStrip4x from "../assets/final-portfolio/case-pages/ica-screens-dark-strip-4x.png";
import icaScreensLightStrip4x from "../assets/final-portfolio/case-pages/ica-screens-light-strip-4x.png";
import icaProcessResearch4x from "../assets/final-portfolio/case-pages/ica-process-research-4x.png";
import icaProcessJourney4x from "../assets/final-portfolio/case-pages/ica-process-journey-4x.png";
import icaProcessWireframes4x from "../assets/final-portfolio/case-pages/ica-process-wireframes-4x.png";
import icaMobileLightL01Figma4x from "../assets/final-portfolio/case-pages/ica-mobile-screens/light-l01-4x.png";
import icaMobileLightL02Figma4x from "../assets/final-portfolio/case-pages/ica-mobile-screens/light-l02-4x.png";
import icaMobileLightL03Figma4x from "../assets/final-portfolio/case-pages/ica-mobile-screens/light-l03-4x.png";
import icaMobileDarkD01Figma4x from "../assets/final-portfolio/case-pages/ica-mobile-screens/dark-d01-4x.png";
import icaMobileDarkD02Figma4x from "../assets/final-portfolio/case-pages/ica-mobile-screens/dark-d02-4x.png";
import icaMobileDarkD03Figma4x from "../assets/final-portfolio/case-pages/ica-mobile-screens/dark-d03-4x.png";
import icaTabletLight01Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/light/l01-4x.png";
import icaTabletLight02Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/light/l02-4x.png";
import icaTabletLight03Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/light/l03-4x.png";
import icaTabletLight04Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/light/l04-4x.png";
import icaTabletLight05Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/light/l05-4x.png";
import icaTabletLight06Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/light/l06-4x.png";
import icaTabletDark01Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/dark/d01-4x.png";
import icaTabletDark02Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/dark/d02-4x.png";
import icaTabletDark03Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/dark/d03-4x.png";
import icaTabletDark04Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/dark/d04-4x.png";
import icaTabletDark05Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/dark/d05-4x.png";
import icaTabletDark06Figma4x from "../assets/final-portfolio/case-pages/ica-tablet-screens/dark/d06-4x.png";
import icaResponsiveSwedishOnly from "../assets/final-portfolio/case-pages/ica-responsive/research/swedish-only.png";
import icaResponsiveNoLanguage from "../assets/final-portfolio/case-pages/ica-responsive/research/no-language.png";
import icaResponsiveChat1 from "../assets/final-portfolio/case-pages/ica-responsive/research/chat-1.png";
import icaResponsiveChat2 from "../assets/final-portfolio/case-pages/ica-responsive/research/chat-2.png";
import icaResponsiveJourneyTablet from "../assets/final-portfolio/case-pages/ica-responsive/journey-tablet.png";
import icaResponsiveJourneyMobile from "../assets/final-portfolio/case-pages/ica-responsive/journey-mobile.png";
import icaResponsiveWireframesTablet from "../assets/final-portfolio/case-pages/ica-responsive/wireframes-tablet.png";
import icaResponsiveWireframesMobile from "../assets/final-portfolio/case-pages/ica-responsive/wireframes-mobile.png";
import icaResponsiveMenuIcon from "../assets/final-portfolio/case-pages/ica-responsive/ui/menu.svg";
import icaResponsivePixelate1 from "../assets/final-portfolio/case-pages/ica-responsive/ui/pixelate-1.png";
import icaResponsivePixelate2 from "../assets/final-portfolio/case-pages/ica-responsive/ui/pixelate-2.png";
import icaResponsiveConfidenceTablet from "../assets/final-portfolio/case-pages/ica-responsive/wireframes/confidence-tablet.png";
import icaResponsiveConfidenceMobile from "../assets/final-portfolio/case-pages/ica-responsive/wireframes/confidence-mobile.png";
import icaResponsiveWireframe01 from "../assets/final-portfolio/case-pages/ica-responsive/wireframes/01.png";
import icaResponsiveWireframe02 from "../assets/final-portfolio/case-pages/ica-responsive/wireframes/02.png";
import icaResponsiveWireframe03 from "../assets/final-portfolio/case-pages/ica-responsive/wireframes/03.png";
import icaResponsiveWireframe04 from "../assets/final-portfolio/case-pages/ica-responsive/wireframes/04.png";
import icaResponsiveWireframe05 from "../assets/final-portfolio/case-pages/ica-responsive/wireframes/05.png";
import icaResponsiveLight01 from "../assets/final-portfolio/case-pages/ica-responsive/light/01-login.png";
import icaResponsiveLight02 from "../assets/final-portfolio/case-pages/ica-responsive/light/02-home.png";
import icaResponsiveLight03 from "../assets/final-portfolio/case-pages/ica-responsive/light/03-account.png";
import icaResponsiveLight04 from "../assets/final-portfolio/case-pages/ica-responsive/light/04-payment.png";
import icaResponsiveLight05 from "../assets/final-portfolio/case-pages/ica-responsive/light/05-settings.png";
import icaResponsiveLight06 from "../assets/final-portfolio/case-pages/ica-responsive/light/06-language.png";
import icaResponsiveLight07 from "../assets/final-portfolio/case-pages/ica-responsive/light/07-transfer-own.png";
import icaResponsiveLight08 from "../assets/final-portfolio/case-pages/ica-responsive/light/08-transfer-someone.png";
import icaResponsiveLight09 from "../assets/final-portfolio/case-pages/ica-responsive/light/09-review.png";
import icaResponsiveLight10 from "../assets/final-portfolio/case-pages/ica-responsive/light/10-profile.png";
import icaResponsiveDark01 from "../assets/final-portfolio/case-pages/ica-responsive/dark/01-login.png";
import icaResponsiveDark02 from "../assets/final-portfolio/case-pages/ica-responsive/dark/02-home.png";
import icaResponsiveDark03 from "../assets/final-portfolio/case-pages/ica-responsive/dark/03-account.png";
import icaResponsiveDark04 from "../assets/final-portfolio/case-pages/ica-responsive/dark/04-payment.png";
import icaResponsiveDark05 from "../assets/final-portfolio/case-pages/ica-responsive/dark/05-settings.png";
import icaResponsiveDark06 from "../assets/final-portfolio/case-pages/ica-responsive/dark/06-language.png";
import icaResponsiveDark07 from "../assets/final-portfolio/case-pages/ica-responsive/dark/07-transfer-own.png";
import icaResponsiveDark08 from "../assets/final-portfolio/case-pages/ica-responsive/dark/08-transfer-someone.png";
import icaResponsiveDark09 from "../assets/final-portfolio/case-pages/ica-responsive/dark/09-confirmation.png";
import icaResponsiveDark10 from "../assets/final-portfolio/case-pages/ica-responsive/dark/10-profile.png";
import nextCalmotionFigma4x from "../assets/final-portfolio/case-pages/next-calmotion-figma-4x.png";
import nextSafemapFigma4x from "../assets/final-portfolio/case-pages/next-safemap-figma-4x.png";
import nextClimateHubFigma4x from "../assets/final-portfolio/case-pages/next-climate-hub-figma-4x.png";
import safemapHeroFigma4x from "../assets/final-portfolio/case-pages/safemap-hero-figma-4x.png";
import safemapMockup1Figma4x from "../assets/final-portfolio/case-pages/safemap-mockup-1-figma-4x.png";
import safemapAppScreensFigma4x from "../assets/final-portfolio/case-pages/safemap-app-screens-figma-4x.png";
import safemapMobileScreen01Figma4x from "../assets/final-portfolio/case-pages/safemap-mobile-screens/safemap-01-4x.png";
import safemapMobileScreen02Figma4x from "../assets/final-portfolio/case-pages/safemap-mobile-screens/safemap-02-4x.png";
import safemapMobileScreen03Figma4x from "../assets/final-portfolio/case-pages/safemap-mobile-screens/safemap-03-4x.png";
import safemapTabletScreen01Figma4x from "../assets/final-portfolio/case-pages/safemap-tablet-screens/01-4x.png";
import safemapTabletScreen02Figma4x from "../assets/final-portfolio/case-pages/safemap-tablet-screens/02-4x.png";
import safemapTabletScreen03Figma4x from "../assets/final-portfolio/case-pages/safemap-tablet-screens/03-4x.png";
import safemapTabletScreen04Figma4x from "../assets/final-portfolio/case-pages/safemap-tablet-screens/04-4x.png";
import safemapTabletScreen05Figma4x from "../assets/final-portfolio/case-pages/safemap-tablet-screens/05-4x.png";
import safemapTabletScreen06Figma4x from "../assets/final-portfolio/case-pages/safemap-tablet-screens/06-4x.png";
import safemapProcessResearch from "../assets/final-portfolio/case-pages/safemap-process/research-evidence.png";
import safemapProcessJourney from "../assets/final-portfolio/case-pages/safemap-process/experience-evidence-journey.png";
import safemapProcessPersona from "../assets/final-portfolio/case-pages/safemap-process/persona.png";
import safemapProcessBlueprint from "../assets/final-portfolio/case-pages/safemap-process/reporting-advocacy-blueprint.png";
import safemapProcessWireframes from "../assets/final-portfolio/case-pages/safemap-process/mid-fidelity-wireframes.png";
import safemapPrototypeVideo from "../assets/final-portfolio/case-pages/safemap-process/prototype.mov";
import safemapResponsiveWireframe01 from "../assets/final-portfolio/case-pages/safemap-responsive/wireframes/01-home.png";
import safemapResponsiveWireframe02 from "../assets/final-portfolio/case-pages/safemap-responsive/wireframes/02-harassment-details.png";
import safemapResponsiveWireframe03 from "../assets/final-portfolio/case-pages/safemap-responsive/wireframes/03-location.png";
import safemapResponsiveWireframe04 from "../assets/final-portfolio/case-pages/safemap-responsive/wireframes/04-report-status.png";
import safemapResponsiveWireframe05 from "../assets/final-portfolio/case-pages/safemap-responsive/wireframes/05-impact-map.png";
import safemapResponsiveScreen01 from "../assets/final-portfolio/case-pages/safemap-responsive/screens/01-home.png";
import safemapResponsiveScreen02 from "../assets/final-portfolio/case-pages/safemap-responsive/screens/02-incident-type.png";
import safemapResponsiveScreen03 from "../assets/final-portfolio/case-pages/safemap-responsive/screens/03-locate-incident.png";
import safemapResponsiveScreen04 from "../assets/final-portfolio/case-pages/safemap-responsive/screens/04-report-status.png";
import safemapResponsiveScreen05 from "../assets/final-portfolio/case-pages/safemap-responsive/screens/05-impact-map.png";
import climateHeroFigma4x from "../assets/final-portfolio/case-pages/climate-hero-figma-4x.png";
import climatePrototype1Figma4x from "../assets/final-portfolio/case-pages/climate-prototype-1-figma-4x.png";
import climateProcessIdeation from "../assets/final-portfolio/case-pages/climate-hub-process/ideation-sessions.png";
import climateProcessPersonas from "../assets/final-portfolio/case-pages/climate-hub-process/personas.png";
import climateProcessMoscow from "../assets/final-portfolio/case-pages/climate-hub-process/moscow.png";
import climateProcessSitemap from "../assets/final-portfolio/case-pages/climate-hub-process/sitemap.png";
import climateProcessWireframes from "../assets/final-portfolio/case-pages/climate-hub-process/wireframes-display.png";
import climateProcessTesting from "../assets/final-portfolio/case-pages/climate-hub-process/usability-testing.png";
import climateProcessBlueprint from "../assets/final-portfolio/case-pages/climate-hub-process/service-blueprint.png";
import climateNewMobileLeft from "../assets/final-portfolio/case-pages/climate-new-mobile-left.png";
import climateNewMobileMiddleVideo from "../assets/final-portfolio/case-pages/climate-new-mobile-middle.mp4";
import climateNewMobileRight from "../assets/final-portfolio/case-pages/climate-new-mobile-right.png";
import nextLandaFigma4x from "../assets/final-portfolio/case-pages/next-landa-figma-4x.png";
import landaPrototype1Figma4x from "../assets/final-portfolio/case-pages/landa-prototype-1-figma-4x.png";
import landaNewTopIntroMockup from "../assets/final-portfolio/case-pages/landa-new-top-intro-mockup.png";
import nextLandaRedesignFramed from "../assets/final-portfolio/case-pages/next-landa-redesign-framed.png";
import landaNewHeroWireframe from "../assets/final-portfolio/case-pages/landa-new-hero-wireframe.png";
import landaNewMobileLeft from "../assets/final-portfolio/case-pages/landa-new-mobile-left.png";
import landaNewMobileRight from "../assets/final-portfolio/case-pages/landa-new-mobile-right.png";
import landaProcessPersona4x from "../assets/final-portfolio/case-pages/landa-process-persona-4x.png";
import landaProcessReadinessModel4x from "../assets/final-portfolio/case-pages/landa-process-readiness-model-4x.png";
import landaProcessSitemap4x from "../assets/final-portfolio/case-pages/landa-process-sitemap-4x.png";
import nextIcaFigma4x from "../assets/final-portfolio/case-pages/next-ica-figma-4x.png";
import { portfolioScrollTo, usePortfolioInteractions } from "./interactions";

type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  accent: string;
  role: string;
  context: string;
  team: string;
  intro: string;
  story: Array<{ label: string; body: string }>;
  hero: { bg: string; screen?: string; className: string };
  mockups: Array<{ image: string; alt: string }>;
};

const projects: Project[] = [
  {
    slug: "ica-banken",
    title: "ICA Banken",
    year: "2026",
    category: "Finance",
    accent: "#d90800",
    role: "Project Manager & Lead Designer",
    context: "Redesign Concept",
    team: "Solo Project",
    intro:
      "Redesigned ICA Banken's mobile app into a multilingual banking experience that makes everyday banking clearer and more accessible for non-Swedish speakers in Sweden.",
    story: [
      { label: "Brief", body: "ICA Banken presents itself as a friendly, easy-to-open banking option for Swedish residents, including people who are new to the country. The brief was to redesign its mobile banking experience for English-speaking users while preserving trust, simplicity, and everyday usefulness." },
      { label: "Problem", body: "The current app is Swedish-only, creating friction for non-Swedish speakers who need to manage payments and accounts with confidence. For international users, this language barrier can turn routine banking into a high-stress task." },
      { label: "Research", body: "The research was grounded in an audit of the existing app, flow, and common banking needs for international users in Sweden. The key insight was that the issue was not translation alone. Users need familiar banking patterns." },
      { label: "Impact", body: "The redesign repositions ICA Banken as a more inclusive digital bank for international users through English navigation, clearer payment flows, and everyday banking tasks with less uncertainty." },
    ],
    hero: { bg: icaHeroBg, screen: icaHeroScreen, className: "case-visual--ica" },
    mockups: [
      { image: icaMockupBg, alt: "ICA Banken app mockup" },
      { image: icaMockupScreen1, alt: "ICA Banken tablet screen" },
      { image: icaMockupScreen2, alt: "ICA Banken phone screen" },
      { image: icaApp1, alt: "ICA Banken onboarding screen" },
      { image: icaApp2, alt: "ICA Banken account screen" },
    ],
  },
  {
    slug: "calmotion",
    title: "Calmotion",
    year: "2025",
    category: "Mobility / AI",
    accent: "#005fcc",
    role: "UX Researcher & Designer",
    context: "Design Course, Uppsala University",
    team: "6 Researchers & Designers",
    intro:
      "Led the research and interaction design of Calmotion, an emotionally aware and adaptive AI driver assistant that combines a head up display, voice companion, and mobile app.",
    story: [
      { label: "Brief", body: "Modern vehicles are getting smarter, but they still know little about the driver. Calmotion explores how an emotionally aware assistant can support the person behind the wheel." },
      { label: "Problem", body: "An AI that misreads a driver's state is not just unhelpful. In a safety-critical context, it is dangerous. This tension between support and autonomy shaped every decision." },
      { label: "Research", body: "Research with drivers across Sweden, China, the US, and Nigeria revealed a consistent need for AI that supports emotional wellbeing without taking control." },
      { label: "Impact", body: "Calmotion distributes responsibilities across a HUD, a voice companion, and a mobile app so the system supports drivers without overwhelming them." },
    ],
    hero: { bg: calmotionHero, className: "case-visual--full" },
    mockups: [
      { image: calmotionCarBg, alt: "Calmotion car interface" },
      { image: calmotionPhone1, alt: "Calmotion app screen" },
      { image: calmotionPhone2, alt: "Calmotion ID screen" },
      { image: calmotionPhone3, alt: "Calmotion app screen" },
      { image: calmotionPhone4, alt: "Calmotion home screen" },
      { image: calmotionPhone5, alt: "Calmotion stats screen" },
    ],
  },
  {
    slug: "safemap",
    title: "SafeMap",
    year: "2026",
    category: "Social good",
    accent: "#ba1065",
    role: "Project Manager & Lead Designer",
    context: "Design Course, Uppsala University",
    team: "4 Researchers & Designers",
    intro:
      "Led the end-to-end design of SafeMap, a counter-mapping tool built with Uppsala Kvinnojour to make gendered public harassment visible as collective, spatial evidence.",
    story: [
      { label: "Brief", body: "Uppsala Kvinnojour came with an open brief: help advance the mission. That openness required us to ask what the organisation needed that design could meaningfully provide." },
      { label: "Problem", body: "Public harassment is often framed as isolated incidents. When experiences remain anecdotal they are easy to dismiss; when they become spatial data, they become harder to ignore." },
      { label: "Research", body: "Desk research and secondary sources shaped both the problem framing and the ethical parameters of the design before the interface took form." },
      { label: "Impact", body: "SafeMap gives the shelter concrete, community-generated evidence that can enter conversations with city planners, funding bodies, and policy stakeholders." },
    ],
    hero: { bg: safemapHeroBg, screen: safemapHeroScreen, className: "case-visual--safemap" },
    mockups: [
      { image: safemapLaptop, alt: "SafeMap laptop interface" },
      { image: safemapPhone, alt: "SafeMap phone mockup" },
      { image: safemapMap, alt: "SafeMap heat map" },
    ],
  },
  {
    slug: "climate-hub",
    title: "Climate Hub",
    year: "2026",
    category: "Sustainability",
    accent: "#64d769",
    role: "Project Manager & Lead Designer",
    context: "Design Course, Uppsala University",
    team: "4 Researchers & Designers",
    intro:
      "Led the design of Climate Hub, a sustainability engagement platform built with Biotopia Uppsala for immigrants navigating an unfamiliar environmental system.",
    story: [
      { label: "Brief", body: "Biotopia Uppsala was launching Climate Hub and commissioned us to define what it could be for the people most underserved by existing sustainability platforms." },
      { label: "Problem", body: "Sustainability platforms often assume users already understand the system. For newcomers, that assumption creates a barrier before motivation can become action." },
      { label: "Research", body: "Interviews and testing with newcomers surfaced recurring mental models in how users navigate unfamiliar sustainability systems." },
      { label: "Impact", body: "Climate Hub combines education, practical everyday guides, and an interactive local map to make sustainable participation more accessible." },
    ],
    hero: { bg: climateHeroBg, screen: climateHeroScreen, className: "case-visual--climate" },
    mockups: [
      { image: climateMacBg, alt: "Climate Hub desktop mockup" },
      { image: climateGuide, alt: "Climate Hub guide screen" },
      { image: climateEducation, alt: "Climate Hub education screen" },
      { image: climateMobileHero, alt: "Climate Hub mobile hero screen" },
    ],
  },
  {
    slug: "landa",
    title: "Landa",
    year: "2026",
    category: "Intelligence",
    accent: "#031066",
    role: "Product Designer & Developer",
    context: "Self Developed Tool",
    team: "Solo Project",
    intro:
      "Developed Landa, a minimal decision-support tool helping prospective international students assess their readiness to build a life in Sweden before committing to study there.",
    story: [
      { label: "Brief", body: "International students making high-stakes decisions about studying abroad face fragmented information and limited access to lived experience." },
      { label: "Problem", body: "Existing resources tell students what Sweden offers. None tell them whether they are genuinely prepared for it before tuition, visa, and relocation commitments begin." },
      { label: "Research", body: "Research involved interviews with international students across Swedish universities and a crowdsourced assessor network of students and graduates." },
      { label: "Impact", body: "Since launch, Landa has helped international students make informed decisions and prepare for life in Sweden through personalised AI profiles." },
    ],
    hero: { bg: landaHeroBg, screen: landaHeroScreen, className: "case-visual--landa" },
    mockups: [
      { image: landaMacBg, alt: "Landa desktop prototype" },
      { image: landaMobile1, alt: "Landa mobile home screen" },
      { image: landaMobile2, alt: "Landa resource screen" },
      { image: landaMobile3, alt: "Landa how it works screen" },
    ],
  },
];

const projectBySlug = new Map(projects.map((project) => [project.slug, project]));
const resumePageHref = "/resume";
const resumePdfHref = "/dare-abinde-resume.pdf";
const climatePrototype1PlaybackId = "d006tridL5jHrRG9K2OZN6lr7Hdm6HkFw01aITA25Z9X00";
const climatePrototype2PlaybackId = "F2TrQPU01Oa1lk01mRs900ZHo2UkWVNLSzl901kdlXFNGTY";
const landaPrototype1PlaybackId = "98imppz3T3Cww00jUnqdBrRJmlusI4rgeoZp7cCaqxDo";
const landaPrototype2PlaybackId = "yYHz02gzesk1Slqq01OZDGBgZa02Ecs02EqsnC6XO7JWu8E";
const landaMobilePlaybackId = "ydFQRH01inTdmL9IjY8TMhf7OzfccIpXGFUxzgWOm2P00";
const calmotionPromoPlaybackId = "xoVP01CGibJQjhHIQZuZ4pfDwoBh3a5INn8YXARpxHNI";
const climatePromoPlaybackId = "gGi3Z1BRLEFc4LA85F6PSq4Koz94vEmVpuuNpetdZg00";
const projectPreviewBySlug: Record<string, { image: string; frame: string }> = {
  "ica-banken": { image: nextIcaFigma4x, frame: "#3b3335" },
  calmotion: { image: nextCalmotionFigma4x, frame: "#d6d4ce" },
  safemap: { image: nextSafemapFigma4x, frame: "#d6d4ce" },
  "climate-hub": { image: nextClimateHubFigma4x, frame: "#d6d4ce" },
  landa: { image: nextLandaRedesignFramed, frame: "#d6d4ce" },
};

function MuxLoopVideo({ playbackId, label, dataSwipeIndex }: { playbackId: string; label: string; dataSwipeIndex?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const visibleRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      preloadObserver.disconnect();
    }, { rootMargin: "1200px 0px", threshold: 0 });

    const playbackObserver = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      visibleRef.current = visible;
      setIsVisible(visible);
    }, { threshold: [0, 0.1, 0.5] });

    preloadObserver.observe(video);
    playbackObserver.observe(video);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const source = `https://stream.mux.com/${playbackId}.m3u8`;
    let hls: Hls | undefined;
    const playWhenVisible = () => {
      if (visibleRef.current) void video.play().catch(() => undefined);
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        capLevelToPlayerSize: true,
        startFragPrefetch: true,
      });
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, playWhenVisible);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      video.addEventListener("canplay", playWhenVisible);
    }

    return () => {
      hls?.destroy();
      video.removeEventListener("canplay", playWhenVisible);
      video.removeAttribute("src");
      video.load();
    };
  }, [playbackId, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    if (isVisible) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible, shouldLoad]);

  return <video ref={videoRef} data-swipe-index={dataSwipeIndex} aria-label={label} muted loop playsInline preload="none" />;
}

function currentPath() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function defaultWorkView(): "list" | "grid" {
  if (typeof window === "undefined") return "list";
  return window.matchMedia("(max-width: 1024px)").matches ? "grid" : "list";
}

function pageTitle(path: string) {
  if (path === "/") return "Dare Abinde • Product Designer & UX Researcher";
  if (path === "/work") return "Work • Dare Abinde";
  if (path === "/about") return "About • Dare Abinde";
  if (path === "/contact") return "Contact • Dare Abinde";
  if (path === "/resume") return "Resume • Dare Abinde";

  if (path.startsWith("/case/")) {
    const project = projectBySlug.get(path.replace("/case/", ""));
    return `${project?.title || "Case Study"} • Dare Abinde`;
  }

  return "Dare Abinde • Product Designer & UX Researcher";
}

function resetPageScroll() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  portfolioScrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
  root.scrollTop = 0;
  document.body.scrollTop = 0;

  window.requestAnimationFrame(() => {
    portfolioScrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    root.scrollTop = 0;
    document.body.scrollTop = 0;

    window.requestAnimationFrame(() => {
      portfolioScrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      document.body.scrollTop = 0;
      root.style.scrollBehavior = previousScrollBehavior;
    });
  });
}

function formatSwedenTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Stockholm",
  }).format(new Date());
}

function useSwedenTime() {
  const [time, setTime] = useState(formatSwedenTime);

  useEffect(() => {
    const update = () => setTime(formatSwedenTime());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

function useDownwardHeadlineReveal(distance = 24, duration = 1.2) {
  const revealRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const element = revealRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(element, { y: -distance, opacity: 0 });
    const tween = gsap.to(element, {
      y: 0,
      opacity: 1,
      delay: 0.15,
      duration,
      ease: "power3.out",
      clearProps: "transform,opacity",
    });

    return () => {
      tween.kill();
      gsap.set(element, { clearProps: "transform,opacity" });
    };
  }, [distance, duration]);

  return revealRef;
}

function scrollToContact(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const target = document.getElementById("contact");
  if (!target) return;

  portfolioScrollTo(target, { duration: 700 });
  return;
}

function FigmaFrame({ height, children, className }: { height: number; children: ReactNode; className?: string }) {
  return (
    <main className={`fp-shell${className ? ` ${className}` : ""}`} style={{ "--frame-height": height } as CSSProperties}>
      <div className="fp-canvas">{children}</div>
    </main>
  );
}

function Nav({ top = 45 }: { top?: number }) {
  const path = currentPath();
  const isActive = (href: string) => {
    if (href === "/work") return path === "/work" || path.startsWith("/case/");
    return path === href;
  };

  return (
    <header className="fp-nav" style={{ top }}>
      <a className="fp-nav__brand" href="/">DARE.</a>
      <nav className="fp-nav__links" aria-label="Main navigation">
        <a href="/work" aria-current={isActive("/work") ? "page" : undefined}>Work</a>
        <a href="/about" aria-current={isActive("/about") ? "page" : undefined}>About</a>
        <a href={resumePageHref} target="_blank" rel="noreferrer" aria-current={isActive("/resume") ? "page" : undefined}>Resume</a>
        <button className="fp-nav__llm" type="button" onClick={() => window.dispatchEvent(new CustomEvent("portfolio:open-dare-llm"))}>DARE LLM<span className="fp-nav__llm-status" aria-hidden="true" /></button>
      </nav>
      <a className="fp-nav__contact" href="/contact" aria-current={isActive("/contact") ? "page" : undefined}><span>Contact Me</span></a>
    </header>
  );
}

function FloatingNav({ path }: { path: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileTop, setIsMobileTop] = useState(false);
  const menuScrollRef = useRef(0);
  const isActive = (href: string) => {
    if (href === "/work") return path === "/work" || path.startsWith("/case/");
    return path === href;
  };

  useEffect(() => {
    setIsOpen(false);
    setHoveredLink(null);
  }, [path]);

  useEffect(() => {
    function openNavigation() {
      menuScrollRef.current = window.scrollY;
      window.__portfolioMenuScroll = menuScrollRef.current;
      setHoveredLink(null);
      setIsOpen(true);
    }

    window.addEventListener("portfolio:open-navigation", openNavigation);
    return () => window.removeEventListener("portfolio:open-navigation", openNavigation);
  }, []);

  useEffect(() => {
    function closeNavigation() {
      setHoveredLink(null);
      setIsOpen(false);
    }

    window.addEventListener("portfolio:close-navigation", closeNavigation);
    window.addEventListener("portfolio:open-dare-llm", closeNavigation);
    return () => {
      window.removeEventListener("portfolio:close-navigation", closeNavigation);
      window.removeEventListener("portfolio:open-dare-llm", closeNavigation);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    function revealDistance() {
      if (path === "/") return Math.max(window.innerHeight * 1.05, 980);
      return Math.max(window.innerHeight * 0.55, 520);
    }

    function update() {
      frame = 0;
      setIsMobileTop(window.innerWidth <= 575 && window.scrollY <= revealDistance());
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [path]);

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setHoveredLink(null);
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (!isOpen) return undefined;
    window.__portfolioMenuScroll = menuScrollRef.current || window.scrollY;
    root.classList.add("fp-side-nav-lock");
    body.classList.add("fp-side-nav-lock");

    return () => {
      root.classList.remove("fp-side-nav-lock");
      body.classList.remove("fp-side-nav-lock");
      window.__portfolioMenuScroll = undefined;
    };
  }, [isOpen]);

  function openMenu() {
    menuScrollRef.current = window.scrollY;
    window.__portfolioMenuScroll = menuScrollRef.current;
    setHoveredLink(null);
    setIsOpen(true);
  }

  useEffect(() => {
    if (!isOpen) return undefined;

    function updateHoveredLink(event: PointerEvent) {
      const panel = document.querySelector<HTMLElement>(".fp-side-nav__panel");
      if (!panel) {
        setHoveredLink(null);
        return;
      }

      const panelRect = panel.getBoundingClientRect();
      const isInsidePanel = event.clientX >= panelRect.left && event.clientX <= panelRect.right && event.clientY >= panelRect.top && event.clientY <= panelRect.bottom;
      if (!isInsidePanel) {
        setHoveredLink(null);
        return;
      }

      const link = Array.from(panel.querySelectorAll<HTMLElement>("[data-side-nav-key]")).find((item) => {
        const rect = item.getBoundingClientRect();
        return event.clientY >= rect.top && event.clientY <= rect.bottom && event.clientX >= panelRect.left && event.clientX <= panelRect.right;
      });

      setHoveredLink(link?.dataset.sideNavKey || null);
    }

    function clearHoveredLink() {
      setHoveredLink(null);
    }

    document.addEventListener("pointermove", updateHoveredLink);
    document.addEventListener("pointerleave", clearHoveredLink);
    return () => {
      document.removeEventListener("pointermove", updateHoveredLink);
      document.removeEventListener("pointerleave", clearHoveredLink);
    };
  }, [isOpen]);

  function closeOnNav() {
    setIsOpen(false);
    setHoveredLink(null);
  }

  function onPanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setHoveredLink(null);
      setIsOpen(false);
    }
  }

  function linkClass(href: string) {
    if (hoveredLink === href) return "is-side-hovered";
    if (!hoveredLink && isActive(href)) return "is-side-active";
    return "";
  }

  return (
    <>
      <button
        className={`fp-mobile-top-menu${path === "/contact" ? " fp-mobile-top-menu--light" : ""}${isMobileTop && !isOpen ? " is-visible" : ""}`}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="floating-navigation"
        onClick={openMenu}
      >
        <i aria-hidden="true" />
        <span>Menu</span>
      </button>
      <button
        className={`fp-floating-menu fp-magnetic${isOpen ? " is-open" : ""}`}
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="floating-navigation"
        onClick={() => {
          setHoveredLink(null);
          setIsOpen((value) => {
            if (!value) {
              menuScrollRef.current = window.scrollY;
              window.__portfolioMenuScroll = menuScrollRef.current;
            }
            return !value;
          });
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <div
        className={`fp-side-nav${isOpen ? " is-open" : ""}`}
        id="floating-navigation"
        aria-hidden={!isOpen}
        onKeyDown={onPanelKeyDown}
      >
        <div
          className="fp-side-nav__scrim"
          aria-hidden="true"
        />
        <aside className="fp-side-nav__panel" aria-label="Floating navigation">
          <header className="fp-side-nav__header"><p>Navigation</p></header>
          <div className="fp-side-nav__links">
            <a href="/" data-side-nav-key="/" className={linkClass("/")} aria-current={isActive("/") ? "page" : undefined} onClick={closeOnNav}>Home</a>
            <a href="/work" data-side-nav-key="/work" className={linkClass("/work")} aria-current={isActive("/work") ? "page" : undefined} onClick={closeOnNav}>Work</a>
            <a href="/about" data-side-nav-key="/about" className={linkClass("/about")} aria-current={isActive("/about") ? "page" : undefined} onClick={closeOnNav}>About</a>
            <a href={resumePageHref} target="_blank" rel="noreferrer" data-side-nav-key="/resume" className={linkClass("/resume")} aria-current={isActive("/resume") ? "page" : undefined} onClick={closeOnNav}>Resume</a>
            <button data-side-nav-key="dare-llm" className={`fp-side-nav__llm${hoveredLink === "dare-llm" ? " is-side-hovered" : ""}`} type="button" onClick={() => window.dispatchEvent(new CustomEvent("portfolio:open-dare-llm"))}>DARE LLM</button>
            <a href="/contact" data-side-nav-key="/contact" className={linkClass("/contact")} aria-current={isActive("/contact") ? "page" : undefined} onClick={closeOnNav}>Contact</a>
          </div>
        </aside>
      </div>
    </>
  );
}

function Footer({ top }: { top: number }) {
  return (
    <section className="fp-footer" style={{ top }} id="contact">
      <div className="fp-footer__cta">
        <span className="fp-footer__portrait"><img src={contactPortrait} alt="" /></span>
        <p>Let’s work together.</p>
        <p>Happy to chat.</p>
      </div>
      <img className="fp-footer__arrow" src={arrowUpRightWhite} alt="" />
      <div className="fp-footer__line" />
      <a className="fp-footer__button" href="/contact">Contact</a>
      <div className="fp-footer__contact-pills">
        <a className="fp-pill fp-footer__email" href="mailto:dareabinde04@gmail.com" target="_blank" rel="noreferrer">dareabinde04@gmail.com</a>
        <a className="fp-pill fp-footer__phone" href="tel:+46769682090" target="_blank" rel="noreferrer">+46 7 69 68 20 90</a>
      </div>
      <div className="fp-footer__links fp-footer__pages">
        <strong>Pages</strong><a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a><a href={resumePageHref} target="_blank" rel="noreferrer">Resume</a>
      </div>
      <div className="fp-footer__links fp-footer__work">
        <strong>Work</strong><a href="/case/ica-banken">ICA Banken</a><a href="/case/calmotion">Calmotion</a><a href="/case/safemap">SafeMap</a><a href="/work">...All</a>
      </div>
      <div className="fp-footer__links fp-footer__connect">
        <strong>Connect</strong><a href="https://www.linkedin.com/in/dareabinde/" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:dareabinde04@gmail.com" target="_blank" rel="noreferrer">Email</a><a href="https://x.com/dareabinde" target="_blank" rel="noreferrer">Twitter</a><a href="https://www.behance.net" target="_blank" rel="noreferrer">Behance</a>
      </div>
      <div className="fp-footer__bottom-line" />
      <small>© Dare Abinde. All rights reserved.</small>
    </section>
  );
}

function ProjectRows({ top, includeLanda = false, button = "More Work", items, className }: { top: number; includeLanda?: boolean; button?: "More Work" | "Get in Touch"; items?: Project[]; className?: string }) {
  const rows = items ?? (includeLanda ? projects : projects.slice(0, 4));
  const actionTop = button === "Get in Touch" ? 170.58 + rows.length * 179 : 895.58;
  const sectionHeight = actionTop + 56.419;

  return (
    <section className={`fp-work-list${className ? ` ${className}` : ""}`} style={{ top, height: sectionHeight }}>
      <p className="fp-kicker">SELECTED WORK</p>
      <div className="fp-row-line" style={{ top: 90 }} />
      {rows.map((project, index) => {
        const titleY = 159.5 + index * 179;
        const categoryY = 166.5 + index * 179;
        const preview = projectPreviewBySlug[project.slug];
        return (
          <a className="fp-project-row" href={`/case/${project.slug}`} data-work-preview={preview.image} data-work-preview-frame={preview.frame} data-work-preview-slug={project.slug} key={project.slug}>
            <span className="fp-project-row__hit" style={{ top: 90 + index * 179 }} />
            <span className="fp-project-row__title" style={{ top: titleY }}>
              {project.title.toUpperCase()} <small>({project.year})</small>
            </span>
            <span className="fp-project-row__category" style={{ top: categoryY }}>
              {project.category}
            </span>
            <span className="fp-row-line" style={{ top: 269 + index * 179 }} />
          </a>
        );
      })}
      <a className={`fp-action-pill ${button === "Get in Touch" ? "fp-action-pill--dark" : ""}`} style={{ top: actionTop }} href={button === "More Work" ? "/work" : "#contact"} onClick={button === "Get in Touch" ? scrollToContact : undefined}>
        {button} <small>{button === "More Work" ? "05" : "↓"}</small>
      </a>
    </section>
  );
}

const homeExpertise = [
  {
    title: "UX Research",
    skills: ["Desk research", "User interviews", "Surveys", "Usability testing", "Qualitative & quantitative analysis"],
  },
  {
    title: "Product Strategy",
    skills: ["Problem framing", "Opportunity mapping", "Competitive analysis", "Product requirements", "Workshop design and facilitation"],
  },
  {
    title: "Product Design",
    skills: ["Information architecture", "User flows", "Wireframing", "Prototyping", "Interaction design", "Visual design", "Design systems"],
  },
  {
    title: "Service Design",
    skills: ["Journey mapping", "Service blueprints", "Stakeholder mapping", "Touchpoint design", "Adoption planning"],
  },
  {
    title: "AI & Emerging Design",
    skills: ["Rapid design exploration", "AI prototyping", "AI-assisted design", "Agentic development"],
  },
];

const homeExpertiseTop = 3643;
const homeExpertiseHeaderHeight = 80;
const homeExpertiseRowHeight = 128;
const homeExpertiseFooterGap = 120;
const homeFooterHeight = 1100;

function homeExpertisePanelHeight(skillCount: number) {
  return 29 + skillCount * 34 + Math.max(0, skillCount - 1) * 10;
}

function HomeExpertise({ openRows, onToggle, height }: { openRows: string[]; onToggle: (title: string) => void; height: number }) {
  return (
    <section className="fp-expertise" style={{ top: homeExpertiseTop, height }} aria-labelledby="home-expertise-heading">
      <h2 id="home-expertise-heading">Expertise</h2>
      <div className="fp-expertise__rows">
        {homeExpertise.map((area, index) => {
          const isOpen = openRows.includes(area.title);
          const panelId = `home-expertise-panel-${index + 1}`;
          const panelHeight = homeExpertisePanelHeight(area.skills.length);

          return (
            <article
              className={`fp-expertise__row${isOpen ? " is-open" : ""}`}
              style={{ "--expertise-panel-height": `${panelHeight}px`, "--expertise-skill-count": area.skills.length } as CSSProperties}
              key={area.title}
            >
              <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => onToggle(area.title)}>
                <span>{area.title}</span>
                <i aria-hidden="true">↓</i>
              </button>
              <div
                className="fp-expertise__panel"
                id={panelId}
                role="button"
                tabIndex={isOpen ? 0 : -1}
                aria-label={`Close ${area.title} skills`}
                aria-hidden={!isOpen}
                onClick={() => onToggle(area.title)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onToggle(area.title);
                  }
                }}
              >
                <ul>
                  {area.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function HomePage() {
  const swedenTime = useSwedenTime();
  const homeStatementRef = useRef<HTMLParagraphElement | null>(null);
  const {
    scrollerRef: mobileHomeGalleryRef,
    activeIndex: mobileHomeGalleryIndex,
    scrollToIndex: scrollMobileHomeGallery,
  } = useSwipePagination(8);
  const [openExpertiseRows, setOpenExpertiseRows] = useState<string[]>([]);
  const expertiseExpandedHeight = homeExpertise.reduce(
    (total, area) => total + (openExpertiseRows.includes(area.title) ? homeExpertisePanelHeight(area.skills.length) : 0),
    0,
  );
  const expertiseHeight = homeExpertiseHeaderHeight + homeExpertise.length * homeExpertiseRowHeight + expertiseExpandedHeight;
  const homeFooterTop = homeExpertiseTop + expertiseHeight + homeExpertiseFooterGap;
  const homeFrameHeight = homeFooterTop + homeFooterHeight;

  const toggleExpertise = useCallback((title: string) => {
    setOpenExpertiseRows((rows) => rows.includes(title) ? rows.filter((row) => row !== title) : [...rows, title]);
  }, []);

  useLayoutEffect(() => {
    const statement = homeStatementRef.current;
    const line = statement?.querySelector<HTMLElement>("span");
    if (!statement || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(line, { y: -24, opacity: 0 });
    const tween = gsap.to(line, {
      y: 0,
      opacity: 1,
      delay: 0.15,
      duration: 1.2,
      ease: "power3.out",
      clearProps: "transform,opacity",
    });

    return () => {
      tween.kill();
      gsap.set(line, { clearProps: "transform,opacity" });
    };
  }, []);

  useEffect(() => {
    const refreshTimer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("portfolio:refresh-interactions"));
    }, 520);

    return () => window.clearTimeout(refreshTimer);
  }, [openExpertiseRows]);

  return (
    <>
      <FigmaFrame height={homeFrameHeight}>
        <IcaResponsiveNav className="figma-top-level-responsive-nav" />
        <section className="fp-home-hero">
          <p className="fp-home-hello">Hey, I’m Dare Abinde</p>
          <p className="fp-home-statement" ref={homeStatementRef}>
            <span>I turn evidence and human insight<br />into thoughtful digital products.</span>
          </p>
          <div className="fp-location">
            <p>Based<br />in Sweden</p>
            <span>{swedenTime}</span>
            <i><img src={europe} alt="" /></i>
          </div>
          <div className="fp-home-role">
            <img src={arrowUpRight} alt="" />
            <p><span>Product Designer</span><span>UX Researcher</span></p>
          </div>
          <div className="fp-home-portrait"><img src={homePortrait} alt="Dare Abinde portrait" /></div>
        </section>
        <Nav top={51} />
        <section className="fp-home-intro">
          <p className="fp-home-intro__lead">Design problems are rarely design. It’s an <em>insight</em> problem. I help product teams maximize design insights through concrete user research, real problem framing, and intentional design practice.</p>
          <div className="fp-home-intro__secondary">
            <p className="fp-home-intro__body">My background in Psychology and Human Computer Interaction grounds my passion for human-centered product design. I believe the strongest products emerge when behavioural insight, thoughtful research, and product thinking come together to solve meaningful problems.</p>
            <a className="fp-home-about" href="/about">About Me</a>
          </div>
        </section>
        <section className="fp-home-mobile-work">
          <p className="fp-kicker">SELECTED WORK</p>
          <WorkGrid top={0} items={projects.slice(0, 2)} />
          <a className="fp-action-pill" href="/work">
            More Work <small>05</small>
          </a>
        </section>
        <ProjectRows top={1694} className="fp-home-selected-list" />
        <section className="fp-gallery">
          <div className="fp-gallery__row fp-gallery__row--top">
            <figure><img src={galleryIcaTop} alt="ICA Banken" /></figure>
            <figure><img src={gallerySafemapTop} alt="SafeMap" /></figure>
            <figure className="fp-gallery__calmotion"><img src={cmThumbnail} alt="Calmotion" /></figure>
            <figure className="fp-gallery__climate"><img src={chThumbnail} alt="Climate Hub" /></figure>
          </div>
          <div className="fp-gallery__row fp-gallery__row--bottom">
            <figure><img src={galleryIcaBottomLeft} alt="ICA Banken" /></figure>
            <figure className="fp-gallery__prototype">
              <div className="fp-gallery__prototype-play">
                <div className="fp-gallery__prototype-mac">
                  <img src={chMacFigmaSource} alt="" />
                </div>
                <MuxLoopVideo playbackId={climatePrototype1PlaybackId} label="Climate Hub prototype" />
              </div>
            </figure>
            <figure><img src={galleryIcaBottomRight} alt="ICA Banken" /></figure>
            <figure><img src={gallerySafemapBottom} alt="SafeMap" /></figure>
          </div>
        </section>
        <section className="fp-home-mobile-gallery" aria-labelledby="home-mobile-gallery-heading">
          <h2 id="home-mobile-gallery-heading">Gallery</h2>
          <div className="fp-home-mobile-gallery__scroller" ref={mobileHomeGalleryRef}>
            <figure data-swipe-index="0"><img src={galleryIcaTop} alt="ICA Banken" /></figure>
            <figure data-swipe-index="1"><img src={gallerySafemapTop} alt="SafeMap" /></figure>
            <figure data-swipe-index="2"><img src={cmThumbnail} alt="Calmotion" /></figure>
            <figure data-swipe-index="3"><img src={chThumbnail} alt="Climate Hub" /></figure>
            <figure data-swipe-index="4"><img src={galleryIcaBottomLeft} alt="ICA Banken" /></figure>
            <figure className="fp-home-mobile-gallery__prototype" data-swipe-index="5">
              <div className="fp-home-mobile-gallery__prototype-play">
                <div className="fp-home-mobile-gallery__prototype-mac">
                  <img src={chMacFigmaSource} alt="" />
                </div>
                <MuxLoopVideo playbackId={climatePrototype1PlaybackId} label="Climate Hub prototype" />
              </div>
            </figure>
            <figure data-swipe-index="6"><img src={galleryIcaBottomRight} alt="ICA Banken" /></figure>
            <figure data-swipe-index="7"><img src={gallerySafemapBottom} alt="SafeMap" /></figure>
          </div>
          <IcaSwipePagination
            count={8}
            activeIndex={mobileHomeGalleryIndex}
            onSelect={scrollMobileHomeGallery}
            label="Choose a gallery item"
          />
        </section>
        <HomeExpertise openRows={openExpertiseRows} onToggle={toggleExpertise} height={expertiseHeight} />
        <Footer top={homeFooterTop} />
      </FigmaFrame>
    </>
  );
}

function WorkPage() {
  const [filter, setFilter] = useState<"all" | "team" | "solo">("all");
  const [view, setView] = useState<"list" | "grid">(() => defaultWorkView());
  const [hasChosenView, setHasChosenView] = useState(false);
  const headlineRevealRef = useDownwardHeadlineReveal();
  const visibleProjects = projects.filter((project) => {
    if (filter === "team") return project.team !== "Solo Project";
    if (filter === "solo") return project.team === "Solo Project";
    return true;
  });
  const footerButtonGap = 327.42;
  const footerFrameGap = 1100;
  const listButtonTop = 707 + 170.58 + visibleProjects.length * 179;
  const gridRows = Math.ceil(visibleProjects.length / 2);
  const gridContentHeight = gridRows ? gridRows * 574 + Math.max(0, gridRows - 1) * 152 : 0;
  const gridButtonTop = 707 + gridContentHeight + 120;
  const workButtonTop = view === "grid" ? gridButtonTop : listButtonTop;
  const footerTop = workButtonTop + footerButtonGap;
  const gridSectionHeight = gridButtonTop - 707 + 56.419;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:refresh-interactions"));
  }, [filter, view]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(max-width: 1024px)");
    const syncDefaultView = () => {
      if (!hasChosenView) setView(query.matches ? "grid" : "list");
    };
    syncDefaultView();
    query.addEventListener("change", syncDefaultView);
    return () => query.removeEventListener("change", syncDefaultView);
  }, [hasChosenView]);

  function chooseView(nextView: "list" | "grid") {
    setHasChosenView(true);
    setView(nextView);
  }

  return (
    <FigmaFrame height={footerTop + footerFrameGap}>
      <Nav />
      <IcaResponsiveNav className="figma-top-level-responsive-nav" />
      <section className="fp-work-intro">
        <h1 className="fp-top-level-headline-mask"><span className="fp-top-level-headline-reveal" ref={headlineRevealRef}>Creating insight<span className="fp-mobile-break"><br /></span> driven<span className="fp-desktop-break"><br /></span> digital<span className="fp-mobile-break"><br /></span> product</span></h1>
        <div className="fp-filter fp-filter--categories">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All</button>
          <button type="button" aria-pressed={filter === "team"} onClick={() => setFilter("team")}>Team <small>03</small></button>
          <button type="button" aria-pressed={filter === "solo"} onClick={() => setFilter("solo")}>Solo <small>02</small></button>
        </div>
        <div className="fp-filter fp-filter--view">
          <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => chooseView("list")}><span /></button>
          <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => chooseView("grid")}><span /></button>
        </div>
      </section>
      {view === "list" ? (
        <ProjectRows top={707} items={visibleProjects} button="Get in Touch" />
      ) : (
        <section className="fp-work-grid-shell" style={{ top: 707, height: gridSectionHeight }}>
          <WorkGrid top={0} items={visibleProjects} />
          <a className="fp-action-pill fp-action-pill--dark fp-work-grid__action" style={{ top: gridButtonTop - 707 }} href="#contact" onClick={scrollToContact}>
            Get in Touch <small>↓</small>
          </a>
        </section>
      )}
      <Footer top={footerTop} />
    </FigmaFrame>
  );
}

function WorkGrid({ top, items }: { top: number; items: Project[] }) {
  function updateViewPosition(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--view-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--view-y", `${event.clientY - rect.top}px`);
  }

  return (
    <section className="fp-work-grid" style={{ top }}>
      {items.map((project) => {
        const preview = projectPreviewBySlug[project.slug];
        return (
          <a className="fp-work-grid__card" href={`/case/${project.slug}`} key={project.slug}>
            <figure data-preview-slug={project.slug} style={{ "--preview-frame-bg": preview.frame } as CSSProperties} onMouseMove={updateViewPosition}>
              <img src={preview.image} alt="" />
              <span className="fp-work-grid__view">View</span>
            </figure>
            <h2>{project.title}</h2>
            <div className="fp-work-grid__line" />
            <p>{project.category}</p>
            <small>{project.year}</small>
          </a>
        );
      })}
    </section>
  );
}

const aboutGalleryItems = [
  { image: aboutPiano, label: "PLAYING THE PIANO" },
  { image: aboutWife, label: "WITH MY BEAUTIFUL WIFE" },
  { image: aboutDesignProject, label: "DISCUSSING A DESIGN PROJECT" },
  { image: aboutWorkshop, label: "LEADING A DESIGN WORKSHOP" },
];

function AboutAnnotatedImage({ image, label, index }: { image: string; label: string; index: number }) {
  function updateAnnotationPosition(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--annot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--annot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <figure className="fp-about-gallery__item" data-swipe-index={index} onMouseMove={updateAnnotationPosition}>
      <img src={image} alt="" />
      <figcaption className="fp-about-gallery__annotation">
        <img className="fp-about-gallery__camera" src={cameraIcon} alt="" />
        <span>{label}</span>
      </figcaption>
    </figure>
  );
}

function AboutPage() {
  const headlineRevealRef = useDownwardHeadlineReveal();
  const aboutGalleryPagination = useSwipePagination<HTMLElement>(aboutGalleryItems.length);
  const pillars = [
    { number: "01", title: "Research", body: "I use qual and quant research methods to uncover user needs, validate assumptions, and evaluate product usability through interviews, surveys, usability testing, behavioural observation, and evidence based synthesis." },
    { number: "02", title: "Strategy", body: "I translate research into product direction by framing opportunities, prioritising problems, defining product requirements, mapping user journeys, and aligning user needs with business goals." },
    { number: "03", title: "Design", body: "I turn validated ideas into intuitive digital experiences by exploring concepts, prototyping interactions, refining interfaces, building design systems, and iterating through continuous user feedback." },
  ];

  return (
    <FigmaFrame height={3527}>
      <Nav />
      <IcaResponsiveNav className="figma-top-level-responsive-nav" />
      <section className="fp-about-headline">
        <h1 className="fp-top-level-headline-mask"><span className="fp-top-level-headline-reveal" ref={headlineRevealRef}>Human-centric,<span className="fp-mobile-break"><br /></span> insight-driven<span className="fp-tablet-break"><br /></span> product designer</span></h1>
        <div className="fp-about-line" />
        <span className="fp-about-portrait"><img src={contactPortrait} alt="Dare Abinde portrait" /></span>
      </section>
      <img className="fp-about-arrow" src={arrowUpRight} alt="" />
      <section className="fp-about-copy">
        <p>My journey into design didn’t begin with interfaces or programming. It began by studying people. I had my first degree in Psychology, where I developed a deep understanding of human behaviour and the reasons behind people's decisions, hesitations, and frustrations. A second degree in Human Computer Interaction gave me the tools to turn those insights into products people can actually use. Today, I work where those disciplines meet. I enjoy uncovering why products feel confusing, why people abandon tasks, and what prevents technology from fitting naturally into everyday life.</p>
        <p>My process combines research, systems thinking, and product design. I like asking difficult questions, simplifying complexity, and building experiences that are grounded in evidence rather than assumptions. For me, good design isn't just about how polished an interface looks. It's measured by whether people feel more capable, more confident, and less burdened after using it.</p>
        <div className="fp-about-location fp-about-location--desktop">
          <div className="fp-about-globe" aria-hidden="true">
            <i /><i /><i /><b /><em />
          </div>
          <span>Based in Uppsala,<br />Sweden.</span>
        </div>
        <div className="fp-about-location fp-about-location--mobile"><img src={locationPinWhite} alt="" /><span>Based in Uppsala, Sweden.</span></div>
      </section>
      <section className="fp-pillars">
        <h2>What I bring ...</h2>
        <div>
          {pillars.map((pillar) => (
            <article key={pillar.title}>
              <span>{pillar.number}</span>
              <hr />
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="fp-away">
        <p>Away from design, you'll probably find me studying emerging AI tools, playing the piano, with family, or thinking about how technology can <br className="fp-away-break" />become a little more human.</p>
        <img src={arrowUpRight} alt="" />
      </section>
      <section ref={aboutGalleryPagination.scrollerRef} className="fp-about-gallery" aria-label="Lifestyle pictures">
        {aboutGalleryItems.map((item, index) => <AboutAnnotatedImage image={item.image} label={item.label} index={index} key={item.label} />)}
      </section>
      <IcaSwipePagination
        className="fp-about-gallery-pagination fp-about-gallery-pagination--mobile"
        count={aboutGalleryItems.length}
        activeIndex={aboutGalleryPagination.activeIndex}
        onSelect={aboutGalleryPagination.scrollToIndex}
        label="Lifestyle picture navigation"
      />
      <IcaSwipePagination
        className="fp-about-gallery-pagination fp-about-gallery-pagination--tablet"
        count={2}
        activeIndex={aboutGalleryPagination.activeIndex === 0 ? 0 : 1}
        onSelect={(index) => aboutGalleryPagination.scrollToIndex(index === 0 ? 0 : aboutGalleryItems.length - 1)}
        label="Lifestyle gallery position"
      />
      <Footer top={2427} />
    </FigmaFrame>
  );
}

function ContactPage() {
  const headlineRevealRef = useDownwardHeadlineReveal();
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formValues, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    if (name !== "name" && name !== "email" && name !== "message") return;
    setFormValues((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitError("");
    if (submitState === "sent") setSubmitState("idle");
  }

  function validateContactForm() {
    const nextErrors: Partial<Record<keyof typeof formValues, string>> = {};
    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const message = formValues.message.trim();

    if (name.length < 2) nextErrors.name = "Please enter a valid name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address";
    if (message.length < 3 || message.length > 3000) nextErrors.message = "Please enter a text between 3 and 3000 characters";

    return nextErrors;
  }

  async function submitContactForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm();
    setFormErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length) return;

    setSubmitState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      body.append(key, String(value));
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setSubmitState("sent");
      setFormValues({ name: "", email: "", message: "" });
    } catch {
      setSubmitState("idle");
      setSubmitError("Something went wrong. Please try again or email me directly.");
    }
  }

  const buttonLabel = submitState === "sending" ? "Sending..." : submitState === "sent" ? "Sent!" : "Send it";

  return (
    <FigmaFrame height={1640} className="fp-contact-page">
      <Nav />
      <IcaResponsiveNav className="figma-top-level-responsive-nav figma-top-level-responsive-nav--dark" />
      <section className="fp-contact-hero" aria-labelledby="contact-heading">
        <h1 className="fp-top-level-headline-mask" id="contact-heading"><span className="fp-top-level-headline-reveal" ref={headlineRevealRef}>Open to<br />opportunities</span></h1>
        <span className="fp-contact-portrait fp-magnetic"><img src={contactPortrait} alt="Dare Abinde portrait" /></span>
        <img className="fp-contact-arrow" src={arrowUpRightWhite} alt="" />
      </section>
      <form
        className="fp-contact-form"
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        noValidate
        onSubmit={submitContactForm}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="fp-contact-form__hidden">
          <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
        </p>
        <label className={`fp-contact-field${formErrors.name ? " has-error" : ""}`}>
          <span className="fp-contact-field__number">01</span>
          <span className="fp-contact-field__label">What’s your name?</span>
          <input name="name" type="text" placeholder="Your name *" required value={formValues.name} onChange={updateField} />
          {formErrors.name ? <span className="fp-contact-field__error">{formErrors.name}</span> : null}
        </label>
        <label className={`fp-contact-field${formErrors.email ? " has-error" : ""}`}>
          <span className="fp-contact-field__number">02</span>
          <span className="fp-contact-field__label">What’s your email?</span>
          <input name="email" type="email" placeholder="you@example.com *" required value={formValues.email} onChange={updateField} />
          {formErrors.email ? <span className="fp-contact-field__error">{formErrors.email}</span> : null}
        </label>
        <label className={`fp-contact-field fp-contact-field--message${formErrors.message ? " has-error" : ""}`}>
          <span className="fp-contact-field__number">03</span>
          <span className="fp-contact-field__label">Your message</span>
          <textarea name="message" placeholder="Hi Dare, I’d like to talk about ..." required value={formValues.message} onChange={updateField} />
          {formErrors.message ? <span className="fp-contact-field__error">{formErrors.message}</span> : null}
        </label>
        <button className="fp-contact-submit fp-magnetic" type="submit" disabled={submitState === "sending"}>{buttonLabel}</button>
        {submitError ? <span className="fp-contact-submit-error">{submitError}</span> : null}
      </form>
      <aside className="fp-contact-details" aria-label="Contact details">
        <section>
          <h2>Contact Details</h2>
          <a href="mailto:dareabinde04@gmail.com" target="_blank" rel="noreferrer">dareabinde04@gmail.com</a>
          <a href="tel:+46769682090" target="_blank" rel="noreferrer">+46 7 69 68 20 90</a>
        </section>
        <section>
          <h2>Availability</h2>
          <p>Internship and graduate<br className="fp-contact-mobile-break" /> product design roles.</p>
          <p>Based in Sweden.</p>
        </section>
        <section>
          <h2>Socials</h2>
          <a href="https://www.linkedin.com/in/dareabinde/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://x.com/dareabinde" target="_blank" rel="noreferrer">Twitter</a>
          <a href="https://www.behance.net" target="_blank" rel="noreferrer">Behance</a>
        </section>
      </aside>
      <div className="fp-contact-bottom-line" />
      <div className="fp-contact-copyright-line" />
      <small className="fp-contact-copyright">© Dare Abinde. All rights reserved.</small>
    </FigmaFrame>
  );
}

function ResumePage() {
  return (
    <main className="fp-resume-viewer" aria-label="Dare Abinde resume">
      <img
        className="fp-resume-viewer__mobile-preview"
        src="/dare-abinde-resume-mobile.jpg"
        alt="Dare Abinde resume"
      />
      <iframe
        className="fp-resume-viewer__frame"
        src={resumePdfHref}
        title="Dare Abinde Resume"
      />
      <a className="fp-resume-viewer__fallback" href={resumePdfHref} target="_blank" rel="noreferrer">
        Open resume PDF
      </a>
    </main>
  );
}

type FigmaMetaItem = {
  label: string;
  value: string;
};

type FigmaStoryItem = {
  label: string;
  body: string;
  bodyWidth?: number;
};

type FigmaProcessItem = {
  number: string;
  phase: string;
  title: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  artifactTitle: string;
  artifactBody: string;
  artifactVariant?: "quote" | "journey" | "flow" | "reflection";
};

type FigmaExportImage = {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  className?: string;
};

function FigmaCaseMeta({ items }: { items: FigmaMetaItem[] }) {
  return (
    <section className="figma-case-meta">
      {items.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <hr />
          <p>{item.value}</p>
        </article>
      ))}
    </section>
  );
}

function FigmaCaseStory({ items, className }: { items: FigmaStoryItem[]; className?: string }) {
  return (
    <section className={`figma-case-story${className ? ` ${className}` : ""}`}>
      <p className="figma-case-kicker">DESIGN STORY</p>
      {[90, 269, 448, 627, 806].map((top) => <span className="figma-case-story__line" style={{ top }} key={top} />)}
      {items.map((item, index) => (
        <article className="figma-case-story__row" style={{ top: 119 + index * 179 }} key={item.label}>
          <h2>{item.label}</h2>
          <p style={{ width: item.bodyWidth ?? 440 }}>{item.body}</p>
        </article>
      ))}
    </section>
  );
}

function FigmaCaseBrief() {
  return (
    <section className="figma-case-brief">
      <p className="figma-case-kicker">PROJECT BRIEF</p>
      <h2>The brief</h2>
      <p>
        ICA Banken already creates a more accessible entry point for English-speaking internationals through English-assisted onboarding, student-focused products, and applications without Mobile BankID. The project brief was to explore how that accessibility could continue inside the mobile app, supporting customers as they move from opening an account to managing everyday financial tasks.
      </p>
    </section>
  );
}

function FigmaCaseProcess({ items }: { items: FigmaProcessItem[] }) {
  return (
    <section className="figma-case-process">
      <p className="figma-case-kicker">DESIGN PROCESS</p>
      <h2>From early access to everyday confidence.</h2>
      <p className="figma-case-process__intro">
        I used the double diamond as a way to keep the concept grounded: first understanding where English-speaking customers lose confidence, then turning that evidence into clearer banking flows.
      </p>
      {items.map((item, index) => (
        <article className="figma-case-process__row" style={{ top: 360 + index * 820 }} key={item.phase}>
          <div className="figma-case-process__phase">
            <p className="figma-case-process__number">{item.number}</p>
            <span>{item.phase}</span>
            <h3>{item.title}</h3>
          </div>
          <div className="figma-case-process__copy">
            {item.sections.map((section) => (
              <section key={section.title}>
                <h4>{section.title}</h4>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
          <div className={`figma-case-process__artifact${item.artifactVariant ? ` figma-case-process__artifact--${item.artifactVariant}` : ""}`}>
            <span>PLACEHOLDER</span>
            <h4>{item.artifactTitle}</h4>
            <p>{item.artifactBody}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function IcaDesktopNarrative() {
  return (
    <>
      <section className="figma-ica-desktop-only figma-ica-project-brief">
        <p className="figma-ica-narrative__kicker">PROJECT BRIEF</p>
        <p className="figma-ica-narrative__body">
          ICA Banken already creates a more accessible entry point for English-speaking internationals through easy and English-assisted onboarding, student-focused products, and applications without Mobile BankID. The project brief was to explore how that accessibility could continue inside the mobile app, supporting customers as they move from opening an account to managing everyday financial tasks.
        </p>
      </section>

      <section className="figma-ica-desktop-only figma-ica-narrative-phase figma-ica-narrative-phase--discover">
        <div className="figma-ica-narrative__phase-heading">
          <p>DISCOVER</p>
          <h2>Understanding the gap between joining and staying.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-ica-narrative__copy--audit">
          <h3>Product and business audit</h3>
          <p>I started by looking at the path around the app: how ICA Banken attracts international customers, how account opening is framed, and what happens when everyday banking moves into the mobile interface. The audit showed a clear break in continuity. ICA Banken makes joining feel accessible, but the Swedish-only app makes recurring financial tasks less supported, especially when users need to understand terms, payments, or account details.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-ica-narrative__copy--research">
          <h3>Lightweight user research</h3>
          <p>To ground the audit in real use, I asked two English-speaking ICA users how they manage the Swedish-only app during everyday banking, especially when something feels unclear or unfamiliar. Both responses pointed to the same behaviour: people could cope with familiar tasks, but unfamiliar banking terms quickly pushed them into screenshots, translation tools, or guesswork.</p>
        </div>
      </section>

      <FigmaExport className="figma-ica-desktop-only figma-ica-process-visual" src={icaProcessResearch4x} alt="ICA Banken product audit and anonymised user research responses" left={100} top={2769} width={1480} height={785.094} />

      <section className="figma-ica-desktop-only figma-ica-narrative-phase figma-ica-narrative-phase--define">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEFINE</p>
          <h2>Reframing language as a retention problem.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-ica-narrative__copy--tension">
          <h3>The design tension</h3>
          <p>The clearest tension was not that English-speaking customers could not open an account. It was that ICA Banken could be accessible at the moment they needed a bank most, then become harder to use once they began managing everyday financial tasks through it.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-ica-narrative__copy--opportunity">
          <h3>Design opportunity</h3>
          <p>The opportunity became: how might ICA Banken retain international customers beyond onboarding by making everyday banking accessible in English? This framed language as part of trust, confidence, and long-term loyalty, rather than a surface-level translation request.</p>
        </div>
      </section>

      <FigmaExport className="figma-ica-desktop-only figma-ica-process-visual" src={icaProcessJourney4x} alt="ICA Banken customer journey and confidence curve" left={100} top={4146.094} width={1480} height={930.781} />

      <section className="figma-ica-desktop-only figma-ica-narrative-phase figma-ica-narrative-phase--develop">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEVELOP</p>
          <h2>Designing around confidence, not just translation.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-ica-narrative__copy--flows">
          <h3>Flow decisions</h3>
          <p>I focused on the moments where uncertainty slows users down: checking balances, moving money, reviewing payments, understanding cards, and changing profile settings. English navigation was only one layer. The redesign also needed clearer hierarchy, familiar banking patterns, and short explanations around terms that can carry financial consequences.</p>
        </div>
      </section>

      <FigmaExport className="figma-ica-desktop-only figma-ica-process-visual" src={icaProcessWireframes4x} alt="ICA Banken wireframes and key design decisions" left={100} top={5488.875} width={1480} height={883} />

      <section className="figma-ica-desktop-only figma-ica-final-direction">
        <div>
          <h3>Final design direction</h3>
          <p>The final screens keep ICA Banken’s visual language close enough to feel recognisable, while making the app more usable for customers who bank in English. The prototype explores light and dark modes so the language decision feels like part of the product system, not a one-off accessibility patch.</p>
          <p>The redesign ensures that users are able to confidently manage their finances without leaving the app.</p>
          <div className="figma-ica-colors" aria-label="ICA Banken light mode colours">
            <span>Primary Color: <i style={{ background: "#ec0505" }} />#EC0505</span>
            <span>Secondary Colors: <i style={{ background: "#fbf6ef" }} />#FBF6EF <i style={{ background: "#fff" }} />#FFFFFF</span>
          </div>
        </div>
      </section>

      <section className="figma-ica-desktop-only figma-ica-deliver">
        <div className="figma-ica-narrative__phase-heading">
          <p>DELIVER</p>
          <h2>A concept for banking users can stay with.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-ica-narrative__copy--enables">
          <h3>What the concept enables</h3>
          <p>The concept extends ICA Banken’s early accessibility into the daily banking experience. A customer can understand where they are, review sensitive actions before confirming them, and complete routine tasks without leaving the app to translate unfamiliar language.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-ica-narrative__copy--reflection">
          <h3>Next steps and reflection</h3>
          <p>If this were a live project, I would test the English flows with international customers and measure task completion, comprehension, confidence, and reliance on translation tools. The main lesson for me was that accessibility does not end at onboarding. For a banking product, it has to keep showing up every time a customer needs to make a decision with their money.</p>
        </div>
      </section>
    </>
  );
}

const icaResponsiveLightScreens = [
  icaResponsiveLight01, icaResponsiveLight02, icaResponsiveLight03, icaResponsiveLight04, icaResponsiveLight05,
  icaResponsiveLight06, icaResponsiveLight07, icaResponsiveLight08, icaResponsiveLight09, icaResponsiveLight10,
];

const icaResponsiveDarkScreens = [
  icaResponsiveDark01, icaResponsiveDark02, icaResponsiveDark03, icaResponsiveDark04, icaResponsiveDark05,
  icaResponsiveDark06, icaResponsiveDark07, icaResponsiveDark08, icaResponsiveDark09, icaResponsiveDark10,
];

function IcaResponsiveCopyBlock({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <article className={`figma-ica-responsive-copy-block ${className}`.trim()}>
      {title ? <h3>{title}</h3> : null}
      <div>{children}</div>
    </article>
  );
}

function IcaResponsivePhase({ phase, title, children, className = "" }: { phase: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`figma-ica-responsive-phase figma-ica-responsive-phase--${phase.toLowerCase()} ${className}`.trim()}>
      <p className="figma-ica-responsive-kicker">{phase}</p>
      <h2>{title}</h2>
      <div className="figma-ica-responsive-phase__body">{children}</div>
    </section>
  );
}

function useSwipePagination<T extends HTMLElement = HTMLDivElement>(itemCount: number) {
  const scrollerRef = useRef<T>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(scroller.querySelectorAll<HTMLElement>("[data-swipe-index]"));
        if (!items.length) return;

        const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
        if (scroller.scrollLeft <= 1) {
          setActiveIndex(0);
          return;
        }
        if (scroller.scrollLeft >= maxScroll - 1) {
          setActiveIndex(items.length - 1);
          return;
        }

        const firstOffset = items[0].offsetLeft;
        const leadingEdge = scroller.scrollLeft + firstOffset;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        items.forEach((item, index) => {
          const distance = Math.abs(item.offsetLeft - leadingEdge);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      });
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(scroller);
    scroller.querySelectorAll<HTMLElement>("[data-swipe-index]").forEach((item) => resizeObserver.observe(item));
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, [itemCount]);

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    const item = scroller?.querySelector<HTMLElement>(`[data-swipe-index="${index}"]`);
    if (!scroller || !item) return;
    const firstItem = scroller.querySelector<HTMLElement>("[data-swipe-index]");
    scroller.scrollTo({
      left: item.offsetLeft - (firstItem?.offsetLeft ?? 0),
      behavior: "smooth",
    });
  }, []);

  return { scrollerRef, activeIndex, scrollToIndex };
}

function IcaSwipePagination({ count, activeIndex, onSelect, label, className = "" }: { count: number; activeIndex: number; onSelect: (index: number) => void; label: string; className?: string }) {
  return (
    <div className={`figma-ica-swipe-pagination ${className}`.trim()} role="group" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <button
          className={index === activeIndex ? "is-active" : ""}
          type="button"
          aria-label={`Show screen ${index + 1} of ${count}`}
          aria-current={index === activeIndex ? "true" : undefined}
          onClick={() => onSelect(index)}
          key={index}
        />
      ))}
    </div>
  );
}

function IcaResponsiveGallery({ mode, screens }: { mode: "light" | "dark"; screens: string[] }) {
  const { scrollerRef, activeIndex, scrollToIndex } = useSwipePagination(screens.length);
  return (
    <section className={`figma-ica-responsive-gallery figma-ica-responsive-gallery--${mode}`}>
      <div className="figma-ica-responsive-gallery__header">
        <p>{mode === "light" ? "LIGHT MODE" : "DARK MODE"}</p>
      </div>
      <div ref={scrollerRef} className="figma-ica-responsive-gallery__scroller" aria-label={`ICA Banken ${mode} mode screens`}>
        {screens.map((src, index) => <img data-swipe-index={index} src={src} alt={`ICA Banken ${mode} mode screen ${index + 1}`} key={src} />)}
      </div>
      <IcaSwipePagination count={screens.length} activeIndex={activeIndex} onSelect={scrollToIndex} label={`${mode} mode screen navigation`} />
    </section>
  );
}

function IcaResponsiveNav({ className = "" }: { className?: string }) {
  const path = currentPath();
  const isActive = (href: string) => href === "/work" ? path === "/work" || path.startsWith("/case/") : path === href;

  return (
    <header className={`figma-ica-responsive-nav${className ? ` ${className}` : ""}`}>
      <a className="figma-ica-responsive-nav__brand" href="/">DARE.</a>
      <nav className="figma-ica-responsive-nav__links" aria-label="Main navigation">
        <a href="/work" aria-current={isActive("/work") ? "page" : undefined}>Work</a>
        <a href="/about" aria-current={isActive("/about") ? "page" : undefined}>About</a>
        <a href={resumePageHref} target="_blank" rel="noreferrer">Resume</a>
        <button className="figma-ica-responsive-nav__llm" type="button" onClick={() => window.dispatchEvent(new CustomEvent("portfolio:open-dare-llm"))}>DARE LLM<span className="fp-nav__llm-status" aria-hidden="true" /></button>
        <a className="figma-ica-responsive-nav__contact" href="/contact" aria-current={isActive("/contact") ? "page" : undefined}><span>Contact Me</span></a>
      </nav>
      <button
        className="figma-ica-responsive-nav__menu"
        type="button"
        aria-label="Open menu"
        onClick={() => window.dispatchEvent(new CustomEvent("portfolio:open-navigation"))}
      >
        <img src={icaResponsiveMenuIcon} alt="" />
      </button>
    </header>
  );
}

const icaJourneySteps = [
  ["01", "Entry point", "English-assisted onboarding and student positioning make ICA feel approachable."],
  ["02", "First setup", "The customer opens an account and learns where core banking tasks live."],
  ["03", "Familiar tasks", "Checking balance and repeating known transfers becomes manageable through memory."],
  ["04", "Unfamiliar task", "New terms, payment details, or settings create hesitation and translation work."],
  ["05", "Long-term choice", "Once other banks become available, confidence can become a reason to stay or leave."],
];

function IcaResponsiveJourney() {
  return (
    <section className="figma-ica-responsive-journey">
      <h2>Where confidence drops after onboarding</h2>
      <div className="figma-ica-responsive-journey__steps">
        {icaJourneySteps.map(([number, title, body]) => (
          <article key={number}>
            <b>{number}</b><h3>{title}</h3><p>{body}</p>
          </article>
        ))}
      </div>
      <h3 className="figma-ica-responsive-journey__curve-title">Confidence curve</h3>
      <div className="figma-ica-responsive-confidence">
        <picture>
          <source media="(max-width: 575px)" srcSet={icaResponsiveConfidenceMobile} />
          <img src={icaResponsiveConfidenceTablet} alt="Confidence falls as translation dependency increases after onboarding." />
        </picture>
      </div>
    </section>
  );
}

type IcaWireframeKind = "home" | "account" | "language" | "payment" | "profile";

function IcaWireframeNav() {
  return <div className="ica-wireframe__bottom"><span>●<small>Home</small></span><span>○<small>Save</small></span><span>○<small>Borrow</small></span><span>○<small>Insure</small></span><span>○<small>More</small></span></div>;
}

function IcaWireframeScreen({ kind }: { kind: IcaWireframeKind }) {
  if (kind === "home") return (
    <article className="ica-wireframe ica-wireframe--home"><small>9:41</small><p>Good morning, LOREM</p><h4>My finances</h4><i className="ica-wireframe__avatar" />
      <section className="ica-wireframe__balance"><b>ICA Everyday</b><em>••• 4946</em><strong>10 000,00 kr</strong><small>Available now · Updated just now</small></section>
      <div className="ica-wireframe__actions"><span>○<small>New payment</small></span><span>○<small>Transfer</small></span><span>○<small>Scheduled</small></span></div>
      <section className="ica-wireframe__guide"><b>New to Swedish banking?</b><i /><i /></section><h5>Accounts</h5><section className="ica-wireframe__row">○ <span><b>ICA Everyday</b><small>10 000,48 kr available</small></span><em>›</em></section><IcaWireframeNav />
    </article>
  );
  if (kind === "account") return (
    <article className="ica-wireframe ica-wireframe--account"><small>9:41</small><p>Close</p><h4>ICA Everyday</h4><section className="ica-wireframe__balance"><b>Account balance</b><strong>10 000,00 kr</strong><small>Card · ••• 4946</small></section><h5>Latest activity</h5>{["+313,85 kr", "-125,39 kr", "+313,85 kr"].map((v,i)=><section className="ica-wireframe__transaction" key={i}>○ <span><b>Lorem ipsum</b><small>3 Jul</small></span><em>{v}</em></section>)}<IcaWireframeNav /></article>
  );
  if (kind === "language") return (
    <article className="ica-wireframe ica-wireframe--language"><small>9:41</small><p>Back</p><h4>Language</h4><h5>Choose app language</h5><section className="ica-wireframe__option"><span><b>Swedish</b><small>Svenska</small></span><em>›</em></section><section className="ica-wireframe__option"><span><b>English</b><small>For international users</small></span><em>Active</em></section><IcaWireframeNav /></article>
  );
  if (kind === "payment") return (
    <article className="ica-wireframe ica-wireframe--payment"><small>9:41</small><p>Back</p><h4>New Payment</h4><h5>Pay someone</h5>{["OCR number", "Message", "Recipient", "Amount", "Send date", "From"].map(v=><label key={v}>{v}<i /></label>)}<button type="button">Review payment</button></article>
  );
  return (
    <article className="ica-wireframe ica-wireframe--profile"><small>9:41</small><p>Close</p><h4>Lorem Ipsum</h4><h5>My data</h5>{["My details", "Privacy", "Offers", "Documents", "Log out"].map(v=><section className="ica-wireframe__option" key={v}><span><b>{v}</b></span><em>›</em></section>)}<IcaWireframeNav /></article>
  );
}

function IcaResponsiveWireframes() {
  const screens = [icaResponsiveWireframe01, icaResponsiveWireframe02, icaResponsiveWireframe04, icaResponsiveWireframe03, icaResponsiveWireframe05];
  const { scrollerRef, activeIndex, scrollToIndex } = useSwipePagination(screens.length);
  return (
    <section className="figma-ica-responsive-wireframes">
      <div className="figma-ica-responsive-wireframes__intro">
        <h2>Key design decisions</h2>
        <div className="figma-ica-responsive-wireframes__decisions">
          <article><h3>Language as a setting</h3><p>English is treated as a product preference, not a temporary workaround.</p></article>
          <article><h3>Guidance in context</h3><p>Short explanations sit near sensitive banking terms instead of in a separate help area.</p></article>
          <article><h3>Review before action</h3><p>Payment and transfer flows give the user clear checks before committing.</p></article>
        </div>
      </div>
      <div ref={scrollerRef} className="figma-ica-responsive-wireframes__scroller" aria-label="ICA Banken mid-fidelity wireframes">
        <div>{screens.map((src, index) => <img data-swipe-index={index} className="ica-wireframe-image" src={src} alt={`ICA Banken mid-fidelity wireframe ${index + 1}`} key={src} />)}</div>
      </div>
      <IcaSwipePagination count={screens.length} activeIndex={activeIndex} onSelect={scrollToIndex} label="Wireframe screen navigation" />
    </section>
  );
}

function IcaResponsiveFooter({
  title = "CALMOTION",
  href = "/case/calmotion",
  thumbnail = nextCalmotionFigma4x,
  thumbnailSlug,
}: {
  title?: string;
  href?: string;
  thumbnail?: string;
  thumbnailSlug?: string;
}) {
  return (
    <footer className="figma-ica-responsive-footer">
      <div className="figma-ica-responsive-footer__next">
        <p>Next Case</p><div className="figma-ica-responsive-footer__rule" />
        <a href={href} data-preview-slug={thumbnailSlug}>
          <h2>{title}</h2>
          <span className="figma-ica-responsive-footer__thumb-frame"><img src={thumbnail} alt={`${title} project`} /></span>
        </a>
      </div>
      <div className="figma-ica-responsive-footer__links">
        <div><strong>Pages</strong><a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a><a href={resumePageHref} target="_blank" rel="noreferrer">Resume</a></div>
        <div><strong>Work</strong><a href="/case/ica-banken">ICA Banken</a><a href="/case/calmotion">Calmotion</a><a href="/case/safemap">SafeMap</a><a href="/work">...All</a></div>
        <div><strong>Connect</strong><a href="https://www.linkedin.com/in/dareabinde/" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:dareabinde04@gmail.com" target="_blank" rel="noreferrer">Email</a><a href="https://x.com/dareabinde" target="_blank" rel="noreferrer">Twitter</a><a href="https://www.behance.net" target="_blank" rel="noreferrer">Behance</a></div>
      </div>
      <small>© Dare Abinde. All rights reserved.</small>
    </footer>
  );
}

const calmotionResponsiveScreens = [
  calmotionResponsiveScreen01,
  calmotionResponsiveScreen02,
  calmotionResponsiveScreen03,
  calmotionResponsiveScreen04,
  calmotionResponsiveScreen05,
  calmotionResponsiveScreen06,
  calmotionResponsiveScreen07,
  calmotionResponsiveScreen08,
  calmotionResponsiveScreen09,
  calmotionResponsiveScreen10,
];

function CalmotionResponsiveArtifact({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <figure className={`figma-calmotion-responsive-artifact ${className}`.trim()}>
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function CalmotionResponsiveNarrative({
  hudStates,
}: {
  hudStates: { src: string; alt: string }[];
}) {
  const hudPagination = useSwipePagination(hudStates.length);
  const appPagination = useSwipePagination(calmotionResponsiveScreens.length);
  return (
    <>
      <section className="figma-ica-responsive-brief figma-calmotion-responsive-brief">
        <p className="figma-ica-responsive-kicker">PROJECT BRIEF</p>
        <p>Modern cars are increasingly intelligent. They can see the road, track speed, detect hazards, and predict risks. But they remain largely unaware of the emotional state of the person behind the wheel. The brief was to design an emotionally aware driver support system that could recognise emotional changes and support drivers through different moments on the road.</p>
      </section>

      <IcaResponsivePhase phase="DISCOVER" title="Understanding what support feels like behind the wheel." className="figma-calmotion-responsive-phase">
        <IcaResponsiveCopyBlock title="User research"><p>I led the team in conducting semi-structured interviews with six licensed drivers aged 19 to 36. The group included drivers from Sweden, China, the US, and Nigeria, with a mix of professionals, daily commuters, and occasional drivers. We explored emotional triggers, coping habits while driving, information management, AI trust, privacy, and the kinds of in-car support drivers would accept or reject.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Synthesis"><p>Interview transcripts were coded and interpreted, and recurring observations were grouped through thematic analysis. We then connected the strongest themes to design implications. Safety, trust, and control appeared most often. Drivers welcomed calm support, but wanted less visual clutter, clear privacy controls, and the freedom to dismiss or switch off assistance whenever it felt unnecessary.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <CalmotionResponsiveArtifact src={calmotionProcessPersona4x} alt="Calmotion driver persona" caption="DRIVER PERSONA" />

      <IcaResponsivePhase phase="DEFINE" title="Supporting the driver without taking over." className="figma-calmotion-responsive-phase">
        <IcaResponsiveCopyBlock title="The design tension"><p>The research reframed the challenge. Recognising emotion would not make Calmotion supportive on its own. The system also had to decide when to respond, which channel to use, and when to remain quiet. The team mapped a typical commute to locate these pressure points, showing how the same prompt could feel helpful at a natural pause and distracting during congestion, rerouting, or an already demanding moment.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Design principles"><p>The research gave a clear direction: keep the driving view minimal, time support to suit the situation, and preserve the driver’s autonomy. The system should suggest rather than instruct, use a neutral tone, and allow drivers to dismiss every intervention. Sensitive emotional information also needs to remain understandable and controllable, with settings handled away from the immediate driving view.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <CalmotionResponsiveArtifact src={calmotionProcessJourney4x} alt="Calmotion driver journey map" caption="USER JOURNEY MAP" />

      <IcaResponsivePhase phase="DEVELOP" title="Choosing the quietest useful intervention." className="figma-calmotion-responsive-phase figma-calmotion-responsive-phase--develop">
        <IcaResponsiveCopyBlock title="Exploring intervention ideas"><p>The development phase began with a broad brainstorming session covering multiple intervention concepts, including ambient lighting, sound, seat vibration, steering wheel pulses, wearables, voice, and HUD.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="From many ideas to one system"><p>The team clustered the ideas by sensory channel, intrusiveness, and attention load, then tested the strongest options through rapid sketches and driving scenarios. A feasibility and impact review led us to combine a minimal HUD with an adaptive voice companion.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <div className="figma-calmotion-responsive-artifact-stack">
        <CalmotionResponsiveArtifact src={calmotionProcessFlow4x} alt="Calmotion driver assistance user flow" caption="USER FLOW" />
        <CalmotionResponsiveArtifact src={calmotionProcessSketches4x} alt="Calmotion early HUD paper sketches" caption="LO-FI PAPER SKETCHES" />
        <CalmotionResponsiveArtifact src={calmotionProcessHudIa} alt="Calmotion HUD information architecture" caption="HUD DESIGN IA" />
      </div>

      <section className="figma-calmotion-responsive-testing">
        <h2>Testing the first design and learning what to change.</h2>
        <div className="figma-calmotion-responsive-testing__body">
          <IcaResponsiveCopyBlock title="Wizard of Oz simulation"><p>Ten drivers tested the first HUD and voice design during a commute under time pressure in a driving simulator. A researcher operated Calmotion behind the scenes, triggering interface states and voice responses as events unfolded. This allowed us to evaluate the design as a connected experience even though the recognition layer was not yet functional. We focused on timing, tone, usefulness, and perceived intrusiveness.</p></IcaResponsiveCopyBlock>
          <IcaResponsiveCopyBlock title="What the first version got wrong"><p>Half of the participants found the first interface distracting or confusing, and 60% felt its colours and brightness were unsuitable for driving. We responded by reducing the HUD to essential information, softening its visual treatment, simplifying the interaction states, and moving settings, privacy controls, and emotional history into the companion app.</p></IcaResponsiveCopyBlock>
        </div>
      </section>

      <CalmotionResponsiveArtifact src={calmotionProcessWoz} alt="Calmotion Wizard of Oz usability testing" caption="WIZARD OF OZ USABILITY TESTING" />

      <section className="figma-ica-responsive-final-direction figma-calmotion-responsive-final-direction">
        <div>
          <h2>Final design direction</h2>
          <p>The final system separates what belongs during a drive from what can wait. The HUD keeps speed, navigation, and safety cues in the driver’s line of sight, while voice offers brief support that responds to the situation. The companion app handles connection, preferences, privacy, and emotional history when the driver is no longer managing the road.</p>
          <p>The system remains available without becoming authoritative. The driver can accept, dismiss, mute, or change the support at any time.</p>
          <p>Calmotion, a blend of Calm and Motion, uses its logo and app colours to communicate calmness, reliability, and technology. The HUD uses a restrained light palette to maintain a clean, minimal interface that does not compete for the driver’s attention.</p>
        </div>
        <div className="figma-ica-responsive-colors" aria-label="Calmotion app and HUD colours">
          <span><i style={{ background: "#749aff" }} /><b>#749AFF</b><small>Logo &amp; App</small></span>
          <span><i style={{ background: "#5d4dfd" }} /><b>#5D4DFD</b><small>Logo &amp; App</small></span>
          <span><i style={{ background: "#ebebec" }} /><b>#EBEBEC</b><small>HUD</small></span>
          <span><i style={{ background: "#f3f3f3" }} /><b>#F3F3F3</b><small>HUD</small></span>
        </div>
      </section>

      <section className="figma-calmotion-responsive-promo">
        <MuxLoopVideo playbackId={calmotionPromoPlaybackId} label="Calmotion promotional video" />
      </section>
      <section className="figma-calmotion-responsive-hud">
        <img className="figma-calmotion-responsive-hud__background" src={calHudBg} alt="Calmotion HUD inside a vehicle" />
        <div className="figma-calmotion-responsive-hud__viewport">
          <div ref={hudPagination.scrollerRef} className="figma-calmotion-responsive-hud__scroller" aria-label="Calmotion HUD screens">
            {hudStates.map((state, index) => (
              <div
                data-swipe-index={index}
                className="figma-calmotion-responsive-hud__screen"
                role="img"
                aria-label={state.alt}
                style={{ backgroundImage: `url(${state.src})` }}
                key={state.src}
              />
            ))}
          </div>
        </div>
        <IcaSwipePagination count={hudStates.length} activeIndex={hudPagination.activeIndex} onSelect={hudPagination.scrollToIndex} label="HUD screen navigation" />
      </section>
      <section className="figma-calmotion-responsive-prototype">
        <img src={calPrototypeFigma4x} alt="Calmotion app prototype section" />
        <video src={calPrototypeVideo} aria-label="Calmotion app prototype video" autoPlay muted loop playsInline preload="auto" />
      </section>
      <section className="figma-calmotion-responsive-gallery">
        <div className="figma-calmotion-responsive-gallery__header"><p>APP SCREENS</p></div>
        <div ref={appPagination.scrollerRef} className="figma-calmotion-responsive-gallery__scroller" aria-label="Calmotion app screens">
          {calmotionResponsiveScreens.map((src, index) => <img data-swipe-index={index} src={src} alt={`Calmotion app screen ${index + 1}`} key={src} />)}
        </div>
        <IcaSwipePagination count={calmotionResponsiveScreens.length} activeIndex={appPagination.activeIndex} onSelect={appPagination.scrollToIndex} label="App screen navigation" />
      </section>

      <IcaResponsivePhase phase="DELIVER" title="A calmer system, with the driver still in charge." className="figma-calmotion-responsive-phase figma-calmotion-responsive-phase--deliver">
        <IcaResponsiveCopyBlock title="What the concept enables"><p>Calmotion sought to move modern cars from being emotionally unintelligent to responding more thoughtfully to the person behind the wheel. The system provides contextual emotional support that helps drivers remain calm, focused, and in control through stress, fatigue, distraction, and unexpected road events. By responding to both the driving situation and the driver’s state, it aims to make difficult journeys feel safer, steadier, and less isolating.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Next steps and reflection"><p>The next steps would be to build and integrate Calmotion’s system into a working vehicle prototype, then test it under controlled and real-world driving conditions before deployment. I would validate intervention timing across different traffic conditions, compare voice and visual combinations, and test whether drivers understand and trust the privacy controls over time. The key design reflection for me is that emotional awareness should not equate to emotional control; an AI system is only useful when it respects the user’s agency.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>
    </>
  );
}

const safemapResponsiveWireframes = [
  safemapResponsiveWireframe01,
  safemapResponsiveWireframe02,
  safemapResponsiveWireframe03,
  safemapResponsiveWireframe04,
  safemapResponsiveWireframe05,
];

const safemapResponsiveScreens = [
  safemapResponsiveScreen01,
  safemapResponsiveScreen02,
  safemapResponsiveScreen03,
  safemapResponsiveScreen04,
  safemapResponsiveScreen05,
];

function SafeMapResponsiveArtifact({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="figma-safemap-responsive-artifact">
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function SafeMapResponsiveNarrative() {
  const wireframePagination = useSwipePagination(safemapResponsiveWireframes.length);
  const appPagination = useSwipePagination(safemapResponsiveScreens.length);
  return (
    <>
      <section className="figma-ica-responsive-brief figma-safemap-responsive-brief">
        <p className="figma-ica-responsive-kicker">PROJECT BRIEF</p>
        <p>Uppsala Kvinnojour (Uppsala Women’s Shelter) is an independent organisation that supports and protects women and children exposed to violence. Alongside direct support, they work preventively through education, public advocacy, and collaborative projects. The organisation came to us with an open brief: help us advance our mission. They shared what they do, who they serve, and the values guiding their work. The rest was ours to define. I led the team in examining where design could strengthen the organisation’s work.</p>
      </section>

      <IcaResponsivePhase phase="DISCOVER" title="Finding where design could strengthen the mission." className="figma-safemap-responsive-phase">
        <IcaResponsiveCopyBlock title="Desk research and secondary sources" className="figma-safemap-responsive-discover-copy figma-safemap-responsive-discover-copy--tablet"><p>We began by reviewing the forms of gendered violence connected to Uppsala Kvinnojour’s mission and where design could offer meaningful support. As a team, we chose to focus on public harassment because it is often subtle, normalised, and disregarded despite changing how people use public space.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="The reporting gap" className="figma-safemap-responsive-discover-copy figma-safemap-responsive-discover-copy--tablet"><p>Desk research revealed the scale of the reporting gap: Brå estimates that 86% of public harassment goes unreported, while the EU Gender-Based Violence Survey indicates that 88.7% of non-partner violence is not reported to authorities.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Desk research and secondary sources" className="figma-safemap-responsive-discover-copy figma-safemap-responsive-discover-copy--mobile"><p>We began by reviewing the forms of gendered violence connected to Uppsala Kvinnojour’s mission and where design could offer meaningful support. As a team, we chose to focus on public harassment because it is often subtle, normalised, and disregarded despite changing how people use public space. Desk research revealed the scale of the reporting gap: Brå estimates that 86% of public harassment goes unreported, while the EU Gender-Based Violence Survey indicates that 88.7% of non-partner violence is not reported to authorities.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <div className="figma-safemap-responsive-artifact-stack">
        <SafeMapResponsiveArtifact src={safemapProcessResearch} alt="Research evidence showing the public harassment reporting gap" caption="RESEARCH EVIDENCE" />
        <SafeMapResponsiveArtifact src={safemapProcessPersona} alt="Research-informed SafeMap persona" caption="RESEARCH-INFORMED PERSONA" />
      </div>

      <IcaResponsivePhase phase="DEFINE" title="Turning missing experiences into protected collective evidence." className="figma-safemap-responsive-phase">
        <IcaResponsiveCopyBlock title="Where an experience leaves the record"><p>Mapping the experience from incident to non-reporting revealed where evidence disappears. After assessing safety and seriousness, a person may decide that the effort, uncertainty, or privacy risk is not worthwhile. She adapts instead by changing routes, timing, or who she travels with. The experience remains socially known through personal habits and conversations, but becomes institutionally invisible.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="The design opportunity"><p>The value of collective evidence emerged here. One unreported experience is absent from public debate; many protected, structured reports can reveal recurring locations and patterns. The opportunity was not simply to increase reporting, but to create a route from individual experience to collective evidence without exposing the people contributing it.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <SafeMapResponsiveArtifact src={safemapProcessJourney} alt="Experience-to-evidence journey showing how incidents disappear from official data" caption="EXPERIENCE-TO-EVIDENCE JOURNEY" />

      <IcaResponsivePhase phase="DEVELOP" title="Designing a safer route from reporting to advocacy." className="figma-safemap-responsive-phase figma-safemap-responsive-phase--develop">
        <IcaResponsiveCopyBlock title="Counter-mapping as a design direction"><p>During development, counter-mapping became the direction that connected the research to Uppsala Kvinnojour’s advocacy work. SafeMap would allow lived experience to add another layer of knowledge about public space through a short anonymous reporting flow, controlled location precision, structured incident categories, and an aggregated impact map. The map was framed as evidence for institutions, not as a tool that tells women where they should or should not go.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <section className="figma-safemap-responsive-wireframes">
        <div ref={wireframePagination.scrollerRef} className="figma-safemap-responsive-wireframes__scroller" aria-label="SafeMap mid-fidelity wireframes">
          {safemapResponsiveWireframes.map((src, index) => <img data-swipe-index={index} src={src} alt={`SafeMap mid-fidelity wireframe ${index + 1}`} key={src} />)}
        </div>
        <IcaSwipePagination count={safemapResponsiveWireframes.length} activeIndex={wireframePagination.activeIndex} onSelect={wireframePagination.scrollToIndex} label="Wireframe screen navigation" />
        <div className="figma-safemap-responsive-wireframes__meta">
          <figcaption>MID-FIDELITY WIREFRAMES</figcaption>
        </div>
      </section>

      <section className="figma-ica-responsive-final-direction figma-safemap-responsive-final-direction">
        <div>
          <h2>Final design direction</h2>
          <p>SafeMap combines a four-step reporting flow with an aggregated public map. The flow keeps reporting direct, makes privacy choices visible, and explains how the information may be used. Individual reports do not appear as personal histories; they contribute to patterns across location, time, and incident type.</p>
          <p>The final design makes the relationship between one protected contribution and wider advocacy evidence visible.</p>
          <p>SafeMap retains Uppsala Kvinnojour’s pink and burgundy brand colours, carrying the organisation’s visual identity into the reporting experience while using a pale surface colour to keep the interface clear and approachable.</p>
        </div>
        <div className="figma-ica-responsive-colors" aria-label="SafeMap interface colours">
          <span><i style={{ background: "#ba1065" }} /><b>#BA1065</b><small>Primary</small></span>
          <span><i style={{ background: "#6f073c" }} /><b>#6F073C</b><small>Secondary</small></span>
          <span><i style={{ background: "#fff7fb" }} /><b>#FFF7FB</b><small>Surface</small></span>
        </div>
      </section>

      <section className="figma-safemap-responsive-prototype">
        <img src={safemapMockup1Figma4x} alt="SafeMap phone-in-hand mockup" />
        <video src={safemapPrototypeVideo} aria-label="SafeMap reporting prototype" autoPlay muted loop playsInline preload="auto" />
      </section>

      <section className="figma-safemap-responsive-gallery">
        <div className="figma-safemap-responsive-gallery__header"><p>APP SCREENS</p></div>
        <div ref={appPagination.scrollerRef} className="figma-safemap-responsive-gallery__scroller" aria-label="SafeMap app screens">
          {safemapResponsiveScreens.map((src, index) => <img data-swipe-index={index} src={src} alt={`SafeMap app screen ${index + 1}`} key={src} />)}
        </div>
        <IcaSwipePagination count={safemapResponsiveScreens.length} activeIndex={appPagination.activeIndex} onSelect={appPagination.scrollToIndex} label="App screen navigation" />
      </section>

      <section className="figma-safemap-responsive-service">
        <h2>Testing the service beyond the interface.</h2>
        <IcaResponsiveCopyBlock title="Service blueprint"><p>The service blueprint tested whether the idea could remain useful and responsible after a report was submitted. It separated what the person reporting sees from how information is protected, structured, aggregated, and used by Uppsala Kvinnojour. This exposed the safeguards the concept would need: optional detail, controlled location precision, no public profiles, and suitable thresholds before patterns appear.</p></IcaResponsiveCopyBlock>
      </section>

      <SafeMapResponsiveArtifact src={safemapProcessBlueprint} alt="SafeMap reporting-to-advocacy service blueprint" caption="REPORTING-TO-ADVOCACY SERVICE BLUEPRINT" />

      <IcaResponsivePhase phase="DELIVER" title="A concept that helps lived experience enter public decisions." className="figma-safemap-responsive-phase figma-safemap-responsive-phase--deliver">
        <IcaResponsiveCopyBlock title="What the concept enables"><p>SafeMap concept was designed to shift the shelter’s position in public discourse. Rather than responding only after incidents, the tool gives Uppsala Kvinnojour concrete, community-generated evidence. That evidence could support prevention work and conversations with city planners, funders, and policy stakeholders.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Next steps"><p>For further development, I would conduct co-design and usability testing with people affected by harassment and Uppsala Kvinnojour staff. I would validate the reporting language, privacy model, aggregation thresholds, and risks of public map misuse before deployment.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>
    </>
  );
}

function IcaResponsiveNarrative() {
  return (
    <>
      <section className="figma-ica-responsive-brief">
        <p className="figma-ica-responsive-kicker">PROJECT BRIEF</p>
        <p>ICA Banken already creates a more accessible entry point for English-speaking internationals through easy and English-assisted onboarding, student-focused products, and applications without Mobile BankID. The project brief was to explore how that accessibility could continue inside the mobile app, supporting customers as they move from opening an account to managing everyday financial tasks.</p>
      </section>

      <section className="figma-ica-responsive-research-media">
        <div className="figma-ica-responsive-research-media__audit">
          <figure><img src={icaResponsiveSwedishOnly} alt="ICA Banken Swedish-only app" /><figcaption>A Swedish-only app.</figcaption></figure>
          <figure><img src={icaResponsiveNoLanguage} alt="ICA Banken settings without language options" /><figcaption>No language options for Non-Swedish users.</figcaption></figure>
        </div>
        <p>User research responses</p>
        <div className="figma-ica-responsive-research-media__chats">
          <span><img src={icaResponsiveChat1} alt="Anonymised user research response one" /><i><img src={icaResponsivePixelate1} alt="" /></i></span>
          <span><img src={icaResponsiveChat2} alt="Anonymised user research response two" /><i><img src={icaResponsivePixelate2} alt="" /></i></span>
        </div>
      </section>

      <IcaResponsivePhase phase="DISCOVER" title="Understanding the gap between joining and staying.">
        <IcaResponsiveCopyBlock title="Product and business audit"><p>I started by looking at the path around the app: how ICA Banken attracts international customers, how account opening is framed, and what happens when everyday banking moves into the mobile interface. The audit showed a clear break in continuity. ICA Banken makes joining feel accessible, but the Swedish-only app makes recurring financial tasks less supported, especially when users need to understand terms, payments, or account details.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Lightweight user research">
          <p className="figma-ica-responsive-research-copy figma-ica-responsive-research-copy--tablet">
            To ground the audit in real use, I asked two<br />
            English-speaking ICA users how they manage the<br />
            Swedish-only app during everyday banking,<br />
            especially when something feels unclear or<br />
            unfamiliar. Both responses pointed to the same<br />
            behaviour: people could cope with familiar tasks,<br />
            but unfamiliar banking terms quickly pushed them<br />
            into screenshots, translation tools, or guesswork.
          </p>
          <p className="figma-ica-responsive-research-copy figma-ica-responsive-research-copy--mobile">
            To ground the audit in real use, I asked two English-<br />
            speaking ICA users how they manage the Swedish-<br />
            only app during everyday banking, especially when<br />
            something feels unclear or unfamiliar. Both responses<br />
            pointed to the same behaviour: people could cope<br />
            with familiar tasks, but unfamiliar banking terms<br />
            quickly pushed them into screenshots, translation<br />
            tools, or guesswork.
          </p>
        </IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <IcaResponsivePhase phase="DEFINE" title="Reframing language as a retention problem.">
        <IcaResponsiveCopyBlock title="The design tension"><p>The clearest tension was not that English-speaking customers could not open an account. It was that ICA Banken could be accessible at the moment they needed a bank most, then become harder to use once they began managing everyday financial tasks through it.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Design opportunity"><p>The opportunity became: how might ICA Banken retain international customers beyond onboarding by making everyday banking accessible in English? This framed language as part of trust, confidence, and long-term loyalty, rather than a surface-level translation request.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <IcaResponsiveJourney />

      <IcaResponsivePhase phase="DEVELOP" title="Designing around confidence, not just translation." className="figma-ica-responsive-phase--develop">
        <IcaResponsiveCopyBlock title="Flow decisions"><p>I focused on the moments where uncertainty slows users down: checking balances, moving money, reviewing payments, understanding cards, and changing profile settings. English navigation was only one layer. The redesign also needed clearer hierarchy, familiar banking patterns, and short explanations around terms that can carry financial consequences.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock><p>Since this project was a redesign of an established live banking app, I bypassed low-fidelity paper sketching and initiated the layout process directly in mid-fidelity. This allowed me to immediately focus on optimizing precise information hierarchy, card component structures, and content density to improve scannability.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <IcaResponsiveWireframes />

      <section className="figma-ica-responsive-final-direction">
        <div>
          <h2>Final design direction</h2>
          <p>The final screens keep ICA Banken’s visual language close enough to feel recognisable, while making the app more usable for customers who bank in English. The prototype explores light and dark modes so the language decision feels like part of the product system, not a one-off accessibility patch.</p>
          <p>The redesign ensures that users are able to confidently manage their finances without leaving the app.</p>
        </div>
        <div className="figma-ica-responsive-colors" aria-label="ICA Banken light mode colours">
          <span><i style={{ background: "#ec0505" }} /><b>#EC0505</b><small>Primary</small></span>
          <span><i style={{ background: "#fbf6ef" }} /><b>#FBF6EF</b><small>Secondary</small></span>
          <span><i style={{ background: "#fff" }} /><b>#FFFFFF</b><small>Base</small></span>
        </div>
      </section>

      <img className="figma-ica-responsive-mockup" src={icaMockup1Figma4x} alt="ICA Banken light and dark mode mockups" />
      <section className="figma-ica-responsive-prototype">
        <img src={icaPrototypeBg4x} alt="ICA Banken prototype presentation" />
        <video className="figma-ica-prototype-video figma-ica-prototype-video--light" src={icaLmPrototypeVideo} aria-label="ICA Banken light mode prototype" autoPlay muted loop playsInline />
        <video className="figma-ica-prototype-video figma-ica-prototype-video--dark" src={icaDmPrototypeVideo} aria-label="ICA Banken dark mode prototype" autoPlay muted loop playsInline />
        <button className="figma-case-prototype-label figma-case-prototype-label--ica" type="button"><span>PROTOTYPE</span><img src={icaPrototypePlayIcon4x} alt="" /></button>
      </section>
      <IcaResponsiveGallery mode="light" screens={icaResponsiveLightScreens} />
      <IcaResponsiveGallery mode="dark" screens={icaResponsiveDarkScreens} />

      <IcaResponsivePhase phase="DELIVER" title="A concept for banking users can stay with." className="figma-ica-responsive-phase--deliver">
        <IcaResponsiveCopyBlock title="What the concept enables"><p>The concept extends ICA Banken’s early accessibility into the daily banking experience. A customer can understand where they are, review sensitive actions before confirming them, and complete routine tasks without leaving the app to translate unfamiliar language.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Next steps and reflection"><p>If this were a live project, I would test the English flows with international customers and measure task completion, comprehension, confidence, and reliance on translation tools. The main lesson for me was that accessibility does not end at onboarding. For a banking product, it has to keep showing up every time a customer needs to make a decision with their money.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>
    </>
  );
}

function CalmotionDesktopNarrative() {
  return (
    <>
      <section className="figma-calmotion-desktop-only figma-calmotion-project-brief">
        <p className="figma-ica-narrative__kicker">PROJECT BRIEF</p>
        <p className="figma-ica-narrative__body">
          Modern cars are increasingly intelligent. They can see the road, track speed, detect hazards, and predict risks. But they remain largely unaware of the emotional state of the person behind the wheel. The brief was to design an emotionally aware driver support system that could recognise emotional changes and support drivers through different moments on the road.
        </p>
      </section>

      <section className="figma-calmotion-desktop-only figma-calmotion-narrative-phase figma-calmotion-narrative-phase--discover">
        <div className="figma-ica-narrative__phase-heading">
          <p>DISCOVER</p>
          <h2>Understanding what support feels like behind the wheel.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--interviews">
          <h3>User research</h3>
          <p>I led the team in conducting semi-structured interviews with six licensed drivers aged 19 to 36. The group included drivers from Sweden, China, the US, and Nigeria, with a mix of professionals, daily commuters, and occasional drivers. We explored emotional triggers, coping habits while driving, information management, AI trust, privacy, and the kinds of in-car support drivers would accept or reject.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--patterns">
          <h3>Synthesis</h3>
          <p>Interview transcripts were coded and interpreted, and recurring observations were grouped through thematic analysis. We then connected the strongest themes to design implications. Safety, trust, and control appeared most often. Drivers welcomed calm support, but wanted less visual clutter, clear privacy controls, and the freedom to dismiss or switch off assistance whenever it felt unnecessary.</p>
        </div>
      </section>

      <FigmaExport className="figma-calmotion-desktop-only figma-calmotion-process-visual" src={calmotionProcessPersona4x} alt="Calmotion driver persona" left={100} top={2769} width={1480} height={916} />
      <p className="figma-calmotion-desktop-only figma-calmotion-artifact-label" style={{ top: 3703 }}>DRIVER PERSONA</p>

      <section className="figma-calmotion-desktop-only figma-calmotion-narrative-phase figma-calmotion-narrative-phase--define">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEFINE</p>
          <h2>Supporting the driver without taking over.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--tension">
          <h3>The design tension</h3>
          <p>The research reframed the challenge. Recognising emotion would not make Calmotion supportive on its own. The system also had to decide when to respond, which channel to use, and when to remain quiet. The team mapped a typical commute to locate these pressure points, showing how the same prompt could feel helpful at a natural pause and distracting during congestion, rerouting, or an already demanding moment.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--principles">
          <h3>Design principles</h3>
          <p>The research gave a clear direction: keep the driving view minimal, time support to suit the situation, and preserve the driver’s autonomy. The system should suggest rather than instruct, use a neutral tone, and allow drivers to dismiss every intervention. Sensitive emotional information also needs to remain understandable and controllable, with settings handled away from the immediate driving view.</p>
        </div>
      </section>

      <p className="figma-calmotion-desktop-only figma-calmotion-artifact-label" style={{ top: 5116.5 }}>USER JOURNEY MAP</p>
      <FigmaExport className="figma-calmotion-desktop-only figma-calmotion-process-visual" src={calmotionProcessJourney4x} alt="Calmotion driver journey map" left={100} top={4355} width={1480} height={801} />

      <section className="figma-calmotion-desktop-only figma-calmotion-narrative-phase figma-calmotion-narrative-phase--develop">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEVELOP</p>
          <h2>Choosing the quietest useful intervention.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--concept">
          <h3>From many ideas to one system</h3>
          <p>The development phase began with a broad brainstorming session covering multiple intervention concepts, including ambient lighting, sound, seat vibration, steering wheel pulses, wearables, voice, and HUD. The team clustered the ideas by sensory channel, intrusiveness, and attention load, then tested the strongest options through rapid sketches and driving scenarios. A feasibility and impact review led us to combine a minimal HUD with an adaptive voice companion.</p>
        </div>
      </section>

      <p className="figma-calmotion-desktop-only figma-calmotion-artifact-label" style={{ top: 5993 }}>USER FLOW</p>
      <FigmaExport className="figma-calmotion-desktop-only figma-calmotion-process-visual" src={calmotionProcessFlow4x} alt="Calmotion driver assistance user flow" left={100} top={5594} width={1480} height={407} />
      <p className="figma-calmotion-desktop-only figma-calmotion-artifact-label" style={{ top: 6604 }}>LO FI PAPER SKETCHES</p>
      <FigmaExport className="figma-calmotion-desktop-only figma-calmotion-process-visual" src={calmotionProcessSketches4x} alt="Calmotion early HUD paper sketches" left={100} top={6061} width={1480} height={525} />
      <p className="figma-calmotion-desktop-only figma-calmotion-artifact-label" style={{ top: 7118.8 }}>HUD DESIGN IA</p>
      <FigmaExport className="figma-calmotion-desktop-only figma-calmotion-process-visual" src={calmotionProcessHudIa} alt="Calmotion HUD information architecture" left={100} top={6646} width={1480} height={484} />

      <section className="figma-calmotion-desktop-only figma-calmotion-testing">
        <div className="figma-ica-narrative__phase-heading">
          <h2>Testing the first design and learning what to change.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--woz">
          <h3>Wizard of Oz simulation</h3>
          <p>Ten drivers tested the first HUD and voice design during a commute under time pressure in a driving simulator. A researcher operated Calmotion behind the scenes, triggering interface states and voice responses as events unfolded. This allowed us to evaluate the design as a connected experience even though the recognition layer was not yet functional. We focused on timing, tone, usefulness, and perceived intrusiveness.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--test-findings">
          <h3>What the first version got wrong</h3>
          <p>Half of the participants found the first interface distracting or confusing, and 60% felt its colours and brightness were unsuitable for driving. We responded by reducing the HUD to essential information, softening its visual treatment, simplifying the interaction states, and moving settings, privacy controls, and emotional history into the companion app.</p>
        </div>
      </section>

      <p className="figma-calmotion-desktop-only figma-calmotion-artifact-label" style={{ top: 8345 }}>WIZARD OF OZ USABILITY TESTING</p>
      <FigmaExport className="figma-calmotion-desktop-only figma-calmotion-process-visual" src={calmotionProcessWoz} alt="Calmotion Wizard of Oz usability testing" left={100} top={7800} width={1480} height={527} />

      <section className="figma-calmotion-desktop-only figma-calmotion-final-direction">
        <div>
          <h3>Final design direction</h3>
          <p>The final system separates what belongs during a drive from what can wait. The HUD keeps speed, navigation, and safety cues in the driver’s line of sight, while voice offers brief support that responds to the situation. The companion app handles connection, preferences, privacy, and emotional history when the driver is no longer managing the road.</p>
          <p>The system remains available without becoming authoritative. The driver can accept, dismiss, mute, or change the support at any time.</p>
          <p>Calmotion, a blend of Calm and Motion, uses its logo and app colours to communicate calmness, reliability, and technology. The HUD uses a restrained light palette to maintain a clean, minimal interface that does not compete for the driver’s attention.</p>
          <div className="figma-ica-colors" aria-label="Calmotion app and HUD colours">
            <span>Logo &amp; App: <i style={{ background: "#749aff" }} />#749AFF <i style={{ background: "#5d4dfd" }} />#5D4DFD</span>
            <span>HUD: <i style={{ background: "#ebebec" }} />#EBEBEC <i style={{ background: "#f3f3f3" }} />#F3F3F3</span>
          </div>
        </div>
      </section>

      <section className="figma-calmotion-desktop-only figma-calmotion-deliver">
        <div className="figma-ica-narrative__phase-heading">
          <p>DELIVER</p>
          <h2>A calmer system, with the driver still in charge.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--enables">
          <h3>What the concept enables</h3>
          <p>Calmotion sought to move modern cars from being emotionally unintelligent to responding more thoughtfully to the person behind the wheel. The system provides contextual emotional support that helps drivers remain calm, focused, and in control through stress, fatigue, distraction, and unexpected road events. By responding to both the driving situation and the driver’s state, it aims to make difficult journeys feel safer, steadier, and less isolating.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-calmotion-narrative__copy--reflection">
          <h3>Next steps and reflection</h3>
          <p>The next steps would be to build and integrate Calmotion’s system into a working vehicle prototype, then test it under controlled and real-world driving conditions before deployment. I would validate intervention timing across different traffic conditions, compare voice and visual combinations, and test whether drivers understand and trust the privacy controls over time. The key design reflection for me is that emotional awareness should not equate to emotional control; an AI system is only useful when it respects the user’s agency.</p>
        </div>
      </section>
    </>
  );
}

function SafeMapDesktopNarrative() {
  return (
    <>
      <section className="figma-safemap-desktop-only figma-safemap-project-brief">
        <p className="figma-ica-narrative__kicker">PROJECT BRIEF</p>
        <p className="figma-ica-narrative__body">
          Uppsala Kvinnojour (Uppsala Women’s Shelter) is an independent organisation that supports and protects women and children exposed to violence. Alongside direct support, they work preventively through education, public advocacy, and collaborative projects. The organisation came to us with an open brief: help us advance our mission. They shared what they do, who they serve, and the values guiding their work. The rest was ours to define. I led the team in examining where design could strengthen the organisation’s work.
        </p>
      </section>

      <section className="figma-safemap-desktop-only figma-safemap-narrative-phase figma-safemap-narrative-phase--discover">
        <div className="figma-ica-narrative__phase-heading">
          <p>DISCOVER</p>
          <h2>Finding where design could strengthen the mission.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-safemap-narrative__copy--research">
          <h3>Desk research and secondary sources</h3>
          <p>We began by reviewing the forms of gendered violence connected to Uppsala Kvinnojour’s mission and where design could offer meaningful support. As a team, we chose to focus on public harassment because it is often subtle, normalised, and disregarded despite changing how people use public space. Desk research revealed the scale of the reporting gap: Brå estimates that 86% of public harassment goes unreported, while the EU Gender-Based Violence Survey indicates that 88.7% of non-partner violence is not reported to authorities.</p>
        </div>
      </section>

      <FigmaExport className="figma-safemap-desktop-only figma-safemap-process-visual" src={safemapProcessResearch} alt="Research evidence showing the public harassment reporting gap" left={100} top={2615} width={1480} height={661} />
      <p className="figma-safemap-desktop-only figma-safemap-artifact-label" style={{ top: 3294 }}>RESEARCH EVIDENCE</p>
      <FigmaExport className="figma-safemap-desktop-only figma-safemap-process-visual" src={safemapProcessPersona} alt="Research-informed SafeMap proto-persona" left={100} top={3372} width={1480} height={678} />
      <p className="figma-safemap-desktop-only figma-safemap-artifact-label" style={{ top: 4068 }}>RESEARCH-INFORMED PROTO-PERSONA</p>

      <section className="figma-safemap-desktop-only figma-safemap-narrative-phase figma-safemap-narrative-phase--define">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEFINE</p>
          <h2>Turning missing experiences into protected collective evidence.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-safemap-narrative__copy--journey">
          <h3>Where an experience leaves the record</h3>
          <p>Mapping the experience from incident to non-reporting revealed where evidence disappears. After assessing safety and seriousness, a person may decide that the effort, uncertainty, or privacy risk is not worthwhile. She adapts instead by changing routes, timing, or who she travels with. The experience remains socially known through personal habits and conversations, but becomes institutionally invisible.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-safemap-narrative__copy--opportunity">
          <h3>The design opportunity</h3>
          <p>The value of collective evidence emerged here. One unreported experience is absent from public debate; many protected, structured reports can reveal recurring locations and patterns. The opportunity was not simply to increase reporting, but to create a route from individual experience to collective evidence without exposing the people contributing it.</p>
        </div>
      </section>

      <FigmaExport className="figma-safemap-desktop-only figma-safemap-process-visual" src={safemapProcessJourney} alt="Experience-to-evidence journey showing how incidents disappear from official data" left={100} top={4730} width={1480} height={719} />
      <p className="figma-safemap-desktop-only figma-safemap-artifact-label" style={{ top: 5467 }}>EXPERIENCE-TO-EVIDENCE JOURNEY</p>

      <section className="figma-safemap-desktop-only figma-safemap-narrative-phase figma-safemap-narrative-phase--develop">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEVELOP</p>
          <h2>Designing a safer route from reporting to advocacy.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-safemap-narrative__copy--direction">
          <h3>Counter-mapping as a design direction</h3>
          <p>During development, counter-mapping became the direction that connected the research to Uppsala Kvinnojour’s advocacy work. SafeMap would allow lived experience to add another layer of knowledge about public space through a short anonymous reporting flow, controlled location precision, structured incident categories, and an aggregated impact map. The map was framed as evidence for institutions, not as a tool that tells women where they should or should not go.</p>
        </div>
      </section>

      <FigmaExport className="figma-safemap-desktop-only figma-safemap-process-visual" src={safemapProcessWireframes} alt="SafeMap mid-fidelity wireframes" left={100} top={5923} width={1480} height={690.75} />
      <p className="figma-safemap-desktop-only figma-safemap-artifact-label" style={{ top: 6631.75 }}>MID-FIDELITY WIREFRAMES</p>

      <section className="figma-safemap-desktop-only figma-safemap-final-direction">
        <div>
          <h3>Final design direction</h3>
          <p>SafeMap combines a four-step reporting flow with an aggregated public map. The flow keeps reporting direct, makes privacy choices visible, and explains how the information may be used. Individual reports do not appear as personal histories; they contribute to patterns across location, time, and incident type.</p>
          <p>The final design makes the relationship between one protected contribution and wider advocacy evidence visible.</p>
          <p>SafeMap retains Uppsala Kvinnojour’s pink and burgundy brand colours, carrying the organisation’s visual identity into the reporting experience while using a pale surface colour to keep the interface clear and approachable.</p>
          <div className="figma-ica-colors" aria-label="SafeMap interface colours">
            <span>Primary Color: <i style={{ background: "#ba1065" }} />#BA1065</span>
            <span>Secondary Colors: <i style={{ background: "#6f073c" }} />#6F073C <i style={{ background: "#fff7fb" }} />#FFF7FB</span>
          </div>
        </div>
      </section>

      <section className="figma-safemap-desktop-only figma-safemap-service-design">
        <div className="figma-ica-narrative__phase-heading">
          <h2>Testing the service beyond the interface.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-safemap-narrative__copy--blueprint">
          <h3>Service blueprint</h3>
          <p>The service blueprint tested whether the idea could remain useful and responsible after a report was submitted. It separated what the person reporting sees from how information is protected, structured, aggregated, and used by Uppsala Kvinnojour. This exposed the safeguards the concept would need: optional detail, controlled location precision, no public profiles, and suitable thresholds before patterns appear.</p>
        </div>
      </section>

      <FigmaExport className="figma-safemap-desktop-only figma-safemap-process-visual" src={safemapProcessBlueprint} alt="SafeMap reporting-to-advocacy service blueprint" left={100} top={9423.75} width={1480} height={1118} />
      <p className="figma-safemap-desktop-only figma-safemap-artifact-label" style={{ top: 10559.75 }}>REPORTING-TO-ADVOCACY SERVICE BLUEPRINT</p>

      <section className="figma-safemap-desktop-only figma-safemap-deliver">
        <div className="figma-ica-narrative__phase-heading">
          <p>DELIVER</p>
          <h2>A concept that helps lived experience enter public decisions.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-safemap-narrative__copy--enables">
          <h3>What the concept enables</h3>
          <p>SafeMap concept was designed to shift the shelter’s position in public discourse. Rather than responding only after incidents, the tool gives Uppsala Kvinnojour concrete, community-generated evidence. That evidence could support prevention work and conversations with city planners, funders, and policy stakeholders.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-safemap-narrative__copy--reflection">
          <h3>Next steps</h3>
          <p>For further development, I would conduct co-design and usability testing with people affected by harassment and Uppsala Kvinnojour staff. I would validate the reporting language, privacy model, aggregation thresholds, and risks of public map misuse before deployment.</p>
        </div>
      </section>
    </>
  );
}

const climateResponsiveScreens = [
  { type: "image", src: climateNewMobileLeft, alt: "Climate Hub sustainable living guide screen" },
  { type: "video", src: climateNewMobileMiddleVideo, alt: "Climate Hub mobile prototype" },
  { type: "image", src: climateNewMobileRight, alt: "Climate Hub education screen" },
] as const;

function ClimateResponsiveArtifact({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="figma-climate-responsive-artifact">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function ClimateHubResponsiveNarrative() {
  const screenPagination = useSwipePagination(climateResponsiveScreens.length);
  return (
    <>
      <section className="figma-ica-responsive-brief figma-climate-responsive-brief">
        <p className="figma-ica-responsive-kicker">PROJECT BRIEF</p>
        <p>Biotopia is a natural history museum in Uppsala where people learn about nature and biodiversity through exhibitions, education, and public activities. They invited us to develop ideas for Klimathub, a new EU-funded initiative introducing a sustainability arm to the museum. The brief was open. From the initiative’s goals, we focused on education and inclusion, then defined the audience, opportunity, and response.</p>
      </section>

      <IcaResponsivePhase phase="DISCOVER" title="Finding a useful direction inside an open brief." className="figma-climate-responsive-phase">
        <IcaResponsiveCopyBlock title="Choosing who the service should support"><p>We began with the initiative’s goals rather than a fixed service idea. During ideation, we explored ways Biotopia could make climate education more inclusive, from workshops and guides to digital learning and local services. From the directions explored, we focused on immigrants and newcomers, who are expected to participate in Uppsala’s sustainability systems while still learning how those systems work.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Desk research and working personas"><p>Desk research helped us examine the practical gap behind that direction. Sustainability information was spread across institutions, often written for people who already understood the local context. We used the findings to create two working personas with different confidence, language, and digital habits. They kept the team focused on clear explanations, practical actions, and multiple routes into the service.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <div className="figma-climate-responsive-artifact-stack">
        <ClimateResponsiveArtifact src={climateProcessIdeation} alt="Climate Hub team ideation sessions" caption="IDEATION SESSIONS" />
        <ClimateResponsiveArtifact src={climateProcessPersonas} alt="Climate Hub newcomer personas" caption="WORKING PERSONAS" />
      </div>

      <IcaResponsivePhase phase="DEFINE" title="Turning unfamiliar systems into a path people can follow." className="figma-climate-responsive-phase">
        <IcaResponsiveCopyBlock title="The knowledge gap"><p>The problem was not a lack of motivation. Newcomers could want to make sustainable choices and still be unsure where to begin, which advice applied locally, or how one action connected to Uppsala’s wider climate work. The service needed to provide a clear starting point, then help people move from basic understanding to action without assuming prior knowledge.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Design opportunity"><p>Our opportunity became: how might Climate Hub help newcomers understand Uppsala’s sustainability systems, act on that knowledge in everyday life, and connect with local services? This reframed the work from presenting climate information to helping people build enough local understanding to participate with confidence.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <IcaResponsivePhase phase="DEVELOP" title="Building one service from learning, action, and participation." className="figma-climate-responsive-phase figma-climate-responsive-phase--single">
        <IcaResponsiveCopyBlock title="Prioritising the first version"><p>Our ideation produced more ideas than one concept could support well, so we used MoSCoW prioritisation to define the first version. Structured learning, practical guides, a mobile-friendly experience, language inclusion, and a sustainability map became the core. Events, publications, rewards, and community support were retained where they strengthened the journey without making the service feel crowded.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <ClimateResponsiveArtifact src={climateProcessMoscow} alt="Climate Hub MoSCoW feature prioritisation" caption="MOSCOW PRIORITISATION" />

      <section className="figma-climate-responsive-subsection">
        <h2>Keeping the service open while making progress useful.</h2>
        <IcaResponsiveCopyBlock title="Information architecture"><p>I organised the service around seven clear destinations: Green Resident, Education, Guides, the Sustainability Map, Events, Publications, and Help. Courses and membership steps remain open without an account. Signing in is optional, but it preserves course progress and enables Biotopia to verify a badge when someone returns to redeem a reward.</p></IcaResponsiveCopyBlock>
      </section>

      <ClimateResponsiveArtifact src={climateProcessSitemap} alt="Climate Hub sitemap with optional account access" caption="SITEMAP" />

      <section className="figma-climate-responsive-subsection">
        <h2>Making the structure tangible before adding polish.</h2>
        <IcaResponsiveCopyBlock title="Early interface direction"><p>The wireframes tested how the different parts could feel like one product rather than a collection of pages. We worked through the home page, map, publications, and course experience, keeping navigation familiar and giving each section a clear next action. This stage also helped us separate conceptual learning in Education from step-by-step support in Guides.</p></IcaResponsiveCopyBlock>
      </section>

      <ClimateResponsiveArtifact src={climateProcessWireframes} alt="Climate Hub wireframes for learning, map, publications, and courses" caption="WIREFRAMES" />

      <section className="figma-climate-responsive-testing">
        <h2>Testing whether the structure made sense to someone new.</h2>
        <div className="figma-climate-responsive-testing__body">
          <IcaResponsiveCopyBlock title="Usability testing"><p>Six participants completed task-based sessions using a think-aloud approach. We asked them to find learning content, use a guide, locate a sustainability service, and move through the wider platform. Their comments and observed behaviour were grouped through thematic analysis, giving us a practical view of where labels, pathways, and interactions were clear or uncertain.</p></IcaResponsiveCopyBlock>
          <IcaResponsiveCopyBlock title="What we changed"><p>The main issue was the distinction between Education and Guides. Participants understood both sections individually but did not always know which one to choose first. We clarified Education as structured learning and Guides as direct help with a task, strengthened page cues, and corrected prototype interactions that had interrupted some test flows. The process also showed us the value of an internal pilot before inviting participants.</p></IcaResponsiveCopyBlock>
        </div>
      </section>

      <ClimateResponsiveArtifact src={climateProcessTesting} alt="Remote Climate Hub usability testing sessions" caption="USABILITY TESTING" />

      <section className="figma-ica-responsive-final-direction figma-climate-responsive-final-direction">
        <div>
          <h2>Final design direction</h2>
          <p>The final product brings four connected forms of support into one service: learn through courses and publications, act through practical guides, explore through the sustainability map, and connect through events and help. Green Resident gives the journey a visible sense of progress without making an account a barrier to entry.</p>
          <p>The interface uses clear routes, short explanations, and familiar page patterns so people can enter through the need they have now, then discover the wider service when they are ready.</p>
          <p>Climate Hub uses a Sustainable Earth palette, pairing deep forest and emerald greens with white for a grounded, clear interface.</p>
          <p>The design presented below is a high-fidelity concept prototype communicating the service, content structure, and core interactions. Some imagery and map listings remain placeholders pending production content and verified facility data.</p>
        </div>
        <div className="figma-ica-responsive-colors" aria-label="Climate Hub interface colours">
          <span><i style={{ background: "#182c25" }} /><b>#182C25</b><small>Primary</small></span>
          <span><i style={{ background: "#059669" }} /><b>#059669</b><small>Primary</small></span>
          <span><i style={{ background: "#fff" }} /><b>#FFFFFF</b><small>Secondary</small></span>
        </div>
      </section>

      <section className="figma-climate-responsive-media">
        <section className="figma-climate-responsive-promo">
          <MuxLoopVideo playbackId={climatePromoPlaybackId} label="Climate Hub promotional video" />
        </section>
        <section className="figma-climate-responsive-prototype-one">
          <img src={climatePrototype1Figma4x} alt="Climate Hub desktop prototype frame" />
          <MuxLoopVideo playbackId={climatePrototype1PlaybackId} label="Climate Hub desktop prototype video" />
        </section>
        <section className="figma-climate-responsive-prototype-two">
          <MuxLoopVideo playbackId={climatePrototype2PlaybackId} label="Climate Hub second prototype video" />
        </section>
        <section className="figma-climate-responsive-gallery">
          <div className="figma-climate-responsive-gallery__header"><p>MOBILE SCREENS</p></div>
          <div ref={screenPagination.scrollerRef} className="figma-climate-responsive-gallery__scroller" aria-label="Climate Hub mobile screens">
            {climateResponsiveScreens.map((screen, index) => (
              screen.type === "video"
                ? <video data-swipe-index={index} src={screen.src} aria-label={screen.alt} autoPlay muted loop playsInline preload="auto" key={screen.src} />
                : <img data-swipe-index={index} src={screen.src} alt={screen.alt} key={screen.src} />
            ))}
          </div>
          <IcaSwipePagination count={climateResponsiveScreens.length} activeIndex={screenPagination.activeIndex} onSelect={screenPagination.scrollToIndex} label="Mobile screen navigation" />
        </section>
      </section>

      <section className="figma-climate-responsive-subsection figma-climate-responsive-subsection--service">
        <h2>Connecting the digital product to Biotopia’s wider service.</h2>
        <IcaResponsiveCopyBlock title="Service design"><p>The service blueprint moved the concept beyond the website. It connected welcome information, partner introductions, digital learning, local facilities, events, and badge redemption into one journey. It also made the work behind each touchpoint visible: Biotopia maintains the content and activities, while SFI, Uppsala University, the municipality, and newcomer organisations help people discover and use the service.</p></IcaResponsiveCopyBlock>
      </section>

      <ClimateResponsiveArtifact src={climateProcessBlueprint} alt="Climate Hub service blueprint from awareness to participation" caption="SERVICE BLUEPRINT" />

      <IcaResponsivePhase phase="DELIVER" title="A service that helps newcomers learn locally and participate with confidence." className="figma-climate-responsive-phase figma-climate-responsive-phase--deliver">
        <IcaResponsiveCopyBlock title="What the concept enables"><p>Climate Hub gives Biotopia a way to support people before, during, and beyond a visit. Newcomers can build local knowledge, find practical services, join activities, and see how everyday actions connect to Uppsala’s sustainability work. For Biotopia, the concept extends climate education into a service people can return to as part of life.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Adoption and next steps"><p>I would begin adoption through introductions from partners supporting newcomers, including SFI, Uppsala University, and local organisations. The next steps would be broader testing, multilingual support, production content, live municipal location data, and a pilot measuring course completion and map use.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>
    </>
  );
}

function ClimateHubDesktopNarrative() {
  return (
    <>
      <section className="figma-climate-desktop-only figma-climate-project-brief">
        <p className="figma-ica-narrative__kicker">PROJECT BRIEF</p>
        <p className="figma-ica-narrative__body">
          Biotopia is a natural history museum in Uppsala where people learn about nature and biodiversity through exhibitions, education, and public activities. They invited us to develop ideas for Klimathub, a new EU-funded initiative introducing a sustainability arm to the museum. The brief was open. From the initiative’s goals, we focused on education and inclusion, then defined the audience, opportunity, and response.
        </p>
      </section>

      <section className="figma-climate-desktop-only figma-climate-narrative-phase figma-climate-narrative-phase--discover">
        <div className="figma-ica-narrative__phase-heading">
          <p>DISCOVER</p>
          <h2>Finding a useful direction inside an open brief.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--direction">
          <h3>Choosing who the service should support</h3>
          <p>We began with the initiative’s goals rather than a fixed service idea. During ideation, we explored ways Biotopia could make climate education more inclusive, from workshops and guides to digital learning and local services. From the directions explored, we focused on immigrants and newcomers, who are expected to participate in Uppsala’s sustainability systems while still learning how those systems work.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--research">
          <h3>Desk research and working personas</h3>
          <p>Desk research helped us examine the practical gap behind that direction. Sustainability information was spread across institutions, often written for people who already understood the local context. We used the findings to create two working personas with different confidence, language, and digital habits. They kept the team focused on clear explanations, practical actions, and multiple routes into the service.</p>
        </div>
      </section>

      <FigmaExport className="figma-climate-desktop-only figma-climate-process-visual" src={climateProcessIdeation} alt="Climate Hub team ideation sessions" left={100} top={2743} width={1480} height={495} />
      <p className="figma-climate-desktop-only figma-climate-artifact-label" style={{ top: 3256 }}>IDEATION SESSIONS</p>
      <FigmaExport className="figma-climate-desktop-only figma-climate-process-visual" src={climateProcessPersonas} alt="Climate Hub newcomer personas" left={100} top={3298} width={1480} height={518} />
      <p className="figma-climate-desktop-only figma-climate-artifact-label" style={{ top: 3834 }}>WORKING PERSONAS</p>

      <section className="figma-climate-desktop-only figma-climate-narrative-phase figma-climate-narrative-phase--define">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEFINE</p>
          <h2>Turning unfamiliar systems into a path people can follow.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--gap">
          <h3>The knowledge gap</h3>
          <p>The problem was not a lack of motivation. Newcomers could want to make sustainable choices and still be unsure where to begin, which advice applied locally, or how one action connected to Uppsala’s wider climate work. The service needed to provide a clear starting point, then help people move from basic understanding to action without assuming prior knowledge.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--opportunity">
          <h3>Design opportunity</h3>
          <p>Our opportunity became: how might Climate Hub help newcomers understand Uppsala’s sustainability systems, act on that knowledge in everyday life, and connect with local services? This reframed the work from presenting climate information to helping people build enough local understanding to participate with confidence.</p>
        </div>
      </section>

      <section className="figma-climate-desktop-only figma-climate-narrative-phase figma-climate-narrative-phase--develop">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEVELOP</p>
          <h2>Building one service from learning, action, and participation.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--priorities">
          <h3>Prioritising the first version</h3>
          <p>Our ideation produced more ideas than one concept could support well, so we used MoSCoW prioritisation to define the first version. Structured learning, practical guides, a mobile-friendly experience, language inclusion, and a sustainability map became the core. Events, publications, rewards, and community support were retained where they strengthened the journey without making the service feel crowded.</p>
        </div>
      </section>

      <FigmaExport className="figma-climate-desktop-only figma-climate-process-visual" src={climateProcessMoscow} alt="Climate Hub MoSCoW feature prioritisation" left={100} top={4703} width={1480} height={295.35} />
      <p className="figma-climate-desktop-only figma-climate-artifact-label" style={{ top: 5016.35 }}>MOSCOW PRIORITISATION</p>

      <section className="figma-climate-desktop-only figma-climate-narrative-phase figma-climate-narrative-phase--structure">
        <div className="figma-ica-narrative__phase-heading">
          <h2>Keeping the service open while making progress useful.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--sitemap">
          <h3>Information architecture</h3>
          <p>I organised the service around seven clear destinations: Green Resident, Education, Guides, the Sustainability Map, Events, Publications, and Help. Courses and membership steps remain open without an account. Signing in is optional, but it preserves course progress and enables Biotopia to verify a badge when someone returns to redeem a reward.</p>
        </div>
      </section>

      <FigmaExport className="figma-climate-desktop-only figma-climate-process-visual" src={climateProcessSitemap} alt="Climate Hub sitemap with optional account access" left={100} top={5410.35} width={1480} height={775} />
      <p className="figma-climate-desktop-only figma-climate-artifact-label" style={{ top: 6203.35 }}>SITEMAP</p>

      <section className="figma-climate-desktop-only figma-climate-narrative-phase figma-climate-narrative-phase--wireframes">
        <div className="figma-ica-narrative__phase-heading">
          <h2>Making the structure tangible before adding polish.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--wireframes">
          <h3>Early interface direction</h3>
          <p>The wireframes tested how the different parts could feel like one product rather than a collection of pages. We worked through the home page, map, publications, and course experience, keeping navigation familiar and giving each section a clear next action. This stage also helped us separate conceptual learning in Education from step-by-step support in Guides.</p>
        </div>
      </section>

      <FigmaExport className="figma-climate-desktop-only figma-climate-process-visual" src={climateProcessWireframes} alt="Climate Hub wireframes for learning, map, publications, and courses" left={100} top={6597.35} width={1480} height={744} />
      <p className="figma-climate-desktop-only figma-climate-artifact-label" style={{ top: 7359.35 }}>WIREFRAMES</p>

      <section className="figma-climate-desktop-only figma-climate-narrative-phase figma-climate-narrative-phase--testing">
        <div className="figma-ica-narrative__phase-heading">
          <h2>Testing whether the structure made sense to someone new.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--method">
          <h3>Usability testing</h3>
          <p>Six participants completed task-based sessions using a think-aloud approach. We asked them to find learning content, use a guide, locate a sustainability service, and move through the wider platform. Their comments and observed behaviour were grouped through thematic analysis, giving us a practical view of where labels, pathways, and interactions were clear or uncertain.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--findings">
          <h3>What we changed</h3>
          <p>The main issue was the distinction between Education and Guides. Participants understood both sections individually but did not always know which one to choose first. We clarified Education as structured learning and Guides as direct help with a task, strengthened page cues, and corrected prototype interactions that had interrupted some test flows. The process also showed us the value of an internal pilot before inviting participants.</p>
        </div>
      </section>

      <FigmaExport className="figma-climate-desktop-only figma-climate-process-visual" src={climateProcessTesting} alt="Remote Climate Hub usability testing sessions" left={100} top={7985.35} width={1480} height={539} />
      <p className="figma-climate-desktop-only figma-climate-artifact-label" style={{ top: 8542.35 }}>USABILITY TESTING</p>

      <section className="figma-climate-desktop-only figma-climate-final-direction">
        <div>
          <h3>Final design direction</h3>
          <p>The final product brings four connected forms of support into one service: learn through courses and publications, act through practical guides, explore through the sustainability map, and connect through events and help. Green Resident gives the journey a visible sense of progress without making an account a barrier to entry.</p>
          <p>The interface uses clear routes, short explanations, and familiar page patterns so people can enter through the need they have now, then discover the wider service when they are ready.</p>
          <p>Climate Hub uses a Sustainable Earth palette, pairing deep forest and emerald greens with white for a grounded, clear interface.</p>
          <div className="figma-ica-colors" aria-label="Climate Hub interface colours">
            <span>Primary Colors: <i style={{ background: "#182c25" }} />#182C25 <i style={{ background: "#059669" }} />#059669</span>
            <span>Secondary Color: <i style={{ background: "#fff" }} />#FFFFFF</span>
          </div>
          <p>The design presented below is a high-fidelity concept prototype communicating the service, content structure, and core interactions. Some imagery and map listings remain placeholders pending production content and verified facility data.</p>
        </div>
      </section>

      <section className="figma-climate-desktop-only figma-climate-narrative-phase figma-climate-narrative-phase--service">
        <div className="figma-ica-narrative__phase-heading">
          <h2>Connecting the digital product to Biotopia’s wider service.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--blueprint">
          <h3>Service design</h3>
          <p>The service blueprint moved the concept beyond the website. It connected welcome information, partner introductions, digital learning, local facilities, events, and badge redemption into one journey. It also made the work behind each touchpoint visible: Biotopia maintains the content and activities, while SFI, Uppsala University, the municipality, and newcomer organisations help people discover and use the service.</p>
        </div>
      </section>

      <FigmaExport className="figma-climate-desktop-only figma-climate-process-visual" src={climateProcessBlueprint} alt="Climate Hub service blueprint from awareness to participation" left={100} top={13442.04} width={1480} height={979} />
      <p className="figma-climate-desktop-only figma-climate-artifact-label" style={{ top: 14439.04 }}>SERVICE BLUEPRINT</p>

      <section className="figma-climate-desktop-only figma-climate-deliver">
        <div className="figma-ica-narrative__phase-heading">
          <p>DELIVER</p>
          <h2>A service that helps newcomers learn locally and participate with confidence.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--enables">
          <h3>What the concept enables</h3>
          <p>Climate Hub gives Biotopia a way to support people before, during, and beyond a visit. Newcomers can build local knowledge, find practical services, join activities, and see how everyday actions connect to Uppsala’s sustainability work. For Biotopia, the concept extends climate education into a service people can return to as part of life.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-climate-narrative__copy--next">
          <h3>Adoption and next steps</h3>
          <p>I would begin adoption through introductions from partners supporting newcomers, including SFI, Uppsala University, and local organisations. The next steps would be broader testing, multilingual support, production content, live municipal location data, and a pilot measuring course completion and map use.</p>
        </div>
      </section>

    </>
  );
}

function FigmaExport({ src, alt, left, top, width, height, className }: FigmaExportImage) {
  return (
    <img
      className={`figma-case-export${className ? ` ${className}` : ""}`}
      src={src}
      alt={alt}
      loading={className?.includes("figma-climate-process-visual") ? "lazy" : undefined}
      decoding={className?.includes("figma-climate-process-visual") ? "async" : undefined}
      style={{ left, top, width, height }}
    />
  );
}

function IcaNextScreensStrip({ images, label }: { images: string[]; label: string }) {
  return (
    <div className="figma-ica-next-screens-strip" aria-label={label}>
      {images.map((src, index) => <img src={src} alt="" key={`${label}-${index}`} />)}
    </div>
  );
}

function TabletScreensStrip({ images, label }: { images: string[]; label: string }) {
  return (
    <div className="figma-tablet-screens-strip" aria-label={label}>
      {images.map((src, index) => <img src={src} alt="" key={`${label}-${index}`} />)}
    </div>
  );
}

function IcaScreensStage({
  page,
  currentSrc,
  currentAlt,
  nextImages,
  nextLabel,
  tabletCurrentImages,
  tabletNextImages,
}: {
  page: "current" | "next";
  currentSrc: string;
  currentAlt: string;
  nextImages: string[];
  nextLabel: string;
  tabletCurrentImages?: string[];
  tabletNextImages?: string[];
}) {
  return (
    <div className="figma-case-screen-strip figma-case-screen-strip--ica figma-ica-screen-switcher">
      <div className="figma-desktop-screens-layer">
        {page === "next"
          ? <IcaNextScreensStrip images={nextImages} label={nextLabel} />
          : <img className="figma-ica-current-screens-strip" src={currentSrc} alt={currentAlt} />}
      </div>
      {tabletCurrentImages && tabletNextImages ? (
        <div className="figma-tablet-screens-layer">
          <TabletScreensStrip images={page === "next" ? tabletNextImages : tabletCurrentImages} label={`${nextLabel} tablet`} />
        </div>
      ) : null}
    </div>
  );
}

function CalmotionNextScreensStrip({ images, label }: { images: string[]; label: string }) {
  return (
    <div className="figma-calmotion-next-screens-strip" aria-label={label}>
      {images.map((src, index) => <img src={src} alt="" key={`${label}-${index}`} />)}
    </div>
  );
}

function CalmotionScreensStage({
  page,
  currentSrc,
  currentAlt,
  nextImages,
  nextLabel,
  tabletCurrentImages,
  tabletNextImages,
}: {
  page: "current" | "next";
  currentSrc: string;
  currentAlt: string;
  nextImages: string[];
  nextLabel: string;
  tabletCurrentImages?: string[];
  tabletNextImages?: string[];
}) {
  return (
    <div className="figma-case-screen-strip figma-case-screen-strip--cal figma-calmotion-screen-switcher">
      <div className="figma-desktop-screens-layer">
        {page === "next"
          ? <CalmotionNextScreensStrip images={nextImages} label={nextLabel} />
          : <img className="figma-calmotion-current-screens-strip" src={currentSrc} alt={currentAlt} />}
      </div>
      {tabletCurrentImages && tabletNextImages ? (
        <div className="figma-tablet-screens-layer">
          <TabletScreensStrip images={page === "next" ? tabletNextImages : tabletCurrentImages} label={`${nextLabel} tablet`} />
        </div>
      ) : null}
    </div>
  );
}

function CaseNextFooter({
  top,
  title,
  href,
  thumbnail,
  thumbnailSlug,
}: {
  top: number;
  title: string;
  href: string;
  thumbnail: string;
  thumbnailSlug?: string;
}) {
  return (
    <section className="figma-case-footer" style={{ top }}>
      <div className="figma-case-footer__next-zone">
        <p className="figma-case-footer__label">Next Case</p>
        <a className="figma-case-footer__title" href={href}>{title}</a>
        <a className="figma-case-footer__thumb" href={href} data-preview-slug={thumbnailSlug}><img src={thumbnail} alt="" /></a>
        <a className="figma-case-footer__button" href={href}>Next Case</a>
        <div className="figma-case-footer__line" />
      </div>
      <div className="figma-case-footer__links figma-case-footer__pages">
        <strong>Pages</strong><a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a><a href={resumePageHref} target="_blank" rel="noreferrer">Resume</a>
      </div>
      <div className="figma-case-footer__links figma-case-footer__work">
        <strong>Work</strong><a href="/case/ica-banken">ICA Banken</a><a href="/case/calmotion">Calmotion</a><a href="/case/safemap">SafeMap</a><a href="/work">...All</a>
      </div>
      <div className="figma-case-footer__links figma-case-footer__connect">
        <strong>Connect</strong><a href="https://www.linkedin.com/in/dareabinde/" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:dareabinde04@gmail.com" target="_blank" rel="noreferrer">Email</a><a href="https://x.com/dareabinde" target="_blank" rel="noreferrer">Twitter</a><a href="https://www.behance.net" target="_blank" rel="noreferrer">Behance</a>
      </div>
      <div className="figma-case-footer__bottom-line" />
      <small>© Dare Abinde. All rights reserved.</small>
    </section>
  );
}

const icaStory: FigmaStoryItem[] = [
  {
    label: "BRIEF",
    body: "ICA Banken presents itself as a friendly, easy-to-open banking\noption for Swedish residents, including people who are new to\nthe country. The brief was to redesign its mobile banking\nexperience for English-speaking users while preserving the\ntrust, simplicity, and everyday usefulness of the original product.",
  },
  {
    label: "PROBLEM",
    body: "The current ICA Banken app is Swedish-only, creating friction\nfor non-Swedish speakers who need to manage payments and\naccounts with confidence. For international users, this language\nbarrier can turn routine into a high-stress task and push them\ntoward competitors with more accessible digital experiences.",
  },
  {
    label: "RESEARCH",
    body: "The research was grounded in an audit of the existing app, flow,\nand review of common banking needs for international users in\nSweden. The key insight was that the issue was not translation\nalone. Users need familiar banking patterns.",
  },
  {
    label: "IMPACT",
    body: "The redesign repositions ICA Banken as a more inclusive digital\nbank for international users. The prototype introduces English\nnavigation, clearer payment flows, and an interface that helps\nusers complete everyday banking tasks with less uncertainty.",
  },
];

const icaProcess: FigmaProcessItem[] = [
  {
    number: "01",
    phase: "DISCOVER",
    title: "Understanding the gap between joining and staying",
    sections: [
      {
        title: "Product and business audit",
        body: "I started by looking at the path around the app: how ICA Banken attracts international customers, how account opening is framed, and what happens when everyday banking moves into the mobile interface. The audit showed a clear break in continuity. ICA Banken makes joining feel accessible, but the Swedish-only app makes recurring financial tasks less supported, especially when users need to understand terms, payments, or account details.",
      },
      {
        title: "Lightweight user research",
        body: "To ground the audit in real use, I asked two English-speaking ICA users how they manage the Swedish-only app during everyday banking, especially when something feels unclear or unfamiliar. Both responses pointed to the same behaviour: people could cope with familiar tasks, but unfamiliar banking terms quickly pushed them into screenshots, translation tools, or guesswork.",
      },
    ],
    artifactTitle: "Audit evidence and WhatsApp responses",
    artifactBody: "Add ICA onboarding examples, cropped Swedish-only app moments, and anonymised WhatsApp screenshots from the two participants.",
    artifactVariant: "quote",
  },
  {
    number: "02",
    phase: "DEFINE",
    title: "Reframing language as a retention problem",
    sections: [
      {
        title: "The design tension",
        body: "The clearest tension was not that English-speaking customers could not open an account. It was that ICA Banken could be accessible at the moment they needed a bank most, then become harder to use once they began managing everyday financial tasks through it.",
      },
      {
        title: "Design opportunity",
        body: "The opportunity became: how might ICA Banken retain international customers beyond onboarding by making everyday banking accessible in English? This framed language as part of trust, confidence, and long-term loyalty, rather than a surface-level translation request.",
      },
    ],
    artifactTitle: "Customer journey and opportunity frame",
    artifactBody: "Add the journey from account opening to recurring app use, highlighting the moments where confidence drops.",
    artifactVariant: "journey",
  },
  {
    number: "03",
    phase: "DEVELOP",
    title: "Designing around confidence, not just translation",
    sections: [
      {
        title: "Flow decisions",
        body: "I focused on the moments where uncertainty slows users down: checking balances, moving money, reviewing payments, understanding cards, and changing profile settings. English navigation was only one layer. The redesign also needed clearer hierarchy, familiar banking patterns, and short explanations around terms that can carry financial consequences.",
      },
      {
        title: "Final design direction",
        body: "The final screens keep ICA Banken’s visual language close enough to feel recognisable, while making the app more usable for customers who bank in English. The prototype explores light and dark modes so the language decision feels like part of the product system, not a one-off accessibility patch.",
      },
    ],
    artifactTitle: "Flow iterations and final design decisions",
    artifactBody: "Add wireframes, before-and-after flow notes, and selected decisions from the final light and dark mode screens.",
    artifactVariant: "flow",
  },
  {
    number: "04",
    phase: "DELIVER",
    title: "A concept for banking users can stay with",
    sections: [
      {
        title: "What the concept enables",
        body: "The concept extends ICA Banken’s early accessibility into the daily banking experience. A customer can understand where they are, review sensitive actions before confirming them, and complete routine tasks without leaving the app to translate unfamiliar language.",
      },
      {
        title: "Next steps and reflection",
        body: "If this were a live project, I would test the English flows with international customers and measure task completion, comprehension, confidence, and reliance on translation tools. The main lesson for me was that accessibility does not end at onboarding. For a banking product, it has to keep showing up every time a customer needs to make a decision with their money.",
      },
    ],
    artifactTitle: "Validation plan and reflection",
    artifactBody: "Add usability tasks, success measures, and a short reflection on what would need validation before release.",
    artifactVariant: "reflection",
  },
];

const calmotionStory: FigmaStoryItem[] = [
  {
    label: "BRIEF",
    body: "Modern vehicles are getting smarter, but they still know little\nabout the driver. They track speed, predict hazards, and monitor\nthe road, but can rarely help when a driver is stressed, fatigued,\nor distracted. Calmotion explores how an emotionally aware\nassistant can support the person behind the wheel.",
  },
  {
    label: "PROBLEM",
    body: "How do we build a system that responds to emotion without\npresuming to manage it? An AI that misreads a driver's state is\nnot just unhelpful. In a safety-critical context, it is dangerous.\nThis tension between support and autonomy shaped every\ndecision in the project.",
  },
  {
    label: "RESEARCH",
    body: "Research with drivers across Sweden, China, the US, and\nNigeria revealed a consistent need for AI that supports\nemotional wellbeing without taking control, making trust, safety,\nand human autonomy the project's central design constraint.",
  },
  {
    label: "IMPACT",
    body: "Calmotion distributes responsibilities across three touchpoints: a\nHUD that presents essential driving information, a voice\ncompanion that responds conversationally to emotional cues,\nand a mobile app that provides trip insights and driver control.",
  },
];

const safemapStory: FigmaStoryItem[] = [
  {
    label: "BRIEF",
    body: "Uppsala Kvinnojour (Uppsala Women’s Shelter) came to us with\nan open brief: help us advance our mission. They shared what\nthey do, who they serve, and the values that drive their work.\nThe rest was ours to define. That openness required us to ask a\nmore fundamental question before designing anything.",
  },
  {
    label: "PROBLEM",
    body: "Public harassment against women is consistently framed as a\nseries of isolated incidents, unfortunate, but individual. This\nframing is not accidental. It is a structural feature of how\ngendered violence is politically managed. When experiences\nremain anecdotal, they are easy to dismiss.",
  },
  {
    label: "RESEARCH",
    body: "The research foundation was built on desk research and\nsecondary sources. This informed both the problem framing\nand, critically, the ethical parameters of the design. The\ncounter-mapping approach emerged from this research.",
  },
  {
    label: "IMPACT",
    body: "SafeMap concept was designed to shift the shelter's position in\npublic discourse. Rather than responding to incidents after the\nfact, the tool gives Uppsala Kvinnojour concrete, community-\ngenerated evidence.",
  },
];

const climateStory: FigmaStoryItem[] = [
  {
    label: "BRIEF",
    body: "Biotopia Uppsala was launching a sustainability initiative called\nClimate Hub and commissioned us to define what it could be. We\nidentified immigrants and newcomers as the most underserved\naudience, people expected to engage with a complex\nenvironmental system they had never encountered before.",
    bodyWidth: 444,
  },
  {
    label: "PROBLEM",
    body: "Sustainability platforms assume users already understand the\nsystem. For newcomers navigating an unfamiliar country, that\nassumption creates a fundamental barrier. The challenge was not\nmotivation. It was the absence of a shared knowledge baseline\nthat made meaningful participation impossible from the start.",
    bodyWidth: 447,
  },
  {
    label: "RESEARCH",
    body: "Research involved interviews and testing with newcomers and\nimmigrants in Uppsala. Findings analysed thematically surfaced\nrecurring patterns and mental models in how users navigate\nunfamiliar sustainability systems.",
    bodyWidth: 447,
  },
  {
    label: "IMPACT",
    body: "Climate Hub concept was designed around three core features:\nstructured sustainability education, practical guides for everyday\naction, and an interactive map connecting users to local\nsustainability infrastructure, making sustainable participation\naccessible to anyone, regardless of where they started.",
    bodyWidth: 447,
  },
];

const landaStory: FigmaStoryItem[] = [
  {
    label: "BRIEF",
    body: "International students making high-stakes decisions about\nstudying abroad face fragmented information and limited access\nto lived experience. Landa was built to fill that gap, a free,\nstructured assessment tool grounded in research and the lived\nexperience of navigating Sweden as an international student.",
    bodyWidth: 444,
  },
  {
    label: "PROBLEM",
    body: "Existing resources tell students what Sweden offers. None tell\nthem whether they are genuinely prepared for it. The cost of that\ngap is high: tuition payments, visa applications, and life relocation\ncommitted to a reality students were never shown before\narriving.",
    bodyWidth: 447,
  },
  {
    label: "RESEARCH",
    body: "Research involved interviews with international students\nacross Swedish universities. A crowdsourced assessor network\nof students and graduates with one to five years in Sweden\nvalidated the model weights against lived outcomes.",
    bodyWidth: 447,
  },
  {
    label: "IMPACT",
    body: "Landa (getlanda.se) serves prospective students through a\nweighted assessment model that generates personalised AI\nprofiles directly to users. Since launch, the tool has helped\ninternational students make informed decisions and prepare for\nlife in Sweden.",
    bodyWidth: 447,
  },
];

function IcaCasePage() {
  const [lightScreensPage, setLightScreensPage] = useState<"current" | "next">("current");
  const [darkScreensPage, setDarkScreensPage] = useState<"current" | "next">("current");
  const lightNextScreens = [
    icaNextLmLanguage4x,
    icaNextLmTransferOwn4x,
    icaNextLmTransferSomeone4x,
    icaNextLmPaymentReview4x,
    icaNextLmProfile4x,
  ];
  const darkNextScreens = [
    icaNextDmLanguage4x,
    icaNextDmTransferOwn4x,
    icaNextDmTransferSomeone4x,
    icaNextDmPaymentConfirmation4x,
    icaNextDmProfile4x,
  ];
  const tabletLightScreensA = [icaTabletLight01Figma4x, icaTabletLight02Figma4x, icaTabletLight03Figma4x];
  const tabletLightScreensB = [icaTabletLight04Figma4x, icaTabletLight05Figma4x, icaTabletLight06Figma4x];
  const tabletDarkScreensA = [icaTabletDark01Figma4x, icaTabletDark02Figma4x, icaTabletDark03Figma4x];
  const tabletDarkScreensB = [icaTabletDark04Figma4x, icaTabletDark05Figma4x, icaTabletDark06Figma4x];
  return (
    <FigmaFrame height={12243} className="figma-ica-case">
      <Nav />
      <section className="figma-ica-mobile-layout">
        <IcaResponsiveNav />
        <section className="figma-ica-mobile-hero">
          <h1>ICA BANKEN</h1>
          <FigmaCaseMeta items={[
            { label: "ROLE", value: "Project Manager & Lead Designer" },
            { label: "CONTEXT", value: "Redesign Concept" },
            { label: "TEAM", value: "Solo Project" },
          ]} />
          <img className="figma-ica-mobile-hero__image" src={icaHeroFigma4x} alt="ICA Banken hero mockup" />
        </section>
        <section className="figma-ica-mobile-intro">
          <p>Redesigned <span>ICA Banken’s</span> mobile app into a multilingual banking experience that makes everyday banking clearer and more accessible for non-Swedish speakers in Sweden.</p>
        </section>
        <IcaResponsiveNarrative />
        <IcaResponsiveFooter />
      </section>
      <section className="figma-case-hero">
        <h1>ICA BANKEN</h1>
        <FigmaCaseMeta items={[
          { label: "ROLE", value: "Project Manager & Lead Designer" },
          { label: "CONTEXT", value: "Redesign Concept" },
          { label: "TEAM", value: "Solo Project" },
        ]} />
        <FigmaExport src={icaHeroFigma4x} alt="ICA Banken hero mockup" left={100} top={711} width={1480} height={908} />
      </section>
      <section className="figma-case-intro">
        <p>Redesigned <span className="figma-case-intro__ica">ICA Banken’s</span> mobile app into a multilingual banking experience that makes everyday banking clearer and more accessible<br className="figma-tablet-hidden-break" /> for non-Swedish speakers in Sweden.</p>
      </section>
      <FigmaCaseStory className="figma-ica-tablet-story" items={icaStory} />
      <FigmaCaseBrief />
      <FigmaCaseProcess items={icaProcess} />
      <IcaDesktopNarrative />
      <section className="figma-case-mockups" style={{ top: 6872.875, height: 4319 }} />
      <FigmaExport src={icaMockup1Figma4x} alt="ICA Banken mockup section" left={100} top={6872.875} width={1480} height={1110} />
      <section className="figma-case-prototype figma-case-prototype--ica" style={{ left: 100, top: 8042.875, width: 1480, height: 851 }}>
        <img src={icaPrototypeBg4x} alt="ICA Banken app prototype section" />
        <video className="figma-ica-prototype-video figma-ica-prototype-video--light" src={icaLmPrototypeVideo} aria-label="ICA Banken light mode prototype" autoPlay muted loop playsInline />
        <video className="figma-ica-prototype-video figma-ica-prototype-video--dark" src={icaDmPrototypeVideo} aria-label="ICA Banken dark mode prototype" autoPlay muted loop playsInline />
        <button className="figma-case-prototype-label figma-case-prototype-label--ica" type="button"><span>PROTOTYPE</span><img src={icaPrototypePlayIcon4x} alt="" /></button>
      </section>
      <section className="figma-case-screen-panel figma-case-screen-panel--ica-light" style={{ left: 100, top: 8953.875, width: 1480, height: 777 }}>
        <IcaScreensStage
          page={lightScreensPage}
          currentSrc={icaScreensLightStrip4x}
          currentAlt="ICA Banken light mode screens"
          nextImages={lightNextScreens}
          nextLabel="ICA Banken next light mode screens"
          tabletCurrentImages={tabletLightScreensA}
          tabletNextImages={tabletLightScreensB}
        />
        <div className="figma-case-screen-controls figma-case-screen-controls--ica">
          <button className="figma-case-round-button figma-case-round-button--light figma-case-round-button--left" type="button" aria-label="Previous screens" onClick={() => setLightScreensPage("current")} disabled={lightScreensPage === "current"}><img src={icaLightArrowLeft4x} alt="" /></button>
          <button className="figma-case-screen-pill figma-case-screen-pill--light" type="button"><span>LIGHT MODE</span><img src={icaLightModeIcon4x} alt="" /></button>
          <button className="figma-case-round-button figma-case-round-button--light figma-case-round-button--right" type="button" aria-label="Next screens" onClick={() => setLightScreensPage("next")} disabled={lightScreensPage === "next"}><img src={icaLightArrowRight4x} alt="" /></button>
        </div>
        <button className="figma-case-tablet-next figma-case-tablet-next--ica" type="button" aria-label="Next light mode screens" onClick={() => setLightScreensPage((page) => page === "current" ? "next" : "current")}><img src={icaLightArrowRight4x} alt="" /></button>
      </section>
      <section className="figma-case-screen-panel figma-case-screen-panel--ica-dark" style={{ left: 100, top: 9790.875, width: 1480, height: 777 }}>
        <IcaScreensStage
          page={darkScreensPage}
          currentSrc={icaScreensDarkStrip4x}
          currentAlt="ICA Banken dark mode screens"
          nextImages={darkNextScreens}
          nextLabel="ICA Banken next dark mode screens"
          tabletCurrentImages={tabletDarkScreensA}
          tabletNextImages={tabletDarkScreensB}
        />
        <div className="figma-case-screen-controls figma-case-screen-controls--ica">
          <button className="figma-case-round-button figma-case-round-button--dark figma-case-round-button--left" type="button" aria-label="Previous screens" onClick={() => setDarkScreensPage("current")} disabled={darkScreensPage === "current"}><img src={icaDarkArrowLeft4x} alt="" /></button>
          <button className="figma-case-screen-pill figma-case-screen-pill--dark" type="button"><img src={icaDarkModeIcon4x} alt="" /><span>DARK MODE</span></button>
          <button className="figma-case-round-button figma-case-round-button--dark figma-case-round-button--right" type="button" aria-label="Next screens" onClick={() => setDarkScreensPage("next")} disabled={darkScreensPage === "next"}><img src={icaDarkArrowRight4x} alt="" /></button>
        </div>
        <button className="figma-case-tablet-next figma-case-tablet-next--ica figma-case-tablet-next--dark" type="button" aria-label="Next dark mode screens" onClick={() => setDarkScreensPage((page) => page === "current" ? "next" : "current")}><img src={icaDarkArrowRight4x} alt="" /></button>
      </section>
      <CaseNextFooter top={11191.875} title="CALMOTION" href="/case/calmotion" thumbnail={nextCalmotionFigma4x} />
    </FigmaFrame>
  );
}

function CalmotionCasePage() {
  const [calmotionHudIndex, setCalmotionHudIndex] = useState(0);
  const [calmotionScreensPage, setCalmotionScreensPage] = useState<"current" | "next">("current");
  const calmotionHudStates = [
    { src: calHudFigma4x, alt: "Calmotion HUD welcome state" },
    { src: calHudFocusedFigma4x, alt: "Calmotion HUD focused state" },
    { src: calHudDistractedFigma4x, alt: "Calmotion HUD distracted state" },
  ];
  const calmotionNextScreens = [
    calNextBluetooth4x,
    calNextSettings4x,
    calNextSideMenu4x,
    calNextCalendar4x,
    calNextSchedule4x,
  ];
  const tabletCalmotionScreensA = [calTabletScreen01Figma4x, calTabletScreen02Figma4x, calTabletScreen03Figma4x];
  const tabletCalmotionScreensB = [calTabletScreen04Figma4x, calTabletScreen05Figma4x, calTabletScreen06Figma4x];

  return (
    <FigmaFrame height={14351.125} className="figma-calmotion-case">
      <Nav />
      <section className="figma-calmotion-mobile-layout figma-ica-mobile-layout">
        <IcaResponsiveNav />
        <section className="figma-ica-mobile-hero">
          <h1>CALMOTION</h1>
          <FigmaCaseMeta items={[
            { label: "ROLE", value: "UX Researcher & Designer" },
            { label: "CONTEXT", value: "Design Course, Uppsala University" },
            { label: "TEAM", value: "6 Researchers & Designers" },
          ]} />
          <img className="figma-ica-mobile-hero__image" src={calHeroFigma4x} alt="Calmotion hero mockup" />
        </section>
        <section className="figma-ica-mobile-intro">
          <p>Led the research and interaction design of <span>Calmotion</span>, an emotionally aware and adaptive AI driver assistant that combines a head up display, voice companion and mobile app.</p>
        </section>
        <CalmotionResponsiveNarrative
          hudStates={calmotionHudStates}
        />
        <IcaResponsiveFooter title="SAFEMAP" href="/case/safemap" thumbnail={nextSafemapFigma4x} />
      </section>
      <section className="figma-case-hero">
        <h1>CALMOTION</h1>
        <FigmaCaseMeta items={[
          { label: "ROLE", value: "UX Researcher & Designer" },
          { label: "CONTEXT", value: "Design Course, Uppsala University" },
          { label: "TEAM", value: "6 Researchers & Designers" },
        ]} />
        <FigmaExport src={calHeroFigma4x} alt="Calmotion hero mockup" left={100} top={738} width={1485} height={881} />
      </section>
      <section className="figma-case-intro">
        <p>Led the research and interaction design of <span>Calmotion</span>, an emotionally aware and adaptive AI driver assistant that combines a head up display, voice companion and mobile app.</p>
      </section>
      <FigmaCaseStory className="figma-calmotion-standard-story" items={calmotionStory} />
      <CalmotionDesktopNarrative />
      <section className="figma-case-mockups" style={{ top: 8946, height: 4354.125 }} />
      <section className="figma-calmotion-promo" style={{ left: 0, top: 8946, width: 1680, height: 945 }}>
        <MuxLoopVideo playbackId={calmotionPromoPlaybackId} label="Calmotion promotional video" />
      </section>
      <section className="figma-calmotion-hud" style={{ left: 100, top: 9951 }}>
        <img className="figma-calmotion-hud__full" src={calmotionHudStates[calmotionHudIndex].src} alt={calmotionHudStates[calmotionHudIndex].alt} />
        <button
          className="figma-calmotion-hud__next"
          type="button"
          aria-label="Next HUD screen"
          onClick={() => setCalmotionHudIndex((index) => (index + 1) % calmotionHudStates.length)}
        >
          <img src={calHudNext4x} alt="" />
        </button>
      </section>
      <section className="figma-case-prototype figma-case-prototype--calmotion" style={{ left: 100, top: 10843, width: 1480, height: 883 }}>
        <img src={calPrototypeFigma4x} alt="Calmotion app prototype section" />
        <video className="figma-calmotion-prototype-video" src={calPrototypeVideo} aria-label="Calmotion app prototype video" autoPlay muted loop playsInline preload="auto" />
      </section>
      <section className="figma-case-screen-panel figma-case-screen-panel--cal" style={{ left: 100, top: 11786, width: 1480, height: 777 }}>
        <CalmotionScreensStage
          page={calmotionScreensPage}
          currentSrc={calScreensStrip4x}
          currentAlt="Calmotion app screens"
          nextImages={calmotionNextScreens}
          nextLabel="Calmotion next app screens"
          tabletCurrentImages={tabletCalmotionScreensA}
          tabletNextImages={tabletCalmotionScreensB}
        />
        <div className="figma-case-screen-controls figma-case-screen-controls--cal">
          <button className="figma-case-round-button figma-case-round-button--cal figma-case-round-button--left" type="button" aria-label="Previous Calmotion screens" onClick={() => setCalmotionScreensPage("current")} disabled={calmotionScreensPage === "current"}><img src={calArrowLeft4x} alt="" /></button>
          <button className="figma-case-screen-pill figma-case-screen-pill--cal" type="button"><span>SEE MORE</span><img src={calSeeMoreIcon4x} alt="" /></button>
          <button className="figma-case-round-button figma-case-round-button--cal figma-case-round-button--right" type="button" aria-label="Next Calmotion screens" onClick={() => setCalmotionScreensPage("next")} disabled={calmotionScreensPage === "next"}><img src={calArrowRight4x} alt="" /></button>
        </div>
        <button className="figma-case-tablet-next figma-case-tablet-next--cal" type="button" aria-label="Next Calmotion app screens" onClick={() => setCalmotionScreensPage((page) => page === "current" ? "next" : "current")}><img src={calArrowRight4x} alt="" /></button>
      </section>
      <CaseNextFooter top={13300.125} title="SAFEMAP" href="/case/safemap" thumbnail={nextSafemapFigma4x} />
    </FigmaFrame>
  );
}

function SafeMapCasePage() {
  const [safemapScreensPage, setSafemapScreensPage] = useState<"current" | "next">("current");
  const tabletSafemapScreensA = [safemapTabletScreen01Figma4x, safemapTabletScreen02Figma4x, safemapTabletScreen03Figma4x];
  const tabletSafemapScreensB = [safemapTabletScreen04Figma4x, safemapTabletScreen05Figma4x, safemapTabletScreen06Figma4x];

  return (
    <FigmaFrame height={12200.875} className="figma-safemap-case">
      <Nav />
      <section className="figma-safemap-mobile-layout figma-ica-mobile-layout">
        <IcaResponsiveNav />
        <section className="figma-ica-mobile-hero">
          <h1>SAFEMAP</h1>
          <FigmaCaseMeta items={[
            { label: "ROLE", value: "Project Manager & Lead Designer" },
            { label: "CONTEXT", value: "Design Course, Uppsala University" },
            { label: "TEAM", value: "4 Researchers & Designers" },
          ]} />
          <img className="figma-ica-mobile-hero__image" src={safemapHeroFigma4x} alt="SafeMap hero mockup" />
        </section>
        <section className="figma-ica-mobile-intro figma-case-intro--safemap">
          <p>Led the end-to-end design of <span>SafeMap</span>, a counter-mapping tool built in collaboration with Uppsala Kvinnojour to make gendered public harassment visible as collective, spatial evidence.</p>
        </section>
        <SafeMapResponsiveNarrative />
        <IcaResponsiveFooter title="CLIMATE HUB" href="/case/climate-hub" thumbnail={nextClimateHubFigma4x} />
      </section>
      <section className="figma-case-hero">
        <h1>SAFEMAP</h1>
        <FigmaCaseMeta items={[
          { label: "ROLE", value: "Project Manager & Lead Designer" },
          { label: "CONTEXT", value: "Design Course, Uppsala University" },
          { label: "TEAM", value: "4 Researchers & Designers" },
        ]} />
        <FigmaExport src={safemapHeroFigma4x} alt="SafeMap hero mockup" left={100} top={738} width={1480} height={881} />
      </section>
      <section className="figma-case-intro figma-case-intro--safemap">
        <p>Led the end-to-end design of <span>SafeMap</span>, a counter-mapping tool built in collaboration with Uppsala Kvinnojour to make gendered public harassment visible as collective, spatial evidence.</p>
      </section>
      <FigmaCaseStory className="figma-safemap-standard-story" items={safemapStory} />
      <SafeMapDesktopNarrative />
      <section className="figma-case-mockups" style={{ top: 7206.75, height: 3942.125 }} />
      <section className="figma-safemap-prototype-mockup" style={{ left: 100, top: 7206.75, width: 1480, height: 987 }}>
        <img src={safemapMockup1Figma4x} alt="SafeMap phone-in-hand mockup" />
        <video src={safemapPrototypeVideo} aria-label="SafeMap reporting prototype" autoPlay muted loop playsInline preload="auto" />
      </section>
      <section className="figma-safemap-app-screens-frame" style={{ left: 100, top: 8253.75, width: 1480, height: 747 }}>
        <img className="figma-safemap-app-screens" src={safemapAppScreensFigma4x} alt="SafeMap app screens" />
      </section>
      <section className="figma-case-screen-panel figma-case-screen-panel--safemap-tablet" style={{ left: 100, top: 4167, width: 1480, height: 777 }}>
        <div className="figma-case-screen-strip figma-case-screen-strip--safemap figma-safemap-screen-switcher">
          <div className="figma-tablet-screens-layer">
            <TabletScreensStrip images={safemapScreensPage === "next" ? tabletSafemapScreensB : tabletSafemapScreensA} label="SafeMap tablet app screens" />
          </div>
        </div>
        <div className="figma-case-screen-controls figma-case-screen-controls--safemap">
          <button className="figma-case-round-button figma-case-round-button--safemap figma-case-round-button--left" type="button" aria-label="Previous SafeMap screens" onClick={() => setSafemapScreensPage("current")} disabled={safemapScreensPage === "current"}><img src={calArrowLeft4x} alt="" /></button>
          <button className="figma-case-screen-pill figma-case-screen-pill--safemap" type="button"><span>SEE MORE</span><img src={calSeeMoreIcon4x} alt="" /></button>
          <button className="figma-case-round-button figma-case-round-button--safemap figma-case-round-button--right" type="button" aria-label="Next SafeMap screens" onClick={() => setSafemapScreensPage("next")} disabled={safemapScreensPage === "next"}><img src={calArrowRight4x} alt="" /></button>
        </div>
        <button className="figma-case-tablet-next figma-case-tablet-next--safemap" type="button" aria-label="Next SafeMap app screens" onClick={() => setSafemapScreensPage((page) => page === "current" ? "next" : "current")}><img src={calArrowRight4x} alt="" /></button>
      </section>
      <CaseNextFooter top={11148.875} title="CLIMATE HUB" href="/case/climate-hub" thumbnail={nextClimateHubFigma4x} />
    </FigmaFrame>
  );
}

function ClimateHubCasePage() {
  return (
    <FigmaFrame height={16105.274} className="figma-climate-case">
      <Nav />
      <section className="figma-climate-mobile-layout figma-ica-mobile-layout">
        <IcaResponsiveNav />
        <section className="figma-ica-mobile-hero">
          <h1>CLIMATE HUB</h1>
          <FigmaCaseMeta items={[
            { label: "ROLE", value: "Project Manager & Lead Designer" },
            { label: "CONTEXT", value: "Design Course, Uppsala University" },
            { label: "TEAM", value: "4 Researchers & Designers" },
          ]} />
          <img className="figma-ica-mobile-hero__image" src={climateHeroFigma4x} alt="Climate Hub hero mockup" />
        </section>
        <section className="figma-ica-mobile-intro figma-case-intro--climate">
          <p>Led the design of <span>Climate Hub</span>, a sustainability engagement platform built in collaboration with Biotopia Uppsala, designed for immigrants navigating an unfamiliar environmental system.</p>
        </section>
        <ClimateHubResponsiveNarrative />
        <IcaResponsiveFooter title="LANDA" href="/case/landa" thumbnail={nextLandaRedesignFramed} thumbnailSlug="landa" />
      </section>
      <section className="figma-case-hero">
        <h1>CLIMATE HUB</h1>
        <FigmaCaseMeta items={[
          { label: "ROLE", value: "Project Manager & Lead Designer" },
          { label: "CONTEXT", value: "Design Course, Uppsala University" },
          { label: "TEAM", value: "4 Researchers & Designers" },
        ]} />
        <FigmaExport src={climateHeroFigma4x} alt="Climate Hub hero mockup" left={100} top={711} width={1480} height={908} />
      </section>
      <section className="figma-case-intro figma-case-intro--climate">
        <p>Led the design of <span>Climate Hub</span>, a sustainability engagement platform built in collaboration with Biotopia Uppsala, designed for immigrants navigating an unfamiliar environmental system.</p>
      </section>
      <FigmaCaseStory className="figma-climate-standard-story" items={climateStory} />
      <ClimateHubDesktopNarrative />
      <section className="figma-case-mockups" style={{ top: 9241.5, height: 5812 }} />
      <section className="figma-climate-promo" style={{ left: 0, top: 9241.5, width: 1680, height: 945 }}>
        <MuxLoopVideo playbackId={climatePromoPlaybackId} label="Climate Hub promotional video" />
      </section>
      <section className="figma-climate-prototype-one" style={{ left: 200, top: 10306.5, width: 1280, height: 1089 }}>
        <img src={climatePrototype1Figma4x} alt="Climate Hub desktop prototype frame" />
        <MuxLoopVideo playbackId={climatePrototype1PlaybackId} label="Climate Hub desktop prototype video" />
      </section>
      <section className="figma-climate-prototype-two" style={{ left: 200, top: 11515.5, width: 1280, height: 732.541 }}>
        <MuxLoopVideo playbackId={climatePrototype2PlaybackId} label="Climate Hub second prototype video" />
      </section>
      <section className="figma-climate-desktop-mobile-screens" style={{ left: 290, top: 12368.04, width: 1100, height: 651 }}>
        <img src={climateNewMobileLeft} alt="Climate Hub sustainable living guide screen" />
        <video src={climateNewMobileMiddleVideo} aria-label="Climate Hub mobile prototype" autoPlay muted loop playsInline preload="auto" />
        <img src={climateNewMobileRight} alt="Climate Hub education screen" />
      </section>
      <CaseNextFooter top={15054.164} title="LANDA" href="/case/landa" thumbnail={nextLandaRedesignFramed} thumbnailSlug="landa" />
    </FigmaFrame>
  );
}

const landaResponsiveScreens = [
  { type: "image", src: landaNewMobileLeft, alt: "Landa mobile homepage screen" },
  { type: "video", playbackId: landaMobilePlaybackId, alt: "Landa mobile prototype" },
  { type: "image", src: landaNewMobileRight, alt: "Landa mobile results screen" },
] as const;

function LandaResponsiveArtifact({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="figma-landa-responsive-artifact">
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function LandaResponsiveNarrative() {
  const screenPagination = useSwipePagination(landaResponsiveScreens.length);
  return (
    <>
      <section className="figma-ica-responsive-brief figma-landa-responsive-brief">
        <p className="figma-ica-responsive-kicker">PROJECT BRIEF</p>
        <p>International students deciding whether to study in Sweden have to commit to tuition, residence permits, and relocation using information spread across university pages, official guidance, and peer advice. I designed and built Landa as a free decision-support tool for prospective non-EU students, helping them examine how their circumstances align with the practical realities of building a sustainable life in Sweden before they commit.</p>
      </section>

      <IcaResponsivePhase phase="DISCOVER" title="Finding what shapes a sustainable start." className="figma-landa-responsive-phase">
        <IcaResponsiveCopyBlock title="Observation and secondary research"><p>I began with observations from navigating Swedish systems and secondary research into the conditions that repeatedly shape international students’ early settlement. This produced an initial set of factors covering tuition security, language willingness, city choice, living-cost buffer, course marketability, partner support, and personal conviction. At this stage, they were candidate factors rather than a finished model.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Assessor round one"><p>I then invited current international students and graduates to act as assessors. They ranked the proposed factors, judged their relative influence, and suggested anything the initial model had missed. Their input helped me calibrate the model around lived experience rather than treating every condition as equally important.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <LandaResponsiveArtifact src={landaProcessPersona4x} alt="Composite persona for a prospective international student considering Sweden" caption="COMPOSITE PERSONA" />

      <IcaResponsivePhase phase="DEFINE" title="Turning connected factors into a readiness model." className="figma-landa-responsive-phase">
        <IcaResponsiveCopyBlock title="Key insight"><p>The clearest insight was that settling successfully does not depend on one decisive condition. It depends on a combination of financial, social, geographic, academic, and personal factors, each contributing at a different level.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Product position"><p>I chose to make Landa a support tool rather than a verdict. The model reflects the candidate’s current circumstances, highlights strengths and areas of risk, and keeps readiness framed as something that can change with better preparation.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <LandaResponsiveArtifact src={landaProcessReadinessModel4x} alt="Weighted readiness model showing the relative influence of seven settlement factors" caption="WEIGHTED READINESS MODEL" />

      <IcaResponsivePhase phase="DEVELOP" title="Making a complex assessment feel straightforward." className="figma-landa-responsive-phase figma-landa-responsive-phase--develop">
        <IcaResponsiveCopyBlock title="From model to assessment"><p>I translated seven dimensions into eight progressively disclosed questions, with conditional options where an answer needed context. Clear instructions, real-time validation, and a single-page flow kept the assessment focused while asking candidates to respond honestly.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Designing the profile"><p>The resulting profile speaks directly to the candidate and is organised into strengths, areas of risk, recommendations, and a closing perspective. The tone is clear-eyed rather than reassuring by default, grounding advice in Swedish administrative realities without presenting the tool as the authority.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Assessor round two"><p>Once the working tool was ready, I returned to assessors for a second round focused on the experience itself. They reviewed the clarity of the questions, the credibility of the generated profile, and whether the advice reflected the submitted circumstances. Their feedback informed refinements to wording, guidance, and result framing.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>

      <LandaResponsiveArtifact src={landaProcessSitemap4x} alt="Landa product sitemap showing the main pages and their outcomes" caption="SITEMAP" />

      <LandaResponsiveArtifact src={landaNewHeroWireframe} alt="Landa hero wireframe exploring mobility stages" caption="HERO WIREFRAME" />

      <section className="figma-ica-responsive-final-direction figma-landa-responsive-final-direction">
        <div>
          <h2>Final design direction</h2>
          <p>The final experience keeps a demanding decision approachable. The hero frames Landa around three mobility moments: considering Sweden, preparing to move, and settling after arrival, using portraits to make the service feel human before the assessment begins.</p>
          <p>Landa uses deep navy for trust and structure, coral for action and emphasis, and white with cool neutrals to keep the experience calm, readable, and service-led.</p>
        </div>
        <div className="figma-ica-responsive-colors" aria-label="Landa interface colours">
          <span><i style={{ background: "#0f1820" }} /><b>#0F1820</b><small>Primary</small></span>
          <span><i style={{ background: "#e0523d" }} /><b>#E0523D</b><small>Accent</small></span>
          <span><i style={{ background: "#ffffff" }} /><b>#FFFFFF</b><small>Neutral</small></span>
        </div>
      </section>

      <section className="figma-landa-responsive-media">
        <section className="figma-landa-responsive-prototype-one">
          <img src={landaPrototype1Figma4x} alt="Landa desktop prototype frame" />
          <MuxLoopVideo playbackId={landaPrototype1PlaybackId} label="Landa desktop prototype video" />
        </section>
        <section className="figma-landa-responsive-prototype-two">
          <MuxLoopVideo playbackId={landaPrototype2PlaybackId} label="Landa assessment prototype video" />
        </section>
        <section className="figma-landa-responsive-gallery">
          <div className="figma-landa-responsive-gallery__header"><p>MOBILE SCREENS</p></div>
          <div ref={screenPagination.scrollerRef} className="figma-landa-responsive-gallery__scroller" aria-label="Landa mobile screens">
            {landaResponsiveScreens.map((screen, index) => (
              screen.type === "video"
                ? <MuxLoopVideo dataSwipeIndex={index} playbackId={screen.playbackId} label={screen.alt} key={screen.playbackId} />
                : <img data-swipe-index={index} src={screen.src} alt={screen.alt} key={screen.src} />
            ))}
          </div>
          <IcaSwipePagination count={landaResponsiveScreens.length} activeIndex={screenPagination.activeIndex} onSelect={screenPagination.scrollToIndex} label="Mobile screen navigation" />
        </section>
      </section>

      <IcaResponsivePhase phase="DELIVER" title="A live tool for a decision made before arrival." className="figma-landa-responsive-phase figma-landa-responsive-phase--deliver">
        <IcaResponsiveCopyBlock title="What Landa enables"><p>Landa helps prospective students see how several conditions work together, identify where their preparation is strong, and recognise gaps that deserve attention before tuition and relocation commitments are made. The result is not a decision on their behalf, but a clearer basis for making one.</p></IcaResponsiveCopyBlock>
        <IcaResponsiveCopyBlock title="Live product"><p>The assessment and personalised profile are live at <a href="https://getlanda.se" target="_blank" rel="noreferrer">getlanda.se</a>. Candidates can complete the assessment, review their profile, and send a copy to their email. Early assessor feedback has been positive, and the tool is being shared within international student communities.</p></IcaResponsiveCopyBlock>
      </IcaResponsivePhase>
    </>
  );
}

function LandaDesktopNarrative() {
  return (
    <>
      <section className="figma-landa-desktop-only figma-landa-project-brief">
        <p className="figma-ica-narrative__kicker">PROJECT BRIEF</p>
        <p className="figma-ica-narrative__body">
          International students deciding whether to study in Sweden have to commit to tuition, residence permits, and relocation using information spread across university pages, official guidance, and peer advice. I designed and built Landa as a free decision-support tool for prospective non-EU students, helping them examine how their circumstances align with the practical realities of building a sustainable life in Sweden before they commit.
        </p>
      </section>

      <section className="figma-landa-desktop-only figma-landa-narrative-phase figma-landa-narrative-phase--discover">
        <div className="figma-ica-narrative__phase-heading">
          <p>DISCOVER</p>
          <h2>Finding what shapes a sustainable start.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--research">
          <h3>Observation and secondary research</h3>
          <p>I began with observations from navigating Swedish systems and secondary research into the conditions that repeatedly shape international students’ early settlement. This produced an initial set of factors covering tuition security, language willingness, city choice, living-cost buffer, course marketability, partner support, and personal conviction. At this stage, they were candidate factors rather than a finished model.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--calibration">
          <h3>Assessor round one</h3>
          <p>I then invited current international students and graduates to act as assessors. They ranked the proposed factors, judged their relative influence, and suggested anything the initial model had missed. Their input helped me calibrate the model around lived experience rather than treating every condition as equally important.</p>
        </div>
      </section>

      <FigmaExport className="figma-landa-desktop-only figma-landa-process-visual" src={landaProcessPersona4x} alt="Composite persona for a prospective international student considering Sweden" left={100} top={2743} width={1480} height={729} />
      <p className="figma-landa-desktop-only figma-landa-artifact-label" style={{ top: 3490 }}>COMPOSITE PERSONA</p>

      <section className="figma-landa-desktop-only figma-landa-narrative-phase figma-landa-narrative-phase--define">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEFINE</p>
          <h2>Turning connected factors into a readiness model.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--insight">
          <h3>Key insight</h3>
          <p>The clearest insight was that settling successfully does not depend on one decisive condition. It depends on a combination of financial, social, geographic, academic, and personal factors, each contributing at a different level.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--position">
          <h3>Product position</h3>
          <p>I chose to make Landa a support tool rather than a verdict. The model reflects the candidate’s current circumstances, highlights strengths and areas of risk, and keeps readiness framed as something that can change with better preparation.</p>
        </div>
      </section>

      <FigmaExport className="figma-landa-desktop-only figma-landa-process-visual" src={landaProcessReadinessModel4x} alt="Weighted readiness model showing the relative influence of seven settlement factors" left={100} top={4012} width={1480} height={662} />
      <p className="figma-landa-desktop-only figma-landa-artifact-label" style={{ top: 4692 }}>WEIGHTED READINESS MODEL</p>

      <section className="figma-landa-desktop-only figma-landa-narrative-phase figma-landa-narrative-phase--develop">
        <div className="figma-ica-narrative__phase-heading">
          <p>DEVELOP</p>
          <h2>Making a complex assessment feel straightforward.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--assessment">
          <h3>From model to assessment</h3>
          <p>I translated seven dimensions into eight progressively disclosed questions, with conditional options where an answer needed context. Clear instructions, real-time validation, and a single-page flow kept the assessment focused while asking candidates to respond honestly.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--profile">
          <h3>Designing the profile</h3>
          <p>The resulting profile speaks directly to the candidate and is organised into strengths, areas of risk, recommendations, and a closing perspective. The tone is clear-eyed rather than reassuring by default, grounding advice in Swedish administrative realities without presenting the tool as the authority.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--testing">
          <h3>Assessor round two</h3>
          <p>Once the working tool was ready, I returned to assessors for a second round focused on the experience itself. They reviewed the clarity of the questions, the credibility of the generated profile, and whether the advice reflected the submitted circumstances. Their feedback informed refinements to wording, guidance, and result framing.</p>
        </div>
      </section>

      <FigmaExport className="figma-landa-desktop-only figma-landa-process-visual" src={landaProcessSitemap4x} alt="Landa product sitemap showing the main pages and their outcomes" left={100} top={5472} width={1480} height={700} />
      <p className="figma-landa-desktop-only figma-landa-artifact-label" style={{ top: 6190 }}>SITEMAP</p>

      <FigmaExport className="figma-landa-desktop-only figma-landa-process-visual" src={landaNewHeroWireframe} alt="Landa hero wireframe exploring mobility stages" left={100} top={6292} width={1480} height={867} />
      <p className="figma-landa-desktop-only figma-landa-artifact-label" style={{ top: 7177 }}>HERO WIREFRAME</p>

      <section className="figma-landa-desktop-only figma-landa-final-direction">
        <div>
          <h3>Final design direction</h3>
          <p>The final experience keeps a demanding decision approachable. The hero frames Landa around three mobility moments: considering Sweden, preparing to move, and settling after arrival, using portraits to make the service feel human before the assessment begins.</p>
          <p>Landa uses deep navy for trust and structure, coral for action and emphasis, and white with cool neutrals to keep the experience calm, readable, and service-led.</p>
          <div className="figma-ica-colors" aria-label="Landa interface colours">
            <span>Primary: <i style={{ background: "#0f1820" }} />#0F1820 <i style={{ background: "#e0523d" }} />#E0523D</span>
            <span>Neutral: <i style={{ background: "#ffffff" }} />#FFFFFF</span>
          </div>
        </div>
      </section>

      <section className="figma-landa-desktop-only figma-landa-deliver">
        <div className="figma-ica-narrative__phase-heading">
          <p>DELIVER</p>
          <h2>A live tool for a decision made before arrival.</h2>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--enables">
          <h3>What Landa enables</h3>
          <p>Landa helps prospective students see how several conditions work together, identify where their preparation is strong, and recognise gaps that deserve attention before tuition and relocation commitments are made. The result is not a decision on their behalf, but a clearer basis for making one.</p>
        </div>
        <div className="figma-ica-narrative__copy figma-landa-narrative__copy--live">
          <h3>Live product</h3>
          <p>The assessment and personalised profile are live at <a href="https://getlanda.se" target="_blank" rel="noreferrer">getlanda.se</a>. Candidates can complete the assessment, review their profile, and send a copy to their email. Early assessor feedback has been positive, and the tool is being shared within international student communities.</p>
        </div>
      </section>
    </>
  );
}

function LandaCasePage() {
  return (
    <FigmaFrame height={12072.313} className="figma-landa-case">
      <Nav />
      <section className="figma-landa-mobile-layout figma-ica-mobile-layout">
        <IcaResponsiveNav />
        <section className="figma-ica-mobile-hero">
          <h1>LANDA</h1>
          <FigmaCaseMeta items={[
            { label: "ROLE", value: "Product Designer & Developer" },
            { label: "CONTEXT", value: "Self Developed Tool" },
            { label: "TEAM", value: "Solo Project" },
          ]} />
          <img className="figma-ica-mobile-hero__image" src={landaNewTopIntroMockup} alt="Landa hero mockup" />
        </section>
        <section className="figma-ica-mobile-intro figma-case-intro--landa">
          <p>Developed <span>Landa</span>, a minimal, decision-support tool helping prospective international students assess their readiness to build a life in Sweden before committing to study there.</p>
        </section>
        <LandaResponsiveNarrative />
        <IcaResponsiveFooter title="ICA BANKEN" href="/case/ica-banken" thumbnail={nextIcaFigma4x} />
      </section>
      <section className="figma-case-hero">
        <h1>LANDA</h1>
        <FigmaCaseMeta items={[
          { label: "ROLE", value: "Product Designer & Developer" },
          { label: "CONTEXT", value: "Self Developed Tool" },
          { label: "TEAM", value: "Solo Project" },
        ]} />
        <FigmaExport src={landaNewTopIntroMockup} alt="Landa hero mockup" left={100} top={711} width={1480} height={908} />
      </section>
      <section className="figma-case-intro figma-case-intro--landa">
        <p>Developed <span>Landa</span>, a minimal, decision-support<br className="figma-tablet-hidden-break" /> tool helping prospective international students<br className="figma-tablet-hidden-break" /> assess their readiness to build a life in Sweden<br className="figma-tablet-hidden-break" /> before committing to study there.</p>
      </section>
      <FigmaCaseStory className="figma-landa-standard-story" items={landaStory} />
      <LandaDesktopNarrative />
      <section className="figma-case-mockups" style={{ top: 7706, height: 3315.313 }} />
      <section className="figma-landa-prototype-one" style={{ left: 200, top: 7706, width: 1280, height: 1089 }}>
        <img src={landaPrototype1Figma4x} alt="Landa desktop prototype frame" />
        <MuxLoopVideo playbackId={landaPrototype1PlaybackId} label="Landa desktop prototype video" />
      </section>
      <section className="figma-landa-prototype-two" style={{ left: 200, top: 8915, width: 1280, height: 732.19 }}>
        <MuxLoopVideo playbackId={landaPrototype2PlaybackId} label="Landa assessment prototype video" />
      </section>
      <section className="figma-landa-desktop-mobile-screens" style={{ left: 291.5, top: 9767.19, width: 1097, height: 647 }}>
        <img src={landaNewMobileLeft} alt="Landa mobile homepage screen" />
        <MuxLoopVideo playbackId={landaMobilePlaybackId} label="Landa mobile prototype" />
        <img src={landaNewMobileRight} alt="Landa mobile results screen" />
      </section>
      <CaseNextFooter top={11021.313} title="ICA BANKEN" href="/case/ica-banken" thumbnail={nextIcaFigma4x} />
    </FigmaFrame>
  );
}

function CasePage({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Nav />
      <main className="page page--case">
        <section className="case-hero">
          <h1>{project.title.toUpperCase()}</h1>
          <div className="case-meta">
            <article><span>Role</span><p>{project.role}</p></article>
            <article><span>Context</span><p>{project.context}</p></article>
            <article><span>Team</span><p>{project.team}</p></article>
          </div>
          <div className={`case-visual ${project.hero.className}`}>
            <img className="case-visual__bg" src={project.hero.bg} alt={`${project.title} hero mockup`} />
            {project.hero.screen ? <img className="case-visual__screen" src={project.hero.screen} alt="" /> : null}
          </div>
        </section>
        <section className="case-intro"><p>{project.intro}</p></section>
        <section className="story-list">
          <p className="section-kicker">Design Story</p>
          {project.story.map((item) => <article key={item.label}><h2>{item.label.toUpperCase()}</h2><p>{item.body}</p></article>)}
        </section>
        <section className="mockup-section">
          {project.mockups.map((mockup, index) => <figure className={index === 0 ? "mockup mockup--wide" : "mockup"} key={`${project.slug}-${mockup.alt}`}><img src={mockup.image} alt={mockup.alt} /></figure>)}
        </section>
        <section className="next-case"><p>Next Case</p><a href={`/case/${next.slug}`}>{next.title.toUpperCase()}</a></section>
      </main>
    </>
  );
}

export default function App() {
  const [path, setPath] = useState(currentPath);
  const [llmOpen, setLlmOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const navigate = useCallback((nextPath: string) => {
    window.history.pushState(null, "", nextPath);
    flushSync(() => setPath(currentPath()));
    resetPageScroll();
  }, []);

  useLayoutEffect(() => {
    resetPageScroll();
  }, [path]);

  useEffect(() => {
    document.title = pageTitle(path);
  }, [path]);

  useEffect(() => {
    function updateWidth() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    function openDareLlm() {
      window.dispatchEvent(new CustomEvent("portfolio:close-navigation"));
      setLlmOpen(true);
    }
    window.addEventListener("portfolio:open-dare-llm", openDareLlm);
    return () => window.removeEventListener("portfolio:open-dare-llm", openDareLlm);
  }, []);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    function syncPath() {
      flushSync(() => setPath(currentPath()));
      resetPageScroll();
    }

    window.addEventListener("popstate", syncPath);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("popstate", syncPath);
    };
  }, []);

  usePortfolioInteractions(path, navigate);

  const llmDrawerWidth = viewportWidth <= 575
    ? viewportWidth
    : viewportWidth <= 1024
      ? viewportWidth >= 938
        ? viewportWidth * 0.4
        : Math.max(320, viewportWidth * 0.5)
      : 350 + ((Math.min(1680, Math.max(1025, viewportWidth)) - 1025) / 655) * 36.390625;
  const closeDareLlm = useCallback(() => {
    setLlmOpen(false);
  }, []);

  useEffect(() => {
    const isMobileDialog = llmOpen && viewportWidth <= 575;
    document.documentElement.classList.toggle("dare-llm-page-lock", llmOpen);
    document.body.classList.toggle("dare-llm-page-lock", llmOpen);
    document.documentElement.classList.toggle("dare-llm-mobile-lock", isMobileDialog);
    document.body.classList.toggle("dare-llm-mobile-lock", isMobileDialog);
    if (llmOpen) {
      document.querySelectorAll(".fp-work-list.is-previewing").forEach((list) => list.classList.remove("is-previewing"));
      document.querySelectorAll(".fp-project-row.is-preview-active").forEach((row) => row.classList.remove("is-preview-active"));
      document.querySelectorAll(".fp-project-cursor.is-active").forEach((cursor) => cursor.classList.remove("is-active"));
    }
    return () => {
      document.documentElement.classList.remove("dare-llm-page-lock");
      document.body.classList.remove("dare-llm-page-lock");
      document.documentElement.classList.remove("dare-llm-mobile-lock");
      document.body.classList.remove("dare-llm-mobile-lock");
    };
  }, [llmOpen, viewportWidth]);

  let page: ReactNode;
  if (path === "/work") page = <WorkPage />;
  else if (path === "/about") page = <AboutPage />;
  else if (path === "/contact") page = <ContactPage />;
  else if (path === "/resume") page = <ResumePage />;
  else if (path === "/case/ica-banken") page = <IcaCasePage />;
  else if (path === "/case/calmotion") page = <CalmotionCasePage />;
  else if (path === "/case/safemap") page = <SafeMapCasePage />;
  else if (path === "/case/climate-hub") page = <ClimateHubCasePage />;
  else if (path === "/case/landa") page = <LandaCasePage />;
  else if (path.startsWith("/case/")) {
    const project = projectBySlug.get(path.replace("/case/", ""));
    page = project ? <CasePage project={project} /> : <WorkPage />;
  } else {
    page = <HomePage />;
  }

  const isStandaloneResume = path === "/resume";

  return (
    <>
      <div
        className={`dare-site-viewport${llmOpen ? " is-llm-open" : ""}`}
      >
        <div className="dare-site-stage">
          {page}
          {!isStandaloneResume && <FloatingNav path={path} />}
        </div>
      </div>
      {!isStandaloneResume && (
        <DareLlm isOpen={llmOpen} path={path} drawerWidth={llmDrawerWidth} onClose={closeDareLlm} />
      )}
    </>
  );
}
