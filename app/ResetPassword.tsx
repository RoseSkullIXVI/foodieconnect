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
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from "@/components/ui/icon";
import { Link, Redirect, useLocalSearchParams } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import YupPassword from 'yup-password';
YupPassword(Yup);

// Validation schema
require('yup-password')(Yup);
const validationSchema = Yup.object().shape({
 password: Yup.string().password().required(),
  re_password: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match"
  ),
});

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useLocalSearchParams<{ token?: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleReset = async (data: any) => {
    setLoading(true);
    axios.post("http://192.168.10.153:3000/users/resetPassword", {           
        token: token,
        newPassword: data.password,
      })
      .then((response) => {
        if (response.status === 200) {  // Safer way to check success
          Alert.alert("Success", "Your password reset was successful!");
          return <Redirect href="/Login" />;
        }
      })
      .catch((error) => {
        if (error.response) {
          // Check if server responded with an error
          if (error.response.data?.message === "Invalid or expired reset token") {
            Alert.alert("Error", "Invalid token.");
          } else {
            Alert.alert("Error", error.response.data?.message || "Something went wrong. Please try again.");
          }
        } else {
          // Handle network errors
          Alert.alert("Error", "Network error. Please check your internet connection.");
        }
      })
      .finally(() => {
        setLoading(false);
      });    
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
          <Heading bold size="3xl" className="text-center">
          Reset password
          </Heading>
          <Text className="text-center align-bottom mt-2">
          Create a new password. Make sure its different from your previous ones for security
          </Text>

          {/* Password Input */}
          <FormControl isInvalid={!!errors.password}>
            <FormControlLabel>
              <FormControlLabelText className="ml-2 mt-2">
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
                  />
                  <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.password && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.password.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormControlLabel>
              <FormControlLabelText className="ml-2 mt-2">
                Repeat your password
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="re_password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-full m-2" size="md" variant="rounded">
                  <InputField
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.re_password && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.re_password.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Submit Button */}
          <Button
            size="md"
            variant="solid"
            action="custom"
            className="w-full m-2"
            onPress={handleSubmit(handleReset)}
          >
            {loading ? <ButtonSpinner color="gray" /> : null}
            <ButtonText className="text-black">{loading ? "Reseting password..." : "Reset Password"}</ButtonText>
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
