import {  View,Text,Alert,FlatList,TouchableOpacity,RefreshControl} from 'react-native'
import styles from "../../assets/styles/profile.styles";
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/api';
import useauthstore from '../../stores/authstore';
import ProfileHeader from '../../components/ProfileHeader';
import LogoutButton from '../../components/LogoutButton';





const Profile = () => {


  const token = useauthstore(state => state.token);

   const[books, setBooks] = useState([]);
  const  [loading, setLoading] = useState(false);
 







const fetchData = async() =>{
 try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch user books");

      setBooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to load profile data. Pull down to refresh.");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchData();
}, []);
  return (  
    <View style={styles.container}>
    <ProfileHeader/>
    <LogoutButton/>
    <View style={styles.booksHeader}>
      <Text style={styles.bookTitle}>Your Recommendations</Text>
      <Text style={styles.booksCount}>{books.length} books</Text>
    </View>
    
  
      
    </View>
  )
}

export default Profile
