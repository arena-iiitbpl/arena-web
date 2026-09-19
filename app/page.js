import { BrandMark } from "@/components/brand-mark";
import { EsportHudVisual, SportMotionVisual } from "@/components/arena-visuals";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { MotionSystem } from "@/components/motion-system";
import Link from "next/link";

const events = [
  "Sporlumina",
  "Inter-IIIT Meets",
  "Inter-hostel Leagues",
  "IIIT Bhopal Open",
  "Online Esports League",
  "Sports Carnival",
];

export default function Home() {
  return (
    <main>
      <MotionSystem />

      {/* Site Header */}
      <header className="site-header">
        <a href="#top"><BrandMark /></a>
        <nav aria-label="Main navigation">
          <a href="#manifesto">Manifesto</a>
          <Link href="/team">Team</Link>
        </nav>
        <Link className="nav-cta" href="/apply">
          <span>Apply now</span>
          <ArrowUpRight />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        
        <div className="scorebug" aria-label="Recruitment status">
          <span className="live-dot" /> Registration <b>OPEN</b>
        </div>

        <div className="hero-copy">
          <span className="hero-kicker">Association for Recreation, Esports, and Athletics</span>
          <h1>
            <span>Build the game</span>
            <span><em>beyond</em> the game.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              We&apos;re assembling the operational crew behind IIIT Bhopal&apos;s sports,
              esports, events, media, and technology.
            </p>
            <a className="circle-link" href="#manifesto" aria-label="View manifesto">
              <ArrowDown />
            </a>
          </div>
        </div>

        <div className="hero-ticker" aria-hidden="true">
          <div>PHYSICAL SPORT <i /> COMPETITIVE ESPORTS <i /> OPERATIONS <i /> MEDIA <i /> TECHNOLOGY <i /> PHYSICAL SPORT <i /> COMPETITIVE ESPORTS <i /> RECREATION</div>
        </div>
      </section>

      {/* Stat Rail */}
      <section className="stat-rail" aria-label="Confirmed registration configuration">
        <div data-reveal><strong>NO</strong><small>account required</small></div>
        <div data-reveal><strong>01</strong><small>simple application form</small></div>
        <div data-reveal><strong>DIRECT</strong><small>updates by email or phone</small></div>
      </section>

      {/* Manifesto: Two Arenas. One Standard. */}
      <section className="manifesto section" id="manifesto">
        <div className="section-heading reveal" data-reveal>
          <div>
            <span className="eyebrow"><b>01</b> The playing field</span>
            <h2>Two arenas.<br />One standard.</h2>
          </div>
          <p>
            Physical sport and competitive esports belong on equal ground. We build
            the systems, stories, schedules, and teams that let both thrive.
          </p>
        </div>

        <div className="arena-split" data-reveal>
          <article className="arena-panel sport-panel">
            <span className="panel-number">01</span>
            <div className="field-lines" aria-hidden="true"><i /><i /><i /></div>
            <SportMotionVisual />
            <div className="panel-content">
              <span className="panel-tag">On field</span>
              <h3>SPORT</h3>
              <p>Leagues, trials, practice, wellbeing, and the pulse of live competition.</p>
            </div>
          </article>

          <article className="arena-panel esports-panel">
            <span className="panel-number">02</span>
            <div className="hud-lines" aria-hidden="true"><i /><i /><i /></div>
            <EsportHudVisual />
            <div className="panel-content">
              <span className="panel-tag">On server</span>
              <h3>ESPORT</h3>
              <p>Standing teams, structured practice, tournaments, and broadcast-ready play.</p>
            </div>
          </article>
        </div>

        <div className="event-strip" data-reveal>
          <span>Year one program</span>
          <div>{events.map((event) => <b key={event}>{event}</b>)}</div>
        </div>
      </section>

      {/* Apply Section CTA */}
      <section className="apply-section" data-reveal id="apply">
        <div className="apply-beam" aria-hidden="true" />
        <span className="eyebrow">Your call time is now</span>
        <h2>Step into<br />the <em>A.R.E.N.A.</em></h2>
        <p>
          Select your sports, share your details, and submit. No account, profile,
          password, or separate applicant portal.
        </p>
        <Link className="apply-cta" href="/apply">
          <span>Open application form</span>
          <ArrowUpRight />
        </Link>
        <small id="application-status">One form. Submit once. We will contact you with updates.</small>
      </section>

      {/* Footer */}
      <footer>
        <BrandMark />
        <p>Association for Recreation, Esports, and Athletics<br />Indian Institute of Information Technology, Bhopal • By A.S.</p>
        <div><span>Sports</span><i /> <span>Esports</span><i /> <span>Operations</span></div>
      </footer>
    </main>
  );
}
