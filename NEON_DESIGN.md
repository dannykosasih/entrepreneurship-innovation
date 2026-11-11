# DDK Venture.exe — Neon Nights

Implements approved concept 5 as a working React/Vite dashboard and application
shell, not an embedded static HTML mockup. DDK gradient black → #14134B → #3533CA,
#FFDE59 accent, #0068BE badge on white; cyan/magenta are restrained decorative
neon accents. Poppins Bold headings, Inter body, IBM Plex Mono microcopy are
self-hosted. The font names in the supplied Canva token memo were a visual read,
not editor-confirmed. See public/neon/ASSET-LICENSES.md and font license texts.

All 15 source chapters, deck Drive IDs, quizzes, case content, simulator logic,
BMC presets/editor/export, wiki, resources, grade calculation, storage keys and
storage defaults are retained. The existing editors retain their legible light
working surfaces inside the new neon shell rather than blanket-inverting their
inline styles, charts, iframes or credential paper. The dashboard uses actual
App state instead of the old hard-coded streak/date/activity claims. Existing
seeded demo progress defaults in App are unchanged; stored browser data is not
reset or migrated.

Motion: slow sparkle/pulse/shimmer, never strobing. A visible Pause effects
button stops dashboard animations. prefers-reduced-motion disables animation,
transitions and smooth scrolling. Glows are decorative; foreground colors remain
readable without shadows. Text color pairs are checked against WCAG AA 4.5:1.
Semantic buttons, labels, aria-current navigation, a skip link, responsive menu,
focus outlines, image dimensions and illustrative alt text are included.

Verification:
- npm ci, npm run build, npm run lint (existing legacy warnings), npm test.
- Ten JSDOM regression tests: navigation/motion controls, saved progress and
  remount, chapter selection and exact Drive iframe URL, quiz submission and
  persisted score, simulator persisted output, BMC typed addition, case answer
  and completion state, persona/wiki/resources/grades/credential controls,
  local assets/motion CSS, and measured text contrast pairs.
- Source data and deployment/environment config files are untouched.
- Actual React SSR output rendered offline at desktop/mobile for visual review.
  These are not browser screenshots; JSDOM does not validate CSS layout.
- Real Chrome/Safari animation, reduced-motion preference, iframe access to
  private Drive decks, clipboard/download/print, screen-reader and production
  learner sessions require browser/manual testing. No claim of browser E2E.

No deployment or environment settings were changed. Production continues to use
its existing Google Cloud Build / Cloud Run integration.
