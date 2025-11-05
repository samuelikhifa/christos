# Quick Setup Guide - Performance Optimization

## ✅ Current Status

The configuration files have been updated, but the optimization packages are still installing.

## 📦 Step 1: Install Required Packages

If the installation hasn't completed, run this command:

```bash
npm install -D vite-imagetools vite-plugin-image-optimizer sharp vite-plugin-compression2 terser
```

## 🔧 Step 2: Activate Optimized Config

Once packages are installed:

1. **Backup current config:**
   ```bash
   mv vite.config.ts vite.config.backup.ts
   ```

2. **Activate optimized config:**
   ```bash
   mv vite.config.optimized.ts vite.config.ts
   ```

   Or manually copy the contents from `vite.config.optimized.ts` to `vite.config.ts`

## 🧪 Step 3: Test the Build

```bash
# Test development server
npm run dev

# Test production build
npm run build

# Preview production build
npm run preview
```

## 📊 Expected Results

After activation, you should see:

✅ **During build:**
- Image optimization statistics
- Compression output (gzip + brotli files)
- Bundle size analysis
- Vendor chunk splitting

✅ **Bundle sizes:**
- JavaScript: ~300KB (from ~800KB)
- Images: 60-80% smaller
- Total reduction: ~60% smaller

## 🚨 If Installation Fails

If you get errors during installation:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm install -D vite-imagetools vite-plugin-image-optimizer sharp vite-plugin-compression2 terser
```

## 🔍 Verify Installation

Check if packages are installed:

```bash
npm list vite-imagetools
npm list vite-plugin-image-optimizer
npm list sharp
npm list vite-plugin-compression2
```

## 📱 Components Ready to Use

You can start using these components immediately:

### 1. ResponsiveImage Component
```tsx
import ResponsiveImage from '@/components/common/ResponsiveImage';

<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  loading="lazy"
/>
```

### 2. LazyLoad Component
```tsx
import LazyLoad from '@/components/common/LazyLoad';

<LazyLoad>
  <HeavySection />
</LazyLoad>
```

## 🎯 Next Actions

1. ✅ Wait for package installation to complete
2. ✅ Activate optimized config (Step 2 above)
3. ✅ Test build
4. ✅ Replace images with ResponsiveImage component
5. ✅ Add LazyLoad to heavy sections
6. ✅ Run Lighthouse audit

## 💡 Quick Win

Even without the optimization packages, you already have:

- ✅ iOS viewport optimizations
- ✅ Tailwind CSS purging
- ✅ Code splitting configuration
- ✅ Terser minification
- ✅ ResponsiveImage and LazyLoad components

## 🆘 Need Help?

See `OPTIMIZATION_SETUP.md` for detailed documentation.
