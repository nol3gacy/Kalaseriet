'use client'

import Lottie from './wf/Lottie'

// Exact replica of the kalaseriet.se Webflow bento grid.
// Placement is driven by the w-node ids referenced in kalaseriet.webflow.css — keep them verbatim.

const PLUS_PATH =
  'M13.3836 25.1253C13.3586 24.2497 13.1084 23.6492 12.6331 23.324C12.1827 22.9737 11.4947 22.7861 10.569 22.7611L5.08989 22.4984C3.68884 22.3983 2.55048 21.9354 1.67482 21.1098C0.799158 20.2842 0.361328 19.2209 0.361328 17.9199C0.361328 16.669 0.76163 15.6307 1.56223 14.8051C2.38786 13.9544 3.56374 13.4791 5.08989 13.379L10.9443 13.1163C11.7449 13.0662 12.3454 12.8286 12.7457 12.4032C13.171 11.9529 13.3836 11.1648 13.3836 10.039L13.4212 5.57309C13.4962 1.99539 15.0224 0.206543 17.9996 0.206543C19.4757 0.206543 20.5891 0.619354 21.3396 1.44498C22.1152 2.2706 22.5656 3.60911 22.6907 5.4605L22.9909 10.7145C23.0409 11.7152 23.2661 12.3782 23.6664 12.7035C24.0917 13.0287 24.6797 13.2164 25.4302 13.2664H30.3089C32.1853 13.3415 33.5363 13.7668 34.362 14.5424C35.1876 15.3179 35.6004 16.4063 35.6004 17.8073C35.6004 19.2084 35.1626 20.3217 34.2869 21.1473C33.4113 21.9479 32.0102 22.4108 30.0837 22.5359H25.1675C24.467 22.5609 23.9416 22.7611 23.5913 23.1363C23.2411 23.4866 23.0409 24.1246 22.9909 25.0503L22.6907 30.6045C22.5906 32.3058 22.1528 33.6443 21.3772 34.62C20.6016 35.5707 19.4757 36.0461 17.9996 36.0461C15.0724 36.0461 13.5463 34.3073 13.4212 30.8296L13.3836 25.1253Z'

function Plus({ cls = '' }: { cls?: string }) {
  return (
    <div className={`bento-plus${cls ? ' ' + cls : ''}`}>
      <div className="icon is--bento w-embed">
        <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={PLUS_PATH} fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}

export default function BentoBox() {
  return (
    <section className="bento">
      <div id="w-node-_5c45588b-0eac-d457-3416-e88aa1e653b5-a1e653b4" className="w-layout-layout bento-grid wf-layout-layout">

        {/* 1 — 20 st kalaslekar (2x2, flip back) */}
        <div id="w-node-_5c45588b-0eac-d457-3416-e88aa1e653b6-a1e653b4" className="w-layout-cell bento-cell">
          <div className="bento-cell-front is--vertical">
            <div>
              <div className="text is--bold is-muffin">I varje nedladdning ingår</div>
              <h2 className="heading is--bento is--larger">20 st Kalaslekar &amp; aktiviteter</h2>
            </div>
            <div className="text is--bold is-muffin">Passar garanterat alla, ofta används 4-7 st under ett kalas</div>
            <Lottie className="birthday-banner-anim" src="/wf/documents/banner-01.json" />
            <Plus />
          </div>
          <div className="bento-cell-front is--back">
            <div className="text is--bold is--pink">I varje nedladdning ingår</div>
            <div className="text is--bold is--pink">Galna skattjakter, lugnare mysterier och allt däremellan</div>
            <Plus cls="is--back" />
          </div>
        </div>

        {/* 2 — Busenkelt att skriva ut (tall) */}
        <div id="w-node-_5c45588b-0eac-d457-3416-e88aa1e653bd-a1e653b4" className="w-layout-cell bento-cell">
          <div className="bento-cell-front is--printer">
            <h2 className="heading is--bento">Busenkelt att skriva ut hemma</h2>
            <div className="text is--bold is--printer">(Eller på jobbet)</div>
            <Plus cls="is--printer" />
          </div>
          <Lottie className="skrivare" src="/wf/documents/printer-02.json" />
        </div>

        {/* 3 — Skriv bara ut det du behöver (green + leaf) */}
        <div className="w-layout-cell bento-cell">
          <div className="bento-cell-front">
            <Plus />
            <h2 className="heading is--bento is--green is--shorter">Skriv bara ut det du behöver</h2>
            <div className="text is--green">Bättre för naturen!</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wf/images/leaf.png" loading="lazy" alt="" className="leaf" />
          </div>
        </div>

        {/* 4 — Inkluderande lekar (image spread) */}
        <div className="w-layout-cell bento-cell is--including">
          <div className="bento-cell-front is--spread">
            <h2 className="heading is--bento is--light">Inkluderande lekar</h2>
            <div className="text is--light">Alla vinner &amp; ingen blir utanför!</div>
            <Plus />
          </div>
        </div>

        {/* 5 — 20 st smarriga recept (muffin bg) */}
        <div id="w-node-_5c45588b-0eac-d457-3416-e88aa1e653df-a1e653b4" className="w-layout-cell bento-cell is--recept">
          <div className="bento-cell-front is--recepies">
            <h2 className="heading is--bento is--recipe">20 st smarriga recept</h2>
            <div className="bento-spacer" />
            <div className="text is--bold is-muffin">Vi har samlat barnen och testat de bästa recepten, garanterat gott!</div>
            <Plus />
            <div className="muffin-top" />
          </div>
        </div>

        {/* 6 — Festliga spellistor (soundwave) */}
        <div className="w-layout-cell bento-cell">
          <div className="bento-cell-front is--playlists">
            <h2 className="heading is--bento is--light">Festliga spellistor</h2>
            <Lottie className="sound-anim" src="/wf/documents/soundwave-01.json" />
            <div className="text is--bold is-playlist">Länk till skräddarsydda spellistor ingår</div>
            <Plus />
          </div>
        </div>

        {/* 7 — Dekorera mera! */}
        <div className="w-layout-cell">
          <div className="bento-cell-front is--dekorera">
            <h2 className="heading is--bento is-decoration">Dekorera mera!</h2>
            <div className="text is--bold is--pink">Tips på 5 st dekorationer som passar varje tema</div>
            <Plus />
          </div>
        </div>

        {/* 8 — Supersnygg inbjudan ingår */}
        <div className="w-layout-cell">
          <div className="bento-cell-front">
            <h2 className="heading is--bento is-decoration">Supersnygg inbjudan ingår</h2>
            <div className="text is--bold is--pink">Skriv ut och fyll i detaljer. Superenkelt &amp; snyggt!</div>
            <Plus />
          </div>
        </div>

        {/* 9 — 100% nöjdhets-garanti */}
        <div className="w-layout-cell">
          <div className="bento-cell-front is--100">
            <h2 className="heading is--bento is--light">100% nöjdhets-garanti</h2>
            <div className="text is--bold is--light">Inte nöjd? Pengarna tillbaka.</div>
            <Plus />
          </div>
        </div>

        {/* 10 — Checklistor & körschema (wide) */}
        <div id="w-node-_044c6808-3316-b199-52b7-adb96959b756-a1e653b4" className="w-layout-cell">
          <div className="bento-cell-front is--inkopslistor">
            <h2 className="heading is--bento is-shorter is--checklist">Checklistor &amp; körschema</h2>
            <div className="text is--bold is--pink">Checka av inför, under &amp; efter kalaset. Så att inget missas!</div>
            <div className="inkopslistor">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/wf/images/checklistad.png" loading="lazy" alt="" className="inkopslistor-img" />
            </div>
            <Plus />
          </div>
        </div>

      </div>
    </section>
  )
}
