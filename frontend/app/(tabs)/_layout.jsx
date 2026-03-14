
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            headerTitleStyle: {
                color: COLORS.primary,
                fontWeight: "600"
            },
            headerShadowVisible: false,
            tabBarStyle: {
                backgroundColor: COLORS.cardBackground
            },
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            paddingTop: 5






        }}  >
            <Tabs.Screen name="index"
                options={{
                    title: 'Home', tabBarIcon: ({ size, color }) => (<Ionicons name="home-outline" size={size} color={color} />)
                }}
            />
            <Tabs.Screen name="Create" options={{
                title: 'Create', tabBarIcon: ({ size, color }) =>
                    (<Ionicons name="add-circle-outline" size={size} color={color} />)
            }} />
            <Tabs.Screen name="Profile" options={{
                title: 'Profile', tabBarIcon: ({ size, color }) =>
                    (<Ionicons name="person-outline" size={size} color={color} />)
            }} />


        </Tabs>
    );
}   