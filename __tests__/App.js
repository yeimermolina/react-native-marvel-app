/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import Auth from '../src/screens/Auth';
import StoreWrapper from '../src/hoc/Wrapper';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const App = () => (
  <StoreWrapper>
    <Auth />
  </StoreWrapper>
)

it('renders correctly', () => {
  renderer.create(() => StoreWrapper(Auth)());
});
