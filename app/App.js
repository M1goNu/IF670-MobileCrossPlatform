import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Counter from './Counter';
import { styles } from './appStyle';
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Counter />
      </View>
    </Provider>
  );
}

