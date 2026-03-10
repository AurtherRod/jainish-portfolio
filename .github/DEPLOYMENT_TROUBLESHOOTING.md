# GitHub Actions Deployment Troubleshooting

Common issues and solutions for CI/CD deployment.

---

## Workflow Not Running

### Issue: Workflow doesn't trigger on push

**Solutions:**
1. Check branch name matches workflow trigger
   ```yaml
   on:
     push:
       branches: [ main ]  # Must push to 'main'
   ```

2. Verify Actions are enabled
   - Settings → Actions → General
   - "Allow all actions and reusable workflows"

3. Check file path
   - Workflow must be in `.github/workflows/`
   - File must end with `.yml` or `.yaml`

4. Verify YAML syntax
   ```bash
   # Use online validator
   # https://www.yamllint.com/
   ```

---

## Tests Failing

### Issue: Frontend tests fail

**Check:**
```bash
# Run locally
npm test -- --watchAll=false --coverage

# Fix issues
# Commit and push
```

**Common causes:**
- Missing dependencies: `npm install`
- Syntax errors: Check console output
- Mock issues: Verify mock setup

### Issue: Backend tests fail

**Check:**
```bash
# Run locally
cd Backend && npm test

# Fix issues
# Commit and push
```

**Common causes:**
- MongoDB connection: Tests should skip MongoDB
- Missing dependencies: `npm install`
- Environment variables: Check jest.setup.js

---

## Build Failing

### Issue: Frontend build fails

**Check logs:**
1. Go to Actions tab
2. Click failed workflow
3. Click "build-frontend" job
4. View error messages

**Common causes:**
- Missing environment variables
- Syntax errors in code
- Missing dependencies

**Fix:**
```bash
# Build locally
npm run build

# Check for errors
# Fix and push
```

### Issue: Backend Docker build fails

**Check logs:**
1. Go to Actions tab
2. Click failed workflow
3. Click "build-backend" job
4. View error messages

**Common causes:**
- Dockerfile syntax error
- Missing files
- Invalid base image

**Fix:**
```bash
# Build locally
docker build -t portfolio-backend ./Backend

# Check for errors
# Fix Dockerfile
# Push
```

---

## Deployment Failing

### Issue: Vercel deployment fails

**Check:**
1. Vercel dashboard → Deployments
2. Click failed deployment
3. View build logs

**Common causes:**
- Missing VERCEL_TOKEN
- Wrong VERCEL_PROJECT_ID
- Build script error

**Fix:**
```bash
# Verify secrets
gh secret list | grep VERCEL

# Update if needed
gh secret set VERCEL_TOKEN --body "new-token"
```

### Issue: Railway deployment fails

**Check:**
1. Railway dashboard → Deployments
2. Click failed deployment
3. View logs

**Common causes:**
- Missing RAILWAY_TOKEN
- Wrong RAILWAY_PROJECT_ID
- Environment variables not set

**Fix:**
```bash
# Verify secrets
gh secret list | grep RAILWAY

# Set environment variables in Railway dashboard
```

### Issue: Netlify deployment fails

**Check:**
1. Netlify dashboard → Deploys
2. Click failed deploy
3. View deploy log

**Common causes:**
- Missing NETLIFY_AUTH_TOKEN
- Wrong NETLIFY_SITE_ID
- Build command error

**Fix:**
```bash
# Verify secrets
gh secret list | grep NETLIFY

# Update if needed
gh secret set NETLIFY_AUTH_TOKEN --body "new-token"
```

---

## Environment Variables

### Issue: Environment variables not set

**Check:**
1. Go to Settings → Secrets and variables → Actions
2. Verify all required secrets are present
3. Check secret names match workflow

**Required secrets:**
```
REACT_APP_API_URL
MONGODB_URI
JWT_SECRET
FRONTEND_URL
```

**Fix:**
```bash
# Add missing secret
gh secret set SECRET_NAME --body "value"

# Verify
gh secret list
```

### Issue: Wrong environment variable value

**Check:**
1. Go to Settings → Secrets and variables → Actions
2. Verify values are correct
3. Check for typos

**Fix:**
```bash
# Update secret
gh secret set SECRET_NAME --body "correct-value"

# Re-run workflow
gh run rerun <run-id>
```

---

## Docker Issues

### Issue: Docker image not building

**Check logs:**
1. Actions tab → build-backend job
2. View "Build and push Docker image" step

**Common causes:**
- Dockerfile syntax error
- Missing files in Backend directory
- Invalid base image

**Fix:**
```bash
# Build locally
docker build -t portfolio-backend ./Backend

# Check for errors
# Fix Dockerfile
# Push
```

### Issue: Docker image not pushing

**Check:**
1. Verify GitHub token has packages:write permission
2. Check registry login step

**Fix:**
```bash
# Verify token permissions
# Go to Settings → Developer settings → Personal access tokens
# Ensure 'write:packages' is enabled
```

---

## Secrets Issues

### Issue: Secrets not accessible in workflow

**Check:**
1. Verify secret exists: `gh secret list`
2. Check secret name in workflow matches exactly
3. Verify secret is not empty

**Fix:**
```bash
# List all secrets
gh secret list

# Add missing secret
gh secret set SECRET_NAME --body "value"

# Delete incorrect secret
gh secret delete WRONG_NAME
```

### Issue: Secret value contains special characters

**Problem:** Special characters may break YAML

**Solution:**
```bash
# Use quotes for special characters
gh secret set JWT_SECRET --body "your-secret-with-!@#$%"

# Verify it's set correctly
gh secret list
```

---

## Notification Issues

### Issue: Slack notifications not working

**Check:**
1. Verify SLACK_WEBHOOK_URL is set
2. Check webhook URL is valid
3. Verify Slack workspace permissions

**Fix:**
```bash
# Test webhook manually
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Test"}' \
  $SLACK_WEBHOOK_URL

# Update if needed
gh secret set SLACK_WEBHOOK_URL --body "new-webhook-url"
```

---

## Workflow Debugging

### View workflow runs
```bash
gh run list
```

### View specific run
```bash
gh run view <run-id>
```

### View run logs
```bash
gh run view <run-id> --log
```

### Re-run failed workflow
```bash
gh run rerun <run-id>
```

### Cancel running workflow
```bash
gh run cancel <run-id>
```

---

## Performance Issues

### Issue: Workflow takes too long

**Optimize:**
1. Use caching for dependencies
   ```yaml
   - uses: actions/setup-node@v3
     with:
       cache: 'npm'
   ```

2. Run jobs in parallel
   ```yaml
   jobs:
     test:
       runs-on: ubuntu-latest
     build:
       runs-on: ubuntu-latest
   ```

3. Skip unnecessary steps
   ```yaml
   if: secrets.VERCEL_TOKEN != ''
   ```

---

## Rollback

### Rollback to previous deployment

**Vercel:**
1. Vercel dashboard → Deployments
2. Click previous deployment
3. Click "Promote to Production"

**Railway:**
1. Railway dashboard → Deployments
2. Click previous deployment
3. Click "Redeploy"

**Netlify:**
1. Netlify dashboard → Deploys
2. Click previous deploy
3. Click "Publish deploy"

---

## Getting Help

### Check logs
1. Actions tab → Failed workflow
2. Click failed job
3. View error messages

### Check documentation
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Netlify Docs](https://docs.netlify.com)

### Debug locally
```bash
# Run tests
./run-tests.sh all

# Build frontend
npm run build

# Build backend
docker build -t portfolio-backend ./Backend
```

---

## Checklist

Before pushing to main:

- [ ] All tests pass locally
- [ ] Build succeeds locally
- [ ] Environment variables are set
- [ ] Secrets are configured
- [ ] Deployment platform is ready
- [ ] Database is accessible
- [ ] API URL is correct
- [ ] CORS is configured

---

## Summary

✅ Automated testing
✅ Automatic deployment
✅ Easy debugging
✅ Quick rollback

**Need help?** Check the logs first!
