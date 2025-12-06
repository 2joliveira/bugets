import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  proportionalHeight: number;
}

const { height } = Dimensions.get("window");

export function ModalComponent({
  visible,
  onClose,
  title,
  children,
  proportionalHeight,
}: ModalProps) {
  const translateY = useRef(new Animated.Value(height)).current;
  const insets = useSafeAreaInsets();

  function open() {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }

  function close() {
    Animated.timing(translateY, {
      toValue: height,
      duration: 280,
      useNativeDriver: true,
    }).start(onClose);
  }

  useEffect(() => {
    if (visible) open();
    else close();
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY }] },
          { height: height * proportionalHeight, zIndex: 9999 },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          <Pressable onPress={close}>
            <MaterialIcons name="close" size={24} color={colors.gray[600]} />
          </Pressable>
        </View>

        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.gray[200],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...fontFamily.titleSm,
    color: colors.gray[700],
  },
});
