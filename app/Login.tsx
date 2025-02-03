import React, { useContext, useState } from "react";
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
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from "@/components/ui/icon";
import { Link, Redirect, useRouter } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "@/Context/AuthContect";
import {jwtDecode} from "jwt-decode";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  //const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data: { email: any; password: any }) => {
    if (!authContext) {
      Alert.alert("Error", "Auth context not available.");
      return;
    }

    const { login } = authContext;
    const {userToken} = authContext;

    try {
      await login(data.email, data.password);
      if (userToken) {
        const decoded = jwtDecode(userToken);
        Alert.alert("Success", "Logged in successfully!");
        router.replace({
          pathname : "/(tabs)/Profile/[UserID]",
          params : {UserID : decoded.sub ? decoded.sub.toString() : "" }
        });
      } else {
        Alert.alert("Error", "User token is null.");
      }
    } catch (error: unknown) {
      // Type guard for error
      if (error instanceof Error) {
        Alert.alert("Error", "Invalid credentials, please try again.");
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    }
  };
  const loading = authContext?.loading;
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
            Log in
          </Heading>
          <Text className="text-center align-bottom mt-2">
            Enter your details to continue
          </Text>

          {/* Email Input */}
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

          {/* Submit Button */}
          <Button
            size="md"
            variant="solid"
            action="custom"
            className="w-full m-2"
            onPress={handleSubmit(handleLogin)}
          >
            {loading ? <ButtonSpinner color="gray" /> : null}
            <ButtonText className="text-black">
              {loading ? "Logging in..." : "Log in"}
            </ButtonText>
          </Button>

          <Link href="/ForgotPassword" className="text-right align-bottom mt-2">
            Forgot password?
          </Link>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
