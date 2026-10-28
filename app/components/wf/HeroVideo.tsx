// Webflow background-video hero, self-hosted so it survives the Webflow account.

export default function HeroVideo() {
  return (
    <div className="hero-video w-background-video w-background-video-atom">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/wf/video/hero-poster.jpg"
        style={{ backgroundPosition: '50% 50%', objectFit: 'cover' }}
      >
        <source src="/wf/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-smallprint">*Enligt Leo &amp; Wilma</div>
    </div>
  )
}
