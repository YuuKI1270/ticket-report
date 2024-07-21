<script lang="ts">
import { createSubmitHandler, useForm } from "@vue-hooks-form/core";
import { defineComponent, ref, reactive } from "vue";
import LOGIN_API from "../../api/login";
import { useAuthStore } from "../../store/authStore";
import { useMutation } from "@tanstack/vue-query";

interface ILoginInput {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  setup() {
    // state
    const visible = ref<boolean>(false);
    const onError = reactive<{
      value?: boolean;
      msg?: string;
    }>({
      msg: "Something went wrong!",
      value: false,
    });
    // hook
    const { register, handleSubmit, getValues } = useForm<ILoginInput>({
      defaultValues: {
        username: "",
        password: "",
      },
      mode: "onChange",
    });

    const authState = useAuthStore();

    const { mutate } = useMutation({
      mutationKey: ["Login"],
      mutationFn: (formData: FormData) => LOGIN_API.getLogin(formData),
      onSuccess(data) {
        authState.login({
          username: data.username,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });
      },
      onError(error) {
        onError.value = true;
        onError.msg =
          (error as any)?.detail || "Incorrect username or password";
      },
    });
    // methods
    const onSubmit = createSubmitHandler(() => {
      const formData = new FormData();
      formData.append("username", getValues("username").username);
      formData.append("password", getValues("password").password);
      mutate(formData);
    });

    return {
      onSubmit,
      register,
      handleSubmit,
      visible,
      onError,
    };
  },
});
</script>
<template>
  <v-snackbar v-model="onError.value" color="white">
    {{ onError.msg }}
    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="onError.value = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>

  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://online.com.kh/wp-content/uploads/2018/06/online_logo.png"
    ></v-img>
    <form @submit.prevent="handleSubmit(onSubmit)()">
      <v-card
        class="mx-auto pa-12 pb-8 rounded-lg"
        elevation="0"
        max-width="400"
      >
        <v-text-field
          :="register('username', { required: true })"
          density="compact"
          placeholder="username"
          rounded="lg"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          :="register('password', { required: true })"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="password"
          rounded="lg"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-btn
          type="submit"
          :block="true"
          class="rounded-lg"
          color="blue"
          variant="flat"
        >
          Log in
        </v-btn>
      </v-card>
    </form>
  </div>
</template>
