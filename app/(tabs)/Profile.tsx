import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { ScrollView, Text } from "react-native";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image"
export default function Profile() {
  return (
    <Center className="flex-1 bg-[#F7F5EE] px-4">
      <VStack space="md" className="items-center w-full">
        {/* Avatar */}
        <Avatar size="xl">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage source={{ uri: "" }} />
        </Avatar>

        {/* Name & Description */}
        <Heading bold size="3xl" className="text-center mt-2">
          John Doe
        </Heading>
        <Text className="text-center mt-1">Food Lover</Text>

        {/* Stats Section */}
        <HStack space="lg" className="mt-4">
          <VStack className="items-center">
            <Heading bold size="xl">
              100
            </Heading>
            <Text>Restaurants</Text>
          </VStack>
          <VStack className="items-center">
            <Heading bold size="xl">
              250
            </Heading>
            <Text>Following</Text>
          </VStack>
          <VStack className="items-center">
            <Heading bold size="xl">
              500
            </Heading>
            <Text>Followers</Text>
          </VStack>
        </HStack>
        <Button
          size="md"
          variant="solid"
          action="custom"
          className="w-full m-2"
        >
          <ButtonText className="text-black">Follow</ButtonText>
        </Button>
        <Heading bold size="2xl" className="text-center mt-2">
          Restaurant you liked
        </Heading>
        <ScrollView className="w-full flex-grow-0 h-96" showsVerticalScrollIndicator={false}>
          <VStack space="lg" className="mt-2">
            {/* Restaurant Item */}
            {[
              { name: "Mikel", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Remezzo", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
              { name: "Neapolitana", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
            ].map((restaurant, index) => (
              <HStack key={index} space="md" className="items-center">
                {/* Restaurant Image */}
                <Image size="sm" source={{ uri: restaurant.image }} alt="restaurant-image" className="rounded-lg" />
                
                {/* Restaurant Info */}
                <VStack>
                  <Text className="text-lg font-semibold">{restaurant.name}</Text>
                  <HStack space="sm" className="mt-1">
                    {["Italian", "Pizza", "Cozy"].map((tag, i) => (
                      <Box key={i} className="bg-gray-200 px-2 py-1 rounded-full">
                        <Text className="text-xs">{tag}</Text>
                      </Box>
                    ))}
                  </HStack>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </Center>
  );
}
