const insurers = [
  { name: "New India Assurance", abbr: "NIA", color: "#C41E3A" },
  { name: "Oriental Insurance", abbr: "OI", color: "#006633" },
  { name: "United India Insurance", abbr: "UII", color: "#003087" },
  { name: "National Insurance", abbr: "NIC", color: "#F26522" },
  { name: "ICICI Lombard", abbr: "ICICI", color: "#0066B3" },
  { name: "HDFC ERGO", abbr: "HDFC", color: "#EF1111" },
  { name: "Bajaj Allianz", abbr: "Bajaj", color: "#005BAC" },
  { name: "Tata AIG", abbr: "Tata", color: "#1B2D6B" },
];

const LogoItem = ({ abbr, color, name }: { abbr: string; color: string; name: string }) => (
  <div className="flex items-center gap-3 px-6 shrink-0" style={{ width: 160 }}>
    <span className="font-bold text-lg" style={{ color }}>{abbr}</span>
    <span className="text-xs text-muted-foreground hidden sm:block whitespace-nowrap">{name.split(" ").slice(-1)[0]}</span>
  </div>
);

const Divider = () => <div className="w-px h-6 bg-border shrink-0" />;

const LogoMarquee = () => {
  const items = insurers.flatMap((ins, i) => [
    <LogoItem key={`a-${i}`} {...ins} />,
    <Divider key={`d-a-${i}`} />,
  ]);
  const itemsDup = insurers.flatMap((ins, i) => [
    <LogoItem key={`b-${i}`} {...ins} />,
    <Divider key={`d-b-${i}`} />,
  ]);

  return (
    <section className="bg-card border-b py-10 overflow-hidden">
      <p className="text-center text-sm text-muted-foreground mb-6">
        Trusted by surveyors working with India's top insurers
      </p>
      <div className="relative">
        <div className="marquee-track flex items-center hover:[animation-play-state:paused]"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {items}
          {itemsDup}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
