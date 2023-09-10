import React, {useState} from "react";
import {Stack, Tooltip} from "@mui/material";
import TableActionButton from "./TableActionButton";
import Label from "./Label";
import UserInfoModal from "./modal/UserInfoModal";
// import TableActionButton from "./TableActionButton";
// import UserInfoModal from "./modal/UserInfoModal";
// import Label from "./Label";

const UserMoreInfo = ({userId}) => {
  const [userModal, setUserModal] = useState({
      open: false,
      data: null
  })

  return(
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
          <Tooltip followCursor placement="top" arrow title={'شناسه کاربر'}>
              <Stack>
                  <Label color={'default'}>
                      {userId}
                  </Label>
              </Stack>
          </Tooltip>


        <TableActionButton onClick={() => setUserModal({
            open: true,data: userId
        })} type={'person_setting'} title={'کاربر'}/>
          {
              userModal.open && <UserInfoModal state={userModal} setState={setUserModal} userId={userId}/>
          }
      </Stack>
  )
}
export default UserMoreInfo