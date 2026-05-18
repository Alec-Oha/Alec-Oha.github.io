# Setup Guide — alecohanesian.com

This is a one-time setup. After this, publishing a new post is just:
1. Double-click `new-post.bat` → write → save
2. Double-click `publish.bat`
3. Site updates in ~60 seconds

---

## PART 1 — Install the tools (one time only)

### 1. Install Git
1. Go to https://git-scm.com/download/win
2. Download and run the installer
3. Click Next through everything — default options are fine
4. When done, open **Command Prompt** (search "cmd" in Start) and type:
   ```
   git --version
   ```
   You should see something like `git version 2.x.x`. If so, Git is installed.

### 2. Install Hugo
1. Go to https://github.com/gohugoio/hugo/releases/latest
2. Download the file named something like:
   `hugo_extended_X.XXX.X_windows-amd64.zip`
   (make sure it says **extended**)
3. Unzip it — you'll get a file called `hugo.exe`
4. Create a folder at `C:\Hugo\bin\` and put `hugo.exe` inside it
5. Add Hugo to your PATH:
   - Search "environment variables" in Start menu
   - Click "Edit the system environment variables"
   - Click "Environment Variables"
   - Under "System variables", find "Path" and double-click it
   - Click "New" and type: `C:\Hugo\bin`
   - Click OK on all windows
6. Open a **new** Command Prompt and type:
   ```
   hugo version
   ```
   You should see a version number. If so, Hugo is installed.

---

## PART 2 — Set up GitHub (one time only)

### 3. Create your GitHub repository
1. Go to https://github.com and log in
2. Click the **+** in the top right → **New repository**
3. Name it exactly: `alecohanesian.github.io`
   (replace `alecohanesian` with your actual GitHub username)
4. Set it to **Public**
5. Do NOT check "Add a README"
6. Click **Create repository**
7. Copy the URL shown — it will look like:
   `https://github.com/alecohanesian/alecohanesian.github.io.git`

### 4. Enable GitHub Pages
1. In your new repository, click **Settings**
2. In the left sidebar, click **Pages**
3. Under "Source", select **GitHub Actions**
4. Click Save

### 5. Upload your site files to GitHub
1. Open Command Prompt
2. Navigate to the folder where you unzipped the site files:
   ```
   cd C:\path\to\alecohanesian
   ```
   (replace with the actual path — e.g. `cd C:\Users\Alec\Desktop\alecohanesian`)
3. Run these commands one at a time:
   ```
   git init
   git add .
   git commit -m "initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/alecohanesian.github.io.git
   git push -u origin main
   ```
   (replace `YOUR_USERNAME` with your GitHub username)
4. GitHub will ask you to log in — use your GitHub username and password

### 6. Watch it deploy
1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see a workflow running — it takes about 60 seconds
4. When it shows a green checkmark, your site is live at:
   `https://alecohanesian.github.io`

---

## PART 3 — Connect your domain (one time only)

### 7. Configure Namecheap DNS
1. Log in to Namecheap
2. Go to **Domain List** → click **Manage** next to alecohanesian.com
3. Click the **Advanced DNS** tab
4. Delete any existing A records and CNAME records
5. Add these **4 A records**:
   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | A Record | @ | 185.199.108.153 | Automatic |
   | A Record | @ | 185.199.109.153 | Automatic |
   | A Record | @ | 185.199.110.153 | Automatic |
   | A Record | @ | 185.199.111.153 | Automatic |
6. Add this **CNAME record**:
   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | CNAME Record | www | alecohanesian.github.io. | Automatic |
7. Click the checkmark to save each record

### 8. Tell GitHub about your domain
1. Go to your repository → Settings → Pages
2. Under "Custom domain", type: `alecohanesian.com`
3. Click Save
4. Check "Enforce HTTPS" (may take a few minutes to appear)

DNS propagation takes up to 48 hours, but usually works within 1 hour.
Your site will then be live at **https://alecohanesian.com**

---

## PART 4 — Daily workflow (every time you write something)

### Writing a new book review or essay
1. Double-click `new-post.bat`
2. Choose `book-review` or `essay`
3. Fill in the prompts (title, author, rating, etc.)
4. Notepad opens with a pre-filled template — write your post
5. Save and close Notepad
6. Double-click `publish.bat`
7. Press Enter (or type a commit message)
8. Your site updates in ~60 seconds

### Adding a photo to a post
Any photo you want to use in a post:
1. Upload it somewhere accessible (Namecheap, Google Drive public link, etc.)
   OR drop it in the `static/images/` folder and reference it as `/images/photo.jpg`
2. In your markdown file, add: `![description](URL_or_path)`

---

## Folder structure reference

```
alecohanesian/
├── content/
│   └── posts/           ← YOUR WRITING LIVES HERE
│       ├── space-trilogy-review.md
│       ├── scanner-darkly-review.md
│       └── chronicles-of-amber-review.md
├── themes/alec/         ← site design (don't touch unless changing design)
├── static/
│   ├── css/             ← styles
│   ├── js/              ← particle animation
│   └── CNAME            ← custom domain config
├── hugo.toml            ← site settings
├── new-post.bat         ← run to create a new post
└── publish.bat          ← run to push to GitHub
```

---

## Markdown cheat sheet for posts

```markdown
# Big heading
## Medium heading
### Small heading

Regular paragraph text.

**bold text**
*italic text*

- Bullet point
- Another bullet

> This is a blockquote

![Image description](https://url-to-image.jpg)

[Link text](https://url.com)
```

The frontmatter at the top of each file (between the `---` lines) controls
what shows on the homepage listing. The `summary` field is the excerpt shown
on the homepage — keep it to 1-2 sentences.
