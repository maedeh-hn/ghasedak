import React, {useState} from "react";
import TableActionButton from "./TableActionButton";
import {Typography} from "@mui/material";
import MessageModal from "./modal/MessageModal";
import useModal from "../hooks/useModal";
import {useTheme} from "@mui/system";

const IconMessageButtonModal = ({message, title, showDescription=true}) => {
    const theme=useTheme()
    const handleShowModal = (value) => {
        openMessageModal(value)
    };
    const {
        isOpen: isMessageOpen,
        openModal: openMessageModal,
        closeModal: closeMessageModal,
        modalData: messageModalData
    } = useModal();

    const limitCharacter = (value) => {
        let message = value?.substring(0, 50)
        if(value?.length > 50) {
            message += '...'
        }
        return message
    }

    return (
        <>
            <Typography justifyContent={"center"} align="center" fontWeight={'medium'} sx={{textAlign:"center",color:theme.palette.primary.dark, cursor: 'pointer', "&:hover": {color: theme.palette.primary.light}}}
                        onClick={() => handleShowModal(message)} display={'flex'}
                        alignItems={'center'}>
                {showDescription && (
                    <Typography
                   
                        variant={'enNum'}
                        style={{
                            scrollBehavior: 'smooth',
                            display: 'inline-block',
                            unicodeBidi: 'plaintext',
                            whiteSpace: 'pre-wrap',
                            textAlign:"center"
                        }}
                    >
                        {limitCharacter(message)
                            ?.split('%')
                            .join('percent')
                            .replace(/percent/g, ' % ')}
                    </Typography>
                )}
            </Typography>
            {
                isMessageOpen && <MessageModal state={isMessageOpen} handleClose={closeMessageModal} title={title} data={messageModalData}/>
            }
        </>
    )
}

export default IconMessageButtonModal