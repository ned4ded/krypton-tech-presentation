(() => {
  const $dashboard = $('#display');
  const $lining = $('#menu-lining');
  const $toggler = $('#menu-toggler');
  const $menu = $('#menu');


  $toggler.click(function() {
    $menu.removeClass('menu--collapsed');
    $dashboard.addClass('display--blocked');
  });

  $lining.click(function() {
    $menu.addClass('menu--collapsed');
    $dashboard.removeClass('display--blocked');
  });

})();
