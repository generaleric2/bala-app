import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

const Skeleton = () => {
 const renderSkeletonItem = () => (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.skeletonItem}
    >
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
    </MotiView>
 );
 const skeletonRows = Array.from({ length: 3 }).map((_, index) => (
    <View key={index} style={styles.skeletonRow}>
      {renderSkeletonItem()}
      {renderSkeletonItem()}
    </View>
 ));

 return <View style={styles.skeletonList}>{skeletonRows}</View>;
};

const styles = StyleSheet.create({
 skeletonList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
 },
 skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
 },
 skeletonItem: {
    flex: 0.48,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
 },
 skeletonImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
 },
 skeletonText: {
    width: '100%',
    height: 50,
    backgroundColor: '#E0E0E0',
 },
});

export default Skeleton;
