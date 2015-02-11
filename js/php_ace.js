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
        });
        textarea.hide();
      });
    }
  };
})(jQuery);