import { Text, View } from "react-native";
import { Heading } from '@/components/ui/heading';
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from '@/components/ui/button';
import { B } from "@expo/html-elements";
import { router } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F7F5EE',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Heading bold={true} size="3xl" className="text-center mb-2"> Welcome to the app & let's get started</Heading>
      <Button size="md" variant="solid" action="custom" className="w-full m-2">
        <ButtonText className="text-black" >Sign up</ButtonText>
      </Button>
      <Button size="md" variant="rounded" action="custom" className="w-full m-2" onPress={() => {router.push('/Login')}}>
        <ButtonText className="text-[#aab597]">Log in</ButtonText>
      </Button>
      <Text className="text-center align-bottom mt-2">By signing up, you agree to the Terms and Conditions and Privacy Policy</Text>
    </View>
  );
}
