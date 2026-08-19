# PowerShell script to commit all Phase 2 changes

Write-Host "`n🚀 Phase 2 Commit Script`n" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Not a git repository. Run 'git init' first." -ForegroundColor Red
    exit 1
}

Write-Host "📊 Current Git Status:`n" -ForegroundColor Yellow
git status --short

Write-Host "`n" 
$confirm = Read-Host "Do you want to commit all Phase 2 changes? (y/n)"

if ($confirm -ne 'y') {
    Write-Host "`n❌ Commit cancelled." -ForegroundColor Red
    exit 0
}

Write-Host "`n📝 Starting commits...`n" -ForegroundColor Green

# Commit 1: New component structure
Write-Host "1️⃣ Committing new components..." -ForegroundColor Cyan
git add src/components/
git add src/app/
git add src/lib/
git commit -m "feat: Add modern Next.js component architecture

- Implement 5 UI components (Button, Badge, Card, Navigation, Timeline)
- Create 5 section components (Hero, About, Experience, Skills, Projects)
- Add responsive design with Tailwind CSS
- Implement smooth scrolling and mobile menu
- Add interactive filtering for Skills, Projects, and Experience

Phase 2: 77% complete"

# Commit 2: Data layer
Write-Host "2️⃣ Committing data layer..." -ForegroundColor Cyan
git add src/data/
git commit -m "feat: Create comprehensive data layer

- Add personal information and bio
- Include all 5 professional experiences
- Organize 50+ skills by category
- Detail 6 major projects with metrics
- Document 20+ achievements
- Add testimonials and quotes from LinkedIn

All content centralized and type-safe"

# Commit 3: Configuration
Write-Host "3️⃣ Committing configuration..." -ForegroundColor Cyan
git add next.config.js postcss.config.js tailwind.config.ts tsconfig.json
git add .eslintrc.json .gitignore .gitattributes
git add package.json package-lock.json
git commit -m "config: Update project configuration for Next.js 14

- Configure static export for GitHub Pages
- Add custom color palette to Tailwind
- Update TypeScript configuration
- Configure ESLint rules
- Update .gitignore for Next.js structure"

# Commit 4: Documentation
Write-Host "4️⃣ Committing documentation..." -ForegroundColor Cyan
git add *.md
git commit -m "docs: Add comprehensive project documentation

- PROGRESS.md - Development progress tracker
- BUILD_SUCCESS.md - Build instructions and results
- PHASE2_COMPLETE.md - Phase 2 detailed summary
- MIGRATION_PLAN.md - Complete development roadmap
- COMMIT_GUIDE.md - Git workflow guide
- README_NEW.md - Updated project overview"

# Commit 5: Public assets
Write-Host "5️⃣ Committing public assets..." -ForegroundColor Cyan
git add public/.nojekyll
git commit -m "chore: Add .nojekyll for GitHub Pages compatibility"

# Commit 6: Setup scripts (optional)
Write-Host "6️⃣ Committing setup scripts..." -ForegroundColor Cyan
git add setup.ps1 setup-directories.bat auto-setup.js create-components.js
git commit -m "chore: Add setup and automation scripts"

Write-Host "`n✅ All commits complete!`n" -ForegroundColor Green

# Show final status
Write-Host "📊 Final Git Status:`n" -ForegroundColor Yellow
git status

Write-Host "`n🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Review commits: git log --oneline -6" -ForegroundColor White
Write-Host "  2. Push to GitHub: git push origin main" -ForegroundColor White
Write-Host "  3. Deploy site: npm run deploy" -ForegroundColor White
Write-Host ""
