import React from 'react';
import {PureComponent} from 'react';
import {View, ScrollView} from 'react-native';

export type CarouselPropTypes = {
  /**
   * callback for onScroll event of the internal ScrollView
   */
  onScroll?: () => void;
};

class Carousel extends PureComponent<CarouselPropTypes> {
  static displayName = 'Carousel';
  static default: {
    horizontal: true;
  };

  constructor(props: CarouselPropTypes) {
    super(props);
  }

  renderChildren() {
    const {children} = this.props;

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
  }

  render() {
    const {onScroll} = this.props;
    return (
      <ScrollView
        snapToInterval={200}
        onScroll={onScroll}
        scrollEventThrottle={10}
        horizontal>
        {this.renderChildren()}
      </ScrollView>
    );
  }
}

export {Carousel};
