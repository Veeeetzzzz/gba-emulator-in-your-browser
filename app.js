"use strict";

var dropZone = document.getElementById("drop-zone");
var romInput = document.getElementById("rom-input");
var statusEl = document.getElementById("status");
var canvas = document.getElementById("screen");

var gba = null;
var romLoaded = false;
var frameCount = 0;

function setStatus(message, isError) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#ffb4b4" : "#9cb1ff";
}

function ensureCoreReady() {
  if (window.IodineGBAError) {
    setStatus(
      "Emulator core failed to load. Check your connection and refresh.",
      true
    );
    return false;
  }
  if (!window.IodineGBA || !window.IodineGBAReady) {
    setStatus("Emulator core is still loading...", false);
    return false;
  }
  if (!gba) {
    gba = window.IodineGBA(canvas);
  }
  return true;
}

function loadRomFile(file) {
  if (!file) {
    return;
  }
  if (!ensureCoreReady()) {
    return;
  }
  if (!file.name.toLowerCase().endsWith(".gba")) {
    setStatus("Please select a .gba ROM file.", true);
    return;
  }

  var reader = new FileReader();
  reader.onload = function () {
    try {
      var data = new Uint8Array(reader.result);
      gba.attachROM(data);
      // Provide a blank 16 KB BIOS buffer (required by the core).
      // All BIOS functionality (SWI, IRQ entry/exit) is handled via HLE
      // patches in gba-core.js so no real BIOS ROM is needed.
      gba.attachBIOS(new Uint8Array(16384));
      gba.enableSkipBootROM();

      // Monkey-patch the timerCallback to capture silent crashes
      var Emu = window.IodineGBA && window.IodineGBA.Emulator;
      if (Emu && Emu.prototype && Emu.prototype.timerCallback) {
        var origTimer = Emu.prototype.timerCallback;
        Emu.prototype.timerCallback = function () {
          try {
            origTimer.call(this);
          } catch (err) {
            this.faultFound = true;
            setStatus("EMU CRASH: " + (err.stack || err.message), true);
            console.error("GBA emulator crash in timerCallback:", err);
          }
        };
      }

      // Monkey-patch prepareFrame to count rendered frames
      var origPrepareFrame = Emu && Emu.prototype.prepareFrame;
      if (origPrepareFrame) {
        Emu.prototype.prepareFrame = function () {
          frameCount++;
          origPrepareFrame.call(this);
        };
      }

      gba.play();
      romLoaded = true;
      setStatus("Loaded ROM: " + file.name + " — running…", false);

      // Clear status after 3s if running OK
      setTimeout(function () {
        if (!gba || !gba.IOCore) return;
        if (frameCount > 10) {
          setStatus("", false);  // All good — hide status
        } else {
          // Still stuck — show diagnostic
          var io = gba.IOCore;
          var d = [];
          d.push("fr=" + frameCount);
          d.push("PC=0x" + (io.cpu.registers[15] >>> 0).toString(16));
          if (window._brBad) {
            d.push("BAD_BR=" + window._brBad.from + ">" + window._brBad.to);
            d.push("LR=0x" + window._brBad.lr);
          }
          d.push("swi=" + JSON.stringify(window._swiLog || {}));
          var msg = d.join(" | ");
          setStatus("Low FPS: " + msg, true);
          console.warn("DIAG:", msg);
          console.warn("SWI PCs:", JSON.stringify(window._swiPCs || []));
          if (window._brBad) {
            console.warn("BAD BRANCH details:", JSON.stringify(window._brBad, null, 2));
          }
          // Show last 30 branches
          var log = window._brLog || [];
          console.warn("Last 30 branches:", log.slice(-30));
        }
      }, 3000);
    } catch (error) {
      setStatus("Failed to load ROM: " + (error.stack || error.message), true);
      console.error("ROM load error:", error);
    }
  };
  reader.onerror = function () {
    setStatus("Could not read ROM file.", true);
  };
  reader.readAsArrayBuffer(file);
}

// Global error handler to catch uncaught exceptions from setInterval
window.addEventListener("error", function (event) {
  // Ignore errors from browser extensions
  if (event.filename && event.filename.indexOf("extension") !== -1) {
    return;
  }
  if (event.filename && event.filename.indexOf("lockdown") !== -1) {
    return;
  }
  if (event.filename && event.filename.indexOf("contentscript") !== -1) {
    return;
  }
  console.error("Uncaught error:", event.error || event.message);
});

function handleDrop(event) {
  event.preventDefault();
  dropZone.classList.remove("is-dragover");
  var file = event.dataTransfer.files[0];
  loadRomFile(file);
}

dropZone.addEventListener("click", function () {
  romInput.click();
});

dropZone.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    romInput.click();
  }
});

dropZone.addEventListener("dragover", function (event) {
  event.preventDefault();
  dropZone.classList.add("is-dragover");
});

dropZone.addEventListener("dragleave", function () {
  dropZone.classList.remove("is-dragover");
});

dropZone.addEventListener("drop", handleDrop);

romInput.addEventListener("change", function () {
  var file = romInput.files[0];
  loadRomFile(file);
  romInput.value = "";
});

var buttonMap = document.querySelectorAll("[data-key]");
buttonMap.forEach(function (button) {
  var key = button.getAttribute("data-key");
  var press = function (event) {
    if (!romLoaded || !gba) {
      return;
    }
    button.classList.add("active");
    gba.keyDown(key);
    event.preventDefault();
  };
  var release = function () {
    if (!romLoaded || !gba) {
      return;
    }
    button.classList.remove("active");
    gba.keyUp(key);
  };

  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointerleave", release);
  button.addEventListener("pointercancel", release);
});

var keyboardMap = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyX: "a",
  KeyZ: "b",
  Enter: "start",
  ShiftLeft: "select",
  ShiftRight: "select",
  KeyA: "l",
  KeyS: "r"
};

window.addEventListener("keydown", function (event) {
  if (!romLoaded || !gba) {
    return;
  }
  var key = keyboardMap[event.code];
  if (key) {
    gba.keyDown(key);
    event.preventDefault();
  }
});

window.addEventListener("keyup", function (event) {
  if (!romLoaded || !gba) {
    return;
  }
  var key = keyboardMap[event.code];
  if (key) {
    gba.keyUp(key);
    event.preventDefault();
  }
});

// ── Color themes (all classic GBA shell colors) ──────────────────
var colorThemes = {
  indigo:   { shell:"#3b2f7e", light:"#5040a0", dark:"#2a1f60", face:"#4a3d8c", dpad:"#2d2260", dpadC:"#231952", shoulder:"#50409a", abA:"#7b4aa0", abB:"#6838a0", pill:"#5040a0", pillTxt:"#e4daf7", text:"#c8bef0", dim:"#9488c0", bezel:"#4a3d8c", logo:"#9488c0" },
  black:    { shell:"#1e1e24", light:"#2c2c34", dark:"#111116", face:"#2a2a32", dpad:"#18181e", dpadC:"#121218", shoulder:"#2c2c34", abA:"#444450", abB:"#38383e", pill:"#2c2c34", pillTxt:"#c0c0cc", text:"#a0a0b0", dim:"#686878", bezel:"#38383e", logo:"#686878" },
  white:    { shell:"#d9dce6", light:"#ebedf4", dark:"#bcc0cc", face:"#c8ccd8", dpad:"#b0b4c4", dpadC:"#a0a4b8", shoulder:"#c8ccd8", abA:"#8080a0", abB:"#7070a0", pill:"#c0c4d0", pillTxt:"#3a3a50", text:"#5a5a70", dim:"#8888a0", bezel:"#b8bcc8", logo:"#8888a0" },
  glacier:  { shell:"#6a9ec4", light:"#80b4d8", dark:"#5080a8", face:"#7aaecc", dpad:"#5088b0", dpadC:"#4478a0", shoulder:"#80b4d8", abA:"#5898c8", abB:"#4888b8", pill:"#80b4d8", pillTxt:"#e8f4ff", text:"#d8eef8", dim:"#8abcd8", bezel:"#5898c0", logo:"#8abcd8" },
  arctic:   { shell:"#5ab8d0", light:"#70cce0", dark:"#42a0b8", face:"#68c4d8", dpad:"#3898b8", dpadC:"#2e88a8", shoulder:"#70cce0", abA:"#4ab0d0", abB:"#3aa0c0", pill:"#70cce0", pillTxt:"#e0f8ff", text:"#d0f0f8", dim:"#80c8d8", bezel:"#4ab0c8", logo:"#80c8d8" },
  fuchsia:  { shell:"#a82878", light:"#c83898", dark:"#881860", face:"#b83088", dpad:"#881860", dpadC:"#701050", shoulder:"#c83898", abA:"#d04898", abB:"#b83888", pill:"#c83898", pillTxt:"#fce0f0", text:"#f0c0e0", dim:"#c080a8", bezel:"#a83080", logo:"#c080a8" },
  flame:    { shell:"#c53030", light:"#dd4444", dark:"#a02020", face:"#d03838", dpad:"#981818", dpadC:"#801010", shoulder:"#dd4444", abA:"#e05050", abB:"#cc3838", pill:"#dd4444", pillTxt:"#ffe8e8", text:"#ffd0d0", dim:"#d09090", bezel:"#b03030", logo:"#d09090" },
  orange:   { shell:"#d87820", light:"#e89030", dark:"#b86010", face:"#e08828", dpad:"#a85810", dpadC:"#904808", shoulder:"#e89030", abA:"#e89838", abB:"#d88028", pill:"#e89030", pillTxt:"#fff4e0", text:"#ffe8c8", dim:"#d8a868", bezel:"#c87020", logo:"#d8a868" },
  spice:    { shell:"#c05828", light:"#d06830", dark:"#a04018", face:"#cc6030", dpad:"#903018", dpadC:"#782810", shoulder:"#d06830", abA:"#d87040", abB:"#c06030", pill:"#d06830", pillTxt:"#fff0e0", text:"#ffd8c0", dim:"#c89070", bezel:"#b05028", logo:"#c89070" },
  gold:     { shell:"#b89820", light:"#ccb030", dark:"#988010", face:"#c0a028", dpad:"#887010", dpadC:"#706008", shoulder:"#ccb030", abA:"#c8a830", abB:"#b09820", pill:"#ccb030", pillTxt:"#fff8d8", text:"#f0e8b8", dim:"#c0b068", bezel:"#a89020", logo:"#c0b068" },
  platinum: { shell:"#8a8e9c", light:"#a0a4b0", dark:"#6a6e7c", face:"#969aa8", dpad:"#686c7c", dpadC:"#585c6c", shoulder:"#a0a4b0", abA:"#808498", abB:"#707488", pill:"#a0a4b0", pillTxt:"#e8eaf0", text:"#d0d2dc", dim:"#9a9cac", bezel:"#787c8c", logo:"#9a9cac" },
  midnight: { shell:"#1a2248", light:"#283060", dark:"#101838", face:"#222a50", dpad:"#141c3c", dpadC:"#101430", shoulder:"#283060", abA:"#303c70", abB:"#283260", pill:"#283060", pillTxt:"#d0d8f8", text:"#b0b8e0", dim:"#7080b0", bezel:"#222a50", logo:"#7080b0" }
};

function applyColorTheme(name) {
  var t = colorThemes[name];
  if (!t) return;
  var r = document.documentElement.style;
  r.setProperty("--shell",           t.shell);
  r.setProperty("--shell-light",     t.light);
  r.setProperty("--shell-dark",      t.dark);
  r.setProperty("--btn-face",        t.face);
  r.setProperty("--btn-dpad",        t.dpad);
  r.setProperty("--btn-dpad-center", t.dpadC);
  r.setProperty("--shoulder",        t.shoulder);
  r.setProperty("--ab-a",            t.abA);
  r.setProperty("--ab-b",            t.abB);
  r.setProperty("--pill",            t.pill);
  r.setProperty("--pill-text",       t.pillTxt);
  r.setProperty("--text",            t.text);
  r.setProperty("--text-dim",        t.dim);
  r.setProperty("--bezel-ring",      t.bezel);
  r.setProperty("--logo-color",      t.logo);
  // Remember selection
  try { localStorage.setItem("gba-color", name); } catch(e) {}
}

// Wire up color picker
var swatches = document.querySelectorAll(".color-swatch");
swatches.forEach(function (el) {
  el.addEventListener("click", function () {
    swatches.forEach(function (s) { s.classList.remove("active"); });
    el.classList.add("active");
    applyColorTheme(el.getAttribute("data-color"));
  });
});

// Restore saved color
(function () {
  try {
    var saved = localStorage.getItem("gba-color");
    if (saved && colorThemes[saved]) {
      applyColorTheme(saved);
      swatches.forEach(function (s) {
        s.classList.toggle("active", s.getAttribute("data-color") === saved);
      });
    }
  } catch(e) {}
})();

ensureCoreReady();
