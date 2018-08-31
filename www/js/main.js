"use strict";var _createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(){var t,e=function(){function i(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:400;_classCallCheck(this,i),this.instance=t,this.duration=e,this.setStatus(t.getAttribute("data-tab-status")||"hidden")}return _createClass(i,[{key:"setStatus",value:function(t){switch(t){case"hidden":this.status="hidden",this.instance.dataset.tabStatus="hidden";break;case"hiding":this.status="hiding",this.instance.dataset.tabStatus="hiding";break;case"visible":this.status="visible",this.instance.dataset.tabStatus="visible"}return this}},{key:"hide",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){};return this.setStatus("hiding"),this.timer&&clearTimeout(this.timer),setTimeout(function(){t.timer=null,t.setStatus("hidden"),e()},this.duration),this}},{key:"show",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){};return this.setStatus("hiding"),this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){t.timer=null,t.setStatus("visible"),e()},this.duration),this}},{key:"isVisible",value:function(){return"visible"===this.status}}]),i}(),i=function(){function i(t){var e=this;_classCallCheck(this,i),this.listen=function(){return e.toggler.addEventListener("click",e.toggle)},this.unlisten=function(){return e.toggler.removeEventListener("click",e.toggle)},this.toggle=function(t){t.preventDefault(),e.toggler.dataset.ariaExpended=!e.expended,e.target.dataset.ariaExpended=!e.expended,e.expended=!e.expended},this.toggler=t,this.expended="true"===this.toggler.dataset.ariaExpended,this.target=document.getElementById(t.dataset.target),this.target.dataset.ariaExpended=this.expended,this.listen()}return _createClass(i,[{key:"isExpended",value:function(){return this.expended}}]),i}(),u=(function(){function i(t){_classCallCheck(this,i),this.el=t;var e=Array.from(t.querySelectorAll("[data-page]"));this.pages=e.map(function(t){var e=Array.from(t.querySelectorAll("[data-page-toggler]"));return{instance:t,togglers:e}}),this.goToPage(1)}_createClass(i,[{key:"setTop",value:function(t){var e=t+"px";return this.el.setAttribute("style","top: "+e),this}},{key:"getPositionByPage",value:function(t){return this.pages[t-1].instance.offsetTop}},{key:"goToPage",value:function(t){var e=this.getPositionByPage(t);return this.setTop(-e),this}},{key:"setListeners",value:function(){var a=this;return this.pages.forEach(function(t,e){t.instance;var i=t.togglers,n=e+1===a.pages.length?1:e+2;i.forEach(function(t){return t.addEventListener("click",function(t){t.preventDefault(),a.goToPage(n)})})}),this}}])}(),Array.from(document.querySelectorAll("[data-target]")).map(function(t){return new i(t)}),Array.from(document.querySelectorAll("[data-tab-name]")).map(function(t){return{tab:new e(t,400),name:t.dataset.tabName}}));document.querySelectorAll(".swiper-container").length&&(t=new Swiper(".swiper-container",{init:!1,direction:"vertical",slidesPerView:3,spaceBetween:0,centeredSlides:!0,autoHeight:!0,loop:!0,speed:500,autoplay:{delay:3e3},slideToClickedSlide:!0,on:{slideChange:function(){var t=this.previousIndex,e=this.activeIndex,i=this.slides[t],n=this.slides[e],a=u.find(function(t){var e=t.name;return i.dataset.tabFor===e}),s=u.find(function(t){var e=t.name;return n.dataset.tabFor===e});a.name!==s.name&&a.tab.hide(function(){s.tab.show()});var r=i.querySelector(".project-card"),o=n.querySelector(".project-card");r.classList.remove("project-card--active"),r.classList.add("project-card--inactive"),o.classList.remove("project-card--inactive"),o.classList.add("project-card--active")},click:function(){setTimeout(function(){t.autoplay.running||t.autoplay.start()},3e3)}}})).init()}();
//# sourceMappingURL=main.js.map
