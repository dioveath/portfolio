import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

interface CustomCursorProps {
  /**
   * Whether the prompt state is active. If `true`, waves ripple around
   * the circle, and a message is displayed. If `false`, just a static circle.
   */
  isPromptActive?: boolean;
  /** The text to show next to the cursor when `isPromptActive` is true. */
  promptMessage?: string;
  /** Circle diameter in pixels (for the static circle). */
  size?: number;
  /** Color of the circle and the waves (rgba for transparency). */
  color?: string;
}

/**
 * Keyframes for the expanding wave effect.
 */
const waveKeyframes = keyframes`
  0%   { transform: scale(0.1); opacity: 1; }
  70%  { transform: scale(3.2); opacity: 0; }
  100% { transform: scale(3.2); opacity: 0; }
`;

/**
 * A custom cursor that:
 *  - in normal mode: displays one static circle.
 *  - in prompt mode: displays three pulsing waves + a prompt message.
 */
export const Cursor2D: React.FC<CustomCursorProps> = ({
  isPromptActive = false,
  promptMessage = 'Click to enable sound',
  size = 24,
  color = 'rgba(255,165,0,0.8)', // orange-ish color
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Track mouse movement to position our cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hide the native cursor to show our own circle
  // useEffect(() => {
  //   document.body.style.cursor = 'none';
  //   return () => {
  //     document.body.style.cursor = 'auto';
  //   };
  // }, []);

  /**
   * Base circle style: always visible
   */
  const circleStyle = {
    position: 'fixed' as const,
    left: position.x,
    top: position.y,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: color,
    pointerEvents: 'none' as const,
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
  };

  /**
   * If in prompt mode, show 3 wave "rings" around the center circle
   * (each with slightly delayed animation).
   */
  const waveRingStyle = {
    content: '""',
    position: 'absolute' as const,
    // top: '50%',
    // left: '50%',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: `2px solid ${color}`,
    // transform: 'translate(-50%, -50%) scale(0.1)',
    animation: `${waveKeyframes} 1.5s ease-out infinite`,
    pointerEvents: 'none' as const,
  };

  return (
    <>
      {/* The static circle at the mouse position */}
      <Box {...circleStyle}>
        {isPromptActive && (
          <>
            {/* ring #1 (no delay) */}
            <Box
              {...waveRingStyle}
              style={{
                ...waveRingStyle,
                animationDelay: '0s',
              }}
            />
            {/* ring #2 (delayed start) */}
            <Box
              {...waveRingStyle}
              style={{
                ...waveRingStyle,
                animationDelay: '0.4s',
              }}
            />
            {/* ring #3 (further delayed) */}
            <Box
              {...waveRingStyle}
              style={{
                ...waveRingStyle,
                animationDelay: '0.8s',
              }}
            />
          </>
        )}
      </Box>

      {/* Optional prompt message that follows cursor if prompt is active */}
      {isPromptActive && (
        <Text
          position="fixed"
          left={position.x}
          top={position.y - 40}
          color="white"
          bg="rgba(0,0,0,0.75)"
          p={1}
          borderRadius="md"
          pointerEvents="none"
          zIndex={9999}
          transform="translate(-50%, -50%)"
          fontSize="sm"
          w={'200px'}
          align={'center'}
        >
          {promptMessage}
        </Text>
      )}
    </>
  );
};
