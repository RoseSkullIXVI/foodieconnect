import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Heading } from "@/components/ui/heading";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  Button,
  ButtonText,
  ButtonSpinner,
} from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import axios from "axios";


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required")
});

export default function Index() {
const [loading, setLoading] = useState(false);

      const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
      });

    const forgotPassword = async (data: { email: any; }) => {
        setLoading(true);
        axios.post("http://192.168.10.153:3000/users/forgotPassword", {           
            email: data.email,
          })
          .then((response) => {
            console.log("Email" , response);
            setLoading(false);
          })
          .catch((error) => {
              Alert.alert("Error", "Something went wrong. Please try again." );
              console.log("Error" , error);
            setLoading(false);
          })
    }
  return (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "#f7f5ee" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
                   <Heading bold={true} size="3xl" className="text-center mb-2"> Forgot Password</Heading>
      <Text className="text-center align-bottom mt-2"> Enter your email associated with your account and we’ll send an email 
        with instruction to reset your password. </Text>

        <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText className="ml-2 mt-2">
                Enter your e-mail
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-full m-2" size="md" variant="rounded">
                  <InputField
                    type="text"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Input>
              )}
            />
            {errors.email && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.email.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
               <Button
                      size="md"
                      variant="solid"
                      action="custom"
                      className="w-full m-2"
                      onPress={handleSubmit(forgotPassword)}
                    >
                      {loading ? <ButtonSpinner color="gray" /> : null}
                      <ButtonText className="text-black">{loading ? "Sending email..." : "Send email"}</ButtonText>
                    </Button>
            </ScrollView>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
  );
}
