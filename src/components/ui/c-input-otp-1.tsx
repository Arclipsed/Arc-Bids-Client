"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Field, FieldLabel } from "@/components/ui/c-input-otp-1-utils/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"

export interface PatternProps {
  id?: string
  label?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
  className?: string
}

export function Pattern({
  id = "simple-otp",
  label = "Simple OTP",
  defaultValue,
  value,
  onChange,
  onComplete,
  disabled,
  autoFocus,
  className,
}: PatternProps) {
  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <Field>
        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
        <InputOTP
          id={id}
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          inputMode="numeric"
          autoComplete="one-time-code"
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onComplete={onComplete}
          disabled={disabled}
          autoFocus={autoFocus}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </div>
  )
}

export default Pattern
