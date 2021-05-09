/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React from "react";
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #000",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    borderRadius:'16px',
    position:'relative',
    // padding: '20px 30px',
    display: "flex",
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center ',
    paddingTop:'20px'
  },
}));

export default function ModalProfileFollow({clickFollowUser, handleUnfollowProfile, profileUsername, userUsername}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(clickFollowUser);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      handleUnfollowProfile(false)
    };
    
  return (
    <div >
      <button type="button" onClick={handleOpen}>
       
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div id="transition-modal-title" className='flex items-center justify-center mt-4 w-full'>
              <img   src={`/images/avatars/${profileUsername}.jpg`} alt={`${profileUsername}profile`} className='rounded-full h-24 w-24'/>
            </div>
            <p id="transition-modal-description" className='mt-6 text-center w-full px-32 text-sm '>
              {`Bỏ theo dõi @${userUsername}?`}
            </p>
            <div className='mt-7 border-t w-full text-center p-3 border-gray-primary'>
                <button type='button' className='font-bold text-sm text-red-primary w-full'>Bỏ theo dõi</button>
            </div>
            <div className=' border-t w-full text-center p-3 text-sm border-gray-primary'>
                <button className='w-full' type='button' onClick={handleClose}>Hủy</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
ModalProfileFollow.propTypes = {
    clickFollowUser: PropTypes.object.isRequired,
    handleUnfollowProfile: PropTypes.func.isRequired,
    profileUsername: PropTypes.string.isRequired,
    userUsername: PropTypes.string.isRequired
}
Fade.propTypes = {
    in: PropTypes.bool.isRequired,
}
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
}
Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
}