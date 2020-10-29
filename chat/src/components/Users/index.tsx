import * as React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Message from './Messages/Message';

/* Users Components*/
import UserChat from './UserChat';
import UserList from './UserList';

export type AuthRoutes = {
  UserList: undefined;
  UserChat: undefined;
  Message: undefined;
};

export const AuthStack = createSharedElementStackNavigator<AuthRoutes>();

export const UserNavigator = () => (
  <AuthStack.Navigator initialRouteName="UserList">
    <AuthStack.Screen
      name="UserList"
      options={{headerShown: false}}
      component={UserList}
    />
    <AuthStack.Screen
      name="UserChat"
      component={UserChat}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="Message"
      component={Message}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);
