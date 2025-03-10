<p style="text-align:center;"><img src="https://staces.be/wp-content/uploads/2024/02/Traits.png" width="100" alt="Staces.be"></p>

# stEngine
The aim of this Javascript Game Engine is to provide a simple library for web developers. stEngine is usefull to create an UI browser game using HTML as game elements (The tag canvas is still usable).

## ⚠️ Important Warning

**WARNING**: The `/inc/` folder will be removed from this new GitHub project.

**WARNING**: The `/inc/tools.js` file is moving to this new GitHub project.  
**🚫 DO NOT use the `tools.js` file in the `stEngine` project.**

Please use the new CDN link instead:
[**https://cdn.jsdelivr.net/gh/Sta-ces/dom-tools/tools.min.js**](https://cdn.jsdelivr.net/gh/Sta-ces/dom-tools/tools.min.js)

Make sure to update your references to this new location.

## Installation
### Clone
You can clone this [repository](https://github.com/Sta-ces/stEngine) and import the files by your own way.<br>
<em>Recommended if you don't make lot of updates.</em>

### Import
Or import the system file directly in your module script :
```javascript
import System from 'https://cdn.jsdelivr.net/gh/Sta-ces/stEngine/system.js'
```
If you want to import the Typing system use :
```javascript
import Typing from 'https://cdn.jsdelivr.net/gh/Sta-ces/stEngine/types/typing.js'
```
If you want to import all the inc classes :
```javascript
import * as INC from 'https://cdn.jsdelivr.net/gh/Sta-ces/stEngine/inc/inc.js'
```
```javascript
let timer = new INC.Timer(() => {})
```

## Demos
- [Typing game](https://games.grumpygreen.be/clavite/)
- [Clicker game](https://games.grumpygreen.be/zeventclicker/)

## Author
- [Cedric Staces](https://staces.be/)
