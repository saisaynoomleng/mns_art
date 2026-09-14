'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FaRegHandPointUp } from 'react-icons/fa6';
import { ImDiamonds } from 'react-icons/im';

type CursorVariant = 'default' | 'click';

type CursorState = {
  variant: CursorVariant;
  text: string | null;
};

const EASE = 0.18;

const DiamondCursor = (): React.JSX.Element => {
  return (
    <ImDiamonds
      size={20}
      className="origin-top-left rotate-45 text-brand-primary-600"
    />
  );
};

const ClickCursor = ({ text }: { text: string | null }): React.JSX.Element => {
  return (
    <div className="relative">
      <FaRegHandPointUp size={20} className="text-brand-accent-600" />

      {text && (
        <div className="absolute left-3 top-3 whitespace-nowrap rounded-full bg-brand-accent-600 px-3 py-1 text-xs font-bold text-white">
          {text}
        </div>
      )}
    </div>
  );
};

export const CustomCursor = (): React.JSX.Element | null => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({
    x: -100,
    y: -100,
  });

  const position = useRef({
    x: -100,
    y: -100,
  });

  const animationFrame = useRef<number | null>(null);

  const [enabled, setEnabled] = useState(false);

  const [cursor, setCursor] = useState<CursorState>({
    variant: 'default',
    text: null,
  });

  /*
   * Detect whether the current device has
   * a precise pointer such as a mouse or trackpad.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');

    const updatePointer = () => {
      setEnabled(mediaQuery.matches);
    };

    updatePointer();

    mediaQuery.addEventListener('change', updatePointer);

    return () => {
      mediaQuery.removeEventListener('change', updatePointer);
    };
  }, []);

  /*
   * Hide the native cursor when our custom
   * cursor is enabled.
   */
  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  /*
   * Track mouse position.
   *
   * IMPORTANT:
   * We don't use React state here.
   */
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouse.current.x = event.clientX;
    mouse.current.y = event.clientY;

    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      '[data-cursor]',
    );

    if (!target) {
      setCursor({
        variant: 'default',
        text: null,
      });

      return;
    }

    const variant = target.dataset.cursor === 'click' ? 'click' : 'default';

    setCursor({
      variant,
      text: target.dataset.cursorText ?? null,
    });
  }, []);

  /*
   * Attach mouse tracking.
   */
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, handleMouseMove]);

  /*
   * Animate the cursor independently from React.
   */
  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * EASE;

      position.current.y += (mouse.current.y - position.current.y) * EASE;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(
            ${position.current.x}px,
            ${position.current.y}px,
            0
          )
        `;
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-9999 will-change-transform"
    >
      {cursor.variant === 'click' ? (
        <ClickCursor text={cursor.text} />
      ) : (
        <DiamondCursor />
      )}
    </div>
  );
};
