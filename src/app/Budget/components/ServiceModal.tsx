import { Button, InputText } from "@/components";
import { ModalComponent } from "@/components/Modal";
import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ServiceModal({ visible, onClose }: FilterModalProps) {
  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      title="Serviço"
      proportionalHeight={0.5}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.modalContent}>
          <InputText placeholder="Título" />

          <InputText
            placeholder="Descrição"
            multiline
            numberOfLines={10}
            style={{
              minHeight: 120,
              borderRadius: 20,
              alignItems: "flex-start",
            }}
          />

          <View style={styles.priceQuantityContainer}>
            <InputText
              placeholder="Preço"
              keyboardType="decimal-pad"
              inputMode="decimal"
              style={{ width: 250 }}
            />

            <View style={styles.counter}>
              <TouchableOpacity>
                <MaterialIcons
                  name="remove"
                  size={20}
                  color={colors.purple.base}
                />
              </TouchableOpacity>
              <Text>5</Text>
              <TouchableOpacity>
                <MaterialIcons
                  name="add"
                  size={20}
                  color={colors.purple.base}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button variant="destructive" icon="delete-outline" />

          <Button variant="primary" icon="check" text="Salvar" />
        </View>
      </View>
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    gap: 12,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    gap: 8,
  },
  counter: {
    height: 50,
    width: 112,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  quantity: {
    ...fontFamily.textMd,
    color: colors.gray[700],
  },
 footer: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.gray[200],
  },
});
