# 🚀 Vercel Deployment Checklist

## Pre-Deployment Setup

### ✅ Environment Variables
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` in Vercel
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
- [ ] Set `NODE_ENV=production` in Vercel

### ✅ Database Setup
- [ ] Ensure Supabase database is running
- [ ] Verify `store_config` table exists
- [ ] Test database connections from local environment

### ✅ Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run type-check` - no TypeScript errors
- [ ] Test all functionality locally
- [ ] Remove any console.log statements (or they'll be auto-removed in production)

## Vercel Deployment Steps

### 1. Connect Repository
- [ ] Connect your GitHub repository to Vercel
- [ ] Select the main branch for deployment
- [ ] Set framework preset to "Next.js"

### 2. Configure Build Settings
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`
- [ ] Root Directory: `./` (if not in root)

### 3. Environment Variables
- [ ] Add all environment variables from `.env.local`
- [ ] Ensure `NODE_ENV=production` is set
- [ ] Verify Supabase credentials are correct

### 4. Deploy
- [ ] Click "Deploy" button
- [ ] Monitor build process
- [ ] Check for any build errors
- [ ] Verify deployment URL

## Post-Deployment Testing

### ✅ Functionality Tests
- [ ] Homepage loads correctly
- [ ] Booking modal opens and functions
- [ ] Admin panel is accessible
- [ ] Database connections work
- [ ] Time slot generation works
- [ ] Store configuration saves/loads

### ✅ Performance Tests
- [ ] Page load times are acceptable
- [ ] Images load properly
- [ ] No console errors in browser
- [ ] Mobile responsiveness works

### ✅ Security Tests
- [ ] Admin routes are protected
- [ ] No sensitive data exposed
- [ ] HTTPS is enforced
- [ ] Security headers are present

## Monitoring & Maintenance

### ✅ Analytics Setup
- [ ] Enable Vercel Analytics (optional)
- [ ] Set up error monitoring
- [ ] Configure performance monitoring

### ✅ Backup & Recovery
- [ ] Document deployment process
- [ ] Set up database backups
- [ ] Plan rollback strategy

## Troubleshooting Common Issues

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check for TypeScript compilation errors

### Runtime Errors
- Verify environment variables are set
- Check Supabase connection
- Review browser console for errors

### Performance Issues
- Optimize images and assets
- Check bundle size
- Monitor Core Web Vitals

## Success Criteria
- [ ] Application deploys without errors
- [ ] All functionality works as expected
- [ ] Performance meets requirements
- [ ] Security measures are in place
- [ ] Monitoring is configured

## 🎉 Ready for Production!
Once all items are checked, your application is ready for production use! 