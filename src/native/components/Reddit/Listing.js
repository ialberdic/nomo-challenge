import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, TouchableOpacity, RefreshControl, Image, View
} from 'react-native';
import {
  Container, Card, Text
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Spacer from '../UI/Spacer';

const RedditPostsListing = ({
  error,
  loading,
  redditPosts,
  reFetch,
}) => {

  // Loading
  if (loading && !redditPosts.length) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => { return item.id };

  const onPress = item => Actions.reddit({ match: { params: { id: String(item.id) } } });

  const getDaysAgo = (item) => {
    const currentDate = new Date();
    const utcSeconds = item.created;
    const PostDate = new Date(0);
    PostDate.setUTCSeconds(utcSeconds);
    return currentDate.getDate() - PostDate.getDate() === 0 ? 'Today'
    : currentDate.getDate() - PostDate.getDate()`${' days ago'}`
  }

  return (
    <Container>
      <FlatList
        numColumns={1}
        data={redditPosts}
        keyExtractor={keyExtractor}
        refreshControl={(
          <RefreshControl
            refreshing={loading}
            onRefresh={reFetch}
          />
        )}
        renderItem={({ item }) => (
          <Card style={{ paddingTop: 10, paddingBottom: 0 }}>
            <TouchableOpacity onPress={() => onPress(item)} style={{ paddingHorizontal: 6, flexDirection: 'row' }}>
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  height: '100%',
                  width: '20%',
                  borderRadius: 5
                }}
              />
              <View style={{ width: '80%', flexDirection: 'column' }}>
                <Text style={{ fontSize: 14, textAlign: 'right' }}>Created: {getDaysAgo(item)}</Text>
                <Text style={{ fontSize: 14, marginLeft: 5 }}>Title: {item.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginLeft: 5, fontSize: 14, flex: 10 }}>Author: {item.author}</Text>
                  <Text style={{ marginLeft: 5, fontSize: 14 }}>Score: {item.score}</Text>
                  <Text style={{ marginLeft: 5, fontSize: 14, marginLeft: 10 }}>Comments: {item.comments}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <Spacer size={10} />
          </Card>
        )}
      />
    </Container>
  );
};

RedditPostsListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  redditPosts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

RedditPostsListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default RedditPostsListing;
