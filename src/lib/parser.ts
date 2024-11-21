const IGNORE_LIST = [
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BUTTON",
  "LABEL",
  "SPAN",
  "IMG",
  "PRE",
  "SCRIPT",
];
const isIgnored = (element: Element) => IGNORE_LIST.includes(element.tagName);

const isEmptyTextNode = (element: Element) =>
  element.textContent ? false : true;

/**
 *  **TBD:**
 *  Implement a function that returns all the top level readable elements on the page, keeping in mind the ignore list.
 *  Start Parsing inside the body element of the HTMLPage.
 *  A top level readable element is defined as follows:
 *      1. The text node contained in the element should not be empty
 *      2. The element should not be in the ignore list (also referred as the block list)
 *      3. The element should not be a child of another element that has only one child.
 *            For example: <div><blockquote>Some text here</blockquote></div>. div is the top level readable element and not blockquote
 *      4. A top level readable element should not contain another top level readable element.
 *            For example: Consider the following HTML document:
 *            <body>
 *              <div id="root"></div>
 *              <div id="content-1">
 *                <article>
 *                  <header>
 *                    <h1 id="title">An Interesting HTML Document</h1>
 *                    <span>
 *                      <address id="test">John Doe</address>
 *                    </span>
 *                  </header>
 *                  <section></section>
 *                </article>
 *              </div>
 *            </body>;
 *            In this case, #content-1 should not be considered as a top level readable element.
 */
export function getTopLevelReadableElementsOnPage(): HTMLElement[] {
  let topLevelReadableElements: HTMLElement[] = [];
  function traverse(element: Element, parentElements: HTMLElement[]) {
    if (element.children.length) {
      for (const child of element.children) {
        traverse(
          child,
          element.children.length === 1
            ? [...parentElements, element as HTMLElement]
            : [],
        );
      }
    } else {
      if (isIgnored(element)) return;
      if (isEmptyTextNode(element)) return;
      topLevelReadableElements.push(
        parentElements?.length ? parentElements[0] : (element as HTMLElement),
      );
    }
  }
  traverse(document.body, []);
  return topLevelReadableElements;
}
