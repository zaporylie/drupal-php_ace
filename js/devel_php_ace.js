
var StorageUnit = (function() {
  var is_supported = function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  };

  var _ = window.StorageUnit = {
    supported: is_supported(),

    save: function(key, data) {
      var toSave = {
        data: data
      }
      toSave = JSON.stringify(toSave);
      localStorage['StorageUnit_' + key] = toSave;
    },
    get: function(key) {
      if (typeof localStorage['StorageUnit_' + key] !== 'undefined') {
        var restoredData = JSON.parse(localStorage['StorageUnit_' + key]);
        return restoredData.data;
      }
      else {
        return '';
      }
    },
    remove: function(key) {
      localStorage.removeItem('StorageUnit_' + key);
    }
  };

  return window.StorageUnit;
})();


(function($) {
  Drupal.behaviors.php_ace = {
    attach: function(context, settings) {
      var modelist = require("ace/ext/modelist");
      $('.ace-enabled').each(function(i) {
        var textarea = $(this);
        id = textarea.attr('id');
        textarea.before('<div id="' + id + '-ace"></div>');
        console.log(id);
        var editor = ace.edit(id + '-ace');
        editor.getSession().setMode("ace/mode/javascript");
        editor.getSession().setValue(textarea.val());
        editor.getSession().on('change', function(){
          textarea.val(editor.getSession().getValue());
          if (StorageUnit.supported) {
            StorageUnit.save('drupal-php-' + id, editor.getSession().getValue());
          }
        });
        textarea.hide();
        $('.grippie', textarea.parent()).hide();

        if (StorageUnit.supported) {
          editor.setValue(StorageUnit.get('drupal-php-' + id));
          editor.clearSelection();
        }
      });
    }
  };

})(jQuery);
