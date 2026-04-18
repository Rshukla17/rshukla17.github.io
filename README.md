# Rajan Shukla — Personal Portfolio

A single-page portfolio site built with plain HTML/CSS/JS — no build step, no frameworks, no dependencies. Just drop it on GitHub Pages and go.

## 📁 What's in this folder

```
portfolio/
├── index.html      # all page content
├── styles.css      # all styling
├── script.js       # scroll animations + counters
├── .nojekyll       # tells GitHub Pages to skip Jekyll processing
└── README.md       # this file
```

## 🚀 How to host on GitHub Pages (3 options)

### Option 1 — Use your existing `rshukla17.github.io` repo (easiest, recommended)

You already have a repo called **`rshukla17.github.io`** — any repo with that exact name is automatically served at `https://rshukla17.github.io`.

1. Go to your repo: https://github.com/Rshukla17/rshukla17.github.io
2. Click **Add file → Upload files**
3. Drag `index.html`, `styles.css`, `script.js`, and `.nojekyll` into the upload area
4. Scroll down, write a commit message like `Add portfolio site`, click **Commit changes**
5. Wait 1–2 minutes, then open **https://rshukla17.github.io** in your browser ✨

If you have old files in the repo, delete them first (or replace `index.html` with the new one).

### Option 2 — Terminal / Git workflow

```bash
# clone your repo
git clone https://github.com/Rshukla17/rshukla17.github.io.git
cd rshukla17.github.io

# copy the three files in here, then
git add .
git commit -m "Add portfolio site"
git push origin main
```

Live at **https://rshukla17.github.io** within ~2 minutes.

### Option 3 — A new project repo (custom path)

If you'd rather host it at a sub-path like `rshukla17.github.io/portfolio`:

1. Create a new repo, e.g. `portfolio`
2. Upload these files to the `main` branch
3. Go to **Settings → Pages**
4. Under "Build and deployment," set source to **Deploy from a branch** → `main` → `/ (root)` → **Save**
5. Live at **https://rshukla17.github.io/portfolio/** within a couple minutes

## ✏️ Things you might want to customize

| What | Where |
|---|---|
| Email, LinkedIn, GitHub, phone | `index.html` — search for the **Contact** section (`id="contact"`) |
| Project descriptions / links | `index.html` — `<section id="work">` |
| Research papers | `index.html` — `<section id="research">` |
| Experience bullets | `index.html` — `<section id="experience">` |
| Accent color (chartreuse) | `styles.css` — `--accent: #d4f458;` at the top |
| Background color | `styles.css` — `--bg: #0d0f10;` |
| Fonts | `index.html` — the Google Fonts `<link>`, and `styles.css` variables `--serif`, `--sans`, `--mono` |

## 🎨 Design notes

- **Typography**: Fraunces (display serif) + Inter Tight (body) + JetBrains Mono (code/labels). This pairing gives the site an editorial, almost-academic feel that suits research-heavy work.
- **Color**: Warm ivory text on a near-black background with a single chartreuse accent. The chartreuse is used sparingly — mostly for active states, accents, and the "currently" pulse.
- **Data-viz flourishes**: Each project card has a custom SVG visualization (confusion matrix, A/B distributions, DAG, clusters) that riffs on what the project is actually about.
- **Background**: Subtle SVG scatter plot + dotted grid + grain noise gives the page a printed-paper/notebook atmosphere.

## 🛠️ Local preview

No build needed. Just open `index.html` in your browser, or run a local server:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

---

Built with patience, coffee, and a lot of `git commit -m "fix"`.
