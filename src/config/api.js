import _ from 'lodash';

export function fetchData(selectedRover, pageNumber) {
  // Build URL
  let apiKey = '&api_key=aUAGk6rR3RkkPPjDdZ0I2ov1Tp4SI6azVbWI7d9k'
  let baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
  let roverName = '';
  switch(parseInt(selectedRover)) {
    case 0:
      roverName = "curiosity" + "/photos?"
      console.log("Curiosity")
      break;
    case 1:
      roverName = "opportunity" + "/photos?"
      console.log("Opportunity")

      break;
    case 2:
      roverName = "spirit" + "/photos?"
      console.log("Spirit")

      break;
    default:
  }
  const URL = baseUrl + roverName + "sol=max&page=" + pageNumber + apiKey;
  // Fetch data

  return fetch(URL)
  .then((response)=>response.json())
}

// Convert Data
convertDataToSections(data) {
  let roverData = data;
  roverData = _.groupBy(roverData.photos, d => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' }
    let earthDate = new Date(Date.parse(d.earth_date))
    let earthDay = earthDate.toLocaleDateString('en-US', options)
    return "Sol " + d.sol + " / " + earthDay
  })

  roverData = _.reduce(roverData.photos, (acc, next, index) => {
    acc.push({
      title: index,
      data: next
    });
    return acc
  }, [])

  return roverData;
}


// Old fetch

// fetchData(selectedRover, pageNumber) {
//   // Build URL
//   let apiKey = '&api_key=aUAGk6rR3RkkPPjDdZ0I2ov1Tp4SI6azVbWI7d9k'
//   let baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
//   let roverName = '';
//   switch(parseInt(selectedRover)) {
//     case 0:
//       roverName = "curiosity" + "/photos?"
//       console.log("Curiosity")
//       break;
//     case 1:
//       roverName = "opportunity" + "/photos?"
//       console.log("Opportunity")
//
//       break;
//     case 2:
//       roverName = "spirit" + "/photos?"
//       console.log("Spirit")
//
//       break;
//     default:
//   }
//   const URL = baseUrl + roverName + "sol=max&page=" + pageNumber + apiKey;
//   // Fetch data
//   fetch(URL)
//   .then((response)=>response.json())
//   .then(function(data){
//     let roverData = data;
//     roverData = _.groupBy(roverData.photos, d => {
//       var options = { year: 'numeric', month: 'long', day: 'numeric' }
//       let earthDate = new Date(Date.parse(d.earth_date))
//       let earthDay = earthDate.toLocaleDateString('en-US', options)
//       return "Sol " + d.sol + " / " + earthDay
//     })
//
//     roverData = _.reduce(roverData.photos, (acc, next, index) => {
//       acc.push({
//         title: index,
//         data: next
//       });
//       return acc
//     }, [])
//   })
//   console.log(roverData)
// }
