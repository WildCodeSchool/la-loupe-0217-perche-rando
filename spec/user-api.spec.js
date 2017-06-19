const assert = require('assert');
const request = require('supertest');

const app = 'http://localhost:3000';
let admin_token, userId;

describe('Tests for API', function() {

    it('should create a user', function(done) {
        request(app)
        .post('/users')
        .send({
            email: 'test@email.com',
            password: 'd',
            firstname: 'Testy',
            lastname: 'McTestFace'
        })
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            assert.equal(res.body.user.email, "test@email.com");
            assert.equal(res.body.user.firstname, "Testy");
            assert.equal(res.body.user.lastname, "McTestFace");
            userId = res.body.user._id;
            done();
        });
    });

    it('should connect as admin', function(done) {
        request(app)
        .post('/login')
        .send({
            email: 'admin@mail.com',
            password: '12345',
        })
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            let admin = res.body.user;
            admin_token = res.body.token;
            assert.equal(admin.email, 'admin@mail.com');
            done();
        });
    });

    it('should delete the user', function(done) {
        request(app)
        .delete('/users/' + userId)
        .set('authorization', admin_token)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            done();
        });
    });
});
