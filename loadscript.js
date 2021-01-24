  
const loadScript = (src, callback = null) => {
  // return if no arguments
  if (!src) {
    return;
  }

  // vars
  const script = document.querySelector(`script[src^="${src}"]`);
  const addLoadEvent = (el) => {
    el.addEventListener("load", function() {
      this.readystate = true;
      if (callback) {
        callback();
      }
    });
  };

  // add script
  if (!script) {
    // Script doesn't exists in DOM, create script element
    const el = Object.assign(document.createElement("script"), {
      src,
      readyState: false,
    });

    // append script to document head
    document.head.appendChild(el);

    // load event
    addLoadEvent(el);
  } else {
    if (script.readystate === false) {
      // If script exists in DOM, but not yet loaded
      addLoadEvent(script);
    } else {
      // If script exists in DOM and fully loaded
      if (callback) {
        callback();
      }
    }
  }
};

const loadScripts = (scripts) => {
  scripts = Array.isArray(scripts) ? scripts : [scripts];
  scripts.forEach((script) => HE.loadScript(script));
};