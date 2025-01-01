import { Text, View } from "react-native";
import { Heading } from '@/components/ui/heading';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from '@/components/ui/button';
import { B } from "@expo/html-elements";
import React from "react";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";

export default function Login() {

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f7f5ee',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
     <Heading bold={true} size="3xl" className="text-center mb-2"> Log in</Heading>
     <Text className="text-center align-bottom mt-2">Enter your details to continue</Text>
     
   
    </View>
  );
}
