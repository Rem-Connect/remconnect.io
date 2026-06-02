export default function VideoWalkthrough() {
  return (
    <section className="lp-section tight" id="video" data-screen-label="Video walkthrough">
      <div style={{ maxWidth: '680px', margin: '0 auto 40px', textAlign: 'center' }}>
        <h2 className="lp-h2 reveal">How to register, in three minutes.</h2>
        <p className="lp-lede reveal d1" style={{ margin: '20px auto 0' }}>
          A quick walkthrough: uploading your resume, taking the assessment, and what happens after you apply.
        </p>
      </div>
      <div className="lp-video-wrap reveal" id="lpVideo" data-yt="_qiaxTnIarg">
        <img
          className="lp-video-thumb"
          src="https://img.youtube.com/vi/_qiaxTnIarg/maxresdefault.jpg"
          alt="How to register with RemConnect"
        />
        <div className="lp-video-shade" />
        <div className="lp-video-dur">3:12</div>
        <div className="lp-video-play">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--rc-amber-ink)">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="lp-video-meta">
          <div className="t">How to register with RemConnect</div>
          <div className="d">Step-by-step application guide</div>
        </div>
      </div>
    </section>
  )
}
