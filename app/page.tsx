'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleUserRound,
  Globe2,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Send,
  X,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  kind: string
  category: 'Heritage' | 'Learning' | 'Play'
  price: number
  rating: string
  color: string
  art: 'horse' | 'dancer' | 'elephant' | 'wheel' | 'braille' | 'sign' | 'animals' | 'board'
  note: string
  waste: string
  material: string
  process: string
  quality: string
  description: string
}

const products: Product[] = [
  { id: 1, name: 'Ajanta Story Horse', kind: 'Heritage miniature', category: 'Heritage', price: 1290, rating: '4.9', color: 'terracotta', art: 'horse', note: 'Inspired by cave paintings', waste: '280 g', material: 'rPET + PLA', process: 'Sorted, washed, pelletised, then printed in our partner studio', quality: 'Grade A / child-safe', description: 'A hand-sized story horse that brings Ajanta-inspired movement into everyday play. Its rounded silhouette is easy to hold and built for years of imaginative adventures.' },
  { id: 2, name: 'Hampi Elephant', kind: 'Buildable landmark', category: 'Heritage', price: 1590, rating: '4.8', color: 'leaf', art: 'elephant', note: 'Temple city companion', waste: '340 g', material: 'Recycled HDPE', process: 'Melted into colour-rich filament and printed layer by layer', quality: 'Grade A / impact tested', description: 'A joyful Hampi-inspired companion with soft edges and a sturdy stance. Designed to make architecture, place, and play feel wonderfully close.' },
  { id: 3, name: 'Meri Pehli Braille', kind: 'Tactile learning game', category: 'Learning', price: 890, rating: '4.9', color: 'indigo', art: 'braille', note: 'Feel, learn, play', waste: '190 g', material: 'Recycled PLA', process: 'Precision printed with raised tactile cells for small hands', quality: 'Grade A / tactile tested', description: 'A bright first step into Braille, made for shared learning. Raised cells, high contrast, and satisfying pieces invite children and grown-ups to explore together.' },
  { id: 4, name: 'Bolti Ungliyaan', kind: 'Sign language tiles', category: 'Learning', price: 720, rating: '4.7', color: 'saffron', art: 'sign', note: 'Make every hello visible', waste: '160 g', material: 'Recycled ABS', process: 'Cut, softened, and assembled with accessible visual cues', quality: 'Grade A / rounded safe edges', description: 'A set of expressive hand tiles that gives every child another way to say hello, thank you, and I love you. Built for classrooms, families, and curious conversations.' },
  { id: 5, name: 'Lionphant', kind: 'Animal mashup', category: 'Play', price: 1190, rating: '5.0', color: 'saffron', art: 'animals', note: 'Your imagination, assembled', waste: '260 g', material: 'rPET + recycled PLA', process: 'Two colour streams fused into a one-off creature build', quality: 'Grade A / made-to-order', description: 'The creature that started with a what-if. Lion courage, elephant kindness, and a little bit of impossible — assembled into a collectible that belongs only to you.' },
  { id: 6, name: 'Konark Wheel Rally', kind: 'Strategy board game', category: 'Play', price: 1490, rating: '4.8', color: 'indigo', art: 'board', note: 'Race through sun and stone', waste: '410 g', material: 'Recycled HDPE', process: 'Printed board pieces and hand-finished game components', quality: 'Grade A / game-tested', description: 'A strategy game inspired by the Konark wheel, where players race through sun, stone, and clever choices. Made to be replayed, taught, and passed around.' },
]

const partOptions = ['Lion', 'Elephant', 'Peacock', 'Tiger']
const finishes = ['Mitti', 'Indigo', 'Haldi']

function Art({ type, color = 'terracotta' }: { type: Product['art']; color?: string }) {
  return (
    <div className={`product-art art-${type} tone-${color}`} aria-hidden="true">
      <span className="art-shadow" />
      {type === 'horse' && <><span className="horse-body" /><span className="horse-neck" /><span className="horse-head" /><span className="horse-leg leg-a" /><span className="horse-leg leg-b" /><span className="horse-tail" /></>}
      {type === 'elephant' && <><span className="ele-body" /><span className="ele-head" /><span className="ele-ear" /><span className="ele-trunk" /><span className="ele-leg ele-leg-a" /><span className="ele-leg ele-leg-b" /><span className="ele-dome" /></>}
      {type === 'dancer' && <><span className="dancer-head" /><span className="dancer-body" /><span className="dancer-skirt" /><span className="dancer-arm arm-a" /><span className="dancer-arm arm-b" /></>}
      {type === 'wheel' && <><span className="sun-wheel" /><span className="wheel-center" /><span className="wheel-ray ray-a" /><span className="wheel-ray ray-b" /><span className="wheel-ray ray-c" /><span className="wheel-ray ray-d" /></>}
      {type === 'braille' && <div className="braille-card"><span>● ●</span><span>●</span><span>● ●</span></div>}
      {type === 'sign' && <div className="sign-tile"><span className="sign-hand" /><small>HELLO</small></div>}
      {type === 'animals' && <><span className="mash-lion" /><span className="mash-ele" /><span className="mash-tail" /></>}
      {type === 'board' && <><span className="board-grid" /><span className="board-piece piece-a" /><span className="board-piece piece-b" /></>}
      <span className="art-spark spark-a">✦</span><span className="art-spark spark-b">✦</span>
    </div>
  )
}

function Metric({ number, label }: { number: string; label: string }) {
  return <div className="metric"><strong>{number}</strong><span>{label}</span></div>
}

function DesignHelper() {
  const [prompt, setPrompt] = useState('')
  const [reply, setReply] = useState('Tell me an animal, story, or feeling and I will turn it into a ReToy India build.')
  const [loading, setLoading] = useState(false)
  async function askHelper(event: React.FormEvent) {
    event.preventDefault()
    if (!prompt.trim()) return
    setLoading(true)
    try {
      const response = await fetch('/api/design-helper', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) })
      const data = await response.json()
      setReply(data.reply)
    } finally { setLoading(false) }
  }
  return <section className="helper-section section-pad" id="design-helper"><div className="helper-intro"><p className="eyebrow"><MessageCircle size={14} /> ReToy design guide</p><h2>Bring us a<br /><em>what if?</em></h2><p>Not sure where to begin? Share a creature, a memory, or a little challenge. Our design guide will suggest a playful build rooted in Indian stories and inclusive play.</p><div className="helper-prompts"><button type="button" onClick={() => setPrompt('A tiger that teaches children about the Sundarbans')}>Wildlife + learning</button><button type="button" onClick={() => setPrompt('A board game about the Konark wheel')}>History + game</button></div></div><div className="helper-card"><div className="helper-card-head"><span className="live-dot" /> DESIGN GUIDE <small>API CONNECTED</small></div><div className="helper-reply"><span className="helper-avatar"><Sparkles size={16} /></span><p>{reply}</p></div><form onSubmit={askHelper}><label htmlFor="design-prompt">Describe your idea</label><div className="helper-input"><input id="design-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="e.g. Lion + elephant for a 6 year old" /><button type="submit" aria-label="Ask design guide" disabled={loading}>{loading ? <span className="spinner" /> : <Send size={17} />}</button></div></form><small className="helper-foot">Suggestions are a starting point — every final build is reviewed by our makers.</small></div></section>
}

function ProductDetail({ product, related, onClose, onAdd, onSelect }: { product: Product; related: Product[]; onClose: () => void; onAdd: () => void; onSelect: (product: Product) => void }) {
  return <div className="detail-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><aside className="detail-drawer" role="dialog" aria-modal="true" aria-labelledby="detail-title"><button className="detail-close" onClick={onClose} aria-label="Close product details"><X /></button><div className="detail-art"><Art type={product.art} color={product.color} /></div><div className="detail-copy"><p className="eyebrow">{product.category} / {product.kind}</p><h2 id="detail-title">{product.name}</h2><p className="detail-note">{product.description}</p><div className="detail-story"><span>THE STORY</span><p>{product.note}. Designed in India, made for curious hands, and kept in the loop from first flake to final play.</p></div><div className="detail-price-row"><span><span className="star">★</span> {product.rating}</span><span className="made-to-order">Made thoughtfully to order</span></div><div className="detail-facts"><div><small>WASTE DIVERTED</small><strong>{product.waste}</strong><p>kept out of landfill for this build</p></div><div><small>MADE FROM</small><strong>{product.material}</strong><p>chosen for strength and a softer footprint</p></div><div><small>QUALITY</small><strong>{product.quality}</strong><p>checked by our makers before it leaves the studio</p></div></div><div className="detail-process"><small>MAKER NOTE</small><p>{product.process}.</p></div><button className="button button-dark detail-add" onClick={onAdd}>Add to your shelf <ShoppingBag size={16} /></button><div className="detail-suggestions"><div><p className="eyebrow">Pairs well with</p><h3>Keep the story going</h3></div><div className="detail-related">{related.map((item) => <button key={item.id} onClick={() => onSelect(item)}><Art type={item.art} color={item.color} /><span>{item.name}<small>Explore the story</small></span></button>)}</div></div></div></aside></div>
}

function AboutSection() {
  return <section className="about-section section-pad" id="about"><div className="about-photo about-photo-large"><Image src="/images/heritage-play.png" alt="A ReToy India heritage miniature inspired by Hampi architecture" fill sizes="(max-width: 900px) 100vw, 42vw" /><span>OBJECT / 04 — HISTORY IN HAND</span></div><div className="about-copy"><p className="eyebrow">About ReToy India</p><h2>Waste gets<br /><em>a new story.</em></h2><p>We are a circular design studio turning processed plastic into objects that help people look closer, feel more, and play together. Our toys carry India&apos;s histories forward without leaving the planet behind.</p><div className="about-points"><div><strong>What we make</strong><span>Heritage miniatures, animal mashups, braille games, sign-language tiles, and classroom play.</span></div><div><strong>How we work</strong><span>We collect, sort, reform, design, and print in a transparent loop with waste partners and makers.</span></div><div><strong>Why it matters</strong><span>Every build makes material value visible — and makes room for more curious, inclusive play.</span></div></div><a className="text-link" href="/our-loop">Trace the whole journey <ArrowRight size={15} /></a></div></section>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<Product[]>([])
  const [toast, setToast] = useState('')
  const [filter, setFilter] = useState('All')
  const [parts, setParts] = useState(['Lion', 'Elephant'])
  const [finish, setFinish] = useState('Mitti')
  const [customName, setCustomName] = useState('Lionphant')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setCartOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = useMemo(() => filter === 'All' ? products : products.filter((product) => product.category === filter), [filter])
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0)

  function addProduct(product: Product) {
    setCart((current) => [...current, product])
    setToast(`${product.name} added to your bag`)
  }

  function addCustom() {
    const custom: Product = { id: 99, name: customName || 'My ReToy India Build', kind: `${parts.join(' + ')} custom concept`, category: 'Play', price: 1790, rating: 'new', color: finish === 'Mitti' ? 'terracotta' : finish === 'Indigo' ? 'indigo' : 'saffron', art: 'animals', note: 'Made from your imagination', waste: '320 g', material: 'rPET + recycled PLA', process: 'Made to order from your selected parts and finish', quality: 'Grade A / maker reviewed', description: 'A one-of-one ReToy India creature designed around your choices, printed in small batches and finished with the personality you imagined.' }
    addProduct(custom)
  }

  function togglePart(part: string) { setParts((current) => current.includes(part) ? current.filter((item) => item !== part) : [...current, part]) }

  return (
    <main className="site-shell">
      <div className="announcement"><Sparkles size={15} /> Every ReToy India build begins with a second life. <a href="/our-loop">See our loop <ArrowRight size={13} /></a></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ReToy India home"><span className="brand-mark"><i /><i /><i /><i /></span><span>ReToy India<small>PLAY / REIMAGINED</small></span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#about">About</a><a href="#discover">Discover</a><a href="#shop">Shop</a><a href="#custom-lab">Custom Lab</a><a href="/our-loop">Our Loop</a></nav>
        <div className="header-actions"><button className="icon-button" aria-label="Search"><Search size={19} /></button><button className="icon-button account" aria-label="Account"><CircleUserRound size={19} /></button><button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cart.length} items`}><ShoppingBag size={18} /><span>{cart.length}</span></button><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button></div>
      </header>
      {menuOpen && <div className="mobile-nav"><button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button><a href="#discover" onClick={() => setMenuOpen(false)}>Discover</a><a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#custom-lab" onClick={() => setMenuOpen(false)}>Custom Lab</a><a href="/our-loop" onClick={() => setMenuOpen(false)}>Our Loop</a></div>}

      <section className="hero section-pad" id="top">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Circular toys, rooted in India</p><h1>Yesterday&apos;s plastic.<br /><em>Tomorrow&apos;s play.</em></h1><p className="hero-text">We turn processed plastic waste into joyful 3D toys, tactile games, and tiny stories from the subcontinent — made to be played with, passed on, and loved again.</p><div className="hero-actions"><a className="button button-dark" href="#shop">Shop the collection <ArrowRight size={17} /></a><a className="text-link" href="/our-loop">Follow the material <span>↘</span></a></div><div className="metrics"><Metric number="6.2k kg" label="plastic redirected" /><Metric number="18" label="stories in play" /><Metric number="100%" label="curious minds" /></div></div>
        <div className="hero-stage" aria-label="A 3D printed Indian stepwell toy scene"><div className="hero-temple-photo"><Image src="/images/heritage-play.png" alt="3D printed miniature inspired by Hampi temple architecture" fill sizes="(max-width: 900px) 100vw, 45vw" /><span>HISTORY, REBUILT</span></div><div className="stage-grid" /><div className="stepwell"><span /><span /><span /><span /><span /></div><div className="hero-toy"><span className="toy-ear" /><span className="toy-head" /><span className="toy-body" /><span className="toy-leg toy-leg-1" /><span className="toy-leg toy-leg-2" /><span className="toy-trunk" /></div><div className="spool spool-one"><i /><b>PLA</b></div><div className="spool spool-two"><i /><b>rPET</b></div><div className="stage-label label-one"><small>01 / PLAYFUL</small><strong>Built to wonder</strong></div><div className="stage-label label-two"><small>RECYCLED POLYMERS</small><strong>Made for a second life</strong></div></div>
      </section>

      <section className="loop-strip section-pad" id="our-loop"><div className="section-heading compact"><p className="eyebrow">Our material loop</p><h2>From waste<br /><em>to wonder.</em></h2><p className="loop-intro">A visible, traceable journey across people, places, and machines — because a toy feels better when you know where it began.</p><div className="loop-proof"><strong>4 stages</strong><span>one circular promise</span></div></div><div className="process-list">{[['01','Collected','Waste management partners help us gather what can play again.','collection'],['02','Cleaned','Sorted, washed, and prepared with care at our material partners.','cleaned'],['03','Filament','Reformed into strong, colorful 3D printing material.','filament'],['04','Play','Printed into objects that carry stories forward.','play']].map(([number,title,body,art]) => <div className="process-step" key={number}><div className={`process-art process-${art}`}>{art === 'collection' && <Image src="/images/waste-collection.png" alt="Plastic waste collection partners" fill sizes="220px" />} {art === 'cleaned' && <Image src="/images/material-lab.png" alt="Recycled plastic prepared in a material lab" fill sizes="220px" />} {art === 'filament' && <Image src="/images/material-lab.png" alt="Recycled filament being prepared" fill sizes="220px" />} {art === 'play' && <Image src="/images/print-studio.png" alt="A 3D printer creating a toy" fill sizes="220px" />}<div className="process-wash" /><span /></div><div><small>{number}</small><h3>{title}</h3><p>{body}</p></div></div>)}</div></section>

      <section className="shop-section section-pad" id="shop"><div className="section-heading shop-heading"><div><p className="eyebrow">The ReToy India shelf</p><h2>Good stories,<br /><em>great builds.</em></h2></div><a className="text-link" href="#custom-lab">Can&apos;t find yours? Build it <ArrowRight size={15} /></a></div><div className="filter-row" role="group" aria-label="Filter products">{['All','Heritage','Learning','Play'].map((item) => <button key={item} className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id} onClick={() => setSelectedProduct(product)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedProduct(product) }} tabIndex={0} role="button" aria-label={`View details for ${product.name}`}><div className="product-art-wrap"><span className="product-badge">{product.category}</span><button className="heart" aria-label={`Save ${product.name}`}><Heart size={17} /></button><Art type={product.art} color={product.color} /></div><div className="product-info"><div><p>{product.kind}</p><h3>{product.name}</h3></div><strong className="product-discover">View story</strong></div><div className="product-meta"><span><span className="star">★</span> {product.rating}</span><span>{product.note}</span><button className="quick-add" onClick={() => addProduct(product)} aria-label={`Add ${product.name} to cart`}><Plus size={17} /></button></div></article>)}</div></section>

      <section className="custom-section section-pad" id="custom-lab"><div className="custom-preview"><div className="preview-top"><span><span className="live-dot" /> LIVE BUILD</span><span>01 / 04</span></div><div className={`custom-toy finish-${finish.toLowerCase()}`}><span className="custom-mane" /><span className="custom-head" /><span className="custom-ear custom-ear-a" /><span className="custom-ear custom-ear-b" /><span className="custom-body" /><span className="custom-tusk" /><span className="custom-tail" /><span className="custom-leg custom-leg-a" /><span className="custom-leg custom-leg-b" /></div><div className="preview-caption"><span>YOUR CREATION</span><strong>{customName || 'Name your build'}</strong></div><div className="preview-floor" /></div><div className="custom-copy"><p className="eyebrow">ReToy India Custom Lab</p><h2>Imagine it.<br /><em>We print it.</em></h2><p>What happens when a lion meets an elephant? Or a peacock learns to roar? Pick your parts, name your creature, and make a little impossible possible.</p><fieldset><legend>Choose your parts</legend><div className="part-chips">{partOptions.map((part) => <button type="button" key={part} className={parts.includes(part) ? 'part-chip selected' : 'part-chip'} onClick={() => togglePart(part)}><span className={`part-icon ${part.toLowerCase()}`} />{part}{parts.includes(part) && <Check size={14} />}</button>)}</div></fieldset><fieldset><legend>Choose a finish</legend><div className="finish-chips">{finishes.map((item) => <button type="button" key={item} className={finish === item ? 'finish-chip selected' : 'finish-chip'} onClick={() => setFinish(item)}><span className={`swatch swatch-${item.toLowerCase()}`} />{item}</button>)}</div></fieldset><label className="name-label" htmlFor="build-name">Give it a name</label><input id="build-name" value={customName} onChange={(event) => setCustomName(event.target.value)} placeholder="e.g. The Jungle King" /><div className="custom-summary"><span><small>YOUR BUILD</small><strong>{parts.length ? parts.join(' + ') : 'Choose a part'}</strong></span><span><small>ESTIMATE</small><strong>₹1,790</strong></span></div><button className="button button-dark full" onClick={addCustom}>Add custom concept <ArrowRight size={17} /></button><p className="fine-print">A ReToy India maker will review your concept before we print it.</p></div></section>

      <AboutSection />

      <DesignHelper />

      <section className="heritage-section section-pad" id="discover"><div className="section-heading"><div><p className="eyebrow">Small objects, big histories</p><h2>Stories you can<br /><em>hold.</em></h2></div><p className="heading-note">Every miniature is an invitation to look closer — at the people, places, and ideas that shaped India.</p></div><div className="heritage-grid">{[['horse','Ajanta horse','A painted gallop from 2,000 years ago.'],['dancer','Chola bronze dancer','Movement captured in metal and memory.'],['elephant','Hampi elephant','A temple-city companion for curious hands.'],['wheel','Konark wheel','Time, carved into 24 spokes.']].map(([art,title,body]) => <article className="heritage-card" key={title}><Art type={art as Product['art']} color={art === 'wheel' ? 'saffron' : art === 'elephant' ? 'leaf' : 'terracotta'} /><div><small>HERITAGE SERIES</small><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>

      <section className="impact-section section-pad"><div className="impact-copy"><p className="eyebrow">See the loop in motion</p><h2>Not just a toy.<br /><em>A little proof.</em></h2><p>We believe the most powerful stories are the ones you can trace. From a discarded object to a new favorite, follow every material on its curious journey.</p><a className="text-link" href="/our-loop">Explore our process <ArrowRight size={15} /></a><div className="impact-stats"><div><strong>4</strong><span>steps to play</span></div><div><strong>24</strong><span>heritage spokes</span></div><div><strong>∞</strong><span>ways to imagine</span></div></div></div><div className="impact-panels"><div className="photo-panel collection-panel"><Image src="/images/waste-collection.png" alt="Processed plastic being sorted at a waste collection center" fill sizes="(max-width: 900px) 100vw, 40vw" /><span className="photo-stamp">FIELD NOTE / 01</span><div className="photo-overlay" /><div className="photo-copy"><b>Collection centre</b><small>Where second lives begin.</small></div></div><div className="photo-panel lab-panel"><Image src="/images/material-lab.png" alt="Recycled plastic flakes and filament spools in a material lab" fill sizes="(max-width: 900px) 50vw, 25vw" /><span className="photo-stamp">FIELD NOTE / 02</span><div className="photo-overlay" /><div className="photo-copy"><b>Material lab</b><small>Sorting colour from possibility.</small></div></div><div className="photo-panel print-panel"><Image src="/images/print-studio.png" alt="A 3D printer making a colorful elephant toy" fill sizes="(max-width: 900px) 50vw, 25vw" /><span className="photo-stamp">FIELD NOTE / 03</span><div className="photo-overlay" /><div className="photo-copy"><b>3D print studio</b><small>Layer by layer, wonder arrives.</small></div></div></div></section>

      <section className="inclusive-section section-pad"><div className="inclusive-art"><div className="inclusive-ring ring-one" /><div className="inclusive-ring ring-two" /><div className="braille-big"><span>⠿</span><span>⠋</span><span>⠊</span></div><div className="inclusive-tile">A<br /><small>EVERYONE<br />PLAYS</small></div></div><div className="inclusive-copy"><p className="eyebrow">Play for every mind</p><h2>Make room<br /><em>at the table.</em></h2><p>Our inclusive play collection is designed to be felt, seen, and shared — from tactile braille games to sign-language tiles that make connection part of the game.</p><div className="inclusive-links"><a href="#shop">Explore tactile play <ArrowRight size={15} /></a><a href="#shop">Discover sign language tiles <ArrowRight size={15} /></a></div></div></section>

      <section className="recommend-section section-pad"><div className="section-heading"><div><p className="eyebrow">One more for the shelf</p><h2>Choose your next<br /><em>build.</em></h2></div><div className="rail-arrows"><button aria-label="Previous recommendation"><ArrowRight className="flip" /></button><button aria-label="Next recommendation"><ArrowRight /></button></div></div><div className="recommend-rail">{products.slice(0, 4).map((product) => <button className="recommend-card" key={product.id} onClick={() => addProduct(product)}><Art type={product.art} color={product.color} /><span><small>{product.category}</small><strong>{product.name}</strong></span><Plus size={16} /></button>)}</div></section>

      <section className="final-cta section-pad"><div><p className="eyebrow">Have a story of your own?</p><h2>Let&apos;s make it<br /><em>playable.</em></h2><p>Custom commissions for classrooms, cultural spaces, thoughtful gifts, and ideas that deserve a physical form.</p><a className="button button-light" href="#custom-lab">Start a custom project <ArrowRight size={17} /></a></div><div className="cta-seal"><div>MADE<br /><span>TO</span><br />WONDER</div><small>PNRV / 2026</small></div></section>

      <footer className="site-footer"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><i /><i /><i /><i /></span><span>ReToy India<small>PLAY / REIMAGINED</small></span></a><p>Playful objects for a more circular future, made with Indian stories in mind.</p><div className="language"><Globe2 size={15} /> India / English <ChevronDown size={14} /></div></div><div className="footer-column"><small>SHOP</small><a href="#shop">All builds</a><a href="#shop">Heritage</a><a href="#shop">Learning</a><a href="#shop">Play</a></div><div className="footer-column"><small>ABOUT</small><a href="/our-loop">Our loop</a><a href="#discover">Our stories</a><a href="#custom-lab">Custom Lab</a><a href="#top">Journal</a></div><div className="footer-column"><small>HELP</small><a href="#top">Contact</a><a href="#top">Shipping & care</a><a href="#top">Accessibility</a><a href="#top">Material trace</a></div><div className="footer-bottom"><span>© 2026 ReToy India Studio. Made for curious hands.</span><span>Instagram · Pinterest · YouTube</span></div></footer>

      {selectedProduct && <ProductDetail product={selectedProduct} related={products.filter((item) => item.id !== selectedProduct.id).slice(0, 3)} onClose={() => setSelectedProduct(null)} onAdd={() => addProduct(selectedProduct)} onSelect={setSelectedProduct} />}
      {toast && <div className="toast" role="status" aria-live="polite"><Check size={17} />{toast}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping cart"><div className="drawer-head"><div><p className="eyebrow">Your ReToy India bag</p><h2>Ready to play?</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={32} /><p>Your bag is waiting for a good story.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Keep exploring</button></div> : <><div className="cart-items">{cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><Art type={item.art} color={item.color} /><div><strong>{item.name}</strong><small>{item.kind}</small><span>Material trace included</span></div><button aria-label={`Remove ${item.name}`} onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}><X size={15} /></button></div>)}</div><div className="cart-total"><span>Journey traced</span><strong>✓ Included</strong></div><button className="button button-dark full" disabled>Checkout preview <ArrowRight size={17} /></button><p className="fine-print">This is a concept checkout. No payment is collected.</p></>}</aside></div>}
    </main>
  )
}
