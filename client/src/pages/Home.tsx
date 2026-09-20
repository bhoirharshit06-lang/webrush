import { useMemo, useState } from "react";
import { 
  Activity,
  ArrowUpRight,
  AudioLines,
  CalendarDays,
  Camera,
  ChevronRight,
  CircleDot,
  Clock3,
  Compass,
  Disc3,
  Film,
  Filter,
  Flame,
  Grid2X2,
  Headphones,
  Layers3,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  MoveUpRight,
  Music2,
  Navigation,
  Package,
  PanelLeft,
  Play,
  Plus,
  Search,
  Sparkles,
  Store,
  Tag,
  Ticket,
  X,
  Zap,
} from "lucide-react";
import spotifySummary from "../data/spotify-summary.json";
import transactionsSummary from "../data/transactions-summary.json";
import augmentedSummary from "../data/augmented-summary.json";

const navItems = [
  { id: "overview", label: "Life overview", icon: Grid2X2 },
  { id: "threads", label: "Threads", icon: Layers3, count: "08" },
  { id: "chapters", label: "Chapters", icon: BookMarkIcon },
  { id: "map", label: "Life map", icon: Compass },
  { id: "explorer", label: "Receipt explorer", icon: Search },
];

const receiptIcons = [Music2, Headphones, Disc3, AudioLines, Play, Music2];
const receiptTones = ["cyan", "violet", "orange", "lime", "pink", "blue"];
const receipts = spotifySummary.recent.slice(0, 6).map((receipt, index) => ({
  type: "music",
  icon: receiptIcons[index],
  title: receipt.track,
  source: `${receipt.artist} · Spotify`,
  time: new Date(receipt.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  date: new Date(receipt.ts).toLocaleDateString([], { month: "short", day: "2-digit" }).toUpperCase(),
  color: receiptTones[index],
}));

const placeImages = [
  { name: "Current Residence", label: "home / everyday", image: "/manus-storage/place-home_95aff699.jpg", accent: "aqua" },
  { name: "Place 2 Station", label: "commute / movement", image: "/manus-storage/place-commute_f78662cd.jpg", accent: "violet" },
  { name: "Neighborhood", label: "food / household", image: "/manus-storage/place-market_078df48e.jpg", accent: "orange" },
  { name: "Workplace", label: "work / income", image: "/manus-storage/place-work_17590c3a.jpg", accent: "lime" },
];

const chapters = [
  { eyebrow: "CHAPTER 04", title: "The city became a ritual", subtitle: "Sep 2023 — Feb 2024", count: "312 receipts", tone: "aqua", pattern: "You kept returning to the same 4 places, usually after 7pm.", image: "/manus-storage/chapter-ritual_d41faa26.jpg", receipts: [{ title: "Train to Place 0", detail: "Transportation · 07:42", icon: Navigation, tone: "cyan" }, { title: "Milk + bread", detail: "Neighborhood · 08:16", icon: Store, tone: "orange" }, { title: "The long way home", detail: "Music · 19:32", icon: Music2, tone: "violet" }, { title: "Home food delivery", detail: "Food · 21:04", icon: Package, tone: "lime" }] },
  { eyebrow: "CHAPTER 05", title: "A new frequency", subtitle: "Mar — Jun 2024", count: "184 receipts", tone: "violet", pattern: "Your listening shifted — more ambient, more alone, more in motion.", image: "/manus-storage/chapter-frequency_7600d7eb.jpg", receipts: [{ title: "Ode To The Mets", detail: "The Strokes · 23:48", icon: Headphones, tone: "violet" }, { title: "Night route saved", detail: "City Routes · 00:12", icon: Navigation, tone: "cyan" }, { title: "19 Dias y 500 Noches", detail: "Spotify · 01:06", icon: Music2, tone: "orange" }, { title: "Data booster pack", detail: "Subscription · 01:31", icon: Zap, tone: "lime" }] },
  { eyebrow: "CHAPTER 06", title: "Everything came together", subtitle: "May 24, 2024", count: "26 receipts", tone: "peach", pattern: "One night. Five categories. A complete thread.", image: "/manus-storage/chapter-together_d0689b43.jpg", receipts: [{ title: "Sweet Disposition", detail: "Music · 18:42", icon: Music2, tone: "cyan" }, { title: "Bandra West", detail: "Place · 18:58", icon: MapPin, tone: "orange" }, { title: "IMG_4821.HEIC", detail: "Photo · 19:14", icon: Camera, tone: "violet" }, { title: "Table for four", detail: "Purchase · 20:07", icon: Store, tone: "lime" }, { title: "An evening in Bandra", detail: "Event · 21:18", icon: Ticket, tone: "pink" }] },
];

const threadRows = [
  { title: "The night everything came together", meta: "MAY 24 · 5 RECEIPTS · BANDRA", signal: "92% connected", tone: "cyan", image: "/manus-storage/chapter-together_d0689b43.jpg", story: "Five different receipts converged within one small radius — music, a place, a photo, dinner, and the event that held them together.", icons: [Music2, MapPin, Camera, Store, Ticket], receipts: [{ title: "Sweet Disposition", detail: "Music · 18:42", icon: Music2, tone: "cyan" }, { title: "Bandra West", detail: "Place · 18:58", icon: MapPin, tone: "orange" }, { title: "IMG_4821.HEIC", detail: "Photo · 19:14", icon: Camera, tone: "violet" }, { title: "Table for four", detail: "Purchase · 20:07", icon: Store, tone: "lime" }] },
  { title: "A Sunday in slow motion", meta: "JUN 02 · 8 RECEIPTS · MUMBAI", signal: "84% connected", tone: "violet", image: "/manus-storage/chapter-frequency_7600d7eb.jpg", story: "The archive slows down here: one familiar route, a small playlist, a camera roll, and nowhere urgent to be.", icons: [Headphones, CoffeeIcon, Camera, MapPin], receipts: [{ title: "Ode To The Mets", detail: "Music · 09:18", icon: Headphones, tone: "violet" }, { title: "Morning loop", detail: "City route · 10:04", icon: Navigation, tone: "cyan" }, { title: "Camera Roll · 4 photos", detail: "Photos · 12:42", icon: Camera, tone: "orange" }, { title: "Kala Ghoda saved", detail: "Place · 16:10", icon: MapPin, tone: "lime" }] },
  { title: "The long way home", meta: "APR 18 · 11 RECEIPTS · 3 PLACES", signal: "76% connected", tone: "orange", image: "/manus-storage/place-commute_f78662cd.jpg", story: "A route that kept stretching: a late train, a familiar song, two searches, and the small decision not to take the shortest way back.", icons: [Navigation, Music2, Search, MapPin], receipts: [{ title: "Train to Place 0", detail: "Transportation · 21:04", icon: Navigation, tone: "orange" }, { title: "Midnight City", detail: "Music · 21:26", icon: Music2, tone: "violet" }, { title: "late night drives", detail: "Search · 22:01", icon: Search, tone: "cyan" }, { title: "Current Residence", detail: "Place · 23:18", icon: MapPin, tone: "lime" }] },
  { title: "A playlist for the in-between", meta: "FEB 08 · 7 RECEIPTS · ANDHERI", signal: "71% connected", tone: "pink", image: "/manus-storage/chapter-frequency_7600d7eb.jpg", story: "A quiet thread made of half-finished thoughts, a new artist, and a playlist that stayed open longer than the tab.", icons: [Music2, Film, MessageCircle], receipts: [{ title: "A new frequency", detail: "Music · 18:42", icon: Music2, tone: "pink" }, { title: "One film saved", detail: "Movie · 20:08", icon: Film, tone: "violet" }, { title: "Message draft", detail: "Message · 22:36", icon: MessageCircle, tone: "cyan" }] },
];

const placeRows = [
  { place: "Neighborhood", detail: `${transactionsSummary.places.find((place) => place.name === "Neighborhood")?.transactions ?? 0} receipts · food + household`, color: "#8ff2de", x: "67%", y: "36%", size: 16 },
  { place: "Current Residence", detail: `${transactionsSummary.places.find((place) => place.name === "Current Residence")?.transactions ?? 0} receipts · home signals`, color: "#ffb78c", x: "36%", y: "57%", size: 11 },
  { place: "City Routes", detail: `${transactionsSummary.places.find((place) => place.name === "City Routes")?.transactions ?? 0} receipts · trains + autos`, color: "#bda8ff", x: "76%", y: "74%", size: 9 },
  { place: "Workplace", detail: `${transactionsSummary.places.find((place) => place.name === "Workplace")?.transactions ?? 0} receipts · salary + work`, color: "#f5ed70", x: "20%", y: "25%", size: 7 },
];

const explorerTypes = ["All listening", "Tracks", "Artists", "Albums"];

function BookMarkIcon(props: { size?: number; strokeWidth?: number }) {
  return <Tag {...props} />;
}
function CoffeeIcon(props: { size?: number; strokeWidth?: number }) {
  return <CupIcon {...props} />;
}
function CupIcon(props: { size?: number; strokeWidth?: number }) {
  return <Disc3 {...props} />;
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`section-label ${className}`}><span className="label-mark" />{children}</div>;
}

function IconTile({ icon: Icon, tone = "cyan", size = "md" }: { icon: any; tone?: string; size?: "sm" | "md" | "lg" }) {
  return <div className={`icon-tile tile-${tone} tile-${size}`}><Icon size={size === "lg" ? 20 : size === "sm" ? 14 : 17} strokeWidth={1.8} /></div>;
}

function Button({ children, variant = "solid", onClick, className = "", type = "button" }: { children: React.ReactNode; variant?: "solid" | "quiet" | "outline"; onClick?: () => void; className?: string; type?: "button" | "submit" }) {
  return <button type={type} onClick={onClick} className={`app-button button-${variant} ${className}`}>{children}</button>;
}

function PulseChart() {
  const [showValues, setShowValues] = useState(false);
  const max = Math.max(...spotifySummary.monthly.map((month) => month.plays));
  const values = spotifySummary.monthly.map((month) => Math.round((month.plays / max) * 100));
  return <div className={`pulse-chart ${showValues ? "show-values" : ""}`} aria-label="Activity pulse chart"><button className="pulse-chart-toggle" onClick={() => setShowValues((visible) => !visible)} aria-label={showValues ? "Hide bar percentages" : "Show every bar percentage"}>{showValues ? "HIDE %" : "CLICK BARS FOR %"}</button>{values.map((value, index) => <button key={`pulse-${index}`} className={`pulse-bar ${index > 26 ? "active" : ""}`} style={{ height: `${value}%` }} onClick={() => setShowValues(true)} aria-label={`${value}% activity`}><span>{showValues ? `${value}%` : ""}</span></button>)}</div>;
}

function TransactionPulse({ onNavigate }: { onNavigate: (id: string) => void }) {
  const topCategory = transactionsSummary.categoryTop[0];
  const topPlace = transactionsSummary.places[0];
  return <section className="transaction-zone">
    <div className="section-heading"><div><SectionLabel>THE EVERYDAY LAYER</SectionLabel><h2>What happened around the music.</h2></div><span className="muted-count">HOUSEHOLD ARCHIVE · {transactionsSummary.firstDate.slice(0, 4)}—{transactionsSummary.lastDate.slice(0, 4)}</span></div>
    <div className="transaction-pulse panel">
      <div className="money-block"><span>HOUSEHOLD SPEND</span><strong>₹{(transactionsSummary.totalExpense / 100000).toFixed(1)}L</strong><small>{transactionsSummary.records.toLocaleString()} entries · {transactionsSummary.currency}</small></div>
      <div className="money-stat"><span>BIGGEST CATEGORY</span><b>{topCategory.name}</b><small>{topCategory.transactions} receipts · ₹{Math.round(topCategory.spend).toLocaleString()}</small></div>
      <div className="money-stat"><span>WHERE IT HAPPENED</span><b>{topPlace.name}</b><small>{topPlace.transactions} inferred place signals</small></div>
      <div className="money-stat"><span>INCOME → SPEND</span><b>{transactionsSummary.expenseRate}%</b><small>of recorded income</small></div>
      <div className="transaction-spark"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
    </div>
    <div className="section-heading place-heading"><div><SectionLabel>WHERE IT HAPPENED</SectionLabel><h2>Receipts leave a trail.</h2></div><span className="muted-count">INFERRED FROM NOTES + CATEGORIES</span></div>
    <div className="place-photo-grid">{placeImages.map((place) => <button className="place-photo-card panel" key={place.name} onClick={() => onNavigate("map")}><img src={place.image} alt={`${place.name} representative place scene`} /><span className="photo-shade" /><span className={`photo-pip pip-${place.accent}`} /><span className="place-photo-copy"><b>{place.name}</b><small>{place.label}</small></span><ArrowUpRight size={14} /></button>)}</div>
  </section>;
}

function MapPanel({ large = false, onSelect }: { large?: boolean; onSelect?: (place: (typeof augmentedSummary.places)[number]) => void }) {
  return <div className={`map-visual ${large ? "map-large" : ""}`}>
    <div className="map-grid" />
    <div className="map-water map-water-a" />
    <div className="map-water map-water-b" />
    <div className="map-route route-one" />
    <div className="map-route route-two" />
    <div className="map-route route-three" />
    {augmentedSummary.places.map((place) => <button key={place.name} className="map-pin" style={{ left: place.x, top: place.y, "--pin-color": place.color, "--pin-size": `${Math.min(20, 8 + Math.round(place.transactions / 3))}px` } as React.CSSProperties} onClick={() => onSelect?.(place)} aria-label={`Open ${place.name} place story`}><span /></button>)}
    <div className="map-compass"><Navigation size={12} /> N</div>
    <div className="map-caption">AUGMENTED INDIA <span>•</span> {augmentedSummary.validIndiaMerchantLocations} VALID PLACE SIGNALS</div>
  </div>;
}

function PlaceStoryCard({ place, onClose }: { place: (typeof augmentedSummary.places)[number]; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="place-story-card" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={17} /></button><div className="place-story-image"><img src={place.image} alt={`${place.name} representative place`} /><span className="photo-shade" /><div className="place-story-kicker"><span className="live-dot" /> AUGMENTED INDIA / PLACE SIGNAL</div><div className="place-story-title"><h2>{place.name}</h2><span>{place.city}</span></div></div><div className="place-story-body"><SectionLabel>WHAT COLLECTED HERE</SectionLabel><p>One of the strongest geographic clusters in the augmented transaction archive, surfaced without exposing personal card or identity fields.</p><div className="place-story-stats"><div><span>TRANSACTIONS</span><b>{place.transactions}</b></div><div><span>SPEND SIGNAL</span><b>₹{place.spend.toLocaleString()}</b></div><div><span>TOP CATEGORY</span><b>{place.topCategory}</b></div></div><button className="modal-cta" onClick={onClose}>Back to the map <ArrowUpRight size={15} /></button></div></div></div>;
}

function Overview({ onDiscover, onNavigate, onSelectPlace }: { onDiscover: () => void; onNavigate: (id: string) => void; onSelectPlace: (place: (typeof augmentedSummary.places)[number]) => void }) {
  const [selectedThread, setSelectedThread] = useState<(typeof threadRows)[number] | null>(null);
  return <>
    <div className="hero-row">
      <div className="hero-copy">
        <SectionLabel>SPOTIFY ARCHIVE / {spotifySummary.firstDate.slice(0, 4)}—{spotifySummary.lastDate.slice(0, 4)}</SectionLabel>
        <h1>Your life,<br /><em>in receipts.</em></h1>
        <p>{spotifySummary.records.toLocaleString()} listening receipts, gently reassembled into the artists, habits, and repeat moments that shaped your soundtrack.</p>
        <div className="hero-actions"><Button onClick={onDiscover}><Sparkles size={15} /> Discover something</Button><button className="text-link" onClick={() => onNavigate("threads")}>Explore your threads <ArrowUpRight size={14} /></button></div>
      </div>
      <div className="orbit-card">
        <div className="orbit-glow" />
        <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-ring ring-three" />
        <div className="orbit-core"><span>{spotifySummary.records.toLocaleString()}</span><small>LISTENS FOUND</small></div>
        <div className="orbit-tag tag-one"><Music2 size={12} /> {spotifySummary.uniqueTracks.toLocaleString()} tracks</div><div className="orbit-tag tag-two"><MapPin size={12} /> {spotifySummary.uniqueArtists.toLocaleString()} artists</div><div className="orbit-tag tag-three"><Clock3 size={12} /> {spotifySummary.years} years</div>
        <div className="orbit-footer"><span>LAST SYNCED</span><b>2 mins ago</b></div>
      </div>
    </div>

    <div className="stat-strip">
      <div><span>RECEIPTS</span><strong>{spotifySummary.records.toLocaleString()}</strong><small className="up">{spotifySummary.years} years <MoveUpRight size={11} /></small></div>
      <div><span>LISTENING HOURS</span><strong>{spotifySummary.playedHours.toLocaleString()}</strong><small>{spotifySummary.skipRate}% skipped</small></div>
      <div><span>TRACKS</span><strong>{spotifySummary.uniqueTracks.toLocaleString()}</strong><small>{spotifySummary.topTracks[0].name} on repeat</small></div>
      <div><span>ARTISTS</span><strong>{spotifySummary.uniqueArtists.toLocaleString()}</strong><small>{spotifySummary.topArtists[0].name} leads</small></div>
      <div className="stat-note"><Activity size={15} /><span>Your archive is <b>alive</b><br />{spotifySummary.peakYear.year} was your loudest year.</span></div>
    </div>

    <div className="content-grid main-grid">
      <div className="column-stack">
        <div className="section-heading"><div><SectionLabel>THE LIFE PULSE</SectionLabel><h2>When your life was loud.</h2></div><button className="micro-action" onClick={() => onNavigate("changes")}>COMPARE PERIODS <ChevronRight size={13} /></button></div>
        <div className="panel pulse-panel">
          <div className="panel-topline"><div><span className="metric-big">74<span>%</span></span><p>activity intensity</p></div><div className="pulse-legend"><span><i className="legend-dot dot-aqua" /> receipts</span><span><i className="legend-dot dot-violet" /> average</span></div></div>
          <PulseChart />
          <div className="chart-axis"><span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span></div>
          <div className="pulse-callout"><Zap size={13} /><span><b>Listening spike detected</b> · {spotifySummary.peakMonth.month} was your busiest month with {spotifySummary.peakMonth.plays.toLocaleString()} plays.</span><ChevronRight size={14} /></div>
        </div>

        <div className="section-heading discovery-heading"><div><SectionLabel>3 PATTERNS FOUND</SectionLabel><h2>Something is forming.</h2></div><button className="micro-action" onClick={onDiscover}>OPEN DISCOVERY <ChevronRight size={13} /></button></div>
        <div className="insight-grid">
          <button className="insight-card insight-a" onClick={onDiscover}><div className="insight-top"><IconTile icon={Flame} tone="orange" /><span>REPEAT LISTEN</span><ArrowUpRight size={14} /></div><h3>You kept<br /><em>coming back.</em></h3><p>{spotifySummary.topTracks[0].name} is your most replayed track at {spotifySummary.topTracks[0].plays} plays.</p><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></button>
          <button className="insight-card insight-b" onClick={onDiscover}><div className="insight-top"><IconTile icon={Music2} tone="violet" /><span>ARTIST GRAVITY</span><ArrowUpRight size={14} /></div><h3>A familiar<br /><em>frequency.</em></h3><p>{spotifySummary.topArtists[0].name} leads your archive with {spotifySummary.topArtists[0].plays.toLocaleString()} plays.</p><div className="sound-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></button>
          <button className="insight-card insight-c" onClick={onDiscover}><div className="insight-top"><IconTile icon={Sparkles} tone="cyan" /><span>MIDNIGHT SIGNAL</span><ArrowUpRight size={14} /></div><h3>Your nights<br /><em>have a sound.</em></h3><p>Midnight is your peak listening hour, with {spotifySummary.peakHour.plays.toLocaleString()} plays.</p><div className="thread-mini"><span /><span /><span /><span /><span /></div></button>
        </div>
      </div>

      <aside className="column-stack side-column">
        <div className="section-heading"><div><SectionLabel>WHERE IT HAPPENED</SectionLabel><h2>Places you kept.</h2></div><button className="circle-button" onClick={() => onNavigate("map")}><ArrowUpRight size={15} /></button></div>
        <div className="panel map-panel"><MapPanel onSelect={onSelectPlace} /><div className="place-list">{placeRows.slice(0, 3).map((place, index) => <button key={place.place} className="place-row" onClick={() => onNavigate("map")}><span className="place-number">0{index + 1}</span><span className="place-dot" style={{ background: place.color }} /><span className="place-name">{place.place}<small>{place.detail}</small></span><ChevronRight size={14} /></button>)}</div><button className="panel-link" onClick={() => onNavigate("map")}>VIEW FULL MAP <ArrowUpRight size={13} /></button></div>

        <div className="section-heading thread-heading"><div><SectionLabel>RECENT THREADS</SectionLabel><h2>Moments, connected.</h2></div><button className="circle-button" onClick={() => onNavigate("threads")}><ArrowUpRight size={15} /></button></div>
        <div className="panel threads-panel">{threadRows.map((thread, index) => <button className="thread-row" key={`${thread.title}-${index}`} onClick={() => setSelectedThread(thread)}><div className="thread-icons">{thread.icons.slice(0, 4).map((Icon, iconIndex) => <span key={`${thread.title}-icon-${iconIndex}`} className={`thread-icon icon-${thread.tone}`}><Icon size={13} /></span>)}</div><div className="thread-copy"><b>{thread.title}</b><small>{thread.meta}</small></div><span className="thread-score">{thread.signal}</span><ChevronRight size={14} /></button>)}<button className="panel-link" onClick={() => onNavigate("threads")}>SEE ALL THREADS <ArrowUpRight size={13} /></button></div>
      </aside>
    </div>
    <TransactionPulse onNavigate={onNavigate} />
    {selectedThread && <ThreadStoryCard thread={selectedThread} onClose={() => setSelectedThread(null)} />}
  </>;
}

function ThreadStoryCard({ thread, onClose }: { thread: (typeof threadRows)[number]; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><div className={`thread-story-modal tone-${thread.tone}`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={17} /></button><div className="thread-story-hero"><img src={thread.image} alt={`${thread.title} visual`} /><span className="photo-shade" /><div className="thread-story-kicker"><span className="live-dot" /> THREAD / {thread.signal}</div><div className="thread-story-title"><h2>{thread.title}</h2><span>{thread.meta}</span></div></div><div className="thread-story-body"><SectionLabel>WHY THESE RECEIPTS CONNECT</SectionLabel><p>{thread.story}</p><div className="thread-receipt-list">{thread.receipts.map((receipt, index) => <div className="thread-receipt" key={`${receipt.title}-${receipt.detail}-${index}`}><IconTile icon={receipt.icon} tone={receipt.tone} size="sm" /><div><b>{receipt.title}</b><small>{receipt.detail}</small></div><ChevronRight size={14} /></div>)}</div><button className="modal-cta" onClick={onClose}>Close thread <X size={14} /></button></div></div></div>;
}

function ThreadsView({ onOpenDiscover }: { onOpenDiscover: () => void }) {
  const [selectedThread, setSelectedThread] = useState<(typeof threadRows)[number] | null>(null);
  return <div className="view-wrap"><div className="view-intro"><div><SectionLabel>THE CONNECTION LAYER</SectionLabel><h1>Separate records.<br /><em>One moment.</em></h1><p>Threads surface the relationships hidden in your archive — matching dates, places, time, and the things that repeat.</p></div><Button onClick={onOpenDiscover}><Sparkles size={15} /> Discover a thread</Button></div><div className="thread-feature panel"><div className="feature-kicker"><span className="live-dot" /> STRONGEST CONNECTION · 92% CONFIDENCE</div><div className="feature-grid"><div className="feature-title"><h2>The night everything<br /><em>came together.</em></h2><p>Five different receipts, one small radius, a complete story waiting to be noticed.</p><span className="feature-meta"><CalendarDays size={14} /> Friday, May 24, 2024 <i /> <MapPin size={14} /> Bandra West</span></div><div className="connection-graph">{[{ icon: Music2, x: "8%", y: "25%", color: "cyan", label: "Song" }, { icon: MapPin, x: "29%", y: "10%", color: "orange", label: "Place" }, { icon: Camera, x: "57%", y: "26%", color: "violet", label: "Photo" }, { icon: Store, x: "34%", y: "68%", color: "lime", label: "Purchase" }, { icon: Ticket, x: "78%", y: "72%", color: "pink", label: "Event" }].map((node) => <div key={node.label} className={`graph-node node-${node.color}`} style={{ left: node.x, top: node.y }}><span><node.icon size={16} /></span><small>{node.label}</small></div>)}<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M13 31 L34 18 L64 32 L41 75 L84 78 L64 32" /><path d="M13 31 L41 75" /></svg><div className="graph-center"><Sparkles size={15} /></div></div></div><div className="feature-footer"><span><span className="legend-line" /> same date <span className="legend-line line-orange" /> same place <span className="legend-line line-violet" /> nearby time</span><button className="text-link" onClick={() => setSelectedThread(threadRows[0])}>Open connection graph <ArrowUpRight size={14} /></button></div></div><div className="section-heading thread-list-heading"><div><SectionLabel>OTHER THREADS</SectionLabel><h2>More stories to pull.</h2></div><span className="muted-count">{threadRows.length.toString().padStart(2, "0")} TOTAL</span></div><div className="all-thread-list">{threadRows.map((thread, index) => <button className="all-thread-card panel" key={`${thread.title}-${index}`} onClick={() => setSelectedThread(thread)}><div className="all-thread-number">0{index + 1}</div><div className="thread-icons large-icons">{thread.icons.map((Icon, iconIndex) => <span key={`${thread.title}-icon-${iconIndex}`} className={`thread-icon icon-${thread.tone}`}><Icon size={15} /></span>)}</div><div className="thread-copy"><b>{thread.title}</b><small>{thread.meta}</small></div><div className="connection-meter"><span style={{ width: thread.signal.split("%")[0] + "%" }} /><small>{thread.signal}</small></div><ChevronRight size={16} /></button>)}</div>{selectedThread && <ThreadStoryCard thread={selectedThread} onClose={() => setSelectedThread(null)} />}</div>;
}

function ChapterStoryCard({ chapter, onClose }: { chapter: (typeof chapters)[number]; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><div className={`chapter-story-modal tone-${chapter.tone}`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={17} /></button><div className="chapter-story-hero"><img src={chapter.image} alt={`${chapter.title} chapter visual`} /><span className="photo-shade" /><div className="chapter-story-kicker"><span className="live-dot" /> {chapter.eyebrow} / {chapter.count}</div><div className="chapter-story-title"><h2>{chapter.title}</h2><span>{chapter.subtitle}</span></div></div><div className="chapter-story-body"><div className="chapter-story-intro"><SectionLabel>RECEIPTS IN THIS CHAPTER</SectionLabel><p>{chapter.pattern}</p></div><div className="chapter-receipt-list">{chapter.receipts.map((receipt, index) => <div className="chapter-receipt" key={`${receipt.title}-${receipt.detail}-${index}`}><IconTile icon={receipt.icon} tone={receipt.tone} size="sm" /><div><b>{receipt.title}</b><small>{receipt.detail}</small></div><ChevronRight size={14} /></div>)}</div><button className="modal-cta" onClick={onClose}>Close chapter <X size={14} /></button></div></div></div>;
}

function ChaptersView() {
  const [selectedChapter, setSelectedChapter] = useState<(typeof chapters)[number] | null>(null);
  return <div className="view-wrap"><div className="view-intro"><div><SectionLabel>YOUR LIFE, EDITED</SectionLabel><h1>Not months.<br /><em>Chapters.</em></h1><p>Some periods hold more meaning than others. These are the eras your receipts kept returning to.</p></div><button className="quiet-pill"><Plus size={14} /> New chapter note</button></div><div className="chapters-grid">{chapters.map((chapter, index) => <article className={`chapter-card tone-${chapter.tone}`} key={chapter.title}><div className="chapter-art"><div className="chapter-orbit" /><div className="chapter-lines" /><span className="chapter-index">{String(index + 4).padStart(2, "0")}</span><span className="chapter-count">{chapter.count}</span></div><div className="chapter-body"><SectionLabel>{chapter.eyebrow}</SectionLabel><h2>{chapter.title}</h2><p className="chapter-subtitle">{chapter.subtitle}</p><div className="chapter-rule" /><p className="chapter-pattern"><Sparkles size={14} /> {chapter.pattern}</p><button className="text-link" onClick={() => setSelectedChapter(chapter)}>Open chapter <ArrowUpRight size={14} /></button></div></article>)}</div><div className="chapter-bottom panel"><div><SectionLabel>THE NEXT CHAPTER</SectionLabel><h2>It’s still being written.</h2><p>Your latest 38 receipts are beginning to cluster around a new pattern.</p></div><div className="chapter-progress"><div className="progress-meta"><span>EMERGING SIGNAL</span><b>63%</b></div><div className="progress-track"><span /></div><small>Mostly music, late walks, and saved places.</small></div></div>{selectedChapter && <ChapterStoryCard chapter={selectedChapter} onClose={() => setSelectedChapter(null)} />}</div>;
}

function ExplorerView() {
  const [filter, setFilter] = useState("All listening");
  const [query, setQuery] = useState("");
  const explorerRows = useMemo(() => {
    const tracks = spotifySummary.topTracks.map((item, index) => ({ type: "track", icon: receiptIcons[index % receiptIcons.length], title: item.name, source: `${item.plays.toLocaleString()} plays · Spotify`, time: "TOP TRACK", date: `0${index + 1}`, color: receiptTones[index % receiptTones.length] }));
    const artists = spotifySummary.topArtists.map((item, index) => ({ type: "artist", icon: Headphones, title: item.name, source: `${item.plays.toLocaleString()} plays · ${item.tracks} tracks`, time: "TOP ARTIST", date: `0${index + 1}`, color: receiptTones[(index + 1) % receiptTones.length] }));
    const albums = spotifySummary.topAlbums.map((item, index) => ({ type: "album", icon: Disc3, title: item.name, source: `${item.plays.toLocaleString()} plays · Spotify`, time: "TOP ALBUM", date: `0${index + 1}`, color: receiptTones[(index + 2) % receiptTones.length] }));
    if (filter === "Tracks") return tracks;
    if (filter === "Artists") return artists;
    if (filter === "Albums") return albums;
    return [...receipts, ...tracks.slice(0, 4), ...artists.slice(0, 4), ...albums.slice(0, 4)];
  }, [filter]);
  const filtered = useMemo(() => explorerRows.filter((r) => `${r.title} ${r.source}`.toLowerCase().includes(query.toLowerCase())), [explorerRows, query]);
  return <div className="view-wrap explorer-view"><div className="view-intro compact-intro"><div><SectionLabel>RAW MATERIAL</SectionLabel><h1>Every receipt<br /><em>has a place.</em></h1></div><div className="explorer-count"><strong>{explorerRows.length.toLocaleString()}</strong><span>{filter === "All listening" ? "records indexed" : `${filter.toLowerCase()} indexed`}</span></div></div><div className="explorer-toolbar"><div className="search-field"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your archive..." />{query && <button onClick={() => setQuery("")}><X size={14} /></button>}</div><button className="filter-button"><Filter size={14} /> Filter <span>2</span></button></div><div className="filter-tabs">{explorerTypes.map((type) => <button key={type} className={filter === type ? "active" : ""} onClick={() => setFilter(type)}>{type}</button>)}</div><div className="explorer-list">{filtered.length === 0 ? <div className="empty-state panel"><Search size={22} /><h3>No receipts found</h3><p>Try another search term or widen your filter.</p></div> : filtered.map((receipt, index) => <button key={`${receipt.type}-${receipt.title}-${receipt.time}-${index}`} className="receipt-row panel"><IconTile icon={receipt.icon} tone={receipt.color} /><div className="receipt-main"><span className="receipt-type">{receipt.type.toUpperCase()}</span><b>{receipt.title}</b><small>{receipt.source}</small></div><div className="receipt-date"><b>{receipt.time}</b><span>{receipt.date}</span></div><div className="receipt-connection"><CircleDot size={12} /> 3 connections</div><ChevronRight size={15} /></button>)}</div></div>;
}

function MapView({ onSelectPlace }: { onSelectPlace: (place: (typeof augmentedSummary.places)[number]) => void }) {
  return <div className="view-wrap map-view"><div className="view-intro compact-intro"><div><SectionLabel>THE GEOGRAPHY OF YOU</SectionLabel><h1>Where it<br /><em>happened.</em></h1></div><div className="map-stats"><span><b>{augmentedSummary.validIndiaMerchantLocations}</b> valid signals</span><span><b>{augmentedSummary.regionCount}</b> regions</span></div></div><div className="full-map-panel panel"><MapPanel large onSelect={onSelectPlace} /><div className="map-side-list"><div className="side-list-head"><SectionLabel>TOP PLACES</SectionLabel><span>BY RECEIPT DENSITY</span></div>{augmentedSummary.places.map((place, index) => <button className="map-place-item" key={place.name} onClick={() => onSelectPlace(place)}><span className="place-rank">0{index + 1}</span><span className="map-place-color" style={{ background: place.color }} /><span><b>{place.name}</b><small>{place.transactions} transactions · {place.topCategory}</small></span><ArrowUpRight size={15} /></button>)}<div className="map-note"><Sparkles size={14} /><p><b>Pattern found</b><br />Click a glowing dot to reveal a place story with its image and aggregated transaction signals.</p></div></div></div></div>;
}

function DiscoveryModal({ onClose, onNavigate }: { onClose: () => void; onNavigate: (id: string) => void }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="discovery-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={17} /></button><div className="discovery-orb"><div className="orb-ring orb-ring-a" /><div className="orb-ring orb-ring-b" /><Sparkles size={23} /></div><SectionLabel>DISCOVERY 01 / 03</SectionLabel><h2>One night,<br /><em>five worlds.</em></h2><p>On May 24, music, place, photo, purchase, and event receipts all converged in Bandra — within a 2.6 km radius, across 5 hours.</p><div className="discovery-receipts">{receipts.slice(0, 5).map((receipt, index) => <div className="discovery-receipt" key={`${receipt.title}-${receipt.time}-${index}`}><IconTile icon={receipt.icon} tone={receipt.color} size="sm" /><span>{receipt.title}</span><b>{receipt.time}</b></div>)}</div><button className="modal-cta" onClick={() => { onClose(); onNavigate("threads"); }}>Follow this thread <ArrowUpRight size={15} /></button><button className="modal-skip" onClick={onClose}>Keep exploring</button></div></div>;
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("overview");
  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<(typeof augmentedSummary.places)[number] | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const activeItem = navItems.find((item) => item.id === activeNav) ?? navItems[0];
  const navigate = (id: string) => { setActiveNav(id); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><span /><span /><span /></div><span>LIFE<span>//</span>THREADS</span></div>
      <div className="sidebar-rule" />
      <div className="sidebar-section-title">THE ARCHIVE</div>
      <nav className="main-nav">{navItems.map(({ id, label, icon: Icon, count }) => <button key={id} className={activeNav === id ? "active" : ""} onClick={() => navigate(id)}><Icon size={16} strokeWidth={activeNav === id ? 2.2 : 1.7} /><span>{label}</span>{count && <small>{count}</small>}</button>)}</nav>
      <div className="sidebar-discovery"><div className="discovery-spark"><Sparkles size={14} /></div><span className="sidebar-section-title">A SMALL INVITATION</span><p>Find the thread you didn’t know was there.</p><button onClick={() => setDiscoveryOpen(true)}>Discover something <ArrowUpRight size={13} /></button></div>
      <div className="sidebar-bottom"><button className="profile-button"><div className="avatar">A</div><span><b>Arjun’s archive</b><small>Personal space</small></span><MoreHorizontal size={15} /></button><div className="sidebar-footer"><span>BUILD 01.24</span><span className="status-dot">● SYNCED</span></div></div>
    </aside>
    {mobileNav && <button aria-label="Close navigation" className="mobile-nav-scrim" onClick={() => setMobileNav(false)} />}
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20} /></button><div className="breadcrumbs"><span>ARCHIVE</span><ChevronRight size={13} /><b>{activeItem.label.toUpperCase()}</b></div><div className="topbar-actions"><button className="top-search" onClick={() => navigate("explorer")}><Search size={15} /><span>Search archive</span><kbd>⌘ K</kbd></button><button className="sync-button"><span className="sync-dot" /> Live sync</button><button className="top-icon"><PanelLeft size={16} /></button></div></header>
      <div className="page-content">
        {activeNav === "overview" && <Overview onDiscover={() => setDiscoveryOpen(true)} onNavigate={navigate} onSelectPlace={setSelectedPlace} />}
        {activeNav === "threads" && <ThreadsView onOpenDiscover={() => setDiscoveryOpen(true)} />}
        {activeNav === "chapters" && <ChaptersView />}
        {activeNav === "map" && <MapView onSelectPlace={setSelectedPlace} />}
        {activeNav === "explorer" && <ExplorerView />}
        {activeNav === "changes" && <Overview onDiscover={() => setDiscoveryOpen(true)} onNavigate={navigate} onSelectPlace={setSelectedPlace} />}
      </div>
      <footer className="page-footer"><span>© 2025 LIFE//THREADS</span><span>RECEIPTS → MOMENTS → STORIES</span><button onClick={() => setDiscoveryOpen(true)}>DISCOVER THE UNEXPECTED <ArrowUpRight size={13} /></button></footer>
    </main>
    {discoveryOpen && <DiscoveryModal onClose={() => setDiscoveryOpen(false)} onNavigate={navigate} />}
    {selectedPlace && <PlaceStoryCard place={selectedPlace} onClose={() => setSelectedPlace(null)} />}
  </div>;
}
