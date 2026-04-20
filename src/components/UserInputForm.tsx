"use client";

import { useState } from "react";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone Number is required.";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function UserInputForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  function onInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormValues
  ) {
    const nextValues: FormValues = {
      ...values,
      [field]: event.target.value,
    };

    setValues(nextValues);

    if (errors[field]) {
      const nextErrors = validateForm(nextValues);
      setErrors(nextErrors);
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("Form submitted successfully.");
    setValues(initialValues);
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        User Input Form + Validation
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Fill all required fields. Inline validation updates as needed.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Full Name
          </span>
          <input
            type="text"
            value={values.fullName}
            onChange={(event) => onInputChange(event, "fullName")}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none ring-zinc-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Enter your full name"
          />
          {errors.fullName ? (
            <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
              {errors.fullName}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Email
          </span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => onInputChange(event, "email")}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none ring-zinc-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="you@example.com"
          />
          {errors.email ? (
            <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Phone Number
          </span>
          <input
            type="tel"
            value={values.phone}
            onChange={(event) => onInputChange(event, "phone")}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none ring-zinc-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="+1 555 123 4567"
          />
          {errors.phone ? (
            <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
              {errors.phone}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Password
          </span>
          <input
            type="password"
            value={values.password}
            onChange={(event) => onInputChange(event, "password")}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none ring-zinc-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Minimum 6 characters"
          />
          {errors.password ? (
            <span className="mt-1 block text-sm text-red-600 dark:text-red-400">
              {errors.password}
            </span>
          ) : null}
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Submit
        </button>
      </form>

      {successMessage ? (
        <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
          {successMessage}
        </p>
      ) : null}
    </section>
  );
}
