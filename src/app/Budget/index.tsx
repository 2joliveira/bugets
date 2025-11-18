import { colors } from "@/theme";
import { StyleSheet, View } from "react-native";
import { InputCheckBox, InputText, StatusTag } from "@/components";
import { InfosCard } from "./components";
import { STATUS_OPTIONS } from "../Home";
import { useState } from "react";

export function Budget() {
  const [selectedStatus, setSelectedStatus] = useState<
    (typeof STATUS_OPTIONS)[number] | null
  >(null);

  return (
    <View style={styles.container}>
      <InfosCard title="Informações gerais" icon="storefront">
        <View style={{ padding: 20, gap: 12 }}>
          <InputText icon="search" placeholder="Título" />
          <InputText icon="search" placeholder="Cliente" />
        </View>
      </InfosCard>

      <InfosCard title="Status" icon="airplane-ticket">
        <View style={{ padding: 20, gap: 12 }}>
          <InputCheckBox
            options={STATUS_OPTIONS}
            selectedOption={selectedStatus}
            setOption={setSelectedStatus}
          />
        </View>
      </InfosCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
    backgroundColor: colors.white,
  },
});
