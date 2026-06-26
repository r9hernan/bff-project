const formatRutNumbers = (rutNumbers: string): string => {
  return rutNumbers
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1.')
    .split('')
    .reverse()
    .join('')
    .replace(/^\./, '')
}

export const cleanRut = (rut: string): string => {
  return rut.replace(/[^0-9kK]/g, '').toUpperCase()
}

const calculateVerificationDigit = (rutNumbers: string): string => {
  let sum = 0
  let multiplier = 2

  for (let i = rutNumbers.length - 1; i >= 0; i--) {
    sum += parseInt(rutNumbers[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const remainder = sum % 11
  const digit = (11 - remainder).toString()

  if (digit === '11') {
    return '0'
  }
  if (digit === '10') {
    return 'K'
  }
  return digit
}

export const validateRut = (rut: string): boolean => {
  const cleanedRut = cleanRut(rut)

  if (cleanedRut.length < 8 || cleanedRut.length > 9) {
    return false
  }

  const verificationDigit = cleanedRut.slice(-1)
  const rutNumbers = cleanedRut.slice(0, -1)

  if (!/^\d+$/.test(rutNumbers)) {
    return false
  }

  if (!/^[0-9kK]$/i.test(verificationDigit)) {
    return false
  }

  const expected = calculateVerificationDigit(rutNumbers)
  return verificationDigit.toUpperCase() === expected.toUpperCase()
}

export const formatRutInput = (value: string): string => {
  const cleanedRut = cleanRut(value)

  if (cleanedRut.length === 0) {
    return ''
  }
  if (cleanedRut.length <= 1) {
    return cleanedRut
  }
  if (cleanedRut.length <= 8) {
    return formatRutNumbers(cleanedRut)
  }

  const verificationDigit = cleanedRut.slice(-1).toUpperCase()
  const rutNumbers = cleanedRut.slice(0, -1)
  return `${formatRutNumbers(rutNumbers)}-${verificationDigit}`
}
