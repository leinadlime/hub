
<!-- this file is built by ./scripts/build_readme
Make your edits in docs/readme -->

# Hub

This is a **Web hub**: it let's you craft URLs to go from an **origin** to a **destination** on the web, at the condition that you provide enough information on those points to be identified within [Wikidata](https://wikidata.org). It works primarly around Wikimedia sites, but given the amount Wikidata knows about the web at large, it can get you pretty far! And if you don't know where you want to go, that's ok too: this will just bring you to the closest Wikipedia article.

**Target audience**:
- Wikidata-centered tools developers
- URL craftmen: people who like to browse the web by tweaking URLs

**A few examples to catch your interest**:

we can now link to Wikipedia articles about a concept in the user's favorite language:
- from a Wikidata id: [/Q3](https://tools.wmflabs.org/hub/Q3)
- from an article title from the English Wikipedia: [/Lyon](https://tools.wmflabs.org/hub/Lyon)
- or another Wikipedia: [/zh:阿根廷](https://tools.wmflabs.org/hub/zh:阿根廷)
- or any Wikimedia project: [/frwikivoyage:Allemagne](https://tools.wmflabs.org/hub/frwikivoyage:Allemagne)
- or any external id known by Wikidata: [/twitter:doctorow](https://tools.wmflabs.org/hub/twitter:doctorow)

but, after choosing your starting point, you can also customize your destination:
- here we go from one Wikipedia to the other: [/en:Economy?lang=de](https://tools.wmflabs.org/hub/en:Economy?lang=de)
- here from Wikidata to Wikiquote: [/Q184226?site=wikiquote](https://tools.wmflabs.org/hub/Q184226?site=wikiquote)
- between any external ids known by Wikidata: [/viaf:24597135?property=P1938](https://tools.wmflabs.org/hub/viaf:24597135?property=P1938)

for your next prototype, illustrate your concepts the lazy way:

<!-- Using local images as Github messes with the raw URLs -->
|  image                                           | src                                         |
|:-------------------------------------------------|:--------------------------------------------|
| ![avatar example](https://raw.githubusercontent.com/maxlath/hub/master/assets/images/esa.jpeg)        | [/Q42262?property=avatar&width=128](https://tools.wmflabs.org/hub/Q42262?property=avatar&width=128)         |
| ![image example](https://raw.githubusercontent.com/maxlath/hub/master/assets/images/laniakea.jpg)     | [/frwiki:Laniakea?property=image&width=256](https://tools.wmflabs.org/hub/frwiki:Laniakea?property=image&width=256) |

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [User Guide](#user-guide)
  - [Origin](#origin)
    - [Wikidata id](#wikidata-id)
    - [Wikipedia and other Wikimedia Project](#wikipedia-and-other-wikimedia-project)
    - [External Ids](#external-ids)
  - [Destination](#destination)
    - [Default](#default)
    - [Wikimedia Projects](#wikimedia-projects)
        - [lang](#lang)
        - [site](#site)
    - [Following a claim](#following-a-claim)
        - [properties bundles](#properties-bundles)
  - [JSON](#json)
  - [Query the Hub as a search engine](#query-the-hub-as-a-search-engine)
    - [Firefox](#firefox)
    - [Chrome](#chrome)
- [Developer Guide](#developer-guide)
  - [Dependencies](#dependencies)
  - [Install](#install)
  - [Deploy](#deploy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## User Guide

Every URL is built as **a bridge between two points, an origin and a destination**:
* the **origin** depends on **what you have at hand**: a Wikidata id? some string that might match an Wikipedia article title? in a precise language or in any language? an identifier in an external database?
* the **destination** depends on **where you would like to go**: would you just like to be show the most relevant associated Wikipedia article for this origin point, or do you have a more precise target language, project, external website?

The separation between the origin and the destination is expressed in the URL by the `?`: everything before the `?` aims to identify the origin, everything after identifies the destination.

Example:

* url: [/enwiki:Economy?lang=nl&site=wikinews](https://tools.wmflabs.org/hub/enwiki:Economy?lang=nl&site=wikinews)
* origin: the [`Economy` article in the English Wikipedia](https://en.wikipedia.org/wiki/Economy)
* destination: [the corresponding article in the Dutch Wikinews](https://nl.wikinews.org/wiki/Categorie:Economie)

### Origin

#### Wikidata id
As the real hub in this story is Wikidata, every request needs to first resolve to a Wikidata id, which can thus be considered the primary origin point:

|  request                                    | redirection                                          |
|:--------------------------------------------|:-----------------------------------------------------|
| [/Q1](https://tools.wmflabs.org/hub/Q1)                                       | https://en.wikipedia.org/wiki/Universe               |
| [/Q2](https://tools.wmflabs.org/hub/Q2)                                       | https://en.wikipedia.org/wiki/Earth                  |
| ...                                         |                                                      |
| [/Q1388426](https://tools.wmflabs.org/hub/Q1388426)                                 | https://en.wikipedia.org/wiki/Bo%C3%ABn-sur-Lignon   |

#### Wikipedia and other Wikimedia Project

Alternatively to a Wikidata id, you can pass a key built from sitelinks as starting point, defaulting to `enwiki`.

|  request                                         | redirection                                                                             |
|:-------------------------------------------------|:----------------------------------------------------------------------------------------|
| [/frwikivoyage:Allemagne](https://tools.wmflabs.org/hub/frwikivoyage:Allemagne)                        | https://en.wikipedia.org/wiki/Germany                                                   |
| [/eswikinews:Categoría:Alemania](https://tools.wmflabs.org/hub/eswikinews:Categoría:Alemania)                 | https://en.wikipedia.org/wiki/Germany                                                   |
| [/ocwiki:Alemanha?lang=de](https://tools.wmflabs.org/hub/ocwiki:Alemanha?lang=de)                       | https://de.wikipedia.org/wiki/Deutschland                                               |
| [/ocwiki:Alemanha?lang=el,fa&site=wikivoyage](https://tools.wmflabs.org/hub/ocwiki:Alemanha?lang=el,fa&site=wikivoyage)    | https://el.wikivoyage.org/wiki/%CE%93%CE%B5%CF%81%CE%BC%CE%B1%CE%BD%CE%AF%CE%B1         |
| [/enwiki:Edward_Snowden?property=P2002](https://tools.wmflabs.org/hub/enwiki:Edward_Snowden?property=P2002)          | https://twitter.com/Snowden                                                             |
| [/enwiki:DIY?site=wikidata](https://tools.wmflabs.org/hub/enwiki:DIY?site=wikidata)                      | https://www.wikidata.org/wiki/Q26384                                                    |
| [/DIY?site=wikidata](https://tools.wmflabs.org/hub/DIY?site=wikidata)                             | https://www.wikidata.org/wiki/Q26384                                                    |

#### External Ids
|  request                                         | redirection                                                                             |
|:-------------------------------------------------|:----------------------------------------------------------------------------------------|
| [/P214:24597135](https://tools.wmflabs.org/hub/P214:24597135)                                 | https://en.wikipedia.org/wiki/Isaac_Asimov                                              |
| [/viaf:24597135](https://tools.wmflabs.org/hub/viaf:24597135)                                 | https://en.wikipedia.org/wiki/Isaac_Asimov                                              |
| [/twitter:doctorow](https://tools.wmflabs.org/hub/twitter:doctorow)                              | https://en.wikipedia.org/wiki/Cory_Doctorow                                             |

### Destination
#### Default
By default, the destination is Wikipedia in the user language, which is guessed from the request `accept-language` header, falling back to English if the language header can't be found or the Wikipedia page doesn't exist in this language.

|  request                                    | redirection                                          |
|:--------------------------------------------|:-----------------------------------------------------|
| [/Q184226](https://tools.wmflabs.org/hub/Q184226)                                  | https://en.wikipedia.org/wiki/Gilles_Deleuze         |

#### Wikimedia Projects
###### lang

Pass a `lang` parameter (or just `l`) to override the `accept-language` header. Pass several values to set the fallback chain.

|  request                                    | redirection                                          |
|:--------------------------------------------|:-----------------------------------------------------|
| [/Q184226?lang=fr](https://tools.wmflabs.org/hub/Q184226?lang=fr)                          | https://fr.wikipedia.org/wiki/Gilles_Deleuze         |
| [/Q184226?lang=als,oc,fr,en&site=wikiquote](https://tools.wmflabs.org/hub/Q184226?lang=als,oc,fr,en&site=wikiquote) | https://oc.wikipedia.org/wiki/Gilles_Deleuze         |

###### site

Pass a `site` parameter (or just `s`) to redirect to another site than `wikipedia`. Pass several values to set the fallback chain. When combined with a `lang` fallback chain, the site fallback has priority.

|  request                                                           | redirection                                          |
|:-------------------------------------------------------------------|:-----------------------------------------------------|
| [/Q184226?site=wikiquote](https://tools.wmflabs.org/hub/Q184226?site=wikiquote)                                          | https://en.wikiquote.org/wiki/Gilles_Deleuze         |
| [/Q184226?site=wikivoyage](https://tools.wmflabs.org/hub/Q184226?site=wikivoyage)                                         | https://en.wikipedia.org/wiki/Gilles_Deleuze         |
| [/Q184226?site=wikivoyage,wikiquote](https://tools.wmflabs.org/hub/Q184226?site=wikivoyage,wikiquote)                               | https://en.wikiquote.org/wiki/Gilles_Deleuze         |
| [/Q184226?site=wikiquote&lang=fr](https://tools.wmflabs.org/hub/Q184226?site=wikiquote&lang=fr)                                  | https://fr.wikiquote.org/wiki/Gilles_Deleuze         |
| [/Q184226?site=wikivoyage,wikiquote,wikipedia&lang=als,oc,fr,en](https://tools.wmflabs.org/hub/Q184226?site=wikivoyage,wikiquote,wikipedia&lang=als,oc,fr,en)   | https://fr.wikiquote.org/wiki/Gilles_Deleuze         |

This can also include sites that can build URLs from Wikidata ids:

|  request                                                           | redirection                                          |
|:-------------------------------------------------------------------|:-----------------------------------------------------|
| [/Q23936146?site=crotos](https://tools.wmflabs.org/hub/Q23936146?site=crotos)                                           | http://zone47.com/crotos/?q=Q23936146                |
| [/Q184226?site=inventaire](https://tools.wmflabs.org/hub/Q184226?site=inventaire)                                         | https://inventaire.io/entity/wd:Q184226              |
| [/Q184226?site=reasonator](https://tools.wmflabs.org/hub/Q184226?site=reasonator)                                         | https://tools.wmflabs.org/reasonator/?q=Q184226      |
| [/Q184226?site=scholia](https://tools.wmflabs.org/hub/Q184226?site=scholia)                                            | https://tools.wmflabs.org/scholia/Q184226            |
| [/Q184226?site=sqid](https://tools.wmflabs.org/hub/Q184226?site=sqid)                                               | https://tools.wmflabs.org//sqid/#/view?id=Q184226    |

**short site names**

You can use short versions of those sites names:

| long            | short            |
|-----------------|:-----------------|
| `wikidata `     | `wd`             |
| `wikipedia`     | `wp`             |
| `commons`       | `c`              |
| `wikisource`    | `ws`             |
| `wikiquote`     | `wq`             |
| `wiktionary`    | `wt`             |
| `wikivoyage`    | `wv`             |
| `wikiversity`   | `wy`             |
| `wikinews`      | `wn`             |
| `inventaire`    | `inv`            |
| `reasonator`    | `re`             |
| `scholia`       | `sc`             |
| `sqid`          | `sq`             |

Example: [/Q184226?s=wq,wp,inv,wd&l=fr,en,de](https://tools.wmflabs.org/hub/Q184226?s=wq,wp,inv,wd&l=fr,en,de)

#### Following a claim

Pass a `property` parameter (or just `p`) to get the destination from the entity claims associated to the desired property. The following examples illustrate the different behaviors depending on the property type:

|  **request**                                      | **redirection**                                                                                   |
|---------------------------------------------------|---------------------------------------------------------------------------------------------------|
|                                                   |                                                                                                   |
| **Url**                                           |                                                                                                   |
| [/Q21980377?property=P856](https://tools.wmflabs.org/hub/Q21980377?property=P856)                        | https://sci-hub.tw                                                                                |
| [/Q1103345?property=P953](https://tools.wmflabs.org/hub/Q1103345?property=P953)                         | http://www.cluetrain.com/#manifesto                                                               |
| [/Q756100?property=P1324](https://tools.wmflabs.org/hub/Q756100?property=P1324)                         | https://github.com/nodejs/node                                                                    |
| [/Q132790?property=P4238,P856](https://tools.wmflabs.org/hub/Q132790?property=P4238,P856)                    | http://www.biarritz.fr/webcam_2.html                                                              |
|                                                   |                                                                                                   |
| **ExternalId**                                    |                                                                                                   |
| [/Q34981?property=P1938](https://tools.wmflabs.org/hub/Q34981?property=P1938)                          | https://www.gutenberg.org/ebooks/author/35316                                                     |
| [/Q624023?property=P2002,P2003](https://tools.wmflabs.org/hub/Q624023?property=P2002,P2003)                   | https://twitter.com/EFF                                                                           |
|                                                   |                                                                                                   |
| **WikibaseItem**                                  |                                                                                                   |
| [/Q155?property=P38](https://tools.wmflabs.org/hub/Q155?property=P38)                              | https://en.wikipedia.org/wiki/Brazilian_real                                                      |
|                                                   |                                                                                                   |
| **CommonsMedia**                                  |                                                                                                   |
| [/Q241?property=P242](https://tools.wmflabs.org/hub/Q241?property=P242)                             | https://commons.wikimedia.org/wiki/Special:FilePath/Cuba_(orthographic_projection).svg            |
| [/Q241?property=P242&width=1000](https://tools.wmflabs.org/hub/Q241?property=P242&width=1000)                  | https://commons.wikimedia.org/wiki/Special:FilePath/Cuba_(orthographic_projection).svg?width=1000 |
|                                                   |                                                                                                   |
| **GlobeCoordinate**                               |                                                                                                   |
| [/Q25373?property=P625](https://tools.wmflabs.org/hub/Q25373?property=P625)                           | https://www.openstreetmap.org/?mlat=35.2542&mlon=-24.2585                                         |
|                                                   |                                                                                                   |

Not supported: `String`, `Time`, `Monolingualtext`, `Quantity`, `WikibaseProperty`, `Math`

A `w` can be used for short for `width`.

###### properties bundles

Instead of a list of properties, you can use special bundle keys, that behave like a list of properties.
The `image` and `avatar` bundles are designed to be a cheap way to give an image to an entity:
```html
<img src="/Q624023?property=image,avatar&width=256" />
```

|  **request**                                     | **redirection**                                                                                   |
|--------------------------------------------------|---------------------------------------------------------------------------------------------------|
| [/Q624023?property=image](https://tools.wmflabs.org/hub/Q624023?property=image)                        | https://commons.wikimedia.org/wiki/Special:FilePath/EFF_Logo.svg                                  |
| [/Q624023?property=avatar](https://tools.wmflabs.org/hub/Q624023?property=avatar)                       | https://avatars.io/twitter/EFF/                                                                   |
| [/Q624023?property=social](https://tools.wmflabs.org/hub/Q624023?property=social)                       | https://twitter.com/EFF                                                                           |
| [/Q604319?property=social](https://tools.wmflabs.org/hub/Q604319?property=social)                       | https://tools.wmflabs.org/wikidata-externalid-url/?p=4033&id=LaQuadrature@mamot.fr                |
| [/Q624023?property=image,avatar&width=120](https://tools.wmflabs.org/hub/Q624023?property=image,avatar&width=120)       | https://commons.wikimedia.org/wiki/Special:FilePath/EFF_Logo.svg?width=120                        |
| [/Q604319?property=avatar,image&width=256](https://tools.wmflabs.org/hub/Q604319?property=avatar,image&width=256)       | https://avatars.io/twitter/laquadrature/large                                                     |
| [/Q241?p=P242&w=1000](https://tools.wmflabs.org/hub/Q241?p=P242&w=1000)                            | https://commons.wikimedia.org/wiki/Special:FilePath/Cuba_(orthographic_projection).svg?width=1000 |

### JSON
You can get a JSON response (status code `200`) instead of a redirection (status code `302`) by adding the query parameter `format=json`. Ex: [/Q184226?lang=fr&format=json](https://tools.wmflabs.org/hub/Q184226?lang=fr&format=json)
This can be useful for debugging, or to use the internal resolver as a JSON API.

### Query the Hub as a search engine
Building Hub URLs from the URL bar requires a few steps:
- go to your browser URL bar (shortcut: `Ctrl+L` or `Alt+D`)
- enter some keys to make your history suggest one of your previous `https://tools.wmflabs.org/hub/` URLs
- edit the URL as you please. Example: https://tools.wmflabs.org/hub/Q1?l=fr

But we could be even more lazy by adding Hub as a search engine to your browser (see tutorials hereafter for [firefox](#firefox) and [chrome](#chrome)). The steps can now be as follow (assuming you set `hub` as search engine keyword):
- go to your browser URL bar (shortcut: `Ctrl+L` or `Alt+D`)
- enter the URL elements as you would do if you where editing the `https://tools.wmflabs.org/hub/` URL, separating elements with spaces. Example: `hub Q1 l=fr`

#### Firefox
- Follow this tutorial to add <https://tools.wmflabs.org/hub> to your search engines list: [Add a search engine](https://support.mozilla.org/en-US/kb/add-or-remove-search-engine-firefox#w_add-a-search-engine)
- In [about:preferences#search](about:preferences#search), on the Hub search engine line:
   -  double click the **keyword** column to edit it
   -  enter a keyword (we will hereafter assume that you set it to `hub`)
- Try it:
  -  go to your browser address bar (shortcut: `Ctrl+L` or `Alt+D`)
  -  type `hub Q1 l=fr`, that should bring you to https://fr.wikipedia.org/wiki/Univers

#### Chrome
- go to [chrome://settings/searchEngines](chrome://settings/searchEngines)
- in the **Other search engines** section, click **Add**, and fill as follow:
  - **Search Engine**: Hub
  - **Keyword**: hub
  - **URL with %s instead of the request**: https://tools.wmflabs.org/hub/query?q=%s
- Try it:
  -  go to your browser address bar (shortcut: `Ctrl+L`)
  -  type `hub`, press `Tab`: the address bar should now display `Search on Hub`
  -  you can now type your query, and press `Enter` (ex: `Q1 l=fr` will bring you to https://fr.wikipedia.org/wiki/Univers)


## Developer Guide

* Wikimedia Toolforge: https://toolsadmin.wikimedia.org/tools/id/hub
* Source code: https://github.com/maxlath/hub

### Dependencies
* [NodeJS](https://nodejs.org) `>v6.4.0` (recommanded way to install: [NVM](https://github.com/creationix/nvm))

### Install
```sh
git clone github.com/maxlath/hub
cd hub
npm install
# Starts the server on port 2580 and watch for files changes to restart
npm run watch
```

### Deploy
The step followed to setup this tool on tools.wmflabs.org are documented here: [deploy](https://github.com/maxlath/hub/blob/master/docs/deploy.md)

