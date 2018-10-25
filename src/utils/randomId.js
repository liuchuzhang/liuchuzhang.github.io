export default function randomId(len = 6) {
  const uuid = 'wqoewqddsadksldjfoidjioqeqwewqeolzx1234567890'
  let result = ''
  while (result.length < len) {
    result += uuid.charAt(Math.floor(Math.random() * uuid.length))
  }
  return result
}
