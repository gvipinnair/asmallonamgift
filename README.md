# 🌸 Gowri Onam Surprise

A small interactive Onam webpage for Gowri.

## Files

- `index.html` — webpage structure
- `style.css` — design and animations
- `script.js` — scene transitions and interactions
- `assets/onam-music.mp3` — optional music file (you add this yourself)

## How to run

### On your computer

Open `index.html` in Chrome.

For best results, run a small local server:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

### Add music

Create the folder:

`assets`

Put your music file inside it with this exact name:

`onam-music.mp3`

Only use music you have permission to use.

## How to replace the emoji placeholders with AI anime assets

The current version is deliberately self-contained, so it works immediately.

You can later replace the emoji/illustrations with:
- AI-generated anime images
- short MP4 scene clips
- your own drawings

The easiest upgrade is to create 4 short MP4 clips:
1. door-opening scene
2. walking/cultural scene
3. hall/Athapookalam scene
4. final postcard scene

Then I can modify this website to play those clips seamlessly.

## Publishing

You do NOT need AWS.

Easy options:
- GitHub Pages
- Netlify
- Vercel

Upload these files and you get a public HTTPS link you can send to Gowri.

## Suggested final link

For example:

https://your-site.example/gowri

You can also connect a custom domain later.
