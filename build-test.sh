#!/bin/bash

# Script to simplify testing between development and production builds
set -e

# Define color codes for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display section headers
header() {
  echo -e "\n${BLUE}====== $1 ======${NC}\n"
}

# Function to run a command with formatted output
run_cmd() {
  echo -e "${YELLOW}Running:${NC} $1"
  eval $1
  echo -e "${GREEN}Done!${NC}"
}

# Display script information
header "Build Test Script"
echo "This script helps test and compare development and production builds."
echo "It provides a simple interface to switch between environments."

# Check if a specific mode is requested
if [ "$1" == "dev" ]; then
  header "Starting Development Server"
  echo "Running development server with HMR at http://localhost:3000"
  run_cmd "yarn dev"
  exit 0
elif [ "$1" == "prod" ]; then
  header "Building for Production"
  echo "Building for production and starting preview server at http://localhost:4173"
  run_cmd "yarn build:prod && yarn preview"
  exit 0
fi

# If no specific mode, show menu
header "Select Testing Mode"
echo "1) Development Server (with HMR)"
echo "2) Production Build Preview"
echo "3) Run Both (Development first, then Production)"
echo "4) Clean Builds and Run Both"
echo "5) Analyze Production Build"
echo "q) Quit"

read -p "Enter your choice: " choice

case $choice in
  1)
    header "Starting Development Server"
    echo "Running development server with HMR at http://localhost:3000"
    run_cmd "yarn dev"
    ;;
  2)
    header "Building for Production"
    echo "Building for production and starting preview server at http://localhost:4173"
    run_cmd "yarn build:prod && yarn preview"
    ;;
  3)
    header "Running Development Server First"
    echo "Press Ctrl+C when ready to try production build"
    run_cmd "yarn dev"
    
    header "Now Building for Production"
    echo "Building for production and starting preview server"
    run_cmd "yarn build:prod && yarn preview"
    ;;
  4)
    header "Cleaning Previous Builds"
    run_cmd "yarn clean:build"
    
    header "Running Development Server First"
    echo "Press Ctrl+C when ready to try production build"
    run_cmd "yarn dev"
    
    header "Now Building for Production"
    echo "Building for production and starting preview server"
    run_cmd "yarn build:prod && yarn preview"
    ;;
  5)
    header "Analyzing Production Build"
    echo "Building with bundle analyzer enabled"
    run_cmd "yarn build:analyze"
    ;;
  q|Q)
    echo -e "${GREEN}Exiting.${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Exiting.${NC}"
    exit 1
    ;;
esac
