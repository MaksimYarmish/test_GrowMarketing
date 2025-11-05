import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient, createEmployee } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, modalType, scroll, setOpen }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialUserState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  };
  const initialErrors = {
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    phone: false,
    email: false,
  };

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [userData, setUserData] = useState(initialUserState);
  const [errors, setErrors] = useState(initialErrors);

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {...initialErrors};
    let errorExist = false;
    Object.keys(userData).forEach((fieldName) => {
      if (fieldName === "email") {
        if (!!userData.email && !emailRegex.test(userData.email)) {
          errorExist = true;
          newErrors.email = true;
        }
      } else if (!userData[fieldName]){
        errorExist = true;
        newErrors[fieldName] = true;
      }      
    })
    setErrors(newErrors);
    if (errorExist)
      return;
    if(modalType === "employee")
      dispatch(createEmployee(userData, setOpen));
    else
      dispatch(createClient(userData, setOpen));
    setUserData(initialUserState)
  };

  const handleChange = (field, value) => {
    setUserData((prevFilters) => ({ ...prevFilters, [field]: value, }));
  };

  const handleClose = () => {
    setOpen(false);
    setUserData(initialUserState);
    setErrors(initialErrors);
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">
            {`Add New ${modalType === "employee" ? "Employee" : "Client"}`}
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>{`${modalType === "employee" ? "Employee" : "Client"} Detials`}</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-8 text-lg">First Name </td>
                <td className="pb-2">
                  <TextField
                    size="small"
                    fullWidth
                    value={userData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    error={errors.firstName}
                  />
                  <FormHelperText
                    sx={{minHeight: 20}} 
                    error={errors.firstName}
                  >
                    {errors.firstName && "First Name is invalid"}
                  </FormHelperText>
                </td>
              </tr>
              <tr>
                <td className="pb-8 text-lg">Last Name </td>
                <td className="pb-2">
                  <TextField
                    size="small"
                    fullWidth
                    value={userData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    error={errors.lastName}
                  />
                  <FormHelperText 
                    sx={{minHeight: 20}}
                    error={errors.lastName}
                  >
                    {errors.lastName && "Last Name is invalid"}
                  </FormHelperText>
                </td>
              </tr>
              <tr>
                <td className="pb-8 text-lg">User Name </td>
                <td className="pb-2">
                  <TextField
                    size="small"
                    fullWidth
                    value={userData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    error={errors.username}
                  />
                  <FormHelperText 
                    sx={{minHeight: 20}}
                    error={errors.username}
                  >
                    {errors.username && "User Name is invalid"}
                  </FormHelperText>
                </td>
              </tr>
              <tr>
                <td className="pb-8 text-lg">Email </td>
                <td className="pb-2">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={userData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={errors.email}
                  />
                  <FormHelperText 
                    sx={{minHeight: 20}}
                    error={errors.email}
                  >
                    {errors.email && "Email is invalid"}
                  </FormHelperText>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Password </td>
                <td className="pb-2">
                  <TextField
                    type="password"
                    value={userData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    size="small"
                    fullWidth
                    error={errors.password}
                  />
                  <FormHelperText 
                    sx={{minHeight: 20}}
                    error={errors.password}
                  >
                    {errors.password && "Password is invalid"}
                  </FormHelperText>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-2">
                  <TextField
                    type="number"
                    size="small"
                    value={userData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    fullWidth
                    error={errors.phone}
                  />
                  <FormHelperText 
                    sx={{minHeight: 20}}
                    error={errors.phone}
                  >
                    {errors.phone && "Phone is invalid"}
                  </FormHelperText>
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default CreateUser;
