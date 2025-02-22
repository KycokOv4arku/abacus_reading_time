(function () {
  // Configuration variables
  const CONFIG = {
    WORDS_PER_MINUTE: {
      EN: 200, // <- set ur reading speed for this language
      RU: 300 // <- set ur reading speed for this language
    },
    AUTO_CLOSE_TIME: 3000 // auto-closes in 3 seconds. 1 second = 1000
  };

  // Get selected text or full page content
  const selectedText = window.getSelection().toString().trim();
  const text = selectedText || document.body.innerText;
  
  // Calculate metrics
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const charCount = text.length;
  const avgWordLength = wordCount > 0 ? (charCount / wordCount).toFixed(1) : 0;
  
  // Calculate reading times
  const readTimeEn = Math.ceil(wordCount / CONFIG.WORDS_PER_MINUTE.EN);
  const readTimeRu = Math.ceil(wordCount / CONFIG.WORDS_PER_MINUTE.RU);

  // CSS reset (fixed placement)
  const style = document.createElement('style');
  style.textContent = `
    .abacus-reset * {
      all: initial;
      font-family: system-ui, -apple-system, sans-serif !important;
      font-size: 16px !important;
      color: rgb(222,222,222) !important;
      box-sizing: border-box !important;
    }
    .abacus-reset {
      isolation: isolate;
      font-size: 16px;
      line-height: 1.5;
    }
    .abacus-reset button {
      font-size: 0.875em !important;
    }
  `;
  document.head.appendChild(style);

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'abacus-reset';
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(44,44,44,.96);
    padding: 15px !important;
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,1);
    z-index: 99999;
    
    border: 1px solid rgb(222,222,222);
  `;

  // Title
  const title = document.createElement('h3');
  title.textContent = 'Abacus read time';
  title.style.cssText = `
    width: fit-content;
    text-align: center;
    font-size: 1.1em;
    font-weight: 600;
  `;

  // Content with manual spacing
const content = document.createElement('div');
content.innerHTML = `<br><br>
  <div style="
    margin-bottom: 25px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0px 30px;
  ">
    <div>EN:</div>    <div>${readTimeEn} min</div>
    <div>RU:</div>    <div>${readTimeRu} min</div>
    <div>Chars:</div> <div>${charCount.toLocaleString('en')}</div>
    <div>Words:</div> <div>${wordCount.toLocaleString('en')}</div>
    <div>Avg:</div>   <div>${avgWordLength}</div>
  </div>
`;

  // Close button with countdown
  const closeButton = document.createElement('button');
  let countdown = Math.ceil(CONFIG.AUTO_CLOSE_TIME / 1000);
  
  const updateButtonText = () => {
    closeButton.textContent = `OK (${countdown})`;
    countdown--;
  };

  // Button styling
  closeButton.style.cssText = `
    margin-top: 8px;
    padding: 8px 8px;
    display: block;
    margin: 0 auto;
    cursor: pointer;
    background: rgba(66,66,66,0.95);
    color: rgb(222,222,222);
    border: 1px solid rgb(222,222,222);
    border-radius: 5px;
    font-size: 0.9em;
    transition: all 0.2s;
    min-width: 30px;
  `;

  // Hover effects
  closeButton.addEventListener('mouseover', () => {
    closeButton.style.background = 'rgba(88,88,88,0.95)';
  });
  closeButton.addEventListener('mouseout', () => {
    closeButton.style.background = 'rgba(66,66,66,0.95)';
  });

  // Initial button update
  updateButtonText();

  // Close handler
  let autoCloseTimer;
  const closeModal = () => {
    document.body.removeChild(modal);
    clearInterval(countdownInterval);
    clearTimeout(autoCloseTimer);
  };

  closeButton.onclick = closeModal;
  
  // Countdown interval
  const countdownInterval = setInterval(() => {
    if (countdown > 0) {
      updateButtonText();
    } else {
      closeModal();
    }
  }, 1000);

  // Auto-close timer
  autoCloseTimer = setTimeout(closeModal, CONFIG.AUTO_CLOSE_TIME);

  // Assemble modal
  modal.appendChild(title);
  modal.appendChild(content);
  modal.appendChild(closeButton);
  
  // Add to DOM
  document.body.appendChild(modal);

  // Handle ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();