import React from 'react';

export type Event<T> = React.MouseEvent<T, MouseEvent>;
export type InputEvent = Event<HTMLInputElement>;
export type ButtonEvent = Event<HTMLButtonElement>;
export type Element = JSX.Element;
