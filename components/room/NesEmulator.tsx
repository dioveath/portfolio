import React, { useEffect, useRef } from 'react';
import jsnes from 'jsnes';
import * as THREE from 'three';

type NesEmulatorProps = {
  romUrl: string;
  canvasId: string;
  canvasTexture: THREE.Texture | null;
};

const NesEmulator = ({ romUrl, canvasId = 'nes-emulator-canvas', canvasTexture }: NesEmulatorProps) => {
  const SCREEN_WIDTH = 256;
  const SCREEN_HEIGHT = 240;
  const FRAMEBUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT;
  const AUDIO_BUFFERING = 512;
  const SAMPLE_COUNT = 4 * 1024;
  const SAMPLE_MASK = SAMPLE_COUNT - 1;

  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas_ctx, image;
    let framebuffer_u8, framebuffer_u32;
    let audio_samples_L = new Float32Array(SAMPLE_COUNT);
    let audio_samples_R = new Float32Array(SAMPLE_COUNT);
    let audio_write_cursor = 0,
      audio_read_cursor = 0;

    const canvas = canvasRef.current;
    canvas.id = canvasId;
    canvas_ctx = canvas.getContext('2d');
    image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas_ctx.fillStyle = 'black';
    canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    const buffer = new ArrayBuffer(image.data.length);
    framebuffer_u8 = new Uint8ClampedArray(buffer);
    framebuffer_u32 = new Uint32Array(buffer);

    const audio_ctx = new window.AudioContext();
    const script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2);
    script_processor.onaudioprocess = audio_callback;
    script_processor.connect(audio_ctx.destination);

    function onAnimationFrame() {
      image.data.set(framebuffer_u8);
      canvas_ctx.putImageData(image, 0, 0);
      window.requestAnimationFrame(onAnimationFrame);
    }

    function audio_remain() {
      return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK;
    }

    function audio_callback(event) {
      const dst = event.outputBuffer;
      const len = dst.length;

      if (audio_remain() < AUDIO_BUFFERING) nes.frame();

      const dst_l = dst.getChannelData(0);
      const dst_r = dst.getChannelData(1);
      for (let i = 0; i < len; i++) {
        const src_idx = (audio_read_cursor + i) & SAMPLE_MASK;
        dst_l[i] = audio_samples_L[src_idx];
        dst_r[i] = audio_samples_R[src_idx];
      }
      audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK;
    }

    function keyboard(callback, event) {
      const player = 1;
      switch (event.keyCode) {
        case 38: // UP
          callback(player, jsnes.Controller.BUTTON_UP);
          break;
        case 40: // Down
          callback(player, jsnes.Controller.BUTTON_DOWN);
          break;
        case 37: // Left
          callback(player, jsnes.Controller.BUTTON_LEFT);
          break;
        case 39: // Right
          callback(player, jsnes.Controller.BUTTON_RIGHT);
          break;
        case 65: // 'A' - qwerty, dvorak
        case 81: // 'Q' - azerty
          callback(player, jsnes.Controller.BUTTON_A);
          break;
        case 83: // 'S' - qwerty, azerty
        case 79: // 'O' - dvorak
          callback(player, jsnes.Controller.BUTTON_B);
          break;
        case 9: // Tab
          callback(player, jsnes.Controller.BUTTON_SELECT);
          break;
        case 13: // Return
          callback(player, jsnes.Controller.BUTTON_START);
          break;
        default:
          break;
      }
    }

    const nes = new jsnes.NES({
      onFrame: function (framebuffer_24) {
        for (let i = 0; i < FRAMEBUFFER_SIZE; i++) {
          framebuffer_u32[i] = 0xff000000 | framebuffer_24[i];
        }
      },
      onAudioSample: function (l, r) {
        audio_samples_L[audio_write_cursor] = l;
        audio_samples_R[audio_write_cursor] = r;
        audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK;
      },
    });

    function nes_boot(rom_data) {
      try {
        nes.loadROM(rom_data);
      } catch (err) {
        console.error('Error loading ROM:', err);
      }
      window.requestAnimationFrame(onAnimationFrame);
    }

    function nes_load_url(path) {
      const req = new XMLHttpRequest();
      req.open('GET', path);
      req.overrideMimeType('text/plain; charset=x-user-defined');
      req.onerror = () => console.log(`Error loading ${path}: ${req.statusText}`);

      req.onload = function () {
        if (this.status === 200) {
          nes_boot(this.responseText);
        } else if (this.status === 0) {
          // Aborted, ignore error.
        } else {
          console.log(`Error loading ${path}: ${req.statusText}`);
        }
      };

      req.send();
    }

    nes_load_url(romUrl);

    const handleKeyDown = (e) => keyboard(nes.buttonDown, e);
    const handleKeyUp = (e) => keyboard(nes.buttonUp, e);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      script_processor.disconnect();
      audio_ctx.close();
    };
  }, [romUrl, canvasId]);

  return <canvas ref={canvasRef} width={256} height={240} style={{ display: 'none' }} />;
};

export default NesEmulator;
