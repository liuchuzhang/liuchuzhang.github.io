const images = [
  'thumb_01.jpg',
  'thumb_02.jpg',
  'thumb_03.jpg',
  'thumb_04.jpg',
  'thumb_05.jpg',
  'thumb_06.jpg'
]

export default images.map(item => require(`./${item}`))
