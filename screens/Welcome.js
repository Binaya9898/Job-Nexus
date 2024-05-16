import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
        height: "50%",
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../assets/hero1.jpg")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                { translateX: 0 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-35deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              position: "absolute",
              top: 130,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero2.jpg")}
            style={{
              height: 150,
              width: 150,
              borderRadius: 20,
              position: "absolute",
              top: 110,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 330,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 35,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Started
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4,
              }}
            >
              Seamless job search and recruitment platform for everyone.
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Effortlessly connect job seekers with employers worldwide
            </Text>
          </View>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Are you ?
          </Text>

          <Button
            title="Job Seeker"
            onPress={() => navigation.navigate("Signup")}
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />

          <Button
            title="Employer"
            onPress={() => navigation.navigate("Employersignup")}
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Already have an account ?
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
