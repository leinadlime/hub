const bundles = {
  image: [
    // Properties higher in the list have priority
    'P18',         // image
    'P4291',       // panorama view
    'P4640',       // photosphere image
    'P3451',       // nighttime view
    'P3383',       // film poster
    'P2716',       // collage image
    'P154',        // logo image
    'P41',         // flag image
    'P94',         // coat of arms image
    'P14',         // graphic symbol of thoroughfare
    'P15',         // route map
    'P109',        // signature
    'P117',        // chemical structure
    'P158',        // seal image
    'P181',        // taxon range map image
    'P207',        // bathymetry image
    'P242',        // locator map image
    'P367',        // astronomic symbol image
    'P491',        // orbit diagram
    'P692',        // Gene Atlas Image
    'P948',        // page banner
    'P1442',       // image of grave
    'P1543',       // monogram
    'P1621',       // detail map
    'P1766',       // place name sign
    'P1801',       // commemorative plaque image
    'P1846',       // distribution map
    'P1943',       // location map
    'P1944',       // relief location map
    'P2343',       // playing range image
    'P2425',       // service ribbon image
    'P2713',       // sectional view
    'P2910',       // icon
    'P2919',       // label in sign language
    'P3030',       // sheet music
    'P3311',       // plan image
    'P4004'        // shield image
  ],

  avatar: [
    // Magic properties to build an alternative URL from a claim value
    // see customUrl below and ./get_property_redirect_url.js
    'P2002>avatar', // Twitter avatar
    'P2003>avatar', // Instagram avatar
    'P2013>avatar'  // Facebook avatar
  ],

  social: [
    'P4033',  // Mastodon address
    'P2002',  // Twitter username
    'P2013',  // Facebook profile ID
    'P1997',  // Facebook Places ID
    'P4003',  // official Facebook page
    'P2003',  // Instagram username
    'P4173',  // Instagram location ID
    'P2847',  // Google+ ID
    'P4264'   // LinkedIn company ID
  ],

  // aliasing properties with wellknown shorter names
  // ex: 'OpenStreetMap' properties should be reachable using 'osm'
  osm: [ 'P402', 'P1282' ]
}

const replace = properties => {
  var props = []
  for (let property of properties) {
    if (bundles[property]) props = props.concat(bundles[property])
    else props.push(property)
  }
  return props
}

const getAvatarUrl = platform => (id, query) => {
  const size = getSizeFromWidth(query.width)
  return `https://avatars.io/${platform}/${id}/${size}`
}

const getSizeFromWidth = width => {
  if (!/^\d+$/.test(width)) return ''
  width = parseInt(width)
  if (width > 256) return ''
  if (width > 128) return 'large'
  if (width > 48) return 'medium'
  return 'small'
}

const customUrl = {
  avatar: {
    P2002: getAvatarUrl('twitter'),
    P2003: getAvatarUrl('instagram'),
    P2013: getAvatarUrl('facebook')
  }
}

module.exports = { bundles, replace, customUrl }
