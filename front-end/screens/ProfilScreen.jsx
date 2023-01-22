import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import Styles from '../css/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfilScreen = ({ navigation }) => { 
	const handleLogout = async () => {
		try {
			// Clear the token from storage
			await AsyncStorage.removeItem('token');
			// Redirect the user to the Home screen
			Alert.alert(
				'Déconnexion',
				'Êtes-vous sûr? Vous voulez vous déconnecter ?',
				[
					{
						text: 'Annuler',
						onPress: () => {
							return null;
						},
					},
					{
						text: 'Confirmer',
						onPress: () => {
							AsyncStorage.clear();
							navigation.navigate('Home');
						},
					},
				],
				{ cancelable: false },
			);
			navigation.navigate('Home'); 
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<View style={styles.container}>
			<View style={Styles.logoArea}>
				<TouchableOpacity onPress={() => console.log("Upload")}
					activeOpacity={0.7} >
					<Image style={Styles.logoplus} source={require('../assets/usericonplus.png')} />
				</TouchableOpacity>
				<Text style={styles.username}>John Doe</Text>
				<Text style={styles.useremail}>test@test.fr</Text>
			</View>
			<TextInput
				style={Styles.input}
				placeholder="Nom"
				placeholderTextColor="#F7F7FC"
				keyboardType="name-family"
			/>
			<TextInput
				style={Styles.input}
				placeholder="Prénom"
				placeholderTextColor="#F7F7FC"
				keyboardType="name"
			/>
			<View>
				<TouchableHighlight
					style={styles.submit}
					onPress={() => console.log("Update")}
					activeOpacity={0.7}
				>
					<Text style={Styles.submitText}>Modifier</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={Styles.inscriptionBack}
					onPress={handleLogout}
				>
					<Text style={Styles.submitText}>Se déconnecter</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#0F1828',
		paddingLeft: 10,
		paddingRight: 10,
	},
	submit: {
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#FF6B6B',
		borderRadius: 30,
	},
	username: {
		color: '#ffffff',
		fontSize: 24,
		position: 'absolute',
		top:180,
		fontWeight: '500',
	},
	useremail: {
		color: '#ffffff',
		fontSize: 16,
		position: 'absolute',
		top:220,
		fontWeight: '200',
	}
})

export default ProfilScreen;
