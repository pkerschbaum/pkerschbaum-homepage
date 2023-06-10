export const uiUtils = { getScrollParent, isPartlyInViewport };

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

function isPartlyInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}
