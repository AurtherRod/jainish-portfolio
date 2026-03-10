#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Full Stack Testing Suite ===${NC}\n"

# Check if running specific test or all tests
TEST_TYPE=${1:-all}

# Frontend Tests
run_frontend_tests() {
  echo -e "${YELLOW}Running Frontend Tests...${NC}\n"
  
  if CI=true npm test -- --coverage --watchAll=false; then
    echo -e "${GREEN}✓ Frontend tests passed${NC}\n"
    return 0
  else
    echo -e "${RED}✗ Frontend tests failed${NC}\n"
    return 1
  fi
}

# Backend Tests
run_backend_tests() {
  echo -e "${YELLOW}Running Backend Tests...${NC}\n"
  
  cd Backend
  
  if npm test; then
    echo -e "${GREEN}✓ Backend tests passed${NC}\n"
    cd ..
    return 0
  else
    echo -e "${RED}✗ Backend tests failed${NC}\n"
    cd ..
    return 1
  fi
}

# Run tests based on argument
case $TEST_TYPE in
  frontend)
    run_frontend_tests
    ;;
  backend)
    run_backend_tests
    ;;
  all)
    run_frontend_tests
    FRONTEND_RESULT=$?
    
    run_backend_tests
    BACKEND_RESULT=$?
    
    echo -e "${YELLOW}=== Test Summary ===${NC}\n"
    
    if [ $FRONTEND_RESULT -eq 0 ]; then
      echo -e "${GREEN}✓ Frontend: PASSED${NC}"
    else
      echo -e "${RED}✗ Frontend: FAILED${NC}"
    fi
    
    if [ $BACKEND_RESULT -eq 0 ]; then
      echo -e "${GREEN}✓ Backend: PASSED${NC}"
    else
      echo -e "${RED}✗ Backend: FAILED${NC}"
    fi
    
    if [ $FRONTEND_RESULT -eq 0 ] && [ $BACKEND_RESULT -eq 0 ]; then
      echo -e "\n${GREEN}All tests passed!${NC}\n"
      exit 0
    else
      echo -e "\n${RED}Some tests failed!${NC}\n"
      exit 1
    fi
    ;;
  coverage)
    echo -e "${YELLOW}Generating Coverage Reports...${NC}\n"
    
    echo -e "${YELLOW}Frontend Coverage:${NC}"
    CI=true npm test -- --coverage --watchAll=false
    
    echo -e "\n${YELLOW}Backend Coverage:${NC}"
    cd Backend
    npm run test:coverage
    cd ..
    ;;
  watch)
    echo -e "${YELLOW}Running tests in watch mode...${NC}\n"
    npm test
    ;;
  *)
    echo "Usage: ./run-tests.sh [frontend|backend|all|coverage|watch]"
    echo ""
    echo "Options:"
    echo "  frontend  - Run only frontend tests"
    echo "  backend   - Run only backend tests"
    echo "  all       - Run all tests (default)"
    echo "  coverage  - Generate coverage reports"
    echo "  watch     - Run tests in watch mode"
    exit 1
    ;;
esac
