require('should')
const { get } = require('./lib/utils')

describe('hub:sitelinks', () => {
  it('should redirect to the English Wikipedia by default', done => {
    get('/Q184226')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://en.wikipedia.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })

  it('should guess the language from the headers', done => {
    get('/Q184226', 'fr')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://fr.wikipedia.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })

  it('should give priority to the language in the query', done => {
    get('/Q184226?lang=de', 'fr')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://de.wikipedia.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })

  it('should take the site from the query', done => {
    get('/Q184226?site=wikiquote')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://en.wikiquote.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })

  it('should combine site and lang query parameters', done => {
    get('/Q184226?site=wikiquote&lang=fr')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://fr.wikiquote.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })

  it('should return the site for the first matching lang in the fallback chain', done => {
    get('/Q184226?lang=als,oc,fr,en')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://oc.wikipedia.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })

  it('should return the site for the first matching lang in the fallback chain, even on the fallback site', done => {
    get('/Q184226?site=wikivoyage&lang=als,oc,fr,en')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://oc.wikipedia.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })

  it('should fallback in the same project', done => {
    get('/Q184226?site=wikiquote&lang=ja')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://en.wikiquote.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })

  it('should fallback on the next project in the site chain', done => {
    get('/Q184226?site=wikivoyage,wikiquote,wikipedia&lang=als,oc,fr,en')
    .then(res => {
      res.statusCode.should.equal(302)
      res.headers.location.should.equal('https://fr.wikiquote.org/wiki/Gilles_Deleuze')
      done()
    })
    .catch(done)
  })
})