import React, { Component } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            total: 0
        }
    }

    listTrainer = () => {

        firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                const users = [];
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());

                });
                this.setState({ datas: users })
                console.log(' data laporan: ', users);
            });
    }

    componentDidMount() {

        this.listTrainer();

    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Tambah')} style={styles.button}>
                        <Text style={styles.buttonTitle}>Tambah</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.datas}
                        renderItem={({ item }) =>
                            <View style={styles.itemContainer} >
                                <View>
                                    <Image source={{ uri: item.urlDownload }} style={{ width: 80, height: 80 }} />
                                </View>
                                <View>
                                    <Text style={styles.textWrappers} onPress={() => this.props.navigation.navigate('Edit')}> {item.name}</Text>
                                    <Text style={styles.textWrapper}> {item.gender} /{item.umur} tahun</Text>
                                    <Text style={styles.textWrapper}> {item.status}</Text>
                                </View>
                            </View>
                        }
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default List;
