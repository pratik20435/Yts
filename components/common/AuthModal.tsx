"use client";

import { useState } from "react";
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Group,
  Text,
  Anchor,
  Stack,
  Title,
  Divider,
} from "@mantine/core";
import { IconAt, IconLock, IconUser, IconMail } from "@tabler/icons-react";

interface AuthModalProps {
  opened: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export function AuthModal({ opened, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} size="xl" c="white">
          {mode === "login" ? "Login to YTS" : "Create a YTS Account"}
        </Text>
      }
      centered
      size="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        content: {
          backgroundColor: "#1b1b1b",
          color: "white",
          border: "1px solid #2f2f2f",
          borderRadius: "8px",
        },
        header: {
          backgroundColor: "#1b1b1b",
          borderBottom: "1px solid #2f2f2f",
          paddingBottom: "15px",
        },
        close: {
          color: "#919191",
          "&:hover": {
            backgroundColor: "#2f2f2f",
            color: "white",
          },
        },
      }}
    >
      <Stack gap="xl" py="sm">
        {mode === "login" ? (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <Stack gap="md">
                <TextInput
                  label="Username or Email"
                  placeholder="Enter your username or email"
                  leftSection={<IconAt size={16} />}
                  required
                  styles={inputStyles}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  leftSection={<IconLock size={16} />}
                  required
                  styles={inputStyles}
                />
                <Group justify="space-between" mt="xs">
                  <Checkbox
                    label="Remember me"
                    styles={{
                      label: { color: "#919191" },
                      input: {
                        backgroundColor: "#1b1b1b",
                        border: "1px solid #2f2f2f",
                        "&:checked": {
                          backgroundColor: "#6ac045",
                          borderColor: "#6ac045",
                        },
                      },
                    }}
                  />
                  <Anchor href="#" size="sm" c="accent" fw={600}>
                    Forgot Password?
                  </Anchor>
                </Group>
                <Button
                  fullWidth
                  mt="xl"
                  bg="var(--accent)"
                  size="md"
                  className="hover:bg-[#5aa83a] transition-colors"
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </form>

            <Text size="sm" ta="center" c="#919191">
              Don't have an account?{" "}
              <Anchor component="button" size="sm" c="accent" fw={600} onClick={toggleMode}>
                Register now
              </Anchor>
            </Text>
          </>
        ) : (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <Stack gap="md">
                <TextInput
                  label="Username"
                  placeholder="Choose a username"
                  leftSection={<IconUser size={16} />}
                  required
                  styles={inputStyles}
                />
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  leftSection={<IconMail size={16} />}
                  required
                  type="email"
                  styles={inputStyles}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Create a password"
                  leftSection={<IconLock size={16} />}
                  required
                  styles={inputStyles}
                />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Repeat your password"
                  leftSection={<IconLock size={16} />}
                  required
                  styles={inputStyles}
                />
                
                <Text size="xs" c="#919191" mt="xs">
                  By clicking Register, you agree to our Terms and Conditions.
                </Text>

                <Button
                  fullWidth
                  mt="lg"
                  bg="var(--accent)"
                  size="md"
                  className="hover:bg-[#5aa83a] transition-colors"
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
            </form>

            <Text size="sm" ta="center" c="#919191">
              Already have an account?{" "}
              <Anchor component="button" size="sm" c="accent" fw={600} onClick={toggleMode}>
                Login here
              </Anchor>
            </Text>
          </>
        )}
      </Stack>
    </Modal>
  );
}

const inputStyles = {
  label: {
    color: "#fff",
    marginBottom: "8px",
    fontWeight: 600,
    fontSize: "13px",
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "4px",
    "&:focus": {
      borderColor: "#6ac045",
    },
  },
};
