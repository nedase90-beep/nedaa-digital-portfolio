import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronDown,
  Clapperboard,
  ExternalLink,
  FolderOpen,
  Gamepad2,
  GraduationCap,
  Heart,
  Layers3,
  Menu,
  MonitorPlay,
  MoveUpRight,
  Palette,
  Play,
  Quote,
  Sparkles,
  X,
} from "lucide-react";

const DRIVE_ROOT = "https://drive.google.com/drive/folders/1l79gT2dwQRlN8BZliQlB0qYqCnfVKpHP";
const PDF_LINK = "https://drive.google.com/file/d/1pDvCS4LfFFtY_hR_YKFFGcvPhwjnV8f1/view?usp=drivesdk";
const DOC_LINK = "https://docs.google.com/document/d/1RZhDcI7hLFbzKb841StyFxR5odnrTY71swo3ygzsddE/edit?usp=drivesdk";

const files = {
  education: [
    { name: "التشريح البشري - خريطة الحياة داخلنا.pptx", href: "https://drive.google.com/file/d/1trTpcFdsE7rBpl6r1lM0TH2AXOHj4tWZ/view?usp=drivesdk", label: "عرض تعليمي" },
  ],
  interactive: [
    { name: "snake-maze (1).html", href: "https://drive.google.com/file/d/1I-G8cCPPN8Lj5l9yaOTWmUJEaTMkbpu_/view?usp=drivesdk", label: "لعبة HTML" },
    { name: "snakemaze-mobile.zip", href: "https://drive.google.com/file/d/1tNUfOkRclwLLyFAABRW7ZkDxHsQPtKQN/view?usp=drivesdk", label: "نسخة موبايل" },
    { name: "سما واللغز الفضي (1).pdf", href: "https://drive.google.com/file/d/1RU2l6got6e02ieYC2JLukD3BSx2yKINw/view?usp=drivesdk", label: "قصة رقمية" },
    { name: "غلاف القصة.pdf", href: "https://drive.google.com/file/d/1eqqLP3pQAzJsf1EKs6FJP0ke7dWRjfyG/view?usp=drivesdk", label: "غلاف قصصي" },
    { name: "قصة الحروف", href: "https://drive.google.com/file/d/1JJPy7VTHaTwjTcPlnWoTMVizUOCZ4ZU4/view?usp=drivesdk", label: "تعلم بالقصص" },
  ],
  visual: [
    { name: "0b942b6f57609bd37e8358ddcf032ec8.jpg", href: "https://drive.google.com/file/d/1PYr2UbgcNXAMe3Lsu5mAHS6DiwghF7-4/view?usp=drivesdk", label: "تصميم بصري" },
    { name: "563fcfd2-3f8a-4f60-b995-385205c0dcf2.jpg", href: "https://drive.google.com/file/d/1A-7Pt65QKBagr2M9kYK9jEHPoYis9kvw/view?usp=drivesdk", label: "تصميم بصري" },
    { name: "Character facial expression sheet", href: "https://drive.google.com/file/d/1-5eD2VMIgMJEFc_yAN42wZ_0zq1ZuMmA/view?usp=drivesdk", label: "تطوير شخصيات" },
    { name: "Character waving and smiling", href: "https://drive.google.com/file/d/1DQvpcgFUrJCe-Fc77q0tsGKtmbT7tCfF/view?usp=drivesdk", label: "تطوير شخصيات" },
    { name: "d04c22d4-aff9-4d35-81d1-697ee67dcc97.png", href: "https://drive.google.com/file/d/1hIBSNVh7HbIPtNFwelkMmi2DGAlXbyoD/view?usp=drivesdk", label: "لوحة بصرية" },
    { name: "download (8).png", href: "https://drive.google.com/file/d/1WAMxXb6CFOfS589UPSFXBGbLQJDTbhv3/view?usp=drivesdk", label: "تصميم بصري" },
    { name: "download (9).png", href: "https://drive.google.com/file/d/16gSpBnJ_XHEGf63TZrR41wMYQvplYQX3/view?usp=drivesdk", label: "تصميم بصري" },
    { name: "Girl traveling through time", href: "https://drive.google.com/file/d/14pUoNOABTUSrNN1rjQ7KPdpjpsYws29-/view?usp=drivesdk", label: "لوحة قصصية" },
    { name: "Naya animates historical desert", href: "https://drive.google.com/file/d/1VJIytrT_PfQJYK1GdbFOkOWAIPlaxhhM/view?usp=drivesdk", label: "مشهد متحرك" },
    { name: "Student using smart pen storyboard", href: "https://drive.google.com/file/d/1F3-mjv1feDbPx2C6VxIotrZ2hm-NPFy5/view?usp=drivesdk", label: "لوحة قصصية" },
    { name: "uni-1.1-max — فنجان قهوة مسكوب", href: "https://drive.google.com/file/d/1WYpDTJjEwePewJGLJy3l3MNT8Vkhx7CN/view?usp=drivesdk", label: "تصميم توليدي" },
    { name: "إعلان القلم الذكي", href: "https://drive.google.com/file/d/1qkqlp6AmGvINikyXIfo2r3fvIrb_orc9/view?usp=drivesdk", label: "إعلان بصري" },
    { name: "بطاقة تعريفية", href: "https://drive.google.com/file/d/13AZZOWnB63ku8jP3KikPkxTpxKgRDkUp/view?usp=drivesdk", label: "بطاقة" },
    { name: "قبل", href: "https://drive.google.com/file/d/1FpkbjDgS2FQQ0oZveFJAp0kz_TjXB31O/view?usp=drivesdk", label: "تجربة بصرية" },
    { name: "كاراكتر شيت للشخصية", href: "https://drive.google.com/file/d/1B3yogtpaMLDZGAwqeD475UcSUzhSknso/view?usp=drivesdk", label: "تطوير شخصية" },
    { name: "مخطط تفصيلي لعمل الغريبة", href: "https://drive.google.com/file/d/1UHyQAigUy3imWNuImRO_batKkPgLdOaw/view?usp=drivesdk", label: "مخطط بصري" },
  ],
  media: [
    { name: "Naya animates historical desert", href: "https://drive.google.com/file/d/1rwoMjj71kk7AnJB2sTWECcsP5TMhhZ14/view?usp=drivesdk", label: "فيديو" },
    { name: "Person using smart scanning pen", href: "https://drive.google.com/file/d/1zxfOtfOVT_EXuMUG1NZ1PPuoJwvK6H3r/view?usp=drivesdk", label: "فيديو" },
    { name: "TextFlow promotional video", href: "https://drive.google.com/file/d/133sbDNF5XHE1R5Ygh2DxmJdN4BNfoLYC/view?usp=drivesdk", label: "فيديو ترويجي" },
    { name: "Untitled Scene", href: "https://drive.google.com/file/d/1uvQn3GwgLECHdRseEJfgYng0qMBgF5Cz/view?usp=drivesdk", label: "مشهد" },
    { name: "WhatsApp Video — 09:26", href: "https://drive.google.com/file/d/18i8p9ayG3J84xfyUjFvV3KoDWoP8-Zau/view?usp=drivesdk", label: "فيديو قصير" },
    { name: "WhatsApp Video — 09:27", href: "https://drive.google.com/file/d/1ScUUqcEjxMMjifOHwdwhL1HlGqxw1U4w/view?usp=drivesdk", label: "فيديو قصير" },
    { name: "إعلان للعطر والشمع", href: "https://drive.google.com/file/d/1JvufuckJVrv0BTiTC-18iqwb6ZfjDFxK/view?usp=drivesdk", label: "إعلان" },
    { name: "أهمية الأكل الصحي", href: "https://drive.google.com/file/d/1jyVa9xWSVX3TTZzv8weUkK7hGG7HeJMp/view?usp=drivesdk", label: "توعية" },
    { name: "جمال العطر", href: "https://drive.google.com/file/d/13kOlfV-gkelScfVfeYE_3INs8qjvP2K-/view?usp=drivesdk", label: "إعلان" },
    { name: "علاقتك مع أبناءك", href: "https://drive.google.com/file/d/1jJ5dWQ4gDf5RsbSJYmf5TLc0-SHs-7S1/view?usp=drivesdk", label: "توعية أسرية" },
    { name: "Persuasive Outbound Sales", href: "https://drive.google.com/file/d/1sW-GVWa9zNAikidAj8B6g2N2yI-6I3rW/view?usp=drivesdk", label: "تسجيل صوتي" },
  ],
} as const;

const categories = [
  { id: "all", label: "كل الأعمال", count: 33, icon: Layers3 },
  { id: "education", label: "تعليم رقمي", count: 1, icon: GraduationCap },
  { id: "interactive", label: "قصص وتفاعل", count: 5, icon: Gamepad2 },
  { id: "visual", label: "تصميم بصري", count: 16, icon: Palette },
  { id: "media", label: "فيديو وصوت", count: 11, icon: Clapperboard },
] as const;

type CategoryId = (typeof categories)[number]["id"];
type PortfolioFile = (typeof files.education)[number];

function openLink(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function AppMark() {
  return (
    <div className="brand-mark" aria-label="نداء أبو صالح">
      <span>ن</span>
      <i />
    </div>
  );
}

function SectionHeading({ kicker, title, copy, light = false }: { kicker: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const portfolioGroups = useMemo(() => {
    if (activeCategory === "all") return Object.entries(files) as [string, readonly PortfolioFile[]][];
    return [[activeCategory, files[activeCategory as keyof typeof files]]] as [string, readonly PortfolioFile[]][];
  }, [activeCategory]);

  const toggleAccordion = (id: string) => setOpenAccordions((previous) => ({ ...previous, [id]: !previous[id] }));

  return (
    <main dir="rtl" className="site-shell">
      <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <AppMark />
            <span className="brand-copy"><strong>نداء أبو صالح</strong><small>مدرّبة مهارات رقمية</small></span>
          </a>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>عن نداء</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>الخبرة</a>
            <a href="#work" onClick={() => setMenuOpen(false)}>الأعمال</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>تواصل</a>
            <a className="nav-cta" href={PDF_LINK} target="_blank" rel="noreferrer">الحقيبة المهنية <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid-line" />
        <div className="container hero-layout">
          <div className="hero-copy reveal-up">
            <div className="hero-kicker"><span className="kicker-dot" /> NEDAA ABU SALEH / 2026</div>
            <h1>أصنع مساحة تجعل <em>التقنية</em> مفهومة… وملهمة.</h1>
            <p className="hero-lead">أنا نداء، مدرّبة مهارات رقمية أؤمن أن التعليم الحقيقي لا يكتفي بنقل المعلومة؛ بل يفتح للمتعلّم بابًا جديدًا ليجرّب، ويبتكر، ويثق بقدرته.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">استكشف الأعمال <ArrowDown size={17} /></a>
              <a className="button button-ghost" href={DRIVE_ROOT} target="_blank" rel="noreferrer">افتح الحقيبة على Drive <ExternalLink size={16} /></a>
            </div>
            <div className="hero-signature"><span>رحلة تعلم مدى الحياة</span><div className="signature-line" /><Heart size={14} fill="currentColor" /></div>
          </div>
          <div className="hero-visual reveal-up delay-1">
            <div className="hero-image-frame"><div className="hero-image" /><div className="hero-image-shade" /></div>
            <div className="hero-floating-card hero-floating-card-top"><Sparkles size={17} /><div><strong>تعلّم بذكاء</strong><span>تبسيط · تطبيق · أثر</span></div></div>
            <div className="hero-floating-card hero-floating-card-bottom"><span className="mini-orbit"><BrainCircuit size={17} /></span><div><strong>09</strong><span>سنوات في التعليم</span></div></div>
            <div className="hero-vertical-label">DIGITAL SKILLS · EDUCATION · AI</div>
          </div>
        </div>
        <div className="container hero-stats">
          <div><strong>09<span>+</span></strong><span>سنوات خبرة تعليمية</span></div>
          <div><strong>33</strong><span>ملفًا إبداعيًا منظمًا</span></div>
          <div><strong>∞</strong><span>شغف بالتعلم المستمر</span></div>
          <div className="stats-note">من الفصل الدراسي إلى<br /><b>المختبر الرقمي</b></div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container about-layout">
          <div className="about-side"><span className="vertical-word">ABOUT / 01</span><div className="side-rule" /></div>
          <div className="about-content">
            <SectionHeading kicker="01 / من أنا" title="التعليم عندي ليس وظيفة؛ إنه طريقة لرؤية العالم." copy="كل تجربة تعليمية أقدّمها تبدأ من سؤال بسيط: كيف أجعل هذه الفكرة أقرب، أوضح، وأكثر قابلية لأن تُستخدم في الحياة؟" />
            <div className="about-body-grid">
              <div className="quote-card"><Quote size={28} /><p>طموحي دوماً أن أزداد علماً، وأن أفيد بعلمي غيري، وأن يكون تطوري مدى الحياة.</p><span>— نداء أبو صالح</span></div>
              <div className="about-text"><p>بدأت رحلتي مع التعليم عبر المراحل الدراسية المختلفة، ثم اتسعت لتشمل لغات البرمجة الأساسية، وحقيبة ICDL، والعمل الإداري داخل البيئة المدرسية، والتدريب عبر المنصات الإلكترونية.</p><p>اليوم أعمل مدرّبة مهارات رقمية في مؤسسة التدريب المهني، وأطوّر خبرتي في الذكاء الاصطناعي لأصنع محتوى يقرّب التقنية من الناس، ويمنحهم خطوات عملية قابلة للتطبيق.</p><a className="text-link" href={DOC_LINK} target="_blank" rel="noreferrer">اقرأ النسخة الكاملة من الحقيبة <MoveUpRight size={15} /></a></div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="container">
          <SectionHeading kicker="02 / الخبرة" title="خبرة تتقدم مع كل غرفة صف، وكل شاشة، وكل متعلّم." copy="مسار مهني يجمع بين أساس تربوي متين، وتجربة رقمية عملية، وفضول لا يتوقف عند أداة واحدة." />
          <div className="experience-grid">
            <article className="experience-card experience-card-featured"><span className="card-number">01</span><div className="experience-icon"><GraduationCap /></div><h3>مدرّبة مهارات رقمية</h3><p>مؤسسة التدريب المهني — الدور الحالي</p><div className="card-bottom"><span>تدريب تطبيقي</span><ArrowUpRight size={17} /></div></article>
            <article className="experience-card"><span className="card-number">02</span><div className="experience-icon"><MonitorPlay /></div><h3>التدريب عبر المنصات</h3><p>تصميم وتقديم جلسات تعليمية في بيئات التعلم عن بُعد.</p><div className="card-bottom"><span>تعلم إلكتروني</span><ArrowUpRight size={17} /></div></article>
            <article className="experience-card"><span className="card-number">03</span><div className="experience-icon"><BookOpen /></div><h3>تعليم شامل</h3><p>خبرة في تدريس جميع المراحل الدراسية وبناء محتوى يتناسب مع احتياجات المتعلمين.</p><div className="card-bottom"><span>تعليم متمحور حول الإنسان</span><ArrowUpRight size={17} /></div></article>
            <article className="experience-card"><span className="card-number">04</span><div className="experience-icon"><BarChart3 /></div><h3>مهارات أساسية راسخة</h3><p>لغات البرمجة الأساسية، ICDL، الدعم الإداري، وتبسيط المعرفة الرقمية.</p><div className="card-bottom"><span>أساس متين</span><ArrowUpRight size={17} /></div></article>
          </div>
        </div>
      </section>

      <section className="marquee-section" aria-label="مجالات العمل"><div className="marquee-track"><span>Digital Skills</span><i>✦</i><span>Creative Learning</span><i>✦</i><span>Artificial Intelligence</span><i>✦</i><span>Digital Skills</span><i>✦</i><span>Creative Learning</span><i>✦</i><span>Artificial Intelligence</span><i>✦</i></div></section>

      <section id="work" className="section work-section">
        <div className="container">
          <div className="work-header"><SectionHeading kicker="03 / الأعمال" title="أفكار تتحول إلى تجربة." copy="من عرض تعليمي إلى لعبة صغيرة أو فيديو قصير؛ هذه مكتبة حيّة لما يمكن أن يصنعه التعليم حين يلتقي بالخيال الرقمي." /><a className="button button-dark" href={DRIVE_ROOT} target="_blank" rel="noreferrer">استعرض المجلد الكامل <FolderOpen size={16} /></a></div>
          <div className="category-tabs">{categories.map((category) => { const Icon = category.icon; return <button key={category.id} className={activeCategory === category.id ? "category-tab active" : "category-tab"} onClick={() => setActiveCategory(category.id)}><Icon size={17} /><span>{category.label}</span><b>{category.count}</b></button>; })}</div>
          <div className="portfolio-grid">{portfolioGroups.map(([key, group], index) => { const category = categories.find((item) => item.id === key); const Icon = category?.icon ?? Layers3; const visible = group.slice(0, activeCategory === "all" ? 4 : group.length); return <article className={`portfolio-group portfolio-group-${key}`} key={key}><div className="portfolio-group-head"><div className="portfolio-group-icon"><Icon size={18} /></div><div><span>{String(index + 1).padStart(2, "0")} / {category?.label}</span><h3>{key === "education" ? "المعرفة حين تصبح مرئية" : key === "interactive" ? "تعلم يتحرك ويلعب" : key === "visual" ? "لغة بصرية لها شخصية" : "رسائل قصيرة، أثر طويل"}</h3></div><b>{group.length} ملف</b></div><p className="portfolio-group-copy">{key === "education" ? "محتوى تعليمي منظّم يقرّب المفاهيم المعقدة ويجعلها قابلة للاستيعاب." : key === "interactive" ? "قصص وألعاب رقمية تمنح المتعلم مساحة للاكتشاف والتجربة." : key === "visual" ? "لوحات، بطاقات، شخصيات ومخططات تصنع هوية للمحتوى." : "فيديو وصوت يوصل الفكرة بخفة ووضوح إلى جمهور أوسع."}</p><div className="file-list">{visible.map((file) => <a className="file-row" href={file.href} target="_blank" rel="noreferrer" key={file.name}><span className="file-row-icon">{key === "media" ? <Play size={13} fill="currentColor" /> : <ArrowUpRight size={13} />}</span><span className="file-row-name">{file.name}</span><span className="file-row-label">{file.label}</span></a>)}</div>{activeCategory === "all" && group.length > 4 && <button className="see-more" onClick={() => setActiveCategory(key as CategoryId)}>عرض كل ملفات القسم <ArrowUpRight size={14} /></button>}</article>; })}</div>
        </div>
      </section>

      <section className="section approach-section">
        <div className="container approach-layout"><div className="approach-art"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-core"><Sparkles size={28} /></div><span className="art-label art-label-one">curiosity</span><span className="art-label art-label-two">practice</span><span className="art-label art-label-three">impact</span></div><div className="approach-content"><SectionHeading kicker="04 / فلسفة العمل" title="أدرّب العقل… وأحترم فضوله." copy="التقنية تتغير بسرعة، لكن الطريقة التي نتعلم بها تبقى إنسانية: سؤال واضح، تجربة آمنة، وتشجيع صادق على المحاولة." /><div className="principles-list"><div><span>01</span><p><b>أبسّط دون أن أُسطّح</b><small>أحوّل المصطلح إلى صورة، والخطوة إلى ممارسة.</small></p></div><div><span>02</span><p><b>أصمم للتجربة</b><small>كل فكرة أفضل حين يمكن لمسها، اختبارها، وتطويرها.</small></p></div><div><span>03</span><p><b>أتعلم باستمرار</b><small>الفضول ليس مرحلة؛ إنه أسلوب حياة ومهنة.</small></p></div></div></div></div>
      </section>

      <section id="contact" className="contact-section"><div className="contact-glow" /><div className="container contact-layout"><div><span className="eyebrow">05 / لنبنِ أثرًا</span><h2>هل لديك معرفة<br /><em>تحتاج إلى مساحة؟</em></h2></div><div className="contact-copy"><p>إذا كنت تبحث عن مدرّبة مهارات رقمية تجمع بين الخبرة التعليمية، وحسّ المحتوى، وشغف الذكاء الاصطناعي؛ يسعدني أن نبدأ حوارًا.</p><a className="button button-light" href={DRIVE_ROOT} target="_blank" rel="noreferrer">افتح الحقيبة كاملة <ArrowUpRight size={17} /></a></div></div></section>

      <footer className="site-footer"><div className="container footer-inner"><div className="footer-brand"><AppMark /><div><strong>نداء أبو صالح</strong><span>مدرّبة مهارات رقمية</span></div></div><p>التعلم رحلة. فلنجعلها أكثر وضوحًا، ودفئًا، وإلهامًا.</p><div className="footer-links"><a href="#top">العودة للأعلى <ArrowUpRight size={14} /></a><span>© 2026</span></div></div></footer>
    </main>
  );
}

export default Home;
