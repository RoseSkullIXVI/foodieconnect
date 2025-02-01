import { Stack, useRouter } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthContext, AuthProvider } from "@/Context/AuthContect";
import { useContext, useEffect } from "react";
import React from "react";

export default function RootLayout() {



  return (
    <AuthProvider>
    <GluestackUIProvider mode="light">
    <Layout></Layout>
    </GluestackUIProvider>
    </AuthProvider>
 );
}

export const Layout = () => {
  const authContext = useContext(AuthContext);
  const userToken = authContext?.userToken;
  const router = useRouter();

  // Redirect users if they are not logged in
  useEffect(() => {
    if (!userToken) {
      router.replace("/"); // Redirect to Login page
    }
  }, [userToken]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};
