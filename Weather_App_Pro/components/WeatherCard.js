import { getLocalWeatherIcon } from '../utils/getLocalWeatherAnimation';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Enable animation support for Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function WeatherCard({ weather }) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowDetails(!showDetails);
    };

    if (!weather) return null;

    return (
        <Animated.View
            entering={FadeInDown.springify().damping(12)}
            style={styles.card}
        >
            {/* Location */}
            <Text style={styles.cityText}>
                📍 {weather.location.name}, {weather.location.country}
            </Text>

            <LottieView
                source={getLocalWeatherAnimation(weather.current.condition.text)}
                autoPlay
                loop
                style={{ width: 120, height: 120 }}
            />

            {/* Temperature */}
            <Text style={styles.tempText}>
                {weather.current.temp_c}°C
            </Text>

            {/* Condition */}
            <Text style={styles.conditionText}>
                {weather.current.condition.text}
            </Text>

            {/* Toggle Details Button */}
            <TouchableOpacity style={styles.toggleButton} onPress={toggleDetails}>
                <Text style={styles.toggleButtonText}>
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </Text>
                <Ionicons
                    name={showDetails ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#fff"
                />
            </TouchableOpacity>

            {/* Additional Weather Info */}
            {showDetails && (
                <View style={styles.detailsRow}>
                    <View style={styles.detailBox}>
                        <Text style={styles.detailLabel}>Humidity</Text>
                        <Text style={styles.detailValue}>{weather.current.humidity}%</Text>
                    </View>
                    <View style={styles.detailBox}>
                        <Text style={styles.detailLabel}>Wind</Text>
                        <Text style={styles.detailValue}>{weather.current.wind_kph} kph</Text>
                    </View>
                    <View style={styles.detailBox}>
                        <Text style={styles.detailLabel}>Feels Like</Text>
                        <Text style={styles.detailValue}>{weather.current.feelslike_c}°C</Text>
                    </View>
                </View>

            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 25,
        paddingVertical: 24,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    cityText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    weatherIcon: {
        width: 100,
        height: 100,
        marginBottom: 12,
    },
    tempText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    conditionText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 16,
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1c3c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 6,
    },
    toggleButtonText: {
        color: '#fff',
        marginRight: 6,
        fontSize: 14,
        fontWeight: '600',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 14,
        paddingHorizontal: 8,
    },
    detailBox: {
        alignItems: 'center',
        flex: 1,
    },
    detailLabel: {
        color: '#d1d5db',
        fontSize: 13,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
