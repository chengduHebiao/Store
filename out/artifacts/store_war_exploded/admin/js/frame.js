;
(function () {
  require(['avalon', 'store', 'mmRequest', 'mmRouter'], function (avalon, store) {
    var vmodel = avalon.define('frame', function (vm) {
      vm.logo = '';

      vm.navIndex = -1;

      vm.themeName = store.get('themeName') || '';
      vm.themes = [];

      vm.href = '';
      vm.showMagbar = false;
      vm.level1Menus = [];
      vm.level2Menus = [];
      vm.level2Shortmenus = [];
      vm.selectedLevel1MenuName = '';
      vm.selectedLevel2MenuName = '';
      vm.selectedLevel3MenuName = '';
      vm.selectedLevel1Menu = null;
      vm.selectedLevel2Menu = null;
      vm.selectedLevel3Menu = null;

      vm.$delayId = 0;

      vm.$watch('themeName', function (themeName) {
        store.set('themeName', themeName);
      });
      vm.$watch('level1Menus', function (level1Menus) {
        if (!level1Menus) {
          return;
        }
        vmodel.selectLevel1Menu((level1Menus.filter(function (level1Menu) {
          return level1Menu.selected;
        })[0] || level1Menus[0]).name);
      });
      vm.$watch('selectedLevel1MenuName', function (level1Name) {
        if (!level1Name) {
          return;
        }
        vmodel.selectedLevel1Menu = vmodel.level1Menus.filter(function (level1Menu) {
          return level1Menu.name === level1Name;
        })[0];
      });
      vm.$watch('selectedLevel2MenuName', function (level2Name) {
        if (!level2Name) {
          return;
        }
        vmodel.selectedLevel2Menu = vmodel.level2Menus.filter(function (level2Menu) {
          return level2Menu.name === level2Name;
        })[0];
      });
      vm.$watch('selectedLevel3MenuName', function (level3Name) {
        if (!level3Name) {
          return;
        }
        vmodel.selectedLevel3Menu = vmodel.selectedLevel2Menu.menus.filter(function (level3Menu) {
          return level3Menu.name === level3Name;
        })[0];
      });
      vm.$watch('selectedLevel1Menu', function (level1Menu) {
        if (!level1Menu) {
          return;
        }
        vmodel.level2Menus = level1Menu.menus;
        vmodel.level2Shortmenus = level1Menu.shortmenus;
        var level2Menus = vmodel.level2Menus.concat(vmodel.level2Shortmenus);
        for (var i = 0; i < level2Menus.length; i++) {
          var level2Menu = level2Menus[i];
          if (level2Menu.selected) {
            vmodel.selectLevel2Menu(level2Menu.name);
            return;
          }
          var level3Menus = level2Menu.menus;
          for (var j = 0; j < level3Menus.length; j++) {
            var level3Menu = level3Menus[j];
            if (level3Menu.selected) {
              vmodel.selectLevel3Menu(level2Menu.name, level3Menu.name);
              vmodel.toggleMenu(level2Menu, true);
              return;
            }
          };
        }
      });

      vm.stopPropagation = function (event) {
        event.stopPropagation();
      };
      vm.preventDefault = function (event) {
        event.preventDefault();
      };
      vm.toggleMagbar = function (toggle) {
        vmodel.showMagbar = !!toggle;
      };
      vm.toggleMenu = function (menu, toggle) {
        menu.expanded = toggle === undefined ? !menu.expanded : !!toggle;
      };
      vm.selectLevel1Menu = function (level1Name) {
        vmodel.selectedLevel1MenuName = level1Name;
        vmodel.toggleMagbar(false);
      };
      vm.selectLevel2Menu = function (level2Name) {
        vmodel.selectedLevel2MenuName = level2Name;
        vmodel.selectedLevel3MenuName = '';
        vmodel.href = vmodel.selectedLevel2Menu.href;
      };
      vm.selectLevel3Menu = function (level2Name, level3Name) {
        vmodel.selectedLevel2MenuName = level2Name;
        vmodel.selectedLevel3MenuName = level3Name;
        vmodel.href = vmodel.selectedLevel3Menu.href;
      };
      vm.selectNav = function (navIndex, enter) {
        if (enter && vmodel.navIndex === -1) {
          return;
        }
        clearTimeout(vmodel.$delayId);
        vmodel.$delayId = setTimeout(function () {
          vmodel.navIndex = navIndex;
        }, navIndex === -1 ? 500 : 0);
      };
      vm.selectTheme = function (themeName) {
        vmodel.themeName = themeName;
      }
    });

    avalon.scan();

    avalon.ajax({
      url: 'frame.config.json'
    }).then(function (config) {
      var defaults = {
        level1Menu: {
          name: '',
          title: '',
          icon: '',
          selected: false,
          menus: [],
          shortmenus: []
        },
        level2Menu: {
          name: '',
          title: '',
          href: '',
          selected: false,
          expanded: false,
          menus: []
        },
        level3Menu: {
          name: '',
          title: '',
          href: '',
          selected: false
        }
      };

      config.menus.forEach(function (menu) {
        avalon.mix(menu, avalon.mix({}, defaults.level1Menu, menu));

        menu.menus.concat(menu.shortmenus).forEach(function (menu) {
          avalon.mix(menu, avalon.mix({}, defaults.level2Menu, menu));

          menu.menus.forEach(function (menu) {
            avalon.mix(menu, avalon.mix({}, defaults.level3Menu, menu));
          });
        });
      });

      vmodel.logo = config.logo;
      vmodel.themes = config.themes;
      vmodel.level1Menus = config.menus;

      avalon.router.get('/:level1Name', function(level1Name) {
        vmodel.selectLevel1Menu(level1Name);
      });
      avalon.router.get('/:level1Name/:level2Name', function(level1Name, level2Name) {
        vmodel.selectLevel1Menu(level1Name);
        vmodel.selectLevel2Menu(level2Name);
      });
      avalon.router.get('/:level1Name/:level2Name/:level3Name', function(level1Name, level2Name, level3Name) {
        vmodel.selectLevel1Menu(level1Name);
        vmodel.selectLevel3Menu(level2Name, level3Name);
      });
      
      avalon.history.start();
    });
  });
}());