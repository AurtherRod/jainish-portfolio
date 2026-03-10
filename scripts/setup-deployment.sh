#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         GitHub Actions Deployment Setup                       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}\n"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}✗ GitHub CLI not found${NC}"
    echo "Install from: https://cli.github.com"
    exit 1
fi

echo -e "${GREEN}✓ GitHub CLI found${NC}\n"

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}✗ Not authenticated with GitHub${NC}"
    echo "Run: gh auth login"
    exit 1
fi

echo -e "${GREEN}✓ Authenticated with GitHub${NC}\n"

# Get repository
REPO=$(gh repo view --json nameWithOwner -q)
echo -e "${YELLOW}Repository: ${REPO}${NC}\n"

# Menu
echo -e "${YELLOW}Select deployment platform:${NC}"
echo "1) Vercel"
echo "2) Netlify"
echo "3) Railway"
echo "4) Render"
echo "5) Heroku"
echo "6) All of the above"
echo "0) Skip deployment setup"
read -p "Enter choice [0-6]: " choice

case $choice in
    1)
        echo -e "\n${YELLOW}=== Vercel Setup ===${NC}"
        read -p "Enter Vercel Token: " VERCEL_TOKEN
        read -p "Enter Vercel Org ID: " VERCEL_ORG_ID
        read -p "Enter Vercel Project ID: " VERCEL_PROJECT_ID
        
        gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
        gh secret set VERCEL_ORG_ID --body "$VERCEL_ORG_ID"
        gh secret set VERCEL_PROJECT_ID --body "$VERCEL_PROJECT_ID"
        
        echo -e "${GREEN}✓ Vercel secrets configured${NC}"
        ;;
    2)
        echo -e "\n${YELLOW}=== Netlify Setup ===${NC}"
        read -p "Enter Netlify Auth Token: " NETLIFY_AUTH_TOKEN
        read -p "Enter Netlify Site ID: " NETLIFY_SITE_ID
        
        gh secret set NETLIFY_AUTH_TOKEN --body "$NETLIFY_AUTH_TOKEN"
        gh secret set NETLIFY_SITE_ID --body "$NETLIFY_SITE_ID"
        
        echo -e "${GREEN}✓ Netlify secrets configured${NC}"
        ;;
    3)
        echo -e "\n${YELLOW}=== Railway Setup ===${NC}"
        read -p "Enter Railway Token: " RAILWAY_TOKEN
        read -p "Enter Railway Project ID: " RAILWAY_PROJECT_ID
        read -p "Enter Railway Service ID: " RAILWAY_SERVICE_ID
        
        gh secret set RAILWAY_TOKEN --body "$RAILWAY_TOKEN"
        gh secret set RAILWAY_PROJECT_ID --body "$RAILWAY_PROJECT_ID"
        gh secret set RAILWAY_SERVICE_ID --body "$RAILWAY_SERVICE_ID"
        
        echo -e "${GREEN}✓ Railway secrets configured${NC}"
        ;;
    4)
        echo -e "\n${YELLOW}=== Render Setup ===${NC}"
        read -p "Enter Render Service ID: " RENDER_SERVICE_ID
        read -p "Enter Render Deploy Key: " RENDER_DEPLOY_KEY
        
        gh secret set RENDER_SERVICE_ID --body "$RENDER_SERVICE_ID"
        gh secret set RENDER_DEPLOY_KEY --body "$RENDER_DEPLOY_KEY"
        
        echo -e "${GREEN}✓ Render secrets configured${NC}"
        ;;
    5)
        echo -e "\n${YELLOW}=== Heroku Setup ===${NC}"
        read -p "Enter Heroku API Key: " HEROKU_API_KEY
        read -p "Enter Heroku App Name: " HEROKU_APP_NAME
        read -p "Enter Heroku Email: " HEROKU_EMAIL
        
        gh secret set HEROKU_API_KEY --body "$HEROKU_API_KEY"
        gh secret set HEROKU_APP_NAME --body "$HEROKU_APP_NAME"
        gh secret set HEROKU_EMAIL --body "$HEROKU_EMAIL"
        
        echo -e "${GREEN}✓ Heroku secrets configured${NC}"
        ;;
    6)
        echo -e "\n${YELLOW}=== Setting up all platforms ===${NC}"
        
        read -p "Enter Vercel Token: " VERCEL_TOKEN
        read -p "Enter Vercel Org ID: " VERCEL_ORG_ID
        read -p "Enter Vercel Project ID: " VERCEL_PROJECT_ID
        gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
        gh secret set VERCEL_ORG_ID --body "$VERCEL_ORG_ID"
        gh secret set VERCEL_PROJECT_ID --body "$VERCEL_PROJECT_ID"
        echo -e "${GREEN}✓ Vercel configured${NC}"
        
        read -p "Enter Netlify Auth Token: " NETLIFY_AUTH_TOKEN
        read -p "Enter Netlify Site ID: " NETLIFY_SITE_ID
        gh secret set NETLIFY_AUTH_TOKEN --body "$NETLIFY_AUTH_TOKEN"
        gh secret set NETLIFY_SITE_ID --body "$NETLIFY_SITE_ID"
        echo -e "${GREEN}✓ Netlify configured${NC}"
        
        read -p "Enter Railway Token: " RAILWAY_TOKEN
        read -p "Enter Railway Project ID: " RAILWAY_PROJECT_ID
        read -p "Enter Railway Service ID: " RAILWAY_SERVICE_ID
        gh secret set RAILWAY_TOKEN --body "$RAILWAY_TOKEN"
        gh secret set RAILWAY_PROJECT_ID --body "$RAILWAY_PROJECT_ID"
        gh secret set RAILWAY_SERVICE_ID --body "$RAILWAY_SERVICE_ID"
        echo -e "${GREEN}✓ Railway configured${NC}"
        
        read -p "Enter Render Service ID: " RENDER_SERVICE_ID
        read -p "Enter Render Deploy Key: " RENDER_DEPLOY_KEY
        gh secret set RENDER_SERVICE_ID --body "$RENDER_SERVICE_ID"
        gh secret set RENDER_DEPLOY_KEY --body "$RENDER_DEPLOY_KEY"
        echo -e "${GREEN}✓ Render configured${NC}"
        
        read -p "Enter Heroku API Key: " HEROKU_API_KEY
        read -p "Enter Heroku App Name: " HEROKU_APP_NAME
        read -p "Enter Heroku Email: " HEROKU_EMAIL
        gh secret set HEROKU_API_KEY --body "$HEROKU_API_KEY"
        gh secret set HEROKU_APP_NAME --body "$HEROKU_APP_NAME"
        gh secret set HEROKU_EMAIL --body "$HEROKU_EMAIL"
        echo -e "${GREEN}✓ Heroku configured${NC}"
        ;;
    0)
        echo -e "${YELLOW}Skipping deployment setup${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

# Common secrets
echo -e "\n${YELLOW}=== Common Configuration ===${NC}"
read -p "Enter Frontend API URL (e.g., https://api.example.com): " REACT_APP_API_URL
read -p "Enter MongoDB URI: " MONGODB_URI
read -p "Enter JWT Secret: " JWT_SECRET
read -p "Enter Frontend URL (e.g., https://example.com): " FRONTEND_URL

gh secret set REACT_APP_API_URL --body "$REACT_APP_API_URL"
gh secret set MONGODB_URI --body "$MONGODB_URI"
gh secret set JWT_SECRET --body "$JWT_SECRET"
gh secret set FRONTEND_URL --body "$FRONTEND_URL"

echo -e "${GREEN}✓ Common secrets configured${NC}"

# Optional: Slack notifications
read -p "Configure Slack notifications? (y/n): " slack_choice
if [ "$slack_choice" = "y" ]; then
    read -p "Enter Slack Webhook URL: " SLACK_WEBHOOK_URL
    gh secret set SLACK_WEBHOOK_URL --body "$SLACK_WEBHOOK_URL"
    echo -e "${GREEN}✓ Slack notifications configured${NC}"
fi

echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         Setup Complete!                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${YELLOW}Next steps:${NC}"
echo "1. Push to main branch: git push origin main"
echo "2. Check Actions tab for deployment status"
echo "3. View logs if any issues occur"
echo ""
echo -e "${YELLOW}View secrets:${NC}"
echo "gh secret list"
echo ""
echo -e "${YELLOW}Documentation:${NC}"
echo "See DEPLOYMENT.md for detailed information"
