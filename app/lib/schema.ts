import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    phone: z
      .string()
      .min(1, "Please enter your phone number.")
      .regex(/^[0-9]{9}$/, "Please enter a valid 9-digit phone number."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must include 1 upper case, 1 lower case and 1 number."
      ),
    confirmPassword: z.string().nonempty("Please enter password confirmation."),
    country: z.string().min(1, "Please enter your country or region."),
    acceptPolicy: z.boolean().refine((v) => v === true, {
      message: "You must accept the privacy policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  emailOrMobile: z
    .string()
    .min(1, "Please enter your email or phone number.")
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{9}$/;
      return emailRegex.test(val) || phoneRegex.test(val);
    }, "Email or Phone Number is not valid."),
  password: z.string().min(1, "Please enter your password."),
});
