import { Alert, Text, View } from "react-native";
import { Heading } from "@/components/ui/heading";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button";
import { B } from "@expo/html-elements";
import React, { useState } from "react";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Link } from "expo-router";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { Colors } from "@/constants/Colors";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    console.log(email, password);
try {
  axios.post("http://192.168.10.153:3000/auth/login" , {
    username : email,
    password : password
  }).then(async response =>{
    if(response.data.access_token){
      await SecureStore.setItemAsync('acc_tok', response.data.access_token );
    }

  }).catch(err =>
  {
    setIsInvalid(true);
  }
  )

}catch(error){
  Alert.alert('Error' , 'Something went wrong. Please try again.')
}finally {
      setLoading(false);
    }

  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f5ee",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Heading bold={true} size="3xl" className="text-center">
        {" "}
        Log in
      </Heading>
      <Text className="text-center align-bottom mt-2">
        Enter your details to continue
      </Text>
      <FormControl isInvalid={isInvalid}>
        <FormControlLabel>
          <FormControlLabelText className="ml-2 mt-2">
            Enter your e-mail
          </FormControlLabelText>
        </FormControlLabel>
        <Input className="w-full m-2" size="md" variant="rounded">
          <InputField
            type="text"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Input>
        <FormControlLabel>
          <FormControlLabelText className="ml-2">
            Enter your password
          </FormControlLabelText>
        </FormControlLabel>
        <Input className="w-full m-2" size="md" variant="rounded">
          <InputField
            type={showPassword ? "text" : "password"}
            value={password}
            onChangeText={setPassword}
          />
          <InputSlot className="pr-3" onPress={handleState}>
            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
          </InputSlot>
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Invalid credentials , please try again
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button size="md" variant="solid" action="custom" className="w-full m-2" onPress={handleLogin}>
      {loading ? <ButtonSpinner color="gray" /> : null} 
        <ButtonText className="text-black" >
          {loading ? 'Log in...' : 'Log in'}
        </ButtonText>
      </Button>
      <Link href="/+not-found" className="text-right align-bottom mt-2">
        Forgot password?
      </Link>
    </View>
  );
}
