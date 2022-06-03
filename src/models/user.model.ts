import {Schema, Document, model, HookNextFunction} from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

// *********REFACTOR THIS**************
export interface UserDocument extends Document{
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
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
userSchema.pre('save', async (next: HookNextFunction)=>{
    let user = this as UserDocument

    if(!user.isModified('password')){
        return next()
    }

    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))
})

const UserModel = model('User', userSchema)

export default UserModel;