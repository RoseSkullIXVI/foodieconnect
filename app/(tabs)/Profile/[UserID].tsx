import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Alert, ScrollView, Text } from "react-native";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image"
import { useLocalSearchParams } from "expo-router";
import { AuthContext } from "@/Context/AuthContect";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { err } from "react-native-svg";
import { resolveParentId } from "expo-router/build/useNavigation";




export default function Profile() {
  const authContext = useContext(AuthContext);
  const local = useLocalSearchParams();
  const [isOwnProf, setOwnProf] = useState(false);
  const [ProfileData, setProfileData] = useState<any>()
  const [RestaurantData, setRestaurantData] = useState<any>([])
  const [FollowersData, setFollowersData] = useState([])
  const [FollowingData, setFollowingData] = useState([])
  if (authContext) {
    const { userToken } = authContext;
    if (userToken) {
  useEffect(() => {
    const fetchData = async () => {
      const decoded = jwtDecode(userToken);
      setOwnProf(local.UserID === decoded.sub);
      //Get Profile
      axios.get(`http://192.168.10.153:3000/users/getprofile/${local.UserID}` , { headers: {"Authorization" : `Bearer ${userToken}`} })
      .then((response) => {
        console.log("User Profile" , response.data)
        setProfileData(response.data);
      })
      .catch((error) => {
        Alert.alert("ERROR" , "There was an error " + error)
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Get Restaurants
      axios.get(`http://192.168.10.153:3000/retaurant/getUserRestaurant/${local.UserID}` , { headers: {"Authorization" : `Bearer ${userToken}`} })
      .then((response) => {
        console.log("Restaurant" , response.data)
        setRestaurantData(response.data);
      })
      .catch((error) => {
        Alert.alert("ERROR" , "There was an error " + error)
      })
      // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // //Get Followers
      axios.get(`http://192.168.10.153:3000/following-followers/returnFollowers/${local.UserID}` , { headers: {"Authorization" : `Bearer ${userToken}`} })
      .then((response) => {
        console.log("Followers" , response.data)
        setFollowersData(response.data);
      })
      .catch((error) => {
        Alert.alert("ERROR" , "There was an error " + error)
      })
      // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // //Get Following
      axios.get(`http://192.168.10.153:3000/following-followers/returnFollowing/${local.UserID}` , { headers: {"Authorization" : `Bearer ${userToken}`} })
      .then((response) => {
        console.log("Following" , response.data)
        setFollowingData(response.data);
      })
      .catch((error) => {
        Alert.alert("ERROR" , "There was an error " + error)
      })
    };
    fetchData();
  } , [])
    
 

}
}
  return (
    <Center className="flex-1 bg-[#F7F5EE] px-4">
      <VStack space="md" className="items-center w-full">
        {/* Avatar */}
        <Avatar size="xl">
          <AvatarFallbackText>{ProfileData?.FullName ? ProfileData.FullName : "John Doe"}</AvatarFallbackText>
          <AvatarImage source={{ uri: ProfileData?.ProfilePicture ? ProfileData.ProfilePicture : "" }} />
        </Avatar>

        {/* Name & Description */}
        <Heading bold size="3xl" className="text-center mt-2">
          @{ProfileData?.FullName ? ProfileData.FullName : "John Doe"}
        </Heading>
        <Text className="text-center mt-1">{ProfileData?.Bio ? ProfileData.Bio : "Food Lover"}</Text>

        {/* Stats Section */}
        <HStack space="lg" className="mt-4">
          <VStack className="items-center">
            <Heading bold size="xl">
            {RestaurantData.length}
            </Heading>
            <Text>Restaurants</Text>
          </VStack>
          <VStack className="items-center">
            <Heading bold size="xl">
              {FollowingData.length}
            </Heading>
            <Text>Following</Text>
          </VStack>
          <VStack className="items-center">
            <Heading bold size="xl">
              {FollowersData.length}
            </Heading>
            <Text>Followers</Text>
          </VStack>
        </HStack>
        {isOwnProf && (
           <Button
           size="md"
           variant="solid"
           action="custom"
           className="w-full m-2"
         >
           <ButtonText className="text-black">Follow</ButtonText>
         </Button>
        )}
       
        <Heading bold size="2xl" className="text-center mt-2">
          Restaurant you liked
        </Heading>
        <ScrollView className="w-full flex-grow-0 h-96" showsVerticalScrollIndicator={false}>
          <VStack space="lg" className="mt-2">
            {/* Restaurant Item */}
            {RestaurantData.map((restaurant:any, index : any) => (
              <HStack key={index} space="md" className="items-center">
                {/* Restaurant Image */}
                <Image size="sm" source={{ uri: restaurant.restaurant.Picture }} alt="restaurant-image" className="rounded-lg" />
                
                {/* Restaurant Info */}
                <VStack>
                  <Text className="text-lg font-semibold">{restaurant.restaurant.Name}</Text>
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
