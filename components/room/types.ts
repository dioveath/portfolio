export type Vector3 = readonly [number, number, number];

export interface CameraPosition {
  readonly position: Vector3;
  readonly lookAt: Vector3;
}

export interface Hotspot {
  readonly id: string;
  readonly position: Vector3;
  readonly name: string;
  readonly cameraPosition: CameraPosition;
}

export const DEFAULT_ROOM_POSITION: CameraPosition = {
  position: [10, 10, 10] as Vector3,
  lookAt: [0, 0, 0] as Vector3,
} as const;

export const VIDEO_GAME_ROOM_POSITION: CameraPosition = {
  position: [0.4, 0.7, 3.5] as Vector3,
  lookAt: [0.4, 1, 0] as Vector3,
} as const;

export const BED_ROOM_POSITION: CameraPosition = {
  position: [-4.5, 1.5, 3] as Vector3,
  lookAt: [0, 1.4, -2] as Vector3,
} as const;

export const COMPUTER_ROOM_POSITION: CameraPosition = {
  position: [-4.35, 1.4, -0.5] as Vector3,
  lookAt: [-4.35, 1.4, -4] as Vector3,
} as const;

export const LIBRARY_ROOM_POSITION: CameraPosition = {
  position: [-2, 1.5, 2] as Vector3,
  lookAt: [0, 1.5, -2.5] as Vector3,
} as const;

export const EXIT_ROOM_POSITION: CameraPosition = {
  position: [6, 2, -2] as Vector3,
  lookAt: [-4, -4, -1] as Vector3,
} as const;

export const VIDEO_GAME_HOTSPOT_POSITION: Vector3 = [0.4, 0.5, 2.7] as Vector3;
export const BED_HOTSPOT_POSITION: Vector3 = [-2.5, 0.5, 2] as Vector3;
export const COMPUTER_HOTSPOT_POSITION: Vector3 = [-4, 0.5, -0.5] as Vector3;
export const LIBRARY_HOTSPOT_POSITION: Vector3 = [-1, 0.5, -1] as Vector3;
export const EXIT_HOTSPOT_POSITION: Vector3 = [4.4, 0.5, -2] as Vector3;

export const HOTSPOTS: readonly Hotspot[] = [
  {
    id: 'video_game',
    position: VIDEO_GAME_HOTSPOT_POSITION,
    name: 'Play Video Game',
    cameraPosition: VIDEO_GAME_ROOM_POSITION,
  },
  {
    id: 'bed',
    position: BED_HOTSPOT_POSITION,
    name: 'Go to Bed',
    cameraPosition: BED_ROOM_POSITION,
  },
  {
    id: 'computer',
    position: COMPUTER_HOTSPOT_POSITION,
    name: 'Use Computer',
    cameraPosition: COMPUTER_ROOM_POSITION,
  },
  {
    id: 'library',
    position: LIBRARY_HOTSPOT_POSITION,
    name: 'Browse Library',
    cameraPosition: LIBRARY_ROOM_POSITION,
  },
  {
    id: 'exit',
    position: EXIT_HOTSPOT_POSITION,
    name: 'Exit Room',
    cameraPosition: EXIT_ROOM_POSITION,
  },
] as const;
