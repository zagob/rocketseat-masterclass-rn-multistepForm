import { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { styles } from "./styles";
import { AccountProps } from "../../contexts/AccountFormContext";
import { useAccountForm } from "../../hooks/useAccountForm";
import { useNavigation } from "@react-navigation/native";
import { Progress } from "../../components/Progress";

export function FormStepThree() {
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AccountProps>();
  const passwordConfirmationRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate("finish");
  }

  function validationPasswordConfirmation(passwordConfirmation: string) {
    const { password } = getValues();

    return password === passwordConfirmation || "As senhas devem ser iguais.";
  }

  return (
    <View style={styles.container}>
      <Progress progress={90} />

      <Text style={styles.title}>Escolha sua senha</Text>

      <Input
        icon="key"
        error={errors.password?.message}
        formProps={{
          name: "password",
          rules: {
            required: "Senha é obrigatório",
            minLength: {
              value: 6,
              message: "A Senha deve ter pelo menos 6 digitos.",
            },
          },
          control,
        }}
        inputProps={{
          placeholder: "Senha",
          onSubmitEditing: () => passwordConfirmationRef.current?.focus(),
          returnKeyType: "next",
          secureTextEntry: true,
        }}
      />

      <Input
        ref={passwordConfirmationRef}
        error={errors.passwordConfirmation?.message}
        icon="key"
        formProps={{
          name: "passwordConfirmation",
          control,
          rules: {
            required: "Confirme a senha.",
            validate: validationPasswordConfirmation,
          },
        }}
        inputProps={{
          placeholder: "COnfirmar senha",
          onSubmitEditing: handleSubmit(handleNextStep),
          secureTextEntry: true,
        }}
      />

      <Button title="Enviar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
