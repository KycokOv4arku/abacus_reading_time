(function() {
  // Configuration variables
  const CONFIG = {
    WORDS_PER_MINUTE: {
      EN: 200, // set ur reading speed in this language
      RU: 300  // set ur reading speed in this language
    },
    SPACING: {
      EN_LABEL: '      ',
      RU_LABEL: '      ',
      CHARS_LABEL: '   ',
      WORDS_LABEL: '  ',
      AVG_LABEL: '      '
    }
  };

  const selectedText = window.getSelection().toString().trim();
  const text = selectedText || document.body.innerText;
  
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const charCount = text.length;
  const avgWordLength = wordCount > 0 ? (charCount / wordCount).toFixed(1) : 0;
  
  const readTimeEn = Math.ceil(wordCount / CONFIG.WORDS_PER_MINUTE.EN);
  const readTimeRu = Math.ceil(wordCount / CONFIG.WORDS_PER_MINUTE.RU);
  
  alert(
    `Read time:\n` +
    `EN:${CONFIG.SPACING.EN_LABEL}${readTimeEn} min\n` +
    // delete next line if don't need second language. 
    `RU:${CONFIG.SPACING.RU_LABEL}${readTimeRu} min\n\n` + // <- delete THIS
    `Chars:${CONFIG.SPACING.CHARS_LABEL}${charCount}\n` +
    `Words:${CONFIG.SPACING.WORDS_LABEL}${wordCount}\n` +
    `Avg:${CONFIG.SPACING.AVG_LABEL}${avgWordLength}`
  );
})();