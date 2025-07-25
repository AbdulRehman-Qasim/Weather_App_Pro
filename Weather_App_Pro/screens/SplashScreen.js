import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { FadeInUp, FadeInDown, FadeIn } from 'react-native-reanimated';
import TypingText from '../components/TypingText'; // ✅ Correct import

export default function SplashScreen({ navigation }) {
  const [showButton, setShowButton] = useState(false);
  const message = 'Embrace the weather, master your day.'; // ✅ Moved here

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleGetStarted = () => {
    navigation.replace('Home');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      {/* App Title */}
      <Animated.View entering={FadeIn.duration(1500)} style={styles.titleWrapper}>
        <Text style={styles.appName}>Welcome to Weather App Pro</Text>
      </Animated.View>

      {/* Rain Animation */}
      <Animated.View entering={FadeInDown.duration(1000)}>
        <LottieView
          source={require('../assets/lottie/thunder.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </Animated.View>

      {/* Get Started Button */}
      {showButton && (
        <Animated.View entering={FadeInUp.duration(1000)}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Typewriter Text */}
      {showButton && (
        <Animated.View entering={FadeInUp.delay(500).duration(1500)} style={{ marginTop: 20 }}>
          <TypingText text={message} speed={70} color="#fff" fontSize={16} />
        </Animated.View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 250,
    height: 250,
    marginTop: 480,
  },
  titleWrapper: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
  },
  appName: {
    paddingTop: 10,
    fontSize: 52,
    fontWeight: '900',
    color: 'black',
    fontFamily: 'sans-serif-condensed',
    letterSpacing: 1.5,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 220,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 110,
    shadowOffset: { width: 10, height: 1 },
    elevation: 12,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: 'red',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 0,
  },
  buttonText: {
    color: 'black',
    fontSize: 26,
    fontWeight: '900',
  },
});
