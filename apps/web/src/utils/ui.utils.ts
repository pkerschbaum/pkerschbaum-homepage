import invariant from 'tiny-invariant';

export const uiUtils = {
  getScrollParent,
  isEntirelyInViewport,
  isPartlyInViewport,
  isEntirelyAboveTheFold,
  observeRemovalOfElement,
  observeRemovalOfElementOnce,
};

/**
 * https://stackoverflow.com/questions/35939886/find-first-scrollable-parent#42543908
 */
function getScrollParent(element: HTMLElement, includeHidden?: boolean) {
  let style = getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  if (style.position === 'fixed') {
    return document.body;
  }
  for (let parent: HTMLElement | null = element; (parent = parent.parentElement); ) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return document.body;
}

function isEntirelyInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isPartlyInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}

function isEntirelyAboveTheFold(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();

  return rect.top + rect.height - window.innerHeight <= 0;
}

type Unobserve = () => void;

function observeRemovalOfElement(element: HTMLElement, cb: () => unknown): Unobserve {
  invariant(element.parentElement);

  const removalObserver = new MutationObserver((mutationList) => {
    const removedNodes = mutationList.flatMap((mutation) => [...mutation.removedNodes]);
    if (removedNodes.includes(element)) {
      cb();
    }
  });

  removalObserver.observe(element.parentElement, { childList: true });
  return function unobserve() {
    removalObserver.disconnect();
  };
}

function observeRemovalOfElementOnce(element: HTMLElement, cb: () => unknown): void {
  const unobserve = observeRemovalOfElement(element, () => {
    unobserve();
    cb();
  });
}
