import { Stack, Link, Redirect } from 'expo-router';

export default function Home() {
  return (
    <>
      <Redirect href="/(app)" />
    </>
  );
}
