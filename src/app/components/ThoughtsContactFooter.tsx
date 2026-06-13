import { motion } from "motion/react";
import svgPaths from "../../imports/Frame17-2/svg-j5y14iocyr";
import imgContainer from "../../imports/Frame17-2/bb723806912d3960af8e2a9e8c5ab43dbd236d14.png";
import imgUntitledDesign2Copy1 from "../../imports/Frame17-2/20752255ebcb848b8256d85309ce6018a74dafd8.png";

// ─── Thoughts Section ───────────────────────────────────────────────────────

function ArrowIcon({ clipId }: { clipId: string }) {
  return (
    <div className="h-[9.175px] relative shrink-0 w-[14.275px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2748 9.17472">
        <g clipPath={`url(#${clipId})`}>
          <path d={svgPaths.pd29fc60} stroke="var(--stroke-0, #1D1D1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.52912" />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect fill="white" height="9.17472" width="14.2748" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

interface Article {
  id: number;
  tag: string;
  readTime: string;
  title: string;
  description: string;
  clipId: string;
}

const articles: Article[] = [
  {
    id: 1,
    tag: "PSYCHOLOGY",
    readTime: "5 min read",
    title: "What Psychology Taught Me About Product Design",
    description: `Behavioral science isn't just useful for conversions. It fundamentally changes how we define design problems and what we're actually designing for.`,
    clipId: "clip_article_1",
  },
  {
    id: 2,
    tag: "PRODUCT THINKING",
    readTime: "6 min read",
    title: "Why Design Problems Are Often Insight Problems",
    description: `Before we can solve anything well, we need to understand what we're actually solving for. Most design failures begin well before the first wireframe.`,
    clipId: "clip_article_2",
  },
  {
    id: 3,
    tag: "AI DESIGN",
    readTime: "7 min read",
    title: "Designing for Human Autonomy in AI Systems",
    description: "When machines get smarter, the design question shifts from capability to control, and who holds it. My thoughts on what it means to keep humans in the loop.",
    clipId: "clip_article_3",
  },
];

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.div
      className="bg-white flex-[384_0_0] min-w-px relative rounded-[18.36px]"
      style={{ height: "261.113px" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      <div className="content-stretch flex flex-col items-start justify-between p-[28.56px] relative size-full">
        {/* Top: meta + title + description */}
        <div className="relative shrink-0 w-full flex flex-col gap-[10.2px]">
          {/* Tag + read time */}
          <div className="relative shrink-0 w-full flex items-center justify-between">
            <p className="font-['Nimbus_Sans_L:Bold',sans-serif] leading-[15.3px] not-italic text-[#6e6e73] text-[10.2px] tracking-[1.428px] uppercase whitespace-nowrap">
              {article.tag}
            </p>
            <p className="font-['Nimbus_Sans_L:Regular',sans-serif] leading-[16.83px] not-italic text-[#b3b3b3] text-[11.22px] whitespace-nowrap">
              {article.readTime}
            </p>
          </div>
          {/* Title */}
          <p className="font-['Poppins:Medium',sans-serif] leading-[25.194px] not-italic text-[#1d1d1f] text-[19.38px] tracking-[-0.51px] w-full">
            {article.title}
          </p>
          {/* Description */}
          <p className="font-['Poppins:Regular',sans-serif] leading-[20.553px] not-italic text-[#6e6e73] text-[13.26px] tracking-[-0.102px] w-full">
            {article.description}
          </p>
        </div>
        {/* Bottom: Read Article + icon */}
        <div className="relative shrink-0 w-full flex gap-[8.16px] items-center">
          <p className="font-['Poppins:Medium',sans-serif] leading-[19.89px] not-italic text-[#1d1d1f] text-[13.26px] whitespace-nowrap">
            Read Article
          </p>
          <ArrowIcon clipId={article.clipId} />
        </div>
      </div>
    </motion.div>
  );
}

export function ThoughtsSection() {
  return (
    <div className="bg-[#f5f5f7] relative shrink-0 w-full flex items-center" style={{ height: "531px" }}>
      <div className="flex flex-col gap-[32px] pl-[139px]" style={{ width: "1338.991px" }}>
        {/* Heading */}
        <motion.div
          className="relative shrink-0 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="font-['Poppins:Medium',sans-serif] leading-[48.6px] not-italic text-[#1d1d1f] text-[39px] tracking-[-0.93px] whitespace-nowrap mb-0">
            {`Thoughts on design, `}
          </p>
          <p className="font-['Poppins:Medium',sans-serif] leading-[48.6px] not-italic text-[39px] tracking-[-0.93px] whitespace-nowrap mb-0">
            <span className="text-[#6e6e73]">insight</span>
            <span className="text-[#1d1d1f]">, and human behaviour.</span>
          </p>
        </motion.div>

        {/* Cards row */}
        <div className="flex gap-[24.48px] items-start" style={{ width: "1223.991px" }}>
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────

export function ContactSection() {
  return (
    <div className="bg-[#0d0d0d] relative shrink-0 w-full" style={{ height: "479.993px" }}>
      {/* Texture image overlay */}
      <div className="absolute h-[479.993px] left-0 opacity-40 top-0 w-[1679.993px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[31.25%] left-0 max-w-none top-0 w-[17.86%]" src={imgContainer} />
        </div>
      </div>

      {/* Radial blue gradient overlay */}
      <div
        className="absolute opacity-40"
        style={{
          left: "1px",
          top: "-5.99px",
          width: "1677px",
          height: "481px",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1677 481' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -75.288 -93.747 0 838.5 144.3)'><stop stop-color='rgba(0,95,204,0.3)' offset='0'/><stop stop-color='rgba(0,48,102,0.15)' offset='0.35'/><stop stop-color='rgba(0,0,0,0)' offset='0.7'/></radialGradient></defs></svg>\")",
        }}
      />

      {/* Left content: heading + CTA */}
      <div
        className="absolute flex h-[479.993px] items-center left-[139px] top-0 w-[1199.991px]"
      >
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Heading */}
          <div className="relative shrink-0 w-[772px]">
            <div style={{ height: "17px" }} />
            <div className="h-[129px] relative shrink-0 w-[361px]" style={{ paddingTop: "16px" }}>
              <div className="absolute left-0 top-[-49px] w-[758px]">
                <div className="font-['Poppins:Medium',sans-serif] leading-[0] not-italic text-[#b3b3b3] tracking-[-1.8px] whitespace-nowrap">
                  <p className="leading-[66.8px] mb-0 text-[56px]">Love to work with someone</p>
                  <p className="leading-[66.8px] text-[56px] text-white mb-0">keen on insight?</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA row — absolutely positioned 139px from Container3 top */}
          <div className="absolute left-0 top-[139px] w-[361px]">
            <div className="flex gap-[24px] items-center">
              <a
                href="mailto:dareabinde04@gmail.com"
                className="bg-white relative rounded-[9999px] shrink-0 flex items-center justify-center cursor-pointer hover:bg-[#f0f0f0] transition-colors duration-200"
                style={{ height: "48.996px", width: "185.444px" }}
              >
                <p className="font-['Nimbus_Sans_L:Bold',sans-serif] leading-[21px] not-italic text-[14px] text-black tracking-[1.4px] uppercase whitespace-nowrap">
                  Contact Me
                </p>
              </a>
              <p className="font-['Nimbus_Sans_L:Regular',sans-serif] leading-[21px] not-italic text-[#888] text-[14px] tracking-[0.4px] whitespace-nowrap">
                dareabinde04@gmail.com
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Profile photo — absolute positioned as in Figma */}
      <motion.div
        className="absolute overflow-hidden"
        style={{ height: "257px", left: "1160px", top: "151px", width: "250px" }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt="Dare Abinde"
            className="absolute max-w-none"
            style={{
              height: "228.53%",
              left: "-39.29%",
              top: "-44.35%",
              width: "176.4%",
            }}
            src={imgUntitledDesign2Copy1}
          />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Footer Section ───────────────────────────────────────────────────────────

export function FooterSection() {
  const navLinks = ["Home", "Work", "Thoughts", "About"];

  return (
    <div className="bg-[#0d0d0d] relative shrink-0 w-full" style={{ height: "79.993px" }}>
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.08)] border-solid border-t-[0.575px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="flex items-center justify-between pl-[139px] pr-[139px] size-full">
          {/* Logo */}
          <div className="flex gap-[10px] items-center shrink-0">
            <div className="bg-white relative rounded-[2px] shrink-0 flex items-center justify-center" style={{ width: "27.999px", height: "27.999px" }}>
              <div className="relative shrink-0" style={{ width: "14px", height: "14px" }}>
                <div className="absolute flex items-center justify-center" style={{ left: "-2.9px", width: "19.799px", height: "19.799px", top: "-2.9px" }}>
                  <div className="rotate-45">
                    <div className="bg-black" style={{ width: "14px", height: "14px" }} />
                  </div>
                </div>
              </div>
            </div>
            <p className="font-['Nimbus_Sans_L:Bold',sans-serif] leading-[24px] not-italic text-[16px] text-white tracking-[-0.4px] whitespace-nowrap">
              DARExABINDE
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-[40px] items-center shrink-0">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-['Nimbus_Sans_L:Regular',sans-serif] leading-[19.5px] not-italic text-[#888] text-[13px] tracking-[1.2px] uppercase whitespace-nowrap hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-['Nimbus_Sans_L:Regular',sans-serif] leading-[19.5px] not-italic text-[#555] text-[13px] whitespace-nowrap shrink-0">
            © 2026 Dare Abinde. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
