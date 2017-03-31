Twigvariable plugin for TinyMCE
===============================

This plugin adds a button to the toolbar which opens a window and gives you the opportunity to insert a new variable in twig format.
Depending on the init parameters it is possible to permanently add a prefix to each variable and/or a default value.
The default value can be useful to prevent exceptions, if the variables are possiblibly unknown to your application.

Usage
-----

* Add the plugin script to tinymce in your project with bower
* Add "twigvariable" to tinymce config plugins and toolbar array.
* Set the optional parameters for twigvariable plugin


Installation with bower
-------
To install plugin using bower use command
```js
bower install tinymce-plugin-twigvariable
```


Initialize the plugin and the optional parameters
-------------------------------------------------

You can replace this styling by providing a `twigvariable` section in your TinyMCE config...

```js
tinyMCE.init({
  plugins: 'twigvariable',
  toolbar: 'twigvariable',
  // Parameters of twigvariable plugin
  twigvariable_prefix: 'mailingTemplate',
  twigvariable_default_placeholder: true,
});
```
