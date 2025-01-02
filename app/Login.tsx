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
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

export default function Login() {

  const [showPassword, setShowPassword] = React.useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

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
      <FormControl>
      <FormControlLabel>
          <FormControlLabelText className="ml-2 mt-2">Enter your e-mail</FormControlLabelText>
        </FormControlLabel>
        <Input className="w-full m-2" size="md" variant="rounded">
          <InputField
            type="text"
          />
        </Input>
      <FormControlLabel>
          <FormControlLabelText className="ml-2">Enter your password</FormControlLabelText>
        </FormControlLabel>
        <Input className="w-full m-2" size="md" variant="rounded">
            <InputField type={showPassword ? "text" : "password"} />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          
      </FormControl>
      <Button
        size="md"
        variant="solid"
        action="custom"
        className="w-full m-2"
      >
        <ButtonText className="text-black">Log in</ButtonText>
      </Button>
    </View>
  );
}
