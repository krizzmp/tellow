import "./app.css";
import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";

function Row({ children }: { children: ComponentChildren }) {
  return <div class="row">{children}</div>;
}

function Column({ children }: { children: ComponentChildren }) {
  return <div class="column">{children}</div>;
}

export function App() {
  useEffect(() => {
    function findFirstParent(
      element: HTMLElement,
      selector: string,
    ): HTMLElement | null {
      if (!element) {
        return null;
      }
      if (element.matches(selector)) {
        return element;
      }
      return findFirstParent(element.parentElement as HTMLElement, selector);
    }

    function findChildren(
      parent: HTMLElement,
      selector: string,
      exceptSelector?: string,
    ) {
      return Array.from(parent.children).flatMap((child): HTMLElement[] => {
        if (child.matches(selector)) {
          return [child as HTMLElement];
        }
        if (exceptSelector && child.matches(exceptSelector)) {
          return [];
        }
        return findChildren(child as HTMLElement, selector, exceptSelector);
      });
    }

    function handleArrow(
      element: HTMLElement,
      horizontal: boolean,
      forward: boolean,
      focusableSelector = "button",
      getDefaultChild: (elements: HTMLElement[]) => HTMLElement = (
        elements,
      ) => {
        return elements[0];
      },
    ) {
      const mainAxis = horizontal ? ".row" : ".column";
      const crossAxis = horizontal ? ".column" : ".row";
      const mainAxisContainer = findFirstParent(element, mainAxis);

      const firstParent = findFirstParent(element, ".column,.row");
      if (firstParent == null || mainAxisContainer == null) {
        return;
      }
      if (firstParent.matches(crossAxis)) {
        const children2 = findChildren(
          mainAxisContainer,
          `${crossAxis},${focusableSelector}`,
          mainAxis,
        );
        const index = children2.indexOf(firstParent);
        const prev = children2[index + (forward ? 1 : -1)];
        if (prev.matches(crossAxis)) {
          getDefaultChild(
            findChildren(prev, focusableSelector, mainAxis),
          ).focus();
        } else {
          prev.focus();
        }
      } else {
        const children = findChildren(
          mainAxisContainer,
          focusableSelector,
          mainAxis,
        );
        const index = children.indexOf(element);
        const prev = children[index + (forward ? 1 : -1)];
        if (prev) {
          prev.focus();
        } else {
          const crossAxisContainer = findFirstParent(element, crossAxis);
          if (crossAxisContainer) {
            const mainAxisGrandParent = findFirstParent(
              crossAxisContainer,
              mainAxis,
            );
            if (mainAxisGrandParent) {
              const children = findChildren(
                mainAxisGrandParent,
                `${crossAxis},${focusableSelector}`,
                mainAxis,
              );
              const index = children.indexOf(crossAxisContainer);
              const prev = children[index + (forward ? 1 : -1)];
              if (prev.matches(crossAxis)) {
                getDefaultChild(
                  findChildren(prev, focusableSelector, mainAxis),
                ).focus();
              } else {
                prev.focus();
              }
            }
          }
        }
      }
    }

    const listener = (e: KeyboardEvent) => {
      const element = document.activeElement as HTMLElement;
      if (e.key === "ArrowLeft") {
        handleArrow(element, true, false);
      }

      if (e.key === "ArrowRight") {
        handleArrow(element, true, true);
      }

      if (e.key === "ArrowUp") {
        handleArrow(element, false, false);
      }

      if (e.key === "ArrowDown") {
        handleArrow(element, false, true);
      }
    };
    window.addEventListener("keyup", listener);
    return () => window.removeEventListener("keyup", listener);
  }, []);
  return (
    <>
      <h1>Vite + Preact</h1>

      <Column>
        <div>
          <button>Button 1</button>
        </div>
        <div>
          <button>Button 2</button>
        </div>
        <Row>
          <button>Button 3</button>

          <span>
            <Column>
              <button>Button 4</button>
              <div>
                <button>Button 5</button>
              </div>
            </Column>
          </span>
        </Row>
        <Row>
          <button>Button 6</button>
        </Row>
        <Row>
          <button>Button 7</button>
          <button>Button 8</button>
        </Row>
      </Column>
    </>
  );
}
