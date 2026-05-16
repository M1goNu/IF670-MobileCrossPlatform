import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { decrement, fetchPostsCount, increment } from '../redux/counter.slice';
import { useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import { buttonStyles as styles } from './appStyle';
const Counter = () => {
    const dispatch = useAppDispatch();
    const count = useSelector((state: RootState) => state.counter.value);
    const status = useSelector((state: RootState) => state.counter.status);
    const error = useSelector((state: RootState) => state.counter.error);

    return (
        <View>
            <Text>Rifqi Aldino Amin - 00000093743</Text>
            {status === 'loading' && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            <Text>Count: {count}</Text>
            <View style={styles.button}>
                <Button title='Increment' onPress={() => dispatch(increment())} />
            </View>
            <View style={styles.button}>
                <Button title='Decrement' onPress={() => dispatch(decrement())} />
            </View>
            <View style={styles.button}>
                <Button title='Fetch Posts' onPress={() => dispatch(fetchPostsCount())} />
            </View>
        </View>
    );
};

export default Counter;