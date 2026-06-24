// Webflow background-video hero. Video stays on the Webflow CDN (not bundled).
const BASE = 'https://cdn.prod.website-files.com/656cc3301afe859e486de65d/657f16ae465ed5c6e78582ef_pexels_videos_1908423%20%282160p%29'

export default function HeroVideo() {
  return (
    <div className="hero-video w-background-video w-background-video-atom">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={`${BASE}-poster-00001.jpg`}
        style={{ backgroundPosition: '50% 50%', objectFit: 'cover' }}
      >
        <source src={`${BASE}-transcode.mp4`} type="video/mp4" />
        <source src={`${BASE}-transcode.webm`} type="video/webm" />
      </video>
      <div className="hero-smallprint">*Enligt Leo &amp; Wilma</div>
    </div>
  )
}
