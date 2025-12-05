// Recipe Mode - Prevents screen from going dark while cooking
(function() {
  'use strict';

  let wakeLock = null;

  // Check if Wake Lock API is supported
  const isWakeLockSupported = 'wakeLock' in navigator;

  async function enableRecipeMode() {
    if (!isWakeLockSupported) {
      console.warn('Wake Lock API is not supported in this browser');
      return false;
    }

    try {
      wakeLock = await navigator.wakeLock.request('screen');

      // Re-acquire wake lock when page becomes visible again
      wakeLock.addEventListener('release', () => {
        console.log('Wake Lock was released');
      });

      console.log('Recipe Mode enabled - screen will stay awake');
      return true;
    } catch (err) {
      console.error(`Failed to enable Recipe Mode: ${err.name}, ${err.message}`);
      return false;
    }
  }

  async function disableRecipeMode() {
    if (wakeLock !== null) {
      try {
        await wakeLock.release();
        wakeLock = null;
        console.log('Recipe Mode disabled');
        return true;
      } catch (err) {
        console.error(`Failed to disable Recipe Mode: ${err.name}, ${err.message}`);
        return false;
      }
    }
    return true;
  }

  // Handle visibility change - reacquire wake lock when page becomes visible
  document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      const toggle = document.getElementById('recipe-mode-toggle');
      if (toggle && toggle.checked) {
        await enableRecipeMode();
      }
    }
  });

  // Create and inject the Recipe Mode toggle HTML
  function createRecipeModeToggle() {
    // Find the Ingredients heading
    const ingredientsHeading = Array.from(document.querySelectorAll('h2')).find(
      h2 => h2.textContent.trim() === 'Ingredients'
    );

    if (!ingredientsHeading) {
      console.log('Recipe Mode: Ingredients heading not found');
      return null;
    }

    // Create the toggle container
    const container = document.createElement('div');
    container.className = 'recipe-mode-container';
    container.innerHTML = `
      <label class="recipe-mode-toggle">
        <input type="checkbox" id="recipe-mode-toggle" />
        <span class="recipe-mode-slider"></span>
        <span class="recipe-mode-label">Recipe Mode</span>
      </label>
      <p class="recipe-mode-description">Keep screen awake while cooking</p>
    `;

    // Insert before the Ingredients heading
    ingredientsHeading.parentNode.insertBefore(container, ingredientsHeading);

    return container.querySelector('#recipe-mode-toggle');
  }

  // Initialize when DOM is ready
  function initRecipeMode() {
    const toggle = createRecipeModeToggle();

    if (!toggle) return;

    // Hide the toggle if Wake Lock is not supported
    if (!isWakeLockSupported) {
      const container = toggle.closest('.recipe-mode-container');
      if (container) {
        container.style.display = 'none';
      }
      return;
    }

    // Load saved preference from localStorage
    const savedState = localStorage.getItem('recipeModeEnabled') === 'true';
    toggle.checked = savedState;

    if (savedState) {
      enableRecipeMode();
    }

    // Handle toggle changes
    toggle.addEventListener('change', async function() {
      const isEnabled = this.checked;

      if (isEnabled) {
        const success = await enableRecipeMode();
        if (!success) {
          this.checked = false;
        }
      } else {
        await disableRecipeMode();
      }

      // Save preference
      localStorage.setItem('recipeModeEnabled', isEnabled);
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecipeMode);
  } else {
    initRecipeMode();
  }

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    if (wakeLock !== null) {
      wakeLock.release();
    }
  });
})();
