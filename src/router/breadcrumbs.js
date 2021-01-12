const skipPaths = [
  // KRM views to skip in the breadcrumbs
]

const skipTitles = [
  // KRM strings to remove from breadcrumb titles
  'classlibcellml_1_1',
]

export function calculateBreadcrumbs(to) {
  // Breadcrumb calculation. Note that this cannot be based on
  // the "from" pages as there are a lot of cross links, so it's not
  // simply about adding/subtracting items from a known list.
  let items = [
    {
      text: 'home',
      disabled: false,
      href: '/',
      type: 'block',
    },
  ]

  if (to.name === 'Home') {
    items[0].disabled = true
  } else if (
    to.name === '404' ||
    to.name === 'About' ||
    to.name === 'Developers' ||
    to.name === 'Download' ||
    to.name === 'Documentation'
  ) {
    items.push({
      text: to.name,
      disabled: true,
      href: to.path,
      type: 'block',
    })
  }
  else if (to.name === 'APIReferencePage') {
    let lastLink = '/documentation/api'
    let path = to.path.replaceAll(lastLink, '')
    let pages = path.split('/')

    // Add hard links to the documentation pages for the root of the breadcrumbs
    items.push({
      text: 'Documentation',
      disabled: false,
      href: '/#documentation',
      type: 'block',
    })
    items.push({
      text: 'API',
      disabled: false,
      href: '/documentation/api/' + pages[1],
      type: 'block',
    })
    // This takes care of versioning.
    items.push({
      text: pages[1],
      disabled: false,
      href: '',
      type: 'versions',
    })
    lastLink = lastLink + '/' + pages[1]
    pages = pages.slice(2)
    pages.forEach(page => {
      if (page) {
        lastLink = lastLink + '/' + page

        let bookmarkText = page
        skipTitles.forEach(title => {
          bookmarkText = bookmarkText.replaceAll(title, '')
        })
        bookmarkText.replaceAll('_', ' ')

        items.push({
          text: bookmarkText,
          disabled: false,
          href: lastLink,
        })
      }
    })
  }
  else if (to.name === 'TutorialsPage' || to.name === 'Tutorials') {
    let lastLink = '/documentation/tutorials'
    let path = to.path.replaceAll(lastLink, '')
    let pages = path.split('/')

    // Add hard links to the documentation pages for the root of the breadcrumbs
    items.push({
      text: 'Documentation',
      disabled: false,
      href: '/#documentation',
      type: 'block',
    })
    // The aim of this link is to direct the user to whatever version of the intro page that
    // they're currently seeing.
    items.push({
      text: 'Tutorials',
      disabled: false,
      href: '/documentation/tutorials/' + pages[1],
      type: 'block',
    })

    // This takes care of versioning: the 'versions' type will make a dropdown menu from
    // the breadcrumbs (cf. the 'block' type elsewhere).
    items.push({
      text: pages[1],
      disabled: false,
      href: '',
      type: 'versions',
    })

    lastLink = lastLink + '/' + pages[1]

    pages = pages.slice(2)
    pages.forEach(page => {
      if (page && page != 'index') {
        lastLink = lastLink + '/' + page
        let href = lastLink + '/index'
        // Remove page items from the list if they're in directories that don't have an index file
        if (!skipPaths.includes(lastLink)) {
          items.push({
            text: page.replaceAll('_', ' '),
            disabled: false,
            href: href,
          })
        }
      }
    })
  }
  // KRM reversing order of breadcrumbs so that we can truncate the list on the left hand side.
  return items.slice().reverse()
}
