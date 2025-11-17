import { Button, InputCheckBox, InputRadio } from "@/components";
import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { STATUS_OPTIONS } from "..";

const { height } = Dimensions.get("window");

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ORDER_OPTIONS = {
  most_recent: "Mais recente",
  oldest: "Mais antigo",
  higher_value: "Maior valor",
  lowest_value: "Menor valor",
};

type OrderOptionKeys = keyof typeof ORDER_OPTIONS;

export type OrderOptionValue = (typeof ORDER_OPTIONS)[OrderOptionKeys];

export function FilterModal({ visible, onClose }: FilterModalProps) {
  const translateY = useRef(new Animated.Value(height)).current;

  const [selectedStatus, setSelectedStatus] = useState<
    (typeof STATUS_OPTIONS)[number] | null
  >(null);

  const [selectedOrder, setSelectedOrder] = useState<OrderOptionValue | null>(
    null
  );

  useEffect(() => {
    if (visible) open();
    else close();
  }, [visible]);

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

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Filtrar e ordenar</Text>

          <Pressable onPress={close}>
            <MaterialIcons name="close" size={24} color={colors.gray[600]} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, flex: 1 }}>
          <Text style={styles.section}>Status</Text>
          <InputCheckBox
            options={STATUS_OPTIONS}
            selectedOption={selectedStatus}
            setOption={setSelectedStatus}
          />

          <Text style={styles.section}>Ordenação</Text>
          <InputRadio
            options={ORDER_OPTIONS}
            selectedOption={selectedOrder}
            setOption={setSelectedOrder}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Button variant="secondary" text="Resetar filtros" />

          <Button variant="primary" icon="check" text="Aplicar" />
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.65,
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: "hidden",
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
  section: {
    ...fontFamily.textXs,
    color: colors.gray[500],
    marginVertical: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.gray[200],
  },
});
