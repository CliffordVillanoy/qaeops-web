'use strict';

(() => {
  const root = document.documentElement;
  const themeToggles = [...document.querySelectorAll('[data-theme-toggle]')];
  const brandLogos = [...document.querySelectorAll('.qaeops-nav-logo img')];
  const homeLogoLinks = [...document.querySelectorAll('header a[aria-label="QAEOps home"], .site-footer__logo')];
  const primaryNavLinks = [...document.querySelectorAll('.nav-link, #mobile-nav-drawer a')];

  try {
    const activeLink = document.querySelector('.nav-link[aria-current="page"]');
    if (sessionStorage.getItem('qaeops-home-entry') === 'logo'
      && activeLink?.textContent.trim() === 'Overview') {
      root.dataset.homeEntry = 'logo';
    }
  } catch {}

  homeLogoLinks.forEach((link) => {
    link.addEventListener('click', () => {
      root.dataset.homeEntry = 'logo';
      try {
        sessionStorage.setItem('qaeops-home-entry', 'logo');
      } catch {}
    });
  });

  primaryNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      delete root.dataset.homeEntry;
      try {
        sessionStorage.removeItem('qaeops-home-entry');
      } catch {}
    });
  });

  function applyTheme(theme, persist = false) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    themeToggles.forEach((toggle) => {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
    if (persist) {
      try {
        localStorage.setItem('qaeops-theme', theme);
      } catch {}
    }
  }

  themeToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  });
  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

  if (brandLogos.length) {
    fetch(brandLogos[0].src)
      .then((response) => {
        if (!response.ok) throw new Error('Logo asset unavailable');
        return response.text();
      })
      .then((logoMarkup) => {
        brandLogos.forEach((logo) => {
          const host = logo.parentElement;
          const shadow = host.attachShadow({ mode: 'open' });
          shadow.innerHTML = `${logoMarkup}<style>
            svg {
              position: absolute;
              top: 50%;
              left: 50%;
              display: block;
              width: 12.5rem;
              height: 5.125rem;
              transform: translate(-50%, -50%);
            }
            @media (max-width: 639px) {
              svg { width: 8.75rem; height: 3.5rem; }
            }
            :host-context(html[data-theme="dark"]) #robot-tile {
              stroke: rgba(255, 255, 255, .82);
              stroke-width: 12;
            }
            :host-context(html[data-theme="dark"]) #wordmark {
              fill: #b8b5ff;
            }
          </style>`;

          const svg = shadow.querySelector('svg');
          svg.querySelector('title')?.remove();
          svg.querySelector('desc')?.remove();
          svg.removeAttribute('aria-labelledby');
          svg.setAttribute('aria-hidden', 'true');
          const eyes = [...svg.querySelectorAll('#qaeops-eye-left, #qaeops-eye-right')];
          const setBlinking = (active) => {
            eyes.forEach((eye) => { eye.style.animation = active ? '' : 'none'; });
          };
          setBlinking(false);
          host.addEventListener('mouseenter', () => {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setBlinking(true);
          });
          host.addEventListener('mouseleave', () => setBlinking(false));
          if (host.matches(':hover') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setBlinking(true);
          }
          host.dataset.logoBlink = 'ready';
        });
      })
      .catch(() => {});
  }

  if (document.fonts?.load) {
    document.fonts.load('20px "Material Symbols Outlined"').then(() => {
      document.documentElement.classList.add('symbols-ready');
    });
  } else {
    document.documentElement.classList.add('symbols-ready');
  }

  const menu = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const wide = window.matchMedia('(min-width: 1120px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const docsLinks = [...document.querySelectorAll('.docs-navigation nav a')];
  const docsSections = [...document.querySelectorAll('.docs-topic')];
  const breadcrumbGroup = document.getElementById('docs-breadcrumb-group');
  const breadcrumbCurrent = document.getElementById('docs-breadcrumb-current');
  const docsSearch = document.querySelector('.docs-search');
  const docsSearchInput = document.getElementById('docs-search-input');
  const docsSearchClear = document.getElementById('docs-search-clear');
  const docsSearchResults = document.getElementById('docs-search-results');
  const docsSearchStatus = document.getElementById('docs-search-status');

  document.querySelectorAll('.about-faq .cli-faq').forEach((details) => {
    const summary = details.querySelector('summary');
    const content = details.querySelector(':scope > div');
    let animation;

    if (!summary || !content) return;

    summary.addEventListener('click', (event) => {
      if (reducedMotion.matches) return;
      event.preventDefault();
      if (animation) return;

      const shouldOpen = !details.open;
      const startHeight = details.offsetHeight;

      delete details.dataset.closing;

      if (shouldOpen) details.open = true;
      else details.dataset.closing = 'true';

      const endHeight = shouldOpen
        ? details.offsetHeight
        : startHeight - content.offsetHeight;

      details.style.overflow = 'hidden';
      animation = details.animate(
        { height: [`${startHeight}px`, `${endHeight}px`] },
        {
          duration: shouldOpen ? 420 : 240,
          easing: 'cubic-bezier(.2, .8, .2, 1)',
        },
      );

      if (shouldOpen) {
        content.animate(
          [
            { opacity: 0, transform: 'translateY(-.35rem)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 360,
            delay: 60,
            easing: 'cubic-bezier(.2, .8, .2, 1)',
            fill: 'backwards',
          },
        );
      }

      animation.addEventListener('finish', () => {
        if (!shouldOpen) details.open = false;
        delete details.dataset.closing;
        details.style.removeProperty('overflow');
        details.style.removeProperty('height');
        animation = undefined;
      }, { once: true });
    });
  });

  function setMenu(open) {
    if (!menu || !drawer) return;
    drawer.hidden = !open;
    menu.setAttribute('aria-expanded', String(open));
  }

  function resizeNavigation() {
    if (!menu || !drawer) return;
    if (wide.matches && (drawer.contains(document.activeElement) || document.activeElement === menu)) {
      document.querySelector('nav[aria-label="Main Navigation"] a')?.focus();
    }
    menu.hidden = wide.matches;
    setMenu(!wide.matches && drawer.contains(document.activeElement));
  }

  menu?.addEventListener('click', () => setMenu(drawer.hidden));
  wide.addEventListener('change', resizeNavigation);

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey
      && event.key.toLowerCase() === 'q' && docsSearchInput) {
      event.preventDefault();
      openDocumentationSearch();
    } else if (event.key === 'Escape' && drawer && !drawer.hidden) {
      setMenu(false);
      menu.focus();
    }
  });

  function focusAndScrollTo(target) {
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    if (drawer?.contains(link)) setMenu(false);
    window.history.pushState(null, '', link.hash);
    renderDocumentationTopic();
    window.requestAnimationFrame(() => focusAndScrollTo(target));
  });

  function renderDocumentationTopic() {
    if (!docsLinks.length || !docsSections.length) return;
    const requestedId = window.location.hash.slice(1);
    const activeSection = docsSections.find((section) => section.id === requestedId) || docsSections[0];
    const current = docsLinks.find((link) => link.hash === `#${activeSection.id}`) || docsLinks[0];
    docsSections.forEach((section) => {
      section.hidden = section !== activeSection;
    });
    docsLinks.forEach((link) => {
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const topicTitle = activeSection.dataset.title || activeSection.querySelector('h2')?.textContent;
    let topicGroup = 'Documentation';
    for (const item of current.closest('nav').children) {
      if (item === current) break;
      if (item.classList.contains('docs-nav-group')) topicGroup = item.textContent.trim();
    }
    if (breadcrumbGroup) breadcrumbGroup.textContent = topicGroup;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = topicTitle;
    document.title = 'Documentation | QAEOps';
  }

  let openDocumentationSearch = () => {};

  function buildDocumentationSearch() {
    if (!docsSearch || !docsSearchInput) return;

    const searchTarget = docsSearch.dataset.searchTarget || 'documentation/index.html';
    let searchIndexPromise;
    let restoreFocus;

    const dialog = document.createElement('dialog');
    dialog.className = 'docs-search-dialog';
    dialog.id = 'docs-search-dialog';
    dialog.setAttribute('aria-label', 'Search QAEOps documentation');
    dialog.innerHTML = `
      <div class="docs-search-dialog__panel">
        <div class="docs-search-dialog__control">
          <img src="${docsSearch.querySelector('.docs-search__icon')?.src || ''}" alt="" width="22" height="22" aria-hidden="true">
          <input type="search" aria-label="Search documentation" placeholder="Search documentation" autocomplete="off" aria-controls="docs-search-dialog-results" aria-expanded="false">
          <button type="button" class="docs-search-dialog__close" aria-label="Close search">×</button>
        </div>
        <p class="docs-search-dialog__status" aria-live="polite">Type to search QAEOps documentation.</p>
        <ul class="docs-search-dialog__results" id="docs-search-dialog-results" aria-label="Documentation search results" hidden></ul>
        <div class="docs-search-dialog__footer" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>Enter</kbd> Select</span>
          <span><kbd>Esc</kbd> Close</span>
        </div>
      </div>`;
    document.body.append(dialog);

    const modalInput = dialog.querySelector('input');
    const modalResults = dialog.querySelector('.docs-search-dialog__results');
    const modalStatus = dialog.querySelector('.docs-search-dialog__status');
    const closeButton = dialog.querySelector('.docs-search-dialog__close');

    function buildIndex(source, baseUrl = '') {
      return [...source.querySelectorAll('.docs-navigation nav a')].map((link) => {
        const id = link.getAttribute('href')?.split('#')[1];
        const section = id ? source.getElementById(id) : null;
        const group = link.closest('details')?.querySelector('summary')?.textContent.trim() || 'Documentation';
        return {
          id,
          href: baseUrl ? `${baseUrl}#${id}` : `#${id}`,
          title: link.textContent.trim(),
          group,
          content: section?.textContent.replace(/\s+/g, ' ').trim() || '',
        };
      }).filter((item) => item.id);
    }

    function loadSearchIndex() {
      if (searchIndexPromise) return searchIndexPromise;
      if (docsLinks.length && docsSections.length) {
        searchIndexPromise = Promise.resolve(buildIndex(document));
      } else {
        searchIndexPromise = fetch(searchTarget)
          .then((response) => {
            if (!response.ok) throw new Error('Documentation unavailable');
            return response.text();
          })
          .then((markup) => buildIndex(new DOMParser().parseFromString(markup, 'text/html'), searchTarget));
      }
      return searchIndexPromise;
    }

    function closeDialog() {
      if (dialog.open) dialog.close();
    }

    function createResult(item, query) {
      const result = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.href;

      const title = document.createElement('strong');
      title.textContent = item.title;
      const metadata = document.createElement('span');
      metadata.textContent = item.group;

      const normalizedContent = item.content.toLocaleLowerCase();
      const matchIndex = normalizedContent.indexOf(query);
      const start = Math.max(0, matchIndex - 38);
      const excerpt = item.content.slice(start, start + 112).trim();
      const description = document.createElement('small');
      description.textContent = `${start > 0 ? '…' : ''}${excerpt}${start + 112 < item.content.length ? '…' : ''}`;

      link.append(title, metadata, description);
      result.append(link);
      return result;
    }

    function clearHeaderResults({ focus = false } = {}) {
      docsSearchInput.value = '';
      docsSearchClear.hidden = true;
      docsSearchStatus.textContent = '';
      docsSearchResults.replaceChildren();
      docsSearchResults.hidden = true;
      docsSearchInput.setAttribute('aria-expanded', 'false');
      if (focus) docsSearchInput.focus();
    }

    async function renderHeaderResults() {
      const query = docsSearchInput.value.trim().toLocaleLowerCase();
      docsSearchClear.hidden = !query;
      docsSearchResults.replaceChildren();
      docsSearchResults.hidden = true;
      docsSearchInput.setAttribute('aria-expanded', 'false');

      if (!query) {
        docsSearchStatus.textContent = '';
        return;
      }

      docsSearchStatus.textContent = 'Searching documentation…';
      try {
        const searchIndex = await loadSearchIndex();
        if (query !== docsSearchInput.value.trim().toLocaleLowerCase()) return;
        const matches = searchIndex
          .map((item) => {
            const title = item.title.toLocaleLowerCase();
            const group = item.group.toLocaleLowerCase();
            const content = item.content.toLocaleLowerCase();
            let score = 0;
            if (title === query) score += 6;
            else if (title.startsWith(query)) score += 5;
            else if (title.includes(query)) score += 4;
            if (group.includes(query)) score += 2;
            if (content.includes(query)) score += 1;
            return { item, score };
          })
          .filter((match) => match.score > 0)
          .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
          .slice(0, 8);

        docsSearchStatus.textContent = matches.length
          ? `${matches.length} result${matches.length === 1 ? '' : 's'} found`
          : 'No documentation results found.';
        matches.forEach(({ item }) => docsSearchResults.append(createResult(item, query)));
        docsSearchResults.hidden = !matches.length;
        docsSearchInput.setAttribute('aria-expanded', String(Boolean(matches.length)));
      } catch {
        docsSearchStatus.textContent = 'Documentation search is temporarily unavailable.';
      }
    }
    async function renderResults() {
      const query = modalInput.value.trim().toLocaleLowerCase();
      modalResults.replaceChildren();
      modalResults.hidden = true;
      modalInput.setAttribute('aria-expanded', 'false');

      if (!query) {
        modalStatus.textContent = 'Type to search QAEOps documentation.';
        return;
      }

      modalStatus.textContent = 'Searching documentation…';
      try {
        const searchIndex = await loadSearchIndex();
        if (query !== modalInput.value.trim().toLocaleLowerCase()) return;
        const matches = searchIndex
          .map((item) => {
            const title = item.title.toLocaleLowerCase();
            const group = item.group.toLocaleLowerCase();
            const content = item.content.toLocaleLowerCase();
            let score = 0;
            if (title === query) score += 6;
            else if (title.startsWith(query)) score += 5;
            else if (title.includes(query)) score += 4;
            if (group.includes(query)) score += 2;
            if (content.includes(query)) score += 1;
            return { item, score };
          })
          .filter((match) => match.score > 0)
          .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
          .slice(0, 8);

        modalStatus.textContent = matches.length
          ? `${matches.length} result${matches.length === 1 ? '' : 's'} found`
          : 'No documentation results found.';
        matches.forEach(({ item }) => modalResults.append(createResult(item, query)));
        modalResults.hidden = !matches.length;
        modalInput.setAttribute('aria-expanded', String(Boolean(matches.length)));
      } catch {
        modalStatus.textContent = 'Documentation search is temporarily unavailable.';
      }
    }

    openDocumentationSearch = () => {
      if (dialog.open) return;
      restoreFocus = document.activeElement;
      dialog.showModal();
      root.classList.add('docs-search-open');
      modalInput.value = '';
      modalResults.replaceChildren();
      modalResults.hidden = true;
      modalStatus.textContent = 'Type to search QAEOps documentation.';
      window.requestAnimationFrame(() => modalInput.focus());
      loadSearchIndex().catch(() => {});
    };

    docsSearch.addEventListener('submit', (event) => {
      event.preventDefault();
      docsSearchResults.querySelector('a')?.click();
    });
    docsSearchInput.addEventListener('input', renderHeaderResults);
    docsSearchInput.addEventListener('focus', renderHeaderResults);
    docsSearchInput.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        const firstResult = docsSearchResults.querySelector('a');
        if (firstResult) {
          event.preventDefault();
          firstResult.focus();
        }
      } else if (event.key === 'Escape') {
        clearHeaderResults();
      }
    });
    docsSearchResults.addEventListener('keydown', (event) => {
      const links = [...docsSearchResults.querySelectorAll('a')];
      const currentIndex = links.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' && currentIndex < links.length - 1) {
        event.preventDefault();
        links[currentIndex + 1].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (currentIndex > 0) links[currentIndex - 1].focus();
        else docsSearchInput.focus();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        clearHeaderResults({ focus: true });
      }
    });
    docsSearchResults.addEventListener('click', () => queueMicrotask(() => clearHeaderResults()));
    docsSearchClear?.addEventListener('click', () => clearHeaderResults({ focus: true }));
    document.addEventListener('click', (event) => {
      if (!docsSearch.contains(event.target)) {
        docsSearchResults.hidden = true;
        docsSearchInput.setAttribute('aria-expanded', 'false');
      }
    });
    modalInput.addEventListener('input', renderResults);
    modalInput.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        const firstResult = modalResults.querySelector('a');
        if (firstResult) {
          event.preventDefault();
          firstResult.focus();
        }
      } else if (event.key === 'Enter') {
        const firstResult = modalResults.querySelector('a');
        if (firstResult) {
          event.preventDefault();
          firstResult.click();
        }
      }
    });
    modalResults.addEventListener('keydown', (event) => {
      const links = [...modalResults.querySelectorAll('a')];
      const currentIndex = links.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' && currentIndex < links.length - 1) {
        event.preventDefault();
        links[currentIndex + 1].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (currentIndex > 0) links[currentIndex - 1].focus();
        else modalInput.focus();
      }
    });
    modalResults.addEventListener('click', closeDialog);
    closeButton.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener('close', () => {
      root.classList.remove('docs-search-open');
      modalInput.value = '';
      modalResults.replaceChildren();
      restoreFocus?.focus();
    });
  }

  function buildDocumentationPagination() {
    docsLinks.forEach((link, index) => {
      const section = document.getElementById(link.hash.slice(1));
      const previousLink = docsLinks[index - 1];
      const nextLink = docsLinks[index + 1];
      if (!section) return;

      let container = section.querySelector('.docs-pagination');
      if (!container) {
        const existingNext = section.querySelector('.docs-next');
        container = document.createElement('nav');
        container.className = 'docs-pagination';
        container.setAttribute('aria-label', 'Documentation topics');
        if (existingNext) existingNext.replaceWith(container);
        else section.append(container);
      }

      function createPaginationButton(targetLink, direction) {
        const button = document.createElement('a');
        button.className = `docs-next__button docs-next__button--${direction}`;
        button.href = targetLink.hash;

        const text = document.createElement('span');
        text.className = 'docs-next__text';

        const prefix = document.createElement('strong');
        prefix.className = 'docs-next__prefix';
        prefix.textContent = direction === 'previous' ? 'Previous' : 'Next';

        const separator = document.createTextNode(': ');

        const label = document.createElement('span');
        label.className = 'docs-next__label';
        label.textContent = targetLink.textContent.trim();

        text.append(prefix, separator, label);

        const arrow = document.createElement('img');
        arrow.className = 'docs-next__arrow';
        arrow.src = 'https://www.svgrepo.com/show/511422/arrow-right-336.svg';
        arrow.alt = '';
        arrow.setAttribute('aria-hidden', 'true');

        if (direction === 'previous') button.append(arrow, text);
        else button.append(text, arrow);
        return button;
      }

      const controls = [];
      if (previousLink) controls.push(createPaginationButton(previousLink, 'previous'));
      if (nextLink) controls.push(createPaginationButton(nextLink, 'next'));
      container.replaceChildren(...controls);
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.append(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    if (!copied) throw new Error('Copy command was unavailable.');
  }

  function buildCodeCopyButtons() {
    document.querySelectorAll('.docs-topic pre').forEach((codeBlock) => {
      if (codeBlock.closest('.docs-code-block')) return;

      const code = codeBlock.querySelector('code');
      if (!code) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'docs-code-block';

      const button = document.createElement('button');
      button.className = 'docs-copy-button';
      button.type = 'button';
      button.setAttribute('aria-label', 'Copy command');

      const icon = document.createElement('span');
      icon.className = 'material-symbols-outlined';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = 'content_copy';

      const status = document.createElement('span');
      status.className = 'docs-copy-button__status';
      status.setAttribute('aria-live', 'polite');
      status.textContent = 'Copy';

      button.append(icon, status);
      codeBlock.before(wrapper);
      wrapper.append(codeBlock, button);

      let resetTimer;
      button.addEventListener('click', async () => {
        window.clearTimeout(resetTimer);
        try {
          await copyText(code.textContent.trim());
          icon.textContent = 'check';
          status.textContent = 'Copied';
          button.setAttribute('aria-label', 'Command copied');
        } catch {
          icon.textContent = 'error';
          status.textContent = 'Copy failed';
          button.setAttribute('aria-label', 'Copy failed');
        }

        resetTimer = window.setTimeout(() => {
          icon.textContent = 'content_copy';
          status.textContent = 'Copy';
          button.setAttribute('aria-label', 'Copy command');
        }, 1800);
      });
    });
  }

  window.addEventListener('hashchange', () => {
    renderDocumentationTopic();
    const target = document.getElementById(window.location.hash.slice(1));
    const focusTarget = docsSections.length
      ? docsSections.find((section) => !section.hidden)?.querySelector('h2')
      : target;
    if (focusTarget) window.requestAnimationFrame(() => focusAndScrollTo(focusTarget));
  });

  resizeNavigation();
  buildDocumentationSearch();
  buildCodeCopyButtons();
  buildDocumentationPagination();
  renderDocumentationTopic();
  document.body.classList.add('docs-ready');
})();
if (window.location.pathname.endsWith('/index.html')) {
  window.history.replaceState(null, '', window.location.href.replace(/index\.html(?=([?#]|$))/, ''));
}
