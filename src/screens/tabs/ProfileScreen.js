import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../services/auth';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Avatar,
  Button,
  Text,
  Divider,
  IconButton,
  Provider as PaperProvider,
  Card,
  Subheading, useTheme,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { APP_CONSTANTS } from '../../constants/APP_CONSTANTS';
import PasswordChange from '../../components/PasswordChange';


const ProfileScreen = () => {

  const theme = useTheme();
  const {API,setIsLoggedIn} = useContext(AuthContext);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [user,setUser] = useState({
    name: 'Mackenzie',
    surname: 'Maczie',
    username: 'greatMacky43',
    email: 'yourcontactemailid@contact.com',
    gender: 'Woman',
    birthdate: '24-10-1986',
    followers: 5056,
    following: 254,
    collection: 2056,
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          const response = await API.get('/auth/user');
          setUser({
            ...response.data,
            followers: 5056,
            following: 254,
            collection: 2056,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUser();
    }, [API])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(APP_CONSTANTS.TOKEN);
      setIsLoggedIn(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        contentStyle={{ backgroundColor: theme.colors.primary }}
        labelStyle={{ color: theme.colors.onPrimary }}
      >
        {t('logout')}
      </Button>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          {/* Header Section */}
          <View style={styles.header}>
            <IconButton
              icon="menu"
              size={24}
              onPress={() => console.log('Menu Pressed')}
              style={styles.menuButton}
              color={theme.colors.text}
            />
            <IconButton
              icon="pencil"
              size={24}
              onPress={() => console.log('Edit Pressed')}
              style={styles.editButton}
              color={theme.colors.text}
            />
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Avatar.Image
              source={{
                uri: 'https://via.placeholder.com/150',
              }}
              size={90}
              style={styles.avatar}
            />
            <Text style={[styles.name, { color: theme.colors.primary }]}>
              {user.name} {user.surname}
            </Text>
            <Text style={[styles.username, { color: theme.colors.primary }]}>
              {user.username}
            </Text>
            <Button mode="contained" style={styles.followButton(theme)} onPress={() => console.log('Follow button pressed')}>
              {t('followMe')}
            </Button>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection(theme)}>
            <View style={styles.stat}>
              <Text style={{ color: theme.colors.primary }}>
                {user.followers}
              </Text>
              <Text style={{ color: theme.colors.primary }}>
                {t('followers')}
              </Text>
            </View>
            <Divider vertical style={styles.divider} />
            <View style={styles.stat}>
              <Text style={{ color: theme.colors.primary }}>
                {user.following}
              </Text>
              <Text style={{ color: theme.colors.primary }}>
                {t('following')}
              </Text>
            </View>
            <Divider vertical style={styles.divider} />
            <View style={styles.stat}>
              <Text style={{ color: theme.colors.primary }}>
                {user.collection}
              </Text>
              <Text style={{ color: theme.colors.primary }}>
                {t('collection')}
              </Text>
            </View>
          </View>

          {/* Contact Info Section */}
          <View style={styles.contactSection}>
            <Card style={styles.card(theme)}>
              <Card.Content>
                {/* Email */}
                <View style={styles.detailRow}>
                  <Icon name="email" size={24} color={theme.colors.primary} />
                  <View style={styles.textContainer}>
                    <Subheading style={[styles.subheading, { color: theme.colors.primary }]}>
                      {user.email}
                    </Subheading>
                  </View>
                </View>

                {/* Password */}
                <View style={styles.detailRow}>
                  <Icon name="lock" size={24} color={theme.colors.primary} />
                  <View style={styles.textContainer}>
                    <PasswordChange
                      visible={changePasswordModalVisible}
                      onClose={() => setChangePasswordModalVisible(false)}
                    />
                  </View>
                </View>


                {/* Birthdate */}
                <View style={styles.detailRow}>
                  <Icon name="calendar" size={24} color={theme.colors.primary} />
                  <View style={styles.textContainer}>
                    <Subheading style={[styles.subheading, { color: theme.colors.primary }]}>
                      {user.birthdate}
                    </Subheading>
                  </View>
                </View>

                {/* Gender */}
                <View style={styles.detailRow}>
                  <Icon name="gender-male-female" size={24} color={theme.colors.primary} />
                  <View style={styles.textContainer}>
                    <Subheading style={[styles.subheading, { color: theme.colors.primary }]}>
                      {t(`${user.gender}`)}
                    </Subheading>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>

          {/* Change Language */}
          <Button onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en')} style={styles.languageToggleButton}>
            {i18n.language === 'en' ? 'Switch to Turkish' : 'Switch to English'}
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logoutButton: {
    margin: 20,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  menuButton: {
    alignSelf: 'flex-start',
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  username: {
    marginBottom: 16,
  },
  followButton: (theme) => ({
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  }),
  statsSection: (theme) => ({
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 16,
    backgroundColor: theme.colors.backgroundColor,
    borderColor: theme.colors.primary,
    borderRadius: 10,
  }),
  stat: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    height: '100%',
  },
  contactSection: {
    marginTop: 16,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 8,
  },
  themeToggleButton: {
    marginTop: 20,
  },
  languageToggleButton: {
    marginTop: 10,
  },
  card: (theme) => ({
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundColor,
    elevation: 4,
    padding: 10,
  }),
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: 'gray',
  },
  subheading: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ProfileScreen;

