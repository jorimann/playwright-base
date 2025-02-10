import {faker} from '@faker-js/faker';

const sex = faker.person.sex();
const countries = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];

function getRandomCountry(){
    let randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

const User = {
    sex: sex,
    firstName:  faker.person.firstName(sex),
    lastName: faker.person.lastName(sex),
    email: faker.internet.email(),
    mobileNumber: faker.phone.number(),
    login: faker.internet.displayName(),
    password: faker.internet.password(),
    birthDate: faker.date.birthdate({mode: 'age', min: 18, max: 65}),
    title: sex === 'female' ? 'Mrs' : 'Mr',
    company: faker.company.name(),
    address: faker.location.streetAddress(false),
    address2: faker.location.streetAddress(false),
    country: getRandomCountry(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
};

export default User;