(() => {
  class Tab {
    constructor(el, duration = 400) {
      this.instance = el;
      this.duration = duration;

      this.setStatus( el.getAttribute('data-tab-status') || 'hidden' );
    }

    setStatus( name ) {
      switch(name) {
        case 'hidden':
          this.status = 'hidden';
          this.instance.dataset.tabStatus = 'hidden';
          break;
        case 'hiding':
          this.status = 'hiding';
          this.instance.dataset.tabStatus = 'hiding';
          break;
        case 'visible':
          this.status = 'visible';
          this.instance.dataset.tabStatus = 'visible';
          break;
      }

      return this;
    }

    hide(cb = () => {}) {
      this.setStatus('hiding');

      if(this.timer) clearTimeout(this.timer);

      setTimeout(() => {
        this.timer = null;

        this.setStatus('hidden');

        cb();
      }, this.duration);

      return this;
    }

    show(cb = () => {}) {
      this.setStatus('hiding');

      if(this.timer) clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.timer = null;

        this.setStatus('visible');

        cb();
      }, this.duration);

      return this;
    }

    isVisible() {
      return this.status === 'visible' ? true : false;
    }
  }

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

  // const transporters = Array.from( document.querySelectorAll('[data-transporter]')).map(e => new Transporter( e ));
  //
  // transporters.forEach(t => {
  //   t.setListeners();
  //
  //   return;
  // });

  const tabs = Array.from( document.querySelectorAll('[data-tab-name]') ).map(e => ({
    tab: new Tab(e, 400),
    name: e.dataset.tabName,
  }));

  if(document.querySelectorAll('.swiper-container').length) (function() {
    const swiper = new Swiper('.swiper-container', {
      init: false,
      direction: 'vertical',
      slidesPerView: 3,
      spaceBetween: 0,
      centeredSlides: true,
      autoHeight: true,
      loop: true,
      speed: 500,
      autoplay: {
        delay: 3000,
      },
      slideToClickedSlide: true,
      on: {
        slideChange: function() {
          const prev = this.previousIndex;
          const cur = this.activeIndex;

          const prevItem = this.slides[prev];
          const curItem = this.slides[cur];

          const prevTab = tabs.find(({ name }) => prevItem.dataset.tabFor === name);
          const curTab = tabs.find(({ name }) => curItem.dataset.tabFor === name);

          if(prevTab.name !== curTab.name) {
            prevTab.tab.hide(() => {
              curTab.tab.show();
            });
          }


          const prevCard = prevItem.querySelector('.project-card');
          const curCard = curItem.querySelector('.project-card');

          prevCard.classList.remove('project-card--active');
          prevCard.classList.add('project-card--inactive');

          curCard.classList.remove('project-card--inactive');
          curCard.classList.add('project-card--active');

          return;
        },
        click: function() {
          setTimeout(() => {
            if(!swiper.autoplay.running) swiper.autoplay.start();

            return;
          }, 3000);
        },
      },
    });

    swiper.init();
  })();
})();
