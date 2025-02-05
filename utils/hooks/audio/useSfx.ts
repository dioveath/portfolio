// useSfx.ts
import { useCallback, useRef } from 'react';
import * as THREE from 'three';

/**
 * Custom hook to handle one-shot SFX.
 *
 * @param listener A shared THREE.AudioListener instance.
 * @returns A function to play a one-shot sound effect.
 */
export function useSfx(listener: THREE.AudioListener) {
  // Create a single AudioLoader instance for performance.
  const audioLoaderRef = useRef(new THREE.AudioLoader());

  /**
   * playSfx loads the given audio file and plays it once.
   *
   * @param url - URL to the audio file.
   * @param options - Optional settings:
   *   - volume: The volume for playback (default 1).
   *   - playbackRate: Optionally modify the playback rate.
   */
  const playSfx = useCallback(
    (url: string, options?: { volume?: number; playbackRate?: number }) => {
      // Create a new THREE.Audio instance using the shared listener.
      const sound = new THREE.Audio(listener);

      // Load the audio file.
      audioLoaderRef.current.load(
        url,
        (buffer) => {
          sound.setBuffer(buffer);
          sound.setVolume(options?.volume ?? 1);
          if (options?.playbackRate) {
            sound.setPlaybackRate(options.playbackRate);
          }
          sound.play();
        },
        // onProgress (optional)
        undefined,
        (err) => {
          console.error(`Error loading SFX at ${url}:`, err);
        }
      );
    },
    [listener]
  );

  return playSfx;
}
