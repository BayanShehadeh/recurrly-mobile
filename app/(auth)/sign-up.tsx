import { useAuth, useSignUp } from '@clerk/expo';
import { authStyles as styles } from '@/constants/authStyles';
import { Link, useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailValid =
    emailAddress.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  const passwordValid = password.length === 0 || password.length >= 8;
  const formValid =
    emailAddress.length > 0 && password.length >= 8 && emailValid;
  const isFetching = fetchStatus === 'fetching';

  const handleSubmit = async () => {
    if (!formValid || !signUp) return;

    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      return;
    }

    await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    if (!signUp) return;

    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            return;
          }

          const url = decorateUrl('/(tabs)');
          if (url.startsWith('http')) {
            router.replace('/(tabs)' as Href);
          } else {
            router.replace(url as Href);
          }
        },
      });
    }
  };

  if (!isLoaded || !signUp) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#ea7a53" />
        </View>
      </SafeAreaView>
    );
  }

  if (signUp.status === 'complete' || isSignedIn) {
    return null;
  }

  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.screen}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={styles.brandBlock}>
                <View style={styles.logoWrap}>
                  <View style={styles.logoMark}>
                    <Text style={styles.logoMarkText}>R</Text>
                  </View>
                  <View>
                    <Text style={styles.wordmark}>Recurrly</Text>
                    <Text style={styles.wordmarkSub}>SMART BILLING</Text>
                  </View>
                </View>
                <Text style={styles.title}>Verify your email</Text>
                <Text style={styles.subtitle}>
                  We sent a verification code to {emailAddress}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.form}>
                  <View style={styles.field}>
                    <Text style={styles.label}>Verification Code</Text>
                    <TextInput
                      style={styles.input}
                      value={code}
                      placeholder="Enter 6-digit code"
                      placeholderTextColor="rgba(0, 0, 0, 0.4)"
                      onChangeText={setCode}
                      keyboardType="number-pad"
                      autoComplete="one-time-code"
                      maxLength={6}
                    />
                    {errors.fields.code ? (
                      <Text style={styles.error}>
                        {errors.fields.code.message}
                      </Text>
                    ) : null}
                  </View>

                  <Pressable
                    style={[
                      styles.button,
                      (!code || isFetching) && styles.buttonDisabled,
                    ]}
                    onPress={handleVerify}
                    disabled={!code || isFetching}
                  >
                    <Text style={styles.buttonText}>
                      {isFetching ? 'Verifying...' : 'Verify Email'}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => signUp.verifications.sendEmailCode()}
                    disabled={isFetching}
                  >
                    <Text style={styles.secondaryButtonText}>Resend Code</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screen}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.brandBlock}>
              <View style={styles.logoWrap}>
                <View style={styles.logoMark}>
                  <Text style={styles.logoMarkText}>R</Text>
                </View>
                <View>
                  <Text style={styles.wordmark}>Recurrly</Text>
                  <Text style={styles.wordmarkSub}>SMART BILLING</Text>
                </View>
              </View>
              <Text style={styles.title}>Create your account</Text>
              <Text style={styles.subtitle}>
                Start tracking your subscriptions and never miss a payment
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.form}>
                <View style={styles.field}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[
                      styles.input,
                      emailTouched && !emailValid && styles.inputError,
                    ]}
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    onChangeText={setEmailAddress}
                    onBlur={() => setEmailTouched(true)}
                    keyboardType="email-address"
                    autoComplete="email"
                  />
                  {emailTouched && !emailValid ? (
                    <Text style={styles.error}>
                      Please enter a valid email address
                    </Text>
                  ) : null}
                  {errors.fields.emailAddress ? (
                    <Text style={styles.error}>
                      {errors.fields.emailAddress.message}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={[
                      styles.input,
                      passwordTouched && !passwordValid && styles.inputError,
                    ]}
                    value={password}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    secureTextEntry
                    onChangeText={setPassword}
                    onBlur={() => setPasswordTouched(true)}
                    autoComplete="password-new"
                  />
                  {passwordTouched && !passwordValid ? (
                    <Text style={styles.error}>
                      Password must be at least 8 characters
                    </Text>
                  ) : null}
                  {errors.fields.password ? (
                    <Text style={styles.error}>
                      {errors.fields.password.message}
                    </Text>
                  ) : null}
                  {!passwordTouched ? (
                    <Text style={styles.helper}>
                      Minimum 8 characters required
                    </Text>
                  ) : null}
                </View>

                <Pressable
                  style={[
                    styles.button,
                    (!formValid || isFetching) && styles.buttonDisabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={!formValid || isFetching}
                >
                  <Text style={styles.buttonText}>
                    {isFetching ? 'Creating account...' : 'Create an account'}
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.linkRow}>
              <Text style={styles.linkCopy}>Already have an account?</Text>
              <Link href="/(auth)/sign-in" asChild>
                <Pressable>
                  <Text style={styles.link}>Sign in</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
