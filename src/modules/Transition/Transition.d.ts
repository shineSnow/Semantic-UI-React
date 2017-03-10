import * as React from 'react';

type ENTIRE_TRANSITIONS = 'scale' | 'fade' | 'fade up' | 'fade down' | 'fade left' | 'fade right';
type STATIC_TRANSITIONS = 'jiggle' | 'flash';
export type TRANSITION_TYPES = ENTIRE_TRANSITIONS | STATIC_TRANSITIONS;

export interface TransitionProps {
  [key: string]: any;

  /** Named animation event to used. Must be defined in CSS. */
  animation?: TRANSITION_TYPES;

  /** Primary content. */
  children?: React.ReactNode;

  /** Duration of the CSS transition animation in microseconds. */
  duration?: number;

  /** Show the component; triggers the enter or exit animation. */
  into?: boolean;

  /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
  mountOnEnter?: boolean;

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onComplete?: (nothing: null, data: TransitionEventData) => void;

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onHide?: (nothing: null, data: TransitionEventData) => void;

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onShow?: (nothing: null, data: TransitionEventData) => void;

  /**
   * Callback on each transition complete.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onStart?: (nothing: null, data: TransitionEventData) => void;

  /** Run the enter animation when the component mounts, if it is initially shown. */
  transitionAppear?: boolean;

  /** Unmount the component (remove it from the DOM) when it is not shown. */
  unmountOnExit?: boolean;
}

export interface TransitionEventData extends TransitionProps {
  status: TRANSITION_TYPES;
}

interface TransitionComponent extends React.ComponentClass<TransitionProps> {
}

declare const Transition: TransitionComponent;

export default Transition;
