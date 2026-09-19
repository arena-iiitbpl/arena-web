import { BrandMark } from "@/components/brand-mark";
import { EsportHudVisual, SportMotionVisual } from "@/components/arena-visuals";
import { ArrowDown, ArrowUpRight, Users } from "@/components/icons";
import { MotionSystem } from "@/components/motion-system";
import Link from "next/link";

const events = [
  "Sporlumina 2026",
  "Athletics",
  "Badminton",
  "Basketball",
  "Cricket",
  "Football",
  "Kabaddi",
  "Volleyball",
  "Table Tennis",
  "Lawn Tennis",
  "Chess & Carrom",
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
          <a href="#sports">Disciplines</a>
          <Link href="/team">Team</Link>
        </nav>
        <Link className="nav-cta" href="/apply">
          <span>Sports Registration</span>
          <ArrowUpRight />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        
        <div className="scorebug" aria-label="Sporlumina registration status">
          <span className="live-dot" /> Sporlumina 2026 <b>REGISTRATION OPEN</b>
        </div>

        <div className="hero-copy">
          <span className="hero-kicker">Association for Recreation, Esports, and Athletics • Sporlumina 2026</span>
          <h1>
            <span>Build the game</span>
            <span><em>beyond</em> the game.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Register now for IIIT Bhopal&apos;s annual sports festival — Sporlumina 2026.
              Select your disciplines, represent your branch, and step into the arena.
            </p>
            <a className="circle-link" href="#manifesto" aria-label="View manifesto">
              <ArrowDown />
            </a>
          </div>
        </div>

        <div className="hero-ticker" aria-hidden="true">
          <div>SPORLUMINA 2026 <i /> 11 SPORTS DISCIPLINES <i /> PHYSICAL SPORT <i /> INDOOR GAMES <i /> BRANCH CHAMPIONSHIP <i /> SPORLUMINA 2026</div>
        </div>
      </section>

      {/* Stat Rail */}
      <section className="stat-rail" aria-label="Sporlumina registration configuration">
        <div data-reveal><strong>11</strong><small>Sports Disciplines</small></div>
        <div data-reveal><strong>01</strong><small>Simple Registration Form</small></div>
        <div data-reveal><strong>DIRECT</strong><small>Branch Representation</small></div>
      </section>

      {/* Manifesto: Two Arenas. One Standard. */}
      <section className="manifesto section" id="manifesto">
        <div className="section-heading reveal" data-reveal>
          <div>
            <span className="eyebrow"><b>01</b> The playing field</span>
            <h2>Two arenas.<br />One standard.</h2>
          </div>
          <p>
            Physical sport and competitive indoor games belong on equal ground. We build
            the systems, stories, schedules, and events for Sporlumina 2026.
          </p>
        </div>

        <div className="arena-split" data-reveal id="sports">
          <article className="arena-panel sport-panel">
            <span className="panel-number">01</span>
            <div className="field-lines" aria-hidden="true"><i /><i /><i /></div>
            <SportMotionVisual />
            <div className="panel-content">
              <span className="panel-tag">On field</span>
              <h3>PHYSICAL</h3>
              <p>Cricket, Football, Basketball, Volleyball, Athletics, Kabaddi, Lawn Tennis & Badminton.</p>
            </div>
          </article>

          <article className="arena-panel esports-panel">
            <span className="panel-number">02</span>
            <div className="hud-lines" aria-hidden="true"><i /><i /><i /></div>
            <EsportHudVisual />
            <div className="panel-content">
              <span className="panel-tag">Indoor Arena</span>
              <h3>INDOOR</h3>
              <p>Chess, Carrom, and Table Tennis tournaments played at peak concentration.</p>
            </div>
          </article>
        </div>

        <div className="event-strip" data-reveal>
          <span>Sporlumina 2026 Disciplines</span>
          <div>{events.map((event) => <b key={event}>{event}</b>)}</div>
        </div>
      </section>

      {/* Sports Registration CTA */}
      <section className="apply-section" data-reveal id="apply">
        <div className="apply-beam" aria-hidden="true" />
        <span className="eyebrow">SPORLUMINA 2026 • REGISTRATION OPEN</span>
        <h2>Register for<br /><em>Sporlumina 2026</em></h2>
        <p>
          Select one or multiple sports, enter your student details, and represent your branch in IIIT Bhopal&apos;s annual sports festival.
        </p>
        <Link className="apply-cta" href="/apply">
          <span>Open Registration Form</span>
          <ArrowUpRight />
        </Link>
        <small id="application-status">Multivalued sports selection • Writable branch entry • Direct confirmation receipt</small>
      </section>

      {/* Dedicated Meet The Team Section */}
      <section className="team-section" data-reveal id="team">
        <div className="team-container">
          <div className="team-badge">02 // OUR LEADERSHIP</div>
          <h2 className="team-heading">MEET THE <span>TEAM</span></h2>
          <p className="team-subtext">
            Meet the student coordinators, organizers, and council members driving A.R.E.N.A and Sporlumina 2026 at IIIT Bhopal.
          </p>
          <Link className="team-btn" href="/team">
            <Users style={{ width: "20px", height: "20px" }} />
            <span>Meet The Team</span>
            <ArrowUpRight style={{ width: "18px", height: "18px" }} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <BrandMark />
        <p>Association for Recreation, Esports, and Athletics<br />Indian Institute of Information Technology, Bhopal • By A.S.</p>
        <div><span>Sporlumina 2026</span><i /> <span>Physical</span><i /> <span>Indoor</span></div>
      </footer>
    </main>
  );
}
