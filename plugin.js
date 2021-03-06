tinymce.PluginManager.add('twigvariable', function(editor, url) {
    // Get params from tinymce init settings and analyse data
    var twigvariablePrefixDefined = false;
    var twigvariablePredefinedVariablesDefined = false;
    var twigvariableInputChoice = null;
    var twigvariableSettings = editor.getParam("twigvariable_settings");
    var twigvariablePrefix = twigvariableSettings[0].default_variable_prefix;
    var twigvariableDefaultPlaceholder = twigvariableSettings[0].twig_filter_default_placeholder;
    var twigvariablePredefinedVariables = twigvariableSettings[0].predefined_variable_combobox;
    if (twigvariablePrefix !== "") {
        twigvariablePrefixDefined = true;
    }
    if (typeof twigvariablePrefix === 'undefined') {
        twigvariablePrefix = "";
    }
    if (twigvariablePrefix.match(/.$/) !== true && twigvariablePrefixDefined === true) {
        twigvariablePrefix += ".";
    }
    if (typeof twigvariablePredefinedVariables !== 'undefined') {
        twigvariablePredefinedVariablesDefined = true
    }
    // Open dialog window
    function openTwigVariableDialog() {
        var twigVariableDialog = editor.windowManager.open({
            title: 'Twig Variable Plugin',
            width: 600,
            height: 340,
            body: [
                {type: 'container', html: 'Please decide wether to insert an existing variable from the combobox<br>or to type in the name of a new unique variable.<br><br>The correct syntax for twig templates will be inserted at cursor position.<br><br>'},
                {type: 'combobox', name: 'twigVariableDialogCombobox', label: 'Already existent variables:', placeholder: 'Please select a variable', values: twigvariablePredefinedVariables,
                    onSelect:
                        function() {
                            twigVariableDialog.find('#twigVariableDialogTextbox').parent().hide(true);
                            twigvariableInputChoice = "twigVariableDialogCombobox";
                        }
                },
                {type: 'textbox', name: 'twigVariableDialogTextbox', label: 'Insert new variable:',
                    onKeyDown:
                        function() {
                            twigVariableDialog.find('#twigVariableDialogCombobox').parent().hide(true);
                            twigvariableInputChoice = "twigVariableDialogTextbox";
                        }
                },
                {type: 'container', html: '<br><span style="font-weight: bold;">TinyMCE Init Settings:</span>'},
                {type: 'checkbox', text: ' twigvariable_default_placeholder should be added', checked: twigvariableDefaultPlaceholder, disabled: true},
                {type: 'checkbox', text: ' twigvariable_prefix: ' + (twigvariablePrefix === "" ? "not set" : twigvariablePrefix), checked: twigvariablePrefixDefined, disabled: true},
                {type: 'checkbox', text: ' twigvariable_predefined_variables: ' + (twigvariablePredefinedVariablesDefined === false ? "not set" : twigvariablePredefinedVariables.length) , checked: twigvariablePredefinedVariablesDefined, disabled: true}
            ],
            onSubmit: function(e) {
                // console.log(twigvariableInputChoice);
                if (twigvariableInputChoice === "twigVariableDialogTextbox") {
                    var twigvariableDefaultPlaceholderAddon = "";
                    if (twigvariableDefaultPlaceholder === true) {
                        twigvariableDefaultPlaceholderAddon = "|default(\"{{ " + twigvariablePrefix + e.data.twigVariableDialogTextbox + " }}\")";
                    }
                    editor.insertContent("{{ " + twigvariablePrefix + e.data.twigVariableDialogTextbox + twigvariableDefaultPlaceholderAddon + " }}");
                } else {
                    editor.insertContent(e.data.twigVariableDialogCombobox);
                }
            },
            onOpen: function() {
                if (twigvariablePredefinedVariablesDefined !== true) {
                    twigVariableDialog.find('#twigVariableDialogCombobox').parent().hide(true);
                }
            }
        });
    }
    // Add a button that opens a window
    editor.addButton('twigvariable', {
        tooltip: 'Insert New Twig Variable',
        icon: 'mce-ico mce-i-nonbreaking',
        onclick: function() {
            openTwigVariableDialog();
        }
    });
    // Adds a menu item to the tools menu
    editor.addMenuItem('twigvariable', {
        text: 'Insert New Twig Variable',
        icon: 'mce-ico mce-i-nonbreaking',
        context: 'tools',
        onclick: function() {
            openTwigVariableDialog();
        }
    });
});