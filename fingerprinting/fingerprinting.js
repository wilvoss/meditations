/// <reference path="../shared.js" />
/// <reference path="../log.js" />

class FingerprintingObject {
  constructor(spec) {
    this.id = spec.id === undefined ? '' : spec.id;
    this.title = spec.title === undefined ? '' : spec.title;
    this.description = spec.description === undefined ? '' : spec.description;
    this.category = spec.category === undefined ? '' : spec.category;
  }
}

function AddRowToInfo(left, right, classname) {
  // do not display rows that are explicitly zero-weight in DETAILS_MAP
  if (typeof DETAILS_MAP !== 'undefined' && DETAILS_MAP[left] && DETAILS_MAP[left].weight === 0) {
    return;
  }

  var tbody = document.querySelector('#fingerprinting-table tbody');
  if (!tbody) return;
  var tr = document.createElement('tr');
  var display = right === undefined || right === null ? '' : right;
  // create three cells: weight placeholder, attribute, value
  var tdWeight = document.createElement('td');
  tdWeight.className = 'weight-cell';
  // include-toggle checkbox so users can include/exclude this attribute from the hash
  var includeCheckbox = document.createElement('input');
  includeCheckbox.type = 'checkbox';
  includeCheckbox.className = 'include-toggle';
  includeCheckbox.checked = true;
  includeCheckbox.setAttribute('aria-label', 'Include in fingerprint');
  // Use a stable base label for metadata lookups on the row, but give each
  // checkbox a globally-unique dataset label so toggles always target the
  // exact checkbox instance even when multiple rows share the same attribute
  // name (for example many 'Plugin' rows).
  var baseLabel = String(left);
  try {
    window._fingerprinting_checkbox_seq = window._fingerprinting_checkbox_seq || 0;
    includeCheckbox.dataset.label = baseLabel + '|' + window._fingerprinting_checkbox_seq++;
  } catch (e) {
    includeCheckbox.dataset.label = baseLabel + '|' + Math.floor(Math.random() * 100000);
  }
  var tdAttr = document.createElement('td');
  tdAttr.textContent = left;
  try {
    if (typeof TOOLTIP_MAP !== 'undefined') {
      // Normalize label to match keys in TOOLTIP_MAP: trim and replace NBSP with space
      var normLabel = String(left || '')
        .replace(/\u00A0/g, ' ')
        .trim();
    }
  } catch (e) {}
  var tdVal = document.createElement('td');
  tdVal.innerHTML = String(display);
  // append in weight/label/value order so weight shows as first column
  tr.appendChild(tdWeight);
  tr.appendChild(tdAttr);
  tr.appendChild(tdVal);
  var classes = classname == undefined ? '' : classname;
  // treat undefined, null or purely-whitespace as empty
  var isEmpty = right === undefined || right === null || String(right).trim() === '';
  if (isEmpty) {
    classes = classes ? classes + ' empty' : 'empty';
  }
  // set className where useful (e.g., 'empty' or level1)
  tr.className = classes;
  // set a stable data-label attribute on the row for future lookups
  tr.setAttribute('data-label', baseLabel);
  var container = document.getElementsByTagName('fingerprintinginess')[0];
  // attach tooltip when available

  // Determine weight value if present; default to 0 when missing.
  var weightVal = 0;
  try {
    if (typeof DETAILS_MAP !== 'undefined' && DETAILS_MAP[left]) {
      weightVal = Number(DETAILS_MAP[left].weight) || 0;
    }
  } catch (e) {}

  // Set semantic role and label for the weight cell.
  tdWeight.setAttribute('role', 'cell');
  tdWeight.setAttribute('aria-label', 'weight');

  // Make the weight cell interactive in all cases: clicking or pressing Enter/Space toggles the include checkbox.
  // Provide keyboard focus and ARIA pressed state for accessibility.
  tdWeight.tabIndex = 0;
  tdWeight.setAttribute('role', 'button');
  tdWeight.setAttribute('aria-pressed', includeCheckbox.checked ? 'true' : 'false');
  tdWeight.classList.add('weight-interactive');

  // visible numeric percent only (no visual bar). Hidden by CSS if undesired.
  var pctLabel = document.createElement('span');
  pctLabel.className = 'weight-text';
  pctLabel.textContent = weightVal + '%';
  pctLabel.setAttribute('aria-hidden', 'true');

  // append checkbox then weight text
  tdWeight.appendChild(includeCheckbox);
  tdWeight.appendChild(pctLabel);

  // Toggle behavior: click or keyboard toggles the checkbox and triggers the centralized toggle handler.
  tdWeight.addEventListener('click', function (ev) {
    // If the click originated on the checkbox itself, let its handler run normally.
    if (ev.target && ev.target.classList && ev.target.classList.contains('include-toggle')) return;
    // flip checkbox
    includeCheckbox.checked = !includeCheckbox.checked;
    // update aria-pressed
    tdWeight.setAttribute('aria-pressed', includeCheckbox.checked ? 'true' : 'false');
    // call centralized toggle if available
    if (window.FINGERPRINTING_toggle) window.FINGERPRINTING_toggle(includeCheckbox.dataset.label, includeCheckbox.checked);
  });
  tdWeight.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.click();
    }
  });
  // click opens modal with more detail
  // make row keyboard-focusable and open modal on Enter/Space
  tr.tabIndex = 0;
  tr.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.click();
    }
  });

  tr.addEventListener('click', function (ev) {
    // Clicking the attribute cell should open a modal with details.
    // Clicking the checkbox itself should only toggle the checkbox (no row handler effect).
    var target = ev.target;
    // If the click originated on the checkbox, ignore here (it handles its own change).
    if (target && target.classList && target.classList.contains('include-toggle')) {
      return;
    }
    // If click occurred on the attribute cell (td), open details modal
    if (target && (target.tagName === 'TD' || target.tagName === 'SPAN')) {
      // find the attribute cell for this row
      var attrCell = tr.children[1];
      if (attrCell && (attrCell === target || attrCell.contains(target))) {
        var label = String(tr.getAttribute('data-label'));
        // Build modal content from DETAILS_MAP[label] or TOOLTIP_MAP[label]
        var title = label;
        var bodyHtml = '';
        try {
          if (DETAILS_MAP && DETAILS_MAP[label]) {
            var d = DETAILS_MAP[label];
            var weightText = d.weight !== undefined ? '<div class="detail-weight"><b>Weight:</b> ' + escapeHtml(String(d.weight)) + '%</div>' : '';
            var desc = d.detail || d.description || '';
            bodyHtml += weightText;
            if (desc && desc.trim() !== '') {
              // If the detail appears to contain HTML tags (for example <p>), insert as HTML so
              // paragraph markup from metadata renders correctly. Otherwise escape to avoid injection.
              var looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(desc);
              if (looksLikeHtml) {
                bodyHtml += '<div class="detail-desc">' + String(desc) + '</div>';
              } else {
                bodyHtml += '<div class="detail-desc">' + escapeHtml(desc) + '</div>';
              }
            }
          }
        } catch (e) {}
        try {
          if ((!bodyHtml || bodyHtml.trim() === '') && TOOLTIP_MAP && TOOLTIP_MAP[label]) {
            bodyHtml = '<div class="detail-desc">' + escapeHtml(TOOLTIP_MAP[label]) + '</div>';
          }
        } catch (e) {}
        if (!bodyHtml) bodyHtml = '<em>No details available.</em>';
        showFingerprintingModal(title, bodyHtml);
        return;
      }
    }
    // otherwise, ignore row clicks (we don't toggle checkbox here anymore)
  });

  // prevent checkbox clicks from bubbling up and triggering row click
  includeCheckbox.addEventListener('click', function (ev) {
    ev.stopPropagation();
    // Let 'change' event handle toggling/persistence
  });

  // Allow clicking or keyboard-activating the value cell to toggle the include checkbox.
  // Ignore clicks that originate on interactive elements (links, buttons, inputs) so they behave normally.
  tdVal.tabIndex = 0;
  tdVal.setAttribute('role', 'button');
  tdVal.addEventListener('click', function (ev) {
    var tgt = ev.target;
    if (tgt && tgt.tagName) {
      var tag = tgt.tagName.toUpperCase();
      // ignore native interactive controls so their default behavior is preserved
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    }
    // flip checkbox
    includeCheckbox.checked = !includeCheckbox.checked;
    // update aria-pressed on the weight cell if present
    try {
      tdWeight.setAttribute('aria-pressed', includeCheckbox.checked ? 'true' : 'false');
    } catch (e) {}
    // call centralized toggle if available
    if (window.FINGERPRINTING_toggle) window.FINGERPRINTING_toggle(includeCheckbox.dataset.label, includeCheckbox.checked);
  });
  tdVal.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.click();
    }
  });
  // insert row into tbody
  tbody.appendChild(tr);

  // ensure delegated listener is attached once on tbody to handle toggles
  try {
    if (!tbody.dataset.toggleInit) {
      tbody.addEventListener('change', function (ev) {
        var tgt = ev.target;
        if (tgt && tgt.classList && tgt.classList.contains('include-toggle')) {
          var label = tgt.dataset.label;
          if (window.FINGERPRINTING_toggle) {
            window.FINGERPRINTING_toggle(label, tgt.checked);
          }
        }
      });
      tbody.dataset.toggleInit = '1';
    }
  } catch (e) {}

  // no visual bar to adjust — only numeric percent displayed
}

// Load tooltip/details maps from external metadata file to avoid duplication with docs.
// Edit /fingerprinting/metadata.json to update user-facing strings and weights.
var TOOLTIP_MAP = {};
var DETAILS_MAP = {};
// Promise that resolves when metadata is loaded. Code may await this if it needs metadata before proceeding.
var METADATA_LOADED = (async function loadMetadata() {
  try {
    const res = await fetch('/fingerprinting/metadata.json');
    if (!res.ok) throw new Error('metadata fetch failed: ' + res.status);
    const j = await res.json();
    TOOLTIP_MAP = j.tooltipMap || {};
    DETAILS_MAP = j.detailsMap || {};
  } catch (err) {
    console.warn('Unable to load /fingerprinting/metadata.json, continuing with empty metadata', err);
    TOOLTIP_MAP = TOOLTIP_MAP || {};
    DETAILS_MAP = DETAILS_MAP || {};
  }
})();

// Minimal modal implementation for attribute details using the <modal> tag
var _fingerprinting_modal = null;
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function createFingerprintingModal() {
  if (_fingerprinting_modal) return _fingerprinting_modal;
  var modal = document.createElement('modal');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  modal.innerHTML = '<div class="fingerprinting-modal-backdrop"></div><div class="fingerprinting-modal-panel" role="document"><button class="fingerprinting-modal-close" aria-label="Close">×</button><h2 class="fingerprinting-modal-title"></h2><div class="fingerprinting-modal-body"></div></div>';
  document.body.appendChild(modal);

  // close handlers
  modal.querySelector('.fingerprinting-modal-close').addEventListener('click', function () {
    hideFingerprintingModal();
  });
  modal.querySelector('.fingerprinting-modal-backdrop').addEventListener('click', function () {
    hideFingerprintingModal();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') hideFingerprintingModal();
  });

  _fingerprinting_modal = modal;
  return modal;
}

function showFingerprintingModal(title, html) {
  var m = createFingerprintingModal();
  m.setAttribute('aria-hidden', 'false');
  m.style.display = 'block';
  m.querySelector('.fingerprinting-modal-title').textContent = title || '';
  var body = m.querySelector('.fingerprinting-modal-body');
  body.innerHTML = html || '';
}

function hideFingerprintingModal() {
  if (!_fingerprinting_modal) return;
  _fingerprinting_modal.setAttribute('aria-hidden', 'true');
  _fingerprinting_modal.style.display = 'none';
}

// Modal DOM (insert once)
// Modal behavior removed: clicking rows toggles inclusion instead of opening details.
function getFingerprintinginess() {
  var fingerprintinginess = window.navigator;

  // Fingerprint aggregator and UI update for <summary>
  var fingerprintParts = {};
  function updateFingerprint() {
    // Build canonical string from fingerprintParts (sorted keys) and compute SHA-256
    (async function () {
      try {
        var keys = Object.keys(fingerprintParts).sort();
        var concat = keys
          .map(function (k) {
            return k + ':' + fingerprintParts[k];
          })
          .join('|');
        var hex = await sha256Hex(concat);
        // Keep full SHA-256 as hex and display the full value in the UI
        var fullHash = hex;
        var demoHash = fullHash;

        // Preferred: write into the new details/summary structure
        var hashEl = document.getElementById('fingerprint-hash');
        var expandedEl = document.getElementById('fingerprint-expanded');
        var explanation =
          '<section class="explain-terms">' +
          '<p>This fingerprint is for demo purposes only and is not shared or saved.' +
          '<p>The best data for creating a fingerprint comes from unique and stable characteristics of your device and browser. Uniqueness and stability are defined in terms of <strong>volatility</strong> and <strong>entropy</strong>. </p> <p><strong>Volatility</strong> refers to how often a value changes. For example, your public IP address may change when you switch networks. Volatile items are useful for linking short visits but not for long-term device identification.</p> <p><strong>Entropy</strong> measures how much an item helps distinguish devices. High-entropy items (like a detailed canvas fingerprint or a wide variety of installed fonts) make it easier to identify a specific device among many. Low-entropy items (like a common browser name) are less helpful on their own.</p>' +
          '</section>';

        if (hashEl) {
          // show full hash (single canonical place)
          hashEl.textContent = demoHash;
        }
        if (expandedEl) {
          // expanded area shows explanation only (avoid duplicating the code)
          expandedEl.innerHTML = explanation;
        } else {
          // fallback for older markup: write to first <summary> (keep code here if no dedicated elements exist)
          var summaryEl = document.getElementsByTagName('summary')[0];
          if (!summaryEl) return;
          summaryEl.innerHTML = '<strong>Demo fingerprint:</strong> <code>' + demoHash + '</code>';
          summaryEl.innerHTML += explanation;
        }
      } catch (e) {
        console.error('Failed to compute SHA-256 fingerprint', e);
      }
    })();
  }

  // helper: compute SHA-256 and return hex string
  async function sha256Hex(input) {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(input);
      const hash = await crypto.subtle.digest('SHA-256', data);
      const bytes = new Uint8Array(hash);
      let s = '';
      for (let i = 0; i < bytes.length; i++) {
        s += ('00' + bytes[i].toString(16)).slice(-2);
      }
      return s;
    } catch (e) {
      return '(sha-error)';
    }
  }

  // Move top-3 fingerprinting rows (Canvas/WebGL, User Agent, Fonts) to just under IP
  function reorderTopThree() {
    var container = document.getElementsByTagName('fingerprintinginess')[0];
    if (!container) return;
    // find the IP element
    var ipEl = null;
    Array.from(container.children).forEach(function (ch) {
      var sp = ch.querySelector && ch.querySelector('span');
      if (sp && sp.textContent === 'Public IP Address') ipEl = ch;
    });
    if (!ipEl) return; // nothing to reorder yet

    // desired order: WebGL Vendor, WebGL Renderer, Canvas Fingerprint, User Agent, Fonts Detected
    var labels = ['WebGL Vendor', 'WebGL Renderer', 'Canvas Fingerprint', 'User Agent', 'Fonts Detected'];
    var last = ipEl;
    labels.forEach(function (label) {
      var el = null;
      Array.from(container.children).forEach(function (ch) {
        var sp = ch.querySelector && ch.querySelector('span');
        if (sp && sp.textContent === label) el = ch;
      });
      if (el && last && last.parentNode) {
        last.parentNode.insertBefore(el, last.nextSibling);
        last = el;
      }
    });
  }

  // core rows collected synchronously
  var rows = [];
  rows.push(['Color Depth', window.screen.colorDepth]);
  rows.push(['Timezone', Intl.DateTimeFormat().resolvedOptions().timeZone]);
  rows.push(['Language', fingerprintinginess.language]);
  rows.push(['Touch Support', 'ontouchstart' in window ? 'Yes' : 'No']);
  rows.push(['Cookie Enabled', fingerprintinginess.cookieEnabled]);
  rows.push(['Do Not Track', fingerprintinginess.doNotTrack]);
  // Incognito Mode removed: detection is unreliable across browsers
  rows.push(['Online', fingerprintinginess.onLine]);
  rows.push(['Referrer', document.referrer || 'N/A']);
  rows.push(['LocalStorage', typeof window.localStorage !== 'undefined' ? 'Yes' : 'No']);
  rows.push(['SessionStorage', typeof window.sessionStorage !== 'undefined' ? 'Yes' : 'No']);
  rows.push(['App Name', fingerprintinginess.appName]);
  rows.push(['App Version', fingerprintinginess.appVersion]);
  rows.push(['Vendor', fingerprintinginess.vendor]);
  rows.push(['Product', fingerprintinginess.product]);
  rows.push(['ProductSub', fingerprintinginess.productSub]);
  if (fingerprintinginess.connection) {
    rows.push(['Connection Downlink', fingerprintinginess.connection.downlink]);
    rows.push(['Connection EffectiveType', fingerprintinginess.connection.effectiveType]);
  }
  rows.push(['Orientation', window.screen.orientation ? window.screen.orientation.type : 'N/A']);

  // helper to update an existing row's value in the DOM
  function updateRowValue(label, value) {
    var tbody = document.querySelector('#fingerprinting-table tbody');
    if (!tbody) return;
    var found = tbody.querySelector('tr[data-label="' + String(label) + '"]');
    if (found) {
      // children order: 0=weight, 1=label, 2=value
      var valCell = found.children[2];
      // When a value has been finalized but is empty/null/undefined, show
      // a human-friendly placeholder instead of a blank string.
      var isEmpty = value === undefined || value === null || String(value).trim() === '';
      if (valCell) valCell.textContent = isEmpty ? 'None detected' : String(value);
      // update empty class
      if (isEmpty) {
        found.classList.add('empty');
      } else {
        found.classList.remove('empty');
      }
    }
    try {
      // only include in fingerprintParts if not zero-weight AND the include-toggle
      // checkbox in this row is checked. We look up the checkbox that lives in
      // the row with the matching base data-label to avoid collisions when many
      // rows share the same label.
      var include = true;
      if (tbody) {
        var rowChk = tbody.querySelector('tr[data-label="' + String(label) + '"] input.include-toggle');
        if (rowChk) include = rowChk.checked;
      }
      if (include && !(DETAILS_MAP[label] && DETAILS_MAP[label].weight === 0)) {
        fingerprintParts[label] = value;
      } else {
        // remove if previously present
        if (fingerprintParts.hasOwnProperty(label)) delete fingerprintParts[label];
      }
    } catch (e) {}
    updateFingerprint();
    sortRowsByWeight();
  }

  // Expose a toggle handler for checkboxes so they can control inclusion in the fingerprint
  window.FINGERPRINTING_toggle = function (label, checked) {
    try {
      var tbody = document.querySelector('#fingerprinting-table tbody');
      if (!tbody) return;
      // Attempt to find a row by data-label; if multiple rows use the same
      // base label (for example many 'Plugin' rows), prefer the row that
      // contains the checkbox whose dataset.label exactly matches the provided
      // label argument.
      var row = null;
      // First try the simple lookup
      var simple = tbody.querySelectorAll('tr[data-label="' + String(label) + '"]');
      if (simple && simple.length === 1) {
        row = simple[0];
      } else if (simple && simple.length > 1) {
        // If multiple rows match the base label, locate the input.include-toggle
        // whose dataset.label matches the provided label argument exactly.
        var chk = tbody.querySelector('input.include-toggle[data-label="' + String(label) + '"]');
        if (chk) row = chk.closest('tr');
      }
      // As a fallback, if we couldn't find a matching row by the above,
      // look for any checkbox with that exact dataset label and use its row.
      if (!row) {
        var altChk = document.querySelector('input.include-toggle[data-label="' + String(label) + '"]');
        if (altChk) row = altChk.closest('tr');
      }
      if (!row) return;
      // if toggled off, remove from fingerprintParts; if on, try to re-add the current displayed value
      if (!checked) {
        // Remove from fingerprintParts by using the base row data-label.
        try {
          var base = row.getAttribute('data-label');
          if (fingerprintParts.hasOwnProperty(base)) delete fingerprintParts[base];
        } catch (e) {}
        // mark visually excluded
        row.classList.add('excluded');
      } else {
        var val = row.children[2] ? row.children[2].textContent : '';
        try {
          var base = row.getAttribute('data-label');
          if (!(DETAILS_MAP[base] && DETAILS_MAP[base].weight === 0)) {
            fingerprintParts[base] = val;
          }
        } catch (e) {}
        // remove excluded visual state
        row.classList.remove('excluded');
      }
    } catch (e) {}
    updateFingerprint();
    sortRowsByWeight();
  };

  // sort DOM rows by weight (DETAILS_MAP) descending
  function sortRowsByWeight() {
    var tbody = document.querySelector('#fingerprinting-table tbody');
    if (!tbody) return;
    var rows = Array.from(tbody.children);
    rows.sort(function (a, b) {
      // read label from data-label attribute
      var la = a.getAttribute('data-label') || '';
      var lb = b.getAttribute('data-label') || '';
      var wa = Number((DETAILS_MAP[la] && DETAILS_MAP[la].weight) || 0);
      var wb = Number((DETAILS_MAP[lb] && DETAILS_MAP[lb].weight) || 0);
      return wb - wa;
    });
    // re-append in sorted order
    rows.forEach(function (r) {
      tbody.appendChild(r);
    });
  }

  // WebGL fingerprint
  try {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      var vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'N/A';
      var renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A';
      rows.push(['WebGL Vendor', vendor]);
      rows.push(['WebGL Renderer', renderer]);
    }
  } catch (e) {}

  // Canvas fingerprint
  try {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('fingerprint', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('canvas!', 4, 17);
    var dataUrl = canvas.toDataURL();
    var hash = 0;
    for (var i = 0; i < dataUrl.length; i++) {
      hash = (hash << 5) - hash + dataUrl.charCodeAt(i);
      hash |= 0;
    }
    rows.push(['Canvas Fingerprint', hash]);
    // add to fingerprint parts unless Canvas has negligible weight (<1%)
    if (!(DETAILS_MAP['Canvas Fingerprint'] && DETAILS_MAP['Canvas Fingerprint'].weight === 0)) {
      fingerprintParts['Canvas Fingerprint'] = hash;
    }
  } catch (e) {}

  // Audio fingerprint
  try {
    var AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (AudioContext) {
      var context = new AudioContext(1, 44100, 44100);
      var oscillator = context.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.value = 10000;
      var compressor = context.createDynamicsCompressor();
      oscillator.connect(compressor);
      compressor.connect(context.destination);
      oscillator.start(0);
      context.startRendering();
      context.oncomplete = function (e) {
        var fingerprint = e.renderedBuffer.getChannelData(0).slice(0, 30).join(',');
        var hash = 0;
        for (var i = 0; i < fingerprint.length; i++) {
          hash = (hash << 5) - hash + fingerprint.charCodeAt(i);
          hash |= 0;
        }
        if (!(DETAILS_MAP['Audio Fingerprint'] && DETAILS_MAP['Audio Fingerprint'].weight === 0)) {
          fingerprintParts['Audio Fingerprint'] = hash;
        }
        updateFingerprint();
        AddRowToInfo('Audio Fingerprint', hash);
      };
    }
  } catch (e) {}

  // populate fingerprintParts from initial rows and display sorted rows
  rows.forEach(function (row) {
    try {
      var label = row[0];
      // skip adding attributes that are explicitly zero-weight
      if (!(DETAILS_MAP[label] && DETAILS_MAP[label].weight === 0)) {
        fingerprintParts[label] = row[1];
      }
    } catch (e) {}
  });
  updateFingerprint();

  // Wait for metadata to load so tooltips and weights render on first paint.
  METADATA_LOADED.then(function () {
    rows.forEach(function (row) {
      AddRowToInfo(row[0], row[1]);
    });
    // initial sort by weight
    sortRowsByWeight();

    // wire Toggle All button (if present) to flip all include toggles
    try {
      var toggleAllBtn = document.getElementById('toggle-all-btn');
      if (toggleAllBtn) {
        toggleAllBtn.addEventListener('click', function () {
          var tbody = document.querySelector('#fingerprinting-table tbody');
          if (!tbody) return;
          var checks = Array.from(tbody.querySelectorAll('input.include-toggle'));
          // if any unchecked, set all checked; otherwise uncheck all
          var anyUnchecked = checks.some((c) => !c.checked);
          checks.forEach(function (c) {
            c.checked = anyUnchecked;
            // call toggle handler
            if (window.FINGERPRINTING_toggle) window.FINGERPRINTING_toggle(c.dataset.label, c.checked);
          });
        });
      }
    } catch (e) {}
    // initialize checkbox states: default to checked and include any row values in fingerprintParts
    try {
      var tbody = document.querySelector('#fingerprinting-table tbody');
      if (tbody) {
        Array.from(tbody.querySelectorAll('input.include-toggle')).forEach(function (chk) {
          // Determine the base label from the row's data-label. The checkbox
          // carries a unique dataset.label (base|seq) so we must use the row
          // attribute to consult DETAILS_MAP and to key fingerprintParts.
          var row = chk.closest && chk.closest('tr') ? chk.closest('tr') : null;
          var base = row ? row.getAttribute('data-label') : chk.dataset.label;
          // default to included
          chk.checked = true;
          // if fingerprintParts doesn't already have this attribute, add the displayed value
          try {
            var val = row && row.children[2] ? row.children[2].textContent : '';
            if (val !== undefined && val !== null && val !== '' && !(DETAILS_MAP[base] && DETAILS_MAP[base].weight === 0)) {
              fingerprintParts[base] = val;
            }
            // ensure row is not visually excluded
            if (row) row.classList.remove('excluded');
          } catch (e) {}
        });
      }
    } catch (e) {}

    // After rows are inserted, sync any values that were set earlier by async
    // probes (for example Incognito detection) into the displayed rows so
    // placeholders like 'Detecting...' are replaced.
    try {
      Object.keys(fingerprintParts).forEach(function (k) {
        try {
          updateRowValue(k, fingerprintParts[k]);
        } catch (e) {}
      });
    } catch (e) {}
    // Incognito detection removed (unreliable across browsers).
  });

  // Fetch and display public IP address (async, top) — use AddRowToInfo so tooltip applies
  fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    .then((data) => {
      updateRowValue('Public IP Address', data.ip);
    })
    .catch(() => {
      updateRowValue('Public IP Address', 'Unavailable');
    });

  // Incognito detection code removed.

  // Battery info (async, after main rows)
  if (navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
      AddRowToInfo('Battery Level', Math.round(battery.level * 100) + '%');
      AddRowToInfo('Battery Charging', battery.charging ? 'Yes' : 'No');
    });
  }

  // Media devices (async, after main rows)
  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      var cams = devices.filter((d) => d.kind === 'videoinput').length;
      var mics = devices.filter((d) => d.kind === 'audioinput').length;
      AddRowToInfo('Cameras Found', cams);
      AddRowToInfo('Microphones Found', mics);
    });
  }

  // Plugins (least relevant) — aggregate into a single row
  try {
    if (fingerprintinginess.plugins && fingerprintinginess.plugins.length) {
      var pluginNames = [];
      for (let x = 0; x < fingerprintinginess.plugins.length; x++) {
        const plugin = fingerprintinginess.plugins[x];
        if (plugin && plugin.name) pluginNames.push(plugin.name);
      }
      AddRowToInfo('Plugins', pluginNames.join(', '));
    } else {
      // Ensure a Plugin row exists (may be empty)
      AddRowToInfo('Plugins', '');
    }
  } catch (e) {}

  // MIME types (least relevant)
  // AddRowToInfo('&nbsp;', '&nbsp;');
  for (let x = 0; x < fingerprintinginess.mimeTypes.length; x++) {
    const mt = fingerprintinginess.mimeTypes[x];
    // Skip known unhelpful PDF entries
    if (mt && mt.type && (mt.type === 'application/pdf' || mt.type === 'text/pdf')) continue;
    // Only report the MIME type itself. Do not include extension or description rows.
    AddRowToInfo('MIME Type', mt.type);
  }

  // Fonts (least relevant)
  var fontTest = function (font) {
    var baseFonts = ['monospace', 'sans-serif', 'serif'];
    var testString = 'mmmmmmmmmmlli';
    var testSize = '72px';
    var h = {};
    var span = document.createElement('span');
    span.style.fontSize = testSize;
    span.innerHTML = testString;
    document.body.appendChild(span);
    for (var i = 0; i < baseFonts.length; i++) {
      span.style.fontFamily = font + ',' + baseFonts[i];
      h[baseFonts[i]] = span.offsetWidth;
    }
    document.body.removeChild(span);
    return h;
  };
  var fonts = ['Arial', 'Courier', 'Georgia', 'Times', 'Trebuchet MS', 'Verdana'];
  var detected = [];
  fonts.forEach(function (font) {
    var res = fontTest(font);
    if (Object.values(res).some((v) => v !== res['monospace'])) {
      detected.push(font);
    }
  });
  AddRowToInfo('Fonts Detected', detected.join(', '));
  // Ensure the (possibly-empty) Fonts Detected value is added/removed from the
  // canonical fingerprintParts immediately so toggling the include checkbox
  // correctly updates the hash even when the value is an empty string.
  try {
    updateRowValue('Fonts Detected', detected.join(', '));
  } catch (e) {}
  reorderTopThree();
}

window.onload = getFingerprintinginess;
