import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import axios from "axios";

const select = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const profiles = JSON.parse(params?.profiles);

  const userId = params?.userId;

  const handleMatch = async (selectedUserId) => {
    try {
      await axios.post("http://localhost:3000/create-match", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        router.push("/chat");
      }, 500);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <View
          style={{ backgroundColor: "#F0F0F0", padding: 10, borderRadius: 18 }}
        >
          <Text style={{ textAlign: "center", fontFamily: "Optima" }}>
            NearBy 🔥
          </Text>
        </View>
        <View
          style={{ backgroundColor: "#F0F0F0", padding: 10, borderRadius: 18 }}
        >
          <Text style={{ textAlign: "center", fontFamily: "Optima" }}>
            Looking for 💓
          </Text>
        </View>
        <View
          style={{ backgroundColor: "#F0F0F0", padding: 10, borderRadius: 18 }}
        >
          <Text style={{ textAlign: "center", fontFamily: "Optima" }}>
            Turn-Ons 💌
          </Text>
        </View>
      </View>
      {profiles?.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          {profiles?.map((item, index) => (
            <View style={{ marginVertical: 15 }}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 50,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 17, fontWeight: "600" }}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        width: 200,
                        marginTop: 15,
                        fontSize: 18,
                        lineHeight: 24,
                        fontFamily: "Optima",
                        marginBottom: 8,
                      }}
                    >
                      {item?.description?.length > 160
                        ? item?.description
                        : item?.description.substr(0, 160)}
                    </Text>
                  </View>

                  {item?.profileImages?.slice(0, 1).map((item, index) => (
                    <Image
                      style={{
                        width: 280,
                        height: 280,
                        resizeMode: "cover",
                        borderRadius: 5,
                      }}
                      source={{ uri: item }}
                    />
                  ))}
                </View>
              </ScrollView>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  <Entypo name="dots-three-vertical" size={26} color="black" />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Pressable
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#E0E0E0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome name="diamond" size={27} color="#DE3163" />
                    </Pressable>

                    <Pressable
                      onPress={() => handleMatch(item._id)}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#E0E0E0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign name="hearto" size={27} color="#FF033E" />
                    </Pressable>
                  </View>
                </View>
              </View>

              <View>
                <Text>Turn Ons 💓</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  {item?.turnOns?.map((item, index) => (
                    <View
                      style={{
                        backgroundColor: "#DE3163",
                        padding: 10,
                        borderRadius: 22,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "500",
                          fontFamily: "Optima",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text>Looking For 👀</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  {item?.lookingFor?.map((item, index) => (
                    <View
                      style={{
                        backgroundColor: "#FBCEB1",
                        padding: 10,
                        borderRadius: 22,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "500",
                          fontFamily: "Optima",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/1642/1642611.png",
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Georgia-Bold",
                textAlign: "center",
              }}
            >
              UH - OH{" "}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Georgia-Bold",
                  color: "#FF69B4",
                }}
              >
                No likes yet
              </Text>
            </Text>

            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600" }}>
              Improve your AD to get better likes
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default select;

const styles = StyleSheet.create({});
