import supertest from "supertest";
import app from "../server.js";
import { connect, closeDatabase, clearDatabase } from './db-handler.js';

// Pass supertest agent for each test
const request = supertest(app);

// Setup connection to the database
beforeAll( async() => {
    await connect()
});
beforeEach( async() => {
    await clearDatabase()
});
afterAll( async() => {
    await closeDatabase()
});



describe('POST /register', () => {
    it('It should successfully store a new user',  async() => {
      await request
        .post('/register')
        .send({ firstName: 'john', lastName: 'doe', email: 'test@test.com', password: '123456', country: 'Nigeria' })
        .expect(200)
        .then(res => {
            expect(res.body.message).toBe('successful'); 
        });
    });

    it('registering without a firstName should throw an error', async() => {
        await request
            .post('/register')
            .send({ lastName: 'doe', email: 'test@test.com', password: '123456', country: 'Nigeria' })
            .expect(400)
            .then(res => {
                expect(res.body.message).toBe("Please fill all fields");
            });
    });

    it('registering without a lastName should throw an error',  async () => {
        await request
            .post('/register')
            .send({ firstName: 'john', email: 'test@test.com', password: '123456', country: 'Nigeria' })
            .expect(400)
            .then(res => {
                expect(res.body.message).toBe("Please fill all fields");
            });
    });

    it('registering without an email should throw an error',  async () => {
        await request
            .post('/register')
            .send({ firstName: 'john', lastName: 'doe', password: '123456', country: 'Nigeria' })
            .expect(400)
            .then(res => {
                expect(res.body.message).toBe("Please fill all fields")
            });
    });

    it('registering without a password should throw an error', async () => {
        await request
            .post('/register')
            .send({ firstName: 'john', lastName: 'doe', email: 'test@test.com', country: 'Nigeria' })
            .expect(400)
            .then(res => {
                expect(res.body.message).toBe("Please fill all fields");
            });
    });

    it('registering without a country should throw an error',  async() => {
        await request
            .post('/register')
            .send({ firstName: 'john', lastName: 'doe', email: 'test@test.com', password: '123456' })
            .expect(400)
            .then(res => {
                expect(res.body.message).toBe("Please fill all fields");
            });
    }); 
    
});

// describe('POST /login', () => {
//     it('It should login a user',  async () => {
//         await request
//           .post('/login')
//           .send({ email: 'test@test.com', password: '123456' })
//           .expect(200)
//           .then(res => { 
//             expect(res.body.message).toBe('successful'); 
//           });
//     }); 
// });



describe('unit tests', () => {
    it('equality test', () => {
        expect(2+2).toBe(4)
    })
})

