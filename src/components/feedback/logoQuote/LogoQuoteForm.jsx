import { useMemo, useRef, useState } from 'react'
import { CirclePlus, Info } from 'lucide-react'
import enLabels from 'react-phone-number-input/locale/en.json'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
import examples from 'libphonenumber-js/mobile/examples'
import {
  getExampleNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js/min'
import { saveLogoDesignQuote } from '../../../lib/logoDesignApi'
import { quoteSelectOptions, technologyOptions } from './data'
import CountryCodePicker from './CountryCodePicker'
import OptionPicker from './OptionPicker'
import TechnologyPicker from './TechnologyPicker'

const initialForm = {
  customerType: 'business',
  fileName: '',
  sizeNeeded: '',
  quantityNeeded: '',
  projectTimeline: '',
  technologyNeeded: '',
  usage: 'indoor',
  description: '',
  firstName: '',
  lastName: '',
  workEmail: '',
  companyName: '',
  country: 'PH',
  phoneNumber: '',
  hearAboutUs: '',
  promoOptIn: true,
  smsOptIn: true,
  agreeToTerms: true,
}

const allowedFileTypes = ['image/png', 'image/jpeg']
const maxUploadSizeBytes = 5 * 1024 * 1024
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneAllowedCharacters = /[^\d\s()+-]/g

function ErrorText({ children }) {
  if (!children) {
    return null
  }

  return <p className="mt-2 text-xs text-[#d84f68]">{children}</p>
}

function FieldLabel({ children }) {
  return (
    <label className="text-sm font-semibold text-[#001E2B]">{children}</label>
  )
}

function InputField(props) {
  return (
    <input
      {...props}
      className={[
        'mt-2 h-12 w-full rounded-xl border border-[#c9d8d2] bg-white px-4 text-sm text-[#001E2B] outline-none transition focus:border-[#00684A] focus:ring-4 focus:ring-[#00ED64]/15',
        props.className || '',
      ].join(' ')}
    />
  )
}

function CheckboxField({ checked, onChange, children }) {
  return (
    <label className="flex items-start gap-3 text-sm leading-relaxed text-[#244136]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 rounded border-[#9fb6ac] text-[#00684A] focus:ring-[#00ED64]"
      />
      <span>{children}</span>
    </label>
  )
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Unable to read the selected file.'))
    reader.readAsDataURL(file)
  })
}

export default function LogoQuoteForm({ onOpenTextDesigner }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openPickerId, setOpenPickerId] = useState(null)
  const [technologyPickerOpen, setTechnologyPickerOpen] = useState(false)
  const fileInputRef = useRef(null)
  const selectedFileRef = useRef(null)
  const countryOptions = useMemo(
    () =>
      getCountries().map((countryCode) => ({
        value: countryCode,
        label: enLabels[countryCode] || countryCode,
        dialCode: `+${getCountryCallingCode(countryCode)}`,
      })),
    [],
  )
  const phoneHint = useMemo(() => {
    const selectedCountry = countryOptions.find(
      (option) => option.value === form.country,
    )
    const exampleNumber = getExampleNumber(form.country, examples)

    if (!selectedCountry || !exampleNumber) {
      return ''
    }

    const nationalExample = exampleNumber.nationalNumber
    const formattedExample = exampleNumber.formatNational()

    return `${selectedCountry.label}: ${formattedExample} (${nationalExample.length} digits)`
  }, [countryOptions, form.country])

  function updateField(name, value) {
    setErrors((current) => {
      if (!current[name]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[name]
      return nextErrors
    })
    setForm((current) => ({ ...current, [name]: value }))
  }

  function setFieldError(name, message) {
    setErrors((current) => ({ ...current, [name]: message }))
  }

  function validatePhoneNumber(value = form.phoneNumber, country = form.country) {
    const normalizedValue = String(value || '').trim()

    if (!normalizedValue) {
      return 'Enter your phone number.'
    }

    const parsedPhoneNumber = parsePhoneNumberFromString(normalizedValue, country)

    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      const selectedCountry = countryOptions.find((option) => option.value === country)
      return `Enter a valid phone number${selectedCountry ? ` for ${selectedCountry.label}` : ''}.`
    }

    return ''
  }

  function validateForm() {
    const nextErrors = {}

    if (!form.fileName.trim()) {
      nextErrors.fileName = 'Upload your design before submitting.'
    }

    if (!form.sizeNeeded) {
      nextErrors.sizeNeeded = 'Select the size you need.'
    }

    if (!form.quantityNeeded) {
      nextErrors.quantityNeeded = 'Select the quantity needed.'
    }

    if (!form.projectTimeline) {
      nextErrors.projectTimeline = 'Select your project timeline.'
    }

    if (!form.technologyNeeded) {
      nextErrors.technologyNeeded = 'Select the technology you need.'
    }

    if (!form.description.trim()) {
      nextErrors.description = 'Describe your project.'
    }

    if (!form.firstName.trim()) {
      nextErrors.firstName = 'Enter your first name.'
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Enter your last name.'
    }

    if (!form.workEmail.trim()) {
      nextErrors.workEmail = 'Enter your work email.'
    } else if (!emailPattern.test(form.workEmail.trim())) {
      nextErrors.workEmail = 'Enter a valid email address.'
    }

    const phoneNumberError = validatePhoneNumber()

    if (phoneNumberError) {
      nextErrors.phoneNumber = phoneNumberError
    }

    if (!form.hearAboutUs) {
      nextErrors.hearAboutUs = 'Select how you heard about us.'
    }

    if (!form.agreeToTerms) {
      nextErrors.agreeToTerms = 'You must agree to the terms before submitting.'
    }

    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitMessage('Please fix the highlighted fields before submitting.')
      return
    }

    const selectedCountry = countryOptions.find(
      (option) => option.value === form.country,
    )

    setErrors({})
    setSubmitMessage('')
    setIsSubmitting(true)

    try {
      const selectedFile = selectedFileRef.current

      if (!selectedFile) {
        setErrors((current) => ({
          ...current,
          fileName: 'Upload your design before submitting.',
        }))
        setSubmitMessage('Please fix the highlighted fields before submitting.')
        return
      }

      const fileDataUrl = await readFileAsDataUrl(selectedFile)
      const result = await saveLogoDesignQuote({
        customerType: form.customerType,
        fileName: form.fileName,
        fileMimeType: selectedFile.type,
        fileDataUrl,
        sizeNeeded: form.sizeNeeded,
        quantityNeeded: form.quantityNeeded,
        projectTimeline: form.projectTimeline,
        technologyNeeded: form.technologyNeeded,
        usage: form.usage,
        description: form.description.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        workEmail: form.workEmail.trim(),
        companyName: form.companyName.trim(),
        countryCode: form.country,
        countryName: selectedCountry?.label || form.country,
        phoneDialCode: selectedCountry?.dialCode || '',
        phoneNumber: form.phoneNumber.trim(),
        hearAboutUs: form.hearAboutUs,
        promoOptIn: form.promoOptIn,
        smsOptIn: form.smsOptIn,
        agreeToTerms: form.agreeToTerms,
      })

      const submittedDate = new Date(result.submittedAt)
      selectedFileRef.current = null
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setForm(initialForm)
      setSubmitMessage(
        `Quote saved on ${submittedDate.toLocaleDateString()} at ${submittedDate.toLocaleTimeString()}.`,
      )
    } catch (error) {
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Unable to save your logo design quote.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      selectedFileRef.current = null
      updateField('fileName', '')
      return
    }

    if (!allowedFileTypes.includes(selectedFile.type)) {
      selectedFileRef.current = null
      updateField('fileName', '')
      setErrors((current) => ({ ...current, fileName: 'Only PNG and JPG files are allowed.' }))
      setSubmitMessage('Only PNG and JPG files are allowed.')
      event.target.value = ''
      return
    }

    if (selectedFile.size > maxUploadSizeBytes) {
      selectedFileRef.current = null
      updateField('fileName', '')
      setErrors((current) => ({
        ...current,
        fileName: 'The file must be 5 MB or smaller.',
      }))
      setSubmitMessage('The file must be 5 MB or smaller.')
      event.target.value = ''
      return
    }

    setSubmitMessage('')
    selectedFileRef.current = selectedFile
    updateField('fileName', selectedFile.name)
  }

  function handlePhoneChange(event) {
    const nextValue = event.target.value
    const sanitizedValue = nextValue.replace(phoneAllowedCharacters, '')

    updateField('phoneNumber', sanitizedValue)

    if (sanitizedValue !== nextValue) {
      setFieldError('phoneNumber', 'Use numbers and phone symbols only.')
    }
  }

  function handlePhoneBlur() {
    const phoneNumberError = validatePhoneNumber()

    if (phoneNumberError) {
      setFieldError('phoneNumber', phoneNumberError)
    }
  }

  function renderOptionPicker(field, options, hasError = false) {
    return (
      <OptionPicker
        open={openPickerId === field}
        onToggle={() => {
          setTechnologyPickerOpen(false)
          setOpenPickerId((current) => (current === field ? null : field))
        }}
        options={options}
        value={form[field]}
        hasError={hasError}
        onSelect={(nextValue) => {
          updateField(field, nextValue)
          setOpenPickerId(null)
        }}
      />
    )
  }

  function renderCountryCodePicker(hasError = false) {
    return (
      <CountryCodePicker
        open={openPickerId === 'country'}
        onToggle={() => {
          setTechnologyPickerOpen(false)
          setOpenPickerId((current) => (current === 'country' ? null : 'country'))
        }}
        options={countryOptions}
        value={form.country}
        hasError={hasError}
        onSelect={(nextValue) => {
          updateField('country', nextValue)
          setOpenPickerId(null)
          if (form.phoneNumber.trim()) {
            const phoneNumberError = validatePhoneNumber(form.phoneNumber, nextValue)

            if (phoneNumberError) {
              setFieldError('phoneNumber', phoneNumberError)
            }
          }
        }}
      />
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-screen flex-1 flex-col bg-white p-6 sm:p-8 lg:h-screen lg:min-h-0 lg:overflow-y-auto"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#00684A]">
            Get a free design quote
          </h2>
          <button
            type="button"
            onClick={onOpenTextDesigner}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#001E2B] underline-offset-4 hover:text-[#00684A] hover:underline"
          >
            <Info size={16} strokeWidth={1.8} />
            Creating a text-only neon sign? Use our text editor
          </button>
        </div>
      </div>

      <div className="mt-8 border-t border-[#dce9e3] pt-6">
        <h3 className="text-2xl font-semibold text-[#001E2B]">Design</h3>
        <p className="mt-2 text-sm text-[#60736b]">Tell us what you need and we&apos;ll shape the right quote.</p>
      </div>

      <div className="mt-6">
        <FieldLabel>Who are you ordering for?</FieldLabel>
        <div className="mt-3 flex gap-6">
          {['individual', 'business'].map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-[#001E2B]">
              <input
                type="radio"
                checked={form.customerType === type}
                onChange={() => updateField('customerType', type)}
                className="h-4 w-4 border-[#9fb6ac] text-[#00684A] focus:ring-[#00ED64]"
              />
              <span className="capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <FieldLabel>Upload your design</FieldLabel>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={[
            'mt-2 flex h-24 w-full items-center justify-center gap-3 rounded-2xl border border-dashed bg-[#f7fbf9] px-4 text-sm text-[#244136] transition hover:border-[#00684A] hover:bg-[#eef8f3]',
            errors.fileName ? 'border-[#d84f68]' : 'border-[#9fb6ac]',
          ].join(' ')}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#00684A] text-white">
            <CirclePlus size={18} strokeWidth={2} />
          </span>
          <span>
            {form.fileName || 'Drag and drop your file or click to upload'}
          </span>
        </button>
        <p className="mt-2 text-xs text-[#7b8f87]">Valid file types: JPG and PNG, up to 5 MB</p>
        <ErrorText>{errors.fileName}</ErrorText>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel>What size do you need?</FieldLabel>
          {renderOptionPicker('sizeNeeded', quoteSelectOptions.sizeNeeded, errors.sizeNeeded)}
          <ErrorText>{errors.sizeNeeded}</ErrorText>
        </div>
        <div>
          <FieldLabel>Quantity needed?</FieldLabel>
          {renderOptionPicker('quantityNeeded', quoteSelectOptions.quantityNeeded, errors.quantityNeeded)}
          <ErrorText>{errors.quantityNeeded}</ErrorText>
        </div>
      </div>

      <div className="mt-5">
        <FieldLabel>What&apos;s your project timeline?</FieldLabel>
        {renderOptionPicker('projectTimeline', quoteSelectOptions.projectTimeline, errors.projectTimeline)}
        <ErrorText>{errors.projectTimeline}</ErrorText>
      </div>

      <div className="mt-5">
        <FieldLabel>Which technology do you need?</FieldLabel>
        <TechnologyPicker
          open={technologyPickerOpen}
          onToggle={() => {
            setOpenPickerId(null)
            setTechnologyPickerOpen((current) => !current)
          }}
          options={technologyOptions}
          value={form.technologyNeeded}
          onSelect={(nextValue) => {
            updateField('technologyNeeded', nextValue)
            setTechnologyPickerOpen(false)
          }}
        />
        <ErrorText>{errors.technologyNeeded}</ErrorText>
      </div>

      <div className="mt-6">
        <FieldLabel>Is your sign for indoor or outdoor usage?</FieldLabel>
        <div className="mt-3 flex gap-6">
          {['indoor', 'outdoor'].map((usage) => (
            <label key={usage} className="flex items-center gap-2 text-sm text-[#001E2B]">
              <input
                type="radio"
                checked={form.usage === usage}
                onChange={() => updateField('usage', usage)}
                className="h-4 w-4 border-[#9fb6ac] text-[#00684A] focus:ring-[#00ED64]"
              />
              <span className="capitalize">{usage}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <FieldLabel>Describe your project</FieldLabel>
        <textarea
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
          rows={4}
          maxLength={120}
          placeholder="We need our logo in warm white neon for the entry wall and one window-facing sign."
          className={[
            'mt-2 w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm text-[#001E2B] outline-none transition focus:border-[#00684A] focus:ring-4 focus:ring-[#00ED64]/15',
            errors.description ? 'border-[#d84f68]' : 'border-[#c9d8d2]',
          ].join(' ')}
        />
        <p className="mt-2 text-right text-xs text-[#7b8f87]">
          {form.description.length}/120
        </p>
        <ErrorText>{errors.description}</ErrorText>
      </div>

      <div className="mt-8 border-t border-[#dce9e3] pt-6">
        <h3 className="text-2xl font-semibold text-[#001E2B]">Contact</h3>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <FieldLabel>First name</FieldLabel>
          <InputField
            value={form.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
            placeholder="Enter first name"
            className={errors.firstName ? 'border-[#d84f68]' : ''}
          />
          <ErrorText>{errors.firstName}</ErrorText>
        </div>
        <div>
          <FieldLabel>Last name</FieldLabel>
          <InputField
            value={form.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
            placeholder="Enter last name"
            className={errors.lastName ? 'border-[#d84f68]' : ''}
          />
          <ErrorText>{errors.lastName}</ErrorText>
        </div>
        <div>
          <FieldLabel>Work email</FieldLabel>
          <InputField
            type="email"
            value={form.workEmail}
            onChange={(event) => updateField('workEmail', event.target.value)}
            placeholder="Enter email address"
            className={errors.workEmail ? 'border-[#d84f68]' : ''}
          />
          <ErrorText>{errors.workEmail}</ErrorText>
        </div>
        <div>
          <FieldLabel>Company name</FieldLabel>
          <InputField
            value={form.companyName}
            onChange={(event) => updateField('companyName', event.target.value)}
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[220px_1fr]">
        <div>
          <FieldLabel>Country code</FieldLabel>
          {renderCountryCodePicker(errors.country)}
        </div>
        <div>
          <FieldLabel>Phone number</FieldLabel>
          <InputField
            type="tel"
            value={form.phoneNumber}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            placeholder="912 345 6789"
            className={errors.phoneNumber ? 'border-[#d84f68]' : ''}
          />
          <p className="mt-2 text-xs text-[#7b8f87]">
            {phoneHint || 'Enter a valid phone number for the selected country.'}
          </p>
          <ErrorText>{errors.phoneNumber}</ErrorText>
        </div>
      </div>

      <div className="mt-5">
        <FieldLabel>How did you hear about us?</FieldLabel>
        {renderOptionPicker('hearAboutUs', quoteSelectOptions.hearAboutUs, errors.hearAboutUs)}
        <ErrorText>{errors.hearAboutUs}</ErrorText>
      </div>

      <div className="mt-8 space-y-4 border-t border-[#dce9e3] pt-6">
        <CheckboxField
          checked={form.promoOptIn}
          onChange={(event) => updateField('promoOptIn', event.target.checked)}
        >
          I&apos;d like to receive exclusive promotions, discounts, and product updates.
        </CheckboxField>
        <CheckboxField
          checked={form.smsOptIn}
          onChange={(event) => updateField('smsOptIn', event.target.checked)}
        >
          I would like to be notified by SMS when my quote is ready.
        </CheckboxField>
        <CheckboxField
          checked={form.agreeToTerms}
          onChange={(event) => updateField('agreeToTerms', event.target.checked)}
        >
          I agree with the Terms and Conditions and Privacy Policy.
        </CheckboxField>
        <ErrorText>{errors.agreeToTerms}</ErrorText>
      </div>

      <div className="mt-6">
        {submitMessage ? (
          <p className="mb-4 rounded-2xl border border-[#cce8dd] bg-[#f5fbf8] px-4 py-3 text-sm text-[#244136]">
            {submitMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-full bg-[#00684A] px-6 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#00563d] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  )
}
