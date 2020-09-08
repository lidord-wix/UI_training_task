import React from 'react';
import {PureComponent} from 'react';
import {View} from 'react-native';
import _ from 'lodash';

export type StackPropTypes = {};

class Stack extends PureComponent<StackPropTypes> {
  static displayName = 'Stack';

  constructor(props: StackPropTypes) {
    super(props);
  }

  renderChildren() {
    const {children} = this.props;
    const stackCounter = _.size(children);
    const childrenArray = React.Children.map(children, (child, index) => {
      return (
        child &&
        index > stackCounter - 4 && (
          <View
            position="absolute"
            top={
              index === stackCounter - 1
                ? 3 * -7
                : index === stackCounter - 2
                ? 2 * -7
                : 1 * -7
            }
            right={
              index === stackCounter - 1
                ? 3 * -7 - 20
                : index === stackCounter - 2
                ? 2 * -7 - 20
                : 1 * -7 - 20
            }
            key={index}>
            {child}
          </View>
        )
      );
    });

    if (stackCounter === 0) {
      return (
        <View
          backgroundColor={'grey'}
          opacity={0.3}
          width={100}
          height={150}
          top={-21}
          right={7}
          position={'relative'}
          borderRadius={10}
        />
      );
    }

    return childrenArray;
  }

  render() {
    return (
      <View alignSelf={'center'} marginTop={50}>
        {this.renderChildren()}
      </View>
    );
  }
}

export {Stack};
