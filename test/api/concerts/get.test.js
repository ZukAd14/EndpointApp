const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408',
            performer: 'Alonzo Gomez',
            genre: 'Metal',
            price: 30,
            day: 2,
            image: '/img/uploads/1fsd324fsdg.jpg'});
        await testConcertOne.save();

        const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48',
            performer: 'Ech Beng',
            genre: 'Kpop',
            price: 8,
            day: 3,
            image: '/img/uploads/2f342s4fsdg.jpg'});
            await testConcertTwo.save();
    });

    it('/performer/:performer should return performer', async () => {
        const res = await request(server).get('/api/concerts/performer/Alonzo Gomez');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].performer).to.be.equal('Alonzo Gomez');
    });

    it('/genre/:genre should return genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Metal');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].performer).to.be.equal('Alonzo Gomez');
    });

    it('/price/:price_min/:price_max should return price beetwen price min and max', async () => {
        const res = await request(server).get('/api/concerts/price/7/10');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].performer).to.be.equal('Ech Beng');
    });

    it('/day/day should return day', async () => {
        const res = await request(server).get('/api/concerts/day/3');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].performer).to.be.equal('Ech Beng');
    });

    after(async () => {
        await Concert.deleteMany({});
    });
})