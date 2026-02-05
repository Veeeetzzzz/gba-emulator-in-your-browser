var IodineGBA = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/iodine-gba/IodineGBA/includes/TypedArrayShim.js
  var require_TypedArrayShim = __commonJS({
    "node_modules/iodine-gba/IodineGBA/includes/TypedArrayShim.js"(exports, module) {
      "use strict";
      var HAS_VIEWS_SUPPORT = getUint16View(getInt32Array(1)) !== null;
      module.exports = {
        getInt8Array,
        getUint8Array,
        getInt16Array,
        getUint16Array,
        getUint16View,
        getInt32Array,
        getInt32View,
        getUint32Array,
        getFloat32Array,
        getArray,
        HAS_VIEWS_SUPPORT,
        IS_LITTLE_ENDIAN: isLittleEndian()
      };
      function getInt8Array(size_t) {
        try {
          return new Int8Array(size_t);
        } catch (error) {
          return getArray(size_t);
        }
      }
      function getUint8Array(size_t) {
        try {
          return new Uint8Array(size_t);
        } catch (error) {
          return getArray(size_t);
        }
      }
      function getInt16Array(size_t) {
        try {
          return new Int16Array(size_t);
        } catch (error) {
          return getArray(size_t);
        }
      }
      function getUint16Array(size_t) {
        try {
          return new Uint16Array(size_t);
        } catch (error) {
          return getArray(size_t);
        }
      }
      function getUint16View(typed_array) {
        try {
          return new Uint16Array(typed_array.buffer);
        } catch (error) {
          return null;
        }
      }
      function getInt32Array(size_t) {
        try {
          return new Int32Array(size_t);
        } catch (error) {
          return getArray(size_t);
        }
      }
      function getInt32View(typed_array) {
        try {
          return new Int32Array(typed_array.buffer);
        } catch (error) {
          return null;
        }
      }
      function getUint32Array(size_t) {
        try {
          return new Uint32Array(size_t);
        } catch (error) {
          return getArray(size_t);
        }
      }
      function getFloat32Array(size_t) {
        try {
          return new Float32Array(size_t);
        } catch (error) {
          return getArray(size_t);
        }
      }
      function getArray(size_t) {
        var genericArray = [];
        for (var size_index = 0; size_index < size_t; ++size_index) {
          genericArray[size_index] = 0;
        }
        return genericArray;
      }
      function isLittleEndian() {
        if (HAS_VIEWS_SUPPORT) {
          var test = getInt32Array(1);
          test[0] = 1;
          var test2 = getUint16View(test);
          if (test2[0] == 1) {
            return true;
          }
        }
        return false;
      }
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceMemoryCore.js
  var require_GameBoyAdvanceMemoryCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceMemoryCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceMemory;
      var TypedArrayShim = require_TypedArrayShim();
      var getUint8Array = TypedArrayShim.getUint8Array;
      var getUint16View = TypedArrayShim.getUint16View;
      var getInt32View = TypedArrayShim.getInt32View;
      var IS_LITTLE_ENDIAN = TypedArrayShim.IS_LITTLE_ENDIAN;
      function GameBoyAdvanceMemory(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceMemory.prototype.initialize = function() {
        this.WRAMControlFlags = 32;
        this.BIOS = getUint8Array(16384);
        this.BIOS16 = getUint16View(this.BIOS);
        this.BIOS32 = getInt32View(this.BIOS);
        this.loadBIOS();
        this.externalRAM = getUint8Array(262144);
        this.externalRAM16 = getUint16View(this.externalRAM);
        this.externalRAM32 = getInt32View(this.externalRAM);
        this.internalRAM = getUint8Array(32768);
        this.internalRAM16 = getUint16View(this.internalRAM);
        this.internalRAM32 = getInt32View(this.internalRAM);
        this.lastBIOSREAD = 0;
        this.memoryRead8 = this.memoryRead8Generated[1];
        this.memoryWrite8 = this.memoryWrite8Generated[1];
        this.memoryRead16 = this.memoryRead16Generated[1];
        this.memoryReadDMA16 = this.memoryReadDMA16Generated[1];
        this.memoryReadCPU16 = this.memoryReadCPU16Generated[1];
        this.memoryWrite16 = this.memoryWrite16Generated[1];
        this.memoryWriteDMA16 = this.memoryWriteDMA16Generated[1];
        this.memoryRead32 = this.memoryRead32Generated[1];
        this.memoryReadDMA32 = this.memoryReadDMA32Generated[1];
        this.memoryReadCPU32 = this.memoryReadCPU32Generated[1];
        this.memoryWrite32 = this.memoryWrite32Generated[1];
        this.memoryWriteDMA32 = this.memoryWriteDMA32Generated[1];
        this.dmaChannel0 = this.IOCore.dmaChannel0;
        this.dmaChannel1 = this.IOCore.dmaChannel1;
        this.dmaChannel2 = this.IOCore.dmaChannel2;
        this.dmaChannel3 = this.IOCore.dmaChannel3;
        this.gfx = this.IOCore.gfx;
        this.sound = this.IOCore.sound;
        this.timer = this.IOCore.timer;
        this.irq = this.IOCore.irq;
        this.serial = this.IOCore.serial;
        this.joypad = this.IOCore.joypad;
        this.cartridge = this.IOCore.cartridge;
        this.wait = this.IOCore.wait;
        this.cpu = this.IOCore.cpu;
        this.saves = this.IOCore.saves;
      };
      GameBoyAdvanceMemory.prototype.writeExternalWRAM8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.WRAMAccess();
        this.externalRAM[address & 262143] = data & 255;
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceMemory.prototype.writeExternalWRAM16 = function(address, data) {
          address = address | 0;
          data = data | 0;
          this.wait.WRAMAccess();
          this.externalRAM16[address >> 1 & 131071] = data & 65535;
        };
        GameBoyAdvanceMemory.prototype.writeExternalWRAM32 = function(address, data) {
          address = address | 0;
          data = data | 0;
          this.wait.WRAMAccess32();
          this.externalRAM32[address >> 2 & 65535] = data | 0;
        };
      } else {
        GameBoyAdvanceMemory.prototype.writeExternalWRAM16 = function(address, data) {
          this.wait.WRAMAccess();
          address &= 262142;
          this.externalRAM[address++] = data & 255;
          this.externalRAM[address] = data >> 8 & 255;
        };
        GameBoyAdvanceMemory.prototype.writeExternalWRAM32 = function(address, data) {
          this.wait.WRAMAccess32();
          address &= 262140;
          this.externalRAM[address++] = data & 255;
          this.externalRAM[address++] = data >> 8 & 255;
          this.externalRAM[address++] = data >> 16 & 255;
          this.externalRAM[address] = data >>> 24;
        };
      }
      GameBoyAdvanceMemory.prototype.writeInternalWRAM8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.singleClock();
        this.internalRAM[address & 32767] = data & 255;
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceMemory.prototype.writeInternalWRAM16 = function(address, data) {
          address = address | 0;
          data = data | 0;
          this.wait.singleClock();
          this.internalRAM16[address >> 1 & 16383] = data & 65535;
        };
        GameBoyAdvanceMemory.prototype.writeInternalWRAM32 = function(address, data) {
          address = address | 0;
          data = data | 0;
          this.wait.singleClock();
          this.internalRAM32[address >> 2 & 8191] = data | 0;
        };
      } else {
        GameBoyAdvanceMemory.prototype.writeInternalWRAM16 = function(address, data) {
          this.wait.singleClock();
          address &= 32766;
          this.internalRAM[address++] = data & 255;
          this.internalRAM[address] = data >> 8 & 255;
        };
        GameBoyAdvanceMemory.prototype.writeInternalWRAM32 = function(address, data) {
          this.wait.singleClock();
          address &= 32764;
          this.internalRAM[address++] = data & 255;
          this.internalRAM[address++] = data >> 8 & 255;
          this.internalRAM[address++] = data >> 16 & 255;
          this.internalRAM[address] = data >>> 24;
        };
      }
      GameBoyAdvanceMemory.prototype.writeIODispatch8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.singleClock();
        switch (address | 0) {
          //4000000h - DISPCNT - LCD Control (Read/Write)
          case 67108864:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeDISPCNT0(data & 255);
            break;
          //4000001h - DISPCNT - LCD Control (Read/Write)
          case 67108865:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeDISPCNT1(data & 255);
            break;
          //4000002h - Undocumented - Green Swap (R/W)
          case 67108866:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeGreenSwap(data & 255);
            break;
          //4000003h - Undocumented - Green Swap (R/W)
          //4000004h - DISPSTAT - General LCD Status (Read/Write)
          case 67108868:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeDISPSTAT0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000005h - DISPSTAT - General LCD Status (Read/Write)
          case 67108869:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeDISPSTAT1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000006h - VCOUNT - Vertical Counter (Read only)
          //4000007h - VCOUNT - Vertical Counter (Read only)
          //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
          case 67108872:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0CNT0(data & 255);
            break;
          //4000009h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
          case 67108873:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0CNT1(data & 255);
            break;
          //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
          case 67108874:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1CNT0(data & 255);
            break;
          //400000Bh - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
          case 67108875:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1CNT1(data & 255);
            break;
          //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
          case 67108876:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2CNT0(data & 255);
            break;
          //400000Dh - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
          case 67108877:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2CNT1(data & 255);
            break;
          //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
          case 67108878:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3CNT0(data & 255);
            break;
          //400000Fh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
          case 67108879:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3CNT1(data & 255);
            break;
          //4000010h - BG0HOFS - BG0 X-Offset (W)
          case 67108880:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0HOFS0(data & 255);
            break;
          //4000011h - BG0HOFS - BG0 X-Offset (W)
          case 67108881:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0HOFS1(data & 255);
            break;
          //4000012h - BG0VOFS - BG0 Y-Offset (W)
          case 67108882:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0VOFS0(data & 255);
            break;
          //4000013h - BG0VOFS - BG0 Y-Offset (W)
          case 67108883:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0VOFS1(data & 255);
            break;
          //4000014h - BG1HOFS - BG1 X-Offset (W)
          case 67108884:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1HOFS0(data & 255);
            break;
          //4000015h - BG1HOFS - BG1 X-Offset (W)
          case 67108885:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1HOFS1(data & 255);
            break;
          //4000016h - BG1VOFS - BG1 Y-Offset (W)
          case 67108886:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1VOFS0(data & 255);
            break;
          //4000017h - BG1VOFS - BG1 Y-Offset (W)
          case 67108887:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1VOFS1(data & 255);
            break;
          //4000018h - BG2HOFS - BG2 X-Offset (W)
          case 67108888:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2HOFS0(data & 255);
            break;
          //4000019h - BG2HOFS - BG2 X-Offset (W)
          case 67108889:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2HOFS1(data & 255);
            break;
          //400001Ah - BG2VOFS - BG2 Y-Offset (W)
          case 67108890:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2VOFS0(data & 255);
            break;
          //400001Bh - BG2VOFS - BG2 Y-Offset (W)
          case 67108891:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2VOFS1(data & 255);
            break;
          //400001Ch - BG3HOFS - BG3 X-Offset (W)
          case 67108892:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3HOFS0(data & 255);
            break;
          //400001Dh - BG3HOFS - BG3 X-Offset (W)
          case 67108893:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3HOFS1(data & 255);
            break;
          //400001Eh - BG3VOFS - BG3 Y-Offset (W)
          case 67108894:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3VOFS0(data & 255);
            break;
          //400001Fh - BG3VOFS - BG3 Y-Offset (W)
          case 67108895:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3VOFS1(data & 255);
            break;
          //4000020h - BG2PA - BG2 Rotation/Scaling Parameter A (alias dx) (W)
          case 67108896:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PA0(data & 255);
            break;
          //4000021h - BG2PA - BG2 Rotation/Scaling Parameter A (alias dx) (W)
          case 67108897:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PA1(data & 255);
            break;
          //4000022h - BG2PB - BG2 Rotation/Scaling Parameter B (alias dmx) (W)
          case 67108898:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PB0(data & 255);
            break;
          //4000023h - BG2PB - BG2 Rotation/Scaling Parameter B (alias dmx) (W)
          case 67108899:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PB1(data & 255);
            break;
          //4000024h - BG2PC - BG2 Rotation/Scaling Parameter C (alias dy) (W)
          case 67108900:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PC0(data & 255);
            break;
          //4000025h - BG2PC - BG2 Rotation/Scaling Parameter C (alias dy) (W)
          case 67108901:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PC1(data & 255);
            break;
          //4000026h - BG2PD - BG2 Rotation/Scaling Parameter D (alias dmy) (W)
          case 67108902:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PD0(data & 255);
            break;
          //4000027h - BG2PD - BG2 Rotation/Scaling Parameter D (alias dmy) (W)
          case 67108903:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PD1(data & 255);
            break;
          //4000028h - BG2X_L - BG2 Reference Point X-Coordinate, lower 16 bit (W)
          case 67108904:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2X_L0(data & 255);
            break;
          //4000029h - BG2X_L - BG2 Reference Point X-Coordinate, lower 16 bit (W)
          case 67108905:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2X_L1(data & 255);
            break;
          //400002Ah - BG2X_H - BG2 Reference Point X-Coordinate, upper 12 bit (W)
          case 67108906:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2X_H0(data & 255);
            break;
          //400002Bh - BG2X_H - BG2 Reference Point X-Coordinate, upper 12 bit (W)
          case 67108907:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2X_H1(data & 255);
            break;
          //400002Ch - BG2Y_L - BG2 Reference Point Y-Coordinate, lower 16 bit (W)
          case 67108908:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2Y_L0(data & 255);
            break;
          //400002Dh - BG2Y_L - BG2 Reference Point Y-Coordinate, lower 16 bit (W)
          case 67108909:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2Y_L1(data & 255);
            break;
          //400002Eh - BG2Y_H - BG2 Reference Point Y-Coordinate, upper 12 bit (W)
          case 67108910:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2Y_H0(data & 255);
            break;
          //400002Fh - BG2Y_H - BG2 Reference Point Y-Coordinate, upper 12 bit (W)
          case 67108911:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2Y_H1(data & 255);
            break;
          //4000030h - BG3PA - BG3 Rotation/Scaling Parameter A (alias dx) (W)
          case 67108912:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PA0(data & 255);
            break;
          //4000031h - BG3PA - BG3 Rotation/Scaling Parameter A (alias dx) (W)
          case 67108913:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PA1(data & 255);
            break;
          //4000032h - BG3PB - BG3 Rotation/Scaling Parameter B (alias dmx) (W)
          case 67108914:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PB0(data & 255);
            break;
          //4000033h - BG3PB - BG3 Rotation/Scaling Parameter B (alias dmx) (W)
          case 67108915:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PB1(data & 255);
            break;
          //4000034h - BG3PC - BG3 Rotation/Scaling Parameter C (alias dy) (W)
          case 67108916:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PC0(data & 255);
            break;
          //4000035h - BG3PC - BG3 Rotation/Scaling Parameter C (alias dy) (W)
          case 67108917:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PC1(data & 255);
            break;
          //4000036h - BG3PD - BG3 Rotation/Scaling Parameter D (alias dmy) (W)
          case 67108918:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PD0(data & 255);
            break;
          //4000037h - BG3PD - BG3 Rotation/Scaling Parameter D (alias dmy) (W)
          case 67108919:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PD1(data & 255);
            break;
          //4000038h - BG3X_L - BG3 Reference Point X-Coordinate, lower 16 bit (W)
          case 67108920:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3X_L0(data & 255);
            break;
          //4000039h - BG3X_L - BG3 Reference Point X-Coordinate, lower 16 bit (W)
          case 67108921:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3X_L1(data & 255);
            break;
          //400003Ah - BG3X_H - BG3 Reference Point X-Coordinate, upper 12 bit (W)
          case 67108922:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3X_H0(data & 255);
            break;
          //400003Bh - BG3X_H - BG3 Reference Point X-Coordinate, upper 12 bit (W)
          case 67108923:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3X_H1(data & 255);
            break;
          //400003Ch - BG3Y_L - BG3 Reference Point Y-Coordinate, lower 16 bit (W)
          case 67108924:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3Y_L0(data & 255);
            break;
          //400003Dh - BGY_L - BG3 Reference Point Y-Coordinate, lower 16 bit (W)
          case 67108925:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3Y_L1(data & 255);
            break;
          //400003Eh - BG3Y_H - BG3 Reference Point Y-Coordinate, upper 12 bit (W)
          case 67108926:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3Y_H0(data & 255);
            break;
          //400003Fh - BG3Y_H - BG3 Reference Point Y-Coordinate, upper 12 bit (W)
          case 67108927:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3Y_H1(data & 255);
            break;
          //4000040h - WIN0H - Window 0 Horizontal Dimensions (W)
          case 67108928:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN0H0(data & 255);
            break;
          //4000041h - WIN0H - Window 0 Horizontal Dimensions (W)
          case 67108929:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN0H1(data & 255);
            break;
          //4000042h - WIN1H - Window 1 Horizontal Dimensions (W)
          case 67108930:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN1H0(data & 255);
            break;
          //4000043h - WIN1H - Window 1 Horizontal Dimensions (W)
          case 67108931:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN1H1(data & 255);
            break;
          //4000044h - WIN0V - Window 0 Vertical Dimensions (W)
          case 67108932:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN0V0(data & 255);
            break;
          //4000045h - WIN0V - Window 0 Vertical Dimensions (W)
          case 67108933:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN0V1(data & 255);
            break;
          //4000046h - WIN1V - Window 1 Vertical Dimensions (W)
          case 67108934:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN1V0(data & 255);
            break;
          //4000047h - WIN1V - Window 1 Vertical Dimensions (W)
          case 67108935:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN1V1(data & 255);
            break;
          //4000048h - WININ - Control of Inside of Window(s) (R/W)
          case 67108936:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWININ0(data & 255);
            break;
          //4000049h - WININ - Control of Inside of Window(s) (R/W)
          case 67108937:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWININ1(data & 255);
            break;
          //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
          case 67108938:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWINOUT0(data & 255);
            break;
          //400004AB- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
          case 67108939:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWINOUT1(data & 255);
            break;
          //400004Ch - MOSAIC - Mosaic Size (W)
          case 67108940:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeMOSAIC0(data & 255);
            break;
          //400004Dh - MOSAIC - Mosaic Size (W)
          case 67108941:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeMOSAIC1(data & 255);
            break;
          //400004Eh - NOT USED - ZERO
          //400004Fh - NOT USED - ZERO
          //4000050h - BLDCNT - Color Special Effects Selection (R/W)
          case 67108944:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDCNT0(data & 255);
            break;
          //4000051h - BLDCNT - Color Special Effects Selection (R/W)
          case 67108945:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDCNT1(data & 255);
            break;
          //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
          case 67108946:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDALPHA0(data & 255);
            break;
          //4000053h - BLDALPHA - Alpha Blending Coefficients (R/W)
          case 67108947:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDALPHA1(data & 255);
            break;
          //4000054h - BLDY - Brightness (Fade-In/Out) Coefficient (W)
          case 67108948:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDY(data & 255);
            break;
          //4000055h through 400005Fh - NOT USED - ZERO/GLITCHED
          //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
          case 67108960:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_L(data & 255);
            break;
          //4000061h - NOT USED - ZERO
          //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
          case 67108962:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_H0(data & 255);
            break;
          //4000063h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
          case 67108963:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_H1(data & 255);
            break;
          //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
          case 67108964:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_X0(data & 255);
            break;
          //4000065h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
          case 67108965:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_X1(data & 255);
            break;
          //4000066h - NOT USED - ZERO
          //4000067h - NOT USED - ZERO
          //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
          case 67108968:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_L0(data & 255);
            break;
          //4000069h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
          case 67108969:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_L1(data & 255);
            break;
          //400006Ah - NOT USED - ZERO
          //400006Bh - NOT USED - ZERO
          //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
          case 67108972:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_H0(data & 255);
            break;
          //400006Dh - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
          case 67108973:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_H1(data & 255);
            break;
          //400006Eh - NOT USED - ZERO
          //400006Fh - NOT USED - ZERO
          //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
          case 67108976:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_L(data & 255);
            break;
          //4000071h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
          //4000072h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
          case 67108978:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_H0(data & 255);
            break;
          //4000073h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
          case 67108979:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_H1(data & 255);
            break;
          //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
          case 67108980:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_X0(data & 255);
            break;
          //4000075h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
          case 67108981:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_X1(data & 255);
            break;
          //4000076h - NOT USED - ZERO
          //4000077h - NOT USED - ZERO
          //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
          case 67108984:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_L0(data & 255);
            break;
          //4000079h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
          case 67108985:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_L1(data & 255);
            break;
          //400007Ah - NOT USED - ZERO
          //400007Bh - NOT USED - ZERO
          //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
          case 67108988:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_H0(data & 255);
            break;
          //400007Dh - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
          case 67108989:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_H1(data & 255);
            break;
          //400007Eh - NOT USED - ZERO
          //400007Fh - NOT USED - ZERO
          //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
          case 67108992:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_L0(data & 255);
            break;
          //4000081h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
          case 67108993:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_L1(data & 255);
            break;
          //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
          case 67108994:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_H0(data & 255);
            break;
          //4000083h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
          case 67108995:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_H1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
          case 67108996:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_X(data & 255);
            break;
          //4000085h - NOT USED - ZERO
          //4000086h - NOT USED - ZERO
          //4000087h - NOT USED - ZERO
          //4000088h - SOUNDBIAS - Sound PWM Control (R/W)
          case 67109e3:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDBIAS0(data & 255);
            break;
          //4000089h - SOUNDBIAS - Sound PWM Control (R/W)
          case 67109001:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDBIAS1(data & 255);
            break;
          //400008Ah through 400008Fh - NOT USED - ZERO/GLITCHED
          //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109008:
          //4000091h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109009:
          //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109010:
          //4000093h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109011:
          //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109012:
          //4000095h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109013:
          //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109014:
          //4000097h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109015:
          //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109016:
          //4000099h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109017:
          //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109018:
          //400009Bh - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109019:
          //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109020:
          //400009Dh - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109021:
          //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109022:
          //400009Fh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109023:
            this.IOCore.updateTimerClocking();
            this.sound.writeWAVE8((address | 0) - 67109008 | 0, data | 0);
            break;
          //40000A0h - FIFO_A_L - FIFO Channel A First Word (W)
          case 67109024:
          //40000A1h - FIFO_A_L - FIFO Channel A First Word (W)
          case 67109025:
          //40000A2h - FIFO_A_H - FIFO Channel A Second Word (W)
          case 67109026:
          //40000A3h - FIFO_A_H - FIFO Channel A Second Word (W)
          case 67109027:
            this.IOCore.updateTimerClocking();
            this.sound.writeFIFOA8(data | 0);
            break;
          //40000A4h - FIFO_B_L - FIFO Channel B First Word (W)
          case 67109028:
          //40000A5h - FIFO_B_L - FIFO Channel B First Word (W)
          case 67109029:
          //40000A6h - FIFO_B_H - FIFO Channel B Second Word (W)
          case 67109030:
          //40000A7h - FIFO_B_H - FIFO Channel B Second Word (W)
          case 67109031:
            this.IOCore.updateTimerClocking();
            this.sound.writeFIFOB8(data | 0);
            break;
          //40000A8h through 40000AFh - NOT USED - GLITCHED
          //40000B0h - DMA0SAD - DMA 0 Source Address (W) (internal memory)
          case 67109040:
            this.dmaChannel0.writeDMASource8_0(data | 0);
            break;
          //40000B1h - DMA0SAD - DMA 0 Source Address (W) (internal memory)
          case 67109041:
            this.dmaChannel0.writeDMASource8_1(data | 0);
            break;
          //40000B2h - DMA0SAH - DMA 0 Source Address (W) (internal memory)
          case 67109042:
            this.dmaChannel0.writeDMASource8_2(data | 0);
            break;
          //40000B3h - DMA0SAH - DMA 0 Source Address (W) (internal memory)
          case 67109043:
            this.dmaChannel0.writeDMASource8_3(data | 0);
            break;
          //40000B4h - DMA0DAD - DMA 0 Destination Address (W) (internal memory)
          case 67109044:
            this.dmaChannel0.writeDMADestination8_0(data | 0);
            break;
          //40000B5h - DMA0DAD - DMA 0 Destination Address (W) (internal memory)
          case 67109045:
            this.dmaChannel0.writeDMADestination8_1(data | 0);
            break;
          //40000B6h - DMA0DAH - DMA 0 Destination Address (W) (internal memory)
          case 67109046:
            this.dmaChannel0.writeDMADestination8_2(data | 0);
            break;
          //40000B7h - DMA0DAH - DMA 0 Destination Address (W) (internal memory)
          case 67109047:
            this.dmaChannel0.writeDMADestination8_3(data | 0);
            break;
          //40000B8h - DMA0CNT_L - DMA 0 Word Count (W) (14 bit, 1..4000h)
          case 67109048:
            this.dmaChannel0.writeDMAWordCount8_0(data | 0);
            break;
          //40000B9h - DMA0CNT_L - DMA 0 Word Count (W) (14 bit, 1..4000h)
          case 67109049:
            this.dmaChannel0.writeDMAWordCount8_1(data | 0);
            break;
          //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
          case 67109050:
            this.dmaChannel0.writeDMAControl8_0(data | 0);
            break;
          //40000BBh - DMA0CNT_H - DMA 0 Control (R/W)
          case 67109051:
            this.dmaChannel0.writeDMAControl8_1(data | 0);
            break;
          //40000BCh - DMA1SAD - DMA 1 Source Address (W) (internal memory)
          case 67109052:
            this.dmaChannel1.writeDMASource8_0(data | 0);
            break;
          //40000BDh - DMA1SAD - DMA 1 Source Address (W) (internal memory)
          case 67109053:
            this.dmaChannel1.writeDMASource8_1(data | 0);
            break;
          //40000BEh - DMA1SAH - DMA 1 Source Address (W) (internal memory)
          case 67109054:
            this.dmaChannel1.writeDMASource8_2(data | 0);
            break;
          //40000BFh - DMA1SAH - DMA 1 Source Address (W) (internal memory)
          case 67109055:
            this.dmaChannel1.writeDMASource8_3(data | 0);
            break;
          //40000C0h - DMA1DAD - DMA 1 Destination Address (W) (internal memory)
          case 67109056:
            this.dmaChannel1.writeDMADestination8_0(data | 0);
            break;
          //40000C1h - DMA1DAD - DMA 1 Destination Address (W) (internal memory)
          case 67109057:
            this.dmaChannel1.writeDMADestination8_1(data | 0);
            break;
          //40000C2h - DMA1DAH - DMA 1 Destination Address (W) (internal memory)
          case 67109058:
            this.dmaChannel1.writeDMADestination8_2(data | 0);
            break;
          //40000C3h - DMA1DAH - DMA 1 Destination Address (W) (internal memory)
          case 67109059:
            this.dmaChannel1.writeDMADestination8_3(data | 0);
            break;
          //40000C4h - DMA1CNT_L - DMA 1 Word Count (W) (14 bit, 1..4000h)
          case 67109060:
            this.dmaChannel1.writeDMAWordCount8_0(data | 0);
            break;
          //40000C5h - DMA1CNT_L - DMA 1 Word Count (W) (14 bit, 1..4000h)
          case 67109061:
            this.dmaChannel1.writeDMAWordCount8_1(data | 0);
            break;
          //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
          case 67109062:
            this.dmaChannel1.writeDMAControl8_0(data | 0);
            break;
          //40000C7h - DMA1CNT_H - DMA 1 Control (R/W)
          case 67109063:
            this.dmaChannel1.writeDMAControl8_1(data | 0);
            break;
          //40000C8h - DMA2SAD - DMA 2 Source Address (W) (internal memory)
          case 67109064:
            this.dmaChannel2.writeDMASource8_0(data | 0);
            break;
          //40000C9h - DMA2SAD - DMA 2 Source Address (W) (internal memory)
          case 67109065:
            this.dmaChannel2.writeDMASource8_1(data | 0);
            break;
          //40000CAh - DMA2SAH - DMA 2 Source Address (W) (internal memory)
          case 67109066:
            this.dmaChannel2.writeDMASource8_2(data | 0);
            break;
          //40000CBh - DMA2SAH - DMA 2 Source Address (W) (internal memory)
          case 67109067:
            this.dmaChannel2.writeDMASource8_3(data | 0);
            break;
          //40000CCh - DMA2DAD - DMA 2 Destination Address (W) (internal memory)
          case 67109068:
            this.dmaChannel2.writeDMADestination8_0(data | 0);
            break;
          //40000CDh - DMA2DAD - DMA 2 Destination Address (W) (internal memory)
          case 67109069:
            this.dmaChannel2.writeDMADestination8_1(data | 0);
            break;
          //40000CEh - DMA2DAH - DMA 2 Destination Address (W) (internal memory)
          case 67109070:
            this.dmaChannel2.writeDMADestination8_2(data | 0);
            break;
          //40000CFh - DMA2DAH - DMA 2 Destination Address (W) (internal memory)
          case 67109071:
            this.dmaChannel2.writeDMADestination8_3(data | 0);
            break;
          //40000D0h - DMA2CNT_L - DMA 2 Word Count (W) (14 bit, 1..4000h)
          case 67109072:
            this.dmaChannel2.writeDMAWordCount8_0(data | 0);
            break;
          //40000D1h - DMA2CNT_L - DMA 2 Word Count (W) (14 bit, 1..4000h)
          case 67109073:
            this.dmaChannel2.writeDMAWordCount8_1(data | 0);
            break;
          //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
          case 67109074:
            this.dmaChannel2.writeDMAControl8_0(data | 0);
            break;
          //40000D3h - DMA2CNT_H - DMA 2 Control (R/W)
          case 67109075:
            this.dmaChannel2.writeDMAControl8_1(data | 0);
            break;
          //40000D4h - DMA3SAD - DMA 3 Source Address (W) (internal memory)
          case 67109076:
            this.dmaChannel3.writeDMASource8_0(data | 0);
            break;
          //40000D5h - DMA3SAD - DMA 3 Source Address (W) (internal memory)
          case 67109077:
            this.dmaChannel3.writeDMASource8_1(data | 0);
            break;
          //40000D6h - DMA3SAH - DMA 3 Source Address (W) (internal memory)
          case 67109078:
            this.dmaChannel3.writeDMASource8_2(data | 0);
            break;
          //40000D7h - DMA3SAH - DMA 3 Source Address (W) (internal memory)
          case 67109079:
            this.dmaChannel3.writeDMASource8_3(data | 0);
            break;
          //40000D8h - DMA3DAD - DMA 3 Destination Address (W) (internal memory)
          case 67109080:
            this.dmaChannel3.writeDMADestination8_0(data | 0);
            break;
          //40000D9h - DMA3DAD - DMA 3 Destination Address (W) (internal memory)
          case 67109081:
            this.dmaChannel3.writeDMADestination8_1(data | 0);
            break;
          //40000DAh - DMA3DAH - DMA 3 Destination Address (W) (internal memory)
          case 67109082:
            this.dmaChannel3.writeDMADestination8_2(data | 0);
            break;
          //40000DBh - DMA3DAH - DMA 3 Destination Address (W) (internal memory)
          case 67109083:
            this.dmaChannel3.writeDMADestination8_3(data | 0);
            break;
          //40000DCh - DMA3CNT_L - DMA 3 Word Count (W) (16 bit, 1..10000h)
          case 67109084:
            this.dmaChannel3.writeDMAWordCount8_0(data | 0);
            break;
          //40000DDh - DMA3CNT_L - DMA 3 Word Count (W) (16 bit, 1..10000h)
          case 67109085:
            this.dmaChannel3.writeDMAWordCount8_1(data | 0);
            break;
          //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
          case 67109086:
            this.dmaChannel3.writeDMAControl8_0(data | 0);
            break;
          //40000DFh - DMA3CNT_H - DMA 3 Control (R/W)
          case 67109087:
            this.dmaChannel3.writeDMAControl8_1(data | 0);
            break;
          //40000E0h through 40000FFh - NOT USED - GLITCHED
          //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
          case 67109120:
            this.timer.writeTM0CNT8_0(data | 0);
            break;
          //4000101h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
          case 67109121:
            this.timer.writeTM0CNT8_1(data | 0);
            break;
          //4000102h - TM0CNT_H - Timer 0 Control (R/W)
          case 67109122:
            this.timer.writeTM0CNT8_2(data | 0);
            break;
          //4000103h - TM0CNT_H - Timer 0 Control (R/W)
          //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
          case 67109124:
            this.timer.writeTM1CNT8_0(data | 0);
            break;
          //4000105h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
          case 67109125:
            this.timer.writeTM1CNT8_1(data | 0);
            break;
          //4000106h - TM1CNT_H - Timer 1 Control (R/W)
          case 67109126:
            this.timer.writeTM1CNT8_2(data | 0);
            break;
          //4000107h - TM1CNT_H - Timer 1 Control (R/W)
          //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
          case 67109128:
            this.timer.writeTM2CNT8_0(data | 0);
            break;
          //4000109h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
          case 67109129:
            this.timer.writeTM2CNT8_1(data | 0);
            break;
          //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
          case 67109130:
            this.timer.writeTM2CNT8_2(data | 0);
            break;
          //400010Bh - TM2CNT_H - Timer 2 Control (R/W)
          //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
          case 67109132:
            this.timer.writeTM3CNT8_0(data | 0);
            break;
          //400010Dh - TM3CNT_L - Timer 3 Counter/Reload (R/W)
          case 67109133:
            this.timer.writeTM3CNT8_1(data | 0);
            break;
          //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
          case 67109134:
            this.timer.writeTM3CNT8_2(data | 0);
            break;
          //400010Fh - TM3CNT_H - Timer 3 Control (R/W)
          //4000110h through 400011Fh - NOT USED - GLITCHED
          //4000120h - Serial Data A (R/W)
          case 67109152:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_A0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000121h - Serial Data A (R/W)
          case 67109153:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_A1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000122h - Serial Data B (R/W)
          case 67109154:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_B0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000123h - Serial Data B (R/W)
          case 67109155:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_B1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000124h - Serial Data C (R/W)
          case 67109156:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_C0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000125h - Serial Data C (R/W)
          case 67109157:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_C1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000126h - Serial Data D (R/W)
          case 67109158:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_D0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000127h - Serial Data D (R/W)
          case 67109159:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_D1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
          case 67109160:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIOCNT0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000129h - SIOCNT - SIO Sub Mode Control (R/W)
          case 67109161:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIOCNT1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
          case 67109162:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA8_0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //400012Bh - SIOMLT_SEND - Data Send Register (R/W)
          case 67109163:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA8_1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //400012Ch through 400012Fh - NOT USED - GLITCHED
          //4000130h - KEYINPUT - Key Status (R)
          //4000131h - KEYINPUT - Key Status (R)
          //4000132h - KEYCNT - Key Interrupt Control (R/W)
          case 67109170:
            this.joypad.writeKeyControl8_0(data | 0);
            break;
          //4000133h - KEYCNT - Key Interrupt Control (R/W)
          case 67109171:
            this.joypad.writeKeyControl8_1(data | 0);
            break;
          //4000134h - RCNT (R/W) - Mode Selection
          case 67109172:
            this.IOCore.updateSerialClocking();
            this.serial.writeRCNT0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000135h - RCNT (R/W) - Mode Selection
          case 67109173:
            this.IOCore.updateSerialClocking();
            this.serial.writeRCNT1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000136h through 400013Fh - NOT USED - GLITCHED
          //4000140h - JOYCNT - JOY BUS Control Register (R/W)
          case 67109184:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYCNT(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000141h - JOYCNT - JOY BUS Control Register (R/W)
          //4000142h through 400014Fh - NOT USED - GLITCHED
          //4000150h - JoyBus Receive (R/W)
          case 67109200:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000151h - JoyBus Receive (R/W)
          case 67109201:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000152h - JoyBus Receive (R/W)
          case 67109202:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV2(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000153h - JoyBus Receive (R/W)
          case 67109203:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV3(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000154h - JoyBus Send (R/W)
          case 67109204:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000155h - JoyBus Send (R/W)
          case 67109205:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000156h - JoyBus Send (R/W)
          case 67109206:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND2(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000157h - JoyBus Send (R/W)
          case 67109207:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND3(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000158h - JoyBus Stat (R/W)
          case 67109208:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_STAT(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000159h through 40001FFh - NOT USED - GLITCHED
          //4000200h - IE - Interrupt Enable Register (R/W)
          case 67109376:
            this.IOCore.updateCoreClocking();
            this.irq.writeIE0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000201h - IE - Interrupt Enable Register (R/W)
          case 67109377:
            this.IOCore.updateCoreClocking();
            this.irq.writeIE1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
          case 67109378:
            this.IOCore.updateCoreClocking();
            this.irq.writeIF0(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000203h - IF - Interrupt Request Flags / IRQ Acknowledge
          case 67109379:
            this.IOCore.updateCoreClocking();
            this.irq.writeIF1(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000204h - WAITCNT - Waitstate Control (R/W)
          case 67109380:
            this.wait.writeWAITCNT0(data & 255);
            break;
          //4000205h - WAITCNT - Waitstate Control (R/W)
          case 67109381:
            this.wait.writeWAITCNT1(data & 255);
            break;
          //4000206h - WAITCNT - Waitstate Control (R/W)
          //4000207h - WAITCNT - Waitstate Control (R/W)
          //4000208h - IME - Interrupt Master Enable Register (R/W)
          case 67109384:
            this.IOCore.updateCoreClocking();
            this.irq.writeIME(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000209h through 40002FFh - NOT USED - GLITCHED
          //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
          case 67109632:
            this.wait.writePOSTBOOT(data & 255);
            break;
          //4000301h - HALTCNT - BYTE - Undocumented - Low Power Mode Control (W)
          case 67109633:
            this.wait.writeHALTCNT(data & 255);
            break;
          default:
            if ((address & 65532) == 2048) {
              this.wait.writeConfigureWRAM8(address | 0, data & 255);
            }
        }
      };
      GameBoyAdvanceMemory.prototype.writeIODispatch16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.singleClock();
        switch (address & -2) {
          //4000000h - DISPCNT - LCD Control (Read/Write)
          case 67108864:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeDISPCNT0(data & 255);
            this.gfx.writeDISPCNT1(data >> 8 & 255);
            break;
          //4000002h - Undocumented - Green Swap (R/W)
          case 67108866:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeGreenSwap(data & 255);
            break;
          //4000004h - DISPSTAT - General LCD Status (Read/Write)
          case 67108868:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeDISPSTAT0(data & 255);
            this.gfx.writeDISPSTAT1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000006h - VCOUNT - Vertical Counter (Read only)
          //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
          case 67108872:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0CNT0(data & 255);
            this.gfx.writeBG0CNT1(data >> 8 & 255);
            break;
          //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
          case 67108874:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1CNT0(data & 255);
            this.gfx.writeBG1CNT1(data >> 8 & 255);
            break;
          //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
          case 67108876:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2CNT0(data & 255);
            this.gfx.writeBG2CNT1(data >> 8 & 255);
            break;
          //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
          case 67108878:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3CNT0(data & 255);
            this.gfx.writeBG3CNT1(data >> 8 & 255);
            break;
          //4000010h - BG0HOFS - BG0 X-Offset (W)
          case 67108880:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0HOFS0(data & 255);
            this.gfx.writeBG0HOFS1(data >> 8 & 255);
            break;
          //4000012h - BG0VOFS - BG0 Y-Offset (W)
          case 67108882:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0VOFS0(data & 255);
            this.gfx.writeBG0VOFS1(data >> 8 & 255);
            break;
          //4000014h - BG1HOFS - BG1 X-Offset (W)
          case 67108884:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1HOFS0(data & 255);
            this.gfx.writeBG1HOFS1(data >> 8 & 255);
            break;
          //4000016h - BG1VOFS - BG1 Y-Offset (W)
          case 67108886:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1VOFS0(data & 255);
            this.gfx.writeBG1VOFS1(data >> 8 & 255);
            break;
          //4000018h - BG2HOFS - BG2 X-Offset (W)
          case 67108888:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2HOFS0(data & 255);
            this.gfx.writeBG2HOFS1(data >> 8 & 255);
            break;
          //400001Ah - BG2VOFS - BG2 Y-Offset (W)
          case 67108890:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2VOFS0(data & 255);
            this.gfx.writeBG2VOFS1(data >> 8 & 255);
            break;
          //400001Ch - BG3HOFS - BG3 X-Offset (W)
          case 67108892:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3HOFS0(data & 255);
            this.gfx.writeBG3HOFS1(data >> 8 & 255);
            break;
          //400001Eh - BG3VOFS - BG3 Y-Offset (W)
          case 67108894:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3VOFS0(data & 255);
            this.gfx.writeBG3VOFS1(data >> 8 & 255);
            break;
          //4000020h - BG2PA - BG2 Rotation/Scaling Parameter A (alias dx) (W)
          case 67108896:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PA0(data & 255);
            this.gfx.writeBG2PA1(data >> 8 & 255);
            break;
          //4000022h - BG2PB - BG2 Rotation/Scaling Parameter B (alias dmx) (W)
          case 67108898:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PB0(data & 255);
            this.gfx.writeBG2PB1(data >> 8 & 255);
            break;
          //4000024h - BG2PC - BG2 Rotation/Scaling Parameter C (alias dy) (W)
          case 67108900:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PC0(data & 255);
            this.gfx.writeBG2PC1(data >> 8 & 255);
            break;
          //4000026h - BG2PD - BG2 Rotation/Scaling Parameter D (alias dmy) (W)
          case 67108902:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PD0(data & 255);
            this.gfx.writeBG2PD1(data >> 8 & 255);
            break;
          //4000028h - BG2X_L - BG2 Reference Point X-Coordinate, lower 16 bit (W)
          case 67108904:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2X_L0(data & 255);
            this.gfx.writeBG2X_L1(data >> 8 & 255);
            break;
          //400002Ah - BG2X_H - BG2 Reference Point X-Coordinate, upper 12 bit (W)
          case 67108906:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2X_H0(data & 255);
            this.gfx.writeBG2X_H1(data >> 8 & 255);
            break;
          //400002Ch - BG2Y_L - BG2 Reference Point Y-Coordinate, lower 16 bit (W)
          case 67108908:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2Y_L0(data & 255);
            this.gfx.writeBG2Y_L1(data >> 8 & 255);
            break;
          //400002Eh - BG2Y_H - BG2 Reference Point Y-Coordinate, upper 12 bit (W)
          case 67108910:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2Y_H0(data & 255);
            this.gfx.writeBG2Y_H1(data >> 8 & 255);
            break;
          //4000030h - BG3PA - BG3 Rotation/Scaling Parameter A (alias dx) (W)
          case 67108912:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PA0(data & 255);
            this.gfx.writeBG3PA1(data >> 8 & 255);
            break;
          //4000032h - BG3PB - BG3 Rotation/Scaling Parameter B (alias dmx) (W)
          case 67108914:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PB0(data & 255);
            this.gfx.writeBG3PB1(data >> 8 & 255);
            break;
          //4000034h - BG3PC - BG3 Rotation/Scaling Parameter C (alias dy) (W)
          case 67108916:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PC0(data & 255);
            this.gfx.writeBG3PC1(data >> 8 & 255);
            break;
          //4000036h - BG3PD - BG3 Rotation/Scaling Parameter D (alias dmy) (W)
          case 67108918:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PD0(data & 255);
            this.gfx.writeBG3PD1(data >> 8 & 255);
            break;
          //4000038h - BG3X_L - BG3 Reference Point X-Coordinate, lower 16 bit (W)
          case 67108920:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3X_L0(data & 255);
            this.gfx.writeBG3X_L1(data >> 8 & 255);
            break;
          //400003Ah - BG3X_H - BG3 Reference Point X-Coordinate, upper 12 bit (W)
          case 67108922:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3X_H0(data & 255);
            this.gfx.writeBG3X_H1(data >> 8 & 255);
            break;
          //400003Ch - BG3Y_L - BG3 Reference Point Y-Coordinate, lower 16 bit (W)
          case 67108924:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3Y_L0(data & 255);
            this.gfx.writeBG3Y_L1(data >> 8 & 255);
            break;
          //400003Eh - BG3Y_H - BG3 Reference Point Y-Coordinate, upper 12 bit (W)
          case 67108926:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3Y_H0(data & 255);
            this.gfx.writeBG3Y_H1(data >> 8 & 255);
            break;
          //4000040h - WIN0H - Window 0 Horizontal Dimensions (W)
          case 67108928:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN0H0(data & 255);
            this.gfx.writeWIN0H1(data >> 8 & 255);
            break;
          //4000042h - WIN1H - Window 1 Horizontal Dimensions (W)
          case 67108930:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN1H0(data & 255);
            this.gfx.writeWIN1H1(data >> 8 & 255);
            break;
          //4000044h - WIN0V - Window 0 Vertical Dimensions (W)
          case 67108932:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN0V0(data & 255);
            this.gfx.writeWIN0V1(data >> 8 & 255);
            break;
          //4000046h - WIN1V - Window 1 Vertical Dimensions (W)
          case 67108934:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN1V0(data & 255);
            this.gfx.writeWIN1V1(data >> 8 & 255);
            break;
          //4000048h - WININ - Control of Inside of Window(s) (R/W)
          case 67108936:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWININ0(data & 255);
            this.gfx.writeWININ1(data >> 8 & 255);
            break;
          //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
          case 67108938:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWINOUT0(data & 255);
            this.gfx.writeWINOUT1(data >> 8 & 255);
            break;
          //400004Ch - MOSAIC - Mosaic Size (W)
          case 67108940:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeMOSAIC0(data & 255);
            this.gfx.writeMOSAIC1(data >> 8 & 255);
            break;
          //400004Eh - NOT USED - ZERO
          //4000050h - BLDCNT - Color Special Effects Selection (R/W)
          case 67108944:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDCNT0(data & 255);
            this.gfx.writeBLDCNT1(data >> 8 & 255);
            break;
          //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
          case 67108946:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDALPHA0(data & 255);
            this.gfx.writeBLDALPHA1(data >> 8 & 255);
            break;
          //4000054h - BLDY - Brightness (Fade-In/Out) Coefficient (W)
          case 67108948:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDY(data & 255);
            break;
          //4000055h through 400005Fh - NOT USED - ZERO/GLITCHED
          //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
          case 67108960:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_L(data & 255);
            break;
          //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
          case 67108962:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_H0(data & 255);
            this.sound.writeSOUND1CNT_H1(data >> 8 & 255);
            break;
          //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
          case 67108964:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_X0(data & 255);
            this.sound.writeSOUND1CNT_X1(data >> 8 & 255);
            break;
          //4000066h - NOT USED - ZERO
          //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
          case 67108968:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_L0(data & 255);
            this.sound.writeSOUND2CNT_L1(data >> 8 & 255);
            break;
          //400006Ah - NOT USED - ZERO
          //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
          case 67108972:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_H0(data & 255);
            this.sound.writeSOUND2CNT_H1(data >> 8 & 255);
            break;
          //400006Eh - NOT USED - ZERO
          //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
          case 67108976:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_L(data & 255);
            break;
          //4000072h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
          case 67108978:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_H0(data & 255);
            this.sound.writeSOUND3CNT_H1(data >> 8 & 255);
            break;
          //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
          case 67108980:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_X0(data & 255);
            this.sound.writeSOUND3CNT_X1(data >> 8 & 255);
            break;
          //4000076h - NOT USED - ZERO
          //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
          case 67108984:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_L0(data & 255);
            this.sound.writeSOUND4CNT_L1(data >> 8 & 255);
            break;
          //400007Ah - NOT USED - ZERO
          //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
          case 67108988:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_H0(data & 255);
            this.sound.writeSOUND4CNT_H1(data >> 8 & 255);
            break;
          //400007Eh - NOT USED - ZERO
          //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
          case 67108992:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_L0(data & 255);
            this.sound.writeSOUNDCNT_L1(data >> 8 & 255);
            break;
          //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
          case 67108994:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_H0(data & 255);
            this.sound.writeSOUNDCNT_H1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
          case 67108996:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_X(data & 255);
            break;
          //4000086h - NOT USED - ZERO
          //4000088h - SOUNDBIAS - Sound PWM Control (R/W)
          case 67109e3:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDBIAS0(data & 255);
            this.sound.writeSOUNDBIAS1(data >> 8 & 255);
            break;
          //400008Ah through 400008Fh - NOT USED - ZERO/GLITCHED
          //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109008:
          //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109010:
          //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109012:
          //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109014:
          //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109016:
          //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109018:
          //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109020:
          //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109022:
            this.IOCore.updateTimerClocking();
            this.sound.writeWAVE16((address | 0) - 67109008 >> 1, data | 0);
            break;
          //40000A0h - FIFO_A_L - FIFO Channel A First Word (W)
          case 67109024:
          //40000A2h - FIFO_A_H - FIFO Channel A Second Word (W)
          case 67109026:
            this.IOCore.updateTimerClocking();
            this.sound.writeFIFOA16(data | 0);
            break;
          //40000A4h - FIFO_B_L - FIFO Channel B First Word (W)
          case 67109028:
          //40000A6h - FIFO_B_H - FIFO Channel B Second Word (W)
          case 67109030:
            this.IOCore.updateTimerClocking();
            this.sound.writeFIFOB16(data | 0);
            break;
          //40000A8h through 40000AFh - NOT USED - GLITCHED
          //40000B0h - DMA0SAD - DMA 0 Source Address (W) (internal memory)
          case 67109040:
            this.dmaChannel0.writeDMASource16_0(data | 0);
            break;
          //40000B2h - DMA0SAH - DMA 0 Source Address (W) (internal memory)
          case 67109042:
            this.dmaChannel0.writeDMASource16_1(data | 0);
            break;
          //40000B4h - DMA0DAD - DMA 0 Destination Address (W) (internal memory)
          case 67109044:
            this.dmaChannel0.writeDMADestination16_0(data | 0);
            break;
          //40000B6h - DMA0DAH - DMA 0 Destination Address (W) (internal memory)
          case 67109046:
            this.dmaChannel0.writeDMADestination16_1(data | 0);
            break;
          //40000B8h - DMA0CNT_L - DMA 0 Word Count (W) (14 bit, 1..4000h)
          case 67109048:
            this.dmaChannel0.writeDMAWordCount16(data | 0);
            break;
          //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
          case 67109050:
            this.dmaChannel0.writeDMAControl16(data | 0);
            break;
          //40000BCh - DMA1SAD - DMA 1 Source Address (W) (internal memory)
          case 67109052:
            this.dmaChannel1.writeDMASource16_0(data | 0);
            break;
          //40000BEh - DMA1SAH - DMA 1 Source Address (W) (internal memory)
          case 67109054:
            this.dmaChannel1.writeDMASource16_1(data | 0);
            break;
          //40000C0h - DMA1DAD - DMA 1 Destination Address (W) (internal memory)
          case 67109056:
            this.dmaChannel1.writeDMADestination16_0(data | 0);
            break;
          //40000C2h - DMA1DAH - DMA 1 Destination Address (W) (internal memory)
          case 67109058:
            this.dmaChannel1.writeDMADestination16_1(data | 0);
            break;
          //40000C4h - DMA1CNT_L - DMA 1 Word Count (W) (14 bit, 1..4000h)
          case 67109060:
            this.dmaChannel1.writeDMAWordCount16(data | 0);
            break;
          //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
          case 67109062:
            this.dmaChannel1.writeDMAControl16(data | 0);
            break;
          //40000C8h - DMA2SAD - DMA 2 Source Address (W) (internal memory)
          case 67109064:
            this.dmaChannel2.writeDMASource16_0(data | 0);
            break;
          //40000CAh - DMA2SAH - DMA 2 Source Address (W) (internal memory)
          case 67109066:
            this.dmaChannel2.writeDMASource16_1(data | 0);
            break;
          //40000CCh - DMA2DAD - DMA 2 Destination Address (W) (internal memory)
          case 67109068:
            this.dmaChannel2.writeDMADestination16_0(data | 0);
            break;
          //40000CEh - DMA2DAH - DMA 2 Destination Address (W) (internal memory)
          case 67109070:
            this.dmaChannel2.writeDMADestination16_1(data | 0);
            break;
          //40000D0h - DMA2CNT_L - DMA 2 Word Count (W) (14 bit, 1..4000h)
          case 67109072:
            this.dmaChannel2.writeDMAWordCount16(data | 0);
            break;
          //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
          case 67109074:
            this.dmaChannel2.writeDMAControl16(data | 0);
            break;
          //40000D4h - DMA3SAD - DMA 3 Source Address (W) (internal memory)
          case 67109076:
            this.dmaChannel3.writeDMASource16_0(data | 0);
            break;
          //40000D6h - DMA3SAH - DMA 3 Source Address (W) (internal memory)
          case 67109078:
            this.dmaChannel3.writeDMASource16_1(data | 0);
            break;
          //40000D8h - DMA3DAD - DMA 3 Destination Address (W) (internal memory)
          case 67109080:
            this.dmaChannel3.writeDMADestination16_0(data | 0);
            break;
          //40000DAh - DMA3DAH - DMA 3 Destination Address (W) (internal memory)
          case 67109082:
            this.dmaChannel3.writeDMADestination16_1(data | 0);
            break;
          //40000DCh - DMA3CNT_L - DMA 3 Word Count (W) (16 bit, 1..10000h)
          case 67109084:
            this.dmaChannel3.writeDMAWordCount16(data | 0);
            break;
          //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
          case 67109086:
            this.dmaChannel3.writeDMAControl16(data | 0);
            break;
          //40000E0h through 40000FFh - NOT USED - GLITCHED
          //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
          case 67109120:
            this.timer.writeTM0CNT16(data | 0);
            break;
          //4000102h - TM0CNT_H - Timer 0 Control (R/W)
          case 67109122:
            this.timer.writeTM0CNT8_2(data | 0);
            break;
          //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
          case 67109124:
            this.timer.writeTM1CNT16(data | 0);
            break;
          //4000106h - TM1CNT_H - Timer 1 Control (R/W)
          case 67109126:
            this.timer.writeTM1CNT8_2(data | 0);
            break;
          //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
          case 67109128:
            this.timer.writeTM2CNT16(data | 0);
            break;
          //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
          case 67109130:
            this.timer.writeTM2CNT8_2(data | 0);
            break;
          //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
          case 67109132:
            this.timer.writeTM3CNT16(data | 0);
            break;
          //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
          case 67109134:
            this.timer.writeTM3CNT8_2(data | 0);
            break;
          //4000110h through 400011Fh - NOT USED - GLITCHED
          //4000120h - Serial Data A (R/W)
          case 67109152:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_A0(data & 255);
            this.serial.writeSIODATA_A1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000122h - Serial Data B (R/W)
          case 67109154:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_B0(data & 255);
            this.serial.writeSIODATA_B1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000124h - Serial Data C (R/W)
          case 67109156:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_C0(data & 255);
            this.serial.writeSIODATA_C1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000126h - Serial Data D (R/W)
          case 67109158:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_D0(data & 255);
            this.serial.writeSIODATA_D1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
          case 67109160:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIOCNT0(data & 255);
            this.serial.writeSIOCNT1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
          case 67109162:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA8_0(data & 255);
            this.serial.writeSIODATA8_1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //400012Ch through 400012Fh - NOT USED - GLITCHED
          //4000130h - KEYINPUT - Key Status (R)
          //4000132h - KEYCNT - Key Interrupt Control (R/W)
          case 67109170:
            this.joypad.writeKeyControl16(data | 0);
            break;
          //4000134h - RCNT (R/W) - Mode Selection
          case 67109172:
            this.IOCore.updateSerialClocking();
            this.serial.writeRCNT0(data & 255);
            this.serial.writeRCNT1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000136h through 400013Fh - NOT USED - GLITCHED
          //4000140h - JOYCNT - JOY BUS Control Register (R/W)
          case 67109184:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYCNT(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000142h through 400014Fh - NOT USED - GLITCHED
          //4000150h - JoyBus Receive (R/W)
          case 67109200:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV0(data & 255);
            this.serial.writeJOYBUS_RECV1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000152h - JoyBus Receive (R/W)
          case 67109202:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV2(data & 255);
            this.serial.writeJOYBUS_RECV3(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000154h - JoyBus Send (R/W)
          case 67109204:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND0(data & 255);
            this.serial.writeJOYBUS_SEND1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000156h - JoyBus Send (R/W)
          case 67109206:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND2(data & 255);
            this.serial.writeJOYBUS_SEND3(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000158h - JoyBus Stat (R/W)
          case 67109208:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_STAT(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000159h through 40001FFh - NOT USED - GLITCHED
          //4000200h - IE - Interrupt Enable Register (R/W)
          case 67109376:
            this.IOCore.updateCoreClocking();
            this.irq.writeIE0(data & 255);
            this.irq.writeIE1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
          case 67109378:
            this.IOCore.updateCoreClocking();
            this.irq.writeIF0(data & 255);
            this.irq.writeIF1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000204h - WAITCNT - Waitstate Control (R/W)
          case 67109380:
            this.wait.writeWAITCNT0(data & 255);
            this.wait.writeWAITCNT1(data >> 8 & 255);
            break;
          //4000206h - WAITCNT - Waitstate Control (R/W)
          //4000208h - IME - Interrupt Master Enable Register (R/W)
          case 67109384:
            this.IOCore.updateCoreClocking();
            this.irq.writeIME(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000209h through 40002FFh - NOT USED - GLITCHED
          //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
          case 67109632:
            this.wait.writePOSTBOOT(data & 255);
            this.wait.writeHALTCNT(data >> 8 & 255);
            break;
          default:
            if ((address & 65532) == 2048) {
              this.wait.writeConfigureWRAM16(address | 0, data & 65535);
            }
        }
      };
      GameBoyAdvanceMemory.prototype.writeIODispatch32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.singleClock();
        switch (address & -4) {
          //4000000h - DISPCNT - LCD Control (Read/Write)
          //4000002h - Undocumented - Green Swap (R/W)
          case 67108864:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeDISPCNT0(data & 255);
            this.gfx.writeDISPCNT1(data >> 8 & 255);
            this.gfx.writeGreenSwap(data >> 16 & 255);
            break;
          //4000004h - DISPSTAT - General LCD Status (Read/Write)
          //4000006h - VCOUNT - Vertical Counter (Read only)
          case 67108868:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeDISPSTAT0(data & 255);
            this.gfx.writeDISPSTAT1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
          //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
          case 67108872:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0CNT0(data & 255);
            this.gfx.writeBG0CNT1(data >> 8 & 255);
            this.gfx.writeBG1CNT0(data >> 16 & 255);
            this.gfx.writeBG1CNT1(data >>> 24);
            break;
          //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
          //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
          case 67108876:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2CNT0(data & 255);
            this.gfx.writeBG2CNT1(data >> 8 & 255);
            this.gfx.writeBG3CNT0(data >> 16 & 255);
            this.gfx.writeBG3CNT1(data >>> 24);
            break;
          //4000010h - BG0HOFS - BG0 X-Offset (W)
          //4000012h - BG0VOFS - BG0 Y-Offset (W)
          case 67108880:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG0HOFS0(data & 255);
            this.gfx.writeBG0HOFS1(data >> 8 & 255);
            this.gfx.writeBG0VOFS0(data >> 16 & 255);
            this.gfx.writeBG0VOFS1(data >>> 24);
            break;
          //4000014h - BG1HOFS - BG1 X-Offset (W)
          //4000016h - BG1VOFS - BG1 Y-Offset (W)
          case 67108884:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG1HOFS0(data & 255);
            this.gfx.writeBG1HOFS1(data >> 8 & 255);
            this.gfx.writeBG1VOFS0(data >> 16 & 255);
            this.gfx.writeBG1VOFS1(data >>> 24);
            break;
          //4000018h - BG2HOFS - BG2 X-Offset (W)
          //400001Ah - BG2VOFS - BG2 Y-Offset (W)
          case 67108888:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2HOFS0(data & 255);
            this.gfx.writeBG2HOFS1(data >> 8 & 255);
            this.gfx.writeBG2VOFS0(data >> 16 & 255);
            this.gfx.writeBG2VOFS1(data >>> 24);
            break;
          //400001Ch - BG3HOFS - BG3 X-Offset (W)
          //400001Eh - BG3VOFS - BG3 Y-Offset (W)
          case 67108892:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3HOFS0(data & 255);
            this.gfx.writeBG3HOFS1(data >> 8 & 255);
            this.gfx.writeBG3VOFS0(data >> 16 & 255);
            this.gfx.writeBG3VOFS1(data >>> 24);
            break;
          //4000020h - BG2PA - BG2 Rotation/Scaling Parameter A (alias dx) (W)
          //4000022h - BG2PB - BG2 Rotation/Scaling Parameter B (alias dmx) (W)
          case 67108896:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PA0(data & 255);
            this.gfx.writeBG2PA1(data >> 8 & 255);
            this.gfx.writeBG2PB0(data >> 16 & 255);
            this.gfx.writeBG2PB1(data >>> 24);
            break;
          //4000024h - BG2PC - BG2 Rotation/Scaling Parameter C (alias dy) (W)
          //4000026h - BG2PD - BG2 Rotation/Scaling Parameter D (alias dmy) (W)
          case 67108900:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2PC0(data & 255);
            this.gfx.writeBG2PC1(data >> 8 & 255);
            this.gfx.writeBG2PD0(data >> 16 & 255);
            this.gfx.writeBG2PD1(data >>> 24);
            break;
          //4000028h - BG2X_L - BG2 Reference Point X-Coordinate, lower 16 bit (W)
          //400002Ah - BG2X_H - BG2 Reference Point X-Coordinate, upper 12 bit (W)
          case 67108904:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2X_L0(data & 255);
            this.gfx.writeBG2X_L1(data >> 8 & 255);
            this.gfx.writeBG2X_H0(data >> 16 & 255);
            this.gfx.writeBG2X_H1(data >>> 24);
            break;
          //400002Ch - BG2Y_L - BG2 Reference Point Y-Coordinate, lower 16 bit (W)
          //400002Eh - BG2Y_H - BG2 Reference Point Y-Coordinate, upper 12 bit (W)
          case 67108908:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG2Y_L0(data & 255);
            this.gfx.writeBG2Y_L1(data >> 8 & 255);
            this.gfx.writeBG2Y_H0(data >> 16 & 255);
            this.gfx.writeBG2Y_H1(data >>> 24);
            break;
          //4000030h - BG3PA - BG3 Rotation/Scaling Parameter A (alias dx) (W)
          //4000032h - BG3PB - BG3 Rotation/Scaling Parameter B (alias dmx) (W)
          case 67108912:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PA0(data & 255);
            this.gfx.writeBG3PA1(data >> 8 & 255);
            this.gfx.writeBG3PB0(data >> 16 & 255);
            this.gfx.writeBG3PB1(data >>> 24);
            break;
          //4000034h - BG3PC - BG3 Rotation/Scaling Parameter C (alias dy) (W)
          //4000036h - BG3PD - BG3 Rotation/Scaling Parameter D (alias dmy) (W)
          case 67108916:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3PC0(data & 255);
            this.gfx.writeBG3PC1(data >> 8 & 255);
            this.gfx.writeBG3PD0(data >> 16 & 255);
            this.gfx.writeBG3PD1(data >>> 24);
            break;
          //4000038h - BG3X_L - BG3 Reference Point X-Coordinate, lower 16 bit (W)
          //400003Ah - BG3X_H - BG3 Reference Point X-Coordinate, upper 12 bit (W)
          case 67108920:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3X_L0(data & 255);
            this.gfx.writeBG3X_L1(data >> 8 & 255);
            this.gfx.writeBG3X_H0(data >> 16 & 255);
            this.gfx.writeBG3X_H1(data >>> 24);
            break;
          //400003Ch - BG3Y_L - BG3 Reference Point Y-Coordinate, lower 16 bit (W)
          //400003Eh - BG3Y_H - BG3 Reference Point Y-Coordinate, upper 12 bit (W)
          case 67108924:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBG3Y_L0(data & 255);
            this.gfx.writeBG3Y_L1(data >> 8 & 255);
            this.gfx.writeBG3Y_H0(data >> 16 & 255);
            this.gfx.writeBG3Y_H1(data >>> 24);
            break;
          //4000040h - WIN0H - Window 0 Horizontal Dimensions (W)
          //4000042h - WIN1H - Window 1 Horizontal Dimensions (W)
          case 67108928:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN0H0(data & 255);
            this.gfx.writeWIN0H1(data >> 8 & 255);
            this.gfx.writeWIN1H0(data >> 16 & 255);
            this.gfx.writeWIN1H1(data >>> 24);
            break;
          //4000044h - WIN0V - Window 0 Vertical Dimensions (W)
          //4000046h - WIN1V - Window 1 Vertical Dimensions (W)
          case 67108932:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWIN0V0(data & 255);
            this.gfx.writeWIN0V1(data >> 8 & 255);
            this.gfx.writeWIN1V0(data >> 16 & 255);
            this.gfx.writeWIN1V1(data >>> 24);
            break;
          //4000048h - WININ - Control of Inside of Window(s) (R/W)
          //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
          case 67108936:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeWININ0(data & 255);
            this.gfx.writeWININ1(data >> 8 & 255);
            this.gfx.writeWINOUT0(data >> 16 & 255);
            this.gfx.writeWINOUT1(data >>> 24);
            break;
          //400004Ch - MOSAIC - Mosaic Size (W)
          //400004Eh - NOT USED - ZERO
          case 67108940:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeMOSAIC0(data & 255);
            this.gfx.writeMOSAIC1(data >> 8 & 255);
            break;
          //4000050h - BLDCNT - Color Special Effects Selection (R/W)
          //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
          case 67108944:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDCNT0(data & 255);
            this.gfx.writeBLDCNT1(data >> 8 & 255);
            this.gfx.writeBLDALPHA0(data >> 16 & 255);
            this.gfx.writeBLDALPHA1(data >>> 24);
            break;
          //4000054h - BLDY - Brightness (Fade-In/Out) Coefficient (W)
          case 67108948:
            this.IOCore.updateGraphicsClocking();
            this.gfx.writeBLDY(data & 255);
            break;
          //4000055h through 400005Fh - NOT USED - ZERO/GLITCHED
          //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
          //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
          case 67108960:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_L(data & 255);
            this.sound.writeSOUND1CNT_H0(data >> 16 & 255);
            this.sound.writeSOUND1CNT_H1(data >>> 24);
            break;
          //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
          //4000066h - NOT USED - ZERO
          case 67108964:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND1CNT_X0(data & 255);
            this.sound.writeSOUND1CNT_X1(data >> 8 & 255);
            break;
          //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
          //400006Ah - NOT USED - ZERO
          case 67108968:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_L0(data & 255);
            this.sound.writeSOUND2CNT_L1(data >> 8 & 255);
            break;
          //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
          //400006Eh - NOT USED - ZERO
          case 67108972:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND2CNT_H0(data & 255);
            this.sound.writeSOUND2CNT_H1(data >> 8 & 255);
            break;
          //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
          //4000072h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
          case 67108976:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_L(data & 255);
            this.sound.writeSOUND3CNT_H0(data >> 16 & 255);
            this.sound.writeSOUND3CNT_H1(data >>> 24);
            break;
          //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
          //4000076h - NOT USED - ZERO
          case 67108980:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND3CNT_X0(data & 255);
            this.sound.writeSOUND3CNT_X1(data >> 8 & 255);
            break;
          //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
          //400007Ah - NOT USED - ZERO
          case 67108984:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_L0(data & 255);
            this.sound.writeSOUND4CNT_L1(data >> 8 & 255);
            break;
          //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
          //400007Eh - NOT USED - ZERO
          case 67108988:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUND4CNT_H0(data & 255);
            this.sound.writeSOUND4CNT_H1(data >> 8 & 255);
            break;
          //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
          //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
          case 67108992:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_L0(data & 255);
            this.sound.writeSOUNDCNT_L1(data >> 8 & 255);
            this.sound.writeSOUNDCNT_H0(data >> 16 & 255);
            this.sound.writeSOUNDCNT_H1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
          //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
          //4000086h - NOT USED - ZERO
          case 67108996:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDCNT_X(data & 255);
            break;
          //4000088h - SOUNDBIAS - Sound PWM Control (R/W)
          case 67109e3:
            this.IOCore.updateTimerClocking();
            this.sound.writeSOUNDBIAS0(data & 255);
            this.sound.writeSOUNDBIAS1(data >> 8 & 255);
            break;
          //400008Ah through 400008Fh - NOT USED - ZERO/GLITCHED
          //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
          //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109008:
          //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
          //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109012:
          //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
          //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109016:
          //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
          //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109020:
            this.IOCore.updateTimerClocking();
            this.sound.writeWAVE32((address | 0) - 67109008 >> 2, data | 0);
            break;
          //40000A0h - FIFO_A_L - FIFO Channel A First Word (W)
          //40000A2h - FIFO_A_H - FIFO Channel A Second Word (W)
          case 67109024:
            this.IOCore.updateTimerClocking();
            this.sound.writeFIFOA32(data | 0);
            break;
          //40000A4h - FIFO_B_L - FIFO Channel B First Word (W)
          //40000A6h - FIFO_B_H - FIFO Channel B Second Word (W)
          case 67109028:
            this.IOCore.updateTimerClocking();
            this.sound.writeFIFOB32(data | 0);
            break;
          //40000A8h through 40000AFh - NOT USED - GLITCHED
          //40000B0h - DMA0SAH - DMA 0 Source Address (W) (internal memory)
          //40000B2h - DMA0SAD - DMA 0 Source Address (W) (internal memory)
          case 67109040:
            this.dmaChannel0.writeDMASource32(data | 0);
            break;
          //40000B4h - DMA0DAD - DMA 0 Destination Address (W) (internal memory)
          //40000B6h - DMA0DAH - DMA 0 Destination Address (W) (internal memory)
          case 67109044:
            this.dmaChannel0.writeDMADestination32(data | 0);
            break;
          //40000B8h - DMA0CNT_L - DMA 0 Word Count (W) (14 bit, 1..4000h)
          //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
          case 67109048:
            this.dmaChannel0.writeDMAControl32(data | 0);
            break;
          //40000BCh - DMA1SAD - DMA 1 Source Address (W) (internal memory)
          //40000BEh - DMA1SAH - DMA 1 Source Address (W) (internal memory)
          case 67109052:
            this.dmaChannel1.writeDMASource32(data | 0);
            break;
          //40000C0h - DMA1DAD - DMA 1 Destination Address (W) (internal memory)
          //40000C2h - DMA1DAH - DMA 1 Destination Address (W) (internal memory)
          case 67109056:
            this.dmaChannel1.writeDMADestination32(data | 0);
            break;
          //40000C4h - DMA1CNT_L - DMA 1 Word Count (W) (14 bit, 1..4000h)
          //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
          case 67109060:
            this.dmaChannel1.writeDMAControl32(data | 0);
            break;
          //40000C8h - DMA2SAD - DMA 2 Source Address (W) (internal memory)
          //40000CAh - DMA2SAH - DMA 2 Source Address (W) (internal memory)
          case 67109064:
            this.dmaChannel2.writeDMASource32(data | 0);
            break;
          //40000CCh - DMA2DAD - DMA 2 Destination Address (W) (internal memory)
          //40000CEh - DMA2DAH - DMA 2 Destination Address (W) (internal memory)
          case 67109068:
            this.dmaChannel2.writeDMADestination32(data | 0);
            break;
          //40000D0h - DMA2CNT_L - DMA 2 Word Count (W) (14 bit, 1..4000h)
          //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
          case 67109072:
            this.dmaChannel2.writeDMAControl32(data | 0);
            break;
          //40000D4h - DMA3SAD - DMA 3 Source Address (W) (internal memory)
          //40000D6h - DMA3SAH - DMA 3 Source Address (W) (internal memory)
          case 67109076:
            this.dmaChannel3.writeDMASource32(data | 0);
            break;
          //40000D8h - DMA3DAD - DMA 3 Destination Address (W) (internal memory)
          //40000DAh - DMA3DAH - DMA 3 Destination Address (W) (internal memory)
          case 67109080:
            this.dmaChannel3.writeDMADestination32(data | 0);
            break;
          //40000DCh - DMA3CNT_L - DMA 3 Word Count (W) (16 bit, 1..10000h)
          //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
          case 67109084:
            this.dmaChannel3.writeDMAControl32(data | 0);
            break;
          //40000E0h through 40000FFh - NOT USED - GLITCHED
          //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
          //4000102h - TM0CNT_H - Timer 0 Control (R/W)
          case 67109120:
            this.timer.writeTM0CNT32(data | 0);
            break;
          //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
          //4000106h - TM1CNT_H - Timer 1 Control (R/W)
          case 67109124:
            this.timer.writeTM1CNT32(data | 0);
            break;
          //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
          //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
          case 67109128:
            this.timer.writeTM2CNT32(data | 0);
            break;
          //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
          //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
          case 67109132:
            this.timer.writeTM3CNT32(data | 0);
            break;
          //4000110h through 400011Fh - NOT USED - GLITCHED
          //4000120h - Serial Data A (R/W)
          //4000122h - Serial Data B (R/W)
          case 67109152:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_A0(data & 255);
            this.serial.writeSIODATA_A1(data >> 8 & 255);
            this.serial.writeSIODATA_B0(data >> 16 & 255);
            this.serial.writeSIODATA_B1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
          //4000124h - Serial Data C (R/W)
          //4000126h - Serial Data D (R/W)
          case 67109156:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIODATA_C0(data & 255);
            this.serial.writeSIODATA_C1(data >> 8 & 255);
            this.serial.writeSIODATA_D0(data >> 16 & 255);
            this.serial.writeSIODATA_D1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
          //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
          //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
          case 67109160:
            this.IOCore.updateSerialClocking();
            this.serial.writeSIOCNT0(data & 255);
            this.serial.writeSIOCNT1(data >> 8 & 255);
            this.serial.writeSIODATA8_0(data >> 16 & 255);
            this.serial.writeSIODATA8_1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
          //400012Ch through 400012Fh - NOT USED - GLITCHED
          //4000130h - KEYINPUT - Key Status (R)
          //4000132h - KEYCNT - Key Interrupt Control (R/W)
          case 67109168:
            this.joypad.writeKeyControl16(data >> 16);
            break;
          //4000134h - RCNT (R/W) - Mode Selection
          case 67109172:
            this.IOCore.updateSerialClocking();
            this.serial.writeRCNT0(data & 255);
            this.serial.writeRCNT1(data >> 8 & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000136h through 400013Fh - NOT USED - GLITCHED
          //4000140h - JOYCNT - JOY BUS Control Register (R/W)
          case 67109184:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYCNT(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000142h through 400014Fh - NOT USED - GLITCHED
          //4000150h - JoyBus Receive (R/W)
          //4000152h - JoyBus Receive (R/W)
          case 67109200:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_RECV0(data & 255);
            this.serial.writeJOYBUS_RECV1(data >> 8 & 255);
            this.serial.writeJOYBUS_RECV2(data >> 16 & 255);
            this.serial.writeJOYBUS_RECV3(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
          //4000154h - JoyBus Send (R/W)
          //4000156h - JoyBus Send (R/W)
          case 67109204:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_SEND0(data & 255);
            this.serial.writeJOYBUS_SEND1(data >> 8 & 255);
            this.serial.writeJOYBUS_SEND2(data >> 16 & 255);
            this.serial.writeJOYBUS_SEND3(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
          //4000158h - JoyBus Stat (R/W)
          case 67109208:
            this.IOCore.updateSerialClocking();
            this.serial.writeJOYBUS_STAT(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000159h through 40001FFh - NOT USED - GLITCHED
          //4000200h - IE - Interrupt Enable Register (R/W)
          //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
          case 67109376:
            this.IOCore.updateCoreClocking();
            this.irq.writeIE0(data & 255);
            this.irq.writeIE1(data >> 8 & 255);
            this.irq.writeIF0(data >> 16 & 255);
            this.irq.writeIF1(data >>> 24);
            this.IOCore.updateCoreEventTime();
            break;
          //4000204h - WAITCNT - Waitstate Control (R/W)
          //4000206h - WAITCNT - Waitstate Control (R/W)
          case 67109380:
            this.wait.writeWAITCNT0(data & 255);
            this.wait.writeWAITCNT1(data >> 8 & 255);
            break;
          //4000208h - IME - Interrupt Master Enable Register (R/W)
          case 67109384:
            this.IOCore.updateCoreClocking();
            this.irq.writeIME(data & 255);
            this.IOCore.updateCoreEventTime();
            break;
          //4000209h through 40002FFh - NOT USED - GLITCHED
          //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
          //4000302h - NOT USED - ZERO
          case 67109632:
            this.wait.writePOSTBOOT(data & 255);
            this.wait.writeHALTCNT(data >> 8 & 255);
            break;
          default:
            if ((address & 65532) == 2048) {
              this.wait.writeConfigureWRAM32(data | 0);
            }
        }
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceMemory.prototype.writeVRAM8Preliminary = function(address, data) {
          address = address | 0;
          data = data | 0;
          this.IOCore.updateGraphicsClocking();
          switch (address >> 24) {
            case 5:
              this.wait.VRAMAccess();
              this.gfx.writePalette16(address & 1022, Math.imul(data & 255, 257) | 0);
              break;
            case 6:
              this.wait.VRAMAccess();
              this.gfx.writeVRAM8(address | 0, data | 0);
              break;
            default:
              this.wait.OAMAccess();
          }
        };
      } else {
        GameBoyAdvanceMemory.prototype.writeVRAM8Preliminary = function(address, data) {
          this.IOCore.updateGraphicsClocking();
          switch (address >> 24) {
            case 5:
              this.wait.VRAMAccess();
              this.gfx.writePalette16(address & 1022, (data & 255) * 257);
              break;
            case 6:
              this.wait.VRAMAccess();
              this.gfx.writeVRAM8(address, data);
              break;
            default:
              this.wait.OAMAccess();
          }
        };
      }
      GameBoyAdvanceMemory.prototype.writePalette16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.updateGraphicsClocking();
        this.wait.VRAMAccess();
        this.gfx.writePalette16(address & 1022, data & 65535);
      };
      GameBoyAdvanceMemory.prototype.writeVRAM16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.updateGraphicsClocking();
        this.wait.VRAMAccess();
        this.gfx.writeVRAM16(address | 0, data | 0);
      };
      GameBoyAdvanceMemory.prototype.writeOBJ16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.updateGraphicsClocking();
        this.wait.OAMAccess();
        this.gfx.writeOAM16(address & 1022, data & 65535);
      };
      GameBoyAdvanceMemory.prototype.writePalette32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.updateGraphicsClocking();
        this.wait.VRAMAccess32();
        this.gfx.writePalette32(address & 1020, data | 0);
      };
      GameBoyAdvanceMemory.prototype.writeVRAM32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.updateGraphicsClocking();
        this.wait.VRAMAccess32();
        this.gfx.writeVRAM32(address | 0, data | 0);
      };
      GameBoyAdvanceMemory.prototype.writeOBJ32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.updateGraphicsClocking();
        this.wait.OAMAccess();
        this.gfx.writeOAM32(address & 1020, data | 0);
      };
      GameBoyAdvanceMemory.prototype.writeROM8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.ROMAccess(address | 0);
        this.cartridge.writeROM8(address & 33554431, data & 255);
      };
      GameBoyAdvanceMemory.prototype.writeROM16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.ROMAccess(address | 0);
        this.cartridge.writeROM16(address & 33554430, data & 65535);
      };
      GameBoyAdvanceMemory.prototype.writeROM32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.ROMAccess32(address | 0);
        this.cartridge.writeROM32(address & 33554428, data | 0);
      };
      GameBoyAdvanceMemory.prototype.writeSRAM8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.SRAMAccess();
        this.saves.writeSRAM(address & 65535, data & 255);
      };
      GameBoyAdvanceMemory.prototype.writeSRAM16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.SRAMAccess();
        this.saves.writeSRAM(address & 65534, data >> ((address & 2) << 3) & 255);
      };
      GameBoyAdvanceMemory.prototype.writeSRAM32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.wait.SRAMAccess();
        this.saves.writeSRAM(address & 65532, data & 255);
      };
      GameBoyAdvanceMemory.prototype.writeUnused = function() {
        this.wait.singleClock();
      };
      GameBoyAdvanceMemory.prototype.remapWRAM = function(data) {
        data = data & 33;
        if ((data | 0) != (this.WRAMControlFlags | 0)) {
          switch (data | 0) {
            case 0:
              this.memoryRead8 = this.memoryRead8Generated[0];
              this.memoryWrite8 = this.memoryWrite8Generated[0];
              this.memoryRead16 = this.memoryRead16Generated[0];
              this.memoryReadDMA16 = this.memoryReadDMA16Generated[0];
              this.memoryReadCPU16 = this.memoryReadCPU16Generated[0];
              this.memoryWrite16 = this.memoryWrite16Generated[0];
              this.memoryWriteDMA16 = this.memoryWriteDMA16Generated[0];
              this.memoryRead32 = this.memoryRead32Generated[0];
              this.memoryReadDMA32 = this.memoryReadDMA32Generated[0];
              this.memoryReadCPU32 = this.memoryReadCPU32Generated[0];
              this.memoryWrite32 = this.memoryWrite32Generated[0];
              this.memoryWriteDMA32 = this.memoryWriteDMA32Generated[0];
              break;
            case 32:
              this.memoryRead8 = this.memoryRead8Generated[1];
              this.memoryWrite8 = this.memoryWrite8Generated[1];
              this.memoryRead16 = this.memoryRead16Generated[1];
              this.memoryReadDMA16 = this.memoryReadDMA16Generated[1];
              this.memoryReadCPU16 = this.memoryReadCPU16Generated[1];
              this.memoryWrite16 = this.memoryWrite16Generated[1];
              this.memoryWriteDMA16 = this.memoryWriteDMA16Generated[1];
              this.memoryRead32 = this.memoryRead32Generated[1];
              this.memoryReadDMA32 = this.memoryReadDMA32Generated[1];
              this.memoryReadCPU32 = this.memoryReadCPU32Generated[1];
              this.memoryWrite32 = this.memoryWrite32Generated[1];
              this.memoryWriteDMA32 = this.memoryWriteDMA32Generated[1];
              break;
            default:
              this.memoryRead8 = this.memoryRead8Generated[2];
              this.memoryWrite8 = this.memoryWrite8Generated[2];
              this.memoryRead16 = this.memoryRead16Generated[2];
              this.memoryReadDMA16 = this.memoryReadDMA16Generated[2];
              this.memoryReadCPU16 = this.memoryReadCPU16Generated[2];
              this.memoryWrite16 = this.memoryWrite16Generated[2];
              this.memoryWriteDMA16 = this.memoryWriteDMA16Generated[2];
              this.memoryRead32 = this.memoryRead32Generated[2];
              this.memoryReadDMA32 = this.memoryReadDMA32Generated[2];
              this.memoryReadCPU32 = this.memoryReadCPU32Generated[2];
              this.memoryWrite32 = this.memoryWrite32Generated[2];
              this.memoryWriteDMA32 = this.memoryWriteDMA32Generated[2];
          }
          this.WRAMControlFlags = data | 0;
        }
      };
      GameBoyAdvanceMemory.prototype.readBIOS8 = function(address) {
        address = address | 0;
        var data = 0;
        this.wait.singleClock();
        if ((address | 0) < 16384) {
          if ((this.cpu.registers[15] | 0) < 16384) {
            data = this.BIOS[address & 16383] | 0;
          } else {
            data = this.lastBIOSREAD >> ((address & 3) << 3) & 255;
          }
        } else {
          data = this.readUnused8IO(address | 0) | 0;
        }
        return data | 0;
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceMemory.prototype.readBIOS16 = function(address) {
          address = address | 0;
          var data = 0;
          this.wait.singleClock();
          if ((address | 0) < 16384) {
            address = address >> 1;
            if ((this.cpu.registers[15] | 0) < 16384) {
              data = this.BIOS16[address & 8191] | 0;
            } else {
              data = this.lastBIOSREAD >> ((address & 1) << 4) & 65535;
            }
          } else {
            data = this.readUnused16IO(address | 0) | 0;
          }
          return data | 0;
        };
        GameBoyAdvanceMemory.prototype.readBIOS16CPU = function(address) {
          address = address | 0;
          var data = 0;
          this.IOCore.updateCoreSingle();
          if ((address | 0) < 16384) {
            address = address >> 1;
            data = this.BIOS16[address & 8191] | 0;
            this.lastBIOSREAD = data | 0;
          } else {
            data = this.readUnused16IO(address | 0) | 0;
          }
          return data | 0;
        };
        GameBoyAdvanceMemory.prototype.readBIOS32 = function(address) {
          address = address | 0;
          var data = 0;
          this.wait.singleClock();
          if ((address | 0) < 16384) {
            address = address >> 2;
            if ((this.cpu.registers[15] | 0) < 16384) {
              data = this.BIOS32[address & 4095] | 0;
            } else {
              data = this.lastBIOSREAD | 0;
            }
          } else {
            data = this.IOCore.getCurrentFetchValue() | 0;
          }
          return data | 0;
        };
        GameBoyAdvanceMemory.prototype.readBIOS32CPU = function(address) {
          address = address | 0;
          var data = 0;
          this.IOCore.updateCoreSingle();
          if ((address | 0) < 16384) {
            address = address >> 2;
            data = this.BIOS32[address & 4095] | 0;
            this.lastBIOSREAD = data | 0;
          } else {
            data = this.IOCore.getCurrentFetchValue() | 0;
          }
          return data | 0;
        };
      } else {
        GameBoyAdvanceMemory.prototype.readBIOS16 = function(address) {
          this.wait.singleClock();
          if (address < 16384) {
            if (this.cpu.registers[15] < 16384) {
              return this.BIOS[address & -2] | this.BIOS[address | 1] << 8;
            } else {
              return this.lastBIOSREAD >> ((address & 2) << 3) & 65535;
            }
          } else {
            return this.readUnused16IO(address);
          }
        };
        GameBoyAdvanceMemory.prototype.readBIOS16CPU = function(address) {
          this.IOCore.updateCoreSingle();
          if (address < 16384) {
            var data = this.BIOS[address & -2] | this.BIOS[address | 1] << 8;
            this.lastBIOSREAD = data;
            return data;
          } else {
            return this.readUnused16IO(address);
          }
        };
        GameBoyAdvanceMemory.prototype.readBIOS32 = function(address) {
          this.wait.singleClock();
          if (address < 16384) {
            if (this.cpu.registers[15] < 16384) {
              address &= -4;
              return this.BIOS[address] | this.BIOS[address + 1] << 8 | this.BIOS[address + 2] << 16 | this.BIOS[address + 3] << 24;
            } else {
              return this.lastBIOSREAD;
            }
          } else {
            return this.IOCore.getCurrentFetchValue();
          }
        };
        GameBoyAdvanceMemory.prototype.readBIOS32CPU = function(address) {
          this.IOCore.updateCoreSingle();
          if (address < 16384) {
            address &= -4;
            var data = this.BIOS[address] | this.BIOS[address + 1] << 8 | this.BIOS[address + 2] << 16 | this.BIOS[address + 3] << 24;
            this.lastBIOSREAD = data;
            return data;
          } else {
            return this.IOCore.getCurrentFetchValue();
          }
        };
      }
      GameBoyAdvanceMemory.prototype.readExternalWRAM8 = function(address) {
        address = address | 0;
        this.wait.WRAMAccess();
        return this.externalRAM[address & 262143] | 0;
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceMemory.prototype.readExternalWRAM16 = function(address) {
          address = address | 0;
          this.wait.WRAMAccess();
          return this.externalRAM16[address >> 1 & 131071] | 0;
        };
        GameBoyAdvanceMemory.prototype.readExternalWRAM16CPU = function(address) {
          address = address | 0;
          this.wait.WRAMAccess16CPU();
          return this.externalRAM16[address >> 1 & 131071] | 0;
        };
        GameBoyAdvanceMemory.prototype.readExternalWRAM32 = function(address) {
          address = address | 0;
          this.wait.WRAMAccess32();
          return this.externalRAM32[address >> 2 & 65535] | 0;
        };
        GameBoyAdvanceMemory.prototype.readExternalWRAM32CPU = function(address) {
          address = address | 0;
          this.wait.WRAMAccess32CPU();
          return this.externalRAM32[address >> 2 & 65535] | 0;
        };
      } else {
        GameBoyAdvanceMemory.prototype.readExternalWRAM16 = function(address) {
          this.wait.WRAMAccess();
          address &= 262142;
          return this.externalRAM[address] | this.externalRAM[address + 1] << 8;
        };
        GameBoyAdvanceMemory.prototype.readExternalWRAM16CPU = function(address) {
          this.wait.WRAMAccess16CPU();
          address &= 262142;
          return this.externalRAM[address] | this.externalRAM[address + 1] << 8;
        };
        GameBoyAdvanceMemory.prototype.readExternalWRAM32 = function(address) {
          this.wait.WRAMAccess32();
          address &= 262140;
          return this.externalRAM[address] | this.externalRAM[address + 1] << 8 | this.externalRAM[address + 2] << 16 | this.externalRAM[address + 3] << 24;
        };
        GameBoyAdvanceMemory.prototype.readExternalWRAM32CPU = function(address) {
          this.wait.WRAMAccess32CPU();
          address &= 262140;
          return this.externalRAM[address] | this.externalRAM[address + 1] << 8 | this.externalRAM[address + 2] << 16 | this.externalRAM[address + 3] << 24;
        };
      }
      GameBoyAdvanceMemory.prototype.readInternalWRAM8 = function(address) {
        address = address | 0;
        this.wait.singleClock();
        return this.internalRAM[address & 32767] | 0;
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceMemory.prototype.readInternalWRAM16 = function(address) {
          address = address | 0;
          this.wait.singleClock();
          return this.internalRAM16[address >> 1 & 16383] | 0;
        };
        GameBoyAdvanceMemory.prototype.readInternalWRAM16CPU = function(address) {
          address = address | 0;
          this.IOCore.updateCoreSingle();
          return this.internalRAM16[address >> 1 & 16383] | 0;
        };
        GameBoyAdvanceMemory.prototype.readInternalWRAM32 = function(address) {
          address = address | 0;
          this.wait.singleClock();
          return this.internalRAM32[address >> 2 & 8191] | 0;
        };
        GameBoyAdvanceMemory.prototype.readInternalWRAM32CPU = function(address) {
          address = address | 0;
          this.IOCore.updateCoreSingle();
          return this.internalRAM32[address >> 2 & 8191] | 0;
        };
      } else {
        GameBoyAdvanceMemory.prototype.readInternalWRAM16 = function(address) {
          this.wait.singleClock();
          address &= 32766;
          return this.internalRAM[address] | this.internalRAM[address + 1] << 8;
        };
        GameBoyAdvanceMemory.prototype.readInternalWRAM16CPU = function(address) {
          this.IOCore.updateCoreSingle();
          address &= 32766;
          return this.internalRAM[address] | this.internalRAM[address + 1] << 8;
        };
        GameBoyAdvanceMemory.prototype.readInternalWRAM32 = function(address) {
          this.wait.singleClock();
          address &= 32764;
          return this.internalRAM[address] | this.internalRAM[address + 1] << 8 | this.internalRAM[address + 2] << 16 | this.internalRAM[address + 3] << 24;
        };
        GameBoyAdvanceMemory.prototype.readInternalWRAM32CPU = function(address) {
          this.IOCore.updateCoreSingle();
          address &= 32764;
          return this.internalRAM[address] | this.internalRAM[address + 1] << 8 | this.internalRAM[address + 2] << 16 | this.internalRAM[address + 3] << 24;
        };
      }
      GameBoyAdvanceMemory.prototype.readIODispatch8 = function(address) {
        address = address | 0;
        this.wait.singleClock();
        var data = 0;
        switch (address | 0) {
          //4000000h - DISPCNT - LCD Control (Read/Write)
          case 67108864:
            data = this.gfx.readDISPCNT0() | 0;
            break;
          //4000001h - DISPCNT - LCD Control (Read/Write)
          case 67108865:
            data = this.gfx.readDISPCNT1() | 0;
            break;
          //4000002h - Undocumented - Green Swap (R/W)
          case 67108866:
            data = this.gfx.readGreenSwap() | 0;
            break;
          //4000004h - DISPSTAT - General LCD Status (Read/Write)
          case 67108868:
            this.IOCore.updateGraphicsClocking();
            data = this.gfx.readDISPSTAT0() | 0;
            break;
          //4000005h - DISPSTAT - General LCD Status (Read/Write)
          case 67108869:
            this.IOCore.updateGraphicsClocking();
            data = this.gfx.readDISPSTAT1() | 0;
            break;
          //4000006h - VCOUNT - Vertical Counter (Read only)
          case 67108870:
            this.IOCore.updateGraphicsClocking();
            data = this.gfx.readVCOUNT() | 0;
            break;
          //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
          case 67108872:
            data = this.gfx.readBG0CNT0() | 0;
            break;
          //4000009h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
          case 67108873:
            data = this.gfx.readBG0CNT1() | 0;
            break;
          //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
          case 67108874:
            data = this.gfx.readBG1CNT0() | 0;
            break;
          //400000Bh - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
          case 67108875:
            data = this.gfx.readBG1CNT1() | 0;
            break;
          //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
          case 67108876:
            data = this.gfx.readBG2CNT0() | 0;
            break;
          //400000Dh - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
          case 67108877:
            data = this.gfx.readBG2CNT1() | 0;
            break;
          //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
          case 67108878:
            data = this.gfx.readBG3CNT0() | 0;
            break;
          //400000Fh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
          case 67108879:
            data = this.gfx.readBG3CNT1() | 0;
            break;
          //4000010h through 4000047h - WRITE ONLY
          //4000048h - WININ - Control of Inside of Window(s) (R/W)
          case 67108936:
            data = this.gfx.readWININ0() | 0;
            break;
          //4000049h - WININ - Control of Inside of Window(s) (R/W)
          case 67108937:
            data = this.gfx.readWININ1() | 0;
            break;
          //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
          case 67108938:
            data = this.gfx.readWINOUT0() | 0;
            break;
          //400004AB- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
          case 67108939:
            data = this.gfx.readWINOUT1() | 0;
            break;
          //4000050h - BLDCNT - Color Special Effects Selection (R/W)
          case 67108944:
            data = this.gfx.readBLDCNT0() | 0;
            break;
          //4000051h - BLDCNT - Color Special Effects Selection (R/W)
          case 67108945:
            data = this.gfx.readBLDCNT1() | 0;
            break;
          //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
          case 67108946:
            data = this.gfx.readBLDALPHA0() | 0;
            break;
          //4000053h - BLDALPHA - Alpha Blending Coefficients (R/W)
          case 67108947:
            data = this.gfx.readBLDALPHA1() | 0;
            break;
          //4000054h through 400005Fh - NOT USED - GLITCHED
          //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
          case 67108960:
            data = this.sound.readSOUND1CNT_L() | 0;
            break;
          //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
          case 67108962:
            data = this.sound.readSOUND1CNT_H0() | 0;
            break;
          //4000063h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
          case 67108963:
            data = this.sound.readSOUND1CNT_H1() | 0;
            break;
          //4000065h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
          case 67108965:
            data = this.sound.readSOUND1CNT_X() | 0;
            break;
          //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
          case 67108968:
            data = this.sound.readSOUND2CNT_L0() | 0;
            break;
          //4000069h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
          case 67108969:
            data = this.sound.readSOUND2CNT_L1() | 0;
            break;
          //400006Dh - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
          case 67108973:
            data = this.sound.readSOUND2CNT_H() | 0;
            break;
          //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
          case 67108976:
            data = this.sound.readSOUND3CNT_L() | 0;
            break;
          //4000073h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
          case 67108979:
            data = this.sound.readSOUND3CNT_H() | 0;
            break;
          //4000075h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
          case 67108981:
            data = this.sound.readSOUND3CNT_X() | 0;
            break;
          //4000079h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
          case 67108985:
            data = this.sound.readSOUND4CNT_L() | 0;
            break;
          //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
          case 67108988:
            data = this.sound.readSOUND4CNT_H0() | 0;
            break;
          //400007Dh - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
          case 67108989:
            data = this.sound.readSOUND4CNT_H1() | 0;
            break;
          //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
          case 67108992:
            data = this.sound.readSOUNDCNT_L0() | 0;
            break;
          //4000081h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
          case 67108993:
            data = this.sound.readSOUNDCNT_L1() | 0;
            break;
          //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
          case 67108994:
            data = this.sound.readSOUNDCNT_H0() | 0;
            break;
          //4000083h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
          case 67108995:
            data = this.sound.readSOUNDCNT_H1() | 0;
            break;
          //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
          case 67108996:
            this.IOCore.updateTimerClocking();
            data = this.sound.readSOUNDCNT_X() | 0;
            break;
          //4000088h - SOUNDBIAS - Sound PWM Control (R/W, see below)
          case 67109e3:
            data = this.sound.readSOUNDBIAS0() | 0;
            break;
          //4000089h - SOUNDBIAS - Sound PWM Control (R/W, see below)
          case 67109001:
            data = this.sound.readSOUNDBIAS1() | 0;
            break;
          //400008Ch - NOT USED - GLITCHED
          //400008Dh - NOT USED - GLITCHED
          //400008Eh - NOT USED - GLITCHED
          //400008Fh - NOT USED - GLITCHED
          //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109008:
          //4000091h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109009:
          //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109010:
          //4000093h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109011:
          //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109012:
          //4000095h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109013:
          //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109014:
          //4000097h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109015:
          //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109016:
          //4000099h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109017:
          //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109018:
          //400009Bh - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109019:
          //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109020:
          //400009Dh - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109021:
          //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109022:
          //400009Fh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109023:
            this.IOCore.updateTimerClocking();
            data = this.sound.readWAVE8((address | 0) - 67109008 | 0) | 0;
            break;
          //40000A0h through 40000B9h - WRITE ONLY
          //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
          case 67109050:
            data = this.dmaChannel0.readDMAControl8_0() | 0;
            break;
          //40000BBh - DMA0CNT_H - DMA 0 Control (R/W)
          case 67109051:
            data = this.dmaChannel0.readDMAControl8_1() | 0;
            break;
          //40000BCh through 40000C5h - WRITE ONLY
          //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
          case 67109062:
            data = this.dmaChannel1.readDMAControl8_0() | 0;
            break;
          //40000C7h - DMA1CNT_H - DMA 1 Control (R/W)
          case 67109063:
            data = this.dmaChannel1.readDMAControl8_1() | 0;
            break;
          //40000C8h through 40000D1h - WRITE ONLY
          //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
          case 67109074:
            data = this.dmaChannel2.readDMAControl8_0() | 0;
            break;
          //40000D3h - DMA2CNT_H - DMA 2 Control (R/W)
          case 67109075:
            data = this.dmaChannel2.readDMAControl8_1() | 0;
            break;
          //40000D4h through 40000DDh - WRITE ONLY
          //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
          case 67109086:
            data = this.dmaChannel3.readDMAControl8_0() | 0;
            break;
          //40000DFh - DMA3CNT_H - DMA 3 Control (R/W)
          case 67109087:
            data = this.dmaChannel3.readDMAControl8_1() | 0;
            break;
          //40000E0h through 40000FFh - NOT USED - GLITCHED
          //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
          case 67109120:
            data = this.timer.readTM0CNT8_0() | 0;
            break;
          //4000101h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
          case 67109121:
            data = this.timer.readTM0CNT8_1() | 0;
            break;
          //4000102h - TM0CNT_H - Timer 0 Control (R/W)
          case 67109122:
            data = this.timer.readTM0CNT8_2() | 0;
            break;
          //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
          case 67109124:
            data = this.timer.readTM1CNT8_0() | 0;
            break;
          //4000105h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
          case 67109125:
            data = this.timer.readTM1CNT8_1() | 0;
            break;
          //4000106h - TM1CNT_H - Timer 1 Control (R/W)
          case 67109126:
            data = this.timer.readTM1CNT8_2() | 0;
            break;
          //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
          case 67109128:
            data = this.timer.readTM2CNT8_0() | 0;
            break;
          //4000109h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
          case 67109129:
            data = this.timer.readTM2CNT8_1() | 0;
            break;
          //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
          case 67109130:
            data = this.timer.readTM2CNT8_2() | 0;
            break;
          //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
          case 67109132:
            data = this.timer.readTM3CNT8_0() | 0;
            break;
          //400010Dh - TM3CNT_L - Timer 3 Counter/Reload (R/W)
          case 67109133:
            data = this.timer.readTM3CNT8_1() | 0;
            break;
          //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
          case 67109134:
            data = this.timer.readTM3CNT8_2() | 0;
            break;
          //4000110h through 400011Fh - NOT USED - GLITCHED
          //4000120h - Serial Data A (R/W)
          case 67109152:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_A0() | 0;
            break;
          //4000121h - Serial Data A (R/W)
          case 67109153:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_A1() | 0;
            break;
          //4000122h - Serial Data B (R/W)
          case 67109154:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_B0() | 0;
            break;
          //4000123h - Serial Data B (R/W)
          case 67109155:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_B1() | 0;
            break;
          //4000124h - Serial Data C (R/W)
          case 67109156:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_C0() | 0;
            break;
          //4000125h - Serial Data C (R/W)
          case 67109157:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_C1() | 0;
            break;
          //4000126h - Serial Data D (R/W)
          case 67109158:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_D0() | 0;
            break;
          //4000127h - Serial Data D (R/W)
          case 67109159:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_D1() | 0;
            break;
          //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
          case 67109160:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIOCNT0() | 0;
            break;
          //4000129h - SIOCNT - SIO Sub Mode Control (R/W)
          case 67109161:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIOCNT1() | 0;
            break;
          //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
          case 67109162:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA8_0() | 0;
            break;
          //400012Bh - SIOMLT_SEND - Data Send Register (R/W)
          case 67109163:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA8_1() | 0;
            break;
          //400012Ch through 400012Fh - NOT USED - GLITCHED
          //4000130h - KEYINPUT - Key Status (R)
          case 67109168:
            data = this.joypad.readKeyStatus8_0() | 0;
            break;
          //4000131h - KEYINPUT - Key Status (R)
          case 67109169:
            data = this.joypad.readKeyStatus8_1() | 0;
            break;
          //4000132h - KEYCNT - Key Interrupt Control (R/W)
          case 67109170:
            data = this.joypad.readKeyControl8_0() | 0;
            break;
          //4000133h - KEYCNT - Key Interrupt Control (R/W)
          case 67109171:
            data = this.joypad.readKeyControl8_1() | 0;
            break;
          //4000134h - RCNT (R/W) - Mode Selection
          case 67109172:
            this.IOCore.updateSerialClocking();
            data = this.serial.readRCNT0() | 0;
            break;
          //4000135h - RCNT (R/W) - Mode Selection
          case 67109173:
            this.IOCore.updateSerialClocking();
            data = this.serial.readRCNT1() | 0;
            break;
          //4000138h through 400013Fh - NOT USED - GLITCHED
          //4000140h - JOYCNT - JOY BUS Control Register (R/W)
          case 67109184:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYCNT() | 0;
            break;
          //4000144h through 400014Fh - NOT USED - GLITCHED
          //4000150h - JoyBus Receive (R/W)
          case 67109200:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV0() | 0;
            break;
          //4000151h - JoyBus Receive (R/W)
          case 67109201:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV1() | 0;
            break;
          //4000152h - JoyBus Receive (R/W)
          case 67109202:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV2() | 0;
            break;
          //4000153h - JoyBus Receive (R/W)
          case 67109203:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV3() | 0;
            break;
          //4000154h - JoyBus Send (R/W)
          case 67109204:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND0() | 0;
            break;
          //4000155h - JoyBus Send (R/W)
          case 67109205:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND1() | 0;
            break;
          //4000156h - JoyBus Send (R/W)
          case 67109206:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND2() | 0;
            break;
          //4000157h - JoyBus Send (R/W)
          case 67109207:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND3() | 0;
            break;
          //4000158h - JoyBus Stat (R/W)
          case 67109208:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_STAT() | 0;
            break;
          //400015Ch through 40001FFh - NOT USED - GLITCHED
          //4000200h - IE - Interrupt Enable Register (R/W)
          case 67109376:
            data = this.irq.readIE0() | 0;
            break;
          //4000201h - IE - Interrupt Enable Register (R/W)
          case 67109377:
            data = this.irq.readIE1() | 0;
            break;
          //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
          case 67109378:
            this.IOCore.updateCoreSpillRetain();
            data = this.irq.readIF0() | 0;
            break;
          //4000203h - IF - Interrupt Request Flags / IRQ Acknowledge
          case 67109379:
            this.IOCore.updateCoreSpillRetain();
            data = this.irq.readIF1() | 0;
            break;
          //4000204h - WAITCNT - Waitstate Control (R/W)
          case 67109380:
            data = this.wait.readWAITCNT0() | 0;
            break;
          //4000205h - WAITCNT - Waitstate Control (R/W)
          case 67109381:
            data = this.wait.readWAITCNT1() | 0;
            break;
          //4000208h - IME - Interrupt Master Enable Register (R/W)
          case 67109384:
            data = this.irq.readIME() | 0;
            break;
          //400020Ch through 40002FFh - NOT USED - GLITCHED
          //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
          case 67109632:
            data = this.wait.readPOSTBOOT() | 0;
            break;
          default:
            data = this.readIO8LessCalled(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readIO8LessCalled = function(address) {
        address = address | 0;
        var data = 0;
        switch (address | 0) {
          //4000003h - Undocumented - Green Swap (R/W)
          case 67108867:
          //4000007h - VCOUNT - Vertical Counter (Read only)
          case 67108871:
          //400004Ch - MOSAIC - Mosaic Size (W)
          case 67108940:
          //400004Dh - MOSAIC - Mosaic Size (W)
          case 67108941:
          //400004Eh - NOT USED - ZERO
          case 67108942:
          //400004Fh - NOT USED - ZERO
          case 67108943:
          //4000061h - NOT USED - ZERO
          case 67108961:
          //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
          case 67108964:
          //4000066h - NOT USED - ZERO
          case 67108966:
          //4000067h - NOT USED - ZERO
          case 67108967:
          //400006Ah - NOT USED - ZERO
          case 67108970:
          //400006Bh - NOT USED - ZERO
          case 67108971:
          //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
          case 67108972:
          //400006Eh - NOT USED - ZERO
          case 67108974:
          //400006Fh - NOT USED - ZERO
          case 67108975:
          //4000071h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
          case 67108977:
          //4000072h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
          case 67108978:
          //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
          case 67108980:
          //4000076h - NOT USED - ZERO
          case 67108982:
          //4000077h - NOT USED - ZERO
          case 67108983:
          //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
          case 67108984:
          //400007Ah - NOT USED - ZERO
          case 67108986:
          //400007Bh - NOT USED - ZERO
          case 67108987:
          //400007Eh - NOT USED - ZERO
          case 67108990:
          //400007Fh - NOT USED - ZERO
          case 67108991:
          //4000085h - NOT USED - ZERO
          case 67108997:
          //4000086h - NOT USED - ZERO
          case 67108998:
          //4000087h - NOT USED - ZERO
          case 67108999:
          //400008Ah - NOT USED - ZERO
          case 67109002:
          //400008Bh - NOT USED - ZERO
          case 67109003:
          //4000103h - TM0CNT_H - Timer 0 Control (R/W)
          case 67109123:
          //4000107h - TM1CNT_H - Timer 1 Control (R/W)
          case 67109127:
          //400010Bh - TM2CNT_H - Timer 2 Control (R/W)
          case 67109131:
          //400010Fh - TM3CNT_H - Timer 3 Control (R/W)
          case 67109135:
          //4000136h - NOT USED - ZERO
          case 67109174:
          //4000137h - NOT USED - ZERO
          case 67109175:
          //4000141h - JOYCNT - JOY BUS Control Register (R/W)
          case 67109185:
          //4000142h - NOT USED - ZERO
          case 67109186:
          //4000143h - NOT USED - ZERO
          case 67109187:
          //4000159h - JoyBus Stat (R/W)
          case 67109209:
          //400015Ah - NOT USED - ZERO
          case 67109210:
          //400015Bh - NOT USED - ZERO
          case 67109211:
          //4000206h - NOT USED - ZERO
          case 67109382:
          //4000207h - NOT USED - ZERO
          case 67109383:
          //4000209h - IME - Interrupt Master Enable Register (R/W)
          case 67109385:
          //400020Ah - NOT USED - ZERO
          case 67109386:
          //400020Bh - NOT USED - ZERO
          case 67109387:
          //4000301h - HALTCNT - BYTE - Undocumented - Low Power Mode Control (W)
          case 67109633:
          //4000302h - NOT USED - ZERO
          case 67109634:
          //4000303h - NOT USED - ZERO
          case 67109635:
            break;
          default:
            if ((address & 65532) == 2048) {
              data = this.wait.readConfigureWRAM8(address | 0) | 0;
            } else {
              data = this.readUnused8IO(address | 0) | 0;
            }
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readIODispatch16 = function(address) {
        address = address | 0;
        var data = 0;
        this.wait.singleClock();
        var data = this.readIO16(address | 0) | 0;
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readIODispatch16CPU = function(address) {
        address = address | 0;
        this.IOCore.updateCoreSingle();
        var data = this.readIO16(address | 0) | 0;
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readIO16 = function(address) {
        address = address | 0;
        var data = 0;
        switch (address & -2) {
          //4000000h - DISPCNT - LCD Control (Read/Write)
          case 67108864:
            data = this.gfx.readDISPCNT0() | this.gfx.readDISPCNT1() << 8;
            break;
          //4000002h - Undocumented - Green Swap (R/W)
          case 67108866:
            data = this.gfx.readGreenSwap() | 0;
            break;
          //4000004h - DISPSTAT - General LCD Status (Read/Write)
          case 67108868:
            this.IOCore.updateGraphicsClocking();
            data = this.gfx.readDISPSTAT0() | this.gfx.readDISPSTAT1() << 8;
            break;
          //4000006h - VCOUNT - Vertical Counter (Read only)
          case 67108870:
            this.IOCore.updateGraphicsClocking();
            data = this.gfx.readVCOUNT() | 0;
            break;
          //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
          case 67108872:
            data = this.gfx.readBG0CNT0() | this.gfx.readBG0CNT1() << 8;
            break;
          //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
          case 67108874:
            data = this.gfx.readBG1CNT0() | this.gfx.readBG1CNT1() << 8;
            break;
          //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
          case 67108876:
            data = this.gfx.readBG2CNT0() | this.gfx.readBG2CNT1() << 8;
            break;
          //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
          case 67108878:
            data = this.gfx.readBG3CNT0() | this.gfx.readBG3CNT1() << 8;
            break;
          //4000010h through 4000047h - WRITE ONLY
          //4000048h - WININ - Control of Inside of Window(s) (R/W)
          case 67108936:
            data = this.gfx.readWININ0() | this.gfx.readWININ1() << 8;
            break;
          //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
          case 67108938:
            data = this.gfx.readWINOUT0() | this.gfx.readWINOUT1() << 8;
            break;
          //4000050h - BLDCNT - Color Special Effects Selection (R/W)
          case 67108944:
            data = this.gfx.readBLDCNT0() | this.gfx.readBLDCNT1() << 8;
            break;
          //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
          case 67108946:
            data = this.gfx.readBLDALPHA0() | this.gfx.readBLDALPHA1() << 8;
            break;
          //4000054h through 400005Fh - NOT USED - GLITCHED
          //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
          case 67108960:
            data = this.sound.readSOUND1CNT_L() | 0;
            break;
          //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
          case 67108962:
            data = this.sound.readSOUND1CNT_H0() | this.sound.readSOUND1CNT_H1() << 8;
            break;
          //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
          case 67108964:
            data = this.sound.readSOUND1CNT_X() << 8;
            break;
          //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
          case 67108968:
            data = this.sound.readSOUND2CNT_L0() | this.sound.readSOUND2CNT_L1() << 8;
            break;
          //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
          case 67108972:
            data = this.sound.readSOUND2CNT_H() << 8;
            break;
          //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
          case 67108976:
            data = this.sound.readSOUND3CNT_L() | 0;
            break;
          //4000073h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
          case 67108978:
            data = this.sound.readSOUND3CNT_H() << 8;
            break;
          //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
          case 67108980:
            data = this.sound.readSOUND3CNT_X() << 8;
            break;
          //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
          case 67108984:
            data = this.sound.readSOUND4CNT_L() << 8;
            break;
          //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
          case 67108988:
            data = this.sound.readSOUND4CNT_H0() | this.sound.readSOUND4CNT_H1() << 8;
            break;
          //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
          case 67108992:
            data = this.sound.readSOUNDCNT_L0() | this.sound.readSOUNDCNT_L1() << 8;
            break;
          //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
          case 67108994:
            data = this.sound.readSOUNDCNT_H0() | this.sound.readSOUNDCNT_H1() << 8;
            break;
          //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
          case 67108996:
            this.IOCore.updateTimerClocking();
            data = this.sound.readSOUNDCNT_X() | 0;
            break;
          //4000088h - SOUNDBIAS - Sound PWM Control (R/W, see below)
          case 67109e3:
            data = this.sound.readSOUNDBIAS0() | this.sound.readSOUNDBIAS1() << 8;
            break;
          //400008Ch - NOT USED - GLITCHED
          //400008Eh - NOT USED - GLITCHED
          //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109008:
          //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109010:
          //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109012:
          //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109014:
          //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109016:
          //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109018:
          //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
          case 67109020:
          //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109022:
            this.IOCore.updateTimerClocking();
            data = this.sound.readWAVE16((address | 0) - 67109008 >> 1) | 0;
            break;
          //40000A0h through 40000B9h - WRITE ONLY
          //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
          case 67109050:
            data = this.dmaChannel0.readDMAControl16() | 0;
            break;
          //40000BCh through 40000C5h - WRITE ONLY
          //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
          case 67109062:
            data = this.dmaChannel1.readDMAControl16() | 0;
            break;
          //40000C8h through 40000D1h - WRITE ONLY
          //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
          case 67109074:
            data = this.dmaChannel2.readDMAControl16() | 0;
            break;
          //40000D4h through 40000DDh - WRITE ONLY
          //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
          case 67109086:
            data = this.dmaChannel3.readDMAControl16() | 0;
            break;
          //40000E0h through 40000FFh - NOT USED - GLITCHED
          //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
          case 67109120:
            data = this.timer.readTM0CNT16() | 0;
            break;
          //4000102h - TM0CNT_H - Timer 0 Control (R/W)
          case 67109122:
            data = this.timer.readTM0CNT8_2() | 0;
            break;
          //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
          case 67109124:
            data = this.timer.readTM1CNT16() | 0;
            break;
          //4000106h - TM1CNT_H - Timer 1 Control (R/W)
          case 67109126:
            data = this.timer.readTM1CNT8_2() | 0;
            break;
          //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
          case 67109128:
            data = this.timer.readTM2CNT16() | 0;
            break;
          //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
          case 67109130:
            data = this.timer.readTM2CNT8_2() | 0;
            break;
          //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
          case 67109132:
            data = this.timer.readTM3CNT16() | 0;
            break;
          //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
          case 67109134:
            data = this.timer.readTM3CNT8_2() | 0;
            break;
          //4000110h through 400011Fh - NOT USED - GLITCHED
          //4000120h - Serial Data A (R/W)
          case 67109152:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_A0() | this.serial.readSIODATA_A1() << 8;
            break;
          //4000122h - Serial Data B (R/W)
          case 67109154:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_B0() | this.serial.readSIODATA_B1() << 8;
            break;
          //4000124h - Serial Data C (R/W)
          case 67109156:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_C0() | this.serial.readSIODATA_C1() << 8;
            break;
          //4000126h - Serial Data D (R/W)
          case 67109158:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_D0() | this.serial.readSIODATA_D1() << 8;
            break;
          //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
          case 67109160:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIOCNT0() | this.serial.readSIOCNT1() << 8;
            break;
          //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
          case 67109162:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA8_0() | this.serial.readSIODATA8_1() << 8;
            break;
          //400012Ch through 400012Fh - NOT USED - GLITCHED
          //4000130h - KEYINPUT - Key Status (R)
          case 67109168:
            data = this.joypad.readKeyStatus16() | 0;
            break;
          //4000132h - KEYCNT - Key Interrupt Control (R/W)
          case 67109170:
            data = this.joypad.readKeyControl16() | 0;
            break;
          //4000134h - RCNT (R/W) - Mode Selection
          case 67109172:
            this.IOCore.updateSerialClocking();
            data = this.serial.readRCNT0() | this.serial.readRCNT1() << 8;
            break;
          //4000138h through 400013Fh - NOT USED - GLITCHED
          //4000140h - JOYCNT - JOY BUS Control Register (R/W)
          case 67109184:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYCNT() | 0;
            break;
          //4000144h through 400014Fh - NOT USED - GLITCHED
          //4000150h - JoyBus Receive (R/W)
          case 67109200:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV0() | this.serial.readJOYBUS_RECV1() << 8;
            break;
          //4000152h - JoyBus Receive (R/W)
          case 67109202:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV2() | this.serial.readJOYBUS_RECV3() << 8;
            break;
          //4000154h - JoyBus Send (R/W)
          case 67109204:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND0() | this.serial.readJOYBUS_SEND1() << 8;
            break;
          //4000156h - JoyBus Send (R/W)
          case 67109206:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND2() | this.serial.readJOYBUS_SEND3() << 8;
            break;
          //4000158h - JoyBus Stat (R/W)
          case 67109208:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_STAT() | 0;
            break;
          //400015Ch through 40001FFh - NOT USED - GLITCHED
          //4000200h - IE - Interrupt Enable Register (R/W)
          case 67109376:
            data = this.irq.readIE0() | this.irq.readIE1() << 8;
            break;
          //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
          case 67109378:
            this.IOCore.updateCoreSpillRetain();
            data = this.irq.readIF0() | this.irq.readIF1() << 8;
            break;
          //4000204h - WAITCNT - Waitstate Control (R/W)
          case 67109380:
            data = this.wait.readWAITCNT0() | this.wait.readWAITCNT1() << 8;
            break;
          //4000208h - IME - Interrupt Master Enable Register (R/W)
          case 67109384:
            data = this.irq.readIME() | 0;
            break;
          //400020Ch through 40002FFh - NOT USED - GLITCHED
          //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
          case 67109632:
            data = this.wait.readPOSTBOOT() | 0;
            break;
          default:
            data = this.readIO16LessCalled(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readIO16LessCalled = function(address) {
        address = address | 0;
        var data = 0;
        switch (address & -2) {
          //400004Ch - MOSAIC - Mosaic Size (W)
          case 67108940:
          //400004Eh - NOT USED - ZERO
          case 67108942:
          //4000066h - NOT USED - ZERO
          case 67108966:
          //400006Ah - NOT USED - ZERO
          case 67108970:
          //400006Eh - NOT USED - ZERO
          case 67108974:
          //4000076h - NOT USED - ZERO
          case 67108982:
          //400007Ah - NOT USED - ZERO
          case 67108986:
          //400007Eh - NOT USED - ZERO
          case 67108990:
          //4000086h - NOT USED - ZERO
          case 67108998:
          //400008Ah - NOT USED - ZERO
          case 67109002:
          //4000136h - NOT USED - ZERO
          case 67109174:
          //4000142h - NOT USED - ZERO
          case 67109186:
          //400015Ah - NOT USED - ZERO
          case 67109210:
          //4000206h - NOT USED - ZERO
          case 67109382:
          //400020Ah - NOT USED - ZERO
          case 67109386:
          //4000302h - NOT USED - ZERO
          case 67109634:
            break;
          default:
            if ((address & 65532) == 2048) {
              data = this.wait.readConfigureWRAM16(address | 0) | 0;
            } else {
              data = this.readUnused16IO(address | 0) | 0;
            }
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readIODispatch32 = function(address) {
        address = address | 0;
        this.wait.singleClock();
        var data = this.readIO32(address | 0) | 0;
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readIODispatch32CPU = function(address) {
        address = address | 0;
        this.IOCore.updateCoreSingle();
        var data = this.readIO32(address | 0) | 0;
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readIO32 = function(address) {
        address = address | 0;
        var data = 0;
        switch (address & -4) {
          //4000000h - DISPCNT - LCD Control (Read/Write)
          //4000002h - Undocumented - Green Swap (R/W)
          case 67108864:
            data = this.gfx.readDISPCNT0() | this.gfx.readDISPCNT1() << 8 | this.gfx.readGreenSwap() << 16;
            break;
          //4000004h - DISPSTAT - General LCD Status (Read/Write)
          //4000006h - VCOUNT - Vertical Counter (Read only)
          case 67108868:
            this.IOCore.updateGraphicsClocking();
            data = this.gfx.readDISPSTAT0() | this.gfx.readDISPSTAT1() << 8 | this.gfx.readVCOUNT() << 16;
            break;
          //4000008h - BG0CNT - BG0 Control (R/W) (BG Modes 0,1 only)
          //400000Ah - BG1CNT - BG1 Control (R/W) (BG Modes 0,1 only)
          case 67108872:
            data = this.gfx.readBG0CNT0() | this.gfx.readBG0CNT1() << 8 | this.gfx.readBG1CNT0() << 16 | this.gfx.readBG1CNT1() << 24;
            break;
          //400000Ch - BG2CNT - BG2 Control (R/W) (BG Modes 0,1,2 only)
          //400000Eh - BG3CNT - BG3 Control (R/W) (BG Modes 0,2 only)
          case 67108876:
            data = this.gfx.readBG2CNT0() | this.gfx.readBG2CNT1() << 8 | this.gfx.readBG3CNT0() << 16 | this.gfx.readBG3CNT1() << 24;
            break;
          //4000010h through 4000047h - WRITE ONLY
          //4000048h - WININ - Control of Inside of Window(s) (R/W)
          //400004Ah- WINOUT - Control of Outside of Windows & Inside of OBJ Window (R/W)
          case 67108936:
            data = this.gfx.readWININ0() | this.gfx.readWININ1() << 8 | this.gfx.readWINOUT0() << 16 | this.gfx.readWINOUT1() << 24;
            break;
          //400004Ch - MOSAIC - Mosaic Size (W)
          //4000050h - BLDCNT - Color Special Effects Selection (R/W)
          //4000052h - BLDALPHA - Alpha Blending Coefficients (R/W)
          case 67108944:
            data = this.gfx.readBLDCNT0() | this.gfx.readBLDCNT1() << 8 | this.gfx.readBLDALPHA0() << 16 | this.gfx.readBLDALPHA1() << 24;
            break;
          //4000054h through 400005Fh - NOT USED - GLITCHED
          //4000060h - SOUND1CNT_L (NR10) - Channel 1 Sweep register (R/W)
          //4000062h - SOUND1CNT_H (NR11, NR12) - Channel 1 Duty/Len/Envelope (R/W)
          case 67108960:
            data = this.sound.readSOUND1CNT_L() | this.sound.readSOUND1CNT_H0() << 16 | this.sound.readSOUND1CNT_H1() << 24;
            break;
          //4000064h - SOUND1CNT_X (NR13, NR14) - Channel 1 Frequency/Control (R/W)
          //4000066h - NOT USED - ZERO
          case 67108964:
            data = this.sound.readSOUND1CNT_X() << 8;
            break;
          //4000068h - SOUND2CNT_L (NR21, NR22) - Channel 2 Duty/Length/Envelope (R/W)
          //400006Ah - NOT USED - ZERO
          case 67108968:
            data = this.sound.readSOUND2CNT_L0() | this.sound.readSOUND2CNT_L1() << 8;
            break;
          //400006Ch - SOUND2CNT_H (NR23, NR24) - Channel 2 Frequency/Control (R/W)
          //400006Eh - NOT USED - ZERO
          case 67108972:
            data = this.sound.readSOUND2CNT_H() << 8;
            break;
          //4000070h - SOUND3CNT_L (NR30) - Channel 3 Stop/Wave RAM select (R/W)
          //4000073h - SOUND3CNT_H (NR31, NR32) - Channel 3 Length/Volume (R/W)
          case 67108976:
            data = this.sound.readSOUND3CNT_L() | this.sound.readSOUND3CNT_H() << 24;
            break;
          //4000074h - SOUND3CNT_X (NR33, NR34) - Channel 3 Frequency/Control (R/W)
          //4000076h - NOT USED - ZERO
          case 67108980:
            data = this.sound.readSOUND3CNT_X() << 8;
            break;
          //4000078h - SOUND4CNT_L (NR41, NR42) - Channel 4 Length/Envelope (R/W)
          //400007Ah - NOT USED - ZERO
          case 67108984:
            data = this.sound.readSOUND4CNT_L() << 8;
            break;
          //400007Ch - SOUND4CNT_H (NR43, NR44) - Channel 4 Frequency/Control (R/W)
          //400007Eh - NOT USED - ZERO
          case 67108988:
            data = this.sound.readSOUND4CNT_H0() | this.sound.readSOUND4CNT_H1() << 8;
            break;
          //4000080h - SOUNDCNT_L (NR50, NR51) - Channel L/R Volume/Enable (R/W)
          //4000082h - SOUNDCNT_H (GBA only) - DMA Sound Control/Mixing (R/W)
          case 67108992:
            data = this.sound.readSOUNDCNT_L0() | this.sound.readSOUNDCNT_L1() << 8 | this.sound.readSOUNDCNT_H0() << 16 | this.sound.readSOUNDCNT_H1() << 24;
            break;
          //4000084h - SOUNDCNT_X (NR52) - Sound on/off (R/W)
          //4000086h - NOT USED - ZERO
          case 67108996:
            this.IOCore.updateTimerClocking();
            data = this.sound.readSOUNDCNT_X() | 0;
            break;
          //4000088h - SOUNDBIAS - Sound PWM Control (R/W, see below)
          //400008Ah - NOT USED - ZERO
          case 67109e3:
            data = this.sound.readSOUNDBIAS0() | this.sound.readSOUNDBIAS1() << 8;
            break;
          //400008Ch - NOT USED - GLITCHED
          //400008Eh - NOT USED - GLITCHED
          //4000090h - WAVE_RAM0_L - Channel 3 Wave Pattern RAM (W/R)
          //4000092h - WAVE_RAM0_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109008:
          //4000094h - WAVE_RAM1_L - Channel 3 Wave Pattern RAM (W/R)
          //4000096h - WAVE_RAM1_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109012:
          //4000098h - WAVE_RAM2_L - Channel 3 Wave Pattern RAM (W/R)
          //400009Ah - WAVE_RAM2_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109016:
          //400009Ch - WAVE_RAM3_L - Channel 3 Wave Pattern RAM (W/R)
          //400009Eh - WAVE_RAM3_H - Channel 3 Wave Pattern RAM (W/R)
          case 67109020:
            this.IOCore.updateTimerClocking();
            data = this.sound.readWAVE32((address | 0) - 67109008 >> 2) | 0;
            break;
          //40000A0h through 40000B9h - WRITE ONLY
          //40000BAh - DMA0CNT_H - DMA 0 Control (R/W)
          case 67109048:
            data = this.dmaChannel0.readDMAControl16() << 16;
            break;
          //40000BCh through 40000C5h - WRITE ONLY
          //40000C6h - DMA1CNT_H - DMA 1 Control (R/W)
          case 67109060:
            data = this.dmaChannel1.readDMAControl16() << 16;
            break;
          //40000C8h through 40000D1h - WRITE ONLY
          //40000D2h - DMA2CNT_H - DMA 2 Control (R/W)
          case 67109072:
            data = this.dmaChannel2.readDMAControl16() << 16;
            break;
          //40000D4h through 40000DDh - WRITE ONLY
          //40000DEh - DMA3CNT_H - DMA 3 Control (R/W)
          case 67109084:
            data = this.dmaChannel3.readDMAControl16() << 16;
            break;
          //40000E0h through 40000FFh - NOT USED - GLITCHED
          //4000100h - TM0CNT_L - Timer 0 Counter/Reload (R/W)
          //4000102h - TM0CNT_H - Timer 0 Control (R/W)
          case 67109120:
            data = this.timer.readTM0CNT32() | 0;
            break;
          //4000104h - TM1CNT_L - Timer 1 Counter/Reload (R/W)
          //4000106h - TM1CNT_H - Timer 1 Control (R/W)
          case 67109124:
            data = this.timer.readTM1CNT32() | 0;
            break;
          //4000108h - TM2CNT_L - Timer 2 Counter/Reload (R/W)
          //400010Ah - TM2CNT_H - Timer 2 Control (R/W)
          case 67109128:
            data = this.timer.readTM2CNT32() | 0;
            break;
          //400010Ch - TM3CNT_L - Timer 3 Counter/Reload (R/W)
          //400010Eh - TM3CNT_H - Timer 3 Control (R/W)
          case 67109132:
            data = this.timer.readTM3CNT32() | 0;
            break;
          //4000110h through 400011Fh - NOT USED - GLITCHED
          //4000120h - Serial Data A (R/W)
          //4000122h - Serial Data B (R/W)
          case 67109136:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_A0() | this.serial.readSIODATA_A1() << 8 | this.serial.readSIODATA_B0() << 16 | this.serial.readSIODATA_B1() << 24;
            break;
          //4000124h - Serial Data C (R/W)
          //4000126h - Serial Data D (R/W)
          case 67109156:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIODATA_C0() | this.serial.readSIODATA_C1() << 8 | this.serial.readSIODATA_D0() << 16 | this.serial.readSIODATA_D1() << 24;
            break;
          //4000128h - SIOCNT - SIO Sub Mode Control (R/W)
          //400012Ah - SIOMLT_SEND - Data Send Register (R/W)
          case 67109160:
            this.IOCore.updateSerialClocking();
            data = this.serial.readSIOCNT0() | this.serial.readSIOCNT1() << 8 | this.serial.readSIODATA8_0() << 16 | this.serial.readSIODATA8_1() << 24;
            break;
          //400012Ch through 400012Fh - NOT USED - GLITCHED
          //4000130h - KEYINPUT - Key Status (R)
          //4000132h - KEYCNT - Key Interrupt Control (R/W)
          case 67109168:
            data = this.joypad.readKeyStatusControl32() | 0;
            break;
          //4000134h - RCNT (R/W) - Mode Selection
          //4000136h - NOT USED - ZERO
          case 67109172:
            this.IOCore.updateSerialClocking();
            data = this.serial.readRCNT0() | this.serial.readRCNT1() << 8;
            break;
          //4000138h through 400013Fh - NOT USED - GLITCHED
          //4000140h - JOYCNT - JOY BUS Control Register (R/W)
          //4000142h - NOT USED - ZERO
          case 67109176:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYCNT() | 0;
            break;
          //4000144h through 400014Fh - NOT USED - GLITCHED
          //4000150h - JoyBus Receive (R/W)
          //4000152h - JoyBus Receive (R/W)
          case 67109188:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_RECV0() | this.serial.readJOYBUS_RECV1() << 8 | this.serial.readJOYBUS_RECV2() << 16 | this.serial.readJOYBUS_RECV3() << 24;
            break;
          //4000154h - JoyBus Send (R/W)
          //4000156h - JoyBus Send (R/W)
          case 67109204:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_SEND0() | this.serial.readJOYBUS_SEND1() << 8 | this.serial.readJOYBUS_SEND2() << 16 | this.serial.readJOYBUS_SEND3() << 24;
            break;
          //4000158h - JoyBus Stat (R/W)
          //400015Ah - NOT USED - ZERO
          case 67109208:
            this.IOCore.updateSerialClocking();
            data = this.serial.readJOYBUS_STAT() | 0;
            break;
          //400015Ch through 40001FFh - NOT USED - GLITCHED
          //4000200h - IE - Interrupt Enable Register (R/W)
          //4000202h - IF - Interrupt Request Flags / IRQ Acknowledge
          case 67109376:
            this.IOCore.updateCoreSpillRetain();
            data = this.irq.readIE0() | this.irq.readIE1() << 8 | this.irq.readIF0() << 16 | this.irq.readIF1() << 24;
            break;
          //4000204h - WAITCNT - Waitstate Control (R/W)
          //4000206h - NOT USED - ZERO
          case 67109380:
            data = this.wait.readWAITCNT0() | this.wait.readWAITCNT1() << 8;
            break;
          //4000208h - IME - Interrupt Master Enable Register (R/W)
          //400020Ah - NOT USED - ZERO
          case 67109384:
            data = this.irq.readIME() | 0;
            break;
          //400020Ch through 40002FFh - NOT USED - GLITCHED
          //4000300h - POSTFLG - BYTE - Undocumented - Post Boot / Debug Control (R/W)
          //4000302h - NOT USED - ZERO
          case 67109632:
            data = this.wait.readPOSTBOOT() | 0;
            break;
          //UNDEFINED / ILLEGAL:
          default:
            if ((address & 65532) == 2048) {
              data = this.wait.readConfigureWRAM32() | 0;
            } else {
              data = this.IOCore.getCurrentFetchValue() | 0;
            }
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readVRAM8Preliminary = function(address) {
        address = address | 0;
        this.IOCore.updateGraphicsClocking();
        var data = 0;
        switch (address >> 24) {
          case 5:
            this.wait.VRAMAccess();
            data = this.gfx.readPalette(address | 0) | 0;
            break;
          case 6:
            this.wait.VRAMAccess();
            data = this.gfx.readVRAM8(address | 0) | 0;
            break;
          default:
            this.wait.OAMAccess();
            data = this.gfx.readOAM(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readVRAM16Preliminary = function(address) {
        address = address | 0;
        this.IOCore.updateGraphicsClocking();
        var data = 0;
        switch (address >> 24) {
          case 5:
            this.wait.VRAMAccess();
            data = this.gfx.readPalette16(address | 0) | 0;
            break;
          case 6:
            this.wait.VRAMAccess();
            data = this.gfx.readVRAM16(address | 0) | 0;
            break;
          default:
            this.wait.OAMAccess();
            data = this.gfx.readOAM16(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readVRAM16CPUPreliminary = function(address) {
        address = address | 0;
        this.IOCore.updateGraphicsClocking();
        var data = 0;
        switch (address >> 24) {
          case 5:
            this.wait.VRAMAccess16CPU();
            data = this.gfx.readPalette16(address | 0) | 0;
            break;
          case 6:
            this.wait.VRAMAccess16CPU();
            data = this.gfx.readVRAM16(address | 0) | 0;
            break;
          default:
            this.wait.OAMAccessCPU();
            data = this.gfx.readOAM16(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readVRAM32Preliminary = function(address) {
        address = address | 0;
        this.IOCore.updateGraphicsClocking();
        var data = 0;
        switch (address >> 24) {
          case 5:
            this.wait.VRAMAccess32();
            data = this.gfx.readPalette32(address | 0) | 0;
            break;
          case 6:
            this.wait.VRAMAccess32();
            data = this.gfx.readVRAM32(address | 0) | 0;
            break;
          default:
            this.wait.OAMAccess();
            data = this.gfx.readOAM32(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readVRAM32CPUPreliminary = function(address) {
        address = address | 0;
        this.IOCore.updateGraphicsClocking();
        var data = 0;
        switch (address >> 24) {
          case 5:
            this.wait.VRAMAccess32CPU();
            data = this.gfx.readPalette32(address | 0) | 0;
            break;
          case 6:
            this.wait.VRAMAccess32CPU();
            data = this.gfx.readVRAM32(address | 0) | 0;
            break;
          default:
            this.wait.OAMAccessCPU();
            data = this.gfx.readOAM32(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM8 = function(address) {
        address = address | 0;
        this.wait.ROMAccess(address | 0);
        return this.cartridge.readROM8(address & 33554431) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM16 = function(address) {
        address = address | 0;
        this.wait.ROMAccess(address | 0);
        return this.cartridge.readROM16(address & 33554430) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM16CPU = function(address) {
        address = address | 0;
        this.wait.ROMAccess16CPU(address | 0);
        return this.cartridge.readROM16(address & 33554430) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM32 = function(address) {
        address = address | 0;
        this.wait.ROMAccess32(address | 0);
        return this.cartridge.readROM32(address & 33554428) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM32CPU = function(address) {
        address = address | 0;
        this.wait.ROMAccess32CPU(address | 0);
        return this.cartridge.readROM32(address & 33554428) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM28 = function(address) {
        address = address | 0;
        this.wait.ROMAccess(address | 0);
        return this.cartridge.readROM8Space2(address & 33554431) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM216 = function(address) {
        address = address | 0;
        this.wait.ROMAccess(address | 0);
        return this.cartridge.readROM16Space2(address & 33554430) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM216CPU = function(address) {
        address = address | 0;
        this.wait.ROMAccess16CPU(address | 0);
        return this.cartridge.readROM16Space2(address & 33554430) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM232 = function(address) {
        address = address | 0;
        this.wait.ROMAccess32(address | 0);
        return this.cartridge.readROM32Space2(address & 33554428) | 0;
      };
      GameBoyAdvanceMemory.prototype.readROM232CPU = function(address) {
        address = address | 0;
        this.wait.ROMAccess32CPU(address | 0);
        return this.cartridge.readROM32Space2(address & 33554428) | 0;
      };
      GameBoyAdvanceMemory.prototype.readSRAM8 = function(address) {
        address = address | 0;
        this.wait.SRAMAccess();
        return this.saves.readSRAM(address & 65535) | 0;
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceMemory.prototype.readSRAM16 = function(address) {
          address = address | 0;
          this.wait.SRAMAccess();
          return Math.imul(this.saves.readSRAM(address & 65534) | 0, 257) | 0;
        };
        GameBoyAdvanceMemory.prototype.readSRAM16CPU = function(address) {
          address = address | 0;
          this.wait.SRAMAccessCPU();
          return Math.imul(this.saves.readSRAM(address & 65534) | 0, 257) | 0;
        };
        GameBoyAdvanceMemory.prototype.readSRAM32 = function(address) {
          address = address | 0;
          this.wait.SRAMAccess();
          return Math.imul(this.saves.readSRAM(address & 65532) | 0, 16843009) | 0;
        };
        GameBoyAdvanceMemory.prototype.readSRAM32CPU = function(address) {
          address = address | 0;
          this.wait.SRAMAccessCPU();
          return Math.imul(this.saves.readSRAM(address & 65532) | 0, 16843009) | 0;
        };
      } else {
        GameBoyAdvanceMemory.prototype.readSRAM16 = function(address) {
          address = address | 0;
          this.wait.SRAMAccess();
          return (this.saves.readSRAM(address & 65534) | 0) * 257 | 0;
        };
        GameBoyAdvanceMemory.prototype.readSRAM16CPU = function(address) {
          address = address | 0;
          this.wait.SRAMAccessCPU();
          return (this.saves.readSRAM(address & 65534) | 0) * 257 | 0;
        };
        GameBoyAdvanceMemory.prototype.readSRAM32 = function(address) {
          address = address | 0;
          this.wait.SRAMAccess();
          return (this.saves.readSRAM(address & 65532) | 0) * 16843009 | 0;
        };
        GameBoyAdvanceMemory.prototype.readSRAM32CPU = function(address) {
          address = address | 0;
          this.wait.SRAMAccessCPU();
          return (this.saves.readSRAM(address & 65532) | 0) * 16843009 | 0;
        };
      }
      GameBoyAdvanceMemory.prototype.readUnused8 = function(address) {
        address = address | 0;
        this.wait.singleClock();
        return this.IOCore.getCurrentFetchValue() >> ((address & 3) << 3) & 255;
      };
      GameBoyAdvanceMemory.prototype.readUnused8IO = function(address) {
        address = address | 0;
        return this.IOCore.getCurrentFetchValue() >> ((address & 3) << 3) & 255;
      };
      GameBoyAdvanceMemory.prototype.readUnused16 = function(address) {
        address = address | 0;
        this.wait.singleClock();
        return this.IOCore.getCurrentFetchValue() >> ((address & 2) << 3) & 65535;
      };
      GameBoyAdvanceMemory.prototype.readUnused16IO = function(address) {
        address = address | 0;
        return this.IOCore.getCurrentFetchValue() >> ((address & 2) << 3) & 65535;
      };
      GameBoyAdvanceMemory.prototype.readUnused16CPU = function(address) {
        address = address | 0;
        this.IOCore.updateCoreSingle();
        return this.cpu.getCurrentFetchValue() >> ((address & 2) << 3) & 65535;
      };
      GameBoyAdvanceMemory.prototype.readUnused32 = function() {
        this.wait.singleClock();
        return this.IOCore.getCurrentFetchValue() | 0;
      };
      GameBoyAdvanceMemory.prototype.readUnused32CPU = function() {
        this.IOCore.updateCoreSingle();
        return this.cpu.getCurrentFetchValue() | 0;
      };
      GameBoyAdvanceMemory.prototype.loadBIOS = function() {
        if ((this.IOCore.BIOS.length | 0) == 16384) {
          this.IOCore.BIOSFound = true;
          for (var index = 0; (index | 0) < 16384; index = (index | 0) + 1 | 0) {
            this.BIOS[index & 16383] = this.IOCore.BIOS[index & 16383] & 255;
          }
        } else {
          this.IOCore.BIOSFound = false;
          throw new Error("BIOS invalid.");
        }
      };
      function generateMemoryTopLevelDispatch() {
        function compileMemoryReadDispatch(readUnused, readExternalWRAM, readInternalWRAM, readIODispatch, readVRAM, readROM, readROM2, readSRAM, readBIOS) {
          var code = "address = address | 0;var data = 0;switch (address >> 24) {";
          code += "case 0:{data = this." + readBIOS + "(address | 0) | 0;break};";
          if (readExternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x2:";
            if (readExternalWRAM.slice(0, 12) != "readInternal") {
              code += "{data = this." + readExternalWRAM + "(address | 0) | 0;break};";
            }
          }
          if (readInternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x3:{data = this." + readInternalWRAM + "(address | 0) | 0;break};";
          }
          code += "case 0x4:{data = this." + readIODispatch + "(address | 0) | 0;break};";
          code += "case 0x5:";
          code += "case 0x6:";
          code += "case 0x7:{data = this." + readVRAM + "(address | 0) | 0;break};";
          code += "case 0x8:";
          code += "case 0x9:";
          code += "case 0xA:";
          code += "case 0xB:{data = this." + readROM + "(address | 0) | 0;break};";
          code += "case 0xC:";
          code += "case 0xD:{data = this." + readROM2 + "(address | 0) | 0;break};";
          code += "case 0xE:";
          code += "case 0xF:{data = this." + readSRAM + "(address | 0) | 0;break};";
          code += "default:{data = this." + readUnused + "(" + (readUnused.slice(0, 12) == "readUnused32" ? "" : "address | 0") + ") | 0};";
          code += "}return data | 0;";
          return Function("address", code);
        }
        function compileMemoryDMAReadDispatch(readUnused, readExternalWRAM, readInternalWRAM, readIODispatch, readVRAM, readBIOS) {
          var code = "address = address | 0;var data = 0;switch (address >> 24) {";
          code += "case 0:{data = this." + readBIOS + "(address | 0) | 0;break};";
          if (readExternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x2:";
            if (readExternalWRAM.slice(0, 12) != "readInternal") {
              code += "{data = this." + readExternalWRAM + "(address | 0) | 0;break};";
            }
          }
          if (readInternalWRAM.slice(0, 10) != "readUnused") {
            code += "case 0x3:{data = this." + readInternalWRAM + "(address | 0) | 0;break};";
          }
          code += "case 0x4:{data = this." + readIODispatch + "(address | 0) | 0;break};";
          code += "case 0x5:";
          code += "case 0x6:";
          code += "case 0x7:{data = this." + readVRAM + "(address | 0) | 0;break};";
          code += "default:{data = this." + readUnused + "(" + (readUnused.slice(0, 12) == "readUnused32" ? "" : "address | 0") + ") | 0};";
          code += "}return data | 0;";
          return Function("address", code);
        }
        function compileMemoryWriteDispatch(writeUnused, writeExternalWRAM, writeInternalWRAM, writeIODispatch, writeVRAM, writeROM, writeSRAM) {
          var code = "address = address | 0;data = data | 0;switch (address >> 24) {";
          if (writeExternalWRAM != "writeUnused") {
            code += "case 0x2:";
            if (writeExternalWRAM.slice(0, 13) != "writeInternal") {
              code += "{this." + writeExternalWRAM + "(address | 0, data | 0);break};";
            }
          }
          if (writeInternalWRAM != "writeUnused") {
            code += "case 0x3:{this." + writeInternalWRAM + "(address | 0, data | 0);break};";
          }
          code += "case 0x4:{this." + writeIODispatch + "(address | 0, data | 0);break};";
          code += "case 0x5:";
          code += "case 0x6:";
          code += "case 0x7:{this." + writeVRAM + "(address | 0, data | 0);break};";
          code += "case 0x8:";
          code += "case 0x9:";
          code += "case 0xA:";
          code += "case 0xB:";
          code += "case 0xC:";
          code += "case 0xD:{this." + writeROM + "(address | 0, data | 0);break};";
          code += "case 0xE:";
          code += "case 0xF:{this." + writeSRAM + "(address | 0, data | 0);break};";
          code += "default:{this." + writeUnused + "()}";
          code += "}";
          return Function("address", "data", code);
        }
        function compileMemoryWriteDispatch2(writeUnused, writeExternalWRAM, writeInternalWRAM, writeIODispatch, writePalette, writeVRAM, writeOAM, writeROM, writeSRAM) {
          var code = "address = address | 0;data = data | 0;switch (address >> 24) {";
          if (writeExternalWRAM != "writeUnused") {
            code += "case 0x2:";
            if (writeExternalWRAM.slice(0, 13) != "writeInternal") {
              code += "{this." + writeExternalWRAM + "(address | 0, data | 0);break};";
            }
          }
          if (writeInternalWRAM != "writeUnused") {
            code += "case 0x3:{this." + writeInternalWRAM + "(address | 0, data | 0);break};";
          }
          code += "case 0x4:{this." + writeIODispatch + "(address | 0, data | 0);break};";
          code += "case 0x5:{this." + writePalette + "(address | 0, data | 0);break};";
          code += "case 0x6:{this." + writeVRAM + "(address | 0, data | 0);break};";
          code += "case 0x7:{this." + writeOAM + "(address | 0, data | 0);break};";
          code += "case 0x8:";
          code += "case 0x9:";
          code += "case 0xA:";
          code += "case 0xB:";
          code += "case 0xC:";
          code += "case 0xD:{this." + writeROM + "(address | 0, data | 0);break};";
          code += "case 0xE:";
          code += "case 0xF:{this." + writeSRAM + "(address | 0, data | 0);break};";
          code += "default:{this." + writeUnused + "()}";
          code += "}";
          return Function("address", "data", code);
        }
        function compileMemoryDMAWriteDispatch(writeUnused, writeExternalWRAM, writeInternalWRAM, writeIODispatch, writePalette, writeVRAM, writeOAM) {
          var code = "address = address | 0;data = data | 0;switch (address >> 24) {";
          if (writeExternalWRAM != "writeUnused") {
            code += "case 0x2:";
            if (writeExternalWRAM.slice(0, 13) != "writeInternal") {
              code += "{this." + writeExternalWRAM + "(address | 0, data | 0);break};";
            }
          }
          if (writeInternalWRAM != "writeUnused") {
            code += "case 0x3:{this." + writeInternalWRAM + "(address | 0, data | 0);break};";
          }
          code += "case 0x4:{this." + writeIODispatch + "(address | 0, data | 0);break};";
          code += "case 0x5:{this." + writePalette + "(address | 0, data | 0);break};";
          code += "case 0x6:{this." + writeVRAM + "(address | 0, data | 0);break};";
          code += "case 0x7:{this." + writeOAM + "(address | 0, data | 0);break};";
          code += "default:{this." + writeUnused + "()}";
          code += "}";
          return Function("address", "data", code);
        }
        GameBoyAdvanceMemory.prototype.memoryRead8Generated = [
          compileMemoryReadDispatch(
            "readUnused8",
            "readInternalWRAM8",
            "readInternalWRAM8",
            "readIODispatch8",
            "readVRAM8Preliminary",
            "readROM8",
            "readROM28",
            "readSRAM8",
            "readBIOS8"
          ),
          compileMemoryReadDispatch(
            "readUnused8",
            "readExternalWRAM8",
            "readInternalWRAM8",
            "readIODispatch8",
            "readVRAM8Preliminary",
            "readROM8",
            "readROM28",
            "readSRAM8",
            "readBIOS8"
          ),
          compileMemoryReadDispatch(
            "readUnused8",
            "readUnused8",
            "readUnused8",
            "readIODispatch8",
            "readVRAM8Preliminary",
            "readROM8",
            "readROM28",
            "readSRAM8",
            "readBIOS8"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryWrite8Generated = [
          compileMemoryWriteDispatch(
            "writeUnused",
            "writeInternalWRAM8",
            "writeInternalWRAM8",
            "writeIODispatch8",
            "writeVRAM8Preliminary",
            "writeROM8",
            "writeSRAM8"
          ),
          compileMemoryWriteDispatch(
            "writeUnused",
            "writeExternalWRAM8",
            "writeInternalWRAM8",
            "writeIODispatch8",
            "writeVRAM8Preliminary",
            "writeROM8",
            "writeSRAM8"
          ),
          compileMemoryWriteDispatch(
            "writeUnused",
            "writeUnused",
            "writeUnused",
            "writeIODispatch8",
            "writeVRAM8Preliminary",
            "writeROM8",
            "writeSRAM8"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryRead16Generated = [
          compileMemoryReadDispatch(
            "readUnused16",
            "readInternalWRAM16",
            "readInternalWRAM16",
            "readIODispatch16",
            "readVRAM16Preliminary",
            "readROM16",
            "readROM216",
            "readSRAM16",
            "readBIOS16"
          ),
          compileMemoryReadDispatch(
            "readUnused16",
            "readExternalWRAM16",
            "readInternalWRAM16",
            "readIODispatch16",
            "readVRAM16Preliminary",
            "readROM16",
            "readROM216",
            "readSRAM16",
            "readBIOS16"
          ),
          compileMemoryReadDispatch(
            "readUnused16",
            "readUnused16",
            "readUnused16",
            "readIODispatch16",
            "readVRAM16Preliminary",
            "readROM16",
            "readROM216",
            "readSRAM16",
            "readBIOS16"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryReadDMA16Generated = [
          compileMemoryDMAReadDispatch(
            "readUnused16",
            "readInternalWRAM16",
            "readInternalWRAM16",
            "readIODispatch16",
            "readVRAM16Preliminary",
            "readBIOS16"
          ),
          compileMemoryDMAReadDispatch(
            "readUnused16",
            "readExternalWRAM16",
            "readInternalWRAM16",
            "readIODispatch16",
            "readVRAM16Preliminary",
            "readBIOS16"
          ),
          compileMemoryDMAReadDispatch(
            "readUnused16",
            "readUnused16",
            "readUnused16",
            "readIODispatch16",
            "readVRAM16Preliminary",
            "readBIOS16"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryReadCPU16Generated = [
          compileMemoryReadDispatch(
            "readUnused16CPU",
            "readInternalWRAM16CPU",
            "readInternalWRAM16CPU",
            "readIODispatch16CPU",
            "readVRAM16CPUPreliminary",
            "readROM16CPU",
            "readROM216CPU",
            "readSRAM16CPU",
            "readBIOS16CPU"
          ),
          compileMemoryReadDispatch(
            "readUnused16CPU",
            "readExternalWRAM16CPU",
            "readInternalWRAM16CPU",
            "readIODispatch16CPU",
            "readVRAM16CPUPreliminary",
            "readROM16CPU",
            "readROM216CPU",
            "readSRAM16CPU",
            "readBIOS16CPU"
          ),
          compileMemoryReadDispatch(
            "readUnused16CPU",
            "readUnused16CPU",
            "readUnused16CPU",
            "readIODispatch16CPU",
            "readVRAM16CPUPreliminary",
            "readROM16CPU",
            "readROM216CPU",
            "readSRAM16CPU",
            "readBIOS16CPU"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryWrite16Generated = [
          compileMemoryWriteDispatch2(
            "writeUnused",
            "writeInternalWRAM16",
            "writeInternalWRAM16",
            "writeIODispatch16",
            "writePalette16",
            "writeVRAM16",
            "writeOBJ16",
            "writeROM16",
            "writeSRAM16"
          ),
          compileMemoryWriteDispatch2(
            "writeUnused",
            "writeExternalWRAM16",
            "writeInternalWRAM16",
            "writeIODispatch16",
            "writePalette16",
            "writeVRAM16",
            "writeOBJ16",
            "writeROM16",
            "writeSRAM16"
          ),
          compileMemoryWriteDispatch2(
            "writeUnused",
            "writeUnused",
            "writeUnused",
            "writeIODispatch16",
            "writePalette16",
            "writeVRAM16",
            "writeOBJ16",
            "writeROM16",
            "writeSRAM16"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryWriteDMA16Generated = [
          compileMemoryDMAWriteDispatch(
            "writeUnused",
            "writeInternalWRAM16",
            "writeInternalWRAM16",
            "writeIODispatch16",
            "writePalette16",
            "writeVRAM16",
            "writeOBJ16"
          ),
          compileMemoryDMAWriteDispatch(
            "writeUnused",
            "writeExternalWRAM16",
            "writeInternalWRAM16",
            "writeIODispatch16",
            "writePalette16",
            "writeVRAM16",
            "writeOBJ16"
          ),
          compileMemoryDMAWriteDispatch(
            "writeUnused",
            "writeUnused",
            "writeUnused",
            "writeIODispatch16",
            "writePalette16",
            "writeVRAM16",
            "writeOBJ16"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryRead32Generated = [
          compileMemoryReadDispatch(
            "readUnused32",
            "readInternalWRAM32",
            "readInternalWRAM32",
            "readIODispatch32",
            "readVRAM32Preliminary",
            "readROM32",
            "readROM232",
            "readSRAM32",
            "readBIOS32"
          ),
          compileMemoryReadDispatch(
            "readUnused32",
            "readExternalWRAM32",
            "readInternalWRAM32",
            "readIODispatch32",
            "readVRAM32Preliminary",
            "readROM32",
            "readROM232",
            "readSRAM32",
            "readBIOS32"
          ),
          compileMemoryReadDispatch(
            "readUnused32",
            "readUnused32",
            "readUnused32",
            "readIODispatch32",
            "readVRAM32Preliminary",
            "readROM32",
            "readROM232",
            "readSRAM32",
            "readBIOS32"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryReadDMA32Generated = [
          compileMemoryDMAReadDispatch(
            "readUnused32",
            "readInternalWRAM32",
            "readInternalWRAM32",
            "readIODispatch32",
            "readVRAM32Preliminary",
            "readBIOS32"
          ),
          compileMemoryDMAReadDispatch(
            "readUnused32",
            "readExternalWRAM32",
            "readInternalWRAM32",
            "readIODispatch32",
            "readVRAM32Preliminary",
            "readBIOS32"
          ),
          compileMemoryDMAReadDispatch(
            "readUnused32",
            "readUnused32",
            "readUnused32",
            "readIODispatch32",
            "readVRAM32Preliminary",
            "readBIOS32"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryReadCPU32Generated = [
          compileMemoryReadDispatch(
            "readUnused32CPU",
            "readInternalWRAM32CPU",
            "readInternalWRAM32CPU",
            "readIODispatch32CPU",
            "readVRAM32CPUPreliminary",
            "readROM32CPU",
            "readROM232CPU",
            "readSRAM32CPU",
            "readBIOS32CPU"
          ),
          compileMemoryReadDispatch(
            "readUnused32CPU",
            "readExternalWRAM32CPU",
            "readInternalWRAM32CPU",
            "readIODispatch32CPU",
            "readVRAM32CPUPreliminary",
            "readROM32CPU",
            "readROM232CPU",
            "readSRAM32CPU",
            "readBIOS32CPU"
          ),
          compileMemoryReadDispatch(
            "readUnused32CPU",
            "readUnused32CPU",
            "readUnused32CPU",
            "readIODispatch32CPU",
            "readVRAM32CPUPreliminary",
            "readROM32CPU",
            "readROM232CPU",
            "readSRAM32CPU",
            "readBIOS32CPU"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryWrite32Generated = [
          compileMemoryWriteDispatch2(
            "writeUnused",
            "writeInternalWRAM32",
            "writeInternalWRAM32",
            "writeIODispatch32",
            "writePalette32",
            "writeVRAM32",
            "writeOBJ32",
            "writeROM32",
            "writeSRAM32"
          ),
          compileMemoryWriteDispatch2(
            "writeUnused",
            "writeExternalWRAM32",
            "writeInternalWRAM32",
            "writeIODispatch32",
            "writePalette32",
            "writeVRAM32",
            "writeOBJ32",
            "writeROM32",
            "writeSRAM32"
          ),
          compileMemoryWriteDispatch2(
            "writeUnused",
            "writeUnused",
            "writeUnused",
            "writeIODispatch32",
            "writePalette32",
            "writeVRAM32",
            "writeOBJ32",
            "writeROM32",
            "writeSRAM32"
          )
        ];
        GameBoyAdvanceMemory.prototype.memoryWriteDMA32Generated = [
          compileMemoryDMAWriteDispatch(
            "writeUnused",
            "writeInternalWRAM32",
            "writeInternalWRAM32",
            "writeIODispatch32",
            "writePalette32",
            "writeVRAM32",
            "writeOBJ32"
          ),
          compileMemoryDMAWriteDispatch(
            "writeUnused",
            "writeExternalWRAM32",
            "writeInternalWRAM32",
            "writeIODispatch32",
            "writePalette32",
            "writeVRAM32",
            "writeOBJ32"
          ),
          compileMemoryDMAWriteDispatch(
            "writeUnused",
            "writeUnused",
            "writeUnused",
            "writeIODispatch32",
            "writePalette32",
            "writeVRAM32",
            "writeOBJ32"
          )
        ];
      }
      generateMemoryTopLevelDispatch();
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceDMACore.js
  var require_GameBoyAdvanceDMACore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceDMACore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceDMA;
      function GameBoyAdvanceDMA(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceDMA.prototype.initialize = function() {
        this.dmaChannel0 = this.IOCore.dmaChannel0;
        this.dmaChannel1 = this.IOCore.dmaChannel1;
        this.dmaChannel2 = this.IOCore.dmaChannel2;
        this.dmaChannel3 = this.IOCore.dmaChannel3;
        this.currentMatch = -1;
        this.fetch = 0;
      };
      GameBoyAdvanceDMA.prototype.getCurrentFetchValue = function() {
        return this.fetch | 0;
      };
      GameBoyAdvanceDMA.prototype.gfxHBlankRequest = function() {
        this.requestDMA(4);
      };
      GameBoyAdvanceDMA.prototype.gfxVBlankRequest = function() {
        this.requestDMA(2);
      };
      GameBoyAdvanceDMA.prototype.requestDMA = function(DMAType) {
        DMAType = DMAType | 0;
        this.dmaChannel0.requestDMA(DMAType | 0);
        this.dmaChannel1.requestDMA(DMAType | 0);
        this.dmaChannel2.requestDMA(DMAType | 0);
        this.dmaChannel3.requestDMA(DMAType | 0);
      };
      GameBoyAdvanceDMA.prototype.findLowestDMA = function() {
        if ((this.dmaChannel0.getMatchStatus() | 0) != 0) {
          return 0;
        }
        if ((this.dmaChannel1.getMatchStatus() | 0) != 0) {
          return 1;
        }
        if ((this.dmaChannel2.getMatchStatus() | 0) != 0) {
          return 2;
        }
        if ((this.dmaChannel3.getMatchStatus() | 0) != 0) {
          return 3;
        }
        return 4;
      };
      GameBoyAdvanceDMA.prototype.update = function() {
        var lowestDMAFound = this.findLowestDMA();
        if ((lowestDMAFound | 0) < 4) {
          if ((this.currentMatch | 0) == -1) {
            this.IOCore.flagDMA();
          }
          if ((this.currentMatch | 0) != (lowestDMAFound | 0)) {
            this.IOCore.wait.NonSequentialBroadcast();
            this.currentMatch = lowestDMAFound | 0;
          }
        } else if ((this.currentMatch | 0) != -1) {
          this.currentMatch = -1;
          this.IOCore.deflagDMA();
          this.IOCore.updateCoreSpill();
        }
      };
      GameBoyAdvanceDMA.prototype.perform = function() {
        switch (this.currentMatch | 0) {
          case 0:
            this.dmaChannel0.handleDMACopy();
            break;
          case 1:
            this.dmaChannel1.handleDMACopy();
            break;
          case 2:
            this.dmaChannel2.handleDMACopy();
            break;
          default:
            this.dmaChannel3.handleDMACopy();
        }
      };
      GameBoyAdvanceDMA.prototype.updateFetch = function(data) {
        data = data | 0;
        this.fetch = data | 0;
      };
      GameBoyAdvanceDMA.prototype.nextEventTime = function() {
        var clocks = this.dmaChannel0.nextEventTime() | 0;
        var workbench = this.dmaChannel1.nextEventTime() | 0;
        if ((clocks | 0) >= 0) {
          if ((workbench | 0) >= 0) {
            clocks = Math.min(clocks | 0, workbench | 0) | 0;
          }
        } else {
          clocks = workbench | 0;
        }
        workbench = this.dmaChannel2.nextEventTime() | 0;
        if ((clocks | 0) >= 0) {
          if ((workbench | 0) >= 0) {
            clocks = Math.min(clocks | 0, workbench | 0) | 0;
          }
        } else {
          clocks = workbench | 0;
        }
        workbench = this.dmaChannel3.nextEventTime() | 0;
        if ((clocks | 0) >= 0) {
          if ((workbench | 0) >= 0) {
            clocks = Math.min(clocks | 0, workbench | 0) | 0;
          }
        } else {
          clocks = workbench | 0;
        }
        return clocks | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceAffineBGRendererCore.js
  var require_GameBoyAdvanceAffineBGRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceAffineBGRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceAffineBGRenderer;
      var getInt32Array = require_TypedArrayShim().getInt32Array;
      function GameBoyAdvanceAffineBGRenderer(gfx, BGLayer) {
        this.gfx = gfx;
        this.BGLayer = BGLayer;
        this.initialize();
      }
      GameBoyAdvanceAffineBGRenderer.prototype.initialize = function() {
        this.scratchBuffer = getInt32Array(240);
        this.BGdx = 256;
        this.BGdmx = 0;
        this.BGdy = 0;
        this.BGdmy = 256;
        this.actualBGdx = 256;
        this.actualBGdmx = 0;
        this.actualBGdy = 0;
        this.actualBGdmy = 256;
        this.BGReferenceX = 0;
        this.BGReferenceY = 0;
        this.actualBGReferenceX = 0;
        this.actualBGReferenceY = 0;
        this.pb = 0;
        this.pd = 0;
        this.priorityPreprocess();
        this.offsetReferenceCounters();
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceAffineBGRenderer.prototype.renderScanLine = function(line, BGObject) {
          line = line | 0;
          var x = this.pb | 0;
          var y = this.pd | 0;
          if (this.gfx.BGMosaic[this.BGLayer & 3]) {
            var mosaicY = this.gfx.mosaicRenderer.getMosaicYOffset(line | 0) | 0;
            x = (x | 0) - Math.imul(this.actualBGdmx | 0, mosaicY | 0) | 0;
            y = (y | 0) - Math.imul(this.actualBGdmy | 0, mosaicY | 0) | 0;
          }
          for (var position = 0; (position | 0) < 240; position = (position | 0) + 1 | 0, x = (x | 0) + (this.actualBGdx | 0) | 0, y = (y | 0) + (this.actualBGdy | 0) | 0) {
            this.scratchBuffer[position | 0] = this.priorityFlag | BGObject.fetchPixel(x >> 8, y >> 8);
          }
          if (this.gfx.BGMosaic[this.BGLayer & 3]) {
            this.gfx.mosaicRenderer.renderMosaicHorizontal(this.scratchBuffer);
          }
          return this.scratchBuffer;
        };
        GameBoyAdvanceAffineBGRenderer.prototype.offsetReferenceCounters = function() {
          var end = this.gfx.lastUnrenderedLine | 0;
          this.pb = Math.imul((this.pb | 0) + (this.actualBGdmx | 0) | 0, end | 0) | 0;
          this.pd = Math.imul((this.pd | 0) + (this.actualBGdmy | 0) | 0, end | 0) | 0;
        };
      } else {
        GameBoyAdvanceAffineBGRenderer.prototype.renderScanLine = function(line, BGObject) {
          var x = this.pb;
          var y = this.pd;
          if (this.gfx.BGMosaic[this.BGLayer & 3]) {
            var mosaicY = this.gfx.mosaicRenderer.getMosaicYOffset(line | 0);
            x -= this.actualBGdmx * mosaicY;
            y -= this.actualBGdmy * mosaicY;
          }
          for (var position = 0; position < 240; ++position, x += this.actualBGdx, y += this.actualBGdy) {
            this.scratchBuffer[position] = this.priorityFlag | BGObject.fetchPixel(x >> 8, y >> 8);
          }
          if (this.gfx.BGMosaic[this.BGLayer & 3]) {
            this.gfx.mosaicRenderer.renderMosaicHorizontal(this.scratchBuffer);
          }
          return this.scratchBuffer;
        };
        GameBoyAdvanceAffineBGRenderer.prototype.offsetReferenceCounters = function() {
          var end = this.gfx.lastUnrenderedLine | 0;
          this.pb = ((this.pb | 0) + (this.actualBGdmx | 0)) * (end | 0) | 0;
          this.pd = ((this.pd | 0) + (this.actualBGdmy | 0)) * (end | 0) | 0;
        };
      }
      GameBoyAdvanceAffineBGRenderer.prototype.incrementReferenceCounters = function() {
        this.pb = (this.pb | 0) + (this.actualBGdmx | 0) | 0;
        this.pd = (this.pd | 0) + (this.actualBGdmy | 0) | 0;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.resetReferenceCounters = function() {
        this.pb = this.actualBGReferenceX | 0;
        this.pd = this.actualBGReferenceY | 0;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.priorityPreprocess = function() {
        this.priorityFlag = this.gfx.BGPriority[this.BGLayer] << 23 | 1 << this.BGLayer + 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGPA0 = function(data) {
        data = data | 0;
        this.BGdx = this.BGdx & 65280 | data;
        this.actualBGdx = this.BGdx << 16 >> 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGPA1 = function(data) {
        data = data | 0;
        this.BGdx = data << 8 | this.BGdx & 255;
        this.actualBGdx = this.BGdx << 16 >> 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGPB0 = function(data) {
        data = data | 0;
        this.BGdmx = this.BGdmx & 65280 | data;
        this.actualBGdmx = this.BGdmx << 16 >> 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGPB1 = function(data) {
        data = data | 0;
        this.BGdmx = data << 8 | this.BGdmx & 255;
        this.actualBGdmx = this.BGdmx << 16 >> 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGPC0 = function(data) {
        data = data | 0;
        this.BGdy = this.BGdy & 65280 | data;
        this.actualBGdy = this.BGdy << 16 >> 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGPC1 = function(data) {
        data = data | 0;
        this.BGdy = data << 8 | this.BGdy & 255;
        this.actualBGdy = this.BGdy << 16 >> 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGPD0 = function(data) {
        data = data | 0;
        this.BGdmy = this.BGdmy & 65280 | data;
        this.actualBGdmy = this.BGdmy << 16 >> 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGPD1 = function(data) {
        data = data | 0;
        this.BGdmy = data << 8 | this.BGdmy & 255;
        this.actualBGdmy = this.BGdmy << 16 >> 16;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGX_L0 = function(data) {
        data = data | 0;
        this.BGReferenceX = this.BGReferenceX & 268435200 | data;
        this.actualBGReferenceX = this.BGReferenceX << 4 >> 4;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGX_L1 = function(data) {
        data = data | 0;
        this.BGReferenceX = data << 8 | this.BGReferenceX & 268370175;
        this.actualBGReferenceX = this.BGReferenceX << 4 >> 4;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGX_H0 = function(data) {
        data = data | 0;
        this.BGReferenceX = data << 16 | this.BGReferenceX & 251723775;
        this.actualBGReferenceX = this.BGReferenceX << 4 >> 4;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGX_H1 = function(data) {
        data = data | 0;
        this.BGReferenceX = (data & 15) << 24 | this.BGReferenceX & 16777215;
        this.actualBGReferenceX = this.BGReferenceX << 4 >> 4;
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGY_L0 = function(data) {
        data = data | 0;
        this.BGReferenceY = this.BGReferenceY & 268435200 | data;
        this.actualBGReferenceY = this.BGReferenceY << 4 >> 4;
        this.resetReferenceCounters();
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGY_L1 = function(data) {
        data = data | 0;
        this.BGReferenceY = data << 8 | this.BGReferenceY & 268370175;
        this.actualBGReferenceY = this.BGReferenceY << 4 >> 4;
        this.resetReferenceCounters();
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGY_H0 = function(data) {
        data = data | 0;
        this.BGReferenceY = data << 16 | this.BGReferenceY & 251723775;
        this.actualBGReferenceY = this.BGReferenceY << 4 >> 4;
        this.resetReferenceCounters();
      };
      GameBoyAdvanceAffineBGRenderer.prototype.writeBGY_H1 = function(data) {
        data = data | 0;
        this.BGReferenceY = (data & 15) << 24 | this.BGReferenceY & 16777215;
        this.actualBGReferenceY = this.BGReferenceY << 4 >> 4;
        this.resetReferenceCounters();
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceBG2FrameBufferRendererCore.js
  var require_GameBoyAdvanceBG2FrameBufferRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceBG2FrameBufferRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceBG2FrameBufferRenderer;
      var IS_LITTLE_ENDIAN = require_TypedArrayShim().IS_LITTLE_ENDIAN;
      function GameBoyAdvanceBG2FrameBufferRenderer(gfx) {
        this.gfx = gfx;
        this.palette = this.gfx.palette256;
        this.VRAM = this.gfx.VRAM;
        this.VRAM16 = this.gfx.VRAM16;
        this.fetchPixel = this.fetchMode3Pixel;
        this.bgAffineRenderer = this.gfx.bgAffineRenderer[0];
        this.frameSelect = 0;
      }
      GameBoyAdvanceBG2FrameBufferRenderer.prototype.selectMode = function(mode) {
        mode = mode | 0;
        switch (mode | 0) {
          case 3:
            this.fetchPixel = this.fetchMode3Pixel;
            break;
          case 4:
            this.fetchPixel = this.fetchMode4Pixel;
            break;
          case 5:
            this.fetchPixel = this.fetchMode5Pixel;
        }
      };
      GameBoyAdvanceBG2FrameBufferRenderer.prototype.renderScanLine = function(line) {
        line = line | 0;
        return this.bgAffineRenderer.renderScanLine(line | 0, this);
      };
      if (IS_LITTLE_ENDIAN) {
        if (typeof Math.imul == "function") {
          GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode3Pixel = function(x, y) {
            x = x | 0;
            y = y | 0;
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 240 && (y | 0) < 160) {
              var address = Math.imul(y | 0, 240) + (x | 0) | 0;
              return this.VRAM16[address & 65535] & 32767;
            }
            return 58720256;
          };
          GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode5Pixel = function(x, y) {
            x = x | 0;
            y = y | 0;
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 160 && (y | 0) < 128) {
              var address = (this.frameSelect | 0) + Math.imul(y | 0, 160) + (x | 0) | 0;
              return this.VRAM16[address & 65535] & 32767;
            }
            return 58720256;
          };
        } else {
          GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode3Pixel = function(x, y) {
            x = x | 0;
            y = y | 0;
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 240 && (y | 0) < 160) {
              var address = (y * 240 | 0) + (x | 0) | 0;
              return this.VRAM16[address & 65535] & 32767;
            }
            return 58720256;
          };
          GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode5Pixel = function(x, y) {
            x = x | 0;
            y = y | 0;
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 160 && (y | 0) < 128) {
              var address = (this.frameSelect | 0) + (y * 160 | 0) + (x | 0) | 0;
              return this.VRAM16[address & 65535] & 32767;
            }
            return 58720256;
          };
        }
      } else {
        if (typeof Math.imul == "function") {
          GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode3Pixel = function(x, y) {
            x = x | 0;
            y = y | 0;
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 240 && (y | 0) < 160) {
              var address = Math.imul(y | 0, 240) + (x | 0) << 1;
              return (this.VRAM[address | 1] << 8 | this.VRAM[address | 0]) & 32767;
            }
            return 58720256;
          };
          GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode5Pixel = function(x, y) {
            x = x | 0;
            y = y | 0;
            if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 160 && (y | 0) < 128) {
              var address = (this.frameSelect | 0) + (Math.imul(y | 0, 160) + (x | 0) << 1) | 0;
              return (this.VRAM[address | 1] << 8 | this.VRAM[address | 0]) & 32767;
            }
            return 58720256;
          };
        } else {
          GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode3Pixel = function(x, y) {
            if (x > -1 && y > -1 && x < 240 && y < 160) {
              var address = y * 240 + x << 1;
              return (this.VRAM[address | 1] << 8 | this.VRAM[address]) & 32767;
            }
            return 58720256;
          };
          GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode5Pixel = function(x, y) {
            if (x > -1 && y > -1 && x < 160 && y < 128) {
              var address = this.frameSelect + (y * 160 + x << 1);
              return (this.VRAM[address | 1] << 8 | this.VRAM[address]) & 32767;
            }
            return 58720256;
          };
        }
      }
      if (typeof Math.imul == "function") {
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode4Pixel = function(x, y) {
          x = x | 0;
          y = y | 0;
          if ((x | 0) > -1 && (y | 0) > -1 && (x | 0) < 240 && (y | 0) < 160) {
            var address = (this.frameSelect | 0) + (Math.imul(y | 0, 240) | 0) + (x | 0) | 0;
            return this.palette[this.VRAM[address | 0] & 255] | 0;
          }
          return 58720256;
        };
      } else {
        GameBoyAdvanceBG2FrameBufferRenderer.prototype.fetchMode4Pixel = function(x, y) {
          if (x > -1 && y > -1 && x < 240 && y < 160) {
            return this.palette[this.VRAM[this.frameSelect + y * 240 + x]];
          }
          return 58720256;
        };
      }
      GameBoyAdvanceBG2FrameBufferRenderer.prototype.writeFrameSelect = function(frameSelect) {
        frameSelect = frameSelect >> 31;
        this.frameSelect = frameSelect & 40960;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceBGMatrixRendererCore.js
  var require_GameBoyAdvanceBGMatrixRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceBGMatrixRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceBGMatrixRenderer;
      function GameBoyAdvanceBGMatrixRenderer(gfx, BGLayer) {
        this.gfx = gfx;
        this.BGLayer = BGLayer | 0;
        this.VRAM = this.gfx.VRAM;
        this.palette = this.gfx.palette256;
        this.bgAffineRenderer = this.gfx.bgAffineRenderer[BGLayer & 1];
        this.screenSizePreprocess();
        this.screenBaseBlockPreprocess();
        this.characterBaseBlockPreprocess();
        this.displayOverflowProcess(false);
      }
      GameBoyAdvanceBGMatrixRenderer.prototype.renderScanLine = function(line) {
        line = line | 0;
        return this.bgAffineRenderer.renderScanLine(line | 0, this);
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceBGMatrixRenderer.prototype.fetchTile = function(x, y) {
          x = x | 0;
          y = y | 0;
          var tileNumber = (x | 0) + Math.imul(y | 0, this.mapSize | 0) | 0;
          return this.VRAM[(tileNumber | 0) + (this.BGScreenBaseBlock | 0) & 65535] | 0;
        };
      } else {
        GameBoyAdvanceBGMatrixRenderer.prototype.fetchTile = function(x, y) {
          var tileNumber = x + y * this.mapSize;
          return this.VRAM[tileNumber + this.BGScreenBaseBlock & 65535];
        };
      }
      GameBoyAdvanceBGMatrixRenderer.prototype.computeScreenAddress = function(x, y) {
        x = x | 0;
        y = y | 0;
        var address = this.fetchTile(x >> 3, y >> 3) << 6;
        address = (address | 0) + (this.BGCharacterBaseBlock | 0) | 0;
        address = (address | 0) + ((y & 7) << 3) | 0;
        address = (address | 0) + (x & 7) | 0;
        return address | 0;
      };
      GameBoyAdvanceBGMatrixRenderer.prototype.fetchPixelOverflow = function(x, y) {
        x = x | 0;
        y = y | 0;
        var address = this.computeScreenAddress(x & this.mapSizeComparer, y & this.mapSizeComparer) | 0;
        return this.palette[this.VRAM[address & 65535] & 255] | 0;
      };
      GameBoyAdvanceBGMatrixRenderer.prototype.fetchPixelNoOverflow = function(x, y) {
        x = x | 0;
        y = y | 0;
        if ((x | 0) != (x & this.mapSizeComparer) || (y | 0) != (y & this.mapSizeComparer)) {
          return 58720256;
        }
        var address = this.computeScreenAddress(x | 0, y | 0) | 0;
        return this.palette[this.VRAM[address & 65535] & 255] | 0;
      };
      GameBoyAdvanceBGMatrixRenderer.prototype.screenBaseBlockPreprocess = function() {
        this.BGScreenBaseBlock = this.gfx.BGScreenBaseBlock[this.BGLayer & 3] << 11;
      };
      GameBoyAdvanceBGMatrixRenderer.prototype.characterBaseBlockPreprocess = function() {
        this.BGCharacterBaseBlock = this.gfx.BGCharacterBaseBlock[this.BGLayer & 3] << 14;
      };
      GameBoyAdvanceBGMatrixRenderer.prototype.screenSizePreprocess = function() {
        this.mapSize = 16 << (this.gfx.BGScreenSize[this.BGLayer & 3] | 0);
        this.mapSizeComparer = (this.mapSize << 3) - 1 | 0;
      };
      GameBoyAdvanceBGMatrixRenderer.prototype.displayOverflowPreprocess = function() {
        var doOverflow = this.gfx.BGDisplayOverflow[this.BGLayer & 1];
        if (doOverflow != this.BGDisplayOverflow) {
          this.displayOverflowProcess(doOverflow);
        }
      };
      GameBoyAdvanceBGMatrixRenderer.prototype.displayOverflowProcess = function(doOverflow) {
        this.BGDisplayOverflow = doOverflow;
        this.fetchPixel = doOverflow ? this.fetchPixelOverflow : this.fetchPixelNoOverflow;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceBGTEXTRendererCore.js
  var require_GameBoyAdvanceBGTEXTRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceBGTEXTRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceBGTEXTRenderer;
      var TypedArrayShim = require_TypedArrayShim();
      var IS_LITTLE_ENDIAN = TypedArrayShim.IS_LITTLE_ENDIAN;
      var getInt32Array = TypedArrayShim.getInt32Array;
      function GameBoyAdvanceBGTEXTRenderer(gfx, BGLayer) {
        this.gfx = gfx;
        this.VRAM = this.gfx.VRAM;
        this.VRAM16 = this.gfx.VRAM16;
        this.VRAM32 = this.gfx.VRAM32;
        this.palette16 = this.gfx.palette16;
        this.palette256 = this.gfx.palette256;
        this.BGLayer = BGLayer | 0;
        this.initialize();
      }
      GameBoyAdvanceBGTEXTRenderer.prototype.initialize = function() {
        this.scratchBuffer = getInt32Array(247);
        this.tileFetched = getInt32Array(8);
        this.BGXCoord = 0;
        this.BGYCoord = 0;
        this.palettePreprocess();
        this.screenSizePreprocess();
        this.priorityPreprocess();
        this.screenBaseBlockPreprocess();
        this.characterBaseBlockPreprocess();
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.renderScanLine = function(line) {
        line = line | 0;
        if (this.gfx.BGMosaic[this.BGLayer & 3]) {
          line = (line | 0) - (this.gfx.mosaicRenderer.getMosaicYOffset(line | 0) | 0) | 0;
        }
        var yTileOffset = (line | 0) + (this.BGYCoord | 0) & 7;
        var yTileStart = (line | 0) + (this.BGYCoord | 0) >> 3;
        var xTileStart = this.BGXCoord >> 3;
        var chrData = this.fetchTile(yTileStart | 0, xTileStart | 0) | 0;
        xTileStart = (xTileStart | 0) + 1 | 0;
        this.processVRAM(chrData | 0, yTileOffset | 0);
        this.fetchVRAMStart();
        this.renderWholeTiles(xTileStart | 0, yTileStart | 0, yTileOffset | 0);
        if (this.gfx.BGMosaic[this.BGLayer & 3]) {
          this.gfx.mosaicRenderer.renderMosaicHorizontal(this.scratchBuffer);
        }
        return this.scratchBuffer;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.renderWholeTiles = function(xTileStart, yTileStart, yTileOffset) {
        xTileStart = xTileStart | 0;
        yTileStart = yTileStart | 0;
        yTileOffset = yTileOffset | 0;
        for (var position = 8 - (this.BGXCoord & 7) | 0; (position | 0) < 240; position = (position | 0) + 8 | 0) {
          this.processVRAM(this.fetchTile(yTileStart | 0, xTileStart | 0) | 0, yTileOffset | 0);
          this.scratchBuffer[position | 0] = this.tileFetched[0] | 0;
          this.scratchBuffer[(position | 0) + 1 | 0] = this.tileFetched[1] | 0;
          this.scratchBuffer[(position | 0) + 2 | 0] = this.tileFetched[2] | 0;
          this.scratchBuffer[(position | 0) + 3 | 0] = this.tileFetched[3] | 0;
          this.scratchBuffer[(position | 0) + 4 | 0] = this.tileFetched[4] | 0;
          this.scratchBuffer[(position | 0) + 5 | 0] = this.tileFetched[5] | 0;
          this.scratchBuffer[(position | 0) + 6 | 0] = this.tileFetched[6] | 0;
          this.scratchBuffer[(position | 0) + 7 | 0] = this.tileFetched[7] | 0;
          xTileStart = (xTileStart | 0) + 1 | 0;
        }
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceBGTEXTRenderer.prototype.fetchTile = function(yTileStart, xTileStart) {
          yTileStart = yTileStart | 0;
          xTileStart = xTileStart | 0;
          var address = (this.computeTileNumber(yTileStart | 0, xTileStart | 0) | 0) + (this.BGScreenBaseBlock | 0) | 0;
          return this.VRAM16[address & 32767] | 0;
        };
      } else {
        GameBoyAdvanceBGTEXTRenderer.prototype.fetchTile = function(yTileStart, xTileStart) {
          var address = this.computeTileNumber(yTileStart, xTileStart) + this.BGScreenBaseBlock << 1 & 65535;
          return this.VRAM[address | 1] << 8 | this.VRAM[address];
        };
      }
      GameBoyAdvanceBGTEXTRenderer.prototype.computeTileNumber = function(yTile, xTile) {
        yTile = yTile | 0;
        xTile = xTile | 0;
        var tileNumber = xTile & 31;
        switch (this.tileMode | 0) {
          //1x1
          case 0:
            tileNumber = tileNumber | (yTile & 31) << 5;
            break;
          //2x1
          case 1:
            tileNumber = tileNumber | (xTile & 32 | yTile & 31) << 5;
            break;
          //1x2
          case 2:
            tileNumber = tileNumber | (yTile & 63) << 5;
            break;
          //2x2
          default:
            tileNumber = tileNumber | (xTile & 32 | yTile & 31) << 5 | (yTile & 32) << 6;
        }
        return tileNumber | 0;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.process4BitVRAM = function(chrData, yOffset) {
        chrData = chrData | 0;
        yOffset = yOffset | 0;
        var address = (chrData & 1023) << 3;
        address = (address | 0) + (this.BGCharacterBaseBlock | 0) | 0;
        if ((chrData & 2048) == 0) {
          address = (address | 0) + (yOffset | 0) | 0;
        } else {
          address = (address | 0) + 7 | 0;
          address = (address | 0) - (yOffset | 0) | 0;
        }
        this.render4BitVRAM(chrData >> 8, address | 0);
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceBGTEXTRenderer.prototype.render4BitVRAM = function(chrData, address) {
          chrData = chrData | 0;
          address = address | 0;
          if ((address | 0) < 16384) {
            var paletteOffset = chrData & 240;
            var data = this.VRAM32[address | 0] | 0;
            if ((chrData & 4) == 0) {
              this.tileFetched[0] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[1] = this.palette16[paletteOffset | data >> 4 & 15] | this.priorityFlag;
              this.tileFetched[2] = this.palette16[paletteOffset | data >> 8 & 15] | this.priorityFlag;
              this.tileFetched[3] = this.palette16[paletteOffset | data >> 12 & 15] | this.priorityFlag;
              this.tileFetched[4] = this.palette16[paletteOffset | data >> 16 & 15] | this.priorityFlag;
              this.tileFetched[5] = this.palette16[paletteOffset | data >> 20 & 15] | this.priorityFlag;
              this.tileFetched[6] = this.palette16[paletteOffset | data >> 24 & 15] | this.priorityFlag;
              this.tileFetched[7] = this.palette16[paletteOffset | data >>> 28] | this.priorityFlag;
            } else {
              this.tileFetched[0] = this.palette16[paletteOffset | data >>> 28] | this.priorityFlag;
              this.tileFetched[1] = this.palette16[paletteOffset | data >> 24 & 15] | this.priorityFlag;
              this.tileFetched[2] = this.palette16[paletteOffset | data >> 20 & 15] | this.priorityFlag;
              this.tileFetched[3] = this.palette16[paletteOffset | data >> 16 & 15] | this.priorityFlag;
              this.tileFetched[4] = this.palette16[paletteOffset | data >> 12 & 15] | this.priorityFlag;
              this.tileFetched[5] = this.palette16[paletteOffset | data >> 8 & 15] | this.priorityFlag;
              this.tileFetched[6] = this.palette16[paletteOffset | data >> 4 & 15] | this.priorityFlag;
              this.tileFetched[7] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
            }
          } else {
            this.addressInvalidRender();
          }
        };
      } else {
        GameBoyAdvanceBGTEXTRenderer.prototype.render4BitVRAM = function(chrData, address) {
          address <<= 2;
          if (address < 65536) {
            var paletteOffset = chrData & 240;
            var data = this.VRAM[address];
            if ((chrData & 4) == 0) {
              this.tileFetched[0] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[1] = this.palette16[paletteOffset | data >> 4] | this.priorityFlag;
              data = this.VRAM[address | 1];
              this.tileFetched[2] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[3] = this.palette16[paletteOffset | data >> 4] | this.priorityFlag;
              data = this.VRAM[address | 2];
              this.tileFetched[4] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[5] = this.palette16[paletteOffset | data >> 4] | this.priorityFlag;
              data = this.VRAM[address | 3];
              this.tileFetched[6] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[7] = this.palette16[paletteOffset | data >> 4] | this.priorityFlag;
            } else {
              this.tileFetched[7] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[6] = this.palette16[paletteOffset | data >> 4] | this.priorityFlag;
              data = this.VRAM[address | 1];
              this.tileFetched[5] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[4] = this.palette16[paletteOffset | data >> 4] | this.priorityFlag;
              data = this.VRAM[address | 2];
              this.tileFetched[3] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[2] = this.palette16[paletteOffset | data >> 4] | this.priorityFlag;
              data = this.VRAM[address | 3];
              this.tileFetched[1] = this.palette16[paletteOffset | data & 15] | this.priorityFlag;
              this.tileFetched[0] = this.palette16[paletteOffset | data >> 4] | this.priorityFlag;
            }
          } else {
            this.addressInvalidRender();
          }
        };
      }
      GameBoyAdvanceBGTEXTRenderer.prototype.process8BitVRAM = function(chrData, yOffset) {
        chrData = chrData | 0;
        yOffset = yOffset | 0;
        var address = (chrData & 1023) << 4;
        address = (address | 0) + (this.BGCharacterBaseBlock | 0) | 0;
        switch (chrData & 3072) {
          //No Flip:
          case 0:
            address = (address | 0) + (yOffset << 1) | 0;
            this.render8BitVRAMNormal(address | 0);
            break;
          //Horizontal Flip:
          case 1024:
            address = (address | 0) + (yOffset << 1) | 0;
            this.render8BitVRAMFlipped(address | 0);
            break;
          //Vertical Flip:
          case 2048:
            address = (address | 0) + 14 | 0;
            address = (address | 0) - (yOffset << 1) | 0;
            this.render8BitVRAMNormal(address | 0);
            break;
          //Horizontal & Vertical Flip:
          default:
            address = (address | 0) + 14 | 0;
            address = (address | 0) - (yOffset << 1) | 0;
            this.render8BitVRAMFlipped(address | 0);
        }
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceBGTEXTRenderer.prototype.render8BitVRAMNormal = function(address) {
          address = address | 0;
          if ((address | 0) < 16384) {
            var data = this.VRAM32[address | 0] | 0;
            this.tileFetched[0] = this.palette256[data & 255] | this.priorityFlag;
            this.tileFetched[1] = this.palette256[data >> 8 & 255] | this.priorityFlag;
            this.tileFetched[2] = this.palette256[data >> 16 & 255] | this.priorityFlag;
            this.tileFetched[3] = this.palette256[data >>> 24] | this.priorityFlag;
            data = this.VRAM32[address | 1] | 0;
            this.tileFetched[4] = this.palette256[data & 255] | this.priorityFlag;
            this.tileFetched[5] = this.palette256[data >> 8 & 255] | this.priorityFlag;
            this.tileFetched[6] = this.palette256[data >> 16 & 255] | this.priorityFlag;
            this.tileFetched[7] = this.palette256[data >>> 24] | this.priorityFlag;
          } else {
            this.addressInvalidRender();
          }
        };
        GameBoyAdvanceBGTEXTRenderer.prototype.render8BitVRAMFlipped = function(address) {
          address = address | 0;
          if ((address | 0) < 16384) {
            var data = this.VRAM32[address | 0] | 0;
            this.tileFetched[4] = this.palette256[data >>> 24] | this.priorityFlag;
            this.tileFetched[5] = this.palette256[data >> 16 & 255] | this.priorityFlag;
            this.tileFetched[6] = this.palette256[data >> 8 & 255] | this.priorityFlag;
            this.tileFetched[7] = this.palette256[data & 255] | this.priorityFlag;
            data = this.VRAM32[address | 1] | 0;
            this.tileFetched[0] = this.palette256[data >>> 24] | this.priorityFlag;
            this.tileFetched[1] = this.palette256[data >> 16 & 255] | this.priorityFlag;
            this.tileFetched[2] = this.palette256[data >> 8 & 255] | this.priorityFlag;
            this.tileFetched[3] = this.palette256[data & 255] | this.priorityFlag;
          } else {
            this.addressInvalidRender();
          }
        };
      } else {
        GameBoyAdvanceBGTEXTRenderer.prototype.render8BitVRAMNormal = function(address) {
          address <<= 2;
          if (address < 65536) {
            this.tileFetched[0] = this.palette256[this.VRAM[address]] | this.priorityFlag;
            this.tileFetched[1] = this.palette256[this.VRAM[address | 1]] | this.priorityFlag;
            this.tileFetched[2] = this.palette256[this.VRAM[address | 2]] | this.priorityFlag;
            this.tileFetched[3] = this.palette256[this.VRAM[address | 3]] | this.priorityFlag;
            this.tileFetched[4] = this.palette256[this.VRAM[address | 4]] | this.priorityFlag;
            this.tileFetched[5] = this.palette256[this.VRAM[address | 5]] | this.priorityFlag;
            this.tileFetched[6] = this.palette256[this.VRAM[address | 6]] | this.priorityFlag;
            this.tileFetched[7] = this.palette256[this.VRAM[address | 7]] | this.priorityFlag;
          } else {
            this.addressInvalidRender();
          }
        };
        GameBoyAdvanceBGTEXTRenderer.prototype.render8BitVRAMFlipped = function(address) {
          address <<= 2;
          if (address < 65536) {
            this.tileFetched[7] = this.palette256[this.VRAM[address]] | this.priorityFlag;
            this.tileFetched[6] = this.palette256[this.VRAM[address | 1]] | this.priorityFlag;
            this.tileFetched[5] = this.palette256[this.VRAM[address | 2]] | this.priorityFlag;
            this.tileFetched[4] = this.palette256[this.VRAM[address | 3]] | this.priorityFlag;
            this.tileFetched[3] = this.palette256[this.VRAM[address | 4]] | this.priorityFlag;
            this.tileFetched[2] = this.palette256[this.VRAM[address | 5]] | this.priorityFlag;
            this.tileFetched[1] = this.palette256[this.VRAM[address | 6]] | this.priorityFlag;
            this.tileFetched[0] = this.palette256[this.VRAM[address | 7]] | this.priorityFlag;
          } else {
            this.addressInvalidRender();
          }
        };
      }
      GameBoyAdvanceBGTEXTRenderer.prototype.addressInvalidRender = function() {
        var data = this.gfx.transparency | this.priorityFlag;
        this.tileFetched[0] = data | 0;
        this.tileFetched[1] = data | 0;
        this.tileFetched[2] = data | 0;
        this.tileFetched[3] = data | 0;
        this.tileFetched[4] = data | 0;
        this.tileFetched[5] = data | 0;
        this.tileFetched[6] = data | 0;
        this.tileFetched[7] = data | 0;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.fetchVRAMStart = function() {
        var pixelPipelinePosition = this.BGXCoord & 7;
        switch (pixelPipelinePosition | 0) {
          case 0:
            this.scratchBuffer[0] = this.tileFetched[0] | 0;
          case 1:
            this.scratchBuffer[1 - (pixelPipelinePosition | 0) | 0] = this.tileFetched[1] | 0;
          case 2:
            this.scratchBuffer[2 - (pixelPipelinePosition | 0) | 0] = this.tileFetched[2] | 0;
          case 3:
            this.scratchBuffer[3 - (pixelPipelinePosition | 0) | 0] = this.tileFetched[3] | 0;
          case 4:
            this.scratchBuffer[4 - (pixelPipelinePosition | 0) | 0] = this.tileFetched[4] | 0;
          case 5:
            this.scratchBuffer[5 - (pixelPipelinePosition | 0) | 0] = this.tileFetched[5] | 0;
          case 6:
            this.scratchBuffer[6 - (pixelPipelinePosition | 0) | 0] = this.tileFetched[6] | 0;
          default:
            this.scratchBuffer[7 - (pixelPipelinePosition | 0) | 0] = this.tileFetched[7] | 0;
        }
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.palettePreprocess = function() {
        if (this.gfx.BGPalette256[this.BGLayer & 3]) {
          this.processVRAM = this.process8BitVRAM;
        } else {
          this.processVRAM = this.process4BitVRAM;
        }
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.screenSizePreprocess = function() {
        this.tileMode = this.gfx.BGScreenSize[this.BGLayer & 3] | 0;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.priorityPreprocess = function() {
        this.priorityFlag = this.gfx.BGPriority[this.BGLayer & 3] << 23 | 1 << (this.BGLayer | 16);
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.screenBaseBlockPreprocess = function() {
        this.BGScreenBaseBlock = this.gfx.BGScreenBaseBlock[this.BGLayer & 3] << 10;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.characterBaseBlockPreprocess = function() {
        this.BGCharacterBaseBlock = this.gfx.BGCharacterBaseBlock[this.BGLayer & 3] << 12;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.writeBGHOFS0 = function(data) {
        data = data | 0;
        this.BGXCoord = this.BGXCoord & 256 | data;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.writeBGHOFS1 = function(data) {
        data = data | 0;
        this.BGXCoord = (data & 1) << 8 | this.BGXCoord & 255;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.writeBGVOFS0 = function(data) {
        data = data | 0;
        this.BGYCoord = this.BGYCoord & 256 | data;
      };
      GameBoyAdvanceBGTEXTRenderer.prototype.writeBGVOFS1 = function(data) {
        data = data | 0;
        this.BGYCoord = (data & 1) << 8 | this.BGYCoord & 255;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceColorEffectsRendererCore.js
  var require_GameBoyAdvanceColorEffectsRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceColorEffectsRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceColorEffectsRenderer;
      function GameBoyAdvanceColorEffectsRenderer() {
        this.alphaBlendAmountTarget1 = 0;
        this.alphaBlendAmountTarget2 = 0;
        this.effectsTarget1 = 0;
        this.colorEffectsType = 0;
        this.effectsTarget2 = 0;
        this.brightnessEffectAmount = 0;
        this.alphaBlendOptimizationChecks();
      }
      GameBoyAdvanceColorEffectsRenderer.prototype.processOAMSemiTransparent = function(lowerPixel, topPixel) {
        lowerPixel = lowerPixel | 0;
        topPixel = topPixel | 0;
        if (((lowerPixel | 0) & (this.effectsTarget2 | 0)) != 0) {
          return this.alphaBlend(topPixel | 0, lowerPixel | 0) | 0;
        } else if (((topPixel | 0) & (this.effectsTarget1 | 0)) != 0) {
          switch (this.colorEffectsType | 0) {
            case 2:
              return this.brightnessIncrease(topPixel | 0) | 0;
            case 3:
              return this.brightnessDecrease(topPixel | 0) | 0;
          }
        }
        return topPixel | 0;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.process = function(lowerPixel, topPixel) {
        lowerPixel = lowerPixel | 0;
        topPixel = topPixel | 0;
        if (((topPixel | 0) & (this.effectsTarget1 | 0)) != 0) {
          switch (this.colorEffectsType | 0) {
            case 1:
              if (((lowerPixel | 0) & (this.effectsTarget2 | 0)) != 0 && (topPixel | 0) != (lowerPixel | 0)) {
                return this.alphaBlend(topPixel | 0, lowerPixel | 0) | 0;
              }
              break;
            case 2:
              return this.brightnessIncrease(topPixel | 0) | 0;
            case 3:
              return this.brightnessDecrease(topPixel | 0) | 0;
          }
        }
        return topPixel | 0;
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendNormal = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          var b2 = lowerPixel >> 10 & 31;
          var g2 = lowerPixel >> 5 & 31;
          var r2 = lowerPixel & 31;
          b1 = Math.imul(b1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          g1 = Math.imul(g1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          r1 = Math.imul(r1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          b2 = Math.imul(b2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          g2 = Math.imul(g2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          r2 = Math.imul(r2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          var b = Math.min((b1 | 0) + (b2 | 0) >> 4, 31) | 0;
          var g = Math.min((g1 | 0) + (g2 | 0) >> 4, 31) | 0;
          var r = Math.min((r1 | 0) + (r2 | 0) >> 4, 31) | 0;
          return b << 10 | g << 5 | r;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendTop = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b = topPixel >> 10 & 31;
          var g = topPixel >> 5 & 31;
          var r = topPixel & 31;
          b = Math.imul(b | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          g = Math.imul(g | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          r = Math.imul(r | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          return b >> 4 << 10 | g >> 4 << 5 | r >> 4;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendLow = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b = lowerPixel >> 10 & 31;
          var g = lowerPixel >> 5 & 31;
          var r = lowerPixel & 31;
          b = Math.imul(b | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          g = Math.imul(g | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          r = Math.imul(r | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          return b >> 4 << 10 | g >> 4 << 5 | r >> 4;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendAddLow = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          var b2 = lowerPixel >> 10 & 31;
          var g2 = lowerPixel >> 5 & 31;
          var r2 = lowerPixel & 31;
          b1 = Math.imul(b1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          g1 = Math.imul(g1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          r1 = Math.imul(r1 | 0, this.alphaBlendAmountTarget1 | 0) | 0;
          var b = Math.min((b1 | 0) + (b2 << 4) >> 4, 31) | 0;
          var g = Math.min((g1 | 0) + (g2 << 4) >> 4, 31) | 0;
          var r = Math.min((r1 | 0) + (r2 << 4) >> 4, 31) | 0;
          return b << 10 | g << 5 | r;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendAddTop = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          var b2 = lowerPixel >> 10 & 31;
          var g2 = lowerPixel >> 5 & 31;
          var r2 = lowerPixel & 31;
          b2 = Math.imul(b2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          g2 = Math.imul(g2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          r2 = Math.imul(r2 | 0, this.alphaBlendAmountTarget2 | 0) | 0;
          var b = Math.min((b1 << 4) + (b2 | 0) >> 4, 31) | 0;
          var g = Math.min((g1 << 4) + (g2 | 0) >> 4, 31) | 0;
          var r = Math.min((r1 << 4) + (r2 | 0) >> 4, 31) | 0;
          return b << 10 | g << 5 | r;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.brightnessIncrease = function(topPixel) {
          topPixel = topPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          b1 = (b1 | 0) + (Math.imul(31 - (b1 | 0) | 0, this.brightnessEffectAmount | 0) >> 4) | 0;
          g1 = (g1 | 0) + (Math.imul(31 - (g1 | 0) | 0, this.brightnessEffectAmount | 0) >> 4) | 0;
          r1 = (r1 | 0) + (Math.imul(31 - (r1 | 0) | 0, this.brightnessEffectAmount | 0) >> 4) | 0;
          return b1 << 10 | g1 << 5 | r1;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.brightnessDecrease = function(topPixel) {
          topPixel = topPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          var decreaseMultiplier = 16 - (this.brightnessEffectAmount | 0) | 0;
          b1 = Math.imul(b1 | 0, decreaseMultiplier | 0) >> 4;
          g1 = Math.imul(g1 | 0, decreaseMultiplier | 0) >> 4;
          r1 = Math.imul(r1 | 0, decreaseMultiplier | 0) >> 4;
          return b1 << 10 | g1 << 5 | r1;
        };
      } else {
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendNormal = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          var b2 = lowerPixel >> 10 & 31;
          var g2 = lowerPixel >> 5 & 31;
          var r2 = lowerPixel & 31;
          b1 = b1 * this.alphaBlendAmountTarget1;
          g1 = g1 * this.alphaBlendAmountTarget1;
          r1 = r1 * this.alphaBlendAmountTarget1;
          b2 = b2 * this.alphaBlendAmountTarget2;
          g2 = g2 * this.alphaBlendAmountTarget2;
          r2 = r2 * this.alphaBlendAmountTarget2;
          return Math.min(b1 + b2 >> 4, 31) << 10 | Math.min(g1 + g2 >> 4, 31) << 5 | Math.min(r1 + r2 >> 4, 31);
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendTop = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b = topPixel >> 10 & 31;
          var g = topPixel >> 5 & 31;
          var r = topPixel & 31;
          b = b * this.alphaBlendAmountTarget1;
          g = g * this.alphaBlendAmountTarget1;
          r = r * this.alphaBlendAmountTarget1;
          return b >> 4 << 10 | g >> 4 << 5 | r >> 4;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendLow = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b = lowerPixel >> 10 & 31;
          var g = lowerPixel >> 5 & 31;
          var r = lowerPixel & 31;
          b = b * this.alphaBlendAmountTarget2;
          g = g * this.alphaBlendAmountTarget2;
          r = r * this.alphaBlendAmountTarget2;
          return b >> 4 << 10 | g >> 4 << 5 | r >> 4;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendAddLow = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          var b2 = lowerPixel >> 10 & 31;
          var g2 = lowerPixel >> 5 & 31;
          var r2 = lowerPixel & 31;
          b1 = b1 * this.alphaBlendAmountTarget1;
          g1 = g1 * this.alphaBlendAmountTarget1;
          r1 = r1 * this.alphaBlendAmountTarget1;
          b2 = b2 << 4;
          g2 = g2 << 4;
          r2 = r2 << 4;
          return Math.min(b1 + b2 >> 4, 31) << 10 | Math.min(g1 + g2 >> 4, 31) << 5 | Math.min(r1 + r2 >> 4, 31);
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendAddTop = function(topPixel, lowerPixel) {
          topPixel = topPixel | 0;
          lowerPixel = lowerPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          var b2 = lowerPixel >> 10 & 31;
          var g2 = lowerPixel >> 5 & 31;
          var r2 = lowerPixel & 31;
          b1 = b1 << 4;
          g1 = g1 << 4;
          r1 = r1 << 4;
          b2 = b2 * this.alphaBlendAmountTarget2;
          g2 = g2 * this.alphaBlendAmountTarget2;
          r2 = r2 * this.alphaBlendAmountTarget2;
          return Math.min(b1 + b2 >> 4, 31) << 10 | Math.min(g1 + g2 >> 4, 31) << 5 | Math.min(r1 + r2 >> 4, 31);
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.brightnessIncrease = function(topPixel) {
          topPixel = topPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          b1 += (31 - b1) * this.brightnessEffectAmount >> 4;
          g1 += (31 - g1) * this.brightnessEffectAmount >> 4;
          r1 += (31 - r1) * this.brightnessEffectAmount >> 4;
          return b1 << 10 | g1 << 5 | r1;
        };
        GameBoyAdvanceColorEffectsRenderer.prototype.brightnessDecrease = function(topPixel) {
          topPixel = topPixel | 0;
          var b1 = topPixel >> 10 & 31;
          var g1 = topPixel >> 5 & 31;
          var r1 = topPixel & 31;
          var decreaseMultiplier = 16 - this.brightnessEffectAmount;
          b1 = b1 * decreaseMultiplier >> 4;
          g1 = g1 * decreaseMultiplier >> 4;
          r1 = r1 * decreaseMultiplier >> 4;
          return b1 << 10 | g1 << 5 | r1;
        };
      }
      GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendTopPass = function(topPixel, lowerPixel) {
        return topPixel | 0;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendBottomPass = function(topPixel, lowerPixel) {
        return lowerPixel | 0;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendZero = function(topPixel, lowerPixel) {
        return 0;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendAddBoth = function(topPixel, lowerPixel) {
        topPixel = topPixel | 0;
        lowerPixel = lowerPixel | 0;
        var b1 = topPixel >> 10 & 31;
        var g1 = topPixel >> 5 & 31;
        var r1 = topPixel & 31;
        var b2 = lowerPixel >> 10 & 31;
        var g2 = lowerPixel >> 5 & 31;
        var r2 = lowerPixel & 31;
        var b = Math.min((b1 << 4) + (b2 << 4) >> 4, 31) | 0;
        var g = Math.min((g1 << 4) + (g2 << 4) >> 4, 31) | 0;
        var r = Math.min((r1 << 4) + (r2 << 4) >> 4, 31) | 0;
        return b << 10 | g << 5 | r;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDCNT0 = function(data) {
        this.effectsTarget1 = (data & 63) << 16;
        this.colorEffectsType = data >> 6;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.readBLDCNT0 = function(data) {
        return this.colorEffectsType << 6 | this.effectsTarget1 >> 16;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDCNT1 = function(data) {
        this.effectsTarget2 = (data & 63) << 16;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.readBLDCNT1 = function(data) {
        return this.effectsTarget2 >> 16;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.readBLDALPHA0 = function() {
        return this.alphaBlendAmountTarget1Scratch | 0;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.readBLDALPHA1 = function() {
        return this.alphaBlendAmountTarget2Scratch | 0;
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDALPHA0 = function(data) {
        this.alphaBlendAmountTarget1Scratch = data & 31;
        this.alphaBlendAmountTarget1 = Math.min(this.alphaBlendAmountTarget1Scratch | 0, 16) | 0;
        this.alphaBlendOptimizationChecks();
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDALPHA1 = function(data) {
        this.alphaBlendAmountTarget2Scratch = data & 31;
        this.alphaBlendAmountTarget2 = Math.min(this.alphaBlendAmountTarget2Scratch | 0, 16) | 0;
        this.alphaBlendOptimizationChecks();
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.alphaBlendOptimizationChecks = function() {
        if ((this.alphaBlendAmountTarget1 | 0) == 0) {
          if ((this.alphaBlendAmountTarget2 | 0) == 0) {
            this.alphaBlend = this.alphaBlendZero;
          } else if ((this.alphaBlendAmountTarget2 | 0) < 16) {
            this.alphaBlend = this.alphaBlendLow;
          } else {
            this.alphaBlend = this.alphaBlendBottomPass;
          }
        } else if ((this.alphaBlendAmountTarget1 | 0) < 16) {
          if ((this.alphaBlendAmountTarget2 | 0) == 0) {
            this.alphaBlend = this.alphaBlendTop;
          } else if ((this.alphaBlendAmountTarget2 | 0) < 16) {
            this.alphaBlend = this.alphaBlendNormal;
          } else {
            this.alphaBlend = this.alphaBlendAddLow;
          }
        } else {
          if ((this.alphaBlendAmountTarget2 | 0) == 0) {
            this.alphaBlend = this.alphaBlendTopPass;
          } else if ((this.alphaBlendAmountTarget2 | 0) < 16) {
            this.alphaBlend = this.alphaBlendAddTop;
          } else {
            this.alphaBlend = this.alphaBlendAddBoth;
          }
        }
      };
      GameBoyAdvanceColorEffectsRenderer.prototype.writeBLDY = function(data) {
        this.brightnessEffectAmount = Math.min(data & 31, 16) | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceCompositorCore.js
  var require_GameBoyAdvanceCompositorCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceCompositorCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceCompositor;
      function GameBoyAdvanceCompositor(gfx) {
        this.gfx = gfx;
        this.preprocess(false);
      }
      GameBoyAdvanceCompositor.prototype.preprocess = function(doEffects) {
        this.renderScanLine = doEffects ? this.renderScanLineWithEffects : this.renderNormalScanLine;
      };
      GameBoyAdvanceCompositor.prototype.cleanLayerStack = function(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer) {
        var layerStack = [];
        if (BG3Buffer) {
          layerStack.push(BG3Buffer);
        }
        if (BG2Buffer) {
          layerStack.push(BG2Buffer);
        }
        if (BG1Buffer) {
          layerStack.push(BG1Buffer);
        }
        if (BG0Buffer) {
          layerStack.push(BG0Buffer);
        }
        if (OBJBuffer) {
          layerStack.push(OBJBuffer);
        }
        return layerStack;
      };
      GameBoyAdvanceCompositor.prototype.renderNormalScanLine = function(xStart, xEnd, lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var layerStack = this.cleanLayerStack(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
        switch (layerStack.length) {
          case 0:
            this.fillWithBackdrop(xStart | 0, xEnd | 0, lineBuffer);
            break;
          case 1:
            this.composite1Layer(xStart | 0, xEnd | 0, lineBuffer, layerStack[0]);
            break;
          case 2:
            this.composite2Layer(xStart | 0, xEnd | 0, lineBuffer, layerStack[0], layerStack[1]);
            break;
          case 3:
            this.composite3Layer(xStart | 0, xEnd | 0, lineBuffer, layerStack[0], layerStack[1], layerStack[2]);
            break;
          case 4:
            this.composite4Layer(xStart | 0, xEnd | 0, lineBuffer, layerStack[0], layerStack[1], layerStack[2], layerStack[3]);
            break;
          case 5:
            this.composite5Layer(xStart | 0, xEnd | 0, lineBuffer, layerStack[0], layerStack[1], layerStack[2], layerStack[3], layerStack[4]);
        }
      };
      GameBoyAdvanceCompositor.prototype.renderScanLineWithEffects = function(xStart, xEnd, lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var layerStack = this.cleanLayerStack(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
        switch (layerStack.length) {
          case 0:
            this.fillWithBackdropSpecial(xStart | 0, xEnd | 0, lineBuffer);
            break;
          case 1:
            this.composite1LayerSpecial(xStart | 0, xEnd | 0, lineBuffer, layerStack[0]);
            break;
          case 2:
            this.composite2LayerSpecial(xStart | 0, xEnd | 0, lineBuffer, layerStack[0], layerStack[1]);
            break;
          case 3:
            this.composite3LayerSpecial(xStart | 0, xEnd | 0, lineBuffer, layerStack[0], layerStack[1], layerStack[2]);
            break;
          case 4:
            this.composite4LayerSpecial(xStart | 0, xEnd | 0, lineBuffer, layerStack[0], layerStack[1], layerStack[2], layerStack[3]);
            break;
          case 5:
            this.composite5LayerSpecial(xStart | 0, xEnd | 0, lineBuffer, layerStack[0], layerStack[1], layerStack[2], layerStack[3], layerStack[4]);
        }
      };
      GameBoyAdvanceCompositor.prototype.fillWithBackdrop = function(xStart, xEnd, lineBuffer) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lineBuffer[xStart | 0] = this.gfx.backdrop | 0;
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.fillWithBackdropSpecial = function(xStart, xEnd, lineBuffer) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.process(0, this.gfx.backdrop | 0) | 0;
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite1Layer = function(xStart, xEnd, lineBuffer, layer0) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = currentPixel | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite2Layer = function(xStart, xEnd, lineBuffer, layer0, layer1) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer1[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = currentPixel | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite3Layer = function(xStart, xEnd, lineBuffer, layer0, layer1, layer2) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer1[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer2[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = currentPixel | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite4Layer = function(xStart, xEnd, lineBuffer, layer0, layer1, layer2, layer3) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer1[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer2[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer3[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = currentPixel | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite5Layer = function(xStart, xEnd, lineBuffer, layer0, layer1, layer2, layer3, layer4) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer1[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer2[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer3[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer4[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = currentPixel | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite1LayerSpecial = function(xStart, xEnd, lineBuffer, layer0) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.process(lowerPixel | 0, currentPixel | 0) | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite2LayerSpecial = function(xStart, xEnd, lineBuffer, layer0, layer1) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer1[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.process(lowerPixel | 0, currentPixel | 0) | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite3LayerSpecial = function(xStart, xEnd, lineBuffer, layer0, layer1, layer2) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer1[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer2[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.process(lowerPixel | 0, currentPixel | 0) | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite4LayerSpecial = function(xStart, xEnd, lineBuffer, layer0, layer1, layer2, layer3) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer1[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer2[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer3[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.process(lowerPixel | 0, currentPixel | 0) | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceCompositor.prototype.composite5LayerSpecial = function(xStart, xEnd, lineBuffer, layer0, layer1, layer2, layer3, layer4) {
        xStart = xStart | 0;
        xEnd = xEnd | 0;
        var currentPixel = 0;
        var lowerPixel = 0;
        var workingPixel = 0;
        while ((xStart | 0) < (xEnd | 0)) {
          lowerPixel = currentPixel = this.gfx.backdrop | 0;
          workingPixel = layer0[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer1[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer2[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer3[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          workingPixel = layer4[xStart | 0] | 0;
          if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
            lowerPixel = currentPixel | 0;
            currentPixel = workingPixel | 0;
          } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
            lowerPixel = workingPixel | 0;
          }
          if ((currentPixel & 4194304) == 0) {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.process(lowerPixel | 0, currentPixel | 0) | 0;
          } else {
            lineBuffer[xStart | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
          }
          xStart = (xStart | 0) + 1 | 0;
        }
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceMode0RendererCore.js
  var require_GameBoyAdvanceMode0RendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceMode0RendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceMode0Renderer;
      function GameBoyAdvanceMode0Renderer(gfx) {
        this.gfx = gfx;
      }
      GameBoyAdvanceMode0Renderer.prototype.renderScanLine = function(line) {
        line = line | 0;
        var BG0Buffer = (this.gfx.display & 1) == 1 ? this.gfx.bg0Renderer.renderScanLine(line | 0) : null;
        var BG1Buffer = (this.gfx.display & 2) == 2 ? this.gfx.bg1Renderer.renderScanLine(line | 0) : null;
        var BG2Buffer = (this.gfx.display & 4) == 4 ? this.gfx.bg2TextRenderer.renderScanLine(line | 0) : null;
        var BG3Buffer = (this.gfx.display & 8) == 8 ? this.gfx.bg3TextRenderer.renderScanLine(line | 0) : null;
        var OBJBuffer = (this.gfx.display & 16) == 16 ? this.gfx.objRenderer.renderScanLine(line | 0) : null;
        this.gfx.compositeLayers(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
        if ((this.gfx.display & 128) == 128) {
          this.gfx.objWindowRenderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
        }
        if ((this.gfx.display & 64) == 64) {
          this.gfx.window1Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
        }
        if ((this.gfx.display & 32) == 32) {
          this.gfx.window0Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
        }
        this.gfx.copyLineToFrameBuffer(line | 0);
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceMode1RendererCore.js
  var require_GameBoyAdvanceMode1RendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceMode1RendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceMode1Renderer;
      function GameBoyAdvanceMode1Renderer(gfx) {
        this.gfx = gfx;
      }
      GameBoyAdvanceMode1Renderer.prototype.renderScanLine = function(line) {
        line = line | 0;
        var BG0Buffer = (this.gfx.display & 1) == 1 ? this.gfx.bg0Renderer.renderScanLine(line | 0) : null;
        var BG1Buffer = (this.gfx.display & 2) == 2 ? this.gfx.bg1Renderer.renderScanLine(line | 0) : null;
        var BG2Buffer = (this.gfx.display & 4) == 4 ? this.gfx.bg2MatrixRenderer.renderScanLine(line | 0) : null;
        var OBJBuffer = (this.gfx.display & 16) == 16 ? this.gfx.objRenderer.renderScanLine(line | 0) : null;
        this.gfx.compositeLayers(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, null);
        if ((this.gfx.display & 128) == 128) {
          this.gfx.objWindowRenderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, null);
        }
        if ((this.gfx.display & 64) == 64) {
          this.gfx.window1Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, null);
        }
        if ((this.gfx.display & 32) == 32) {
          this.gfx.window0Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, null);
        }
        this.gfx.copyLineToFrameBuffer(line | 0);
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceMode2RendererCore.js
  var require_GameBoyAdvanceMode2RendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceMode2RendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceMode2Renderer;
      function GameBoyAdvanceMode2Renderer(gfx) {
        this.gfx = gfx;
      }
      GameBoyAdvanceMode2Renderer.prototype.renderScanLine = function(line) {
        line = line | 0;
        var BG2Buffer = (this.gfx.display & 4) == 4 ? this.gfx.bg2MatrixRenderer.renderScanLine(line | 0) : null;
        var BG3Buffer = (this.gfx.display & 8) == 8 ? this.gfx.bg3MatrixRenderer.renderScanLine(line | 0) : null;
        var OBJBuffer = (this.gfx.display & 16) == 16 ? this.gfx.objRenderer.renderScanLine(line | 0) : null;
        this.gfx.compositeLayers(OBJBuffer, null, null, BG2Buffer, BG3Buffer);
        if ((this.gfx.display & 128) == 128) {
          this.gfx.objWindowRenderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, null, null, BG2Buffer, BG3Buffer);
        }
        if ((this.gfx.display & 64) == 64) {
          this.gfx.window1Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, null, null, BG2Buffer, BG3Buffer);
        }
        if ((this.gfx.display & 32) == 32) {
          this.gfx.window0Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, null, null, BG2Buffer, BG3Buffer);
        }
        this.gfx.copyLineToFrameBuffer(line | 0);
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceModeFrameBufferRendererCore.js
  var require_GameBoyAdvanceModeFrameBufferRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceModeFrameBufferRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceModeFrameBufferRenderer;
      function GameBoyAdvanceModeFrameBufferRenderer(gfx) {
        this.gfx = gfx;
      }
      GameBoyAdvanceModeFrameBufferRenderer.prototype.renderScanLine = function(line) {
        line = line | 0;
        var BG2Buffer = (this.gfx.display & 4) == 4 ? this.gfx.bg2FrameBufferRenderer.renderScanLine(line | 0) : null;
        var OBJBuffer = (this.gfx.display & 16) == 16 ? this.gfx.objRenderer.renderScanLine(line | 0) : null;
        this.gfx.compositeLayers(OBJBuffer, null, null, BG2Buffer, null);
        if ((this.gfx.display & 128) == 128) {
          this.gfx.objWindowRenderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, null, null, BG2Buffer, null);
        }
        if ((this.gfx.display & 64) == 64) {
          this.gfx.window1Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, null, null, BG2Buffer, null);
        }
        if ((this.gfx.display & 32) == 32) {
          this.gfx.window0Renderer.renderScanLine(line | 0, this.gfx.lineBuffer, OBJBuffer, null, null, BG2Buffer, null);
        }
        this.gfx.copyLineToFrameBuffer(line | 0);
      };
      GameBoyAdvanceModeFrameBufferRenderer.prototype.preprocess = function(BGMode) {
        this.gfx.bg2FrameBufferRenderer.selectMode(BGMode | 0);
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceMosaicRendererCore.js
  var require_GameBoyAdvanceMosaicRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceMosaicRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceMosaicRenderer;
      function GameBoyAdvanceMosaicRenderer(gfx) {
        this.BGMosaicHSize = 0;
        this.BGMosaicVSize = 0;
        this.OBJMosaicHSize = 0;
        this.OBJMosaicVSize = 0;
      }
      GameBoyAdvanceMosaicRenderer.prototype.renderMosaicHorizontal = function(layer) {
        var currentPixel = 0;
        var mosaicBlur = (this.BGMosaicHSize | 0) + 1 | 0;
        if ((mosaicBlur | 0) > 1) {
          for (var position = 0; (position | 0) < 240; position = (position | 0) + 1 | 0) {
            if (((position | 0) % (mosaicBlur | 0) | 0) == 0) {
              currentPixel = layer[position | 0] | 0;
            } else {
              layer[position | 0] = currentPixel | 0;
            }
          }
        }
      };
      GameBoyAdvanceMosaicRenderer.prototype.renderOBJMosaicHorizontal = function(layer, xOffset, xSize) {
        xOffset = xOffset | 0;
        xSize = xSize | 0;
        var currentPixel = 58720256;
        var mosaicBlur = (this.OBJMosaicHSize | 0) + 1 | 0;
        if ((mosaicBlur | 0) > 1) {
          for (var position = (xOffset | 0) % (mosaicBlur | 0) | 0; (position | 0) < (xSize | 0); position = (position | 0) + 1 | 0) {
            if (((position | 0) % (mosaicBlur | 0) | 0) == 0) {
              currentPixel = layer[position | 0] | 0;
            }
            layer[position | 0] = currentPixel | 0;
          }
        }
      };
      GameBoyAdvanceMosaicRenderer.prototype.getMosaicYOffset = function(line) {
        line = line | 0;
        return (line | 0) % ((this.BGMosaicVSize | 0) + 1 | 0) | 0;
      };
      GameBoyAdvanceMosaicRenderer.prototype.getOBJMosaicYOffset = function(line) {
        line = line | 0;
        return (line | 0) % ((this.OBJMosaicVSize | 0) + 1 | 0) | 0;
      };
      GameBoyAdvanceMosaicRenderer.prototype.writeMOSAIC0 = function(data) {
        data = data | 0;
        this.BGMosaicHSize = data & 15;
        this.BGMosaicVSize = data >> 4;
      };
      GameBoyAdvanceMosaicRenderer.prototype.writeMOSAIC1 = function(data) {
        data = data | 0;
        this.OBJMosaicHSize = data & 15;
        this.OBJMosaicVSize = data >> 4;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceOBJRendererCore.js
  var require_GameBoyAdvanceOBJRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceOBJRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceOBJRenderer;
      var TypedArrayShim = require_TypedArrayShim();
      var IS_LITTLE_ENDIAN = TypedArrayShim.IS_LITTLE_ENDIAN;
      var HAS_VIEWS_SUPPORT = TypedArrayShim.HAS_VIEWS_SUPPORT;
      var getInt32Array = TypedArrayShim.getInt32Array;
      var getInt32View = TypedArrayShim.getInt32View;
      var getUint8Array = TypedArrayShim.getUint8Array;
      var getUint16View = TypedArrayShim.getUint16View;
      function GameBoyAdvanceOBJRenderer(gfx) {
        this.gfx = gfx;
        this.paletteOBJ256 = this.gfx.paletteOBJ256;
        this.paletteOBJ16 = this.gfx.paletteOBJ16;
        this.VRAM = this.gfx.VRAM;
        this.initialize();
      }
      GameBoyAdvanceOBJRenderer.prototype.lookupXSize = [
        //Square:
        8,
        16,
        32,
        64,
        //Vertical Rectangle:
        16,
        32,
        32,
        64,
        //Horizontal Rectangle:
        8,
        8,
        16,
        32
      ];
      GameBoyAdvanceOBJRenderer.prototype.lookupYSize = [
        //Square:
        8,
        16,
        32,
        64,
        //Vertical Rectangle:
        8,
        8,
        16,
        32,
        //Horizontal Rectangle:
        16,
        32,
        32,
        64
      ];
      if (HAS_VIEWS_SUPPORT) {
        if (typeof getUint8Array(1).fill == "function") {
          GameBoyAdvanceOBJRenderer.prototype.initialize = function() {
            this.VRAM32 = this.gfx.VRAM32;
            this.OAMRAM = getUint8Array(1024);
            this.OAMRAM16 = getUint16View(this.OAMRAM);
            this.OAMRAM32 = getInt32View(this.OAMRAM);
            this.scratchBuffer = getInt32Array(240);
            this.scratchWindowBuffer = getInt32Array(240);
            this.scratchOBJBuffer = getInt32Array(128);
            this.targetBuffer = null;
            this.OBJMatrixParameters = getInt32Array(128);
            this.initializeOAMTable();
          };
          GameBoyAdvanceOBJRenderer.prototype.clearScratch = function() {
            this.targetBuffer.fill(58720256);
          };
        } else {
          GameBoyAdvanceOBJRenderer.prototype.initialize = function() {
            this.VRAM32 = this.gfx.VRAM32;
            this.OAMRAM = getUint8Array(1024);
            this.OAMRAM16 = getUint16View(this.OAMRAM);
            this.OAMRAM32 = getInt32View(this.OAMRAM);
            this.scratchBuffer = getInt32Array(240);
            this.scratchWindowBuffer = getInt32Array(240);
            this.scratchOBJBuffer = getInt32Array(128);
            this.clearingBuffer = getInt32Array(240);
            this.targetBuffer = null;
            this.initializeClearingBuffer();
            this.OBJMatrixParameters = getInt32Array(128);
            this.initializeOAMTable();
          };
          GameBoyAdvanceOBJRenderer.prototype.clearScratch = function() {
            this.targetBuffer.set(this.clearingBuffer);
          };
          GameBoyAdvanceOBJRenderer.prototype.initializeClearingBuffer = function() {
            for (var position = 0; position < 240; ++position) {
              this.clearingBuffer[position] = 58720256;
            }
          };
        }
      } else {
        GameBoyAdvanceOBJRenderer.prototype.initialize = function() {
          this.OAMRAM = getUint8Array(1024);
          this.scratchBuffer = getInt32Array(240);
          this.scratchWindowBuffer = getInt32Array(240);
          this.scratchOBJBuffer = getInt32Array(128);
          this.targetBuffer = null;
          this.OBJMatrixParameters = getInt32Array(128);
          this.initializeOAMTable();
        };
        GameBoyAdvanceOBJRenderer.prototype.clearScratch = function() {
          for (var position = 0; position < 240; ++position) {
            this.targetBuffer[position] = 58720256;
          }
        };
      }
      GameBoyAdvanceOBJRenderer.prototype.initializeOAMTable = function() {
        this.OAMTable = [];
        for (var spriteNumber = 0; (spriteNumber | 0) < 128; spriteNumber = (spriteNumber | 0) + 1 | 0) {
          this.OAMTable[spriteNumber | 0] = this.makeOAMAttributeTable();
        }
      };
      if (typeof TypedObject == "object" && typeof TypedObject.StructType == "object") {
        GameBoyAdvanceOBJRenderer.prototype.makeOAMAttributeTable = function() {
          return new TypedObject.StructType({
            ycoord: TypedObject.int32,
            matrix2D: TypedObject.int32,
            doubleSizeOrDisabled: TypedObject.int32,
            mode: TypedObject.int32,
            mosaic: TypedObject.int32,
            monolithicPalette: TypedObject.int32,
            shape: TypedObject.int32,
            xcoord: TypedObject.int32,
            matrixParameters: TypedObject.int32,
            horizontalFlip: TypedObject.int32,
            verticalFlip: TypedObject.int32,
            size: TypedObject.int32,
            tileNumber: TypedObject.int32,
            priority: TypedObject.int32,
            paletteNumber: TypedObject.int32
          });
        };
      } else {
        GameBoyAdvanceOBJRenderer.prototype.makeOAMAttributeTable = function() {
          return {
            ycoord: 0,
            matrix2D: 0,
            doubleSizeOrDisabled: 0,
            mode: 0,
            mosaic: 0,
            monolithicPalette: 0,
            shape: 0,
            xcoord: 0,
            matrixParameters: 0,
            horizontalFlip: 0,
            verticalFlip: 0,
            size: 0,
            tileNumber: 0,
            priority: 0,
            paletteNumber: 0
          };
        };
      }
      GameBoyAdvanceOBJRenderer.prototype.renderScanLine = function(line) {
        this.targetBuffer = this.scratchBuffer;
        this.performRenderLoop(line | 0, false);
        return this.scratchBuffer;
      };
      GameBoyAdvanceOBJRenderer.prototype.renderWindowScanLine = function(line) {
        this.targetBuffer = this.scratchWindowBuffer;
        this.performRenderLoop(line | 0, true);
        return this.scratchWindowBuffer;
      };
      GameBoyAdvanceOBJRenderer.prototype.performRenderLoop = function(line, isOBJWindow) {
        this.clearScratch();
        for (var objNumber = 0; objNumber < 128; ++objNumber) {
          this.renderSprite(line | 0, this.OAMTable[objNumber], isOBJWindow);
        }
      };
      GameBoyAdvanceOBJRenderer.prototype.renderSprite = function(line, sprite, isOBJWindow) {
        line = line | 0;
        if (this.isDrawable(sprite, isOBJWindow)) {
          if ((sprite.mosaic | 0) != 0) {
            line = (line | 0) - (this.gfx.mosaicRenderer.getOBJMosaicYOffset(line | 0) | 0) | 0;
          }
          var xSize = this.lookupXSize[sprite.shape << 2 | sprite.size] << (sprite.doubleSizeOrDisabled | 0);
          var ySize = this.lookupYSize[sprite.shape << 2 | sprite.size] << (sprite.doubleSizeOrDisabled | 0);
          var ycoord = sprite.ycoord | 0;
          var yOffset = (line | 0) - (ycoord | 0) | 0;
          if ((yOffset | 0) < 0 || ((ycoord | 0) + (ySize | 0) | 0) > 256) {
            yOffset = (yOffset | 0) + 256 | 0;
          }
          ySize = (ySize | 0) - 1 | 0;
          if ((yOffset & ySize) == (yOffset | 0)) {
            if ((sprite.matrix2D | 0) != 0) {
              this.renderMatrixSprite(sprite, xSize | 0, (ySize | 0) + 1 | 0, yOffset | 0);
            } else {
              this.renderNormalSprite(sprite, xSize | 0, ySize | 0, yOffset | 0);
            }
            if ((sprite.mode | 0) == 1) {
              this.markSemiTransparent(xSize | 0);
            }
            this.outputSpriteToScratch(sprite, xSize | 0);
          }
        }
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceOBJRenderer.prototype.renderMatrixSprite = function(sprite, xSize, ySize, yOffset) {
          xSize = xSize | 0;
          ySize = ySize | 0;
          yOffset = yOffset | 0;
          var xDiff = -(xSize >> 1) | 0;
          var yDiff = (yOffset | 0) - (ySize >> 1) | 0;
          var xSizeOriginal = xSize >> (sprite.doubleSizeOrDisabled | 0);
          var xSizeFixed = xSizeOriginal << 8;
          var ySizeOriginal = ySize >> (sprite.doubleSizeOrDisabled | 0);
          var ySizeFixed = ySizeOriginal << 8;
          var dx = this.OBJMatrixParameters[sprite.matrixParameters | 0] | 0;
          var dmx = this.OBJMatrixParameters[sprite.matrixParameters | 1] | 0;
          var dy = this.OBJMatrixParameters[sprite.matrixParameters | 2] | 0;
          var dmy = this.OBJMatrixParameters[sprite.matrixParameters | 3] | 0;
          var pa = Math.imul(dx | 0, xDiff | 0) | 0;
          var pb = Math.imul(dmx | 0, yDiff | 0) | 0;
          var pc = Math.imul(dy | 0, xDiff | 0) | 0;
          var pd = Math.imul(dmy | 0, yDiff | 0) | 0;
          var x = (pa | 0) + (pb | 0) | 0;
          x = (x | 0) + (xSizeFixed >> 1) | 0;
          var y = (pc | 0) + (pd | 0) | 0;
          y = (y | 0) + (ySizeFixed >> 1) | 0;
          for (var position = 0; (position | 0) < (xSize | 0); position = position + 1 | 0, x = (x | 0) + (dx | 0) | 0, y = (y | 0) + (dy | 0) | 0) {
            if ((x | 0) >= 0 && (y | 0) >= 0 && (x | 0) < (xSizeFixed | 0) && (y | 0) < (ySizeFixed | 0)) {
              this.scratchOBJBuffer[position | 0] = this.fetchMatrixPixel(sprite, x >> 8, y >> 8, xSizeOriginal | 0) | 0;
            } else {
              this.scratchOBJBuffer[position | 0] = 58720256;
            }
          }
        };
      } else {
        GameBoyAdvanceOBJRenderer.prototype.renderMatrixSprite = function(sprite, xSize, ySize, yOffset) {
          var xDiff = -(xSize >> 1);
          var yDiff = yOffset - (ySize >> 1);
          var xSizeOriginal = xSize >> sprite.doubleSizeOrDisabled;
          var xSizeFixed = xSizeOriginal << 8;
          var ySizeOriginal = ySize >> sprite.doubleSizeOrDisabled;
          var ySizeFixed = ySizeOriginal << 8;
          var dx = this.OBJMatrixParameters[sprite.matrixParameters];
          var dmx = this.OBJMatrixParameters[sprite.matrixParameters | 1];
          var dy = this.OBJMatrixParameters[sprite.matrixParameters | 2];
          var dmy = this.OBJMatrixParameters[sprite.matrixParameters | 3];
          var pa = dx * xDiff;
          var pb = dmx * yDiff;
          var pc = dy * xDiff;
          var pd = dmy * yDiff;
          var x = pa + pb + (xSizeFixed >> 1);
          var y = pc + pd + (ySizeFixed >> 1);
          for (var position = 0; position < xSize; ++position, x += dx, y += dy) {
            if (x >= 0 && y >= 0 && x < xSizeFixed && y < ySizeFixed) {
              this.scratchOBJBuffer[position] = this.fetchMatrixPixel(sprite, x >> 8, y >> 8, xSizeOriginal);
            } else {
              this.scratchOBJBuffer[position] = 58720256;
            }
          }
        };
      }
      GameBoyAdvanceOBJRenderer.prototype.fetchMatrixPixel = function(sprite, x, y, xSize) {
        x = x | 0;
        y = y | 0;
        xSize = xSize | 0;
        if ((sprite.monolithicPalette | 0) != 0) {
          var address = this.tileNumberToAddress256(sprite.tileNumber | 0, xSize | 0, y | 0) | 0;
          address = (address | 0) + (this.tileRelativeAddressOffset(x | 0, y | 0) | 0) | 0;
          return this.paletteOBJ256[this.VRAM[address | 0] | 0] | 0;
        } else {
          var address = this.tileNumberToAddress16(sprite.tileNumber | 0, xSize | 0, y | 0) | 0;
          address = (address | 0) + (this.tileRelativeAddressOffset(x | 0, y | 0) >> 1 | 0) | 0;
          if ((x & 1) == 0) {
            return this.paletteOBJ16[sprite.paletteNumber | this.VRAM[address | 0] & 15] | 0;
          } else {
            return this.paletteOBJ16[sprite.paletteNumber | this.VRAM[address | 0] >> 4] | 0;
          }
        }
      };
      GameBoyAdvanceOBJRenderer.prototype.tileRelativeAddressOffset = function(x, y) {
        x = x | 0;
        y = y | 0;
        return ((y & 7) + (x & -8) << 3) + (x & 7) | 0;
      };
      GameBoyAdvanceOBJRenderer.prototype.renderNormalSprite = function(sprite, xSize, ySize, yOffset) {
        xSize = xSize | 0;
        ySize = ySize | 0;
        yOffset = yOffset | 0;
        if ((sprite.verticalFlip | 0) != 0) {
          yOffset = (ySize | 0) - (yOffset | 0) | 0;
        }
        if ((sprite.monolithicPalette | 0) != 0) {
          var address = this.tileNumberToAddress256(sprite.tileNumber | 0, xSize | 0, yOffset | 0) | 0;
          address = (address | 0) + ((yOffset & 7) << 3) | 0;
          this.render256ColorPaletteSprite(address | 0, xSize | 0);
        } else {
          var address = this.tileNumberToAddress16(sprite.tileNumber | 0, xSize | 0, yOffset | 0) | 0;
          address = (address | 0) + ((yOffset & 7) << 2) | 0;
          this.render16ColorPaletteSprite(address | 0, xSize | 0, sprite.paletteNumber | 0);
        }
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceOBJRenderer.prototype.render256ColorPaletteSprite = function(address, xSize) {
          address = address >> 2;
          xSize = xSize | 0;
          var data = 0;
          for (var objBufferPos = 0; (objBufferPos | 0) < (xSize | 0); objBufferPos = (objBufferPos | 0) + 8 | 0) {
            data = this.VRAM32[address | 0] | 0;
            this.scratchOBJBuffer[objBufferPos | 0] = this.paletteOBJ256[data & 255] | 0;
            this.scratchOBJBuffer[objBufferPos | 1] = this.paletteOBJ256[data >> 8 & 255] | 0;
            this.scratchOBJBuffer[objBufferPos | 2] = this.paletteOBJ256[data >> 16 & 255] | 0;
            this.scratchOBJBuffer[objBufferPos | 3] = this.paletteOBJ256[data >>> 24] | 0;
            data = this.VRAM32[address | 1] | 0;
            this.scratchOBJBuffer[objBufferPos | 4] = this.paletteOBJ256[data & 255] | 0;
            this.scratchOBJBuffer[objBufferPos | 5] = this.paletteOBJ256[data >> 8 & 255] | 0;
            this.scratchOBJBuffer[objBufferPos | 6] = this.paletteOBJ256[data >> 16 & 255] | 0;
            this.scratchOBJBuffer[objBufferPos | 7] = this.paletteOBJ256[data >>> 24] | 0;
            address = (address | 0) + 16 | 0;
          }
        };
        GameBoyAdvanceOBJRenderer.prototype.render16ColorPaletteSprite = function(address, xSize, paletteOffset) {
          address = address >> 2;
          xSize = xSize | 0;
          paletteOffset = paletteOffset | 0;
          var data = 0;
          for (var objBufferPos = 0; (objBufferPos | 0) < (xSize | 0); objBufferPos = (objBufferPos | 0) + 8 | 0) {
            data = this.VRAM32[address | 0] | 0;
            this.scratchOBJBuffer[objBufferPos | 0] = this.paletteOBJ16[paletteOffset | data & 15] | 0;
            this.scratchOBJBuffer[objBufferPos | 1] = this.paletteOBJ16[paletteOffset | data >> 4 & 15] | 0;
            this.scratchOBJBuffer[objBufferPos | 2] = this.paletteOBJ16[paletteOffset | data >> 8 & 15] | 0;
            this.scratchOBJBuffer[objBufferPos | 3] = this.paletteOBJ16[paletteOffset | data >> 12 & 15] | 0;
            this.scratchOBJBuffer[objBufferPos | 4] = this.paletteOBJ16[paletteOffset | data >> 16 & 15] | 0;
            this.scratchOBJBuffer[objBufferPos | 5] = this.paletteOBJ16[paletteOffset | data >> 20 & 15] | 0;
            this.scratchOBJBuffer[objBufferPos | 6] = this.paletteOBJ16[paletteOffset | data >> 24 & 15] | 0;
            this.scratchOBJBuffer[objBufferPos | 7] = this.paletteOBJ16[paletteOffset | data >>> 28] | 0;
            address = (address | 0) + 8 | 0;
          }
        };
      } else {
        GameBoyAdvanceOBJRenderer.prototype.render256ColorPaletteSprite = function(address, xSize) {
          for (var objBufferPos = 0; objBufferPos < xSize; ) {
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ256[this.VRAM[address++]];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ256[this.VRAM[address++]];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ256[this.VRAM[address++]];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ256[this.VRAM[address++]];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ256[this.VRAM[address++]];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ256[this.VRAM[address++]];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ256[this.VRAM[address++]];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ256[this.VRAM[address]];
            address += 57;
          }
        };
        GameBoyAdvanceOBJRenderer.prototype.render16ColorPaletteSprite = function(address, xSize, paletteOffset) {
          var data = 0;
          for (var objBufferPos = 0; objBufferPos < xSize; ) {
            data = this.VRAM[address++];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ16[paletteOffset | data & 15];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ16[paletteOffset | data >> 4];
            data = this.VRAM[address++];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ16[paletteOffset | data & 15];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ16[paletteOffset | data >> 4];
            data = this.VRAM[address++];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ16[paletteOffset | data & 15];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ16[paletteOffset | data >> 4];
            data = this.VRAM[address];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ16[paletteOffset | data & 15];
            this.scratchOBJBuffer[objBufferPos++] = this.paletteOBJ16[paletteOffset | data >> 4];
            address += 29;
          }
        };
      }
      if (typeof Math.imul == "function") {
        GameBoyAdvanceOBJRenderer.prototype.tileNumberToAddress256 = function(tileNumber, xSize, yOffset) {
          tileNumber = tileNumber | 0;
          xSize = xSize | 0;
          yOffset = yOffset | 0;
          if (!this.gfx.VRAMOneDimensional) {
            tileNumber = (tileNumber & -2) + (Math.imul(yOffset >> 3, 32) | 0) | 0;
          } else {
            tileNumber = (tileNumber | 0) + (Math.imul(yOffset >> 3, xSize >> 2) | 0) | 0;
          }
          return (tileNumber << 5) + 65536 | 0;
        };
        GameBoyAdvanceOBJRenderer.prototype.tileNumberToAddress16 = function(tileNumber, xSize, yOffset) {
          tileNumber = tileNumber | 0;
          xSize = xSize | 0;
          yOffset = yOffset | 0;
          if (!this.gfx.VRAMOneDimensional) {
            tileNumber = (tileNumber | 0) + (Math.imul(yOffset >> 3, 32) | 0) | 0;
          } else {
            tileNumber = (tileNumber | 0) + (Math.imul(yOffset >> 3, xSize >> 3) | 0) | 0;
          }
          return (tileNumber << 5) + 65536 | 0;
        };
      } else {
        GameBoyAdvanceOBJRenderer.prototype.tileNumberToAddress256 = function(tileNumber, xSize, yOffset) {
          if (!this.gfx.VRAMOneDimensional) {
            tileNumber &= -2;
            tileNumber += (yOffset >> 3) * 32;
          } else {
            tileNumber += (yOffset >> 3) * (xSize >> 2);
          }
          return (tileNumber << 5) + 65536;
        };
        GameBoyAdvanceOBJRenderer.prototype.tileNumberToAddress16 = function(tileNumber, xSize, yOffset) {
          if (!this.gfx.VRAMOneDimensional) {
            tileNumber += (yOffset >> 3) * 32;
          } else {
            tileNumber += (yOffset >> 3) * (xSize >> 3);
          }
          return (tileNumber << 5) + 65536;
        };
      }
      GameBoyAdvanceOBJRenderer.prototype.markSemiTransparent = function(xSize) {
        while (--xSize > -1) {
          this.scratchOBJBuffer[xSize | 0] |= 4194304;
        }
      };
      GameBoyAdvanceOBJRenderer.prototype.outputSpriteToScratch = function(sprite, xSize) {
        xSize = xSize | 0;
        var xcoord = sprite.xcoord | 0;
        if ((xcoord | 0) > (512 - (xSize | 0) | 0)) {
          xcoord = (xcoord | 0) - 512 | 0;
        }
        if ((sprite.mosaic | 0) != 0) {
          this.gfx.mosaicRenderer.renderOBJMosaicHorizontal(this.scratchOBJBuffer, xcoord | 0, xSize | 0);
        }
        var xcoordEnd = Math.min((xcoord | 0) + (xSize | 0) | 0, 240) | 0;
        var bitFlags = sprite.priority << 23 | 1048576;
        if ((sprite.horizontalFlip | 0) == 0 || (sprite.matrix2D | 0) != 0) {
          for (var xSource = 0; (xcoord | 0) < (xcoordEnd | 0); xcoord = (xcoord | 0) + 1 | 0, xSource = (xSource | 0) + 1 | 0) {
            var pixel = bitFlags | this.scratchOBJBuffer[xSource | 0];
            if ((xcoord | 0) > -1 && (pixel & 58720256) < (this.targetBuffer[xcoord | 0] & 58720256)) {
              this.targetBuffer[xcoord | 0] = pixel | 0;
            }
          }
        } else {
          for (var xSource = (xSize | 0) - 1 | 0; (xcoord | 0) < (xcoordEnd | 0); xcoord = (xcoord | 0) + 1 | 0, xSource = (xSource | 0) - 1 | 0) {
            var pixel = bitFlags | this.scratchOBJBuffer[xSource | 0];
            if ((xcoord | 0) > -1 && (pixel & 58720256) < (this.targetBuffer[xcoord | 0] & 58720256)) {
              this.targetBuffer[xcoord | 0] = pixel | 0;
            }
          }
        }
      };
      GameBoyAdvanceOBJRenderer.prototype.isDrawable = function(sprite, doWindowOBJ) {
        if ((sprite.mode | 0) < 2 && !doWindowOBJ || doWindowOBJ && (sprite.mode | 0) == 2) {
          if ((sprite.doubleSizeOrDisabled | 0) == 0 || (sprite.matrix2D | 0) != 0) {
            if ((sprite.shape | 0) < 3) {
              if ((this.gfx.BGMode | 0) < 3 || (sprite.tileNumber | 0) >= 512) {
                return true;
              }
            }
          }
        }
        return false;
      };
      GameBoyAdvanceOBJRenderer.prototype.readOAM = function(address) {
        return this.OAMRAM[address & 1023] | 0;
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceOBJRenderer.prototype.writeOAM16 = function(address, data) {
          address = address | 0;
          data = data | 0;
          var OAMTable = this.OAMTable[address >> 2];
          switch (address & 3) {
            //Attrib 0:
            case 0:
              OAMTable.ycoord = data & 255;
              OAMTable.matrix2D = data & 256;
              OAMTable.doubleSizeOrDisabled = (data & 512) >> 9;
              OAMTable.mode = data >> 10 & 3;
              OAMTable.mosaic = data & 4096;
              OAMTable.monolithicPalette = data & 8192;
              OAMTable.shape = data >> 14;
              break;
            //Attrib 1:
            case 1:
              OAMTable.xcoord = data & 511;
              OAMTable.matrixParameters = data >> 7 & 124;
              OAMTable.horizontalFlip = data & 4096;
              OAMTable.verticalFlip = data & 8192;
              OAMTable.size = data >> 14;
              break;
            //Attrib 2:
            case 2:
              OAMTable.tileNumber = data & 1023;
              OAMTable.priority = data >> 10 & 3;
              OAMTable.paletteNumber = data >> 8 & 240;
              break;
            //Scaling/Rotation Parameter:
            default:
              this.OBJMatrixParameters[address >> 2] = data << 16 >> 16;
          }
          this.OAMRAM16[address | 0] = data | 0;
        };
        GameBoyAdvanceOBJRenderer.prototype.writeOAM32 = function(address, data) {
          address = address | 0;
          data = data | 0;
          var OAMTable = this.OAMTable[address >> 1];
          if ((address & 1) == 0) {
            OAMTable.ycoord = data & 255;
            OAMTable.matrix2D = data & 256;
            OAMTable.doubleSizeOrDisabled = (data & 512) >> 9;
            OAMTable.mode = data >> 10 & 3;
            OAMTable.mosaic = data & 4096;
            OAMTable.monolithicPalette = data & 8192;
            OAMTable.shape = data >> 14 & 3;
            OAMTable.xcoord = data >> 16 & 511;
            OAMTable.matrixParameters = data >> 23 & 124;
            OAMTable.horizontalFlip = data & 268435456;
            OAMTable.verticalFlip = data & 536870912;
            OAMTable.size = data >> 30 & 3;
          } else {
            OAMTable.tileNumber = data & 1023;
            OAMTable.priority = data >> 10 & 3;
            OAMTable.paletteNumber = data >> 8 & 240;
            this.OBJMatrixParameters[address >> 1] = data >> 16;
          }
          this.OAMRAM32[address | 0] = data | 0;
        };
        GameBoyAdvanceOBJRenderer.prototype.readOAM16 = function(address) {
          address = address | 0;
          return this.OAMRAM16[address >> 1 & 511] | 0;
        };
        GameBoyAdvanceOBJRenderer.prototype.readOAM32 = function(address) {
          address = address | 0;
          return this.OAMRAM32[address >> 2 & 255] | 0;
        };
      } else {
        GameBoyAdvanceOBJRenderer.prototype.writeOAM16 = function(address, data) {
          address = address | 0;
          data = data | 0;
          var OAMTable = this.OAMTable[address >> 2];
          switch (address & 3) {
            //Attrib 0:
            case 0:
              OAMTable.ycoord = data & 255;
              OAMTable.matrix2D = data & 256;
              OAMTable.doubleSizeOrDisabled = (data & 512) >> 9;
              OAMTable.mode = data >> 10 & 3;
              OAMTable.mosaic = data & 4096;
              OAMTable.monolithicPalette = data & 8192;
              OAMTable.shape = data >> 14;
              break;
            //Attrib 1:
            case 1:
              OAMTable.xcoord = data & 511;
              OAMTable.matrixParameters = data >> 7 & 124;
              OAMTable.horizontalFlip = data & 4096;
              OAMTable.verticalFlip = data & 8192;
              OAMTable.size = data >> 14;
              break;
            //Attrib 2:
            case 2:
              OAMTable.tileNumber = data & 1023;
              OAMTable.priority = data >> 10 & 3;
              OAMTable.paletteNumber = data >> 8 & 240;
              break;
            //Scaling/Rotation Parameter:
            default:
              this.OBJMatrixParameters[address >> 2] = data << 16 >> 16;
          }
          address = address << 1;
          this.OAMRAM[address | 0] = data & 255;
          this.OAMRAM[address | 1] = data >> 8;
        };
        GameBoyAdvanceOBJRenderer.prototype.writeOAM32 = function(address, data) {
          address = address | 0;
          data = data | 0;
          var OAMTable = this.OAMTable[address >> 1];
          if ((address & 1) == 0) {
            OAMTable.ycoord = data & 255;
            OAMTable.matrix2D = data & 256;
            OAMTable.doubleSizeOrDisabled = (data & 512) >> 9;
            OAMTable.mode = data >> 10 & 3;
            OAMTable.mosaic = data & 4096;
            OAMTable.monolithicPalette = data & 8192;
            OAMTable.shape = data >> 14 & 3;
            OAMTable.xcoord = data >> 16 & 511;
            OAMTable.matrixParameters = data >> 23 & 124;
            OAMTable.horizontalFlip = data & 268435456;
            OAMTable.verticalFlip = data & 536870912;
            OAMTable.size = data >> 30 & 3;
          } else {
            OAMTable.tileNumber = data & 1023;
            OAMTable.priority = data >> 10 & 3;
            OAMTable.paletteNumber = data >> 8 & 240;
            this.OBJMatrixParameters[address >> 1] = data >> 16;
          }
          address = address << 2;
          this.OAMRAM[address | 0] = data & 255;
          this.OAMRAM[address | 1] = data >> 8 & 255;
          this.OAMRAM[address | 2] = data >> 16 & 255;
          this.OAMRAM[address | 3] = data >>> 24;
        };
        GameBoyAdvanceOBJRenderer.prototype.readOAM16 = function(address) {
          return this.OAMRAM[address] | this.OAMRAM[address | 1] << 8;
        };
        GameBoyAdvanceOBJRenderer.prototype.readOAM32 = function(address) {
          return this.OAMRAM[address] | this.OAMRAM[address | 1] << 8 | this.OAMRAM[address | 2] << 16 | this.OAMRAM[address | 3] << 24;
        };
      }
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceOBJWindowRendererCore.js
  var require_GameBoyAdvanceOBJWindowRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceOBJWindowRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceOBJWindowRenderer;
      function GameBoyAdvanceOBJWindowRenderer(gfx) {
        this.gfx = gfx;
        this.WINOBJOutside = 0;
        this.preprocess();
      }
      GameBoyAdvanceOBJWindowRenderer.prototype.renderNormalScanLine = function(line, lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer) {
        OBJBuffer = (this.WINOBJOutside & 16) == 16 ? OBJBuffer : null;
        BG0Buffer = (this.WINOBJOutside & 1) == 1 ? BG0Buffer : null;
        BG1Buffer = (this.WINOBJOutside & 2) == 2 ? BG1Buffer : null;
        BG2Buffer = (this.WINOBJOutside & 4) == 4 ? BG2Buffer : null;
        BG3Buffer = (this.WINOBJOutside & 8) == 8 ? BG3Buffer : null;
        var layerStack = this.gfx.compositor.cleanLayerStack(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
        var stackDepth = layerStack.length | 0;
        var stackIndex = 0;
        var OBJWindowBuffer = this.gfx.objRenderer.renderWindowScanLine(line | 0);
        for (var pixelPosition = 0, currentPixel = 0, workingPixel = 0, lowerPixel = 0; (pixelPosition | 0) < 240; pixelPosition = (pixelPosition | 0) + 1 | 0) {
          if ((OBJWindowBuffer[pixelPosition] | 0) < 58720256) {
            lowerPixel = currentPixel = this.gfx.backdrop | 0;
            for (stackIndex = 0; (stackIndex | 0) < (stackDepth | 0); stackIndex = (stackIndex | 0) + 1 | 0) {
              workingPixel = layerStack[stackIndex | 0][pixelPosition | 0] | 0;
              if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
                lowerPixel = currentPixel | 0;
                currentPixel = workingPixel | 0;
              } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
                lowerPixel = workingPixel | 0;
              }
            }
            if ((currentPixel & 4194304) == 0) {
              lineBuffer[pixelPosition | 0] = currentPixel | 0;
            } else {
              lineBuffer[pixelPosition | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
            }
          }
        }
      };
      GameBoyAdvanceOBJWindowRenderer.prototype.renderScanLineWithEffects = function(line, lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer) {
        if ((this.gfx.display & 224) > 0) {
          OBJBuffer = (this.WINOBJOutside & 16) == 16 ? OBJBuffer : null;
          BG0Buffer = (this.WINOBJOutside & 1) == 1 ? BG0Buffer : null;
          BG1Buffer = (this.WINOBJOutside & 2) == 2 ? BG1Buffer : null;
          BG2Buffer = (this.WINOBJOutside & 4) == 4 ? BG2Buffer : null;
          BG3Buffer = (this.WINOBJOutside & 8) == 8 ? BG3Buffer : null;
        }
        var layerStack = this.gfx.compositor.cleanLayerStack(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
        var stackDepth = layerStack.length | 0;
        var stackIndex = 0;
        var OBJWindowBuffer = this.gfx.objRenderer.renderWindowScanLine(line | 0);
        for (var pixelPosition = 0, currentPixel = 0, workingPixel = 0, lowerPixel = 0; (pixelPosition | 0) < 240; pixelPosition = (pixelPosition | 0) + 1 | 0) {
          if ((OBJWindowBuffer[pixelPosition | 0] | 0) < 58720256) {
            lowerPixel = currentPixel = this.gfx.backdrop | 0;
            for (stackIndex = 0; (stackIndex | 0) < (stackDepth | 0); stackIndex = (stackIndex | 0) + 1 | 0) {
              workingPixel = layerStack[stackIndex | 0][pixelPosition | 0] | 0;
              if ((workingPixel & 58720256) <= (currentPixel & 25165824)) {
                lowerPixel = currentPixel | 0;
                currentPixel = workingPixel | 0;
              } else if ((workingPixel & 58720256) <= (lowerPixel & 25165824)) {
                lowerPixel = workingPixel | 0;
              }
            }
            if ((currentPixel & 4194304) == 0) {
              lineBuffer[pixelPosition | 0] = this.gfx.colorEffectsRenderer.process(lowerPixel | 0, currentPixel | 0) | 0;
            } else {
              lineBuffer[pixelPosition | 0] = this.gfx.colorEffectsRenderer.processOAMSemiTransparent(lowerPixel | 0, currentPixel | 0) | 0;
            }
          }
        }
      };
      GameBoyAdvanceOBJWindowRenderer.prototype.writeWINOUT1 = function(data) {
        data = data | 0;
        this.WINOBJOutside = data & 63;
        this.preprocess();
      };
      GameBoyAdvanceOBJWindowRenderer.prototype.readWINOUT1 = function() {
        return this.WINOBJOutside | 0;
      };
      GameBoyAdvanceOBJWindowRenderer.prototype.preprocess = function() {
        this.renderScanLine = (this.WINOBJOutside & 32) == 32 ? this.renderScanLineWithEffects : this.renderNormalScanLine;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceWindowRendererCore.js
  var require_GameBoyAdvanceWindowRendererCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/graphics/GameBoyAdvanceWindowRendererCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceWindowRenderer;
      var GameBoyAdvanceCompositor = require_GameBoyAdvanceCompositorCore();
      function GameBoyAdvanceWindowRenderer(gfx) {
        this.gfx = gfx;
        this.WINXCoordRight = 0;
        this.WINXCoordLeft = 0;
        this.WINYCoordBottom = 0;
        this.WINYCoordTop = 0;
        this.WINBG0 = false;
        this.WINBG1 = false;
        this.WINBG2 = false;
        this.WINBG3 = false;
        this.WINOBJ = false;
        this.WINEffects = false;
        this.compositor = new GameBoyAdvanceCompositor(this.gfx);
        this.preprocess();
      }
      GameBoyAdvanceWindowRenderer.prototype.renderScanLine = function(line, lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer) {
        line = line | 0;
        OBJBuffer = this.WINOBJ ? OBJBuffer : null;
        BG0Buffer = this.WINBG0 ? BG0Buffer : null;
        BG1Buffer = this.WINBG1 ? BG1Buffer : null;
        BG2Buffer = this.WINBG2 ? BG2Buffer : null;
        BG3Buffer = this.WINBG3 ? BG3Buffer : null;
        if (this.checkYRange(line | 0)) {
          var right = this.WINXCoordRight | 0;
          var left = this.WINXCoordLeft | 0;
          if ((left | 0) <= (right | 0)) {
            left = Math.min(left | 0, 240) | 0;
            right = Math.min(right | 0, 240) | 0;
            this.compositor.renderScanLine(left | 0, right | 0, lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
          } else {
            left = Math.min(left | 0, 240) | 0;
            right = Math.min(right | 0, 240) | 0;
            this.compositor.renderScanLine(0, right | 0, lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
            this.compositor.renderScanLine(left | 0, 240, lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
          }
        }
      };
      GameBoyAdvanceWindowRenderer.prototype.checkYRange = function(line) {
        line = line | 0;
        var bottom = this.WINYCoordBottom | 0;
        var top = this.WINYCoordTop | 0;
        if ((top | 0) <= (bottom | 0)) {
          return (line | 0) >= (top | 0) && (line | 0) < (bottom | 0);
        } else {
          return (line | 0) < (top | 0) || (line | 0) >= (bottom | 0);
        }
      };
      GameBoyAdvanceWindowRenderer.prototype.preprocess = function() {
        this.compositor.preprocess(this.WINEffects);
      };
      GameBoyAdvanceWindowRenderer.prototype.writeWINH0 = function(data) {
        this.WINXCoordRight = data | 0;
      };
      GameBoyAdvanceWindowRenderer.prototype.writeWINH1 = function(data) {
        this.WINXCoordLeft = data | 0;
      };
      GameBoyAdvanceWindowRenderer.prototype.writeWINV0 = function(data) {
        this.WINYCoordBottom = data | 0;
      };
      GameBoyAdvanceWindowRenderer.prototype.writeWINV1 = function(data) {
        this.WINYCoordTop = data | 0;
      };
      GameBoyAdvanceWindowRenderer.prototype.writeWININ = function(data) {
        data = data | 0;
        this.WINBG0 = (data & 1) == 1;
        this.WINBG1 = (data & 2) == 2;
        this.WINBG2 = (data & 4) == 4;
        this.WINBG3 = (data & 8) == 8;
        this.WINOBJ = (data & 16) == 16;
        this.WINEffects = (data & 32) == 32;
        this.preprocess();
      };
      GameBoyAdvanceWindowRenderer.prototype.readWININ = function() {
        return (this.WINBG0 ? 1 : 0) | (this.WINBG1 ? 2 : 0) | (this.WINBG2 ? 4 : 0) | (this.WINBG3 ? 8 : 0) | (this.WINOBJ ? 16 : 0) | (this.WINEffects ? 32 : 0);
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceGraphicsCore.js
  var require_GameBoyAdvanceGraphicsCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceGraphicsCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceGraphics;
      var GameBoyAdvanceIO = require_GameBoyAdvanceIOCore();
      var TypedArrayShim = require_TypedArrayShim();
      var getUint8Array = TypedArrayShim.getUint8Array;
      var getUint16View = TypedArrayShim.getUint16View;
      var getInt32Array = TypedArrayShim.getInt32Array;
      var getInt32View = TypedArrayShim.getInt32View;
      var IS_LITTLE_ENDIAN = TypedArrayShim.IS_LITTLE_ENDIAN;
      var GameBoyAdvanceAffineBGRenderer = require_GameBoyAdvanceAffineBGRendererCore();
      var GameBoyAdvanceBG2FrameBufferRenderer = require_GameBoyAdvanceBG2FrameBufferRendererCore();
      var GameBoyAdvanceBGMatrixRenderer = require_GameBoyAdvanceBGMatrixRendererCore();
      var GameBoyAdvanceBGTEXTRenderer = require_GameBoyAdvanceBGTEXTRendererCore();
      var GameBoyAdvanceColorEffectsRenderer = require_GameBoyAdvanceColorEffectsRendererCore();
      var GameBoyAdvanceCompositor = require_GameBoyAdvanceCompositorCore();
      var GameBoyAdvanceMode0Renderer = require_GameBoyAdvanceMode0RendererCore();
      var GameBoyAdvanceMode1Renderer = require_GameBoyAdvanceMode1RendererCore();
      var GameBoyAdvanceMode2Renderer = require_GameBoyAdvanceMode2RendererCore();
      var GameBoyAdvanceModeFrameBufferRenderer = require_GameBoyAdvanceModeFrameBufferRendererCore();
      var GameBoyAdvanceMosaicRenderer = require_GameBoyAdvanceMosaicRendererCore();
      var GameBoyAdvanceOBJRenderer = require_GameBoyAdvanceOBJRendererCore();
      var GameBoyAdvanceOBJWindowRenderer = require_GameBoyAdvanceOBJWindowRendererCore();
      var GameBoyAdvanceWindowRenderer = require_GameBoyAdvanceWindowRendererCore();
      function GameBoyAdvanceGraphics(IOCore) {
        this.IOCore = IOCore;
        this.coreExposed = IOCore.coreExposed;
      }
      GameBoyAdvanceGraphics.prototype.initialize = function() {
        this.dma = this.IOCore.dma;
        this.dmaChannel3 = this.IOCore.dmaChannel3;
        this.irq = this.IOCore.irq;
        this.wait = this.IOCore.wait;
        this.initializeIO();
        this.initializeRenderer();
      };
      GameBoyAdvanceGraphics.prototype.initializeIO = function() {
        this.BGMode = 0;
        this.HBlankIntervalFree = false;
        this.VRAMOneDimensional = false;
        this.forcedBlank = true;
        this.display = 0;
        this.greenSwap = false;
        this.inVBlank = false;
        this.inHBlank = false;
        this.renderedScanLine = false;
        this.VCounterMatch = false;
        this.IRQVBlank = false;
        this.IRQHBlank = false;
        this.IRQVCounter = false;
        this.VCounter = 0;
        this.currentScanLine = 0;
        this.BGPriority = getUint8Array(4);
        this.BGCharacterBaseBlock = getUint8Array(4);
        this.BGMosaic = [false, false, false, false];
        this.BGPalette256 = [false, false, false, false];
        this.BGScreenBaseBlock = getUint8Array(4);
        this.BGDisplayOverflow = [false, false];
        this.BGScreenSize = getUint8Array(4);
        this.WINOutside = 0;
        this.paletteRAM = getUint8Array(1024);
        this.VRAM = getUint8Array(98304);
        this.VRAM16 = getUint16View(this.VRAM);
        this.VRAM32 = getInt32View(this.VRAM);
        this.paletteRAM16 = getUint16View(this.paletteRAM);
        this.paletteRAM32 = getInt32View(this.paletteRAM);
        this.lineBuffer = getInt32Array(240);
        this.frameBuffer = this.coreExposed.frameBuffer;
        this.LCDTicks = 0;
        this.totalLinesPassed = 0;
        this.queuedScanLines = 0;
        this.lastUnrenderedLine = 0;
        if (!this.IOCore.BIOSFound || this.IOCore.settings.SKIPBoot) {
          this.currentScanLine = 124;
          this.lastUnrenderedLine = 124;
        }
        this.backdrop = 60817408;
      };
      GameBoyAdvanceGraphics.prototype.initializeRenderer = function() {
        this.initializePaletteStorage();
        this.compositor = new GameBoyAdvanceCompositor(this);
        this.bg0Renderer = new GameBoyAdvanceBGTEXTRenderer(this, 0);
        this.bg1Renderer = new GameBoyAdvanceBGTEXTRenderer(this, 1);
        this.bg2TextRenderer = new GameBoyAdvanceBGTEXTRenderer(this, 2);
        this.bg3TextRenderer = new GameBoyAdvanceBGTEXTRenderer(this, 3);
        this.bgAffineRenderer = [
          new GameBoyAdvanceAffineBGRenderer(this, 2),
          new GameBoyAdvanceAffineBGRenderer(this, 3)
        ];
        this.bg2MatrixRenderer = new GameBoyAdvanceBGMatrixRenderer(this, 2);
        this.bg3MatrixRenderer = new GameBoyAdvanceBGMatrixRenderer(this, 3);
        this.bg2FrameBufferRenderer = new GameBoyAdvanceBG2FrameBufferRenderer(this);
        this.objRenderer = new GameBoyAdvanceOBJRenderer(this);
        this.window0Renderer = new GameBoyAdvanceWindowRenderer(this);
        this.window1Renderer = new GameBoyAdvanceWindowRenderer(this);
        this.objWindowRenderer = new GameBoyAdvanceOBJWindowRenderer(this);
        this.mosaicRenderer = new GameBoyAdvanceMosaicRenderer(this);
        this.colorEffectsRenderer = new GameBoyAdvanceColorEffectsRenderer();
        this.mode0Renderer = new GameBoyAdvanceMode0Renderer(this);
        this.mode1Renderer = new GameBoyAdvanceMode1Renderer(this);
        this.mode2Renderer = new GameBoyAdvanceMode2Renderer(this);
        this.modeFrameBufferRenderer = new GameBoyAdvanceModeFrameBufferRenderer(this);
        this.compositorPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.initializePaletteStorage = function() {
        this.palette256 = getInt32Array(256);
        this.palette256[0] = 58720256;
        this.paletteOBJ256 = getInt32Array(256);
        this.paletteOBJ256[0] = 58720256;
        this.palette16 = getInt32Array(256);
        this.paletteOBJ16 = getInt32Array(256);
        for (var index = 0; index < 16; ++index) {
          this.palette16[index << 4] = 58720256;
          this.paletteOBJ16[index << 4] = 58720256;
        }
      };
      GameBoyAdvanceGraphics.prototype.addClocks = function(clocks) {
        clocks = clocks | 0;
        this.LCDTicks = (this.LCDTicks | 0) + (clocks | 0) | 0;
        this.clockLCDState();
      };
      GameBoyAdvanceGraphics.prototype.clockLCDState = function() {
        if ((this.LCDTicks | 0) >= 960) {
          this.clockScanLine();
          this.clockLCDStatePostRender();
        }
      };
      GameBoyAdvanceGraphics.prototype.clockScanLine = function() {
        if (!this.renderedScanLine) {
          this.renderedScanLine = true;
          if ((this.currentScanLine | 0) < 160) {
            this.incrementScanLineQueue();
          }
        }
      };
      GameBoyAdvanceGraphics.prototype.clockLCDStatePostRender = function() {
        if ((this.LCDTicks | 0) >= 1006) {
          this.updateHBlank();
          if ((this.LCDTicks | 0) >= 1232) {
            this.clockLCDNextLine();
          }
        }
      };
      GameBoyAdvanceGraphics.prototype.clockLCDNextLine = function() {
        this.renderedScanLine = false;
        this.inHBlank = false;
        this.LCDTicks = (this.LCDTicks | 0) - 1232 | 0;
        this.currentScanLine = (this.currentScanLine | 0) + 1 | 0;
        if ((this.currentScanLine | 0) >= 160) {
          switch (this.currentScanLine | 0) {
            case 160:
              this.updateVBlankStart();
            //Update state for start of vblank.
            case 161:
              this.dmaChannel3.gfxDisplaySyncRequest();
              break;
            case 162:
              this.dmaChannel3.gfxDisplaySyncEnableCheck();
              break;
            case 227:
              this.inVBlank = false;
              break;
            case 228:
              this.currentScanLine = 0;
          }
        } else if ((this.currentScanLine | 0) > 1) {
          this.dmaChannel3.gfxDisplaySyncRequest();
        }
        this.checkVCounter();
        this.isRenderingCheckPreprocess();
        this.clockLCDState();
      };
      GameBoyAdvanceGraphics.prototype.updateHBlank = function() {
        if (!this.inHBlank) {
          this.inHBlank = true;
          if (this.IRQHBlank) {
            this.irq.requestIRQ(2);
          }
          if ((this.currentScanLine | 0) < 160) {
            this.dma.gfxHBlankRequest();
          }
          this.isRenderingCheckPreprocess();
        }
      };
      GameBoyAdvanceGraphics.prototype.checkVCounter = function() {
        if ((this.currentScanLine | 0) == (this.VCounter | 0)) {
          this.VCounterMatch = true;
          if (this.IRQVCounter) {
            this.irq.requestIRQ(4);
          }
        } else {
          this.VCounterMatch = false;
        }
      };
      GameBoyAdvanceGraphics.prototype.nextVBlankIRQEventTime = function() {
        var nextEventTime = -1;
        if (this.IRQVBlank) {
          nextEventTime = this.nextVBlankEventTime() | 0;
        }
        return nextEventTime | 0;
      };
      GameBoyAdvanceGraphics.prototype.nextHBlankEventTime = function() {
        var time = 1006 - (this.LCDTicks | 0) | 0;
        if ((time | 0) <= 0) {
          time = (time | 0) + 1232 | 0;
        }
        return time | 0;
      };
      GameBoyAdvanceGraphics.prototype.nextHBlankIRQEventTime = function() {
        var nextEventTime = -1;
        if (this.IRQHBlank) {
          nextEventTime = this.nextHBlankEventTime() | 0;
        }
        return nextEventTime | 0;
      };
      GameBoyAdvanceGraphics.prototype.nextVCounterIRQEventTime = function() {
        var nextEventTime = -1;
        if (this.IRQVCounter) {
          nextEventTime = this.nextVCounterEventTime() | 0;
        }
        return nextEventTime | 0;
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceGraphics.prototype.nextVBlankEventTime = function() {
          var nextEventTime = 160 - (this.currentScanLine | 0) | 0;
          if ((nextEventTime | 0) <= 0) {
            nextEventTime = (nextEventTime | 0) + 160 | 0;
          }
          nextEventTime = Math.imul(nextEventTime | 0, 1232) | 0;
          nextEventTime = (nextEventTime | 0) - (this.LCDTicks | 0) | 0;
          return nextEventTime | 0;
        };
        GameBoyAdvanceGraphics.prototype.nextHBlankDMAEventTime = function() {
          var nextEventTime = -1;
          if ((this.currentScanLine | 0) < 159 || !this.inHBlank && (this.currentScanLine | 0) == 159) {
            nextEventTime = this.nextHBlankEventTime() | 0;
          } else {
            nextEventTime = 228 - (this.currentScanLine | 0) | 0;
            nextEventTime = Math.imul(nextEventTime | 0, 1232) | 0;
            nextEventTime = (nextEventTime | 0) + 1006 | 0;
            nextEventTime = (nextEventTime | 0) - (this.LCDTicks | 0) | 0;
          }
          return nextEventTime | 0;
        };
        GameBoyAdvanceGraphics.prototype.nextVCounterEventTime = function() {
          var nextEventTime = -1;
          if ((this.VCounter | 0) <= 227) {
            nextEventTime = (this.VCounter | 0) - (this.currentScanLine | 0) | 0;
            if ((nextEventTime | 0) <= 0) {
              nextEventTime = (nextEventTime | 0) + 228 | 0;
            }
            nextEventTime = Math.imul(nextEventTime | 0, 1232) | 0;
            nextEventTime = (nextEventTime | 0) - (this.LCDTicks | 0) | 0;
          }
          return nextEventTime | 0;
        };
        GameBoyAdvanceGraphics.prototype.nextDisplaySyncEventTime = function() {
          var nextEventTime = 0;
          if ((this.currentScanLine | 0) == 0) {
            nextEventTime = 2464 - (this.LCDTicks | 0) | 0;
          } else if ((this.currentScanLine | 0) < 161) {
            nextEventTime = 1232 - (this.LCDTicks | 0) | 0;
          } else {
            nextEventTime = 230 - (this.currentScanLine | 0) | 0;
            nextEventTime = Math.imul(nextEventTime | 0, 1232) | 0;
            nextEventTime = (nextEventTime | 0) - (this.LCDTicks | 0) | 0;
          }
          return nextEventTime | 0;
        };
      } else {
        GameBoyAdvanceGraphics.prototype.nextVBlankEventTime = function() {
          return (387 - this.currentScanLine) % 228 * 1232 + 1232 - this.LCDTicks;
        };
        GameBoyAdvanceGraphics.prototype.nextHBlankDMAEventTime = function() {
          if (this.currentScanLine < 159 || !this.inHBlank && this.currentScanLine == 159) {
            return this.nextHBlankEventTime();
          } else {
            return (228 - this.currentScanLine) * 1232 + 1006 - this.LCDTicks;
          }
        };
        GameBoyAdvanceGraphics.prototype.nextVCounterEventTime = function() {
          if (this.VCounter <= 227) {
            return (227 + this.VCounter - this.currentScanLine) % 228 * 1232 + 1232 - this.LCDTicks;
          } else {
            return -1;
          }
        };
        GameBoyAdvanceGraphics.prototype.nextDisplaySyncEventTime = function() {
          if (this.currentScanLine == 0) {
            return 2464 - this.LCDTicks;
          } else if (this.currentScanLine < 161) {
            return 1232 - this.LCDTicks;
          } else {
            return (230 - this.currentScanLine) * 1232 - this.LCDTicks;
          }
        };
      }
      GameBoyAdvanceGraphics.prototype.updateVBlankStart = function() {
        this.inVBlank = true;
        if (this.IRQVBlank) {
          this.irq.requestIRQ(1);
        }
        if ((this.totalLinesPassed | 0) < 160) {
          this.graphicsJITVBlank();
          this.coreExposed.prepareFrame();
        }
        this.dma.gfxVBlankRequest();
      };
      GameBoyAdvanceGraphics.prototype.graphicsJIT = function() {
        this.totalLinesPassed = 0;
        this.graphicsJITScanlineGroup();
      };
      GameBoyAdvanceGraphics.prototype.graphicsJITVBlank = function() {
        this.totalLinesPassed = (this.totalLinesPassed | 0) + (this.queuedScanLines | 0) | 0;
        this.graphicsJITScanlineGroup();
      };
      GameBoyAdvanceGraphics.prototype.renderScanLine = function() {
        switch (this.BGMode | 0) {
          case 0:
            this.mode0Renderer.renderScanLine(this.lastUnrenderedLine | 0);
            break;
          case 1:
            this.mode1Renderer.renderScanLine(this.lastUnrenderedLine | 0);
            break;
          case 2:
            this.mode2Renderer.renderScanLine(this.lastUnrenderedLine | 0);
            break;
          default:
            this.modeFrameBufferRenderer.renderScanLine(this.lastUnrenderedLine | 0);
        }
        this.updateReferenceCounters();
      };
      GameBoyAdvanceGraphics.prototype.updateReferenceCounters = function() {
        if ((this.lastUnrenderedLine | 0) == 159) {
          this.bgAffineRenderer[0].resetReferenceCounters();
          this.bgAffineRenderer[1].resetReferenceCounters();
        } else {
          this.bgAffineRenderer[0].incrementReferenceCounters();
          this.bgAffineRenderer[1].incrementReferenceCounters();
        }
      };
      GameBoyAdvanceGraphics.prototype.graphicsJITScanlineGroup = function() {
        while ((this.queuedScanLines | 0) > 0) {
          this.renderScanLine();
          if ((this.lastUnrenderedLine | 0) < 159) {
            this.lastUnrenderedLine = (this.lastUnrenderedLine | 0) + 1 | 0;
          } else {
            this.lastUnrenderedLine = 0;
          }
          this.queuedScanLines = (this.queuedScanLines | 0) - 1 | 0;
        }
      };
      GameBoyAdvanceGraphics.prototype.incrementScanLineQueue = function() {
        if ((this.queuedScanLines | 0) < 160) {
          this.queuedScanLines = (this.queuedScanLines | 0) + 1 | 0;
        } else {
          if ((this.lastUnrenderedLine | 0) < 159) {
            this.lastUnrenderedLine = (this.lastUnrenderedLine | 0) + 1 | 0;
          } else {
            this.lastUnrenderedLine = 0;
          }
        }
      };
      GameBoyAdvanceGraphics.prototype.isRenderingCheckPreprocess = function() {
        var isInVisibleLines = !this.forcedBlank && !this.inVBlank;
        var isRendering = isInVisibleLines && !this.inHBlank ? 2 : 1;
        var isOAMRendering = isInVisibleLines && (!this.inHBlank || !this.HBlankIntervalFree) ? 2 : 1;
        this.wait.updateRenderStatus(isRendering | 0, isOAMRendering | 0);
      };
      GameBoyAdvanceGraphics.prototype.compositorPreprocess = function() {
        this.compositor.preprocess((this.WINOutside & 32) == 32 || (this.display & 224) == 0);
      };
      GameBoyAdvanceGraphics.prototype.compositeLayers = function(OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer) {
        if ((this.display & 224) > 0) {
          OBJBuffer = (this.WINOutside & 16) == 16 ? OBJBuffer : null;
          BG0Buffer = (this.WINOutside & 1) == 1 ? BG0Buffer : null;
          BG1Buffer = (this.WINOutside & 2) == 2 ? BG1Buffer : null;
          BG2Buffer = (this.WINOutside & 4) == 4 ? BG2Buffer : null;
          BG3Buffer = (this.WINOutside & 8) == 8 ? BG3Buffer : null;
        }
        this.compositor.renderScanLine(0, 240, this.lineBuffer, OBJBuffer, BG0Buffer, BG1Buffer, BG2Buffer, BG3Buffer);
      };
      GameBoyAdvanceGraphics.prototype.copyLineToFrameBuffer = function(line) {
        line = line | 0;
        var offsetStart = (line | 0) * 240 | 0;
        var position = 0;
        if (this.forcedBlank) {
          for (; (position | 0) < 240; offsetStart = (offsetStart | 0) + 1 | 0, position = (position | 0) + 1 | 0) {
            this.frameBuffer[offsetStart | 0] = 32767;
          }
        } else {
          if (!this.greenSwap) {
            if (!!this.frameBuffer.set) {
              this.frameBuffer.set(this.lineBuffer, offsetStart | 0);
            } else {
              for (; (position | 0) < 240; offsetStart = (offsetStart | 0) + 1 | 0, position = (position | 0) + 1 | 0) {
                this.frameBuffer[offsetStart | 0] = this.lineBuffer[position | 0] | 0;
              }
            }
          } else {
            var pixel0 = 0;
            var pixel1 = 0;
            while (position < 240) {
              pixel0 = this.lineBuffer[position | 0] | 0;
              position = (position | 0) + 1 | 0;
              pixel1 = this.lineBuffer[position | 0] | 0;
              position = (position | 0) + 1 | 0;
              this.frameBuffer[offsetStart | 0] = pixel0 & 31775 | pixel1 & 992;
              offsetStart = (offsetStart | 0) + 1 | 0;
              this.frameBuffer[offsetStart | 0] = pixel1 & 31775 | pixel0 & 992;
              offsetStart = (offsetStart | 0) + 1 | 0;
            }
          }
        }
      };
      GameBoyAdvanceGraphics.prototype.writeDISPCNT0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGMode = data & 7;
        this.bg2FrameBufferRenderer.writeFrameSelect((data & 16) << 27);
        this.HBlankIntervalFree = (data & 32) == 32;
        this.VRAMOneDimensional = (data & 64) == 64;
        this.forcedBlank = (data & 128) == 128;
        this.isRenderingCheckPreprocess();
        if ((this.BGMode | 0) > 2) {
          this.modeFrameBufferRenderer.preprocess(Math.min(this.BGMode | 0, 5) | 0);
        }
      };
      GameBoyAdvanceGraphics.prototype.readDISPCNT0 = function() {
        return this.BGMode | (this.bg2FrameBufferRenderer.frameSelect > 0 ? 16 : 0) | (this.HBlankIntervalFree ? 32 : 0) | (this.VRAMOneDimensional ? 64 : 0) | (this.forcedBlank ? 128 : 0);
      };
      GameBoyAdvanceGraphics.prototype.writeDISPCNT1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.display = data & 255;
        this.compositorPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readDISPCNT1 = function() {
        return this.display | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeGreenSwap = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.greenSwap = (data & 1) == 1;
      };
      GameBoyAdvanceGraphics.prototype.readGreenSwap = function() {
        return this.greenSwap ? 1 : 0;
      };
      GameBoyAdvanceGraphics.prototype.writeDISPSTAT0 = function(data) {
        data = data | 0;
        this.IRQVBlank = (data & 8) == 8;
        this.IRQHBlank = (data & 16) == 16;
        this.IRQVCounter = (data & 32) == 32;
      };
      GameBoyAdvanceGraphics.prototype.readDISPSTAT0 = function() {
        return (this.inVBlank ? 1 : 0) | (this.inHBlank ? 2 : 0) | (this.VCounterMatch ? 4 : 0) | (this.IRQVBlank ? 8 : 0) | (this.IRQHBlank ? 16 : 0) | (this.IRQVCounter ? 32 : 0);
      };
      GameBoyAdvanceGraphics.prototype.writeDISPSTAT1 = function(data) {
        data = data | 0;
        if ((data | 0) != (this.VCounter | 0)) {
          this.VCounter = data | 0;
          this.checkVCounter();
        }
      };
      GameBoyAdvanceGraphics.prototype.readDISPSTAT1 = function() {
        return this.VCounter | 0;
      };
      GameBoyAdvanceGraphics.prototype.readVCOUNT = function() {
        return this.currentScanLine | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeBG0CNT0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGPriority[0] = data & 3;
        this.BGCharacterBaseBlock[0] = (data & 12) >> 2;
        this.BGMosaic[0] = (data & 64) == 64;
        this.BGPalette256[0] = (data & 128) == 128;
        this.bg0Renderer.palettePreprocess();
        this.bg0Renderer.priorityPreprocess();
        this.bg0Renderer.characterBaseBlockPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readBG0CNT0 = function() {
        return this.BGPriority[0] | this.BGCharacterBaseBlock[0] << 2 | (this.BGMosaic[0] ? 64 : 0) | (this.BGPalette256[0] ? 128 : 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG0CNT1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGScreenBaseBlock[0] = data & 31;
        this.BGScreenSize[0] = (data & 192) >> 6;
        this.bg0Renderer.screenSizePreprocess();
        this.bg0Renderer.screenBaseBlockPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readBG0CNT1 = function() {
        return this.BGScreenBaseBlock[0] | this.BGScreenSize[0] << 6;
      };
      GameBoyAdvanceGraphics.prototype.writeBG1CNT0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGPriority[1] = data & 3;
        this.BGCharacterBaseBlock[1] = (data & 12) >> 2;
        this.BGMosaic[1] = (data & 64) == 64;
        this.BGPalette256[1] = (data & 128) == 128;
        this.bg1Renderer.palettePreprocess();
        this.bg1Renderer.priorityPreprocess();
        this.bg1Renderer.characterBaseBlockPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readBG1CNT0 = function() {
        return this.BGPriority[1] | this.BGCharacterBaseBlock[1] << 2 | (this.BGMosaic[1] ? 64 : 0) | (this.BGPalette256[1] ? 128 : 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG1CNT1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGScreenBaseBlock[1] = data & 31;
        this.BGScreenSize[1] = (data & 192) >> 6;
        this.bg1Renderer.screenSizePreprocess();
        this.bg1Renderer.screenBaseBlockPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readBG1CNT1 = function() {
        return this.BGScreenBaseBlock[1] | this.BGScreenSize[1] << 6;
      };
      GameBoyAdvanceGraphics.prototype.writeBG2CNT0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGPriority[2] = data & 3;
        this.BGCharacterBaseBlock[2] = (data & 12) >> 2;
        this.BGMosaic[2] = (data & 64) == 64;
        this.BGPalette256[2] = (data & 128) == 128;
        this.bg2TextRenderer.palettePreprocess();
        this.bg2TextRenderer.priorityPreprocess();
        this.bgAffineRenderer[0].priorityPreprocess();
        this.bg2TextRenderer.characterBaseBlockPreprocess();
        this.bg2MatrixRenderer.characterBaseBlockPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readBG2CNT0 = function() {
        return this.BGPriority[2] | this.BGCharacterBaseBlock[2] << 2 | (this.BGMosaic[2] ? 64 : 0) | (this.BGPalette256[2] ? 128 : 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2CNT1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGScreenBaseBlock[2] = data & 31;
        this.BGDisplayOverflow[0] = (data & 32) == 32;
        this.BGScreenSize[2] = (data & 192) >> 6;
        this.bg2TextRenderer.screenSizePreprocess();
        this.bg2MatrixRenderer.screenSizePreprocess();
        this.bg2TextRenderer.screenBaseBlockPreprocess();
        this.bg2MatrixRenderer.screenBaseBlockPreprocess();
        this.bg2MatrixRenderer.displayOverflowPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readBG2CNT1 = function() {
        return this.BGScreenBaseBlock[2] | (this.BGDisplayOverflow[0] ? 32 : 0) | this.BGScreenSize[2] << 6;
      };
      GameBoyAdvanceGraphics.prototype.writeBG3CNT0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGPriority[3] = data & 3;
        this.BGCharacterBaseBlock[3] = (data & 12) >> 2;
        this.BGMosaic[3] = (data & 64) == 64;
        this.BGPalette256[3] = (data & 128) == 128;
        this.bg3TextRenderer.palettePreprocess();
        this.bg3TextRenderer.priorityPreprocess();
        this.bgAffineRenderer[1].priorityPreprocess();
        this.bg3TextRenderer.characterBaseBlockPreprocess();
        this.bg3MatrixRenderer.characterBaseBlockPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readBG3CNT0 = function() {
        return this.BGPriority[3] | this.BGCharacterBaseBlock[3] << 2 | (this.BGMosaic[3] ? 64 : 0) | (this.BGPalette256[3] ? 128 : 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3CNT1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.BGScreenBaseBlock[3] = data & 31;
        this.BGDisplayOverflow[1] = (data & 32) == 32;
        this.BGScreenSize[3] = (data & 192) >> 6;
        this.bg3TextRenderer.screenSizePreprocess();
        this.bg3MatrixRenderer.screenSizePreprocess();
        this.bg3TextRenderer.screenBaseBlockPreprocess();
        this.bg3MatrixRenderer.screenBaseBlockPreprocess();
        this.bg3MatrixRenderer.displayOverflowPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readBG3CNT1 = function() {
        return this.BGScreenBaseBlock[3] | (this.BGDisplayOverflow[1] ? 32 : 0) | this.BGScreenSize[3] << 6;
      };
      GameBoyAdvanceGraphics.prototype.writeBG0HOFS0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg0Renderer.writeBGHOFS0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG0HOFS1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg0Renderer.writeBGHOFS1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG0VOFS0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg0Renderer.writeBGVOFS0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG0VOFS1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg0Renderer.writeBGVOFS1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG1HOFS0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg1Renderer.writeBGHOFS0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG1HOFS1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg1Renderer.writeBGHOFS1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG1VOFS0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg1Renderer.writeBGVOFS0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG1VOFS1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg1Renderer.writeBGVOFS1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2HOFS0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg2TextRenderer.writeBGHOFS0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2HOFS1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg2TextRenderer.writeBGHOFS1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2VOFS0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg2TextRenderer.writeBGVOFS0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2VOFS1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg2TextRenderer.writeBGVOFS1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3HOFS0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg3TextRenderer.writeBGHOFS0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3HOFS1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg3TextRenderer.writeBGHOFS1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3VOFS0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg3TextRenderer.writeBGVOFS0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3VOFS1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bg3TextRenderer.writeBGVOFS1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2PA0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGPA0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2PA1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGPA1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2PB0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGPB0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2PB1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGPB1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2PC0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGPC0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2PC1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGPC1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2PD0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGPD0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2PD1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGPD1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3PA0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGPA0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3PA1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGPA1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3PB0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGPB0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3PB1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGPB1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3PC0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGPC0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3PC1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGPC1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3PD0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGPD0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3PD1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGPD1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2X_L0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGX_L0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2X_L1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGX_L1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2X_H0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGX_H0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2X_H1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGX_H1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2Y_L0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGY_L0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2Y_L1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGY_L1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2Y_H0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGY_H0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG2Y_H1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[0].writeBGY_H1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3X_L0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGX_L0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3X_L1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGX_L1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3X_H0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGX_H0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3X_H1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGX_H1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3Y_L0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGY_L0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3Y_L1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGY_L1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3Y_H0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGY_H0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBG3Y_H1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.bgAffineRenderer[1].writeBGY_H1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWIN0H0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window0Renderer.writeWINH0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWIN0H1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window0Renderer.writeWINH1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWIN1H0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window1Renderer.writeWINH0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWIN1H1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window1Renderer.writeWINH1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWIN0V0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window0Renderer.writeWINV0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWIN0V1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window0Renderer.writeWINV1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWIN1V0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window1Renderer.writeWINV0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWIN1V1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window1Renderer.writeWINV1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeWININ0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window0Renderer.writeWININ(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.readWININ0 = function() {
        return this.window0Renderer.readWININ() | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeWININ1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.window1Renderer.writeWININ(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.readWININ1 = function() {
        return this.window1Renderer.readWININ() | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeWINOUT0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.WINOutside = data & 63;
        this.compositorPreprocess();
      };
      GameBoyAdvanceGraphics.prototype.readWINOUT0 = function() {
        return this.WINOutside | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeWINOUT1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.objWindowRenderer.writeWINOUT1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.readWINOUT1 = function() {
        return this.objWindowRenderer.readWINOUT1() | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeMOSAIC0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.mosaicRenderer.writeMOSAIC0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeMOSAIC1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.mosaicRenderer.writeMOSAIC1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeBLDCNT0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.colorEffectsRenderer.writeBLDCNT0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.readBLDCNT0 = function() {
        return this.colorEffectsRenderer.readBLDCNT0() | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeBLDCNT1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.colorEffectsRenderer.writeBLDCNT1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.readBLDCNT1 = function() {
        return this.colorEffectsRenderer.readBLDCNT1() | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeBLDALPHA0 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.colorEffectsRenderer.writeBLDALPHA0(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.readBLDALPHA0 = function() {
        return this.colorEffectsRenderer.readBLDALPHA0() | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeBLDALPHA1 = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.colorEffectsRenderer.writeBLDALPHA1(data | 0);
      };
      GameBoyAdvanceGraphics.prototype.readBLDALPHA1 = function() {
        return this.colorEffectsRenderer.readBLDALPHA1() | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeBLDY = function(data) {
        data = data | 0;
        this.graphicsJIT();
        this.colorEffectsRenderer.writeBLDY(data | 0);
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceGraphics.prototype.writeVRAM8 = function(address, data) {
          address = address | 0;
          data = data | 0;
          if ((address & 65536) == 0 || (address & 98303) < 81920 && (this.BGMode | 0) >= 3) {
            this.graphicsJIT();
            address = address & ((address & 65536) >> 1 ^ address);
            this.VRAM16[address >> 1 & 65535] = Math.imul(data & 255, 257) | 0;
          }
        };
        GameBoyAdvanceGraphics.prototype.writeVRAM16 = function(address, data) {
          address = address | 0;
          data = data | 0;
          this.graphicsJIT();
          address = address & ((address & 65536) >> 1 ^ address);
          this.VRAM16[address >> 1 & 65535] = data & 65535;
        };
        GameBoyAdvanceGraphics.prototype.writeVRAM32 = function(address, data) {
          address = address | 0;
          data = data | 0;
          this.graphicsJIT();
          address = address & ((address & 65536) >> 1 ^ address);
          this.VRAM32[address >> 2 & 32767] = data | 0;
        };
        GameBoyAdvanceGraphics.prototype.readVRAM16 = function(address) {
          address = address | 0;
          address = address & ((address & 65536) >> 1 ^ address);
          return this.VRAM16[address >> 1 & 65535] | 0;
        };
        GameBoyAdvanceGraphics.prototype.readVRAM32 = function(address) {
          address = address | 0;
          address = address & ((address & 65536) >> 1 ^ address);
          return this.VRAM32[address >> 2 & 32767] | 0;
        };
        GameBoyAdvanceGraphics.prototype.writePalette16 = function(address, data) {
          data = data | 0;
          address = address >> 1;
          this.graphicsJIT();
          this.paletteRAM16[address & 511] = data | 0;
          data = data & 32767;
          this.writePalette256Color(address | 0, data | 0);
          this.writePalette16Color(address | 0, data | 0);
        };
        GameBoyAdvanceGraphics.prototype.writePalette32 = function(address, data) {
          data = data | 0;
          address = address >> 1;
          this.graphicsJIT();
          this.paletteRAM32[address >> 1 & 255] = data | 0;
          var palette = data & 32767;
          this.writePalette256Color(address | 0, palette | 0);
          this.writePalette16Color(address | 0, palette | 0);
          palette = data >> 16 & 32767;
          this.writePalette256Color(address | 1, palette | 0);
          this.writePalette16Color(address | 1, palette | 0);
        };
        GameBoyAdvanceGraphics.prototype.readPalette16 = function(address) {
          address = address | 0;
          return this.paletteRAM16[address >> 1 & 511] | 0;
        };
        GameBoyAdvanceGraphics.prototype.readPalette32 = function(address) {
          address = address | 0;
          return this.paletteRAM32[address >> 2 & 255] | 0;
        };
      } else {
        GameBoyAdvanceGraphics.prototype.writeVRAM8 = function(address, data) {
          address &= 131070 & ((address & 65536) >> 1 ^ address);
          if (address < 65536 || (address & 98303) < 81920 && this.BGMode >= 3) {
            this.graphicsJIT();
            this.VRAM[address++] = data & 255;
            this.VRAM[address] = data & 255;
          }
        };
        GameBoyAdvanceGraphics.prototype.writeVRAM16 = function(address, data) {
          address &= 131070 & ((address & 65536) >> 1 ^ address);
          this.graphicsJIT();
          this.VRAM[address++] = data & 255;
          this.VRAM[address] = data >> 8 & 255;
        };
        GameBoyAdvanceGraphics.prototype.writeVRAM32 = function(address, data) {
          address &= 131068 & ((address & 65536) >> 1 ^ address);
          this.graphicsJIT();
          this.VRAM[address++] = data & 255;
          this.VRAM[address++] = data >> 8 & 255;
          this.VRAM[address++] = data >> 16 & 255;
          this.VRAM[address] = data >>> 24;
        };
        GameBoyAdvanceGraphics.prototype.readVRAM16 = function(address) {
          address &= 131070 & ((address & 65536) >> 1 ^ address);
          return this.VRAM[address] | this.VRAM[address + 1] << 8;
        };
        GameBoyAdvanceGraphics.prototype.readVRAM32 = function(address) {
          address &= 131068 & ((address & 65536) >> 1 ^ address);
          return this.VRAM[address] | this.VRAM[address + 1] << 8 | this.VRAM[address + 2] << 16 | this.VRAM[address + 3] << 24;
        };
        GameBoyAdvanceGraphics.prototype.writePalette16 = function(address, data) {
          this.graphicsJIT();
          this.paletteRAM[address] = data & 255;
          this.paletteRAM[address | 1] = data >> 8;
          data &= 32767;
          address >>= 1;
          this.writePalette256Color(address, data);
          this.writePalette16Color(address, data);
        };
        GameBoyAdvanceGraphics.prototype.writePalette32 = function(address, data) {
          this.graphicsJIT();
          this.paletteRAM[address] = data & 255;
          this.paletteRAM[address | 1] = data >> 8 & 255;
          this.paletteRAM[address | 2] = data >> 16 & 255;
          this.paletteRAM[address | 3] = data >>> 24;
          address >>= 1;
          var palette = data & 32767;
          this.writePalette256Color(address, palette);
          this.writePalette16Color(address, palette);
          palette = data >> 16 & 32767;
          address |= 1;
          this.writePalette256Color(address, palette);
          this.writePalette16Color(address, palette);
        };
        GameBoyAdvanceGraphics.prototype.readPalette16 = function(address) {
          return this.paletteRAM[address] | this.paletteRAM[address | 1] << 8;
        };
        GameBoyAdvanceGraphics.prototype.readPalette32 = function(address) {
          return this.paletteRAM[address] | this.paletteRAM[address | 1] << 8 | this.paletteRAM[address | 2] << 16 | this.paletteRAM[address | 3] << 24;
        };
      }
      GameBoyAdvanceGraphics.prototype.readVRAM8 = function(address) {
        address = address | 0;
        address = address & ((address & 65536) >> 1 ^ address);
        return this.VRAM[address & 131071] | 0;
      };
      GameBoyAdvanceGraphics.prototype.writeOAM16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.graphicsJIT();
        this.objRenderer.writeOAM16(address >> 1, data | 0);
      };
      GameBoyAdvanceGraphics.prototype.writeOAM32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.graphicsJIT();
        this.objRenderer.writeOAM32(address >> 2, data | 0);
      };
      GameBoyAdvanceGraphics.prototype.readOAM = function(address) {
        return this.objRenderer.readOAM(address | 0) | 0;
      };
      GameBoyAdvanceGraphics.prototype.readOAM16 = function(address) {
        return this.objRenderer.readOAM16(address | 0) | 0;
      };
      GameBoyAdvanceGraphics.prototype.readOAM32 = function(address) {
        return this.objRenderer.readOAM32(address | 0) | 0;
      };
      GameBoyAdvanceGraphics.prototype.writePalette256Color = function(address, palette) {
        address = address | 0;
        palette = palette | 0;
        if ((address & 255) == 0) {
          palette = 58720256 | palette;
          if (address == 0) {
            this.backdrop = palette | 2097152;
          }
        }
        if ((address | 0) < 256) {
          this.palette256[address & 255] = palette | 0;
        } else {
          this.paletteOBJ256[address & 255] = palette | 0;
        }
      };
      GameBoyAdvanceGraphics.prototype.writePalette16Color = function(address, palette) {
        address = address | 0;
        palette = palette | 0;
        if ((address & 15) == 0) {
          palette = 58720256 | palette;
        }
        if ((address | 0) < 256) {
          this.palette16[address & 255] = palette | 0;
        } else {
          this.paletteOBJ16[address & 255] = palette | 0;
        }
      };
      GameBoyAdvanceGraphics.prototype.readPalette = function(address) {
        return this.paletteRAM[address & 1023] | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceChannel1Synth.js
  var require_GameBoyAdvanceChannel1Synth = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceChannel1Synth.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceChannel1Synth;
      function GameBoyAdvanceChannel1Synth(sound) {
        this.sound = sound;
        this.currentSampleLeft = 0;
        this.currentSampleLeftSecondary = 0;
        this.currentSampleLeftTrimary = 0;
        this.currentSampleRight = 0;
        this.currentSampleRightSecondary = 0;
        this.currentSampleRightTrimary = 0;
        this.SweepFault = false;
        this.lastTimeSweep = 0;
        this.timeSweep = 0;
        this.frequencySweepDivider = 0;
        this.decreaseSweep = false;
        this.nr11 = 0;
        this.CachedDuty = this.dutyLookup[0];
        this.totalLength = 64;
        this.nr12 = 0;
        this.envelopeVolume = 0;
        this.frequency = 0;
        this.FrequencyTracker = 32768;
        this.nr14 = 0;
        this.consecutive = true;
        this.ShadowFrequency = 32768;
        this.canPlay = false;
        this.Enabled = false;
        this.envelopeSweeps = 0;
        this.envelopeSweepsLast = -1;
        this.FrequencyCounter = 0;
        this.DutyTracker = 0;
        this.Swept = false;
      }
      GameBoyAdvanceChannel1Synth.prototype.dutyLookup = [
        [false, false, false, false, false, false, false, true],
        [true, false, false, false, false, false, false, true],
        [true, false, false, false, false, true, true, true],
        [false, true, true, true, true, true, true, false]
      ];
      GameBoyAdvanceChannel1Synth.prototype.disabled = function() {
        this.nr10 = 0;
        this.SweepFault = false;
        this.lastTimeSweep = 0;
        this.timeSweep = 0;
        this.frequencySweepDivider = 0;
        this.decreaseSweep = false;
        this.nr11 = 0;
        this.CachedDuty = this.dutyLookup[0];
        this.totalLength = 64;
        this.nr12 = 0;
        this.envelopeVolume = 0;
        this.frequency = 0;
        this.FrequencyTracker = 32768;
        this.nr14 = 0;
        this.consecutive = true;
        this.ShadowFrequency = 32768;
        this.canPlay = false;
        this.Enabled = false;
        this.envelopeSweeps = 0;
        this.envelopeSweepsLast = -1;
        this.FrequencyCounter = 0;
        this.DutyTracker = 0;
      };
      GameBoyAdvanceChannel1Synth.prototype.clockAudioLength = function() {
        if ((this.totalLength | 0) > 1) {
          this.totalLength = (this.totalLength | 0) - 1 | 0;
        } else if ((this.totalLength | 0) == 1) {
          this.totalLength = 0;
          this.enableCheck();
          this.sound.unsetNR52(254);
        }
      };
      GameBoyAdvanceChannel1Synth.prototype.enableCheck = function() {
        this.Enabled = (this.consecutive || (this.totalLength | 0) > 0) && !this.SweepFault && this.canPlay;
      };
      GameBoyAdvanceChannel1Synth.prototype.volumeEnableCheck = function() {
        this.canPlay = (this.nr12 | 0) > 7;
        this.enableCheck();
      };
      GameBoyAdvanceChannel1Synth.prototype.outputLevelCache = function() {
        this.currentSampleLeft = this.sound.leftChannel1 ? this.envelopeVolume | 0 : 0;
        this.currentSampleRight = this.sound.rightChannel1 ? this.envelopeVolume | 0 : 0;
        this.outputLevelSecondaryCache();
      };
      GameBoyAdvanceChannel1Synth.prototype.outputLevelSecondaryCache = function() {
        if (this.Enabled) {
          this.currentSampleLeftSecondary = this.currentSampleLeft | 0;
          this.currentSampleRightSecondary = this.currentSampleRight | 0;
        } else {
          this.currentSampleLeftSecondary = 0;
          this.currentSampleRightSecondary = 0;
        }
        this.outputLevelTrimaryCache();
      };
      GameBoyAdvanceChannel1Synth.prototype.outputLevelTrimaryCache = function() {
        if (this.CachedDuty[this.DutyTracker | 0]) {
          this.currentSampleLeftTrimary = this.currentSampleLeftSecondary | 0;
          this.currentSampleRightTrimary = this.currentSampleRightSecondary | 0;
        } else {
          this.currentSampleLeftTrimary = 0;
          this.currentSampleRightTrimary = 0;
        }
      };
      GameBoyAdvanceChannel1Synth.prototype.clockAudioSweep = function() {
        if (!this.SweepFault && (this.timeSweep | 0) > 0) {
          this.timeSweep = (this.timeSweep | 0) - 1 | 0;
          if ((this.timeSweep | 0) == 0) {
            this.runAudioSweep();
          }
        }
      };
      GameBoyAdvanceChannel1Synth.prototype.runAudioSweep = function() {
        if ((this.lastTimeSweep | 0) > 0) {
          if ((this.frequencySweepDivider | 0) > 0) {
            this.Swept = true;
            if (this.decreaseSweep) {
              this.ShadowFrequency = (this.ShadowFrequency | 0) - (this.ShadowFrequency >> (this.frequencySweepDivider | 0)) | 0;
              this.frequency = this.ShadowFrequency & 2047;
              this.FrequencyTracker = 2048 - (this.frequency | 0) << 4;
            } else {
              this.ShadowFrequency = (this.ShadowFrequency | 0) + (this.ShadowFrequency >> (this.frequencySweepDivider | 0)) | 0;
              this.frequency = this.ShadowFrequency | 0;
              if ((this.ShadowFrequency | 0) <= 2047) {
                this.FrequencyTracker = 2048 - (this.frequency | 0) << 4;
                if (((this.ShadowFrequency | 0) + (this.ShadowFrequency >> (this.frequencySweepDivider | 0)) | 0) > 2047) {
                  this.SweepFault = true;
                  this.enableCheck();
                  this.sound.unsetNR52(254);
                }
              } else {
                this.frequency &= 2047;
                this.SweepFault = true;
                this.enableCheck();
                this.sound.unsetNR52(254);
              }
            }
            this.timeSweep = this.lastTimeSweep | 0;
          } else {
            this.SweepFault = true;
            this.enableCheck();
          }
        }
      };
      GameBoyAdvanceChannel1Synth.prototype.audioSweepPerformDummy = function() {
        if ((this.frequencySweepDivider | 0) > 0) {
          if (!this.decreaseSweep) {
            var channel1ShadowFrequency = (this.ShadowFrequency | 0) + (this.ShadowFrequency >> (this.frequencySweepDivider | 0)) | 0;
            if ((channel1ShadowFrequency | 0) <= 2047) {
              if (((channel1ShadowFrequency | 0) + (channel1ShadowFrequency >> (this.frequencySweepDivider | 0)) | 0) > 2047) {
                this.SweepFault = true;
                this.enableCheck();
                this.sound.unsetNR52(254);
              }
            } else {
              this.SweepFault = true;
              this.enableCheck();
              this.sound.unsetNR52(254);
            }
          }
        }
      };
      GameBoyAdvanceChannel1Synth.prototype.clockAudioEnvelope = function() {
        if ((this.envelopeSweepsLast | 0) > -1) {
          if ((this.envelopeSweeps | 0) > 0) {
            this.envelopeSweeps = (this.envelopeSweeps | 0) - 1 | 0;
          } else {
            if (!this.envelopeType) {
              if ((this.envelopeVolume | 0) > 0) {
                this.envelopeVolume = (this.envelopeVolume | 0) - 1 | 0;
                this.envelopeSweeps = this.envelopeSweepsLast | 0;
              } else {
                this.envelopeSweepsLast = -1;
              }
            } else if ((this.envelopeVolume | 0) < 15) {
              this.envelopeVolume = (this.envelopeVolume | 0) + 1 | 0;
              this.envelopeSweeps = this.envelopeSweepsLast | 0;
            } else {
              this.envelopeSweepsLast = -1;
            }
          }
        }
      };
      GameBoyAdvanceChannel1Synth.prototype.computeAudioChannel = function() {
        if ((this.FrequencyCounter | 0) == 0) {
          this.FrequencyCounter = this.FrequencyTracker | 0;
          this.DutyTracker = (this.DutyTracker | 0) + 1 & 7;
        }
      };
      GameBoyAdvanceChannel1Synth.prototype.readSOUND1CNT_L = function() {
        return this.nr10 | 0;
      };
      GameBoyAdvanceChannel1Synth.prototype.writeSOUND1CNT_L = function(data) {
        data = data | 0;
        if (this.decreaseSweep && (data & 8) == 0) {
          if (this.Swept) {
            this.SweepFault = true;
          }
        }
        this.lastTimeSweep = (data & 112) >> 4;
        this.frequencySweepDivider = data & 7;
        this.decreaseSweep = (data & 8) == 8;
        this.nr10 = data | 0;
        this.enableCheck();
      };
      GameBoyAdvanceChannel1Synth.prototype.readSOUND1CNT_H0 = function() {
        return this.nr11 | 0;
      };
      GameBoyAdvanceChannel1Synth.prototype.writeSOUND1CNT_H0 = function(data) {
        data = data | 0;
        this.CachedDuty = this.dutyLookup[data >> 6];
        this.totalLength = 64 - (data & 63) | 0;
        this.nr11 = data | 0;
        this.enableCheck();
      };
      GameBoyAdvanceChannel1Synth.prototype.readSOUND1CNT_H1 = function() {
        return this.nr12 | 0;
      };
      GameBoyAdvanceChannel1Synth.prototype.writeSOUND1CNT_H1 = function(data) {
        data = data | 0;
        this.envelopeType = (data & 8) == 8;
        this.nr12 = data | 0;
        this.volumeEnableCheck();
      };
      GameBoyAdvanceChannel1Synth.prototype.writeSOUND1CNT_X0 = function(data) {
        data = data | 0;
        this.frequency = this.frequency & 1792 | data;
        this.FrequencyTracker = 2048 - (this.frequency | 0) << 4;
      };
      GameBoyAdvanceChannel1Synth.prototype.readSOUND1CNT_X = function() {
        return this.nr14 | 0;
      };
      GameBoyAdvanceChannel1Synth.prototype.writeSOUND1CNT_X1 = function(data) {
        data = data | 0;
        this.consecutive = (data & 64) == 0;
        this.frequency = (data & 7) << 8 | this.frequency & 255;
        this.FrequencyTracker = 2048 - (this.frequency | 0) << 4;
        if (data > 127) {
          this.timeSweep = this.lastTimeSweep | 0;
          this.Swept = false;
          this.envelopeVolume = this.nr12 >> 4;
          this.envelopeSweepsLast = (this.nr12 & 7) - 1 | 0;
          if ((this.totalLength | 0) == 0) {
            this.totalLength = 64;
          }
          if ((this.lastTimeSweep | 0) > 0 || (this.frequencySweepDivider | 0) > 0) {
            this.sound.setNR52(1);
          } else {
            this.sound.unsetNR52(254);
          }
          if ((data & 64) == 64) {
            this.sound.setNR52(1);
          }
          this.ShadowFrequency = this.frequency | 0;
          this.SweepFault = false;
          this.audioSweepPerformDummy();
        }
        this.enableCheck();
        this.nr14 = data | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceChannel2Synth.js
  var require_GameBoyAdvanceChannel2Synth = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceChannel2Synth.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceChannel2Synth;
      function GameBoyAdvanceChannel2Synth(sound) {
        this.sound = sound;
        this.currentSampleLeft = 0;
        this.currentSampleLeftSecondary = 0;
        this.currentSampleLeftTrimary = 0;
        this.currentSampleRight = 0;
        this.currentSampleRightSecondary = 0;
        this.currentSampleRightTrimary = 0;
        this.CachedDuty = this.dutyLookup[0];
        this.totalLength = 64;
        this.envelopeVolume = 0;
        this.frequency = 0;
        this.FrequencyTracker = 32768;
        this.consecutive = true;
        this.ShadowFrequency = 32768;
        this.canPlay = false;
        this.Enabled = false;
        this.envelopeSweeps = 0;
        this.envelopeSweepsLast = -1;
        this.FrequencyCounter = 0;
        this.DutyTracker = 0;
        this.nr21 = 0;
        this.nr22 = 0;
        this.nr23 = 0;
        this.nr24 = 0;
      }
      GameBoyAdvanceChannel2Synth.prototype.dutyLookup = [
        [false, false, false, false, false, false, false, true],
        [true, false, false, false, false, false, false, true],
        [true, false, false, false, false, true, true, true],
        [false, true, true, true, true, true, true, false]
      ];
      GameBoyAdvanceChannel2Synth.prototype.disabled = function() {
        this.nr21 = 0;
        this.CachedDuty = this.dutyLookup[0];
        this.totalLength = 64;
        this.nr22 = 0;
        this.envelopeVolume = 0;
        this.nr23 = 0;
        this.frequency = 0;
        this.FrequencyTracker = 32768;
        this.nr24 = 0;
        this.consecutive = true;
        this.canPlay = false;
        this.Enabled = false;
        this.envelopeSweeps = 0;
        this.envelopeSweepsLast = -1;
        this.FrequencyCounter = 0;
        this.DutyTracker = 0;
      };
      GameBoyAdvanceChannel2Synth.prototype.clockAudioLength = function() {
        if ((this.totalLength | 0) > 1) {
          this.totalLength = (this.totalLength | 0) - 1 | 0;
        } else if ((this.totalLength | 0) == 1) {
          this.totalLength = 0;
          this.enableCheck();
          this.sound.unsetNR52(253);
        }
      };
      GameBoyAdvanceChannel2Synth.prototype.clockAudioEnvelope = function() {
        if ((this.envelopeSweepsLast | 0) > -1) {
          if ((this.envelopeSweeps | 0) > 0) {
            this.envelopeSweeps = (this.envelopeSweeps | 0) - 1 | 0;
          } else {
            if (!this.envelopeType) {
              if ((this.envelopeVolume | 0) > 0) {
                this.envelopeVolume = (this.envelopeVolume | 0) - 1 | 0;
                this.envelopeSweeps = this.envelopeSweepsLast | 0;
              } else {
                this.envelopeSweepsLast = -1;
              }
            } else if ((this.envelopeVolume | 0) < 15) {
              this.envelopeVolume = (this.envelopeVolume | 0) + 1 | 0;
              this.envelopeSweeps = this.envelopeSweepsLast | 0;
            } else {
              this.envelopeSweepsLast = -1;
            }
          }
        }
      };
      GameBoyAdvanceChannel2Synth.prototype.computeAudioChannel = function() {
        if ((this.FrequencyCounter | 0) == 0) {
          this.FrequencyCounter = this.FrequencyTracker | 0;
          this.DutyTracker = (this.DutyTracker | 0) + 1 & 7;
        }
      };
      GameBoyAdvanceChannel2Synth.prototype.enableCheck = function() {
        this.Enabled = (this.consecutive || (this.totalLength | 0) > 0) && this.canPlay;
      };
      GameBoyAdvanceChannel2Synth.prototype.volumeEnableCheck = function() {
        this.canPlay = (this.nr22 | 0) > 7;
        this.enableCheck();
      };
      GameBoyAdvanceChannel2Synth.prototype.outputLevelCache = function() {
        this.currentSampleLeft = this.sound.leftChannel2 ? this.envelopeVolume | 0 : 0;
        this.currentSampleRight = this.sound.rightChannel2 ? this.envelopeVolume | 0 : 0;
        this.outputLevelSecondaryCache();
      };
      GameBoyAdvanceChannel2Synth.prototype.outputLevelSecondaryCache = function() {
        if (this.Enabled) {
          this.currentSampleLeftSecondary = this.currentSampleLeft | 0;
          this.currentSampleRightSecondary = this.currentSampleRight | 0;
        } else {
          this.currentSampleLeftSecondary = 0;
          this.currentSampleRightSecondary = 0;
        }
        this.outputLevelTrimaryCache();
      };
      GameBoyAdvanceChannel2Synth.prototype.outputLevelTrimaryCache = function() {
        if (this.CachedDuty[this.DutyTracker | 0]) {
          this.currentSampleLeftTrimary = this.currentSampleLeftSecondary | 0;
          this.currentSampleRightTrimary = this.currentSampleRightSecondary | 0;
        } else {
          this.currentSampleLeftTrimary = 0;
          this.currentSampleRightTrimary = 0;
        }
      };
      GameBoyAdvanceChannel2Synth.prototype.readSOUND2CNT_L0 = function() {
        return this.nr21 | 0;
      };
      GameBoyAdvanceChannel2Synth.prototype.writeSOUND2CNT_L0 = function(data) {
        data = data | 0;
        this.CachedDuty = this.dutyLookup[data >> 6];
        this.totalLength = 64 - (data & 63) | 0;
        this.nr21 = data | 0;
        this.enableCheck();
      };
      GameBoyAdvanceChannel2Synth.prototype.readSOUND2CNT_L1 = function() {
        return this.nr22 | 0;
      };
      GameBoyAdvanceChannel2Synth.prototype.writeSOUND2CNT_L1 = function(data) {
        data = data | 0;
        this.envelopeType = (data & 8) == 8;
        this.nr22 = data | 0;
        this.volumeEnableCheck();
      };
      GameBoyAdvanceChannel2Synth.prototype.writeSOUND2CNT_H0 = function(data) {
        data = data | 0;
        this.frequency = this.frequency & 1792 | data;
        this.FrequencyTracker = 2048 - (this.frequency | 0) << 4;
      };
      GameBoyAdvanceChannel2Synth.prototype.readSOUND2CNT_H = function() {
        return this.nr24 | 0;
      };
      GameBoyAdvanceChannel2Synth.prototype.writeSOUND2CNT_H1 = function(data) {
        data = data | 0;
        if (data > 127) {
          this.envelopeVolume = this.nr22 >> 4;
          this.envelopeSweepsLast = (this.nr22 & 7) - 1 | 0;
          if ((this.totalLength | 0) == 0) {
            this.totalLength = 64;
          }
          if ((data & 64) == 64) {
            this.sound.setNR52(2);
          }
        }
        this.consecutive = (data & 64) == 0;
        this.frequency = (data & 7) << 8 | this.frequency & 255;
        this.FrequencyTracker = 2048 - (this.frequency | 0) << 4;
        this.nr24 = data | 0;
        this.enableCheck();
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceChannel3Synth.js
  var require_GameBoyAdvanceChannel3Synth = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceChannel3Synth.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceChannel3Synth;
      var TypedArrayShim = require_TypedArrayShim();
      var IS_LITTLE_ENDIAN = TypedArrayShim.IS_LITTLE_ENDIAN;
      var getInt8Array = TypedArrayShim.getInt8Array;
      var getUint8Array = TypedArrayShim.getUint8Array;
      var getUint16View = TypedArrayShim.getUint16View;
      var getInt32View = TypedArrayShim.getInt32View;
      function GameBoyAdvanceChannel3Synth(sound) {
        this.sound = sound;
        this.currentSampleLeft = 0;
        this.currentSampleLeftSecondary = 0;
        this.currentSampleRight = 0;
        this.currentSampleRightSecondary = 0;
        this.lastSampleLookup = 0;
        this.canPlay = false;
        this.WAVERAMBankSpecified = 0;
        this.WAVERAMBankAccessed = 32;
        this.WaveRAMBankSize = 31;
        this.totalLength = 256;
        this.patternType = 4;
        this.frequency = 0;
        this.FrequencyPeriod = 16384;
        this.consecutive = true;
        this.Enabled = false;
        this.nr30 = 0;
        this.nr31 = 0;
        this.nr32 = 0;
        this.nr33 = 0;
        this.nr34 = 0;
        this.cachedSample = 0;
        this.PCM = getInt8Array(64);
        this.PCM16 = getUint16View(this.PCM);
        this.PCM32 = getInt32View(this.PCM);
        this.WAVERAM8 = getUint8Array(32);
        this.WAVERAM16 = getUint16View(this.WAVERAM8);
        this.WAVERAM32 = getInt32View(this.WAVERAM8);
      }
      GameBoyAdvanceChannel3Synth.prototype.disabled = function() {
        this.nr30 = 0;
        this.lastSampleLookup = 0;
        this.canPlay = false;
        this.WAVERAMBankSpecified = 0;
        this.WAVERAMBankAccessed = 32;
        this.WaveRAMBankSize = 31;
        this.totalLength = 256;
        this.nr32 = 0;
        this.patternType = 4;
        this.nr33 = 0;
        this.frequency = 0;
        this.FrequencyPeriod = 16384;
        this.nr34 = 0;
        this.consecutive = true;
        this.Enabled = false;
        this.counter = 0;
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceChannel3Synth.prototype.updateCache = function() {
          if ((this.patternType | 0) != 3) {
            this.cachedSample = this.PCM[this.lastSampleLookup | 0] >> (this.patternType | 0);
          } else {
            this.cachedSample = Math.imul(this.PCM[this.lastSampleLookup | 0] | 0, 3) >> 2;
          }
          this.outputLevelCache();
        };
      } else {
        GameBoyAdvanceChannel3Synth.prototype.updateCache = function() {
          if ((this.patternType | 0) != 3) {
            this.cachedSample = this.PCM[this.lastSampleLookup | 0] >> (this.patternType | 0);
          } else {
            this.cachedSample = this.PCM[this.lastSampleLookup | 0] * 0.75 | 0;
          }
          this.outputLevelCache();
        };
      }
      GameBoyAdvanceChannel3Synth.prototype.outputLevelCache = function() {
        this.currentSampleLeft = this.sound.leftChannel3 ? this.cachedSample | 0 : 0;
        this.currentSampleRight = this.sound.rightChannel3 ? this.cachedSample | 0 : 0;
        this.outputLevelSecondaryCache();
      };
      GameBoyAdvanceChannel3Synth.prototype.outputLevelSecondaryCache = function() {
        if (this.Enabled) {
          this.currentSampleLeftSecondary = this.currentSampleLeft | 0;
          this.currentSampleRightSecondary = this.currentSampleRight | 0;
        } else {
          this.currentSampleLeftSecondary = 0;
          this.currentSampleRightSecondary = 0;
        }
      };
      GameBoyAdvanceChannel3Synth.prototype.readWAVE8 = function(address) {
        address = (address | 0) + (this.WAVERAMBankAccessed >> 1) | 0;
        return this.WAVERAM8[address | 0] | 0;
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceChannel3Synth.prototype.writeWAVE8 = function(address, data) {
          address = address | 0;
          data = data | 0;
          if (this.canPlay) {
            this.sound.audioJIT();
          }
          address = (address | 0) + (this.WAVERAMBankAccessed >> 1) | 0;
          this.WAVERAM8[address | 0] = data & 255;
          var temp = data >> 4 & 15;
          temp = temp | (data & 15) << 8;
          this.PCM16[address | 0] = temp | 0;
        };
        GameBoyAdvanceChannel3Synth.prototype.writeWAVE16 = function(address, data) {
          address = address | 0;
          data = data | 0;
          if (this.canPlay) {
            this.sound.audioJIT();
          }
          address = (address | 0) + (this.WAVERAMBankAccessed >> 2) | 0;
          this.WAVERAM16[address | 0] = data & 65535;
          var temp = data >> 4 & 15;
          temp = temp | (data & 15) << 8;
          temp = temp | (data & 61440) << 4;
          temp = temp | (data & 3840) << 16;
          this.PCM32[address | 0] = temp | 0;
        };
        GameBoyAdvanceChannel3Synth.prototype.writeWAVE32 = function(address, data) {
          address = address | 0;
          data = data | 0;
          if (this.canPlay) {
            this.sound.audioJIT();
          }
          address = (address | 0) + (this.WAVERAMBankAccessed >> 3) | 0;
          this.WAVERAM32[address | 0] = data | 0;
          var temp = data >> 4 & 15;
          temp = temp | (data & 15) << 8;
          temp = temp | (data & 61440) << 4;
          temp = temp | (data & 3840) << 16;
          address = address << 1;
          this.PCM32[address | 0] = temp | 0;
          temp = data >> 20 & 15;
          temp = temp | data >> 8 & 3840;
          temp = temp | data >> 12 & 983040;
          temp = temp | data & 251658240;
          this.PCM32[address | 1] = temp | 0;
        };
        GameBoyAdvanceChannel3Synth.prototype.readWAVE16 = function(address) {
          address = (address | 0) + (this.WAVERAMBankAccessed >> 2) | 0;
          return this.WAVERAM16[address | 0] | 0;
        };
        GameBoyAdvanceChannel3Synth.prototype.readWAVE32 = function(address) {
          address = (address | 0) + (this.WAVERAMBankAccessed >> 3) | 0;
          return this.WAVERAM32[address | 0] | 0;
        };
      } else {
        GameBoyAdvanceChannel3Synth.prototype.writeWAVE8 = function(address, data) {
          if (this.canPlay) {
            this.sound.audioJIT();
          }
          address += this.WAVERAMBankAccessed >> 1;
          this.WAVERAM8[address] = data & 255;
          address <<= 1;
          this.PCM[address] = data >> 4 & 15;
          this.PCM[address | 1] = data & 15;
        };
        GameBoyAdvanceChannel3Synth.prototype.writeWAVE16 = function(address, data) {
          if (this.canPlay) {
            this.sound.audioJIT();
          }
          address += this.WAVERAMBankAccessed >> 2;
          address <<= 1;
          this.WAVERAM8[address] = data & 255;
          this.WAVERAM8[address | 1] = data >> 8 & 255;
          address <<= 1;
          this.PCM[address] = data >> 4 & 15;
          this.PCM[address | 1] = data & 15;
          this.PCM[address | 2] = data >> 12 & 15;
          this.PCM[address | 3] = data >> 8 & 15;
        };
        GameBoyAdvanceChannel3Synth.prototype.writeWAVE32 = function(address, data) {
          if (this.canPlay) {
            this.sound.audioJIT();
          }
          address += this.WAVERAMBankAccessed >> 3;
          address <<= 2;
          this.WAVERAM8[address] = data & 255;
          this.WAVERAM8[address | 1] = data >> 8 & 255;
          this.WAVERAM8[address | 2] = data >> 16 & 255;
          this.WAVERAM8[address | 3] = data >>> 24;
          address <<= 1;
          this.PCM[address] = data >> 4 & 15;
          this.PCM[address | 1] = data & 15;
          this.PCM[address | 2] = data >> 12 & 15;
          this.PCM[address | 3] = data >> 8 & 15;
          this.PCM[address | 4] = data >> 20 & 15;
          this.PCM[address | 5] = data >> 16 & 15;
          this.PCM[address | 6] = data >>> 28;
          this.PCM[address | 7] = data >> 24 & 15;
        };
        GameBoyAdvanceChannel3Synth.prototype.readWAVE16 = function(address) {
          address += this.WAVERAMBankAccessed >> 1;
          return this.WAVERAM8[address] | this.WAVERAM8[address | 1] << 8;
        };
        GameBoyAdvanceChannel3Synth.prototype.readWAVE32 = function(address) {
          address += this.WAVERAMBankAccessed >> 1;
          return this.WAVERAM8[address] | this.WAVERAM8[address | 1] << 8 | this.WAVERAM8[address | 2] << 16 | this.WAVERAM8[address | 3] << 24;
        };
      }
      GameBoyAdvanceChannel3Synth.prototype.enableCheck = function() {
        this.Enabled = /*this.canPlay && */
        this.consecutive || (this.totalLength | 0) > 0;
      };
      GameBoyAdvanceChannel3Synth.prototype.clockAudioLength = function() {
        if ((this.totalLength | 0) > 1) {
          this.totalLength = (this.totalLength | 0) - 1 | 0;
        } else if ((this.totalLength | 0) == 1) {
          this.totalLength = 0;
          this.enableCheck();
          this.sound.unsetNR52(251);
        }
      };
      GameBoyAdvanceChannel3Synth.prototype.computeAudioChannel = function() {
        if ((this.counter | 0) == 0) {
          if (this.canPlay) {
            this.lastSampleLookup = (this.lastSampleLookup | 0) + 1 & this.WaveRAMBankSize | this.WAVERAMBankSpecified;
          }
          this.counter = this.FrequencyPeriod | 0;
        }
      };
      GameBoyAdvanceChannel3Synth.prototype.readSOUND3CNT_L = function() {
        return this.nr30 | 0;
      };
      GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_L = function(data) {
        data = data | 0;
        if (!this.canPlay && (data | 0) >= 128) {
          this.lastSampleLookup = 0;
        }
        this.canPlay = data > 127;
        this.WaveRAMBankSize = data & 32 | 31;
        this.WAVERAMBankSpecified = (data & 64) >> 1 ^ data & 32;
        this.WAVERAMBankAccessed = (data & 64) >> 1 ^ 32;
        if (this.canPlay && (this.nr30 | 0) > 127 && !this.consecutive) {
          this.sound.setNR52(4);
        }
        this.nr30 = data | 0;
      };
      GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_H0 = function(data) {
        data = data | 0;
        this.totalLength = 256 - (data | 0) | 0;
        this.enableCheck();
      };
      GameBoyAdvanceChannel3Synth.prototype.readSOUND3CNT_H = function() {
        return this.nr32 | 0;
      };
      GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_H1 = function(data) {
        data = data | 0;
        switch (data >> 5) {
          case 0:
            this.patternType = 4;
            break;
          case 1:
            this.patternType = 0;
            break;
          case 2:
            this.patternType = 1;
            break;
          case 3:
            this.patternType = 2;
            break;
          default:
            this.patternType = 3;
        }
        this.nr32 = data | 0;
      };
      GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_X0 = function(data) {
        data = data | 0;
        this.frequency = this.frequency & 1792 | data;
        this.FrequencyPeriod = 2048 - (this.frequency | 0) << 3;
      };
      GameBoyAdvanceChannel3Synth.prototype.readSOUND3CNT_X = function() {
        return this.nr34 | 0;
      };
      GameBoyAdvanceChannel3Synth.prototype.writeSOUND3CNT_X1 = function(data) {
        data = data | 0;
        if ((data | 0) > 127) {
          if ((this.totalLength | 0) == 0) {
            this.totalLength = 256;
          }
          this.lastSampleLookup = 0;
          if ((data & 64) == 64) {
            this.sound.setNR52(4);
          }
        }
        this.consecutive = (data & 64) == 0;
        this.frequency = (data & 7) << 8 | this.frequency & 255;
        this.FrequencyPeriod = 2048 - (this.frequency | 0) << 3;
        this.enableCheck();
        this.nr34 = data | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceChannel4Synth.js
  var require_GameBoyAdvanceChannel4Synth = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceChannel4Synth.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceChannel4Synth;
      var getInt8Array = require_TypedArrayShim().getInt8Array;
      function GameBoyAdvanceChannel4Synth(sound) {
        this.sound = sound;
        this.currentSampleLeft = 0;
        this.currentSampleLeftSecondary = 0;
        this.currentSampleRight = 0;
        this.currentSampleRightSecondary = 0;
        this.totalLength = 64;
        this.envelopeVolume = 0;
        this.FrequencyPeriod = 32;
        this.lastSampleLookup = 0;
        this.BitRange = 32767;
        this.VolumeShifter = 15;
        this.currentVolume = 0;
        this.consecutive = true;
        this.envelopeSweeps = 0;
        this.envelopeSweepsLast = -1;
        this.canPlay = false;
        this.Enabled = false;
        this.counter = 0;
        this.nr42 = 0;
        this.nr43 = 0;
        this.nr44 = 0;
        this.cachedSample = 0;
        this.intializeWhiteNoise();
        this.noiseSampleTable = this.LSFR15Table;
      }
      GameBoyAdvanceChannel4Synth.prototype.intializeWhiteNoise = function() {
        var randomFactor = 1;
        this.LSFR15Table = getInt8Array(524288);
        var LSFR = 32767;
        var LSFRShifted = 16383;
        for (var index = 0; index < 32768; ++index) {
          randomFactor = 1 - (LSFR & 1);
          this.LSFR15Table[32768 | index] = randomFactor;
          this.LSFR15Table[65536 | index] = randomFactor * 2;
          this.LSFR15Table[98304 | index] = randomFactor * 3;
          this.LSFR15Table[131072 | index] = randomFactor * 4;
          this.LSFR15Table[163840 | index] = randomFactor * 5;
          this.LSFR15Table[196608 | index] = randomFactor * 6;
          this.LSFR15Table[229376 | index] = randomFactor * 7;
          this.LSFR15Table[262144 | index] = randomFactor * 8;
          this.LSFR15Table[294912 | index] = randomFactor * 9;
          this.LSFR15Table[327680 | index] = randomFactor * 10;
          this.LSFR15Table[360448 | index] = randomFactor * 11;
          this.LSFR15Table[393216 | index] = randomFactor * 12;
          this.LSFR15Table[425984 | index] = randomFactor * 13;
          this.LSFR15Table[458752 | index] = randomFactor * 14;
          this.LSFR15Table[491520 | index] = randomFactor * 15;
          LSFRShifted = LSFR >> 1;
          LSFR = LSFRShifted | ((LSFRShifted ^ LSFR) & 1) << 14;
        }
        this.LSFR7Table = getInt8Array(2048);
        LSFR = 127;
        for (index = 0; index < 128; ++index) {
          randomFactor = 1 - (LSFR & 1);
          this.LSFR7Table[128 | index] = randomFactor;
          this.LSFR7Table[256 | index] = randomFactor * 2;
          this.LSFR7Table[384 | index] = randomFactor * 3;
          this.LSFR7Table[512 | index] = randomFactor * 4;
          this.LSFR7Table[640 | index] = randomFactor * 5;
          this.LSFR7Table[768 | index] = randomFactor * 6;
          this.LSFR7Table[896 | index] = randomFactor * 7;
          this.LSFR7Table[1024 | index] = randomFactor * 8;
          this.LSFR7Table[1152 | index] = randomFactor * 9;
          this.LSFR7Table[1280 | index] = randomFactor * 10;
          this.LSFR7Table[1408 | index] = randomFactor * 11;
          this.LSFR7Table[1536 | index] = randomFactor * 12;
          this.LSFR7Table[1664 | index] = randomFactor * 13;
          this.LSFR7Table[1792 | index] = randomFactor * 14;
          this.LSFR7Table[1920 | index] = randomFactor * 15;
          LSFRShifted = LSFR >> 1;
          LSFR = LSFRShifted | ((LSFRShifted ^ LSFR) & 1) << 6;
        }
      };
      GameBoyAdvanceChannel4Synth.prototype.disabled = function() {
        this.totalLength = 64;
        this.nr42 = 0;
        this.envelopeVolume = 0;
        this.nr43 = 0;
        this.FrequencyPeriod = 32;
        this.lastSampleLookup = 0;
        this.BitRange = 32767;
        this.VolumeShifter = 15;
        this.currentVolume = 0;
        this.noiseSampleTable = this.LSFR15Table;
        this.nr44 = 0;
        this.consecutive = true;
        this.envelopeSweeps = 0;
        this.envelopeSweepsLast = -1;
        this.canPlay = false;
        this.Enabled = false;
        this.counter = 0;
      };
      GameBoyAdvanceChannel4Synth.prototype.clockAudioLength = function() {
        if ((this.totalLength | 0) > 1) {
          this.totalLength = (this.totalLength | 0) - 1 | 0;
        } else if ((this.totalLength | 0) == 1) {
          this.totalLength = 0;
          this.enableCheck();
          this.sound.unsetNR52(247);
        }
      };
      GameBoyAdvanceChannel4Synth.prototype.clockAudioEnvelope = function() {
        if ((this.envelopeSweepsLast | 0) > -1) {
          if ((this.envelopeSweeps | 0) > 0) {
            this.envelopeSweeps = (this.envelopeSweeps | 0) - 1 | 0;
          } else {
            if (!this.envelopeType) {
              if ((this.envelopeVolume | 0) > 0) {
                this.envelopeVolume = (this.envelopeVolume | 0) - 1 | 0;
                this.currentVolume = (this.envelopeVolume | 0) << (this.VolumeShifter | 0);
                this.envelopeSweeps = this.envelopeSweepsLast | 0;
              } else {
                this.envelopeSweepsLast = -1;
              }
            } else if ((this.envelopeVolume | 0) < 15) {
              this.envelopeVolume = (this.envelopeVolume | 0) + 1 | 0;
              this.currentVolume = (this.envelopeVolume | 0) << (this.VolumeShifter | 0);
              this.envelopeSweeps = this.envelopeSweepsLast | 0;
            } else {
              this.envelopeSweepsLast = -1;
            }
          }
        }
      };
      GameBoyAdvanceChannel4Synth.prototype.computeAudioChannel = function() {
        if ((this.counter | 0) == 0) {
          this.lastSampleLookup = (this.lastSampleLookup | 0) + 1 & this.BitRange;
          this.counter = this.FrequencyPeriod | 0;
        }
      };
      GameBoyAdvanceChannel4Synth.prototype.enableCheck = function() {
        this.Enabled = (this.consecutive || (this.totalLength | 0) > 0) && this.canPlay;
      };
      GameBoyAdvanceChannel4Synth.prototype.volumeEnableCheck = function() {
        this.canPlay = (this.nr42 | 0) > 7;
        this.enableCheck();
      };
      GameBoyAdvanceChannel4Synth.prototype.outputLevelCache = function() {
        this.currentSampleLeft = this.sound.leftChannel4 ? this.cachedSample | 0 : 0;
        this.currentSampleRight = this.sound.rightChannel4 ? this.cachedSample | 0 : 0;
        this.outputLevelSecondaryCache();
      };
      GameBoyAdvanceChannel4Synth.prototype.outputLevelSecondaryCache = function() {
        if (this.Enabled) {
          this.currentSampleLeftSecondary = this.currentSampleLeft | 0;
          this.currentSampleRightSecondary = this.currentSampleRight | 0;
        } else {
          this.currentSampleLeftSecondary = 0;
          this.currentSampleRightSecondary = 0;
        }
      };
      GameBoyAdvanceChannel4Synth.prototype.updateCache = function() {
        this.cachedSample = this.noiseSampleTable[this.currentVolume | this.lastSampleLookup] | 0;
        this.outputLevelCache();
      };
      GameBoyAdvanceChannel4Synth.prototype.writeSOUND4CNT_L0 = function(data) {
        data = data | 0;
        this.totalLength = 64 - (data & 63) | 0;
        this.enableCheck();
      };
      GameBoyAdvanceChannel4Synth.prototype.writeSOUND4CNT_L1 = function(data) {
        data = data | 0;
        this.envelopeType = (data & 8) == 8;
        this.nr42 = data | 0;
        this.volumeEnableCheck();
      };
      GameBoyAdvanceChannel4Synth.prototype.readSOUND4CNT_L = function() {
        return this.nr42 | 0;
      };
      GameBoyAdvanceChannel4Synth.prototype.writeSOUND4CNT_H0 = function(data) {
        data = data | 0;
        this.FrequencyPeriod = Math.max((data & 7) << 4, 8) << ((data >> 4) + 2 | 0);
        var bitWidth = data & 8;
        if ((bitWidth | 0) == 8 && (this.BitRange | 0) == 32767 || (bitWidth | 0) == 0 && (this.BitRange | 0) == 127) {
          this.lastSampleLookup = 0;
          this.BitRange = (bitWidth | 0) == 8 ? 127 : 32767;
          this.VolumeShifter = (bitWidth | 0) == 8 ? 7 : 15;
          this.currentVolume = this.envelopeVolume << (this.VolumeShifter | 0);
          this.noiseSampleTable = (bitWidth | 0) == 8 ? this.LSFR7Table : this.LSFR15Table;
        }
        this.nr43 = data | 0;
      };
      GameBoyAdvanceChannel4Synth.prototype.readSOUND4CNT_H0 = function() {
        return this.nr43 | 0;
      };
      GameBoyAdvanceChannel4Synth.prototype.writeSOUND4CNT_H1 = function(data) {
        data = data | 0;
        this.nr44 = data | 0;
        this.consecutive = (data & 64) == 0;
        if ((data | 0) > 127) {
          this.envelopeVolume = this.nr42 >> 4;
          this.currentVolume = this.envelopeVolume << (this.VolumeShifter | 0);
          this.envelopeSweepsLast = (this.nr42 & 7) - 1 | 0;
          if ((this.totalLength | 0) == 0) {
            this.totalLength = 64;
          }
          if ((data & 64) == 64) {
            this.sound.setNR52(8);
          }
        }
        this.enableCheck();
      };
      GameBoyAdvanceChannel4Synth.prototype.readSOUND4CNT_H1 = function() {
        return this.nr44 | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceFIFOCore.js
  var require_GameBoyAdvanceFIFOCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/sound/GameBoyAdvanceFIFOCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceFIFO;
      var getInt8Array = require_TypedArrayShim().getInt8Array;
      function GameBoyAdvanceFIFO() {
        this.count = 0;
        this.position = 0;
        this.buffer = getInt8Array(32);
      }
      GameBoyAdvanceFIFO.prototype.push8 = function(sample) {
        sample = sample | 0;
        var writePosition = (this.position | 0) + (this.count | 0) | 0;
        this.buffer[writePosition & 31] = sample << 24 >> 24;
        if ((this.count | 0) < 32) {
          this.count = (this.count | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceFIFO.prototype.push16 = function(sample) {
        sample = sample | 0;
        this.push8(sample | 0);
        this.push8(sample >> 8);
      };
      GameBoyAdvanceFIFO.prototype.push32 = function(sample) {
        sample = sample | 0;
        this.push8(sample | 0);
        this.push8(sample >> 8);
        this.push8(sample >> 16);
        this.push8(sample >> 24);
      };
      GameBoyAdvanceFIFO.prototype.shift = function() {
        var output = 0;
        if ((this.count | 0) > 0) {
          this.count = (this.count | 0) - 1 | 0;
          output = this.buffer[this.position & 31] << 3;
          this.position = (this.position | 0) + 1 & 31;
        }
        return output | 0;
      };
      GameBoyAdvanceFIFO.prototype.requestingDMA = function() {
        return this.count <= 16;
      };
      GameBoyAdvanceFIFO.prototype.samplesUntilDMATrigger = function() {
        return (this.count | 0) - 16 | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceSoundCore.js
  var require_GameBoyAdvanceSoundCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceSoundCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceSound;
      var GameBoyAdvanceChannel1Synth = require_GameBoyAdvanceChannel1Synth();
      var GameBoyAdvanceChannel2Synth = require_GameBoyAdvanceChannel2Synth();
      var GameBoyAdvanceChannel3Synth = require_GameBoyAdvanceChannel3Synth();
      var GameBoyAdvanceChannel4Synth = require_GameBoyAdvanceChannel4Synth();
      var GameBoyAdvanceFIFO = require_GameBoyAdvanceFIFOCore();
      function GameBoyAdvanceSound(IOCore) {
        this.IOCore = IOCore;
        this.coreExposed = this.IOCore.coreExposed;
      }
      GameBoyAdvanceSound.prototype.initialize = function() {
        this.dmaChannel1 = this.IOCore.dmaChannel1;
        this.dmaChannel2 = this.IOCore.dmaChannel2;
        this.preprocessInitialization(false);
        this.audioTicks = 0;
        this.initializeAudioStartState();
      };
      GameBoyAdvanceSound.prototype.initializeOutput = function(enabled, audioResamplerFirstPassFactor) {
        this.preprocessInitialization(enabled);
        this.audioIndex = 0;
        this.downsampleInputLeft = 0;
        this.downsampleInputRight = 0;
        this.audioResamplerFirstPassFactor = audioResamplerFirstPassFactor | 0;
      };
      GameBoyAdvanceSound.prototype.initializeAudioStartState = function() {
        this.nr60 = 0;
        this.nr61 = 0;
        this.nr62 = this.IOCore.BIOSFound && !this.IOCore.settings.SKIPBoot ? 0 : 255;
        this.nr63 = this.IOCore.BIOSFound && !this.IOCore.settings.SKIPBoot ? 0 : 2;
        this.soundMasterEnabled = !this.IOCore.BIOSFound || this.IOCore.settings.SKIPBoot;
        this.mixerSoundBIAS = this.IOCore.BIOSFound && !this.IOCore.settings.SKIPBoot ? 0 : 512;
        this.channel1 = new GameBoyAdvanceChannel1Synth(this);
        this.channel2 = new GameBoyAdvanceChannel2Synth(this);
        this.channel3 = new GameBoyAdvanceChannel3Synth(this);
        this.channel4 = new GameBoyAdvanceChannel4Synth(this);
        this.CGBMixerOutputCacheLeft = 0;
        this.CGBMixerOutputCacheLeftFolded = 0;
        this.CGBMixerOutputCacheRight = 0;
        this.CGBMixerOutputCacheRightFolded = 0;
        this.AGBDirectSoundATimer = 0;
        this.AGBDirectSoundBTimer = 0;
        this.AGBDirectSoundA = 0;
        this.AGBDirectSoundAFolded = 0;
        this.AGBDirectSoundB = 0;
        this.AGBDirectSoundBFolded = 0;
        this.AGBDirectSoundAShifter = 0;
        this.AGBDirectSoundBShifter = 0;
        this.AGBDirectSoundALeftCanPlay = false;
        this.AGBDirectSoundBLeftCanPlay = false;
        this.AGBDirectSoundARightCanPlay = false;
        this.AGBDirectSoundBRightCanPlay = false;
        this.CGBOutputRatio = 2;
        this.FIFOABuffer = new GameBoyAdvanceFIFO();
        this.FIFOBBuffer = new GameBoyAdvanceFIFO();
        this.AGBDirectSoundAFIFOClear();
        this.AGBDirectSoundBFIFOClear();
        this.audioDisabled();
      };
      GameBoyAdvanceSound.prototype.audioDisabled = function() {
        this.channel1.disabled();
        this.channel2.disabled();
        this.channel3.disabled();
        this.channel4.disabled();
        this.nr50 = 0;
        this.VinLeftChannelMasterVolume = 1;
        this.VinRightChannelMasterVolume = 1;
        this.nr51 = 0;
        this.rightChannel1 = false;
        this.rightChannel2 = false;
        this.rightChannel3 = false;
        this.rightChannel4 = false;
        this.leftChannel1 = false;
        this.leftChannel2 = false;
        this.leftChannel3 = false;
        this.leftChannel4 = false;
        this.nr52 = 0;
        this.soundMasterEnabled = false;
        this.mixerOutputCacheLeft = this.mixerSoundBIAS | 0;
        this.mixerOutputCacheRight = this.mixerSoundBIAS | 0;
        this.audioClocksUntilNextEventCounter = 0;
        this.audioClocksUntilNextEvent = 0;
        this.sequencePosition = 0;
        this.sequencerClocks = 32768;
        this.PWMWidth = 512;
        this.PWMWidthOld = 512;
        this.PWMWidthShadow = 512;
        this.PWMBitDepthMask = 1022;
        this.PWMBitDepthMaskShadow = 1022;
        this.channel1.outputLevelCache();
        this.channel2.outputLevelCache();
        this.channel3.updateCache();
        this.channel4.updateCache();
      };
      GameBoyAdvanceSound.prototype.audioEnabled = function() {
        this.nr52 = 128;
        this.soundMasterEnabled = true;
      };
      GameBoyAdvanceSound.prototype.addClocks = function(clocks) {
        clocks = clocks | 0;
        this.audioTicks = (this.audioTicks | 0) + (clocks | 0) | 0;
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceSound.prototype.generateAudioReal = function(numSamples) {
          numSamples = numSamples | 0;
          var multiplier = 0;
          if (this.soundMasterEnabled && !this.IOCore.isStopped()) {
            for (var clockUpTo = 0; (numSamples | 0) > 0; ) {
              clockUpTo = Math.min(this.PWMWidth | 0, numSamples | 0) | 0;
              this.PWMWidth = (this.PWMWidth | 0) - (clockUpTo | 0) | 0;
              numSamples = (numSamples | 0) - (clockUpTo | 0) | 0;
              while ((clockUpTo | 0) > 0) {
                multiplier = Math.min(clockUpTo | 0, (this.audioResamplerFirstPassFactor | 0) - (this.audioIndex | 0) | 0) | 0;
                clockUpTo = (clockUpTo | 0) - (multiplier | 0) | 0;
                this.audioIndex = (this.audioIndex | 0) + (multiplier | 0) | 0;
                this.downsampleInputLeft = (this.downsampleInputLeft | 0) + Math.imul(this.mixerOutputCacheLeft | 0, multiplier | 0) | 0;
                this.downsampleInputRight = (this.downsampleInputRight | 0) + Math.imul(this.mixerOutputCacheRight | 0, multiplier | 0) | 0;
                if ((this.audioIndex | 0) == (this.audioResamplerFirstPassFactor | 0)) {
                  this.audioIndex = 0;
                  this.coreExposed.outputAudio(this.downsampleInputLeft | 0, this.downsampleInputRight | 0);
                  this.downsampleInputLeft = 0;
                  this.downsampleInputRight = 0;
                }
              }
              if ((this.PWMWidth | 0) == 0) {
                this.computeNextPWMInterval();
                this.PWMWidthOld = this.PWMWidthShadow | 0;
                this.PWMWidth = this.PWMWidthShadow | 0;
              }
            }
          } else {
            while ((numSamples | 0) > 0) {
              multiplier = Math.min(numSamples | 0, (this.audioResamplerFirstPassFactor | 0) - (this.audioIndex | 0) | 0) | 0;
              numSamples = (numSamples | 0) - (multiplier | 0) | 0;
              this.audioIndex = (this.audioIndex | 0) + (multiplier | 0) | 0;
              if ((this.audioIndex | 0) == (this.audioResamplerFirstPassFactor | 0)) {
                this.audioIndex = 0;
                this.coreExposed.outputAudio(this.downsampleInputLeft | 0, this.downsampleInputRight | 0);
                this.downsampleInputLeft = 0;
                this.downsampleInputRight = 0;
              }
            }
          }
        };
      } else {
        GameBoyAdvanceSound.prototype.generateAudioReal = function(numSamples) {
          var multiplier = 0;
          if (this.soundMasterEnabled && !this.IOCore.isStopped()) {
            for (var clockUpTo = 0; numSamples > 0; ) {
              clockUpTo = Math.min(this.PWMWidth, numSamples);
              this.PWMWidth = this.PWMWidth - clockUpTo;
              numSamples -= clockUpTo;
              while (clockUpTo > 0) {
                multiplier = Math.min(clockUpTo, this.audioResamplerFirstPassFactor - this.audioIndex);
                clockUpTo -= multiplier;
                this.audioIndex += multiplier;
                this.downsampleInputLeft += this.mixerOutputCacheLeft * multiplier;
                this.downsampleInputRight += this.mixerOutputCacheRight * multiplier;
                if (this.audioIndex == this.audioResamplerFirstPassFactor) {
                  this.audioIndex = 0;
                  this.coreExposed.outputAudio(this.downsampleInputLeft, this.downsampleInputRight);
                  this.downsampleInputLeft = 0;
                  this.downsampleInputRight = 0;
                }
              }
              if (this.PWMWidth == 0) {
                this.computeNextPWMInterval();
                this.PWMWidthOld = this.PWMWidthShadow;
                this.PWMWidth = this.PWMWidthShadow;
              }
            }
          } else {
            while (numSamples > 0) {
              multiplier = Math.min(numSamples, this.audioResamplerFirstPassFactor - this.audioIndex);
              numSamples -= multiplier;
              this.audioIndex += multiplier;
              if (this.audioIndex == this.audioResamplerFirstPassFactor) {
                this.audioIndex = 0;
                this.coreExposed.outputAudio(this.downsampleInputLeft, this.downsampleInputRight);
                this.downsampleInputLeft = 0;
                this.downsampleInputRight = 0;
              }
            }
          }
        };
      }
      GameBoyAdvanceSound.prototype.generateAudioFake = function(numSamples) {
        numSamples = numSamples | 0;
        if (this.soundMasterEnabled && !this.IOCore.isStopped()) {
          for (var clockUpTo = 0; (numSamples | 0) > 0; ) {
            clockUpTo = Math.min(this.PWMWidth | 0, numSamples | 0) | 0;
            this.PWMWidth = (this.PWMWidth | 0) - (clockUpTo | 0) | 0;
            numSamples = (numSamples | 0) - (clockUpTo | 0) | 0;
            if ((this.PWMWidth | 0) == 0) {
              this.computeNextPWMInterval();
              this.PWMWidthOld = this.PWMWidthShadow | 0;
              this.PWMWidth = this.PWMWidthShadow | 0;
            }
          }
        }
      };
      GameBoyAdvanceSound.prototype.preprocessInitialization = function(audioInitialized) {
        if (audioInitialized) {
          this.generateAudio = this.generateAudioReal;
          this.audioInitialized = true;
        } else {
          this.generateAudio = this.generateAudioFake;
          this.audioInitialized = false;
        }
      };
      GameBoyAdvanceSound.prototype.audioJIT = function() {
        this.generateAudio(this.audioTicks | 0);
        this.audioTicks = 0;
      };
      GameBoyAdvanceSound.prototype.computeNextPWMInterval = function() {
        for (var numSamples = this.PWMWidthOld | 0, clockUpTo = 0; (numSamples | 0) > 0; numSamples = (numSamples | 0) - 1 | 0) {
          clockUpTo = Math.min(this.audioClocksUntilNextEventCounter | 0, this.sequencerClocks | 0, numSamples | 0) | 0;
          this.audioClocksUntilNextEventCounter = (this.audioClocksUntilNextEventCounter | 0) - (clockUpTo | 0) | 0;
          this.sequencerClocks = (this.sequencerClocks | 0) - (clockUpTo | 0) | 0;
          numSamples = (numSamples | 0) - (clockUpTo | 0) | 0;
          if ((this.sequencerClocks | 0) == 0) {
            this.audioComputeSequencer();
            this.sequencerClocks = 32768;
          }
          if ((this.audioClocksUntilNextEventCounter | 0) == 0) {
            this.computeAudioChannels();
          }
        }
        this.PWMBitDepthMask = this.PWMBitDepthMaskShadow | 0;
        this.channel1.outputLevelCache();
        this.channel2.outputLevelCache();
        this.channel3.updateCache();
        this.channel4.updateCache();
        this.CGBMixerOutputLevelCache();
        this.mixerOutputLevelCache();
      };
      GameBoyAdvanceSound.prototype.audioComputeSequencer = function() {
        switch (this.sequencePosition++) {
          case 0:
            this.clockAudioLength();
            break;
          case 2:
            this.clockAudioLength();
            this.channel1.clockAudioSweep();
            break;
          case 4:
            this.clockAudioLength();
            break;
          case 6:
            this.clockAudioLength();
            this.channel1.clockAudioSweep();
            break;
          case 7:
            this.clockAudioEnvelope();
            this.sequencePosition = 0;
        }
      };
      GameBoyAdvanceSound.prototype.clockAudioLength = function() {
        this.channel1.clockAudioLength();
        this.channel2.clockAudioLength();
        this.channel3.clockAudioLength();
        this.channel4.clockAudioLength();
      };
      GameBoyAdvanceSound.prototype.clockAudioEnvelope = function() {
        this.channel1.clockAudioEnvelope();
        this.channel2.clockAudioEnvelope();
        this.channel4.clockAudioEnvelope();
      };
      GameBoyAdvanceSound.prototype.computeAudioChannels = function() {
        this.channel1.FrequencyCounter = (this.channel1.FrequencyCounter | 0) - (this.audioClocksUntilNextEvent | 0) | 0;
        this.channel2.FrequencyCounter = (this.channel2.FrequencyCounter | 0) - (this.audioClocksUntilNextEvent | 0) | 0;
        this.channel3.counter = (this.channel3.counter | 0) - (this.audioClocksUntilNextEvent | 0) | 0;
        this.channel4.counter = (this.channel4.counter | 0) - (this.audioClocksUntilNextEvent | 0) | 0;
        this.channel1.computeAudioChannel();
        this.channel2.computeAudioChannel();
        this.channel3.computeAudioChannel();
        this.channel4.computeAudioChannel();
        this.audioClocksUntilNextEventCounter = this.audioClocksUntilNextEvent = Math.min(this.channel1.FrequencyCounter | 0, this.channel2.FrequencyCounter | 0, this.channel3.counter | 0, this.channel4.counter | 0) | 0;
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceSound.prototype.CGBMixerOutputLevelCache = function() {
          this.CGBMixerOutputCacheLeft = Math.imul((this.channel1.currentSampleLeftTrimary | 0) + (this.channel2.currentSampleLeftTrimary | 0) + (this.channel3.currentSampleLeftSecondary | 0) + (this.channel4.currentSampleLeftSecondary | 0) | 0, this.VinLeftChannelMasterVolume | 0) | 0;
          this.CGBMixerOutputCacheRight = Math.imul((this.channel1.currentSampleRightTrimary | 0) + (this.channel2.currentSampleRightTrimary | 0) + (this.channel3.currentSampleRightSecondary | 0) + (this.channel4.currentSampleRightSecondary | 0) | 0, this.VinRightChannelMasterVolume | 0) | 0;
          this.CGBFolder();
        };
      } else {
        GameBoyAdvanceSound.prototype.CGBMixerOutputLevelCache = function() {
          this.CGBMixerOutputCacheLeft = (this.channel1.currentSampleLeftTrimary + this.channel2.currentSampleLeftTrimary + this.channel3.currentSampleLeftSecondary + this.channel4.currentSampleLeftSecondary) * this.VinLeftChannelMasterVolume;
          this.CGBMixerOutputCacheRight = (this.channel1.currentSampleRightTrimary + this.channel2.currentSampleRightTrimary + this.channel3.currentSampleRightSecondary + this.channel4.currentSampleRightSecondary) * this.VinRightChannelMasterVolume;
          this.CGBFolder();
        };
      }
      GameBoyAdvanceSound.prototype.writeWAVE8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.channel3.writeWAVE8(address | 0, data | 0);
      };
      GameBoyAdvanceSound.prototype.readWAVE8 = function(address) {
        address | 0;
        return this.channel3.readWAVE8(address | 0) | 0;
      };
      GameBoyAdvanceSound.prototype.writeWAVE16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.channel3.writeWAVE16(address | 0, data | 0);
      };
      GameBoyAdvanceSound.prototype.readWAVE16 = function(address) {
        address | 0;
        return this.channel3.readWAVE16(address | 0) | 0;
      };
      GameBoyAdvanceSound.prototype.writeWAVE32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.channel3.writeWAVE32(address | 0, data | 0);
      };
      GameBoyAdvanceSound.prototype.readWAVE32 = function(address) {
        address | 0;
        return this.channel3.readWAVE32(address | 0) | 0;
      };
      GameBoyAdvanceSound.prototype.writeFIFOA8 = function(data) {
        data = data | 0;
        this.FIFOABuffer.push8(data | 0);
        this.checkFIFOAPendingSignal();
      };
      GameBoyAdvanceSound.prototype.writeFIFOB8 = function(data) {
        data = data | 0;
        this.FIFOBBuffer.push8(data | 0);
        this.checkFIFOBPendingSignal();
      };
      GameBoyAdvanceSound.prototype.writeFIFOA16 = function(data) {
        data = data | 0;
        this.FIFOABuffer.push16(data | 0);
        this.checkFIFOAPendingSignal();
      };
      GameBoyAdvanceSound.prototype.writeFIFOB16 = function(data) {
        data = data | 0;
        this.FIFOBBuffer.push16(data | 0);
        this.checkFIFOBPendingSignal();
      };
      GameBoyAdvanceSound.prototype.writeFIFOA32 = function(data) {
        data = data | 0;
        this.FIFOABuffer.push32(data | 0);
        this.checkFIFOAPendingSignal();
      };
      GameBoyAdvanceSound.prototype.writeFIFOB32 = function(data) {
        data = data | 0;
        this.FIFOBBuffer.push32(data | 0);
        this.checkFIFOBPendingSignal();
      };
      GameBoyAdvanceSound.prototype.checkFIFOAPendingSignal = function() {
        if (this.FIFOABuffer.requestingDMA()) {
          this.dmaChannel1.soundFIFOARequest();
        }
      };
      GameBoyAdvanceSound.prototype.checkFIFOBPendingSignal = function() {
        if (this.FIFOBBuffer.requestingDMA()) {
          this.dmaChannel2.soundFIFOBRequest();
        }
      };
      GameBoyAdvanceSound.prototype.AGBDirectSoundAFIFOClear = function() {
        this.FIFOABuffer.count = 0;
        this.AGBDirectSoundATimerIncrement();
      };
      GameBoyAdvanceSound.prototype.AGBDirectSoundBFIFOClear = function() {
        this.FIFOBBuffer.count = 0;
        this.AGBDirectSoundBTimerIncrement();
      };
      GameBoyAdvanceSound.prototype.AGBDirectSoundTimer0ClockTick = function() {
        this.audioJIT();
        if ((this.AGBDirectSoundATimer | 0) == 0) {
          this.AGBDirectSoundATimerIncrement();
        }
        if ((this.AGBDirectSoundBTimer | 0) == 0) {
          this.AGBDirectSoundBTimerIncrement();
        }
      };
      GameBoyAdvanceSound.prototype.AGBDirectSoundTimer1ClockTick = function() {
        this.audioJIT();
        if ((this.AGBDirectSoundATimer | 0) == 1) {
          this.AGBDirectSoundATimerIncrement();
        }
        if ((this.AGBDirectSoundBTimer | 0) == 1) {
          this.AGBDirectSoundBTimerIncrement();
        }
      };
      GameBoyAdvanceSound.prototype.nextFIFOAEventTime = function() {
        var nextEventTime = 0;
        if (!this.FIFOABuffer.requestingDMA()) {
          var samplesUntilDMA = this.FIFOABuffer.samplesUntilDMATrigger() | 0;
          if ((this.AGBDirectSoundATimer | 0) == 0) {
            nextEventTime = this.IOCore.timer.nextTimer0Overflow(samplesUntilDMA | 0);
          } else {
            nextEventTime = this.IOCore.timer.nextTimer1Overflow(samplesUntilDMA | 0);
          }
        }
        return Math.max(Math.min(nextEventTime, 2147483647), -1) | 0;
      };
      GameBoyAdvanceSound.prototype.nextFIFOBEventTime = function() {
        var nextEventTime = 0;
        if (!this.FIFOBBuffer.requestingDMA()) {
          var samplesUntilDMA = this.FIFOBBuffer.samplesUntilDMATrigger() | 0;
          if ((this.AGBDirectSoundBTimer | 0) == 0) {
            nextEventTime = this.IOCore.timer.nextTimer0Overflow(samplesUntilDMA | 0);
          } else {
            nextEventTime = this.IOCore.timer.nextTimer1Overflow(samplesUntilDMA | 0);
          }
        }
        return Math.max(Math.min(nextEventTime, 2147483647), -1) | 0;
      };
      GameBoyAdvanceSound.prototype.AGBDirectSoundATimerIncrement = function() {
        this.AGBDirectSoundA = this.FIFOABuffer.shift() | 0;
        this.checkFIFOAPendingSignal();
        this.AGBFIFOAFolder();
      };
      GameBoyAdvanceSound.prototype.AGBDirectSoundBTimerIncrement = function() {
        this.AGBDirectSoundB = this.FIFOBBuffer.shift() | 0;
        this.checkFIFOBPendingSignal();
        this.AGBFIFOBFolder();
      };
      GameBoyAdvanceSound.prototype.AGBFIFOAFolder = function() {
        this.AGBDirectSoundAFolded = this.AGBDirectSoundA >> (this.AGBDirectSoundAShifter | 0);
      };
      GameBoyAdvanceSound.prototype.AGBFIFOBFolder = function() {
        this.AGBDirectSoundBFolded = this.AGBDirectSoundB >> (this.AGBDirectSoundBShifter | 0);
      };
      GameBoyAdvanceSound.prototype.CGBFolder = function() {
        this.CGBMixerOutputCacheLeftFolded = this.CGBMixerOutputCacheLeft << (this.CGBOutputRatio | 0) >> 1;
        this.CGBMixerOutputCacheRightFolded = this.CGBMixerOutputCacheRight << (this.CGBOutputRatio | 0) >> 1;
      };
      GameBoyAdvanceSound.prototype.mixerOutputLevelCache = function() {
        this.mixerOutputCacheLeft = Math.min(Math.max((this.AGBDirectSoundALeftCanPlay ? this.AGBDirectSoundAFolded | 0 : 0) + (this.AGBDirectSoundBLeftCanPlay ? this.AGBDirectSoundBFolded | 0 : 0) + (this.CGBMixerOutputCacheLeftFolded | 0) + (this.mixerSoundBIAS | 0) | 0, 0) | 0, 1023) & this.PWMBitDepthMask;
        this.mixerOutputCacheRight = Math.min(Math.max((this.AGBDirectSoundARightCanPlay ? this.AGBDirectSoundAFolded | 0 : 0) + (this.AGBDirectSoundBRightCanPlay ? this.AGBDirectSoundBFolded | 0 : 0) + (this.CGBMixerOutputCacheRightFolded | 0) + (this.mixerSoundBIAS | 0) | 0, 0) | 0, 1023) & this.PWMBitDepthMask;
      };
      GameBoyAdvanceSound.prototype.setNR52 = function(data) {
        data = data | 0;
        this.nr52 = data | this.nr52;
      };
      GameBoyAdvanceSound.prototype.unsetNR52 = function(data) {
        data = data | 0;
        this.nr52 = data & this.nr52;
      };
      GameBoyAdvanceSound.prototype.readSOUND1CNT_L = function() {
        return this.channel1.readSOUND1CNT_L() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND1CNT_L = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel1.writeSOUND1CNT_L(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND1CNT_H0 = function() {
        return this.channel1.readSOUND1CNT_H0() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND1CNT_H0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel1.writeSOUND1CNT_H0(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND1CNT_H1 = function() {
        return this.channel1.readSOUND1CNT_H1() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND1CNT_H1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel1.writeSOUND1CNT_H1(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.writeSOUND1CNT_X0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel1.writeSOUND1CNT_X0(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND1CNT_X = function() {
        return this.channel1.readSOUND1CNT_X() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND1CNT_X1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel1.writeSOUND1CNT_X1(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND2CNT_L0 = function() {
        return this.channel2.readSOUND2CNT_L0() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND2CNT_L0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel2.writeSOUND2CNT_L0(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND2CNT_L1 = function() {
        return this.channel2.readSOUND2CNT_L1() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND2CNT_L1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel2.writeSOUND2CNT_L1(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.writeSOUND2CNT_H0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel2.writeSOUND2CNT_H0(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND2CNT_H = function() {
        return this.channel2.readSOUND2CNT_H() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND2CNT_H1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel2.writeSOUND2CNT_H1(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND3CNT_L = function() {
        return this.channel3.readSOUND3CNT_L() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND3CNT_L = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel3.writeSOUND3CNT_L(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.writeSOUND3CNT_H0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel3.writeSOUND3CNT_H0(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND3CNT_H = function() {
        return this.channel3.readSOUND3CNT_H() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND3CNT_H1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel3.writeSOUND3CNT_H1(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.writeSOUND3CNT_X0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel3.writeSOUND3CNT_X0(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND3CNT_X = function() {
        return this.channel3.readSOUND3CNT_X() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND3CNT_X1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel3.writeSOUND3CNT_X1(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.writeSOUND4CNT_L0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel4.writeSOUND4CNT_L0(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.writeSOUND4CNT_L1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel4.writeSOUND4CNT_L1(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND4CNT_L = function() {
        return this.channel4.readSOUND4CNT_L() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND4CNT_H0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel4.writeSOUND4CNT_H0(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND4CNT_H0 = function() {
        return this.channel4.readSOUND4CNT_H0() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUND4CNT_H1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled) {
          this.audioJIT();
          this.channel4.writeSOUND4CNT_H1(data | 0);
        }
      };
      GameBoyAdvanceSound.prototype.readSOUND4CNT_H1 = function() {
        return this.channel4.readSOUND4CNT_H1() | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUNDCNT_L0 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled && (this.nr50 | 0) != (data | 0)) {
          this.audioJIT();
          this.nr50 = data | 0;
          this.VinLeftChannelMasterVolume = (data >> 4 & 7) + 1 | 0;
          this.VinRightChannelMasterVolume = (data & 7) + 1 | 0;
        }
      };
      GameBoyAdvanceSound.prototype.readSOUNDCNT_L0 = function() {
        return 136 | this.nr50;
      };
      GameBoyAdvanceSound.prototype.writeSOUNDCNT_L1 = function(data) {
        data = data | 0;
        if (this.soundMasterEnabled && (this.nr51 | 0) != (data | 0)) {
          this.audioJIT();
          this.nr51 = data | 0;
          this.rightChannel1 = (data & 1) == 1;
          this.rightChannel2 = (data & 2) == 2;
          this.rightChannel3 = (data & 4) == 4;
          this.rightChannel4 = (data & 8) == 8;
          this.leftChannel1 = (data & 16) == 16;
          this.leftChannel2 = (data & 32) == 32;
          this.leftChannel3 = (data & 64) == 64;
          this.leftChannel4 = data > 127;
        }
      };
      GameBoyAdvanceSound.prototype.readSOUNDCNT_L1 = function() {
        return this.nr51 | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUNDCNT_H0 = function(data) {
        data = data | 0;
        this.audioJIT();
        this.CGBOutputRatio = data & 3;
        this.AGBDirectSoundAShifter = (data & 4) >> 2;
        this.AGBDirectSoundBShifter = (data & 8) >> 3;
        this.nr60 = data | 0;
      };
      GameBoyAdvanceSound.prototype.readSOUNDCNT_H0 = function() {
        return this.nr60 | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUNDCNT_H1 = function(data) {
        data = data | 0;
        this.audioJIT();
        this.AGBDirectSoundARightCanPlay = (data & 1) == 1;
        this.AGBDirectSoundALeftCanPlay = (data & 2) == 2;
        this.AGBDirectSoundATimer = (data & 4) >> 2;
        if ((data & 8) == 8) {
          this.AGBDirectSoundAFIFOClear();
        }
        this.AGBDirectSoundBRightCanPlay = (data & 16) == 16;
        this.AGBDirectSoundBLeftCanPlay = (data & 32) == 32;
        this.AGBDirectSoundBTimer = (data & 64) >> 6;
        if ((data & 128) == 128) {
          this.AGBDirectSoundBFIFOClear();
        }
        this.nr61 = data | 0;
      };
      GameBoyAdvanceSound.prototype.readSOUNDCNT_H1 = function() {
        return this.nr61 | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUNDCNT_X = function(data) {
        data = data | 0;
        if (!this.soundMasterEnabled && (data | 0) > 127) {
          this.audioJIT();
          this.audioEnabled();
        } else if (this.soundMasterEnabled && (data | 0) < 128) {
          this.audioJIT();
          this.audioDisabled();
        }
      };
      GameBoyAdvanceSound.prototype.readSOUNDCNT_X = function() {
        return this.nr52 | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUNDBIAS0 = function(data) {
        data = data | 0;
        this.audioJIT();
        this.mixerSoundBIAS = this.mixerSoundBIAS & 768;
        this.mixerSoundBIAS = this.mixerSoundBIAS | data;
        this.nr62 = data | 0;
      };
      GameBoyAdvanceSound.prototype.readSOUNDBIAS0 = function() {
        return this.nr62 | 0;
      };
      GameBoyAdvanceSound.prototype.writeSOUNDBIAS1 = function(data) {
        data = data | 0;
        this.audioJIT();
        this.mixerSoundBIAS = this.mixerSoundBIAS & 255;
        this.mixerSoundBIAS = this.mixerSoundBIAS | (data & 3) << 8;
        this.PWMWidthShadow = 512 >> ((data & 192) >> 6);
        this.PWMBitDepthMaskShadow = (this.PWMWidthShadow | 0) - 1 << 1 + ((data & 192) >> 6);
        this.nr63 = data | 0;
      };
      GameBoyAdvanceSound.prototype.readSOUNDBIAS1 = function() {
        return this.nr63 | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceTimerCore.js
  var require_GameBoyAdvanceTimerCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceTimerCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceTimer;
      function GameBoyAdvanceTimer(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceTimer.prototype.prescalarLookup = [
        0,
        6,
        8,
        10
      ];
      GameBoyAdvanceTimer.prototype.initialize = function() {
        this.timer0Counter = 0;
        this.timer0Reload = 0;
        this.timer0Control = 0;
        this.timer0Enabled = false;
        this.timer0IRQ = false;
        this.timer0Precounter = 0;
        this.timer0Prescalar = 1;
        this.timer0PrescalarShifted = 0;
        this.timer1Counter = 0;
        this.timer1Reload = 0;
        this.timer1Control = 0;
        this.timer1Enabled = false;
        this.timer1IRQ = false;
        this.timer1Precounter = 0;
        this.timer1Prescalar = 1;
        this.timer1PrescalarShifted = 0;
        this.timer1CountUp = false;
        this.timer2Counter = 0;
        this.timer2Reload = 0;
        this.timer2Control = 0;
        this.timer2Enabled = false;
        this.timer2IRQ = false;
        this.timer2Precounter = 0;
        this.timer2Prescalar = 1;
        this.timer2PrescalarShifted = 0;
        this.timer2CountUp = false;
        this.timer3Counter = 0;
        this.timer3Reload = 0;
        this.timer3Control = 0;
        this.timer3Enabled = false;
        this.timer3IRQ = false;
        this.timer3Precounter = 0;
        this.timer3Prescalar = 1;
        this.timer3PrescalarShifted = 0;
        this.timer3CountUp = false;
        this.timer1UseMainClocks = false;
        this.timer1UseChainedClocks = false;
        this.timer2UseMainClocks = false;
        this.timer2UseChainedClocks = false;
        this.timer3UseMainClocks = false;
        this.timer3UseChainedClocks = false;
      };
      GameBoyAdvanceTimer.prototype.addClocks = function(clocks) {
        clocks = clocks | 0;
        this.clockSoundTimers(clocks | 0);
        this.clockTimer2(clocks | 0);
        this.clockTimer3(clocks | 0);
      };
      GameBoyAdvanceTimer.prototype.clockSoundTimers = function(clocks) {
        clocks = clocks | 0;
        for (var audioClocks = clocks | 0, predictedClocks = 0, overflowClocks = 0; (audioClocks | 0) > 0; audioClocks = (audioClocks | 0) - (predictedClocks | 0) | 0) {
          overflowClocks = this.nextAudioTimerOverflow() | 0;
          predictedClocks = Math.min(audioClocks | 0, overflowClocks | 0) | 0;
          this.clockTimer0(predictedClocks | 0);
          this.clockTimer1(predictedClocks | 0);
          this.IOCore.sound.addClocks(predictedClocks | 0);
          if ((overflowClocks | 0) == (predictedClocks | 0)) {
            this.IOCore.sound.audioJIT();
          }
        }
      };
      GameBoyAdvanceTimer.prototype.clockTimer0 = function(clocks) {
        clocks = clocks | 0;
        if (this.timer0Enabled) {
          this.timer0Precounter = (this.timer0Precounter | 0) + (clocks | 0) | 0;
          while ((this.timer0Precounter | 0) >= (this.timer0Prescalar | 0)) {
            var iterations = Math.min(this.timer0Precounter >> (this.timer0PrescalarShifted | 0), 65536 - (this.timer0Counter | 0) | 0) | 0;
            this.timer0Precounter = (this.timer0Precounter | 0) - ((iterations | 0) << (this.timer0PrescalarShifted | 0)) | 0;
            this.timer0Counter = (this.timer0Counter | 0) + (iterations | 0) | 0;
            if ((this.timer0Counter | 0) > 65535) {
              this.timer0Counter = this.timer0Reload | 0;
              this.timer0ExternalTriggerCheck();
              this.timer1ClockUpTickCheck();
            }
          }
        }
      };
      GameBoyAdvanceTimer.prototype.clockTimer1 = function(clocks) {
        clocks = clocks | 0;
        if (this.timer1UseMainClocks) {
          this.timer1Precounter = (this.timer1Precounter | 0) + (clocks | 0) | 0;
          while ((this.timer1Precounter | 0) >= (this.timer1Prescalar | 0)) {
            var iterations = Math.min(this.timer1Precounter >> (this.timer1PrescalarShifted | 0), 65536 - (this.timer1Counter | 0) | 0) | 0;
            this.timer1Precounter = (this.timer1Precounter | 0) - ((iterations | 0) << (this.timer1PrescalarShifted | 0)) | 0;
            this.timer1Counter = (this.timer1Counter | 0) + (iterations | 0) | 0;
            if ((this.timer1Counter | 0) > 65535) {
              this.timer1Counter = this.timer1Reload | 0;
              this.timer1ExternalTriggerCheck();
              this.timer2ClockUpTickCheck();
            }
          }
        }
      };
      GameBoyAdvanceTimer.prototype.clockTimer2 = function(clocks) {
        clocks = clocks | 0;
        if (this.timer2UseMainClocks) {
          this.timer2Precounter = (this.timer2Precounter | 0) + (clocks | 0) | 0;
          while ((this.timer2Precounter | 0) >= (this.timer2Prescalar | 0)) {
            var iterations = Math.min(this.timer2Precounter >> (this.timer2PrescalarShifted | 0), 65536 - (this.timer2Counter | 0) | 0) | 0;
            this.timer2Precounter = (this.timer2Precounter | 0) - ((iterations | 0) << (this.timer2PrescalarShifted | 0)) | 0;
            this.timer2Counter = (this.timer2Counter | 0) + (iterations | 0) | 0;
            if ((this.timer2Counter | 0) > 65535) {
              this.timer2Counter = this.timer2Reload | 0;
              this.timer2ExternalTriggerCheck();
              this.timer3ClockUpTickCheck();
            }
          }
        }
      };
      GameBoyAdvanceTimer.prototype.clockTimer3 = function(clocks) {
        clocks = clocks | 0;
        if (this.timer3UseMainClocks) {
          this.timer3Precounter = (this.timer3Precounter | 0) + (clocks | 0) | 0;
          while ((this.timer3Precounter | 0) >= (this.timer3Prescalar | 0)) {
            var iterations = Math.min(this.timer3Precounter >> (this.timer3PrescalarShifted | 0), 65536 - (this.timer3Counter | 0) | 0) | 0;
            this.timer3Precounter = (this.timer3Precounter | 0) - ((iterations | 0) << (this.timer3PrescalarShifted | 0)) | 0;
            this.timer3Counter = (this.timer3Counter | 0) + (iterations | 0) | 0;
            if ((this.timer3Counter | 0) > 65535) {
              this.timer3Counter = this.timer3Reload | 0;
              this.timer3ExternalTriggerCheck();
            }
          }
        }
      };
      GameBoyAdvanceTimer.prototype.timer1ClockUpTickCheck = function() {
        if (this.timer1UseChainedClocks) {
          this.timer1Counter = (this.timer1Counter | 0) + 1 | 0;
          if ((this.timer1Counter | 0) > 65535) {
            this.timer1Counter = this.timer1Reload | 0;
            this.timer1ExternalTriggerCheck();
            this.timer2ClockUpTickCheck();
          }
        }
      };
      GameBoyAdvanceTimer.prototype.timer2ClockUpTickCheck = function() {
        if (this.timer2UseChainedClocks) {
          this.timer2Counter = (this.timer2Counter | 0) + 1 | 0;
          if ((this.timer2Counter | 0) > 65535) {
            this.timer2Counter = this.timer2Reload | 0;
            this.timer2ExternalTriggerCheck();
            this.timer3ClockUpTickCheck();
          }
        }
      };
      GameBoyAdvanceTimer.prototype.timer3ClockUpTickCheck = function() {
        if (this.timer3UseChainedClocks) {
          this.timer3Counter = (this.timer3Counter | 0) + 1 | 0;
          if ((this.timer3Counter | 0) > 65535) {
            this.timer3Counter = this.timer3Reload | 0;
            this.timer3ExternalTriggerCheck();
          }
        }
      };
      GameBoyAdvanceTimer.prototype.timer0ExternalTriggerCheck = function() {
        if (this.timer0IRQ) {
          this.IOCore.irq.requestIRQ(8);
        }
        this.IOCore.sound.AGBDirectSoundTimer0ClockTick();
      };
      GameBoyAdvanceTimer.prototype.timer1ExternalTriggerCheck = function() {
        if (this.timer1IRQ) {
          this.IOCore.irq.requestIRQ(16);
        }
        this.IOCore.sound.AGBDirectSoundTimer1ClockTick();
      };
      GameBoyAdvanceTimer.prototype.timer2ExternalTriggerCheck = function() {
        if (this.timer2IRQ) {
          this.IOCore.irq.requestIRQ(32);
        }
      };
      GameBoyAdvanceTimer.prototype.timer3ExternalTriggerCheck = function() {
        if (this.timer3IRQ) {
          this.IOCore.irq.requestIRQ(64);
        }
      };
      GameBoyAdvanceTimer.prototype.writeTM0CNT8_0 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer0Reload = this.timer0Reload & 65280;
        data = data & 255;
        this.timer0Reload = this.timer0Reload | data;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM0CNT8_1 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer0Reload = this.timer0Reload & 255;
        data = data & 255;
        this.timer0Reload = this.timer0Reload | data << 8;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM0CNT8_2 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer0Control = data & 255;
        if ((data & 128) != 0) {
          if (!this.timer0Enabled) {
            this.timer0Counter = this.timer0Reload | 0;
            this.timer0Enabled = true;
            this.timer0Precounter = 0;
          }
        } else {
          this.timer0Enabled = false;
        }
        this.timer0IRQ = (data & 64) != 0;
        this.timer0PrescalarShifted = this.prescalarLookup[data & 3] | 0;
        this.timer0Prescalar = 1 << (this.timer0PrescalarShifted | 0);
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM0CNT16 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer0Reload = data & 65535;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM0CNT32 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer0Reload = data & 65535;
        this.timer0Control = data >> 16;
        if ((data & 8388608) != 0) {
          if (!this.timer0Enabled) {
            this.timer0Counter = this.timer0Reload | 0;
            this.timer0Enabled = true;
            this.timer0Precounter = 0;
          }
        } else {
          this.timer0Enabled = false;
        }
        this.timer0IRQ = (data & 4194304) != 0;
        this.timer0PrescalarShifted = this.prescalarLookup[data >> 16 & 3] | 0;
        this.timer0Prescalar = 1 << (this.timer0PrescalarShifted | 0);
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.readTM0CNT8_0 = function() {
        this.IOCore.updateTimerClocking();
        return this.timer0Counter & 255;
      };
      GameBoyAdvanceTimer.prototype.readTM0CNT8_1 = function() {
        this.IOCore.updateTimerClocking();
        return (this.timer0Counter & 65280) >> 8;
      };
      GameBoyAdvanceTimer.prototype.readTM0CNT8_2 = function() {
        return this.timer0Control & 255;
      };
      GameBoyAdvanceTimer.prototype.readTM0CNT16 = function() {
        this.IOCore.updateTimerClocking();
        return this.timer0Counter | 0;
      };
      GameBoyAdvanceTimer.prototype.readTM0CNT32 = function() {
        this.IOCore.updateTimerClocking();
        var data = (this.timer0Control & 255) << 16;
        data = data | this.timer0Counter;
        return data | 0;
      };
      GameBoyAdvanceTimer.prototype.writeTM1CNT8_0 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer1Reload = this.timer1Reload & 65280;
        data = data & 255;
        this.timer1Reload = this.timer1Reload | data;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM1CNT8_1 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer1Reload = this.timer1Reload & 255;
        data = data & 255;
        this.timer1Reload = this.timer1Reload | data << 8;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM1CNT8_2 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer1Control = data & 255;
        if ((data & 128) != 0) {
          if (!this.timer1Enabled) {
            this.timer1Counter = this.timer1Reload | 0;
            this.timer1Enabled = true;
            this.timer1Precounter = 0;
          }
        } else {
          this.timer1Enabled = false;
        }
        this.timer1IRQ = (data & 64) != 0;
        this.timer1CountUp = (data & 4) != 0;
        this.timer1PrescalarShifted = this.prescalarLookup[data & 3] | 0;
        this.timer1Prescalar = 1 << (this.timer1PrescalarShifted | 0);
        this.preprocessTimer1();
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM1CNT16 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer1Reload = data & 65535;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM1CNT32 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.IOCore.sound.audioJIT();
        this.timer1Reload = data & 65535;
        this.timer1Control = data >> 16;
        if ((data & 8388608) != 0) {
          if (!this.timer1Enabled) {
            this.timer1Counter = this.timer1Reload | 0;
            this.timer1Enabled = true;
            this.timer1Precounter = 0;
          }
        } else {
          this.timer1Enabled = false;
        }
        this.timer1IRQ = (data & 4194304) != 0;
        this.timer1CountUp = (data & 262144) != 0;
        this.timer1PrescalarShifted = this.prescalarLookup[data >> 16 & 3] | 0;
        this.timer1Prescalar = 1 << (this.timer1PrescalarShifted | 0);
        this.preprocessTimer1();
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.readTM1CNT8_0 = function() {
        this.IOCore.updateTimerClocking();
        return this.timer1Counter & 255;
      };
      GameBoyAdvanceTimer.prototype.readTM1CNT8_1 = function() {
        this.IOCore.updateTimerClocking();
        return (this.timer1Counter & 65280) >> 8;
      };
      GameBoyAdvanceTimer.prototype.readTM1CNT8_2 = function() {
        return this.timer1Control & 255;
      };
      GameBoyAdvanceTimer.prototype.readTM1CNT16 = function() {
        this.IOCore.updateTimerClocking();
        return this.timer1Counter | 0;
      };
      GameBoyAdvanceTimer.prototype.readTM1CNT32 = function() {
        this.IOCore.updateTimerClocking();
        var data = (this.timer1Control & 255) << 16;
        data = data | this.timer1Counter;
        return data | 0;
      };
      GameBoyAdvanceTimer.prototype.writeTM2CNT8_0 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer2Reload = this.timer2Reload & 65280;
        data = data & 255;
        this.timer2Reload = this.timer2Reload | data;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM2CNT8_1 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer2Reload = this.timer2Reload & 255;
        data = data & 255;
        this.timer2Reload = this.timer2Reload | data << 8;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM2CNT8_2 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer2Control = data & 255;
        if ((data & 128) != 0) {
          if (!this.timer2Enabled) {
            this.timer2Counter = this.timer2Reload | 0;
            this.timer2Enabled = true;
            this.timer2Precounter = 0;
          }
        } else {
          this.timer2Enabled = false;
        }
        this.timer2IRQ = (data & 64) == 64;
        this.timer2CountUp = (data & 4) == 4;
        this.timer2PrescalarShifted = this.prescalarLookup[data & 3] | 0;
        this.timer2Prescalar = 1 << (this.timer2PrescalarShifted | 0);
        this.preprocessTimer2();
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM2CNT16 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer2Reload = data & 65535;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM2CNT32 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer2Reload = data & 65535;
        this.timer2Control = data >> 16;
        if ((data & 8388608) != 0) {
          if (!this.timer2Enabled) {
            this.timer2Counter = this.timer2Reload | 0;
            this.timer2Enabled = true;
            this.timer2Precounter = 0;
          }
        } else {
          this.timer2Enabled = false;
        }
        this.timer2IRQ = (data & 4194304) != 0;
        this.timer2CountUp = (data & 262144) != 0;
        this.timer2PrescalarShifted = this.prescalarLookup[data >> 16 & 3] | 0;
        this.timer2Prescalar = 1 << (this.timer2PrescalarShifted | 0);
        this.preprocessTimer2();
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.readTM2CNT8_0 = function() {
        this.IOCore.updateTimerClocking();
        return this.timer2Counter & 255;
      };
      GameBoyAdvanceTimer.prototype.readTM2CNT8_1 = function() {
        this.IOCore.updateTimerClocking();
        return (this.timer2Counter & 65280) >> 8;
      };
      GameBoyAdvanceTimer.prototype.readTM2CNT8_2 = function() {
        return this.timer2Control & 255;
      };
      GameBoyAdvanceTimer.prototype.readTM2CNT16 = function() {
        this.IOCore.updateTimerClocking();
        return this.timer2Counter | 0;
      };
      GameBoyAdvanceTimer.prototype.readTM2CNT32 = function() {
        this.IOCore.updateTimerClocking();
        var data = (this.timer2Control & 255) << 16;
        data = data | this.timer2Counter;
        return data | 0;
      };
      GameBoyAdvanceTimer.prototype.writeTM3CNT8_0 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer3Reload = this.timer3Reload & 65280;
        data = data & 255;
        this.timer3Reload = this.timer3Reload | data;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM3CNT8_1 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer3Reload = this.timer3Reload & 255;
        data = data & 255;
        this.timer3Reload = this.timer3Reload | data << 8;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM3CNT8_2 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer3Control = data & 255;
        if ((data & 128) != 0) {
          if (!this.timer3Enabled) {
            this.timer3Counter = this.timer3Reload | 0;
            this.timer3Enabled = true;
            this.timer3Precounter = 0;
          }
        } else {
          this.timer3Enabled = false;
        }
        this.timer3IRQ = (data & 64) != 0;
        this.timer3CountUp = (data & 4) != 0;
        this.timer3PrescalarShifted = this.prescalarLookup[data & 3] | 0;
        this.timer3Prescalar = 1 << (this.timer3PrescalarShifted | 0);
        this.preprocessTimer3();
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM3CNT16 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer3Reload = data & 65535;
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.writeTM3CNT32 = function(data) {
        data = data | 0;
        this.IOCore.updateTimerClocking();
        this.timer3Reload = data & 65535;
        this.timer3Control = data >> 16;
        if ((data & 8388608) != 0) {
          if (!this.timer3Enabled) {
            this.timer3Counter = this.timer3Reload | 0;
            this.timer3Enabled = true;
            this.timer3Precounter = 0;
          }
        } else {
          this.timer3Enabled = false;
        }
        this.timer3IRQ = (data & 4194304) != 0;
        this.timer3CountUp = (data & 262144) != 0;
        this.timer3PrescalarShifted = this.prescalarLookup[data >> 16 & 3] | 0;
        this.timer3Prescalar = 1 << (this.timer3PrescalarShifted | 0);
        this.preprocessTimer3();
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceTimer.prototype.readTM3CNT8_0 = function() {
        this.IOCore.updateTimerClocking();
        return this.timer3Counter & 255;
      };
      GameBoyAdvanceTimer.prototype.readTM3CNT8_1 = function() {
        this.IOCore.updateTimerClocking();
        return (this.timer3Counter & 65280) >> 8;
      };
      GameBoyAdvanceTimer.prototype.readTM3CNT8_2 = function() {
        return this.timer3Control & 255;
      };
      GameBoyAdvanceTimer.prototype.readTM3CNT16 = function() {
        this.IOCore.updateTimerClocking();
        return this.timer3Counter | 0;
      };
      GameBoyAdvanceTimer.prototype.readTM3CNT32 = function() {
        this.IOCore.updateTimerClocking();
        var data = (this.timer3Control & 255) << 16;
        data = data | this.timer3Counter;
        return data | 0;
      };
      GameBoyAdvanceTimer.prototype.preprocessTimer1 = function() {
        this.timer1UseMainClocks = this.timer1Enabled && !this.timer1CountUp;
        this.timer1UseChainedClocks = this.timer1Enabled && this.timer1CountUp;
      };
      GameBoyAdvanceTimer.prototype.preprocessTimer2 = function() {
        this.timer2UseMainClocks = this.timer2Enabled && !this.timer2CountUp;
        this.timer2UseChainedClocks = this.timer2Enabled && this.timer2CountUp;
      };
      GameBoyAdvanceTimer.prototype.preprocessTimer3 = function() {
        this.timer3UseMainClocks = this.timer3Enabled && !this.timer3CountUp;
        this.timer3UseChainedClocks = this.timer3Enabled && this.timer3CountUp;
      };
      GameBoyAdvanceTimer.prototype.nextTimer0Overflow = function(numOverflows) {
        --numOverflows;
        if (this.timer0Enabled) {
          return (65536 - this.timer0Counter) * this.timer0Prescalar - this.timer0Precounter + (65536 - this.timer0Reload) * this.timer0Prescalar * numOverflows;
        }
        return -1;
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceTimer.prototype.nextTimer0OverflowSingle = function() {
          var eventTime = -1;
          if (this.timer0Enabled) {
            eventTime = Math.imul(65536 - (this.timer0Counter | 0), this.timer0Prescalar | 0) - (this.timer0Precounter | 0) | 0;
          }
          return eventTime | 0;
        };
      } else {
        GameBoyAdvanceTimer.prototype.nextTimer0OverflowSingle = function() {
          if (this.timer0Enabled) {
            return (65536 - this.timer0Counter) * this.timer0Prescalar - this.timer0Precounter;
          }
          return -1;
        };
      }
      GameBoyAdvanceTimer.prototype.nextTimer1Overflow = function(numOverflows) {
        --numOverflows;
        if (this.timer1Enabled) {
          if (this.timer1CountUp) {
            return this.nextTimer0Overflow(65536 - this.timer1Counter + numOverflows * (65536 - this.timer1Reload));
          } else {
            return (65536 - this.timer1Counter) * this.timer1Prescalar - this.timer1Precounter + (65536 - this.timer1Reload) * this.timer1Prescalar * numOverflows;
          }
        }
        return -1;
      };
      GameBoyAdvanceTimer.prototype.nextTimer1OverflowSingle = function() {
        if (this.timer1Enabled) {
          if (this.timer1CountUp) {
            return this.nextTimer0Overflow(65536 - this.timer1Counter);
          } else {
            return (65536 - this.timer1Counter) * this.timer1Prescalar - this.timer1Precounter;
          }
        }
        return -1;
      };
      GameBoyAdvanceTimer.prototype.nextTimer2Overflow = function(numOverflows) {
        --numOverflows;
        if (this.timer2Enabled) {
          if (this.timer2CountUp) {
            return this.nextTimer1Overflow(65536 - this.timer2Counter + numOverflows * (65536 - this.timer2Reload));
          } else {
            return (65536 - this.timer2Counter) * this.timer2Prescalar - this.timer2Precounter + (65536 - this.timer2Reload) * this.timer2Prescalar * numOverflows;
          }
        }
        return -1;
      };
      GameBoyAdvanceTimer.prototype.nextTimer2OverflowSingle = function() {
        if (this.timer2Enabled) {
          if (this.timer2CountUp) {
            return this.nextTimer1Overflow(65536 - this.timer2Counter);
          } else {
            return (65536 - this.timer2Counter) * this.timer2Prescalar - this.timer2Precounter;
          }
        }
        return -1;
      };
      GameBoyAdvanceTimer.prototype.nextTimer3OverflowSingle = function() {
        if (this.timer3Enabled) {
          if (this.timer3CountUp) {
            return this.nextTimer2Overflow(65536 - this.timer3Counter);
          } else {
            return (65536 - this.timer3Counter) * this.timer3Prescalar - this.timer3Precounter;
          }
        }
        return -1;
      };
      GameBoyAdvanceTimer.prototype.nextAudioTimerOverflow = function() {
        var timer0 = this.nextTimer0OverflowSingle() | 0;
        if ((timer0 | 0) == -1) {
          timer0 = 2147483647;
        }
        var timer1 = this.nextTimer1OverflowSingle();
        if (timer1 == -1) {
          timer1 = 2147483647;
        }
        return Math.min(timer0 | 0, timer1, 2147483647) | 0;
      };
      GameBoyAdvanceTimer.prototype.nextTimer0IRQEventTime = function() {
        var clocks = -1;
        if (this.timer0Enabled && this.timer0IRQ) {
          clocks = this.nextTimer0OverflowSingle() | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceTimer.prototype.nextTimer1IRQEventTime = function() {
        var clocks = -1;
        if (this.timer1Enabled && this.timer1IRQ) {
          clocks = Math.max(Math.min(this.nextTimer1OverflowSingle(), 2147483647), -1) | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceTimer.prototype.nextTimer2IRQEventTime = function() {
        var clocks = -1;
        if (this.timer2Enabled && this.timer2IRQ) {
          clocks = Math.max(Math.min(this.nextTimer2OverflowSingle(), 2147483647), -1) | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceTimer.prototype.nextTimer3IRQEventTime = function() {
        var clocks = -1;
        if (this.timer3Enabled && this.timer3IRQ) {
          clocks = Math.max(Math.min(this.nextTimer3OverflowSingle(), 2147483647), -1) | 0;
        }
        return clocks | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceIRQCore.js
  var require_GameBoyAdvanceIRQCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceIRQCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceIRQ;
      function GameBoyAdvanceIRQ(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceIRQ.prototype.initialize = function() {
        this.interruptsEnabled = 0;
        this.interruptsRequested = 0;
        this.IME = false;
        this.gfx = this.IOCore.gfx;
        this.timer = this.IOCore.timer;
        this.dmaChannel0 = this.IOCore.dmaChannel0;
        this.dmaChannel1 = this.IOCore.dmaChannel1;
        this.dmaChannel2 = this.IOCore.dmaChannel2;
        this.dmaChannel3 = this.IOCore.dmaChannel3;
      };
      GameBoyAdvanceIRQ.prototype.IRQMatch = function() {
        return (this.interruptsEnabled & this.interruptsRequested) != 0;
      };
      GameBoyAdvanceIRQ.prototype.checkForIRQFire = function() {
        this.IOCore.cpu.triggerIRQ((this.interruptsEnabled & this.interruptsRequested) != 0 && this.IME);
      };
      GameBoyAdvanceIRQ.prototype.requestIRQ = function(irqLineToSet) {
        irqLineToSet = irqLineToSet | 0;
        this.interruptsRequested |= irqLineToSet | 0;
        this.checkForIRQFire();
      };
      GameBoyAdvanceIRQ.prototype.writeIME = function(data) {
        data = data | 0;
        this.IME = (data & 1) == 1;
        this.checkForIRQFire();
      };
      GameBoyAdvanceIRQ.prototype.readIME = function() {
        return this.IME ? 1 : 0;
      };
      GameBoyAdvanceIRQ.prototype.writeIE0 = function(data) {
        data = data | 0;
        this.interruptsEnabled &= 16128;
        this.interruptsEnabled |= data | 0;
        this.checkForIRQFire();
      };
      GameBoyAdvanceIRQ.prototype.readIE0 = function() {
        return this.interruptsEnabled & 255;
      };
      GameBoyAdvanceIRQ.prototype.writeIE1 = function(data) {
        data = data | 0;
        this.interruptsEnabled &= 255;
        this.interruptsEnabled |= data << 8 & 16128;
        this.checkForIRQFire();
      };
      GameBoyAdvanceIRQ.prototype.readIE1 = function() {
        return this.interruptsEnabled >> 8;
      };
      GameBoyAdvanceIRQ.prototype.writeIF0 = function(data) {
        data = data | 0;
        this.interruptsRequested &= ~data;
        this.checkForIRQFire();
      };
      GameBoyAdvanceIRQ.prototype.readIF0 = function() {
        return this.interruptsRequested & 255;
      };
      GameBoyAdvanceIRQ.prototype.writeIF1 = function(data) {
        data = data | 0;
        this.interruptsRequested &= ~(data << 8);
        this.checkForIRQFire();
      };
      GameBoyAdvanceIRQ.prototype.readIF1 = function() {
        return this.interruptsRequested >> 8;
      };
      GameBoyAdvanceIRQ.prototype.nextEventTime = function() {
        var clocks = -1;
        clocks = this.findClosestEvent(clocks | 0, this.gfx.nextVBlankIRQEventTime() | 0, 1) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.gfx.nextHBlankIRQEventTime() | 0, 2) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.gfx.nextVCounterIRQEventTime() | 0, 4) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.timer.nextTimer0IRQEventTime() | 0, 8) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.timer.nextTimer1IRQEventTime() | 0, 16) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.timer.nextTimer2IRQEventTime() | 0, 32) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.timer.nextTimer3IRQEventTime() | 0, 64) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.dmaChannel0.nextIRQEventTime() | 0, 256) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.dmaChannel1.nextIRQEventTime() | 0, 512) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.dmaChannel2.nextIRQEventTime() | 0, 1024) | 0;
        clocks = this.findClosestEvent(clocks | 0, this.dmaChannel3.nextIRQEventTime() | 0, 2048) | 0;
        return clocks | 0;
      };
      GameBoyAdvanceIRQ.prototype.nextIRQEventTime = function() {
        var clocks = -1;
        if (this.IME) {
          clocks = this.nextEventTime() | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceIRQ.prototype.findClosestEvent = function(oldClocks, newClocks, flagID) {
        oldClocks = oldClocks | 0;
        newClocks = newClocks | 0;
        flagID = flagID | 0;
        if ((this.interruptsEnabled & flagID) != 0) {
          if ((newClocks | 0) >= 0) {
            if ((oldClocks | 0) >= 0) {
              oldClocks = Math.min(oldClocks | 0, newClocks | 0) | 0;
            } else {
              oldClocks = newClocks | 0;
            }
          }
        }
        return oldClocks | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceSerialCore.js
  var require_GameBoyAdvanceSerialCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceSerialCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceSerial;
      function GameBoyAdvanceSerial(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceSerial.prototype.initialize = function() {
        this.SIODATA_A = 65535;
        this.SIODATA_B = 65535;
        this.SIODATA_C = 65535;
        this.SIODATA_D = 65535;
        this.SIOShiftClockExternal = 0;
        this.SIOShiftClockDivider = 64;
        this.SIOCNT0_DATA = 12;
        this.SIOTransferStarted = false;
        this.SIOMULT_PLAYER_NUMBER = 0;
        this.SIOCOMMERROR = false;
        this.SIOBaudRate = 0;
        this.SIOCNT_UART_CTS = false;
        this.SIOCNT_UART_MISC = 0;
        this.SIOCNT_UART_FIFO = 0;
        this.SIOCNT_IRQ = 0;
        this.SIOCNT_MODE = 0;
        this.SIOCNT_UART_RECV_ENABLE = false;
        this.SIOCNT_UART_SEND_ENABLE = false;
        this.SIOCNT_UART_PARITY_ENABLE = false;
        this.SIOCNT_UART_FIFO_ENABLE = false;
        this.SIODATA8 = 65535;
        this.RCNTMode = 0;
        this.RCNTIRQ = false;
        this.RCNTDataBits = 0;
        this.RCNTDataBitFlow = 0;
        this.JOYBUS_IRQ = 0;
        this.JOYBUS_CNTL_FLAGS = 0;
        this.JOYBUS_RECV0 = 255;
        this.JOYBUS_RECV1 = 255;
        this.JOYBUS_RECV2 = 255;
        this.JOYBUS_RECV3 = 255;
        this.JOYBUS_SEND0 = 255;
        this.JOYBUS_SEND1 = 255;
        this.JOYBUS_SEND2 = 255;
        this.JOYBUS_SEND3 = 255;
        this.JOYBUS_STAT = 0;
        this.shiftClocks = 0;
        this.serialBitsShifted = 0;
      };
      GameBoyAdvanceSerial.prototype.SIOMultiplayerBaudRate = [
        9600,
        38400,
        57600,
        115200
      ];
      GameBoyAdvanceSerial.prototype.addClocks = function(clocks) {
        clocks = clocks | 0;
        if ((this.RCNTMode | 0) < 2) {
          switch (this.SIOCNT_MODE | 0) {
            case 0:
            case 1:
              if (this.SIOTransferStarted && (this.SIOShiftClockExternal | 0) == 0) {
                this.shiftClocks = (this.shiftClocks | 0) + (clocks | 0) | 0;
                while ((this.shiftClocks | 0) >= (this.SIOShiftClockDivider | 0)) {
                  this.shiftClocks = (this.shiftClocks | 0) - (this.SIOShiftClockDivider | 0) | 0;
                  this.clockSerial();
                }
              }
              break;
            case 2:
              if (this.SIOTransferStarted && (this.SIOMULT_PLAYER_NUMBER | 0) == 0) {
                this.shiftClocks = (this.shiftClocks | 0) + (clocks | 0) | 0;
                while ((this.shiftClocks | 0) >= (this.SIOShiftClockDivider | 0)) {
                  this.shiftClocks = (this.shiftClocks | 0) - (this.SIOShiftClockDivider | 0) | 0;
                  this.clockMultiplayer();
                }
              }
              break;
            case 3:
              if (this.SIOCNT_UART_SEND_ENABLE && !this.SIOCNT_UART_CTS) {
                this.shiftClocks = (this.shiftClocks | 0) + (clocks | 0) | 0;
                while ((this.shiftClocks | 0) >= (this.SIOShiftClockDivider | 0)) {
                  this.shiftClocks = (this.shiftClocks | 0) - (this.SIOShiftClockDivider | 0) | 0;
                  this.clockUART();
                }
              }
          }
        }
      };
      GameBoyAdvanceSerial.prototype.clockSerial = function() {
        this.serialBitsShifted = (this.serialBitsShifted | 0) + 1 | 0;
        if ((this.SIOCNT_MODE | 0) == 0) {
          this.SIODATA8 = (this.SIODATA8 << 1 | 1) & 65535;
          if ((this.serialBitsShifted | 0) == 8) {
            this.SIOTransferStarted = false;
            this.serialBitsShifted = 0;
            if ((this.SIOCNT_IRQ | 0) != 0) {
            }
          }
        } else {
          this.SIODATA_D = this.SIODATA_D << 1 & 254 | this.SIODATA_C >> 7;
          this.SIODATA_C = this.SIODATA_C << 1 & 254 | this.SIODATA_B >> 7;
          this.SIODATA_B = this.SIODATA_B << 1 & 254 | this.SIODATA_A >> 7;
          this.SIODATA_A = this.SIODATA_A << 1 & 254 | 1;
          if ((this.serialBitsShifted | 0) == 32) {
            this.SIOTransferStarted = false;
            this.serialBitsShifted = 0;
            if ((this.SIOCNT_IRQ | 0) != 0) {
            }
          }
        }
      };
      GameBoyAdvanceSerial.prototype.clockMultiplayer = function() {
        this.SIODATA_A = this.SIODATA8 | 0;
        this.SIODATA_B = 65535;
        this.SIODATA_C = 65535;
        this.SIODATA_D = 65535;
        this.SIOTransferStarted = false;
        this.SIOCOMMERROR = true;
        if ((this.SIOCNT_IRQ | 0) != 0) {
        }
      };
      GameBoyAdvanceSerial.prototype.clockUART = function() {
        this.serialBitsShifted = (this.serialBitsShifted | 0) + 1 | 0;
        if (this.SIOCNT_UART_FIFO_ENABLE) {
          if ((this.serialBitsShifted | 0) == 8) {
            this.serialBitsShifted = 0;
            this.SIOCNT_UART_FIFO = Math.max((this.SIOCNT_UART_FIFO | 0) - 1 | 0, 0) | 0;
            if ((this.SIOCNT_UART_FIFO | 0) == 0 && (this.SIOCNT_IRQ | 0) != 0) {
            }
          }
        } else {
          if ((this.serialBitsShifted | 0) == 8) {
            this.serialBitsShifted = 0;
            if ((this.SIOCNT_IRQ | 0) != 0) {
            }
          }
        }
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA_A0 = function(data) {
        data = data | 0;
        this.SIODATA_A = this.SIODATA_A & 65280 | data;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA_A0 = function() {
        return this.SIODATA_A & 255;
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA_A1 = function(data) {
        data = data | 0;
        this.SIODATA_A = this.SIODATA_A & 255 | data << 8;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA_A1 = function() {
        return this.SIODATA_A >> 8;
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA_B0 = function(data) {
        data = data | 0;
        this.SIODATA_B = this.SIODATA_B & 65280 | data;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA_B0 = function() {
        return this.SIODATA_B & 255;
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA_B1 = function(data) {
        data = data | 0;
        this.SIODATA_B = this.SIODATA_B & 255 | data << 8;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA_B1 = function() {
        return this.SIODATA_B >> 8;
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA_C0 = function(data) {
        data = data | 0;
        this.SIODATA_C = this.SIODATA_C & 65280 | data;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA_C0 = function() {
        return this.SIODATA_C & 255;
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA_C1 = function(data) {
        data = data | 0;
        this.SIODATA_C = this.SIODATA_C & 255 | data << 8;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA_C1 = function() {
        return this.SIODATA_C >> 8;
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA_D0 = function(data) {
        data = data | 0;
        this.SIODATA_D = this.SIODATA_D & 65280 | data;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA_D0 = function() {
        return this.SIODATA_D & 255;
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA_D1 = function(data) {
        data = data | 0;
        this.SIODATA_D = this.SIODATA_D & 255 | data << 8;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA_D1 = function() {
        return this.SIODATA_D >> 8;
      };
      GameBoyAdvanceSerial.prototype.writeSIOCNT0 = function(data) {
        if ((this.RCNTMode | 0) < 2) {
          switch (this.SIOCNT_MODE | 0) {
            //8-Bit:
            case 0:
            //32-Bit:
            case 1:
              this.SIOShiftClockExternal = data & 1;
              this.SIOShiftClockDivider = (data & 2) == 2 ? 8 : 64;
              this.SIOCNT0_DATA = data & 11;
              if ((data & 128) == 128) {
                if (!this.SIOTransferStarted) {
                  this.SIOTransferStarted = true;
                  this.serialBitsShifted = 0;
                  this.shiftClocks = 0;
                }
              } else {
                this.SIOTransferStarted = false;
              }
              break;
            //Multiplayer:
            case 2:
              this.SIOBaudRate = data & 3;
              this.SIOShiftClockDivider = this.SIOMultiplayerBaudRate[this.SIOBaudRate | 0] | 0;
              this.SIOMULT_PLAYER_NUMBER = data >> 4 & 3;
              this.SIOCOMMERROR = (data & 64) == 64;
              if ((data & 128) == 128) {
                if (!this.SIOTransferStarted) {
                  this.SIOTransferStarted = true;
                  if ((this.SIOMULT_PLAYER_NUMBER | 0) == 0) {
                    this.SIODATA_A = 65535;
                    this.SIODATA_B = 65535;
                    this.SIODATA_C = 65535;
                    this.SIODATA_D = 65535;
                  }
                  this.serialBitsShifted = 0;
                  this.shiftClocks = 0;
                }
              } else {
                this.SIOTransferStarted = false;
              }
              break;
            //UART:
            case 3:
              this.SIOBaudRate = data & 3;
              this.SIOShiftClockDivider = this.SIOMultiplayerBaudRate[this.SIOBaudRate | 0] | 0;
              this.SIOCNT_UART_MISC = (data & 207) >> 2;
              this.SIOCNT_UART_CTS = (data & 4) == 4;
          }
        }
      };
      GameBoyAdvanceSerial.prototype.readSIOCNT0 = function() {
        if (this.RCNTMode < 2) {
          switch (this.SIOCNT_MODE) {
            //8-Bit:
            case 0:
            //32-Bit:
            case 1:
              return (this.SIOTransferStarted ? 128 : 0) | 116 | this.SIOCNT0_DATA;
            //Multiplayer:
            case 2:
              return (this.SIOTransferStarted ? 128 : 0) | (this.SIOCOMMERROR ? 64 : 0) | this.SIOMULT_PLAYER_NUMBER << 4 | this.SIOBaudRate;
            //UART:
            case 3:
              return this.SIOCNT_UART_MISC << 2 | (this.SIOCNT_UART_FIFO == 4 ? 48 : 32) | this.SIOBaudRate;
          }
        }
        return 255;
      };
      GameBoyAdvanceSerial.prototype.writeSIOCNT1 = function(data) {
        this.SIOCNT_IRQ = data & 64;
        this.SIOCNT_MODE = data >> 4 & 3;
        this.SIOCNT_UART_RECV_ENABLE = (data & 8) == 8;
        this.SIOCNT_UART_SEND_ENABLE = (data & 4) == 4;
        this.SIOCNT_UART_PARITY_ENABLE = (data & 2) == 2;
        this.SIOCNT_UART_FIFO_ENABLE = (data & 1) == 1;
      };
      GameBoyAdvanceSerial.prototype.readSIOCNT1 = function() {
        return 128 | this.SIOCNT_IRQ | this.SIOCNT_MODE << 4 | (this.SIOCNT_UART_RECV_ENABLE ? 8 : 0) | (this.SIOCNT_UART_SEND_ENABLE ? 4 : 0) | (this.SIOCNT_UART_PARITY_ENABLE ? 2 : 0) | (this.SIOCNT_UART_FIFO_ENABLE ? 2 : 0);
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA8_0 = function(data) {
        data = data | 0;
        this.SIODATA8 = this.SIODATA8 & 65280 | data;
        if ((this.RCNTMode | 0) < 2 && (this.SIOCNT_MODE | 0) == 3 && this.SIOCNT_UART_FIFO_ENABLE) {
          this.SIOCNT_UART_FIFO = Math.min((this.SIOCNT_UART_FIFO | 0) + 1 | 0, 4) | 0;
        }
      };
      GameBoyAdvanceSerial.prototype.readSIODATA8_0 = function() {
        return this.SIODATA8 & 255;
      };
      GameBoyAdvanceSerial.prototype.writeSIODATA8_1 = function(data) {
        data = data | 0;
        this.SIODATA8 = this.SIODATA8 & 255 | data << 8;
      };
      GameBoyAdvanceSerial.prototype.readSIODATA8_1 = function() {
        return this.SIODATA8 >> 8;
      };
      GameBoyAdvanceSerial.prototype.writeRCNT0 = function(data) {
        if ((this.RCNTMode | 0) == 2) {
          var oldDataBits = this.RCNTDataBits | 0;
          this.RCNTDataBits = data & 15;
          this.RCNTDataBitFlow = data >> 4;
          if (this.RCNTIRQ && ((oldDataBits ^ this.RCNTDataBits) & oldDataBits & 4) == 4) {
          }
        }
      };
      GameBoyAdvanceSerial.prototype.readRCNT0 = function() {
        return this.RCNTDataBitFlow << 4 | this.RCNTDataBits;
      };
      GameBoyAdvanceSerial.prototype.writeRCNT1 = function(data) {
        this.RCNTMode = data >> 6;
        this.RCNTIRQ = (data & 1) == 1;
        if ((this.RCNTMode | 0) != 2) {
          this.RCNTDataBits = 0;
          this.RCNTDataBitFlow = 0;
        }
      };
      GameBoyAdvanceSerial.prototype.readRCNT1 = function() {
        return this.RCNTMode << 6 | (this.RCNTIRQ ? 63 : 62);
      };
      GameBoyAdvanceSerial.prototype.writeJOYCNT = function(data) {
        this.JOYBUS_IRQ = data << 25 >> 31;
        this.JOYBUS_CNTL_FLAGS &= ~(data & 7);
      };
      GameBoyAdvanceSerial.prototype.readJOYCNT = function() {
        return this.JOYBUS_CNTL_FLAGS | 64 | 184 & this.JOYBUS_IRQ;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_RECV0 = function(data) {
        this.JOYBUS_RECV0 = data | 0;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_RECV0 = function() {
        this.JOYBUS_STAT = this.JOYBUS_STAT & 247;
        return this.JOYBUS_RECV0 | 0;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_RECV1 = function(data) {
        this.JOYBUS_RECV1 = data | 0;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_RECV1 = function() {
        this.JOYBUS_STAT = this.JOYBUS_STAT & 247;
        return this.JOYBUS_RECV1 | 0;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_RECV2 = function(data) {
        this.JOYBUS_RECV2 = data | 0;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_RECV2 = function() {
        this.JOYBUS_STAT = this.JOYBUS_STAT & 247;
        return this.JOYBUS_RECV2 | 0;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_RECV3 = function(data) {
        this.JOYBUS_RECV3 = data | 0;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_RECV3 = function() {
        this.JOYBUS_STAT = this.JOYBUS_STAT & 247;
        return this.JOYBUS_RECV3 | 0;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_SEND0 = function(data) {
        this.JOYBUS_SEND0 = data | 0;
        this.JOYBUS_STAT = this.JOYBUS_STAT | 2;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_SEND0 = function() {
        return this.JOYBUS_SEND0 | 0;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_SEND1 = function(data) {
        this.JOYBUS_SEND1 = data | 0;
        this.JOYBUS_STAT = this.JOYBUS_STAT | 2;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_SEND1 = function() {
        return this.JOYBUS_SEND1 | 0;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_SEND2 = function(data) {
        this.JOYBUS_SEND2 = data | 0;
        this.JOYBUS_STAT = this.JOYBUS_STAT | 2;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_SEND2 = function() {
        return this.JOYBUS_SEND2 | 0;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_SEND3 = function(data) {
        this.JOYBUS_SEND3 = data | 0;
        this.JOYBUS_STAT = this.JOYBUS_STAT | 2;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_SEND3 = function() {
        return this.JOYBUS_SEND3 | 0;
      };
      GameBoyAdvanceSerial.prototype.writeJOYBUS_STAT = function(data) {
        this.JOYBUS_STAT = data | 0;
      };
      GameBoyAdvanceSerial.prototype.readJOYBUS_STAT = function() {
        return 197 | this.JOYBUS_STAT;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceJoyPadCore.js
  var require_GameBoyAdvanceJoyPadCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceJoyPadCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceJoyPad;
      function GameBoyAdvanceJoyPad(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceJoyPad.prototype.initialize = function() {
        this.keyInput = 1023;
        this.keyInterrupt = 0;
      };
      GameBoyAdvanceJoyPad.prototype.keyPress = function(keyPressed) {
        switch (keyPressed.toUpperCase()) {
          case "A":
            this.keyInput &= ~1;
            break;
          case "B":
            this.keyInput &= ~2;
            break;
          case "SELECT":
            this.keyInput &= ~4;
            break;
          case "START":
            this.keyInput &= ~8;
            break;
          case "RIGHT":
            this.keyInput &= ~16;
            break;
          case "LEFT":
            this.keyInput &= ~32;
            break;
          case "UP":
            this.keyInput &= ~64;
            break;
          case "DOWN":
            this.keyInput &= ~128;
            break;
          case "R":
            this.keyInput &= ~256;
            break;
          case "L":
            this.keyInput &= ~512;
            break;
          default:
            return;
        }
        this.checkForMatch();
      };
      GameBoyAdvanceJoyPad.prototype.keyRelease = function(keyReleased) {
        switch (keyReleased.toUpperCase()) {
          case "A":
            this.keyInput |= 1;
            break;
          case "B":
            this.keyInput |= 2;
            break;
          case "SELECT":
            this.keyInput |= 4;
            break;
          case "START":
            this.keyInput |= 8;
            break;
          case "RIGHT":
            this.keyInput |= 16;
            break;
          case "LEFT":
            this.keyInput |= 32;
            break;
          case "UP":
            this.keyInput |= 64;
            break;
          case "DOWN":
            this.keyInput |= 128;
            break;
          case "R":
            this.keyInput |= 256;
            break;
          case "L":
            this.keyInput |= 512;
            break;
          default:
            return;
        }
        this.checkForMatch();
      };
      GameBoyAdvanceJoyPad.prototype.checkForMatch = function() {
        if ((this.keyInterrupt & 32768) == 32768) {
          if ((~this.keyInput & this.keyInterrupt & 1023) == (this.keyInterrupt & 1023)) {
            this.IOCore.deflagStop();
            this.checkForIRQ();
          }
        } else if ((~this.keyInput & this.keyInterrupt & 1023) != 0) {
          this.IOCore.deflagStop();
          this.checkForIRQ();
        }
      };
      GameBoyAdvanceJoyPad.prototype.checkForIRQ = function() {
        if ((this.keyInterrupt & 16384) == 16384) {
          this.IOCore.irq.requestIRQ(4096);
        }
      };
      GameBoyAdvanceJoyPad.prototype.readKeyStatus8_0 = function() {
        return this.keyInput & 255;
      };
      GameBoyAdvanceJoyPad.prototype.readKeyStatus8_1 = function() {
        return this.keyInput >> 8 | 0;
      };
      GameBoyAdvanceJoyPad.prototype.readKeyStatus16 = function() {
        return this.keyInput | 0;
      };
      GameBoyAdvanceJoyPad.prototype.writeKeyControl8_0 = function(data) {
        data = data | 0;
        this.keyInterrupt = this.keyInterrupt & 49920;
        data = data & 255;
        this.keyInterrupt = this.keyInterrupt | data;
      };
      GameBoyAdvanceJoyPad.prototype.writeKeyControl8_1 = function(data) {
        data = data | 0;
        this.keyInterrupt = this.keyInterrupt & 255;
        data = data & 195;
        this.keyInterrupt = this.keyInterrupt | data << 8;
      };
      GameBoyAdvanceJoyPad.prototype.writeKeyControl16 = function(data) {
        data = data | 0;
        this.keyInterrupt = data & 50175;
      };
      GameBoyAdvanceJoyPad.prototype.readKeyControl8_0 = function() {
        return this.keyInterrupt & 255;
      };
      GameBoyAdvanceJoyPad.prototype.readKeyControl8_1 = function() {
        return this.keyInterrupt >> 8 | 0;
      };
      GameBoyAdvanceJoyPad.prototype.readKeyControl16 = function() {
        return this.keyInterrupt | 0;
      };
      GameBoyAdvanceJoyPad.prototype.readKeyStatusControl32 = function() {
        return this.keyInput | this.keyInterrupt << 16;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceCartridgeCore.js
  var require_GameBoyAdvanceCartridgeCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceCartridgeCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceCartridge;
      var TypedArrayShim = require_TypedArrayShim();
      var getUint16View = TypedArrayShim.getUint16View;
      var getInt32View = TypedArrayShim.getInt32View;
      var getUint8Array = TypedArrayShim.getUint8Array;
      var IS_LITTLE_ENDIAN = TypedArrayShim.IS_LITTLE_ENDIAN;
      function GameBoyAdvanceCartridge(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceCartridge.prototype.initialize = function() {
        this.flash_is128 = false;
        this.flash_isAtmel = false;
        this.ROM = this.getROMArray(this.IOCore.ROM);
        this.ROM16 = getUint16View(this.ROM);
        this.ROM32 = getInt32View(this.ROM);
        this.decodeName();
        this.decodeFlashType();
      };
      GameBoyAdvanceCartridge.prototype.getROMArray = function(old_array) {
        this.ROMLength = Math.min(old_array.length >> 2 << 2, 33554432);
        this.EEPROMStart = (this.ROMLength | 0) > 16777216 ? Math.max(this.ROMLength | 0, 33554176) : 16777216;
        var newArray = getUint8Array(this.ROMLength | 0);
        for (var index = 0; (index | 0) < (this.ROMLength | 0); index = (index | 0) + 1 | 0) {
          newArray[index | 0] = old_array[index | 0] | 0;
        }
        return newArray;
      };
      GameBoyAdvanceCartridge.prototype.decodeName = function() {
        this.name = "GUID_";
        if ((this.ROMLength | 0) >= 192) {
          for (var address = 172; (address | 0) < 179; address = (address | 0) + 1 | 0) {
            if ((this.ROM[address | 0] | 0) > 0) {
              this.name += String.fromCharCode(this.ROM[address | 0] | 0);
            } else {
              this.name += "_";
            }
          }
        }
      };
      GameBoyAdvanceCartridge.prototype.decodeFlashType = function() {
        this.flash_is128 = false;
        this.flash_isAtmel = false;
        var flash_types = 0;
        var F = "F".charCodeAt(0) & 255;
        var L = "L".charCodeAt(0) & 255;
        var A = "A".charCodeAt(0) & 255;
        var S = "S".charCodeAt(0) & 255;
        var H = "H".charCodeAt(0) & 255;
        var underScore = "_".charCodeAt(0) & 255;
        var five = "5".charCodeAt(0) & 255;
        var one = "1".charCodeAt(0) & 255;
        var two = "2".charCodeAt(0) & 255;
        var M = "M".charCodeAt(0) & 255;
        var V = "V".charCodeAt(0) & 255;
        var length = (this.ROM.length | 0) - 12 | 0;
        for (var index = 0; (index | 0) < (length | 0); index = (index | 0) + 4 | 0) {
          if ((this.ROM[index | 0] | 0) == (F | 0)) {
            if ((this.ROM[index | 1] | 0) == (L | 0)) {
              if ((this.ROM[index | 2] | 0) == (A | 0)) {
                if ((this.ROM[index | 3] | 0) == (S | 0)) {
                  var tempIndex = (index | 0) + 4 | 0;
                  if ((this.ROM[tempIndex | 0] | 0) == (H | 0)) {
                    if ((this.ROM[tempIndex | 1] | 0) == (underScore | 0)) {
                      if ((this.ROM[tempIndex | 2] | 0) == (V | 0)) {
                        flash_types |= 1;
                      }
                    } else if ((this.ROM[tempIndex | 1] | 0) == (five | 0)) {
                      if ((this.ROM[tempIndex | 2] | 0) == (one | 0)) {
                        if ((this.ROM[tempIndex | 3] | 0) == (two | 0)) {
                          tempIndex = (tempIndex | 0) + 4 | 0;
                          if ((this.ROM[tempIndex | 0] | 0) == (underScore | 0)) {
                            if ((this.ROM[tempIndex | 1] | 0) == (V | 0)) {
                              flash_types |= 2;
                            }
                          }
                        }
                      }
                    } else if ((this.ROM[tempIndex | 1] | 0) == (one | 0)) {
                      if ((this.ROM[tempIndex | 2] | 0) == (M | 0)) {
                        if ((this.ROM[tempIndex | 3] | 0) == (underScore | 0)) {
                          tempIndex = (tempIndex | 0) + 4 | 0;
                          if ((this.ROM[tempIndex | 0] | 0) == (V | 0)) {
                            flash_types |= 4;
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        this.flash_is128 = (flash_types | 0) >= 4;
        this.flash_isAtmel = (flash_types | 0) <= 1;
      };
      GameBoyAdvanceCartridge.prototype.readROMOnly8 = function(address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) < (this.ROMLength | 0)) {
          data = this.ROM[address & 33554431] | 0;
        }
        return data | 0;
      };
      if (IS_LITTLE_ENDIAN) {
        GameBoyAdvanceCartridge.prototype.readROMOnly16 = function(address) {
          address = address | 0;
          var data = 0;
          if ((address | 0) < (this.ROMLength | 0)) {
            data = this.ROM16[address >> 1 & 16777215] | 0;
          }
          return data | 0;
        };
        GameBoyAdvanceCartridge.prototype.readROMOnly32 = function(address) {
          address = address | 0;
          var data = 0;
          if ((address | 0) < (this.ROMLength | 0)) {
            data = this.ROM32[address >> 2 & 8388607] | 0;
          }
          return data | 0;
        };
      } else {
        GameBoyAdvanceCartridge.prototype.readROMOnly16 = function(address) {
          address = address | 0;
          var data = 0;
          if ((address | 0) < (this.ROMLength | 0)) {
            data = this.ROM[address] | this.ROM[address | 1] << 8;
          }
          return data | 0;
        };
        GameBoyAdvanceCartridge.prototype.readROMOnly32 = function(address) {
          address = address | 0;
          var data = 0;
          if ((address | 0) < (this.ROMLength | 0)) {
            data = this.ROM[address] | this.ROM[address | 1] << 8 | this.ROM[address | 2] << 16 | this.ROM[address | 3] << 24;
          }
          return data | 0;
        };
      }
      GameBoyAdvanceCartridge.prototype.readROM8 = function(address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) > 201) {
          data = this.readROMOnly8(address | 0) | 0;
        } else {
          data = this.IOCore.saves.readGPIO8(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceCartridge.prototype.readROM16 = function(address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) > 201) {
          data = this.readROMOnly16(address | 0) | 0;
        } else {
          data = this.IOCore.saves.readGPIO16(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceCartridge.prototype.readROM32 = function(address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) > 201) {
          data = this.readROMOnly32(address | 0) | 0;
        } else {
          data = this.IOCore.saves.readGPIO32(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceCartridge.prototype.readROM8Space2 = function(address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) >= 196 && (address | 0) < 202) {
          data = this.IOCore.saves.readGPIO8(address | 0) | 0;
        } else if ((address | 0) >= (this.EEPROMStart | 0)) {
          data = this.IOCore.saves.readEEPROM8(address | 0) | 0;
        } else {
          data = this.readROMOnly8(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceCartridge.prototype.readROM16Space2 = function(address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) >= 196 && (address | 0) < 202) {
          data = this.IOCore.saves.readGPIO16(address | 0) | 0;
        } else if ((address | 0) >= (this.EEPROMStart | 0)) {
          data = this.IOCore.saves.readEEPROM16(address | 0) | 0;
        } else {
          data = this.readROMOnly16(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceCartridge.prototype.readROM32Space2 = function(address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) >= 196 && (address | 0) < 202) {
          data = this.IOCore.saves.readGPIO32(address | 0) | 0;
        } else if ((address | 0) >= (this.EEPROMStart | 0)) {
          data = this.IOCore.saves.readEEPROM32(address | 0) | 0;
        } else {
          data = this.readROMOnly32(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceCartridge.prototype.writeROM8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((address | 0) >= 196 && (address | 0) < 202) {
          this.IOCore.saves.writeGPIO8(address | 0, data | 0);
        } else if ((address | 0) >= (this.EEPROMStart | 0)) {
          this.IOCore.saves.writeEEPROM8(address | 0, data | 0);
        }
      };
      GameBoyAdvanceCartridge.prototype.writeROM16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((address | 0) >= 196 && (address | 0) < 202) {
          this.IOCore.saves.writeGPIO16(address | 0, data | 0);
        } else if ((address | 0) >= (this.EEPROMStart | 0)) {
          this.IOCore.saves.writeEEPROM16(address | 0, data | 0);
        }
      };
      GameBoyAdvanceCartridge.prototype.writeROM32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((address | 0) >= 196 && (address | 0) < 202) {
          this.IOCore.saves.writeGPIO32(address | 0, data | 0);
        } else if ((address | 0) >= (this.EEPROMStart | 0)) {
          this.IOCore.saves.writeEEPROM32(address | 0, data | 0);
        }
      };
      GameBoyAdvanceCartridge.prototype.nextIRQEventTime = function() {
        return -1;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/cartridge/GameBoyAdvanceSaveDeterminerCore.js
  var require_GameBoyAdvanceSaveDeterminerCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/cartridge/GameBoyAdvanceSaveDeterminerCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceSaveDeterminer;
      function GameBoyAdvanceSaveDeterminer(saveCore) {
        this.saves = null;
        this.saveCore = saveCore;
        this.possible = 7;
      }
      GameBoyAdvanceSaveDeterminer.prototype.flags = {
        SRAM: 1,
        FLASH: 2,
        EEPROM: 4
      };
      GameBoyAdvanceSaveDeterminer.prototype.initialize = function() {
      };
      GameBoyAdvanceSaveDeterminer.prototype.load = function(save) {
        this.saves = save;
        var length = save.length | 0;
        switch (length | 0) {
          case 512:
          case 8192:
            this.possible = this.flags.EEPROM | 0;
            break;
          case 32768:
            this.possible = this.flags.SRAM | 0;
            break;
          case 65536:
          case 131072:
            this.possible = this.flags.FLASH | 0;
        }
        this.checkDetermination();
      };
      GameBoyAdvanceSaveDeterminer.prototype.checkDetermination = function() {
        switch (this.possible) {
          case 1:
            this.saveCore.referenceSave(1);
            break;
          case 2:
            this.saveCore.referenceSave(2);
            break;
          case 4:
            this.saveCore.referenceSave(3);
        }
      };
      GameBoyAdvanceSaveDeterminer.prototype.readSRAM = function(address) {
        address = address | 0;
        var data = 0;
        this.possible &= ~this.flags.EEPROM;
        if (this.saves != null) {
          if ((this.possible & this.flags.FLASH) == (this.flags.FLASH | 0) || (this.possible & this.flags.SRAM) == (this.flags.SRAM | 0)) {
            data = this.saves[(address | 0) % (this.saves.length | 0)] | 0;
          }
        }
        return data | 0;
      };
      GameBoyAdvanceSaveDeterminer.prototype.writeGPIO8 = function(address, data) {
        address = address | 0;
        data = data | 0;
      };
      GameBoyAdvanceSaveDeterminer.prototype.writeGPIO16 = function(address, data) {
        address = address | 0;
        data = data | 0;
      };
      GameBoyAdvanceSaveDeterminer.prototype.writeGPIO32 = function(address, data) {
        address = address | 0;
        data = data | 0;
      };
      GameBoyAdvanceSaveDeterminer.prototype.writeEEPROM8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.possible & this.flags.EEPROM) == (this.flags.EEPROM | 0)) {
          this.possible = this.flags.EEPROM | 0;
          this.checkDetermination();
          this.saveCore.writeEEPROM8(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaveDeterminer.prototype.writeEEPROM16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.possible & this.flags.EEPROM) == (this.flags.EEPROM | 0)) {
          this.possible = this.flags.EEPROM | 0;
          this.checkDetermination();
          this.saveCore.writeEEPROM16(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaveDeterminer.prototype.writeEEPROM32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.possible & this.flags.EEPROM) == (this.flags.EEPROM | 0)) {
          this.possible = this.flags.EEPROM | 0;
          this.checkDetermination();
          this.saveCore.writeEEPROM32(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaveDeterminer.prototype.readEEPROM8 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.possible & this.flags.EEPROM) == (this.flags.EEPROM | 0)) {
          this.possible = this.flags.EEPROM | 0;
          this.checkDetermination();
          return this.saveCore.readEEPROM8(address | 0) | 0;
        }
      };
      GameBoyAdvanceSaveDeterminer.prototype.readEEPROM16 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.possible & this.flags.EEPROM) == (this.flags.EEPROM | 0)) {
          this.possible = this.flags.EEPROM | 0;
          this.checkDetermination();
          return this.saveCore.readEEPROM16(address | 0) | 0;
        }
      };
      GameBoyAdvanceSaveDeterminer.prototype.readEEPROM32 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.possible & this.flags.EEPROM) == (this.flags.EEPROM | 0)) {
          this.possible = this.flags.EEPROM | 0;
          this.checkDetermination();
          return this.saveCore.readEEPROM32(address | 0) | 0;
        }
      };
      GameBoyAdvanceSaveDeterminer.prototype.writeSRAM = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.possible &= ~this.flags.EEPROM;
        if ((this.possible & this.flags.FLASH) == (this.flags.FLASH | 0)) {
          if ((this.possible & this.flags.SRAM) == (this.flags.SRAM | 0)) {
            if ((address | 0) == 21845) {
              if ((data | 0) == 170) {
                this.possible = this.flags.FLASH | 0;
              } else {
                this.possible = this.flags.SRAM | 0;
              }
            }
          } else {
            if ((address | 0) == 21845) {
              if ((data | 0) == 170) {
                this.possible = this.flags.FLASH | 0;
              } else {
                this.possible &= ~this.flags.FLASH;
              }
            }
          }
        } else if ((this.possible & this.flags.SRAM) == (this.flags.SRAM | 0)) {
          this.possible = this.flags.SRAM | 0;
        }
        this.checkDetermination();
        this.saveCore.writeSRAMIfDefined(address | 0, data | 0);
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/cartridge/GameBoyAdvanceEEPROMChipCore.js
  var require_GameBoyAdvanceEEPROMChipCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/cartridge/GameBoyAdvanceEEPROMChipCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceEEPROMChip;
      var getUint8Array = require_TypedArrayShim().getUint8Array;
      function GameBoyAdvanceEEPROMChip(IOCore) {
        this.saves = null;
        this.largestSizePossible = 512;
        this.mode = 0;
        this.bitsProcessed = 0;
        this.address = 0;
        this.buffer = getUint8Array(8);
        this.IOCore = IOCore;
      }
      GameBoyAdvanceEEPROMChip.prototype.initialize = function() {
        this.allocate();
      };
      GameBoyAdvanceEEPROMChip.prototype.allocate = function() {
        if (this.saves == null || (this.saves.length | 0) < (this.largestSizePossible | 0)) {
          var newSave = getUint8Array(this.largestSizePossible | 0);
          for (var index = 0; (index | 0) < (this.largestSizePossible | 0); index = (index | 0) + 1 | 0) {
            newSave[index | 0] = 255;
          }
          if (this.saves != null) {
            for (var index = 0; (index | 0) < (this.saves.length | 0); index = (index | 0) + 1 | 0) {
              newSave[index | 0] = this.saves[index | 0] | 0;
            }
          }
          this.saves = newSave;
        }
      };
      GameBoyAdvanceEEPROMChip.prototype.load = function(save) {
        if ((save.length | 0) == 512 || (save.length | 0) == 8192) {
          this.saves = save;
        }
      };
      GameBoyAdvanceEEPROMChip.prototype.read8 = function() {
        return 1;
      };
      GameBoyAdvanceEEPROMChip.prototype.read16 = function() {
        var data = 1;
        switch (this.mode | 0) {
          case 7:
            data = 0;
            if ((this.bitsProcessed | 0) < 3) {
              this.bitsProcessed = (this.bitsProcessed | 0) + 1 | 0;
            } else {
              this.bitsProcessed = 0;
              this.mode = 8;
            }
            break;
          case 8:
            var address = (this.bitsProcessed >> 3) + (this.address | 0) | 0;
            data = this.saves[address | 0] >> (7 - (this.bitsProcessed & 7) | 0) & 1;
            if ((this.bitsProcessed | 0) < 63) {
              this.bitsProcessed = (this.bitsProcessed | 0) + 1 | 0;
            } else {
              this.resetMode();
            }
        }
        return data | 0;
      };
      GameBoyAdvanceEEPROMChip.prototype.read32 = function() {
        return 65537;
      };
      GameBoyAdvanceEEPROMChip.prototype.write8 = function(data) {
      };
      GameBoyAdvanceEEPROMChip.prototype.write16 = function(data) {
        data = data & 1;
        if (this.IOCore.inDMA()) {
          switch (this.mode | 0) {
            //Idle Mode:
            case 0:
              this.mode = data | 0;
              break;
            //Select Mode:
            case 1:
              this.selectMode(data | 0);
              break;
            //Address Mode (Write):
            case 2:
            //Address Mode (Read):
            case 3:
              this.addressMode(data | 0);
              break;
            //Write Mode:
            case 4:
              this.writeMode(data | 0);
              break;
            //Ending bit of addressing:
            case 5:
            case 6:
              this.endAddressing();
              break;
            //Read Mode:
            default:
              this.resetMode();
          }
        }
      };
      GameBoyAdvanceEEPROMChip.prototype.write32 = function(data) {
      };
      GameBoyAdvanceEEPROMChip.prototype.selectMode = function(data) {
        data = data | 0;
        this.address = 0;
        this.bitsProcessed = 0;
        this.mode = 2 | data;
      };
      GameBoyAdvanceEEPROMChip.prototype.addressMode = function(data) {
        data = data | 0;
        this.address = this.address << 1 | data;
        this.bitsProcessed = (this.bitsProcessed | 0) + 1 | 0;
        switch (this.bitsProcessed | 0) {
          //6 bit address mode:
          case 6:
            if ((this.IOCore.dmaChannel3.wordCountShadow | 0) >= ((this.mode | 0) == 2 ? 74 : 10)) {
              this.largestSizePossible = 8192;
              this.allocate();
              break;
            }
          //14 bit address mode:
          case 14:
            this.changeModeToActive();
        }
      };
      GameBoyAdvanceEEPROMChip.prototype.changeModeToActive = function() {
        this.address &= 1023;
        this.address <<= 3;
        this.bitsProcessed = 0;
        this.mode = (this.mode | 0) + 2 | 0;
      };
      GameBoyAdvanceEEPROMChip.prototype.writeMode = function(data) {
        data = data | 0;
        this.pushBuffer(data | 0);
        if ((this.bitsProcessed | 0) == 64) {
          this.copyBuffer();
          this.mode = 6;
        }
      };
      GameBoyAdvanceEEPROMChip.prototype.pushBuffer = function(data) {
        data = data | 0;
        var bufferPosition = this.bitsProcessed >> 3;
        this.buffer[bufferPosition & 7] = this.buffer[bufferPosition & 7] << 1 & 254 | data;
        this.bitsProcessed = (this.bitsProcessed | 0) + 1 | 0;
      };
      GameBoyAdvanceEEPROMChip.prototype.copyBuffer = function() {
        for (var index = 0; (index | 0) < 8; index = (index | 0) + 1 | 0) {
          this.saves[this.address | index] = this.buffer[index & 7] & 255;
        }
      };
      GameBoyAdvanceEEPROMChip.prototype.endAddressing = function() {
        this.mode = (this.mode | 0) + 2 | 0;
      };
      GameBoyAdvanceEEPROMChip.prototype.resetMode = function() {
        this.mode = 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/cartridge/GameBoyAdvanceFLASHChipCore.js
  var require_GameBoyAdvanceFLASHChipCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/cartridge/GameBoyAdvanceFLASHChipCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceFLASHChip;
      var getUint8Array = require_TypedArrayShim().getUint8Array;
      function GameBoyAdvanceFLASHChip(is128, isAteml) {
        this.largestSizePossible = !!is128 ? 131072 : 65536;
        this.notATMEL = !isAteml;
        this.saves = null;
        this.BANKOffset = 0;
        this.flashCommandUnlockStage = 0;
        this.flashCommand = 0;
        this.writeBytesLeft = 0;
      }
      GameBoyAdvanceFLASHChip.prototype.initialize = function() {
        this.allocate();
      };
      GameBoyAdvanceFLASHChip.prototype.allocate = function() {
        if (this.saves == null || (this.saves.length | 0) < (this.largestSizePossible | 0)) {
          var newSave = getUint8Array(this.largestSizePossible | 0);
          for (var index = 0; (index | 0) < (this.largestSizePossible | 0); index = (index | 0) + 1 | 0) {
            newSave[index | 0] = 255;
          }
          if (this.saves != null) {
            for (var index = 0; (index | 0) < (this.saves.length | 0); index = (index | 0) + 1 | 0) {
              newSave[index | 0] = this.saves[index | 0] | 0;
            }
          }
          this.saves = newSave;
        }
      };
      GameBoyAdvanceFLASHChip.prototype.load = function(save) {
        if ((save.length | 0) == 65536 || (save.length | 0) == 131072) {
          this.saves = save;
          if ((save.length | 0) == 131072) {
            this.notATMEL = true;
          }
        }
      };
      GameBoyAdvanceFLASHChip.prototype.read = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.flashCommand | 0) != 2 || (address | 0) > 1) {
          data = this.saves[address | this.BANKOffset] | 0;
        } else {
          if ((address | 0) == 0) {
            if (this.notATMEL) {
              data = (this.largestSizePossible | 0) == 131072 ? 98 : 191;
            } else {
              data = 31;
            }
          } else {
            if (this.notATMEL) {
              data = (this.largestSizePossible | 0) == 131072 ? 19 : 212;
            } else {
              data = 61;
            }
          }
        }
        return data | 0;
      };
      GameBoyAdvanceFLASHChip.prototype.write = function(address, data) {
        address = address | 0;
        data = data | 0;
        switch (this.writeBytesLeft | 0) {
          case 0:
            this.writeControlBits(address | 0, data | 0);
            break;
          case 128:
            var addressToErase = address & 65408 | this.BANKOffset;
            for (var index = 0; (index | 0) < 128; index = (index | 0) + 1 | 0) {
              this.saves[addressToErase | index] = 255;
            }
          default:
            this.writeByte(address | 0, data | 0);
        }
      };
      GameBoyAdvanceFLASHChip.prototype.writeControlBits = function(address, data) {
        address = address | 0;
        data = data | 0;
        switch (address | 0) {
          case 0:
            this.sectorEraseOrBankSwitch(address | 0, data | 0);
            break;
          case 21845:
            this.controlWriteStage2(data | 0);
            break;
          case 10922:
            this.controlWriteStageIncrement(data | 0);
            break;
          default:
            this.sectorErase(address | 0, data | 0);
        }
      };
      GameBoyAdvanceFLASHChip.prototype.writeByte = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.saves[address | this.BANKOffset] = data | 0;
        this.writeBytesLeft = (this.writeBytesLeft | 0) - 1 | 0;
      };
      GameBoyAdvanceFLASHChip.prototype.selectBank = function(bankNumber) {
        bankNumber = bankNumber | 0;
        this.BANKOffset = (bankNumber & 1) << 16;
        this.largestSizePossible = Math.max(65536 + (this.BANKOffset | 0) | 0, this.largestSizePossible | 0) | 0;
        this.notATMEL = true;
        this.allocate();
      };
      GameBoyAdvanceFLASHChip.prototype.controlWriteStage2 = function(data) {
        data = data | 0;
        if ((data | 0) == 170) {
          this.flashCommandUnlockStage = 1;
        } else if ((this.flashCommandUnlockStage | 0) == 2) {
          switch (data | 0) {
            case 16:
              if ((this.flashCommand | 0) == 1) {
                for (var index = 0; (index | 0) < (this.largestSizePossible | 0); index = (index | 0) + 1 | 0) {
                  this.saves[index | 0] = 255;
                }
              }
              this.flashCommand = 0;
              break;
            case 128:
              this.flashCommand = 1;
              break;
            case 144:
              this.flashCommand = 2;
              break;
            case 160:
              this.writeCommandTrigger();
              break;
            case 176:
              this.flashCommand = 3;
              break;
            default:
              this.flashCommand = 0;
          }
          this.flashCommandUnlockStage = 0;
        } else if ((data | 0) == 240) {
          this.flashCommand = 0;
          this.flashCommandUnlockStage = 0;
          this.notATMEL = true;
        }
      };
      GameBoyAdvanceFLASHChip.prototype.writeCommandTrigger = function() {
        if ((this.flashCommandUnlockStage | 0) == 2) {
          if (this.notATMEL) {
            this.writeBytesLeft = 1;
          } else {
            this.writeBytesLeft = 128;
          }
        }
      };
      GameBoyAdvanceFLASHChip.prototype.sectorErase = function(address, data) {
        address = address << 12 >> 12;
        data = data | 0;
        if ((this.flashCommand | 0) == 1 && (this.flashCommandUnlockStage | 0) == 2 && (data | 0) == 48) {
          var addressEnd = (address | this.BANKOffset) + 4096 | 0;
          for (var index = address | this.BANKOffset; (index | 0) < (addressEnd | 0); index = (index | 0) + 1 | 0) {
            this.saves[index | 0] = 255;
          }
          this.notATMEL = true;
        }
        this.flashCommand = 0;
        this.flashCommandUnlockStage = 0;
      };
      GameBoyAdvanceFLASHChip.prototype.sectorEraseOrBankSwitch = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.flashCommandUnlockStage | 0) == 2) {
          this.sectorErase(address | 0, data | 0);
        } else if ((this.flashCommand | 0) == 3 && (this.flashCommandUnlockStage | 0) == 0) {
          this.selectBank(data & 1);
        }
        this.flashCommand = 0;
        this.flashCommandUnlockStage = 0;
      };
      GameBoyAdvanceFLASHChip.prototype.controlWriteStageIncrement = function(data) {
        if ((data | 0) == 85 && (this.flashCommandUnlockStage | 0) == 1) {
          this.flashCommandUnlockStage = (this.flashCommandUnlockStage | 0) + 1 | 0;
        } else {
          this.flashCommandUnlockStage = 0;
        }
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/cartridge/GameBoyAdvanceSRAMChipCore.js
  var require_GameBoyAdvanceSRAMChipCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/cartridge/GameBoyAdvanceSRAMChipCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceSRAMChip;
      var getUint8Array = require_TypedArrayShim().getUint8Array;
      function GameBoyAdvanceSRAMChip() {
        this.saves = null;
        this.TILTChip = null;
        this.TILTChipUnlocked = 0;
      }
      GameBoyAdvanceSRAMChip.prototype.initialize = function() {
        if (this.saves == null || (this.saves.length | 0) != 32768) {
          this.saves = getUint8Array(32768);
        }
      };
      GameBoyAdvanceSRAMChip.prototype.load = function(save) {
        if ((save.length | 0) == 32768) {
          this.saves = save;
        }
      };
      GameBoyAdvanceSRAMChip.prototype.read = function(address) {
        address = address | 0;
        var data = 0;
        if ((address | 0) < 32768 || (this.TILTChipUnlocked | 0) != 3) {
          data = this.saves[address & 32767] | 0;
        } else {
          switch (address | 0) {
            case 33280:
              data = this.TILTChip.readXLow() | 0;
              break;
            case 33536:
              data = this.TILTChip.readXHigh() | 0;
              break;
            case 33792:
              data = this.TILTChip.readYLow() | 0;
              break;
            case 34048:
              data = this.TILTChip.readYHigh() | 0;
              break;
            default:
              data = this.saves[address & 32767] | 0;
          }
        }
        return data | 0;
      };
      GameBoyAdvanceSRAMChip.prototype.write = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((address | 0) < 32768 || (this.TILTChipUnlocked | 0) >= 4) {
          this.saves[address & 32767] = data | 0;
        } else {
          switch (address | 0) {
            case 32768:
              if ((data | 0) == 85) {
                this.TILTChipUnlocked |= 1;
              } else {
                this.TILTChipUnlocked |= 4;
              }
              break;
            case 33024:
              if ((data | 0) == 170) {
                this.TILTChipUnlocked |= 2;
              } else {
                this.TILTChipUnlocked |= 4;
              }
              break;
            default:
              if ((this.TILTChipUnlocked | 0) == 0) {
                this.saves[address & 32767] = data | 0;
                this.TILTChipUnlocked |= 4;
              }
          }
        }
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceSavesCore.js
  var require_GameBoyAdvanceSavesCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceSavesCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceSaves;
      var GameBoyAdvanceSaveDeterminer = require_GameBoyAdvanceSaveDeterminerCore();
      var GameBoyAdvanceEEPROMChip = require_GameBoyAdvanceEEPROMChipCore();
      var GameBoyAdvanceFLASHChip = require_GameBoyAdvanceFLASHChipCore();
      var GameBoyAdvanceSRAMChip = require_GameBoyAdvanceSRAMChipCore();
      function GameBoyAdvanceSaves(IOCore) {
        this.cartridge = IOCore.cartridge;
      }
      GameBoyAdvanceSaves.prototype.initialize = function() {
        this.saveType = 0;
        this.gpioType = 0;
        this.GPIOChip = null;
        this.UNDETERMINED = new GameBoyAdvanceSaveDeterminer(this);
        this.SRAMChip = new GameBoyAdvanceSRAMChip();
        this.FLASHChip = new GameBoyAdvanceFLASHChip(this.cartridge.flash_is128, this.cartridge.flash_isAtmel);
        this.EEPROMChip = new GameBoyAdvanceEEPROMChip(this.cartridge.IOCore);
        this.currentChip = this.UNDETERMINED;
        this.referenceSave(this.saveType);
      };
      GameBoyAdvanceSaves.prototype.referenceSave = function(saveType) {
        saveType = saveType | 0;
        switch (saveType | 0) {
          case 0:
            this.currentChip = this.UNDETERMINED;
            break;
          case 1:
            this.currentChip = this.SRAMChip;
            break;
          case 2:
            this.currentChip = this.FLASHChip;
            break;
          case 3:
            this.currentChip = this.EEPROMChip;
        }
        this.currentChip.initialize();
        this.saveType = saveType | 0;
      };
      GameBoyAdvanceSaves.prototype.importSave = function(saves, saveType) {
        this.UNDETERMINED.load(saves);
        this.SRAMChip.load(saves);
        this.FLASHChip.load(saves);
        this.EEPROMChip.load(saves);
        this.referenceSave(saveType | 0);
      };
      GameBoyAdvanceSaves.prototype.exportSave = function() {
        return this.currentChip.saves;
      };
      GameBoyAdvanceSaves.prototype.exportSaveType = function() {
        return this.saveType | 0;
      };
      GameBoyAdvanceSaves.prototype.readGPIO8 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.gpioType | 0) > 0) {
          data = this.GPIOChip.read8(address | 0) | 0;
        } else {
          data = this.cartridge.readROMOnly8(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceSaves.prototype.readEEPROM8 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.saveType | 0) == 3) {
          data = this.EEPROMChip.read8() | 0;
        } else {
          data = this.UNDETERMINED.readEEPROM8(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceSaves.prototype.readGPIO16 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.gpioType | 0) > 0) {
          data = this.GPIOChip.read16(address | 0) | 0;
        } else {
          data = this.cartridge.readROMOnly16(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceSaves.prototype.readEEPROM16 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.saveType | 0) == 3) {
          data = this.EEPROMChip.read16() | 0;
        } else {
          data = this.UNDETERMINED.readEEPROM16(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceSaves.prototype.readGPIO32 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.gpioType | 0) > 0) {
          data = this.GPIOChip.read32(address | 0) | 0;
        } else {
          data = this.cartridge.readROMOnly32(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceSaves.prototype.readEEPROM32 = function(address) {
        address = address | 0;
        var data = 0;
        if ((this.saveType | 0) == 3) {
          data = this.EEPROMChip.read32() | 0;
        } else {
          data = this.UNDETERMINED.readEEPROM32(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceSaves.prototype.readSRAM = function(address) {
        address = address | 0;
        var data = 0;
        switch (this.saveType | 0) {
          case 0:
            data = this.UNDETERMINED.readSRAM(address | 0) | 0;
            break;
          case 1:
            data = this.SRAMChip.read(address | 0) | 0;
            break;
          case 2:
            data = this.FLASHChip.read(address | 0) | 0;
        }
        return data | 0;
      };
      GameBoyAdvanceSaves.prototype.writeGPIO8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.gpioType | 0) > 0) {
          this.GPIOChip.write8(address | 0, data | 0);
        } else {
          this.UNDETERMINED.writeGPIO8(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaves.prototype.writeEEPROM8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.saveType | 0) == 3) {
          this.EEPROMChip.write8(data | 0);
        } else {
          this.UNDETERMINED.writeEEPROM8(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaves.prototype.writeGPIO16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.gpioType | 0) > 0) {
          this.GPIOChip.write16(address | 0, data | 0);
        } else {
          this.UNDETERMINED.writeGPIO16(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaves.prototype.writeEEPROM16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.saveType | 0) == 3) {
          this.EEPROMChip.write16(data | 0);
        } else {
          this.UNDETERMINED.writeEEPROM16(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaves.prototype.writeGPIO32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.gpioType | 0) > 0) {
          this.GPIOChip.write32(address | 0, data | 0);
        } else {
          this.UNDETERMINED.writeGPIO32(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaves.prototype.writeEEPROM32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((this.saveType | 0) == 3) {
          this.EEPROMChip.write32(data | 0);
        } else {
          this.UNDETERMINED.writeEEPROM32(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaves.prototype.writeSRAM = function(address, data) {
        address = address | 0;
        data = data | 0;
        switch (this.saveType | 0) {
          case 0:
            this.UNDETERMINED.writeSRAM(address | 0, data | 0);
            break;
          case 1:
            this.SRAMChip.write(address | 0, data | 0);
            break;
          case 2:
            this.FLASHChip.write(address | 0, data | 0);
        }
      };
      GameBoyAdvanceSaves.prototype.writeSRAMIfDefined = function(address, data) {
        address = address | 0;
        data = data | 0;
        switch (this.saveType | 0) {
          case 0:
            this.SRAMChip.initialize();
          case 1:
            this.SRAMChip.write(address | 0, data | 0);
            break;
          case 2:
            this.FLASHChip.write(address | 0, data | 0);
        }
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceWaitCore.js
  var require_GameBoyAdvanceWaitCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceWaitCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceWait;
      var getUint8Array = require_TypedArrayShim().getUint8Array;
      function GameBoyAdvanceWait(IOCore) {
        this.IOCore = IOCore;
        this.memory = this.IOCore.memory;
      }
      GameBoyAdvanceWait.prototype.GAMEPAKWaitStateTable = [
        5,
        4,
        3,
        9
      ];
      GameBoyAdvanceWait.prototype.initialize = function() {
        this.WRAMConfiguration = 218103840;
        this.WRAMWaitState = 3;
        this.SRAMWaitState = 5;
        this.nonSequential = 256;
        this.nonSequentialROM = 0;
        this.nonSequentialPrebuffer = 256;
        this.romPrebufferContinued = 256;
        this.ROMPrebuffer = 0;
        this.prebufferClocks = 0;
        this.WAITCNT0 = 0;
        this.WAITCNT1 = 0;
        this.POSTBOOT = 0;
        this.isRendering = 1;
        this.isOAMRendering = 1;
        this.waitStateClocks = getUint8Array(512);
        this.waitStateClocksFull = getUint8Array(512);
        this.waitStateClocks[264] = 5;
        this.waitStateClocks[265] = 5;
        this.waitStateClocks[8] = 3;
        this.waitStateClocks[9] = 3;
        this.waitStateClocksFull[264] = 8;
        this.waitStateClocksFull[265] = 8;
        this.waitStateClocksFull[8] = 6;
        this.waitStateClocksFull[9] = 6;
        this.waitStateClocks[266] = 5;
        this.waitStateClocks[267] = 5;
        this.waitStateClocks[10] = 3;
        this.waitStateClocks[11] = 3;
        this.waitStateClocksFull[266] = 8;
        this.waitStateClocksFull[267] = 8;
        this.waitStateClocksFull[10] = 6;
        this.waitStateClocksFull[11] = 6;
        this.waitStateClocks[268] = 5;
        this.waitStateClocks[269] = 5;
        this.waitStateClocks[12] = 3;
        this.waitStateClocks[13] = 3;
        this.waitStateClocksFull[268] = 8;
        this.waitStateClocksFull[269] = 8;
        this.waitStateClocksFull[12] = 6;
        this.waitStateClocksFull[13] = 6;
        this.getROMRead16 = this.getROMRead16NoPrefetch;
        this.getROMRead32 = this.getROMRead32NoPrefetch;
        this.CPUInternalCyclePrefetch = this.CPUInternalCycleNoPrefetch;
        this.CPUInternalSingleCyclePrefetch = this.CPUInternalSingleCycleNoPrefetch;
      };
      GameBoyAdvanceWait.prototype.writeWAITCNT0 = function(data) {
        data = data | 0;
        this.SRAMWaitState = this.GAMEPAKWaitStateTable[data & 3] | 0;
        this.waitStateClocks[264] = this.waitStateClocks[265] = this.GAMEPAKWaitStateTable[data >> 2 & 3] | 0;
        this.waitStateClocks[8] = this.waitStateClocks[9] = (data & 16) == 16 ? 2 : 3;
        this.waitStateClocksFull[8] = this.waitStateClocksFull[9] = ((this.waitStateClocks[8] | 0) - 1 << 1) + 1 | 0;
        this.waitStateClocks[266] = this.waitStateClocks[267] = this.GAMEPAKWaitStateTable[data >> 5 & 3] | 0;
        this.waitStateClocks[10] = this.waitStateClocks[11] = data > 127 ? 2 : 5;
        this.waitStateClocksFull[10] = this.waitStateClocksFull[11] = ((this.waitStateClocks[10] | 0) - 1 << 1) + 1 | 0;
        this.waitStateClocksFull[264] = this.waitStateClocksFull[265] = (this.waitStateClocks[264] | 0) + (this.waitStateClocks[8] | 0) - 1 | 0;
        this.waitStateClocksFull[266] = this.waitStateClocksFull[267] = (this.waitStateClocks[266] | 0) + (this.waitStateClocks[10] | 0) - 1 | 0;
        this.WAITCNT0 = data | 0;
      };
      GameBoyAdvanceWait.prototype.readWAITCNT0 = function() {
        return this.WAITCNT0 | 0;
      };
      GameBoyAdvanceWait.prototype.writeWAITCNT1 = function(data) {
        data = data | 0;
        this.waitStateClocks[268] = this.waitStateClocks[269] = this.GAMEPAKWaitStateTable[data & 3] | 0;
        this.waitStateClocks[12] = this.waitStateClocks[13] = (data & 4) == 4 ? 2 : 9;
        this.waitStateClocksFull[12] = this.waitStateClocksFull[13] = ((this.waitStateClocks[12] | 0) - 1 << 1) + 1 | 0;
        this.waitStateClocksFull[268] = this.waitStateClocksFull[269] = (this.waitStateClocks[268] | 0) + (this.waitStateClocks[12] | 0) - 1 | 0;
        if ((data & 64) == 0) {
          this.ROMPrebuffer = 0;
          this.prebufferClocks = 0;
          this.getROMRead16 = this.getROMRead16NoPrefetch;
          this.getROMRead32 = this.getROMRead32NoPrefetch;
          this.CPUInternalCyclePrefetch = this.CPUInternalCycleNoPrefetch;
          this.CPUInternalSingleCyclePrefetch = this.CPUInternalSingleCycleNoPrefetch;
        } else {
          this.getROMRead16 = this.getROMRead16Prefetch;
          this.getROMRead32 = this.getROMRead32Prefetch;
          this.CPUInternalCyclePrefetch = this.multiClock;
          this.CPUInternalSingleCyclePrefetch = this.singleClock;
          this.nonSequentialROM = 0;
          this.nonSequentialPrebuffer = 256;
          this.romPrebufferContinued = 256;
        }
        this.WAITCNT1 = data & 95;
      };
      GameBoyAdvanceWait.prototype.readWAITCNT1 = function() {
        return this.WAITCNT1 | 0;
      };
      GameBoyAdvanceWait.prototype.writePOSTBOOT = function(data) {
        this.POSTBOOT = data | 0;
      };
      GameBoyAdvanceWait.prototype.readPOSTBOOT = function() {
        return this.POSTBOOT | 0;
      };
      GameBoyAdvanceWait.prototype.writeHALTCNT = function(data) {
        data = data | 0;
        if ((data & 128) == 0) {
          this.IOCore.flagHalt();
        } else {
          this.IOCore.flagStop();
        }
      };
      GameBoyAdvanceWait.prototype.writeConfigureWRAM8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        switch (address & 3) {
          case 0:
            this.memory.remapWRAM(data & 33);
            this.WRAMConfiguration = this.WRAMConfiguration & 4294967040 | data;
            break;
          case 1:
            this.WRAMConfiguration = this.WRAMConfiguration & 4294902015 | data << 8;
            break;
          case 2:
            this.WRAMConfiguration = this.WRAMConfiguration & 4278255615 | data << 16;
            break;
          default:
            this.WRAMWaitState = 16 - (data & 15) | 0;
            this.WRAMConfiguration = this.WRAMConfiguration & 16777215 | data << 24;
        }
      };
      GameBoyAdvanceWait.prototype.writeConfigureWRAM16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((address & 2) == 0) {
          this.WRAMConfiguration = this.WRAMConfiguration & 4294901760 | data & 65535;
          this.memory.remapWRAM(data & 33);
        } else {
          this.WRAMConfiguration = data << 16 | this.WRAMConfiguration & 65535;
          this.WRAMWaitState = 16 - (data >> 8 & 15) | 0;
        }
      };
      GameBoyAdvanceWait.prototype.writeConfigureWRAM32 = function(data) {
        data = data | 0;
        this.WRAMConfiguration = data | 0;
        this.WRAMWaitState = 16 - (data >> 24 & 15) | 0;
        this.memory.remapWRAM(data & 33);
      };
      GameBoyAdvanceWait.prototype.readConfigureWRAM8 = function(address) {
        address = address | 0;
        var data = 0;
        switch (address & 3) {
          case 0:
            data = this.WRAMConfiguration & 47;
            break;
          case 3:
            data = this.WRAMConfiguration >>> 24;
        }
        return data | 0;
      };
      GameBoyAdvanceWait.prototype.readConfigureWRAM16 = function(address) {
        address = address | 0;
        var data = 0;
        if ((address & 2) == 0) {
          data = this.WRAMConfiguration & 47;
        } else {
          data = this.WRAMConfiguration >> 16 & 65280;
        }
        return data | 0;
      };
      GameBoyAdvanceWait.prototype.readConfigureWRAM32 = function() {
        return this.WRAMConfiguration & 4278190127;
      };
      GameBoyAdvanceWait.prototype.CPUInternalCycleNoPrefetch = function(clocks) {
        clocks = clocks | 0;
        this.IOCore.updateCore(clocks | 0);
        this.checkPrebufferBug();
      };
      GameBoyAdvanceWait.prototype.CPUInternalSingleCycleNoPrefetch = function() {
        this.IOCore.updateCoreSingle();
        this.checkPrebufferBug();
      };
      GameBoyAdvanceWait.prototype.checkPrebufferBug = function() {
        var address = this.IOCore.cpu.registers[15] | 0;
        if ((address | 0) >= 134217728 && (address | 0) < 234881024) {
          this.nonSequentialROM = 256;
        }
      };
      GameBoyAdvanceWait.prototype.check128kAlignmentBug = function(address) {
        address = address | 0;
        if ((address & 131071) == 0) {
          this.NonSequentialBroadcast();
        }
      };
      GameBoyAdvanceWait.prototype.prefetchROMInRAM = function(address) {
        address = address | 0;
        while ((this.prebufferClocks | 0) >= (this.waitStateClocks[address | this.nonSequentialPrebuffer] | 0)) {
          if ((this.ROMPrebuffer | 0) == 8) {
            this.prebufferClocks = 0;
            break;
          } else {
            this.prebufferClocks = (this.prebufferClocks | 0) - (this.waitStateClocks[address | this.nonSequentialPrebuffer] | 0) | 0;
            this.ROMPrebuffer = (this.ROMPrebuffer | 0) + 1 | 0;
            this.romPrebufferContinued = 0;
            this.nonSequentialPrebuffer = 0;
            this.nonSequential = 0;
          }
        }
      };
      GameBoyAdvanceWait.prototype.multiClock = function(clocks) {
        clocks = clocks | 0;
        this.IOCore.updateCore(clocks | 0);
        var address = this.IOCore.cpu.registers[15] | 0;
        if ((address | 0) >= 134217728 && (address | 0) < 234881024 && (this.prebufferClocks | 0) < 255) {
          this.prebufferClocks = (this.prebufferClocks | 0) + (clocks | 0) | 0;
        } else {
          this.ROMPrebuffer = 0;
          this.prebufferClocks = 0;
        }
      };
      GameBoyAdvanceWait.prototype.singleClock = function() {
        this.IOCore.updateCoreSingle();
        var address = this.IOCore.cpu.registers[15] | 0;
        if ((address | 0) >= 134217728 && (address | 0) < 234881024 && (this.prebufferClocks | 0) < 255) {
          this.prebufferClocks = (this.prebufferClocks | 0) + 1 | 0;
        } else {
          this.ROMPrebuffer = 0;
          this.prebufferClocks = 0;
        }
      };
      GameBoyAdvanceWait.prototype.doZeroWait16 = function() {
        this.ROMPrebuffer = (this.ROMPrebuffer | 0) - 1 | 0;
        this.IOCore.updateCoreSingle();
        if ((this.prebufferClocks | 0) < 255) {
          this.prebufferClocks = (this.prebufferClocks | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceWait.prototype.doZeroWait32 = function() {
        this.ROMPrebuffer = (this.ROMPrebuffer | 0) - 2 | 0;
        this.IOCore.updateCoreSingle();
        if ((this.prebufferClocks | 0) < 255) {
          this.prebufferClocks = (this.prebufferClocks | 0) + 1 | 0;
        }
      };
      GameBoyAdvanceWait.prototype.getROMRead16Prefetch = function(address) {
        address = address | 0;
        this.prefetchROMInRAM(address | 0);
        if ((this.ROMPrebuffer | 0) > 0) {
          this.doZeroWait16();
        } else {
          this.IOCore.updateCore((this.waitStateClocks[address | this.nonSequentialPrebuffer] | 0) - (this.prebufferClocks | 0) | 0);
          this.romPrebufferContinued = 0;
          this.prebufferClocks = 0;
          this.nonSequential = 0;
          this.nonSequentialPrebuffer = 0;
        }
      };
      GameBoyAdvanceWait.prototype.getROMRead16NoPrefetch = function(address) {
        address = address | 0;
        this.IOCore.updateCore(this.waitStateClocks[address | this.nonSequential | this.nonSequentialROM] | 0);
        this.prebufferClocks = 0;
        this.nonSequentialROM = 0;
        this.nonSequential = 0;
      };
      GameBoyAdvanceWait.prototype.getROMRead32Prefetch = function(address) {
        address = address | 0;
        this.prefetchROMInRAM(address | 0);
        switch (this.ROMPrebuffer | 0) {
          case 0:
            this.IOCore.updateCore((this.waitStateClocksFull[address | this.nonSequentialPrebuffer] | 0) - (this.prebufferClocks | 0) | 0);
            this.romPrebufferContinued = 0;
            this.prebufferClocks = 0;
            this.nonSequential = 0;
            this.nonSequentialPrebuffer = 0;
            break;
          case 1:
            this.IOCore.updateCore((this.waitStateClocks[address & 255] | 0) - (this.prebufferClocks | 0) | 0);
            this.prebufferClocks = 0;
            this.ROMPrebuffer = 0;
            break;
          default:
            this.doZeroWait32();
        }
      };
      GameBoyAdvanceWait.prototype.getROMRead32NoPrefetch = function(address) {
        address = address | 0;
        this.IOCore.updateCore(this.waitStateClocksFull[address | this.nonSequential | this.nonSequentialROM] | 0);
        this.prebufferClocks = 0;
        this.nonSequentialROM = 0;
        this.nonSequential = 0;
      };
      GameBoyAdvanceWait.prototype.NonSequentialBroadcast = function() {
        this.nonSequential = 256;
        this.nonSequentialPrebuffer = 256 & this.romPrebufferContinued;
      };
      GameBoyAdvanceWait.prototype.NonSequentialBroadcastClear = function() {
        this.ROMPrebuffer = 0;
        this.prebufferClocks = 0;
        this.nonSequential = 256;
        this.nonSequentialPrebuffer = 256;
        this.romPrebufferContinued = 256;
      };
      GameBoyAdvanceWait.prototype.WRAMAccess = function() {
        this.multiClock(this.WRAMWaitState | 0);
      };
      GameBoyAdvanceWait.prototype.WRAMAccess16CPU = function() {
        this.IOCore.updateCore(this.WRAMWaitState | 0);
      };
      GameBoyAdvanceWait.prototype.WRAMAccess32 = function() {
        this.multiClock(this.WRAMWaitState << 1);
      };
      GameBoyAdvanceWait.prototype.WRAMAccess32CPU = function() {
        this.IOCore.updateCore(this.WRAMWaitState << 1);
      };
      GameBoyAdvanceWait.prototype.ROMAccess = function(address) {
        address = address | 0;
        this.check128kAlignmentBug(address | 0);
        this.IOCore.updateCore(this.waitStateClocks[address >> 24 | this.nonSequential] | 0);
        this.nonSequential = 0;
        this.romPrebufferContinued = 256;
        this.nonSequentialPrebuffer = 256;
      };
      GameBoyAdvanceWait.prototype.ROMAccess16CPU = function(address) {
        address = address | 0;
        this.check128kAlignmentBug(address | 0);
        this.getROMRead16(address >> 24);
      };
      GameBoyAdvanceWait.prototype.ROMAccess32 = function(address) {
        address = address | 0;
        this.check128kAlignmentBug(address | 0);
        this.IOCore.updateCore(this.waitStateClocksFull[address >> 24 | this.nonSequential] | 0);
        this.nonSequential = 0;
        this.romPrebufferContinued = 256;
        this.nonSequentialPrebuffer = 256;
      };
      GameBoyAdvanceWait.prototype.ROMAccess32CPU = function(address) {
        address = address | 0;
        this.check128kAlignmentBug(address | 0);
        this.getROMRead32(address >> 24);
      };
      GameBoyAdvanceWait.prototype.SRAMAccess = function() {
        this.multiClock(this.SRAMWaitState | 0);
      };
      GameBoyAdvanceWait.prototype.SRAMAccessCPU = function() {
        this.IOCore.updateCore(this.SRAMWaitState | 0);
      };
      GameBoyAdvanceWait.prototype.VRAMAccess = function() {
        this.multiClock(this.isRendering | 0);
      };
      GameBoyAdvanceWait.prototype.VRAMAccess16CPU = function() {
        this.IOCore.updateCore(this.isRendering | 0);
      };
      GameBoyAdvanceWait.prototype.VRAMAccess32 = function() {
        this.multiClock(this.isRendering << 1);
      };
      GameBoyAdvanceWait.prototype.VRAMAccess32CPU = function() {
        this.IOCore.updateCore(this.isRendering << 1);
      };
      GameBoyAdvanceWait.prototype.OAMAccess = function() {
        this.multiClock(this.isOAMRendering | 0);
      };
      GameBoyAdvanceWait.prototype.OAMAccessCPU = function() {
        this.IOCore.updateCore(this.isOAMRendering | 0);
      };
      GameBoyAdvanceWait.prototype.updateRenderStatus = function(isRendering, isOAMRendering) {
        this.isRendering = isRendering | 0;
        this.isOAMRendering = isOAMRendering | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/CPU/THUMBInstructionSetCore.js
  var require_THUMBInstructionSetCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/CPU/THUMBInstructionSetCore.js"(exports, module) {
      "use strict";
      module.exports = THUMBInstructionSet;
      var getUint8Array = require_TypedArrayShim().getUint8Array;
      function THUMBInstructionSet(CPUCore) {
        this.CPUCore = CPUCore;
        this.initialize();
      }
      THUMBInstructionSet.prototype.initialize = function() {
        this.wait = this.CPUCore.wait;
        this.registers = this.CPUCore.registers;
        this.branchFlags = this.CPUCore.branchFlags;
        this.fetch = 0;
        this.decode = 0;
        this.execute = 0;
        this.memory = this.CPUCore.memory;
      };
      THUMBInstructionSet.prototype.executeIteration = function() {
        this.fetch = this.memory.memoryReadCPU16(this.readPC() | 0) | 0;
        this.executeDecoded();
        this.execute = this.decode | 0;
        this.decode = this.fetch | 0;
      };
      THUMBInstructionSet.prototype.executeDecoded = function() {
        switch (this.instructionMap[this.execute >> 6] & 255) {
          //Leave the "& 0xFF" there, it's a uint8 type guard.
          case 0:
            this.CMPimm8();
            break;
          case 1:
            this.BEQ();
            break;
          case 2:
            this.MOVH_LH();
            break;
          case 3:
            this.LDRimm5();
            break;
          case 4:
            this.AND();
            break;
          case 5:
            this.LDRBimm5();
            break;
          case 6:
            this.LSLimm();
            break;
          case 7:
            this.LSRimm();
            break;
          case 8:
            this.MOVimm8();
            break;
          case 9:
            this.CMP();
            break;
          case 10:
            this.LDRSP();
            break;
          case 11:
            this.ADDimm3();
            break;
          case 12:
            this.ADDreg();
            break;
          case 13:
            this.STRSP();
            break;
          case 14:
            this.B();
            break;
          case 15:
            this.LDRPC();
            break;
          case 16:
            this.MOVH_HL();
            break;
          case 17:
            this.ADDimm8();
            break;
          case 18:
            this.SUBreg();
            break;
          case 19:
            this.BCC();
            break;
          case 20:
            this.STRimm5();
            break;
          case 21:
            this.ORR();
            break;
          case 22:
            this.LDRHimm5();
            break;
          case 23:
            this.BCS();
            break;
          case 24:
            this.BNE();
            break;
          case 25:
            this.BGE();
            break;
          case 26:
            this.POP();
            break;
          case 27:
            this.ADDH_HL();
            break;
          case 28:
            this.STRHimm5();
            break;
          case 29:
            this.BLE();
            break;
          case 30:
            this.ASRimm();
            break;
          case 31:
            this.MUL();
            break;
          case 32:
            this.BLsetup();
            break;
          case 33:
            this.BLoff();
            break;
          case 34:
            this.BGT();
            break;
          case 35:
            this.STRHreg();
            break;
          case 36:
            this.LDRHreg();
            break;
          case 37:
            this.BX_L();
            break;
          case 38:
            this.BLT();
            break;
          case 39:
            this.ADDSPimm7();
            break;
          case 40:
            this.PUSHlr();
            break;
          case 41:
            this.PUSH();
            break;
          case 42:
            this.SUBimm8();
            break;
          case 43:
            this.ROR();
            break;
          case 44:
            this.LDRSHreg();
            break;
          case 45:
            this.STRBimm5();
            break;
          case 46:
            this.NEG();
            break;
          case 47:
            this.BHI();
            break;
          case 48:
            this.TST();
            break;
          case 49:
            this.BX_H();
            break;
          case 50:
            this.STMIA();
            break;
          case 51:
            this.BLS();
            break;
          case 52:
            this.SWI();
            break;
          case 53:
            this.LDMIA();
            break;
          case 54:
            this.MOVH_HH();
            break;
          case 55:
            this.LSL();
            break;
          case 56:
            this.POPpc();
            break;
          case 57:
            this.LSR();
            break;
          case 58:
            this.CMPH_LH();
            break;
          case 59:
            this.EOR();
            break;
          case 60:
            this.SUBimm3();
            break;
          case 61:
            this.ADDH_LH();
            break;
          case 62:
            this.BPL();
            break;
          case 63:
            this.CMPH_HL();
            break;
          case 64:
            this.ADDPC();
            break;
          case 65:
            this.LDRSBreg();
            break;
          case 66:
            this.BIC();
            break;
          case 67:
            this.ADDSP();
            break;
          case 68:
            this.MVN();
            break;
          case 69:
            this.ASR();
            break;
          case 70:
            this.LDRreg();
            break;
          case 71:
            this.ADC();
            break;
          case 72:
            this.SBC();
            break;
          case 73:
            this.BMI();
            break;
          case 74:
            this.STRreg();
            break;
          case 75:
            this.CMN();
            break;
          case 76:
            this.LDRBreg();
            break;
          case 77:
            this.ADDH_HH();
            break;
          case 78:
            this.CMPH_HH();
            break;
          case 79:
            this.STRBreg();
            break;
          case 80:
            this.BVS();
            break;
          case 81:
            this.BVC();
            break;
          default:
            this.UNDEFINED();
        }
      };
      THUMBInstructionSet.prototype.executeBubble = function() {
        this.fetch = this.memory.memoryReadCPU16(this.readPC() | 0) | 0;
        this.incrementProgramCounter();
        this.execute = this.decode | 0;
        this.decode = this.fetch | 0;
      };
      THUMBInstructionSet.prototype.incrementProgramCounter = function() {
        this.registers[15] = (this.registers[15] | 0) + 2 | 0;
      };
      THUMBInstructionSet.prototype.readLowRegister = function(address) {
        address = address | 0;
        return this.registers[address & 7] | 0;
      };
      THUMBInstructionSet.prototype.read0OffsetLowRegister = function() {
        return this.readLowRegister(this.execute | 0) | 0;
      };
      THUMBInstructionSet.prototype.read3OffsetLowRegister = function() {
        return this.readLowRegister(this.execute >> 3) | 0;
      };
      THUMBInstructionSet.prototype.read6OffsetLowRegister = function() {
        return this.readLowRegister(this.execute >> 6) | 0;
      };
      THUMBInstructionSet.prototype.read8OffsetLowRegister = function() {
        return this.readLowRegister(this.execute >> 8) | 0;
      };
      THUMBInstructionSet.prototype.readHighRegister = function(address) {
        address = address | 8;
        return this.registers[address & 15] | 0;
      };
      THUMBInstructionSet.prototype.writeLowRegister = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.registers[address & 7] = data | 0;
      };
      THUMBInstructionSet.prototype.write0OffsetLowRegister = function(data) {
        data = data | 0;
        this.writeLowRegister(this.execute | 0, data | 0);
      };
      THUMBInstructionSet.prototype.write8OffsetLowRegister = function(data) {
        data = data | 0;
        this.writeLowRegister(this.execute >> 8, data | 0);
      };
      THUMBInstructionSet.prototype.guardHighRegisterWrite = function(data) {
        data = data | 0;
        var address = 8 | this.execute & 7;
        if ((address | 0) == 15) {
          this.CPUCore.branch(data & -2);
        } else {
          this.registers[address & 15] = data | 0;
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.writeSP = function(data) {
        data = data | 0;
        this.registers[13] = data | 0;
      };
      THUMBInstructionSet.prototype.SPDecrementWord = function() {
        this.registers[13] = (this.registers[13] | 0) - 4 | 0;
      };
      THUMBInstructionSet.prototype.SPIncrementWord = function() {
        this.registers[13] = (this.registers[13] | 0) + 4 | 0;
      };
      THUMBInstructionSet.prototype.writeLR = function(data) {
        data = data | 0;
        this.registers[14] = data | 0;
      };
      THUMBInstructionSet.prototype.writePC = function(data) {
        data = data | 0;
        this.CPUCore.branch(data & -2);
      };
      THUMBInstructionSet.prototype.offsetPC = function() {
        this.CPUCore.branch((this.readPC() | 0) + (this.execute << 24 >> 23) | 0);
      };
      THUMBInstructionSet.prototype.getLR = function() {
        return (this.readPC() | 0) - 2 | 0;
      };
      THUMBInstructionSet.prototype.getIRQLR = function() {
        return this.readPC() | 0;
      };
      THUMBInstructionSet.prototype.readSP = function() {
        return this.registers[13] | 0;
      };
      THUMBInstructionSet.prototype.readLR = function() {
        return this.registers[14] | 0;
      };
      THUMBInstructionSet.prototype.readPC = function() {
        return this.registers[15] | 0;
      };
      THUMBInstructionSet.prototype.getCurrentFetchValue = function() {
        return this.fetch | this.fetch << 16;
      };
      THUMBInstructionSet.prototype.getSWICode = function() {
        return this.execute & 255;
      };
      THUMBInstructionSet.prototype.LSLimm = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var offset = this.execute >> 6 & 31;
        if ((offset | 0) > 0) {
          this.branchFlags.setCarry(source << ((offset | 0) - 1 | 0) | 0);
          source = source << (offset | 0);
        }
        this.branchFlags.setNZInt(source | 0);
        this.write0OffsetLowRegister(source | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LSRimm = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var offset = this.execute >> 6 & 31;
        if ((offset | 0) > 0) {
          this.branchFlags.setCarry(source >> ((offset | 0) - 1 | 0) << 31);
          source = source >>> (offset | 0) | 0;
        } else {
          this.branchFlags.setCarry(source | 0);
          source = 0;
        }
        this.branchFlags.setNZInt(source | 0);
        this.write0OffsetLowRegister(source | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ASRimm = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var offset = this.execute >> 6 & 31;
        if ((offset | 0) > 0) {
          this.branchFlags.setCarry(source >> ((offset | 0) - 1 | 0) << 31);
          source = source >> (offset | 0);
        } else {
          this.branchFlags.setCarry(source | 0);
          source = source >> 31;
        }
        this.branchFlags.setNZInt(source | 0);
        this.write0OffsetLowRegister(source | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADDreg = function() {
        var operand1 = this.read3OffsetLowRegister() | 0;
        var operand2 = this.read6OffsetLowRegister() | 0;
        this.write0OffsetLowRegister(this.branchFlags.setADDFlags(operand1 | 0, operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.SUBreg = function() {
        var operand1 = this.read3OffsetLowRegister() | 0;
        var operand2 = this.read6OffsetLowRegister() | 0;
        this.write0OffsetLowRegister(this.branchFlags.setSUBFlags(operand1 | 0, operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADDimm3 = function() {
        var operand1 = this.read3OffsetLowRegister() | 0;
        var operand2 = this.execute >> 6 & 7;
        this.write0OffsetLowRegister(this.branchFlags.setADDFlags(operand1 | 0, operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.SUBimm3 = function() {
        var operand1 = this.read3OffsetLowRegister() | 0;
        var operand2 = this.execute >> 6 & 7;
        this.write0OffsetLowRegister(this.branchFlags.setSUBFlags(operand1 | 0, operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.MOVimm8 = function() {
        var result = this.execute & 255;
        this.branchFlags.setNegativeFalse();
        this.branchFlags.setZero(result | 0);
        this.write8OffsetLowRegister(result | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.CMPimm8 = function() {
        var operand1 = this.read8OffsetLowRegister() | 0;
        var operand2 = this.execute & 255;
        this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADDimm8 = function() {
        var operand1 = this.read8OffsetLowRegister() | 0;
        var operand2 = this.execute & 255;
        this.write8OffsetLowRegister(this.branchFlags.setADDFlags(operand1 | 0, operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.SUBimm8 = function() {
        var operand1 = this.read8OffsetLowRegister() | 0;
        var operand2 = this.execute & 255;
        this.write8OffsetLowRegister(this.branchFlags.setSUBFlags(operand1 | 0, operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.AND = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var destination = this.read0OffsetLowRegister() | 0;
        var result = source & destination;
        this.branchFlags.setNZInt(result | 0);
        this.write0OffsetLowRegister(result | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.EOR = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var destination = this.read0OffsetLowRegister() | 0;
        var result = source ^ destination;
        this.branchFlags.setNZInt(result | 0);
        this.write0OffsetLowRegister(result | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LSL = function() {
        var source = this.read3OffsetLowRegister() & 255;
        var destination = this.read0OffsetLowRegister() | 0;
        if ((source | 0) > 0) {
          if ((source | 0) < 32) {
            this.branchFlags.setCarry(destination << ((source | 0) - 1 | 0));
            destination = destination << (source | 0);
          } else if ((source | 0) == 32) {
            this.branchFlags.setCarry(destination << 31);
            destination = 0;
          } else {
            this.branchFlags.setCarryFalse();
            destination = 0;
          }
        }
        this.branchFlags.setNZInt(destination | 0);
        this.write0OffsetLowRegister(destination | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LSR = function() {
        var source = this.read3OffsetLowRegister() & 255;
        var destination = this.read0OffsetLowRegister() | 0;
        if ((source | 0) > 0) {
          if ((source | 0) < 32) {
            this.branchFlags.setCarry(destination >> ((source | 0) - 1 | 0) << 31);
            destination = destination >>> (source | 0) | 0;
          } else if (source == 32) {
            this.branchFlags.setCarry(destination | 0);
            destination = 0;
          } else {
            this.branchFlags.setCarryFalse();
            destination = 0;
          }
        }
        this.branchFlags.setNZInt(destination | 0);
        this.write0OffsetLowRegister(destination | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ASR = function() {
        var source = this.read3OffsetLowRegister() & 255;
        var destination = this.read0OffsetLowRegister() | 0;
        if ((source | 0) > 0) {
          if ((source | 0) < 32) {
            this.branchFlags.setCarry(destination >> ((source | 0) - 1 | 0) << 31);
            destination = destination >> (source | 0);
          } else {
            this.branchFlags.setCarry(destination | 0);
            destination = destination >> 31;
          }
        }
        this.branchFlags.setNZInt(destination | 0);
        this.write0OffsetLowRegister(destination | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADC = function() {
        var operand1 = this.read0OffsetLowRegister() | 0;
        var operand2 = this.read3OffsetLowRegister() | 0;
        this.write0OffsetLowRegister(this.branchFlags.setADCFlags(operand1 | 0, operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.SBC = function() {
        var operand1 = this.read0OffsetLowRegister() | 0;
        var operand2 = this.read3OffsetLowRegister() | 0;
        this.write0OffsetLowRegister(this.branchFlags.setSBCFlags(operand1 | 0, operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ROR = function() {
        var source = this.read3OffsetLowRegister() & 255;
        var destination = this.read0OffsetLowRegister() | 0;
        if ((source | 0) > 0) {
          source = source & 31;
          if ((source | 0) > 0) {
            this.branchFlags.setCarry(destination >> (source - 1 | 0) << 31);
            destination = destination << (32 - (source | 0) | 0) | destination >>> (source | 0);
          } else {
            this.branchFlags.setCarry(destination | 0);
          }
        }
        this.branchFlags.setNZInt(destination | 0);
        this.write0OffsetLowRegister(destination | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.TST = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var destination = this.read0OffsetLowRegister() | 0;
        var result = source & destination;
        this.branchFlags.setNZInt(result | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.NEG = function() {
        var source = this.read3OffsetLowRegister() | 0;
        if ((source | 0) != -2147483648) {
          source = -(source | 0) | 0;
          this.branchFlags.setOverflowFalse();
        } else {
          this.branchFlags.setOverflowTrue();
        }
        this.branchFlags.setNZInt(source | 0);
        this.write0OffsetLowRegister(source | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.CMP = function() {
        var operand1 = this.read0OffsetLowRegister() | 0;
        var operand2 = this.read3OffsetLowRegister() | 0;
        this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.CMN = function() {
        var operand1 = this.read0OffsetLowRegister() | 0;
        var operand2 = this.read3OffsetLowRegister() | 0;
        this.branchFlags.setCMNFlags(operand1 | 0, operand2 | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ORR = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var destination = this.read0OffsetLowRegister() | 0;
        var result = source | destination;
        this.branchFlags.setNZInt(result | 0);
        this.write0OffsetLowRegister(result | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.MUL = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var destination = this.read0OffsetLowRegister() | 0;
        var result = this.CPUCore.performMUL32(source | 0, destination | 0, 0) | 0;
        this.branchFlags.setCarryFalse();
        this.branchFlags.setNZInt(result | 0);
        this.write0OffsetLowRegister(result | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.BIC = function() {
        var source = this.read3OffsetLowRegister() | 0;
        var destination = this.read0OffsetLowRegister() | 0;
        var result = ~source & destination;
        this.branchFlags.setNZInt(result | 0);
        this.write0OffsetLowRegister(result | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.MVN = function() {
        var source = ~this.read3OffsetLowRegister();
        this.branchFlags.setNZInt(source | 0);
        this.write0OffsetLowRegister(source | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADDH_LH = function() {
        var operand1 = this.read0OffsetLowRegister() | 0;
        var operand2 = this.readHighRegister(this.execute >> 3) | 0;
        this.write0OffsetLowRegister((operand1 | 0) + (operand2 | 0) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADDH_HL = function() {
        var operand1 = this.readHighRegister(this.execute | 0) | 0;
        var operand2 = this.read3OffsetLowRegister() | 0;
        this.guardHighRegisterWrite((operand1 | 0) + (operand2 | 0) | 0);
      };
      THUMBInstructionSet.prototype.ADDH_HH = function() {
        var operand1 = this.readHighRegister(this.execute | 0) | 0;
        var operand2 = this.readHighRegister(this.execute >> 3) | 0;
        this.guardHighRegisterWrite((operand1 | 0) + (operand2 | 0) | 0);
      };
      THUMBInstructionSet.prototype.CMPH_LH = function() {
        var operand1 = this.read0OffsetLowRegister() | 0;
        var operand2 = this.readHighRegister(this.execute >> 3) | 0;
        this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.CMPH_HL = function() {
        var operand1 = this.readHighRegister(this.execute | 0) | 0;
        var operand2 = this.read3OffsetLowRegister() | 0;
        this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.CMPH_HH = function() {
        var operand1 = this.readHighRegister(this.execute | 0) | 0;
        var operand2 = this.readHighRegister(this.execute >> 3) | 0;
        this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.MOVH_LH = function() {
        this.write0OffsetLowRegister(this.readHighRegister(this.execute >> 3) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.MOVH_HL = function() {
        this.guardHighRegisterWrite(this.read3OffsetLowRegister() | 0);
      };
      THUMBInstructionSet.prototype.MOVH_HH = function() {
        this.guardHighRegisterWrite(this.readHighRegister(this.execute >> 3) | 0);
      };
      THUMBInstructionSet.prototype.BX_L = function() {
        var address = this.read3OffsetLowRegister() | 0;
        if ((address & 1) == 0) {
          this.CPUCore.enterARM();
          this.CPUCore.branch(address & -4);
        } else {
          this.CPUCore.branch(address & -2);
        }
      };
      THUMBInstructionSet.prototype.BX_H = function() {
        var address = this.readHighRegister(this.execute >> 3) | 0;
        if ((address & 1) == 0) {
          this.CPUCore.enterARM();
          this.CPUCore.branch(address & -4);
        } else {
          this.CPUCore.branch(address & -2);
        }
      };
      THUMBInstructionSet.prototype.LDRPC = function() {
        var data = this.CPUCore.read32((this.readPC() & -3) + ((this.execute & 255) << 2) | 0) | 0;
        this.write8OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.STRreg = function() {
        var address = (this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0) | 0;
        this.CPUCore.write32(address | 0, this.read0OffsetLowRegister() | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.STRHreg = function() {
        var address = (this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0) | 0;
        this.CPUCore.write16(address | 0, this.read0OffsetLowRegister() | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.STRBreg = function() {
        var address = (this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0) | 0;
        this.CPUCore.write8(address | 0, this.read0OffsetLowRegister() | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRSBreg = function() {
        var data = this.CPUCore.read8((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0) | 0) << 24 >> 24;
        this.write0OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRreg = function() {
        var data = this.CPUCore.read32((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0) | 0) | 0;
        this.write0OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRHreg = function() {
        var data = this.CPUCore.read16((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0) | 0) | 0;
        this.write0OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRBreg = function() {
        var data = this.CPUCore.read8((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0) | 0) | 0;
        this.write0OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRSHreg = function() {
        var data = this.CPUCore.read16((this.read6OffsetLowRegister() | 0) + (this.read3OffsetLowRegister() | 0) | 0) << 16 >> 16;
        this.write0OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.STRimm5 = function() {
        var address = (this.execute >> 4 & 124) + (this.read3OffsetLowRegister() | 0) | 0;
        this.CPUCore.write32(address | 0, this.read0OffsetLowRegister() | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRimm5 = function() {
        var data = this.CPUCore.read32((this.execute >> 4 & 124) + (this.read3OffsetLowRegister() | 0) | 0) | 0;
        this.write0OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.STRBimm5 = function() {
        var address = (this.execute >> 6 & 31) + (this.read3OffsetLowRegister() | 0) | 0;
        this.CPUCore.write8(address | 0, this.read0OffsetLowRegister() | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRBimm5 = function() {
        var data = this.CPUCore.read8((this.execute >> 6 & 31) + (this.read3OffsetLowRegister() | 0) | 0) | 0;
        this.write0OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.STRHimm5 = function() {
        var address = (this.execute >> 5 & 62) + (this.read3OffsetLowRegister() | 0) | 0;
        this.CPUCore.write16(address | 0, this.read0OffsetLowRegister() | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRHimm5 = function() {
        var data = this.CPUCore.read16((this.execute >> 5 & 62) + (this.read3OffsetLowRegister() | 0) | 0) | 0;
        this.write0OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.STRSP = function() {
        var address = ((this.execute & 255) << 2) + (this.readSP() | 0) | 0;
        this.CPUCore.write32(address | 0, this.read8OffsetLowRegister() | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDRSP = function() {
        var data = this.CPUCore.read32(((this.execute & 255) << 2) + (this.readSP() | 0) | 0) | 0;
        this.write8OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADDPC = function() {
        var data = (this.readPC() & -3) + ((this.execute & 255) << 2) | 0;
        this.write8OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADDSP = function() {
        var data = ((this.execute & 255) << 2) + (this.readSP() | 0) | 0;
        this.write8OffsetLowRegister(data | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.ADDSPimm7 = function() {
        if ((this.execute & 128) != 0) {
          this.writeSP((this.readSP() | 0) - ((this.execute & 127) << 2) | 0);
        } else {
          this.writeSP((this.readSP() | 0) + ((this.execute & 127) << 2) | 0);
        }
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.PUSH = function() {
        if ((this.execute & 255) > 0) {
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 7; (rListPosition | 0) > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.SPDecrementWord();
              this.memory.memoryWrite32(this.readSP() | 0, this.readLowRegister(rListPosition | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.PUSHlr = function() {
        this.wait.NonSequentialBroadcast();
        this.SPDecrementWord();
        this.memory.memoryWrite32(this.readSP() | 0, this.readLR() | 0);
        for (var rListPosition = 7; (rListPosition | 0) > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
          if ((this.execute & 1 << rListPosition) != 0) {
            this.SPDecrementWord();
            this.memory.memoryWrite32(this.readSP() | 0, this.readLowRegister(rListPosition | 0) | 0);
          }
        }
        this.wait.NonSequentialBroadcast();
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.POP = function() {
        if ((this.execute & 255) > 0) {
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; (rListPosition | 0) < 8; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.writeLowRegister(rListPosition | 0, this.memory.memoryRead32(this.readSP() | 0) | 0);
              this.SPIncrementWord();
            }
          }
          this.wait.NonSequentialBroadcast();
        }
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.POPpc = function() {
        this.wait.NonSequentialBroadcast();
        for (var rListPosition = 0; (rListPosition | 0) < 8; rListPosition = (rListPosition | 0) + 1 | 0) {
          if ((this.execute & 1 << rListPosition) != 0) {
            this.writeLowRegister(rListPosition | 0, this.memory.memoryRead32(this.readSP() | 0) | 0);
            this.SPIncrementWord();
          }
        }
        this.writePC(this.memory.memoryRead32(this.readSP() | 0) | 0);
        this.SPIncrementWord();
        this.wait.NonSequentialBroadcast();
      };
      THUMBInstructionSet.prototype.STMIA = function() {
        if ((this.execute & 255) > 0) {
          var currentAddress = this.read8OffsetLowRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; (rListPosition | 0) < 8; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.readLowRegister(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.write8OffsetLowRegister(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.LDMIA = function() {
        if ((this.execute & 255) > 0) {
          var currentAddress = this.read8OffsetLowRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; (rListPosition | 0) < 8; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.writeLowRegister(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.write8OffsetLowRegister(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.BEQ = function() {
        if ((this.branchFlags.getZero() | 0) == 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BNE = function() {
        if ((this.branchFlags.getZero() | 0) != 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BCS = function() {
        if ((this.branchFlags.getCarry() | 0) < 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BCC = function() {
        if ((this.branchFlags.getCarry() | 0) >= 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BMI = function() {
        if ((this.branchFlags.getNegative() | 0) < 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BPL = function() {
        if ((this.branchFlags.getNegative() | 0) >= 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BVS = function() {
        if ((this.branchFlags.getOverflow() | 0) < 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BVC = function() {
        if ((this.branchFlags.getOverflow() | 0) >= 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BHI = function() {
        if ((this.branchFlags.getCarry() | 0) < 0 && (this.branchFlags.getZero() | 0) != 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BLS = function() {
        if ((this.branchFlags.getCarry() | 0) < 0 && (this.branchFlags.getZero() | 0) != 0) {
          this.incrementProgramCounter();
        } else {
          this.offsetPC();
        }
      };
      THUMBInstructionSet.prototype.BGE = function() {
        if ((this.branchFlags.BGE() | 0) >= 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BLT = function() {
        if ((this.branchFlags.BGE() | 0) < 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BGT = function() {
        if ((this.branchFlags.getZero() | 0) != 0 && (this.branchFlags.BGE() | 0) >= 0) {
          this.offsetPC();
        } else {
          this.incrementProgramCounter();
        }
      };
      THUMBInstructionSet.prototype.BLE = function() {
        if ((this.branchFlags.getZero() | 0) != 0 && (this.branchFlags.BGE() | 0) >= 0) {
          this.incrementProgramCounter();
        } else {
          this.offsetPC();
        }
      };
      THUMBInstructionSet.prototype.SWI = function() {
        this.CPUCore.SWI();
      };
      THUMBInstructionSet.prototype.B = function() {
        this.CPUCore.branch((this.readPC() | 0) + (this.execute << 21 >> 20) | 0);
      };
      THUMBInstructionSet.prototype.BLsetup = function() {
        this.writeLR((this.readPC() | 0) + (this.execute << 21 >> 9) | 0);
        this.incrementProgramCounter();
      };
      THUMBInstructionSet.prototype.BLoff = function() {
        this.writeLR((this.readLR() | 0) + ((this.execute & 2047) << 1) | 0);
        var oldPC = this.readPC() | 0;
        this.CPUCore.branch(this.readLR() & -2);
        this.writeLR((oldPC | 0) - 2 | 1);
      };
      THUMBInstructionSet.prototype.UNDEFINED = function() {
        this.CPUCore.UNDEFINED();
      };
      function compileTHUMBInstructionDecodeMap() {
        var opcodeIndice = 0;
        var instructionMap = getUint8Array(1024);
        function generateLowMap(instruction) {
          for (var index = 0; index < 32; ++index) {
            instructionMap[opcodeIndice++] = instruction;
          }
        }
        function generateLowMap2(instruction) {
          for (var index = 0; index < 8; ++index) {
            instructionMap[opcodeIndice++] = instruction;
          }
        }
        function generateLowMap3(instruction) {
          for (var index = 0; index < 4; ++index) {
            instructionMap[opcodeIndice++] = instruction;
          }
        }
        function generateLowMap4(instruction1, instruction2, instruction3, instruction4) {
          instructionMap[opcodeIndice++] = instruction1;
          instructionMap[opcodeIndice++] = instruction2;
          instructionMap[opcodeIndice++] = instruction3;
          instructionMap[opcodeIndice++] = instruction4;
        }
        generateLowMap(6);
        generateLowMap(7);
        generateLowMap(30);
        generateLowMap2(12);
        generateLowMap2(18);
        generateLowMap2(11);
        generateLowMap2(60);
        generateLowMap(8);
        generateLowMap(0);
        generateLowMap(17);
        generateLowMap(42);
        generateLowMap4(4, 59, 55, 57);
        generateLowMap4(69, 71, 72, 43);
        generateLowMap4(48, 46, 9, 75);
        generateLowMap4(21, 31, 66, 68);
        generateLowMap4(82, 61, 27, 77);
        generateLowMap4(82, 58, 63, 78);
        generateLowMap4(82, 2, 16, 54);
        generateLowMap4(37, 49, 82, 82);
        generateLowMap(15);
        generateLowMap2(74);
        generateLowMap2(35);
        generateLowMap2(79);
        generateLowMap2(65);
        generateLowMap2(70);
        generateLowMap2(36);
        generateLowMap2(76);
        generateLowMap2(44);
        generateLowMap(20);
        generateLowMap(3);
        generateLowMap(45);
        generateLowMap(5);
        generateLowMap(28);
        generateLowMap(22);
        generateLowMap(13);
        generateLowMap(10);
        generateLowMap(64);
        generateLowMap(67);
        generateLowMap3(39);
        generateLowMap3(82);
        generateLowMap3(82);
        generateLowMap3(82);
        generateLowMap3(41);
        generateLowMap3(40);
        generateLowMap3(82);
        generateLowMap3(82);
        generateLowMap3(82);
        generateLowMap3(82);
        generateLowMap3(82);
        generateLowMap3(82);
        generateLowMap3(26);
        generateLowMap3(56);
        generateLowMap3(82);
        generateLowMap3(82);
        generateLowMap(50);
        generateLowMap(53);
        generateLowMap3(1);
        generateLowMap3(24);
        generateLowMap3(23);
        generateLowMap3(19);
        generateLowMap3(73);
        generateLowMap3(62);
        generateLowMap3(80);
        generateLowMap3(81);
        generateLowMap3(47);
        generateLowMap3(51);
        generateLowMap3(25);
        generateLowMap3(38);
        generateLowMap3(34);
        generateLowMap3(29);
        generateLowMap3(82);
        generateLowMap3(52);
        generateLowMap(14);
        generateLowMap(82);
        generateLowMap(32);
        generateLowMap(33);
        THUMBInstructionSet.prototype.instructionMap = instructionMap;
      }
      compileTHUMBInstructionDecodeMap();
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/CPU/ARMCPSRAttributeTable.js
  var require_ARMCPSRAttributeTable = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/CPU/ARMCPSRAttributeTable.js"(exports, module) {
      "use strict";
      module.exports = ARMCPSRAttributeTable;
      function ARMCPSRAttributeTable() {
        var negative = 0;
        var zero = 1;
        var carry = 0;
        var overflow = 0;
        function setNegative(toSet) {
          toSet = toSet | 0;
          negative = toSet | 0;
        }
        ;
        function setNegativeFalse() {
          negative = 0;
        }
        ;
        function getNegative() {
          return negative | 0;
        }
        ;
        function setZero(toSet) {
          toSet = toSet | 0;
          zero = toSet | 0;
        }
        ;
        function setZeroTrue() {
          zero = 0;
        }
        ;
        function setZeroFalse() {
          zero = 1;
        }
        ;
        function getZero() {
          return zero | 0;
        }
        ;
        function setOverflowTrue() {
          overflow = -1;
        }
        ;
        function setOverflowFalse() {
          overflow = 0;
        }
        ;
        function getOverflow() {
          return overflow | 0;
        }
        ;
        function setCarry(toSet) {
          toSet = toSet | 0;
          carry = toSet | 0;
        }
        ;
        function setCarryFalse() {
          carry = 0;
        }
        ;
        function getCarry() {
          return carry | 0;
        }
        ;
        function getCarryReverse() {
          return ~carry | 0;
        }
        ;
        function checkConditionalCode(execute) {
          execute = execute | 0;
          switch (execute >>> 29 | 0) {
            case 4:
              if ((zero | 0) == 0) {
                execute = -1;
                break;
              }
            case 1:
              execute = ~carry;
              break;
            case 2:
              execute = ~negative;
              break;
            case 3:
              execute = ~overflow;
              break;
            case 6:
              if ((zero | 0) == 0) {
                execute = -1;
                break;
              }
            case 5:
              execute = negative ^ overflow;
              break;
            case 0:
              if ((zero | 0) != 0) {
                execute = -1;
                break;
              }
            default:
              execute = 0;
          }
          return execute | 0;
        }
        ;
        function setNZInt(toSet) {
          toSet = toSet | 0;
          negative = toSet | 0;
          zero = toSet | 0;
        }
        ;
        function setNZCV(toSet) {
          toSet = toSet | 0;
          negative = toSet | 0;
          zero = ~toSet & 1073741824;
          carry = toSet << 2;
          overflow = toSet << 3;
        }
        ;
        function getNZCV() {
          var toSet = 0;
          toSet = negative & 2147483648;
          if ((zero | 0) == 0) {
            toSet = toSet | 1073741824;
          }
          toSet = toSet | carry >>> 31 << 29;
          toSet = toSet | overflow >>> 31 << 28;
          return toSet | 0;
        }
        ;
        function setADDFlags(operand1, operand2) {
          operand1 = operand1 | 0;
          operand2 = operand2 | 0;
          negative = (operand1 | 0) + (operand2 | 0) | 0;
          zero = negative | 0;
          if (negative >>> 0 < operand1 >>> 0) {
            carry = -1;
          } else {
            carry = 0;
          }
          overflow = ~(operand1 ^ operand2) & (operand1 ^ negative);
          return negative | 0;
        }
        ;
        function setADCFlags(operand1, operand2) {
          operand1 = operand1 | 0;
          operand2 = operand2 | 0;
          negative = (operand1 | 0) + (operand2 | 0) | 0;
          negative = (negative | 0) + (carry >>> 31) | 0;
          zero = negative | 0;
          if (negative >>> 0 < operand1 >>> 0) {
            carry = -1;
          } else if (negative >>> 0 > operand1 >>> 0) {
            carry = 0;
          }
          overflow = ~(operand1 ^ operand2) & (operand1 ^ negative);
          return negative | 0;
        }
        ;
        function setSUBFlags(operand1, operand2) {
          operand1 = operand1 | 0;
          operand2 = operand2 | 0;
          negative = (operand1 | 0) - (operand2 | 0) | 0;
          zero = negative | 0;
          if (operand1 >>> 0 >= operand2 >>> 0) {
            carry = -1;
          } else {
            carry = 0;
          }
          overflow = (operand1 ^ operand2) & (operand1 ^ negative);
          return negative | 0;
        }
        ;
        function setSBCFlags(operand1, operand2) {
          operand1 = operand1 | 0;
          operand2 = operand2 | 0;
          negative = (operand1 | 0) - (operand2 | 0) | 0;
          negative = (negative | 0) - (~carry >>> 31) | 0;
          zero = negative | 0;
          if (negative >>> 0 < operand1 >>> 0) {
            carry = -1;
          } else if (negative >>> 0 > operand1 >>> 0) {
            carry = 0;
          }
          overflow = (operand1 ^ operand2) & (operand1 ^ negative);
          return negative | 0;
        }
        ;
        function setCMPFlags(operand1, operand2) {
          operand1 = operand1 | 0;
          operand2 = operand2 | 0;
          negative = (operand1 | 0) - (operand2 | 0) | 0;
          zero = negative | 0;
          if (operand1 >>> 0 >= operand2 >>> 0) {
            carry = -1;
          } else {
            carry = 0;
          }
          overflow = (operand1 ^ operand2) & (operand1 ^ negative);
        }
        ;
        function setCMNFlags(operand1, operand2) {
          operand1 = operand1 | 0;
          operand2 = operand2 | 0;
          negative = (operand1 | 0) + (operand2 | 0) | 0;
          zero = negative | 0;
          if (negative >>> 0 < operand1 >>> 0) {
            carry = -1;
          } else {
            carry = 0;
          }
          overflow = ~(operand1 ^ operand2) & (operand1 ^ negative);
        }
        ;
        function BGE() {
          return negative ^ overflow | 0;
        }
        ;
        return {
          setNegative,
          setNegativeFalse,
          getNegative,
          setZero,
          setZeroTrue,
          setZeroFalse,
          getZero,
          setOverflowTrue,
          setOverflowFalse,
          getOverflow,
          setCarry,
          setCarryFalse,
          getCarry,
          getCarryReverse,
          checkConditionalCode,
          setNZInt,
          setNZCV,
          getNZCV,
          setADDFlags,
          setADCFlags,
          setSUBFlags,
          setSBCFlags,
          setCMPFlags,
          setCMNFlags,
          BGE
        };
      }
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/CPU/GameBoyAdvanceSWICore.js
  var require_GameBoyAdvanceSWICore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/CPU/GameBoyAdvanceSWICore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceSWI;
      function GameBoyAdvanceSWI(CPUCore) {
        this.CPUCore = CPUCore;
        this.IOCore = this.CPUCore.IOCore;
      }
      GameBoyAdvanceSWI.prototype.execute = function(command) {
        switch (command) {
          //Soft Reset:
          case 0:
            this.SoftReset();
            break;
          //Register Ram Reset:
          case 1:
            this.RegisterRAMReset();
            break;
          //Halt:
          case 2:
            this.Halt();
            break;
          //Stop:
          case 3:
            this.Stop();
            break;
          //Interrupt Wait:
          case 4:
            this.IntrWait();
            break;
          //VBlank Interrupt Wait:
          case 5:
            this.VBlankIntrWait();
            break;
          //Division:
          case 6:
            this.Div();
            break;
          //Division (Reversed Parameters):
          case 7:
            this.DivArm();
            break;
          //Square Root:
          case 8:
            this.Sqrt();
            break;
          //Arc Tangent:
          case 9:
            this.ArcTan();
            break;
          //Arc Tangent Corrected:
          case 10:
            this.ArcTan2();
            break;
          //CPU Set (Memory Copy + Fill):
          case 11:
            this.CpuSet();
            break;
          //CPU Fast Set (Memory Copy + Fill):
          case 12:
            this.CpuFastSet();
            break;
          //Calculate BIOS Checksum:
          case 13:
            this.GetBiosChecksum();
            break;
          //Calculate BG Rotation/Scaling Parameters:
          case 14:
            this.BgAffineSet();
            break;
          //Calculate OBJ Rotation/Scaling Parameters:
          case 15:
            this.ObjAffineSet();
            break;
          //Bit Unpack Tile Data:
          case 16:
            this.BitUnPack();
            break;
          //Uncompress LZ77 Compressed Data (WRAM):
          case 17:
            this.LZ77UnCompWram();
            break;
          //Uncompress LZ77 Compressed Data (VRAM):
          case 18:
            this.LZ77UnCompVram();
            break;
          //Uncompress Huffman Compressed Data:
          case 19:
            this.HuffUnComp();
            break;
          //Uncompress Run-Length Compressed Data (WRAM):
          case 20:
            this.RLUnCompWram();
            break;
          //Uncompress Run-Length Compressed Data (VRAM):
          case 21:
            this.RLUnCompVram();
            break;
          //Filter Out Difference In Data (8-bit/WRAM):
          case 22:
            this.Diff8bitUnFilterWram();
            break;
          //Filter Out Difference In Data (8-bit/VRAM):
          case 23:
            this.Diff8bitUnFilterVram();
            break;
          //Filter Out Difference In Data (16-bit):
          case 24:
            this.Diff16bitUnFilter();
            break;
          //Update Sound Bias:
          case 25:
            this.SoundBias();
            break;
          //Sound Driver Initialization:
          case 26:
            this.SoundDriverInit();
            break;
          //Set Sound Driver Mode:
          case 27:
            this.SoundDriverMode();
            break;
          //Call Sound Driver Main:
          case 28:
            this.SoundDriverMain();
            break;
          //Call Sound Driver VSync Iteration Handler:
          case 29:
            this.SoundDriverVSync();
            break;
          //Clear Direct Sound And Stop Audio:
          case 30:
            this.SoundChannelClear();
            break;
          //Convert MIDI To Frequency:
          case 31:
            this.MidiKey2Freq();
            break;
          //Unknown Sound Driver Functions:
          case 32:
          case 33:
          case 34:
          case 35:
          case 36:
            this.SoundDriverUnknown();
            break;
          //Multi-Boot:
          case 37:
            this.MultiBoot();
            break;
          //Hard Reset:
          case 38:
            this.HardReset();
            break;
          //Custom Halt:
          case 39:
            this.CustomHalt();
            break;
          //Call Sound Driver VSync Stop Handler:
          case 40:
            this.SoundDriverVSyncOff();
            break;
          //Call Sound Driver VSync Start Handler:
          case 41:
            this.SoundDriverVSyncOn();
            break;
          //Obtain 36 Sound Driver Pointers:
          case 42:
            this.SoundGetJumpList();
            break;
          //Undefined:
          default:
        }
      };
      GameBoyAdvanceSWI.prototype.SoftReset = function() {
      };
      GameBoyAdvanceSWI.prototype.RegisterRAMReset = function() {
        var control = this.CPUCore.registers[0];
        if ((control & 1) == 1) {
          for (var address = 33554432; address < 33816576; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
        }
        if ((control & 2) == 2) {
          for (var address = 50331648; address < 50364416; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
        }
        if ((control & 4) == 4) {
          for (var address = 83886080; address < 83887104; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
        }
        if ((control & 8) == 8) {
          for (var address = 100663296; address < 100761600; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
        }
        if ((control & 16) == 16) {
          for (var address = 117440512; address < 117441536; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
        }
        if ((control & 32) == 32) {
          for (var address = 67109152; address < 67109168; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
        }
        if ((control & 64) == 64) {
          for (var address = 67108960; address < 67109032; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
        }
        if ((control & 128) == 128) {
          for (var address = 67108864; address < 67108960; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
          for (var address = 67109120; address < 67109152; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
          for (var address = 67109168; address < 67109632; address += 4) {
            this.IOCore.memory.memoryWrite32(address | 0, 0);
          }
        }
      };
      GameBoyAdvanceSWI.prototype.Halt = function() {
        this.IOCore.flagHalt();
      };
      GameBoyAdvanceSWI.prototype.Stop = function() {
        this.IOCore.flagStop();
      };
      GameBoyAdvanceSWI.prototype.IntrWait = function() {
        // Real BIOS IntrWait does NOT overwrite IE.  It halts, and when
        // any enabled interrupt fires it checks whether the requested
        // flags (r1) appeared in IF.  Overwriting IE destroyed the
        // game's interrupt configuration.  Keep IE intact; just halt.
        this.IOCore.irq.IME = true;
        if ((this.CPUCore.registers[0] & 1) == 1) {
          // "Discard old flags" — clear the requested bits in IF
          this.IOCore.irq.interruptsRequested &= ~(this.CPUCore.registers[1] & 16383);
        }
        this.Halt();
      };
      GameBoyAdvanceSWI.prototype.VBlankIntrWait = function() {
        // Equivalent to IntrWait(1, 1) — wait for VBlank.
        // Do NOT overwrite IE; just clear VBlank bit from IF and halt.
        this.IOCore.irq.IME = true;
        this.IOCore.irq.interruptsRequested &= ~1;
        this.Halt();
      };
      GameBoyAdvanceSWI.prototype.Div = function() {
        var numerator = this.CPUCore.registers[0] | 0;
        var denominator = this.CPUCore.registers[1] | 0;
        if ((denominator | 0) == 0) {
          throw new Error("Division by 0 called.");
        }
        var result = (numerator | 0) / (denominator | 0) | 0;
        this.CPUCore.registers[0] = result | 0;
        this.CPUCore.registers[1] = (numerator | 0) % (denominator | 0) | 0;
        this.CPUCore.registers[3] = Math.abs(result | 0) | 0;
      };
      GameBoyAdvanceSWI.prototype.DivArm = function() {
        var numerator = this.CPUCore.registers[1] | 0;
        var denominator = this.CPUCore.registers[0] | 0;
        if ((denominator | 0) == 0) {
          throw new Error("Division by 0 called.");
        }
        var result = (numerator | 0) / (denominator | 0) | 0;
        this.CPUCore.registers[0] = result | 0;
        this.CPUCore.registers[1] = (numerator | 0) % (denominator | 0) | 0;
        this.CPUCore.registers[3] = Math.abs(result | 0) | 0;
      };
      GameBoyAdvanceSWI.prototype.Sqrt = function() {
        this.CPUCore.registers[0] = Math.sqrt(this.CPUCore.registers[0] | 0) | 0;
      };
      GameBoyAdvanceSWI.prototype.ArcTan = function() {
        this.CPUCore.registers[0] = Math.max(Math.min(Math.atan((this.CPUCore.registers[0] << 16 >> 16) / 16384) * (8192 * Math.PI), 16384), -16384) | 0;
      };
      GameBoyAdvanceSWI.prototype.ArcTan2 = function() {
        var x = this.CPUCore.registers[0];
        var y = this.CPUCore.registers[1];
        var result = 0;
        if (y == 0) {
          result = x >> 16 & 32768;
        } else {
          if (x == 0) {
            result = (y >> 16 & 32768) + 16384;
          } else {
            if (Math.abs(x) > Math.abs(y) || Math.abs(x) == Math.abs(y) && (x >= 0 || y >= 0)) {
              this.CPUCore.registers[1] = x;
              this.CPUCore.registers[0] = y << 14;
              this.Div();
              this.ArcTan();
              if (x < 0) {
                result = 32768 + this.CPUCore.registers[0];
              } else {
                result = ((y >> 16 & 32768) << 1) + this.CPUCore.registers[0];
              }
            } else {
              this.CPUCore.registers[0] = x << 14;
              this.Div();
              this.ArcTan();
              result = 16384 + (y >> 16 & 32768) - this.CPUCore.registers[0];
            }
          }
        }
        this.CPUCore.registers[0] = result | 0;
      };
      GameBoyAdvanceSWI.prototype.CpuSet = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var control = this.CPUCore.registers[2];
        var count = control & 2097151;
        var isFixed = (control & 16777216) != 0;
        var is32 = (control & 67108864) != 0;
        if (is32) {
          while (count-- > 0) {
            if (source >= 16384 && destination >= 16384) {
              this.IOCore.memory.memoryWrite32(destination | 0, this.IOCore.memory.memoryRead32(source | 0) | 0);
            }
            if (!isFixed) {
              source += 4;
            }
            destination += 4;
          }
        } else {
          while (count-- > 0) {
            if (source >= 16384 && destination >= 16384) {
              this.IOCore.memory.memoryWrite16(destination | 0, this.IOCore.memory.memoryRead16(source | 0) | 0);
            }
            if (!isFixed) {
              source += 2;
            }
            destination += 2;
          }
        }
      };
      GameBoyAdvanceSWI.prototype.CpuFastSet = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var control = this.CPUCore.registers[2];
        var count = control & 2097151;
        var isFixed = (control & 16777216) != 0;
        var currentRead = 0;
        while (count-- > 0) {
          if (source >= 16384) {
            currentRead = this.IOCore.memory.memoryRead32(source | 0) | 0;
            for (var i = 0; i < 8; ++i) {
              if (destination >= 16384) {
                this.IOCore.memory.memoryWrite32(destination | 0, currentRead | 0);
              }
              destination += 4;
            }
          }
          if (!isFixed) {
            source += 4;
          }
        }
      };
      GameBoyAdvanceSWI.prototype.GetBiosChecksum = function() {
        this.CPUCore.registers[0] = 3131971711;
      };
      GameBoyAdvanceSWI.prototype.BgAffineSet = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var numberCalculations = this.CPUCore.registers[2];
        while (numberCalculations-- > 0) {
          var cx = this.IOCore.memory.memoryRead32(source | 0);
          source += 4;
          var cy = this.IOCore.memory.memoryRead32(source | 0);
          source += 4;
          var dispx = this.IOCore.memory.memoryRead16(source | 0) << 16 >> 16;
          source += 2;
          var dispy = this.IOCore.memory.memoryRead16(source | 0) << 16 >> 16;
          source += 2;
          var rx = this.IOCore.memory.memoryRead16(source | 0) << 16 >> 16;
          source += 2;
          var ry = this.IOCore.memory.memoryRead16(source | 0) << 16 >> 16;
          source += 2;
          var theta = (this.IOCore.memory.memoryRead16(source | 0) >> 8) / 128 * Math.PI;
          source += 4;
          var cosAngle = Math.cos(theta);
          var sineAngle = Math.sin(theta);
          var dx = rx * cosAngle;
          var dmx = rx * sineAngle;
          var dy = ry * sineAngle;
          var dmy = ry * cosAngle;
          this.IOCore.memory.memoryWrite16(destination | 0, dx | 0);
          destination += 2;
          this.IOCore.memory.memoryWrite16(destination | 0, -dmx | 0);
          destination += 2;
          this.IOCore.memory.memoryWrite16(destination | 0, dy | 0);
          destination += 2;
          this.IOCore.memory.memoryWrite16(destination | 0, dmy | 0);
          destination += 2;
          this.IOCore.memory.memoryWrite32(destination | 0, cx - dx * dispx + dmx * dispy | 0);
          destination += 4;
          this.IOCore.memory.memoryWrite32(destination | 0, cy - dy * dispx + dmy * dispy | 0);
          destination += 4;
        }
      };
      GameBoyAdvanceSWI.prototype.ObjAffineSet = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var numberCalculations = this.CPUCore.registers[2];
        var offset = this.CPUCore.registers[3];
        while (numberCalculations-- > 0) {
          var rx = this.IOCore.memory.memoryRead16(source | 0) << 16 >> 16;
          source += 2;
          var ry = this.IOCore.memory.memoryRead16(source | 0) << 16 >> 16;
          source += 2;
          var theta = (this.IOCore.memory.memoryRead16(source | 0) >> 8) / 128 * Math.PI;
          source += 4;
          var cosAngle = Math.cos(theta);
          var sineAngle = Math.sin(theta);
          var dx = rx * cosAngle;
          var dmx = rx * sineAngle;
          var dy = ry * sineAngle;
          var dmy = ry * cosAngle;
          this.IOCore.memory.memoryWrite16(destination | 0, dx | 0);
          destination += offset;
          this.IOCore.memory.memoryWrite16(destination | 0, -dmx | 0);
          destination += offset;
          this.IOCore.memory.memoryWrite16(destination | 0, dy | 0);
          destination += offset;
          this.IOCore.memory.memoryWrite16(destination | 0, dmy | 0);
          destination += offset;
        }
      };
      GameBoyAdvanceSWI.prototype.BitUnPack = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var unpackSource = this.CPUCore.registers[2];
        var length = this.IOCore.memory.memoryRead16(unpackSource | 0);
        unpackSource += 2;
        var widthSource = this.IOCore.memory.memoryRead16(unpackSource | 0);
        unpackSource += 1;
        var widthDestination = this.IOCore.memory.memoryRead8(unpackSource | 0);
        unpackSource += 1;
        var offset = this.IOCore.memory.memoryRead32(unpackSource | 0);
        var dataOffset = offset & 2147483647;
        var zeroData = offset < 0;
        var bitDiff = widthDestination - widthSource;
        if (bitDiff >= 0) {
          var resultWidth = 0;
          while (length > 0) {
            var result = 0;
            var readByte = this.IOCore.memory.memoryRead8(source++ | 0);
            for (var index = 0, widthIndex = 0; index < 8; index += widthSource, widthIndex += widthDestination) {
              var temp = readByte >> index & (widthSource << 1) - 1;
              if (temp > 0 || zeroData) {
                temp += dataOffset;
              }
              temp <<= widthIndex;
              result |= temp;
            }
            resultWidth += widthIndex;
            if (resultWidth == 32) {
              resultWidth = 0;
              this.IOCore.memory.memoryWrite32(destination | 0, result | 0);
              destination += 4;
              length -= 4;
            }
          }
          if (resultWidth > 0) {
            this.IOCore.memory.memoryWrite32(destination | 0, result | 0);
          }
        }
      };
      // ----- LZ77 decompression (SWI 0x11 / 0x12) -----
      // GBA LZ77 format: 4-byte header (type<<4 | decompSize in bits 8..31)
      // then a stream of flag bytes, each controlling 8 blocks.
      GameBoyAdvanceSWI.prototype.LZ77UnCompWram = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var header = this.IOCore.memory.memoryRead32(source | 0) | 0;
        var decompressedSize = header >>> 8;
        source += 4;
        var written = 0;
        while (written < decompressedSize) {
          var flags = this.IOCore.memory.memoryRead8(source | 0) | 0;
          source += 1;
          for (var i = 7; i >= 0 && written < decompressedSize; i--) {
            if ((flags >> i) & 1) {
              // Compressed block
              var byte1 = this.IOCore.memory.memoryRead8(source | 0) | 0;
              var byte2 = this.IOCore.memory.memoryRead8((source + 1) | 0) | 0;
              source += 2;
              var length = ((byte1 >> 4) & 0xF) + 3;
              var offset = ((byte1 & 0xF) << 8 | byte2) + 1;
              for (var j = 0; j < length && written < decompressedSize; j++) {
                var val = this.IOCore.memory.memoryRead8((destination + written - offset) | 0) | 0;
                this.IOCore.memory.memoryWrite8((destination + written) | 0, val | 0);
                written++;
              }
            } else {
              // Uncompressed byte
              var val = this.IOCore.memory.memoryRead8(source | 0) | 0;
              source += 1;
              this.IOCore.memory.memoryWrite8((destination + written) | 0, val | 0);
              written++;
            }
          }
        }
      };
      GameBoyAdvanceSWI.prototype.LZ77UnCompVram = function() {
        // Same algorithm but writes in 16-bit units for VRAM safety.
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var header = this.IOCore.memory.memoryRead32(source | 0) | 0;
        var decompressedSize = header >>> 8;
        source += 4;
        var written = 0;
        // Decompress into a temporary byte buffer
        var buffer = new Uint8Array(decompressedSize);
        while (written < decompressedSize) {
          var flags = this.IOCore.memory.memoryRead8(source | 0) | 0;
          source += 1;
          for (var i = 7; i >= 0 && written < decompressedSize; i--) {
            if ((flags >> i) & 1) {
              var byte1 = this.IOCore.memory.memoryRead8(source | 0) | 0;
              var byte2 = this.IOCore.memory.memoryRead8((source + 1) | 0) | 0;
              source += 2;
              var length = ((byte1 >> 4) & 0xF) + 3;
              var offset = ((byte1 & 0xF) << 8 | byte2) + 1;
              for (var j = 0; j < length && written < decompressedSize; j++) {
                buffer[written] = buffer[written - offset];
                written++;
              }
            } else {
              buffer[written] = this.IOCore.memory.memoryRead8(source | 0) | 0;
              source += 1;
              written++;
            }
          }
        }
        // Write to VRAM in 16-bit units
        for (var k = 0; k < decompressedSize; k += 2) {
          var hw = buffer[k] | (buffer[k + 1] << 8);
          this.IOCore.memory.memoryWrite16((destination + k) | 0, hw | 0);
        }
      };
      // ----- Huffman decompression (SWI 0x13) -----
      GameBoyAdvanceSWI.prototype.HuffUnComp = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var header = this.IOCore.memory.memoryRead32(source | 0) | 0;
        var bitSize = header & 0xF;
        var decompressedSize = header >>> 8;
        source += 4;
        var treeSize = ((this.IOCore.memory.memoryRead8(source | 0) | 0) + 1) * 2;
        var treeStart = source + 1;
        source += treeSize;
        var written = 0;
        var word = 0;
        var bitsInWord = 0;
        var currentBit = 0;
        var srcWord = 0;
        var bitsLeft = 0;
        while (written < decompressedSize) {
          // Read next 32-bit src word when needed
          if (bitsLeft == 0) {
            srcWord = this.IOCore.memory.memoryRead32(source | 0) | 0;
            source += 4;
            bitsLeft = 32;
          }
          // Traverse tree from root
          var nodeOffset = 0;
          var nodeAddr = treeStart;
          while (true) {
            if (bitsLeft == 0) {
              srcWord = this.IOCore.memory.memoryRead32(source | 0) | 0;
              source += 4;
              bitsLeft = 32;
            }
            var bit = (srcWord >>> 31) & 1;
            srcWord <<= 1;
            bitsLeft--;
            var node = this.IOCore.memory.memoryRead8(nodeAddr | 0) | 0;
            var next = ((node & 0x3F) + 1) * 2 + (nodeAddr & ~1);
            nodeAddr = next + bit;
            var isLeaf = (node >> (6 + bit)) & 1;
            if (isLeaf) {
              var val = this.IOCore.memory.memoryRead8(nodeAddr | 0) | 0;
              word |= val << currentBit;
              currentBit += bitSize;
              if (currentBit >= 32) {
                this.IOCore.memory.memoryWrite32((destination + written) | 0, word | 0);
                written += 4;
                word = 0;
                currentBit = 0;
              }
              break;
            }
          }
        }
      };
      // ----- Run-Length decompression (SWI 0x14 / 0x15) -----
      GameBoyAdvanceSWI.prototype.RLUnCompWram = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var header = this.IOCore.memory.memoryRead32(source | 0) | 0;
        var decompressedSize = header >>> 8;
        source += 4;
        var written = 0;
        while (written < decompressedSize) {
          var flag = this.IOCore.memory.memoryRead8(source | 0) | 0;
          source += 1;
          if ((flag & 0x80) != 0) {
            // Compressed run
            var length = (flag & 0x7F) + 3;
            var data = this.IOCore.memory.memoryRead8(source | 0) | 0;
            source += 1;
            for (var i = 0; i < length && written < decompressedSize; i++) {
              this.IOCore.memory.memoryWrite8((destination + written) | 0, data | 0);
              written++;
            }
          } else {
            // Uncompressed run
            var length = (flag & 0x7F) + 1;
            for (var i = 0; i < length && written < decompressedSize; i++) {
              var data = this.IOCore.memory.memoryRead8(source | 0) | 0;
              source += 1;
              this.IOCore.memory.memoryWrite8((destination + written) | 0, data | 0);
              written++;
            }
          }
        }
      };
      GameBoyAdvanceSWI.prototype.RLUnCompVram = function() {
        var source = this.CPUCore.registers[0];
        var destination = this.CPUCore.registers[1];
        var header = this.IOCore.memory.memoryRead32(source | 0) | 0;
        var decompressedSize = header >>> 8;
        source += 4;
        var written = 0;
        var buffer = new Uint8Array(decompressedSize);
        while (written < decompressedSize) {
          var flag = this.IOCore.memory.memoryRead8(source | 0) | 0;
          source += 1;
          if ((flag & 0x80) != 0) {
            var length = (flag & 0x7F) + 3;
            var data = this.IOCore.memory.memoryRead8(source | 0) | 0;
            source += 1;
            for (var i = 0; i < length && written < decompressedSize; i++) {
              buffer[written++] = data;
            }
          } else {
            var length = (flag & 0x7F) + 1;
            for (var i = 0; i < length && written < decompressedSize; i++) {
              buffer[written++] = this.IOCore.memory.memoryRead8(source | 0) | 0;
              source += 1;
            }
          }
        }
        for (var k = 0; k < decompressedSize; k += 2) {
          var hw = buffer[k] | (buffer[k + 1] << 8);
          this.IOCore.memory.memoryWrite16((destination + k) | 0, hw | 0);
        }
      };
      GameBoyAdvanceSWI.prototype.Diff8bitUnFilterWram = function() {
        var source = this.CPUCore.registers[0] & -4;
        var destination = this.CPUCore.registers[1] | 0;
        var descriptor = this.IOCore.memory.memoryRead32(source | 0) | 0;
        var output = this.IOCore.memory.memoryRead8(destination | 0) | 0;
        var wordSize = descriptor & 3;
        for (var size = descriptor >>> 8; (size | 0) > 0; size = (size | 0) - (wordSize | 0) | 0) {
          source = (source | 0) + (wordSize | 0) | 0;
          var data = this.IOCore.memory.memoryRead8(source | 0) | 0;
          output = (data & 255) + (output & 255) & 255;
          destination = (destination | 0) + (wordSize | 0) | 0;
          this.IOCore.memory.memoryWrite8(destination | 0, output | 0);
        }
      };
      GameBoyAdvanceSWI.prototype.Diff8bitUnFilterVram = function() {
        var source = this.CPUCore.registers[0] & -4;
        var destination = this.CPUCore.registers[1] | 0;
        var descriptor = this.IOCore.memory.memoryRead32(source | 0) | 0;
        var output = this.IOCore.memory.memoryRead8(destination | 0) | 0;
        var wordSize = descriptor & 3;
        for (var size = descriptor >>> 8; (size | 0) > 0; size = (size | 0) - (wordSize | 0) | 0) {
          source = (source | 0) + (wordSize | 0) | 0;
          var data = this.IOCore.memory.memoryRead8(source | 0) | 0;
          output = (data & 255) + (output & 255) & 255;
          destination = (destination | 0) + (wordSize | 0) | 0;
          var output2 = output | 0;
          output = (data & 255) + (output & 255) & 255;
          destination = (destination | 0) + (wordSize | 0) | 0;
          output2 = output2 | output << 8;
          this.IOCore.memory.memoryWrite16(destination | 0, output2 | 0);
        }
      };
      GameBoyAdvanceSWI.prototype.Diff16bitUnFilter = function() {
        var source = this.CPUCore.registers[0] & -4;
        var destination = this.CPUCore.registers[1] | 0;
        var descriptor = this.IOCore.memory.memoryRead32(source | 0) | 0;
        var output = this.IOCore.memory.memoryRead16(destination | 0) | 0;
        var wordSize = descriptor & 3;
        for (var size = descriptor >>> 8; (size | 0) > 0; size = (size | 0) - (wordSize | 0) | 0) {
          source = (source | 0) + (wordSize | 0) | 0;
          var data = this.IOCore.memory.memoryRead16(source | 0) | 0;
          output = (data & 65535) + (output & 65535) & 65535;
          destination = (destination | 0) + (wordSize | 0) | 0;
          this.IOCore.memory.memoryWrite16(destination | 0, output | 0);
        }
      };
      GameBoyAdvanceSWI.prototype.SoundBias = function() {
        if (this.CPUCore.registers[0] == 0) {
          this.IOCore.memory.memoryWrite16(67109e3, 0);
        } else {
          this.IOCore.memory.memoryWrite16(67109e3, 512);
        }
      };
      GameBoyAdvanceSWI.prototype.SoundDriverInit = function() {
      };
      GameBoyAdvanceSWI.prototype.SoundDriverMode = function() {
      };
      GameBoyAdvanceSWI.prototype.SoundDriverMain = function() {
      };
      GameBoyAdvanceSWI.prototype.SoundDriverVSync = function() {
      };
      GameBoyAdvanceSWI.prototype.SoundChannelClear = function() {
      };
      GameBoyAdvanceSWI.prototype.MidiKey2Freq = function() {
        var frequency = this.CPUCore.memoryRead32(this.CPUCore.registers[0] + 4 | 0);
        var temp = 180 - this.CPUCore.registers[1] - this.CPUCore.registers[2] / 256;
        temp = Math.pow(2, temp / 12);
        this.CPUCore.registers[0] = frequency / temp | 0;
      };
      GameBoyAdvanceSWI.prototype.SoundDriverUnknown = function() {
      };
      GameBoyAdvanceSWI.prototype.MultiBoot = function() {
      };
      GameBoyAdvanceSWI.prototype.HardReset = function() {
      };
      GameBoyAdvanceSWI.prototype.CustomHalt = function() {
        this.IOCore.wait.writeHALTCNT(this.CPUCore.registers[2]);
      };
      GameBoyAdvanceSWI.prototype.SoundDriverVSyncOff = function() {
      };
      GameBoyAdvanceSWI.prototype.SoundDriverVSyncOn = function() {
      };
      GameBoyAdvanceSWI.prototype.SoundGetJumpList = function() {
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/CPU/ARMInstructionSetCore.js
  var require_ARMInstructionSetCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/CPU/ARMInstructionSetCore.js"(exports, module) {
      "use strict";
      module.exports = ARMInstructionSet;
      var getUint8Array = require_TypedArrayShim().getUint8Array;
      function ARMInstructionSet(CPUCore) {
        this.CPUCore = CPUCore;
        this.initialize();
      }
      ARMInstructionSet.prototype.initialize = function() {
        this.wait = this.CPUCore.wait;
        this.registers = this.CPUCore.registers;
        this.registersUSR = this.CPUCore.registersUSR;
        this.branchFlags = this.CPUCore.branchFlags;
        this.fetch = 0;
        this.decode = 0;
        this.execute = 0;
        this.memory = this.CPUCore.memory;
      };
      ARMInstructionSet.prototype.executeIteration = function() {
        this.fetch = this.memory.memoryReadCPU32(this.readPC() | 0) | 0;
        this.executeConditionalCode();
        this.execute = this.decode | 0;
        this.decode = this.fetch | 0;
      };
      ARMInstructionSet.prototype.executeConditionalCode = function() {
        if ((this.execute << 3 ^ this.branchFlags.checkConditionalCode(this.execute | 0)) >= 0) {
          this.executeDecoded();
        } else {
          this.incrementProgramCounter();
        }
      };
      ARMInstructionSet.prototype.executeBubble = function() {
        this.fetch = this.memory.memoryReadCPU32(this.readPC() | 0) | 0;
        this.incrementProgramCounter();
        this.execute = this.decode | 0;
        this.decode = this.fetch | 0;
      };
      ARMInstructionSet.prototype.incrementProgramCounter = function() {
        this.registers[15] = (this.registers[15] | 0) + 4 | 0;
      };
      ARMInstructionSet.prototype.getLR = function() {
        return (this.readPC() | 0) - 4 | 0;
      };
      ARMInstructionSet.prototype.getIRQLR = function() {
        return this.getLR() | 0;
      };
      ARMInstructionSet.prototype.getCurrentFetchValue = function() {
        return this.fetch | 0;
      };
      ARMInstructionSet.prototype.getSWICode = function() {
        return this.execute >> 16 & 255;
      };
      ARMInstructionSet.prototype.writeRegister = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.registers[address & 15] = data | 0;
      };
      ARMInstructionSet.prototype.writeUserRegister = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.registersUSR[address & 7] = data | 0;
      };
      ARMInstructionSet.prototype.guardRegisterWrite = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((address | 0) < 15) {
          this.writeRegister(address | 0, data | 0);
        } else {
          this.CPUCore.branch(data & -4);
        }
      };
      ARMInstructionSet.prototype.multiplyGuard12OffsetRegisterWrite = function(data) {
        data = data | 0;
        var address = this.execute >> 12 & 15;
        if ((address | 0) != 15) {
          this.writeRegister(address | 0, data | 0);
        }
      };
      ARMInstructionSet.prototype.multiplyGuard16OffsetRegisterWrite = function(data) {
        data = data | 0;
        var address = this.execute >> 16 & 15;
        this.incrementProgramCounter();
        if ((address | 0) != 15) {
          this.writeRegister(address | 0, data | 0);
        }
      };
      ARMInstructionSet.prototype.performMUL32 = function() {
        var result = 0;
        if ((this.execute >> 16 & 15) != (this.execute & 15)) {
          result = this.CPUCore.performMUL32(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0) | 0;
        }
        return result | 0;
      };
      ARMInstructionSet.prototype.performMUL32MLA = function() {
        var result = 0;
        if ((this.execute >> 16 & 15) != (this.execute & 15)) {
          result = this.CPUCore.performMUL32MLA(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0) | 0;
        }
        return result | 0;
      };
      ARMInstructionSet.prototype.guard12OffsetRegisterWrite = function(data) {
        data = data | 0;
        this.incrementProgramCounter();
        this.guard12OffsetRegisterWrite2(data | 0);
      };
      ARMInstructionSet.prototype.guard12OffsetRegisterWrite2 = function(data) {
        data = data | 0;
        this.guardRegisterWrite(this.execute >> 12 & 15, data | 0);
      };
      ARMInstructionSet.prototype.guard16OffsetRegisterWrite = function(data) {
        data = data | 0;
        this.guardRegisterWrite(this.execute >> 16 & 15, data | 0);
      };
      ARMInstructionSet.prototype.guardProgramCounterRegisterWriteCPSR = function(data) {
        data = data | 0;
        data = data & -4 >> (this.CPUCore.SPSRtoCPSR() >> 5);
        this.CPUCore.branch(data | 0);
      };
      ARMInstructionSet.prototype.guardRegisterWriteCPSR = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((address | 0) < 15) {
          this.writeRegister(address | 0, data | 0);
        } else {
          this.guardProgramCounterRegisterWriteCPSR(data | 0);
        }
      };
      ARMInstructionSet.prototype.guard12OffsetRegisterWriteCPSR = function(data) {
        data = data | 0;
        this.incrementProgramCounter();
        this.guard12OffsetRegisterWriteCPSR2(data | 0);
      };
      ARMInstructionSet.prototype.guard12OffsetRegisterWriteCPSR2 = function(data) {
        data = data | 0;
        this.guardRegisterWriteCPSR(this.execute >> 12 & 15, data | 0);
      };
      ARMInstructionSet.prototype.guard16OffsetRegisterWriteCPSR = function(data) {
        data = data | 0;
        this.guardRegisterWriteCPSR(this.execute >> 16 & 15, data | 0);
      };
      ARMInstructionSet.prototype.guardUserRegisterWrite = function(address, data) {
        address = address | 0;
        data = data | 0;
        switch (this.CPUCore.modeFlags & 31) {
          case 16:
          case 31:
            this.writeRegister(address | 0, data | 0);
            break;
          case 17:
            if ((address | 0) < 8) {
              this.writeRegister(address | 0, data | 0);
            } else {
              this.writeUserRegister(address | 0, data | 0);
            }
            break;
          default:
            if ((address | 0) < 13) {
              this.writeRegister(address | 0, data | 0);
            } else {
              this.writeUserRegister(address | 0, data | 0);
            }
        }
      };
      ARMInstructionSet.prototype.guardRegisterWriteLDM = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.guardRegisterWrite(address | 0, data | 0);
      };
      ARMInstructionSet.prototype.guardUserRegisterWriteLDM = function(address, data) {
        address = address | 0;
        data = data | 0;
        if ((address | 0) < 15) {
          if ((this.execute & 32768) == 32768) {
            this.guardRegisterWrite(address | 0, data | 0);
          } else {
            this.guardUserRegisterWrite(address | 0, data | 0);
          }
        } else {
          this.guardProgramCounterRegisterWriteCPSR(data | 0);
        }
      };
      ARMInstructionSet.prototype.baseRegisterWrite = function(data, userMode) {
        data = data | 0;
        userMode = userMode | 0;
        var address = this.execute >> 16 & 15;
        if ((address | userMode) == 15) {
          this.guardRegisterWrite(address | 0, data | 0);
        } else {
          this.guardUserRegisterWrite(address | 0, data | 0);
        }
      };
      ARMInstructionSet.prototype.readPC = function() {
        return this.registers[15] | 0;
      };
      ARMInstructionSet.prototype.readRegister = function(address) {
        address = address | 0;
        return this.registers[address & 15] | 0;
      };
      ARMInstructionSet.prototype.readUserRegister = function(address) {
        address = address | 0;
        return this.registersUSR[address & 7] | 0;
      };
      ARMInstructionSet.prototype.read0OffsetRegister = function() {
        return this.readRegister(this.execute | 0) | 0;
      };
      ARMInstructionSet.prototype.read8OffsetRegister = function() {
        return this.readRegister(this.execute >> 8) | 0;
      };
      ARMInstructionSet.prototype.read12OffsetRegister = function() {
        return this.readRegister(this.execute >> 12) | 0;
      };
      ARMInstructionSet.prototype.read16OffsetRegister = function() {
        return this.readRegister(this.execute >> 16) | 0;
      };
      ARMInstructionSet.prototype.guard12OffsetRegisterRead = function() {
        this.incrementProgramCounter();
        return this.readRegister(this.execute >> 12 & 15) | 0;
      };
      ARMInstructionSet.prototype.guardUserRegisterRead = function(address) {
        address = address | 0;
        switch (this.CPUCore.modeFlags & 31) {
          case 16:
          case 31:
            return this.readRegister(address | 0) | 0;
          case 17:
            if ((address | 0) < 8) {
              return this.readRegister(address | 0) | 0;
            } else {
              return this.readUserRegister(address | 0) | 0;
            }
            break;
          default:
            if ((address | 0) < 13) {
              return this.readRegister(address | 0) | 0;
            } else {
              return this.readUserRegister(address | 0) | 0;
            }
        }
      };
      ARMInstructionSet.prototype.guardUserRegisterReadSTM = function(address) {
        address = address | 0;
        if ((address | 0) < 15) {
          return this.guardUserRegisterRead(address | 0) | 0;
        } else {
          return this.readPC() | 0;
        }
      };
      ARMInstructionSet.prototype.baseRegisterRead = function(userMode) {
        userMode = userMode | 0;
        var address = this.execute >> 16 & 15;
        if ((address | userMode) == 15) {
          return this.readRegister(address | 0) | 0;
        } else {
          return this.guardUserRegisterRead(address | 0) | 0;
        }
      };
      ARMInstructionSet.prototype.BX = function() {
        var address = this.read0OffsetRegister() | 0;
        if ((address & 1) == 0) {
          this.CPUCore.branch(address & -4);
        } else {
          this.CPUCore.enterTHUMB();
          this.CPUCore.branch(address & -2);
        }
      };
      ARMInstructionSet.prototype.B = function() {
        this.CPUCore.branch((this.readPC() | 0) + (this.execute << 8 >> 6) | 0);
      };
      ARMInstructionSet.prototype.BL = function() {
        this.writeRegister(14, this.getLR() | 0);
        this.B();
      };
      ARMInstructionSet.prototype.AND = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWrite(operand1 & operand2);
      };
      ARMInstructionSet.prototype.AND2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWrite2(operand1 & operand2);
      };
      ARMInstructionSet.prototype.ANDS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing2() | 0;
        var result = operand1 & operand2;
        this.branchFlags.setNZInt(result | 0);
        this.guard12OffsetRegisterWriteCPSR(result | 0);
      };
      ARMInstructionSet.prototype.ANDS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing4() | 0;
        var result = operand1 & operand2;
        this.branchFlags.setNZInt(result | 0);
        this.guard12OffsetRegisterWriteCPSR2(result | 0);
      };
      ARMInstructionSet.prototype.EOR = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWrite(operand1 ^ operand2);
      };
      ARMInstructionSet.prototype.EOR2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWrite2(operand1 ^ operand2);
      };
      ARMInstructionSet.prototype.EORS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing2() | 0;
        var result = operand1 ^ operand2;
        this.branchFlags.setNZInt(result | 0);
        this.guard12OffsetRegisterWriteCPSR(result | 0);
      };
      ARMInstructionSet.prototype.EORS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing4() | 0;
        var result = operand1 ^ operand2;
        this.branchFlags.setNZInt(result | 0);
        this.guard12OffsetRegisterWriteCPSR2(result | 0);
      };
      ARMInstructionSet.prototype.SUB = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWrite((operand1 | 0) - (operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.SUB2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWrite2((operand1 | 0) - (operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.SUBS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWriteCPSR(this.branchFlags.setSUBFlags(operand1 | 0, operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.SUBS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWriteCPSR2(this.branchFlags.setSUBFlags(operand1 | 0, operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.RSB = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWrite((operand2 | 0) - (operand1 | 0) | 0);
      };
      ARMInstructionSet.prototype.RSB2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWrite2((operand2 | 0) - (operand1 | 0) | 0);
      };
      ARMInstructionSet.prototype.RSBS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWriteCPSR(this.branchFlags.setSUBFlags(operand2 | 0, operand1 | 0) | 0);
      };
      ARMInstructionSet.prototype.RSBS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWriteCPSR2(this.branchFlags.setSUBFlags(operand2 | 0, operand1 | 0) | 0);
      };
      ARMInstructionSet.prototype.ADD = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWrite((operand1 | 0) + (operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.ADD2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWrite2((operand1 | 0) + (operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.ADDS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWriteCPSR(this.branchFlags.setADDFlags(operand1 | 0, operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.ADDS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWriteCPSR2(this.branchFlags.setADDFlags(operand1 | 0, operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.ADC = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        operand1 = (operand1 | 0) + (operand2 | 0) | 0;
        operand1 = (operand1 | 0) + (this.branchFlags.getCarry() >>> 31) | 0;
        this.guard12OffsetRegisterWrite(operand1 | 0);
      };
      ARMInstructionSet.prototype.ADC2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        operand1 = (operand1 | 0) + (operand2 | 0) | 0;
        operand1 = (operand1 | 0) + (this.branchFlags.getCarry() >>> 31) | 0;
        this.guard12OffsetRegisterWrite2(operand1 | 0);
      };
      ARMInstructionSet.prototype.ADCS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWriteCPSR(this.branchFlags.setADCFlags(operand1 | 0, operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.ADCS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWriteCPSR2(this.branchFlags.setADCFlags(operand1 | 0, operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.SBC = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        operand1 = (operand1 | 0) - (operand2 | 0) | 0;
        operand1 = (operand1 | 0) - (this.branchFlags.getCarryReverse() >>> 31) | 0;
        this.guard12OffsetRegisterWrite(operand1 | 0);
      };
      ARMInstructionSet.prototype.SBC2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        operand1 = (operand1 | 0) - (operand2 | 0) | 0;
        operand1 = (operand1 | 0) - (this.branchFlags.getCarryReverse() >>> 31) | 0;
        this.guard12OffsetRegisterWrite2(operand1 | 0);
      };
      ARMInstructionSet.prototype.SBCS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWriteCPSR(this.branchFlags.setSBCFlags(operand1 | 0, operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.SBCS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWriteCPSR2(this.branchFlags.setSBCFlags(operand1 | 0, operand2 | 0) | 0);
      };
      ARMInstructionSet.prototype.RSC = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        operand1 = (operand2 | 0) - (operand1 | 0) | 0;
        operand1 = (operand1 | 0) - (this.branchFlags.getCarryReverse() >>> 31) | 0;
        this.guard12OffsetRegisterWrite(operand1 | 0);
      };
      ARMInstructionSet.prototype.RSC2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        operand1 = (operand2 | 0) - (operand1 | 0) | 0;
        operand1 = (operand1 | 0) - (this.branchFlags.getCarryReverse() >>> 31) | 0;
        this.guard12OffsetRegisterWrite2(operand1 | 0);
      };
      ARMInstructionSet.prototype.RSCS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWriteCPSR(this.branchFlags.setSBCFlags(operand2 | 0, operand1 | 0) | 0);
      };
      ARMInstructionSet.prototype.RSCS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWriteCPSR2(this.branchFlags.setSBCFlags(operand2 | 0, operand1 | 0) | 0);
      };
      ARMInstructionSet.prototype.TSTS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing2() | 0;
        var result = operand1 & operand2;
        this.branchFlags.setNZInt(result | 0);
        this.incrementProgramCounter();
      };
      ARMInstructionSet.prototype.TSTS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing4() | 0;
        var result = operand1 & operand2;
        this.branchFlags.setNZInt(result | 0);
      };
      ARMInstructionSet.prototype.TEQS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing2() | 0;
        var result = operand1 ^ operand2;
        this.branchFlags.setNZInt(result | 0);
        this.incrementProgramCounter();
      };
      ARMInstructionSet.prototype.TEQS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing4() | 0;
        var result = operand1 ^ operand2;
        this.branchFlags.setNZInt(result | 0);
      };
      ARMInstructionSet.prototype.CMPS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
        this.incrementProgramCounter();
      };
      ARMInstructionSet.prototype.CMPS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.branchFlags.setCMPFlags(operand1 | 0, operand2 | 0);
      };
      ARMInstructionSet.prototype.CMNS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1();
        this.branchFlags.setCMNFlags(operand1 | 0, operand2 | 0);
        this.incrementProgramCounter();
      };
      ARMInstructionSet.prototype.CMNS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3();
        this.branchFlags.setCMNFlags(operand1 | 0, operand2 | 0);
      };
      ARMInstructionSet.prototype.ORR = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing1() | 0;
        this.guard12OffsetRegisterWrite(operand1 | operand2);
      };
      ARMInstructionSet.prototype.ORR2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing3() | 0;
        this.guard12OffsetRegisterWrite2(operand1 | operand2);
      };
      ARMInstructionSet.prototype.ORRS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing2() | 0;
        var result = operand1 | operand2;
        this.branchFlags.setNZInt(result | 0);
        this.guard12OffsetRegisterWriteCPSR(result | 0);
      };
      ARMInstructionSet.prototype.ORRS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = this.operand2OP_DataProcessing4() | 0;
        var result = operand1 | operand2;
        this.branchFlags.setNZInt(result | 0);
        this.guard12OffsetRegisterWriteCPSR2(result | 0);
      };
      ARMInstructionSet.prototype.MOV = function() {
        this.guard12OffsetRegisterWrite(this.operand2OP_DataProcessing1() | 0);
      };
      ARMInstructionSet.prototype.MOV2 = function() {
        this.incrementProgramCounter();
        this.guard12OffsetRegisterWrite2(this.operand2OP_DataProcessing3() | 0);
      };
      ARMInstructionSet.prototype.MOVS = function() {
        var operand2 = this.operand2OP_DataProcessing2() | 0;
        this.branchFlags.setNZInt(operand2 | 0);
        this.guard12OffsetRegisterWriteCPSR(operand2 | 0);
      };
      ARMInstructionSet.prototype.MOVS2 = function() {
        this.incrementProgramCounter();
        var operand2 = this.operand2OP_DataProcessing4() | 0;
        this.branchFlags.setNZInt(operand2 | 0);
        this.guard12OffsetRegisterWriteCPSR2(operand2 | 0);
      };
      ARMInstructionSet.prototype.BIC = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = ~this.operand2OP_DataProcessing1();
        this.guard12OffsetRegisterWrite(operand1 & operand2);
      };
      ARMInstructionSet.prototype.BIC2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = ~this.operand2OP_DataProcessing3();
        this.guard12OffsetRegisterWrite2(operand1 & operand2);
      };
      ARMInstructionSet.prototype.BICS = function() {
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = ~this.operand2OP_DataProcessing2();
        var result = operand1 & operand2;
        this.branchFlags.setNZInt(result | 0);
        this.guard12OffsetRegisterWriteCPSR(result | 0);
      };
      ARMInstructionSet.prototype.BICS2 = function() {
        this.incrementProgramCounter();
        var operand1 = this.read16OffsetRegister() | 0;
        var operand2 = ~this.operand2OP_DataProcessing4();
        var result = operand1 & operand2;
        this.branchFlags.setNZInt(result | 0);
        this.guard12OffsetRegisterWriteCPSR2(result | 0);
      };
      ARMInstructionSet.prototype.MVN = function() {
        this.guard12OffsetRegisterWrite(~this.operand2OP_DataProcessing1());
      };
      ARMInstructionSet.prototype.MVN2 = function() {
        this.incrementProgramCounter();
        this.guard12OffsetRegisterWrite2(~this.operand2OP_DataProcessing3());
      };
      ARMInstructionSet.prototype.MVNS = function() {
        var operand2 = ~this.operand2OP_DataProcessing2();
        this.branchFlags.setNZInt(operand2 | 0);
        this.guard12OffsetRegisterWriteCPSR(operand2 | 0);
      };
      ARMInstructionSet.prototype.MVNS2 = function() {
        this.incrementProgramCounter();
        var operand2 = ~this.operand2OP_DataProcessing4();
        this.branchFlags.setNZInt(operand2 | 0);
        this.guard12OffsetRegisterWriteCPSR2(operand2 | 0);
      };
      ARMInstructionSet.prototype.MRS = function() {
        var psr = 0;
        if ((this.execute & 4194304) == 0) {
          psr = this.rc() | 0;
        } else {
          psr = this.rs() | 0;
        }
        this.guard12OffsetRegisterWrite(psr | 0);
      };
      ARMInstructionSet.prototype.MSR = function() {
        switch (this.execute & 37748736) {
          case 0:
            this.MSR1();
            break;
          case 4194304:
            this.MSR2();
            break;
          case 33554432:
            this.MSR3();
            break;
          default:
            this.MSR4();
        }
        this.incrementProgramCounter();
      };
      ARMInstructionSet.prototype.MSR1 = function() {
        var newcpsr = this.read0OffsetRegister() | 0;
        this.branchFlags.setNZCV(newcpsr | 0);
        if ((this.execute & 65536) == 65536 && (this.CPUCore.modeFlags & 31) != 16) {
          this.CPUCore.switchRegisterBank(newcpsr & 31);
          this.CPUCore.modeFlags = newcpsr & 223;
          this.CPUCore.assertIRQ();
        }
      };
      ARMInstructionSet.prototype.MSR2 = function() {
        var operand = this.read0OffsetRegister() | 0;
        var bank = 1;
        switch (this.CPUCore.modeFlags & 31) {
          case 18:
            break;
          case 19:
            bank = 2;
            break;
          case 17:
            bank = 0;
            break;
          case 23:
            bank = 3;
            break;
          case 27:
            bank = 4;
            break;
          default:
            return;
        }
        var spsr = operand >> 20 & 3840;
        if ((this.execute & 65536) == 65536) {
          spsr = spsr | operand & 255;
        } else {
          spsr = spsr | this.CPUCore.SPSR[bank | 0] & 255;
        }
        this.CPUCore.SPSR[bank | 0] = spsr | 0;
      };
      ARMInstructionSet.prototype.MSR3 = function() {
        var operand = this.imm() | 0;
        this.branchFlags.setNZCV(operand | 0);
      };
      ARMInstructionSet.prototype.MSR4 = function() {
        var operand = this.imm() >> 20;
        var bank = 1;
        switch (this.CPUCore.modeFlags & 31) {
          case 18:
            break;
          case 19:
            bank = 2;
            break;
          case 17:
            bank = 0;
            break;
          case 23:
            bank = 3;
            break;
          case 27:
            bank = 4;
            break;
          default:
            return;
        }
        var spsr = this.CPUCore.SPSR[bank | 0] & 255;
        this.CPUCore.SPSR[bank | 0] = spsr | operand & 3840;
      };
      ARMInstructionSet.prototype.MUL = function() {
        var result = this.performMUL32() | 0;
        this.multiplyGuard16OffsetRegisterWrite(result | 0);
      };
      ARMInstructionSet.prototype.MULS = function() {
        var result = this.performMUL32() | 0;
        this.branchFlags.setCarryFalse();
        this.branchFlags.setNZInt(result | 0);
        this.multiplyGuard16OffsetRegisterWrite(result | 0);
      };
      ARMInstructionSet.prototype.MLA = function() {
        var result = this.performMUL32MLA() | 0;
        result = (result | 0) + (this.read12OffsetRegister() | 0) | 0;
        this.multiplyGuard16OffsetRegisterWrite(result | 0);
      };
      ARMInstructionSet.prototype.MLAS = function() {
        var result = this.performMUL32MLA() | 0;
        result = (result | 0) + (this.read12OffsetRegister() | 0) | 0;
        this.branchFlags.setCarryFalse();
        this.branchFlags.setNZInt(result | 0);
        this.multiplyGuard16OffsetRegisterWrite(result | 0);
      };
      ARMInstructionSet.prototype.UMULL = function() {
        this.CPUCore.performUMUL64(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0);
        this.multiplyGuard16OffsetRegisterWrite(this.CPUCore.mul64ResultHigh | 0);
        this.multiplyGuard12OffsetRegisterWrite(this.CPUCore.mul64ResultLow | 0);
      };
      ARMInstructionSet.prototype.UMULLS = function() {
        this.CPUCore.performUMUL64(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0);
        this.branchFlags.setCarryFalse();
        this.branchFlags.setNegative(this.CPUCore.mul64ResultHigh | 0);
        this.branchFlags.setZero(this.CPUCore.mul64ResultHigh | this.CPUCore.mul64ResultLow);
        this.multiplyGuard16OffsetRegisterWrite(this.CPUCore.mul64ResultHigh | 0);
        this.multiplyGuard12OffsetRegisterWrite(this.CPUCore.mul64ResultLow | 0);
      };
      ARMInstructionSet.prototype.UMLAL = function() {
        this.CPUCore.performUMLA64(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0, this.read16OffsetRegister() | 0, this.read12OffsetRegister() | 0);
        this.multiplyGuard16OffsetRegisterWrite(this.CPUCore.mul64ResultHigh | 0);
        this.multiplyGuard12OffsetRegisterWrite(this.CPUCore.mul64ResultLow | 0);
      };
      ARMInstructionSet.prototype.UMLALS = function() {
        this.CPUCore.performUMLA64(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0, this.read16OffsetRegister() | 0, this.read12OffsetRegister() | 0);
        this.branchFlags.setCarryFalse();
        this.branchFlags.setNegative(this.CPUCore.mul64ResultHigh | 0);
        this.branchFlags.setZero(this.CPUCore.mul64ResultHigh | this.CPUCore.mul64ResultLow);
        this.multiplyGuard16OffsetRegisterWrite(this.CPUCore.mul64ResultHigh | 0);
        this.multiplyGuard12OffsetRegisterWrite(this.CPUCore.mul64ResultLow | 0);
      };
      ARMInstructionSet.prototype.SMULL = function() {
        this.CPUCore.performMUL64(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0);
        this.multiplyGuard16OffsetRegisterWrite(this.CPUCore.mul64ResultHigh | 0);
        this.multiplyGuard12OffsetRegisterWrite(this.CPUCore.mul64ResultLow | 0);
      };
      ARMInstructionSet.prototype.SMULLS = function() {
        this.CPUCore.performMUL64(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0);
        this.branchFlags.setCarryFalse();
        this.branchFlags.setNegative(this.CPUCore.mul64ResultHigh | 0);
        this.branchFlags.setZero(this.CPUCore.mul64ResultHigh | this.CPUCore.mul64ResultLow);
        this.multiplyGuard16OffsetRegisterWrite(this.CPUCore.mul64ResultHigh | 0);
        this.multiplyGuard12OffsetRegisterWrite(this.CPUCore.mul64ResultLow | 0);
      };
      ARMInstructionSet.prototype.SMLAL = function() {
        this.CPUCore.performMLA64(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0, this.read16OffsetRegister() | 0, this.read12OffsetRegister() | 0);
        this.multiplyGuard16OffsetRegisterWrite(this.CPUCore.mul64ResultHigh | 0);
        this.multiplyGuard12OffsetRegisterWrite(this.CPUCore.mul64ResultLow | 0);
      };
      ARMInstructionSet.prototype.SMLALS = function() {
        this.CPUCore.performMLA64(this.read0OffsetRegister() | 0, this.read8OffsetRegister() | 0, this.read16OffsetRegister() | 0, this.read12OffsetRegister() | 0);
        this.branchFlags.setCarryFalse();
        this.branchFlags.setNegative(this.CPUCore.mul64ResultHigh | 0);
        this.branchFlags.setZero(this.CPUCore.mul64ResultHigh | this.CPUCore.mul64ResultLow);
        this.multiplyGuard16OffsetRegisterWrite(this.CPUCore.mul64ResultHigh | 0);
        this.multiplyGuard12OffsetRegisterWrite(this.CPUCore.mul64ResultLow | 0);
      };
      ARMInstructionSet.prototype.STRH = function() {
        var address = this.operand2OP_LoadStore1() | 0;
        this.CPUCore.write16(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRH = function() {
        var address = this.operand2OP_LoadStore1() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read16(address | 0) | 0);
      };
      ARMInstructionSet.prototype.LDRSH = function() {
        var address = this.operand2OP_LoadStore1() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read16(address | 0) << 16 >> 16);
      };
      ARMInstructionSet.prototype.LDRSB = function() {
        var address = this.operand2OP_LoadStore1() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read8(address | 0) << 24 >> 24);
      };
      ARMInstructionSet.prototype.STRH2 = function() {
        var address = this.operand2OP_LoadStore2() | 0;
        this.CPUCore.write16(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRH2 = function() {
        var address = this.operand2OP_LoadStore2() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read16(address | 0) | 0);
      };
      ARMInstructionSet.prototype.LDRSH2 = function() {
        var address = this.operand2OP_LoadStore2() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read16(address | 0) << 16 >> 16);
      };
      ARMInstructionSet.prototype.LDRSB2 = function() {
        var address = this.operand2OP_LoadStore2() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read8(address | 0) << 24 >> 24);
      };
      ARMInstructionSet.prototype.STR = function() {
        var address = this.operand2OP_LoadStore3(0) | 0;
        this.CPUCore.write32(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDR = function() {
        var address = this.operand2OP_LoadStore3(0) | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read32(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STRB = function() {
        var address = this.operand2OP_LoadStore3(0) | 0;
        this.CPUCore.write8(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRB = function() {
        var address = this.operand2OP_LoadStore3(0) | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read8(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STR4 = function() {
        var address = this.operand2OP_LoadStore4() | 0;
        this.CPUCore.write32(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDR4 = function() {
        var address = this.operand2OP_LoadStore4() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read32(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STRB4 = function() {
        var address = this.operand2OP_LoadStore4() | 0;
        this.CPUCore.write8(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRB4 = function() {
        var address = this.operand2OP_LoadStore4() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read8(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STRT = function() {
        var address = this.operand2OP_LoadStore3(15) | 0;
        this.CPUCore.write32(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRT = function() {
        var address = this.operand2OP_LoadStore3(15) | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read32(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STRBT = function() {
        var address = this.operand2OP_LoadStore3(15) | 0;
        this.CPUCore.write8(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRBT = function() {
        var address = this.operand2OP_LoadStore3(15) | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read8(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STR2 = function() {
        var address = this.operand2OP_LoadStore5(0) | 0;
        this.CPUCore.write32(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDR2 = function() {
        var address = this.operand2OP_LoadStore5(0) | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read32(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STRB2 = function() {
        var address = this.operand2OP_LoadStore5(0) | 0;
        this.CPUCore.write8(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRB2 = function() {
        var address = this.operand2OP_LoadStore5(0) | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read8(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STRT2 = function() {
        var address = this.operand2OP_LoadStore5(15) | 0;
        this.CPUCore.write32(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRT2 = function() {
        var address = this.operand2OP_LoadStore5(15) | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read32(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STRBT2 = function() {
        var address = this.operand2OP_LoadStore5(15) | 0;
        this.CPUCore.write8(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRBT2 = function() {
        var address = this.operand2OP_LoadStore5(15) | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read8(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STR3 = function() {
        var address = this.operand2OP_LoadStore6() | 0;
        this.CPUCore.write32(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDR3 = function() {
        var address = this.operand2OP_LoadStore6() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read32(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STRB3 = function() {
        var address = this.operand2OP_LoadStore6() | 0;
        this.CPUCore.write8(address | 0, this.guard12OffsetRegisterRead() | 0);
      };
      ARMInstructionSet.prototype.LDRB3 = function() {
        var address = this.operand2OP_LoadStore6() | 0;
        this.guard12OffsetRegisterWrite(this.CPUCore.read8(address | 0) | 0);
      };
      ARMInstructionSet.prototype.STMIA = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.readRegister(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMIAW = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.readRegister(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMDA = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.readRegister(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) - 4 | 0;
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMDAW = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.readRegister(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) - 4 | 0;
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMIB = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) + 4 | 0;
              this.memory.memoryWrite32(currentAddress | 0, this.readRegister(rListPosition | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMIBW = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) + 4 | 0;
              this.memory.memoryWrite32(currentAddress | 0, this.readRegister(rListPosition | 0) | 0);
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMDB = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) - 4 | 0;
              this.memory.memoryWrite32(currentAddress | 0, this.readRegister(rListPosition | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMDBW = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) - 4 | 0;
              this.memory.memoryWrite32(currentAddress | 0, this.readRegister(rListPosition | 0) | 0);
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMIAG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.guardUserRegisterReadSTM(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMIAWG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.guardUserRegisterReadSTM(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMDAG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.guardUserRegisterReadSTM(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) - 4 | 0;
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMDAWG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.memory.memoryWrite32(currentAddress | 0, this.guardUserRegisterReadSTM(rListPosition | 0) | 0);
              currentAddress = (currentAddress | 0) - 4 | 0;
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMIBG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) + 4 | 0;
              this.memory.memoryWrite32(currentAddress | 0, this.guardUserRegisterReadSTM(rListPosition | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMIBWG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) + 4 | 0;
              this.memory.memoryWrite32(currentAddress | 0, this.guardUserRegisterReadSTM(rListPosition | 0) | 0);
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMDBG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) - 4 | 0;
              this.memory.memoryWrite32(currentAddress | 0, this.guardUserRegisterReadSTM(rListPosition | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.STMDBWG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) - 4 | 0;
              this.memory.memoryWrite32(currentAddress | 0, this.guardUserRegisterReadSTM(rListPosition | 0) | 0);
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMIA = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.guardRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMIAW = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.guardRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMDA = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.guardRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) - 4 | 0;
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMDAW = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.guardRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) - 4 | 0;
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMIB = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) + 4 | 0;
              this.guardRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMIBW = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) + 4 | 0;
              this.guardRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMDB = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) - 4 | 0;
              this.guardRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMDBW = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) - 4 | 0;
              this.guardRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMIAG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.guardUserRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMIAWG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.guardUserRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) + 4 | 0;
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMDAG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.guardUserRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) - 4 | 0;
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMDAWG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              this.guardUserRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
              currentAddress = (currentAddress | 0) - 4 | 0;
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMIBG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) + 4 | 0;
              this.guardUserRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMIBWG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 0; rListPosition < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) + 4 | 0;
              this.guardUserRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMDBG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) - 4 | 0;
              this.guardUserRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
            }
          }
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LDMDBWG = function() {
        if ((this.execute & 65535) > 0) {
          var currentAddress = this.read16OffsetRegister() | 0;
          this.wait.NonSequentialBroadcast();
          for (var rListPosition = 15; rListPosition > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
            if ((this.execute & 1 << rListPosition) != 0) {
              currentAddress = (currentAddress | 0) - 4 | 0;
              this.guardUserRegisterWriteLDM(rListPosition | 0, this.memory.memoryRead32(currentAddress | 0) | 0);
            }
          }
          this.guard16OffsetRegisterWrite(currentAddress | 0);
          this.wait.NonSequentialBroadcast();
        }
      };
      ARMInstructionSet.prototype.LoadStoreMultiple = function() {
        this.incrementProgramCounter();
        switch (this.execute >> 20 & 31) {
          case 0:
            this.STMDA();
            break;
          case 1:
            this.LDMDA();
            break;
          case 2:
            this.STMDAW();
            break;
          case 3:
            this.LDMDAW();
            break;
          case 4:
            this.STMDAG();
            break;
          case 5:
            this.LDMDAG();
            break;
          case 6:
            this.STMDAWG();
            break;
          case 7:
            this.LDMDAWG();
            break;
          case 8:
            this.STMIA();
            break;
          case 9:
            this.LDMIA();
            break;
          case 10:
            this.STMIAW();
            break;
          case 11:
            this.LDMIAW();
            break;
          case 12:
            this.STMIAG();
            break;
          case 13:
            this.LDMIAG();
            break;
          case 14:
            this.STMIAWG();
            break;
          case 15:
            this.LDMIAWG();
            break;
          case 16:
            this.STMDB();
            break;
          case 17:
            this.LDMDB();
            break;
          case 18:
            this.STMDBW();
            break;
          case 19:
            this.LDMDBW();
            break;
          case 20:
            this.STMDBG();
            break;
          case 21:
            this.LDMDBG();
            break;
          case 22:
            this.STMDBWG();
            break;
          case 23:
            this.LDMDBWG();
            break;
          case 24:
            this.STMIB();
            break;
          case 25:
            this.LDMIB();
            break;
          case 26:
            this.STMIBW();
            break;
          case 27:
            this.LDMIBW();
            break;
          case 28:
            this.STMIBG();
            break;
          case 29:
            this.LDMIBG();
            break;
          case 30:
            this.STMIBWG();
            break;
          default:
            this.LDMIBWG();
        }
      };
      ARMInstructionSet.prototype.SWP = function() {
        var base = this.read16OffsetRegister() | 0;
        var data = this.CPUCore.read32(base | 0) | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        this.CPUCore.write32(base | 0, this.read0OffsetRegister() | 0);
        this.guard12OffsetRegisterWrite(data | 0);
      };
      ARMInstructionSet.prototype.SWPB = function() {
        var base = this.read16OffsetRegister() | 0;
        var data = this.CPUCore.read8(base | 0) | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        this.CPUCore.write8(base | 0, this.read0OffsetRegister() | 0);
        this.guard12OffsetRegisterWrite(data | 0);
      };
      ARMInstructionSet.prototype.SWI = function() {
        this.CPUCore.SWI();
      };
      ARMInstructionSet.prototype.UNDEFINED = function() {
        this.CPUCore.UNDEFINED();
      };
      ARMInstructionSet.prototype.operand2OP_DataProcessing1 = function() {
        var data = 0;
        switch ((this.execute & 33554528) >> 5) {
          case 0:
            data = this.lli() | 0;
            break;
          case 1:
            data = this.lri() | 0;
            break;
          case 2:
            data = this.ari() | 0;
            break;
          case 3:
            data = this.rri() | 0;
            break;
          default:
            data = this.imm() | 0;
        }
        return data | 0;
      };
      ARMInstructionSet.prototype.operand2OP_DataProcessing2 = function() {
        var data = 0;
        switch ((this.execute & 33554528) >> 5) {
          case 0:
            data = this.llis() | 0;
            break;
          case 1:
            data = this.lris() | 0;
            break;
          case 2:
            data = this.aris() | 0;
            break;
          case 3:
            data = this.rris() | 0;
            break;
          default:
            data = this.imms() | 0;
        }
        return data | 0;
      };
      ARMInstructionSet.prototype.operand2OP_DataProcessing3 = function() {
        var data = 0;
        switch (this.execute >> 5 & 3) {
          case 0:
            data = this.llr() | 0;
            break;
          case 1:
            data = this.lrr() | 0;
            break;
          case 2:
            data = this.arr() | 0;
            break;
          default:
            data = this.rrr() | 0;
        }
        return data | 0;
      };
      ARMInstructionSet.prototype.operand2OP_DataProcessing4 = function() {
        var data = 0;
        switch (this.execute >> 5 & 3) {
          case 0:
            data = this.llrs() | 0;
            break;
          case 1:
            data = this.lrrs() | 0;
            break;
          case 2:
            data = this.arrs() | 0;
            break;
          default:
            data = this.rrrs() | 0;
        }
        return data | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStoreOffsetGen = function() {
        var data = 0;
        switch (this.execute >> 5 & 3) {
          case 0:
            data = this.lli() | 0;
            break;
          case 1:
            data = this.lri() | 0;
            break;
          case 2:
            data = this.ari() | 0;
            break;
          default:
            data = this.rri() | 0;
        }
        return data | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStoreOperandDetermine = function() {
        var offset = 0;
        if ((this.execute & 4194304) == 0) {
          offset = this.read0OffsetRegister() | 0;
        } else {
          offset = (this.execute & 3840) >> 4 | this.execute & 15;
        }
        return offset | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStorePostT = function(offset, userMode) {
        offset = offset | 0;
        userMode = userMode | 0;
        var base = this.baseRegisterRead(userMode | 0) | 0;
        if ((this.execute & 8388608) == 0) {
          offset = (base | 0) - (offset | 0) | 0;
        } else {
          offset = (base | 0) + (offset | 0) | 0;
        }
        this.baseRegisterWrite(offset | 0, userMode | 0);
        return base | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStoreNotT = function(offset) {
        offset = offset | 0;
        var base = this.read16OffsetRegister() | 0;
        if ((this.execute & 8388608) == 0) {
          offset = (base | 0) - (offset | 0) | 0;
        } else {
          offset = (base | 0) + (offset | 0) | 0;
        }
        if ((this.execute & 2097152) == 2097152) {
          this.guard16OffsetRegisterWrite(offset | 0);
        }
        return offset | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStore1 = function() {
        return this.operand2OP_LoadStorePostT(this.operand2OP_LoadStoreOperandDetermine() | 0, 0) | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStore2 = function() {
        return this.operand2OP_LoadStoreNotT(this.operand2OP_LoadStoreOperandDetermine() | 0) | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStore3 = function(userMode) {
        userMode = userMode | 0;
        return this.operand2OP_LoadStorePostT(this.execute & 4095, userMode | 0) | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStore4 = function() {
        return this.operand2OP_LoadStoreNotT(this.execute & 4095) | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStore5 = function(userMode) {
        userMode = userMode | 0;
        return this.operand2OP_LoadStorePostT(this.operand2OP_LoadStoreOffsetGen() | 0, userMode | 0) | 0;
      };
      ARMInstructionSet.prototype.operand2OP_LoadStore6 = function() {
        return this.operand2OP_LoadStoreNotT(this.operand2OP_LoadStoreOffsetGen() | 0) | 0;
      };
      ARMInstructionSet.prototype.lli = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.execute >> 7 & 31;
        return register << (shifter | 0);
      };
      ARMInstructionSet.prototype.llis = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.execute >> 7 & 31;
        if ((shifter | 0) > 0) {
          this.branchFlags.setCarry(register << ((shifter | 0) - 1 | 0));
        }
        return register << (shifter | 0);
      };
      ARMInstructionSet.prototype.llr = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.read8OffsetRegister() & 255;
        if ((shifter | 0) < 32) {
          register = register << (shifter | 0);
        } else {
          register = 0;
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.llrs = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.read8OffsetRegister() & 255;
        if ((shifter | 0) > 0) {
          if ((shifter | 0) < 32) {
            this.branchFlags.setCarry(register << ((shifter | 0) - 1 | 0));
            register = register << (shifter | 0);
          } else {
            if ((shifter | 0) == 32) {
              this.branchFlags.setCarry(register << 31);
            } else {
              this.branchFlags.setCarryFalse();
            }
            register = 0;
          }
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.lri = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.execute >> 7 & 31;
        if ((shifter | 0) == 0) {
          register = 0;
        } else {
          register = register >>> (shifter | 0) | 0;
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.lris = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.execute >> 7 & 31;
        if ((shifter | 0) > 0) {
          this.branchFlags.setCarry(register >> ((shifter | 0) - 1 | 0) << 31);
          register = register >>> (shifter | 0) | 0;
        } else {
          this.branchFlags.setCarry(register | 0);
          register = 0;
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.lrr = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.read8OffsetRegister() & 255;
        if ((shifter | 0) < 32) {
          register = register >>> (shifter | 0) | 0;
        } else {
          register = 0;
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.lrrs = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.read8OffsetRegister() & 255;
        if ((shifter | 0) > 0) {
          if ((shifter | 0) < 32) {
            this.branchFlags.setCarry(register >> ((shifter | 0) - 1 | 0) << 31);
            register = register >>> (shifter | 0) | 0;
          } else {
            if ((shifter | 0) == 32) {
              this.branchFlags.setCarry(register | 0);
            } else {
              this.branchFlags.setCarryFalse();
            }
            register = 0;
          }
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.ari = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.execute >> 7 & 31;
        if ((shifter | 0) == 0) {
          shifter = 31;
        }
        return register >> (shifter | 0);
      };
      ARMInstructionSet.prototype.aris = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.execute >> 7 & 31;
        if ((shifter | 0) > 0) {
          this.branchFlags.setCarry(register >> ((shifter | 0) - 1 | 0) << 31);
        } else {
          shifter = 31;
          this.branchFlags.setCarry(register | 0);
        }
        return register >> (shifter | 0);
      };
      ARMInstructionSet.prototype.arr = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        return register >> Math.min(this.read8OffsetRegister() & 255, 31);
      };
      ARMInstructionSet.prototype.arrs = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.read8OffsetRegister() & 255;
        if ((shifter | 0) > 0) {
          if ((shifter | 0) < 32) {
            this.branchFlags.setCarry(register >> ((shifter | 0) - 1 | 0) << 31);
            register = register >> (shifter | 0);
          } else {
            this.branchFlags.setCarry(register | 0);
            register = register >> 31;
          }
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.rri = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.execute >> 7 & 31;
        if ((shifter | 0) > 0) {
          register = register << 32 - (shifter | 0) | register >>> (shifter | 0);
        } else {
          register = this.branchFlags.getCarry() & 2147483648 | register >>> 1;
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.rris = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.execute >> 7 & 31;
        if ((shifter | 0) > 0) {
          this.branchFlags.setCarry(register >> ((shifter | 0) - 1 | 0) << 31);
          register = register << 32 - (shifter | 0) | register >>> (shifter | 0);
        } else {
          var rrxValue = this.branchFlags.getCarry() & 2147483648 | register >>> 1;
          this.branchFlags.setCarry(register << 31);
          register = rrxValue | 0;
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.rrr = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.read8OffsetRegister() & 31;
        if ((shifter | 0) > 0) {
          register = register << 32 - (shifter | 0) | register >>> (shifter | 0);
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.rrrs = function() {
        var register = this.read0OffsetRegister() | 0;
        this.wait.CPUInternalSingleCyclePrefetch();
        var shifter = this.read8OffsetRegister() & 255;
        if ((shifter | 0) > 0) {
          shifter = shifter & 31;
          if ((shifter | 0) > 0) {
            this.branchFlags.setCarry(register >> ((shifter | 0) - 1 | 0) << 31);
            register = register << 32 - (shifter | 0) | register >>> (shifter | 0);
          } else {
            this.branchFlags.setCarry(register | 0);
          }
        }
        return register | 0;
      };
      ARMInstructionSet.prototype.imm = function() {
        var immediate = this.execute & 255;
        var shifter = this.execute >> 7 & 30;
        if ((shifter | 0) > 0) {
          immediate = immediate << 32 - (shifter | 0) | immediate >>> (shifter | 0);
        }
        return immediate | 0;
      };
      ARMInstructionSet.prototype.imms = function() {
        var immediate = this.execute & 255;
        var shifter = this.execute >> 7 & 30;
        if ((shifter | 0) > 0) {
          immediate = immediate << 32 - (shifter | 0) | immediate >>> (shifter | 0);
          this.branchFlags.setCarry(immediate | 0);
        }
        return immediate | 0;
      };
      ARMInstructionSet.prototype.rc = function() {
        return this.branchFlags.getNZCV() | this.CPUCore.modeFlags;
      };
      ARMInstructionSet.prototype.rs = function() {
        var spsr = 0;
        switch (this.CPUCore.modeFlags & 31) {
          case 18:
            spsr = this.CPUCore.SPSR[1] | 0;
            break;
          case 19:
            spsr = this.CPUCore.SPSR[2] | 0;
            break;
          case 17:
            spsr = this.CPUCore.SPSR[0] | 0;
            break;
          case 23:
            spsr = this.CPUCore.SPSR[3] | 0;
            break;
          case 27:
            spsr = this.CPUCore.SPSR[4] | 0;
            break;
          default:
            return this.rc() | 0;
        }
        return (spsr & 3840) << 20 | spsr & 255;
      };
      function compileARMInstructionDecodeMap() {
        var pseudoCodes = [
          "BX",
          "B",
          "BL",
          "AND",
          "AND2",
          "ANDS",
          "ANDS2",
          "EOR",
          "EOR2",
          "EORS",
          "EORS2",
          "SUB",
          "SUB2",
          "SUBS",
          "SUBS2",
          "RSB",
          "RSB2",
          "RSBS",
          "RSBS2",
          "ADD",
          "ADD2",
          "ADDS",
          "ADDS2",
          "ADC",
          "ADC2",
          "ADCS",
          "ADCS2",
          "SBC",
          "SBC2",
          "SBCS",
          "SBCS2",
          "RSC",
          "RSC2",
          "RSCS",
          "RSCS2",
          "TSTS",
          "TSTS2",
          "TEQS",
          "TEQS2",
          "CMPS",
          "CMPS2",
          "CMNS",
          "CMNS2",
          "ORR",
          "ORR2",
          "ORRS",
          "ORRS2",
          "MOV",
          "MOV2",
          "MOVS",
          "MOVS2",
          "BIC",
          "BIC2",
          "BICS",
          "BICS2",
          "MVN",
          "MVN2",
          "MVNS",
          "MVNS2",
          "MRS",
          "MSR",
          "MUL",
          "MULS",
          "MLA",
          "MLAS",
          "UMULL",
          "UMULLS",
          "UMLAL",
          "UMLALS",
          "SMULL",
          "SMULLS",
          "SMLAL",
          "SMLALS",
          "STRH",
          "LDRH",
          "LDRSH",
          "LDRSB",
          "STRH2",
          "LDRH2",
          "LDRSH2",
          "LDRSB2",
          "STR",
          "LDR",
          "STRB",
          "LDRB",
          "STRT",
          "LDRT",
          "STRBT",
          "LDRBT",
          "STR2",
          "LDR2",
          "STRB2",
          "LDRB2",
          "STRT2",
          "LDRT2",
          "STRBT2",
          "LDRBT2",
          "STR3",
          "LDR3",
          "STRB3",
          "LDRB3",
          "STR4",
          "LDR4",
          "STRB4",
          "LDRB4",
          "LoadStoreMultiple",
          "SWP",
          "SWPB",
          "SWI"
        ];
        function compileARMInstructionDecodeOpcodeMap(codeMap) {
          var opcodeIndice = 0;
          var instructionMap = getUint8Array(4096);
          function generateMap1(instruction) {
            for (var index = 0; index < 16; ++index) {
              instructionMap[opcodeIndice++] = codeMap[instruction[index]];
            }
          }
          function generateMap2(instruction) {
            var translatedOpcode = codeMap[instruction];
            for (var index = 0; index < 16; ++index) {
              instructionMap[opcodeIndice++] = translatedOpcode;
            }
          }
          function generateMap3(instruction) {
            var translatedOpcode = codeMap[instruction];
            for (var index = 0; index < 256; ++index) {
              instructionMap[opcodeIndice++] = translatedOpcode;
            }
          }
          function generateMap4(instruction) {
            var translatedOpcode = codeMap[instruction];
            for (var index = 0; index < 512; ++index) {
              instructionMap[opcodeIndice++] = translatedOpcode;
            }
          }
          function generateMap5(instruction) {
            var translatedOpcode = codeMap[instruction];
            for (var index = 0; index < 768; ++index) {
              instructionMap[opcodeIndice++] = translatedOpcode;
            }
          }
          function generateStoreLoadInstructionSector1() {
            var instrMap = [
              "STR2",
              "LDR2",
              "STRT2",
              "LDRT2",
              "STRB2",
              "LDRB2",
              "STRBT2",
              "LDRBT2"
            ];
            for (var instrIndex = 0; instrIndex < 16; ++instrIndex) {
              for (var dataIndex = 0; dataIndex < 16; ++dataIndex) {
                if ((dataIndex & 1) == 0) {
                  instructionMap[opcodeIndice++] = codeMap[instrMap[instrIndex & 7]];
                } else {
                  instructionMap[opcodeIndice++] = codeMap["UNDEFINED"];
                }
              }
            }
          }
          function generateStoreLoadInstructionSector2() {
            var instrMap = [
              "STR3",
              "LDR3",
              "STRB3",
              "LDRB3"
            ];
            for (var instrIndex = 0; instrIndex < 16; ++instrIndex) {
              for (var dataIndex = 0; dataIndex < 16; ++dataIndex) {
                if ((dataIndex & 1) == 0) {
                  instructionMap[opcodeIndice++] = codeMap[instrMap[instrIndex >> 1 & 2 | instrIndex & 1]];
                } else {
                  instructionMap[opcodeIndice++] = codeMap["UNDEFINED"];
                }
              }
            }
          }
          generateMap1([
            "AND",
            "AND2",
            "AND",
            "AND2",
            "AND",
            "AND2",
            "AND",
            "AND2",
            "AND",
            "MUL",
            "AND",
            "STRH",
            "AND",
            "UNDEFINED",
            "AND",
            "UNDEFINED"
          ]);
          generateMap1([
            "ANDS",
            "ANDS2",
            "ANDS",
            "ANDS2",
            "ANDS",
            "ANDS2",
            "ANDS",
            "ANDS2",
            "ANDS",
            "MULS",
            "ANDS",
            "LDRH",
            "ANDS",
            "LDRSB",
            "ANDS",
            "LDRSH"
          ]);
          generateMap1([
            "EOR",
            "EOR2",
            "EOR",
            "EOR2",
            "EOR",
            "EOR2",
            "EOR",
            "EOR2",
            "EOR",
            "MLA",
            "EOR",
            "STRH",
            "EOR",
            "UNDEFINED",
            "EOR",
            "UNDEFINED"
          ]);
          generateMap1([
            "EORS",
            "EORS2",
            "EORS",
            "EORS2",
            "EORS",
            "EORS2",
            "EORS",
            "EORS2",
            "EORS",
            "MLAS",
            "EORS",
            "LDRH",
            "EORS",
            "LDRSB",
            "EORS",
            "LDRSH"
          ]);
          generateMap1([
            "SUB",
            "SUB2",
            "SUB",
            "SUB2",
            "SUB",
            "SUB2",
            "SUB",
            "SUB2",
            "SUB",
            "UNDEFINED",
            "SUB",
            "STRH",
            "SUB",
            "UNDEFINED",
            "SUB",
            "UNDEFINED"
          ]);
          generateMap1([
            "SUBS",
            "SUBS2",
            "SUBS",
            "SUBS2",
            "SUBS",
            "SUBS2",
            "SUBS",
            "SUBS2",
            "SUBS",
            "UNDEFINED",
            "SUBS",
            "LDRH",
            "SUBS",
            "LDRSB",
            "SUBS",
            "LDRSH"
          ]);
          generateMap1([
            "RSB",
            "RSB2",
            "RSB",
            "RSB2",
            "RSB",
            "RSB2",
            "RSB",
            "RSB2",
            "RSB",
            "UNDEFINED",
            "RSB",
            "STRH",
            "RSB",
            "UNDEFINED",
            "RSB",
            "UNDEFINED"
          ]);
          generateMap1([
            "RSBS",
            "RSBS2",
            "RSBS",
            "RSBS2",
            "RSBS",
            "RSBS2",
            "RSBS",
            "RSBS2",
            "RSBS",
            "UNDEFINED",
            "RSBS",
            "LDRH",
            "RSBS",
            "LDRSB",
            "RSBS",
            "LDRSH"
          ]);
          generateMap1([
            "ADD",
            "ADD2",
            "ADD",
            "ADD2",
            "ADD",
            "ADD2",
            "ADD",
            "ADD2",
            "ADD",
            "UMULL",
            "ADD",
            "STRH",
            "ADD",
            "UNDEFINED",
            "ADD",
            "UNDEFINED"
          ]);
          generateMap1([
            "ADDS",
            "ADDS2",
            "ADDS",
            "ADDS2",
            "ADDS",
            "ADDS2",
            "ADDS",
            "ADDS2",
            "ADDS",
            "UMULLS",
            "ADDS",
            "LDRH",
            "ADDS",
            "LDRSB",
            "ADDS",
            "LDRSH"
          ]);
          generateMap1([
            "ADC",
            "ADC2",
            "ADC",
            "ADC2",
            "ADC",
            "ADC2",
            "ADC",
            "ADC2",
            "ADC",
            "UMLAL",
            "ADC",
            "STRH",
            "ADC",
            "UNDEFINED",
            "ADC",
            "UNDEFINED"
          ]);
          generateMap1([
            "ADCS",
            "ADCS2",
            "ADCS",
            "ADCS2",
            "ADCS",
            "ADCS2",
            "ADCS",
            "ADCS2",
            "ADCS",
            "UMLALS",
            "ADCS",
            "LDRH",
            "ADCS",
            "LDRSB",
            "ADCS",
            "LDRSH"
          ]);
          generateMap1([
            "SBC",
            "SBC2",
            "SBC",
            "SBC2",
            "SBC",
            "SBC2",
            "SBC",
            "SBC2",
            "SBC",
            "SMULL",
            "SBC",
            "STRH",
            "SBC",
            "UNDEFINED",
            "SBC",
            "UNDEFINED"
          ]);
          generateMap1([
            "SBCS",
            "SBCS2",
            "SBCS",
            "SBCS2",
            "SBCS",
            "SBCS2",
            "SBCS",
            "SBCS2",
            "SBCS",
            "SMULLS",
            "SBCS",
            "LDRH",
            "SBCS",
            "LDRSB",
            "SBCS",
            "LDRSH"
          ]);
          generateMap1([
            "RSC",
            "RSC2",
            "RSC",
            "RSC2",
            "RSC",
            "RSC2",
            "RSC",
            "RSC2",
            "RSC",
            "SMLAL",
            "RSC",
            "STRH",
            "RSC",
            "UNDEFINED",
            "RSC",
            "UNDEFINED"
          ]);
          generateMap1([
            "RSCS",
            "RSCS2",
            "RSCS",
            "RSCS2",
            "RSCS",
            "RSCS2",
            "RSCS",
            "RSCS2",
            "RSCS",
            "SMLALS",
            "RSCS",
            "LDRH",
            "RSCS",
            "LDRSB",
            "RSCS",
            "LDRSH"
          ]);
          generateMap1([
            "MRS",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "SWP",
            "UNDEFINED",
            "STRH2",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED"
          ]);
          generateMap1([
            "TSTS",
            "TSTS2",
            "TSTS",
            "TSTS2",
            "TSTS",
            "TSTS2",
            "TSTS",
            "TSTS2",
            "TSTS",
            "UNDEFINED",
            "TSTS",
            "LDRH2",
            "TSTS",
            "LDRSB2",
            "TSTS",
            "LDRSH2"
          ]);
          generateMap1([
            "MSR",
            "BX",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "STRH2",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED"
          ]);
          generateMap1([
            "TEQS",
            "TEQS2",
            "TEQS",
            "TEQS2",
            "TEQS",
            "TEQS2",
            "TEQS",
            "TEQS2",
            "TEQS",
            "UNDEFINED",
            "TEQS",
            "LDRH2",
            "TEQS",
            "LDRSB2",
            "TEQS",
            "LDRSH2"
          ]);
          generateMap1([
            "MRS",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "SWPB",
            "UNDEFINED",
            "STRH2",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED"
          ]);
          generateMap1([
            "CMPS",
            "CMPS2",
            "CMPS",
            "CMPS2",
            "CMPS",
            "CMPS2",
            "CMPS",
            "CMPS2",
            "CMPS",
            "UNDEFINED",
            "CMPS",
            "LDRH2",
            "CMPS",
            "LDRSB2",
            "CMPS",
            "LDRSH2"
          ]);
          generateMap1([
            "MSR",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "STRH2",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED",
            "UNDEFINED"
          ]);
          generateMap1([
            "CMNS",
            "CMNS2",
            "CMNS",
            "CMNS2",
            "CMNS",
            "CMNS2",
            "CMNS",
            "CMNS2",
            "CMNS",
            "UNDEFINED",
            "CMNS",
            "LDRH2",
            "CMNS",
            "LDRSB2",
            "CMNS",
            "LDRSH2"
          ]);
          generateMap1([
            "ORR",
            "ORR2",
            "ORR",
            "ORR2",
            "ORR",
            "ORR2",
            "ORR",
            "ORR2",
            "ORR",
            "UNDEFINED",
            "ORR",
            "STRH2",
            "ORR",
            "UNDEFINED",
            "ORR",
            "UNDEFINED"
          ]);
          generateMap1([
            "ORRS",
            "ORRS2",
            "ORRS",
            "ORRS2",
            "ORRS",
            "ORRS2",
            "ORRS",
            "ORRS2",
            "ORRS",
            "UNDEFINED",
            "ORRS",
            "LDRH2",
            "ORRS",
            "LDRSB2",
            "ORRS",
            "LDRSH2"
          ]);
          generateMap1([
            "MOV",
            "MOV2",
            "MOV",
            "MOV2",
            "MOV",
            "MOV2",
            "MOV",
            "MOV2",
            "MOV",
            "UNDEFINED",
            "MOV",
            "STRH2",
            "MOV",
            "UNDEFINED",
            "MOV",
            "UNDEFINED"
          ]);
          generateMap1([
            "MOVS",
            "MOVS2",
            "MOVS",
            "MOVS2",
            "MOVS",
            "MOVS2",
            "MOVS",
            "MOVS2",
            "MOVS",
            "UNDEFINED",
            "MOVS",
            "LDRH2",
            "MOVS",
            "LDRSB2",
            "MOVS",
            "LDRSH2"
          ]);
          generateMap1([
            "BIC",
            "BIC2",
            "BIC",
            "BIC2",
            "BIC",
            "BIC2",
            "BIC",
            "BIC2",
            "BIC",
            "UNDEFINED",
            "BIC",
            "STRH2",
            "BIC",
            "UNDEFINED",
            "BIC",
            "UNDEFINED"
          ]);
          generateMap1([
            "BICS",
            "BICS2",
            "BICS",
            "BICS2",
            "BICS",
            "BICS2",
            "BICS",
            "BICS2",
            "BICS",
            "UNDEFINED",
            "BICS",
            "LDRH2",
            "BICS",
            "LDRSB2",
            "BICS",
            "LDRSH2"
          ]);
          generateMap1([
            "MVN",
            "MVN2",
            "MVN",
            "MVN2",
            "MVN",
            "MVN2",
            "MVN",
            "MVN2",
            "MVN",
            "UNDEFINED",
            "MVN",
            "STRH2",
            "MVN",
            "UNDEFINED",
            "MVN",
            "UNDEFINED"
          ]);
          generateMap1([
            "MVNS",
            "MVNS2",
            "MVNS",
            "MVNS2",
            "MVNS",
            "MVNS2",
            "MVNS",
            "MVNS2",
            "MVNS",
            "UNDEFINED",
            "MVNS",
            "LDRH2",
            "MVNS",
            "LDRSB2",
            "MVNS",
            "LDRSH2"
          ]);
          generateMap2("AND");
          generateMap2("ANDS");
          generateMap2("EOR");
          generateMap2("EORS");
          generateMap2("SUB");
          generateMap2("SUBS");
          generateMap2("RSB");
          generateMap2("RSBS");
          generateMap2("ADD");
          generateMap2("ADDS");
          generateMap2("ADC");
          generateMap2("ADCS");
          generateMap2("SBC");
          generateMap2("SBCS");
          generateMap2("RSC");
          generateMap2("RSCS");
          generateMap2("UNDEFINED");
          generateMap2("TSTS");
          generateMap2("MSR");
          generateMap2("TEQS");
          generateMap2("UNDEFINED");
          generateMap2("CMPS");
          generateMap2("MSR");
          generateMap2("CMNS");
          generateMap2("ORR");
          generateMap2("ORRS");
          generateMap2("MOV");
          generateMap2("MOVS");
          generateMap2("BIC");
          generateMap2("BICS");
          generateMap2("MVN");
          generateMap2("MVNS");
          generateMap2("STR");
          generateMap2("LDR");
          generateMap2("STRT");
          generateMap2("LDRT");
          generateMap2("STRB");
          generateMap2("LDRB");
          generateMap2("STRBT");
          generateMap2("LDRBT");
          generateMap2("STR");
          generateMap2("LDR");
          generateMap2("STRT");
          generateMap2("LDRT");
          generateMap2("STRB");
          generateMap2("LDRB");
          generateMap2("STRBT");
          generateMap2("LDRBT");
          generateMap2("STR4");
          generateMap2("LDR4");
          generateMap2("STR4");
          generateMap2("LDR4");
          generateMap2("STRB4");
          generateMap2("LDRB4");
          generateMap2("STRB4");
          generateMap2("LDRB4");
          generateMap2("STR4");
          generateMap2("LDR4");
          generateMap2("STR4");
          generateMap2("LDR4");
          generateMap2("STRB4");
          generateMap2("LDRB4");
          generateMap2("STRB4");
          generateMap2("LDRB4");
          generateStoreLoadInstructionSector1();
          generateStoreLoadInstructionSector2();
          generateMap4("LoadStoreMultiple");
          generateMap3("B");
          generateMap3("BL");
          generateMap5("UNDEFINED");
          generateMap3("SWI");
          ARMInstructionSet.prototype.instructionMap = instructionMap;
        }
        function compileARMInstructionDecodeOpcodeSwitch() {
          var opcodeNameMap = {};
          var code = "switch (this.instructionMap[((this.execute >> 16) & 0xFF0) | ((this.execute >> 4) & 0xF)] & 0xFF) {";
          for (var opcodeNumber = 0; opcodeNumber < pseudoCodes.length; ++opcodeNumber) {
            var opcodeName = pseudoCodes[opcodeNumber];
            opcodeNameMap[opcodeName] = opcodeNumber;
            code += "case " + opcodeNumber + ":{this." + opcodeName + "();break};";
          }
          code += "default:{this.UNDEFINED()}}";
          opcodeNameMap["UNDEFINED"] = opcodeNumber;
          ARMInstructionSet.prototype.executeDecoded = Function(code);
          return opcodeNameMap;
        }
        compileARMInstructionDecodeOpcodeMap(compileARMInstructionDecodeOpcodeSwitch());
      }
      compileARMInstructionDecodeMap();
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceCPUCore.js
  var require_GameBoyAdvanceCPUCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceCPUCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceCPU;
      var TypedArrayShim = require_TypedArrayShim();
      var THUMBInstructionSet = require_THUMBInstructionSetCore();
      var ARMCPSRAttributeTable = require_ARMCPSRAttributeTable();
      var GameBoyAdvanceSWI = require_GameBoyAdvanceSWICore();
      var ARMInstructionSet = require_ARMInstructionSetCore();
      var getInt32Array = TypedArrayShim.getInt32Array;
      var getUint16Array = TypedArrayShim.getUint16Array;
      function GameBoyAdvanceCPU(IOCore) {
        this.IOCore = IOCore;
        this.memory = this.IOCore.memory;
        this.wait = this.IOCore.wait;
      }
      GameBoyAdvanceCPU.prototype.initialize = function() {
        this.mul64ResultHigh = 0;
        this.mul64ResultLow = 0;
        this.initializeRegisters();
        this.ARM = new ARMInstructionSet(this);
        this.THUMB = new THUMBInstructionSet(this);
        this.IOCore.assignInstructionCoreReferences(this.ARM, this.THUMB);
      };
      GameBoyAdvanceCPU.prototype.initializeRegisters = function() {
        this.registers = getInt32Array(16);
        this.registersUSR = getInt32Array(7);
        this.registersFIQ = getInt32Array(7);
        this.registersSVC = getInt32Array(2);
        this.registersABT = getInt32Array(2);
        this.registersIRQ = getInt32Array(2);
        this.registersUND = getInt32Array(2);
        this.branchFlags = ARMCPSRAttributeTable();
        this.modeFlags = 211;
        this.SPSR = getUint16Array(5);
        this.SPSR[0] = 211;
        this.SPSR[1] = 211;
        this.SPSR[2] = 211;
        this.SPSR[3] = 211;
        this.SPSR[4] = 211;
        this.triggeredIRQ = false;
        if (!this.IOCore.BIOSFound || this.IOCore.settings.SKIPBoot) {
          this.HLEReset();
        }
        this.IOCore.flagBubble();
      };
      GameBoyAdvanceCPU.prototype.HLEReset = function() {
        this.registersSVC[0] = 50364384;
        this.registersIRQ[0] = 50364320;
        this.registers[13] = 50364160;
        this.registers[15] = 134217728;
        this.modeFlags = this.modeFlags | 31;
      };
      GameBoyAdvanceCPU.prototype.branch = function(branchTo) {
        branchTo = branchTo | 0;
        // Intercept return to BIOS IRQ-exit stub at 0x130.
        // When the game's IRQ handler does BX LR (LR=0x130), handle
        // the register-pop + mode-restore in JS instead of relying on
        // ARM code in a mostly-blank BIOS.
        if ((branchTo | 0) == 304 && this.IOCore.settings.SKIPBoot && !this._inIRQExit) {
          this._inIRQExit = true;
          this.HLEIRQExit();   // pops regs, restores CPSR, branches to return addr
          this._inIRQExit = false;
          return;              // HLEIRQExit already called branch() internally
        }
        this.registers[15] = branchTo | 0;
        this.IOCore.flagBubble();
        this.wait.NonSequentialBroadcastClear();
      };
      GameBoyAdvanceCPU.prototype.triggerIRQ = function(didFire) {
        this.triggeredIRQ = didFire;
        this.assertIRQ();
      };
      GameBoyAdvanceCPU.prototype.assertIRQ = function() {
        if (this.triggeredIRQ && (this.modeFlags & 128) == 0) {
          this.IOCore.flagIRQ();
        }
      };
      GameBoyAdvanceCPU.prototype.getCurrentFetchValue = function() {
        if ((this.modeFlags & 32) != 0) {
          return this.THUMB.getCurrentFetchValue() | 0;
        } else {
          return this.ARM.getCurrentFetchValue() | 0;
        }
      };
      GameBoyAdvanceCPU.prototype.enterARM = function() {
        this.modeFlags = this.modeFlags & 223;
        this.THUMBBitModify(false);
      };
      GameBoyAdvanceCPU.prototype.enterTHUMB = function() {
        this.modeFlags = this.modeFlags | 32;
        this.THUMBBitModify(true);
      };
      GameBoyAdvanceCPU.prototype.getLR = function() {
        if ((this.modeFlags & 32) != 0) {
          return this.THUMB.getLR() | 0;
        } else {
          return this.ARM.getLR() | 0;
        }
      };
      GameBoyAdvanceCPU.prototype.THUMBBitModify = function(isThumb) {
        if (isThumb) {
          this.IOCore.flagTHUMB();
        } else {
          this.IOCore.deflagTHUMB();
        }
      };
      GameBoyAdvanceCPU.prototype.IRQinARM = function() {
        if (this.IOCore.settings.SKIPBoot) {
          // Check if a valid IRQ handler is installed before entering IRQ
          var handlerAddr = this.read32(67108860) & -4; // [0x03FFFFFC]
          if ((handlerAddr | 0) == 0) {
            // No handler installed yet — just acknowledge and skip
            this.IOCore.deflagIRQ();
            return;
          }
        }
        this.switchMode(18);
        this.registers[14] = this.ARM.getIRQLR() | 0;
        this.modeFlags = this.modeFlags | 128;
        if (this.IOCore.settings.SKIPBoot) {
          this.HLEIRQEnter();
        } else {
          this.branch(24);
        }
        this.IOCore.deflagIRQ();
      };
      GameBoyAdvanceCPU.prototype.IRQinTHUMB = function() {
        if (this.IOCore.settings.SKIPBoot) {
          var handlerAddr = this.read32(67108860) & -4;
          if ((handlerAddr | 0) == 0) {
            this.IOCore.deflagIRQ();
            return;
          }
        }
        this.switchMode(18);
        this.registers[14] = this.THUMB.getIRQLR() | 0;
        this.modeFlags = this.modeFlags | 128;
        this.enterARM();
        if (this.IOCore.settings.SKIPBoot) {
          this.HLEIRQEnter();
        } else {
          this.branch(24);
        }
        this.IOCore.deflagIRQ();
      };
      GameBoyAdvanceCPU.prototype.HLEIRQEnter = function() {
        var currentAddress = this.registers[13] | 0;
        this.wait.NonSequentialBroadcast();
        for (var rListPosition = 15; (rListPosition | 0) > -1; rListPosition = (rListPosition | 0) - 1 | 0) {
          if ((20495 & 1 << (rListPosition | 0)) != 0) {
            currentAddress = (currentAddress | 0) - 4 | 0;
            this.memory.memoryWrite32(currentAddress | 0, this.registers[rListPosition | 0] | 0);
          }
        }
        this.registers[13] = currentAddress | 0;
        this.wait.NonSequentialBroadcast();
        this.registers[0] = 67108864;
        this.registers[14] = 304;
        this.branch(this.read32(67108860) & -4);
      };
      GameBoyAdvanceCPU.prototype.HLEIRQExit = function() {
        var currentAddress = this.registers[13] | 0;
        this.wait.NonSequentialBroadcast();
        for (var rListPosition = 0; (rListPosition | 0) < 16; rListPosition = (rListPosition | 0) + 1 | 0) {
          if ((20495 & 1 << (rListPosition | 0)) != 0) {
            this.registers[rListPosition & 15] = this.memory.memoryRead32(currentAddress | 0) | 0;
            currentAddress = (currentAddress | 0) + 4 | 0;
          }
        }
        this.registers[13] = currentAddress | 0;
        this.wait.NonSequentialBroadcast();
        var data = this.branchFlags.setSUBFlags(this.registers[14] | 0, 4) | 0;
        data = data & -4 >> (this.SPSRtoCPSR() >> 5);
        this.branch(data | 0);
      };
      GameBoyAdvanceCPU.prototype.SWI = function() {
        if (this.IOCore.settings.SKIPBoot) {
          var swiCode = ((this.modeFlags & 32) != 0) ? this.THUMB.getSWICode() : this.ARM.getSWICode();
          if (!window._swiLog) { window._swiLog = {}; window._swiPCs = []; }
          window._swiLog[swiCode] = (window._swiLog[swiCode] || 0) + 1;
          if (window._swiPCs.length < 40) {
            window._swiPCs.push("s" + swiCode + "@" + (this.registers[15] >>> 0).toString(16));
          }
          if (!this.swiHLE) { this.swiHLE = new GameBoyAdvanceSWI(this); }
          this.swiHLE.execute(swiCode);
          // Advance PC past the SWI instruction (every other instruction
          // either calls incrementProgramCounter or branch; the non-HLE
          // path calls branch(8) which resets the pipeline, but HLE must
          // manually advance so the pipeline doesn't re-fetch the same
          // address and duplicate the next instruction).
          if ((this.modeFlags & 32) != 0) {
            this.registers[15] = (this.registers[15] | 0) + 2 | 0;
          } else {
            this.registers[15] = (this.registers[15] | 0) + 4 | 0;
          }
          return;
        }
        this.switchMode(19);
        this.registers[14] = this.getLR() | 0;
        this.modeFlags = this.modeFlags | 128;
        this.enterARM();
        this.branch(8);
      };
      GameBoyAdvanceCPU.prototype.UNDEFINED = function() {
        this.switchMode(27);
        this.registers[14] = this.getLR() | 0;
        this.modeFlags = this.modeFlags | 128;
        this.enterARM();
        this.branch(4);
      };
      GameBoyAdvanceCPU.prototype.SPSRtoCPSR = function() {
        var bank = 1;
        switch (this.modeFlags & 31) {
          case 18:
            break;
          case 19:
            bank = 2;
            break;
          case 17:
            bank = 0;
            break;
          case 23:
            bank = 3;
            break;
          case 27:
            bank = 4;
            break;
          default:
            return this.modeFlags & 32;
        }
        var spsr = this.SPSR[bank | 0] | 0;
        this.branchFlags.setNZCV(spsr << 20);
        this.switchRegisterBank(spsr & 31);
        this.modeFlags = spsr & 255;
        this.assertIRQ();
        this.THUMBBitModify((spsr & 32) != 0);
        return spsr & 32;
      };
      GameBoyAdvanceCPU.prototype.switchMode = function(newMode) {
        newMode = newMode | 0;
        this.CPSRtoSPSR(newMode | 0);
        this.switchRegisterBank(newMode | 0);
        this.modeFlags = this.modeFlags & 224 | (newMode | 0);
      };
      GameBoyAdvanceCPU.prototype.CPSRtoSPSR = function(newMode) {
        var spsr = this.modeFlags & 255;
        spsr = spsr | this.branchFlags.getNZCV() >> 20;
        switch (newMode | 0) {
          case 18:
            this.SPSR[1] = spsr | 0;
            break;
          case 19:
            this.SPSR[2] = spsr | 0;
            break;
          case 17:
            this.SPSR[0] = spsr | 0;
            break;
          case 23:
            this.SPSR[3] = spsr | 0;
            break;
          case 27:
            this.SPSR[4] = spsr | 0;
        }
      };
      GameBoyAdvanceCPU.prototype.switchRegisterBank = function(newMode) {
        newMode = newMode | 0;
        switch (this.modeFlags & 31) {
          case 16:
          case 31:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersUSR[5] = this.registers[13] | 0;
            this.registersUSR[6] = this.registers[14] | 0;
            break;
          case 17:
            this.registersFIQ[0] = this.registers[8] | 0;
            this.registersFIQ[1] = this.registers[9] | 0;
            this.registersFIQ[2] = this.registers[10] | 0;
            this.registersFIQ[3] = this.registers[11] | 0;
            this.registersFIQ[4] = this.registers[12] | 0;
            this.registersFIQ[5] = this.registers[13] | 0;
            this.registersFIQ[6] = this.registers[14] | 0;
            break;
          case 18:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersIRQ[0] = this.registers[13] | 0;
            this.registersIRQ[1] = this.registers[14] | 0;
            break;
          case 19:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersSVC[0] = this.registers[13] | 0;
            this.registersSVC[1] = this.registers[14] | 0;
            break;
          case 23:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersABT[0] = this.registers[13] | 0;
            this.registersABT[1] = this.registers[14] | 0;
            break;
          case 27:
            this.registersUSR[0] = this.registers[8] | 0;
            this.registersUSR[1] = this.registers[9] | 0;
            this.registersUSR[2] = this.registers[10] | 0;
            this.registersUSR[3] = this.registers[11] | 0;
            this.registersUSR[4] = this.registers[12] | 0;
            this.registersUND[0] = this.registers[13] | 0;
            this.registersUND[1] = this.registers[14] | 0;
        }
        switch (newMode | 0) {
          case 16:
          case 31:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersUSR[5] | 0;
            this.registers[14] = this.registersUSR[6] | 0;
            break;
          case 17:
            this.registers[8] = this.registersFIQ[0] | 0;
            this.registers[9] = this.registersFIQ[1] | 0;
            this.registers[10] = this.registersFIQ[2] | 0;
            this.registers[11] = this.registersFIQ[3] | 0;
            this.registers[12] = this.registersFIQ[4] | 0;
            this.registers[13] = this.registersFIQ[5] | 0;
            this.registers[14] = this.registersFIQ[6] | 0;
            break;
          case 18:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersIRQ[0] | 0;
            this.registers[14] = this.registersIRQ[1] | 0;
            break;
          case 19:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersSVC[0] | 0;
            this.registers[14] = this.registersSVC[1] | 0;
            break;
          case 23:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersABT[0] | 0;
            this.registers[14] = this.registersABT[1] | 0;
            break;
          case 27:
            this.registers[8] = this.registersUSR[0] | 0;
            this.registers[9] = this.registersUSR[1] | 0;
            this.registers[10] = this.registersUSR[2] | 0;
            this.registers[11] = this.registersUSR[3] | 0;
            this.registers[12] = this.registersUSR[4] | 0;
            this.registers[13] = this.registersUND[0] | 0;
            this.registers[14] = this.registersUND[1] | 0;
        }
      };
      if (typeof Math.imul == "function") {
        GameBoyAdvanceCPU.prototype.calculateMUL32 = Math.imul;
      } else {
        GameBoyAdvanceCPU.prototype.calculateMUL32 = function(rs, rd) {
          rs = rs | 0;
          rd = rd | 0;
          var lowMul = (rs & 65535) * rd;
          var highMul = (rs >> 16) * rd;
          return (highMul << 16) + lowMul | 0;
        };
      }
      GameBoyAdvanceCPU.prototype.performMUL32 = function(rs, rd) {
        rs = rs | 0;
        rd = rd | 0;
        if (rd >>> 8 == 0 || rd >>> 8 == 16777215) {
          this.IOCore.wait.CPUInternalSingleCyclePrefetch();
        } else if (rd >>> 16 == 0 || rd >>> 16 == 65535) {
          this.IOCore.wait.CPUInternalCyclePrefetch(2);
        } else if (rd >>> 24 == 0 || rd >>> 24 == 255) {
          this.IOCore.wait.CPUInternalCyclePrefetch(3);
        } else {
          this.IOCore.wait.CPUInternalCyclePrefetch(4);
        }
        return this.calculateMUL32(rs | 0, rd | 0) | 0;
      };
      GameBoyAdvanceCPU.prototype.performMUL32MLA = function(rs, rd) {
        rs = rs | 0;
        rd = rd | 0;
        if (rd >>> 8 == 0 || rd >>> 8 == 16777215) {
          this.IOCore.wait.CPUInternalCyclePrefetch(2);
        } else if (rd >>> 16 == 0 || rd >>> 16 == 65535) {
          this.IOCore.wait.CPUInternalCyclePrefetch(3);
        } else if (rd >>> 24 == 0 || rd >>> 24 == 255) {
          this.IOCore.wait.CPUInternalCyclePrefetch(4);
        } else {
          this.IOCore.wait.CPUInternalCyclePrefetch(5);
        }
        return this.calculateMUL32(rs | 0, rd | 0) | 0;
      };
      GameBoyAdvanceCPU.prototype.performMUL64 = function(rs, rd) {
        rs = rs | 0;
        rd = rd | 0;
        if (rd >>> 8 == 0 || rd >>> 8 == 16777215) {
          this.IOCore.wait.CPUInternalCyclePrefetch(2);
        } else if (rd >>> 16 == 0 || rd >>> 16 == 65535) {
          this.IOCore.wait.CPUInternalCyclePrefetch(3);
        } else if (rd >>> 24 == 0 || rd >>> 24 == 255) {
          this.IOCore.wait.CPUInternalCyclePrefetch(4);
        } else {
          this.IOCore.wait.CPUInternalCyclePrefetch(5);
        }
        this.mul64ResultHigh = Math.floor(rs * rd / 4294967296) | 0;
        this.mul64ResultLow = this.calculateMUL32(rs | 0, rd | 0) | 0;
      };
      GameBoyAdvanceCPU.prototype.performMLA64 = function(rs, rd, mlaHigh, mlaLow) {
        rs = rs | 0;
        rd = rd | 0;
        mlaHigh = mlaHigh | 0;
        mlaLow = mlaLow | 0;
        if (rd >>> 8 == 0 || rd >>> 8 == 16777215) {
          this.IOCore.wait.CPUInternalCyclePrefetch(3);
        } else if (rd >>> 16 == 0 || rd >>> 16 == 65535) {
          this.IOCore.wait.CPUInternalCyclePrefetch(4);
        } else if (rd >>> 24 == 0 || rd >>> 24 == 255) {
          this.IOCore.wait.CPUInternalCyclePrefetch(5);
        } else {
          this.IOCore.wait.CPUInternalCyclePrefetch(6);
        }
        var mulTop = Math.floor(rs * rd / 4294967296) | 0;
        var dirty = (this.calculateMUL32(rs | 0, rd | 0) >>> 0) + (mlaLow >>> 0);
        this.mul64ResultHigh = (mulTop | 0) + (mlaHigh | 0) + Math.floor(dirty / 4294967296) | 0;
        this.mul64ResultLow = dirty | 0;
      };
      GameBoyAdvanceCPU.prototype.performUMUL64 = function(rs, rd) {
        rs = rs | 0;
        rd = rd | 0;
        if (rd >>> 8 == 0) {
          this.IOCore.wait.CPUInternalCyclePrefetch(2);
        } else if (rd >>> 16 == 0) {
          this.IOCore.wait.CPUInternalCyclePrefetch(3);
        } else if (rd >>> 24 == 0) {
          this.IOCore.wait.CPUInternalCyclePrefetch(4);
        } else {
          this.IOCore.wait.CPUInternalCyclePrefetch(5);
        }
        this.mul64ResultHigh = (rs >>> 0) * (rd >>> 0) / 4294967296 | 0;
        this.mul64ResultLow = this.calculateMUL32(rs | 0, rd | 0) | 0;
      };
      GameBoyAdvanceCPU.prototype.performUMLA64 = function(rs, rd, mlaHigh, mlaLow) {
        rs = rs | 0;
        rd = rd | 0;
        mlaHigh = mlaHigh | 0;
        mlaLow = mlaLow | 0;
        if (rd >>> 8 == 0) {
          this.IOCore.wait.CPUInternalCyclePrefetch(3);
        } else if (rd >>> 16 == 0) {
          this.IOCore.wait.CPUInternalCyclePrefetch(4);
        } else if (rd >>> 24 == 0) {
          this.IOCore.wait.CPUInternalCyclePrefetch(5);
        } else {
          this.IOCore.wait.CPUInternalCyclePrefetch(6);
        }
        var mulTop = Math.floor((rs >>> 0) * (rd >>> 0) / 4294967296) | 0;
        var dirty = (this.calculateMUL32(rs | 0, rd | 0) >>> 0) + (mlaLow >>> 0);
        this.mul64ResultHigh = (mulTop | 0) + (mlaHigh | 0) + Math.floor(dirty / 4294967296) | 0;
        this.mul64ResultLow = dirty | 0;
      };
      GameBoyAdvanceCPU.prototype.write32 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.wait.NonSequentialBroadcast();
        this.memory.memoryWrite32(address | 0, data | 0);
        this.IOCore.wait.NonSequentialBroadcast();
      };
      GameBoyAdvanceCPU.prototype.write16 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.wait.NonSequentialBroadcast();
        this.memory.memoryWrite16(address | 0, data | 0);
        this.IOCore.wait.NonSequentialBroadcast();
      };
      GameBoyAdvanceCPU.prototype.write8 = function(address, data) {
        address = address | 0;
        data = data | 0;
        this.IOCore.wait.NonSequentialBroadcast();
        this.memory.memoryWrite8(address | 0, data | 0);
        this.IOCore.wait.NonSequentialBroadcast();
      };
      GameBoyAdvanceCPU.prototype.read32 = function(address) {
        address = address | 0;
        this.IOCore.wait.NonSequentialBroadcast();
        var data = this.memory.memoryRead32(address | 0) | 0;
        if ((address & 3) != 0) {
          data = data << (4 - (address & 3) << 3) | data >>> ((address & 3) << 3);
        }
        this.IOCore.wait.NonSequentialBroadcast();
        return data | 0;
      };
      GameBoyAdvanceCPU.prototype.read16 = function(address) {
        address = address | 0;
        this.IOCore.wait.NonSequentialBroadcast();
        var data = this.memory.memoryRead16(address | 0) | 0;
        if ((address & 1) != 0) {
          data = data << 24 | data >>> 8;
        }
        this.IOCore.wait.NonSequentialBroadcast();
        return data | 0;
      };
      GameBoyAdvanceCPU.prototype.read8 = function(address) {
        address = address | 0;
        this.IOCore.wait.NonSequentialBroadcast();
        var data = this.memory.memoryRead8(address | 0) | 0;
        this.IOCore.wait.NonSequentialBroadcast();
        return data | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/memory/GameBoyAdvanceDMA0Core.js
  var require_GameBoyAdvanceDMA0Core = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/memory/GameBoyAdvanceDMA0Core.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceDMA0;
      function GameBoyAdvanceDMA0(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceDMA0.prototype.DMA_ENABLE_TYPE = [
        //DMA Channel 0 Mapping:
        1,
        2,
        4,
        0
      ];
      GameBoyAdvanceDMA0.prototype.initialize = function() {
        this.enabled = 0;
        this.pending = 0;
        this.source = 0;
        this.sourceShadow = 0;
        this.destination = 0;
        this.destinationShadow = 0;
        this.wordCount = 0;
        this.wordCountShadow = 0;
        this.irqFlagging = 0;
        this.dmaType = 0;
        this.is32Bit = 0;
        this.repeat = 0;
        this.sourceControl = 0;
        this.destinationControl = 0;
        this.DMACore = this.IOCore.dma;
        this.memory = this.IOCore.memory;
        this.gfx = this.IOCore.gfx;
        this.irq = this.IOCore.irq;
      };
      GameBoyAdvanceDMA0.prototype.writeDMASource8_0 = function(data) {
        data = data | 0;
        this.source = this.source & 134217472;
        data = data & 255;
        this.source = this.source | data;
      };
      GameBoyAdvanceDMA0.prototype.writeDMASource8_1 = function(data) {
        data = data | 0;
        this.source = this.source & 134152447;
        data = data & 255;
        this.source = this.source | data << 8;
      };
      GameBoyAdvanceDMA0.prototype.writeDMASource8_2 = function(data) {
        data = data | 0;
        this.source = this.source & 117506047;
        data = data & 255;
        this.source = this.source | data << 16;
      };
      GameBoyAdvanceDMA0.prototype.writeDMASource8_3 = function(data) {
        data = data | 0;
        this.source = this.source & 16777215;
        data = data & 7;
        this.source = this.source | data << 24;
      };
      GameBoyAdvanceDMA0.prototype.writeDMASource16_0 = function(data) {
        data = data | 0;
        this.source = this.source & 134152192;
        data = data & 65535;
        this.source = this.source | data;
      };
      GameBoyAdvanceDMA0.prototype.writeDMASource16_1 = function(data) {
        data = data | 0;
        this.source = this.source & 65535;
        data = data & 2047;
        this.source = this.source | data << 16;
      };
      GameBoyAdvanceDMA0.prototype.writeDMASource32 = function(data) {
        data = data | 0;
        this.source = data & 134217727;
      };
      GameBoyAdvanceDMA0.prototype.writeDMADestination8_0 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134217472;
        data = data & 255;
        this.destination = this.destination | data;
      };
      GameBoyAdvanceDMA0.prototype.writeDMADestination8_1 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134152447;
        data = data & 255;
        this.destination = this.destination | data << 8;
      };
      GameBoyAdvanceDMA0.prototype.writeDMADestination8_2 = function(data) {
        data = data | 0;
        this.destination = this.destination & 117506047;
        data = data & 255;
        this.destination = this.destination | data << 16;
      };
      GameBoyAdvanceDMA0.prototype.writeDMADestination8_3 = function(data) {
        data = data | 0;
        this.destination = this.destination & 16777215;
        data = data & 7;
        this.destination = this.destination | data << 24;
      };
      GameBoyAdvanceDMA0.prototype.writeDMADestination16_0 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134152192;
        data = data & 65535;
        this.destination = this.destination | data;
      };
      GameBoyAdvanceDMA0.prototype.writeDMADestination16_1 = function(data) {
        data = data | 0;
        this.destination = this.destination & 65535;
        data = data & 2047;
        this.destination = this.destination | data << 16;
      };
      GameBoyAdvanceDMA0.prototype.writeDMADestination32 = function(data) {
        data = data | 0;
        this.destination = data & 134217727;
      };
      GameBoyAdvanceDMA0.prototype.writeDMAWordCount8_0 = function(data) {
        data = data | 0;
        this.wordCount = this.wordCount & 16128;
        data = data & 255;
        this.wordCount = this.wordCount | data;
      };
      GameBoyAdvanceDMA0.prototype.writeDMAWordCount8_1 = function(data) {
        data = data | 0;
        this.wordCount = this.wordCount & 255;
        data = data & 63;
        this.wordCount = this.wordCount | data << 8;
      };
      GameBoyAdvanceDMA0.prototype.writeDMAWordCount16 = function(data) {
        data = data | 0;
        this.wordCount = data & 16383;
      };
      GameBoyAdvanceDMA0.prototype.writeDMAControl8_0 = function(data) {
        data = data | 0;
        this.destinationControl = data >> 5 & 3;
        this.sourceControl = this.sourceControl & 2;
        this.sourceControl = this.sourceControl | data >> 7 & 1;
      };
      GameBoyAdvanceDMA0.prototype.writeDMAControl8_1 = function(data) {
        data = data | 0;
        this.IOCore.updateCoreClocking();
        this.sourceControl = this.sourceControl & 1 | (data & 1) << 1;
        this.repeat = data & 2;
        this.is32Bit = data & 4;
        this.dmaType = data >> 4 & 3;
        this.irqFlagging = data & 64;
        if ((data & 128) != 0) {
          if ((this.enabled | 0) == 0) {
            this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
            if ((this.enabled | 0) > 0) {
              this.enableDMAChannel();
            }
          }
        } else {
          this.enabled = 0;
          this.DMACore.update();
        }
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceDMA0.prototype.writeDMAControl16 = function(data) {
        data = data | 0;
        this.IOCore.updateCoreClocking();
        this.destinationControl = data >> 5 & 3;
        this.sourceControl = data >> 7 & 3;
        this.repeat = data >> 8 & 2;
        this.is32Bit = data >> 8 & 4;
        this.dmaType = data >> 12 & 3;
        this.irqFlagging = data >> 8 & 64;
        if ((data & 32768) != 0) {
          if ((this.enabled | 0) == 0) {
            this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
            if ((this.enabled | 0) > 0) {
              this.enableDMAChannel();
            }
          }
        } else {
          this.enabled = 0;
          this.DMACore.update();
        }
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceDMA0.prototype.writeDMAControl32 = function(data) {
        data = data | 0;
        this.writeDMAWordCount16(data | 0);
        this.writeDMAControl16(data >> 16);
      };
      GameBoyAdvanceDMA0.prototype.readDMAControl8_0 = function() {
        var data = this.destinationControl << 5;
        data = data | (this.sourceControl & 1) << 7;
        return data | 0;
      };
      GameBoyAdvanceDMA0.prototype.readDMAControl8_1 = function() {
        var data = this.sourceControl >> 1;
        data = data | this.repeat;
        data = data | this.is32Bit;
        data = data | this.dmaType << 4;
        data = data | this.irqFlagging;
        if ((this.enabled | 0) != 0) {
          data = data | 128;
        }
        return data | 0;
      };
      GameBoyAdvanceDMA0.prototype.readDMAControl16 = function() {
        var data = this.destinationControl << 5;
        data = data | this.sourceControl << 7;
        data = data | this.repeat << 8;
        data = data | this.is32Bit << 8;
        data = data | this.dmaType << 12;
        data = data | this.irqFlagging << 8;
        if ((this.enabled | 0) != 0) {
          data = data | 32768;
        }
        return data | 0;
      };
      GameBoyAdvanceDMA0.prototype.getMatchStatus = function() {
        return this.enabled & this.pending;
      };
      GameBoyAdvanceDMA0.prototype.requestDMA = function(DMAType) {
        DMAType = DMAType | 0;
        if ((this.enabled & DMAType) == (DMAType | 0)) {
          this.pending = DMAType | 0;
          this.DMACore.update();
        }
      };
      GameBoyAdvanceDMA0.prototype.enableDMAChannel = function() {
        if ((this.enabled | 0) == 1) {
          this.pending = 1;
        }
        this.wordCountShadow = this.wordCount | 0;
        this.sourceShadow = this.source | 0;
        this.destinationShadow = this.destination | 0;
        this.DMACore.update();
      };
      GameBoyAdvanceDMA0.prototype.handleDMACopy = function() {
        var source = this.sourceShadow | 0;
        var destination = this.destinationShadow | 0;
        if ((this.is32Bit | 0) == 4) {
          this.copy32(source | 0, destination | 0);
        } else {
          this.copy16(source | 0, destination | 0);
        }
      };
      GameBoyAdvanceDMA0.prototype.copy16 = function(source, destination) {
        source = source | 0;
        destination = destination | 0;
        var data = this.memory.memoryReadDMA16(source | 0) | 0;
        this.memory.memoryWriteDMA16(destination | 0, data | 0);
        this.decrementWordCount(source | 0, destination | 0, 2);
        this.DMACore.updateFetch(data | data << 16);
      };
      GameBoyAdvanceDMA0.prototype.copy32 = function(source, destination) {
        source = source | 0;
        destination = destination | 0;
        var data = this.memory.memoryReadDMA32(source | 0) | 0;
        this.memory.memoryWriteDMA32(destination | 0, data | 0);
        this.decrementWordCount(source | 0, destination | 0, 4);
        this.DMACore.updateFetch(data | 0);
      };
      GameBoyAdvanceDMA0.prototype.decrementWordCount = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        var wordCountShadow = (this.wordCountShadow | 0) - 1 & 16383;
        if ((wordCountShadow | 0) == 0) {
          wordCountShadow = this.finalizeDMA(source | 0, destination | 0, transferred | 0) | 0;
        } else {
          this.incrementDMAAddresses(source | 0, destination | 0, transferred | 0);
        }
        this.wordCountShadow = wordCountShadow | 0;
      };
      GameBoyAdvanceDMA0.prototype.finalizeDMA = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        var wordCountShadow = 0;
        this.pending = 0;
        if ((this.repeat | 0) == 0 || (this.enabled | 0) == 1) {
          this.enabled = 0;
        } else {
          wordCountShadow = this.wordCount | 0;
        }
        this.DMACore.update();
        this.checkIRQTrigger();
        this.finalDMAAddresses(source | 0, destination | 0, transferred | 0);
        return wordCountShadow | 0;
      };
      GameBoyAdvanceDMA0.prototype.checkIRQTrigger = function() {
        if ((this.irqFlagging | 0) == 64) {
          this.irq.requestIRQ(256);
        }
      };
      GameBoyAdvanceDMA0.prototype.finalDMAAddresses = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - (transferred | 0) | 0;
        }
        switch (this.destinationControl | 0) {
          case 0:
            this.destinationShadow = (destination | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.destinationShadow = (destination | 0) - (transferred | 0) | 0;
            break;
          case 3:
            this.destinationShadow = this.destination | 0;
        }
      };
      GameBoyAdvanceDMA0.prototype.incrementDMAAddresses = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - (transferred | 0) | 0;
        }
        switch (this.destinationControl | 0) {
          case 0:
          //Increment
          case 3:
            this.destinationShadow = (destination | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.destinationShadow = (destination | 0) - (transferred | 0) | 0;
        }
      };
      GameBoyAdvanceDMA0.prototype.nextEventTime = function() {
        var clocks = -1;
        switch (this.enabled | 0) {
          //V_BLANK
          case 2:
            clocks = this.gfx.nextVBlankEventTime() | 0;
            break;
          //H_BLANK:
          case 4:
            clocks = this.gfx.nextHBlankDMAEventTime() | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceDMA0.prototype.nextIRQEventTime = function() {
        var clocks = -1;
        if ((this.irqFlagging | 0) == 64) {
          clocks = this.nextEventTime() | 0;
        }
        return clocks | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/memory/GameBoyAdvanceDMA1Core.js
  var require_GameBoyAdvanceDMA1Core = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/memory/GameBoyAdvanceDMA1Core.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceDMA1;
      function GameBoyAdvanceDMA1(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceDMA1.prototype.DMA_ENABLE_TYPE = [
        //DMA Channel 1 Mapping:
        1,
        2,
        4,
        8
      ];
      GameBoyAdvanceDMA1.prototype.initialize = function() {
        this.enabled = 0;
        this.pending = 0;
        this.source = 0;
        this.sourceShadow = 0;
        this.destination = 0;
        this.destinationShadow = 0;
        this.wordCount = 0;
        this.wordCountShadow = 0;
        this.irqFlagging = 0;
        this.dmaType = 0;
        this.is32Bit = 0;
        this.repeat = 0;
        this.sourceControl = 0;
        this.destinationControl = 0;
        this.DMACore = this.IOCore.dma;
        this.memory = this.IOCore.memory;
        this.gfx = this.IOCore.gfx;
        this.irq = this.IOCore.irq;
        this.sound = this.IOCore.sound;
        this.wait = this.IOCore.wait;
      };
      GameBoyAdvanceDMA1.prototype.writeDMASource8_0 = function(data) {
        data = data | 0;
        this.source = this.source & 268435200;
        data = data & 255;
        this.source = this.source | data;
      };
      GameBoyAdvanceDMA1.prototype.writeDMASource8_1 = function(data) {
        data = data | 0;
        this.source = this.source & 268370175;
        data = data & 255;
        this.source = this.source | data << 8;
      };
      GameBoyAdvanceDMA1.prototype.writeDMASource8_2 = function(data) {
        data = data | 0;
        this.source = this.source & 251723775;
        data = data & 255;
        this.source = this.source | data << 16;
      };
      GameBoyAdvanceDMA1.prototype.writeDMASource8_3 = function(data) {
        data = data | 0;
        this.source = this.source & 16777215;
        data = data & 15;
        this.source = this.source | data << 24;
      };
      GameBoyAdvanceDMA1.prototype.writeDMASource16_0 = function(data) {
        data = data | 0;
        this.source = this.source & 268369920;
        data = data & 65535;
        this.source = this.source | data;
      };
      GameBoyAdvanceDMA1.prototype.writeDMASource16_1 = function(data) {
        data = data | 0;
        this.source = this.source & 65535;
        data = data & 4095;
        this.source = this.source | data << 16;
      };
      GameBoyAdvanceDMA1.prototype.writeDMASource32 = function(data) {
        data = data | 0;
        this.source = data & 268435455;
      };
      GameBoyAdvanceDMA1.prototype.writeDMADestination8_0 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134217472;
        data = data & 255;
        this.destination = this.destination | data;
      };
      GameBoyAdvanceDMA1.prototype.writeDMADestination8_1 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134152447;
        data = data & 255;
        this.destination = this.destination | data << 8;
      };
      GameBoyAdvanceDMA1.prototype.writeDMADestination8_2 = function(data) {
        data = data | 0;
        this.destination = this.destination & 117506047;
        data = data & 255;
        this.destination = this.destination | data << 16;
      };
      GameBoyAdvanceDMA1.prototype.writeDMADestination8_3 = function(data) {
        data = data | 0;
        this.destination = this.destination & 16777215;
        data = data & 7;
        this.destination = this.destination | data << 24;
      };
      GameBoyAdvanceDMA1.prototype.writeDMADestination16_0 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134152192;
        data = data & 65535;
        this.destination = this.destination | data;
      };
      GameBoyAdvanceDMA1.prototype.writeDMADestination16_1 = function(data) {
        data = data | 0;
        this.destination = this.destination & 65535;
        data = data & 2047;
        this.destination = this.destination | data << 16;
      };
      GameBoyAdvanceDMA1.prototype.writeDMADestination32 = function(data) {
        data = data | 0;
        this.destination = data & 134217727;
      };
      GameBoyAdvanceDMA1.prototype.writeDMAWordCount8_0 = function(data) {
        data = data | 0;
        this.wordCount = this.wordCount & 16128;
        data = data & 255;
        this.wordCount = this.wordCount | data;
      };
      GameBoyAdvanceDMA1.prototype.writeDMAWordCount8_1 = function(data) {
        data = data | 0;
        this.wordCount = this.wordCount & 255;
        data = data & 63;
        this.wordCount = this.wordCount | data << 8;
      };
      GameBoyAdvanceDMA1.prototype.writeDMAWordCount16 = function(data) {
        data = data | 0;
        this.wordCount = data & 16383;
      };
      GameBoyAdvanceDMA1.prototype.writeDMAControl8_0 = function(data) {
        data = data | 0;
        this.destinationControl = data >> 5 & 3;
        this.sourceControl = this.sourceControl & 2;
        this.sourceControl = this.sourceControl | data >> 7 & 1;
      };
      GameBoyAdvanceDMA1.prototype.writeDMAControl8_1 = function(data) {
        data = data | 0;
        this.IOCore.updateCoreClocking();
        this.sourceControl = this.sourceControl & 1 | (data & 1) << 1;
        this.repeat = data & 2;
        this.is32Bit = data & 4;
        this.dmaType = data >> 4 & 3;
        this.irqFlagging = data & 64;
        if ((data & 128) != 0) {
          if ((this.enabled | 0) == 0) {
            this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
            this.enableDMAChannel();
          }
        } else {
          this.enabled = 0;
          this.DMACore.update();
        }
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceDMA1.prototype.writeDMAControl16 = function(data) {
        data = data | 0;
        this.IOCore.updateCoreClocking();
        this.destinationControl = data >> 5 & 3;
        this.sourceControl = data >> 7 & 3;
        this.repeat = data >> 8 & 2;
        this.is32Bit = data >> 8 & 4;
        this.dmaType = data >> 12 & 3;
        this.irqFlagging = data >> 8 & 64;
        if ((data & 32768) != 0) {
          if ((this.enabled | 0) == 0) {
            this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
            this.enableDMAChannel();
          }
        } else {
          this.enabled = 0;
          this.DMACore.update();
        }
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceDMA1.prototype.writeDMAControl32 = function(data) {
        data = data | 0;
        this.writeDMAWordCount16(data | 0);
        this.writeDMAControl16(data >> 16);
      };
      GameBoyAdvanceDMA1.prototype.readDMAControl8_0 = function() {
        var data = this.destinationControl << 5;
        data = data | (this.sourceControl & 1) << 7;
        return data | 0;
      };
      GameBoyAdvanceDMA1.prototype.readDMAControl8_1 = function() {
        var data = this.sourceControl >> 1;
        data = data | this.repeat;
        data = data | this.is32Bit;
        data = data | this.dmaType << 4;
        data = data | this.irqFlagging;
        if ((this.enabled | 0) != 0) {
          data = data | 128;
        }
        return data | 0;
      };
      GameBoyAdvanceDMA1.prototype.readDMAControl16 = function() {
        var data = this.destinationControl << 5;
        data = data | this.sourceControl << 7;
        data = data | this.repeat << 8;
        data = data | this.is32Bit << 8;
        data = data | this.dmaType << 12;
        data = data | this.irqFlagging << 8;
        if ((this.enabled | 0) != 0) {
          data = data | 32768;
        }
        return data | 0;
      };
      GameBoyAdvanceDMA1.prototype.getMatchStatus = function() {
        return this.enabled & this.pending;
      };
      GameBoyAdvanceDMA1.prototype.soundFIFOARequest = function() {
        this.requestDMA(8);
      };
      GameBoyAdvanceDMA1.prototype.requestDMA = function(DMAType) {
        DMAType = DMAType | 0;
        if ((this.enabled & DMAType) > 0) {
          this.pending = DMAType | 0;
          this.DMACore.update();
        }
      };
      GameBoyAdvanceDMA1.prototype.enableDMAChannel = function() {
        if ((this.enabled | 0) == 8) {
          this.sound.checkFIFOAPendingSignal();
          this.wordCountShadow = 4;
        } else {
          if ((this.enabled | 0) == 1) {
            this.pending = 1;
          }
          this.wordCountShadow = this.wordCount | 0;
          this.destinationShadow = this.destination | 0;
        }
        this.sourceShadow = this.source | 0;
        this.DMACore.update();
      };
      GameBoyAdvanceDMA1.prototype.handleDMACopy = function() {
        var source = this.sourceShadow | 0;
        if ((this.enabled | 0) == 8) {
          this.copySound(source | 0);
        } else {
          var destination = this.destinationShadow | 0;
          if ((this.is32Bit | 0) == 4) {
            this.copy32(source | 0, destination | 0);
          } else {
            this.copy16(source | 0, destination | 0);
          }
        }
      };
      GameBoyAdvanceDMA1.prototype.copy16 = function(source, destination) {
        source = source | 0;
        destination = destination | 0;
        var data = this.memory.memoryRead16(source | 0) | 0;
        this.memory.memoryWriteDMA16(destination | 0, data | 0);
        this.decrementWordCount(source | 0, destination | 0, 2);
        this.DMACore.updateFetch(data | data << 16);
      };
      GameBoyAdvanceDMA1.prototype.copy32 = function(source, destination) {
        source = source | 0;
        destination = destination | 0;
        var data = this.memory.memoryRead32(source | 0) | 0;
        this.memory.memoryWriteDMA32(destination | 0, data | 0);
        this.decrementWordCount(source | 0, destination | 0, 4);
        this.DMACore.updateFetch(data | 0);
      };
      GameBoyAdvanceDMA1.prototype.copySound = function(source) {
        source = source | 0;
        var data = this.memory.memoryRead32(source | 0) | 0;
        this.wait.singleClock();
        this.IOCore.updateTimerClocking();
        this.sound.writeFIFOA32(data | 0);
        this.soundDMAUpdate(source | 0);
        this.DMACore.updateFetch(data | 0);
      };
      GameBoyAdvanceDMA1.prototype.decrementWordCount = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        var wordCountShadow = (this.wordCountShadow | 0) - 1 & 16383;
        if ((wordCountShadow | 0) == 0) {
          wordCountShadow = this.finalizeDMA(source | 0, destination | 0, transferred | 0) | 0;
        } else {
          this.incrementDMAAddresses(source | 0, destination | 0, transferred | 0);
        }
        this.wordCountShadow = wordCountShadow | 0;
      };
      GameBoyAdvanceDMA1.prototype.soundDMAUpdate = function(source) {
        source = source | 0;
        this.wordCountShadow = (this.wordCountShadow | 0) - 1 & 16383;
        if ((this.wordCountShadow | 0) == 0) {
          this.pending = 0;
          if ((this.repeat | 0) == 0) {
            this.enabled = 0;
          } else {
            this.wordCountShadow = 4;
          }
          this.sound.checkFIFOAPendingSignal();
          this.DMACore.update();
          this.checkIRQTrigger();
        }
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + 4 | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - 4 | 0;
        }
      };
      GameBoyAdvanceDMA1.prototype.finalizeDMA = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        var wordCountShadow = 0;
        this.pending = 0;
        if ((this.repeat | 0) == 0 || (this.enabled | 0) == 1) {
          this.enabled = 0;
        } else {
          wordCountShadow = this.wordCount | 0;
        }
        this.sound.checkFIFOAPendingSignal();
        this.DMACore.update();
        this.checkIRQTrigger();
        this.finalDMAAddresses(source | 0, destination | 0, transferred | 0);
        return wordCountShadow | 0;
      };
      GameBoyAdvanceDMA1.prototype.checkIRQTrigger = function() {
        if ((this.irqFlagging | 0) == 64) {
          this.irq.requestIRQ(512);
        }
      };
      GameBoyAdvanceDMA1.prototype.finalDMAAddresses = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - (transferred | 0) | 0;
        }
        switch (this.destinationControl | 0) {
          case 0:
            this.destinationShadow = (destination | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.destinationShadow = (destination | 0) - (transferred | 0) | 0;
            break;
          case 3:
            this.destinationShadow = this.destination | 0;
        }
      };
      GameBoyAdvanceDMA1.prototype.incrementDMAAddresses = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - (transferred | 0) | 0;
        }
        switch (this.destinationControl | 0) {
          case 0:
          //Increment
          case 3:
            this.destinationShadow = (destination | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.destinationShadow = (destination | 0) - (transferred | 0) | 0;
        }
      };
      GameBoyAdvanceDMA1.prototype.nextEventTime = function() {
        var clocks = -1;
        switch (this.enabled | 0) {
          //V_BLANK
          case 2:
            clocks = this.gfx.nextVBlankEventTime() | 0;
            break;
          //H_BLANK:
          case 4:
            clocks = this.gfx.nextHBlankDMAEventTime() | 0;
            break;
          //FIFO_A:
          case 8:
            clocks = this.sound.nextFIFOAEventTime() | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceDMA1.prototype.nextIRQEventTime = function() {
        var clocks = -1;
        if ((this.irqFlagging | 0) == 64) {
          clocks = this.nextEventTime() | 0;
        }
        return clocks | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/memory/GameBoyAdvanceDMA2Core.js
  var require_GameBoyAdvanceDMA2Core = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/memory/GameBoyAdvanceDMA2Core.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceDMA2;
      function GameBoyAdvanceDMA2(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceDMA2.prototype.DMA_ENABLE_TYPE = [
        //DMA Channel 2 Mapping:
        1,
        2,
        4,
        16
      ];
      GameBoyAdvanceDMA2.prototype.initialize = function() {
        this.enabled = 0;
        this.pending = 0;
        this.source = 0;
        this.sourceShadow = 0;
        this.destination = 0;
        this.destinationShadow = 0;
        this.wordCount = 0;
        this.wordCountShadow = 0;
        this.irqFlagging = 0;
        this.dmaType = 0;
        this.is32Bit = 0;
        this.repeat = 0;
        this.sourceControl = 0;
        this.destinationControl = 0;
        this.DMACore = this.IOCore.dma;
        this.memory = this.IOCore.memory;
        this.gfx = this.IOCore.gfx;
        this.irq = this.IOCore.irq;
        this.sound = this.IOCore.sound;
        this.wait = this.IOCore.wait;
      };
      GameBoyAdvanceDMA2.prototype.writeDMASource8_0 = function(data) {
        data = data | 0;
        this.source = this.source & 268435200;
        data = data & 255;
        this.source = this.source | data;
      };
      GameBoyAdvanceDMA2.prototype.writeDMASource8_1 = function(data) {
        data = data | 0;
        this.source = this.source & 268370175;
        data = data & 255;
        this.source = this.source | data << 8;
      };
      GameBoyAdvanceDMA2.prototype.writeDMASource8_2 = function(data) {
        data = data | 0;
        this.source = this.source & 251723775;
        data = data & 255;
        this.source = this.source | data << 16;
      };
      GameBoyAdvanceDMA2.prototype.writeDMASource8_3 = function(data) {
        data = data | 0;
        this.source = this.source & 16777215;
        data = data & 15;
        this.source = this.source | data << 24;
      };
      GameBoyAdvanceDMA2.prototype.writeDMASource16_0 = function(data) {
        data = data | 0;
        this.source = this.source & 268369920;
        data = data & 65535;
        this.source = this.source | data;
      };
      GameBoyAdvanceDMA2.prototype.writeDMASource16_1 = function(data) {
        data = data | 0;
        this.source = this.source & 65535;
        data = data & 4095;
        this.source = this.source | data << 16;
      };
      GameBoyAdvanceDMA2.prototype.writeDMASource32 = function(data) {
        data = data | 0;
        this.source = data & 268435455;
      };
      GameBoyAdvanceDMA2.prototype.writeDMADestination8_0 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134217472;
        data = data & 255;
        this.destination = this.destination | data;
      };
      GameBoyAdvanceDMA2.prototype.writeDMADestination8_1 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134152447;
        data = data & 255;
        this.destination = this.destination | data << 8;
      };
      GameBoyAdvanceDMA2.prototype.writeDMADestination8_2 = function(data) {
        data = data | 0;
        this.destination = this.destination & 117506047;
        data = data & 255;
        this.destination = this.destination | data << 16;
      };
      GameBoyAdvanceDMA2.prototype.writeDMADestination8_3 = function(data) {
        data = data | 0;
        this.destination = this.destination & 16777215;
        data = data & 7;
        this.destination = this.destination | data << 24;
      };
      GameBoyAdvanceDMA2.prototype.writeDMADestination16_0 = function(data) {
        data = data | 0;
        this.destination = this.destination & 134152192;
        data = data & 65535;
        this.destination = this.destination | data;
      };
      GameBoyAdvanceDMA2.prototype.writeDMADestination16_1 = function(data) {
        data = data | 0;
        this.destination = this.destination & 65535;
        data = data & 2047;
        this.destination = this.destination | data << 16;
      };
      GameBoyAdvanceDMA2.prototype.writeDMADestination32 = function(data) {
        data = data | 0;
        this.destination = data & 134217727;
      };
      GameBoyAdvanceDMA2.prototype.writeDMAWordCount8_0 = function(data) {
        data = data | 0;
        this.wordCount = this.wordCount & 16128;
        data = data & 255;
        this.wordCount = this.wordCount | data;
      };
      GameBoyAdvanceDMA2.prototype.writeDMAWordCount8_1 = function(data) {
        data = data | 0;
        this.wordCount = this.wordCount & 255;
        data = data & 63;
        this.wordCount = this.wordCount | data << 8;
      };
      GameBoyAdvanceDMA2.prototype.writeDMAWordCount16 = function(data) {
        data = data | 0;
        this.wordCount = data & 16383;
      };
      GameBoyAdvanceDMA2.prototype.writeDMAControl8_0 = function(data) {
        data = data | 0;
        this.destinationControl = data >> 5 & 3;
        this.sourceControl = this.sourceControl & 2;
        this.sourceControl = this.sourceControl | data >> 7 & 1;
      };
      GameBoyAdvanceDMA2.prototype.writeDMAControl8_1 = function(data) {
        data = data | 0;
        this.IOCore.updateCoreClocking();
        this.sourceControl = this.sourceControl & 1 | (data & 1) << 1;
        this.repeat = data & 2;
        this.is32Bit = data & 4;
        this.dmaType = data >> 4 & 3;
        this.irqFlagging = data & 64;
        if ((data & 128) != 0) {
          if ((this.enabled | 0) == 0) {
            this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
            this.enableDMAChannel();
          }
        } else {
          this.enabled = 0;
          this.DMACore.update();
        }
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceDMA2.prototype.writeDMAControl16 = function(data) {
        data = data | 0;
        this.IOCore.updateCoreClocking();
        this.destinationControl = data >> 5 & 3;
        this.sourceControl = data >> 7 & 3;
        this.repeat = data >> 8 & 2;
        this.is32Bit = data >> 8 & 4;
        this.dmaType = data >> 12 & 3;
        this.irqFlagging = data >> 8 & 64;
        if ((data & 32768) != 0) {
          if ((this.enabled | 0) == 0) {
            this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
            this.enableDMAChannel();
          }
        } else {
          this.enabled = 0;
          this.DMACore.update();
        }
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceDMA2.prototype.writeDMAControl32 = function(data) {
        data = data | 0;
        this.writeDMAWordCount16(data | 0);
        this.writeDMAControl16(data >> 16);
      };
      GameBoyAdvanceDMA2.prototype.readDMAControl8_0 = function() {
        var data = this.destinationControl << 5;
        data = data | (this.sourceControl & 1) << 7;
        return data | 0;
      };
      GameBoyAdvanceDMA2.prototype.readDMAControl8_1 = function() {
        var data = this.sourceControl >> 1;
        data = data | this.repeat;
        data = data | this.is32Bit;
        data = data | this.dmaType << 4;
        data = data | this.irqFlagging;
        if ((this.enabled | 0) != 0) {
          data = data | 128;
        }
        return data | 0;
      };
      GameBoyAdvanceDMA2.prototype.readDMAControl16 = function() {
        var data = this.destinationControl << 5;
        data = data | this.sourceControl << 7;
        data = data | this.repeat << 8;
        data = data | this.is32Bit << 8;
        data = data | this.dmaType << 12;
        data = data | this.irqFlagging << 8;
        if ((this.enabled | 0) != 0) {
          data = data | 32768;
        }
        return data | 0;
      };
      GameBoyAdvanceDMA2.prototype.getMatchStatus = function() {
        return this.enabled & this.pending;
      };
      GameBoyAdvanceDMA2.prototype.soundFIFOBRequest = function() {
        this.requestDMA(16);
      };
      GameBoyAdvanceDMA2.prototype.requestDMA = function(DMAType) {
        DMAType = DMAType | 0;
        if ((this.enabled & DMAType) > 0) {
          this.pending = DMAType | 0;
          this.DMACore.update();
        }
      };
      GameBoyAdvanceDMA2.prototype.enableDMAChannel = function() {
        if ((this.enabled | 0) == 16) {
          this.sound.checkFIFOBPendingSignal();
          this.wordCountShadow = 4;
        } else {
          if ((this.enabled | 0) == 1) {
            this.pending = 1;
          }
          this.wordCountShadow = this.wordCount | 0;
          this.destinationShadow = this.destination | 0;
        }
        this.sourceShadow = this.source | 0;
        this.DMACore.update();
      };
      GameBoyAdvanceDMA2.prototype.handleDMACopy = function() {
        var source = this.sourceShadow | 0;
        if ((this.enabled | 0) == 16) {
          this.copySound(source | 0);
        } else {
          var destination = this.destinationShadow | 0;
          if ((this.is32Bit | 0) == 4) {
            this.copy32(source | 0, destination | 0);
          } else {
            this.copy16(source | 0, destination | 0);
          }
        }
      };
      GameBoyAdvanceDMA2.prototype.copy16 = function(source, destination) {
        source = source | 0;
        destination = destination | 0;
        var data = this.memory.memoryRead16(source | 0) | 0;
        this.memory.memoryWriteDMA16(destination | 0, data | 0);
        this.decrementWordCount(source | 0, destination | 0, 2);
        this.DMACore.updateFetch(data | data << 16);
      };
      GameBoyAdvanceDMA2.prototype.copy32 = function(source, destination) {
        source = source | 0;
        destination = destination | 0;
        var data = this.memory.memoryRead32(source | 0) | 0;
        this.memory.memoryWriteDMA32(destination | 0, data | 0);
        this.decrementWordCount(source | 0, destination | 0, 4);
        this.DMACore.updateFetch(data | 0);
      };
      GameBoyAdvanceDMA2.prototype.copySound = function(source) {
        source = source | 0;
        var data = this.memory.memoryRead32(source | 0) | 0;
        this.wait.singleClock();
        this.IOCore.updateTimerClocking();
        this.sound.writeFIFOB32(data | 0);
        this.soundDMAUpdate(source | 0);
        this.DMACore.updateFetch(data | 0);
      };
      GameBoyAdvanceDMA2.prototype.decrementWordCount = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        var wordCountShadow = (this.wordCountShadow | 0) - 1 & 16383;
        if ((wordCountShadow | 0) == 0) {
          wordCountShadow = this.finalizeDMA(source | 0, destination | 0, transferred | 0) | 0;
        } else {
          this.incrementDMAAddresses(source | 0, destination | 0, transferred | 0);
        }
        this.wordCountShadow = wordCountShadow | 0;
      };
      GameBoyAdvanceDMA2.prototype.soundDMAUpdate = function(source) {
        source = source | 0;
        this.wordCountShadow = (this.wordCountShadow | 0) - 1 & 16383;
        if ((this.wordCountShadow | 0) == 0) {
          this.pending = 0;
          if ((this.repeat | 0) == 0) {
            this.enabled = 0;
          } else {
            this.wordCountShadow = 4;
          }
          this.sound.checkFIFOBPendingSignal();
          this.DMACore.update();
          this.checkIRQTrigger();
        }
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + 4 | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - 4 | 0;
        }
      };
      GameBoyAdvanceDMA2.prototype.finalizeDMA = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        var wordCountShadow = 0;
        this.pending = 0;
        if ((this.repeat | 0) == 0 || (this.enabled | 0) == 1) {
          this.enabled = 0;
        } else {
          wordCountShadow = this.wordCount | 0;
        }
        this.sound.checkFIFOBPendingSignal();
        this.DMACore.update();
        this.checkIRQTrigger();
        this.finalDMAAddresses(source | 0, destination | 0, transferred | 0);
        return wordCountShadow | 0;
      };
      GameBoyAdvanceDMA2.prototype.checkIRQTrigger = function() {
        if ((this.irqFlagging | 0) == 64) {
          this.irq.requestIRQ(1024);
        }
      };
      GameBoyAdvanceDMA2.prototype.finalDMAAddresses = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - (transferred | 0) | 0;
        }
        switch (this.destinationControl | 0) {
          case 0:
            this.destinationShadow = (destination | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.destinationShadow = (destination | 0) - (transferred | 0) | 0;
            break;
          case 3:
            this.destinationShadow = this.destination | 0;
        }
      };
      GameBoyAdvanceDMA2.prototype.incrementDMAAddresses = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - (transferred | 0) | 0;
        }
        switch (this.destinationControl | 0) {
          case 0:
          //Increment
          case 3:
            this.destinationShadow = (destination | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.destinationShadow = (destination | 0) - (transferred | 0) | 0;
        }
      };
      GameBoyAdvanceDMA2.prototype.nextEventTime = function() {
        var clocks = -1;
        switch (this.enabled | 0) {
          //V_BLANK
          case 2:
            clocks = this.gfx.nextVBlankEventTime() | 0;
            break;
          //H_BLANK:
          case 4:
            clocks = this.gfx.nextHBlankDMAEventTime() | 0;
            break;
          //FIFO_B:
          case 16:
            clocks = this.sound.nextFIFOBEventTime() | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceDMA2.prototype.nextIRQEventTime = function() {
        var clocks = -1;
        if ((this.irqFlagging | 0) == 64) {
          clocks = this.nextEventTime() | 0;
        }
        return clocks | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/memory/GameBoyAdvanceDMA3Core.js
  var require_GameBoyAdvanceDMA3Core = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/memory/GameBoyAdvanceDMA3Core.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceDMA3;
      function GameBoyAdvanceDMA3(IOCore) {
        this.IOCore = IOCore;
      }
      GameBoyAdvanceDMA3.prototype.DMA_ENABLE_TYPE = [
        //DMA Channel 3 Mapping:
        1,
        2,
        4,
        32
      ];
      GameBoyAdvanceDMA3.prototype.initialize = function() {
        this.enabled = 0;
        this.pending = 0;
        this.source = 0;
        this.sourceShadow = 0;
        this.destination = 0;
        this.destinationShadow = 0;
        this.wordCount = 0;
        this.wordCountShadow = 0;
        this.irqFlagging = 0;
        this.dmaType = 0;
        this.is32Bit = 0;
        this.repeat = 0;
        this.sourceControl = 0;
        this.destinationControl = 0;
        this.gamePakDMA = 0;
        this.displaySyncEnable = 0;
        this.DMACore = this.IOCore.dma;
        this.memory = this.IOCore.memory;
        this.gfx = this.IOCore.gfx;
        this.irq = this.IOCore.irq;
      };
      GameBoyAdvanceDMA3.prototype.writeDMASource8_0 = function(data) {
        data = data | 0;
        this.source = this.source & 268435200;
        data = data & 255;
        this.source = this.source | data;
      };
      GameBoyAdvanceDMA3.prototype.writeDMASource8_1 = function(data) {
        data = data | 0;
        this.source = this.source & 268370175;
        data = data & 255;
        this.source = this.source | data << 8;
      };
      GameBoyAdvanceDMA3.prototype.writeDMASource8_2 = function(data) {
        data = data | 0;
        this.source = this.source & 251723775;
        data = data & 255;
        this.source = this.source | data << 16;
      };
      GameBoyAdvanceDMA3.prototype.writeDMASource8_3 = function(data) {
        data = data | 0;
        this.source = this.source & 16777215;
        data = data & 15;
        this.source = this.source | data << 24;
      };
      GameBoyAdvanceDMA3.prototype.writeDMASource16_0 = function(data) {
        data = data | 0;
        this.source = this.source & 268369920;
        data = data & 65535;
        this.source = this.source | data;
      };
      GameBoyAdvanceDMA3.prototype.writeDMASource16_1 = function(data) {
        data = data | 0;
        this.source = this.source & 65535;
        data = data & 4095;
        this.source = this.source | data << 16;
      };
      GameBoyAdvanceDMA3.prototype.writeDMASource32 = function(data) {
        data = data | 0;
        this.source = data & 268435455;
      };
      GameBoyAdvanceDMA3.prototype.writeDMADestination8_0 = function(data) {
        data = data | 0;
        this.destination = this.destination & 268435200;
        data = data & 255;
        this.destination = this.destination | data;
      };
      GameBoyAdvanceDMA3.prototype.writeDMADestination8_1 = function(data) {
        data = data | 0;
        this.destination = this.destination & 268370175;
        data = data & 255;
        this.destination = this.destination | data << 8;
      };
      GameBoyAdvanceDMA3.prototype.writeDMADestination8_2 = function(data) {
        data = data | 0;
        this.destination = this.destination & 251723775;
        data = data & 255;
        this.destination = this.destination | data << 16;
      };
      GameBoyAdvanceDMA3.prototype.writeDMADestination8_3 = function(data) {
        data = data | 0;
        this.destination = this.destination & 16777215;
        data = data & 15;
        this.destination = this.destination | data << 24;
      };
      GameBoyAdvanceDMA3.prototype.writeDMADestination16_0 = function(data) {
        data = data | 0;
        this.destination = this.destination & 268369920;
        data = data & 65535;
        this.destination = this.destination | data;
      };
      GameBoyAdvanceDMA3.prototype.writeDMADestination16_1 = function(data) {
        data = data | 0;
        this.destination = this.destination & 65535;
        data = data & 4095;
        this.destination = this.destination | data << 16;
      };
      GameBoyAdvanceDMA3.prototype.writeDMADestination32 = function(data) {
        data = data | 0;
        this.destination = data & 268435455;
      };
      GameBoyAdvanceDMA3.prototype.writeDMAWordCount8_0 = function(data) {
        data = data | 0;
        this.wordCount = this.wordCount & 65280;
        data = data & 255;
        this.wordCount = this.wordCount | data;
      };
      GameBoyAdvanceDMA3.prototype.writeDMAWordCount8_1 = function(data) {
        data = data | 0;
        this.wordCount = this.wordCount & 255;
        data = data & 255;
        this.wordCount = this.wordCount | data << 8;
      };
      GameBoyAdvanceDMA3.prototype.writeDMAWordCount16 = function(data) {
        data = data | 0;
        this.wordCount = data & 65535;
      };
      GameBoyAdvanceDMA3.prototype.writeDMAControl8_0 = function(data) {
        data = data | 0;
        this.destinationControl = data >> 5 & 3;
        this.sourceControl = this.sourceControl & 2;
        this.sourceControl = this.sourceControl | data >> 7 & 1;
      };
      GameBoyAdvanceDMA3.prototype.writeDMAControl8_1 = function(data) {
        data = data | 0;
        this.IOCore.updateCoreClocking();
        this.sourceControl = this.sourceControl & 1 | (data & 1) << 1;
        this.repeat = data & 2;
        this.is32Bit = data & 4;
        this.gamePakDMA = data & 8;
        this.dmaType = data >> 4 & 3;
        this.irqFlagging = data & 64;
        if ((data & 128) != 0) {
          if ((this.enabled | 0) == 0) {
            this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
            this.enableDMAChannel();
          }
        } else {
          this.enabled = 0;
          this.DMACore.update();
        }
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceDMA3.prototype.writeDMAControl16 = function(data) {
        data = data | 0;
        this.IOCore.updateCoreClocking();
        this.destinationControl = data >> 5 & 3;
        this.sourceControl = data >> 7 & 3;
        this.repeat = data >> 8 & 2;
        this.is32Bit = data >> 8 & 4;
        this.gamePakDMA = data >> 8 & 8;
        this.dmaType = data >> 12 & 3;
        this.irqFlagging = data >> 8 & 64;
        if ((data & 32768) != 0) {
          if ((this.enabled | 0) == 0) {
            this.enabled = this.DMA_ENABLE_TYPE[this.dmaType | 0] | 0;
            this.enableDMAChannel();
          }
        } else {
          this.enabled = 0;
          this.DMACore.update();
        }
        this.IOCore.updateCoreEventTime();
      };
      GameBoyAdvanceDMA3.prototype.writeDMAControl32 = function(data) {
        data = data | 0;
        this.writeDMAWordCount16(data | 0);
        this.writeDMAControl16(data >> 16);
      };
      GameBoyAdvanceDMA3.prototype.readDMAControl8_0 = function() {
        var data = this.destinationControl << 5;
        data = data | (this.sourceControl & 1) << 7;
        return data | 0;
      };
      GameBoyAdvanceDMA3.prototype.readDMAControl8_1 = function() {
        var data = this.sourceControl >> 1;
        data = data | this.repeat;
        data = data | this.is32Bit;
        data = data | this.gamePakDMA;
        data = data | this.dmaType << 4;
        data = data | this.irqFlagging;
        if ((this.enabled | 0) != 0) {
          data = data | 128;
        }
        return data | 0;
      };
      GameBoyAdvanceDMA3.prototype.readDMAControl16 = function() {
        var data = this.destinationControl << 5;
        data = data | this.sourceControl << 7;
        data = data | this.repeat << 8;
        data = data | this.is32Bit << 8;
        data = data | this.gamePakDMA << 8;
        data = data | this.dmaType << 12;
        data = data | this.irqFlagging << 8;
        if ((this.enabled | 0) != 0) {
          data = data | 32768;
        }
        return data | 0;
      };
      GameBoyAdvanceDMA3.prototype.getMatchStatus = function() {
        return this.enabled & this.pending;
      };
      GameBoyAdvanceDMA3.prototype.gfxDisplaySyncRequest = function() {
        this.requestDMA(32);
      };
      GameBoyAdvanceDMA3.prototype.gfxDisplaySyncEnableCheck = function() {
        this.enabled &= ~32;
        this.requestDisplaySync();
        this.DMACore.update();
      };
      GameBoyAdvanceDMA3.prototype.requestDMA = function(DMAType) {
        DMAType = DMAType | 0;
        if ((this.enabled & DMAType) > 0) {
          this.pending = DMAType | 0;
          this.DMACore.update();
        }
      };
      GameBoyAdvanceDMA3.prototype.requestDisplaySync = function() {
        if ((this.displaySyncEnable | 0) != 0) {
          this.enabled = 32;
          this.displaySyncEnable = 0;
        }
      };
      GameBoyAdvanceDMA3.prototype.enableDMAChannel = function() {
        if ((this.enabled | 0) == 1) {
          this.pending = 1;
        } else if ((this.enabled | 0) == 32) {
          this.enabled = 0;
          this.displaySyncEnable = 1;
          return;
        }
        this.wordCountShadow = this.wordCount | 0;
        this.sourceShadow = this.source | 0;
        this.destinationShadow = this.destination | 0;
        this.DMACore.update();
      };
      GameBoyAdvanceDMA3.prototype.handleDMACopy = function() {
        var source = this.sourceShadow | 0;
        var destination = this.destinationShadow | 0;
        if ((this.is32Bit | 0) == 4) {
          this.copy32(source | 0, destination | 0);
        } else {
          this.copy16(source | 0, destination | 0);
        }
      };
      GameBoyAdvanceDMA3.prototype.copy16 = function(source, destination) {
        source = source | 0;
        destination = destination | 0;
        var data = this.memory.memoryRead16(source | 0) | 0;
        this.memory.memoryWrite16(destination | 0, data | 0);
        this.decrementWordCount(source | 0, destination | 0, 2);
        this.DMACore.updateFetch(data | data << 16);
      };
      GameBoyAdvanceDMA3.prototype.copy32 = function(source, destination) {
        source = source | 0;
        destination = destination | 0;
        var data = this.memory.memoryRead32(source | 0) | 0;
        this.memory.memoryWrite32(destination | 0, data | 0);
        this.decrementWordCount(source | 0, destination | 0, 4);
        this.DMACore.updateFetch(data | 0);
      };
      GameBoyAdvanceDMA3.prototype.decrementWordCount = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        var wordCountShadow = (this.wordCountShadow | 0) - 1 & 65535;
        if ((wordCountShadow | 0) == 0) {
          wordCountShadow = this.finalizeDMA(source | 0, destination | 0, transferred | 0) | 0;
        } else {
          this.incrementDMAAddresses(source | 0, destination | 0, transferred | 0);
        }
        this.wordCountShadow = wordCountShadow | 0;
      };
      GameBoyAdvanceDMA3.prototype.finalizeDMA = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        var wordCountShadow = 0;
        this.pending = 0;
        if ((this.repeat | 0) == 0 || (this.enabled | 0) == 1) {
          this.enabled = 0;
        } else {
          wordCountShadow = this.wordCount | 0;
        }
        this.DMACore.update();
        this.checkIRQTrigger();
        this.finalDMAAddresses(source | 0, destination | 0, transferred | 0);
        return wordCountShadow | 0;
      };
      GameBoyAdvanceDMA3.prototype.checkIRQTrigger = function() {
        if ((this.irqFlagging | 0) == 64) {
          this.irq.requestIRQ(2048);
        }
      };
      GameBoyAdvanceDMA3.prototype.finalDMAAddresses = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - (transferred | 0) | 0;
        }
        switch (this.destinationControl | 0) {
          case 0:
            this.destinationShadow = (destination | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.destinationShadow = (destination | 0) - (transferred | 0) | 0;
            break;
          case 3:
            this.destinationShadow = this.destination | 0;
        }
      };
      GameBoyAdvanceDMA3.prototype.incrementDMAAddresses = function(source, destination, transferred) {
        source = source | 0;
        destination = destination | 0;
        transferred = transferred | 0;
        switch (this.sourceControl | 0) {
          case 0:
          //Increment
          case 3:
            this.sourceShadow = (source | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.sourceShadow = (source | 0) - (transferred | 0) | 0;
        }
        switch (this.destinationControl | 0) {
          case 0:
          //Increment
          case 3:
            this.destinationShadow = (destination | 0) + (transferred | 0) | 0;
            break;
          case 1:
            this.destinationShadow = (destination | 0) - (transferred | 0) | 0;
        }
      };
      GameBoyAdvanceDMA3.prototype.nextEventTime = function() {
        var clocks = -1;
        switch (this.enabled | 0) {
          //V_BLANK
          case 2:
            clocks = this.gfx.nextVBlankEventTime() | 0;
            break;
          //H_BLANK:
          case 4:
            clocks = this.gfx.nextHBlankDMAEventTime() | 0;
            break;
          //DISPLAY_SYNC:
          case 32:
            clocks = this.gfx.nextDisplaySyncEventTime() | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceDMA3.prototype.nextIRQEventTime = function() {
        var clocks = -1;
        if ((this.irqFlagging | 0) == 64) {
          clocks = this.nextEventTime() | 0;
        }
        return clocks | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceIOCore.js
  var require_GameBoyAdvanceIOCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceIOCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceIO;
      var GameBoyAdvanceMemory = require_GameBoyAdvanceMemoryCore();
      var GameBoyAdvanceDMA = require_GameBoyAdvanceDMACore();
      var GameBoyAdvanceGraphics = require_GameBoyAdvanceGraphicsCore();
      var GameBoyAdvanceSound = require_GameBoyAdvanceSoundCore();
      var GameBoyAdvanceTimer = require_GameBoyAdvanceTimerCore();
      var GameBoyAdvanceIRQ = require_GameBoyAdvanceIRQCore();
      var GameBoyAdvanceSerial = require_GameBoyAdvanceSerialCore();
      var GameBoyAdvanceJoyPad = require_GameBoyAdvanceJoyPadCore();
      var GameBoyAdvanceCartridge = require_GameBoyAdvanceCartridgeCore();
      var GameBoyAdvanceSaves = require_GameBoyAdvanceSavesCore();
      var GameBoyAdvanceWait = require_GameBoyAdvanceWaitCore();
      var GameBoyAdvanceCPU = require_GameBoyAdvanceCPUCore();
      var GameBoyAdvanceDMA0 = require_GameBoyAdvanceDMA0Core();
      var GameBoyAdvanceDMA1 = require_GameBoyAdvanceDMA1Core();
      var GameBoyAdvanceDMA2 = require_GameBoyAdvanceDMA2Core();
      var GameBoyAdvanceDMA3 = require_GameBoyAdvanceDMA3Core();
      function GameBoyAdvanceIO(settings, coreExposed, BIOS, ROM) {
        this.systemStatus = 0;
        this.cyclesToIterate = 0;
        this.cyclesOveriteratedPreviously = 0;
        this.accumulatedClocks = 0;
        this.graphicsClocks = 0;
        this.timerClocks = 0;
        this.serialClocks = 0;
        this.nextEventClocks = 0;
        this.BIOSFound = false;
        this.settings = settings;
        this.coreExposed = coreExposed;
        this.BIOS = BIOS;
        this.ROM = ROM;
        this.memory = new GameBoyAdvanceMemory(this);
        this.dma = new GameBoyAdvanceDMA(this);
        this.dmaChannel0 = new GameBoyAdvanceDMA0(this);
        this.dmaChannel1 = new GameBoyAdvanceDMA1(this);
        this.dmaChannel2 = new GameBoyAdvanceDMA2(this);
        this.dmaChannel3 = new GameBoyAdvanceDMA3(this);
        this.gfx = new GameBoyAdvanceGraphics(this);
        this.sound = new GameBoyAdvanceSound(this);
        this.timer = new GameBoyAdvanceTimer(this);
        this.irq = new GameBoyAdvanceIRQ(this);
        this.serial = new GameBoyAdvanceSerial(this);
        this.joypad = new GameBoyAdvanceJoyPad(this);
        this.cartridge = new GameBoyAdvanceCartridge(this);
        this.saves = new GameBoyAdvanceSaves(this);
        this.wait = new GameBoyAdvanceWait(this);
        this.cpu = new GameBoyAdvanceCPU(this);
        this.memory.initialize();
        this.dma.initialize();
        this.dmaChannel0.initialize();
        this.dmaChannel1.initialize();
        this.dmaChannel2.initialize();
        this.dmaChannel3.initialize();
        this.gfx.initialize();
        this.sound.initialize();
        this.timer.initialize();
        this.irq.initialize();
        this.serial.initialize();
        this.joypad.initialize();
        this.cartridge.initialize();
        this.saves.initialize();
        this.wait.initialize();
        this.cpu.initialize();
      }
      GameBoyAdvanceIO.prototype.assignInstructionCoreReferences = function(ARM, THUMB) {
        this.ARM = ARM;
        this.THUMB = THUMB;
      };
      GameBoyAdvanceIO.prototype.enter = function(CPUCyclesTotal) {
        this.cyclesToIterate = (CPUCyclesTotal | 0) + (this.cyclesOveriteratedPreviously | 0) | 0;
        if ((this.cyclesToIterate | 0) > 0) {
          this.updateCoreEventTime();
          this.run();
          this.updateCoreClocking();
          this.sound.audioJIT();
        }
        this.cyclesOveriteratedPreviously = this.cyclesToIterate | 0;
      };
      GameBoyAdvanceIO.prototype.run = function() {
        while (true) {
          switch (this.systemStatus & 132) {
            case 0:
              this.runARM();
              break;
            case 4:
              this.runTHUMB();
              break;
            default:
              this.deflagIterationEnd();
              return;
          }
        }
      };
      GameBoyAdvanceIO.prototype.runARM = function() {
        while (true) {
          switch (this.systemStatus | 0) {
            case 0:
              this.ARM.executeIteration();
              break;
            case 1:
            case 2:
              this.ARM.executeBubble();
              this.tickBubble();
              break;
            default:
              switch (this.systemStatus >> 2) {
                case 2:
                  this.handleIRQARM();
                  break;
                case 4:
                case 6:
                //DMA Handle State
                case 12:
                case 14:
                  this.handleDMA();
                  break;
                case 8:
                case 10:
                  this.handleHalt();
                  break;
                default:
                  if ((this.systemStatus & 132) != 0) {
                    return;
                  }
                  this.handleStop();
              }
          }
        }
      };
      GameBoyAdvanceIO.prototype.runTHUMB = function() {
        while (true) {
          switch (this.systemStatus | 0) {
            case 4:
              this.THUMB.executeIteration();
              break;
            case 5:
            case 6:
              this.THUMB.executeBubble();
              this.tickBubble();
              break;
            default:
              switch (this.systemStatus >> 2) {
                case 3:
                  this.handleIRQThumb();
                  break;
                case 5:
                case 7:
                //DMA Handle State
                case 13:
                case 15:
                  this.handleDMA();
                  break;
                case 9:
                case 17:
                  this.handleHalt();
                  break;
                default:
                  if ((this.systemStatus & 132) != 4) {
                    return;
                  }
                  this.handleStop();
              }
          }
        }
      };
      GameBoyAdvanceIO.prototype.updateCore = function(clocks) {
        clocks = clocks | 0;
        this.accumulatedClocks = (this.accumulatedClocks | 0) + (clocks | 0) | 0;
        if ((this.accumulatedClocks | 0) >= (this.nextEventClocks | 0)) {
          this.updateCoreSpill();
        }
      };
      GameBoyAdvanceIO.prototype.updateCoreSingle = function() {
        this.accumulatedClocks = (this.accumulatedClocks | 0) + 1 | 0;
        if ((this.accumulatedClocks | 0) >= (this.nextEventClocks | 0)) {
          this.updateCoreSpill();
        }
      };
      GameBoyAdvanceIO.prototype.updateCoreSpill = function() {
        this.updateCoreClocking();
        this.updateCoreEventTime();
      };
      GameBoyAdvanceIO.prototype.updateCoreSpillRetain = function() {
        this.nextEventClocks = (this.nextEventClocks | 0) - (this.accumulatedClocks | 0) | 0;
        this.updateCoreClocking();
      };
      GameBoyAdvanceIO.prototype.updateCoreClocking = function() {
        var clocks = this.accumulatedClocks | 0;
        this.cyclesToIterate = (this.cyclesToIterate | 0) - (clocks | 0) | 0;
        this.gfx.addClocks((clocks | 0) - (this.graphicsClocks | 0) | 0);
        this.timer.addClocks((clocks | 0) - (this.timerClocks | 0) | 0);
        this.serial.addClocks((clocks | 0) - (this.serialClocks | 0) | 0);
        this.accumulatedClocks = 0;
        this.graphicsClocks = 0;
        this.timerClocks = 0;
        this.serialClocks = 0;
      };
      GameBoyAdvanceIO.prototype.updateGraphicsClocking = function() {
        this.gfx.addClocks((this.accumulatedClocks | 0) - (this.graphicsClocks | 0) | 0);
        this.graphicsClocks = this.accumulatedClocks | 0;
      };
      GameBoyAdvanceIO.prototype.updateTimerClocking = function() {
        this.timer.addClocks((this.accumulatedClocks | 0) - (this.timerClocks | 0) | 0);
        this.timerClocks = this.accumulatedClocks | 0;
      };
      GameBoyAdvanceIO.prototype.updateSerialClocking = function() {
        this.serial.addClocks((this.accumulatedClocks | 0) - (this.serialClocks | 0) | 0);
        this.serialClocks = this.accumulatedClocks | 0;
      };
      GameBoyAdvanceIO.prototype.updateCoreEventTime = function() {
        this.nextEventClocks = this.cyclesUntilNextEvent() | 0;
      };
      GameBoyAdvanceIO.prototype.getRemainingCycles = function() {
        if ((this.cyclesToIterate | 0) < 1) {
          this.flagIterationEnd();
          return 0;
        }
        return this.cyclesToIterate | 0;
      };
      GameBoyAdvanceIO.prototype.handleIRQARM = function() {
        if ((this.systemStatus | 0) > 8) {
          this.ARM.executeBubble();
          this.tickBubble();
        } else {
          this.cpu.IRQinARM();
        }
      };
      GameBoyAdvanceIO.prototype.handleIRQThumb = function() {
        if ((this.systemStatus | 0) > 12) {
          this.THUMB.executeBubble();
          this.tickBubble();
        } else {
          this.cpu.IRQinTHUMB();
        }
      };
      GameBoyAdvanceIO.prototype.handleDMA = function() {
        do {
          this.dma.perform();
        } while ((this.systemStatus & 144) == 16);
      };
      GameBoyAdvanceIO.prototype.handleHalt = function() {
        if (!this.irq.IRQMatch()) {
          this.updateCore(this.cyclesUntilNextHALTEvent() | 0);
        } else {
          this.deflagHalt();
        }
      };
      GameBoyAdvanceIO.prototype.handleStop = function() {
        this.sound.addClocks(this.getRemainingCycles() | 0);
        this.cyclesToIterate = 0;
      };
      GameBoyAdvanceIO.prototype.cyclesUntilNextHALTEvent = function() {
        var haltClocks = this.irq.nextEventTime() | 0;
        var dmaClocks = this.dma.nextEventTime() | 0;
        return this.solveClosestTime(haltClocks | 0, dmaClocks | 0) | 0;
      };
      GameBoyAdvanceIO.prototype.cyclesUntilNextEvent = function() {
        var irqClocks = this.irq.nextIRQEventTime() | 0;
        var dmaClocks = this.dma.nextEventTime() | 0;
        return this.solveClosestTime(irqClocks | 0, dmaClocks | 0) | 0;
      };
      GameBoyAdvanceIO.prototype.solveClosestTime = function(clocks1, clocks2) {
        clocks1 = clocks1 | 0;
        clocks2 = clocks2 | 0;
        var clocks = this.getRemainingCycles() | 0;
        if ((clocks1 | 0) >= 0) {
          if ((clocks2 | 0) >= 0) {
            clocks = Math.min(clocks | 0, clocks1 | 0, clocks2 | 0) | 0;
          } else {
            clocks = Math.min(clocks | 0, clocks1 | 0) | 0;
          }
        } else if (clocks2 >= 0) {
          clocks = Math.min(clocks | 0, clocks2 | 0) | 0;
        }
        return clocks | 0;
      };
      GameBoyAdvanceIO.prototype.flagBubble = function() {
        this.systemStatus = this.systemStatus | 2;
      };
      GameBoyAdvanceIO.prototype.tickBubble = function() {
        this.systemStatus = (this.systemStatus | 0) - 1 | 0;
      };
      GameBoyAdvanceIO.prototype.flagTHUMB = function() {
        this.systemStatus = this.systemStatus | 4;
      };
      GameBoyAdvanceIO.prototype.deflagTHUMB = function() {
        this.systemStatus = this.systemStatus & 251;
      };
      GameBoyAdvanceIO.prototype.flagIRQ = function() {
        this.systemStatus = this.systemStatus | 8;
      };
      GameBoyAdvanceIO.prototype.deflagIRQ = function() {
        this.systemStatus = this.systemStatus & 247;
      };
      GameBoyAdvanceIO.prototype.flagDMA = function() {
        this.systemStatus = this.systemStatus | 16;
      };
      GameBoyAdvanceIO.prototype.deflagDMA = function() {
        this.systemStatus = this.systemStatus & 239;
      };
      GameBoyAdvanceIO.prototype.flagHalt = function() {
        this.systemStatus = this.systemStatus | 32;
      };
      GameBoyAdvanceIO.prototype.deflagHalt = function() {
        this.systemStatus = this.systemStatus & 223;
      };
      GameBoyAdvanceIO.prototype.flagStop = function() {
        this.systemStatus = this.systemStatus | 64;
      };
      GameBoyAdvanceIO.prototype.deflagStop = function() {
        this.systemStatus = this.systemStatus & 191;
      };
      GameBoyAdvanceIO.prototype.flagIterationEnd = function() {
        this.systemStatus = this.systemStatus | 128;
      };
      GameBoyAdvanceIO.prototype.deflagIterationEnd = function() {
        this.systemStatus = this.systemStatus & 127;
      };
      GameBoyAdvanceIO.prototype.isStopped = function() {
        return (this.systemStatus & 64) == 64;
      };
      GameBoyAdvanceIO.prototype.inDMA = function() {
        return (this.systemStatus & 16) == 16;
      };
      GameBoyAdvanceIO.prototype.getCurrentFetchValue = function() {
        var fetch = 0;
        if ((this.systemStatus & 16) == 0) {
          fetch = this.cpu.getCurrentFetchValue() | 0;
        } else {
          fetch = this.dma.getCurrentFetchValue() | 0;
        }
        return fetch | 0;
      };
    }
  });

  // node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceEmulatorCore.js
  var require_GameBoyAdvanceEmulatorCore = __commonJS({
    "node_modules/iodine-gba/IodineGBA/IodineGBA/GameBoyAdvanceEmulatorCore.js"(exports, module) {
      "use strict";
      module.exports = GameBoyAdvanceEmulator;
      var GameBoyAdvanceIO = require_GameBoyAdvanceIOCore();
      var TypedArrayShim = require_TypedArrayShim();
      var getUint8Array = TypedArrayShim.getUint8Array;
      var getInt32Array = TypedArrayShim.getInt32Array;
      var getFloat32Array = TypedArrayShim.getFloat32Array;
      function GameBoyAdvanceEmulator() {
        this.settings = {
          "SKIPBoot": false,
          //Skip the BIOS boot screen.
          "audioVolume": 1,
          //Starting audio volume.
          "audioBufferUnderrunLimit": 8,
          //Audio buffer minimum span amount over x interpreter iterations.
          "audioBufferDynamicLimit": 2,
          //Audio buffer dynamic minimum span amount over x interpreter iterations.
          "audioBufferSize": 20,
          //Audio buffer maximum span amount over x interpreter iterations.
          "timerIntervalRate": 16,
          //How often the emulator core is called into (in milliseconds).
          "emulatorSpeed": 1,
          //Speed multiplier of the emulator.
          "metricCollectionMinimum": 30,
          //How many cycles to collect before determining speed.
          "dynamicSpeed": true
          //Whether to actively change the target speed for best user experience.
        };
        this.audioFound = false;
        this.loaded = false;
        this.faultFound = false;
        this.paused = true;
        this.offscreenWidth = 240;
        this.offscreenHeight = 160;
        this.BIOS = [];
        this.ROM = [];
        this.offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 3;
        this.frameBuffer = getInt32Array(this.offscreenRGBCount);
        this.swizzledFrame = getUint8Array(this.offscreenRGBCount);
        this.audioUpdateState = false;
        this.saveExportHandler = null;
        this.saveImportHandler = null;
        this.speedCallback = null;
        this.graphicsFrameCallback = null;
        this.clockCyclesSinceStart = 0;
        this.metricCollectionCounted = 0;
        this.metricStart = null;
        this.dynamicSpeedCounter = 0;
        this.audioNumSamplesTotal = 0;
        this.calculateTimings();
        this.generateCoreExposed();
      }
      GameBoyAdvanceEmulator.prototype.generateCoreExposed = function() {
        var parentObj = this;
        this.coreExposed = {
          "outputAudio": function(l, r) {
            parentObj.outputAudio(l, r);
          },
          "frameBuffer": parentObj.frameBuffer,
          "prepareFrame": function() {
            parentObj.prepareFrame();
          }
        };
      };
      GameBoyAdvanceEmulator.prototype.play = function() {
        if (this.paused) {
          this.startTimer();
          this.paused = false;
          if (!this.loaded && this.BIOS && this.ROM) {
            this.initializeCore();
            this.loaded = true;
            this.importSave();
          }
        }
      };
      GameBoyAdvanceEmulator.prototype.pause = function() {
        if (!this.paused) {
          this.clearTimer();
          this.exportSave();
          this.paused = true;
        }
      };
      GameBoyAdvanceEmulator.prototype.stop = function() {
        this.faultFound = false;
        this.loaded = false;
        this.audioUpdateState = this.audioFound;
        this.pause();
      };
      GameBoyAdvanceEmulator.prototype.restart = function() {
        if (this.loaded) {
          this.faultFound = false;
          this.exportSave();
          this.initializeCore();
          this.importSave();
          this.audioUpdateState = this.audioFound;
          this.setSpeed(1);
        }
      };
      GameBoyAdvanceEmulator.prototype.clearTimer = function() {
        clearInterval(this.timer);
        this.resetMetrics();
      };
      GameBoyAdvanceEmulator.prototype.startTimer = function() {
        this.clearTimer();
        var parentObj = this;
        this.timer = setInterval(function() {
          parentObj.timerCallback();
        }, this.settings.timerIntervalRate);
      };
      GameBoyAdvanceEmulator.prototype.timerCallback = function() {
        if (!document.hidden && !document.msHidden && !document.mozHidden && !document.webkitHidden) {
          if (!this.faultFound && this.loaded) {
            this.iterationStartSequence();
            this.IOCore.enter(this.CPUCyclesTotal | 0);
            this.iterationEndSequence();
          } else {
            this.pause();
          }
        }
      };
      GameBoyAdvanceEmulator.prototype.iterationStartSequence = function() {
        this.calculateSpeedPercentage();
        this.faultFound = true;
        this.audioUnderrunAdjustment();
        this.audioPushNewState();
      };
      GameBoyAdvanceEmulator.prototype.iterationEndSequence = function() {
        this.faultFound = false;
        this.clockCyclesSinceStart += this.CPUCyclesTotal;
      };
      GameBoyAdvanceEmulator.prototype.attachROM = function(ROM) {
        this.stop();
        this.ROM = ROM;
      };
      GameBoyAdvanceEmulator.prototype.attachBIOS = function(BIOS) {
        this.stop();
        this.BIOS = BIOS;
      };
      GameBoyAdvanceEmulator.prototype.getGameName = function() {
        if (!this.faultFound && this.loaded) {
          return this.IOCore.cartridge.name;
        } else {
          return "";
        }
      };
      GameBoyAdvanceEmulator.prototype.attachSaveExportHandler = function(handler) {
        if (typeof handler == "function") {
          this.saveExportHandler = handler;
        }
      };
      GameBoyAdvanceEmulator.prototype.attachSaveImportHandler = function(handler) {
        if (typeof handler == "function") {
          this.saveImportHandler = handler;
        }
      };
      GameBoyAdvanceEmulator.prototype.attachSpeedHandler = function(handler) {
        if (typeof handler == "function") {
          this.speedCallback = handler;
        }
      };
      GameBoyAdvanceEmulator.prototype.importSave = function() {
        if (this.saveImportHandler) {
          var name = this.getGameName();
          if (name != "") {
            var save = this.saveImportHandler(name);
            var saveType = this.saveImportHandler("TYPE_" + name);
            if (save && saveType && !this.faultFound && this.loaded) {
              var length = save.length | 0;
              var convertedSave = getUint8Array(length | 0);
              if ((length | 0) > 0) {
                for (var index = 0; (index | 0) < (length | 0); index = (index | 0) + 1 | 0) {
                  convertedSave[index | 0] = save[index | 0] & 255;
                }
                this.IOCore.saves.importSave(convertedSave, saveType | 0);
              }
            }
          }
        }
      };
      GameBoyAdvanceEmulator.prototype.exportSave = function() {
        if (this.saveExportHandler && !this.faultFound && this.loaded) {
          var save = this.IOCore.saves.exportSave();
          var saveType = this.IOCore.saves.exportSaveType();
          if (save != null && saveType != null) {
            this.saveExportHandler(this.IOCore.cartridge.name, save);
            this.saveExportHandler("TYPE_" + this.IOCore.cartridge.name, saveType | 0);
          }
        }
      };
      GameBoyAdvanceEmulator.prototype.setSpeed = function(speed) {
        var speed = Math.min(Math.max(parseFloat(speed), 0.01), 10);
        this.resetMetrics();
        if (speed != this.settings.emulatorSpeed) {
          this.settings.emulatorSpeed = speed;
          this.calculateTimings();
          this.reinitializeAudio();
        }
      };
      GameBoyAdvanceEmulator.prototype.incrementSpeed = function(delta) {
        this.setSpeed(parseFloat(delta) + this.settings.emulatorSpeed);
      };
      GameBoyAdvanceEmulator.prototype.getSpeed = function(speed) {
        return this.settings.emulatorSpeed;
      };
      GameBoyAdvanceEmulator.prototype.changeCoreTimer = function(newTimerIntervalRate) {
        this.settings.timerIntervalRate = Math.max(parseInt(newTimerIntervalRate, 10), 1);
        if (!this.paused) {
          this.clearTimer();
          this.startTimer();
        }
        this.calculateTimings();
        this.reinitializeAudio();
      };
      GameBoyAdvanceEmulator.prototype.resetMetrics = function() {
        this.clockCyclesSinceStart = 0;
        this.metricCollectionCounted = 0;
        this.metricStart = /* @__PURE__ */ new Date();
      };
      GameBoyAdvanceEmulator.prototype.calculateTimings = function() {
        this.clocksPerSecond = this.settings.emulatorSpeed * 16777216;
        this.CPUCyclesTotal = this.CPUCyclesPerIteration = this.clocksPerSecond / 1e3 * this.settings.timerIntervalRate | 0;
        this.dynamicSpeedCounter = 0;
      };
      GameBoyAdvanceEmulator.prototype.calculateSpeedPercentage = function() {
        if (this.metricStart) {
          if (this.metricCollectionCounted >= this.settings.metricCollectionMinimum) {
            if (this.speedCallback) {
              var metricEnd = /* @__PURE__ */ new Date();
              var timeDiff = Math.max(metricEnd.getTime() - this.metricStart.getTime(), 1);
              var result = this.settings.timerIntervalRate * this.clockCyclesSinceStart / timeDiff / this.CPUCyclesPerIteration * 100;
              this.speedCallback(result.toFixed(2) + "%");
            }
            this.resetMetrics();
          }
        } else {
          this.resetMetrics();
        }
        ++this.metricCollectionCounted;
      };
      GameBoyAdvanceEmulator.prototype.initializeCore = function() {
        this.IOCore = new GameBoyAdvanceIO(this.settings, this.coreExposed, this.BIOS, this.ROM);
      };
      GameBoyAdvanceEmulator.prototype.keyDown = function(keyPressed) {
        if (!this.paused) {
          this.IOCore.joypad.keyPress(keyPressed);
        }
      };
      GameBoyAdvanceEmulator.prototype.keyUp = function(keyReleased) {
        if (!this.paused) {
          this.IOCore.joypad.keyRelease(keyReleased);
        }
      };
      GameBoyAdvanceEmulator.prototype.attachGraphicsFrameHandler = function(handler) {
        if (typeof handler == "function") {
          this.graphicsFrameCallback = handler;
        }
      };
      GameBoyAdvanceEmulator.prototype.attachAudioHandler = function(mixerInputHandler) {
        if (mixerInputHandler) {
          this.audio = mixerInputHandler;
        }
      };
      GameBoyAdvanceEmulator.prototype.swizzleFrameBuffer = function() {
        var bufferIndex = 0;
        for (var canvasIndex = 0; canvasIndex < this.offscreenRGBCount; ) {
          this.swizzledFrame[canvasIndex++] = (this.frameBuffer[bufferIndex] & 31) << 3;
          this.swizzledFrame[canvasIndex++] = (this.frameBuffer[bufferIndex] & 992) >> 2;
          this.swizzledFrame[canvasIndex++] = (this.frameBuffer[bufferIndex++] & 31744) >> 7;
        }
      };
      GameBoyAdvanceEmulator.prototype.prepareFrame = function() {
        this.swizzleFrameBuffer();
        this.requestDraw();
      };
      GameBoyAdvanceEmulator.prototype.requestDraw = function() {
        if (this.graphicsFrameCallback) {
          this.graphicsFrameCallback(this.swizzledFrame);
        }
      };
      GameBoyAdvanceEmulator.prototype.enableAudio = function() {
        if (!this.audioFound && this.audio) {
          this.audioResamplerFirstPassFactor = Math.max(Math.min(Math.floor(this.clocksPerSecond / 44100), Math.floor(2147483647 / 1023)), 1);
          this.audioDownSampleInputDivider = 2 / 1023 / this.audioResamplerFirstPassFactor;
          this.audioSetState(true);
          var parentObj = this;
          this.audio.initialize(2, this.clocksPerSecond / this.audioResamplerFirstPassFactor, Math.max(this.CPUCyclesPerIteration * this.settings.audioBufferSize / this.audioResamplerFirstPassFactor, 8192) << 1, this.settings.audioVolume, function() {
            parentObj.disableAudio();
          });
          this.audio.register();
          if (this.audioFound) {
            this.initializeAudioBuffering();
          }
        }
      };
      GameBoyAdvanceEmulator.prototype.disableAudio = function() {
        if (this.audioFound) {
          this.audio.unregister();
          this.audioSetState(false);
          this.calculateTimings();
        }
      };
      GameBoyAdvanceEmulator.prototype.initializeAudioBuffering = function() {
        this.audioDestinationPosition = 0;
        this.audioBufferContainAmount = Math.max(this.CPUCyclesPerIteration * this.settings.audioBufferUnderrunLimit / this.audioResamplerFirstPassFactor, 4096) << 1;
        this.audioBufferDynamicContainAmount = Math.max(this.CPUCyclesPerIteration * this.settings.audioBufferDynamicLimit / this.audioResamplerFirstPassFactor, 2048) << 1;
        var audioNumSamplesTotal = Math.max(this.CPUCyclesPerIteration / this.audioResamplerFirstPassFactor, 1) << 1;
        if (audioNumSamplesTotal != this.audioNumSamplesTotal) {
          this.audioNumSamplesTotal = audioNumSamplesTotal;
          this.audioBuffer = getFloat32Array(this.audioNumSamplesTotal);
        }
      };
      GameBoyAdvanceEmulator.prototype.changeVolume = function(newVolume) {
        this.settings.audioVolume = Math.min(Math.max(parseFloat(newVolume), 0), 1);
        if (this.audioFound) {
          this.audio.changeVolume(this.settings.audioVolume);
        }
      };
      GameBoyAdvanceEmulator.prototype.incrementVolume = function(delta) {
        this.changeVolume(parseFloat(delta) + this.settings.audioVolume);
      };
      GameBoyAdvanceEmulator.prototype.outputAudio = function(downsampleInputLeft, downsampleInputRight) {
        downsampleInputLeft = downsampleInputLeft | 0;
        downsampleInputRight = downsampleInputRight | 0;
        this.audioBuffer[this.audioDestinationPosition++] = downsampleInputLeft * this.audioDownSampleInputDivider - 1;
        this.audioBuffer[this.audioDestinationPosition++] = downsampleInputRight * this.audioDownSampleInputDivider - 1;
        if (this.audioDestinationPosition == this.audioNumSamplesTotal) {
          this.audio.push(this.audioBuffer);
          this.audioDestinationPosition = 0;
        }
      };
      GameBoyAdvanceEmulator.prototype.audioUnderrunAdjustment = function() {
        this.CPUCyclesTotal = this.CPUCyclesPerIteration | 0;
        if (this.audioFound) {
          var remainingAmount = this.audio.remainingBuffer();
          if (typeof remainingAmount == "number") {
            remainingAmount = Math.max(remainingAmount, 0);
            var underrunAmount = this.audioBufferContainAmount - remainingAmount;
            if (underrunAmount > 0) {
              if (this.settings.dynamicSpeed) {
                if (this.dynamicSpeedCounter > this.settings.metricCollectionMinimum) {
                  if (this.audioBufferDynamicContainAmount - remainingAmount > 0) {
                    var speed = this.getSpeed();
                    speed = Math.max(speed - 0.1, 0.1);
                    this.setSpeed(speed);
                  } else {
                    this.dynamicSpeedCounter = this.settings.metricCollectionMinimum;
                  }
                }
                this.dynamicSpeedCounter++;
              }
              this.CPUCyclesTotal = Math.min((this.CPUCyclesTotal | 0) + (underrunAmount >> 1) * this.audioResamplerFirstPassFactor | 0, this.CPUCyclesTotal << 1, 2147483647) | 0;
            } else if (this.settings.dynamicSpeed) {
              if (this.dynamicSpeedCounter > this.settings.metricCollectionMinimum) {
                var speed = this.getSpeed();
                if (speed < 1) {
                  speed = Math.min(speed + 0.05, 1);
                  this.setSpeed(speed);
                } else {
                  this.dynamicSpeedCounter = this.settings.metricCollectionMinimum;
                }
              }
              this.dynamicSpeedCounter++;
            }
          }
        }
      };
      GameBoyAdvanceEmulator.prototype.audioPushNewState = function() {
        if (this.audioUpdateState) {
          this.IOCore.sound.initializeOutput(this.audioFound, this.audioResamplerFirstPassFactor | 0);
          this.audioUpdateState = false;
        }
      };
      GameBoyAdvanceEmulator.prototype.audioSetState = function(audioFound) {
        if (this.audioFound != audioFound) {
          this.audioFound = audioFound;
          this.audioUpdateState = true;
        }
      };
      GameBoyAdvanceEmulator.prototype.reinitializeAudio = function() {
        if (this.audioFound) {
          this.disableAudio();
          this.enableAudio();
        }
      };
      GameBoyAdvanceEmulator.prototype.enableSkipBootROM = function() {
        this.settings.SKIPBoot = true;
      };
      GameBoyAdvanceEmulator.prototype.disableSkipBootROM = function() {
        this.settings.SKIPBoot = false;
      };
      GameBoyAdvanceEmulator.prototype.enableDynamicSpeed = function() {
        this.settings.dynamicSpeed = true;
      };
      GameBoyAdvanceEmulator.prototype.disableDynamicSpeed = function() {
        this.settings.dynamicSpeed = false;
        this.setSpeed(1);
      };
    }
  });

  // node_modules/iodine-gba/user_scripts/IodineGBAGraphicsGlueCode.js
  var require_IodineGBAGraphicsGlueCode = __commonJS({
    "node_modules/iodine-gba/user_scripts/IodineGBAGraphicsGlueCode.js"(exports, module) {
      "use strict";
      module.exports = GlueCodeGfx;
      var getUint8Array = require_TypedArrayShim().getUint8Array;
      function GlueCodeGfx() {
        this.didRAF = false;
        this.graphicsFound = 0;
        this.offscreenWidth = 240;
        this.offscreenHeight = 160;
        this.doSmoothing = true;
        var offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 3;
        this.swizzledFrameFree = [getUint8Array(offscreenRGBCount), getUint8Array(offscreenRGBCount)];
        this.swizzledFrameReady = [];
        this.initializeGraphicsBuffer();
      }
      GlueCodeGfx.prototype.attachCanvas = function(canvas) {
        this.canvas = canvas;
        this.graphicsFound = this.initializeCanvasTarget();
        this.setSmoothScaling(this.doSmoothing);
      };
      GlueCodeGfx.prototype.detachCanvas = function() {
        this.canvas = null;
      };
      GlueCodeGfx.prototype.recomputeDimension = function() {
        this.canvasLastWidth = this.canvas.clientWidth;
        this.canvasLastHeight = this.canvas.clientHeight;
        if (window.mozRequestAnimationFrame) {
          this.onscreenWidth = this.canvas.width = this.offscreenWidth;
          this.onscreenHeight = this.canvas.height = this.offscreenHeight;
        } else {
          this.onscreenWidth = this.canvas.width = this.canvas.clientWidth;
          this.onscreenHeight = this.canvas.height = this.canvas.clientHeight;
        }
      };
      GlueCodeGfx.prototype.initializeCanvasTarget = function() {
        try {
          this.recomputeDimension();
          this.canvasOffscreen = document.createElement("canvas");
          this.canvasOffscreen.width = this.offscreenWidth;
          this.canvasOffscreen.height = this.offscreenHeight;
          this.drawContextOffscreen = this.canvasOffscreen.getContext("2d");
          this.drawContextOnscreen = this.canvas.getContext("2d");
          this.canvasBuffer = this.getBuffer(this.drawContextOffscreen, this.offscreenWidth, this.offscreenHeight);
          this.initializeAlpha(this.canvasBuffer.data);
          this.requestDraw();
          this.checkRAF();
          return true;
        } catch (error) {
          return false;
        }
      };
      GlueCodeGfx.prototype.setSmoothScaling = function(doSmoothing) {
        this.doSmoothing = doSmoothing;
        if (this.graphicsFound) {
          this.canvas.setAttribute("style", (this.canvas.getAttribute("style") || "") + "; image-rendering: " + (doSmoothing ? "auto" : "-webkit-optimize-contrast") + ";image-rendering: " + (doSmoothing ? "optimizeQuality" : "-o-crisp-edges") + ";image-rendering: " + (doSmoothing ? "optimizeQuality" : "-moz-crisp-edges") + ";-ms-interpolation-mode: " + (doSmoothing ? "bicubic" : "nearest-neighbor") + ";");
          this.drawContextOnscreen.mozImageSmoothingEnabled = doSmoothing;
          this.drawContextOnscreen.webkitImageSmoothingEnabled = doSmoothing;
          this.drawContextOnscreen.imageSmoothingEnabled = doSmoothing;
        }
      };
      GlueCodeGfx.prototype.initializeAlpha = function(canvasData) {
        var length = canvasData.length;
        for (var indexGFXIterate = 3; indexGFXIterate < length; indexGFXIterate += 4) {
          canvasData[indexGFXIterate] = 255;
        }
      };
      GlueCodeGfx.prototype.getBuffer = function(canvasContext, width, height) {
        var buffer = null;
        try {
          buffer = this.drawContextOffscreen.createImageData(width, height);
        } catch (error) {
          buffer = this.drawContextOffscreen.getImageData(0, 0, width, height);
        }
        return buffer;
      };
      GlueCodeGfx.prototype.copyBuffer = function(buffer) {
        if (this.graphicsFound) {
          if (this.swizzledFrameFree.length == 0) {
            if (this.didRAF) {
              this.requestDrawSingle();
            } else {
              this.swizzledFrameFree.push(this.swizzledFrameReady.shift());
            }
          }
          var swizzledFrame = this.swizzledFrameFree.shift();
          var length = swizzledFrame.length;
          if (buffer.buffer) {
            swizzledFrame.set(buffer);
          } else {
            for (var bufferIndex = 0; bufferIndex < length; ++bufferIndex) {
              swizzledFrame[bufferIndex] = buffer[bufferIndex];
            }
          }
          this.swizzledFrameReady.push(swizzledFrame);
          if (!window.requestAnimationFrame) {
            this.requestDraw();
          } else if (!this.didRAF) {
            var parentObj = this;
            window.requestAnimationFrame(function() {
              if (parentObj.canvas) {
                parentObj.requestRAFDraw();
              }
            });
          }
        }
      };
      GlueCodeGfx.prototype.requestRAFDraw = function() {
        this.didRAF = true;
        this.requestDraw();
      };
      GlueCodeGfx.prototype.requestDrawSingle = function() {
        if (this.swizzledFrameReady.length > 0) {
          var canvasData = this.canvasBuffer.data;
          var bufferIndex = 0;
          var swizzledFrame = this.swizzledFrameReady.shift();
          var length = canvasData.length;
          for (var canvasIndex = 0; canvasIndex < length; ++canvasIndex) {
            canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
            canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
            canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
          }
          this.swizzledFrameFree.push(swizzledFrame);
          this.graphicsBlit();
        }
      };
      GlueCodeGfx.prototype.requestDraw = function() {
        this.requestDrawSingle();
        if (this.didRAF) {
          var parentObj = this;
          window.requestAnimationFrame(function() {
            if (parentObj.canvas) {
              parentObj.requestDraw();
            }
          });
        }
      };
      GlueCodeGfx.prototype.graphicsBlit = function() {
        if (this.canvasLastWidth != this.canvas.clientWidth || this.canvasLastHeight != this.canvas.clientHeight) {
          this.recomputeDimension();
          this.setSmoothScaling(this.doSmoothing);
        }
        if (this.offscreenWidth == this.onscreenWidth && this.offscreenHeight == this.onscreenHeight) {
          this.drawContextOnscreen.putImageData(this.canvasBuffer, 0, 0);
        } else {
          this.drawContextOffscreen.putImageData(this.canvasBuffer, 0, 0);
          this.drawContextOnscreen.drawImage(this.canvasOffscreen, 0, 0, this.onscreenWidth, this.onscreenHeight);
        }
      };
      GlueCodeGfx.prototype.initializeGraphicsBuffer = function() {
        var swizzledFrame = this.swizzledFrameFree.shift();
        var length = swizzledFrame.length;
        for (var bufferIndex = 0; bufferIndex < length; ++bufferIndex) {
          swizzledFrame[bufferIndex] = 248;
        }
        this.swizzledFrameReady.push(swizzledFrame);
      };
      GlueCodeGfx.prototype.checkRAF = function() {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      };
    }
  });

  // node_modules/iodine-gba/user_scripts/IodineGBAAudioGlueCode.js
  var require_IodineGBAAudioGlueCode = __commonJS({
    "node_modules/iodine-gba/user_scripts/IodineGBAAudioGlueCode.js"(exports, module) {
      "use strict";
      module.exports = {
        Mixer: GlueCodeMixer,
        Input: GlueCodeMixerInput
      };
      var getFloat32Array = require_TypedArrayShim().getFloat32Array;
      function GlueCodeMixer() {
        var parentObj = this;
        this.audio = null;
        if (typeof XAudioServer !== "undefined") {
          this.audio = new XAudioServer(2, this.sampleRate, 0, this.bufferAmount, null, 1, function() {
            parentObj.disableAudio();
          });
        }
        this.outputUnits = [];
        this.outputUnitsValid = [];
        setInterval(function() {
          parentObj.checkAudio();
        }, 16);
        this.initializeBuffer();
      }
      GlueCodeMixer.prototype.sampleRate = 44100;
      GlueCodeMixer.prototype.bufferAmount = 44100;
      GlueCodeMixer.prototype.channelCount = 2;
      GlueCodeMixer.prototype.initializeBuffer = function() {
        this.buffer = new AudioSimpleBuffer(
          this.channelCount,
          this.bufferAmount
        );
      };
      GlueCodeMixer.prototype.appendInput = function(inUnit) {
        if (this.audio) {
          for (var index = 0; index < this.outputUnits.length; index++) {
            if (!this.outputUnits[index]) {
              break;
            }
          }
          this.outputUnits[index] = inUnit;
          this.outputUnitsValid.push(inUnit);
          inUnit.registerStackPosition(index);
        } else if (typeof inUnit.errorCallback == "function") {
          inUnit.errorCallback();
        }
      };
      GlueCodeMixer.prototype.unregister = function(stackPosition) {
        this.outputUnits[stackPosition] = null;
        this.outputUnitsValid = [];
        for (var index = 0, length = this.outputUnits.length; index < length; ++index) {
          if (this.outputUnits[index]) {
            this.outputUnitsValid.push(this.outputUnits);
          }
        }
      };
      GlueCodeMixer.prototype.checkAudio = function() {
        if (this.audio) {
          var inputCount = this.outputUnitsValid.length;
          for (var inputIndex = 0, output = 0; inputIndex < inputCount; ++inputIndex) {
            this.outputUnitsValid[inputIndex].prepareShift();
          }
          for (var count = 0, requested = this.findLowestBufferCount(); count < requested; ++count) {
            for (var inputIndex = 0, output = 0; inputIndex < inputCount; ++inputIndex) {
              output += this.outputUnitsValid[inputIndex].shift();
            }
            this.buffer.push(output);
          }
          this.audio.writeAudioNoCallback(this.buffer.getSlice());
        }
      };
      GlueCodeMixer.prototype.findLowestBufferCount = function() {
        var count = 0;
        for (var inputIndex = 0, inputCount = this.outputUnitsValid.length; inputIndex < inputCount; ++inputIndex) {
          var tempCount = this.outputUnitsValid[inputIndex].buffer.remainingBuffer();
          if (tempCount > 0) {
            if (count > 0) {
              count = Math.min(count, tempCount);
            } else {
              count = tempCount;
            }
          }
        }
        return count;
      };
      GlueCodeMixer.prototype.disableAudio = function() {
        this.audio = null;
      };
      function GlueCodeMixerInput(mixer) {
        this.mixer = mixer;
      }
      GlueCodeMixerInput.prototype.initialize = function(channelCount, sampleRate, bufferAmount, startingVolume, errorCallback) {
        this.channelCount = channelCount;
        this.sampleRate = sampleRate;
        this.bufferAmount = bufferAmount;
        this.volume = startingVolume;
        this.errorCallback = errorCallback;
        this.buffer = new AudioBufferWrapper(
          this.channelCount,
          this.mixer.channelCount,
          this.bufferAmount,
          this.sampleRate,
          this.mixer.sampleRate
        );
      };
      GlueCodeMixerInput.prototype.register = function(volume) {
        this.mixer.appendInput(this);
      };
      GlueCodeMixerInput.prototype.changeVolume = function(volume) {
        this.volume = volume;
      };
      GlueCodeMixerInput.prototype.prepareShift = function() {
        this.buffer.resampleRefill();
      };
      GlueCodeMixerInput.prototype.shift = function() {
        return this.buffer.shift() * this.volume;
      };
      GlueCodeMixerInput.prototype.push = function(buffer) {
        this.buffer.push(buffer);
        this.mixer.checkAudio();
      };
      GlueCodeMixerInput.prototype.remainingBuffer = function() {
        return this.buffer.remainingBuffer() + Math.floor(this.mixer.audio.remainingBuffer() * this.sampleRate / this.mixer.sampleRate / this.mixer.channelCount) * this.mixer.channelCount;
      };
      GlueCodeMixerInput.prototype.registerStackPosition = function(stackPosition) {
        this.stackPosition = stackPosition;
      };
      GlueCodeMixerInput.prototype.unregister = function() {
        this.mixer.unregister(this.stackPosition);
      };
      function AudioBufferWrapper(channelCount, mixerChannelCount, bufferAmount, sampleRate, mixerSampleRate) {
        this.channelCount = channelCount;
        this.mixerChannelCount = mixerChannelCount;
        this.bufferAmount = bufferAmount;
        this.sampleRate = sampleRate;
        this.mixerSampleRate = mixerSampleRate;
        this.initialize();
      }
      AudioBufferWrapper.prototype.initialize = function() {
        this.inBufferSize = this.bufferAmount * this.mixerChannelCount;
        this.inBuffer = getFloat32Array(this.inBufferSize);
        this.outBufferSize = Math.ceil(this.inBufferSize * this.mixerSampleRate / this.sampleRate / this.mixerChannelCount) * this.mixerChannelCount + this.mixerChannelCount;
        this.outBuffer = getFloat32Array(this.outBufferSize);
        this.resampler = null;
        if (typeof Resampler !== "undefined") {
          this.resampler = new Resampler(this.sampleRate, this.mixerSampleRate, this.mixerChannelCount, this.outBufferSize, true);
        }
        this.inputOffset = 0;
        this.resampleBufferStart = 0;
        this.resampleBufferEnd = 0;
      };
      AudioBufferWrapper.prototype.push = function(buffer) {
        var length = buffer.length;
        if (this.channelCount < this.mixerChannelCount) {
          for (var bufferCounter = 0; bufferCounter < length && this.inputOffset < this.inBufferSize; ) {
            for (var index = this.channelCount; index < this.mixerChannelCount; ++index) {
              this.inBuffer[this.inputOffset++] = buffer[bufferCounter];
            }
            for (index = 0; index < this.channelCount && bufferCounter < length; ++index) {
              this.inBuffer[this.inputOffset++] = buffer[bufferCounter++];
            }
          }
        } else if (this.channelCount == this.mixerChannelCount) {
          for (var bufferCounter = 0; bufferCounter < length && this.inputOffset < this.inBufferSize; ) {
            this.inBuffer[this.inputOffset++] = buffer[bufferCounter++];
          }
        } else {
          for (var bufferCounter = 0; bufferCounter < length && this.inputOffset < this.inBufferSize; ) {
            for (index = 0; index < this.mixerChannelCount && bufferCounter < length; ++index) {
              this.inBuffer[this.inputOffset++] = buffer[bufferCounter++];
            }
            bufferCounter += this.channelCount - this.mixerChannelCount;
          }
        }
      };
      AudioBufferWrapper.prototype.shift = function() {
        var output = 0;
        if (this.resampleBufferStart != this.resampleBufferEnd) {
          output = this.outBuffer[this.resampleBufferStart++];
          if (this.resampleBufferStart == this.outBufferSize) {
            this.resampleBufferStart = 0;
          }
        }
        return output;
      };
      AudioBufferWrapper.prototype.resampleRefill = function() {
        if (this.inputOffset > 0) {
          var resampleLength = this.resampler.resampler(this.getSlice(this.inBuffer, this.inputOffset));
          var resampledResult = this.resampler.outputBuffer;
          for (var index2 = 0; index2 < resampleLength; ) {
            this.outBuffer[this.resampleBufferEnd++] = resampledResult[index2++];
            if (this.resampleBufferEnd == this.outBufferSize) {
              this.resampleBufferEnd = 0;
            }
            if (this.resampleBufferStart == this.resampleBufferEnd) {
              this.resampleBufferStart += this.mixerChannelCount;
              if (this.resampleBufferStart == this.outBufferSize) {
                this.resampleBufferStart = 0;
              }
            }
          }
          this.inputOffset = 0;
        }
      };
      AudioBufferWrapper.prototype.remainingBuffer = function() {
        return Math.floor(this.resampledSamplesLeft() * this.resampler.ratioWeight / this.mixerChannelCount) * this.mixerChannelCount + this.inputOffset;
      };
      AudioBufferWrapper.prototype.resampledSamplesLeft = function() {
        return (this.resampleBufferStart <= this.resampleBufferEnd ? 0 : this.outBufferSize) + this.resampleBufferEnd - this.resampleBufferStart;
      };
      AudioBufferWrapper.prototype.getSlice = function(buffer, lengthOf) {
        try {
          return buffer.subarray(0, lengthOf);
        } catch (error) {
          try {
            buffer.length = lengthOf;
            return buffer;
          } catch (error2) {
            return buffer.slice(0, lengthOf);
          }
        }
      };
      function AudioSimpleBuffer(channelCount, bufferAmount) {
        this.channelCount = channelCount;
        this.bufferAmount = bufferAmount;
        this.outBufferSize = this.channelCount * this.bufferAmount;
        this.stackLength = 0;
        this.buffer = getFloat32Array(this.outBufferSize);
      }
      AudioSimpleBuffer.prototype.push = function(data) {
        if (this.stackLength < this.outBufferSize) {
          this.buffer[this.stackLength++] = data;
        }
      };
      AudioSimpleBuffer.prototype.getSlice = function() {
        var lengthOf = this.stackLength;
        this.stackLength = 0;
        try {
          return this.buffer.subarray(0, lengthOf);
        } catch (error) {
          try {
            this.buffer.length = lengthOf;
            return this.buffer;
          } catch (error2) {
            return this.buffer.slice(0, lengthOf);
          }
        }
      };
    }
  });

  // node_modules/iodine-gba/index.js
  var require_index = __commonJS({
    "node_modules/iodine-gba/index.js"(exports, module) {
      module.exports = setup;
      var Emulator = require_GameBoyAdvanceEmulatorCore();
      var Graphics = require_IodineGBAGraphicsGlueCode();
      var Audio = require_IodineGBAAudioGlueCode();
      setup.Emulator = Emulator;
      function setup(canvas, opts) {
        var gba = new Emulator();
        registerBlitterHandler(canvas, gba);
        registerAudioHandler(gba);
        return gba;
      }
      function registerBlitterHandler(canvas, gba) {
        var Blitter = new Graphics();
        Blitter.attachCanvas(canvas);
        gba.attachGraphicsFrameHandler(function(buffer) {
          Blitter.copyBuffer(buffer);
        });
      }
      function registerAudioHandler(gba) {
        var Mixer = new Audio.Mixer();
        var MixerInput = new Audio.Input(Mixer);
        gba.attachAudioHandler(MixerInput);
        gba.enableAudio();
      }
    }
  });
  return require_index();
})();
window.IodineGBAReady = true;
window.IodineGBAError = null;
