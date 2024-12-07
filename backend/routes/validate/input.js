const zod = require('zod');

const userSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
});

const userUpdateSchema = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
});

module.exports = {userSchema, userUpdateSchema};