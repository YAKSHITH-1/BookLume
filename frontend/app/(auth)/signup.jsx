import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import SafeScreen from '../../components/SafeScreen';
import styles from '../../assets/styles/signup.styles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { router, Link } from 'expo-router';


import useAuthStore from '../../stores/authstore';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = useAuthStore((state) => state.register);

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const result = await register(username, email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert("Error", result.error || result.message || "Registration failed");
    } else {
      Alert.alert("Success", "Account created! ");
      router.replace('/(auth)');
    }
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeScreen>
        <View style={{ flex: 1 }}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>BOOKLUME🕸️</Text>
              <Text style={styles.subtitle}>A community built on good books.</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="John rick"
                    placeholderTextColor={COLORS.placeholderText}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail" size={20} color={COLORS.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Johnrick@gmail.com"
                    placeholderTextColor={COLORS.placeholderText}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed" size={20} color={COLORS.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Your Password"
                    placeholderTextColor={COLORS.placeholderText}
                    secureTextEntry={!showpassword}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setshowpassword(!showpassword)} style={styles.eyeIcon}>
                    <Ionicons name={showpassword ? "eye-off" : "eye"} size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>SignUp</Text>}
              </TouchableOpacity>

              <View style={styles.footer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.footerText}>Already have an account?{' '}</Text>
                  <Link href="/(auth)" asChild>
                    <TouchableOpacity>
                      <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeScreen>
    </KeyboardAvoidingView>
  );
}
