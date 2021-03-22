import { Taleo } from './src/lib/taleo';
import { config } from 'dotenv';

if (process.env.ENVIRONMENT !== 'production') {
    config();
}

const taleo = new Taleo({
    companyCode: process.env.COMPANY_CODE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
});

main();

async function main() {
    const employee = await taleo.employee.getById(74);
    console.log(employee);
}
