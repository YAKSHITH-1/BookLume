import { TouchableOpacity, Text, Alert } from 'react-native'
import styles from "../assets/styles/profile.styles";
import useAuthStore from '../stores/authstore';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function LogoutButton() {


    
    const { logout } = useAuthStore();

    const confirmLogout = () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => logout() },
          ],
          { cancelable: true }
        );

    }

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}