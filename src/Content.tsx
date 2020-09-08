import React from 'react';
import {useState} from 'react';
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

function Content(props: ContentPropTypes) {
  const [expanded, setExpanded] = useState(false);

  const onExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpanded(!expanded);
  };

  const {title, content} = props;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={!expanded ? 2 : undefined} style={styles.content}>
        {content}
      </Text>
      {content.length > 100 ? (
        expanded ? (
          <Text style={styles.button} onPress={() => onExpand()}>
            show less
          </Text>
        ) : (
          content &&
          content.length > 50 && (
            <Text style={styles.button} onPress={() => onExpand()}>
              show more
            </Text>
          )
        )
      ) : undefined}
    </ScrollView>
  );
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
