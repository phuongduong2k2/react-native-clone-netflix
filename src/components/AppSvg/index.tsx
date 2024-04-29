import React, {memo} from 'react';
import {
  Button,
  DimensionValue,
  FlexStyle,
  Text,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  /**
   * Nguồn ảnh SVG
   */
  SvgSrc: any;
  /**
   * Kích thước
   */
  size?: DimensionValue;
  style?: ViewStyle;
  /**
   * Màu
   */
  stroke?: string;
  fill?: string;
  height?: DimensionValue;
  width?: DimensionValue;
  isSquare?: boolean;
}

function AppSvg(props: Props) {
  const {
    SvgSrc = null,
    size = '100%',
    style = {},
    stroke = 'black',
    // fill = '',
    height,
    width,
    isSquare = true,
  } = props;

  return (
    <View
      style={{
        height: isSquare ? size : height,
        width: isSquare ? size : width,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}>
      {SvgSrc && (
        <SvgSrc
          height={isSquare ? size : height}
          width={isSquare ? size : width}
          // fill={fill}
          stroke={stroke}
        />
      )}
    </View>
  );
}

export default memo(AppSvg);
