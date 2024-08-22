import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboardEvent() {
  const [keyboardEvent, setKeyboardEvent] = useState('');

  useEffect(
    () =>
      Keyboard.addListener('keyboardDidHide', e => {
        setKeyboardEvent('didHide');
      }).remove,
    [],
  );

  useEffect(
    () =>
      Keyboard.addListener('keyboardWillHide', e => {
        setKeyboardEvent('willHide');
      }).remove,
    [],
  );

  useEffect(
    () =>
      Keyboard.addListener('keyboardDidShow', e => {
        setKeyboardEvent('didShow');
      }).remove,
    [],
  );

  useEffect(
    () =>
      Keyboard.addListener('keyboardWillShow', e => {
        setKeyboardEvent('willShow');
      }).remove,
    [],
  );

  return keyboardEvent;
}

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};
