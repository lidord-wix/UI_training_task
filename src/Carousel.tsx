import React from 'react';
import {View, ScrollView} from 'react-native';

export type CarouselPropTypes = {
  /**
   * callback for onScroll event of the internal ScrollView
   */
  onScroll?: () => void;
};

function Carousel(props) {
  const {onScroll, children} = props;

  const renderChildren = () => {
    const childrenArray = React.Children.map(children, (child, index) => {
      return (
        child && (
          <View margin={40} marginTop={60} key={index}>
            {child}
          </View>
        )
      );
    });

    return childrenArray;
  };

  return (
    <ScrollView
      snapToInterval={200}
      onScroll={onScroll}
      scrollEventThrottle={10}
      horizontal>
      {renderChildren()}
    </ScrollView>
  );
}

export {Carousel};
