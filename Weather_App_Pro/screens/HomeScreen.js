import { ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Keyboard, ActivityIndicator, Image, StyleSheet, FlatList
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { fetchWeather } from '../utils/fetchWeather';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { getLocalWeatherAnimation } from '../utils/getLocalWeatherAnimation';



export default function HomeScreen() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState('dark');

    const isDark = theme === 'dark';
    const colors = {
        background: isDark ? '#1E3A8A' : '#f0f0f0',
        text: isDark ? '#fff' : '#1E3A8A',
        card: isDark ? 'rgba(255,255,255,0.1)' : '#ffffff',
        inputBg: isDark ? 'rgba(255,255,255,0.2)' : '#e0e0e0',
    };

    const handleSearch = async () => {
        if (!city) return;
        Keyboard.dismiss();
        setLoading(true);
        const data = await fetchWeather(city);
        setWeather(data);
        await AsyncStorage.setItem('lastCity', city);
        setLoading(false);
    };

    useEffect(() => {
        (async () => {
            const lastCity = await AsyncStorage.getItem('lastCity');
            if (lastCity) {
                setCity(lastCity);
                const data = await fetchWeather(lastCity);
                setWeather(data);
                return;
            }

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            let location = await Location.getCurrentPositionAsync({});
            const coords = `${location.coords.latitude},${location.coords.longitude}`;
            const data = await fetchWeather(coords);
            setWeather(data);
        })();
    }, []);

    const renderHourlyItem = ({ item }) => {
        const hour = item.time.split(' ')[1]; // "14:00"
        return (
            <View style={[styles.hourCard, { backgroundColor: colors.card }]}>
                <Text style={[styles.hourTime, { color: colors.text }]}>{hour}</Text>
                <Image
                    source={{ uri: `https:${item.condition.icon}` }}
                    style={styles.hourIcon}
                />
                <Text style={[styles.hourTemp, { color: colors.text }]}>
                    {item.temp_c}°C
                </Text>
            </View>
        );
    };

    return (
        <ScrollView
            style={{ backgroundColor: colors.background }}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >      {/* Theme Toggle */}
            <TouchableOpacity
                onPress={() => setTheme(isDark ? 'light' : 'dark')}
                style={styles.themeToggle}
            >
                <Ionicons
                    name={isDark ? 'sunny' : 'moon'}
                    size={35}
                    paddingTop={25}
                    color={isDark ? 'yellow' : '#333'}
                />
            </TouchableOpacity>

            {/* Header */}
            <Text style={[styles.header, { color: colors.text }]}>
                🌤️ Weather App Pro
            </Text>

            {/* Search Bar */}
            <View style={[styles.searchBar, { backgroundColor: colors.inputBg }]}>
                <TextInput
                    placeholder="Enter city name"
                    placeholderTextColor="#999"
                    style={[styles.input, { color: colors.text }]}
                    value={city}
                    onChangeText={setCity}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search" size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            {/* Weather Card */}
            {loading ? (
                <ActivityIndicator size="large" color={colors.text} style={{ marginTop: 40 }} />
            ) : weather ? (
                <>
                    <Animated.View
                        entering={FadeInDown.springify().damping(10)}
                        style={[styles.weatherCard, { backgroundColor: colors.card }]}
                    >
                        <LottieView
                            source={getLocalWeatherAnimation(weather.current.condition.text)}
                            autoPlay
                            loop
                            style={{ width: 120, height: 120 }}
                        />

                        <Text style={[styles.cityText, { color: colors.text }]}>
                            {weather.location.name}, {weather.location.country}
                        </Text>

                        <Text style={[styles.tempText, { color: colors.text }]}>
                            {weather.current.temp_c}°C
                        </Text>

                        <Text style={[styles.conditionText, { color: colors.text }]}>
                            {weather.current.condition.text}
                        </Text>
                    </Animated.View>


                    {/* Details Section */}
                    <View style={styles.detailsRow}>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, { color: colors.text }]}>Humidity</Text>
                            <Text style={[styles.detailValue, { color: colors.text }]}>
                                {weather.current.humidity}%
                            </Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, { color: colors.text }]}>Wind</Text>
                            <Text style={[styles.detailValue, { color: colors.text }]}>
                                {weather.current.wind_kph} kph
                            </Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, { color: colors.text }]}>Feels Like</Text>
                            <Text style={[styles.detailValue, { color: colors.text }]}>
                                {weather.current.feelslike_c}°C
                            </Text>
                        </View>
                    </View>

                    {/* Hourly Forecast Scroll */}
                    {weather?.forecast?.forecastday?.[0]?.hour && (
                        <FlatList
                            horizontal
                            data={weather.forecast.forecastday[0].hour}
                            renderItem={renderHourlyItem}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 20 }}
                        />
                    )}

                    {/* ➕ Additional Weather Info Card */}
                    <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.infoTitle, { color: colors.text }]}>🌡️ More Info</Text>
                        <View style={styles.infoRow}>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>Feels Like</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.feelslike_c}°C
                                </Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>Wind Dir</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.wind_dir}
                                </Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>Humidity</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.humidity}%
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>UV Index</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.uv}
                                </Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>Visibility</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.vis_km} km
                                </Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>Pressure</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.pressure_mb} mb
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* 🍃 Air Quality Card */}
                    <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.infoTitle, { color: colors.text }]}>🍃 Air Quality</Text>

                        <View style={{ height: 6, backgroundColor: '#ccc', borderRadius: 10, marginVertical: 8 }}>
                            <View
                                style={{
                                    width: `${Math.min(weather.current.air_quality.pm2_5 / 5, 100)}%`,
                                    height: 6,
                                    backgroundColor: '#22c55e',
                                    borderRadius: 10,
                                }}
                            />
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>PM2.5</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.air_quality.pm2_5.toFixed(1)}
                                </Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>PM10</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.air_quality.pm10.toFixed(1)}
                                </Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>CO</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.air_quality.co.toFixed(1)}
                                </Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={[styles.infoLabel, { color: colors.text }]}>SO₂</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {weather.current.air_quality.so2.toFixed(1)}
                                </Text>
                            </View>
                        </View>
                    </View>

                </>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 68,
        paddingHorizontal: 16,
        paddingBottom: 40, // ✅ Add this to give bottom space to scroll!
    },
    themeToggle: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        padding: 12,
        marginBottom: 24,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginRight: 10,
    },
    weatherCard: {
        padding: 24,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    weatherIcon: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    cityText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tempText: {
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 8,
    },
    conditionText: {
        fontSize: 18,
        marginBottom: 12,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 16,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    hourCard: {
        alignItems: 'center',
        padding: 22,
        borderRadius: 16,
        marginRight: 18,
        width: 110,
        marginBottom: 20,
        marginTop: 20,
    },
    hourTime: {
        fontSize: 14,
        marginBottom: 4,
    },
    hourIcon: {
        width: 40,
        height: 40,
        marginBottom: 4,
    },
    hourTemp: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    infoCard: {
        marginTop: 16,
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
        marginBottom: 12,
    },
    infoBox: {
        flex: 1,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 13,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },

});
