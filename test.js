var expect = require('chai').expect;
var server = require('./server');
const request = require('request');

describe('call getProduct', function () {
    it('should give 400', function () {
        var options = {
            'url': 'http://localhost:3001/getProduct',
            'method': 'GET',
        };
        request(options, (error, response, body) => {
            console.log(body, response.statusCode);
            expect(response.statusCode).to.equal(400);
        });
    });
    it('should give 200', function () {
        var options = {
            'url': 'http://localhost:3001/getProduct',
            'method': 'GET',
            'qs': { 'param1': 'p1', 'param2': 'p2' }
        };
        request(options, (error, response, body) => {
            console.log(body, response.statusCode);
            expect(response.statusCode).to.equal(200);
        });
    });
});

describe('call getNonRepeatingChar', function () {
    it('should give 500', function () {
        var options = {
            'url': 'http://localhost:3001/getNonRepeatingChar',
            'method': 'GET',
            'qs': { param1: 'abcabc' }
        };
        request(options, (error, response, body) => {
            // console.log(body, response.statusCode);
            expect(response.statusCode).to.equal(500);
        });
    });
    it('should give 200', function () {
        var options = {
            'url': 'http://localhost:3001/getNonRepeatingChar',
            'method': 'GET',
            'qs': { 'param1': 'abc' }
        };
        request(options, (error, response, body) => {
            // console.log(body, response.statusCode);
            expect(response.statusCode).to.equal(200);
            // expect(response.body).to.equal('a');
        });
    });
});

describe('call webCrawler', function () {
    it('should give 400', function () {
        var options = {
            'url': 'http://localhost:3001/webCrawler',
            'method': 'GET',
        };
        request(options, (error, response, body) => {
            // console.log(body, response.statusCode);
            expect(response.statusCode).to.equal(400);
        });
    });
    it('should give Invalid URI', function () {
        var options = {
            'url': 'http://localhost:3001/webCrawler',
            'method': 'GET',
            'qs': { 'param1': 'websiteUrl' }
        };
        request(options, (error, response, body) => {
            // console.log(body, response.statusCode);
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.body)).to.have.property('error');
        });
    });
    it('should give 200', function () {
        var options = {
            'url': 'http://localhost:3001/webCrawler',
            'method': 'GET',
            'qs': { 'param1': 'http://wiprodigital.com' }
        };
        request(options, (error, response, body) => {
            // console.log(body, response.statusCode);
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.body)).to.have.property('urls');
        });
    });
});