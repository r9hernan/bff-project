export const useEmailValidation = () => {
  return {
    required: 'El email es requerido',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'El email no es v\u00e1lido'
    }
  }
}

export const usePhoneValidation = () => {
  return {
    required: 'El tel\u00e9fono es requerido',
    pattern: {
      value: /^\d{9}$/,
      message: 'El tel\u00e9fono debe tener 9 d\u00edgitos'
    }
  }
}

const validateNotFuture = (
  value: string | number | boolean | undefined
): true | string => {
  if (!value || typeof value !== 'string') {return true}
  const selectedDate = new Date(value)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return selectedDate <= today || 'La fecha no puede ser en el futuro'
}

const calculateAge = (selectedDate: Date, today: Date): number => {
  const age = today.getFullYear() - selectedDate.getFullYear()
  const monthDiff = today.getMonth() - selectedDate.getMonth()
  const dayDiff = today.getDate() - selectedDate.getDate()
  return monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)
    ? age - 1
    : age
}

const validateMinAge = (
  value: string | number | boolean | undefined
): true | string => {
  if (!value || typeof value !== 'string') {return true}
  const selectedDate = new Date(value)
  const today = new Date()
  const actualAge = calculateAge(selectedDate, today)
  return actualAge >= 18 || 'Debes tener al menos 18 a\u00f1os'
}

export const useBirthdayValidation = () => {
  const today = new Date()
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
  const maxDateString = maxDate.toISOString().split('T')[0]

  return {
    required: 'La fecha de nacimiento es requerida',
    max: {
      value: maxDateString,
      message: 'Debes tener al menos 18 a\u00f1os'
    },
    validate: {
      notFuture: validateNotFuture,
      minAge: validateMinAge
    }
  }
}
