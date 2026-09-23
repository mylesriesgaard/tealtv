import { crew, videos, stats, type ShowLane, type Video } from './data'
import { useState } from 'react'

const ArrowUpRight = () => <span aria-hidden="true" className="arrow">↗</span>

function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) {
  return (
    <a className={`video-card ${featured ? 'video-card--featured' : ''}`} href={video.url} target="_blank" rel="noreferrer">
      <div className="video-card__image-wrap">
        <img src={video.image} alt="" className="video-card__image" />
        <span className="video-card__duration">{video.duration}</span>
      </div>
      <div className="video-card__details">
        <div className="eyebrow">{video.label}</div>
        <h3>{video.title}</h3>
        <p>{video.date}</p>
      </div>
    </a>
  )
}

function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const isActive = (path: string) => currentPath === path

  return (
    <nav className="site-nav">
      <a className="brand" href="/" aria-label="TealTV home"><span className="brand-word">TEAL<span>TV</span></span></a>
      <div className="nav-links">
        <a className={isActive('/archive') ? 'is-active' : ''} href="/archive">Archive</a>
        <a className={isActive('/seahawk-central') ? 'is-active' : ''} href="/seahawk-central">Seahawk Central</a>
        <a className={isActive('/hawkstream') ? 'is-active' : ''} href="/hawkstream">Hawkstream</a>
        <a className={isActive('/crew') ? 'is-active' : ''} href="/crew">Meet the crew</a>
        <a className={isActive('/get-involved') ? 'is-active' : ''} href="/get-involved">Get involved</a>
      </div>
      <a className="nav-cta" href="https://www.youtube.com/@TheUNCWTealTV" target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight /></a>
      <button className="menu-button" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>☰</button>
      {isMenuOpen && (
        <div className="mobile-menu">
          <a className={isActive('/archive') ? 'is-active' : ''} href="/archive" onClick={closeMenu}>Archive</a>
          <a className={isActive('/seahawk-central') ? 'is-active' : ''} href="/seahawk-central" onClick={closeMenu}>Seahawk Central</a>
          <a className={isActive('/hawkstream') ? 'is-active' : ''} href="/hawkstream" onClick={closeMenu}>Hawkstream</a>
          <a className={isActive('/crew') ? 'is-active' : ''} href="/crew" onClick={closeMenu}>Meet the crew</a>
          <a className={isActive('/get-involved') ? 'is-active' : ''} href="/get-involved" onClick={closeMenu}>Get involved</a>
          <a href="https://www.youtube.com/@TheUNCWTealTV" target="_blank" rel="noreferrer" onClick={closeMenu}>Watch on YouTube <ArrowUpRight /></a>
        </div>
      )}
    </nav>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-group">
        <a className="brand brand--footer" href="/"><span className="brand-word">TEAL<span>TV</span></span></a>
        <div className="footer-links">
        <a href="https://www.youtube.com/@TheUNCWTealTV" target="_blank" rel="noreferrer">YouTube</a>
        <a href="https://www.instagram.com/uncwtealtv" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
      <div className="footer-meta">Website designed by Myles Riesgaard.<br />© 2026 TealTV. All rights reserved.</div>
    </footer>
  )
}

function Lane({ name, description, laneVideos, accent }: { name: ShowLane; description: string; laneVideos: Video[]; accent: string }) {
  const path = name === 'Seahawk Central' ? '/seahawk-central' : '/hawkstream'

  return (
    <section className="lane">
      <div className="section-heading">
        <div>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <a href={path} className="text-link">View all <ArrowUpRight /></a>
      </div>
      <div className="lane-grid">
        {laneVideos.slice(0, 3).map((video) => <VideoCard key={video.title} video={video} />)}
      </div>
    </section>
  )
}

function SeriesPage({ name, description, laneVideos, accent }: { name: ShowLane; description: string; laneVideos: Video[]; accent: string }) {
  return (
    <main>
      <SiteNav />
      <header className="subpage-hero">
        <h1>{name}</h1>
        <p>{description}</p>
      </header>
      <section className="subpage-content">
        <div className="subpage-toolbar">
          <span>{laneVideos.length} episodes</span>
          <a href="/archive" className="text-link">Full archive <ArrowUpRight /></a>
        </div>
        <div className="archive-grid">{laneVideos.map((video) => <VideoCard key={video.title} video={video} />)}</div>
      </section>
      <SiteFooter />
    </main>
  )
}

function ArchivePage() {
  return (
    <main>
      <SiteNav />
      <header className="subpage-hero">
        <h1>Video archive</h1>
        <p>Here, you can find all of videos TealTV has produced, across all different shows.</p>
      </header>
      <section className="subpage-content">
        <div className="subpage-toolbar">
          <span>{videos.length} episodes</span>
          <a href="https://www.youtube.com/@TheUNCWTealTV" target="_blank" rel="noreferrer" className="text-link">YouTube channel <ArrowUpRight /></a>
        </div>
        <div className="archive-grid">{videos.map((video) => <VideoCard key={video.title} video={video} />)}</div>
      </section>
      <SiteFooter />
    </main>
  )
}

function CrewPage() {
  return (
    <main>
      <SiteNav />
      <header className="subpage-hero">
        <h1>Meet the crew</h1>
        <p>TealTV is only as good as the students that its made up of!</p>
      </header>
      <section className="subpage-content">
        <div className="crew-grid">
          {crew.map((member) => (
            <article className="crew-card" key={member.role}>
              <span>{member.number}</span>
              <div className="crew-card__portrait">
                {member.image ? <img src={member.image} alt={`${member.name}, ${member.role}`} /> : <><span className="crew-card__initial">T</span><span>TV</span></>}
              </div>
              <h2>{member.role}</h2>
              <p className="crew-card__name">{member.name}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}

function GetInvolvedPage() {
  return (
    <main>
      <SiteNav />
      <header className="subpage-hero">
        <h1>Get involved</h1>
        <p>Bring your perspective and help make our next story! There is a place for everyone even remotely interested in media at TealTV.</p>
      </header>
      <section className="subpage-content involvement-content">
        <div className="involvement-grid">
          <div>
            <h2>Show up.<br /><em>Make something!</em></h2>
            <p>Our weekly meetings are the best way to meet the crew, hear what is in production, and find a role that fits your interests. No experience required!</p>
          </div>
          <div className="meeting-cards">
            <div className="meeting-card">
              <h2>Seahawk Central Meeting</h2>
              <p className="meeting-card__placeholder">Mondays 5:00 PM / LEUTZE HALL 125</p>
              <p>Come help create the weekly news show!</p>
            </div>
            <div className="meeting-card">
              <h2>Hawkstream Meeting</h2>
              <p className="meeting-card__placeholder">THURSDAYS 6:15 PM / STUDENT MEDIA CENTER</p>
              <p>Come pitch your own idea for a video, or help produce one!</p>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}

function HomePage() {
  const featured = videos.find((video) => video.featured) ?? videos[0]
  const latest = videos.filter((video) => video !== featured)
  const seahawkVideos = videos.filter((video) => video.show === 'Seahawk Central')
  const hawkstreamVideos = videos.filter((video) => video.show === 'Hawkstream')

  return (
    <main>
      <SiteNav />
      <header className="hero">
        <div className="hero__copy">
          <h1>Teal<em>TV</em></h1>
          <p className="hero__intro"><strong>UNCW's  student broadcast network.</strong> Stories, voices, and ideas from the Port City; made by students, for everyone.</p>
          <a className="primary-button" href="#shows">Explore the shows <ArrowUpRight /></a>
        </div>
        <div className="hero__feature">
          <a className="hero__image-wrap" href={featured.url} target="_blank" rel="noreferrer" aria-label={`Watch ${featured.title}`}>
            <img src={featured.image} alt="" className="hero__image" />
          </a>
          <div className="hero__feature-copy">
            <span className="eyebrow">{featured.show} / {featured.label}</span>
            <h2>{featured.title}</h2>
            <a href={featured.url} target="_blank" rel="noreferrer" className="text-link">Watch episode <ArrowUpRight /></a>
          </div>
        </div>
      </header>

      <section className="content-section" id="shows">
        <div className="section-heading section-heading--latest">
          <div><h2>Latest drops</h2></div>
          <a href="/archive" className="text-link">See the archive <ArrowUpRight /></a>
        </div>
        <div className="latest-grid">{latest.slice(0, 3).map((video) => <VideoCard key={video.title} video={video} />)}</div>
      </section>

      <div className="dark-band">
        <Lane name="Seahawk Central" description="The news and sports desk for what’s happening on campus, downtown, and everywhere in between." laneVideos={seahawkVideos} accent="#d6ad55" />
        <Lane name="Hawkstream" description="A creative current of art, sketch, and entertainment videos, hosted and edited by students." laneVideos={hawkstreamVideos} accent="#8ddfd1" />
      </div>

      <section className="about-section" id="about">
        <div className="about-section__stamp">EST.<br /><strong>1999</strong><br />SBTV</div>
        <div className="about-section__copy">
          <h2>A training ground<br/>for <em>voices in media.</em></h2>
          <p>TealTV is UNCW’s only student-led media production organization. From scriptwriting to studio, we give students tools and audience to find their voice and make something worth watching.</p>
          <a href="/crew" className="text-link text-link--dark">Meet the crew <ArrowUpRight /></a>
        </div>
        <div className="stats">{stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
      </section>

      <section className="join-section" id="join">
        <div><h2>Got a story?<br /><em>Let’s make it!</em></h2></div>
        <div className="join-section__action"><p>Whether you’d rather be behind the camera, at the editing desk, or on screen, there’s a place for everyone at TealTV.</p><a className="primary-button primary-button--light" href="/get-involved">Get involved <ArrowUpRight /></a></div>
      </section>
      <SiteFooter />
    </main>
  )
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (path === '/seahawk-central') return <SeriesPage name="Seahawk Central" description="The news and sports desk for what’s happening on campus, downtown, and everywhere in between." laneVideos={videos.filter((video) => video.show === 'Seahawk Central')} accent="#d6ad55" />
  if (path === '/hawkstream') return <SeriesPage name="Hawkstream" description="A creative current of art, sketch, and entertainment videos, hosted and edited by students." laneVideos={videos.filter((video) => video.show === 'Hawkstream')} accent="#8ddfd1" />
  if (path === '/crew') return <CrewPage />
  if (path === '/get-involved') return <GetInvolvedPage />
  if (path === '/archive') return <ArchivePage />
  return <HomePage />
}
