import puppeteer from 'puppeteer';

async function testTimeline() {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Enable error logging
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('Browser Error:', msg.text());
    }
  });
  
  page.on('pageerror', err => {
    console.error('Page Error:', err.message);
  });

  try {
    // Navigate to the dev server
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for timeline entries to be present
    await page.waitForSelector('[data-testid="timeline-entry"]', {
      timeout: 5000
    });

    // Monitor for React state updates
    await page.evaluate(() => {
      let updateCount = 0;
      const startTime = Date.now();
      
      // Monitor state updates for 5 seconds
      const interval = setInterval(() => {
        const stateUpdates = window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.getCurrentFiber()?.updateQueue?.length || 0;
        if (stateUpdates > 0) {
          updateCount++;
          console.log(`State update detected: ${updateCount}`);
        }
        
        if (Date.now() - startTime > 5000) {
          clearInterval(interval);
          console.log(`Detected ${updateCount} state updates in 5 seconds`);
          if (updateCount > 100) {
            console.error('Possible infinite update loop detected');
          }
        }
      }, 100);
    });

    // Monitor for specific React errors
    await page.evaluate(() => {
      const originalError = console.error;
      console.error = (...args) => {
        if (args[0]?.includes('Maximum update depth exceeded')) {
          console.log('React Error: Maximum update depth exceeded');
          console.log('Component Stack:', args[1]);
        }
        originalError.apply(console, args);
      };
    });

    // Wait 6 seconds to collect data
    await page.waitForTimeout(6000);

    // Check memory usage
    const metrics = await page.metrics();
    console.log('Memory Usage:', {
      jsHeapSize: Math.round(metrics.JSHeapUsedSize / (1024 * 1024)) + 'MB',
      totalHeapSize: Math.round(metrics.JSHeapTotalSize / (1024 * 1024)) + 'MB'
    });

  } catch (error) {
    console.error('Test Error:', error);
  } finally {
    await browser.close();
  }
}

testTimeline().catch(console.error);