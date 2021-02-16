import React, { FC } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  LogBox,
} from 'react-native';
// @ts-ignore: no types
import { createBrowserApp } from '@react-navigation/web';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Reanimated1 from '../reanimated1/App';

import ExtrapolationExample from './ExtrapolationExample';
import AnimatedStyleUpdateExample from './AnimatedStyleUpdateExample';
import WobbleExample from './WobbleExample';
import DragAndSnapExample from './DragAndSnapExample';
import ScrollEventExample from './ScrollEventExample';
import ChatHeadsExample from './ChatHeadsExample';
import MeasureExample from './MeasureExample';
import SwipeableListExample from './SwipeableListExample';
import ScrollableViewExample from './ScrollableViewExample';
import ScrollToExample from './ScrollToExample';
import AnimatedTabBarExample from './AnimatedTabBarExample';
import LightboxExample from './LightboxExample';
import LiquidSwipe from './LiquidSwipe';
import ScrollExample from './AnimatedScrollExample';
LogBox.ignoreLogs(['Calling `getNode()`']);

type Screens = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { screen: React.ComponentType<any>; title?: string }
>;

const SCREENS: Screens = {
  AnimatedStyleUpdate: {
    screen: AnimatedStyleUpdateExample,
    title: '🆕 Animated Style Update',
  },
  WobbleExample: {
    screen: WobbleExample,
    title: '🆕 Animation Modifiers (Wobble Effect)',
  },
  DragAndSnapExample: {
    screen: DragAndSnapExample,
    title: '🆕 Drag and Snap',
  },
  MeasureExample: {
    screen: MeasureExample,
    title: '🆕 Synchronous Measure',
  },
  ScrollEventExample: {
    screen: ScrollEventExample,
    title: '🆕 Scroll Events',
  },
  ChatHeadsExample: {
    screen: ChatHeadsExample,
    title: '🆕 Chat Heads',
  },
  ScrollableToExample: {
    screen: ScrollToExample,
    title: '🆕 scrollTo',
  },
  SwipeableListExample: {
    screen: SwipeableListExample,
    title: '🆕 (advanced) Swipeable List',
  },
  LightboxExample: {
    screen: LightboxExample,
    title: '🆕 (advanced) Lightbox',
  },
  ScrollableViewExample: {
    screen: ScrollableViewExample,
    title: '🆕 (advanced) ScrollView imitation',
  },
  AnimatedTabBarExample: {
    screen: AnimatedTabBarExample,
    title: '🆕 (advanced) Tab Bar Example',
  },
  LiquidSwipe: {
    screen: LiquidSwipe,
    title: '🆕 Liquid Swipe Example',
  },
  ExtrapolationExample: {
    screen: ExtrapolationExample,
    title: '🆕 Extrapolation Example',
  },
  ScrollExample: {
    screen: ScrollExample,
    title: '🆕 Scroll Example',
  },
};

// @ts-ignore: types should be provided after we transition to navigation v5
function MainScreen({ navigation }) {
  const data = Object.keys(SCREENS).map((key) => ({ key }));
  return (
    <FlatList
      style={styles.list}
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <MainScreenItem
          {...props}
          screens={SCREENS}
          onPressItem={({ key }) => navigation.navigate(key)}
        />
      )}
      renderScrollComponent={(props) => <ScrollView {...props} />}
      ListFooterComponent={() => <LaunchReanimated1 navigation={navigation} />}
    />
  );
}

// @ts-ignore: FIXME
MainScreen.navigationOptions = {
  title: '🎬 Reanimated 2.x Examples',
};

export const ItemSeparator: FC = () => {
  return <View style={styles.separator} />;
};

type Item = { key: string };
type MainScreenItemProps = {
  item: Item;
  onPressItem: ({ key }: Item) => void;
  screens: Screens;
};
export const MainScreenItem: FC<MainScreenItemProps> = ({
  item,
  onPressItem,
  screens,
}) => {
  const { key } = item;
  return (
    <RectButton style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </RectButton>
  );
};

// @ts-ignore: types should be provided after we transition to navigation v5
function LaunchReanimated1({ navigation }) {
  return (
    <>
      <ItemSeparator />
      <RectButton
        style={styles.button}
        onPress={() => navigation.navigate('Reanimated1')}>
        <Text style={styles.buttonText}>👵 Reanimated 1.x Examples</Text>
      </RectButton>
    </>
  );
}

const Reanimated2App = createStackNavigator(
  {
    Main: { screen: MainScreen },
    ...SCREENS,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'screen',
  }
);

const ExampleApp = createSwitchNavigator({
  Reanimated2App,
  Reanimated1,
});

export const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

const createApp = Platform.select({
  web: (input: typeof ExampleApp) =>
    createBrowserApp(input, { history: 'hash' }),
  default: (input: typeof ExampleApp) => createAppContainer(input),
});

export default createApp(ExampleApp);