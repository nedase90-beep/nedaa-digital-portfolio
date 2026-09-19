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

const GAME_SRC = "/game/snake-maze.html";

const visualAssets = [
  { src: "/manus-storage/image_01_5b17e9a2.jpg", title: "مشهد بصري", label: "تصميم بصري" },
  { src: "/manus-storage/image_02_6876b33e.jpg", title: "لقطة إبداعية", label: "هوية بصرية" },
  { src: "/manus-storage/image_03_2a82386a.jpeg", title: "تعبيرات شخصية", label: "تطوير شخصيات" },
  { src: "/manus-storage/image_04_7759ccd8.jpeg", title: "شخصية تلوّح", label: "تطوير شخصيات" },
  { src: "/manus-storage/image_05_428f6528.jpeg", title: "لوحة تعليمية", label: "Storytelling" },
  { src: "/manus-storage/image_08_18a5a373.png", title: "رحلة عبر الزمن", label: "لوحة قصصية" },
  { src: "/manus-storage/image_11_c43cb989.png", title: "فنجان قهوة مسكوب", label: "توليد إبداعي" },
  { src: "/manus-storage/image_12_2a348436.png", title: "إعلان القلم الذكي", label: "محتوى ترويجي" },
  { src: "/manus-storage/image_06_626d6ac0.gif", title: "مشهد صحراء متحرك", label: "حركة" },
  { src: "/manus-storage/image_07_8eb3173d.jpeg", title: "لوحة القلم الذكي", label: "Storyboard" },
  { src: "/manus-storage/image_09_f98ea861.png", title: "تجربة مرئية", label: "تصميم" },
  { src: "/manus-storage/image_10_2577478f.png", title: "لوحة شخصية", label: "تطوير شخصيات" },
  { src: "/manus-storage/image_13_98314956.png", title: "بطاقة تعريفية", label: "بطاقة" },
  { src: "/manus-storage/image_14_4fa6801c.png", title: "قبل", label: "تجربة بصرية" },
  { src: "/manus-storage/image_15_08cf9364.png", title: "كاراكتر شيت", label: "شخصية" },
  { src: "/manus-storage/image_16_aa57e535.png", title: "مخطط عمل الغريبة", label: "مخطط بصري" },
];

const mediaAssets = [
  { src: "/manus-storage/video_17_5cac44ed.mp4", title: "مشهد تاريخي متحرك", label: "فيديو" },
  { src: "/manus-storage/video_18_5323fe98.mp4", title: "القلم الذكي", label: "فيديو منتج" },
  { src: "/manus-storage/video_19_bc63bdda.mp4", title: "TextFlow", label: "فيديو ترويجي" },
  { src: "/manus-storage/video_23_7fd9e7ac.mp4", title: "إعلان العطر والشمع", label: "إعلان" },
  { src: "/manus-storage/video_24_17bef03b.mp4", title: "أهمية الأكل الصحي", label: "توعية" },
  { src: "/manus-storage/video_26_974e80b5.mp4", title: "علاقتك مع أبنائك", label: "توعية أسرية" },
  { src: "/manus-storage/video_20_5bbffee1.mp4", title: "مشهد قصير", label: "فيديو" },
  { src: "/manus-storage/video_21_93e41d12.mp4", title: "لقطة واتساب 01", label: "فيديو قصير" },
  { src: "/manus-storage/video_22_aa434ead.mp4", title: "لقطة واتساب 02", label: "فيديو قصير" },
  { src: "/manus-storage/video_25_1c63a10a.mp4", title: "جمال العطر", label: "إعلان" },
];

const files = {
  education: [
    { name: "التشريح البشري - خريطة الحياة داخلنا.pptx", href: "/manus-storage/anatomy-human-map_001d45ef.pptx", label: "عرض تعليمي · افتح الملف" },
  ],
  interactive: [
    { name: "snake-maze (1).html", href: "/manus-storage/snake-maze-original_31bb03a6.html", label: "لعبة HTML · افتح الملف" },
    { name: "snakemaze-mobile.zip", href: "/manus-storage/snakemaze-mobile_b92854fc.zip", label: "نسخة موبايل · تحميل الملف" },
    { name: "سما واللغز الفضي (1).pdf", href: "/manus-storage/sama-silver-mystery_412b49f9.pdf", label: "قصة رقمية · افتح الملف" },
    { name: "غلاف القصة.pdf", href: "/manus-storage/story-cover_f89556b7.pdf", label: "غلاف قصصي · افتح الملف" },
    { name: "قصة الحروف", href: "/manus-storage/letters-story_2c124f8b.pdf", label: "تعلم بالقصص · افتح الملف" },
  ],
  visual: [
    { name: "0b942b6f57609bd37e8358ddcf032ec8.jpg", href: "/manus-storage/image_01_5b17e9a2.jpg", label: "تصميم بصري · افتح الصورة" },
    { name: "563fcfd2-3f8a-4f60-b995-385205c0dcf2.jpg", href: "/manus-storage/image_02_6876b33e.jpg", label: "تصميم بصري · افتح الصورة" },
    { name: "Character facial expression sheet", href: "/manus-storage/image_03_2a82386a.jpeg", label: "تطوير شخصيات · افتح الصورة" },
    { name: "Character waving and smiling", href: "/manus-storage/image_04_7759ccd8.jpeg", label: "تطوير شخصيات · افتح الصورة" },
    { name: "d04c22d4-aff9-4d35-81d1-697ee67dcc97.png", href: "/manus-storage/image_05_428f6528.jpeg", label: "لوحة بصرية · افتح الصورة" },
    { name: "download (8).png", href: "/manus-storage/image_06_626d6ac0.gif", label: "تصميم بصري · افتح الصورة" },
    { name: "download (9).png", href: "/manus-storage/image_07_8eb3173d.jpeg", label: "تصميم بصري · افتح الصورة" },
    { name: "Girl traveling through time", href: "/manus-storage/image_08_18a5a373.png", label: "لوحة قصصية · افتح الصورة" },
    { name: "Naya animates historical desert", href: "/manus-storage/image_09_f98ea861.png", label: "مشهد متحرك · افتح الصورة" },
    { name: "Student using smart pen storyboard", href: "/manus-storage/image_10_2577478f.png", label: "لوحة قصصية · افتح الصورة" },
    { name: "uni-1.1-max — فنجان قهوة مسكوب", href: "/manus-storage/image_11_c43cb989.png", label: "تصميم توليدي · افتح الصورة" },
    { name: "إعلان القلم الذكي", href: "/manus-storage/image_12_2a348436.png", label: "إعلان بصري · افتح الصورة" },
    { name: "بطاقة تعريفية", href: "/manus-storage/image_13_98314956.png", label: "بطاقة · افتح الصورة" },
    { name: "قبل", href: "/manus-storage/image_14_4fa6801c.png", label: "تجربة بصرية · افتح الصورة" },
    { name: "كاراكتر شيت للشخصية", href: "/manus-storage/image_15_08cf9364.png", label: "تطوير شخصية · افتح الصورة" },
    { name: "مخطط تفصيلي لعمل الغريبة", href: "/manus-storage/image_16_aa57e535.png", label: "مخطط بصري · افتح الصورة" },
  ],
  media: [
    { name: "Naya animates historical desert", href: "/manus-storage/video_17_5cac44ed.mp4", label: "فيديو · شغّل الملف" },
    { name: "Person using smart scanning pen", href: "/manus-storage/video_18_5323fe98.mp4", label: "فيديو · شغّل الملف" },
    { name: "TextFlow promotional video", href: "/manus-storage/video_19_bc63bdda.mp4", label: "فيديو ترويجي · شغّل الملف" },
    { name: "Untitled Scene", href: "/manus-storage/video_20_5bbffee1.mp4", label: "مشهد · شغّل الملف" },
    { name: "WhatsApp Video — 09:26", href: "/manus-storage/video_21_93e41d12.mp4", label: "فيديو قصير · شغّل الملف" },
    { name: "WhatsApp Video — 09:27", href: "/manus-storage/video_22_aa434ead.mp4", label: "فيديو قصير · شغّل الملف" },
    { name: "إعلان للعطر والشمع", href: "/manus-storage/video_23_7fd9e7ac.mp4", label: "إعلان · شغّل الملف" },
    { name: "أهمية الأكل الصحي", href: "/manus-storage/video_24_17bef03b.mp4", label: "توعية · شغّل الملف" },
    { name: "جمال العطر", href: "/manus-storage/video_25_1c63a10a.mp4", label: "إعلان · شغّل الملف" },
    { name: "علاقتك مع أبناءك", href: "/manus-storage/video_26_974e80b5.mp4", label: "توعية أسرية · شغّل الملف" },
    { name: "Persuasive Outbound Sales", href: "/manus-storage/audi_27_9df06019.mp3", label: "تسجيل صوتي · شغّل الملف" },
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
    <div className="brand-avatar" aria-label="شخصية نداء أبو صالح الكرتونية">
      <img src="/manus-storage/nedaa-teacher_e5a23f5d.png" alt="معلمة محجبة داخل غرفة صفية" />
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
            <a className="nav-cta" href="#work" onClick={() => setMenuOpen(false)}>أعمالي الرقمية <ArrowUpRight size={15} /></a>
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
            <p className="hero-lead">أنا نداء أبو صالح، مدرّبة مهارات رقمية أصنع محتوى تعليميًا وإبداعيًا يقرّب التقنية من الإنسان، ويحوّل الفكرة إلى تجربة قابلة للتعلّم، والمشاركة، والنمو.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">استكشف الأعمال <ArrowDown size={17} /></a>
              <a className="button button-ghost" href="#game">جرّب اللعبة <Gamepad2 size={16} /></a>
            </div>
            <div className="hero-signature"><span>رحلة تعلم مدى الحياة</span><div className="signature-line" /><Heart size={14} fill="currentColor" /></div>
          </div>
          <div className="hero-visual reveal-up delay-1">
            <div className="tech-orb-stage"><div className="orb-halo" /><img className="hero-teacher" src="/manus-storage/nedaa-teacher_e5a23f5d.png" alt="معلمة محجبة تقف داخل غرفة صفية" /><img className="tech-orb" src="/manus-storage/tech_orb_ce04b3a3.png" alt="عنصر ثلاثي الأبعاد يرمز للتقنية والتعليم" /><span className="orb-ring orb-ring-one" /><span className="orb-ring orb-ring-two" /><span className="orb-caption">LEARN · CREATE · IMPACT</span></div>
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
              <div className="about-text"><p>بدأت رحلتي مع التعليم عبر المراحل الدراسية المختلفة، ثم اتسعت لتشمل لغات البرمجة الأساسية، وحقيبة ICDL، والعمل الإداري داخل البيئة المدرسية، والتدريب عبر المنصات الإلكترونية.</p><p>اليوم أعمل مدرّبة مهارات رقمية في مؤسسة التدريب المهني، وأطوّر خبرتي في الذكاء الاصطناعي لأصنع محتوى يقرّب التقنية من الناس، ويمنحهم خطوات عملية قابلة للتطبيق.</p><a className="text-link" href="#work">شاهد كيف تتحول الأفكار إلى أعمال رقمية <MoveUpRight size={15} /></a></div>
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
          <div className="work-header"><SectionHeading kicker="03 / الأعمال" title="أفكار تتحول إلى تجربة." copy="لا روابط خارجية هنا؛ كل مشروع يُعرض داخل الصفحة ليُرى ويُجرَّب ويُفهم كمنتج رقمي قابل للتطوير." /><a className="button button-dark" href="#game">انتقل إلى اللعبة <Gamepad2 size={16} /></a></div>
          <div className="category-tabs">{categories.map((category) => { const Icon = category.icon; return <button key={category.id} className={activeCategory === category.id ? "category-tab active" : "category-tab"} onClick={() => setActiveCategory(category.id)}><Icon size={17} /><span>{category.label}</span><b>{category.count}</b></button>; })}</div>
          <div className="portfolio-grid">{portfolioGroups.map(([key, group], index) => { const category = categories.find((item) => item.id === key); const Icon = category?.icon ?? Layers3; const visible = group.slice(0, activeCategory === "all" ? 4 : group.length); return <article className={`portfolio-group portfolio-group-${key}`} key={key}><div className="portfolio-group-head"><div className="portfolio-group-icon"><Icon size={18} /></div><div><span>{String(index + 1).padStart(2, "0")} / {category?.label}</span><h3>{key === "education" ? "المعرفة حين تصبح مرئية" : key === "interactive" ? "تعلم يتحرك ويلعب" : key === "visual" ? "لغة بصرية لها شخصية" : "رسائل قصيرة، أثر طويل"}</h3></div><b>{group.length} ملف</b></div><p className="portfolio-group-copy">{key === "education" ? "محتوى تعليمي منظّم يقرّب المفاهيم المعقدة ويجعلها قابلة للاستيعاب." : key === "interactive" ? "قصص وألعاب رقمية تمنح المتعلم مساحة للاكتشاف والتجربة." : key === "visual" ? "لوحات، بطاقات، شخصيات ومخططات تصنع هوية للمحتوى." : "فيديو وصوت يوصل الفكرة بخفة ووضوح إلى جمهور أوسع."}</p><div className="file-list">{visible.map((file) => <a className="file-row" href={file.href} target="_self" rel="noreferrer" key={file.name}><span className="file-row-icon">{key === "media" ? <Play size={13} fill="currentColor" /> : <ArrowUpRight size={13} />}</span><span className="file-row-name">{file.name}</span><span className="file-row-label">{file.label}</span></a>)}</div>{activeCategory === "all" && group.length > 4 && <button className="see-more" onClick={() => setActiveCategory(key as CategoryId)}>عرض كل ملفات القسم <ArrowUpRight size={14} /></button>}</article>; })}</div>
        </div>
      </section>

      <section className="section learning-lab-section" id="education">
        <div className="container learning-lab-layout"><div className="learning-lab-copy"><span className="eyebrow">04 / مشروع تعليمي</span><h2>المعرفة حين تصبح <em>مرئية.</em></h2><p>عرض «التشريح البشري — خريطة الحياة داخلنا» نموذج على تبسيط موضوع معرفي عبر تسلسل بصري يساعد المتعلم على الفهم والتذكر.</p><div className="learning-tags"><span>شرح بصري</span><span>تبسيط المعرفة</span><span>محتوى تدريبي</span></div></div><figure className="learning-preview"><img src="/manus-storage/anatomy_10b4646b.png" alt="معاينة عرض التشريح البشري" /><figcaption><span>عرض تعليمي</span><b>التشريح البشري — خريطة الحياة داخلنا</b></figcaption></figure></div>
      </section>

      <section className="section literary-section" id="literary">
        <div className="container">
          <SectionHeading kicker="04 / أعمالي الأدبية" title="من قصة مكتوبة إلى منتج رقمي له حياة." copy="القصص ليست ملفات ساكنة؛ يمكن تطويرها إلى كتب إلكترونية، تجارب تفاعلية، حزم تعليمية، وورش إبداعية قابلة للبيع أو الترخيص." />
          <div className="literary-layout">
            <div className="story-showcase"><a className="story-document story-document-main" href="https://nedaadigpor-tqk3gboy.manus.space/manus-storage/sama-silver-mystery_412b49f9.pdf" target="_self" aria-label="فتح قصة سما واللغز الفضي"><img src="/manus-storage/story-sama_b85a70b7.png" alt="معاينة قصة سما واللغز الفضي" /><figcaption><span>قصة رقمية · افتح الملف</span><b>سما واللغز الفضي</b></figcaption></a><a className="story-document story-document-back" href="https://nedaadigpor-tqk3gboy.manus.space/manus-storage/letters-story_2c124f8b.pdf" target="_self" aria-label="فتح قصة الحروف"><img src="/manus-storage/story-letters_2bd67654.png" alt="معاينة قصة الحروف" /><figcaption><span>تعلم بالقصص · افتح الملف</span><b>قصة الحروف</b></figcaption></a></div>
            <div className="product-paths"><div className="product-path"><span>01</span><div><b>كتاب إلكتروني مصوّر</b><p>نسخة مرتبة للقراءة، مع غلاف، صفحات داخلية، ووصف بيع واضح.</p></div><ArrowUpRight size={16} /></div><div className="product-path"><span>02</span><div><b>قصة تفاعلية</b><p>اختيارات، أصوات، حركة، وأسئلة تجعل القارئ جزءًا من الحكاية.</p></div><ArrowUpRight size={16} /></div><div className="product-path"><span>03</span><div><b>حزمة صفية للمعلمين</b><p>قصة مع نشاطات وأسئلة وأوراق عمل قابلة للاستخدام في التدريب.</p></div><ArrowUpRight size={16} /></div><div className="product-path"><span>04</span><div><b>ورشة كتابة رقمية</b><p>تحويل تجربة نداء في التعليم إلى ورشة عملية لصناعة قصة تعليمية.</p></div><ArrowUpRight size={16} /></div></div>
          </div>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
          <div className="container"><div className="gallery-header"><SectionHeading kicker="05 / المحتوى البصري" title="كل صورة تحمل بداية مشروع." copy="هنا تظهر التفاصيل كما هي: شخصيات، إعلانات، لوحات قصصية، وتجارب بصرية يمكن البناء عليها." /><span className="gallery-count">16<br /><small>أصل بصري</small></span></div><div className="visual-gallery">{visualAssets.map((asset, index) => <a className={`visual-tile visual-tile-${(index % 4) + 1}`} href={asset.src.replace('/manus-storage/', 'https://nedaadigpor-tqk3gboy.manus.space/manus-storage/')} target="_self" rel="noreferrer" aria-label={`فتح ${asset.title}`} key={asset.src}><img src={asset.src} alt={asset.title} loading="lazy" /><span className="visual-tile-caption"><span>{asset.label}</span><b>{asset.title}</b></span></a>)}</div></div>
      </section>

      <section className="section media-section" id="media">
        <div className="container"><SectionHeading kicker="06 / الفيديو والصوت" title="محتوى يتحرك مع الفكرة." copy="فيديوهات قصيرة، إعلانات، ومشاهد توعوية معروضة داخل الصفحة لتشاهدها مباشرة دون مغادرة الموقع." /><div className="media-grid">{mediaAssets.map((asset) => <article className="media-card" key={asset.src}><div className="media-frame"><video src={asset.src} controls preload="metadata" playsInline /></div><div className="media-card-meta"><span>{asset.label}</span><b>{asset.title}</b><a href={asset.src.replace('/manus-storage/', 'https://nedaadigpor-tqk3gboy.manus.space/manus-storage/')} target="_self" rel="noreferrer">فتح الملف <ArrowUpRight size={12} /></a></div></article>)}</div><div className="audio-strip"><div className="audio-icon"><MonitorPlay size={18} /></div><div><span>صوت يرافق الفكرة</span><b>Persuasive Outbound Sales — تسجيل صوتي</b><a href="https://nedaadigpor-tqk3gboy.manus.space/manus-storage/audi_27_9df06019.mp3" target="_self" rel="noreferrer">فتح الملف الصوتي <ArrowUpRight size={12} /></a></div><audio controls preload="metadata" src="/manus-storage/audi_27_9df06019.mp3" /></div></div>
      </section>

      <section className="section game-section" id="game">
        <div className="container game-layout"><div className="game-copy"><span className="eyebrow">07 / مساحة تفاعلية</span><h2>إذا أردت مساحة للتفكير والترفيه، <em>العب هنا.</em></h2><p>لعبة Snake Maze تعمل مباشرة داخل المتصفح. تجربة صغيرة تجمع بين التركيز، الحركة، والفضول — تمامًا كما أحب أن يكون التعلم.</p><div className="game-chips"><span><Check size={14} /> تعمل داخل الموقع</span><span><Check size={14} /> مناسبة للتجربة السريعة</span></div></div><div className="game-frame"><iframe src={GAME_SRC} title="لعبة Snake Maze التفاعلية" loading="lazy" /></div></div>
      </section>

      <section className="section approach-section">
        <div className="container approach-layout"><div className="approach-art"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-core"><Sparkles size={28} /></div><span className="art-label art-label-one">curiosity</span><span className="art-label art-label-two">practice</span><span className="art-label art-label-three">impact</span></div><div className="approach-content"><SectionHeading kicker="04 / فلسفة العمل" title="أدرّب العقل… وأحترم فضوله." copy="التقنية تتغير بسرعة، لكن الطريقة التي نتعلم بها تبقى إنسانية: سؤال واضح، تجربة آمنة، وتشجيع صادق على المحاولة." /><div className="principles-list"><div><span>01</span><p><b>أبسّط دون أن أُسطّح</b><small>أحوّل المصطلح إلى صورة، والخطوة إلى ممارسة.</small></p></div><div><span>02</span><p><b>أصمم للتجربة</b><small>كل فكرة أفضل حين يمكن لمسها، اختبارها، وتطويرها.</small></p></div><div><span>03</span><p><b>أتعلم باستمرار</b><small>الفضول ليس مرحلة؛ إنه أسلوب حياة ومهنة.</small></p></div></div></div></div>
      </section>

      <section id="contact" className="contact-section"><div className="contact-glow" /><div className="container contact-layout"><div><span className="eyebrow">05 / لنبنِ أثرًا</span><h2>هل لديك معرفة<br /><em>تحتاج إلى مساحة؟</em></h2></div><div className="contact-copy"><p>إذا كنت تبحث عن مدرّبة مهارات رقمية تجمع بين الخبرة التعليمية، وحسّ المحتوى، وشغف الذكاء الاصطناعي؛ يسعدني أن نبدأ حوارًا.</p><a className="button button-light" href="#about">تعرّف على منهجي <ArrowUpRight size={17} /></a></div></div></section>

      <footer className="site-footer"><div className="container footer-inner"><div className="footer-brand"><AppMark /><div><strong>نداء أبو صالح</strong><span>مدرّبة مهارات رقمية</span></div></div><p>التعلم رحلة. فلنجعلها أكثر وضوحًا، ودفئًا، وإلهامًا.</p><div className="footer-links"><a href="#top">العودة للأعلى <ArrowUpRight size={14} /></a><span>© 2026</span></div></div></footer>
    </main>
  );
}

export default Home;
