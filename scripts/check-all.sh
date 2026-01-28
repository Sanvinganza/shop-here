#!/bin/bash
# check-all.sh

echo "🚀 Starting complete check..."

# 1. Check dev server
echo "1. Testing dev server..."
npm run dev > /dev/null 2>&1 &
DEV_PID=$!
sleep 5
if curl -s http://localhost:3000 | grep -q "Project Clone"; then
  echo "✅ Dev server: PASS"
else
  echo "❌ Dev server: FAIL"
fi
kill $DEV_PID 2>/dev/null

# 2. Check TypeScript
echo "2. Checking TypeScript..."
if npx tsc --noEmit --skipLibCheck; then
  echo "✅ TypeScript: PASS"
else
  echo "❌ TypeScript: FAIL"
fi

# 3. Run tests
echo "3. Running tests..."
if npm run test:run 2>/dev/null; then
  echo "✅ Tests: PASS"
else
  echo "❌ Tests: FAIL"
fi

# 4. Check build
echo "4. Checking build..."
if npm run build 2>/dev/null; then
  echo "✅ Build: PASS"
else
  echo "❌ Build: FAIL"
fi

# 5. Check linting
# echo "5. Checking linting..."
# if npm run lint -- --quiet 2>/dev/null; then
#   echo "✅ Linting: PASS"
# else
#   echo "❌ Linting: FAIL"
# fi

# echo "🎉 Check complete!"