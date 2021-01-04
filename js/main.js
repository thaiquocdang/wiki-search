import {
  clearPushListener,
  clearText,
  setSearchFocus,
  showClearTextBtn,
} from './searchBar.js'
import { getSearchTerm, goWiki } from './dataFunctions.js'
import {
  buildSearchResults,
  clearStatsLine,
  deleteSearchResults,
  setStatsLine,
} from './searchResults.js'

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initApp()
  }
})

const initApp = () => {
  //set focus
  setSearchFocus()
  //show clear button at search
  const search = document.getElementById('search')
  search.addEventListener('input', showClearTextBtn)

  //clear search content
  const clear = document.getElementById('clear')
  clear.addEventListener('click', clearText)
  clear.addEventListener('keydown', clearPushListener)

  const form = document.getElementById('searchBar')
  form.addEventListener('submit', submitTheSearch)
  // form.addEventListener('submit', handleSubmit)
}

//Procedural workflow function
const submitTheSearch = (event) => {
  event.preventDefault()

  //delete search results
  deleteSearchResults()

  //process the search
  processTheSearch()

  //set the focus
  setSearchFocus()
}

//Procedural
const processTheSearch = async () => {
  //clear the stats line
  clearStatsLine
  const searchTerm = getSearchTerm()
  if (searchTerm === '') return //if searchTerm empty

  //if not empty
  const resultArray = await goWiki(searchTerm)

  if (resultArray.length) buildSearchResults(resultArray)
  console.log(resultArray)
  //Set stats line
  setStatsLine(resultArray.length)
}

// const handleSubmit = async (event) => {
//   event.preventDefault()
//   try {
//     const url =
//       'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=dave&gsrlimit=10&prop=pageimages|extracts&exchars=130&exintro&explaintext&exlimit=max&format=json&origin=*'
//     const response = await fetch(url)
//     const datas = await response.json()
//     // fetch(url)
//     //   .then((response) => response.json())
//     //   .then((json) => console.log(json))
//     //   .catch((err) => console.error(err))
//     // console.log(data)
//     if (datas.hasOwnProperty('query')) {
//       const searchResults = datas.query.pages
//       console.log(searchResults)
//       // searchResults.prototype.forEach(function (result) {
//       //   console.log(result)
//       // })
//       Object.keys(searchResults).forEach((key) => {
//         const resultItem = `
//         <div class="resultItem">
//           <div class="resultTitle">
//             <a href="">${searchResults[key].title}</a>
//           </div>
//           <div class="resultContents">
//             <div class="resultImage">
//               <img src=${
//                 searchResults[key].thumbnail
//                   ? searchResults[key].thumbnail
//                   : null
//               } alt=${searchResults[key].title}>
//             </div>
//             <div class="resultText">
//               <p class="resultDescription">${
//                 searchResults[key].extract ? searchResults[key].extract : null
//               }</p>
//             </div>
//           </div>
//         </div>`

//         let searchItem = document.createElement('div')
//         searchItem.innerHTML = resultItem
//         const searchResultItems = document.getElementById('searchResults')
//         searchResultItems.appendChild(searchItem)
//       })
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }
