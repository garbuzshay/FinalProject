import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  roleId: { type: String, required: true, unique: true },
  roleName: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

const RoleModel = mongoose.model('roles', roleSchema);

export default RoleModel;
