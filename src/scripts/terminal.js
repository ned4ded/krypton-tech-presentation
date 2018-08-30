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

  class Transporter {
    constructor(el) {
      this.el = el;

      const pages = Array.from( el.querySelectorAll('[data-page]') );

      this.pages = pages.map(p => {
        const togglers = Array.from( p.querySelectorAll('[data-page-toggler]') );

        return {
          instance: p,
          togglers: togglers,
        }
      });

      this.goToPage(1)
    }

    setTop(number) {
      const top = number + 'px';

      this.el.setAttribute('style', `top: ${top}`);

      return this;
    }

    getPositionByPage( number ) {
      const page = this.pages[number - 1].instance;

      return page.offsetTop;
    }

    goToPage( number ) {
      const top = this.getPositionByPage( number );

      this.setTop( -top );

      return this;
    }

    setListeners() {
      this.pages.forEach(({instance, togglers}, index) => {
        const pageNumber = index + 1 === this.pages.length ? 1 : index + 2;

        togglers.forEach(t => t.addEventListener('click', (ev) => {
          ev.preventDefault();

          this.goToPage( pageNumber );

          return;
        }));
      });

      return this;
    }
  }

  const togglers = Array.from( document.querySelectorAll('[data-target]') ).map(e => new Toggler( e ));

  const transporters = Array.from( document.querySelectorAll('[data-transporter]')).map(e => new Transporter( e ));


  transporters.forEach(t => {
    t.setListeners();

    return;
  });

  var swiper = new Swiper('.swiper-container', {
    init: true,
    direction: 'vertical',
    loop: true,
    slidesPerView: 3,
    spaceBetween: 0,
    centeredSlides: true,
    autoHeight: true,
    speed: 500,
    autoplay: {
      delay: 2500,
    },
    on: {
      slideChange: function() {
        const prev = this.previousIndex;
        const cur = this.activeIndex;

        const prevCard = this.slides[prev].querySelector('.project-card');
        const curCard = this.slides[cur].querySelector('.project-card');

        prevCard.classList.remove('project-card--active');
        prevCard.classList.add('project-card--inactive');

        curCard.classList.remove('project-card--inactive');
        curCard.classList.add('project-card--active');

        return;
      }
    },
  });
})();
