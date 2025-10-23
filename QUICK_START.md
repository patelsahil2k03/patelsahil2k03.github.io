# 🚀 QUICK START GUIDE - Modern Next.js Portfolio

## ⚡ Quick Setup (5 Minutes)

### Step 1: Prepare Your Environment
1. **Install Node.js** (if not installed): https://nodejs.org/ (v18+)
2. **Open PowerShell** in your project directory

### Step 2: Run Setup Script
```powershell
# Option A: Run the batch file (easiest)
.\setup-directories.bat

# Option B: Create directories manually
mkdir src\app, src\components\ui, src\components\sections, src\components\3d, src\lib, public\images\hero, public\images\projects, public\images\achievements, public\images\football, public\images\logos, public\models
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- React Three Fiber (for 3D)
- TypeScript
- And all necessary tools

### Step 4: Copy Core Files

I've created configuration files. Now you need to create the app structure files. Since they need to be in specific directories, follow this order:

#### 4a. Create `src/app/globals.css`
Open a text editor and create this file with the content from `FILES_TO_CREATE_PART1.md`

#### 4b. Create `src/app/layout.tsx`
Use the template from `FILES_TO_CREATE_PART1.md`

#### 4c. Create `src/app/page.tsx`
Use the template from `FILES_TO_CREATE_PART1.md`

#### 4d. Create utility files
- `src/lib/utils.ts`
- `src/data/personal.ts`
- `.eslintrc.json`

All templates are in the `FILES_TO_CREATE` markdown files.

### Step 5: Create Component Files

Follow `FILES_TO_CREATE_PART2.md` to create:
- `src/components/ui/Navigation.tsx`
- `src/components/sections/Hero.tsx`
- And other section components

---

## 🎯 Alternative: Automated Setup (Recommended)

Since manual file creation is tedious, I'll create **ONE comprehensive setup script** that does everything:

### Create `auto-setup.js` in your project root:

```javascript
const fs = require('fs');
const path = require('path');

// Create directory structure
const dirs = [
  'src/app',
  'src/components/ui',
  'src/components/sections',
  'src/components/3d',
  'src/lib',
  'src/data',
  'public/images/hero',
  'public/images/projects',
  'public/images/achievements',
  'public/images/football',
  'public/images/logos',
  'public/models'
];

console.log('Creating directory structure...');
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  }
});

// File contents
const files = {
  // ... (We'll populate this in the next message)
};

console.log('\nCreating files...');
Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(filepath, content);
  console.log(`✓ Created: ${filepath}`);
});

console.log('\n✓ Setup complete!');
console.log('\nNext steps:');
console.log('1. npm install');
console.log('2. npm run dev');
```

---

## 📝 What I've Done So Far

### ✅ Configuration Files Created
1. ✅ `next.config.js` - Next.js configuration for static export
2. ✅ `tsconfig.json` - TypeScript configuration
3. ✅ `tailwind.config.ts` - Tailwind CSS with custom theme
4. ✅ `postcss.config.js` - PostCSS configuration
5. ✅ `package.json` - Updated with all dependencies
6. ✅ `setup-directories.bat` - Batch script to create folders
7. ✅ `setup.ps1` - PowerShell setup script
8. ✅ `ISSUES.md` - Documentation of requirements and issues
9. ✅ `SETUP_GUIDE.md` - Detailed setup instructions

### 📋 What's Next

I need to create the actual source files, but due to directory constraints, I have two options:

**Option A: Manual Creation** (Current approach)
- Follow the `FILES_TO_CREATE_PART1.md` and `FILES_TO_CREATE_PART2.md`
- Copy-paste each file manually

**Option B: Automated Script** (Better approach)
- I create one Node.js script that generates all files
- You run it once: `node auto-setup.js`
- Everything is created automatically

---

## 🤔 Which Approach Would You Prefer?

**Tell me your preference:**

1. **"Continue with manual files"** - I'll create more `FILES_TO_CREATE_PARTX.md` files with all component code

2. **"Create auto-setup script"** - I'll create ONE `auto-setup.js` file that generates everything automatically

3. **"Let me run the existing scripts first"** - You'll run `setup-directories.bat` and `npm install`, then tell me if it works

---

## 🎨 Preview of What We're Building

```
Your Portfolio Will Include:
├── 🎯 Hero Section (with 3D football/data viz)
├── 👤 About (Your unique story: Footballer + Data Scientist)
├── 💼 Experience Timeline (Digiflux, L&T, Motorola)
├── 🛠️ Skills Grid (Bento-style layout)
├── 🚀 Projects Showcase (All your major projects)
├── 📚 Research Publications (2 published papers)
├── 🏆 Achievements (Awards, hackathons, certificates)
└── 📧 Contact Section
```

---

## ⚠️ Important Notes

1. **GitHub Pages Setup**: The `next.config.js` is configured for static export
2. **Deployment Branch**: Will deploy to `gh-pages` branch
3. **Base Path**: Currently set to root (adjust if needed)
4. **Images**: Add your photos to `public/images/` after setup
5. **3D Elements**: Will add in Phase 4 (after core is working)

---

## 🆘 Troubleshooting

**If setup fails:**
1. Check Node.js version: `node --version` (needs v18+)
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and run `npm install` again
4. Check for errors in terminal

**Need help?** Check:
- `ISSUES.md` for known issues
- `SETUP_GUIDE.md` for detailed instructions

---

**Ready to proceed?** Let me know which approach you'd like to take!
