import React from 'react';
import {Screen, View} from 'components';
import {Header} from 'components';
import {useAppSelector} from 'store/configureStore';

export const Home: React.FC = () => {
  const {user} = useAppSelector((state) => state.users);
  const userName = user !== null ? user.name + ' ' + user.lastName : '';
  const userImage =
    user !== null && user.image !== null ? user.image.contentUrl : '';
  const showNotifications = () => null;
  return (
    <Screen>
      <View>
        <Header
          defaultAction={showNotifications}
          defaultIcon="bell"
          hasExtraIcon={false}
          label={userName}
          contentUrl={userImage}
        />
      </View>
    </Screen>
  );
};
