import { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { useNavigation } from "@react-navigation/native";
import { AccountProps } from "../../contexts/AccountFormContext";
import { useAccountForm } from "../../hooks/useAccountForm";

import { styles } from "./styles";
import { Progress } from "../../components/Progress";

export function FormStepTwo() {
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();
  const phoneRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("formStepThree");
  }

  return (
    <View style={styles.container}>
      <Progress progress={60} />

      <Text style={styles.title}>Suas informações</Text>

      <Input
        icon="calendar"
        error={errors.birth?.message}
        formProps={{
          name: "birth",
          rules: {
            required: "Data de nascimento é obrigatória.",
            pattern: {
              value:
                /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
              message: "Data de nascimento inválida.",
            },
          },
          control,
        }}
        inputProps={{
          placeholder: "Data de nascimento",
          onSubmitEditing: () => phoneRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        ref={phoneRef}
        error={errors.phone?.message}
        icon="phone"
        formProps={{
          name: "phone",
          control,
          rules: {
            required: "Telefone é obrigatório",
            pattern: {
              value:
                /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
              message: "Telefone inválido.",
            },
          },
        }}
        inputProps={{
          placeholder: "EX: +55",
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
