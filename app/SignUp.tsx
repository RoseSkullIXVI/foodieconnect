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
import * as SecureStore from "expo-secure-store";
import { Colors } from "@/constants/Colors";
import { Controller, Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { err } from "react-native-svg";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match"
  ),
  Fullname: Yup.string().required(),
  Username: Yup.string().required(),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSignUp = async (data: any) => {
    setLoading(true);
    console.log(data);
    axios.post("http://192.168.10.153:3000/auth/register", {           
            fullname: data.Fullname,
            username: data.Username,
            email: data.email,
            password: data.password
          })
          .then((response) => {
            if (response.data.access_token) {
              SecureStore.setItemAsync("acc_tok", response.data.access_token);
              Alert.alert("Success", "Sign up successfully!");
            }
            setLoading(false);
          })
          .catch((error) => {
            if (error.response.data.message === "Username already taken"){
              Alert.alert("Error", "Username already exists.");
            }else {
              Alert.alert("Error", "Something went wrong. Please try again.");
            }
            setLoading(false);
          })
    
  
    
    

  };

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
          <Heading bold={true} size="3xl" className="text-center">
            {" "}
            Sign Up
          </Heading>
          <Text className="text-center align-bottom mt-2">
            Create your account
          </Text>
          <FormControl isInvalid={!!errors.Fullname}>
            <FormControlLabel>
              <FormControlLabelText className="ml-2 mt-2">
                Full Name
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="Fullname"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-full m-2" size="md" variant="rounded">
                  <InputField
                    type="text"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </Input>
              )}
            />
            {errors.Fullname && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.Fullname.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
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
                <FormControlErrorText>
                  {errors.email.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText className="ml-2 mt-2">
                Create a username
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="Username"
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
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormControlLabel>
              <FormControlLabelText className="ml-2">
                Enter your password
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-full m-2" size="md" variant="rounded">
                  <InputField
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={true}
                    textContentType="oneTimeCode"
                    
                  />
                  <InputSlot
                    className="pr-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.password && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.password.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.passwordConfirmation}>
            <FormControlLabel>
              <FormControlLabelText className="ml-2">
                Repeat your password
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="passwordConfirmation"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-full m-2" size="md" variant="rounded">
                  <InputField
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={true}
                    textContentType="oneTimeCode"
                  />
                  <InputSlot
                    className="pr-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.passwordConfirmation && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.passwordConfirmation.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <Button
            size="md"
            variant="solid"
            action="custom"
            className="w-full m-2"
            onPress={handleSubmit(handleSignUp)}
          >
            {loading ? <ButtonSpinner color="gray" /> : null}
            <ButtonText className="text-black">
              {loading ? "Sign up..." : "Sign up"}
            </ButtonText>
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
