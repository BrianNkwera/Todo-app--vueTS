declare namespace bootstrap {
  class Modal {
    static getInstance(element: Element | null): Modal | null;
    hide(): void;
  }
}

export default bootstrap;
