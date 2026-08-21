import { type ReactNode, useEffect, useRef, useState } from "react";

function BioReveal({ children, className, dataName }: { children: ReactNode; className: string; dataName?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${className} desktop-bio-reveal${isVisible ? " is-visible" : ""}`} data-name={dataName} ref={ref}>
      {children}
    </div>
  );
}

function Container() {
  return <div className="absolute h-[480px] left-0 opacity-40 top-0 w-[1680px]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1680 480' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -75.132 -93.915 0 840 144)'><stop stop-color='rgba(0,95,204,0.3)' offset='0'/><stop stop-color='rgba(0,48,102,0.15)' offset='0.35'/><stop stop-color='rgba(0,0,0,0)' offset='0.7'/></radialGradient></defs></svg>\")" }} data-name="Container" />;
}

function Button() {
  return (
    <BioReveal className="absolute bg-white content-stretch flex flex-col items-start left-[1312px] px-[32px] py-[12px] rounded-[9999px] top-[222px]" dataName="Button">
      <p className="[word-break:break-word] font-nimbus font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-black text-center tracking-[1.4px] whitespace-nowrap">ABOUT ME</p>
    </BioReveal>
  );
}

function Heading() {
  return (
    <BioReveal className="[word-break:break-word] absolute content-stretch flex flex-col h-[123px] items-start left-[139px] not-italic pb-[48px] top-[80px] w-[505px]" dataName="Heading 2">
      <div className="font-poppins font-medium leading-[0] relative shrink-0 text-[0px] text-white tracking-[-1.8px] w-[619px]">
        <p className="leading-[46.8px] mb-0 text-[39px]">My journey into design</p>
        <p className="leading-[46.8px] text-[#b3b3b3] text-[39px]">began with studying people.</p>
      </div>
      <div className="absolute font-poppins font-normal h-[84px] leading-[0] left-0 text-[#b3b3b3] text-[18px] top-[142px] w-[923px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[28px]">{`With a background in Psychology and Human Computer Interaction, my work has centered on understanding how people `}</span>
          <span className="font-poppins font-normal italic leading-[28px]">think</span>
          <span className="leading-[28px]">{`, `}</span>
          <span className="font-poppins font-normal italic leading-[28px]">behave</span>
          <span className="leading-[28px]">{`, and `}</span>
          <span className="font-poppins font-normal italic leading-[28px]">make decisions</span>
          <span className="leading-[28px]">{`, and how that understanding `}</span>
        </p>
        <p className="leading-[28px]">can inform the design of products, services, and systems.</p>
      </div>
      <p className="absolute font-poppins font-medium leading-[28px] left-0 text-[18px] text-white top-[274px] w-[966px]">{`I'm drawn to problems where understanding people changes the outcome, not just the interface.`}</p>
    </BioReveal>
  );
}

export default function BioSection() {
  return (
    <div className="bg-[#0d0d0d] relative size-full" data-name="BioSection">
      <Container />
      <Button />
      <Heading />
    </div>
  );
}
