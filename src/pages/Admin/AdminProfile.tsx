
import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {fetchAdminProfileRecent} from "../../redux/reducer/AdminProfileRecentSlice";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/Status';

const AdminProfile = () => {
    const {adminprofilesRecent, adminprofilesRecentStatus} = useAppSelector((state: any) => state.adminprofilesRecent);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAdminProfileRecent())
    }, []);
    const fileInputRef = useRef(null);
    // const handleImageUpload = (event) => {
    // const file = event.target.files[0];
    // // if (file) {
    //     setAvatar(URL.createObjectURL(file));
    // }
    // };
    // const handleImageClick = () => {
    //     fileInputRef.current.click();
    // };
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setOpen(false);
    // }
    if(adminprofilesRecentStatus === STATUS.LOADING){
        return (
            <Loader/>
        );
    }else if(adminprofilesRecentStatus === STATUS.IDLE){
    return (
        <div className="flex gap-5">
            <div className="bg-white rounded-lg shadow-lg w-[40%] flex justify-center items-center">
            <div >
                <img src={adminprofilesRecent.avatar} className="w-[175px] h-[175px] rounded-full" alt="avatar" />
                {/* onClick={handleImageClick} */}
                {/* adminprofilesRecent.avatar ? ( */}
                {/* // ) : (
                // <div className="upload-placeholder">
                //     <span>Choose Image</span>
                // </div>
                // ) */}
            </div>
            {/* <input
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
            /> */}
            </div>
            <div className="bg-white rounded-lg shadow-lg w-[50%] h-fit sticky">
                <div className="flex items-center justify-center text-center space-x-2 font-semibold text-green-500">
                    <span className="tracking-wide text-bold-center flex text-emerald-600 text-[30px]">Information</span>
                </div>
                <form  className = "text-gray-700 "> 
                {/* onSubmit={handleSubmit} */}
                    <div className = "grid md:grid-cols-1 text-sm self-stretch px-2 pt-[13px] pb-[13px]">
                        {/* Name */}
                        <div className = "grid grid-cols-1">
                            <div className = "px-4 py-2 font-semibold text-black capitalize leading-7 tracking-wide "> FullName</div>
                            <input
                                type="text"
                                id="name"
                                readOnly
                                value={adminprofilesRecent.fullName}
                                className="px-4 py-2 self-stretch pt-[13px] pb-[13px] bg-white bg-opacity-0 rounded-lg border border-zinc-900" placeholder={adminprofilesRecent.Fullname}
                                // onChange={(event) => setname(event.target.value)}
                            />
                        </div>
                        {/* Phone */}
                        <div className = "grid grid-cols-1">
                            <div className = "px-4 py-2 font-semibold text-black capitalize leading-7 tracking-wide">Contact No.</div>
                            <input
                                type="text"
                                id="phone"
                                readOnly
                                value={adminprofilesRecent.phone}
                                className="px-4 py-2 self-stretch pt-[13px] pb-[13px] bg-white bg-opacity-0 rounded-lg border border-zinc-900" placeholder={adminprofilesRecent.phone}
                                // onChange={(event) => setphone(event.target.value)}
                            />
                        </div>
                        {/* Email */}
                        <div className = "grid grid-cols-1">
                            <div className = "px-4 py-2 font-semibold text-black capitalize leading-7 tracking-wide">Email.</div>
                            <input
                                type="email"
                                id="email"
                                readOnly
                                value={adminprofilesRecent.email}
                                className="px-4 py-2 self-stretch pt-[13px] pb-[13px] bg-white bg-opacity-0 rounded-lg border border-zinc-900" placeholder= {adminprofilesRecent.email}
                                // onChange={(event) => setemail(event.target.value)}
                            />
                        </div>
                         {/* Adress */}
                        <div className = "grid grid-cols-1">
                            <div className = "px-4 py-2 font-semibold text-black capitalize leading-7 tracking-wide">Current Address</div>
                            <input
                                type="text"
                                id="adress"
                                readOnly
                                value={adminprofilesRecent.adress}
                                className="px-4 py-2 self-stretch pt-[13px] pb-[13px] bg-white bg-opacity-0 rounded-lg border border-zinc-900" placeholder={adminprofilesRecent.address}
                                // onChange={(event) => setadress(event.target.value)}
                            />
                        </div>
                        {/* Save Buton */}
                      
                    </div>
                </form>
            </div>
        </div>
    )
}
}
export default AdminProfile;
