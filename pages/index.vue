<template>
    <v-row justify="center" align="center" class="fill-height" no-gutters>
        <v-col cols="12" sm="6">
            <v-card align="center">
                <v-card-title class="text-center mb-10">
                    {{ mode === 'signin' ? 'auth.login-title' : 'auth.register' }}
                    <!-- {{ JSON.stringify(user)}} -->
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field v-if="mode !== 'signin'"
                            v-model="name"
                            name="name"
                            label="user"
                            hint="$t('auth.username-hint')"
                            prepend-inner-icon="mdi-user"
                            :rules="emailRules"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            name="email"
                            label="$t('auth.login-email')"
                            hint="$t('auth.login-email-hint')"
                            prepend-inner-icon="mdi-credit-card"
                            :rules="emailRules"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            name="password"
                            label="$t('auth.login-password')"
                            outlined
                            prepend-inner-icon="mdi-key"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            :rules="passwordRules"
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                        <v-text-field v-if="mode !== 'signin'"
                            v-model="rePassword"
                            name="rePassword"
                            label="$t('auth.register-confirm-password')"
                            outlined
                            prepend-inner-icon="mdi-key"
                            type="password"
                            :rules="[...passwordRules, (password === rePassword) || 'Password must match']"                        
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions class="row">
                    <v-btn v-if="mode === 'signin'" color="success" class="px-10 ml-6 col-5" @click="login()">
                        Login
                    </v-btn>
                    <v-btn v-else color="accent" class="px-10 ml-6 col-5" @click="mode = 'signin'">
                        <v-icon left dark>mdi-undo-variant</v-icon>login
                    </v-btn>
                    <v-spacer />
                    <v-btn color="primary" class="px-10 mr-6 col-5" @click="register()">
                       Register
                    </v-btn>
                    <nuxt-link to="" class="col col-12 block">
                       forgot
                    </nuxt-link>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import swal from "sweetalert2";
import {mapGetters, mapState, mapActions } from 'vuex'

export default {
    name: 'Index',
    layout: 'auth',
    data: () => ({
        mode: 'signin',
        valid: false,
        name: '',
        email: '',
        password: '',
        rePassword: '',
        showPassword: false,
        emailRules: [
            (value) => !!value || 'Email is required.',
        ],
        passwordRules: [
            (value) => !!value || 'Password is required.',
            (value) => (value || '').length >= 8 || 'Minimum 8 characters',
        ],
    }),

    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
        ...mapState('auth', ['user']),
    },

    async beforeMount() {
        if (localStorage) {
            const token = localStorage.getItem("jwt")
            if(token) {
                if(!this.user) {
                    await this.getUserData({data: null, token: localStorage.getItem('jwt')});
                }
                this.loggedIn()
            }
        }
    },

    methods: {
        ...mapActions('auth', ['getUserData']),

        loggedIn() {
            this.$router.push('/home');
        },

        async login() {
            this.$refs.form.validate()
            if (!this.valid) return;

            // call api to login
            try {
                const response = await this.$axios.post("user/login", {
                    email: this.email,
                    password: this.password,
                });
                console.log(response);
                const token = response.data.token;
                const user = response.data.user;
                localStorage.setItem("jwt", token);
                if (token) {
                    await this.getUserData({user, token});
                    swal.fire("Success", "Login Successful", "success");
                    this.loggedIn();
                }
            } catch (err) {
                swal.fire("Error", "Something Went Wrong", "error");
                console.log(err);
            }
        },
        async register() {
            // check auth mode first
            if (this.mode === 'signin') {
                this.mode = 'signup';
            } else {
                this.$refs.form.validate()
                if (!this.valid) return;

                // call api to register
                try {
                    const response = await this.$axios.post("user/register", {
                        email: this.email,
                        name: this.name,
                        password: this.password,
                    });
                    console.log(response);
                    const token = response.data.token;
                    const user = response.data.user;
                    if (token) {
                        localStorage.setItem("jwt", token);
                        await this.getUserData({user, token});
                        swal.fire("Success", "Registration Was successful", "success");
                        this.loggedIn();
                    } else {
                    swal.fire("Error", "Something Went Wrong", "Error");
                    }
                } catch (err) {
                    console.log({err})
                    const error = err.response;
                    if (error.status === 409) {
                    swal.fire("Error", error.data.message, "error");
                    } else {
                    swal.fire("Error", error.data.err.message, "error");
                    }
                }
            }
        }
    },
}
</script>