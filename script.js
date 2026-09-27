'use strict';

(() => {
  const root = document.documentElement;
  const themeToggles = [...document.querySelectorAll('[data-theme-toggle]')];
  const brandLogos = [...document.querySelectorAll('.qaeops-nav-logo img, .site-footer__mark img')];

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

  if (document.fonts?.load) {
    document.fonts.load('20px "Material Symbols Outlined"').then(() => {
      document.documentElement.classList.add('symbols-ready');
    });
  } else {
    document.documentElement.classList.add('symbols-ready');
  }

  const menu = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const wide = window.matchMedia('(min-width: 1280px)');
  const docsWide = window.matchMedia('(min-width: 960px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const docsNavigation = document.querySelector('.docs-navigation');
  const docsLinks = [...document.querySelectorAll('.docs-navigation nav a')];
  const docsSections = [...document.querySelectorAll('.docs-topic')];
  const breadcrumbGroup = document.getElementById('docs-breadcrumb-group');
  const breadcrumbCurrent = document.getElementById('docs-breadcrumb-current');
  const docsSearch = document.querySelector('.docs-search');
  const docsSearchInput = document.getElementById('docs-search-input');
  const docsSearchClear = document.getElementById('docs-search-clear');
  const docsSearchResults = document.getElementById('docs-search-results');
  const docsSearchStatus = document.getElementById('docs-search-status');

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
    if (event.key === 'Escape' && drawer && !drawer.hidden) {
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
    if (docsNavigation?.contains(link) && !docsWide.matches) docsNavigation.open = false;
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

  function buildDocumentationSearch() {
    if (!docsSearch || !docsSearchInput || !docsSearchResults || !docsSearchStatus) return;

    const searchIndex = docsLinks.map((link) => {
      const section = document.getElementById(link.hash.slice(1));
      let group = 'Documentation';
      for (const item of link.closest('nav').children) {
        if (item === link) break;
        if (item.classList.contains('docs-nav-group')) group = item.textContent.trim();
      }
      return {
        id: section?.id,
        title: link.textContent.trim(),
        group,
        content: section?.textContent.replace(/\s+/g, ' ').trim() || '',
      };
    }).filter((item) => item.id);

    function closeResults() {
      docsSearchResults.hidden = true;
      docsSearchInput.setAttribute('aria-expanded', 'false');
    }

    function clearSearch({ focus = false } = {}) {
      docsSearchInput.value = '';
      docsSearchClear.hidden = true;
      docsSearchStatus.textContent = '';
      docsSearchResults.replaceChildren();
      closeResults();
      if (focus) docsSearchInput.focus();
    }

    function createResult(item, query) {
      const result = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${item.id}`;

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

    function renderResults() {
      const query = docsSearchInput.value.trim().toLocaleLowerCase();
      docsSearchClear.hidden = !query;
      docsSearchResults.replaceChildren();

      if (!query) {
        docsSearchStatus.textContent = '';
        closeResults();
        return;
      }

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
        : 'No documentation results found';
      matches.forEach(({ item }) => docsSearchResults.append(createResult(item, query)));
      if (matches.length) {
        docsSearchResults.hidden = false;
        docsSearchInput.setAttribute('aria-expanded', 'true');
      } else {
        closeResults();
      }
    }

    docsSearch.addEventListener('submit', (event) => {
      event.preventDefault();
      docsSearchResults.querySelector('a')?.click();
    });
    docsSearchInput.addEventListener('input', renderResults);
    docsSearchInput.addEventListener('focus', renderResults);
    docsSearchInput.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        const firstResult = docsSearchResults.querySelector('a');
        if (firstResult) {
          event.preventDefault();
          firstResult.focus();
        }
      } else if (event.key === 'Escape') {
        clearSearch();
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
        clearSearch({ focus: true });
      }
    });
    docsSearchResults.addEventListener('click', () => queueMicrotask(() => clearSearch()));
    docsSearchClear?.addEventListener('click', () => clearSearch({ focus: true }));
    document.addEventListener('click', (event) => {
      if (!docsSearch.contains(event.target)) closeResults();
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

  brandLogos.forEach((logo) => {
    const logoSource = logo.getAttribute('src');
    logo.addEventListener('mouseenter', () => { logo.src = `${logoSource}#blink`; });
    logo.addEventListener('mouseleave', () => { logo.src = logoSource; });
  });

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
