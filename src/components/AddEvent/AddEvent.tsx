import React,{useState} from "react";
import classnames from "classnames";
import blog_image from "../../../images/blog_image.png";
import avataractor from "../../../images/ava.jpg";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from "react-textarea-autosize";
import {  BiLogoFacebook,  BiLogoInstagram,  BiLogoLinkedin,  BiLogoGitlab,  BiLogoTwitter,} from "react-icons/bi";
export default function AddEvent() {
      const [avatar, setAvatar] = useState(blog_image);
      const [time, setTime] =     useState('');
      const [organizedBy, setOrganizedBy] = useState('');
      const [date, setDate] = useState('');
      const [eventName, setEventName] = useState('');
      const [eventContent, setEventContent] = useState('');
      const [nameActor, setnameActor] = useState('');
      const [avaActor, setavarActor] = useState(avataractor);
      const [linkFacebook, setFacebook] = useState('');
      const [linkInstagram, setInstagram] = useState('');
      const [linkLinkedin, setLinkedin] = useState('');
      const [linkGitlab, setGitlab] = useState('');
      const [linkTwitter, setTwitter] = useState('');
      const handleImageUpload = (event) => {
          const file = event.target.files[0];
          setAvatar(URL.createObjectURL(file));
      };
      const handleImageUploadActor = (event) => {
        const file = event.target.files[0];
        setavarActor(URL.createObjectURL(file));
    };
      const handleSubmit = (event) => {
        event.preventDefault();
        let object = { avatar,time,organizedBy, date, eventName,eventContent,
          nameActor,avaActor,linkFacebook,linkTwitter,linkGitlab,linkInstagram,linkLinkedin};
        console.log(object);
        setOpen(false);
      }
      const [open, setOpen] = React.useState(false);
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <>
        <form className={classnames("flex flex gap-10")} onSubmit={handleSubmit}>
          <div className={classnames("bg-white shadow rounded-lg w-full ml-5 w-75%")}>
              {/* Img */}
              <div className={classnames("flex items-left px-10 mt-10")}>
                <label className="text-zinc-900 text-2xl font-normal leading-7 ">Image here</label>
              </div>
              <div className=" flex items-left px-10 mt-10 justify-center ">
                  <label htmlFor="avatar">
                  {avatar && (
                        <div>
                          <img src={avatar} alt="blog_image" className="w-[200px] h-[200px] rounded-full " />
                        </div>
                      )}
                    <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        className={classnames("w-[50%] ig object-cover ig-center hidden")}
                        onChange={handleImageUpload}
                    />
                  </label>
              </div>
                {/* Title and content */}
                <div className={classnames("flex items-left px-10 mt-10")}>
                    <label className="text-zinc-900 text-2xl font-normal leading-7 ">
                        Event Title:
                    </label>
                </div>
                <div className={classnames("flex items-left px-10 mt-10 ")}>
                  <TextareaAutosize
                          minRows={1}
                          id="eventName"
                          value={eventName}
                          className="resize-none p-2.5 text-[13px] w-full text-justify bg-white border rounded-xl" placeholder="Event title input here"
                          onChange={(event) => setEventName(event.target.value)}
                        />
                </div>
                <div className={classnames("flex items-left px-10 mt-10")}>
                    <label className="text-zinc-900 text-2xl font-normal leading-7">
                        Description:
                    </label>
                </div>
                <div className={classnames("flex items-left px-10 mt-10")}>
                    <TextareaAutosize
                          minRows={10}
                          id="contentWidth"
                          className="resize-none p-2.5 text-[13px] w-full text-justify bg-white border rounded-xl"
                          onChange={(event) => setEventContent(event.target.value)}
                          placeholder="Please enter your content in the box below to create a perfect event. We look forward to introducing it to everyone!"
                        />
                </div>
                {/* Creact */}
              <div className={classnames("mt-10 mb-10 text-center ")}>
                <Button  
                  sx={{
                    backgroundColor: "#059669",
                    '&:hover': {
                      backgroundColor: "#289972",
                    },
                  }}
                  variant="contained" onClick={handleClickOpen}>
                    Creact
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" className='text-center'>
                    {"Are you sure you want to create this event?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            Or consider carefully before deleting them all changes when pressing the agree button.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleSubmit} autoFocus type="submit">
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <div  className={classnames( "bg-white  w-[30%] sticky top-0 " )} >
               <div className="border mt-5 mb-5 rounded-xl">
                  {/* Author  */}
                  <div  className={classnames( "mp-5 flex items-center justify-center p-2 bg-emerald-600 rounded-tl-lg rounded-tr-lg" )}  >
                  <h3  className={classnames(  "text-center text-white text-lg font-medium tracking-wider leading-7 capitalize" )}  >  Author </h3>
                  </div>
                  <div  className={classnames( "flex items-center justify-center")}   >
                    <label htmlFor="avaActor">
                    {avaActor && (
                          <img src={avaActor} alt="blog_image"  className="w-[175px] h-[175px] rounded-full mt-5 mb-5"/>
                      )}
                    <input
                          type="file"
                          id="avaActor"
                          accept="image/*"
                          className={classnames("w-full ig object-cover ig-center hidden rounded-xl")}
                          onChange={handleImageUploadActor}
                      />
                    </label>
                  </div>
                  <div  className={classnames( "flex flex-col gap-1 items-center justify-center my-4 ")}   >
                    <h3>Content Writer - journalist </h3>
                    <TextareaAutosize
                          minRows={1}
                          id="eventName"
                          value={nameActor}
                          className="px-10 text-black text-xl font-medium capitalize resize-none text-[13px] w-full text-justify bg-white border rounded-xl" placeholder="Cristina Romse"
                          onChange={(event) => setnameActor(event.target.value)}
                        />
                  </div>
                </div>

                {/* Lien he */}
                <div className="border mt-5 mb-5 rounded-xl">
                <div className="flex items-center justify-center p-2 bg-emerald-600 rounded-xl">
                    <h3
                      className={classnames(
                        " text-center text-white text-lg font-medium tracking-wider leading-7 capitalize"
                      )}
                    >
                      Contract
                    </h3>
                </div>
                {/* FB */}
                <div className={classnames("gap-10")}>
                  <div className={classnames("mt-5 flex items-center justify-center gap-3")} >
                        <div className="p-1 border border-gray-500 rounded-lg cursor-pointer hover:bg-emerald-300 hover:text-white">
                          <BiLogoFacebook size={20} />
                        </div>
                        <div>
                          <input
                          type="text"
                          value={linkFacebook}
                          className ="border rounded-xl"
                          onChange={(event) => setFacebook(event.target.value)}
                          placeholder=""
                            />
                        </div>
                  </div>
                  {/* IN */}
                  <div className={classnames("flex items-center justify-center gap-3")} >  
                      <div className="p-1 border border-gray-500 rounded-lg cursor-pointer hover:bg-emerald-300 hover:text-white">
                        <BiLogoInstagram size={20} />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={linkInstagram}
                          className ="border rounded-xl"
                          onChange={(event) => setInstagram(event.target.value)}
                          placeholder=""/>
                      </div>
                  </div>
                  {/* LK */}
                  <div className={classnames("flex items-center justify-center gap-3")} >  
                    <div className="p-1 border border-gray-500 rounded-lg cursor-pointer hover:bg-emerald-300 hover:text-white">
                      <BiLogoLinkedin size={20} />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={linkLinkedin}
                        className ="border rounded-xl"
                        onChange={(event) => setLinkedin(event.target.value)}
                        placeholder=""/>
                    </div>
                  </div>
                  {/* GitlLap */}
                  <div className={classnames("flex items-center justify-center gap-3")} >  
                    <div className="p-1 border border-gray-500 rounded-lg cursor-pointer hover:bg-emerald-300 hover:text-white">
                      <BiLogoGitlab size={20} />
                    </div>
                    <div>
                      <input  
                        type="text"
                        value={linkGitlab}
                        className ="border rounded-xl"
                        onChange={(event) => setGitlab(event.target.value)}
                        placeholder=""/>
                    </div>
                  </div>
                  <div className={classnames("mb-10 flex items-center justify-center gap-3")} >  
                    <div className="p-1 border border-gray-500 rounded-lg cursor-pointer hover:bg-emerald-300 hover:text-white">
                      <BiLogoTwitter size={20} />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={linkTwitter}
                        className ="border rounded-xl"
                        onChange={(event) => setTwitter(event.target.value)}
                        placeholder=""/>
                    </div>
                  </div>
                </div>
                </div>
                {/* Set Time  */}
                <div className="border-[2px] rounded-xl">
                <div className={classnames("flex  items-center gap-1 justify-between px-10 mb-4 ")}>
                    <label> By :
                        <input
                              type="text"
                              id="organizedBy"
                              placeholder="Google"
                              value={organizedBy}
                              className="text-emerald-600 border text-sm font-medium leading-tight"
                              onChange={(event) => setOrganizedBy(event.target.value)}
                        />
                    </label>
                </div>
                <div className={classnames("flex items-center gap-1 justify-between px-10 mt-4")}>
                    <label className="">Date poted :
                      <input
                        type="date"
                        id="date"
                        className="text-emerald-600 border text-sm font-medium leading-tight"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                      />
                    </label>
                </div>
                <div className={classnames("flex items-center gap-1  justify-between px-10 mt-4 mb-10")}>
                    <label className="">Time :
                    <input
                        type="time"
                        id="time"
                        className="text-emerald-600 border text-sm font-medium leading-tight"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                      />
                    </label>
                </div>
              </div>            
          </div>

      </form>
    </>
  );
}