import mcFly from '../flux/mcFly';
import actionTypes from '../constants/actionTypes.js';
import Immutable from 'immutable';

let menus = Immutable.fromJS({});

function addMenu (menu) {
  const ID = menu.get('ID');
  menus = menus.set(ID, menu);
}

const MenuStore = mcFly.createStore({
  getMenuByID: function (id) {
    return menus.get(id);
  },
  getTopLevelItems: function (id) {
    const menu = menus.get(id);
    if (menu) {
      const items = menu.get('items');

      return items.filter(item => {
        if (item.get('parent') === 0) {
          return item;
        }
      });
    }

    return menus.get(id);
  },
  getPageSubmenu: function (menuId, pageId) {
    if (menus.size) {
      const menu = menus.getIn([menuId, 'items']);

      let parent;

      const current = menu.find(item => {
        return (item.get('object_id') === pageId);
      });

      if (!current) {
        return false;
      }

      if (current.get('parent') === 0) {
        parent = current;
      } else {
        parent = menu.find(item => {
          return (item.get('ID') === current.get('parent'));
        });
      }

      const items = menu.filter(item => {
        if (parent.get('ID') === item.get('parent')
        && item.get('url').indexOf('?page_id=') === -1 ) {
          return item;
        }
      }).toArray();

      return {
        parent: parent,
        items: items,
      };


      //const parent = menu.find(item => {
      //  return (item.get('object_id') === pageId) ? item.get('url') : false;
      //});
      //if (!parent) {
      //  return false;
      //}

      //const parentSlug = getSlugFromURL(parent.get('url')).split('/')[1];
      //
      //return menu.filter(item => {
      //  // if item.parent = parent.ID
      //  if (getSlugFromURL(item.get('url')).indexOf(parentSlug) > -1) {
      //    return item;
      //  }
      //}).toArray();
    } else {
      return false;
    }
  },
}, function (payload) {

  const _menus = menus;

  switch (payload.actionType) {

    case actionTypes.MENU_FETCH_SUCCESS:
    case actionTypes.MENU_FETCH_FAIL:
      addMenu(payload.data);
      break;

    default:
      return true;
  }

  if (_menus !== menus) {
    MenuStore.emitChange();
  }

  return true;
});

export default MenuStore;
