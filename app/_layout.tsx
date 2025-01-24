import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return <GluestackUIProvider mode="light"><Stack>
     <Stack.Screen name='index' options={{headerShown : false  }} />
     <Stack.Screen name='Login'  options={{headerTitle: '' , headerBackButtonDisplayMode: "minimal" , headerTransparent: true }}/>
     <Stack.Screen name='SignUp'  options={{headerTitle: '' , headerBackButtonDisplayMode: "minimal" , headerTransparent: true }}/>
     <Stack.Screen name='ForgotPassword'  options={{headerTitle: '' , headerBackButtonDisplayMode: "minimal" , headerTransparent: true }}/>
     <Stack.Screen name='ResetPassword'  options={{headerTitle: '' , headerBackButtonDisplayMode: "minimal" , headerTransparent: true }}/>
     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack></GluestackUIProvider>;
}
