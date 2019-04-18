// IE polyfill.
import 'intersection-observer';

const observeVisibility = (slots) =>{
  const config = {
    root: null, // setting it to 'null' sets it to default value: viewport
    rootMargin: '300px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      let { isIntersecting } = entry;
      // Necesary hack to get it working with elements that are display:none;
      entry.target.style.display = 'block';

      if (isIntersecting === true) {
        let entryId = entry.target.id;
        let slotID = entryId.replace('dfp-slot-', 'slot_'); // Map slot name from id.
        observer.unobserve(entry.target);
        googletag.pubads().refresh([googletag.slots[slotID]]);
      }
    });
  }, config);

  // Observe all the slot Dom elements.
  slots.forEach(slot => {
    let tagID = googletag.slots[slot].getSlotElementId();
    let domElement = document.getElementById(tagID);
    observer.observe(domElement);
  });
};

let googletag = window.googletag || {};
googletag.cmd = window.googletag.cmd || [];
googletag.cmd.push(function(){
  if (('IntersectionObserver' in window)) {
    observeVisibility(Object.keys(googletag.slots));
  }
});

