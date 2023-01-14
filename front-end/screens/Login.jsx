import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
// import * as SecureStore from 'expo-secure-store';
import axios from 'axios';



const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //L'email doit contenir au moins un caractère, un @, un point, et au moins 2 caractères après le point.
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
    // le password doit contenir au moins 8 Caractères, 1 Maj, 1 Min, 1 Chiffre, 1 Caractère spécial

    const handleLogin = async()  => {
        console.log( email, password );
        if (!emailRegex.test(email)) {
        alert('L\'email n\'est pas valide', 'alertType');
        } else if (!passwordRegex.test(password)) {
        alert('Le mot de passe n\'est pas valide', 'alertType');
        }else {
           // requête axios here localhost3000/login
        try {
            const response = await axios.post('http://192.168.1.13:3000/api/auth/login', {
                email: email,
                password: password,
            });
            if (response.status === 201) {
                   // Stocker le token
                // await SecureStore.setItemAsync('token', response.data.token);
                console.log("status: 201, request successful");
                alert('Connexion réussie', 'Vous pouvez maintenant vous connecter.', 'success');
                navigation.navigate('Home');
            } else {
                console.log("status: " + response.status + ", request unsuccessful");
                alert('Connexion refusée, vérifié vos identifants', 'error');
            }
        }catch (error) {
            console.log(error);
            console.log(error.response);
            alert('Erreur requête lors de la Connexion impossible.', 'error');
        }
        }
    };

    const CustomButton = () => (
        <TouchableOpacity style={styles.button}
            onPress={() =>
                    handleLogin()
                    }>
            <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity >
    );

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Text style={styles.companyName}>Connection</Text>
            <Image style={styles.logo} source={require('../assets/tiss.png')} />
            {/* Email */}
            <TextInput
                placeholder='Email'
                placeholderTextColor='white'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            {/* Mot de passe */}
            <TextInput
                placeholder='Password'
                placeholderTextColor='white'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {/* Login Button */}
            <CustomButton/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F1828',
    },

    logo: {
        alignSelf: 'center',
        // marginBottom: 20,
        width: 200,
        height: 200,
    },

    companyName: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center'

    },


    input: {
        width: 300,
        borderColor: 'none',
        padding: 10,
        margin: 10,
        backgroundColor: '#152033',
        color: 'white',
    },

    button: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        margin: 10,
        width: 300,
        borderRadius: 30,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
    }
});

export default Login;