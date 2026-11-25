import { useAuth, useSignIn } from '@clerk/expo';
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

export default function SignIn() {
  const { isLoaded } = useAuth();
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailValid =
    emailAddress.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  const passwordValid = password.length > 0;
  const formValid =
    emailAddress.length > 0 && password.length > 0 && emailValid;
  const isFetching = fetchStatus === 'fetching';

  const finishSignIn = async () => {
    await signIn.finalize({
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
  };

  const handleSubmit = async () => {
    if (!formValid || !signIn) return;

    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      return;
    }

    if (signIn.status === 'complete') {
      await finishSignIn();
    } else if (signIn.status === 'needs_client_trust') {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === 'email_code',
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    }
  };

  const handleVerify = async () => {
    if (!signIn) return;

    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === 'complete') {
      await finishSignIn();
    }
  };

  if (!isLoaded || !signIn) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#ea7a53" />
        </View>
      </SafeAreaView>
    );
  }

  if (signIn.status === 'needs_client_trust') {
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
                <Text style={styles.title}>Verify your identity</Text>
                <Text style={styles.subtitle}>
                  We sent a verification code to your email
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
                      {isFetching ? 'Verifying...' : 'Verify'}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => signIn.mfa.sendEmailCode()}
                    disabled={isFetching}
                  >
                    <Text style={styles.secondaryButtonText}>Resend Code</Text>
                  </Pressable>

                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => signIn.reset()}
                    disabled={isFetching}
                  >
                    <Text style={styles.secondaryButtonText}>Start Over</Text>
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
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>
                Sign in to continue managing your subscriptions
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
                  {errors.fields.identifier ? (
                    <Text style={styles.error}>
                      {errors.fields.identifier.message}
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
                    autoComplete="password"
                  />
                  {passwordTouched && !passwordValid ? (
                    <Text style={styles.error}>Password is required</Text>
                  ) : null}
                  {errors.fields.password ? (
                    <Text style={styles.error}>
                      {errors.fields.password.message}
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
                    {isFetching ? 'Signing in...' : 'Sign in'}
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.linkRow}>
              <Text style={styles.linkCopy}>New to Recurrly?</Text>
              <Link href="/(auth)/sign-up" asChild>
                <Pressable>
                  <Text style={styles.link}>Create an account</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
