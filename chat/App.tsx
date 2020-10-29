import * as React from 'react';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Container} from 'native-base';

/* Utils */
import theme from './src/components/theme';
import {createStackNavigator} from '@react-navigation/stack';

/* Routes */
import {AuthNavigator} from './src/components/Authentication';
import {UserNavigator} from './src/components/Users';

/* Import Redux */
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {loadUser} from './src/store/actions/authActions';
import {handleDispatchMsg} from './src/store/actions/chatAction';

enableScreens();

type SharedStackParams = {
  Users: undefined;
  Auth: undefined;
};

const AppStack = createStackNavigator<SharedStackParams>();

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(handleDispatchMsg());
  }, []);

  return (
    <NavigationContainer>
      <ThemeProvider {...{theme}}>
        <Container style={{flex: 1}}>
          <SafeAreaProvider>
            <AppStack.Navigator headerMode="none" initialRouteName="Auth">
              <AppStack.Screen name="Auth" component={AuthNavigator} />
              <AppStack.Screen name="Users" component={UserNavigator} />
            </AppStack.Navigator>
          </SafeAreaProvider>
        </Container>
      </ThemeProvider>
    </NavigationContainer>
  );
}
