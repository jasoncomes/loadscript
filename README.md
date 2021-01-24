# loadScript/loadScripts - Dependency Functions

> `loadScript` and `loadScripts` is used pull in Javascript dependencies without duplicating them on any given page.

### Code

```jsx
// Load Script + Callback
function loadScript(src, callback = null) {
  // Return if no arguments
  if (!src) {
    return;
  }

  // Vars
  const script = document.querySelector(`script[src^="${src}"]`);
  const addLoadEvent = (el) => {
    el.addEventListener("load", function() {
      this.readystate = true;
      if (callback) {
        callback();
      }
    });
  };
	
	// Add Script
  if (!script) {
    // Script doesn't exists, create script element
    const el = Object.assign(document.createElement("script"), {
      src,
      readyState: false,
    });

    // Append script to document head
    document.head.appendChild(el);

    // Load Event
    addLoadEvent(el);
  } else {
    // If script exists in DOM, but not yet loaded.
    if (script.readystate === false) {
      addLoadEvent(script);
    } else {
      if (callback) {
        callback();
      }
    }
  }
}

// Load Scripts
function loadScripts(scripts) {
  scripts = Array.isArray(scripts) ? scripts : [scripts];
  scripts.forEach((script) => loadScript(script));
}
```

## loadScript

### **Parameters**

- `src` String. required. A string that specifying the url to Javascript Dependency.
- `callback` Function. optional. The callback function to be triggered after the dependency has been fully loaded to the Document Head.

## loadScripts

### **Parameters**

- `scripts` String|Array. **A list of scripts to be added to the Document Head.

## Example

Below is one example where a person would have 3 different components on a particular page that all use the same Google Map JS Dependency. Instead of including it in footer.js file and bulking up the size of file, you may only add the dependency to needed pages like so. The `loadScript` function will prevent the dependency from being added 3 different times to the page and allow for callback after the dependency has been loaded. In the below example, `[https://maps.googleapis.com/maps/api/js?key=AIzaSyByeQbLyI4ktuhHvgDcga9dtVx-Kvnyy2M](https://maps.googleapis.com/maps/api/js?key=AIzaSyByeQbLyI4ktuhHvgDcga9dtVx-Kvnyy2M)` will only be added once to page.

**Page**

```html
<p>Explore accredited online colleges with our comprehensive database of online programs. Sort the results based on criteria like degree level, location, and program preference to find the schools that best meet your needs.</p>

{% google_map %}

<h2>Find your School</h2>

<p>Find Accredited Online Colleges in our School Database Explore accredited online colleges with our comprehensive database of online programs. Sort the results based on criteria like degree level, location, and program preference to find the schools that best meet your</p>

{% algolia_ipeds %}

<h2>Wheres Waldo in the US</h2>

{% wheres_waldo %}
```

**Google Map Component**

```jsx
HTML

// Google Maps
var addGoogleMaps = function() {
  ...
}

loadScript(
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyByeQbLyI4ktuhHvgDcga9dtVx-Kvnyy2M",
  addGoogleMaps
)
```

**Algolia Component with Google Map**

```jsx
HTML

var addAlgoliaMap = function() {
  ...
}

loadScript(
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyByeQbLyI4ktuhHvgDcga9dtVx-Kvnyy2M",
  addAlgoliaMap
)
```

**Where's Waldo Component**

```jsx
HTML
 
loadScripts([
  'https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.js',
  'https://cdnjs.cloudflare.com/ajax/libs/adblock-detect/1.0.5/index.min.js',
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyByeQbLyI4ktuhHvgDcga9dtVx-Kvnyy2M',
]);

```