### js.colorGradient

---

## About
This small javascript library calculates a gradient of multiple colors. The result and whole gradient can be accessed via percentage. The gradient will only be calculated one to save execution time.

## Basic Usage
1.) Include library:
```HTML
<script type="text/javascript" src="color.gradient..min.js"></script>
```

2.) Initialize by pass a color array for the gradient and read the values by percentage selector: 
```JS
var gradient = new ColorGradient(["#f00", "#0f0", "#00f"]);
var color = gradient.getHexColorAtPercentage([0...100]);
```
Take a look at the example for more details.


## Bugs / Feature request
Please [report](http://github.com/eisbehr-/js.colorGradient/issues) bugs and feel free to [ask](http://github.com/eisbehr-/js.colorGradient/issues) for new features directly on GitHub.


## License
js.colorGradient is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.
