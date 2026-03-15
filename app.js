/* EduPulse v2 — Social Education News Platform
   Features: AI assistant, Facebook SDK, particles, gamification, emoji reactions */
/* global confetti, FB */

// ===== CONFIG =====
const API_URL = (() => {
  const loc = window.location;
  if (loc.hostname === '127.0.0.1' || loc.hostname === 'localhost') return 'http://127.0.0.1:8000';
  return '';  // deployed — API not available, AI features disabled gracefully
})();

// ===== STATE =====
let currentView = 'feed';
let currentArticleId = null;
let searchQuery = '';
let fbUser = null;
let aiPanelOpen = false;
let xp = 650;
let level = 7;
const XP_PER_LEVEL = 1000;
const emojiSet = ['👍', '❤️', '🔥', '🤯', '👏'];

// ===== SAMPLE DATA =====
const users = {
  mk: { name: 'Minh Kim', initials: 'MK', color: 'var(--color-primary)' },
  jd: { name: 'James Doe', initials: 'JD', color: 'var(--color-blue)' },
  sr: { name: 'Sarah R.', initials: 'SR', color: 'var(--color-purple)' },
  at: { name: 'Aiko Tanaka', initials: 'AT', color: 'var(--color-orange)' },
  lp: { name: 'Li Peng', initials: 'LP', color: 'var(--color-success)' },
  em: { name: 'Elena M.', initials: 'EM', color: 'var(--color-notification)' },
};

const articles = [
  {
    id: 'make-school-fun',
    title: 'Make School Fun Again',
    subtitle: 'A Game Plan for Every Level of Education — From Classroom Mini-Games to District-Wide Revolutions',
    category: 'Game-Based Learning',
    author: 'mk',
    date: 'Mar 8, 2026',
    emoji: '🎮',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0e7490 100%)',
    excerpt: "School isn't boring because kids are lazy. School is boring because we haven't finished designing it yet. Here's the evidence-backed game plan for every level.",
    likes: 47,
    comments: 12,
    shares: 8,
    isLiked: false,
    emojiReactions: { '👍': 12, '❤️': 8, '🔥': 15, '🤯': 5, '👏': 7 },
    myEmojis: [],
    body: `<h2>The Uncomfortable Truth Nobody Wants to Admit</h2>
<p>Let's set the scene. It's 9 AM on a Monday. Thirty kids shuffle into a classroom, backpacks dragging like they're hauling emotional baggage from a world war. The teacher pulls up a PowerPoint with bullet points — the same bullet points that have been haunting education since the invention of the overhead projector.</p>
<p>Nobody is engaged. Nobody is excited. One kid is asleep. Another is sketching anime characters. The teacher, passionate and hardworking, is essentially performing a one-person show to an audience that didn't buy tickets.</p>
<p><strong>This is the default experience of education for millions of students worldwide.</strong></p>
<p>But here's the thing: school isn't boring because kids are lazy. School is boring because <em>we haven't finished designing it yet</em>.</p>

<div class="pull-quote">"If a student is bored, it's not a discipline problem. It's a design problem."
<span class="quote-attribution"><span class="qa-who">Jesse Schell</span>, game designer and author of <em>The Art of Game Design: A Book of Lenses</em> (2008). Paraphrased — Schell's work argues that engagement failures are design failures, not audience failures.
<span class="qa-context">Source: <a href="https://www.schellgames.com/" target="_blank" rel="noopener noreferrer">Schell Games</a></span></span>
<span class="reliability-badge rb-caution" data-tooltip="Paraphrased from game design principles, not a direct quote"><span class="badge-icon">⚠️</span> Paraphrased</span></div>

<p>And the data backs this up. A meta-analysis published in <em>Frontiers in Psychology</em> (2023) covering <strong>41 peer-reviewed studies</strong> found a significant positive effect (Hedges' g = 0.822) of gamification on learning outcomes. A separate, larger <em>Frontiers in Education</em> (2024) systematic review covered approximately <strong>90 interventions</strong> and confirmed gamification's broad positive impact on engagement and motivation.</p>

<div class="stats-row">
  <div class="stat-box">
    <span class="stat-num">41</span>
    <div class="stat-label">Studies in the Frontiers in Psychology 2023 meta-analysis (g=0.822)</div>
    <a href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1183348/full" target="_blank" rel="noopener noreferrer">Frontiers 2023 →</a>
    <span class="reliability-badge rb-corrected" data-tooltip="Originally stated 42 studies from 2024 review; corrected to 41 studies from 2023 meta-analysis"><span class="badge-icon">🔄</span> Corrected</span>
  </div>
  <div class="stat-box">
    <span class="stat-num">~90</span>
    <div class="stat-label">Interventions reviewed in Frontiers in Education 2024 systematic review</div>
    <a href="https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1466926/full" target="_blank" rel="noopener noreferrer">Frontiers 2024 →</a>
    <span class="reliability-badge rb-corrected" data-tooltip="The 95% originally cited was the methodological reliability, not a finding about gamification success rate. Updated for accuracy."><span class="badge-icon">🔄</span> Corrected</span>
    <span class="data-correction">Note: The original "95%" referred to methodological reliability of the review, not gamification effectiveness. Corrected.</span>
  </div>
  <div class="stat-box">
    <span class="stat-num">$20.58B</span>
    <div class="stat-label">Projected educational game market by 2030 ($4.19B in 2022)</div>
    <a href="https://naavik.co/digest/edu-games-future/" target="_blank" rel="noopener noreferrer">Naavik / Kings Research →</a>
    <span class="reliability-badge rb-verified" data-tooltip="Verified via Kings Research report, cited by Naavik"><span class="badge-icon">✅</span> Verified</span>
  </div>
</div>

<h2>Level 1: Teachers — Small Games, Massive Impact</h2>
<p>Teachers don't need to build the next Minecraft. A well-designed mini-game is often all it takes. A <a href="https://www.legendsoflearning.com/blog/study-research-students-win-teachers-deploy-learning-games/" target="_blank" rel="noopener noreferrer">Vanderbilt University study</a> involving <strong>1,000+ students across 10 schools in 7 U.S. states</strong> found that students whose teachers integrated short, curriculum-aligned games dramatically outperformed their peers. <span class="reliability-badge rb-verified" data-tooltip="Confirmed via Legends of Learning / Vanderbilt research partnership"><span class="badge-icon">✅</span> Verified</span></p>

<div class="cta-box">
  <span class="cta-badge">Action for Teachers</span>
  <h3>Start Making It Fun — Today</h3>
  <p class="cta-intro">You don't need a game design degree. These tools let you build engaging, standards-aligned mini-games in minutes.</p>
  <div class="tool-grid">
    <a class="tool-card" href="https://kahoot.com" target="_blank" rel="noopener noreferrer">
      <div class="tool-icon">🎮</div>
      <div class="tool-name">Kahoot!</div>
      <div class="tool-desc">Real-time quiz competitions. Works for any subject, any grade.</div>
      <span class="tool-tag">Free · Quiz Game</span>
    </a>
    <a class="tool-card" href="https://quizizz.com" target="_blank" rel="noopener noreferrer">
      <div class="tool-icon">⚡</div>
      <div class="tool-name">Quizizz</div>
      <div class="tool-desc">Self-paced gamified quizzes with memes and power-ups.</div>
      <span class="tool-tag">Free · Async</span>
    </a>
    <a class="tool-card" href="https://www.legendsoflearning.com" target="_blank" rel="noopener noreferrer">
      <div class="tool-icon">🐉</div>
      <div class="tool-name">Legends of Learning</div>
      <div class="tool-desc">Curriculum-aligned games built by actual game designers.</div>
      <span class="tool-tag">K-8 · Research-Backed</span>
    </a>
  </div>
</div>

<h2>Level 2: Schools — Systemic Gamification</h2>
<p>Individual teachers can move the needle, but schools that embrace gamification <em>systemically</em> see transformational results. This means going beyond one classroom — integrating game mechanics into the school culture itself.</p>
<p>Consider <strong>classcraft-style systems</strong>: students earn XP for academic achievements, collaboration, and positive behavior. They level up, unlock privileges, and work in teams. Schools that have implemented these systems report significant drops in behavioral issues and spikes in attendance.</p>

<div class="pull-quote">"Game design is, at its core, about creating motivation systems. Education is, at its core, about motivation. The overlap is not coincidental — it's foundational."
<span class="quote-attribution"><span class="qa-who">Karl Kapp</span>, Professor of Instructional Technology, Bloomsburg University, and author of <em>The Gamification of Learning and Instruction</em> (2012).
<span class="qa-context">Source: <a href="https://karlkapp.com/" target="_blank" rel="noopener noreferrer">karlkapp.com</a> — paraphrased from his body of work on gamification in education</span></span>
<span class="reliability-badge rb-caution" data-tooltip="Paraphrased from Karl Kapp's work on gamification; captures his thesis accurately"><span class="badge-icon">⚠️</span> Paraphrased</span></div>

<h2>Level 3: Districts & Policy — The Infrastructure of Fun</h2>
<p>Here's where it gets political. Districts and policymakers hold the keys to scale. When a district adopts game-based learning as policy — funding teacher training, licensing game platforms, adjusting assessment methods — the impact multiplies exponentially.</p>
<p>The challenge? Assessment. Standardized tests don't measure engagement, creativity, or collaborative problem-solving. Until assessment catches up with pedagogy, game-based learning will remain an "add-on" rather than the core.</p>

<div class="peer-grid">
  <div class="peer-card">
    <div class="peer-title">Estonia's Approach</div>
    <div class="peer-result">Integrated play-based learning K-9. No standardized testing until age 16.</div>
    <div class="peer-stat">#1 in Europe, PISA 2022</div>
    <span class="reliability-badge rb-verified" data-tooltip="Confirmed via OECD PISA 2022 results. Note: Finland also ranks very high but Estonia is #1 in Europe."><span class="badge-icon">✅</span> Verified</span>
    <a href="https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html" target="_blank" rel="noopener noreferrer">OECD PISA 2022 →</a>
  </div>
  <div class="peer-card">
    <div class="peer-title">Singapore's Gamification Pilot</div>
    <div class="peer-result">Ministry-backed initiative using game mechanics in STEM education.</div>
    <div class="peer-stat">Engagement increase reported</div>
    <span class="reliability-badge rb-unverified" data-tooltip="The original 34% figure could not be traced to a primary source. Community members also flagged this. The pilot program exists, but the specific percentage is unverifiable."><span class="badge-icon">❌</span> Unverified</span>
    <span class="data-correction">Note: The original "34% engagement increase" could not be verified via any primary source and has been removed. The pilot program itself is real.</span>
  </div>
</div>

<div class="final-cta">
  <h2>The Game Has Already Started</h2>
  <p>Every day we don't make school fun, we lose students to boredom, disconnection, and the quiet tragedy of wasted potential. The research is clear. The tools exist. The question isn't whether we can make school fun — it's why we haven't already.</p>
  <div class="cta-tagline">Level up education. Start playing.</div>
</div>

<div class="sources-box">
  <h4>All Sources</h4>
  <ul>
    <li><a href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1183348/full" target="_blank" rel="noopener noreferrer">Frontiers in Psychology (2023) — Gamification Meta-Analysis (41 studies, g=0.822)</a></li>
    <li><a href="https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1466926/full" target="_blank" rel="noopener noreferrer">Frontiers in Education (2024) — Systematic Review (~90 interventions)</a></li>
    <li><a href="https://www.legendsoflearning.com/blog/study-research-students-win-teachers-deploy-learning-games/" target="_blank" rel="noopener noreferrer">Vanderbilt University / Legends of Learning Study</a></li>
    <li><a href="https://naavik.co/digest/edu-games-future/" target="_blank" rel="noopener noreferrer">Naavik — The Future of Educational Games (Kings Research data)</a></li>
    <li><a href="https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html" target="_blank" rel="noopener noreferrer">OECD PISA 2022 Results</a></li>
    <li><a href="https://kahoot.com" target="_blank" rel="noopener noreferrer">Kahoot! Platform</a></li>
    <li><a href="https://quizizz.com" target="_blank" rel="noopener noreferrer">Quizizz Platform</a></li>
    <li><a href="https://www.legendsoflearning.com" target="_blank" rel="noopener noreferrer">Legends of Learning Platform</a></li>
  </ul>
</div>`,
    factChecks: [
      { claim: '41 studies in Frontiers in Psychology 2023 meta-analysis (g=0.822)', verdict: 'corrected', note: 'Corrected from original "42 studies / 95% reliability." The 2023 Frontiers in Psychology meta-analysis found 41 studies with effect size g=0.822. The 2024 Frontiers in Education review covered ~90 interventions; "95%" was its methodological reliability, not a gamification finding.', source: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1183348/full' },
      { claim: 'Educational game market projected at $20.58B by 2030', verdict: 'verified', note: 'Verified via Kings Research report ($4.19B in 2022 → $20.58B by 2030), cited by Naavik.', source: 'https://naavik.co/digest/edu-games-future/' },
      { claim: 'Vanderbilt study involved 1,000+ students across 10 schools', verdict: 'verified', note: 'Confirmed by Legends of Learning blog citing the Vanderbilt research partnership.', source: 'https://www.legendsoflearning.com/blog/study-research-students-win-teachers-deploy-learning-games/' },
      { claim: 'Singapore gamification pilot 34% engagement increase', verdict: 'unverified', note: 'The 34% figure could not be traced to any primary source. Community flagged this. Removed from article.', source: '' },
    ],
    articleComments: [
      { user: 'jd', text: 'This is exactly what I needed. Just showed it to my principal and he\'s finally interested in Kahoot for our math block.', time: '2 hours ago', likes: 14 },
      { user: 'sr', text: 'The Finland comparison is interesting, but their class sizes and funding are so different. How do we make this work in Title I schools?', time: '5 hours ago', likes: 23 },
      { user: 'at', text: 'I\'ve been using Quizizz for two years now — the self-paced mode is a game changer for differentiation.', time: '1 day ago', likes: 9 },
    ],
    editRequests: [
      { user: 'lp', section: 'Level 3: Districts & Policy', request: 'Could you add more specific data about Singapore\'s gamification pilot? The 34% figure seems unattributed.', status: 'open', time: '6 hours ago' },
    ]
  },
  {
    id: 'creativity-assessment',
    title: 'Is Your Creativity Test Actually Measuring Creativity?',
    subtitle: 'Why the Western-Centric Torrance Tests May Miss Genius in Half the World',
    category: 'Assessment & Testing',
    author: 'at',
    date: 'Mar 5, 2026',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a78bfa 100%)',
    excerpt: 'The Torrance Tests of Creative Thinking have dominated for 50+ years. But new research suggests they might be culturally biased — and missing creative genius in collectivist societies.',
    likes: 38,
    comments: 9,
    shares: 15,
    isLiked: false,
    emojiReactions: { '👍': 10, '❤️': 5, '🔥': 8, '🤯': 12, '👏': 3 },
    myEmojis: [],
    body: `<h2>The Problem with "One Test to Rule Them All"</h2>
<p>For over half a century, the <strong>Torrance Tests of Creative Thinking (TTCT)</strong> have been the gold standard for measuring creativity in education. Developed by E. Paul Torrance in 1966, these tests assess four dimensions: fluency, flexibility, originality, and elaboration. <span class="reliability-badge rb-verified" data-tooltip="Well-documented historical fact. TTCT published 1966 by Scholastic Testing Service."><span class="badge-icon">✅</span> Verified</span></p>
<p>But here's the uncomfortable question: <strong>whose creativity are we measuring?</strong></p>
<p>The TTCT was designed in a Western, individualistic cultural context. It rewards divergent thinking — the ability to generate many unique ideas. But in collectivist cultures, creativity often manifests differently: through <strong>adaptive innovation</strong>, <strong>contextual problem-solving</strong>, and <strong>collaborative refinement</strong>.</p>

<div class="pull-quote">"Creativity isn't a universal constant — it's a cultural variable. Our tests need to reflect that."
<span class="quote-attribution"><span class="qa-who">Dr. Ai Zhao</span>, researcher at Beijing Normal University, Faculty of Education. This statement synthesizes a growing body of cross-cultural creativity research.
<span class="qa-context">Context: Academic discourse on cultural bias in Western creativity assessments. BNU's Faculty of Education is a leading center for creativity research in China. Source: <a href="https://english.bnu.edu.cn/" target="_blank" rel="noopener noreferrer">Beijing Normal University</a></span></span>
<span class="reliability-badge rb-caution" data-tooltip="Dr. Ai Zhao is associated with BNU but exact source publication for this quote could not be verified. The sentiment is well-supported in cross-cultural creativity literature."><span class="badge-icon">⚠️</span> Caution</span></div>

<div class="stats-row">
  <div class="stat-box">
    <span class="stat-num">1966</span>
    <div class="stat-label">Year the TTCT was first published</div>
    <span class="reliability-badge rb-verified" data-tooltip="Published by Scholastic Testing Service, widely documented"><span class="badge-icon">✅</span> Verified</span>
  </div>
  <div class="stat-box">
    <span class="stat-num">50+</span>
    <div class="stat-label">Years the TTCT has dominated creativity assessment</div>
    <span class="reliability-badge rb-verified" data-tooltip="1966 to present = 59+ years of continuous use"><span class="badge-icon">✅</span> Verified</span>
  </div>
  <div class="stat-box">
    <span class="stat-num">4</span>
    <div class="stat-label">Dimensions of creativity the TTCT measures</div>
    <span class="reliability-badge rb-verified" data-tooltip="Fluency, flexibility, originality, elaboration — standard TTCT scoring dimensions"><span class="badge-icon">✅</span> Verified</span>
  </div>
</div>

<h2>Toward a Culturally Responsive Framework</h2>
<p>New assessment models are emerging that incorporate cultural context. These frameworks consider <strong>tightness-looseness theory</strong> — the idea that some societies enforce strict norms while others permit deviance — as a key variable in how creativity manifests.</p>
<p>A culturally responsive creativity assessment would measure not just divergent thinking, but also <strong>adaptive innovation</strong>, <strong>contextual problem-solving</strong>, and <strong>collaborative creativity</strong> — all forms of creative expression that thrive in "tight" cultural contexts.</p>

<div class="cta-box">
  <span class="cta-badge">Resources</span>
  <h3>Key Papers and Frameworks</h3>
  <p class="cta-intro">Essential reading for anyone interested in cross-cultural creativity assessment.</p>
  <div class="peer-grid">
    <div class="peer-card">
      <div class="peer-title">Tightness-Looseness Theory</div>
      <div class="peer-result">Michele Gelfand's framework for understanding cultural norm enforcement and its impact on creative expression.</div>
      <div class="peer-stat">Foundation framework</div>
      <span class="reliability-badge rb-verified" data-tooltip="Published in Science (2011). Gelfand et al., 'Differences Between Tight and Loose Cultures.'"><span class="badge-icon">✅</span> Verified</span>
      <a href="https://www.science.org/doi/10.1126/science.1197754" target="_blank" rel="noopener noreferrer">Science 2011 →</a>
    </div>
    <div class="peer-card">
      <div class="peer-title">PISA Creative Thinking 2022</div>
      <div class="peer-result">OECD's first large-scale assessment of creative thinking in education across 64 countries.</div>
      <div class="peer-stat">64 countries tested</div>
      <span class="reliability-badge rb-verified" data-tooltip="Confirmed via OECD PISA 2022 Creative Thinking results"><span class="badge-icon">✅</span> Verified</span>
      <a href="https://www.oecd.org/en/publications/pisa-2022-results-volume-iii_765ee8c2-en.html" target="_blank" rel="noopener noreferrer">OECD PISA 2022 Vol. III →</a>
    </div>
  </div>
</div>

<div class="final-cta">
  <h2>Rethink the Test</h2>
  <p>If our creativity tests only capture one cultural flavor of creativity, we're not just getting incomplete data — we're systematically undervaluing the creative potential of billions of students.</p>
  <div class="cta-tagline">Creativity is universal. Our measurements should be too.</div>
</div>`,
    factChecks: [
      { claim: 'TTCT has been the gold standard for 50+ years', verdict: 'verified', note: 'The TTCT was published in 1966 by Scholastic Testing Service and remains the most widely used creativity assessment globally.', source: 'https://en.wikipedia.org/wiki/Torrance_Tests_of_Creative_Thinking' },
      { claim: 'PISA 2022 assessed creative thinking across 64 countries', verdict: 'verified', note: 'Confirmed by OECD PISA 2022 Creative Thinking assessment (Volume III).', source: 'https://www.oecd.org/en/publications/pisa-2022-results-volume-iii_765ee8c2-en.html' },
      { claim: 'Dr. Ai Zhao quote on creativity as cultural variable', verdict: 'caution', note: 'Dr. Zhao is associated with Beijing Normal University, but the exact source publication for this specific quote could not be verified. The sentiment is well-supported in cross-cultural creativity literature.', source: '' },
      { claim: 'Gelfand Tightness-Looseness Theory', verdict: 'verified', note: 'Published in Science (2011) by Michele Gelfand et al.', source: 'https://www.science.org/doi/10.1126/science.1197754' },
    ],
    articleComments: [
      { user: 'mk', text: 'Fascinating deep dive. I\'d love to see an EduPulse series on cross-cultural assessment methods.', time: '3 days ago', likes: 7 },
      { user: 'em', text: 'As someone who grew up in a collectivist culture, this resonates deeply. The emphasis on individual "originality" always felt off.', time: '4 days ago', likes: 15 },
    ],
    editRequests: []
  },
  {
    id: 'ai-classroom-revolution',
    title: 'AI in the Classroom: Revolution or Distraction?',
    subtitle: 'Teachers are split — but the data is starting to speak for itself',
    category: 'AI & Technology',
    author: 'jd',
    date: 'Mar 2, 2026',
    emoji: '🤖',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 60%, #34d399 100%)',
    excerpt: 'Half of teachers see AI as the future. The other half see it as the end of critical thinking. Who\'s right? We looked at the research.',
    likes: 62,
    comments: 24,
    shares: 19,
    isLiked: false,
    emojiReactions: { '👍': 20, '❤️': 10, '🔥': 18, '🤯': 8, '👏': 6 },
    myEmojis: [],
    body: `<h2>The Great AI Divide in Education</h2>
<p>Walk into any teacher's lounge in 2026 and mention "AI" — you'll get two reactions. Half the room lights up with excitement about personalized learning and automated grading. The other half looks like you just suggested replacing teachers with robots.</p>
<p>Both sides have a point. And the research is nuanced enough to make everyone uncomfortable.</p>

<div class="pull-quote">"AI won't replace teachers. But teachers who use AI will replace those who don't."
<span class="quote-attribution"><span class="qa-who">Popular saying in EdTech circles</span> — no single verified original author. Variations have been used by many educators and technologists. A similar framing appears in a 2025 <em>Education Week</em> article by Joe Pugliese.
<span class="qa-context">Source: <a href="https://www.edweek.org/" target="_blank" rel="noopener noreferrer">Education Week</a> — widely circulated, not attributable to one person</span></span>
<span class="reliability-badge rb-caution" data-tooltip="Popular saying with no verified single author. The framing is common in EdTech but oversimplifies the nuance."><span class="badge-icon">⚠️</span> Unattributed</span></div>

<div class="stats-row">
  <div class="stat-box">
    <span class="stat-num">60%</span>
    <div class="stat-label">Teachers who have used AI tools (Gallup-Walton Family Foundation, 2025)</div>
    <a href="https://www.gallup.com/analytics/644428/walton-family-foundation-survey.aspx" target="_blank" rel="noopener noreferrer">Gallup 2025 →</a>
    <span class="reliability-badge rb-corrected" data-tooltip="Originally stated 67% for time savings. Corrected: Gallup-Walton 2025 found 60% of teachers use AI. The 67% figure refers to teachers recognizing AI's role in stress reduction, not time savings. Weekly AI users save ~5.9 hrs/week."><span class="badge-icon">🔄</span> Corrected</span>
    <span class="data-correction">Originally "67% time savings" — corrected to 60% adoption. The 67% referred to stress reduction recognition.</span>
  </div>
  <div class="stat-box">
    <span class="stat-num">84%</span>
    <div class="stat-label">High school students who have used AI for schoolwork (College Board, 2024)</div>
    <a href="https://research.collegeboard.org/" target="_blank" rel="noopener noreferrer">College Board →</a>
    <span class="reliability-badge rb-corrected" data-tooltip="Originally stated 41% of students used AI without disclosure. Corrected: College Board found 84% of HS students use AI for schoolwork. The 41% figure was about schools reporting AI-related cyber incidents, not student non-disclosure."><span class="badge-icon">🔄</span> Corrected</span>
    <span class="data-correction">Originally "41% used AI without disclosure" — that figure was about school cyber incidents. Student AI usage is actually 84%.</span>
  </div>
  <div class="stat-box">
    <span class="stat-num">Declining</span>
    <div class="stat-label">Overall EdTech VC funding: $20.8B (2021) → ~$3.5B (2023). AI-specific EdTech grew.</div>
    <span class="reliability-badge rb-corrected" data-tooltip="Originally claimed 3x increase in EdTech funding. Total EdTech VC actually declined sharply from $20.8B (2021) to ~$3.5B (2023). AI-specific EdTech did grow, but the overall trend is down."><span class="badge-icon">🔄</span> Corrected</span>
    <span class="data-correction">Originally "3x increase" — total EdTech funding actually declined. Only the AI-specific segment grew.</span>
  </div>
</div>

<h2>Where AI Actually Helps</h2>
<p>The most promising use cases aren't about replacing human interaction — they're about <strong>amplifying</strong> it. AI excels at:</p>
<ul style="margin:var(--space-4) 0;padding-left:var(--space-6)">
  <li style="margin-bottom:var(--space-2)">Generating personalized practice problems</li>
  <li style="margin-bottom:var(--space-2)">Providing instant feedback on writing drafts</li>
  <li style="margin-bottom:var(--space-2)">Automating administrative tasks (grading, scheduling)</li>
  <li style="margin-bottom:var(--space-2)">Creating differentiated materials for diverse learners</li>
</ul>

<h2>Where AI Falls Short</h2>
<p>But AI can't (yet) replace the distinctly human elements of teaching: reading a room, knowing when a student needs encouragement vs. challenge, building trust, and modeling ethical reasoning. The danger isn't AI itself — it's using AI as a shortcut for the parts of education that require human depth.</p>

<div class="cta-box">
  <span class="cta-badge">Educator Toolkit</span>
  <h3>AI Tools Worth Exploring</h3>
  <p class="cta-intro">Curated tools that enhance rather than replace teaching.</p>
  <div class="tool-grid">
    <a class="tool-card" href="https://www.khanmigo.ai" target="_blank" rel="noopener noreferrer">
      <div class="tool-icon">🧑‍🏫</div>
      <div class="tool-name">Khanmigo</div>
      <div class="tool-desc">Khan Academy's AI tutor — Socratic method, not answer-giving.</div>
      <span class="tool-tag">AI Tutor · Free for Teachers</span>
    </a>
    <a class="tool-card" href="https://www.magicschool.ai" target="_blank" rel="noopener noreferrer">
      <div class="tool-icon">✨</div>
      <div class="tool-name">MagicSchool</div>
      <div class="tool-desc">60+ AI tools specifically for teachers. Lesson plans, rubrics, IEPs.</div>
      <span class="tool-tag">Free · Teacher Tools</span>
    </a>
    <a class="tool-card" href="https://www.briskteaching.com" target="_blank" rel="noopener noreferrer">
      <div class="tool-icon">⚡</div>
      <div class="tool-name">Brisk Teaching</div>
      <div class="tool-desc">Chrome extension that brings AI directly into Google Docs/Slides.</div>
      <span class="tool-tag">Free · Chrome Extension</span>
    </a>
  </div>
</div>

<div class="final-cta">
  <h2>The Bottom Line</h2>
  <p>AI in education isn't a revolution or a distraction — it's a tool. And like any tool, its value depends entirely on the hands that hold it.</p>
  <div class="cta-tagline">Teach with AI. Don't teach by AI.</div>
</div>`,
    factChecks: [
      { claim: '60% of teachers have used AI tools', verdict: 'corrected', note: 'Corrected from 67%. Gallup-Walton 2025 survey found 60% of teachers use AI. The 67% figure referred to stress reduction recognition, not time savings. Weekly AI users save ~5.9 hrs/week.', source: 'https://www.gallup.com/analytics/644428/walton-family-foundation-survey.aspx' },
      { claim: '84% of HS students use AI for schoolwork', verdict: 'corrected', note: 'Corrected from 41% non-disclosure. College Board 2024 found 84% of HS students use AI. The original 41% was about school AI cyber incidents, not student non-disclosure.', source: 'https://research.collegeboard.org/' },
      { claim: 'EdTech funding 3x increase', verdict: 'corrected', note: 'Corrected: Total EdTech VC actually declined from $20.8B (2021) to ~$3.5B (2023). Only AI-specific EdTech grew. The original 3x claim was inaccurate.', source: '' },
      { claim: 'AI won\'t replace teachers quote', verdict: 'caution', note: 'Popular saying with no single verified author. Variations appear across EdTech media. EdWeek 2025 (Joe Pugliese) uses a similar framing.', source: 'https://www.edweek.org/' },
    ],
    articleComments: [
      { user: 'sr', text: 'This is balanced and well-researched. I wish more AI articles took this nuanced approach instead of the usual hype or doom.', time: '1 week ago', likes: 18 },
      { user: 'lp', text: 'MagicSchool has been a game changer for my IEP writing. Saves me hours every week.', time: '1 week ago', likes: 11 },
      { user: 'at', text: 'The ethical reasoning point is crucial. We need to teach students WHEN to use AI, not just HOW.', time: '5 days ago', likes: 22 },
    ],
    editRequests: []
  },
  {
    id: 'estonia-education-miracle',
    title: "Estonia's Education Miracle: What the Rest of the World Can Learn",
    subtitle: 'How a tiny Baltic nation became Europe\'s top PISA performer',
    category: 'Global Education',
    author: 'lp',
    date: 'Feb 28, 2026',
    emoji: '🇪🇪',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #60a5fa 100%)',
    excerpt: 'Estonia ranked #1 in Europe in all three PISA 2022 domains. Their secret? A unique blend of teacher autonomy, digital integration, and curriculum flexibility.',
    likes: 55,
    comments: 16,
    shares: 22,
    isLiked: false,
    emojiReactions: { '👍': 18, '❤️': 12, '🔥': 10, '🤯': 9, '👏': 6 },
    myEmojis: [],
    body: `<h2>The Tiny Giant of Education</h2>
<p>Estonia has a population of 1.3 million — smaller than most major cities. Yet in the 2022 PISA rankings, this tiny Baltic nation ranked <strong>#1 in Europe in reading, math, and science</strong>. Not bad for a country that regained independence only in 1991.</p>
<p>How did they do it? The answer isn't one thing — it's a system designed around trust, autonomy, and digital-first thinking.</p>

<div class="stats-row">
  <div class="stat-box">
    <span class="stat-num">#1</span>
    <div class="stat-label">In Europe across all three PISA 2022 domains</div>
    <a href="https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html" target="_blank" rel="noopener noreferrer">OECD PISA 2022 →</a>
    <span class="reliability-badge rb-verified" data-tooltip="Confirmed via OECD PISA 2022 results. Estonia ranked #1 in Europe in reading, math, and science."><span class="badge-icon">✅</span> Verified</span>
  </div>
  <div class="stat-box">
    <span class="stat-num">1.3M</span>
    <div class="stat-label">Total population — smaller than many cities</div>
    <span class="reliability-badge rb-verified" data-tooltip="Estonia's population is approximately 1.3 million (Statistics Estonia)"><span class="badge-icon">✅</span> Verified</span>
  </div>
  <div class="stat-box">
    <span class="stat-num">100%</span>
    <div class="stat-label">Of schools connected to internet by 2001 (Tiger Leap program)</div>
    <a href="https://www.educationestonia.org/" target="_blank" rel="noopener noreferrer">Education Estonia →</a>
    <span class="reliability-badge rb-verified" data-tooltip="Verified via Education Estonia. The Tiger Leap Foundation (Tiigrih\u00fcpe) connected all Estonian schools to the internet by 2001."><span class="badge-icon">✅</span> Verified</span>
  </div>
</div>

<h2>The Three Pillars</h2>
<h3>1. Teacher Autonomy</h3>
<p>Estonian teachers have extraordinary freedom. The national curriculum sets broad goals, but <strong>teachers decide how to reach them</strong>. No mandated textbooks, no scripted lessons, no micromanagement. Teaching is also one of the most respected professions — all teachers must hold a master's degree. <span class="reliability-badge rb-verified" data-tooltip="Master's degree requirement for teachers confirmed via Education Estonia and OECD country profile"><span class="badge-icon">✅</span> Verified</span></p>

<h3>2. Digital Integration</h3>
<p>Estonia went digital early. By 2001, every school had internet access through the <strong>Tiger Leap</strong> program. The government introduced <strong>e-School (eKool)</strong> — a digital platform connecting teachers, students, and parents in real time. Homework, grades, attendance, and communication all flow through one system. <span class="reliability-badge rb-verified" data-tooltip="Tiger Leap (Tiigrih\u00fcpe) launched 1997, all schools online by 2001. eKool is the primary school management platform."><span class="badge-icon">✅</span> Verified</span></p>

<h3>3. No Tracking Until Age 16</h3>
<p>Unlike many European countries, Estonia doesn't separate students into academic vs. vocational tracks until they're 16. Every student gets the same high-quality education for the first 9 years, regardless of background. <span class="reliability-badge rb-verified" data-tooltip="Estonia's basic education is comprehensive (grades 1-9) with no tracking. Confirmed via Estonian Education Act."><span class="badge-icon">✅</span> Verified</span></p>

<div class="pull-quote">"We trust our teachers, and our teachers trust their students. That's the real innovation."
<span class="quote-attribution"><span class="qa-who">Estonian Ministry of Education and Research</span> — a recurring theme in Estonian education policy communications. This paraphrases the core philosophy described in multiple OECD reviews of the Estonian education system.
<span class="qa-context">Source: <a href="https://www.hm.ee/en" target="_blank" rel="noopener noreferrer">Estonian Ministry of Education and Research</a> — also reflected in <a href="https://www.oecd.org/en/topics/sub-issues/benchmarking-education-systems-in-countries-and-regions/estonia.html" target="_blank" rel="noopener noreferrer">OECD Reviews of Estonian Education</a></span></span>
<span class="reliability-badge rb-caution" data-tooltip="Captures the widely reported philosophy of Estonian education policy, but no single exact source speech or publication identified for this specific wording."><span class="badge-icon">⚠️</span> Paraphrased</span></div>

<div class="final-cta">
  <h2>Trust the System</h2>
  <p>Estonia's lesson isn't about technology or money — it's about trust. Trust your teachers. Fund their training. Give them autonomy. The results speak for themselves.</p>
  <div class="cta-tagline">Small country. Big lessons.</div>
</div>`,
    factChecks: [
      { claim: 'Estonia ranked #1 in Europe in all three PISA 2022 domains', verdict: 'verified', note: 'Confirmed by OECD PISA 2022 results (Volume I).', source: 'https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html' },
      { claim: '100% of Estonian schools connected to internet by 2001', verdict: 'verified', note: 'Confirmed via Education Estonia and Tiger Leap Foundation (Tiigrih\u00fcpe) records.', source: 'https://www.educationestonia.org/' },
      { claim: 'Estonia population 1.3 million', verdict: 'verified', note: 'Approximately 1.3 million as of 2024, per Statistics Estonia.', source: '' },
      { claim: 'Estonian Ministry of Education quote on trust', verdict: 'caution', note: 'Paraphrases the widely reported core philosophy of Estonian education. No single specific source speech or publication identified for this exact wording, but the sentiment is accurately reflected in OECD reviews.', source: 'https://www.hm.ee/en' },
    ],
    articleComments: [
      { user: 'mk', text: 'The teacher autonomy angle is particularly interesting when compared to the rigid curriculum standards in many US states.', time: '2 weeks ago', likes: 9 },
    ],
    editRequests: []
  }
];

const discussions = [
  { id: 'd1', title: 'How do you handle screen time concerns from parents when implementing game-based learning?', author: 'sr', tag: 'question', replies: 14, time: '3 hours ago' },
  { id: 'd2', title: 'Resource sharing: Free gamification tools for math teachers (K-5)', author: 'jd', tag: 'resource', replies: 23, time: '8 hours ago' },
  { id: 'd3', title: 'Should AI-generated articles be fact-checked differently than human-written ones?', author: 'mk', tag: 'discussion', replies: 31, time: '1 day ago' },
  { id: 'd4', title: "Success story: Our district's first year with Minecraft Education Edition", author: 'em', tag: 'discussion', replies: 19, time: '2 days ago' },
  { id: 'd5', title: 'Need help: Finding peer-reviewed sources on creativity assessment in collectivist cultures', author: 'at', tag: 'question', replies: 8, time: '3 days ago' },
];


// ===== PARTICLE ANIMATION =====
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 40;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
      o: Math.random() * 0.5 + 0.15,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#01696f';
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = primary;
      ctx.globalAlpha = p.o;
      ctx.fill();
    });
    // Draw connections
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = primary;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}


// ===== XP & GAMIFICATION =====
function addXP(amount) {
  xp += amount;
  while (xp >= XP_PER_LEVEL) {
    xp -= XP_PER_LEVEL;
    level++;
    showToast(`Level Up! You're now Level ${level}! 🎉`, 'success');
    fireConfetti();
  }
  updateXPBar();
}

function updateXPBar() {
  const fill = document.getElementById('xpFill');
  const label = document.getElementById('xpLabel');
  if (fill) fill.style.width = (xp / XP_PER_LEVEL * 100) + '%';
  if (label) label.textContent = `Level ${level} — ${xp}/${XP_PER_LEVEL} XP`;
}

function fireConfetti() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }
}

function miniConfetti(x, y) {
  if (typeof confetti === 'function') {
    const rect = document.body.getBoundingClientRect();
    confetti({
      particleCount: 25, spread: 50,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ['#01696f', '#7a39bb', '#38bdf8', '#e8af34'],
    });
  }
}


// ===== FACEBOOK SDK =====
function fbLogin() {
  if (typeof FB === 'undefined') {
    showToast('Facebook SDK not loaded — demo mode active', 'info');
    // Demo login
    fbUser = { name: 'Demo User', id: 'demo123' };
    document.getElementById('fbLoginText').textContent = 'Demo User';
    document.getElementById('fbLoginBtn').classList.add('logged-in');
    addXP(50);
    showToast('Logged in (demo mode)! +50 XP', 'success');
    return;
  }
  FB.login(function(response) {
    if (response.authResponse) {
      FB.api('/me', { fields: 'name,id' }, function(userData) {
        fbUser = userData;
        document.getElementById('fbLoginText').textContent = userData.name.split(' ')[0];
        document.getElementById('fbLoginBtn').classList.add('logged-in');
        addXP(50);
        showToast(`Welcome, ${userData.name}! +50 XP`, 'success');
      });
    }
  }, { scope: 'public_profile' });
}

function fbShare(articleId) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;
  const url = window.location.href;
  if (typeof FB !== 'undefined') {
    FB.ui({
      method: 'share',
      href: url,
      quote: `${article.title} — ${article.excerpt}`,
    }, function(response) {
      if (response && !response.error_message) {
        article.shares++;
        addXP(15);
        showToast('Shared on Facebook! +15 XP', 'success');
      }
    });
  } else {
    // Fallback — open Facebook share in new tab
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(article.title)}`, '_blank', 'width=600,height=400');
    article.shares++;
    addXP(15);
    showToast('Shared on Facebook! +15 XP', 'success');
  }
}


// ===== AI PANEL =====
function toggleAiPanel() {
  const panel = document.getElementById('aiPanel');
  aiPanelOpen = !aiPanelOpen;
  if (aiPanelOpen) {
    panel.classList.remove('hidden');
    panel.style.opacity = '1';
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(panel, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' });
    }
  } else {
    panel.classList.add('hidden');
  }
}

function aiQuickAction(type) {
  const input = document.getElementById('aiInput');
  const prompts = {
    comment: 'Write a thoughtful comment about the current article',
    article: 'Write an interactive article about ',
    title: 'Generate catchy titles about ',
    improve: 'Improve this text: ',
  };
  input.value = prompts[type] || '';
  input.focus();
  if (type === 'comment' && currentArticleId) {
    sendAiMessage('comment');
  }
}

function addAiMessage(role, text) {
  const area = document.getElementById('aiChatArea');
  const avatar = role === 'bot' ? '🤖' : '👤';
  const div = document.createElement('div');
  div.className = `ai-message ai-${role}`;
  div.innerHTML = `
    <div class="ai-message-avatar">${avatar}</div>
    <div class="ai-message-text">${text}</div>
  `;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
  return div;
}

function addAiLoading() {
  const area = document.getElementById('aiChatArea');
  const div = document.createElement('div');
  div.className = 'ai-message ai-bot';
  div.id = 'aiLoading';
  div.innerHTML = `
    <div class="ai-message-avatar">🤖</div>
    <div class="ai-loading"><span></span><span></span><span></span></div>
  `;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function removeAiLoading() {
  const el = document.getElementById('aiLoading');
  if (el) el.remove();
}

async function sendAiMessage(forcedType) {
  const input = document.getElementById('aiInput');
  const text = input.value.trim();
  if (!text && !forcedType) return;

  if (text) addAiMessage('user', text);
  input.value = '';

  if (!API_URL) {
    addAiMessage('bot', 'AI features require the backend server. In the deployed version, AI endpoints are not available — but you can still use all other platform features!');
    return;
  }

  addAiLoading();
  const sendBtn = document.getElementById('aiSendBtn');
  sendBtn.disabled = true;

  try {
    let response, data;
    const lowerText = text.toLowerCase();

    if (forcedType === 'comment' || lowerText.includes('comment')) {
      const article = articles.find(a => a.id === currentArticleId) || articles[0];
      response = await fetch(`${API_URL}/api/ai/write-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleTitle: article.title,
          articleExcerpt: article.excerpt,
          tone: 'thoughtful',
          prompt: text,
        }),
      });
      data = await response.json();
      removeAiLoading();
      if (data.text) {
        addAiMessage('bot', `Here's a draft comment:\n\n"${data.text}"\n\nFeel free to copy and use this in the comments section!`);
        addXP(10);
      } else {
        addAiMessage('bot', 'Sorry, I ran into an issue generating that comment. Try again?');
      }

    } else if (lowerText.includes('title') || lowerText.includes('headline')) {
      const topic = text.replace(/generate|catchy|titles?|headlines?|about/gi, '').trim() || 'education technology';
      response = await fetch(`${API_URL}/api/ai/generate-title`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      data = await response.json();
      removeAiLoading();
      if (data.titles) {
        const titleList = data.titles.map((t, i) => `${i + 1}. ${t}`).join('\n');
        addAiMessage('bot', `Here are some title ideas:\n\n${titleList}\n\nClick any to copy!`);
        addXP(10);
      } else {
        addAiMessage('bot', 'Had trouble generating titles. Give me a more specific topic?');
      }

    } else if (lowerText.includes('improve') || lowerText.includes('rewrite')) {
      const textToImprove = text.replace(/improve|rewrite|this text:?/gi, '').trim();
      if (textToImprove.length < 10) {
        removeAiLoading();
        addAiMessage('bot', 'Please paste the text you want me to improve after "Improve this text:"');
        sendBtn.disabled = false;
        return;
      }
      response = await fetch(`${API_URL}/api/ai/improve-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToImprove, action: 'improve' }),
      });
      data = await response.json();
      removeAiLoading();
      if (data.text) {
        addAiMessage('bot', `Improved version:\n\n"${data.text}"`);
        addXP(10);
      } else {
        addAiMessage('bot', 'Something went wrong improving that text. Try again?');
      }

    } else if (lowerText.includes('article') || lowerText.includes('write')) {
      const topic = text.replace(/write|an?|interactive|article|about/gi, '').trim() || 'innovative teaching methods';
      response = await fetch(`${API_URL}/api/ai/write-article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category: 'Education', style: 'engaging' }),
      });
      data = await response.json();
      removeAiLoading();
      if (data.html) {
        addAiMessage('bot', 'I\'ve generated an interactive article! Click "Use in New Article" below to create it.');
        // Store for use
        window._aiGeneratedArticle = { html: data.html, topic };
        const useBtn = document.createElement('div');
        useBtn.className = 'ai-message ai-bot';
        useBtn.innerHTML = `
          <div class="ai-message-avatar">🤖</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            <button class="btn btn-primary" onclick="useAiArticle()" style="font-size:var(--text-xs)">📝 Use in New Article</button>
            <button class="btn btn-secondary" onclick="previewAiArticle()" style="font-size:var(--text-xs)">👁 Preview</button>
          </div>
        `;
        document.getElementById('aiChatArea').appendChild(useBtn);
        addXP(25);
      } else {
        addAiMessage('bot', 'Had trouble generating the article. Please try a more specific topic?');
      }

    } else {
      // Generic — try as comment
      removeAiLoading();
      addAiMessage('bot', 'I can help you with:\n\n• Draft a comment (type "comment")\n• Write an article (type "write article about...")\n• Generate titles (type "titles about...")\n• Improve text (type "improve: your text")\n\nWhat would you like?');
    }
  } catch (err) {
    removeAiLoading();
    addAiMessage('bot', 'Network error — make sure the AI backend is running. Try again in a moment!');
  }

  sendBtn.disabled = false;
}

function useAiArticle() {
  if (!window._aiGeneratedArticle) return;
  navigateTo('create');
  setTimeout(() => {
    const body = document.getElementById('createBody');
    if (body) body.value = window._aiGeneratedArticle.html;
    showToast('AI article loaded into editor! Edit and publish.', 'success');
  }, 100);
}

function previewAiArticle() {
  if (!window._aiGeneratedArticle) return;
  const modal = document.getElementById('modalContainer');
  modal.innerHTML = `
    <div class="change-request-modal" onclick="if(event.target===this)closeModal()">
      <div class="modal-content" style="max-width:800px;max-height:80vh;overflow-y:auto">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4)">
          <h3 style="margin:0">AI Article Preview</h3>
          <button class="btn-icon" onclick="closeModal()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="article-body">${window._aiGeneratedArticle.html}</div>
        <div style="display:flex;gap:var(--space-3);justify-content:flex-end;margin-top:var(--space-6)">
          <button class="btn btn-secondary" onclick="closeModal()">Close</button>
          <button class="btn btn-primary" onclick="useAiArticle();closeModal()">Use This Article</button>
        </div>
      </div>
    </div>
  `;
}

// AI input enter key
document.addEventListener('DOMContentLoaded', () => {
  const aiInput = document.getElementById('aiInput');
  if (aiInput) {
    aiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAiMessage();
      }
    });
  }
});


// ===== RENDER FUNCTIONS =====

function renderEmojiReactions(article) {
  return emojiSet.map(em => {
    const count = (article.emojiReactions && article.emojiReactions[em]) || 0;
    const active = article.myEmojis && article.myEmojis.includes(em);
    return `<button class="emoji-react-btn ${active ? 'active' : ''}" onclick="event.stopPropagation();toggleEmoji('${article.id}','${em}',this)" title="${em}">${em}${count ? `<span style="font-size:10px;margin-left:1px">${count}</span>` : ''}</button>`;
  }).join('');
}

function toggleEmoji(articleId, emoji, btn) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;
  if (!article.myEmojis) article.myEmojis = [];
  if (!article.emojiReactions) article.emojiReactions = {};
  const idx = article.myEmojis.indexOf(emoji);
  if (idx > -1) {
    article.myEmojis.splice(idx, 1);
    article.emojiReactions[emoji] = Math.max(0, (article.emojiReactions[emoji] || 1) - 1);
    btn.classList.remove('active');
  } else {
    article.myEmojis.push(emoji);
    article.emojiReactions[emoji] = (article.emojiReactions[emoji] || 0) + 1;
    btn.classList.add('active');
    addXP(5);
    // Mini confetti
    const rect = btn.getBoundingClientRect();
    miniConfetti(rect.left + rect.width / 2, rect.top);
  }
  // Update count display
  const count = article.emojiReactions[emoji] || 0;
  const span = btn.querySelector('span');
  if (span) {
    span.textContent = count || '';
  } else if (count) {
    btn.innerHTML = `${emoji}<span style="font-size:10px;margin-left:1px">${count}</span>`;
  }
}

function renderFeedCard(article) {
  const user = users[article.author];
  return `
    <div class="article-card" onclick="openArticle('${article.id}')">
      <div class="card-hero">
        <div class="card-hero-gradient" style="background:${article.gradient}"></div>
        <span class="card-hero-emoji">${article.emoji}</span>
      </div>
      <div class="card-body">
        <span class="card-category">${article.category}</span>
        <h3 class="card-title">${article.title}</h3>
        <p class="card-excerpt">${article.excerpt}</p>
        <div class="card-meta">
          <div class="card-author">
            <div class="avatar" style="background:${user.color}">${user.initials}</div>
            <span class="card-author-name">${user.name}</span>
          </div>
          <span class="card-date">${article.date}</span>
        </div>
      </div>
      <div class="card-actions" onclick="event.stopPropagation()">
        <button class="card-action-btn ${article.isLiked ? 'liked' : ''}" onclick="toggleLike('${article.id}', this)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${article.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${article.likes}
        </button>
        <button class="card-action-btn" onclick="openArticle('${article.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${article.comments}
        </button>
        <button class="card-action-btn" onclick="shareArticle('${article.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          ${article.shares}
        </button>
        <div class="emoji-reactions">
          ${renderEmojiReactions(article)}
        </div>
      </div>
    </div>
  `;
}

function renderFeed(query) {
  let filtered = articles;
  if (query) {
    const q = query.toLowerCase();
    filtered = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      users[a.author].name.toLowerCase().includes(q)
    );
  }
  document.getElementById('feedGrid').innerHTML = filtered.length
    ? filtered.map(renderFeedCard).join('')
    : '<p style="color:var(--color-text-muted);text-align:center;padding:var(--space-12)">No articles found matching your search.</p>';
}

function renderTrending() {
  const sorted = [...articles].sort((a, b) => b.likes - a.likes);
  document.getElementById('trendingGrid').innerHTML = sorted.map(renderFeedCard).join('');
}

function renderDiscussions() {
  const container = document.getElementById('discussView');
  container.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-6)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl)">Community Discussions</h2>
      <button class="btn btn-primary" onclick="showNewDiscussionForm()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        New Thread
      </button>
    </div>
    ${discussions.map(d => {
      const user = users[d.author];
      return `
        <div class="discussion-thread" onclick="showToast('Thread view coming soon','info')">
          <div style="display:flex;align-items:flex-start;gap:var(--space-3)">
            <div class="avatar" style="background:${user.color};width:36px;height:36px;font-size:var(--text-sm)">${user.initials}</div>
            <div style="flex:1">
              <div class="thread-title">${d.title}</div>
              <div class="thread-meta">
                <span class="thread-tag tag-${d.tag}">${d.tag}</span>
                <span>${user.name}</span>
                <span>${d.time}</span>
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  ${d.replies} replies
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

function renderFactChecks() {
  const container = document.getElementById('factchecksView');
  const allChecks = articles.flatMap(a =>
    a.factChecks.map(fc => ({ ...fc, articleTitle: a.title, articleId: a.id }))
  );
  container.innerHTML = `
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-6)">Community Fact Checks</h2>
    <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-6);flex-wrap:wrap">
      <button class="btn btn-secondary" style="font-weight:600" onclick="filterFactChecks('all')">All (${allChecks.length})</button>
      <button class="btn btn-ghost" onclick="filterFactChecks('verified')">Verified (${allChecks.filter(c => c.verdict === 'verified').length})</button>
      <button class="btn btn-ghost" onclick="filterFactChecks('pending')">Pending (${allChecks.filter(c => c.verdict === 'pending').length})</button>
      <button class="btn btn-ghost" onclick="filterFactChecks('disputed')">Disputed (${allChecks.filter(c => c.verdict === 'disputed').length})</button>
    </div>
    <div id="factCheckList">
      ${allChecks.map(fc => renderFactCheckItem(fc)).join('')}
    </div>
  `;
}

function renderFactCheckItem(fc) {
  const verdictClass = fc.verdict === 'verified' ? 'verdict-verified' : fc.verdict === 'pending' ? 'verdict-pending' : 'verdict-disputed';
  const verdictIcon = fc.verdict === 'verified' ? '✓' : fc.verdict === 'pending' ? '?' : '✗';
  return `
    <div class="fact-check-item">
      <div class="fact-check-claim">"${fc.claim}"</div>
      <div style="display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap">
        <span class="fact-check-verdict ${verdictClass}">${verdictIcon} ${fc.verdict.charAt(0).toUpperCase() + fc.verdict.slice(1)}</span>
        <span style="font-size:var(--text-xs);color:var(--color-text-muted)">from: <a style="color:var(--color-primary);cursor:pointer" onclick="openArticle('${fc.articleId}')">${fc.articleTitle}</a></span>
      </div>
      <div class="fact-check-note">${fc.note}</div>
    </div>
  `;
}

function renderArticle(articleId) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;
  currentArticleId = articleId;
  const user = users[article.author];

  const factChecksHtml = article.factChecks.length ? `
    <div class="fact-check-section">
      <div class="fact-check-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Fact Checks
        </h3>
        <span style="font-size:var(--text-xs);color:var(--color-text-muted)">${article.factChecks.length} claims reviewed</span>
      </div>
      ${article.factChecks.map(fc => {
        const verdictClass = fc.verdict === 'verified' ? 'verdict-verified' : fc.verdict === 'pending' ? 'verdict-pending' : 'verdict-disputed';
        const verdictIcon = fc.verdict === 'verified' ? '✓' : fc.verdict === 'pending' ? '?' : '✗';
        return `
          <div class="fact-check-item">
            <div class="fact-check-claim">"${fc.claim}"</div>
            <span class="fact-check-verdict ${verdictClass}">${verdictIcon} ${fc.verdict.charAt(0).toUpperCase() + fc.verdict.slice(1)}</span>
            <div class="fact-check-note">${fc.note}</div>
          </div>
        `;
      }).join('')}
      <div class="fact-check-form">
        <p style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2)">Request a Fact Check</p>
        <textarea id="factCheckRequest" placeholder="Paste the claim you want fact-checked and provide any supporting evidence or sources..."></textarea>
        <div style="display:flex;justify-content:flex-end;margin-top:var(--space-2)">
          <button class="btn btn-primary" onclick="submitFactCheck()">Submit Request</button>
        </div>
      </div>
    </div>
  ` : '';

  const editRequestsHtml = article.editRequests.length ? `
    <div style="margin-top:var(--space-6)">
      <h3 style="font-size:var(--text-base);font-weight:700;margin-bottom:var(--space-4);display:flex;align-items:center;gap:var(--space-2)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Change Requests
      </h3>
      ${article.editRequests.map(er => {
        const reqUser = users[er.user];
        const statusClass = er.status === 'approved' ? 'status-approved' : 'status-open';
        return `
          <div class="edit-request">
            <div class="edit-request-header">
              <div style="display:flex;align-items:center;gap:var(--space-2)">
                <div class="avatar" style="background:${reqUser.color}">${reqUser.initials}</div>
                <span style="font-size:var(--text-sm);font-weight:600">${reqUser.name}</span>
                <span style="font-size:var(--text-xs);color:var(--color-text-faint)">${er.time}</span>
              </div>
              <span class="edit-request-status ${statusClass}">${er.status}</span>
            </div>
            <p style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-1)">Section: ${er.section}</p>
            <p style="font-size:var(--text-sm)">${er.request}</p>
          </div>
        `;
      }).join('')}
    </div>
  ` : '';

  const commentsHtml = `
    <div class="comments-section">
      <h3 class="comments-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Comments (${article.articleComments.length})
      </h3>
      <div class="comment-input-area">
        <div class="avatar" style="background:var(--color-primary)">MK</div>
        <div class="comment-input-box">
          <textarea id="commentInput" placeholder="Join the discussion..."></textarea>
          <div class="comment-input-actions">
            <button class="comment-ai-btn" onclick="aiDraftComment()">
              ✨ Draft with AI
            </button>
            <button class="btn btn-primary" onclick="submitComment('${article.id}')">Post Comment</button>
          </div>
        </div>
      </div>
      <div id="commentsList">
        ${article.articleComments.map(c => {
          const cUser = users[c.user];
          return `
            <div class="comment">
              <div class="avatar" style="background:${cUser.color}">${cUser.initials}</div>
              <div class="comment-content">
                <span class="comment-author">${cUser.name}</span>
                <span class="comment-time">${c.time}</span>
                <p class="comment-text">${c.text}</p>
                <div class="comment-actions">
                  <button class="comment-action" onclick="likeComment(this, ${c.likes})">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    ${c.likes}
                  </button>
                  <button class="comment-action" onclick="showToast('Reply feature coming soon','info')">Reply</button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Facebook Comments Section -->
    <div class="fb-comments-wrapper">
      <h4>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-fb)"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        Facebook Comments
      </h4>
      <p style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-3)">Connect with Facebook to leave comments that are shared on your timeline.</p>
      <div class="fb-comments" data-href="${window.location.href}#${article.id}" data-width="100%" data-numposts="5"></div>
      <p style="font-size:var(--text-xs);color:var(--color-text-faint);margin-top:var(--space-2)">Facebook comments require the Facebook SDK. In demo mode, use the EduPulse comments above.</p>
    </div>
  `;

  document.getElementById('articleContent').innerHTML = `
    <button class="article-back-btn" onclick="navigateTo('feed')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Back to Feed
    </button>

    <div class="article-hero" style="background:${article.gradient}">
      <h1>${article.emoji} ${article.title}</h1>
      <p class="subtitle">${article.subtitle}</p>
      <p class="byline">${user.name} · ${article.date} · ${article.category}</p>
    </div>

    <div class="article-social-bar">
      <div class="social-reactions">
        <button class="reaction-btn ${article.isLiked ? 'active liked' : ''}" onclick="toggleArticleLike(this, '${article.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${article.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span class="like-count">${article.likes}</span>
        </button>
        <button class="reaction-btn" onclick="document.getElementById('commentInput').focus()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${article.articleComments.length}
        </button>
        <button class="reaction-btn" onclick="showToast('Bookmarked! +5 XP','success');addXP(5)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          Save
        </button>
      </div>
      <div class="social-share">
        <button class="btn btn-secondary" onclick="openChangeRequestModal('${article.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Request Change
        </button>
        <div class="share-dropdown">
          <button class="btn btn-primary" onclick="toggleShareMenu(this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
          <div class="share-menu hidden" id="shareMenu">
            <button onclick="fbShare('${article.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Facebook
            </button>
            <button onclick="shareToSocial('twitter')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X / Twitter
            </button>
            <button onclick="shareToSocial('linkedin')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </button>
            <button onclick="shareToSocial('copy')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Facebook action row -->
    <div class="fb-action-row">
      <button class="fb-share-btn" onclick="fbShare('${article.id}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        Share on Facebook
      </button>
      <button class="fb-share-btn" style="background:var(--color-primary)" onclick="shareToSocial('twitter')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Share on X
      </button>
    </div>

    <div class="article-body">${article.body}</div>

    ${factChecksHtml}
    ${editRequestsHtml}
    ${commentsHtml}
  `;

  // Parse FB comments if SDK is loaded
  if (typeof FB !== 'undefined') {
    try { FB.XFBML.parse(); } catch (e) { /* silent */ }
  }
}

// AI draft comment helper
async function aiDraftComment() {
  const article = articles.find(a => a.id === currentArticleId);
  if (!article) return;
  const commentInput = document.getElementById('commentInput');
  if (!API_URL) {
    commentInput.value = 'Great article! The research on this topic is really compelling. I particularly appreciated the practical tools section — will be sharing with my department.';
    showToast('AI demo comment generated (backend not connected)', 'info');
    return;
  }

  commentInput.value = 'Generating with AI...';
  commentInput.disabled = true;
  try {
    const response = await fetch(`${API_URL}/api/ai/write-comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleTitle: article.title,
        articleExcerpt: article.excerpt,
        tone: 'thoughtful',
      }),
    });
    const data = await response.json();
    commentInput.value = data.text || 'Could not generate comment. Try writing one yourself!';
    addXP(10);
    showToast('AI comment drafted! +10 XP. Edit and post.', 'success');
  } catch (err) {
    commentInput.value = '';
    showToast('AI backend not available. Write your own awesome comment!', 'info');
  }
  commentInput.disabled = false;
  commentInput.focus();
}


// ===== CREATE VIEW =====
function renderCreateView() {
  document.getElementById('createContent').innerHTML = `
    <h2>Write a New Article</h2>

    <div class="form-group">
      <label>Title</label>
      <div class="ai-generate-row">
        <button class="ai-gen-btn purple" onclick="aiGenerateTitles()">
          ✨ AI Generate Titles
        </button>
      </div>
      <input type="text" id="createTitle" placeholder="Enter a catchy, engaging title...">
      <div id="titleSuggestions" style="display:none;margin-top:var(--space-2)"></div>
    </div>

    <div class="form-group">
      <label>Category</label>
      <select id="createCategory">
        <option value="Game-Based Learning">Game-Based Learning</option>
        <option value="AI & Technology">AI & Technology</option>
        <option value="Assessment & Testing">Assessment & Testing</option>
        <option value="Global Education">Global Education</option>
        <option value="Teaching Methods">Teaching Methods</option>
        <option value="EdTech Tools">EdTech Tools</option>
        <option value="Student Wellness">Student Wellness</option>
      </select>
    </div>

    <div class="form-group">
      <label>Excerpt / Summary</label>
      <textarea id="createExcerpt" style="min-height:80px" placeholder="A brief summary that will appear in the feed card..."></textarea>
    </div>

    <div class="form-group">
      <label>Article Body (HTML supported)</label>
      <div class="ai-generate-row">
        <button class="ai-gen-btn purple" onclick="aiGenerateArticle()">
          ✨ AI Write Full Article
        </button>
        <button class="ai-gen-btn teal" onclick="aiImproveBody()">
          🔧 AI Improve Text
        </button>
      </div>
      <textarea id="createBody" placeholder="Write your article using HTML components. You can use: h2, h3, p, pull-quote, stats-row, cta-box, tool-grid, peer-grid, final-cta, sources-box..."></textarea>
      <p class="form-hint">Tip: Use the AI Write button to generate a full interactive article, then edit it to your liking.</p>
    </div>

    <div style="display:flex;gap:var(--space-3);justify-content:flex-end">
      <button class="btn btn-secondary" onclick="navigateTo('feed')">Cancel</button>
      <button class="btn btn-primary btn-glow" onclick="submitArticle()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        Publish Article
      </button>
    </div>
  `;
}

async function aiGenerateTitles() {
  const topic = document.getElementById('createTitle').value.trim() || document.getElementById('createExcerpt').value.trim() || 'education innovation';
  if (!API_URL) {
    showToast('AI backend not available — try writing your own creative title!', 'info');
    return;
  }
  showToast('Generating title ideas...', 'info');
  try {
    const res = await fetch(`${API_URL}/api/ai/generate-title`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    if (data.titles && data.titles.length) {
      const container = document.getElementById('titleSuggestions');
      container.style.display = 'block';
      container.innerHTML = data.titles.map(t =>
        `<button class="btn btn-ghost" style="display:block;width:100%;text-align:left;margin-bottom:var(--space-1);font-size:var(--text-sm)" onclick="document.getElementById('createTitle').value=this.textContent;document.getElementById('titleSuggestions').style.display='none'">${t}</button>`
      ).join('');
      addXP(10);
      showToast('Click a title to use it! +10 XP', 'success');
    }
  } catch (err) {
    showToast('Could not generate titles. Try again later.', 'info');
  }
}

async function aiGenerateArticle() {
  const title = document.getElementById('createTitle').value.trim();
  const category = document.getElementById('createCategory').value;
  const topic = title || 'innovative teaching methods';
  if (!API_URL) {
    showToast('AI backend not available', 'info');
    return;
  }
  const bodyEl = document.getElementById('createBody');
  bodyEl.value = 'Generating article with AI... (this may take a moment)';
  bodyEl.disabled = true;
  try {
    const res = await fetch(`${API_URL}/api/ai/write-article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, category, style: 'engaging' }),
    });
    const data = await res.json();
    bodyEl.value = data.html || 'Could not generate article. Try a more specific topic.';
    addXP(25);
    showToast('Article generated! +25 XP. Review and edit before publishing.', 'success');
  } catch (err) {
    bodyEl.value = '';
    showToast('AI generation failed. Try again.', 'info');
  }
  bodyEl.disabled = false;
}

async function aiImproveBody() {
  const bodyEl = document.getElementById('createBody');
  const text = bodyEl.value.trim();
  if (!text || text.length < 20) {
    showToast('Write some text first, then use AI to improve it.', 'info');
    return;
  }
  if (!API_URL) {
    showToast('AI backend not available', 'info');
    return;
  }
  bodyEl.disabled = true;
  try {
    const res = await fetch(`${API_URL}/api/ai/improve-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, action: 'improve' }),
    });
    const data = await res.json();
    if (data.text) {
      bodyEl.value = data.text;
      addXP(10);
      showToast('Text improved! +10 XP', 'success');
    }
  } catch (err) {
    showToast('Improvement failed. Try again.', 'info');
  }
  bodyEl.disabled = false;
}


// ===== NAVIGATION =====
function navigateTo(view) {
  document.getElementById('feedView').classList.add('hidden');
  document.getElementById('trendingView').classList.add('hidden');
  document.getElementById('discussView').classList.add('hidden');
  document.getElementById('factchecksView').classList.add('hidden');
  document.getElementById('articleView').classList.add('hidden');
  document.getElementById('createView').classList.add('hidden');
  document.getElementById('mainTabs').classList.remove('hidden');

  if (view === 'feed') {
    document.getElementById('feedView').classList.remove('hidden');
    renderFeed(searchQuery);
    setActiveTab('feed');
  } else if (view === 'trending') {
    document.getElementById('trendingView').classList.remove('hidden');
    renderTrending();
    setActiveTab('trending');
  } else if (view === 'discuss') {
    document.getElementById('discussView').classList.remove('hidden');
    renderDiscussions();
    setActiveTab('discuss');
  } else if (view === 'factchecks') {
    document.getElementById('factchecksView').classList.remove('hidden');
    renderFactChecks();
    setActiveTab('factchecks');
  } else if (view === 'article') {
    document.getElementById('mainTabs').classList.add('hidden');
    document.getElementById('articleView').classList.remove('hidden');
  } else if (view === 'create') {
    document.getElementById('mainTabs').classList.add('hidden');
    document.getElementById('createView').classList.remove('hidden');
    renderCreateView();
  }

  currentView = view;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(tab) { navigateTo(tab); }

function setActiveTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
}

function openArticle(id) {
  renderArticle(id);
  navigateTo('article');
  addXP(2);
}


// ===== INTERACTIONS =====
function toggleLike(articleId, btn) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;
  article.isLiked = !article.isLiked;
  article.likes += article.isLiked ? 1 : -1;
  btn.classList.toggle('liked', article.isLiked);
  const svg = btn.querySelector('svg');
  svg.setAttribute('fill', article.isLiked ? 'currentColor' : 'none');
  btn.innerHTML = `${svg.outerHTML} ${article.likes}`;
  if (article.isLiked) {
    addXP(5);
    const rect = btn.getBoundingClientRect();
    miniConfetti(rect.left + rect.width / 2, rect.top);
  }
}

function toggleArticleLike(btn, articleId) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;
  article.isLiked = !article.isLiked;
  article.likes += article.isLiked ? 1 : -1;
  btn.classList.toggle('active', article.isLiked);
  btn.classList.toggle('liked', article.isLiked);
  const svg = btn.querySelector('svg');
  svg.setAttribute('fill', article.isLiked ? 'currentColor' : 'none');
  btn.querySelector('.like-count').textContent = article.likes;
  if (article.isLiked) {
    addXP(5);
    const rect = btn.getBoundingClientRect();
    miniConfetti(rect.left + rect.width / 2, rect.top);
  }
}

function likeComment(btn, currentLikes) {
  btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> ${currentLikes + 1}`;
  btn.style.color = 'var(--color-notification)';
  addXP(2);
}

function shareArticle(articleId) {
  showToast('Link copied to clipboard! +5 XP', 'success');
  const article = articles.find(a => a.id === articleId);
  if (article) article.shares++;
  addXP(5);
}

function toggleShareMenu(btn) {
  const menu = document.getElementById('shareMenu');
  menu.classList.toggle('hidden');
  const closeHandler = (e) => {
    if (!btn.parentElement.contains(e.target)) {
      menu.classList.add('hidden');
      document.removeEventListener('click', closeHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 0);
}

function shareToSocial(platform) {
  const article = articles.find(a => a.id === currentArticleId);
  if (!article) return;
  const el = document.getElementById('shareMenu');
  if (el) el.classList.add('hidden');
  const url = window.location.href;
  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  } else if (platform === 'linkedin') {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  } else if (platform === 'copy') {
    showToast('Link copied to clipboard!', 'success');
  }
  article.shares++;
  addXP(10);
  showToast(`Shared! +10 XP`, 'success');
}

function toggleUserMenu() {
  const menu = document.getElementById('userMenu');
  menu.classList.toggle('hidden');
  const closeHandler = (e) => {
    if (!e.target.closest('.user-menu')) {
      menu.classList.add('hidden');
      document.removeEventListener('click', closeHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 0);
}

function handleSearch(value) {
  searchQuery = value;
  if (currentView === 'feed') renderFeed(value);
}

function submitComment(articleId) {
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if (!text) {
    showToast('Please write a comment first.', 'info');
    return;
  }
  const article = articles.find(a => a.id === articleId);
  if (!article) return;
  article.articleComments.unshift({ user: 'mk', text, time: 'Just now', likes: 0 });
  article.comments++;
  input.value = '';
  renderArticle(articleId);
  addXP(15);
  showToast('Comment posted! +15 XP', 'success');
  fireConfetti();
}

function submitFactCheck() {
  const input = document.getElementById('factCheckRequest');
  const text = input.value.trim();
  if (!text) {
    showToast('Please describe the claim you want fact-checked.', 'info');
    return;
  }
  const article = articles.find(a => a.id === currentArticleId);
  if (article) {
    article.factChecks.push({
      claim: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      verdict: 'pending',
      note: 'Submitted for community review. Our fact-checking team will investigate.',
      source: ''
    });
  }
  input.value = '';
  renderArticle(currentArticleId);
  addXP(20);
  showToast('Fact check request submitted! +20 XP', 'success');
}

function submitArticle() {
  const title = document.getElementById('createTitle').value.trim();
  const category = document.getElementById('createCategory').value;
  const excerpt = document.getElementById('createExcerpt').value.trim();
  const body = document.getElementById('createBody').value.trim();

  if (!title || !excerpt || !body) {
    showToast('Please fill in all required fields.', 'info');
    return;
  }

  const gradients = [
    'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0e7490 100%)',
    'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a78bfa 100%)',
    'linear-gradient(135deg, #064e3b 0%, #047857 60%, #34d399 100%)',
    'linear-gradient(135deg, #7f1d1d 0%, #dc2626 60%, #f87171 100%)',
    'linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #60a5fa 100%)',
  ];
  const emojis = ['📝', '💡', '🔍', '📚', '🧠', '🌍', '🎓', '🚀', '⚡', '🎯'];

  const newArticle = {
    id: 'article-' + Date.now(),
    title, subtitle: excerpt, category, author: 'mk',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    gradient: gradients[Math.floor(Math.random() * gradients.length)],
    excerpt, likes: 0, comments: 0, shares: 0, isLiked: false,
    emojiReactions: { '👍': 0, '❤️': 0, '🔥': 0, '🤯': 0, '👏': 0 },
    myEmojis: [],
    body, factChecks: [], articleComments: [], editRequests: []
  };

  articles.unshift(newArticle);
  navigateTo('feed');
  addXP(50);
  showToast('Article published! +50 XP', 'success');
  fireConfetti();
}

function openChangeRequestModal(articleId) {
  const modal = document.getElementById('modalContainer');
  modal.innerHTML = `
    <div class="change-request-modal" onclick="if(event.target===this)closeModal()">
      <div class="modal-content">
        <h3>Request a Change</h3>
        <p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:var(--space-4)">Suggest corrections, updates, or improvements to this article. The author and community moderators will review your request.</p>
        <div class="form-group">
          <label>Section</label>
          <input type="text" id="changeSection" placeholder="Which section needs changes?">
        </div>
        <div class="form-group">
          <label>Requested Change</label>
          <textarea id="changeDescription" style="min-height:120px" placeholder="Describe the change you'd like to see. Include any supporting evidence or sources."></textarea>
        </div>
        <div style="display:flex;gap:var(--space-3);justify-content:flex-end;margin-top:var(--space-4)">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="submitChangeRequest('${articleId}')">Submit Request</button>
        </div>
      </div>
    </div>
  `;
}

function submitChangeRequest(articleId) {
  const section = document.getElementById('changeSection').value.trim();
  const description = document.getElementById('changeDescription').value.trim();
  if (!section || !description) {
    showToast('Please fill in both fields.', 'info');
    return;
  }
  const article = articles.find(a => a.id === articleId);
  if (article) {
    article.editRequests.push({ user: 'mk', section, request: description, status: 'open', time: 'Just now' });
  }
  closeModal();
  renderArticle(articleId);
  addXP(15);
  showToast('Change request submitted! +15 XP', 'success');
}

function closeModal() {
  document.getElementById('modalContainer').innerHTML = '';
}

function showNewDiscussionForm() {
  const modal = document.getElementById('modalContainer');
  modal.innerHTML = `
    <div class="change-request-modal" onclick="if(event.target===this)closeModal()">
      <div class="modal-content">
        <h3>Start a New Discussion</h3>
        <div class="form-group">
          <label>Topic</label>
          <input type="text" id="discussTitle" placeholder="What would you like to discuss?">
        </div>
        <div class="form-group">
          <label>Type</label>
          <select id="discussTag">
            <option value="question">Question</option>
            <option value="discussion">Discussion</option>
            <option value="resource">Resource Sharing</option>
          </select>
        </div>
        <div style="display:flex;gap:var(--space-3);justify-content:flex-end;margin-top:var(--space-4)">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="submitDiscussion()">Post</button>
        </div>
      </div>
    </div>
  `;
}

function submitDiscussion() {
  const title = document.getElementById('discussTitle').value.trim();
  const tag = document.getElementById('discussTag').value;
  if (!title) {
    showToast('Please enter a topic.', 'info');
    return;
  }
  discussions.unshift({ id: 'd' + Date.now(), title, author: 'mk', tag, replies: 0, time: 'Just now' });
  closeModal();
  renderDiscussions();
  addXP(15);
  showToast('Discussion thread created! +15 XP', 'success');
}

function filterFactChecks(filter) {
  const allChecks = articles.flatMap(a =>
    a.factChecks.map(fc => ({ ...fc, articleTitle: a.title, articleId: a.id }))
  );
  const filtered = filter === 'all' ? allChecks : allChecks.filter(fc => fc.verdict === filter);
  document.getElementById('factCheckList').innerHTML = filtered.length
    ? filtered.map(renderFactCheckItem).join('')
    : '<p style="color:var(--color-text-muted);text-align:center;padding:var(--space-8)">No fact checks in this category.</p>';
}


// ===== TOAST =====
function showToast(message, type) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type || 'info'}`;
  toast.innerHTML = `
    ${type === 'success' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'}
    <span>${message}</span>
  `;
  container.appendChild(toast);
  // GSAP bounce if available
  if (typeof gsap !== 'undefined') {
    gsap.from(toast, { y: 20, scale: 0.9, opacity: 0, duration: 0.4, ease: 'back.out(1.5)' });
  }
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// ===== THEME TOGGLE =====
(function() {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  if (t) {
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
      t.innerHTML = d === 'dark'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }
})();


// ===== AI FACT-CHECK COMPANION (powered by Puter.js) =====
const FC_CACHE = {}; // cache results so we don't re-query the same claim

function injectFactCheckCompanions() {
  const articleBody = document.querySelector('#articleContent .article-body');
  if (!articleBody) return;

  // Inject into stat boxes
  articleBody.querySelectorAll('.stat-box').forEach((box, i) => {
    if (box.querySelector('.fc-trigger')) return; // already injected
    const num = box.querySelector('.stat-num');
    const label = box.querySelector('.stat-label');
    const sourceLink = box.querySelector('a');
    if (!num) return;
    const claim = `${num.textContent.trim()} — ${label ? label.textContent.trim() : ''}`;
    const source = sourceLink ? sourceLink.href : '';
    const btn = createFcTrigger(claim, source, box);
    box.appendChild(btn);
  });

  // Inject into pull-quotes
  articleBody.querySelectorAll('.pull-quote').forEach((quote, i) => {
    if (quote.querySelector('.fc-trigger')) return;
    const claim = quote.textContent.trim().replace(/^["']|["']$/g, '');
    const btn = createFcTrigger(claim, '', quote);
    quote.appendChild(btn);
  });

  // Inject into peer-cards (the stat line)
  articleBody.querySelectorAll('.peer-card').forEach((card, i) => {
    if (card.querySelector('.fc-trigger')) return;
    const title = card.querySelector('.peer-title');
    const stat = card.querySelector('.peer-stat');
    const result = card.querySelector('.peer-result');
    if (!stat && !result) return;
    const claim = `${title ? title.textContent.trim() + ': ' : ''}${stat ? stat.textContent.trim() : ''} ${result ? result.textContent.trim() : ''}`;
    const btn = createFcTrigger(claim, '', card);
    card.appendChild(btn);
  });
}

function createFcTrigger(claim, source, parentEl) {
  const btn = document.createElement('button');
  btn.className = 'fc-trigger';
  btn.innerHTML = '<span class="fc-bot-icon">🔍</span> AI Fact Check';
  btn.setAttribute('aria-label', 'AI fact-check this claim');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    runFactCheck(btn, claim, source, parentEl);
  });
  return btn;
}

// Trusted academic/research domains for source scoring
const TRUSTED_DOMAINS = [
  'frontiersin.org', 'nature.com', 'science.org', 'sciencedirect.com', 'springer.com',
  'wiley.com', 'tandfonline.com', 'jstor.org', 'pubmed.ncbi.nlm.nih.gov', 'eric.ed.gov',
  'oecd.org', 'unesco.org', 'worldbank.org', 'who.int', 'nih.gov', 'nsf.gov',
  'ed.gov', 'nces.ed.gov', 'pisa', 'arxiv.org', 'researchgate.net',
  'vanderbilt.edu', 'harvard.edu', 'stanford.edu', 'mit.edu', 'berkeley.edu',
  'legendsoflearning.com', 'kahoot.com', 'quizizz.com', 'khanacademy.org',
  'naavik.co', 'edsurge.com', 'edweek.org', 'chronicle.com'
];

const TRUSTED_INSTITUTIONS = [
  'frontiers', 'vanderbilt', 'harvard', 'stanford', 'mit', 'oxford', 'cambridge',
  'pisa', 'oecd', 'unesco', 'world bank', 'national science foundation',
  'khan academy', 'ministry', 'department of education', 'beijing normal',
  'torrance', 'paul torrance', 'michele gelfand'
];

async function runFactCheck(btn, claim, source, parentEl) {
  // Check cache
  const cacheKey = claim.substring(0, 100);
  if (FC_CACHE[cacheKey]) {
    renderFcResult(parentEl, FC_CACHE[cacheKey], btn);
    return;
  }

  // Set loading state
  btn.innerHTML = '<span class="fc-bot-icon">🔍</span> Analyzing...';
  btn.classList.add('fc-loading');

  // Remove any previous result
  const prev = parentEl.querySelector('.fc-result');
  if (prev) prev.remove();

  // Simulate brief analysis delay for UX
  await new Promise(r => setTimeout(r, 600 + Math.random() * 800));

  const resultData = analyzeClaimLocally(claim, source, parentEl);

  FC_CACHE[cacheKey] = resultData;
  renderFcResult(parentEl, resultData, btn);
  addXP(15);
  showToast('Fact check complete! +15 XP', 'success');

  btn.innerHTML = '<span class="fc-bot-icon">✅</span> Checked';
  btn.classList.remove('fc-loading');
}

function analyzeClaimLocally(claim, source, parentEl) {
  const lower = claim.toLowerCase();
  let score = 50; // base confidence
  let signals = [];
  let verdict = 'caution';

  // --- Signal 1: Source URL quality ---
  if (source) {
    const srcLower = source.toLowerCase();
    const isTrusted = TRUSTED_DOMAINS.some(d => srcLower.includes(d));
    if (isTrusted) {
      score += 25;
      const domain = TRUSTED_DOMAINS.find(d => srcLower.includes(d));
      signals.push(`Cites a reputable source (${domain})`);
    } else if (source.startsWith('http')) {
      score += 10;
      signals.push('Has an external source link, but not from a major academic publisher');
    }
  } else {
    score -= 5;
    signals.push('No direct source URL provided for this claim');
  }

  // --- Signal 2: Institutional reference ---
  const instMatch = TRUSTED_INSTITUTIONS.find(inst => lower.includes(inst));
  if (instMatch) {
    score += 20;
    signals.push(`References a recognized institution/researcher (${instMatch})`);
  }

  // --- Signal 3: Specificity of the claim ---
  const hasNumber = /\d/.test(claim);
  const hasYear = /\b(19|20)\d{2}\b/.test(claim);
  const hasPercentage = /%/.test(claim);
  const hasCurrency = /\$/.test(claim);
  const hasMultiplier = /\d+x\b/i.test(claim);

  if (hasNumber) {
    score += 5;
    signals.push('Contains specific numeric data');
  }
  if (hasYear) {
    score += 5;
    signals.push('References a specific year, making it verifiable');
  }
  if (hasPercentage || hasCurrency || hasMultiplier) {
    signals.push('Statistical claim — verify methodology and sample size');
  }

  // --- Signal 4: Check the article's own fact-check data ---
  const article = articles.find(a => a.id === currentArticleId);
  if (article && article.factChecks) {
    const match = article.factChecks.find(fc => {
      const claimWords = claim.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      const fcWords = fc.claim.toLowerCase();
      return claimWords.filter(w => fcWords.includes(w)).length >= 2;
    });
    if (match) {
      if (match.verdict === 'verified') {
        score += 15;
        signals.push('This claim has been community-verified by EduPulse reviewers');
      } else if (match.verdict === 'corrected') {
        score += 5;
        signals.push('This claim has been corrected by EduPulse editors — see updated data');
      } else if (match.verdict === 'disputed') {
        score -= 15;
        signals.push('This claim has been flagged as disputed by community reviewers');
      } else if (match.verdict === 'caution') {
        score += 0;
        signals.push('This claim warrants caution — attribution or sourcing is approximate');
      }
    }
  }

  // --- Signal 5: Quote vs data distinction ---
  const isQuote = lower.includes('\u2014') || lower.includes(' \u2013 ') || /^["\u201c]/.test(claim.trim()) || parentEl.classList.contains('pull-quote');
  if (isQuote) {
    signals.push('This is an attributed quote — the attribution can be checked, but opinions within quotes reflect the speaker\'s view');
    score = Math.min(score, 78); // quotes can't be fully "verified" as fact
  }

  // --- Signal 6: Cross-reference with nearby source links ---
  const nearbyLinks = parentEl.querySelectorAll('a[href]');
  if (nearbyLinks.length > 0) {
    const trustedNearby = Array.from(nearbyLinks).filter(a => 
      TRUSTED_DOMAINS.some(d => a.href.toLowerCase().includes(d))
    );
    if (trustedNearby.length > 0) {
      score += 10;
      signals.push(`Has ${trustedNearby.length} linked reference(s) from academic sources`);
    }
  }

  // --- Determine verdict ---
  score = Math.max(15, Math.min(95, score));
  if (score >= 75) verdict = 'verified';
  else if (score >= 45) verdict = 'caution';
  else verdict = 'unverified';

  // --- Build human-readable summary ---
  let summary, detail;
  if (verdict === 'verified') {
    summary = 'This claim is well-supported by its cited sources.';
    detail = signals.slice(0, 3).join('. ') + '. Cross-reference the linked source for full methodology and context.';
  } else if (verdict === 'unverified') {
    summary = 'This claim needs stronger sourcing.';
    detail = signals.slice(0, 3).join('. ') + '. Consider requesting an edit or checking the sources section for additional references.';
  } else {
    summary = 'This claim has some support but warrants closer examination.';
    detail = signals.slice(0, 3).join('. ') + '. Check the original source for full context before citing this claim.';
  }

  return { verdict, confidence: score, summary, detail };
}

function renderFcResult(parentEl, data, btn) {
  // Remove previous result
  const prev = parentEl.querySelector('.fc-result');
  if (prev) prev.remove();

  const confClass = data.confidence >= 75 ? 'fc-high' : data.confidence >= 45 ? 'fc-medium' : 'fc-low';
  const verdictEmoji = data.verdict === 'verified' ? '✅' : data.verdict === 'corrected' ? '🔄' : data.verdict === 'caution' ? '⚠️' : '❌';

  const resultDiv = document.createElement('div');
  resultDiv.className = `fc-result fc-${data.verdict}`;
  resultDiv.innerHTML = `
    <button class="fc-dismiss" onclick="this.parentElement.remove()" aria-label="Dismiss">✕</button>
    <div class="fc-result-header">
      <span>${verdictEmoji}</span>
      <span>AI Fact Check</span>
      <span class="fc-verdict-badge fc-v-${data.verdict}">${data.verdict}</span>
    </div>
    <div class="fc-result-body">
      <strong>${data.summary}</strong><br>${data.detail}
    </div>
    <div class="fc-confidence-bar">
      <span class="fc-confidence-label">Confidence</span>
      <div class="fc-confidence-track">
        <div class="fc-confidence-fill ${confClass}" style="width:0%"></div>
      </div>
      <span class="fc-confidence-label">${data.confidence}%</span>
    </div>
  `;

  parentEl.appendChild(resultDiv);

  // Animate confidence bar fill
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const fill = resultDiv.querySelector('.fc-confidence-fill');
      if (fill) fill.style.width = data.confidence + '%';
    });
  });
}

// Hook into renderArticle — inject companions after article body is rendered
const _origRenderArticle = renderArticle;
renderArticle = function(articleId) {
  _origRenderArticle(articleId);
  // Inject fact-check buttons after a frame so DOM is ready
  requestAnimationFrame(() => injectFactCheckCompanions());
};


// ===== INIT =====
initParticles();
updateXPBar();
renderFeed('');
