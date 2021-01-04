export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById('search').value.trim()
  // console.log(rawSearchTerm)
  const regex = /[ ]{2,}/gi //look for wherever has 2 or more spaces
  const searchTerm = rawSearchTerm.replaceAll(regex, ' ') //replace by 1 space
  return searchTerm
}

export const goWiki = async (searchTerm) => {
  const wikiSearchString = getWikiSearchString(searchTerm)
  const wikiSearchResults = await requestData(wikiSearchString)
  let resultArray = []
  if (wikiSearchResults.hasOwnProperty('query')) {
    resultArray = processWikiResults(wikiSearchResults.query.pages)
  }

  return resultArray
}

const getWikiSearchString = (searchTerm) => {
  //maximum characters retrieve back
  const maxChars = getMaxChars()
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`
  const searchString = encodeURI(rawSearchString) //encode spaces & different characters
  return searchString
}

const getMaxChars = () => {
  //get view point width
  const width = window.innerWidth || document.body.clientWidth
  let maxChars
  if (width < 414) maxChars = 65
  if (width >= 414 && width < 1400) maxChars = 100
  if (width >= 1400) maxChars = 130
  return maxChars
}

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString)
    const data = response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const processWikiResults = (results) => {
  const resultArray = []
  Object.keys(results).forEach((key) => {
    const id = key
    const title = results[key].title
    // const text = results[key].extract ? results[key].extract : ''
    const text = results[key].hasOwnProperty('extract')
      ? results[key].extract
      : null
    const img = results[key].hasOwnProperty('thumbnail')
      ? results[key].thumbnail.source
      : null

    const item = {
      id: id,
      title: title,
      img: img,
      text: text,
    }

    resultArray.push(item)
  })

  return resultArray
}
