import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import RedditPostsContainer from '../../containers/Reddit';
import RedditPostsListing from '../components/Reddit/Listing';
import RedditPostSingleComponent from '../components/Reddit/Single';

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="reddits"
          title="REDDIT POSTS"
          icon={() => <Icon name="apps" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="reddits" component={RedditPostsContainer} Layout={RedditPostsListing} />
        </Stack>
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="reddit"
      title="REDDIT"
      {...DefaultProps.navbarProps}
      component={RedditPostsContainer}
      Layout={RedditPostSingleComponent}
    />
  </Stack>
);

export default Index;
