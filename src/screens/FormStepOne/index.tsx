import { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { useNavigation } from "@react-navigation/native";
import { AccountProps } from "../../contexts/AccountFormContext";
import { styles } from "./styles";
import { useAccountForm } from "../../hooks/useAccountForm";
import { Progress } from "../../components/Progress";

export function FormStepOne() {
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();
  const emailRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("formStepTwo");
  }

  return (
    <View style={styles.container}>
      <Progress progress={30} />

      <Text style={styles.title}>Criar sua conta</Text>

      <Input
        icon="user"
        error={errors.name?.message}
        formProps={{
          name: "name",
          rules: {
            required: "Nome é obrigatório",
          },
          control,
        }}
        inputProps={{
          placeholder: "Nome",
          onSubmitEditing: () => emailRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        ref={emailRef}
        error={errors.email?.message}
        icon="mail"
        formProps={{
          name: "email",
          control,
          rules: {
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "E-mail inválido",
            },
          },
        }}
        inputProps={{
          placeholder: "E-mail",
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />

      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
