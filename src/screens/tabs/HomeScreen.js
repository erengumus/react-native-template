import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Avatar, Card, Title, Paragraph, IconButton, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const mockData = [
  {
    id: '1',
    username: 'johndoe',
    userImage: 'https://via.placeholder.com/40',
    postImage: 'https://via.placeholder.com/300x200',
    caption: 'Beautiful sunset today!',
    likes: 124,
    comments: 8,
  },
  {
    id: '2',
    username: 'janedoe',
    userImage: 'https://via.placeholder.com/40',
    postImage: 'https://via.placeholder.com/300x200',
    caption: 'Exploring the city!',
    likes: 230,
    comments: 15,
  },
  {
    id: '3',
    username: 'wanderlust',
    userImage: 'https://via.placeholder.com/40',
    postImage: 'https://via.placeholder.com/300x200',
    caption: 'Nature is amazing 🌿',
    likes: 342,
    comments: 25,
  },
];

const HomeScreen = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const renderItem = ({item}) => (
    <Card style={styles.card}>
      {/* Header: User Information*/}
      <Card.Title
        title={item.username}
        left={(props) => (
          <Avatar.Image {...props} source={{uri: item.userImage}} size={40} />
        )}
      />
      {/* Post Picture */}
      <Card.Cover source={{uri: item.postImage}} style={styles.postImage} />
      {/* Like, Comment ve Share */}
      <Card.Actions>
        <IconButton icon="heart-outline" size={24} color={colors.primary} />
        <IconButton icon="comment-outline" size={24} color={colors.primary} />
        <IconButton icon="share-outline" size={24} color={colors.primary} />
      </Card.Actions>
      {/* Post Description */}
      <Card.Content>
        <Paragraph style={{color: colors.text}}>
          <Title style={{color: colors.primary}}>{item.username}</Title> {item.caption}
        </Paragraph>
        <Paragraph style={[styles.likes, {color: colors.text}]}>
          {t('likes', {count: item.likes})}
        </Paragraph>
        <Paragraph style={[styles.comments, {color: colors.text}]}>
          {t('comments', {count: item.comments})}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={mockData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    marginTop:30,
  },
  card: {
    marginBottom: 16,
    marginHorizontal: 8,
  },
  postImage: {
    height: 200,
  },
  likes: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  comments: {
    color: '#888',
    marginTop: 4,
  },
});

export default HomeScreen;
