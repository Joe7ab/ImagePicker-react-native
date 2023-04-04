import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// App.js
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  FileSystem,
  Button,
  Image,
} from 'react-native';
import axios from 'axios';
import qs from 'qs';
import RNFetchBlob from 'rn-fetch-blob';
// import FettanServices from 'FettanServices';

// Define the options for the ImagePicker component

const UploadButton = () => {
  const [imageUri, setImageUri] = useState('');
  const [customImage, setCustomImage] = useState('');

  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    includeBase64: true,
  };

  const launchImagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = 'data:image/jpeg;base64,' + response.data;
        setImageUri(source);
        setCustomImage(response);
        console.log('ssssssss', response);
      }
    });
  };

  const uploadImage = async () => {
    try {
      let data = qs.stringify({
        BODY_ServiceRequest:
          '<Service>CustomerImageSet</Service><MerchantID>MOATECH</MerchantID><KeyValue>929131995</KeyValue><ImageType>PH</ImageType><Image>/9j/4AAQSkZJR...</Image>',
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://uatc.api.myamole.com:8075/amole/service',
        headers: {
          HDR_Signature:
            'AWrPq1meIaY18UxPD3EKrcXVNsvPbvm8HVFHqIHkMUVLH5ja7Vrs0iaXnEoyT3y68vj_BDM6H2M',
          HDR_UserName: 'Solomon',
          HDR_Password: 'test',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {imageUri ? <Image source={{uri: imageUri}} /> : null}
      <Button title="Pick an image" onPress={launchImagePicker} />
      <Button title="Upload image" onPress={uploadImage} />
    </View>
  );
};

export default UploadButton;
