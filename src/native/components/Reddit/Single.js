import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container, Content, Card, CardItem, Body, H3, List, ListItem, Text,
} from 'native-base';
import { errorMessages } from '../../../constants/messages';
import Error from '../UI/Error';
import Spacer from '../UI/Spacer';

const RedditPostView = ({
  error, redditPosts, redditId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this reccit post from all redditPosts
  let reddit = null;
  if (redditId && redditPosts) {
    reddit = redditPosts.find(item => item.id == redditId);
  }

  // Reddit post not found
  if (!reddit) { return <Error content={errorMessages.reddit404} /> };

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: reddit.thumbnail }} style={{ height: 100, width: null, flex: 1 }} />

        <Spacer size={25} />
        <H3>{reddit.title}</H3>

        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>About this post</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Created by: {reddit.author}
              </Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Number of votes</Text>
          </CardItem>
          <CardItem>
            <Content>
              <Text>{reddit.score}</Text>
            </Content>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Number of Commnets</Text>
          </CardItem>
          <CardItem>
            <Text>{reddit.comments}</Text>
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RedditPostView.propTypes = {
  error: PropTypes.string,
  redditId: PropTypes.string.isRequired,
  redditPosts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RedditPostView.defaultProps = {
  error: null,
};

export default RedditPostView;
