(() => {
  class Toggler {
    constructor(el) {
      this.toggler = el;
      this.expended = this.toggler.dataset.ariaExpended === 'true' ? true : false;
      this.target = document.getElementById( el.dataset.target );
      this.target.dataset.ariaExpended = this.expended;

      this.listen();

      return;
    }

    listen = () => this.toggler.addEventListener('click', this.toggle);

    unlisten = () => this.toggler.removeEventListener('click', this.toggle);

    toggle = (ev) => {
      ev.preventDefault();

      this.toggler.dataset.ariaExpended = !this.expended;
      this.target.dataset.ariaExpended = !this.expended;
      this.expended = !this.expended;

      return;
    }

    isExpended() {
      return this.expended;
    }
  }
  
  const togglers = Array.from( document.querySelectorAll('[data-target]') ).map(e => new Toggler( e ));
})();
