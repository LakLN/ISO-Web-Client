import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import { EventInterface } from "../../services/services";
import { useAppSelector } from "../../hooks/hooks";
import TextareaAutosize from "react-textarea-autosize";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoGitlab,
  BiLogoTwitter,
} from "react-icons/bi";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


import axiosInstance from "../../utils/AxiosInstance";
import moment from "moment";
import Loader from "../../components/Loader/Loader";export default function RecEventDetail() {
  const { eventId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const events:  EventInterface[] = useAppSelector((state) => state.recevent.RecEventRecent);
  // Define the initial state outside the useEffect hook
  const [avatar, setAvatar] = useState('');
  const [dayend, setDayend] = useState('');
  const [daystar, setDaystar] = useState('');
  const [time, setTime] = useState('');
  const [location, setlocation] = useState('');
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');

  const [openSave, setOpenSave] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpen1 = () => {
    setOpenSave(false);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenSave(false);
    setOpenDelete(false);
  };
  //Upload event avatar
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0]; // Lấy file từ sự kiện chọn file
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setAvatar(file);
    } else {
      alert('Please choose an image file (jpg or png)');
    }
  };

  useEffect(() => {
    setIsLoading(true);      
    const getEventDetail = async () => {
      try {
        const response = await axiosInstance(`/recruiter/events/${eventId}`);
        // Set state with the response data
        setAvatar(response.data.result.img);
        setDayend(moment(response.data.result.deadline).format("YYYY-MM-DDTHH:mm"));
        setDaystar(moment(response.data.result.startAt).format("YYYY-MM-DDTHH:mm"));
        setTime(response.data.result.time);
        setlocation(response.data.result.location);
        settitle(response.data.result.title);
        setdescription(response.data.result.description);        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getEventDetail();
  }, [eventId]);
  
  // Change Event
  const handleSubmit = (event: any) => {
    event.preventDefault();      
    const formData = new FormData();
    const formattedValueStart = moment(daystar).format("HH:mm:ss YYYY-MM-DD");
    const formattedValueDeadline = moment(dayend).format("HH:mm:ss YYYY-MM-DD");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", avatar);
    formData.append("startAt", formattedValueStart);
    formData.append("deadline", formattedValueDeadline);
    formData.append("location", location);
    formData.append("time", time);   
    console.log(formData);
    
    // Gửi yêu cầu POST đến URL http://localhost:8080/api/v1/recruiter/events/create với FormData
    axiosInstance.put( `recruiter/events/${eventId}`, formData)
      .then((response) => {
        alert('Successful');
        // Xử lý phản hồi từ server (nếu cần)
        alert(response.data); // In ra thông tin phản hồi từ máy chủ
        // In tất cả thông tin từ FormData
        window.history.back();

        // <Dialog
        //     open={openSave}
        //     onClose={handleClose}
        //     aria-labelledby="alert-dialog-title"
        //     aria-describedby="alert-dialog-description"
        //   >
        //     <DialogTitle id="alert-dialog-title">
        //       {"Information saved successfully"}
        //     </DialogTitle>
        //     <DialogActions>
        //       <Button onClick={handleClose} autoFocus>
        //         Successful
        //       </Button>
        //     </DialogActions>
        //   </Dialog>
        setOpenSave(true);
        setOpenDelete(false);
      })
      .catch((error) => {
        // Xử lý lỗi (nếu có)
        console.error('Error:', error);
      });
    setOpenSave(false);
  }
 
  //Delete
  const handleDelete = () => {
    // Gửi yêu cầu DELETE đến API
    console.log(eventId);
    axiosInstance.delete(`recruiter/events/${eventId}`)
      .then((response) => {
        // Xử lý phản hồi từ server nếu cần
        alert(response.data.message);
        // Tùy chỉnh hành động sau khi xóa thành công, ví dụ: điều hướng trang, cập nhật danh sách sự kiện, v.v.
        window.history.back();
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
        // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác tùy theo trường hợp
      });
      setOpenSave(false);
      setOpenDelete(true);
    };
  return (
    <>
    {isLoading ? 
      (
        <div className="flex items-center justify-center w-full h-[50px] text-[13px] mt-10 mb-10">
          <Loader className ="l-20flex items-center justify-center" />
      </div>
      ):(
        <>
        <div className={classnames("flex pt-5 justify-center gap-5")}>
          <div className={classnames("bg-white rounded-lg shadow-lg item-center w-70%")}>
            <div className={classnames("flex items-left px-10 mt-10")}>
              <label className="text-zinc-900 text-2xl font-normal leading-7 ">Image here</label>
            </div>
            <div className="flex items-left px-10 mt-10 justify-center">
              <label htmlFor="avatar">
                {avatar ? (
                  <div>
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="blog_image"
                      className="w-90% h-90% rounded-xl"
                    />
                    <div>{avatar.name.split('.').slice(0, -1).join('.')}</div>
                  </div>
                ) : (
                  <span>Choose an image</span>
                )}
                <input
                  type="file"
                  id="avatar"
                  className={classnames("w-[50%] ig object-cover ig-center hidden")}
                  onChange={handleImageUpload}
                />
              </label>
            </div>          
            <div
              className={classnames(
                "flex items-center justify-between px-10 mt-4",
              )}
            >
              <div className={classnames("flex items-center gap-1")}>
                <h3>Start:</h3>
                <label className="">                  
                  <input
                    type="datetime-local"
                    id="datestart"
                    className="text-sm font-medium leading-tight border text-emerald-600"
                    value={daystar}
                    onChange={(event) => setDaystar(event.target.value)}
                  />
                </label>
              </div>
              <div className={classnames("flex items-center gap-1")}>
                  <h3>End:</h3>
                  <label className="">                
                  <input
                    type="datetime-local"
                    id="dateend"
                    className="text-sm font-medium leading-tight border text-emerald-600"
                    value={dayend}
                    onChange={(event) => setDayend(event.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className={classnames("mt-4 px-10")}>
            <div className={classnames("flex items-center gap-1")}>
                  <h3 >Time</h3>
                  <label className="">                
                  <input
                    type="text"
                    id="time"
                    className="text-sm font-medium leading-tight border text-emerald-600"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  />
                </label>
              </div>
              <div className={classnames("flex items-center gap-1")}>
                  <h3 >Location</h3>
                  <label className="">                
                  <input
                    type="text"
                    id="location"
                    className="text-sm font-medium leading-tight border text-emerald-600"
                    value={location}
                    onChange={(event) => setlocation(event.target.value)}
                  />
                </label>
              </div>
            
            </div>

            <div className={classnames("mt-4 px-10")}>
              <h3
                className={classnames(
                  "text-black font-outfit text-2xl font-medium leading-31 tracking-wider capitalize",
                )}
              >
                Event Title
                <TextareaAutosize
                  minRows={1}
                  id="title"
                  value={title}
                  className="resize-none text-[16px] w-full text-black font-outfit text-2xl font-medium leading-31 tracking-wider capitalize"
                  onChange={(event) => settitle(event.target.value)}
                />
              </h3>
              <div className={classnames("mt-2")}>
                <h3
                  className={classnames(
                    "text-black font-outfit text-2xl font-medium leading-31 tracking-wider capitalize",
                  )}
                >Description</h3>
                <TextareaAutosize
                  minRows={10}
                  id="description"
                  value={description}
                  className="resize-none p-2.5 text-[13px] w-full text-justify bg-white"
                  onChange={(event) => setdescription(event.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Author 
          <div
            className={classnames(
              "bg-white rounded-lg shadow-lg w-[50%] h-fit sticky top-0",
            )}
          >
            <div
              className={classnames(
                "flex items-center justify-center p-2 bg-gray-300 rounded-tl-lg rounded-tr-lg",
              )}
            >
              <h3
                className={classnames(
                  "text-center text-black text-lg font-medium tracking-wider leading-7 capitalize",
                )}
              >
                Author
              </h3>
            </div>
            <div
              className={classnames(
                "flex flex-col gap-1 items-center justify-center my-4",
              )}
            > */}
              {/* <div className={classnames("flex items-center justify-center")}>
                <label htmlFor="avaActor">
                  {avaActor && (
                    <img
                      src={avaActor}
                      alt="avatar"
                      className="w-[175px] h-[175px] rounded-full mt-5 mb-5"
                    />
                  )}                
                </label>
              </div> */}
              {/* <h3>Content Writer - journalist </h3>
              <h3>{name}</h3> */}
            {/* </div> */}
          {/* </div> */}
        </div>

        <div className={classnames("mt-10 text-center px-6 py-3")}>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 ml-5 text-white rounded-full bg-emerald-600 hover:bg-emerald-800"
          >
            Save
          </button>          
          <button
            className="px-6 py-3 ml-5 text-white bg-red-600 rounded-full hover:bg-emerald-800"
            onClick={handleClickOpen1}
          >
            Delete
          </button>
          <Dialog
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to change the location of this account?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Or consider carefully before deleting them all changes when
                pressing the agree button.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleDelete} autoFocus type="submit">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>  
    </>
    )} 
    </>   
  );  
}