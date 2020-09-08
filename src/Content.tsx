import React from 'react';
import {PureComponent} from 'react';
import {Text, ScrollView, StyleSheet, LayoutAnimation} from 'react-native';

export type ContentPropTypes = {
  /**
   * Content title
   */
  title: string;
  /**
   * Content text
   */
  content: string;
};

type State = {
  expanded: boolean;
};

class Content extends PureComponent<ContentPropTypes, State> {
  static displayName = 'Content';
  static defaultProps = {
    title: 'Title',
    content: 'Content',
  };

  constructor(props: ContentPropTypes) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  onExpand() {
    return () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({
        expanded: !this.state.expanded,
      });
    };
  }

  render() {
    const {title, content} = this.props;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text
          numberOfLines={!this.state.expanded ? 2 : undefined}
          style={styles.content}>
          {content}
        </Text>
        {content.length > 100 ? (
          this.state.expanded ? (
            <Text style={styles.button} onPress={this.onExpand()}>
              show less
            </Text>
          ) : (
            this.props.content &&
            this.props.content.length > 50 && (
              <Text style={styles.button} onPress={this.onExpand()}>
                show more
              </Text>
            )
          )
        ) : undefined}
      </ScrollView>
    );
  }
}

export {Content};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: 'grey',
  },
  content: {
    fontSize: 16,
  },
  button: {
    fontSize: 16,
    color: 'blue',
  },
});
