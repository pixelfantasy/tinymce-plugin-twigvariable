tinymce.PluginManager.add('twigvariable', function(editor, url) {
    // Get params from tinymce init settings
    var twigvariablePrefix = editor.getParam("twigvariable_prefix");
    var twigvariableDefaultPlaceholder = editor.getParam("twigvariable_default_placeholder");
    var twigvariablePrefixDefined = false;
    if (twigvariablePrefix == undefined) {
        twigvariablePrefix = "";
    } else {
        twigvariablePrefixDefined = true;
    }
    if (twigvariablePrefix.match(/.$/) != true && twigvariablePrefixDefined == true) {
        twigvariablePrefix += ".";
    }
    function openTwigVariableDialog(twigvariablePrefix, twigvariableDefaultPlaceholder) {
        editor.windowManager.open({
            title: 'Twig Variable Plugin',
            width: 500,
            height: 250,
            body: [
                {type: 'container', html: 'Please define a unique variable name.<br>The correct syntax for twig templates will be inserted.<br><br>'},
                {type: 'textbox', name: 'variable', label: 'Variable name:'},
                {type: 'container', html: '<br><span style="font-weight: bold;">TinyMCE Init Settings:</span>'},
                {type: 'checkbox', text: ' twigvariable_default_placeholder', checked: twigvariableDefaultPlaceholder, disabled: true},
                {type: 'checkbox', text: ' twigvariable_prefix: ' + twigvariablePrefix, checked: twigvariablePrefixDefined, disabled: true}
            ],
            onsubmit: function(e) {
                var twigvariableDefaultPlaceholderAddon = "";
                if (twigvariableDefaultPlaceholder == true) {
                    twigvariableDefaultPlaceholderAddon = "|default('{{ " + twigvariablePrefix + e.data.variable + " }}')";
                }
                editor.insertContent("{{ " + twigvariablePrefix + e.data.variable + twigvariableDefaultPlaceholderAddon + " }}");
            }
        });
    }
    // Add a button that opens a window
    editor.addButton('twigvariable', {
        tooltip: 'Insert New Twig Variable',
        icon: 'mce-ico mce-i-nonbreaking',
        onclick: function() {
            openTwigVariableDialog(twigvariablePrefix, twigvariableDefaultPlaceholder);
        }
    });
    // Adds a menu item to the tools menu
    editor.addMenuItem('twigvariable', {
        text: 'Insert New Twig Variable',
        icon: 'mce-ico mce-i-nonbreaking',
        context: 'tools',
        onclick: function() {
            openTwigVariableDialog(twigvariablePrefix, twigvariableDefaultPlaceholder);
        }
    });
});
