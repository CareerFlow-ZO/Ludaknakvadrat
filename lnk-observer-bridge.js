(() => {
  'use strict';
  if (window.__LNK_NATIVE_MUTATION_OBSERVER) return;
  const NativeMutationObserver = window.MutationObserver;
  window.__LNK_NATIVE_MUTATION_OBSERVER = NativeMutationObserver;
  window.MutationObserver = class LNKMutationObserver extends NativeMutationObserver {
    constructor(callback) {
      super((mutations, observer) => {
        if (window.__LNK_PAUSE_SITE_OBSERVERS) return;
        callback(mutations, observer);
      });
    }
  };
})();
