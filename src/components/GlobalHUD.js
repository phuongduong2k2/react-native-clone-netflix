import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import Indicator from './Indicator';

const ref = createRef();

const GlobalHUD = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  useEffect(() => {
    ref.current = {
      show: () => {
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000082',
        }}>
        <Indicator />
      </View>
    </Modal>
  );
};

export default GlobalHUD;
export const GlobalHUDUtils = {
  showHUD: () => {
    if (ref.current) {
      ref.current.show();
    }
  },
  hideHUD: () => {
    if (ref.current) {
      ref.current.hide();
    }
  },
};
