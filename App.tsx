import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './src/components/Header';

const screen = Dimensions.get('window');
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {mins: formatNumber(mins), secs: formatNumber(secs)};
};

const App = () => {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const {mins, secs} = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  return (
    <>
      <Header title={'Stopwatch'} />
    <View style={styles.container}>
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={() => toggle()} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      {remainingSecs !== 0 ? (
        <TouchableOpacity onPress={() => reset()} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>
            Reset
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
      </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    backgroundColor: 'dodgerblue',
    width: 260,
    height: 100,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 45,
    color: '#fff',
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 90,
    fontWeight: 'bold',
  },
  resetButton: {
    borderWidth: 1,
    backgroundColor: 'grey',
    width: 260,
    height: 100,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 45,
    fontWeight: 'bold',
  },
});
