import { colors, spacing } from '@/constants/them';
import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[10],
    paddingTop: spacing[8],
  },
  brandBlock: {
    marginTop: spacing[2],
    alignItems: 'center',
  },
  logoWrap: {
    marginBottom: spacing[7],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  logoMark: {
    width: spacing[14],
    height: spacing[14],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing[4],
    backgroundColor: colors.accent,
  },
  logoMarkText: {
    fontSize: 24,
    fontFamily: 'sans-extrabold',
    color: colors.background,
  },
  wordmark: {
    fontSize: 30,
    fontFamily: 'sans-extrabold',
    color: colors.primary,
  },
  wordmarkSub: {
    marginTop: -spacing[1],
    fontSize: 12,
    fontFamily: 'sans-semibold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.mutedForeground,
  },
  title: {
    fontSize: 30,
    fontFamily: 'sans-bold',
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing[2],
    maxWidth: 320,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'sans-medium',
    color: colors.mutedForeground,
  },
  card: {
    marginTop: spacing[8],
    borderRadius: spacing[6],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: spacing[5],
  },
  form: {
    gap: spacing[4],
  },
  field: {
    gap: spacing[2],
  },
  label: {
    fontSize: 14,
    fontFamily: 'sans-semibold',
    color: colors.primary,
  },
  input: {
    borderRadius: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    fontSize: 16,
    fontFamily: 'sans-medium',
    color: colors.primary,
  },
  inputError: {
    borderColor: colors.destructive,
  },
  error: {
    fontSize: 12,
    fontFamily: 'sans-medium',
    color: colors.destructive,
  },
  helper: {
    fontSize: 14,
    fontFamily: 'sans-medium',
    color: colors.mutedForeground,
  },
  button: {
    marginTop: spacing[1],
    alignItems: 'center',
    borderRadius: spacing[4],
    backgroundColor: colors.accent,
    paddingVertical: spacing[4],
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'sans-bold',
    color: colors.background,
  },
  secondaryButton: {
    alignItems: 'center',
    borderRadius: spacing[4],
    borderWidth: 1,
    borderColor: 'rgba(234, 122, 83, 0.3)',
    backgroundColor: 'rgba(234, 122, 83, 0.1)',
    paddingVertical: spacing[3],
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'sans-semibold',
    color: colors.accent,
  },
  linkRow: {
    marginTop: spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
  },
  linkCopy: {
    fontSize: 14,
    fontFamily: 'sans-medium',
    color: colors.mutedForeground,
  },
  link: {
    fontSize: 14,
    fontFamily: 'sans-bold',
    color: colors.accent,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
