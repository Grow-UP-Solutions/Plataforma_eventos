import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

import styles from './UserFormPictureProfile.module.css';

const UserFormPictureProfile = ({ url, formData, setFormData }) => {
  const avatarEditor = useRef();

  const [image, setImage] = useState({
    image: url,
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: undefined,
    disableCanvasRotation: false,
    isTransparent: false,
    backgroundColor: undefined,
    showGrid: false,
  });

  return (
    <AvatarEditor
      ref={avatarEditor}
      image={url}
      className={styles.userPicture}
    />
  );
};

export default UserFormPictureProfile;
