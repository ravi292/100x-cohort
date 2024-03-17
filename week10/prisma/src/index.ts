import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
    firstName: string,
    lastName: string,
}

async function insertUser(email: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
        data: {
            email, password, firstName, lastName
        },
    })
    console.log(res);
}

async function updateUser(email: string, {
    firstName,
    lastName
}: UpdateParams) {
    const res = await prisma.user.update({
        data: {
            firstName,
            lastName
        },
        where: {
            email
        }
    })

    console.log(res);
}

async function getUser(email: string) {
    const res = await prisma.user.findUnique({
        where: {email},
        select: {
            email:true,
            firstName: true,
            lastName: true,
        }
    })
    console.log(res);
}

//getUser("user6@example.com");
//insertUser("user6@example.com", "user_password", "user", "test");
//updateUser("user6@example.com", { firstName: "user6", lastName: "test6"})
