import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Loader from '../Loader';
import Message from '../Message';

import {
    getUserDetails,
    updateUserProfile,
} from '../../../redux/asyncThunks/userThunks';

function EditProfileForm({ setIsEditing }) {
  const dispatch = useDispatch();

  const { loading, userUpdateProfileError, userDetails } = useSelector(
    (state) => state.user
  );

  // 🛑 IMPORTANT GUARD
  if (!userDetails) {
    return <Loader />;
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  // ✅ Populate form AFTER userDetails arrives
  useEffect(() => {
    setFormData({
      name: userDetails.name || '',
      email: userDetails.email || '',
      address: userDetails.address || '',
      phoneNumber: userDetails.phoneNumber || '',
      password: '',
      confirmPassword: '',
    });
  }, [userDetails]);

  const handleFieldChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const payload = { ...formData };

  // 🔥 IMPORTANT: remove empty password fields
  if (!payload.password) {
    delete payload.password;
    delete payload.confirmPassword;
  }

  dispatch(updateUserProfile(payload)).then(() => {
    setIsEditing(false);
    dispatch(getUserDetails({}));
  });
};

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {userUpdateProfileError && (
            <Message>{userUpdateProfileError}</Message>
          )}

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 my-2">
              {['name', 'email', 'address', 'phoneNumber'].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={formData[field]}
                  placeholder={field}
                  onChange={handleFieldChange}
                  className="w-full text-green-600 bg-green-100 rounded-md p-4 text-sm shadow-sm"
                />
              ))}

              <input
                type="password"
                name="password"
                placeholder="New password"
                onChange={handleFieldChange}
                className="w-full text-green-600 bg-green-100 rounded-md p-4 text-sm shadow-sm"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleFieldChange}
                className="w-full text-green-600 bg-green-100 rounded-md p-4 text-sm shadow-sm"
              />
            </div>

            <div className="flex justify-between">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

EditProfileForm.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
};

export default EditProfileForm;
