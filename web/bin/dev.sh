#!/bin/bash
 
set -o errexit # Exit on error
 
npm run devserver &
npm run webpack