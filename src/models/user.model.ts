import {Schema, Document, model} from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

// *********REFACTOR THIS**************
export interface UserDocument extends Document{
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

// presave method
userSchema.pre('save', async (next)=>{
    let user = this as unknown as UserDocument

    if(!user.isModified('password')){
        return next()
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash;

    return next();
})

// compare password 
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as unknown as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const UserModel = model('User', userSchema)

export default UserModel;