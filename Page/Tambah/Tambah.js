import React, { Component } from 'react';
import { Button, Image, PermissionsAndroid, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker'
import styles from './style';

const FirebaseStorage = storage();

class Tambah extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            umur: "",
            gender: 'lakilaki',
            status: 'single',
            location: "",
            downloadUrl: "",
            uri: "",
            fileImage: null
        }
    }

    requestPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);
                // If Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else { return true; }
    };

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

            ])
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                this.captureCamera();

            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    captureCamera = () =>
        ImagePicker.launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,

            },
            (response) => {
                console.log(response);
                this.setState({ uri: response.uri })
                this.setState({ fileImage: response })


            },
        )

    registerUser = () => {
        console.log('test data')
        let storageRef = this.createStorageReferences(this.state.fileImage)
        storageRef.putFile(this.state.fileImage.uri).then((res) => {


            console.log(JSON.stringify(res))

            storageRef.getDownloadURL().then(
                (download) => {
                    firestore()
                        .collection('users')
                        .doc(this.state.name + this.state.umur + this.state.gender + this.state.status + this.state.location)
                        .set({
                            name: this.state.name,
                            umur: this.state.umur,
                            gender: this.state.gender,
                            status: this.state.status,
                            location: this.location,
                            urlDownload: download
                        })
                        .then(() => {
                            console.log('data added!');
                        }).catch((error) => {
                            Alert.alert("gagal nyimpen", JSON.stringify(error))
                        });
                })
        }).catch((err) => {
            console.log(err)

        })
    }

    createStorageReferences = response => {
        const { fileName } = response

        return FirebaseStorage.ref(fileName)
    }

    render() {
        return (
            <View style={styles.container} >
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}></Text>
                    </View>
                    <View >
                        <Text>Nama</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Nama'
                        onChangeText={(name) => this.setState({ name: name })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View >
                        <Text>Umur</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Umur'
                        onChangeText={(umur) => this.setState({ umur: umur })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View >
                        <Text>Gender</Text>
                    </View>
                    <DropDownPicker
                        items={[
                            { label: 'Lakilaki', value: 'lakilaki' },
                            { label: 'Perempuan', value: 'perempuan' },
                        ]}
                        defaultValue={this.state.gender}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            gender: item.value
                        })}
                    />
                    <View >
                        <Text>Status</Text>
                    </View>
                    <DropDownPicker
                        items={[
                            { label: 'Single', value: 'single' },
                            { label: 'Married', value: 'married' },
                        ]}
                        defaultValue={this.state.status}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            status: item.value
                        })}
                    />
                    <View >
                        <Text>Location</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Location'
                        onChangeText={(location) => this.setState({ location: location })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Image
                        source={{ uri: this.state.uri }}
                        style={{ width: 80, height: 80 }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            if (this.requestPermission()) {

                                this.captureCamera();

                            }


                        }

                        } >
                        <Text style={styles.buttonTitle}>Tambah Gambar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.registerUser}>
                        <Text style={styles.buttonTitle}>Send Data</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default Tambah;