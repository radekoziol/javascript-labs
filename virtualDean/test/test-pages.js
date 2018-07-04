var expect = require('chai').expect;
var request = require('request');

var chai = require('chai')
    , chaiHttp = require('chai-http');

chai.use(chaiHttp);

const host = 'http://localhost:3000/';

it('Get works', function (done) {
    request('http://localhost:3000/api/students/1', function (error, response, body) {
        expect(JSON.parse(response.body).name)
            .to.equal('Radek Koziol');
        done();
    });
});

it('Update works', function (done) {

    chai.request(host)
        .put('api/students/1')
        .set('content-type', 'application/json')
        .send({name: 'eldo'})
        .end(function (err, res) {
            expect(JSON.parse(res.body).name)
                .to.equal('eldo');
        });

    done();

});


it('Post Student works', function (done) {

    chai.request(host)
        .post('api/students')
        .set('content-type', 'application/json')
        .send({name: 'xyz'})
        .end(function (err, res) {
            expect(JSON.parse(res.body).name)
                .to.equal('xyz');
        });

    done();

});


it('Post grades', function (done) {

    chai.request(host)
        .post('api/students/grades/4')
        .set('content-type', 'application/json')
        .send({grade: '2'})
        .end(function (err, res) {
            expect(JSON.parse(res.body).name)
                .to.equal('xyz');
        });

    done();

});

it('Delete works', function (done) {

    chai.request(host)
        .delete('api/students/4')
        .set('content-type', 'application/json')
        .end(function (err, res) {
            expect(JSON.parse(res.body).name)
                .to.equal('xyz');
        });

    done();

});

it('Bad status code if not existing', function (done) {

    chai.request(host)
        .delete('api/students/5')
        .set('content-type', 'application/json')
        .end(function (err, res) {
            expect(res).to.have.status(404);
        });

    done();

});




