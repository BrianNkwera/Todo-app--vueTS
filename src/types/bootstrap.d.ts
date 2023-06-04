declare namespace bootstrap {
  class Modal {
    constructor(element: Element | null);
    static getInstance(element: Element | null): Modal | null;
    hide(): void;
    show(): void
  }
}

export default bootstrap;
