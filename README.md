# TheToggler
A toggler library

## ReadMe contents
1. Usage Guide
2. Change Logs

## 1. Usage Guide
TheToggler is a standalone JS library. No other dependancies required.
There is only 1 file required
1. TheToggler.js (TheToggler.min.js)

### Basic Syntax
```
TheToggler( 
    toggler(required): selector or element,
    targets(required): selector or array[selector_1, selector_2, ...],
    options(optional): {
      option_1 : option_1_value,
      option_2 : option_2_value...
    }
 )
 ```

### Example: 1 Target to Toggle

#### Example 1 HTML
    <a id="sidebar-toggle"></a>
    <!-- some html content -->
    <div class="sidebar">
      <!-- sidebar content -->
    </div>

#### Exmaple 1 JavaScript
```const SIDEBAR_TOGGLE = TheToggler('#sidebar-toggle', '.sidebar')```


### Example: Multiple Targets to Toggle

#### Example 2 HTML
    <a id="nightmode-toggle"></a>
    <!-- some html content -->
    <div class="lightmode-sun"><img src="sun.png"></div>
    <div class="nightmode-moon"><img src="moon.png"></div>
    <!-- more html content -->
    <div class="footer">
      <div class="footer__nightmode-stars><img src="stars.png"></div>
    </div>

#### Example 2 JavaScript
```const NIGHTMODE_TOGGLE = TheToggler('#sidebar-toggle', ['.lightmode-sun', '.nightmode-moon', '.footer__nightmode-stars'])```

### Example 3: Passing DOM element as toggler

#### Example 3 HTML
    <span id="chat-toggler"></span>
    <div class="chat-window"></div>

#### Example 3 JavaScript
```
const CHAT_TOGGLER = document.querySelector('#chat-toggler');
const CHAT_TOGGLE = TheToggler(CHAT_TOGGLER, '.chat-window')
```

### Example 4: Options
Options are JSON structures that defines the accordion's behaviour. Any options not defined by the user will use the default options.

#### Available options
1. activateWith (string) - Passing 'attr' or 'class' will add a HTLM attribute or class on active state
2. activeKey (string) - Defines the attribute or class to add on active state
3. activeByDefault (boolean) - If set to true, state will be active by default
4. deactivateWhenClickTargets (boolean) - If set to true, active state will be removed when targets are clicked
5. deactivateWhenClickOutTargets (boolean) - If set to true, active state will be removed elements outside targets are clicked

#### Default option values
1. activateWith: 'attr',
2. activeKey: 'data-active',
3. activeByDefault: false,
4. deactivateWhenClickTargets: false,
5. deactivateWhenClickOutTargets: false,

#### Specifying options
Let's add a sidebar that closes when other outside sidebar is clicked and specify activate state to be ```[data-open]```

#### Example 4 HTML
    <nav>
      <span id="sidebar-toggler" class="hamburger"></span>
      <a href="blog">Read my Blog</a>
    </nav>
    <div id="sidebar" class="sidebar--fixed">
    </div>

#### Example 4 JavaScript
```const SIDEBAR_TOGGLE = TheToggler('#sidebar-toggler', '#sidebar', {activeKey: 'data-open', deactivateWhenClickOutTargets: true});```
 

## 2. Change Logs
### Ver 1.0.1
1. Added activateWith and activeKey options
2. Refactor TheToggler.js to use more ES6
