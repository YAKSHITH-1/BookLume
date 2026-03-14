import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
import SafeScreen from '../../components/SafeScreen';
import styles from '../../assets/styles/login.styles';
import { useState } from 'react';
import COLORS from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import useAuthStore from '../../stores/authstore';



export default function Login() {


  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const login = useAuthStore((state) => state.login);

  const handlelogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      Alert.alert("Success", "Logged in successfully");


    } else {
      Alert.alert("Error", result.message || "Login failed");
    }
  };

  return (

    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeScreen>
        <View style={styles.topIllustration}>
          <Image source={require('../../assets/images/i.png')} style={styles.illustrationImage} resizeMode='contain' />
        </View>


        <View style={styles.card}>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>

              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>

                <Ionicons name="mail" size={20} color={COLORS.primary} style={styles.inputIcon} />

                <TextInput style={styles.input}
                  placeholder="Enter Your Email"
                  placeholderTextColor={COLORS.placeholderText}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setemail}
                  autoCapitalize='none'
                />
              </View>



            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>

                <Ionicons name="lock-closed" size={20} color={COLORS.primary} style={styles.inputIcon} />

                <TextInput style={styles.input}
                  placeholder="Enter Your Password"
                  placeholderTextColor={COLORS.placeholderText}
                  secureTextEntry={!showpassword}
                  value={password}
                  onChangeText={setpassword}
                  autoCapitalize='none'
                />

                <TouchableOpacity onPress={() => setshowpassword(!showpassword)} style={styles.eyeIcon}>
                  <Ionicons name={showpassword ? "eye-off" : "eye"} size={20} color={COLORS.primary} />
                </TouchableOpacity>

              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handlelogin} disabled={loading}>

              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}


            </TouchableOpacity>

            <View style={styles.footer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.footerText}>Don't have an account?{' '}</Text>
                <Link href="/(auth)/signup" asChild>
                  <TouchableOpacity>
                    <Text style={styles.link}>Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </SafeScreen>
    </KeyboardAvoidingView>
  );
}