import React from 'react';
import {Screen, View} from 'components';
import {Header} from 'components';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {fetchUser} from 'store/slices/UserSlice';

export const Home = ({}) => {
  const dispatch = useAppDispatch();
  //const {signOut} = useAuth();
  dispatch(fetchUser(1));
  const user = useAppSelector((state) => state.users.user);
  const name = user?.name + ' ' + user?.lastName;
  return (
    <Screen>
      <View>
        <Header
          label={name}
          contentUrl={user?.image?.contentUrl}
          defaultIcon="bell"
          hasExtraIcon={false}
        />
      </View>
    </Screen>
  );
};
